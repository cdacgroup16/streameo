const Category = require("../models/categories")
const asyncHandler = require("express-async-handler")
 
// @desc    Fetches category by id  from db and stores it in req object
// @route   path param "category id "
// @access  Protected
exports.getCategoryById = asyncHandler(async(req, res, next, id) => {
	await Category.findById(id)
	.exec((err, category) => {
	if (err) {
		res.status(400)
		throw new error('Categoryid not forund!')
	}
	if (!category) {
		res.status(404)
		throw new Error('Category not found')
	}
	req.category = category
	next()
	})
})

// @desc    1 Gives json data for all the categories in the database
// @route   GET "/api/categories"
// @access  Public
exports.getAllCategory = asyncHandler(async(req, res) => {
	await Category.findAll()
	.exec((err, getCategory) => { 
  if (err) {
	  res.status(400)
		throw new Error('Error while fetching all categories from DataBase')
	}
	if (!getCategory) {
		res.status(404)
		throw new Error('No categories  found in DataBase')
	}
	res.json(getCategory)
	})
})

// @desc    2 Gives json data for a single category in the database
// @route   GET "/api/categories/:id”
// @access  Public
exports.getOneCategory = (req, res) => {
  res.json(req.category)
}

// @desc    3 Creates new category and responds with the new category data
// @route   POST "/api/categories”
// @access  Protected
exports.createCategory = asyncHandler(async (req, res) => {
	const category =  new Category(req.body)
  await category.save((err, category) => {
	if (err) {
		res.status(400)
		throw new Error('Error creating category to DB failed')	
	}
	res.json(category)
	})
})

// @desc    4 Updates a category with the same id responds with updated category
// @route   PUT "/api/categories/:id”
// @access  Protected
exports.updateCategory = asyncHandler(async(req, res) => {
	const category = req.category
	category.name = req.body.name
  await category.save((err, updatedCategory) => {
	if (err || !updatedCategory) {
  	res.status(400)
		throw new Error('Error updating category in DB Failed')
	}
	res.json(updatedCategory)
	})
})

// @desc    5 Deletes a category with the same id if the category has no videos linked to it
// @route   DELETE "/api/categories/:id”
// @access  Protected
exports.removeCategory = asyncHandler(async(req, res) => {
	const category = req.category
	await category.remove((err, removedCategory) => {
	if (err) {
	res.status(400)
		throw new Error('Error  deleting category in DB Failed')
	}
	res.json({
	message: ` \'${removedCategory.name}\' category was deleted successfully from the DB`,
		})
	})
})