const express = require('express');
const router = express.Router();

// Middlewares
const { requireSignIn, dealerMiddleware } = require('../common_middlewares');

// Controllers
const { signup, signin, DealerProfile, signout } = require('../controllers/dealer.auth');

// @route   POST /api/dealer/signup
// @desc    Register a new dealer
router.post('/signup', signup);

// @route   POST /api/dealer/signin
// @desc    Dealer login
router.post('/signin', signin);

// @route   POST /api/dealer/signout
// @desc    Dealer logout
router.post('/signout', requireSignIn, signout);

// @route   GET /api/dealer/:userId
// @desc    Get dealer profile
router.get('/:userId', requireSignIn, dealerMiddleware, DealerProfile);

module.exports = router;
