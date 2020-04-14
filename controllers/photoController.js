const express = require('express')
const router = express.Router()
const Photo = require('../models/photo.js')
const User = require('../models/user')


//PHOTO NEW ROUTE: GET /photos/new 
router.get('/new', (req, res) => {
  res.render('photos/new.ejs')
})


//PHOTO CREATE ROUTE: POST /photos
 router.post('/', async (req, res, next) => {
 	try {
 		if(!req.session.loggedIn) {
 			req.session.message = "Go ahead and give us a register to do that!"
 			res.redirect('/auth/login')
 		} 
 		else {
 			console.log("here is the req.session in POST/photos")
 			// console.log(req.session)
 			const photoToCreate = {
 				title: req.body.title,
 				url: req.body.url, 
 				description: req.body.description, 
 				user: req.session.userId
 			}
 			const createPhoto = await Photo.create(photoToCreate)
 			console.log(photoToCreate)
 			res.redirect('/photos')

 		}
 	} catch(err) {
 	  	next(err)
 	}
 })
 

//PHOTO INDEX ROUTE: GET /photos
router.get('/', async (req, res, next) => {
  	try {
    	const foundPhotos = await Photo.find().populate('user')  
    	const session = req.session
    	// console.log(foundPhotos);
    	res.render('photos/index.ejs', {
      		photos: foundPhotos, 
      		session: session,

    	})
  	} catch(err) {
    	next(err)
  	}
})


//PHOTO SHOW ROUTE: GET /photos/:id
router.get('/:id', async (req, res, next) => {
  	try {
    	const foundPhoto = await Photo.findById(req.params.id).populate('user')
    	const currentUser = await User.findById(req.session.userId)
    	const photoOwner = await User.findById(foundPhoto.user)
    	const username = req.session.userId
    	console.log(photoOwner, "photoOwner")
    	console.log(foundPhoto, "foundPhoto")
    	console.log(currentUser, "currentUser")
    	res.render('photos/show.ejs', {
      		photo: foundPhoto,
      		photoOwner: photoOwner, 
      		user: currentUser,
      		username: username
      		
    	})
 	 } catch (err) {
  		next(err)
  	}
})


//PHOTO DELETE ROUTE: DELETE /photos/:id
router.delete('/:id', async (req, res, next) => {
	try {
		if(req.session.loggedIn == true) {
			const deletedPhotos = await Photo.findByIdAndRemove(req.params.id).populate('user')
			res.redirect('/photos')
		} else {
			// let message = res.locals.message
			// res.locals.message = `Please log in before attemping this!`
      		res.redirect('/photos')
    	}
	} catch(error) {
		next(error)
	}
})


//EDIT ROUTE: GET /photos/:id/edit
router.get('/:id/edit', async (req, res, next) => {
	try {
		const foundPhoto = await Photo.findById(req.params.id).populate('user')
		res.render('photos/edit.ejs', {
			photo: foundPhoto
		})
	} catch (error) {
		next(error)
	}
})


//UPDATE PHOTOS ROUTE: GET /photos/:id
router.put('/:id', async (req, res, next) => {
	try {
		const updatedPhoto = await Photo.findByIdAndUpdate(req.params.id, req.body, {new: true})
		res.redirect(`/photos/`)
	} catch (error) {
		next(error)
	}
})


//DESTROY PHOTOS ROUTE: DELETE /photos/:id
router.delete('/:id', async (req, res, next) => {
	try {
		const photoToDelete = await Photo.findByIdAndDelete(req.params.id)
		// req.session.message = 
		console.log("you have deleted this photo")
		res.redirect('/photos')
	} catch (error) {
		next(error)
	}
})



module.exports = router  