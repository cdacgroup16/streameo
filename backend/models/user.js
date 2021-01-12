const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      maxlength: 50,
      trim: true,
      required: true,
    },
    lastname: {
      type: String,
      maxlength: 50,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    subscription_plan: {
      type: ObjectId,
      ref: 'Plan',
    },
    role: {
      type: Number,
      default: 0,
    },
    stream_count: {
      type: Number,
      default: 0,
    },
    account_balance: {
      type: Number,
      default: 0,
    },
    validity: {
      type: Date,
    },
    profiles: {
      type: Array,
      default: [],
    },
    watch_history: {
      type: [{ type: ObjectId, ref: 'Video' }],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
