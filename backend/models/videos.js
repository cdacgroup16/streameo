const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxlength: 250,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      maxlength: 300,
      trim: true,
    },
    length: {
      type: Number,
      trim: true,
    },
    category: {
      type: ObjectId,
      required: true,
    },
    tags: [{
      type: String,
    }],
    views_count: {
      type: Number,
      default: 0,
    },
    language: [{
      type: String
    }],
    link_low: {
      type: String
    },
    link_med: {
      type: String,
    },
    link_high: {
      type: String
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Video', videoSchema)
