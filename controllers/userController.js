const express = require('express')
const router = express.Router()
const Photo = require('../models/photo.js')
const User = require('../models/user')




//USER INDEX ROUTE: 

router.get('/', async (req, res, next) => {

  try {
    const foundUsers = await User.find({})
    res.render('users/index.ejs', {
      users: foundUsers
      })
  } catch (error) {
    next (error)
  }
})






//USER SHOW ROUTE: GET /users/:userId/photos

router.get('/:id/user', async (req, res, next) => {
  try {
    const foundUser = await User.findById(req.params.id)
    const foundPhotos  = await Photo.find( {user: req.params.id} ).populate('user')
    const username = req.session.username
    res.render('users/show.ejs', {
      user: foundUser,
      photo: foundPhotos,
      userId: req.session.userId,
      username: username
    })
  } catch (error) {
    next (error)
  }
})




// router.get('/:id/user', async (req, res, next) => {
//   try {
//     const foundUser = await User.findById(req.params.id)
//     const foundPhotos  = await Photo.find( {user: req.params.id} ).populate('user')
//     // const foundPhotos  = await Photo.findById(req.params.id).populate('user')
//     const username = req.session.username
//     const url = req.params.url
//     res.render('users/show.ejs', {
//       user: foundUser,
//       photos: foundPhotos,
//       userId: req.session.userId,
//       username: username,
//       // url: url

//     })
//   } catch (error) {
//     next (error)
//   }
// })




















module.exports = router  