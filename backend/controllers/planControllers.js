const Plan = require('../models/plans')
const asyncHandler = require('express-async-handler')

// @desc    Fetches plans from db and stores it in req.plan object
// @route   path param "planId"
// @access  Protected
exports.getPlanById = async (req, res, next, id) => {
  try {
    const plan = await Plan.findById(id)
    if (!plan) {
      res.status(400)
      throw new Error('Plan not found!')
    }
    req.plan = plan
    next()
  } catch (error) {
    next(error)
  }
}

// @desc    Fetches plan req object
// @route   GET /api/plans/:planId
// @access  Protected
exports.getPlan = asyncHandler(async (req, res) => {
  const plan = req.plan
  if (!plan) {
    res.status(404)
    throw new Error('Plan not found!')
  }
  res.json(plan)
})

// @desc    Fetches all plans from db
// @route   GET /api/plans
// @access  Admin
exports.getAllPlans = asyncHandler(async (req, res) => {
  const plans = await Plan.find()
  if (!plans) {
    res.status(404)
    throw new Error('Plan not found!')
  }
  res.json(plans)
})

// @desc    Creates new Plan
// @route   POST /api/plans --------
// @access  Public------
exports.createPlan = asyncHandler(async (req, res) => {
  let { name, price, validity, concurrent_streams, max_quality } = req.body
  name = name && name.toLowerCase()
  price = price && price
  validity = validity && validity
  concurrent_streams = concurrent_streams && concurrent_streams
  max_quality = max_quality && max_quality

  const planExists = await Plan.findOne({ name })

  if (planExists) {
    res.status(400)
    throw new Error(`Plan with name ${planExists.name} already exists!`)
  }

  // Valdiation
  if (!name) {
    res.status(422)
    throw new Error('Validation failed: The plan name is required')
  }
  if (!price) {
    res.status(422)
    throw new Error('Validation failed: The plan price is required')
  }
  if (!validity) {
    res.status(422)
    throw new Error('Validation failed: The plan validity(in days) is required')
  }
  if (!concurrent_streams) {
    res.status(422)
    throw new Error(
      'Validation failed: The plan concurrent_streams is required'
    )
  }
  if (!max_quality) {
    res.status(422)
    throw new Error('Validation failed: The plan max_quality is required')
  }
  if (name.length > 50) {
    res.status(422)
    throw new Error(
      "Validation failed: The Plan name can't be longer than 50 characters"
    )
  }
  if (name.length < 3) {
    res.status(422)
    throw new Error(
      "Validation failed: The Plan name can't be shorter than 3 characters"
    )
  }
  if (price < 0) {
    res.status(422)
    throw new Error("Validation failed: The Plan price can't be less than 0")
  }
  if (!Number.isInteger(validity)) {
    res.status(422)
    throw new Error(
      'Validation failed: Validity must be an integer containing number of days'
    )
  }
  if (!Number.isInteger(concurrent_streams)) {
    res.status(422)
    throw new Error(
      'Validation failed: concurrent_streams (Screens) must be an integer containing number of Screens'
    )
  }
  if (!Number.isInteger(max_quality)) {
    res.status(422)
    throw new Error(
      'Validation failed: max_quality must be an integer containing max resolution quality'
    )
  }
  const plan = await Plan.create({
    name,
    price,
    validity,
    concurrent_streams,
    max_quality,
  })

  if (plan) {
    res.status(201).json(plan)
  } else {
    res.status(400)
    throw new Error(`Failed to create the plan`)
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
    plan.concurrent_streams =
      newPlanData.concurrent_streams || plan.concurrent_streams
    plan.max_quality = newPlanData.max_quality || plan.max_quality
    // res.json({
    //   message = "Plan Updated Success"
    // })
  } else {
    res.status(404)
    throw new Error('Plan not found!')
  }
})
