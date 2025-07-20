const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  review: { type: String, required: true }
}, { timestamps: true });

const pictureSchema = new mongoose.Schema({
  img: { type: String, required: true }
});

const venueSchema = new mongoose.Schema({
  venueName: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  description: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100
  },
  location: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  venuePictures: [pictureSchema], // expects [{ img: 'filename.jpg' }]
  reviews: [reviewSchema],
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ownerInfo: {
    ownerName: { type: String },
    contactNumber: { type: String }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Venue', venueSchema);
