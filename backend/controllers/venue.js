const Venue = require('../models/venue');
const Deal = require('../models/deal');
const slugify = require('slugify');

// Utility
const isEmpty = obj => Object.keys(obj).length === 0;

// ✅ Create a new venue
const createVenue = async (req, res) => {
  try {
    const { venueName, address, location, category, price, description } = req.body;

    if (!venueName || !address || !location || !category || !price || !description) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const slug = slugify(venueName, { lower: true });

    const existing = await Venue.findOne({ slug });
    if (existing) {
      return res.status(409).json({ msg: "Venue with similar name already exists" });
    }

    const ownerInfo = {
      ownerName: req.user.fullName,
      contactNumber: req.user.contactNumber
    };

    let venuePictures = [];
    if (req.files?.length > 0) {
      venuePictures = req.files.map(file => ({ img: file.filename }));
    }

    const venue = new Venue({
      venueName,
      slug,
      address,
      description,
      location,
      category,
      price,
      venuePictures,
      ownerId: req.user._id || req.user.id,
      ownerInfo
    });

    const savedVenue = await venue.save();
    return res.status(201).json({ msg: "Venue created successfully", venue: savedVenue });
  } catch (error) {
    console.error("Create Venue Error:", error);
    return res.status(500).json({ msg: "Failed to create venue", error: error.message });
  }
};

// ✅ Get venue by ID
const getVenueByVenueId = async (req, res) => {
  try {
    const { venueId } = req.params;
    if (!venueId) return res.status(400).json({ msg: "Venue ID is required" });

    const venue = await Venue.findById(venueId);
    if (!venue) return res.status(404).json({ msg: "Venue not found" });

    return res.status(200).json({ venue });
  } catch (error) {
    console.error("Get Venue Error:", error);
    return res.status(500).json({ msg: "Failed to fetch venue", error: error.message });
  }
};

// ✅ Get all venues by specific dealer
const getAllVenuesByOwnerId = async (req, res) => {
  try {
    const { ownerId } = req.params;
    if (!ownerId) return res.status(400).json({ msg: "Owner ID is required" });

    const venues = await Venue.find({ ownerId });
    return res.status(200).json({ venues });
  } catch (error) {
    console.error("Get Owner Venues Error:", error);
    return res.status(500).json({ msg: "Failed to fetch owner's venues", error: error.message });
  }
};

// ✅ Get all venues (public)
const getAllVenues = async (req, res) => {
  try {
    const allVenues = await Venue.find({});
    return res.status(200).json({ venues: allVenues });
  } catch (error) {
    console.error("Get All Venues Error:", error);
    return res.status(500).json({ msg: "Failed to fetch all venues", error: error.message });
  }
};

// ✅ Check venue availability for a specific date
const checkAvailability = async (req, res) => {
  try {
    const { venueId, eventDate } = req.body;

    if (!venueId || !eventDate) {
      return res.status(400).json({ msg: "Venue ID and event date are required" });
    }

    const deals = await Deal.find({ venueId, eventDate });
    const available = isEmpty(deals);

    return res.status(200).json({
      available,
      msg: available ? "Venue is available on this date" : "Venue is already booked on this date"
    });
  } catch (error) {
    console.error("Check Availability Error:", error);
    return res.status(500).json({ msg: "Failed to check availability", error: error.message });
  }
};


// ✅ Edit venue (only owner can edit)
const editVenue = async (req, res) => {
  try {
    const { venueId } = req.params;
    const venue = await Venue.findById(venueId);

    if (!venue) return res.status(404).json({ msg: "Venue not found" });

    const loggedInId = req.user._id?.toString() || req.user.id?.toString();
    if (venue.ownerId.toString() !== loggedInId) {
      return res.status(403).json({ msg: "Unauthorized: Not the venue owner" });
    }

    // Update editable fields
    const editableFields = ["name", "location", "price", "capacity", "description"];
    editableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        venue[field] = req.body[field];
      }
    });

    // Update slug if name is changed
    if (req.body.name) {
      venue.slug = slugify(req.body.name, { lower: true });
    }

    // Update images if any new ones uploaded
    if (req.files && req.files.length > 0) {
      venue.venuePicture = req.files.map((file) => file.filename);
    }

    const updatedVenue = await venue.save();
    return res.status(200).json({ msg: "Venue updated successfully", venue: updatedVenue });

  } catch (error) {
    console.error("Edit Venue Error:", error);
    return res.status(500).json({ msg: "Failed to update venue", error: error.message });
  }
};


// ✅ Get venues for logged-in dealer
const getMyVenues = async (req, res) => {
  try {
    const dealerId = req.user._id || req.user.id;
    if (!dealerId) return res.status(400).json({ msg: "Unauthorized access" });

    const venues = await Venue.find({ ownerId: dealerId });

    return res.status(200).json({ venues });
  } catch (error) {
    console.error('Get My Venues Error:', error);
    res.status(500).json({ msg: 'Failed to fetch your venues', error: error.message });
  }
};


// ✅ delete venue
const deleteVenue = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.venueId);

    if (!venue) {
      return res.status(404).json({ message: "Venue not found." });
    }

    // Use ownerId for ownership check
    const loggedInId = req.user._id?.toString() || req.user.id?.toString();
    if (venue.ownerId.toString() !== loggedInId) {
      return res.status(403).json({ message: "Unauthorized to delete this venue." });
    }

    await venue.deleteOne();
    res.status(200).json({ message: "Venue deleted successfully." });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Server error." });
  }
};


module.exports = {
  createVenue,
  getVenueByVenueId,
  getAllVenuesByOwnerId,
  getAllVenues,
  checkAvailability,
  editVenue,
  getMyVenues,
  deleteVenue
};
