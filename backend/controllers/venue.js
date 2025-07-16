const Venue = require('../models/venue');
const Deal = require('../models/deal');
const slugify = require('slugify');

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

const createVenue = async (req, res) => {
    try {
        const { venueName, address, location, category, price, description } = req.body;
        const ownerInfo = {
            ownerName: req.user.fullName,
            contactNumber: req.user.contactNumber
        };

        let venuePictures = [];
        if (req.files.length > 0) {
            venuePictures = req.files.map(file => ({ img: file.filename }));
        }

        const venue = new Venue({
            venueName,
            slug: slugify(venueName),
            address,
            description,
            location,
            category,
            price,
            venuePictures,
            ownerId: req.user.id,
            ownerInfo
        });

        const savedVenue = await venue.save();
        res.status(201).json({ _venue: savedVenue, files: req.files });
    } catch (error) {
        res.status(400).json({ msg: `While saving venue something went wrong`, error });
    }
};

const getVenueByVenueId = async (req, res) => {
    try {
        const { venueId } = req.params;
        if (!venueId) return res.status(400).json({ msg: `Venue doesn't exist` });

        const venue = await Venue.findById(venueId);
        if (venue) return res.status(200).json({ _venue: venue });
        else return res.status(404).json({ msg: 'Venue not found' });
    } catch (error) {
        res.status(400).json({ msg: `Something went wrong`, error });
    }
};

const getAllVenuesByOwnerId = async (req, res) => {
    try {
        const { ownerId } = req.params;
        if (!ownerId) return res.status(400).json({ msg: `Owner ID is required` });

        const venues = await Venue.find({ ownerId });
        res.status(200).json({ _allvenues: venues });
    } catch (error) {
        res.status(400).json({ msg: `Something went wrong`, error });
    }
};

const getAllVenues = async (req, res) => {
    try {
        const allVenues = await Venue.find({});
        if (allVenues) return res.status(200).json({ allVenues });
        else return res.status(400).json({ msg: `Something happened while fetching all venues` });
    } catch (error) {
        res.status(400).json({ msg: `Error fetching venues`, error });
    }
};

const checkAvailability = async (req, res) => {
    try {
        const { venueId, eventDate } = req.body;
        const deals = await Deal.find({ venueId, eventDate });

        if (isEmpty(deals)) {
            return res.status(200).json({ msg: "No deal found, Available" });
        } else {
            return res.status(200).json({ msg: "Venue is booked for date, choose another date" });
        }
    } catch (error) {
        res.status(400).json({ msg: "Something went wrong", error });
    }
};

module.exports = {
    createVenue,
    getVenueByVenueId,
    getAllVenuesByOwnerId,
    getAllVenues,
    checkAvailability
};
