import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now(),
  },
  from: {
    type: String,
    required: true,
  },
  to: String,
  msg: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Message', MessageSchema)
