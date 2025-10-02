import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api", // Use relative path to work with Vite proxy
  withCredentials: true, // This is important for sending cookies
});

export default axiosInstance;