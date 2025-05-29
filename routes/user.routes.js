const express = require('express');
const { signup, login, getPendingUsers, approveUser, rejectUser } = require('../controllers/user.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.get('/pending', authenticate, authorize(['admin']), getPendingUsers);
router.post('/approve/:id', authenticate, authorize(['admin']), approveUser);
router.post('/reject/:id', authenticate, authorize(['admin']), rejectUser);

module.exports = router;
