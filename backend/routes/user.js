const express = require('express');
const router = express.Router();
const { getUserDetails } = require('../controllers/userController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');




router.get('/details', authMiddleware, getUserDetails);






router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.json({ image: user.image }); // image is { public_id, url }
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});


module.exports = router;



