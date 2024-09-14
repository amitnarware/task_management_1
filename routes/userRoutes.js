const express = require('express');
const { getUserProfile, getAllUsers, updateUser, deleteUser } = require('../controllers/userController');
console.log({ getUserProfile, getAllUsers, updateUser, deleteUser });
const { authMiddleware} = require('../middlewares/authMiddleware');
const {roleMiddleware} = require("../middlewares/roleMiddleware")
console.log({ authMiddleware, roleMiddleware });
const { validationHandler } = require('../utils/validation');
const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and profile operations
 */

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with the user's profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
*/

// Get user profile
router.get('/profile', authMiddleware,getUserProfile);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       403:
 *         description: Forbidden, admin access only
 *       500:
 *         description: Internal server error
 */

// Admin route: Get all users
router.get('/', [authMiddleware, roleMiddleware('Admin')],getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user details (Admin only)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       description: The updated user object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

// // Admin route: Update user
 router.put('/:id', [authMiddleware, roleMiddleware('Admin')],updateUser);


/**
 * @swagger
 * /users/profile:
 *   put:
 *     summary: Update the user’s own profile
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: The updated profile data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       500:
 *         description: Internal server error
 */

// // Update user profile (optional validation)
 router.put('/profile', authMiddleware, validationHandler,updateUser);

 /**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user (Admin only)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
// // Admin route: Delete user
 router.delete('/:id', [authMiddleware, roleMiddleware('Admin')], deleteUser);

module.exports = router;
