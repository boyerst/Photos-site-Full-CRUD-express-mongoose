const express = require('express')
const router = express.Router()





router.get('/', (req, res) => {
  res.send('Users controller working')
})



//PHOTO NEW ROUTE: GET /photos/new 
router.get('/new', (req, res) => {
  res.render('users/new.ejs')
})


module.exports = router  