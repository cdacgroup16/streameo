const Purchase = require('../models/purchase')
const asyncHandler = require('express-async-handler')

// @desc    Fetches purchase from db and stores it in req.purchase object
// @route   path param "/api/purchases/:purchaseId"
// @access  Protected
exports.getPurchaseById = async (req, res, next, id) => {
  try {
    const purchase = await Purchase.findById(id)
    if (!purchase) {
      res.status(404)
      throw new Error('Purchase not found!')
    }
    req.purchase = purchase
    next()
  } catch (error) {
    next(error)
  }
}

// @desc    Gives data for a single purchase in the database
// @route   GET /api/purchases/:getPurchaseId
// @access  Protected
exports.getPurchase = asyncHandler(async (req, res) => {
  const purchase = req.purchase
  if (!purchase) {
    res.status(404)
    throw new Error(`Purchase with this id doesn't exists`)
  }
  res.json(purchase)
})

// @desc    Gives json data for all the purchases in the database
// @route   GET /api/purchases
// @access  Admin
exports.getAllPurchase = asyncHandler(async (req, res) => {
  const purchases = await Purchase.find()
  if (!purchases) {
    res.status(404)
    throw new Error('No purchases found in dataBase')
  }
  res.json(purchases)
})

// @desc    Gets all the purchases for a user
// @route   GET /api/purchases/:userId
// @access  Protcted
exports.getAllPurchaseForUser = asyncHandler(async (req, res) => {
  const user = req.user._id
  const purchases = await Purchase.find({ user }).populate('user', '_id name')
  if (!purchases) {
    res.status(404)
    throw new Error('No purchases found in database')
  }
  res.json(purchases)
})

// @desc     Creates new purchase and responds with the new purchase data
// @route    POST /api/purchases
// @access   Protected
exports.createPurchase = asyncHandler(async (req, res) => {
  let { plan_id, quantity, amount, transaction_id, payment_status } = req.body
  const { _id: user } = req.auth

  if (!plan_id) {
    res.status(422)
    throw new Error('Validation failed: Purchase plan_id is required')
  }
  if (!transaction_id) {
    res.status(422)
    throw new Error('Validation failed: Purchase transaction_id is required')
  }
  if (!amount) {
    res.status(422)
    throw new Error('Validation failed: Purchase amount is required')
  }
  if (amount < 0) {
    res.status(422)
    throw new Error('Validation failed: Purchase amount cannot be less than 0')
  }
  if (!user) {
    res.status(422)
    throw new Error('Validation failed: User needs to be signed in')
  }

  const purchase = await Purchase.create({
    plan_id,
    quantity,
    transaction_id,
    amount,
    payment_status,
    user,
  })

  if (!purchase) {
    throw new Error('Failed to create a purchase')
  }
  res.status(201)
  res.json(purchase)
})

// @desc    Updates a plan with the same id responds with updated plan data
// @route   POST /api/purchases/:purchaseId
// @access  Admin
exports.updatePurchaseById = asyncHandler(async (req, res) => {
  const purchase = req.purchase
  if (!purchase) {
    res.status(404)
    throw new Error("Purchase with the provided id doesn't exists")
  }

  let newPurchaseData = req.body
  const { payment_status } = newPurchaseData

  if (!payment_status) {
    res.status(422)
    throw new Error('Validation failed: Purchase payment_status is required')
  }
  switch (payment_status) {
    case 'pending':
    case 'failed':
    case 'success':
      break

    default:
      res.status(400)
      throw new Error('The payment_status must be one of the enum values')
  }

  purchase.payment_status =
    newPurchaseData.payment_status || purchase.payment_status
  const updatedPurchaseData = await purchase.save()
  res.json(updatedPurchaseData)
})

// @desc    Gets the list of all enum values for payment_status
// @route   GET /api/purchases/paymentstatus
// @access  Admin
exports.getAllPaymentStatus = asyncHandler(async (req, res) => {
  res.json(Purchase.schema.path('payment_status').enumValues)
})
