import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './db/index.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Route imports
import userRoutes from './routes/user.routes.js';
import otpRoutes from './routes/otp.routes.js';
import donationRoutes from './routes/donation.routes.js'; // ✅ Add this

// Route mounting
app.use('/api/v1', userRoutes);
app.use('/api/v1', otpRoutes);
app.use('/api/v1', donationRoutes); // ✅ Mount this

// Connect DB and start server
connectDB();
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

app._router.stack.forEach((r) => {
  if (r.route && r.route.path) {
    console.log(r.route.path);
  }
});
