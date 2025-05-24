const Transaction = require('../models/Transaction.js');

const mongoose = require('mongoose');



exports.getRecentTransactions = async (req, res) => {
  try {
    const userId = req.user.id;

    const transactions = await Transaction.find({
      $or: [{ sender: userId }, { recipient: userId }]
    })
      .sort({ timestamp: -1 })
      .limit(10);

    const formatted = transactions.map(txn => {
      let typeLabel = '';
      let balance = 0;

      if (txn.type === 'deposit') {
        typeLabel = 'credit';
        balance = txn.receiverBalance;
      } else if (txn.type === 'withdrawal') {
        typeLabel = 'debit';
        balance = txn.senderBalance;
      } else if (txn.type === 'transfer') {
        const isCredit = txn.recipient.equals(userId);
        typeLabel = isCredit ? 'credit' : 'debit';
        balance = isCredit ? txn.receiverBalance : txn.senderBalance;
      }

      return {
        transactionId: txn.transactionId,
        amount: txn.amount,
        type: typeLabel,
        message: txn.message || '',
        timestamp: txn.timestamp,
        balance,
        senderName: txn.senderName || 'Bank',
        receiverName: txn.receiverName || 'Bank',
        senderAccount: txn.senderAccount || '',
        receiverAccount: txn.receiverAccount || '',
        transactionType: txn.type // helpful for frontend filtering
      };
    });

    res.status(200).json({ transactions: formatted });
  } catch (err) {
    console.error('Error fetching transactions:', err);
    res.status(500).json({ error: 'Failed to fetch transaction history' });
  }
};
