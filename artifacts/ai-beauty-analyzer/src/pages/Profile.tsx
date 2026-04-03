import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  User,
  Settings,
  LogOut,
  ChevronRight,
  Moon,
  Bell,
  Shield,
  HelpCircle,
  Droplets,
} from "lucide-react";

const skinTypes = ["Dry", "Oily", "Combination", "Normal", "Sensitive"];

export default function Profile() {
  const [, setLocation] = useLocation();
  const [skinType, setSkinType] = useState("Combination");

  const handleLogout = () => {
    setLocation("/login");
  };

  const menuItems = [
    { icon: User, label: "Personal Information", value: "Demo User" },
    { icon: Droplets, label: "Skin Type", value: skinType },
    { icon: Bell, label: "Notifications", value: "On" },
    { icon: Shield, label: "Privacy", value: "" },
    { icon: HelpCircle, label: "Help & Support", value: "" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold">Profile</h1>
      </div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-3xl bg-gradient-to-br from-neon-purple/20 to-electric-blue/20 border border-dark-border"
      >
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-neon-purple to-electric-blue flex items-center justify-center text-3xl">
            👤
          </div>
          <div>
            <h2 className="font-display text-xl font-bold">Demo User</h2>
            <p className="text-gray-400">demo@tarsier.app</p>
            <span className="inline-block mt-2 px-3 py-1 rounded-full bg-neon-purple/20 text-neon-purple text-sm">
              Free Plan
            </span>
          </div>
        </div>
      </motion.div>

      {/* Skin Profile */}
      <div>
        <h2 className="font-semibold mb-3">Skin Profile</h2>
        <div className="p-4 rounded-2xl bg-dark-card border border-dark-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Your Skin Type</p>
              <p className="font-semibold text-lg">{skinType}</p>
            </div>
            <select
              value={skinType}
              onChange={(e) => setSkinType(e.target.value)}
              className="px-4 py-2 rounded-lg bg-dark-surface border border-dark-border"
            >
              {skinTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div>
        <h2 className="font-semibold mb-3">Settings</h2>
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => {}}
              className="w-full p-4 rounded-2xl bg-dark-card border border-dark-border flex items-center justify-between hover:border-neon-purple/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-gray-400" />
                <span>{item.label}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                {item.value && <span className="text-sm">{item.value}</span>}
                <ChevronRight className="w-5 h-5" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* App Info */}
      <div className="p-4 rounded-2xl bg-dark-card border border-dark-border text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-purple to-electric-blue flex items-center justify-center glow-eyes">
            <span className="text-sm">👁</span>
          </div>
          <span className="font-display font-bold text-gradient">Tarsier</span>
        </div>
        <p className="text-gray-400 text-sm">Version 1.0.0</p>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center gap-2 hover:bg-red-500/20 transition-colors"
      >
        <LogOut className="w-5 h-5" />
        Sign Out
      </button>
    </div>
  );
}
