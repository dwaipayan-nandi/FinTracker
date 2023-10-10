// routes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Registration endpoint
router.post('/register', authController.registerUser);

// Login endpoint
router.post('/login', authController.loginUser);

// Protected route (requires authentication)
router.get('/protected-route', authMiddleware.authenticateToken, authController.protectedRoute);

module.exports = router;
