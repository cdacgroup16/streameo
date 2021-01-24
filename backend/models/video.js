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
    duration: {
      type: Number,
    },
    category: {
      type: ObjectId,
      ref: 'Category',
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
      path_temp: {
        type: String,
        trim: true,
      },
      size: {
        type: String,
        trim: true,
      },
      type: {
        type: String,
        trim: true,
      },
      processed: {
        type: String,
        default: 'not started',
        enum: ['not started', 'failed', 'running', 'done'],
      },
    },
    video: {
      path_temp: {
        type: String,
        trim: true,
      },
      path_low: {
        type: String,
        trim: true,
      },
      path_med: {
        type: String,
        trim: true,
      },
      path_high: {
        type: String,
        trim: true,
      },
      size: {
        type: String,
        trim: true,
      },
      type: {
        type: String,
        trim: true,
      },
      processed: {
        type: String,
        default: 'not started',
        enum: ['not started', 'failed', 'running', 'done'],
      },
    },
    link_low: {
      type: String,
      trim: true,
    },
    link_med: {
      type: String,
      trim: true,
    },
    link_high: {
      type: String,
      trim: true,
    },
    privacy: {
      type: String,
      trim: true,
      default: 'private',
      enum: ['public', 'private'],
    },
    user: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

videoSchema.post('save', (data) => {
  data.poster.src = `/api/videos/poster/${data._id}`
  data.link_low = `/api/videos/stream/low/${data._id}`
  data.link_med = `/api/videos/stream/med/${data._id}`
  data.link_high = `/api/videos/stream/high/${data._id}`
  data.save()
})

module.exports = mongoose.model('Video', videoSchema)
