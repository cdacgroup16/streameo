const mongoose = require('mongoose')
const crypto = require('crypto')
const { v1: uuidv1 } = require('uuid')
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
      min: 0,
    },
    balance: {
      type: Number,
      default: 0,
      min: 0,
    },
    profiles: {
      type: Array,
    },
    watch_history: [
      {
        type: ObjectId,
        ref: 'Video',
      },
    ],
  },
  { timestamps: true }
)

userSchema
  .virtual('password')
  .set(function (password) {
    this._password = password
    this.salt = uuidv1()
    this.hashed_password = this.hashPassword(password)
  })
  .get(function () {
    return this._password
  })

userSchema.methods = {
  authenticate: function (password) {
    return this.hashPassword(password) === this.hashed_password
  },

  hashPassword: function (plainPassword) {
    if (!plainPassword) return ''
    try {
      return crypto
        .createHmac('sha256', this.salt)
        .update(plainPassword)
        .digest('hex')
    } catch (err) {
      return ''
    }
  },
}

module.exports = mongoose.model('User', userSchema)
