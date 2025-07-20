const express = require('express');
const router = express.Router();
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');
const fs = require('fs');

// Middlewares
const { requireSignIn, dealerMiddleware } = require('../common_middlewares');

// Controllers
const {
    getAllVenues,
    createVenue,
    getVenueByVenueId,
    getAllVenuesByOwnerId,
    checkAvailability,
    editVenue,
    getMyVenues,
    deleteVenue
} = require('../controllers/venue');

// Ensure uploads folder exists
const uploadPath = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

// Multer storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadPath),
    filename: (req, file, cb) => cb(null, shortid.generate() + '-' + file.originalname)
});
const upload = multer({ storage });

// ✅ Create Venue
router.post(
    '/create-venue',
    requireSignIn,
    dealerMiddleware,
    upload.array('venuePicture'),
    createVenue
);

// ✅ Get a venue by ID
router.get('/venue/:venueId', getVenueByVenueId);

// ✅ Get all venues by a specific owner (dealer)
router.get('/venues/:ownerId', getAllVenuesByOwnerId);

// ✅ Get all venues (for all users)
router.get('/all-venues', getAllVenues);

// ✅ Check venue availability
router.post('/available', checkAvailability);

// ✅ Edit venue
router.patch(
  '/venue/:venueId',
  requireSignIn,
  dealerMiddleware,
  upload.array('venuePicture'), 
  editVenue
);


// ✅ NEW: Get all venues created by the logged-in dealer
router.get(
  '/my-venues',
  requireSignIn,
  dealerMiddleware,
  getMyVenues
);


router.delete(
  '/:venueId',
  requireSignIn,
  dealerMiddleware,
  deleteVenue
);


module.exports = router;
