const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types
const purchaseSchema = new mongoose.purchase(
  {
      user_id:{
          type:ObjectId,
          required:true,
      },
      order_id:{
          type:string,
          maxLength:20,
          required:true,
      },
      transaction_id:{
          type:string,
          maxLength:20,
          required:true,
      },
      payment_id:{
          type:string,
          maxLength:20,
          required:true,
      },
      payment_status:{
      type:string,
      maxLength:50,
      required:true,
      },
      amount:{
          type:Number,
          default:0,
      },
      user:{
          type:ObjectId,
          ref:'user',
        },
    },
    { timestamps: true }
  )
  
  module.exports = mongoose.model('Purchase', purchaseSchema)
