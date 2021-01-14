const Category = require("../models/categories")
 
// @desc    Fetches category by id  from db and stores it in req object
// @route   path param "category id "
// @access  Protected

 exports.getCategoryById = (req, res, next, id) => {
	Category.findById(id).exec((err, category) => {
		if (err) {
			return res.status(400).json({
				error: " Error NO category found ",
			})
		}
		if (!category) {
			return res.status(404).json({
				error: "Category not found",
			})
		}
		req.category = category
		next()
	})
}


// @desc    1 Gives json data for all the categories in the database
// @route   GET "/api/categories"
// @access  Public
exports.getCategory = (req, res) => {
	Category.findAll().exec((err, getAllCategory) => {
    
    if (err) {
    
      return res.status(400).json({
        error: " Error while fetching all categories from DataBase",
			})
		}
		if (!getAllCategory) {

			return res.status(404).json({
      
        error: "No categories  found in DataBase",
			})
		}
		res.json(getAllCategory)
	})
}

// @desc    2 Gives json data for a single category in the database
// @route   GET "/api/categories/:id”
// @access  Public

exports.getOneCategory = (req, res) => {
  res.json(req.category)
}


// @desc    3 Creates new category and responds with the new category data
// @route   POST "/api/categories”
// @access  Protected

exports.createCategory = (req, res) => {

	const category = new Category(req.body)
  
  category.save((err, category) => {
		if (err) {
			return res.status(400).json({
				error: "Error creating category to DB failed",
			})
		}
		res.json(category)
	})
}


// @desc    4 Updates a category with the same id responds with updated category
// @route   PUT "/api/categories/:id”
// @access  Protected

exports.updateCategory = (req, res) => {
	const category = req.category
	category.name = req.body.name
	category.save((err, updatedCategory) => {
		if (err || !updatedCategory) {
			return res.status(400).json({
				error: " Error updating category in DB Failed",
			})
		}
		res.json(updatedCategory)
	})
}


// @desc    5 Deletes a category with the same id if the category has no videos linked to it
// @route   DELETE "/api/categories/:id”
// @access  Protected

exports.removeCategory = (req, res) => {
	const category = req.category
	category.remove((err, removedCategory) => {
		if (err) {
			return res.status(400).json({
				error: "Error  deleting category in DB Failed",
			})
		}
		res.json({
			message: ` \'${removedCategory.name}\' category was deleted successfully from the DB`,
		})
	})
}























































