const Transaction = require('../models/Transaction.js');

const mongoose = require('mongoose');



exports.getRecentTransactions = async (req, res) => {
  try {
    const userId = req.user.id; // assuming req.user is set correctly by auth middleware

    const transactions = await Transaction.find({
      $or: [
        { sender: userId },
        { recipient: userId }
      ]
    })
    .sort({ timestamp: -1 })
    .limit(10);

    const formatted = transactions.map(txn => {
      const isCredit = txn.recipient.equals(userId); // check if user is the recipient
      const counterparty = isCredit ? txn.sender : txn.recipient;

      return {
        transactionId: txn.transactionId,
        amount: txn.amount,
        type: isCredit ? 'credit' : 'debit',
        message: txn.message,
        timestamp: txn.timestamp,
        balance: isCredit ? txn.receiverBalance : txn.senderBalance,
        senderName: txn.senderName,
        receiverName: txn.receiverName,
        senderAccount: txn.senderAccount,
        receiverAccount: txn.receiverAccount
      };
    });

    res.status(200).json({ transactions: formatted });
  } catch (err) {
    console.error('Error fetching transactions:', err);
    res.status(500).json({ error: 'Failed to fetch transaction history' });
  }
};
