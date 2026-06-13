const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  shortDescription: {
    type: String,
  },
  category: {
    type: String,
    required: [true, 'Please specify a category'],
  },
  collectionType: {
    type: String,
  },
  images: {
    type: [String],
    default: ['default-product.jpg'],
  },
  material: {
    type: String,
    default: '100% Wool with Cotton Backing',
  },
  size: {
    type: String,
    default: 'Multiple Sizes',
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
  },
  salePrice: {
    type: Number,
  },
  amazonLink: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'published',
  },
  featured: {
    type: Boolean,
    default: false,
  },
  showPricing: {
    type: Boolean,
    default: false,
  },
  enablePurchase: {
    type: Boolean,
    default: false,
  },
  stockStatus: {
    type: String,
    default: 'In Stock',
  },
  colorPalette: {
    type: [String],
  },
  rating: {
    type: Number,
    default: 5,
  },
  reviewsCount: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);
