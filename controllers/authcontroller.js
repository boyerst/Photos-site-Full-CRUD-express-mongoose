const express = require('express')
const router = express.Router()
// const User = require('../models/user')


router.get('/register', (req, res) => {
  res.send('Register controller working')
})


module.exports = router