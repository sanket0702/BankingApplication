const User = require('../models/User.js');
const Transaction = require('../models/Transaction.js');

const {generateTransactionId}= require('../helper/generateTransactionId.js')
const {sendCreditedEmail,sendDebitedEmail}=require('../utils/mailer/TransactionMessage.js')
const buildDebitEmail = require('../HtmlMessages/Transactions/buildDebitEmail.js');

const buildCreditEmail = require('../HtmlMessages/Transactions/buildCreditEmail.js');

// Send Money
// Send Money Controller
exports.sendMoney = async (req, res) => {
  try {
    const { recipient, amount, message } = req.body;
    const sender = req.user;

    // Validate amount
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ error: 'Amount must be a valid number greater than zero' });
    }

    // Find recipient by accountNumber or UPI ID
    const recipientUser = await User.findOne({
      $or: [{ accountNumber: recipient }, { upiId: recipient }],
    });

    if (!recipientUser) {
      return res.status(404).json({ error: 'Recipient not found' });
    }

    // Prevent self-transfer
    if (
      sender.accountNumber === recipientUser.accountNumber ||
      sender.upiId === recipientUser.upiId
    ) {
      return res.status(400).json({ error: 'Cannot send money to your own account' });
    }

    // Ensure balances are numbers
    sender.balance = parseFloat(sender.balance) || 0;
    recipientUser.balance = parseFloat(recipientUser.balance) || 0;

    if (sender.balance < numericAmount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    // Update balances
    sender.balance = parseFloat((sender.balance - numericAmount).toFixed(2));
    recipientUser.balance = parseFloat((recipientUser.balance + numericAmount).toFixed(2));

    // Save updated balances
    await Promise.all([sender.save(), recipientUser.save()]);

    // Generate transaction ID and timestamp
    const transactionId = generateTransactionId();
    const timestamp = new Date();

    // Create transaction document
    const transaction = new Transaction({
      transactionId,
      type: 'transfer',
      sender: sender._id,
      recipient: recipientUser._id,
      amount: numericAmount,
      message: message || '',
      timestamp,
      senderName: sender.fullName,
      senderUpi: sender.upiId,
      senderAccount: sender.accountNumber,
      receiverName: recipientUser.fullName,
      receiverUpi: recipientUser.upiId,
      receiverAccount: recipientUser.accountNumber,
      senderBalance: sender.balance,
      receiverBalance: recipientUser.balance,
    });

    await transaction.save();

    // Send email notifications in parallel
    await Promise.all([
      sendDebitedEmail(sender.email, 'Debit Alert - Trusted Bank', sender, recipientUser, numericAmount, transactionId, timestamp),
      sendCreditedEmail(recipientUser.email, 'Credit Alert - Trusted Bank', sender, recipientUser, numericAmount, transactionId, timestamp),
    ]);

    // Response
    res.status(200).json({
      message: 'Transaction successful',
      transactionId,
      timestamp,
      senderNewBalance: sender.balance,
      receiverNewBalance: recipientUser.balance,
    });

  } catch (error) {
    console.error('Send Money Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};





exports.getUserTransactions = async (req, res) => {
  try {
    const userId = req.user.id;

    const transactions = await Transaction.find({
      $or: [{ sender: userId }, { recipient: userId }]
    })
    .populate('sender', 'fullName accountNumber upiId')
    .populate('recipient', 'fullName accountNumber upiId')
    .sort({ timestamp: -1 });

    const formatted = transactions.map(txn => {
      const isCredit = txn.recipient._id.toString() === userId;
      const counterparty = isCredit ? txn.sender : txn.recipient;

      return {
        type: isCredit ? 'credit' : 'debit',
        amount: txn.amount,
        message: txn.message,
        timestamp: txn.timestamp,
        counterpartyName: counterparty.fullName,
        counterpartyUpi: counterparty.upiId,
        counterpartyAccount: counterparty.accountNumber
      };
    });

    res.status(200).json({ transactions: formatted });
  } catch (err) {
    console.error('Error fetching transactions:', err);
    res.status(500).json({ error: 'Failed to fetch transaction history' });
  }
};

// Example Express route

