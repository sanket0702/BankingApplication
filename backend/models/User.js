const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  occupation: { type: String, required: true },
  nationality: { type: String, required: true },
  maritalStatus: { type: String, required: true },
  nominee: { type: String, required: true },
  balance: { type: Number, default: 0 },
  accountNumber: { type: String, required: true, unique: true },
  upiId: { type: String, required: true, unique: true },
  isVerified: { type: Boolean, default: false },
isActive: { type: Boolean, default: false },

  
});

const User = mongoose.model('User', userSchema);

module.exports = User;
