// src/lib/axios.js
import axios from "axios";

// Determine backend URL for production or use the Vite proxy in development
const baseURL =
  import.meta.env.MODE === "development"
    ? "/api" // Use relative path for the Vite proxy
    : import.meta.env.VITE_API_BASE_URL; // Use environment variable for production

const instance = axios.create({
  baseURL,
  withCredentials: true, // This is important for sending cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
