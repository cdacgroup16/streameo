const asyncHandler = require('express-async-handler')
const Video = require('../models/video')

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

exports.countViews = asyncHandler(async (req, res, next) => {
  const user = req.auth
  const plan = user.subscription_plan
  const video = req.video
  const date = new Date().getTime()
  const updated = new Date(video.updatedAt).getTime()
  if (date - updated > process.env.VIEW_COUNT_INTERVAL)
    await Video.updateOne(
      { _id: video._id },
      {
        $inc: { views: 1 },
      }
    ).exec((err, data) => {
      if (err) {
        process.env.NODE_ENV !== 'production' && console.error(err)
      }
    })
  next()
})
