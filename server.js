require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT









app.listen(PORT, () => {
  const d = new Date()
  console.log(`${d.toLocaleString()}: Server running on port ${PORT}`)
})