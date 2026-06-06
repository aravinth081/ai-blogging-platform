"use client";

import { motion } from "framer-motion";
import { MessageSquare, Check, X, AlertTriangle, MoreHorizontal, Pin, Trash2, Reply } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.05 } } };

const comments = [
  { id: 1, author: "Sarah Chen", avatar: "SC", content: "This is an incredibly well-written article. The insights about AI are spot-on.", post: "The Future of AI", status: "approved", time: "5 minutes ago", replies: 2 },
  { id: 2, author: "Marcus Rivera", avatar: "MR", content: "I've been looking for exactly this kind of analysis. Do you have any benchmarks?", post: "Building Scalable SaaS", status: "approved", time: "1 hour ago", replies: 1 },
  { id: 3, author: "Anonymous", avatar: "?", content: "Check out this amazing product...", post: "A Beginner's Guide to SEO", status: "spam", time: "2 hours ago", replies: 0 },
  { id: 4, author: "Emily Watson", avatar: "EW", content: "Great comparison of different design system approaches. Would love to see a follow-up.", post: "Design Systems That Scale", status: "pending", time: "3 hours ago", replies: 0 },
  { id: 5, author: "James Park", avatar: "JP", content: "The code examples are really helpful. One small correction in the TypeScript section though.", post: "Mastering TypeScript", status: "approved", time: "5 hours ago", replies: 3 },
];

const statusConfig: Record<string, { bg: string; text: string; icon: React.ElementType }> = {
  approved: { bg: "bg-emerald-50", text: "text-emerald-700", icon: Check },
  pending: { bg: "bg-amber-50", text: "text-amber-700", icon: AlertTriangle },
  spam: { bg: "bg-red-50", text: "text-red-600", icon: X },
};

export default function CommentsPage() {
  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-7xl">
      <motion.div variants={fadeUp} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Comments</h1>
          <p className="text-sm text-slate-500 mt-1">Moderate and manage reader comments.</p>
        </div>
        <div className="flex gap-2">
          {["All", "Pending", "Approved", "Spam"].map((filter) => (
            <button key={filter} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${filter === "All" ? "bg-indigo-50 text-indigo-700" : "text-slate-500 hover:bg-slate-50"}`}>
              {filter}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="space-y-3">
        {comments.map((comment) => {
          const config = statusConfig[comment.status];
          const StatusIcon = config.icon;
          return (
            <motion.div key={comment.id} variants={fadeUp} className="glass-card rounded-2xl p-5 group">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl gradient-brand-subtle flex items-center justify-center text-xs font-bold text-indigo-600 flex-shrink-0">
                  {comment.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-slate-900">{comment.author}</span>
                    <span className="text-xs text-slate-400">on</span>
                    <span className="text-xs font-medium text-indigo-600">{comment.post}</span>
                    <span className="text-xs text-slate-400">· {comment.time}</span>
                    <span className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-semibold inline-flex items-center gap-1 ${config.bg} ${config.text}`}>
                      <StatusIcon className="w-3 h-3" />{comment.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{comment.content}</p>
                  <div className="flex items-center gap-3 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-xs font-medium text-slate-500 hover:text-indigo-600 flex items-center gap-1"><Reply className="w-3 h-3" />Reply</button>
                    <button className="text-xs font-medium text-slate-500 hover:text-emerald-600 flex items-center gap-1"><Check className="w-3 h-3" />Approve</button>
                    <button className="text-xs font-medium text-slate-500 hover:text-amber-600 flex items-center gap-1"><Pin className="w-3 h-3" />Pin</button>
                    <button className="text-xs font-medium text-slate-500 hover:text-red-600 flex items-center gap-1"><Trash2 className="w-3 h-3" />Delete</button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
