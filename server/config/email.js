const nodemailer = require('nodemailer');

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
      user: 'info@tedxjabaltareq.com',
      pass: 'sngybsygqfhnfcgm',
    },
  });
};

// Email templates
const emailTemplates = {
  contactNotification: (contactData) => ({
    subject: `🚨 New Contact Message from ${contactData.name} - TEDxJabalTareq`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Message - TEDxJabalTareq</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Bangers&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
            color: #ffffff;
            line-height: 1.6;
          }
          
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            border: 4px solid #000000;
          }
          
          .header {
            background: linear-gradient(135deg, #EB0028 0%, #FF1744 100%);
            padding: 30px 20px;
            text-align: center;
            position: relative;
            overflow: hidden;
          }
          
          .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
              radial-gradient(circle at 20% 20%, rgba(255, 186, 103, 0.2) 2px, transparent 2px),
              radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
            background-size: 30px 30px, 20px 20px;
            animation: halftoneShift 8s ease-in-out infinite;
          }
          
          @keyframes halftoneShift {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(5px, 5px); }
          }
          
          .logo {
            font-family: 'Bangers', cursive;
            font-size: 2.5rem;
            font-weight: 900;
            color: #ffffff;
            text-shadow: 
              4px 4px 0 #000,
              -2px -2px 0 #000,
              2px -2px 0 #000,
              -2px 2px 0 #000;
            margin-bottom: 10px;
            position: relative;
            z-index: 2;
          }
          
          .subtitle {
            color: #FFBA67;
            font-size: 1.2rem;
            font-weight: 600;
            text-shadow: 2px 2px 0 #000;
            position: relative;
            z-index: 2;
          }
          
          .content {
            padding: 40px 30px;
            background: #ffffff;
            color: #000000;
          }
          
          .alert-badge {
            background: linear-gradient(135deg, #EB0028 0%, #FF1744 100%);
            color: white;
            padding: 15px 25px;
            border-radius: 15px;
            font-weight: bold;
            font-size: 1.1rem;
            text-align: center;
            margin-bottom: 30px;
            box-shadow: 0 8px 16px rgba(235, 0, 40, 0.3);
            border: 3px solid #000;
            text-transform: uppercase;
            letter-spacing: 0.1em;
          }
          
          .message-card {
            background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
            border: 3px solid #000;
            border-radius: 15px;
            padding: 25px;
            margin: 20px 0;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
            position: relative;
          }
          
          .message-card::before {
            content: '';
            position: absolute;
            top: -3px;
            left: -3px;
            right: -3px;
            bottom: -3px;
            background: linear-gradient(45deg, #EB0028, #FFBA67, #EB0028);
            border-radius: 15px;
            z-index: -1;
            opacity: 0.1;
          }
          
          .field {
            margin-bottom: 20px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 10px;
            border-left: 5px solid #EB0028;
          }
          
          .field-label {
            font-weight: bold;
            color: #EB0028;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 5px;
          }
          
          .field-value {
            color: #333;
            font-size: 1rem;
            word-break: break-word;
          }
          
          .message-content {
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
            border: 2px solid #FFBA67;
            font-style: italic;
            line-height: 1.8;
            color: #333;
            position: relative;
          }
          
          .message-content::before {
            content: '"';
            position: absolute;
            top: -10px;
            left: 20px;
            font-size: 3rem;
            color: #FFBA67;
            font-family: serif;
          }
          
          .message-content::after {
            content: '"';
            position: absolute;
            bottom: -20px;
            right: 20px;
            font-size: 3rem;
            color: #FFBA67;
            font-family: serif;
          }
          
          .footer {
            background: #000000;
            color: #ffffff;
            padding: 25px 30px;
            text-align: center;
            border-top: 3px solid #EB0028;
          }
          
          .footer-text {
            font-size: 0.9rem;
            color: #FFBA67;
            margin-bottom: 10px;
          }
          
          .comic-elements {
            position: relative;
            overflow: hidden;
          }
          
          .comic-text {
            position: absolute;
            font-family: 'Bangers', cursive;
            font-weight: 900;
            text-transform: uppercase;
            color: #EB0028;
            text-shadow: 3px 3px 0 #000;
            z-index: 1;
            pointer-events: none;
          }
          
          .pop-text {
            top: 20px;
            right: 20px;
            font-size: 1.5rem;
            transform: rotate(15deg);
            animation: popPulse 2s ease-in-out infinite;
          }
          
          .bam-text {
            bottom: 20px;
            left: 20px;
            font-size: 1.3rem;
            transform: rotate(-10deg);
            animation: bamShake 2.5s ease-in-out infinite;
          }
          
          @keyframes popPulse {
            0%, 100% { transform: rotate(15deg) scale(1); }
            50% { transform: rotate(15deg) scale(1.1); }
          }
          
          @keyframes bamShake {
            0%, 100% { transform: rotate(-10deg) translateX(0); }
            25% { transform: rotate(-10deg) translateX(-3px); }
            75% { transform: rotate(-10deg) translateX(3px); }
          }
          
          @media (max-width: 600px) {
            .email-container {
              margin: 10px;
              border-radius: 15px;
            }
            
            .content {
              padding: 25px 20px;
            }
            
            .logo {
              font-size: 2rem;
            }
            
            .comic-text {
              font-size: 1rem;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header comic-elements">
            <div class="comic-text pop-text">NEW!</div>
            <div class="comic-text bam-text">MESSAGE!</div>
            <div class="logo">TEDxJabalTareq</div>
            <div class="subtitle">Admin Notification</div>
          </div>
          
          <div class="content">
            <div class="alert-badge">
              🚨 New Contact Message Received
            </div>
            
            <div class="message-card">
              <div class="field">
                <div class="field-label">👤 Name</div>
                <div class="field-value">${contactData.name}</div>
              </div>
              
              <div class="field">
                <div class="field-label">📧 Email</div>
                <div class="field-value">${contactData.email}</div>
              </div>
              
              <div class="field">
                <div class="field-label">💬 Message</div>
                <div class="message-content">
                  ${contactData.message.replace(/\n/g, '<br>')}
                </div>
              </div>
            </div>
          </div>
          
          <div class="footer">
            <div class="footer-text">
              This message was sent from the TEDxJabalTareq contact form
            </div>
            <div style="font-size: 0.8rem; color: #999;">
              TEDxJabalTareq • Jabal Tareq, Al-Zarqa, Jordan
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
🚨 NEW CONTACT MESSAGE - TEDxJabalTareq

Name: ${contactData.name}
Email: ${contactData.email}

Message:
"${contactData.message}"

---
This message was sent from the TEDxJabalTareq contact form
TEDxJabalTareq • Jabal Tareq, Al-Zarqa, Jordan
    `,
  }),

  contactConfirmation: (contactData) => ({
    subject: '🎉 Thank you for contacting TEDxJabalTareq!',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You - TEDxJabalTareq</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Bangers&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
            color: #ffffff;
            line-height: 1.6;
          }
          
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            border: 4px solid #000000;
          }
          
          .header {
            background: linear-gradient(135deg, #FFBA67 0%, #FFD54F 100%);
            padding: 40px 20px;
            text-align: center;
            position: relative;
            overflow: hidden;
          }
          
          .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
              radial-gradient(circle at 25% 25%, rgba(235, 0, 40, 0.2) 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
            background-size: 25px 25px, 15px 15px;
            animation: halftoneShift 10s ease-in-out infinite;
          }
          
          @keyframes halftoneShift {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(3px, 3px); }
          }
          
          .logo {
            font-family: 'Bangers', cursive;
            font-size: 2.8rem;
            font-weight: 900;
            color: #000000;
            text-shadow: 
              3px 3px 0 #EB0028,
              -1px -1px 0 #EB0028,
              1px -1px 0 #EB0028,
              -1px 1px 0 #EB0028;
            margin-bottom: 15px;
            position: relative;
            z-index: 2;
          }
          
          .subtitle {
            color: #EB0028;
            font-size: 1.3rem;
            font-weight: 700;
            text-shadow: 2px 2px 0 #000;
            position: relative;
            z-index: 2;
            text-transform: uppercase;
            letter-spacing: 0.1em;
          }
          
          .content {
            padding: 40px 30px;
            background: #ffffff;
            color: #000000;
          }
          
          .success-badge {
            background: linear-gradient(135deg, #FFBA67 0%, #FFD54F 100%);
            color: #000000;
            padding: 20px 30px;
            border-radius: 20px;
            font-weight: bold;
            font-size: 1.2rem;
            text-align: center;
            margin-bottom: 30px;
            box-shadow: 0 10px 20px rgba(255, 186, 103, 0.3);
            border: 4px solid #000;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            position: relative;
          }
          
          .success-badge::before {
            content: '🎉';
            font-size: 2rem;
            margin-right: 10px;
          }
          
          .greeting {
            font-size: 1.3rem;
            color: #333;
            margin-bottom: 20px;
            font-weight: 600;
          }
          
          .message {
            font-size: 1.1rem;
            color: #555;
            margin-bottom: 30px;
            line-height: 1.8;
          }
          
          .message-card {
            background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
            border: 3px solid #000;
            border-radius: 20px;
            padding: 30px;
            margin: 25px 0;
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
            position: relative;
          }
          
          .message-card::before {
            content: '';
            position: absolute;
            top: -3px;
            left: -3px;
            right: -3px;
            bottom: -3px;
            background: linear-gradient(45deg, #FFBA67, #EB0028, #FFBA67);
            border-radius: 20px;
            z-index: -1;
            opacity: 0.1;
          }
          
          .message-label {
            font-weight: bold;
            color: #EB0028;
            font-size: 1rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
          }
          
          .message-label::before {
            content: '💬';
            margin-right: 10px;
            font-size: 1.2rem;
          }
          
          .message-content {
            background: #ffffff;
            padding: 25px;
            border-radius: 15px;
            border: 2px solid #FFBA67;
            font-style: italic;
            line-height: 1.8;
            color: #333;
            position: relative;
            font-size: 1.1rem;
          }
          
          .message-content::before {
            content: '"';
            position: absolute;
            top: -15px;
            left: 25px;
            font-size: 4rem;
            color: #FFBA67;
            font-family: serif;
          }
          
          .message-content::after {
            content: '"';
            position: absolute;
            bottom: -25px;
            right: 25px;
            font-size: 4rem;
            color: #FFBA67;
            font-family: serif;
          }
          
          .signature {
            background: linear-gradient(135deg, #EB0028 0%, #FF1744 100%);
            color: white;
            padding: 25px 30px;
            border-radius: 15px;
            margin: 30px 0;
            text-align: center;
            box-shadow: 0 8px 16px rgba(235, 0, 40, 0.3);
            border: 3px solid #000;
          }
          
          .signature-text {
            font-size: 1.2rem;
            font-weight: bold;
            margin-bottom: 5px;
          }
          
          .signature-team {
            font-size: 1rem;
            opacity: 0.9;
          }
          
          .footer {
            background: #000000;
            color: #ffffff;
            padding: 30px;
            text-align: center;
            border-top: 4px solid #FFBA67;
          }
          
          .footer-text {
            font-size: 1rem;
            color: #FFBA67;
            margin-bottom: 15px;
            font-weight: 600;
          }
          
          .footer-details {
            font-size: 0.9rem;
            color: #999;
            line-height: 1.6;
          }
          
          .comic-elements {
            position: relative;
            overflow: hidden;
          }
          
          .comic-text {
            position: absolute;
            font-family: 'Bangers', cursive;
            font-weight: 900;
            text-transform: uppercase;
            color: #EB0028;
            text-shadow: 3px 3px 0 #000;
            z-index: 1;
            pointer-events: none;
          }
          
          .thanks-text {
            top: 30px;
            right: 30px;
            font-size: 1.8rem;
            transform: rotate(12deg);
            animation: thanksBounce 3s ease-in-out infinite;
          }
          
          .awesome-text {
            bottom: 30px;
            left: 30px;
            font-size: 1.5rem;
            transform: rotate(-8deg);
            animation: awesomeShake 2.5s ease-in-out infinite;
          }
          
          @keyframes thanksBounce {
            0%, 100% { transform: rotate(12deg) translateY(0); }
            50% { transform: rotate(12deg) translateY(-8px); }
          }
          
          @keyframes awesomeShake {
            0%, 100% { transform: rotate(-8deg) translateX(0); }
            25% { transform: rotate(-8deg) translateX(-2px); }
            75% { transform: rotate(-8deg) translateX(2px); }
          }
          
          @media (max-width: 600px) {
            .email-container {
              margin: 10px;
              border-radius: 15px;
            }
            
            .content {
              padding: 25px 20px;
            }
            
            .logo {
              font-size: 2.2rem;
            }
            
            .comic-text {
              font-size: 1.2rem;
            }
            
            .thanks-text {
              top: 20px;
              right: 20px;
            }
            
            .awesome-text {
              bottom: 20px;
              left: 20px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header comic-elements">
            <div class="comic-text thanks-text">THANKS!</div>
            <div class="comic-text awesome-text">AWESOME!</div>
            <div class="logo">TEDxJabalTareq</div>
            <div class="subtitle">Message Received</div>
          </div>
          
          <div class="content">
            <div class="success-badge">
              Message Successfully Received!
            </div>
            
            <div class="greeting">
              Dear ${contactData.name},
            </div>
            
            <div class="message">
              Thank you for reaching out to us! We're thrilled to hear from you and have received your message. Our team will review it carefully and get back to you as soon as possible.
            </div>
            
            <div class="message-card">
              <div class="message-label">Your Message</div>
              <div class="message-content">
                ${contactData.message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div class="signature">
              <div class="signature-text">Best regards,</div>
              <div class="signature-team">The TEDxJabalTareq Team</div>
            </div>
          </div>
          
          <div class="footer">
            <div class="footer-text">
              TEDxJabalTareq
            </div>
            <div class="footer-details">
              Jabal Tareq, Al-Zarqa, Jordan<br>
              Bringing Ideas Worth Spreading to Jordan
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
🎉 THANK YOU FOR CONTACTING TEDxJabalTareq!

Dear ${contactData.name},

Thank you for reaching out to us! We're thrilled to hear from you and have received your message. Our team will review it carefully and get back to you as soon as possible.

Your Message:
"${contactData.message}"

Best regards,
The TEDxJabalTareq Team

---
TEDxJabalTareq
Jabal Tareq, Al-Zarqa, Jordan
Bringing Ideas Worth Spreading to Jordan
    `,
  }),
};

// Send email function
const sendEmail = async (to, template, data) => {
  try {
    const transporter = createTransporter();
    const emailContent = template(data);

    const mailOptions = {
      from: `"TEDxJabalTareq" <info@tedxjabaltareq.com>`,
      to: to,
      subject: emailContent.subject,
      text: emailContent.text,
      html: emailContent.html,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Send contact notification to admin
const sendContactNotification = async (contactData) => {
  const adminEmail = 'info@tedxjabaltareq.com';
  return await sendEmail(
    adminEmail,
    emailTemplates.contactNotification,
    contactData
  );
};

// Send confirmation email to user
const sendContactConfirmation = async (contactData) => {
  return await sendEmail(
    contactData.email,
    emailTemplates.contactConfirmation,
    contactData
  );
};

// Send custom email
const sendCustomEmail = async (to, subject, message) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"TEDxJabalTareq" <info@tedxjabaltareq.com>`,
      to: to,
      subject: subject,
      text: message,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Custom email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending custom email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendEmail,
  sendContactNotification,
  sendContactConfirmation,
  sendCustomEmail,
  emailTemplates,
};
