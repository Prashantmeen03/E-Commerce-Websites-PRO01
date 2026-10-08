import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "../lib/axios.js";

// Utility: extract error message safely
const getErrorMessage = (err, fallback) => {
  if (err?.response?.data?.message) return err.response.data.message;
  if (err?.message) return err.message;
  return fallback;
};

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      loading: false,
      checkingAuth: false,
      error: null,

      // ---- SIGNUP ----
      signup: async ({ name, email, password, confirmPassword, role, age }) => {
        if (password !== confirmPassword) {
          const msg = "Passwords do not match.";
          set({ error: msg });
          return false;
        }

        set({ loading: true, error: null });

        try {
          const res = await axios.post(
            "/auth/signup",
            { name, email, password, role, age },
            { withCredentials: true }
          );
          set({ user: res.data.user, error: null });
          return true;
        } catch (err) {
          const errorMessage = getErrorMessage(err, "Signup failed. Please try again.");
          set({ error: errorMessage });
          return false;
        } finally {
          set({ loading: false });
        }
      },

      // ---- LOGIN ----
      login: async ({ email, password }) => {
        set({ loading: true, error: null });

        try {
          const res = await axios.post(
            "/auth/login",
            { email, password },
            { withCredentials: true }
          );
          set({ user: res.data.user, error: null });
          return true;
        } catch (err) {
          const errorMessage = getErrorMessage(err, "Login failed. Please try again.");
          set({ error: errorMessage });
          return false;
        } finally {
          set({ loading: false });
        }
      },

      // ---- LOGOUT ----
      logout: async () => {
        set({ loading: true, error: null });

        try {
          await axios.post("/auth/logout", {}, { withCredentials: true });
          set({ user: null, error: null });
          return true;
        } catch (err) {
          const errorMessage = getErrorMessage(err, "Logout failed. Please try again.");
          set({ error: errorMessage });
          return false;
        } finally {
          set({ loading: false });
        }
      },

      // ---- UPDATE PROFILE ----
      updateProfile: async ({ name, email, role, age }) => {
        set({ loading: true, error: null });

        try {
          const res = await axios.put(
            "/auth/profile",
            { name, email, role, age },
            { withCredentials: true }
          );
          set({ user: res.data.user, error: null });
          return true;
        } catch (err) {
          const errorMessage = getErrorMessage(err, "Update failed. Please try again.");
          set({ error: errorMessage });
          return false;
        } finally {
          set({ loading: false });
        }
      },

      // ---- CHECK AUTH ----
      checkAuth: async () => {
        set({ checkingAuth: true });

        try {
          const res = await axios.get("/auth/profile", { withCredentials: true });
          set({ user: res.data.user || null });
        } catch {
          set({ user: null });
        } finally {
          set({ checkingAuth: false });
        }
      },

      // ---- HELPERS ----
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null, error: null }),
      clearError: () => set({ error: null }),
    }),
    {
      name: "user-storage",
      partialize: (state) => ({ user: state.user }), // persist only user
    }
  )
);
