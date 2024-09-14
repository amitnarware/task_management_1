const { User, Role } = require('../models');

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      include: [{ model: Role, attributes: ['name'] }],
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch profile', details: error.message });
  }
};

// Get all users (Admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ include: [{ model: Role, attributes: ['name'] }] });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch users', details: error.message });
  }
};

// Update user (Admin or user themselves)
const updateUser = async (req, res) => {
 try {
   const user = await User.findByPk(req.params.id);
   if (!user) return res.status(404).json({ error: 'User not found' });

   // Update logic (e.g., req.body)
   await user.update(req.body);
   res.status(200).json({ message: 'User updated successfully', user });
 } catch (error) {
   res.status(500).json({ error: 'Unable to update user', details: error.message });
 }
};

// Delete user (Admin only)
const deleteUser = async (req, res) => {
 try {
   const user = await User.findByPk(req.params.id);
   if (!user) return res.status(404).json({ error: 'User not found' });

   await user.destroy();
   res.status(200).json({ message: 'User deleted successfully' });
 } catch (error) {
   res.status(500).json({ error: 'Unable to delete user', details: error.message });
 }
};

module.exports = { getUserProfile, getAllUsers, updateUser, deleteUser };

