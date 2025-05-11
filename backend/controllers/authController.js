const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

// Register User
exports.register = async (req, res) => {
  const { fullName, email, password, ...rest } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    const upiId = email.split('@')[0] + '@bank';

    const newUser = new User({
      ...rest,
      fullName,
      email,
      password: hashedPassword,
      accountNumber,
      upiId,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id,name: user.fullName, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log(user._id);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
