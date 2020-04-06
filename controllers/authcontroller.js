const express = require('express')
const router = express.Router()
const User = require('../models/user')



//REGISTRATION FORM ROUTE: GET /auth/register
router.get('/register', (req, res) => {
	//inform user if username taken
	let messageToDisplay = req.session.message
	req.session.message = ''
  	res.render('auth/register.ejs', {
    message: messageToDisplay
  })
})






//REGISTER ROUTE: POST /auth/register
router.post('/register', async (req, res, next) => {
	try {
		//create user
		console.log(req.body);
    	const desiredUsername = req.body.username
    	const desiredPassword = req.body.password
    	//check if username taken
    	const userWithThisUsername = await User.findOne({
      		username: desiredUsername
    })
    	console.log(userWithThisUsername);
    	//if username taken:
    	if(userWithThisUsername) {
    		console.log("username exists")
    		req.session.message = `Username ${desiredUsername} already taken.`
      		res.redirect('/auth/register')
    	}
    	//if username available:
    	else {
      		const createdUser = await User.create({
        		username: desiredUsername,
        		password: desiredPassword
      		})
      		//log new user in:
      		req.session.loggedIn = true
      		//store new user uniquely (ID and username)
      		req.session.userId = createdUser._id // "more unique"
      		req.session.username = createdUser.username
      		req.session.message = `Thanks for signing up, ${createdUser.username}`
      		res.redirect('/')
      	}
	} catch(error) {
	  next(error)
	}
})



module.exports = router