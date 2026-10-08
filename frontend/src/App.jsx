// src/App.jsx
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";

import { SignupPage } from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProductPage from "./pages/Productpage.jsx"; // ✅ fixed casing
import ProfilePage from "./pages/ProfilePage.jsx";
import CartPage from "./pages/CartPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import HelpPage from "./pages/HelpPage.jsx";

import { Toaster } from "react-hot-toast";
import { useUserStore } from "./pages/useUserStore.js";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner.jsx";

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore((state) => state);
  const location = useLocation();

  // 🔍 Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]); // ✅ include dependency

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <LoadingSpinner />
      </div>
    );
  }

  // Hide navbar on auth pages
  const hideNavbar = ["/login", "/signup"].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900 opacity-80 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[url('/assets/hero-pattern.svg')] bg-cover bg-center opacity-30 pointer-events-none z-0" />

      {/* content */}
      <div className="relative z-10">
        {!hideNavbar && <Navbar />}

        <Routes>
          {/* main pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route
            path="/profile"
            element={user ? <ProfilePage /> : <Navigate to="/login" replace />}
          />
          <Route path="/cart" element={user ? <CartPage /> : <Navigate to="/login" replace />} />
          <Route path="/payment" element={user ? <PaymentPage /> : <Navigate to="/login" replace />} />
          <Route path="/settings" element={user ? <SettingsPage /> : <Navigate to="/login" replace />} />
          <Route path="/orders" element={user ? <OrdersPage /> : <Navigate to="/login" replace />} />
          <Route path="/help" element={<HelpPage />} />

          {/* auth pages */}
          <Route
            path="/signup"
            element={!user ? <SignupPage /> : <Navigate to="/" replace />}
          />
          <Route
            path="/login"
            element={!user ? <LoginPage /> : <Navigate to="/" replace />}
          />

          {/* fallback 404 */}
          <Route
            path="*"
            element={
              <h1 className="text-center mt-10 text-white text-2xl font-bold">
                404 - Page Not Found
              </h1>
            }
          />
        </Routes>
      </div>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
