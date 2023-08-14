const mongoose = require('mongoose')

async function connectMongoDB() {
  try {
    const conn = await mongoose
      .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });

    console.log(`MongoDB connected: ${conn.connection.host}`.brightCyan.bold)
  } catch (error) {
    console.error(`DB connection failed: ${error.message}`)
    process.exit(1)
  }
}

module.exports = { connectMongoDB }
