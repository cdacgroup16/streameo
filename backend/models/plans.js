const mongoose = require('mongoose')

const planSchema = new mongoose.Schema( 
  {
    name: {
        type: String,
        maxlength: 50,
        trim: true,
        required: true,
      },
      price: {
        type: String,
        maxlength: 50,
        trim: true,
        required: true,
      },
      concurrent_streams: {
        type: Number,
        default: 0,
        required: true,
      },
      duration: {
        type: Number,
        default: 0,
        required: true,
      },
      max_quality: {
        type: Number,
        default: 0,
        required: true,
      },
 },
    {
      timestamps: true
    }
)
module.exports = mongoose.model('plan', planSchema)










