import validator from "validator";
import bcrypt from "bcrypt"
import userModel from '../models/UserModel.js';
import jwt from 'jsonwebtoken';


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET,{expiresIn:'7d'});
}

// Route for user login
const loginUser = async (req, res) => {
   const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      return res.json({ success: true, token });
    } 
    else {
      return res.json({ success: false, message: 'Invalid credentials' });
    }

  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
}

}


//Route for user register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // checking user already exists or not
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        //validate email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })

        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a Strong password" })

        }

        // hashing user password 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });
        const user = await newUser.save()

        // generate token(JWT,)
        const token = createToken(user._id,)
        //respond with token
        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}


// Route for admin login 
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(
        { email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' } // ✅ extended token life
      );

      return res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid email or password" });
    }

  } catch (error) {
    console.error("Login Error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, adminLogin } 