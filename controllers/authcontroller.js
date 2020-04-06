const express = require('express')
const router = express.Router()
const User = require('../models/user')



//REGISTRATION FORM ROUTE: GET /auth/register
router.get('/register', (req, res) => {
  res.render('auth/register.ejs')
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
    		res.send('Username exists -- check terminal')
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
      		res.status(201).send('Successfully registered and logged in as ' + req.session.username)
      	}
	} catch(error) {
	  next(error)
	}
})



module.exports = router