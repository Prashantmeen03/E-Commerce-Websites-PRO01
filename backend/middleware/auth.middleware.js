import jwt from "jsonwebtoken";
import User from "../models/user.model.js"; // ensure this path is correct

// ---------------- PROTECT ROUTE ----------------
export const protectRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.access_token; // optional chaining

    if (!accessToken) {
      return res.status(401).json({ message: "No access token provided" });
    }

    let decoded;
    try {
      decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Access token expired" });
      }
      console.error("JWT verification error:", err.message);
      return res.status(401).json({ message: "Unauthorized - Invalid access token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

// ---------------- ADMIN ROUTE ----------------
export const adminRoute = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin privileges required." });
    }

    next();
  } catch (error) {
    console.error("Error in adminRoute middleware:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};
