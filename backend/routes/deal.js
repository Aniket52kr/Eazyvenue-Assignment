// const express = require('express');
// const { getDeal, confirmDealsOfUser, confirmDealsOfDealer, checkout, confirmDeal, deleteUnconfirmDeal } = require('../controllers/deal');
// const { requireSignIn, clientMiddleware, dealerMiddleware } = require('../common_middlewares/index')
// const router = express.Router();

// router.post('/checkout', requireSignIn, checkout);
// router.patch('/confirm-deal/:dealId', requireSignIn, confirmDeal);
// router.delete('/delete-unconfirmDeal/:dealId', requireSignIn, deleteUnconfirmDeal);
// router.get('/confirm-deals/:userId', requireSignIn, clientMiddleware, confirmDealsOfUser);
// router.get('/confirm-deals-dealer/:dealerId', requireSignIn, dealerMiddleware, confirmDealsOfDealer);
// router.get('/deal/:dealId', requireSignIn, getDeal);

// module.exports = router;















const express = require('express');
const router = express.Router();

// Middlewares
const { requireSignIn, clientMiddleware, dealerMiddleware } = require('../common_middlewares');

// Controllers
const {
    getDeal,
    confirmDealsOfUser,
    confirmDealsOfDealer,
    checkout,
    confirmDeal,
    deleteUnconfirmDeal
} = require('../controllers/deal');

// @route   POST /api/checkout
// @desc    Initiate booking (checkout)
router.post('/checkout', requireSignIn, checkout);

// @route   PATCH /api/confirm-deal/:dealId
// @desc    Confirm a pending deal
router.patch('/confirm-deal/:dealId', requireSignIn, confirmDeal);

// @route   DELETE /api/delete-unconfirm-deal/:dealId
// @desc    Delete an unconfirmed deal
router.delete('/delete-unconfirm-deal/:dealId', requireSignIn, deleteUnconfirmDeal);

// @route   GET /api/confirm-deals/:userId
// @desc    Get all confirmed deals of a client
router.get('/confirm-deals/:userId', requireSignIn, clientMiddleware, confirmDealsOfUser);

// @route   GET /api/confirm-deals-dealer/:dealerId
// @desc    Get all confirmed deals for a dealer
router.get('/confirm-deals-dealer/:dealerId', requireSignIn, dealerMiddleware, confirmDealsOfDealer);

// @route   GET /api/deal/:dealId
// @desc    Get details of a single deal
router.get('/deal/:dealId', requireSignIn, getDeal);

module.exports = router;
