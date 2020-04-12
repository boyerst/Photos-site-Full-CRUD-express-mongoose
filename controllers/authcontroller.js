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

//LOGIN ROUTE: GET /auth/login
router.get('/login', (req, res) => {
	let message = req.session.message
	req.session.message = undefined
  res.render('auth/login.ejs', {
    	message: message
  })
})


//LOGIN LOGIC: POST /auth/login

router.post('/login', async (req, res, next) => {

  try {
  	//check if there is a user with this username:
  	const user = await User.findOne({ username: req.body.username })
  	if(!user) {
     	console.log("bad username");
     	req.session.message = "The username or password is incorrect."
     	res.redirect('/auth/login')
    }
    else {
     	if(user.password == req.body.password) {
        	req.session.loggedIn = true
        	req.session.userId = user._id
        	req.session.username = user.username
        	req.session.message = `Good to see you again, ${user.username}!`
        	res.redirect('/')
      	} 
      	else {
        	console.log("bad password");
        	req.session.message = "The username or password is incorrect."
        	res.redirect('/auth/login')
      	}
    }
  } catch(err) {
    next(err)
  }

})


//LOGOUT LOGIC: GET /auth/logout

router.get('/logout', async (req, res) => {
//destroy current session (will destroy user info that is stored in respective session)
	await req.session.destroy()
  	res.redirect('/auth/login')
})



















module.exports = router