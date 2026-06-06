"use client";
import { motion } from "framer-motion";
import { UserPlus, Plus, MoreHorizontal, Mail, Shield, Crown, Edit, Trash2 } from "lucide-react";
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.05 } } };
const members = [
  { name: "Jane Doe", email: "jane@inksphere.io", role: "Owner", avatar: "JD", status: "Active", joined: "Jan 15, 2026" },
  { name: "Alex Johnson", email: "alex@inksphere.io", role: "Editor", avatar: "AJ", status: "Active", joined: "Feb 20, 2026" },
  { name: "Sarah Chen", email: "sarah@inksphere.io", role: "Author", avatar: "SC", status: "Active", joined: "Mar 10, 2026" },
];
const invites = [
  { email: "marcus@example.com", role: "Author", status: "Pending", sent: "Jun 3, 2026" },
  { email: "emily@example.com", role: "Editor", status: "Pending", sent: "Jun 4, 2026" },
];
const roleColors: Record<string, string> = {
  Owner: "bg-indigo-50 text-indigo-700",
  Editor: "bg-purple-50 text-purple-700",
  Author: "bg-blue-50 text-blue-700",
  Moderator: "bg-emerald-50 text-emerald-700",
};
export default function TeamPage() {
  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-5xl">
      <motion.div variants={fadeUp} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Team</h1>
          <p className="text-sm text-slate-500 mt-1">Manage team members and invitations.</p>
        </div>
        <button className="btn-primary inline-flex items-center gap-2 text-sm"><UserPlus className="w-4 h-4" />Invite Member</button>
      </motion.div>
      {/* Members */}
      <motion.div variants={fadeUp} className="glass-card rounded-2xl p-6 mb-6">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">Members ({members.length})</h3>
        <div className="space-y-3">
          {members.map((m, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50/80 transition-colors group">
              <div className="w-10 h-10 rounded-xl gradient-brand-subtle flex items-center justify-center text-xs font-bold text-indigo-600">{m.avatar}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2"><span className="text-sm font-medium text-slate-900">{m.name}</span>{m.role === "Owner" && <Crown className="w-3.5 h-3.5 text-amber-500" />}</div>
                <div className="text-xs text-slate-400">{m.email}</div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${roleColors[m.role]}`}>{m.role}</span>
              <span className="text-xs text-slate-400">{m.joined}</span>
              <button className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity"><MoreHorizontal className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
      </motion.div>
      {/* Pending Invitations */}
      <motion.div variants={fadeUp} className="glass-card rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">Pending Invitations ({invites.length})</h3>
        <div className="space-y-3">
          {invites.map((inv, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50/80 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center"><Mail className="w-4 h-4 text-slate-400" /></div>
              <div className="flex-1"><div className="text-sm font-medium text-slate-900">{inv.email}</div><div className="text-xs text-slate-400">Sent {inv.sent}</div></div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${roleColors[inv.role] || "bg-slate-100 text-slate-600"}`}>{inv.role}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700">{inv.status}</span>
              <button className="text-xs text-red-500 hover:text-red-600 font-medium">Revoke</button>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
