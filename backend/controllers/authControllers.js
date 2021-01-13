const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const { generateJwtToken } = require('../utils/jwt')

exports.signin = asyncHandler(async (req, res) => {
  let { email, password } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error("Required fields can't be empty")
  }
  email = email.trim().toLowerCase()
  password = password.trim()

  await User.find({ email }).exec((err, user) => {
    if (err) {
      res.status(500)
      throw new Error(err.message)
    }
    if (!user) {
      res.status(404)
      throw new Error(`The user with email ${email} doesn't exist`)
    }
    if (!user.authenticate(password)) {
      res.status(401)
      throw new Error('Authentication failed: Wrong password!')
    }

    const token = generateJwtToken(user._id, user.role)
    user.hashed_password = undefined
    user.salt = undefined
    user.createdAt = undefined
    user.updatedAt = undefined
    res.json({
      token,
      user,
    })
  })
})
