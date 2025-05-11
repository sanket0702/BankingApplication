const express = require('express');
const {requestPasswordReset,setNewPassword,resendOtp ,verifyOtp} = require('../controllers/resetpasswordController.js')

const router=express.Router();


router.post('/request',requestPasswordReset );
router.post('/resend',resendOtp);

router.post('/verify', verifyOtp);
router.post('/set',setNewPassword);



module.exports = router;