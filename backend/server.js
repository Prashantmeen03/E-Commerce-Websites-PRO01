import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js'; 
import productRoutes from './routes/product.route.js';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoute from "./routes/analytics.route.js";
import cors from "cors"; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Enable CORS before routes
app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true,               // allow cookies / auth headers
}));

app.use(express.json());
app.use(cookieParser()); // Middleware to parse cookies

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/analytics", analyticsRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});
