import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim:true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // ✅ Enforces email uniqueness
    lowerCase:true,
    trim:true,
  },
  password: {
    type: String,
    required: true,
  },
  cartData: {
    type: Object,
    default: {}, // ✅ Stores cart state per user
  },
}, {
  timestamps: true, // ✅ Adds createdAt and updatedAt
  minimize: false,  // ✅ Ensures empty objects (like cartData) are saved
});
const User = mongoose.model('User', userSchema);

export default User;
