const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    minlength: [2, 'First name must be at least 2 characters'],
    maxlength: [20, 'First name must be less than 20 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    minlength: [2, 'Last name must be at least 2 characters'],
    maxlength: [20, 'Last name must be less than 20 characters']
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    unique: true,
    lowercase: true
  },
  role: {
    type: String,
    enum: ['client', 'dealer', 'admin'],
    default: 'client'
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    unique: true,
    lowercase: true
  },
  hash_password: {
    type: String,
    required: [true, 'Password hash is required']
  },
  profilePicture: {
    type: String,
    default: ''
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact number is required']
  }
}, {
  timestamps: true
});

// Virtual field for password
userSchema.virtual('password')
  .set(function (password) {
    this._plainPassword = password;
    this.hash_password = bcrypt.hashSync(password, SALT_ROUNDS);
  })
  .get(function () {
    return this._plainPassword;
  });

// Virtual field for full name
userSchema.virtual('fullName')
  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  });

// Instance method to authenticate password
userSchema.methods = {
  authenticate(password) {
    return bcrypt.compareSync(password, this.hash_password);
  }
};

module.exports = mongoose.model('User', userSchema);
