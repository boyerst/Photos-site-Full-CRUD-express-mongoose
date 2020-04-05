require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT

// CONNECT TO DB
require('./db/db')

// MIDDLEWARE
app.use(express.static('public'))

// CONTROLLERS
const photoController = require('./controllers/photoController.js')
const userController = require('./controllers/userController.js')

app.use('/photos', photoController)
app.use('/users', userController)



app.get('/', (req, res) => {
  res.render('home.ejs')
})


app.get('*', (req, res) => {
  res.status(404).render('404.ejs')
})




app.listen(PORT, () => {
  const d = new Date()
  console.log(`${d.toLocaleString()}: Server running on port ${PORT}`)
})