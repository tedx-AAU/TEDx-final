const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const authMiddleware = require('../middleware/auth');
const {
  sendContactNotification,
  sendContactConfirmation,
  sendCustomEmail,
} = require('../config/email');

// POST /api/contacts - Create a new contact message
router.post('/', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();

    try {
      await sendContactNotification(contact);
    } catch (emailError) {
      console.error('Failed to send notification email:', emailError);
    }

    try {
      await sendContactConfirmation(contact);
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
    }

    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /api/contacts - Get all contact messages (protected route)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/contacts/send-email - Send custom email (protected route)
router.post('/send-email', authMiddleware, async (req, res) => {
  try {
    const { to, subject, message } = req.body;

    if (!to || !subject || !message) {
      return res.status(400).json({
        error: 'Missing required fields: to, subject, message',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return res.status(400).json({
        error: 'Invalid email address format',
      });
    }

    const result = await sendCustomEmail(to, subject, message);

    if (result.success) {
      res.json({
        message: 'Email sent successfully',
        messageId: result.messageId,
      });
    } else {
      res.status(500).json({
        error: 'Failed to send email',
        details: result.error,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
