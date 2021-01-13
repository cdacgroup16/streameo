const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/user')

exports.isSignedIn = asyncHandler(async (req, res, next) => {
  if (
    req.headers.Authorization &&
    req.headers.Authorization.startsWith('Bearer')
  ) {
    const token = req.headers.Authorization.split(' ')[1]
    if (!token) {
      res.status(401)
      throw new Error('Authentication failed: Token not found')
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).isSelected(
        '-hashed_password -salt'
      )
      next()
    } catch (err) {
      res.status(401)
      throw new Error('Authentication failed: Token is invalid')
    }
  }
})

module.exports = { isSignedIn }
