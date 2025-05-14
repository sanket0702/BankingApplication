const User = require('../../models/User.js');
const Admin = require('../../models/ADMIN/admin.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};



// Admin login
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, admin });
};

// Search user by account number
exports.searchUser = async (req, res) => {
  const { accountNumber } = req.query;
  const user = await User.findOne({ accountNumber });
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

// Deposit to user
exports.depositToUser = async (req, res) => {
  const { accountNumber, amount } = req.body;
  const user = await User.findOne({ accountNumber });
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.balance += parseFloat(amount);
  await user.save();

  res.json({ message: `Deposited ₹${amount} to ${user.fullName}` });
};

// Get all unverified users
exports.getPendingApprovals = async (req, res) => {
  const users = await User.find({ isVerified: false, isActive: false });
  res.json(users);
};

// Approve a user account
exports.approveUser = async (req, res) => {
  const { accountNumber } = req.body;
  const user = await User.findOne({ accountNumber });
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.isVerified = true;
  user.isActive = true;
  await user.save();

  res.json({ message: `User ${user.fullName} has been approved` });
};

// Update user details
exports.updateUserDetails = async (req, res) => {
  const { accountNumber } = req.params;
  const { fullName, email, phone, nominee } = req.body;

  const user = await User.findOne({ accountNumber });
  if (!user) return res.status(404).json({ message: 'User not found' });

  if (fullName) user.fullName = fullName;
  if (email) user.email = email;
  if (phone) user.phone = phone;
  if (nominee) user.nominee = nominee;

  await user.save();
  res.json({ message: 'User details updated', user });
};
