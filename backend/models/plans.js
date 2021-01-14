const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

const planSchema = new mongoose.Schema( 
    name_Of_Plan: {
        type: String,
        maxlength: 50,
        trim: true,
        required: true,
      },
      price_Of_Plan: {
        type: String,
        maxlength: 50,
        trim: true,
        required: true,
      },
      Concurrent_Streams: {
        type: Number,
        default: 0,
        required: true,
      },
      






)












