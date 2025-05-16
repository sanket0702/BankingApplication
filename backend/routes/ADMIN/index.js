const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/ADMIN/adminControllers.js');
const authAdmin = require('../../middlewares/ADMIN/authMiddleware.js');
const User =require('../../models/User.js')
const { rejectMails } = require('../../utils/mailer/sendEmail.js');

router.post('/register', adminController.registerAdmin);

router.post('/login', adminController.adminLogin);
router.get('/search', authAdmin, adminController.searchUser);
router.post('/deposit', authAdmin, adminController.depositToUser);
router.get('/pending-approvals', authAdmin, adminController.getPendingApprovals);
router.post('/approve', authAdmin, adminController.approveUser);

router.put('/update/:accountNumber', authAdmin, adminController.updateUserDetails);

router.delete('/reject', authAdmin, async (req, res) => {
  const { accountNumber } = req.body;
  const user = await User.findOne({accountNumber});

  

  await rejectMails(user.email, 'Account Rejected', `<div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 30px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); overflow: hidden;">
    <div style="background-color: #dc2626; padding: 20px; text-align: center;">
      <h2 style="color: #ffffff; margin: 0;">Account Rejected</h2>
    </div>
    <div style="padding: 20px; color: #333333;">
      <p>Dear User,</p>

      <p>We regret to inform you that your recent application to open a bank account has been <strong>rejected</strong> after careful review.</p>

      <p>This may have happened due to missing or incorrect information in your application. You may re-apply with accurate details or contact support for further clarification.</p>

      <p>If you believe this is an error or you wish to appeal the decision, please reach out to our team at <a href="mailto:support@yourbank.com">support@yourbank.com</a>.</p>

      <p>Thank you for your interest in our services.</p>

      <p>Best regards,<br />The Bank Admin Team</p>
    </div>
    <div style="background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #666;">
      &copy; 2025 YourBank. All rights reserved.
    </div>
  </div>
</div>
`);


  await User.deleteOne({ accountNumber, isVerified: false });
  res.status(200).json({ message: 'User rejected and deleted' });
});

module.exports = router;
