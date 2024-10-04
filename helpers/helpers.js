const jwt = require('jsonwebtoken');
require('dotenv').config()

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log("token",token)
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);  // Verify token
    next();  // Proceed to the next middleware/route
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' ,response:false});
  }
};
module.exports = authenticateJWT
