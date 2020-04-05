require('dotenv').config()
const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const PORT = process.env.PORT

// CONNECT TO DB
require('./db/db')

// MIDDLEWARE
server.use(express.static('public'))
server.use(bodyParser.urlencoded({ extended: false }))

// SESSIONS
server.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false 
}))



// CONTROLLERS
const photoController = require('./controllers/photoController.js')


server.use('/photos', photoController)




server.get('/', (req, res) => {
  res.render('home.ejs')
})


server.get('*', (req, res) => {
  res.status(404).render('404.ejs')
})




server.listen(PORT, () => {
  const d = new Date()
  console.log(`${d.toLocaleString()}: Server running on port ${PORT}`)
})