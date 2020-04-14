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
    console.log(username, "this is username")
    console.log(foundUser, "this is foundUser")
    res.render('users/show.ejs', {
      user: foundUser,
      username: username,
      photo: foundPhotos,
      userId: req.session.userId
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



// DELETE USER ROUTE: DELETE /users/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const deletePhotos = await Photo.remove({ user: req.params.id })
    const deleteUser = await User.findOneAndRemove(req.params.id)
    console.log('delete route for user');
    res.redirect('/auth/register')
  } catch (error) {
    next (error)
  }


})
















module.exports = router  