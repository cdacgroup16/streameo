const express = require('express')
const {
  getAllPurchase,
  getPurchaseById,
  getPurchase,
  createPurchase,
  updatePurchaseById,
  getAllPaymentStatus,
  getAllPurchaseForUser,
} = require('../controllers/purchasesControllers')
const { isSignedIn, isAdmin } = require('../middlewares/authMiddlewares')
const { getUserById } = require('../controllers/userControllers')
const router = express.Router()

// middleware to fetch user data from db if 'catogoryId' is present in the path
router.param('purchaseId', getPurchaseById)
router.param('userId', getUserById)

// Routes
router
  .route('/')
  .get(isSignedIn, isAdmin, getAllPurchase)
  .post(isSignedIn, isAdmin, createPurchase)

router
  .route('/:purchaseId')
  .get(isSignedIn, getPurchase)
  .put(isSignedIn, isAdmin, updatePurchaseById)

router.route('/:userId', isSignedIn, getAllPurchaseForUser)
router.get('/paymentstatus', isSignedIn, isAdmin, getAllPaymentStatus)

module.exports = router
