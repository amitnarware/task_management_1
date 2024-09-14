const express = require('express');
const { createTask, updateTask, deleteTask, getAllTasks, assignTask } = require('../controllers/taskController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const {roleMiddleware} = require("../middlewares/roleMiddleware")
const { validationHandler } = require('../utils/validation');
const router = express.Router();



/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management operations
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Successfully retrieved tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       dueDate:
 *                         type: string
 *                       priority:
 *                         type: string
 *                       status:
 *                         type: string
 *                       userId:
 *                         type: integer
 *       500:
 *         description: Failed to retrieve tasks
 */


// Get all tasks
router.get('/', authMiddleware, getAllTasks);


/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               dueDate:
 *                 type: string
 *               priority:
 *                 type: string
 *               status:
 *                 type: string
 *               userId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 task:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     dueDate:
 *                       type: string
 *                     priority:
 *                       type: string
 *                     status:
 *                       type: string
 *                     userId:
 *                       type: integer
 *       500:
 *         description: Failed to create task
 */

// Create a new task (Manager or Admin only)
router.post('/', [authMiddleware, roleMiddleware(['Manager', 'Admin'])], validationHandler, createTask);


/**
 * @swagger
 * /tasks/{taskId}:
 *   put:
 *     summary: Update an existing task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               dueDate:
 *                 type: string
 *               priority:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 task:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     dueDate:
 *                       type: string
 *                     priority:
 *                       type: string
 *                     status:
 *                       type: string
 *                     userId:
 *                       type: integer
 *       500:
 *         description: Failed to update task
 */

// Update task
router.put('/:taskId', [authMiddleware, roleMiddleware(['Manager', 'Admin'])], validationHandler, updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Failed to delete task
 */

// Delete task
router.delete('/:id', authMiddleware, deleteTask);


// Assign task to user
//router.post('/assign', [authMiddleware, roleMiddleware('Manager')], assignTask);

module.exports = router;
