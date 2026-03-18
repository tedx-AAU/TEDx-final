const express = require('express');
const Registration = require('../models/Registration');
const Ticket = require('../models/Ticket');
const nodemailer = require('nodemailer');
const QRCode = require('qrcode');
const path = require('path');
const { createCanvas, loadImage, registerFont } = require('canvas');
const { sendCustomEmail } = require('../config/email');

const router = express.Router();

// In-memory OTP storage with expiration (5 minutes)
const otpStore = new Map();

// Clean up expired OTPs every minute
setInterval(() => {
  const now = Date.now();
  for (const [email, otpData] of otpStore.entries()) {
    if (otpData.expiresAt < now) {
      otpStore.delete(email);
    }
  }
}, 60000); // Run every minute

router.get('/tickets/available', async (req, res) => {
  try {
    const ticket = await Ticket.findOne();

    if (!ticket) {
      return res
        .status(404)
        .json({ success: false, message: 'No tickets found!' });
    }

    res.status(200).json({
      success: true,
      numberOfTickets: ticket.numberOfTickets,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.patch('/tickets/add', async (req, res) => {
  try {
    const { numberOfTickets } = req.body;

    if (!numberOfTickets || numberOfTickets <= 0) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid number of tickets' });
    }

    const ticket = await Ticket.findOne();

    if (!ticket) {
      return res
        .status(404)
        .json({ success: false, message: 'No ticket document found!' });
    }

    ticket.numberOfTickets += numberOfTickets;
    await ticket.save();

    res.status(200).json({
      success: true,
      message: 'Tickets added successfully!',
      numberOfTickets: ticket.numberOfTickets,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/registrations/export', async (req, res) => {
  try {
    const { status } = req.query;

    const query = {
      ...(status && { status }),
    };

    const registrations = await Registration.find(query).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: registrations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/registrations/accepted/count', async (req, res) => {
  try {
    const acceptedCount = await Registration.countDocuments({
      status: 'Accepted',
    });

    res.status(200).json({
      success: true,
      totalAccepted: acceptedCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/registrations', async (req, res) => {
  try {
    const { page = 1, limit = 10, search, status } = req.query;

    const skip = (page - 1) * limit;

    const query = {
      ...(search && {
        $or: [
          { customerNumber: parseInt(search) },
          { phoneNumber: { $regex: search, $options: 'i' } },
        ],
      }),
      ...(status && { status }),
    };

    const registrations = await Registration.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalRegistrations = await Registration.countDocuments(query);

    res.status(200).json({
      success: true,
      data: registrations,
      total: totalRegistrations,
      page: parseInt(page),
      totalPages: Math.ceil(totalRegistrations / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.patch('/registrations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedRegistration = await Registration.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedRegistration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    if (status === 'Rejected') {
      const ticket = await Ticket.findOne();

      if (ticket) {
        ticket.numberOfTickets += updatedRegistration?.numberOfTickets;
        await ticket.save();
      }
    }

    if (status === 'Accepted') {
      const qrCodeDataUrl = await QRCode.toDataURL(
        updatedRegistration?.customerNumber.toString()
      );

      const fontPath = path.join(__dirname, '../assets/fonts/ARIAL.TTF');
      registerFont(fontPath, { family: 'Arial' });

      const ticketTemplatePath = path.join(
        __dirname,
        '../assets/images/ticket-template.jpeg'
      );
      const ticketImage = await loadImage(ticketTemplatePath);

      const canvas = createCanvas(ticketImage.width, ticketImage.height);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(ticketImage, 0, 0);

      ctx.font = 'bold 70px Arial';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(
        `${updatedRegistration?.fullName || 'Name'} (${
          updatedRegistration?.numberOfTickets
        })`,
        40,
        820,
      );

      const qrCodeImage = await loadImage(qrCodeDataUrl);
      ctx.drawImage(qrCodeImage, 825, 955, 230, 230);

      const finalTicketBuffer = canvas.toBuffer();

      const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
          user: 'info@tedxjabaltareq.com',
          pass: 'sngybsygqfhnfcgm',
        },
      });

      const mailOptions = {
        from: 'info@tedxjabaltareq.com',
        to: `${updatedRegistration?.email};info@tedxjabaltareq.com`,
        subject: 'TEDx Jabal Tareq Ticket Confirmation',
        html: `<p>Dear ${updatedRegistration?.fullName},</p>
           <p>Thank you for registering for TEDx Jabal Tareq. Please find your ticket attached.</p>`,
        attachments: [
          {
            filename: 'TEDx-Ticket.jpeg',
            content: finalTicketBuffer,
            contentType: 'image/jpeg',
          },
        ],
      };

      await transporter.sendMail(mailOptions);

      console.log('Ticket sent successfully!');
    }

    res.status(200).json({ success: true, data: updatedRegistration });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Send OTP to email
router.post('/send-otp', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: 'Email is required' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Generate 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // Store OTP with expiration (5 minutes)
    otpStore.set(normalizedEmail, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
    });

    // Send OTP via email
    const emailSubject = 'TEDxJabalTareq - Email Verification Code';
    const emailMessage = `Your verification code is: ${otp}\n\nThis code will expire in 5 minutes.\n\nIf you didn't request this code, please ignore this email.`;

    const emailResult = await sendCustomEmail(
      normalizedEmail,
      emailSubject,
      emailMessage
    );

    if (!emailResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to send OTP. Please try again.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully to your email',
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP are required',
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const otpData = otpStore.get(normalizedEmail);

    if (!otpData) {
      return res.status(400).json({
        success: false,
        message: 'OTP not found or expired. Please request a new OTP.',
      });
    }

    if (otpData.expiresAt < Date.now()) {
      otpStore.delete(normalizedEmail);
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please request a new OTP.',
      });
    }

    if (otpData.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP. Please try again.',
      });
    }

    // OTP verified successfully - mark as verified (keep for 10 more minutes)
    otpStore.set(normalizedEmail, {
      otp: otpData.otp,
      expiresAt: Date.now() + 10 * 60 * 1000, // Extend for 10 minutes
      verified: true,
    });

    res.status(200).json({
      success: true,
      message: 'OTP verified successfully',
    });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const formData = req.body;

    // Normalize email to lowercase for uniqueness check
    const normalizedEmail = formData.email?.toLowerCase().trim();

    /*
    // Verify OTP was verified before allowing registration
    const otpData = otpStore.get(normalizedEmail);
    if (!otpData || !otpData.verified) {
      return res.status(400).json({
        success: false,
        message: 'Email verification required. Please verify your email first.',
      });
    }

    // Check if OTP verification has expired (10 minutes after verification)
    if (otpData.expiresAt < Date.now()) {
      otpStore.delete(normalizedEmail);
      return res.status(400).json({
        success: false,
        message: 'Email verification expired. Please verify your email again.',
      });
    }
    */

    // Check if email already exists
    const existingRegistration = await Registration.findOne({
      email: normalizedEmail,
    });

    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message:
          'This email is already registered. Please use a different email address.',
      });
    }

    const ticket = await Ticket.findOne();

    if (!ticket || ticket.numberOfTickets < formData.numberOfTickets) {
      return res
        .status(201)
        .json({ success: false, message: 'No tickets available!' });
    }

    ticket.numberOfTickets -= formData.numberOfTickets;
    await ticket.save();

    const lastRegistration = await Registration.findOne().sort({
      createdAt: -1,
    });

    const newCustomerNumber = lastRegistration
      ? lastRegistration.customerNumber + 1
      : 1000;

    formData.customerNumber = newCustomerNumber;
    formData.email = normalizedEmail; // Use normalized email

    const newRegistration = new Registration(formData);
    await newRegistration.save();

    // Clean up OTP after successful registration
    otpStore.delete(normalizedEmail);

    res
      .status(201)
      .json({ success: true, message: 'Registration successful!' });
  } catch (error) {
    console.error(error);

    // Handle MongoDB duplicate key error
    if (error.code === 11000 && error.keyPattern?.email) {
      return res.status(400).json({
        success: false,
        message:
          'This email is already registered. Please use a different email address.',
      });
    }

    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.post('/', async (req, res) => {
    try {
        console.log("Data received:", req.body);
     
        res.status(201).json({ message: 'Registration successful!' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});
module.exports = router;
