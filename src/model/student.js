const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  userId: { type : mongoose.Schema.Types.ObjectId, ref : "User"},
  subject: {
    type: String,
    required: true,
    trim: true
  },
  marks:{
    type:Number,
    required:true
  }
}, { timestamps: true })


module.exports = mongoose.model('Student', studentSchema)