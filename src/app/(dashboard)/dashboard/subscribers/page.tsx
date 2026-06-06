"use client";
import { motion } from "framer-motion";
import { Users, Plus, Mail, TrendingUp, ArrowUpRight, Download, Search, MoreHorizontal } from "lucide-react";
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.05 } } };
const subscribers = [
  { name: "Sarah Chen", email: "sarah@techcorp.com", status: "Active", source: "Blog", date: "Jun 4, 2026" },
  { name: "Marcus Rivera", email: "marcus@devblog.com", status: "Active", source: "Newsletter", date: "Jun 3, 2026" },
  { name: "Emily Watson", email: "emily@scaleup.io", status: "Active", source: "Landing Page", date: "Jun 2, 2026" },
  { name: "James Park", email: "james@cloudnative.dev", status: "Active", source: "Blog", date: "Jun 1, 2026" },
  { name: "Lisa Kim", email: "lisa@designstudio.co", status: "Unsubscribed", source: "Social", date: "May 30, 2026" },
  { name: "Alex Johnson", email: "alex@startup.io", status: "Active", source: "Blog", date: "May 29, 2026" },
];
export default function SubscribersPage() {
  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-7xl">
      <motion.div variants={fadeUp} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Subscribers</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your email subscriber list.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary inline-flex items-center gap-2 text-sm"><Download className="w-4 h-4" />Export</button>
          <button className="btn-primary inline-flex items-center gap-2 text-sm"><Plus className="w-4 h-4" />Add Subscriber</button>
        </div>
      </motion.div>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Subscribers", value: "3,842", change: "+124 this month", icon: Users, color: "bg-indigo-50 text-indigo-600" },
          { label: "Open Rate", value: "42.3%", change: "+2.1% vs last month", icon: Mail, color: "bg-purple-50 text-purple-600" },
          { label: "Growth Rate", value: "+8.2%", change: "Trending up", icon: TrendingUp, color: "bg-emerald-50 text-emerald-600" },
        ].map((s, i) => (
          <motion.div key={i} variants={fadeUp} className="glass-card rounded-2xl p-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color} mb-3`}><s.icon className="w-5 h-5" /></div>
            <div className="text-2xl font-bold text-slate-900">{s.value}</div>
            <div className="text-xs text-slate-500 mt-1">{s.label}</div>
            <div className="text-xs text-emerald-600 font-medium mt-0.5">{s.change}</div>
          </motion.div>
        ))}
      </div>
      <motion.div variants={fadeUp} className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-slate-100">
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase">Subscriber</th>
              <th className="text-left px-4 py-3.5 text-xs font-semibold text-slate-500 uppercase">Status</th>
              <th className="text-left px-4 py-3.5 text-xs font-semibold text-slate-500 uppercase">Source</th>
              <th className="text-left px-4 py-3.5 text-xs font-semibold text-slate-500 uppercase">Subscribed</th>
              <th className="text-right px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase">Actions</th>
            </tr></thead>
            <tbody>
              {subscribers.map((sub, i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50 group">
                  <td className="px-6 py-4"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg gradient-brand-subtle flex items-center justify-center text-xs font-bold text-indigo-600">{sub.name.split(" ").map(n => n[0]).join("")}</div><div><div className="text-sm font-medium text-slate-900">{sub.name}</div><div className="text-xs text-slate-400">{sub.email}</div></div></div></td>
                  <td className="px-4 py-4"><span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${sub.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{sub.status}</span></td>
                  <td className="px-4 py-4 text-xs text-slate-600">{sub.source}</td>
                  <td className="px-4 py-4 text-xs text-slate-500">{sub.date}</td>
                  <td className="px-6 py-4 text-right"><button className="w-7 h-7 rounded-lg hover:bg-slate-100 inline-flex items-center justify-center text-slate-400 opacity-0 group-hover:opacity-100"><MoreHorizontal className="w-4 h-4" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
