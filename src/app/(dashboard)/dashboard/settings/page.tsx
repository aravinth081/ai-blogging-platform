"use client";
import { motion } from "framer-motion";
import { Settings as SettingsIcon, Globe, Palette, Bell, Shield, Key, Database, Code } from "lucide-react";
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.05 } } };
const sections = [
  { name: "General", desc: "Workspace name, description, and branding", icon: SettingsIcon },
  { name: "Custom Domain", desc: "Connect your own domain to your blog", icon: Globe },
  { name: "Appearance", desc: "Theme, colors, fonts, and layout customization", icon: Palette },
  { name: "Notifications", desc: "Email and in-app notification preferences", icon: Bell },
  { name: "Security", desc: "Password, 2FA, sessions, and API keys", icon: Shield },
  { name: "API Keys", desc: "Manage API keys for external integrations", icon: Key },
  { name: "Data Export", desc: "Export your content and subscriber data", icon: Database },
  { name: "Developer", desc: "Webhooks, API documentation, and SDKs", icon: Code },
];
export default function SettingsPage() {
  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-5xl">
      <motion.div variants={fadeUp} className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your workspace settings and preferences.</p>
      </motion.div>
      {/* General Settings Form */}
      <motion.div variants={fadeUp} className="glass-card rounded-2xl p-6 mb-6">
        <h3 className="text-sm font-semibold text-slate-900 mb-5">General</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Workspace Name</label>
            <input type="text" defaultValue="InkSphere Blog" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Blog URL</label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">https://</span>
              <input type="text" defaultValue="inksphere" className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
              <span className="text-sm text-slate-400">.inksphere.io</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
            <textarea rows={3} defaultValue="A premium blog about technology, design, and engineering." className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none" />
          </div>
          <div className="flex justify-end"><button className="btn-primary text-sm">Save Changes</button></div>
        </div>
      </motion.div>
      {/* Settings sections */}
      <div className="grid md:grid-cols-2 gap-4">
        {sections.slice(1).map((s, i) => (
          <motion.div key={i} variants={fadeUp} className="glass-card rounded-2xl p-5 cursor-pointer group">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-indigo-50 transition-colors"><s.icon className="w-5 h-5 text-slate-500 group-hover:text-indigo-600 transition-colors" /></div>
              <div><h3 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">{s.name}</h3><p className="text-xs text-slate-500">{s.desc}</p></div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
