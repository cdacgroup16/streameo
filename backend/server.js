const express = require('express')
const { notFound, errorHandler } = require('./middlewares/errorMiddleware')
const { connectMongoDB } = require('./config/mongodb')
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const categoriesRoutes = require('./routes/categoriesRoutes')
const purchaseRoutes = require('./routes/purchaseRoutes')
const planRoutes = require('./routes/planRoutes')
const videoRoutes = require('./routes/videoRoutes')
require('colors')
require('dotenv').config()

const app = express()
const SERVER_PORT = process.env.SERVER_PORT

// Connect to Database
await connectMongoDB()

// Built-in middlwares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Handle requests
app.get('/', (req, res) => {
  res.json({
    message: 'API is running!',
  })
})

//CORS Policy
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})

// Routes
app.use('/api', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/categories', categoriesRoutes)
app.use('/api/plans', planRoutes)
app.use('/api/purchases', purchaseRoutes)
app.use('/api/videos', videoRoutes)

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
