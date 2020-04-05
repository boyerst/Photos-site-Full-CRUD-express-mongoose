const express = require('express')
const router = express.Router()





router.get('/', (req, res) => {
  res.send('Photos controller working')
})



//PHOTO NEW ROUTE: GET /photos/new 
router.get('/new', (req, res) => {
  res.render('photos/new.ejs')
})


module.exports = router  