const express = require('express');
const router = express.Router();

// Middleware
const { requireSignIn, clientMiddleware } = require('../common_middlewares');

// Controllers
const { signup, signin, UserProfile, signout } = require('../controllers/client.auth');

// @route   POST /api/client/signup
// @desc    Register a new client
router.post('/signup', signup);

// @route   POST /api/client/signin
// @desc    Client login
router.post('/signin', signin);

// @route   POST /api/client/signout
// @desc    Logout client
router.post('/signout', requireSignIn, signout);

// @route   GET /api/client/:userId
// @desc    Get client profile
router.get('/:userId', requireSignIn, clientMiddleware, UserProfile);

module.exports = router;
