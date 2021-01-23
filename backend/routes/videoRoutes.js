const express = require('express')
const {
  createVideo,
  getVideoById,
  getVideo,
} = require('../controllers/videoControllers')
const { isAdmin, isSignedIn } = require('../middlewares/authMiddlewares')

const router = express.Router()

router.param('videoId', getVideoById)

router.route('/:videoId').get(getVideo)
router.route('/').post(isSignedIn, isAdmin, createVideo)

module.exports = router
