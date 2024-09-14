const express = require('express');
const {
  getTaskCompletionRate,
  getUserActivity,
  getTaskDistributionByRole,
  getTaskCompletionTrends,
} = require('../controllers/analyticsController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const {roleMiddleware} = require("../middlewares/roleMiddleware")
const router = express.Router();

// Get task completion rate
router.get('/task-completion-rate', [authMiddleware, roleMiddleware('Admin')], getTaskCompletionRate);

// Get user activity analytics
router.get('/user-activity', [authMiddleware, roleMiddleware('Admin')], getUserActivity);

// Get task distribution by role
router.get('/task-distribution', [authMiddleware, roleMiddleware('Admin')], getTaskDistributionByRole);

// Get task completion trends
router.get('/task-trends', [authMiddleware, roleMiddleware('Admin')], getTaskCompletionTrends);

module.exports = router;
