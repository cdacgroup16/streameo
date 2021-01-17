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
  const purchase = await Purchase.findById(req.purchase._id)
  let newPurchaseData = req.body

  const purchaseExist = await Purchase.findOne({ order_Id })
  if (purchaseExist) {
    res.status(400)
    throw new Error(
      'Purchases already with the given id already exists exists!'
    )
  }

  if (purchase) {
    purchase.order_id = newPurchaseData.order_id || purchase.order_id
    purchase.transaction_id =
      newPurchaseData.transaction_id || purchase.transaction_id
    purchase.amount = newPurchaseData.amount || purchase.amount
    purchase.payment_status =
      newPurchaseData.payment_status || purchase.payment_status
    const updatedPurchaseData = await purchase.save()
    res.json(updatedPurchaseData)
  } else {
    res.status(404)
    throw new Error('Purchases not found!')
  }
})
