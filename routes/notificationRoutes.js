const express = require('express');
const { getNotifications, updateNotificationSettings, sendNotification } = require('../controllers/notificationController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

// Get user notification settings
router.get('/', authMiddleware, getNotifications);

// Update notification settings (e.g., email, SMS)
router.put('/settings', authMiddleware, updateNotificationSettings);

// Send notification route
//router.post('/send', authMiddleware, sendNotification);

module.exports = router;
