const express = require('express');
const router = express.Router();
const {getRecentTransactions} = require('../controllers/recentTransactionController.js');
const auth = require('../middlewares/authMiddleware.js'); // middleware that adds `req.userId`

router.get('/recent', auth, getRecentTransactions);

module.exports = router;
