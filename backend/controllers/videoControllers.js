const Video = require('../models/video')
const asyncHandler = require('express-async-handler')
// const formidable = require('formidable')
const multer = require('multer')
const ffmpeg = require('fluent-ffmpeg')
const { v4: uuid } = require('uuid')
const fs = require('fs')
const path = require('path')

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

// @desc    Creates a new Video object in db. Also uploads video and poster file in the server
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
    }
    req.video.video = {
      path: res.req.files.video[0].path,
      size: res.req.files.video[0].size,
    }
    req.video.user = req.auth._id

    // Create video in database
    const videoObject = Video.create(req.video)
    videoObject
      .then((data) => {
        res.status(201).json(data)
        console.log('Something is still running')
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

const processVideo = (files, videoDataFromDB) => {
  let { _id } = videoDataFromDB
  let { path: videoPath, filename: videoName, originalname } = files.video[0]

  ensureFolderStructureForUploads()
  const videoDestination = path.join(
    __dirname,
    '../',
    'assets',
    'videos',
    Date.now() + '_' + originalname
  )
  const readStream = fs.createReadStream(videoPath)
  const writeStream = fs.createWriteStream(videoDestination)

  // handling file upload
  readStream.on('data', (chunk) => {
    writeStream.write(chunk)
  })

  // error handling: streams
  readStream.on('error', (error) => {
    readStream.close()
    writeStream.close()
    if (fs.existsSync(videoDestination)) {
      fs.unlinkSync(videoDestination)
    }
    console.log(error)
  })
  writeStream.on('error', (error) => {
    readStream.close()
    writeStream.close()
    if (fs.existsSync(videoDestination)) {
      fs.unlinkSync(videoDestination)
    }
    console.log(error)
  })
  readStream.on('end', () => {
    Video.updateOne(
      { _id },
      { 'video.path': videoDestination, active: true }
    ).exec((err, data) => {
      if (err) {
        console.error(err)
      }
      if (data.nModified > 0) {
        console.log('Video details updated')
      }
      if (fs.existsSync(videoPath)) {
        fs.unlinkSync(videoPath)
      }
    })
  })
  writeStream.on('end', () => {})
}
