import crypto from 'crypto';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import sendMail from '../utilities/mailer.js'; // assumes your mailer sends plain text emails
import { sendResetPasswordEmail } from '../utilities/mailer.js';

// Forgot Password Controller
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email }); // ✅ await

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const otp = generateOTP();
    user.resetOTP = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;
    await user.save(); // ✅ await

    await sendVerificationEmail(email, otp); // ✅ await

    res.status(200).json({ message: 'OTP sent to your email' }); // ✅ send response
  } catch (error) {
    console.error('Forgot Password Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Reset Password Controller
export const resetPassword = async (req, res) => {
  const { email, token, newPassword } = req.body;

  if (!email || !token || !newPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const user = await User.findOne({ email, resetToken: token });

    if (!user || user.resetTokenExpiry < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();
    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (err) {
    console.error('Reset Password Error:', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
