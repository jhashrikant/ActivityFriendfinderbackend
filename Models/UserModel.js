const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique:true

  },
  password: {
    type: String,
    required: true
  },
  activities: {
    type: [String],
    required: true
  },
  location: {
    type: { type: String, default: "Point" }, // GeoJSON type
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  }
}, { timestamps: true })
mongoose.models = {}

module.exports = mongoose.model('User', userSchema)