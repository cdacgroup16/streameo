const express = require('express')
const {
  getAllPurchase,
  getPurchaseById,
  getPurchaseId ,
  createPurchase,
  updatePurchaseById,
} = require('../controllers/purchasesControllers')
const { isSignedIn, isAdmin } = require('../middlewares/authMiddlewares')
const {getUserById}= require('../controllers/userControllers')
const router = express.Router()

// middleware to fetch user data from db if 'catogoryId' is present in the path
router.param('purchaseId', getPurchaseById)
router.param('userId', getUserById)

// Routes
router.route('/').get(getAllPurchase).post(isSignedIn, isAdmin, createPurchase)

router
  .route('/:purchaseId')
  .get(isSignedIn,getPurchaseId)
  .put(isSignedIn, isAdmin, updatePurchaseById)

  router
  .route('/:userId')
  .get(isSignedIn,getPurchaseId)
module.exports = router
