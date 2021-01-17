const Purchase = require('../models/purchases')
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
// @route   GET "/api/purchases”
// @access  Protected
exports.getAllPurchase = asyncHandler(async (req, res) => {
  await Purchase.find().exec((err, purchases) => {
    if (err) {
      res.status(400)
      throw new Error('Error while fetching all Purchases from DataBase')
    }
    if (!purchases) {
      res.status(404)
      throw new Error('No Purchase found in DataBase')
    }
    res.json(purchases)
  })
})

// @desc    Gives json data for a purchases for a userId in the database
// @route   GET "/api/purchases/:userId"
// @access  Public

// @desc     Creates new plan and responds with the new plan data
// @route    POST "/api/purchases”
// @access   Admin
exports.createPurchase = asyncHandler(async (req, res) => {
  let { order_id, transaction_id, payment_status, amount } = req.body
  order_id = order_id && order_id.trim()
  transaction_id = transaction_id && transaction_id.trim()
  payment_status = payment_status && payment_status.toLowerCase().trim()
  amount = amount && amount.trim()

  const purchaseExist = await Purchase.findOne({ order_Id })
  if (purchaseExist) {
    res.status(400)
    throw new Error('Purchases already exists!')
  }

  const purchase = await Purchase.create({
    order_id,
    transaction_id,
    payment_status,
    amount,
  })
  if (!order_id) {
    res.status(422)
    throw new Error('Validation failed: Purchase Order_id is required')
  }
  if (!transaction_id) {
    res.status(422)
    throw new Error('Validation failed: Purchase transaction_id is required')
  }
  if (amount < 0) {
    res.status(422)
    throw new Error('Validation failed: Purchase amount cannot be negative')
  }
  if (!payment_status) {
    res.status(422)
    throw new Error('Validation failed: Purchase payment_status is required')
  }
})

// @desc    Updates a plan with the same id responds with updated plan data
// @route   "/api/purchases/:purchaseId”
// @access  Protected
exports.updatePurchaseById = asyncHandler(async (req, res) => {
  const purchase = await Purchase.findById(req.purchase._id)
  let newPurchaseData = req.body
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
