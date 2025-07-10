import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../models/UserModel.js';
import jwt from 'jsonwebtoken';

// Generate JWT
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Route for user login
const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    // ✅ Validate input
    if (!email || !password) {
      return res.json({ success: false, message: 'Email and password are required' });
    }

    // ✅ Normalize email
    email = email.toLowerCase();

    const exists = await userModel.findOne({ email: normalizedEmail });const newUser = new userModel({
      name,
      email: normalizedEmail,
      password: hashedPassword
    });

    if (!user) {
      return res.json({ success: false, message: 'User does not exist' });
    }

    // ✅ Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: 'Invalid credentials' });
    }

    // ✅ Generate JWT token
    const token = createToken(user._id);

    return res.json({ success: true, token });
  } catch (error) {
    console.error('Login Error:', error.message);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Route for user register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate fields
    if (!name || !email || !password) {
      return res.json({ success: false, message: 'All fields are required' });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'Please enter a valid email' });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: 'Please enter a strong password' });
    }

    // Check if user exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    // Generate token
    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Route for admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' });
      return res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login Error:', error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, adminLogin };
