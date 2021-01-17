const express = require('express')
const {
  createPlan,
  getPlanById,
  updatePlanById,
  getPlan,
  getAllPlans,
} = require('../controllers/planControllers')
const { isSignedIn, isAdmin } = require('../middlewares/authMiddlewares')

const router = express.Router()

// middleware to fetch plan data from db if 'planId' is present in the path
router.param('planId', getPlanById)

// Routes
router.route('/').get(getAllPlans).post(isSignedIn, isAdmin, createPlan)

router.route('/:planId').get(getPlan).put(isSignedIn, isAdmin, updatePlanById)

module.exports = router
