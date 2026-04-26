const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware'); // Import the bouncer

router.post('/register', registerUser);
router.post('/login', loginUser);

// Notice we put 'protect' BEFORE 'getMe'. 
// The bouncer checks the ticket before letting them inside.
router.get('/me', protect, getMe);

module.exports = router;