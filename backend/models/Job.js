const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  portal: {
    type: String,
    enum: ['linkedin', 'indeed', 'glassdoor', 'github', 'monster', 'direct'],
    required: true
  },
  url: {
    type: String,
    required: true
  },
  salary: {
    min: Number,
    max: Number,
    currency: String
  },
  type: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship', 'remote'],
    default: 'full-time'
  },
  postedDate: {
    type: Date,
    default: Date.now
  },
  savedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

module.exports = mongoose.model('Job', jobSchema);
