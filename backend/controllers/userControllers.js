const User = require('../models/user')
const asyncHandler = require('express-async-handler')

// @desc    Fetches user from db and stores it in req object
// @route   path param "userId"
// @access  Protected
exports.getUserById = asyncHandler(async (req, res, next, id) => {
  await User.findById(id).exec((err, user) => {
    if (err) {
      res.status(400)
      throw new Error('Error occured while finding user!')
    }
    if (!user) {
      res.status(400)
      throw new Error('User not found!')
    }
    user.salt = undefined
    user.hashed_password = undefined
    req.user = user
    next()
  })
})

// @desc    Fetches user req object
// @route   GET /api/users/:userId
// @access  Protected
exports.getUser = (req, res) => {
  const user = req.user
  if (!user) {
    res.status(404)
    throw new Error('User not found!')
  }
  user.stream_count = undefined
  res.json(user)
}

// @desc    Creates new user
// @route   POST /api/users
// @access  Public
exports.createUser = asyncHandler(async (req, res) => {
  let { firstname, lastname, email, password } = req.body
  firstname = firstname && firstname.toLowerCase()
  lastname = lastname && lastname.toLowerCase()
  email = email && email.toLowerCase()

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists!')
  }

  const user = await User.create({
    firstname,
    lastname,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      token: 'JWT goes here',
    })
  } else {
    res.status(400)
    throw new Error('Signup failed! Invalid user data')
  }
})

// @desc    Updates user data
// @route   PUT /api/users/:userId
// @access  Protected
exports.updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  let newUserData = req.body
  if (user) {
    user.firstname = newUserData.firstname || user.firstname
    user.lastname = newUserData.lastname || user.lastname
    user.subscription_plan =
      newUserData.subscription_plan || user.subscription_plan

    if (user.authenticate(req.body.password.trim())) {
      const updatedUserData = await user.save()
      updatedUserData.salt = undefined
      updatedUserData.hashed_password = undefined
      updatedUserData.stream_count = undefined
      res.json(updatedUserData)
    } else {
      res.status(401)
      throw new Error('Password authentication failed!')
    }
  } else {
    res.status(404)
    throw new Error('User not found!')
  }
})

// @desc    Updates user data
// @route   PUT /api/users/reset-password/:userId
// @access  Protected
exports.resetPassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  const { newPassword, oldPassword } = req.body
  if (!user) {
    res.status(404)
    throw new Error('User not found!')
  }
  if (user.hashed_password === user.authenticate(oldPassword)) {
    user.password = newPassword
    const updatedUser = await user.save()
    res.json({
      message: `User password changed successfully!`,
    })
  } else {
    res.status(401)
    throw new Error('Password authentication failed!')
  }
})
