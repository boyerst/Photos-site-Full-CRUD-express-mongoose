const express = require('express')
const router = express.Router()
const Photo = require('../models/photo.js')
const User = require('../models/user')



//USER SHOW ROUTE: GET /users/:userId/photos

router.get('/:id/user', async (req, res, next) => {
  try {
    const foundUser = await User.findById(req.params.id)
    const foundPhotos  = await Photo.find({ user: req.params.id }).populate('user')
    const username = req.session.username
    res.render('users/show.ejs', {
      username: foundUser,
      photo: foundPhotos,
      userId: req.session.userId
    })
  } catch (error) {
    next (error)
  }
})
























module.exports = router  