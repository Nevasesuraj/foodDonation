import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// ✅ Send OTP (existing)
export const sendVerificationEmail = async (email, otp) => {
  const mailOptions = {
    from: '"Security" <your_email@gmail.com>',
    to: email,
    subject: 'Your OTP Code for Secure Login',
    html: `<h1>Your OTP Code is: <b>${otp}</b></h1><p>This code will expire in 5 minutes.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

// ✅ Send Password Reset Link (new)
export const sendResetPasswordEmail = async (email, link) => {
  const mailOptions = {
    from: '"Security" <your_email@gmail.com>',
    to: email,
    subject: 'Reset Your Password',
    html: `
      <h2>Password Reset Request</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${link}" target="_blank">${link}</a>
      <p>This link will expire in 15 minutes.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
