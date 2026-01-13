const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  salary: {
    min: Number,
    max: Number,
    currency: { type: String, default: 'USD' }
  },
  description: { type: String, required: true },
  requirements: [String],
  skills: [String],
  category: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship', 'remote']
  },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  applications: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    appliedAt: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'accepted', 'rejected'],
      default: 'pending'
    }
  }]
});

module.exports = mongoose.model('Job', JobSchema);
