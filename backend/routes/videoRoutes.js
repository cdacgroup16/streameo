const express = require('express')
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
const { isAdmin, isSignedIn } = require('../middlewares/authMiddlewares')

const router = express.Router()

router.param('videoId', getVideoById)
router.param('quality', (req, res, next, quality) => {
  req.quality = quality
  next()
})

router.route('/').get(getAllVideos).post(isSignedIn, isAdmin, createVideo)

router.route('/admin').get(isSignedIn, isAdmin, getAllVideos)

router.route('/poster/:videoId').get(getPoster)

router.route('/stream/:quality/:videoId').get(isSignedIn, getStream)

router
  .route('/:videoId')
  .get(getVideo)
  .put(isSignedIn, isAdmin, updateVideoById)
  .delete(isSignedIn, isAdmin, removeVideoById)
router.route('/:videoId/admin').get(isSignedIn, isAdmin, getVideo)

module.exports = router
