const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const { generateJwtToken } = require('../utils/jwt')
const { validatePassword } = require('../utils/validation')

// @desc    Fetches user from db and stores it in req object
// @route   path param "userId"
// @access  Protected
exports.getUserById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id).populate('subscription_plan')
    if (!user) {
      res.status(400)
      throw new Error('User not found!')
    }
    user.salt = undefined
    user.hashed_password = undefined
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

// @desc    Fetches user req object
// @route   GET /api/users/:userId
// @access  Protected
exports.getUser = asyncHandler(async (req, res) => {
  const user = req.user
  if (!user) {
    res.status(404)
    throw new Error('User not found!')
  }
  res.json(user)
})

// @desc    Fetches all users from db
// @route   GET /api/users
// @access  Admin
exports.getAllUsers = asyncHandler(async (req, res) => {
  await User.find()
    .select('-hashed_password -salt')
    .exec((err, users) => {
      if (err) {
        res.status(400)
        throw new Error('Bad request')
      }
      res.json(users)
    })
})

// @desc    Creates new user
// @route   POST /api/users
// @access  Public
exports.createUser = asyncHandler(async (req, res) => {
  let { firstname, lastname, email, password, subscription_plan } = req.body
  firstname = firstname && firstname.toLowerCase()
  lastname = lastname && lastname.toLowerCase()
  email = email && email.toLowerCase()
  const profiles = [firstname]

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
    profiles,
    subscription_plan,
  })

  if (user) {
    user.hashed_password = undefined
    user.salt = undefined
    user.stream_count = undefined

    // request browser to set the cookie at the frontend
    res.cookie('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 2,
      secure: true,
      sameSite: 'strict',
      domain: 'http://localhost:4000'
    });

    res.status(201).json({ user, token: generateJwtToken(user._id, user.role) })
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
  const { password } = req.body

  if (!password) {
    res.status(403)
    throw new Error('Password is required for this action')
  }

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
  let { newPassword, oldPassword } = req.body
  newPassword = newPassword.trim()
  if (!user) {
    res.status(404)
    throw new Error('User not found!')
  }
  if (!validatePassword(newPassword)) {
    res.status(422)
    throw new Error(
      'Validation failed: Password must contain atleast one lowercase, one uppercase character and atleast one number'
    )
  }
  if (user.authenticate(oldPassword)) {
    user.password = newPassword
    const updatedUser = await user.save()
    if (!updatedUser) {
      throw new Error('Password reset failed')
    }
    res.json({
      message: `User password changed successfully!`,
    })
  } else {
    res.status(401)
    throw new Error('Password authentication failed!')
  }
})
