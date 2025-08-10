const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  profileType: {
    type: String,
    enum: ['freshman', 'current_student', 'student'],
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);