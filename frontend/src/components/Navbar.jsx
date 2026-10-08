import { ShoppingCart, LogIn, Lock, UserPlus, User, Settings, Bell } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useUserStore } from "../pages/useUserStore";
import useCartStore from "../stores/useCartStore";

const Navbar = () => {
  const { user } = useUserStore();
  const isAdmin = user?.role === "admin";
  const isOwner = user?.role === "owner";
  const cartCount = useCartStore((state) => state.getItemCount());

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-95 shadow-md border-b border-emerald-700 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-emerald-400 tracking-wide hover:text-emerald-300 transition"
        >
          Smart Shop
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-5">
          <Link
            to="/"
            className="text-gray-300 hover:text-emerald-400 font-medium transition"
          >
            Home
          </Link>

          {/* Profile */}
          {user && (
            <Link
              to="/profile"
              className="flex items-center gap-1.5 text-gray-300 hover:text-emerald-400 transition"
            >
              <User size={20} className="mr-1" />
              <span className="hidden sm:inline">Profile</span>
            </Link>
          )}

          {/* Cart */}
          {user && (
            <Link
              to="/cart"
              className="relative flex items-center text-gray-300 hover:text-emerald-400 transition"
            >
              <ShoppingCart size={20} className="mr-1" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          )}



          {/* Owner / Admin Dashboard */}
          {(isAdmin || isOwner) && (
            <Link
              to="/dashboard"
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-md font-medium flex items-center transition"
            >
              <Lock size={18} className="mr-1" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          )}



          {/* Auth buttons */}
          {!user && (
            <div className="flex gap-2">
              <Link
                to="/login"
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-md flex items-center transition"
              >
                <LogIn size={18} className="mr-1" />
                <span className="hidden sm:inline">Login</span>
              </Link>
              <Link
                to="/signup"
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-md flex items-center transition"
              >
                <UserPlus size={18} className="mr-1" />
                <span className="hidden sm:inline">Sign Up</span>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
