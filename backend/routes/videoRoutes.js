const express = require('express')
const { createVideo, uploadVideo } = require('../controllers/videoControllers')
const { isAdmin, isSignedIn } = require('../middlewares/authMiddlewares')

const router = express.Router()

router.route('/').post(isSignedIn, isAdmin, createVideo)

module.exports = router
