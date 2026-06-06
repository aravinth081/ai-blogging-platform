"use client";
import { motion } from "framer-motion";
import { Shield, Search, Download, User, FileText, Settings, LogIn, Trash2, UserPlus } from "lucide-react";
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.05 } } };
const iconMap: Record<string, React.ElementType> = { login: LogIn, post: FileText, settings: Settings, user: User, delete: Trash2, invite: UserPlus };
const logs = [
  { action: "User logged in", user: "Jane Doe", type: "login", ip: "192.168.1.1", time: "5 minutes ago", details: "Chrome on macOS" },
  { action: "Published post", user: "Jane Doe", type: "post", ip: "192.168.1.1", time: "2 hours ago", details: '"The Future of AI in Content Creation"' },
  { action: "Updated settings", user: "Jane Doe", type: "settings", ip: "192.168.1.1", time: "3 hours ago", details: "Changed workspace name" },
  { action: "Invited team member", user: "Jane Doe", type: "invite", ip: "192.168.1.1", time: "5 hours ago", details: "marcus@example.com as Author" },
  { action: "User logged in", user: "Alex Johnson", type: "login", ip: "10.0.0.1", time: "6 hours ago", details: "Firefox on Windows" },
  { action: "Deleted post", user: "Alex Johnson", type: "delete", ip: "10.0.0.1", time: "8 hours ago", details: '"Outdated draft post"' },
  { action: "Updated user profile", user: "Sarah Chen", type: "user", ip: "172.16.0.1", time: "1 day ago", details: "Updated avatar and bio" },
  { action: "Published post", user: "Sarah Chen", type: "post", ip: "172.16.0.1", time: "1 day ago", details: '"A Beginner\'s Guide to SEO"' },
];
export default function AuditLogsPage() {
  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-7xl">
      <motion.div variants={fadeUp} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Audit Logs</h1>
          <p className="text-sm text-slate-500 mt-1">Track all actions and changes in your workspace.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search logs..." className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 w-64" />
          </div>
          <button className="btn-secondary inline-flex items-center gap-2 text-sm"><Download className="w-4 h-4" />Export</button>
        </div>
      </motion.div>
      <motion.div variants={fadeUp} className="glass-card rounded-2xl overflow-hidden">
        <div className="space-y-0">
          {logs.map((log, i) => {
            const Icon = iconMap[log.type] || Shield;
            return (
              <div key={i} className="flex items-center gap-4 px-6 py-4 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${log.type === "delete" ? "bg-red-50" : log.type === "login" ? "bg-blue-50" : "bg-slate-50"}`}>
                  <Icon className={`w-4 h-4 ${log.type === "delete" ? "text-red-500" : log.type === "login" ? "text-blue-500" : "text-slate-500"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-slate-900"><span className="font-medium">{log.user}</span> · {log.action}</div>
                  <div className="text-xs text-slate-400">{log.details}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xs text-slate-500">{log.time}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{log.ip}</div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
