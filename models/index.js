const sequelize = require('../config/sequelize');
const User = require('./user');
const Task = require('./task');
const Role = require('./role');
const Notification = require('./notification');
const Assignment = require('./assignment');

// Initialize and associate models
User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

Role.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(Role, { foreignKey: 'roleId' });

Task.hasMany(Assignment, { foreignKey: 'taskId' });
Assignment.belongsTo(Task, { foreignKey: 'taskId' });

User.hasMany(Assignment, { foreignKey: 'userId' });
Assignment.belongsTo(User, { foreignKey: 'userId' });

Notification.belongsTo(User, { foreignKey: 'userId' });

// Synchronize the models with the database
const syncDB = async () => {
  await sequelize.sync({ alter: true }); // Adjust database schema to models
};

module.exports = { syncDB, User, Task, Role, Notification, Assignment };
