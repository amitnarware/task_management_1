const { Role } = require('../models');

const roleMiddleware = (requiredRoles) => {
  return async (req, res, next) => {
    try {
      console.log('Checking role for roleId:', req.roleId); // Debug log
      const role = await Role.findByPk(req.roleId); // Get role details from the database using roleId
      if (!role || !requiredRoles.includes(role.name)) {
        console.log('Access denied for role:', role ? role.name : 'No role found'); // Debug log
        return res.status(403).json({ error: 'Access denied' });
      }
      next();
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  };
};

module.exports = { roleMiddleware };

