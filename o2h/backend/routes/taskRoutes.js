const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Task Routes
router.route('/')
  .get(taskController.getTasks)
  .post(taskController.createTask);

router.route('/:id')
  .put(taskController.updateTaskStatus)
  .delete(taskController.deleteTask);

module.exports = router;
