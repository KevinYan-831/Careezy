const mongoose = require('mongoose');
const { Schema } = mongoose;

const ResumeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  personalInfo: {
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    email: { type: String, required: false },
    phone: String,
    address: String,
    linkedin: String,
    github: String,
    website: String
  },
  education: [{
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    field: String,
    location: String,
    honors: String,
    coursework: String,
    gpa: String,
    startDate: { type: Date },
    endDate: Date,
    current: { type: Boolean, default: false }
  }],
  experience: [{
    title: { type: String },
    company: { type: String },
    location: String,
    type: String,
    description: { type: String },
    achievements: String,
    skills: String,
    startDate: { type: Date },
    endDate: Date,
    current: { type: Boolean, default: false }
  }],
  projects: [{
    name: { type: String, required: true },
    description: { type: String, required: true },
    technologies: String,
    role: String,
    teamSize: String,
    githubUrl: String,
    liveUrl: String,
    highlights: String,
    challenges: String,
    startDate: { type: Date },
    endDate: Date
  }],
  skills: {
    technical: String,
    technicalOther: String,
    soft: String,
    softOther: String,
    certifications: String,
    languages: [{
      language: String,
      proficiency: String
    }]
  },
  activities: [{
    name: String,
    type: String,
    organization: String,
    position: String,
    location: String,
    hoursPerWeek: String,
    description: String,
    achievements: String,
    skillsDeveloped: String,
    startDate: { type: Date },
    endDate: Date,
    current: { type: Boolean, default: false }
  }],
  latexCode: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Resume', ResumeSchema);