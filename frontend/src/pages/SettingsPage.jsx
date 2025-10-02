import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Moon, Sun, Globe, Shield, User, Bell, Palette, ArrowLeft } from "lucide-react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("en");
  const [notifications, setNotifications] = useState(true);
  const [privacy, setPrivacy] = useState("public");

  return (
    <motion.div
      className="min-h-screen bg-gray-900 text-white pt-16 p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        <Link to="/profile" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 mb-4 transition">
          <ArrowLeft size={20} className="mr-2" />
          Back to Profile
        </Link>
        <h1 className="text-4xl font-bold mb-8 text-emerald-400">Settings</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Appearance */}
          <motion.div
            className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center mb-4">
              <Palette className="text-emerald-400 mr-3" size={24} />
              <h2 className="text-2xl font-semibold">Appearance</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  {darkMode ? <Moon className="mr-2" size={20} /> : <Sun className="mr-2" size={20} />}
                  <span>Dark Mode</span>
                </div>
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                  className="toggle toggle-success"
                />
              </div>
            </div>
          </motion.div>

          {/* Language */}
          <motion.div
            className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center mb-4">
              <Globe className="text-emerald-400 mr-3" size={24} />
              <h2 className="text-2xl font-semibold">Language</h2>
            </div>
            <div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-3 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="hi">Hindi</option>
                <option value="fr">French</option>
              </select>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div
            className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center mb-4">
              <Bell className="text-emerald-400 mr-3" size={24} />
              <h2 className="text-2xl font-semibold">Notifications</h2>
            </div>
            <div className="flex justify-between items-center">
              <span>Enable Notifications</span>
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
                className="toggle toggle-success"
              />
            </div>
          </motion.div>

          {/* Privacy */}
          <motion.div
            className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center mb-4">
              <Shield className="text-emerald-400 mr-3" size={24} />
              <h2 className="text-2xl font-semibold">Privacy</h2>
            </div>
            <div>
              <select
                value={privacy}
                onChange={(e) => setPrivacy(e.target.value)}
                className="w-full p-3 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="public">Public</option>
                <option value="friends">Friends Only</option>
                <option value="private">Private</option>
              </select>
            </div>
          </motion.div>
        </div>

        <motion.button
          className="mt-8 bg-emerald-600 hover:bg-emerald-500 py-3 px-6 rounded-lg font-semibold transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Save Settings
        </motion.button>
      </div>
    </motion.div>
  );
}
