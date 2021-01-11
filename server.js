const express = require('express')

// Custom middlewares
const { notFound, errorHandler } = require('./middlewares/errorMiddleware')

require('colors')
require('dotenv').config()

const app = express()
const PORT = process.env.SERVER_PORT

app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    message: 'API is running!',
  })
})

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode at port: ${PORT}`.white
      .bold
  )
})
