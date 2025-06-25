import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  getAllngos,
  getAllUsers,
  forgotPassword,     // 👈 new import
  resetPassword       // 👈 new import
} from '../controllers/user.controller.js';

import { protect } from '../middlewares/authprotect.js';
import upload from '../middlewares/upload.middleware.js';
import {
  createDonation,
  autoAssignDonation,
  getDonationsForNgo,
  updateDonationStatus,
  getMyDonations
} from '../controllers/donation.controller.js';

const router = express.Router();

// 🟢 Auth Routes
router.post('/register', upload.single('profilePhoto'), registerUser);
router.post('/login', upload.none(), loginUser);
router.post('/logout', logoutUser);
router.get('/getuser', protect, getCurrentUser);

// 🟢 Forgot Password Routes (NEW)
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// 🟢 Admin Routes
router.get('/users', protect, getAllUsers);
router.get('/ngos', protect, getAllngos);

// 🟢 Donation Routes
router.post('/donate/:ngoId', protect, upload.single('foodPhoto'), createDonation);
router.get('/requests', protect, getDonationsForNgo);
router.patch('/donations/:donationId/status', protect, updateDonationStatus);
router.get('/mydonations', protect, getMyDonations);
router.post('/donate', protect, upload.single('foodPhoto'), autoAssignDonation);

export default router;
