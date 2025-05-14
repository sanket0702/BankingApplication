const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/ADMIN/adminControllers.js');
const authAdmin = require('../../middlewares/ADMIN/authMiddleware.js');

router.post('/register', adminController.registerAdmin);

router.post('/login', adminController.adminLogin);
router.get('/search', authAdmin, adminController.searchUser);
router.post('/deposit', authAdmin, adminController.depositToUser);
router.get('/pending-approvals', authAdmin, adminController.getPendingApprovals);
router.post('/approve', authAdmin, adminController.approveUser);
router.put('/update/:accountNumber', authAdmin, adminController.updateUserDetails);

module.exports = router;
