const express = require('express');
const { requireSignIn, dealerMiddleware } = require('../common_middlewares/index');
const { getAllVenues, createVenue, getVenueByVenueId, getAllVenuesByOwnerId, checkAvailability, editVenue } = require('../controllers/venue');
const router = express.Router();
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');
const fs = require('fs');

// Ensure uploads folder exists
const uploadPath = path.join(path.dirname(__dirname), 'uploads');
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// Routes
router.post('/create-venue', requireSignIn, dealerMiddleware, upload.array('venuePicture'), createVenue);
router.get('/venue/:venueId', getVenueByVenueId);
router.get('/venues/:ownerId', getAllVenuesByOwnerId);
router.get('/all-venues', getAllVenues);
router.get('/available', checkAvailability);
router.patch('/venue/:venueId', requireSignIn, dealerMiddleware, editVenue);


module.exports = router;
