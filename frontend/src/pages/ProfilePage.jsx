import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LogOut,
  User,
  Loader,
  AlertCircle,
  Settings,
  Bell,
  BellOff,
  ShoppingBag,
  HelpCircle,
  Pencil,
  Check,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "../pages/useUserStore.js";

export default function ProfilePage() {
  const { user, logout, loading, error, updateProfile } = useUserStore();
  const navigate = useNavigate();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "customer",
    age: user?.age || "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "customer",
        age: user.age || "",
      });
    }
  }, [user]);

  // Redirect to login if no user
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login", { replace: true });
    }
  }, [user, loading, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await updateProfile(formData);
    setSuccessMessage("Profile updated successfully.");
    setIsEditing(false);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <Loader className="animate-spin text-emerald-400" size={48} />
      </div>
    );
  }

  if (!user) return null;

  return (
    <motion.div
      className="fixed left-0 top-16 h-full w-96 bg-gray-900 shadow-lg p-8 text-white overflow-y-auto"
      initial={{ x: -400 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <User size={56} className="text-emerald-400 mx-auto mb-2" />
          <h2 className="text-2xl font-bold">{user.name || "No Name"}</h2>
          <p className="text-gray-400 text-sm">{user.email}</p>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg text-emerald-300 font-semibold">Profile Details</h3>
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center text-sm text-gray-300 hover:text-white transition"
            >
              {isEditing ? <><X size={16} className="mr-1" /> Cancel</> : <><Pencil size={16} className="mr-1" /> Edit</>}
            </button>
          </div>

          {["name", "email", "role", "age"].map((field) => (
            <div key={field}>
              <label className="block text-gray-300 mb-1 capitalize">{field}</label>
              {field === "role" ? (
                <select
                  disabled={!isEditing}
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className={`w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-emerald-500 ${
                    !isEditing ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>
              ) : (
                <input
                  type={field === "age" ? "number" : "text"}
                  min={field === "age" ? "1" : undefined}
                  max={field === "age" ? "120" : undefined}
                  disabled={!isEditing}
                  value={formData[field]}
                  onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                  className={`w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-emerald-500 ${
                    !isEditing ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                />
              )}
            </div>
          ))}

          {isEditing && (
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-md flex justify-center items-center transition"
            >
              <Check size={18} className="mr-2" />
              Save Changes
            </button>
          )}
        </form>

        {/* Notifications */}
        <button
          onClick={() => setNotificationsEnabled(!notificationsEnabled)}
          className="w-full bg-gray-800 hover:bg-gray-700 py-2 rounded-md text-sm flex items-center justify-center"
        >
          {notificationsEnabled ? (
            <>
              <Bell size={18} className="mr-2 text-emerald-400" />
              Notifications On
            </>
          ) : (
            <>
              <BellOff size={18} className="mr-2 text-red-400" />
              Notifications Off
            </>
          )}
        </button>

        {/* Action Links */}
        <div className="space-y-2">
          <Link to="/settings" className="flex items-center gap-2 text-gray-300 hover:text-emerald-400 transition">
            <Settings size={20} /> Settings
          </Link>
          <Link to="/orders" className="flex items-center gap-2 text-gray-300 hover:text-emerald-400 transition">
            <ShoppingBag size={20} /> Orders
          </Link>
          <Link to="/help" className="flex items-center gap-2 text-gray-300 hover:text-emerald-400 transition">
            <HelpCircle size={20} /> Help Center
          </Link>
        </div>

        {/* Feedback Messages */}
        {error && (
          <div className="flex items-center text-red-400 text-sm mt-4">
            <AlertCircle size={18} className="mr-2" />
            {error}
          </div>
        )}

        {successMessage && (
          <div className="flex items-center text-green-400 text-sm mt-4">
            <Check size={18} className="mr-2" />
            {successMessage}
          </div>
        )}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-500 text-white py-2 rounded-md mt-4 flex items-center justify-center"
        >
          <LogOut size={20} className="mr-2" />
          Log out
        </button>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link to="/" className="text-emerald-400 hover:underline text-sm">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
