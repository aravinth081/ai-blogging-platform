"use client";
import { motion } from "framer-motion";
import { Bell, Check, MessageSquare, Heart, Users, CreditCard, Shield, FileText, Settings, Sparkles } from "lucide-react";
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.05 } } };
const iconMap: Record<string, React.ElementType> = { comment: MessageSquare, like: Heart, subscriber: Users, billing: CreditCard, security: Shield, post: FileText, system: Settings, ai: Sparkles };
const colorMap: Record<string, string> = { comment: "bg-blue-50 text-blue-500", like: "bg-rose-50 text-rose-500", subscriber: "bg-indigo-50 text-indigo-500", billing: "bg-emerald-50 text-emerald-500", security: "bg-amber-50 text-amber-500", post: "bg-purple-50 text-purple-500", system: "bg-slate-100 text-slate-500", ai: "bg-violet-50 text-violet-500" };
const notifications = [
  { type: "comment", title: "New comment on your post", message: 'Sarah Chen commented on "The Future of AI"', time: "5 min ago", read: false },
  { type: "subscriber", title: "New subscriber", message: "Marcus Rivera subscribed to your newsletter", time: "12 min ago", read: false },
  { type: "like", title: "Post liked", message: 'Emily Watson liked "Building Scalable SaaS"', time: "1 hour ago", read: false },
  { type: "ai", title: "SEO optimization complete", message: "AI optimized SEO for 3 posts. Average score improved to 89/100.", time: "2 hours ago", read: true },
  { type: "billing", title: "Payment received", message: "Your Pro plan payment of $19.00 was processed successfully.", time: "3 hours ago", read: true },
  { type: "security", title: "New device login", message: "A new login was detected from Chrome on Windows.", time: "5 hours ago", read: true },
  { type: "post", title: "Post published", message: '"The Future of AI" was published successfully.', time: "6 hours ago", read: true },
  { type: "system", title: "System update", message: "InkSphere v2.4 is now available with new features.", time: "1 day ago", read: true },
];
export default function NotificationsPage() {
  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl">
      <motion.div variants={fadeUp} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Notifications</h1>
          <p className="text-sm text-slate-500 mt-1">Stay updated with the latest activity.</p>
        </div>
        <button className="btn-secondary inline-flex items-center gap-2 text-sm"><Check className="w-4 h-4" />Mark all read</button>
      </motion.div>
      <div className="space-y-2">
        {notifications.map((n, i) => {
          const Icon = iconMap[n.type] || Bell;
          const color = colorMap[n.type] || "bg-slate-100 text-slate-500";
          return (
            <motion.div key={i} variants={fadeUp} className={`glass-card rounded-2xl p-4 flex items-start gap-4 cursor-pointer ${!n.read ? "border-l-2 border-l-indigo-500 bg-indigo-50/20" : ""}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}><Icon className="w-5 h-5" /></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-semibold text-slate-900">{n.title}</span>
                  {!n.read && <div className="w-2 h-2 rounded-full bg-indigo-500" />}
                </div>
                <p className="text-xs text-slate-500">{n.message}</p>
                <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
