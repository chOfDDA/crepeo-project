const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  photoUrl:   { type: String },
  profession: { type: String },
  bio:        { type: String },
}, {
  timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);
