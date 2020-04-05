require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT

// MIDDLEWARE
app.use(express.static('public'))


app.get('/', (req, res) => {
  res.render('home.ejs')
})






app.listen(PORT, () => {
  const d = new Date()
  console.log(`${d.toLocaleString()}: Server running on port ${PORT}`)
})