const { Task, Assignment } = require('../models');

// Create a new task
const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;
    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      status: 'pending',
      userId: req.userId,
    });
    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task', details: error.message });
  }
};

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch tasks', details: error.message });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, dueDate, priority, status } = req.body;

    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    task.title = title;
    task.description = description;
    task.dueDate = dueDate;
    task.priority = priority;
    task.status = status;

    await task.save();

    res.status(200).json({ message: 'Task updated successfully', task });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task', details: error.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await task.destroy();
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task', details: error.message });
  }
};

module.exports = { createTask, getAllTasks, updateTask, deleteTask };
