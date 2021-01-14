const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxlength: 50,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      maxlength: 50,
      trim: true,
    },
    length: {
      type: Number,
      trim: true,
      required: true,
    },
    category: {
      type: ObjectId,
      required: true,
    },
    tags: [{
      type: String,
    }],
    view_count: {
      type: Number
    },
    language: {
      type: String
    },
    link_low: {
      type: String
    },
    link_med: {
      type: String,
    },
    link_high: {
      type: String
    },
    created_at: {
     type:Date,
    },
    updated_at: {
     type:Date,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Video', videoSchema)


