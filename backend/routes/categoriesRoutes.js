const express = require('express')
const {
  getCategoryById,
  getALLCategory,
  getOneCategory,
  createCategory,
	updateCategory,
	removeCategory,
} = require("../controllers/categoriesControllers")
const { isSignedIn, isAdmin } = require('../middlewares/authMiddlewares')

const router = express.Router()

// middleware to fetch user data from db if 'catogoryId' is present in the path
router.param('categoryId', getCategoryById)

// Routes
router.route('/').get(getALLCategory).post(createCategory)

router
  .route('/:categoryId')
  .get(getOneCategory)
  .post(isAdmin,createCategory)
  .put(isAdmin, updateCategory)
  .delete(isAdmin,removeCategory)

  module.exports = router