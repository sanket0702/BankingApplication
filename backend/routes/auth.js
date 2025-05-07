const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController.js');
//const authMiddleware = require('../middlewares/authMiddleware.js');

router.post('/register', register);
router.post('/login', login);

module.exports = router;
