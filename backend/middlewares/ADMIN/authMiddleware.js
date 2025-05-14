const jwt = require('jsonwebtoken');
const Admin = require('../../models/ADMIN/admin.js');

const authAdmin = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);
    if (!admin) throw new Error('Not authorized');

    req.admin = admin;
    next();
  } catch {
    res.status(401).send('Invalid Token');
  }
};

module.exports = authAdmin;
