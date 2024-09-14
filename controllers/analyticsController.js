const { User, Task, Assignment, Role } = require('../models');
const { Op } = require('sequelize');

// Get overall task completion rate
const getTaskCompletionRate = async (req, res) => {
  try {
    const totalTasks = await Task.count();
    const completedTasks = await Task.count({ where: { status: 'completed' } });

    const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    res.status(200).json({ totalTasks, completedTasks, completionRate: `${completionRate.toFixed(2)}%` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch task completion rate', details: error.message });
  }
};

// Get user activity analytics
const getUserActivity = async (req, res) => {
  try {
    const activeUsers = await User.count({
      where: {
        lastLogin: { [Op.gte]: new Date(new Date() - 30 * 24 * 60 * 60 * 1000) }, // Users active in the last 30 days
      },
    });
    const totalUsers = await User.count();
    const inactiveUsers = totalUsers - activeUsers;

    res.status(200).json({ totalUsers, activeUsers, inactiveUsers });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user activity', details: error.message });
  }
};

// Get task distribution by role
const getTaskDistributionByRole = async (req, res) => {
  try {
    const taskDistribution = await Task.findAll({
      attributes: ['userId', [sequelize.fn('COUNT', sequelize.col('userId')), 'taskCount']],
      group: ['userId'],
      include: [{ model: User, include: [{ model: Role }] }],
    });

    const result = taskDistribution.map((item) => ({
      userId: item.userId,
      taskCount: item.dataValues.taskCount,
      role: item.User.Role.name,
    }));

    res.status(200).json({ taskDistribution: result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch task distribution by role', details: error.message });
  }
};

// Get task completion trends over time (e.g., weekly/monthly)
const getTaskCompletionTrends = async (req, res) => {
  try {
    const completedTasks = await Task.findAll({
      where: { status: 'completed' },
      attributes: [
        [sequelize.fn('DATE_TRUNC', 'week', sequelize.col('updatedAt')), 'week'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'taskCount'],
      ],
      group: ['week'],
    });

    res.status(200).json({ trends: completedTasks });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch task completion trends', details: error.message });
  }
};

module.exports = {
  getTaskCompletionRate,
  getUserActivity,
  getTaskDistributionByRole,
  getTaskCompletionTrends,
};

