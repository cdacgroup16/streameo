const express = require('express')
const {
    createPlan,
    updatePlanById,
    getPlanById,
    getPlan,
    getAllPlans,
} = require('../controllers/planControllers')
const { isSignedIn, isAdmin } = require('../middlewares/authMiddlewares')

const router = express.Router()

// middleware to fetch plan data from db if 'planId' is present in the path
router.param('planId', getPlanById)

// Routes
router.route('/').get(getAllPlans).post(createPlan)

router
    .route('/:planId')
    .get(isAdmin, getPlan)
    .put(isAdmin, updatePlanById)

module.exports = router
