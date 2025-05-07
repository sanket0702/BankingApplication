const express = require('express');
const router = express.Router();
const { sendMoney ,getUserTransactions} = require('../controllers/transactionController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

router.post('/send-money', authMiddleware, sendMoney);
router.get('/history', authMiddleware, getUserTransactions);
module.exports = router;
