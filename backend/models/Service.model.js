import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    maxlength: 200
  },
  category: {
    type: String,
    required: true,
    enum: ['expertise', 'evaluation', 'laboratory', 'other']
  },
  subcategory: {
    type: String
  },
  price: {
    type: Number,
    default: 0
  },
  priceFrom: {
    type: Number
  },
  priceTo: {
    type: Number
  },
  duration: {
    type: String,
    default: 'По договоренности'
  },
  image: {
    type: String
  },
  images: [{
    type: String
  }],
  features: [{
    type: String
  }],
  cities: [{
    type: String,
    enum: ['spb', 'moscow', 'novgorod', 'petrozavodsk']
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Generate slug before saving
serviceSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

export default mongoose.model('Service', serviceSchema);
