const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
},
  password: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true })


module.exports = mongoose.model('User', userSchema)