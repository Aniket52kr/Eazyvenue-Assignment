const User = require('../models/user');
const jwt = require('jsonwebtoken');
const shortid = require('shortid');

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
      username: shortid.generate(),
      role: 'dealer'
    });

    newUser.password = password; // ✅ Trigger virtual setter to hash password

    await newUser.save();
    return res.status(201).json({ msg: 'User successfully registered!' });
  } catch (error) {
    return res.status(500).json({ msg: 'Internal server error during signup', error: error.message });
  }
};


const signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const isAuthenticated = user.authenticate(req.body.password);

    if (!isAuthenticated || user.role !== 'dealer') {
      return res.status(401).json({ msg: 'Invalid credentials or role' });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
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
      maxAge: 2 * 60 * 60 * 1000 // 2 hours
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
  } catch (error) {
    return res.status(500).json({ msg: 'Internal server error during signin', error: error.message });
  }
};

const DealerProfile = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ msg: 'User ID is required' });
  }

  try {
    const user = await User.findById(userId);

    if (!user || user.role !== 'dealer') {
      return res.status(404).json({ msg: 'Dealer not found' });
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
    return res.status(500).json({ msg: 'Internal server error during profile fetch', error: error.message });
  }
};

const signout = (req, res) => {
  res.clearCookie('token');
  return res.status(200).json({ msg: 'Sign-out successful!' });
};

module.exports = {
  signup,
  signin,
  signout,
  DealerProfile
};
