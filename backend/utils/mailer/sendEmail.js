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




// Send plain text email
exports.sendEmail = async (to, subject,accountNumber,fullName ) => {
  try {
    console.log(`Sending email to ${to}: ${subject}`);

     

    const htmlContent = `
      <html>
       <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f2f2f2;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f2f2f2; padding: 30px 0;">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 5px 20px rgba(0,0,0,0.1); overflow: hidden;">
            <!-- Header -->
            <tr>
              <td align="center" style="padding: 30px 20px; background: linear-gradient(135deg, #ff4e50, #f00000); color: #ffffff;">
                <h1 style="margin: 0; font-size: 28px;">🎉 Welcome Aboard!</h1>
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding: 30px 20px; text-align: center;">
                <p style="font-size: 16px; color: #333333; margin: 0 0 10px 0;">
                  Hello <strong>${fullName}</strong>,
                </p>
                <p style="font-size: 16px; color: #333333; margin: 0 0 20px 0;">
                  Your new account has been successfully created with us.
                </p>

                <div style="display: inline-block; background-color: #f00000; color: #ffffff; font-size: 18px; font-weight: bold; padding: 15px 25px; border-radius: 8px; margin: 20px 0; letter-spacing: 1px;">
                 <p> Account Number: <br />${accountNumber}</p>
                </div>

                <p style="font-size: 15px; color: #555555; line-height: 1.6; margin: 20px 0;">
                  We're excited to be part of your financial journey.<br />
                  Thank you for choosing us!
                </p>

                <a href="#" style="display: inline-block; background-color: #f00000; color: #ffffff; text-decoration: none; padding: 12px 25px; font-size: 16px; border-radius: 6px; font-weight: bold; margin-top: 20px;">
                  Visit Your Account
                </a>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="padding: 20px; background-color: #f9f9f9; color: #999999; font-size: 12px;">
                © 2025 Trusted Bank. All rights reserved.<br />
                This is an automated message. Please do not reply.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
      </html>
    `;


    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
       html: htmlContent,
    };

    transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('❌ Email sending failed:', error);
  } else {
    console.log('✅ Email sent:', info.response);
  }
})



  } catch (error) {
    console.error('Error sending email:', error);
  }
};





// Send OTP email with HTML
exports.sendOtpEmail = async (to, otp) => {
  try {


    const otpContent =`<body style="margin: 0; padding: 0; background-color: #f6f6f6; font-family: Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding: 30px 0; background-color: #f6f6f6;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <tr>
              <td style="background: linear-gradient(135deg, #f00000, #ff4e50); padding: 30px 20px; color: #ffffff; text-align: center;">
                <h1 style="margin: 0; font-size: 26px;">🔐 Trusted Bank</h1>
                <p style="margin: 5px 0 0 0; font-size: 16px;">Your secure code</p>
              </td>
            </tr>
            
            <!-- OTP Section -->
            <tr>
              <td style="padding: 40px 30px; text-align: center;">
                <p style="font-size: 16px; color: #333333; margin-bottom: 25px;">
                  Please use the following One-Time Password (OTP) to complete your action. This code is valid for <strong>10 minutes</strong>.
                </p>

                <div style="display: inline-block; background-color: #f00000; color: #ffffff; padding: 15px 30px; font-size: 24px; font-weight: bold; letter-spacing: 3px; border-radius: 8px; margin: 20px 0;">
                  ${otp}
                </div>

                <p style="font-size: 14px; color: #777777; margin-top: 30px;">
                  Do not share this code with anyone. Trusted Bank will never ask you for your OTP.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color: #fafafa; padding: 20px; text-align: center; color: #999999; font-size: 12px;">
                © 2025 Trusted Bank. All rights reserved.<br />
                This email was sent automatically. Please do not reply.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>`

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: 'Password Reset OTP',
      html: otpContent,
    };

    await transporter.sendMail(mailOptions);
    console.log('OTP email sent successfully.');
  } catch (error) {
    console.error('Error sending OTP email:', error);
  }
};

