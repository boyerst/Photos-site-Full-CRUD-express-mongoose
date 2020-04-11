require('dotenv').config()
const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const PORT = process.env.PORT

// CONNECT TO DB
require('./db/db')

// MIDDLEWARE
server.use(express.static('public'))
server.use(bodyParser.urlencoded({ extended: false }))

server.use(methodOverride('_method'))
// SESSIONS
server.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false 
}))







// CONTROLLERS
const photoController = require('./controllers/photoController.js')
const authController = require('./controllers/authController')

server.use('/photos', photoController)
server.use('/auth', authController)



server.get('/', (req, res) => {
	const message = req.session.message
  	req.session.message = ''
  	res.render('home.ejs', {
  		message: message
  	})
})


server.get('*', (req, res) => {
  	res.status(404).render('404.ejs')
})




server.listen(PORT, () => {
  	const d = new Date()
  	console.log(`${d.toLocaleString()}: Server running on port ${PORT}`)
})