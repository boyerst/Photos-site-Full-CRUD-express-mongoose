const express = require('express')
const router = express.Router()





router.get('/', (req, res) => {
  res.send('Photos controller working')
})




module.exports = router  