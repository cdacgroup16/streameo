const User = require('../models/user')

// @desc    Fetches user from db and stores it in req object
// @route   path param "userId"
// @access  Protected
exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
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
}

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
  user.account_balance = undefined
  res.json(user)
}
