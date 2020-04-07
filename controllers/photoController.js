const express = require('express')
const router = express.Router()
const Photo = require('../models/photo.js')
const mongoose = require('mongoose')




router.get('/', (req, res) => {
  res.send('Photos controller working')
})



//PHOTO NEW ROUTE: GET /photos/new 
router.get('/new', (req, res) => {
  res.render('photos/new.ejs')
})

//PHOTO CREATE ROUTE: POST /photos
 router.post('/', async (req, res, next) => {
 	try {
 		console.log("here is the req.session in POST/photos")
 		console.log(req.session)
 		const photoToCreate = {
 			title: req.body.title,
 			url: req.body.url, 
 			description: req.body.description, 
 			user: req.session.userId
 		}
 		const createPhoto = await Photo.create(photoToCreate)
 		res.send('check terminal')
 	} catch(error) {
 		next(error)
 	}
 })


module.exports = router  