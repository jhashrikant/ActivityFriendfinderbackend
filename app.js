const express = require('express')
const connectToDb = require('./db/Mongo')
const app = express()
const Signup = require('./Controllers/Signup')
const cors = require('cors')
const bodyParser = require('body-parser');
const Login = require('./Controllers/Login')
const authenticateJWT = require('./helpers/helpers')
const matchUsers = require('./Controllers/Matchusers')
const User = require('./Models/UserModel')


app.use(bodyParser.json());

app.use(cors())
const PORT = 3001
connectToDb()//connection to db checking
app.get('/', (req, res) => {
  res.send("hello")
})


// Routes
app.post("/Signup", Signup)
app.post("/Login", Login)
app.get('/findnearbyfriends/:userId', authenticateJWT, async (req, res) => {
  const userId = req.params.userId;
  const currentUser = await User.findById(userId);  // Use userId from JWT
  if (!currentUser) {
    return res.status(404).json({ message: "User not found", response: false });
  }
  const allUsers = await User.find({ _id: { $ne: req.userId } });  // Exclude current user
  const matches = matchUsers(currentUser, allUsers);
  res.json({ matches, response: true });
});


app.listen(PORT, () => {
  console.log("Server listening on PORT" + PORT)
})
