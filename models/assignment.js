const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Assignment = sequelize.define('Assignment', {
  taskId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Assignment;
