const express = require('express');
const router = express.Router();
const { sendMoney ,getUserTransactions} = require('../controllers/transactionController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const Transaction = require('../models/Transaction.js')

router.post('/send-money', authMiddleware, sendMoney);
router.get('/history', authMiddleware, getUserTransactions);

router.get('/transactions/my', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const transactions = await Transaction.find({
      $or: [
        { sender: userId },
        { recipient: userId },
      ],
    }).sort({ timestamp: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;
