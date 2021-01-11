const mongoose = require('mongoose')

const connectMongoDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(conn => {
      console.log(`MongoDB connected: ${conn.connection.host}`.brightCyan.bold)
    })
    .catch(err => {
      console.error(`DB connection failed: ${err.message}`)
      process.exit(1)
    })
}

module.exports = { connectMongoDB }
