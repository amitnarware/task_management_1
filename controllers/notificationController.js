const { Notification } = require('../models');
const sgMail = require('@sendgrid/mail');
const twilio = require('twilio');
require('dotenv').config();

// Get user notification settings
const getNotifications = async (req, res) => {
  try {
    const notification = await Notification.findOne({ where: { userId: req.userId } });

    if (!notification) {
      return res.status(404).json({ error: 'Notification settings not found' });
    }

    res.status(200).json({ notification });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get notifications', details: error.message });
  }
};

// Update notification settings
const updateNotificationSettings = async (req, res) => {
  try {
    const { preference } = req.body;
    const notification = await Notification.findOne({ where: { userId: req.userId } });

    if (!notification) {
      return res.status(404).json({ error: 'Notification settings not found' });
    }

    notification.preference = preference;
    await notification.save();

    res.status(200).json({ message: 'Notification settings updated', notification });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update notification settings', details: error.message });
  }
};



/*
// Set up SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Twilio configuration
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Send notification (email/SMS integration)
const sendNotification = async (req, res) => {
  try {
    const { message, notificationType, recipientEmail, recipientPhone } = req.body;

    if (!message || !notificationType) {
      return res.status(400).json({ error: 'Message and notification type are required' });
    }

    // Send email using SendGrid
    if (notificationType === 'email') {
      if (!recipientEmail) {
        return res.status(400).json({ error: 'Recipient email is required for email notifications' });
      }

      const msg = {
        to: recipientEmail,
        from: 'your-email@example.com', // Your verified SendGrid email
        subject: 'Notification',
        text: message,
      };

      await sgMail.send(msg);
      return res.status(200).json({ message: 'Email notification sent successfully' });
    }

    // Send SMS using Twilio
    if (notificationType === 'sms') {
      if (!recipientPhone) {
        return res.status(400).json({ error: 'Recipient phone number is required for SMS notifications' });
      }

      await twilioClient.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
        to: recipientPhone,
      });
      return res.status(200).json({ message: 'SMS notification sent successfully' });
    }

    return res.status(400).json({ error: 'Invalid notification type. Use either "email" or "sms"' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send notification', details: error.message });
  }
};
*/
module.exports = { updateNotificationSettings, getNotifications };


