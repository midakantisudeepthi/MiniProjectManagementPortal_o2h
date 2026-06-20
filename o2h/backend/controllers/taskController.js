const Task = require('../models/taskModel');

// Fetch tasks for logged-in user
exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.getAll(req.query.status, req.userId);
    res.json({ success: true, data: tasks });
  } catch (error) {
    next(error);
  }
};

// Create a task for logged-in user
exports.createTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }
    if (!description || description.trim().length < 10) {
      return res.status(400).json({ success: false, message: 'Description must be at least 10 characters' });
    }
    if (!status || !['Pending', 'In Progress'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status parameter' });
    }

    const task = await Task.create({ 
      title: title.trim(), 
      description: description.trim(), 
      status, 
      userId: req.userId 
    });
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

// Update status for user's task
exports.updateTaskStatus = async (req, res, next) => {
  try {
    const task = await Task.updateStatus(req.params.id, req.body.status, req.userId);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    res.json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

// Delete user's task
exports.deleteTask = async (req, res, next) => {
  try {
    const deleted = await Task.delete(req.params.id, req.userId);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    res.json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};
