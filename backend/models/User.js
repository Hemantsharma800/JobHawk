const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  googleId: String,
  photo: String,
  userType: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  connectedPortals: {
    linkedin: { type: Boolean, default: false },
    indeed: { type: Boolean, default: false },
    glassdoor: { type: Boolean, default: false },
    github: { type: Boolean, default: false },
    monster: { type: Boolean, default: false }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
