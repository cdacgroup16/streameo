const Video = require('../models/video.js')
const User = require('../models/user.js')

exports.checkStreamLimit = (req, res, next) => {
  const user = req.auth
  if (user.stream_count) {
    if (
      parseInt(user.stream_count) >=
      parseInt(user.subscription_plan.concurrent_streams)
    ) {
      res.status(403)
      throw new Error(
        `Your current plan doesn't support more than ${parseInt(
          user.stream_count
        )} streams`
      )
    }
  }
  next()
}

exports.countStreamsAndUpdateWatchHistory = (req, res, incNumber) => {
  const user = req.auth
  const plan = user.subscription_plan
  const video = req.video

  if (user.stream_count < plan.concurrent_streams) {
    User.updateOne(
      { _id: user._id },
      {
        $inc: { stream_count: incNumber },
        $addToSet: { watch_history: { _id: video._id } },
      }
    ).exec((err, data) => {
      if (err) {
        process.env.NODE_ENV !== 'production' && console.error(err)
      }
    })
  } else {
    res.status(403)
    res.json({
      message: `Your plan doesn't support more than ${plan.concurrent_streams} streams. Please close one stream to continue watching`,
    })
  }
}

exports.countViews = (req) => {
  const user = req.auth
  const plan = user.subscription_plan
  const video = req.video

  if (user.stream_count < plan.concurrent_streams) {
    Video.updateOne(
      { _id: video._id },
      {
        $inc: { views: 1 },
      }
    ).exec((err, data) => {
      if (err) {
        process.env.NODE_ENV !== 'production' && console.error(err)
      }
    })
  }
}
