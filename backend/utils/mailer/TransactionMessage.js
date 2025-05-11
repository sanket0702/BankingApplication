
require('dotenv').config(); // Make sure this is at the very top

const nodemailer = require('nodemailer');

// Create transporter with Gmail and credentials from .env
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});






exports.sendDebitedEmail = async (to,subject,sender, recipientUser, numericAmount, transactionId, timestamp ) => {
  try {
    

        const Debited=`<!DOCTYPE html>
      <html lang="en">
      <body style="margin: 0; padding: 0; background-color: #f2f2f2; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f2f2f2; padding: 40px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.07);">
                <tr>
                  <td style="background: linear-gradient(135deg, #c70000, #ff4d4d); padding: 30px; color: #ffffff; text-align: center;">
                    <h2 style="margin: 0; font-size: 26px;">💳 Debit Transaction Alert</h2>
                    <p style="margin: 8px 0 0; font-size: 14px;">Trusted Bank</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 35px 30px; color: #333333;">
                    <p style="font-size: 16px; margin: 0 0 10px;">Hello ${sender.fullName},</p>
                    <p style="font-size: 15px; margin: 0 0 20px;">
                      This is to inform you that a debit transaction has occurred on your account:
                    </p>
                    <table width="100%" cellpadding="12" cellspacing="0" style="background-color: #fdfdfd; border: 1px solid #e5e5e5; border-radius: 8px; font-size: 15px; color: #222;">
                      <tr>
                        <td style="width: 50%;"><strong>Amount Debited:</strong></td>
                        <td style="color: #d10000;"><strong>₹${numericAmount}</strong></td>
                      </tr>
                      <tr>
                        <td><strong>To:</strong></td>
                        <td>${recipientUser.fullName}</td>
                      </tr>
                      <tr>
                        <td><strong>Recipient A/C:</strong></td>
                        <td>${recipientUser.accountNumber}</td>
                      </tr>
                      <tr>
                        <td><strong>Transaction ID:</strong></td>
                        <td>${transactionId}</td>
                      </tr>
                      <tr>
                        <td><strong>Date & Time:</strong></td>
                        <td>${timestamp}</td>
                      </tr>
                      <tr>
                        <td><strong>Available Balance:</strong></td>
                        <td>₹${sender.balance}</td>
                      </tr>
                    </table>
                    <p style="font-size: 14px; color: #666666; margin-top: 25px;">
                      If you did not make this transaction, please contact our 24/7 support immediately at
                      <a href="mailto:support@trustedbank.com" style="color: #d10000; text-decoration: none;">support@trustedbank.com</a>
                      or call <strong>1800-000-000</strong>.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #fafafa; padding: 20px; text-align: center; font-size: 12px; color: #999999;">
                    © 2025 Trusted Bank. All Rights Reserved.<br />
                    This is an automated notification. Please do not reply to this email.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>`

    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: subject,
      html: Debited,
    };

    await transporter.sendMail(mailOptions);
    console.log('OTP email sent successfully.');
  } catch (error) {
    console.error('Error sending OTP email:', error);
  }
};



exports.sendCreditedEmail = async (to,subject, sender, recipientUser, numericAmount, transactionId, timestamp) => {
  try {

   const Credited=`<html lang="en">
  <body style="margin: 0; padding: 0; background-color: #f2f2f2; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f2f2f2; padding: 40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.07);">
            
            <!-- Header -->
            <tr>
              <td style="background: linear-gradient(135deg, #007d33, #00cc66); padding: 30px; color: #ffffff; text-align: center;">
                <h2 style="margin: 0; font-size: 26px;">💰 Credit Transaction Alert</h2>
                <p style="margin: 8px 0 0; font-size: 14px;">Trusted Bank</p>
              </td>
            </tr>

            <!-- Transaction Info -->
            <tr>
              <td style="padding: 35px 30px; color: #333333;">
                <p style="font-size: 16px; margin: 0 0 10px;">Hello ${recipientUser.fullName},</p>
                <p style="font-size: 15px; margin: 0 0 20px;">
                  A new credit has been received in your account as per the following details:
                </p>

                <table width="100%" cellpadding="12" cellspacing="0" style="background-color: #fdfdfd; border: 1px solid #e5e5e5; border-radius: 8px; font-size: 15px; color: #222;">
                  <tr>
                    <td style="width: 50%;"><strong>Amount Credited:</strong></td>
                    <td style="color: #007d33;"><strong>₹${numericAmount}</strong></td>
                  </tr>
                  <tr>
                    <td><strong>From:</strong></td>
                    <td>${sender.fullName}</td>
                  </tr>
                  <tr>
                    <td><strong>Sender A/C:</strong></td>
                    <td>${sender.accountNumber}</td>
                  </tr>
                  <tr>
                    <td><strong>Transaction ID:</strong></td>
                    <td>${transactionId}</td>
                  </tr>
                  <tr>
                    <td><strong>Date & Time:</strong></td>
                    <td>${timestamp}</td>
                  </tr>
                  <tr>
                    <td><strong>Available Balance:</strong></td>
                    <td>₹${recipientUser.balance}</td>
                  </tr>
                </table>

                <p style="font-size: 14px; color: #666666; margin-top: 25px;">
                  If this credit was not expected or seems suspicious, please contact our 24/7 support at
                  <a href="mailto:support@trustedbank.com" style="color: #007d33; text-decoration: none;">support@trustedbank.com</a>
                  or call <strong>1800-000-000</strong>.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color: #fafafa; padding: 20px; text-align: center; font-size: 12px; color: #999999;">
                © 2025 Trusted Bank. All Rights Reserved.<br />
                This is an automated notification. Please do not reply to this email.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`

    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: subject,
      html: Credited,
    };

    await transporter.sendMail(mailOptions);
    console.log('OTP email sent successfully.');
  } catch (error) {
    console.error('Error sending OTP email:', error);
  }
};

