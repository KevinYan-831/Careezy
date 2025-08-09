const mongoose = require('mongoose');
const { Schema } = mongoose;

const InternshipSchema = new Schema({
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
  description: {
    type: String,
    required: true
  },
  requirements: [{
    type: String,
    required: true
  }],
  location: {
    type: String,
    required: true
  },
  remote: {
    type: Boolean,
    default: false
  },
  experienceLevel: {
    type: String,
    enum: ['entry', 'intermediate', 'advanced'],
    required: true
  },
  field: {
    type: String,
    required: true
  },
  applicationDeadline: Date,
  applicationUrl: {
    type: String,
    required: true
  },
  salary: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'USD'
    }
  },
  duration: {
    type: String,
    required: true
  },
  startDate: Date,
  tags: [String],
  source: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for search optimization
InternshipSchema.index({ title: 'text', company: 'text', description: 'text' });
InternshipSchema.index({ field: 1, experienceLevel: 1, remote: 1 });

module.exports = mongoose.model('Internship', InternshipSchema);