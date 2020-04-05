require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT

// MIDDLEWARE
app.use(express.static('public'))

// CONTROLLERS
const photoController = require('./controllers/photoController.js')
// the following line means for all URLs starting with /authors, 
// use the author controller, so 
// note: Inside of author controller, the routes will NOT 
// include '/authors' but they URLs will look the same to the client
app.use('/photos', photoController)



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