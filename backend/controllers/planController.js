const Plan = require('../models/Plan')
const asyncHandler = require('express-async-handler')

// @desc    Fetches plans from db and stores it in req object
// @route   path param "planId"
// @access  Protected
exports.getPlanById = asyncHandler(async (req, res, next, id) => {
  await Plan.findById(id).exec((err, plan) => {
    if (err) {
      res.status(400)
      throw new Error('Error occured while finding plan!')
    }
    if (!plan) {
      res.status(400)
      throw new Error('Plan not found!')
    }
    next()
  })
})

// @desc    Fetches plan req object
// @route   GET /api/plans/:planId
// @access  Protected
exports.getUser = (req, res) => {
  const plan = req.plan
  if (!plan) {
    res.status(404)
    throw new Error('User not found!')
  }
  res.json(plan)
}

// @desc    Fetches all plans from db
// @route   GET /api/plans
// @access  Admin
exports.getAllPlans = asyncHandler(async (req, res) => {
  await Plan.find()
    .exec((err, users) => {
      if (err) {
        res.status(400)
        throw new Error('Bad request')
      }
      res.json(users)
    })
})

// @desc    Creates new Plan
// @route   POST /api/plans --------
// @access  Public------
exports.createPlan = asyncHandler(async (req, res) => {
  let { name, price, validity ,concurrent_streams, max_quality } = req.body
  name = name && name.toLowerCase()
  price = price && price.toLowerCase()
  validity = validity && validity.toLowerCase()
  concurrent_streams = concurrent_streams && concurrent_streams.toLowerCase()
  max_quality = max_quality && max_quality.toLowerCase()

  const planExists = await Plan.findOne({ name })

  if (planExists) {
    res.status(400)
    throw new Error('Plan already exists!')
  }

  const plan = await Plan.create({
    name,
    price,
    validity
  })

  if (plan) {
    res.status(201).json(plan)
  } else {
    res.status(400)
    throw new Error("Failed")
  }


})

// @desc    Updates plan data
// @route   PUT /api/plans/:planId
// @access  Protected
exports.updatePlanById = asyncHandler(async (req, res) => {
  const plan = await Plan.findById(req.plan._id)
  let newPlanData = req.body
  if (!plan) {
    plan.name = newPlanData.name || plan.name
    plan.price = newPlanData.price || plan.price
    plan.validity = newPlanData.validity || plan.validity
    plan.concurrent_streams = newPlanData.concurrent_streams || plan.concurrent_streams
    plan.max_quality = newPlanData.max_quality || plan.max_quality
    res.json({ 
      message = "Plan Updated Success"
    })

  } else {
    res.status(404)
    throw new Error('Plan not found!')
  }
})



