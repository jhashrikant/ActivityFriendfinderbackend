const mongoose = require('mongoose')
require('dotenv').config()

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL,{
      useNewUrlParser: true,
    })
    console.log("connected")
  } catch (error) {
    console.log(error)
    process.exit(1)
  }

}
module.exports = connectToDb