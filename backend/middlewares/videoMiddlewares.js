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
