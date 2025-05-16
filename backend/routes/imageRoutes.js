const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinary.js');
const User = require('../models/User.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Upload or Update Profile Image
router.put('/profile-image', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // Delete old image if it exists
    if (user.image.public_id) {
      await cloudinary.uploader.destroy(user.image.public_id);
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder: 'users' }, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      stream.end(req.file.buffer);
    });

    user.image = {
      url: result.secure_url,
      public_id: result.public_id,
    };
    await user.save();

    res.status(200).json({ message: 'Image updated', image: user.image });
  } catch (err) {
    res.status(500).json({ error: 'Image update failed' });
  }
});

// Get current user's image
router.get('/profile-image', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ image: user.image });
    console.log(user)
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch image' });
  }
});

module.exports = router;
