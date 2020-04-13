const mongoose = require('mongoose')


const photoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  url:  {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})


const Photo = mongoose.model('Photo', photoSchema)


module.exports = Photo 