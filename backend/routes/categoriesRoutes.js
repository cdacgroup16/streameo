const express = require('express')
const {
  getCategoryById,
  getAllCategory,
  getCategory,
  createCategory,
  updateCategory,
  removeCategory,
} = require('../controllers/categoriesControllers')
const { isSignedIn, isAdmin } = require('../middlewares/authMiddlewares')

const router = express.Router()

// middleware to fetch user data from db if 'catogoryId' is present in the path
router.param('categoryId', getCategoryById)

// Routes
router.route('/').get(getAllCategory).post(isSignedIn, isAdmin, createCategory)

router
  .route('/:categoryId')
  .get(getCategory)
  .put(isSignedIn, isAdmin, updateCategory)
  .delete(isSignedIn, isAdmin, removeCategory)

module.exports = router
