import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true       
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: Array,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  subCategory: {
    type: String,
    required: true
  },
  sizes: {
    type: [String],
    required: true
  },
  bestseller: {
    type: Boolean
  },
  date: {
    type: Number,
    required: true
  },
});

const Product = mongoose.model('Product', productsSchema);

export default Product; // ✅ correct variable name
