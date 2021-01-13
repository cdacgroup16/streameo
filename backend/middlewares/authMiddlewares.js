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
    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET)
      await User.findById(decoded.id).exec((err, user) => {
        if (err) {
          res.status(400)
          throw new Error('Error occured while finding user!')
        }
        if (!user) {
          res.status(404)
          throw new Error('User not found!')
        }
        user.salt = undefined
        user.hashed_password = undefined
        req.user = user
        next()
      })
    } catch (err) {
      res.status(401)
      throw new Error('Authentication failed: Token is invalid')
    }
  } else {
    res.status(403)
    throw new Error('Access denied: user is not signed in')
  }
})

exports.isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user.role !== 1) {
    res.status(403)
    throw new Error('Access denied: You do not have admin privilege')
  }
  next()
})