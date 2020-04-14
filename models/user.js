const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    ref: 'User'
  },
  password: {
    type: String,
    required: true
  },
  firstName: String,
  lastName: String,
  email: String
})


//REMINDER: 'User' now = name of collection
const User = mongoose.model('User', userSchema)


module.exports = User 