const express = require('express')
const router = express.Router()





router.get('/', (req, res) => {
  res.send('Photos controller working')
})



//PHOTO NEW ROUTE: GET /photos/new 
router.get('/new', (req, res) => {
  res.render('photos/new.ejs')
})

//PHOTO CREATE ROUTE: POST /photos
 router.post('/', (req, res, next) => {
 	res.send("this is the create route!")
 })


module.exports = router  