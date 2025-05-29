const express = require('express');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const { createTask, getAllTasks, getMyTasks, updateTaskStatus } = require('../controllers/task.controller');
const router = express.Router();

router.post('/', authenticate, authorize(['admin']), createTask);
router.get('/', authenticate, authorize(['admin']), getAllTasks);

router.get('/my', authenticate, authorize(['user']), getMyTasks);
router.patch('/:id/status', authenticate, authorize(['user']), updateTaskStatus);

module.exports = router;
