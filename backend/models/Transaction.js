const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  message: { type: String },
  timestamp: { type: Date, default: Date.now },


  //additional
  senderName: { type: String, required: true },
  senderUpi: { type: String, required: true },
  senderAccount: { type: String, required: true },
  receiverName: { type: String, required: true },
  receiverUpi: { type: String, required: true },
  receiverAccount: { type: String, required: true },
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
