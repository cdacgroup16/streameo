const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types
const purchaseSchema = new mongoose.Schema(
  {
    order_id: {
      type: String,
      required: true,
    },
    transaction_id: {
      type: String,
    },
    payment_status: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      default: 0,
      required: true
    },
    user: {
      type: ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Purchase', purchaseSchema)
