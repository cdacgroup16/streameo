const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const {
  createVideo,
  getVideoById,
  getVideo,
  getAllVideos,
  updateVideoById,
  removeVideoById,
  getPoster,
  getStream,
} = require('../controllers/videoControllers')
const {
  isAdmin,
  isSignedIn,
  checkTokenForStream,
} = require('../middlewares/authMiddlewares')
const {
  checkStreamLimit,
  countViews,
} = require('../middlewares/videoMiddlewares')
const { getUserById } = require('../controllers/userControllers')

const router = express.Router()

router.param('videoId', getVideoById)
router.param('userId', getUserById)

router.param('token', checkTokenForStream)

router.param('quality', (req, res, next, quality) => {
  req.quality = quality
  next()
})

router.route('/').get(getAllVideos).post(isSignedIn, isAdmin, createVideo)

router.route('/admin').get(isSignedIn, isAdmin, getAllVideos)

router.route('/poster/:videoId').get(getPoster)

router.route('/stream/:quality/:videoId/:token').get(countViews, getStream)

router
  .route('/:videoId')
  .get(getVideo)
  .put(isSignedIn, isAdmin, updateVideoById)
  .delete(isSignedIn, isAdmin, removeVideoById)
router.route('/:videoId/admin').get(isSignedIn, isAdmin, getVideo)

module.exports = router
