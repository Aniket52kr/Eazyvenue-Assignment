const User = require('../models/user');
const jwt = require('jsonwebtoken');
const shortid = require('shortid');

const signup = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) return res.status(409).json({ msg: 'User already exists' });

    const { firstName, lastName, email, password, contactNumber } = req.body;

    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      contactNumber,
      username: shortid.generate(),
      role: 'dealer'
    });

    await _user.save();
    return res.status(201).json({ msg: 'User Successfully registered !!' });
  } catch (error) {
    return res.status(400).json({ msg: 'Something went wrong', error });
  }
};

const signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ msg: `User doesn't exist` });

    const isPasswordValid = user.authenticate(req.body.password);
    if (!isPasswordValid || user.role !== 'dealer') {
      return res.status(400).json({ msg: `Invalid Password or Role` });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        fullName: user.fullName,
        contactNumber: user.contactNumber
      },
      process.env.jwt_secret,
      { expiresIn: '2h' }
    );

    const { _id, firstName, lastName, profilePicture, email, role, fullName, username, contactNumber } = user;
    res.cookie('token', token, { expiresIn: '2h' });
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
    return res.status(400).json({ msg: 'Something went wrong', error });
  }
};

const DealerProfile = async (req, res) => {
  const { userId } = req.params;

  if (!userId) return res.status(404).json({ msg: `Dealer doesn't exist` });

  try {
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ msg: `Dealer not found` });

    const { _id, fullName, firstName, lastName, profilePicture, email, role, username, contactNumber, createdAt } = user;
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
    return res.status(400).json({ msg: `Something went wrong`, error });
  }
};

const signout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ msg: `Sign-out Successfully...!` });
};

module.exports = {
  signup,
  signin,
  signout,
  DealerProfile
};
