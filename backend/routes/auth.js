const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController.js');
const authMiddleware = require('../middlewares/authMiddleware.js')
//const authMiddleware = require('../middlewares/authMiddleware.js');

router.post('/register', register);
router.post('/login', login);
// GET /api/users/me
router.get('/userdetails', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json({ user });
});


module.exports = router;
