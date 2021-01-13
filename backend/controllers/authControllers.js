const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const { generateJwtToken } = require('../utils/jwt')
const { createUser } = require('./userControllers')
const { validateEmail, validatePassword } = require('../utils/validation')

// @desc    Lets a user login
// @route   POST /api/signin
// @access  Public
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

// @desc    Registers a new user
// @route   POST /api/signup
// @access  Public
exports.signup = (req, res) => {
  // Validation
  let { firstname, email, password } = req.body
  firstname = firstname && firstname.toLowerCase()
  email = email && email.toLowerCase()
  if (!firstname || !email || !password) {
    res.status(422)
    throw new Error("Validation failed: Required fields can't be empty")
  }
  if (firstname.length < 3) {
    res.status(422)
    throw new Error("Validation failed: Firstname can't be smaller than 3 characters")
  }
  if (!validateEmail(email)) {
    res.status(422)
    throw new Error('Validation failed: Email is not properly formatted')
  }
  if (!validatePassword(password)) {
    res.status(422)
    throw new Error('Validation failed: Password must contain atleast one lowercase, one uppercase character and atleast one number')
  }
  await createUser(req,res)
}
