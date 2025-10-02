import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
import { redis } from "../lib/redis.js";

config();

// ---------------- TOKEN HELPERS ----------------
const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(
    `refresh_token:${userId}`,
    refreshToken,
    "EX",
    7 * 24 * 60 * 60 // 7 days in seconds
  );
};

const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

// ---------------- AUTH CONTROLLERS ----------------

export const signup = async (req, res) => {
  try {
    const { name, email, password, role, age } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Save user (password will be hashed by the pre-save hook in the model)
    const user = await User.create({
      name,
      email,
      password,
      role: role || "customer",
      age,
    });

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken);
    setCookies(res, accessToken, refreshToken);

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        age: user.age,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error during signup" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const { accessToken, refreshToken } = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken);
    setCookies(res, accessToken, refreshToken);

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        age: user.age,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

export const logout = async (req, res) => {
  try {
    const refresh_token = req.cookies?.refresh_token; // optional chaining to prevent errors

    if (refresh_token) {
      try {
        const decoded = jwt.verify(
          refresh_token,
          process.env.REFRESH_TOKEN_SECRET
        );
        await redis.del(`refresh_token:${decoded.userId}`);
      } catch (err) {
        console.error("Invalid refresh token during logout:", err);
      }
    }

    // Clear cookies
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Server error during logout" });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refresh_token = req.cookies?.refresh_token; // optional chaining
    if (!refresh_token) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    const decoded = jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET
    );
    const userId = decoded.userId;

    const storedToken = await redis.get(`refresh_token:${userId}`);
    if (!storedToken || refresh_token !== storedToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(userId);
    await storeRefreshToken(userId, newRefreshToken);
    setCookies(res, accessToken, newRefreshToken);

    res.json({ message: "Token refreshed successfully" });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(500).json({ message: "Server error during token refresh" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, role, age } = req.body;
    const userId = req.user._id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, role, age },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        age: updatedUser.age,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({
      message: "Server error updating user profile",
      error: error.message,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    // The `protectRoute` middleware already found the user and attached it to req.user
    const { _id, name, email, role, age } = req.user;

    res.json({
      user: {
        id: _id,
        name,
        email,
        role,
        age,
      },
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({
      message: "Server error fetching user profile",
      error: error.message,
    });
  }
};
