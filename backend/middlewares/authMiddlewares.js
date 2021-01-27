const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/user')

exports.isSignedIn = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      res.status(401)
      throw new Error('Authentication failed: Token not found')
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id).populate('subscription_plan')

    if (!user) {
      res.status(404)
      throw new Error('User not found!')
    }

    user.salt = undefined
    user.hashed_password = undefined
    req.auth = user
    next()
  } else {
    res.status(403)
    throw new Error('Access denied: user is not signed in')
  }
})

exports.isAuthorized = asyncHandler(async (req, res, next) => {
  if (
    (req.user && req.auth && req.user._id.equals(req.auth._id)) ||
    (req.user && req.auth && req.auth.role === 1)
  ) {
    next()
    return
  }
  res.status(403)
  throw new Error('Access denied: user is not authorized')
})

exports.isAdmin = asyncHandler(async (req, res, next) => {
  if (req.auth.role !== 1) {
    res.status(403)
    throw new Error('Access denied: You do not have admin privilege')
  }
  next()
})

exports.checkTokenForStream = async (req, res, next, token) => {
  try {
    if (!token) {
      res.status(401)
      new Error('Authentication failed: Token not found')
      return
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id).populate('subscription_plan')
    if (!user) {
      res.status(404)
      throw new Error('User not found!')
    }

    user.salt = undefined
    user.hashed_password = undefined
    req.auth = user
    next()
    return
  } catch (error) {
    res.status(403)
    next(error)
    return
  }
}
