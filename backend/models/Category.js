const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a category name'],
    unique: true,
    trim: true,
  },
  path: {
    type: String,
    required: [true, 'Please add a URL path'],
    unique: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Category', CategorySchema);
