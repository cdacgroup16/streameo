const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxlength: 100,
      trim: true,
      lowercase: true,
      required: true,
    },
    description: {
      type: String,
      maxlength: 300,
      trim: true,
      lowercase: true,
    },
    length: {
      type: Number,
      trim: true,
    },
    category: {
      type: ObjectId,
      required: true,
    },
    tags: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    language: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],
    poster: {
      src: {
        type: String,
        trim: true,
      },
      path: {
        type: String,
        trim: true,
      },
      size: {
        type: String,
        trim: true,
      },
    },
    video: {
      path: {
        type: String,
        trim: true,
      },
      size: {
        type: String,
        trim: true,
      },
    },
    link_low: {
      type: String,
    },
    link_med: {
      type: String,
    },
    link_high: {
      type: String,
    },
  },
  { timestamps: true }
)

videoSchema.post('save', (data) => {
  // console.log(data)
  data.poster.src = `/api/videos/poster/${data._id}`
  data.save()
})

module.exports = mongoose.model('Video', videoSchema)
