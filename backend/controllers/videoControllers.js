const Video = require('../models/video')
const asyncHandler = require('express-async-handler')
const multer = require('multer')
const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const {
  countViews,
  AddToWatchHistory,
} = require('../utils/video-utils/streamUtils')
const fileInfo = promisify(fs.stat)

// @desc    Gets a video by id
// @route   req.param(:videoId)
// @access  Pubic
exports.getVideoById = async (req, res, next, id) => {
  const video = await Video.findById(id).populate('category', '_id name')
  if (!video) {
    res.status(404)
    next(new Error("Video with the provided id doesn't exists"))
    return
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

// @desc    Gets a video's poster
// @route   GET /api/videos/poster/:videoId
// @access  Pubic
exports.getPoster = asyncHandler(async (req, res) => {
  const video = req.video
  if (!video) {
    res.status(404)
    throw new Error("The video with the provided id doesn't exists!")
  }

  // FOR TESTING PURPOSE ONLY
  if (process.env.TESTING_MEDIA === 'true') {
    video.poster.path = path.join(
      __dirname,
      '..',
      'assets',
      'posters',
      'temp.jpg'
    )
  }
  // Check file exists
  if (!fs.existsSync(video.poster.path)) {
    res.status(404)
    throw new Error("Poster you requested doesn't exists!")
  }

  const readPoster = fs.createReadStream(video.poster.path)

  res.status(206)
  res.contentType(`image/${video.poster.type}`)
  readPoster.pipe(res)
})

// @desc    Gets a video's poster
// @route   GET /api/videos/stream/:quality/:videoId
// @access  Protected
exports.getStream = asyncHandler(async (req, res) => {
  const { quality, auth, video, headers } = req
  const { subscription_plan: plan } = auth
  const { range } = headers

  const resHigh = parseInt(process.env.VIDEO_RESOLUTION_HIGH.split('x')[1]),
    resMed = parseInt(process.env.VIDEO_RESOLUTION_MED.split('x')[1]),
    resLow = parseInt(process.env.VIDEO_RESOLUTION_LOW.split('x')[1])

  // FOR TESTING PURPOSE ONLY
  if (process.env.TESTING_MEDIA === 'true') {
    video.video.path_high = path.join(
      __dirname,
      '..',
      'assets',
      'videos',
      'tempHigh.mp4'
    )
    video.video.path_med = path.join(
      __dirname,
      '..',
      'assets',
      'videos',
      'tempMed.mp4'
    )
    video.video.path_low = path.join(
      __dirname,
      '..',
      'assets',
      'videos',
      'tempLow.mp4'
    )
  }

  // Check file exists
  if (
    !fs.existsSync(
      video.video.path_low || video.video.path_med || video.video.path_high
    )
  ) {
    res.status(404)
    throw new Error("Video you requested doesn't exists!")
  }

  const type = video.video.type
  const { size: sizeHigh } = await fileInfo(video.video.path_high)
  const { size: sizeMed } = await fileInfo(video.video.path_med)
  const { size: sizeLow } = await fileInfo(video.video.path_low)

  if (
    !quality &&
    quality !== 'high' &&
    quality !== 'med' &&
    quality !== 'low'
  ) {
    res.status(403)
    throw new Error('Invalid quality set in route')
  }

  if (!plan) {
    res.status(403)
    throw new Error("You're not subscribed to any plans")
  }

  // ReadStreams for videos
  const streamHigh = (start, end) =>
    fs
      .createReadStream(video.video.path_high, { start, end })
      .once('data', () => {
        AddToWatchHistory(req)
      })

  const streamMed = (start, end) =>
    fs
      .createReadStream(video.video.path_med, { start, end })
      .once('data', () => {
        AddToWatchHistory(req)
      })

  const streamLow = (start, end) =>
    fs
      .createReadStream(video.video.path_low, { start, end })
      .once('data', () => {
        AddToWatchHistory(req)
      })

  // Send video stream as a response
  const sendStream = (fileSize, fileType, readstream) => {
    if (range) {
      let [start, end] = range.replace(/bytes=/, '').split('-')
      start = parseInt(start, 10)
      end = end ? parseInt(end, 10) : fileSize - 1
      res.writeHead(206, {
        Content_Type: `video/${fileType}`,
        'Content-Length': end - start + 1,
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
      })
      readstream(start, end).pipe(res)
    } else {
      res.writeHead(206, {
        Content_Type: `video/${fileType}`,
        'Content-Length': fileSize,
        'Content-Range': `bytes ${0}-${fileSize - 1}/${fileSize}`,
        'Accept-Ranges': 'bytes',
      })
      readstream(0, fileSize - 1).pipe(res)
    }
  }

  switch (quality) {
    case 'high':
      if (plan.max_quality < resHigh) {
        res.status(403)
        throw new Error("Your plan doesn't support this resolution")
      }
      try {
        sendStream(sizeHigh, type, streamHigh)
      } catch (error) {
        process.env.NODE_ENV !== 'production' && console.error(error)
      }
      break
    case 'med':
      if (plan.max_quality < resMed) {
        res.status(403)
        throw new Error("Your plan doesn't support this resolution")
      }
      try {
        sendStream(sizeMed, type, streamMed)
      } catch (error) {
        process.env.NODE_ENV !== 'production' && console.error(error)
      }
      break
    case 'low':
      if (plan.max_quality < resLow) {
        res.status(403)
        throw new Error("Your plan doesn't support this resolution")
      }
      try {
        sendStream(sizeLow, type, streamLow)
      } catch (error) {
        process.env.NODE_ENV !== 'production' && console.error(error)
      }
      break

    default:
      res.status(400)
      throw new Error('Error occured while getting stream')
  }
})

// @desc    Gets all videos from database
// @route   GET /api/videos/
// @access  Pubic
exports.getAllVideos = asyncHandler(async (req, res) => {
  let q = req.query

  let filter = !q.filter ? q.filter : JSON.parse(q.filter),
    limit = parseInt(q.limit) || 8,
    page = parseInt(q.page) || 0,
    sort = q.sort || '',
    skip = page * limit
  const videos = await Video.find(filter)
    .populate('category', '_id name')
    .limit(limit)
    .skip(skip)
    .sort(sort)

  // For Admin User
  if (req.auth && req.auth.role !== 0) {
    res.json(videos)
    return
  }

  // For public (not signed in users)
  const refractoredVideos = videos.map((video) => {
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
    return video
  })
  res.json(refractoredVideos)
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
        message: `The poster size can't be more then ${parseInt(process.env.MAX_POSTER_SIZE) / 1024 / 1024
          } MB and the video can't be more than ${parseInt(process.env.MAX_VIDEO_SIZE) / 1024 / 1024
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

// @desc    Updates a Video details in db. Also uploads video and poster file in the server
// @route   PUT /api/videos
// @access  Admin
exports.updateVideoById = asyncHandler(async (req, res, next) => {
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
      fileSize: parseInt(process.env.MAX_POSTER_SIZE),
    },
    fileFilter: (req, file, cb) => {
      if (file) {
        const ext = file.mimetype.toString().split('/')[1]
        if (ext !== 'jpg' && ext !== 'jpeg' && ext !== 'png') {
          return cb(
            new Error('Only jpg, jpeg, png files are allowed for poster'),
            false
          )
        }
        cb(null, true)
      }
    },
  }).single('poster')

  upload(req, res, (err) => {
    if (!validateVideoInputFieldsForUpdate(req, res, next)) {
      return
    }

    // Checking for Poster uploads
    if (res.req.file) {
      let poster = res.req.file
      const posterDestination = path.join(
        __dirname,
        '../',
        'assets',
        'posters',
        Date.now() + '_' + poster.originalname
      )

      if (err) {
        res.status(400)
        return next(err)
      }

      // Delete the previously existing poster here
      if (fs.existsSync(req.video.poster.path)) {
        fs.unlinkSync(req.video.poster.path)
      }

      // Move the upoaded poster to destination here
      fs.renameSync(poster.path, posterDestination)

      // Setting video object files details
      req.video.poster = {
        path: posterDestination,
        size: poster.size,
        type: poster.mimetype.toString().split('/')[1],
      }

      // Create video in database
      const videoObject = req.video.save()
      videoObject
        .then((data) => {
          res.status(200).json(data)
        })
        .catch((err) => {
          if (fs.existsSync(poster.path)) {
            fs.unlinkSync(poster.path)
          }
          res.status(400)
          next(err)
          return
        })
    } else {
      // Save updated details video in database
      const videoObject = req.video.save()
      videoObject
        .then((data) => {
          res.status(200).json(data)
        })
        .catch((err) => {
          res.status(400)
          next(err)
          return
        })
    }
  })
})

// @desc    Deletes a Video in db. Also deletes video and poster file in the server
// @route   DELETE /api/videos/:videoId
// @access  Admin
exports.removeVideoById = asyncHandler(async (req, res) => {
  const video = req.video
  if (!video) {
    res.status(404)
    throw new Error("The video with the provided id doesn't exists!")
  }

  const deletedVideo = await video.deleteOne()
  if (!deletedVideo) {
    res.status(400)
    throw new Error('Failed to delete the video with the given id')
  }

  //Deleting stored files from the server
  if (fs.existsSync(video.poster.path)) {
    fs.unlinkSync(video.poster.path)
  }
  if (fs.existsSync(video.video.path_low)) {
    fs.unlinkSync(video.video.path_low)
  }
  if (fs.existsSync(video.video.path_med)) {
    fs.unlinkSync(video.video.path_med)
  }
  if (fs.existsSync(video.video.path_high)) {
    fs.unlinkSync(video.video.path_high)
  }

  res.json({
    message: `Successfully deleted the requested video with id: "${deletedVideo._id}" and title "${deletedVideo.title}"`,
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
        `'privacy' must include one of the following: ${Video.schema.path('privacy').enumValues
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

const validateVideoInputFieldsForUpdate = (req, res, next) => {
  let { title, description, category, tags, language, privacy } = res.req.body
  let poster = res.req.file

  title = title && title.toLowerCase()
  description = description && description.toLowerCase()
  privacy = privacy && privacy.toLowerCase()

  if (
    !title &&
    !description &&
    !category &&
    !tags &&
    !language &&
    !privacy &&
    !poster
  ) {
    res.status(403)
    next(new Error('No update field provided by the client'))
    return
  }

  if ((title && title.length < 2) || (title && title.length > 100)) {
    next(new Error(`'title' must be between 2 to 100 characters in length`))
    return false
  }
  if (privacy && !Video.schema.path('privacy').enumValues.includes(privacy)) {
    next(
      new Error(
        `'privacy' must include one of the following: ${Video.schema.path('privacy').enumValues
        }`
      )
    )
    return false
  }
  if (tags && typeof tags === 'string') {
    tags = tags.split(',')
  }
  if (language && typeof language === 'string') {
    language = language.split(',')
  }
  req.video.title = title || req.video.title
  req.video.description = description || req.video.description
  req.video.category = category || req.video.category
  req.video.tags = tags || req.video.tags
  req.video.language = language || req.video.language
  req.video.privacy = privacy || req.video.privacy
  req.video.user = req.auth._id

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
      Video.updateOne({ _id }, { 'video.processed': 'running' }).exec(
        (err, data) => {
          if (err) {
            process.env.NODE_ENV !== 'production' && console.error(err)
          }
        }
      )
    })

    .on('progress', function (progress) {
      process.stdout.write(
        `FFMPEG Processing: ${progress.percent && progress.percent.toFixed(2)
        } % done \r`
      )
    })

    .on('error', function (err) {
      process.env.NODE_ENV !== 'production' &&
        console.log('Error Message: ' + err.message)
      process.env.NODE_ENV !== 'production' &&
        console.log('Error Stack: ' + err.stack)
      Video.updateOne({ _id }, { 'video.processed': 'failed' }).exec(
        (err, data) => {
          if (err) {
            process.env.NODE_ENV !== 'production' && console.error(err)
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
      process.env.NODE_ENV !== 'production' &&
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
          process.env.NODE_ENV !== 'production' && console.error(err)
        }
        if (data.nModified > 0) {
          process.env.NODE_ENV !== 'production' &&
            console.log('Video details updated')
        }
      })
    })
    .run()
}
