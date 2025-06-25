import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'ngo'],
    default: 'user',
  },
  // 👇 Password reset fields
  resetToken: {
    type: String,
  },
  resetTokenExpiry: {
    type: Date,
  },
});

export default mongoose.model('User', userSchema);
