"use client";
import { motion } from "framer-motion";
import { Puzzle, Check, ExternalLink, Settings } from "lucide-react";
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.05 } } };
const integrations = [
  { name: "Google Analytics", desc: "Track website traffic and user behavior", category: "Analytics", connected: true, icon: "GA" },
  { name: "Google Search Console", desc: "Monitor search performance and indexing", category: "SEO", connected: true, icon: "GS" },
  { name: "Stripe", desc: "Payment processing and billing management", category: "Payments", connected: true, icon: "ST" },
  { name: "Slack", desc: "Get notifications in your Slack channels", category: "Notifications", connected: false, icon: "SL" },
  { name: "Discord", desc: "Share updates with your Discord community", category: "Community", connected: false, icon: "DC" },
  { name: "Zapier", desc: "Connect with 5,000+ apps and automate workflows", category: "Automation", connected: false, icon: "ZP" },
  { name: "Mailchimp", desc: "Sync subscribers and send email campaigns", category: "Email", connected: false, icon: "MC" },
  { name: "OpenAI", desc: "Power AI features with GPT-4 models", category: "AI", connected: true, icon: "AI" },
  { name: "Cloudflare", desc: "CDN, DNS, and security protection", category: "Infrastructure", connected: false, icon: "CF" },
];
export default function IntegrationsPage() {
  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-7xl">
      <motion.div variants={fadeUp} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Integrations</h1>
          <p className="text-sm text-slate-500 mt-1">Connect your favorite tools and services.</p>
        </div>
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {integrations.map((int, i) => (
          <motion.div key={i} variants={fadeUp} className="glass-card rounded-2xl p-5 group">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">{int.icon}</div>
              {int.connected && <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 flex items-center gap-1"><Check className="w-3 h-3" />Connected</span>}
            </div>
            <h3 className="text-sm font-semibold text-slate-900 mb-1">{int.name}</h3>
            <p className="text-xs text-slate-500 mb-4">{int.desc}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">{int.category}</span>
              <button className={`text-xs font-medium px-3 py-1 rounded-lg transition-colors ${int.connected ? "text-slate-500 hover:bg-slate-50" : "text-indigo-600 hover:bg-indigo-50"}`}>
                {int.connected ? "Configure" : "Connect"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
