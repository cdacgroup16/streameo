const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types
const purchaseSchema = new mongoose.Schema(
  {
    plan_id: {
      type: ObjectId,
      ref: 'Plan',
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    transaction_id: {
      type: String,
    },
    payment_status: {
      type: String,
      default: 'Not Paid',
    },
    amount: {
      type: Number,
      required: true,
    },
    user: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Purchase', purchaseSchema)
