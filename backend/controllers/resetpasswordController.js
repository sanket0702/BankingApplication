// controllers/resetPasswordController.js
const User = require('../models/User.js');
const {sendOtpEmail} = require('../utils/mailer/sendEmail.js');
const otpStore = new Map();

exports.requestPasswordReset = async (req, res) => {
  const { accountNumber } = req.body;

  try {
    if (!accountNumber) {
      return res.status(400).json({ message: 'Account number is required' });
    }

    const user = await User.findOne({ accountNumber });
    if (!user) {
      return res.status(404).json({ message: 'Account not found' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(accountNumber, { otp, expiresAt: Date.now() + 10 * 60 * 1000 });

    await sendOtpEmail(user.email, otp);
    res.json({ message: 'OTP sent to registered email.' });
  } catch (error) {
    console.error('Error in requestPasswordReset:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.resendOtp = async (req, res) => {
  const { accountNumber } = req.body;

  try {
    if (!accountNumber) {
      return res.status(400).json({ message: 'Account number is required' });
    }

    const user = await User.findOne({ accountNumber });
    if (!user) {
      return res.status(404).json({ message: 'Account not found' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(accountNumber, { otp, expiresAt: Date.now() + 10 * 60 * 1000 });

    await sendOtpEmail(user.email, otp);
    res.json({ message: 'OTP resent to registered email.' });
  } catch (error) {
    console.error('Error in resendOtp:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.verifyOtp = (req, res) => {
  const { accountNumber, otp } = req.body;
  const stored = otpStore.get(accountNumber);

  if (!stored || stored.otp !== otp || stored.expiresAt < Date.now()) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  otpStore.delete(accountNumber);
  res.json({ message: 'OTP verified successfully' });
};

exports.setNewPassword = async (req, res) => {
  const { accountNumber, newPassword } = req.body;

  try {
    const user = await User.findOne({ accountNumber });
    if (!user) {
      return res.status(404).json({ message: 'Account not found' });
    }

    user.password = newPassword;
    await user.save();
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error in setNewPassword:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
