const express = require('express');
const router = express.Router();
const {getRecentTransactions,getStatement} = require('../controllers/recentTransactionController.js');
const auth = require('../middlewares/authMiddleware.js'); // middleware that adds `req.userId`

router.get('/recent', auth, getRecentTransactions);
router.get('/statement', auth, getStatement);

module.exports = router;
