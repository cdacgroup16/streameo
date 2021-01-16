const Category = require('../models/categories')
const asyncHandler = require('express-async-handler')

// @desc    Fetches category by id  from db and stores it in req object
// @route   path param "/api/categories/:categoryId"
// @access  Public
exports.getCategoryById = asyncHandler(async (req, res, next, id) => {
  try {
    const category = await Category.findById(id)
    if (!category) {
      res.status(404)
      throw new Error(`Category with the supplied id doesn't exists`)
    }
    req.category = category
    next()
  } catch (error) {
    next(error)
  }
})

// @desc    Gives data for a single category in the database
// @route   GET "/api/categories/:categoryId”
// @access  Public
exports.getCategory = (req, res) => {
  const category = req.category
  if (!category) {
    res.status(404)
    throw new Error(`Category with the supplied id doesn't exists`)
  }
  res.json(category)
}

// @desc    Gives json data for all the categories in the database
// @route   GET "/api/categories"
// @access  Public
exports.getAllCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find()
  if (!categories) {
    res.status(404)
    throw new Error('No categories  found in DataBase')
  }
  res.json(categories)
})

// @desc    Creates new category and responds with the new category data
// @route   POST "/api/categories”
// @access  Admin
exports.createCategory = asyncHandler(async (req, res) => {
  let { name } = req.body
  name = name && name.trim().toLowerCase()

  const categoryExists = await Category.findOne({ name })

  if (categoryExists) {
    res.status(400)
    throw new Error(`Category with name ${name} already exists!`)
  }
  // Validation
  if (!name) {
    res.status(422)
    throw new Error('Validation failed: The Category name is required')
  }
  if (name.length > 25) {
    res.status(422)
    throw new Error(
      "Validation failed: The Category name can't be longer than 25 characters"
    )
  }
  if (name.length < 3) {
    res.status(422)
    throw new Error(
      "Validation failed: The Category name can't be shorter than 3 characters"
    )
  }

  const category = await Category.create({ name })
  if (!category) {
    throw new Error(`Failed to create the category with name ${name}`)
  }
  res.status(201)
  res.json(category)
})

// @desc    Updates a category with the same id responds with updated category
// @route   PUT "/api/categories/:categoryId”
// @access  Admin
exports.updateCategory = asyncHandler(async (req, res) => {
  let { name } = req.body
  name = name && name.trim().toLowerCase()

  const categoryExists = await Category.findOne({ name })

  // Validation
  if (categoryExists) {
    res.status(400)
    throw new Error(`Another category with the name '${name}' already exists!`)
  }

  const category = req.category
  if (!category) {
    res.status(404)
    throw new Error(`Category with the supplied id doesn't exists`)
  }
  if (!name) {
    res.status(422)
    throw new Error('Validation failed: The Category name is required')
  }
  if (name.length > 25) {
    res.status(422)
    throw new Error(
      "Validation failed: The Category name can't be longer than 25 characters"
    )
  }
  if (name.length < 3) {
    res.status(422)
    throw new Error(
      "Validation failed: The Category name can't be shorter than 3 characters"
    )
  }
  const oldCategoryName = category.name
  category.name = name

  const updatedCategory = await category.save()
  if (!updatedCategory) {
    res.status(400)
    throw new Error(`Failed to updated category ${oldCategoryName}`)
  }
  res.status(200)
  res.json(updatedCategory)
})

// @desc    Deletes a category with the same id if the category has no videos linked to it
// @route   DELETE "/api/categories/:id”
// @access  Admin
exports.removeCategory = asyncHandler(async (req, res) => {
  const category = req.category

  if (!category) {
    res.status(404)
    throw new Error(`Category with the supplied id doesn't exists`)
  }

  const removedCategory = await category.deleteOne()
  if (!removedCategory) {
    throw new Error(`Failed to delete category ${category.name}`)
  }
  res.status(200)
  res.json({
    message: ` \'${removedCategory.name}\' category was deleted successfully from the DB`,
  })
})
