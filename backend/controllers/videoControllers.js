const Video = require('../models/video')
const asyncHandler = require('express-async-handler')
const multer = require('multer')
const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')
const path = require('path')

// @desc    Gets a video by id
// @route   req.param(:videoId)
// @access  Pubic
exports.getVideoById = async (req, res, next, id) => {
  const video = await Video.findById(id).populate('category', '_id name')
  if (!video) {
    res.status(404)
    next(new Error("Video with the provided id doesn't exists"))
  }
  req.video = video
  next()
}

// @desc    Gets a video from req.video object
// @route   GET /api/videos/:videoID
// @access  Pubic
exports.getVideo = asyncHandler(async (req, res) => {
  const video = req.video
  if (!video) {
    res.status(404)
    throw new Error("The video with the provided id doesn't exists")
  }

  // For Admin User
  if (req.auth && req.auth.role !== 0) {
    res.json(video)
    return
  }

  // For public (not signed in users)
  if (video.privacy !== 'public') {
    res.status(403)
    throw new Error('The video you requested is private')
  }
  if (!video.active) {
    res.status(403)
    throw new Error('The video you requested is not yet active')
  }
  video.poster.processed = undefined
  video.poster.path = undefined
  video.video.processed = undefined
  video.video.path_temp = undefined
  video.video.path_low = undefined
  video.video.path_med = undefined
  video.video.path_high = undefined
  video.user = undefined
  video.privacy = undefined
  video.active = undefined

  res.json(video)
})

// @desc    Creates a new Video details in db. Also uploads video and poster file in the server
// @route   POST /api/videos
// @access  Admin
exports.createVideo = asyncHandler(async (req, res, next) => {
  ensureFolderStructureForUploads()

  let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../', 'assets', 'temp'))
    },
    filename: (req, file, cb) => {
      cb(null, path.join(Date.now() + '_' + file.originalname))
    },
  })

  const upload = multer({
    storage: storage,
    limits: {
      fieldNameSize: 100,
      fileSize: parseInt(process.env.MAX_VIDEO_SIZE),
    },
    fileFilter: (req, file, cb) => {
      const ext = file.mimetype.toString().split('/')[1]
      if (
        file.fieldname === 'poster' &&
        ext !== 'jpg' &&
        ext !== 'jpeg' &&
        ext !== 'png'
      ) {
        return cb(
          new Error('Only jpg, jpeg, png files are allowed for poster'),
          false
        )
      }
      if (
        file.fieldname === 'video' &&
        ext !== 'mp4' &&
        ext !== 'mkv' &&
        ext != 'avi'
      ) {
        return cb(
          new Error('Only mp4, avi and mkv files are allowed for video file'),
          false
        )
      }

      cb(null, true)
    },
  }).fields([
    { name: 'video', maxCount: 1 },
    { name: 'poster', maxCount: 1 },
  ])

  upload(req, res, (err) => {
    let { poster, video } = res.req.files

    if (!validateVideoInputFields(req, res, next)) {
      return
    }

    if (err) {
      res.status(400)
      return next(err)
    }

    if (!poster) {
      next(new Error(`'poster' is required`))
      return false
    }
    if (!video) {
      next(new Error(`'video' is required`))
      return false
    }

    // Deletes poster and video file if the size exceeds
    if (
      res.req.files.poster[0].size > parseInt(process.env.MAX_POSTER_SIZE) ||
      res.req.files.video[0].size > parseInt(process.env.MAX_VIDEO_SIZE)
    ) {
      fs.unlinkSync(res.req.files.poster[0].path)
      fs.unlinkSync(res.req.files.video[0].path)
      return res.status(400).json({
        message: `The poster size can't be more then ${
          parseInt(process.env.MAX_POSTER_SIZE) / 1024 / 1024
        } MB and the video can't be more than ${
          parseInt(process.env.MAX_VIDEO_SIZE) / 1024 / 1024
        } MB`,
      })
    }

    // Setting video object files details
    req.video.poster = {
      path: res.req.files.poster[0].path,
      size: res.req.files.poster[0].size,
      type: res.req.files.poster[0].mimetype.toString().split('/')[1],
    }
    req.video.video = {
      path_temp: res.req.files.video[0].path,
      size: res.req.files.video[0].size,
      type: res.req.files.video[0].mimetype.toString().split('/')[1],
    }
    req.video.user = req.auth._id

    // Create video in database
    const videoObject = Video.create(req.video)
    videoObject
      .then((data) => {
        res.status(201).json(data)
        processVideo(res.req.files, data)
      })
      .catch((err) => {
        fs.unlinkSync(res.req.files.poster[0].path)
        fs.unlinkSync(res.req.files.video[0].path)
        res.status(400)
        next(err)
        return
      })
  })
})

// Helper functions
const ensureFolderStructureForUploads = () => {
  if (!fs.existsSync(path.join(__dirname, '../', 'assets'))) {
    fs.mkdirSync(path.join(__dirname, '../', 'assets'), 0744)
  }
  if (!fs.existsSync(path.join(__dirname, '../', 'assets', 'temp'))) {
    fs.mkdirSync(path.join(__dirname, '../', 'assets', 'temp'), 0744)
  }
  if (!fs.existsSync(path.join(__dirname, '../', 'assets', 'videos'))) {
    fs.mkdirSync(path.join(__dirname, '../', 'assets', 'videos'), 0744)
  }
  if (!fs.existsSync(path.join(__dirname, '../', 'assets', 'posters'))) {
    fs.mkdirSync(path.join(__dirname, '../', 'assets', 'posters'), 0744)
  }
}

const validateVideoInputFields = (req, res, next) => {
  let { title, description, category, tags, language, privacy } = res.req.body
  privacy = privacy && privacy.toLowerCase()

  if (!title) {
    next(new Error(`'title' is required`))
    return false
  }
  if (!category) {
    next(new Error(`'category' is required`))
    return false
  }
  if (!language) {
    next(new Error(`Atleast one 'language' is required`))
    return false
  }
  if (!privacy) {
    next(new Error(`'Privacy' mode is required`))
    return false
  }
  if (title.length < 2 || title.length > 100) {
    next(new Error(`'title' must be between 2 to 100 characters in length`))
    return false
  }
  if (!Video.schema.path('privacy').enumValues.includes(privacy)) {
    next(
      new Error(
        `'privacy' must include one of the following: ${
          Video.schema.path('privacy').enumValues
        }`
      )
    )
    return false
  }
  if (typeof tags === 'string') {
    tags = tags.split(',')
  }
  if (typeof language === 'string') {
    language = language.split(',')
  }

  req.video = { title, description, category, tags, language, privacy }
  return true
}

// Process Video and delete file from temp folder
const processVideo = (files, videoDataFromDB) => {
  let { _id } = videoDataFromDB
  let { path: videoPath, filename: videoName, originalname } = files.video[0]
  let {
    path: posterPath,
    originalname: posterOriginalname,
    mimetype: posterMimeType,
  } = files.poster[0]

  ensureFolderStructureForUploads()
  const posterExtension = posterMimeType.toString().split('/')[1]
  const posterDestination = path.join(
    __dirname,
    '../',
    'assets',
    'posters',
    Date.now() + '_' + posterOriginalname
  )
  const videoDestinationLow = path.join(
    __dirname,
    '../',
    'assets',
    'videos',
    Date.now() + '_low_' + originalname
  )
  const videoDestinationMed = path.join(
    __dirname,
    '../',
    'assets',
    'videos',
    Date.now() + '_med_' + originalname
  )
  const videoDestinationHigh = path.join(
    __dirname,
    '../',
    'assets',
    'videos',
    Date.now() + '_high_' + originalname
  )

  ffmpeg(videoPath)
    .renice(process.env.FFMPEG_NICE_VALUE)
    .videoCodec(process.env.VIDEO_CODEC)
    .withOutputFormat(process.env.VIDEO_EXTENSION)
    .aspect(process.env.VIDEO_ASPECT_RATIO)
    .autopad(process.env.VIDEO_PADDING_COLOR)

    .output(videoDestinationLow)
    .size(process.env.VIDEO_RESOLUTION_LOW)

    .output(videoDestinationMed)
    .size(process.env.VIDEO_RESOLUTION_MED)

    .output(videoDestinationHigh)
    .size(process.env.VIDEO_RESOLUTION_HIGH)

    .on('start', function (commandLine) {
      // console.log('Spawned Ffmpeg with command: ' + commandLine)
      Video.updateOne({ _id }, { 'video.processed': 'running' }).exec(
        (err, data) => {
          if (err) {
            console.error(err)
          }
        }
      )
    })

    .on('progress', function (progress) {
      process.stdout.write(
        `FFMPEG Processing: ${
          progress.percent && progress.percent.toFixed(2)
        } % done \r`
      )
    })

    .on('error', function (err) {
      console.log('Error Message: ' + err.message)
      console.log('Error Stack: ' + err.stack)
      Video.updateOne({ _id }, { 'video.processed': 'failed' }).exec(
        (err, data) => {
          if (err) {
            console.error(err)
          }
        }
      )
      if (fs.existsSync(videoPath)) {
        fs.unlinkSync(videoPath)
      }
      if (fs.existsSync(videoDestinationLow)) {
        fs.unlinkSync(videoDestinationLow)
      }
      if (fs.existsSync(videoDestinationMed)) {
        fs.unlinkSync(videoDestinationMed)
      }
      if (fs.existsSync(videoDestinationHigh)) {
        fs.unlinkSync(videoDestinationHigh)
      }
    })

    .on('end', function () {
      console.log('\nProcessing finished !')
      if (fs.existsSync(posterPath)) {
        fs.renameSync(posterPath, posterDestination)
      }
      if (fs.existsSync(videoPath)) {
        fs.unlinkSync(videoPath)
      }
      Video.updateOne(
        { _id },
        {
          'video.path_temp': null,
          'video.type': process.env.VIDEO_EXTENSION,
          'video.processed': 'done',
          'video.path_low': videoDestinationLow,
          'video.path_med': videoDestinationMed,
          'video.path_high': videoDestinationHigh,
          'poster.path': posterDestination,
          'poster.type': posterExtension,
          active: true,
        }
      ).exec((err, data) => {
        if (err) {
          console.error(err)
        }
        if (data.nModified > 0) {
          console.log('Video details updated')
        }
      })
    })
    .run()
}
