const Category = require('../models/categories')
const asyncHandler = require('express-async-handler')

// @desc    Fetches category by id  from db and stores it in req object
// @route   path param "/api/categories/:categoryId"
// @access  Public
exports.getCategoryById = asyncHandler(async (req, res, next, id) => {
  const category = await Category.findById(id)
  req.category = category
  next()
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
  await Category.find().exec((err, categories) => {
    if (err) {
      res.status(400)
      throw new Error('Error while fetching all categories from DataBase')
    }
    if (!categories) {
      res.status(404)
      throw new Error('No categories  found in DataBase')
    }
    res.json(categories)
  })
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

  const category = new Category({ name })
  await category.save((err, category) => {
    if (err) {
      res.status(400)
      throw new Error(err.message)
    }
    res.status(201)
    res.json(category)
  })
})

// @desc    Updates a category with the same id responds with updated category
// @route   PUT "/api/categories/:categoryId”
// @access  Admin
exports.updateCategory = asyncHandler(async (req, res) => {
  let { name } = req.body
  name = name && name.trim().toLowerCase()

  const categoryExists = await Category.findOne({ name })

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

  await category.save((err, updatedCategory) => {
    if (err) {
      res.status(400)
      throw new Error(err.message)
    }
    if (!updatedCategory) {
      res.status(400)
      throw new Error(`Failed to updated category ${oldCategoryName}`)
    }
    res.status(200)
    res.json(updatedCategory)
  })
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

  await category.deleteOne((err, removedCategory) => {
    if (err) {
      res.status(400)
      throw new Error(
        `Failed to delete category ${category.name} from the database`
      )
    }
    res.status(200)
    res.json({
      message: ` \'${removedCategory.name}\' category was deleted successfully from the DB`,
    })
  })
})
