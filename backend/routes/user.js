const express = require('express');
const router = express.Router();
const { getUserDetails } = require('../controllers/userController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

router.get('/details', authMiddleware, getUserDetails);

module.exports = router;
