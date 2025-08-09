const mongoose = require('mongoose');
const { Schema } = mongoose;

const ResumeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  personalInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    address: String,
    linkedin: String,
    github: String,
    website: String
  },
  education: [{
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    major: String,
    gpa: Number,
    startDate: { type: Date, required: true },
    endDate: Date,
    current: { type: Boolean, default: false }
  }],
  experience: [{
    company: { type: String, required: true },
    position: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: Date,
    current: { type: Boolean, default: false }
  }],
  projects: [{
    name: { type: String, required: true },
    description: { type: String, required: true },
    technologies: [String],
    link: String,
    startDate: { type: Date, required: true },
    endDate: Date
  }],
  skills: {
    technical: [String],
    languages: [String],
    other: [String]
  },
  extracurriculars: [{
    organization: { type: String, required: true },
    role: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: Date
  }],
  latexCode: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Resume', ResumeSchema);