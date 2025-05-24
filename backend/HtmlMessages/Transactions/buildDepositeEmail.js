module.exports = function buildCreditEmail(recipientUser, numericAmount, transactionId, timestamp, updatedBalance) {
  return`<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Deposit Confirmation</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background-color:#ffffff; margin:30px auto; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
      <tr>
        <td style="background-color:#0066cc; padding:20px 30px; border-top-left-radius:8px; border-top-right-radius:8px;">
          <h2 style="color:#ffffff; margin:0;">Bank Deposit Confirmation</h2>
        </td>
      </tr>
      <tr>
        <td style="padding:30px;">
          <p style="font-size:16px; color:#333333; margin-top:0;">Hello <strong>${recipientUser.fullName}</strong>,</p>
          <p style="font-size:16px; color:#333333;">We are pleased to inform you that a deposit has been successfully made to your account.</p>
          <table cellpadding="0" cellspacing="0" width="100%" style="margin-top:20px;">
            <tr>
              <td style="padding:10px 0; font-size:16px; color:#555;">Transaction ID:</td>
              <td style="padding:10px 0; font-size:16px; color:#111;"><strong></strong></td>
            </tr>
            <tr>
              <td style="padding:10px 0; font-size:16px; color:#555;">Amount:</td>
              <td style="padding:10px 0; font-size:16px; color:green;"><strong>₹${numericAmount}</strong></td>
            </tr>
            <tr>
              <td style="padding:10px 0; font-size:16px; color:#555;">Date:</td>
              <td style="padding:10px 0; font-size:16px; color:#111;"><strong>{{date}}</strong></td>
            </tr>
            <tr>
              <td style="padding:10px 0; font-size:16px; color:#555;">Available Balance:</td>
              <td style="padding:10px 0; font-size:16px; color:#111;"><strong>₹${updatedBalance}</strong></td>
            </tr>
          </table>
          <p style="font-size:16px; color:#333333; margin-top:30px;">If you did not authorize this deposit or notice any discrepancies, please contact our support team immediately.</p>
          <p style="font-size:16px; color:#333333;">Thank you for banking with us.</p>
          <p style="font-size:16px; color:#0066cc; font-weight:bold;">– YourBank Team</p>
        </td>
      </tr>
      <tr>
        <td style="background-color:#f0f0f0; text-align:center; padding:20px; font-size:14px; color:#999;">
          © 2025 YourBank. All rights reserved.
        </td>
      </tr>
    </table>
  </body>
</html>


  `
}