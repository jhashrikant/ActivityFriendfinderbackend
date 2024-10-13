const jwt = require('jsonwebtoken');
const matchUsers = require('../Controllers/Matchusers');
require('dotenv').config()

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log("token", token)
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);  // Verify token
    next();  // Proceed to the next middleware/route
  } catch (error) {
    res.status(400).json({ message: 'Invalid token', response: false });
  }
};

const memoize = (cb) => {
  let cachedData = {};
  return function (...args) {
    let key = JSON.stringify(args)
    console.log("key",key)
    console.log('ached',cachedData)
    if (cachedData[key]) {
      return cachedData[key]
    }
    else {
      let result = cb(...args)
      cachedData[key] = result;
      return result
    }
  }
}
// const add = (a, b) => {
//   return a + b
// }
// let memoizedfn = memoize(add)



module.exports = {
  authenticateJWT,
  memoize
}
