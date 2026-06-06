"use client";
import { motion } from "framer-motion";
import { Mail, Plus, Send, Clock, FileText, Eye, MousePointer, Users, Edit, MoreHorizontal } from "lucide-react";
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.05 } } };
const campaigns = [
  { subject: "Weekly Digest: Top Stories", status: "Sent", recipients: 3842, openRate: "42.3%", clickRate: "12.8%", date: "Jun 4, 2026" },
  { subject: "New Feature: AI Writing Tools", status: "Sent", recipients: 3756, openRate: "48.1%", clickRate: "18.2%", date: "May 28, 2026" },
  { subject: "Your Month in Review", status: "Scheduled", recipients: 3842, openRate: "—", clickRate: "—", date: "Jun 7, 2026" },
  { subject: "Welcome to InkSphere", status: "Draft", recipients: 0, openRate: "—", clickRate: "—", date: "Jun 5, 2026" },
];
export default function NewsletterPage() {
  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-7xl">
      <motion.div variants={fadeUp} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Newsletter</h1>
          <p className="text-sm text-slate-500 mt-1">Create and manage email campaigns.</p>
        </div>
        <button className="btn-primary inline-flex items-center gap-2 text-sm"><Plus className="w-4 h-4" />New Campaign</button>
      </motion.div>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Sent", value: "24", icon: Send, color: "bg-indigo-50 text-indigo-600" },
          { label: "Avg Open Rate", value: "42.3%", icon: Eye, color: "bg-purple-50 text-purple-600" },
          { label: "Avg Click Rate", value: "12.8%", icon: MousePointer, color: "bg-blue-50 text-blue-600" },
          { label: "Subscribers", value: "3,842", icon: Users, color: "bg-emerald-50 text-emerald-600" },
        ].map((s, i) => (
          <motion.div key={i} variants={fadeUp} className="glass-card rounded-2xl p-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color} mb-3`}><s.icon className="w-5 h-5" /></div>
            <div className="text-2xl font-bold text-slate-900">{s.value}</div>
            <div className="text-xs text-slate-500 mt-1">{s.label}</div>
          </motion.div>
        ))}
      </div>
      <motion.div variants={fadeUp} className="glass-card rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-slate-100">
            <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase">Campaign</th>
            <th className="text-left px-4 py-3.5 text-xs font-semibold text-slate-500 uppercase">Status</th>
            <th className="text-left px-4 py-3.5 text-xs font-semibold text-slate-500 uppercase">Recipients</th>
            <th className="text-left px-4 py-3.5 text-xs font-semibold text-slate-500 uppercase">Open Rate</th>
            <th className="text-left px-4 py-3.5 text-xs font-semibold text-slate-500 uppercase">Click Rate</th>
            <th className="text-left px-4 py-3.5 text-xs font-semibold text-slate-500 uppercase">Date</th>
          </tr></thead>
          <tbody>
            {campaigns.map((c, i) => (
              <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50">
                <td className="px-6 py-4"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center"><Mail className="w-4 h-4 text-indigo-500" /></div><span className="text-sm font-medium text-slate-900">{c.subject}</span></div></td>
                <td className="px-4 py-4"><span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${c.status === "Sent" ? "bg-emerald-50 text-emerald-700" : c.status === "Scheduled" ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-600"}`}>{c.status}</span></td>
                <td className="px-4 py-4 text-sm text-slate-600">{c.recipients > 0 ? c.recipients.toLocaleString() : "—"}</td>
                <td className="px-4 py-4 text-sm text-slate-600">{c.openRate}</td>
                <td className="px-4 py-4 text-sm text-slate-600">{c.clickRate}</td>
                <td className="px-4 py-4 text-xs text-slate-500">{c.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}
