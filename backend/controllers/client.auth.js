const User = require('../models/user');
const jwt = require('jsonwebtoken');
const shortid = require('shortid');

// Register new client
const signup = async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).json({ msg: 'User already exists' });
        }

        const { firstName, lastName, email, password, contactNumber } = req.body;

        const newUser = new User({
            firstName,
            lastName,
            email,
            contactNumber,
            username: shortid.generate()
        });

        newUser.password = password; // triggers virtual setter

        await newUser.save();
        return res.status(201).json({ msg: 'User successfully registered!' });
    } catch (error) {
        return res.status(400).json({ msg: 'Something went wrong', error });
    }
};

// Login client
const signin = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ msg: `User doesn't exist` });
        }

        const isAuthenticated = user.authenticate(req.body.password);
        if (isAuthenticated && user.role === 'client') {
            const token = jwt.sign(
                { id: user._id, role: user.role },
                process.env.jwt_secret,
                { expiresIn: '2h' }
            );

            const {
                _id,
                firstName,
                lastName,
                profilePicture,
                email,
                role,
                fullName,
                username,
                contactNumber
            } = user;

            res.cookie('token', token, {
                httpOnly: true,
                expires: new Date(Date.now() + 2 * 60 * 60 * 1000) // 2h
            });

            return res.status(200).json({
                token,
                user: {
                    _id,
                    firstName,
                    lastName,
                    profilePicture,
                    email,
                    role,
                    fullName,
                    username,
                    contactNumber
                }
            });
        } else {
            return res.status(400).json({ msg: 'Invalid password or role' });
        }
    } catch (error) {
        return res.status(400).json({ msg: 'Something went wrong', error });
    }
};

// Get client profile
const UserProfile = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: `User not found` });
        }

        const {
            _id,
            fullName,
            firstName,
            lastName,
            profilePicture,
            email,
            role,
            username,
            contactNumber,
            createdAt
        } = user;

        return res.status(200).json({
            user: {
                _id,
                fullName,
                firstName,
                lastName,
                profilePicture,
                email,
                role,
                username,
                contactNumber,
                createdAt
            }
        });
    } catch (error) {
        return res.status(404).json({ msg: 'Something went wrong', error });
    }
};

// Logout client
const signout = (req, res) => {
    res.clearCookie('token');
    return res.status(200).json({ msg: 'Sign-out successfully!' });
};

module.exports = {
    signup,
    signin,
    signout,
    UserProfile
};
