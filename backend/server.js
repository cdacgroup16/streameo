const express = require('express')
const { notFound, errorHandler } = require('./middlewares/errorMiddleware')
const { connectMongoDB } = require('./config/mongodb')
const userRoutes = require('./routes/userRoutes')
require('colors')
require('dotenv').config()

const app = express()
const SERVER_PORT = process.env.SERVER_PORT

// Connect to Database
connectMongoDB()

// Built-in middlwares
app.use(express.json())

// Handle requests
app.get('/', (req, res) => {
  res.json({
    message: 'API is running!',
  })
})

// user routes
app.use('/api/users', userRoutes)

// Custom middlewares
app.use(notFound)
app.use(errorHandler)

// Server Listenening
app.listen(SERVER_PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode at port: ${SERVER_PORT}`
      .white.bold
  )
})
