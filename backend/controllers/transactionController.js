const User = require('../models/User.js');
const Transaction = require('../models/Transaction.js');

const {generateTransactionId}= require('../helper/generateTransactionId.js')
const {sendCreditedEmail,sendDebitedEmail}=require('../utils/mailer/TransactionMessage.js')
const buildDebitEmail = require('../HtmlMessages/Transactions/buildDebitEmail.js');

const buildCreditEmail = require('../HtmlMessages/Transactions/buildCreditEmail.js');

// Send Money
exports.sendMoney = async (req, res) => {
  try {
    const { recipient, amount, message } = req.body;
    const sender = req.user;

    // Ensure amount is a number
    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount <= 0) {
      return res.status(400).json({ error: 'Amount must be a valid number greater than zero' });
    }

    const recipientUser = await User.findOne({
      $or: [{ accountNumber: recipient }, { upiId: recipient }],
    });

    if (
      sender.accountNumber === recipientUser.accountNumber ||
      sender.upiId === recipientUser.upiId
    ) {
      return res.status(400).json({ error: 'Cannot send money to your own account' });
    }

    if (!recipientUser) {
      return res.status(404).json({ error: 'Recipient not found' });
    }

    // Ensure balances are numbers
    sender.balance = Number(sender.balance);
    recipientUser.balance = Number(recipientUser.balance);

    if (sender.balance < numericAmount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    // Perform balance update
    sender.balance -= numericAmount;
    recipientUser.balance += numericAmount;

    // Save both users
    await sender.save();
    await recipientUser.save();

// Generate unique transaction ID
    const transactionId = generateTransactionId();

    const timestamp = new Date(); 

    // Save transaction
    const transaction = new Transaction({

      transactionId,
      sender: sender._id,
      recipient: recipientUser._id,
      amount: numericAmount,
      message,
      senderName: sender.fullName,
      senderUpi: sender.upiId,
      senderAccount: sender.accountNumber,
      receiverName: recipientUser.fullName,
      receiverUpi: recipientUser.upiId,
      receiverAccount: recipientUser.accountNumber,
      senderBalance: sender.balance, // Store sender's balance after transaction
      receiverBalance: recipientUser.balance,
      timestamp
    });
    await transaction.save();
console.log(sender.email);







    // Send email notifications
    

await sendDebitedEmail(sender.email, 'Debit Alert - Trusted Bank',sender, recipientUser, numericAmount, transactionId, timestamp);


    await sendCreditedEmail(recipientUser.email, 'Credit Alert - Trusted Bank',sender, recipientUser, numericAmount, transactionId, timestamp);


    res.json({ message: 'Transaction successful' });
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