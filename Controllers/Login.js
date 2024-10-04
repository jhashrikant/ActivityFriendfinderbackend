var jwt = require('jsonwebtoken');
const User = require('../Models/UserModel');
const bcrypt = require('bcrypt');
const connectToMongoDB = require('../db/Mongo');
require('dotenv').config()

const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    await connectToMongoDB()
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found', response: false });

    // Compare the hashed password with the entered password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '5m' });
      res.status(200).json({ message: 'Logged in', token, user, response: true });
    } else {
      return res.status(400).json({ message: 'Invalid credentials', response: false });
    }

  } catch (error) {
    console.error("Login error:", error); // Log the error for debugging
    res.status(500).json({ message: 'Login failed', error, response: false });
  }
};
module.exports = Login