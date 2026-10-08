import axios from "axios";

const API_URL = "/api/auth";

export const signup = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (err) {
    // Return backend error message
    return { error: err.response?.data?.message || "Signup failed" };
  }
};
