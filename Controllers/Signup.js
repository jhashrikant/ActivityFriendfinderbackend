const bcrypt = require('bcrypt');
const User = require('../Models/UserModel');
const connectToMongoDB = require('../db/Mongo'); // Make sure to import your DB connection function

const Signup = async (req, res) => {
  console.log('Received data:', req.body); // Log the incoming data
  try {
    // Connect to MongoDB
    await connectToMongoDB();

    // Destructure request body
    const { name, email, password,activities ,location} = req.body;

    // Validate user input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please enter all required fields.", response: false });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User with that email already exists. Use a different email.', response: false });
    }

    // Hash the password
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10; // Default to 10 if not set
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create and save the new user
    const user = new User({ name, email, password: hashedPassword ,activities,location});
    await user.save();

    // Respond with success message
    res.status(201).json({ message: 'User created successfully.', user, response: true });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: 'Error creating user.', error: error.message, response: false });
  }
}

module.exports = Signup;
