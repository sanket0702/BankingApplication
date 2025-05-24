const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    unique: true,
    
  },
  type: {
    type: String,
    enum: ['transfer', 'deposit', 'withdrawal'],
    default: 'transfer',
    required: true,
  },

  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  message: { type: String },
  timestamp: { type: Date, default: Date.now },

  // Additional
  senderName: { type: String },
  senderUpi: { type: String },
  senderAccount: { type: String },
  receiverName: { type: String, required: true },
  receiverUpi: { type: String, required: true },
  receiverAccount: { type: String, required: true },
  senderBalance: { type: Number },
  receiverBalance: { type: Number, required: true },
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
