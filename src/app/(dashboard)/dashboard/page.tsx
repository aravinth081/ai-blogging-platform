"use client";

import { motion } from "framer-motion";
import {
  Eye, Users, FileText, TrendingUp, ArrowUpRight, ArrowDownRight,
  Plus, MoreHorizontal, Sparkles, Clock, MessageSquare, Heart,
  Calendar, Globe, Monitor, Smartphone, Zap,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ─── Stats Data ─── */
const stats = [
  { label: "Total Views", value: "24,521", change: "+12.5%", up: true, icon: Eye, color: "bg-indigo-50 text-indigo-600", accent: "text-emerald-600" },
  { label: "Subscribers", value: "3,842", change: "+8.2%", up: true, icon: Users, color: "bg-purple-50 text-purple-600", accent: "text-emerald-600" },
  { label: "Published", value: "156", change: "+3 this week", up: true, icon: FileText, color: "bg-blue-50 text-blue-600", accent: "text-emerald-600" },
  { label: "Revenue", value: "$12,450", change: "+23.1%", up: true, icon: TrendingUp, color: "bg-emerald-50 text-emerald-600", accent: "text-emerald-600" },
];

/* ─── Recent Posts ─── */
const recentPosts = [
  { title: "The Future of AI in Content Creation", status: "Published", views: "2,451", date: "2 hours ago", category: "Technology" },
  { title: "Building Scalable SaaS Applications", status: "Published", views: "1,832", date: "1 day ago", category: "Engineering" },
  { title: "Design Systems That Scale", status: "Draft", views: "—", date: "2 days ago", category: "Design" },
  { title: "How We Grew to 10K Subscribers", status: "Scheduled", views: "—", date: "Tomorrow", category: "Growth" },
  { title: "A Beginner's Guide to SEO", status: "Published", views: "3,102", date: "3 days ago", category: "Marketing" },
];

/* ─── Activity Feed ─── */
const activities = [
  { type: "comment", user: "Sarah Chen", action: "commented on", target: "The Future of AI", time: "5m ago", icon: MessageSquare },
  { type: "subscriber", user: "Marcus Rivera", action: "subscribed to", target: "your newsletter", time: "12m ago", icon: Users },
  { type: "reaction", user: "Emily Watson", action: "liked", target: "Building Scalable SaaS", time: "1h ago", icon: Heart },
  { type: "publish", user: "You", action: "published", target: "The Future of AI", time: "2h ago", icon: Globe },
  { type: "ai", user: "InkSphere AI", action: "optimized SEO for", target: "Design Systems", time: "3h ago", icon: Sparkles },
];

/* ─── Traffic Sources ─── */
const trafficSources = [
  { source: "Organic Search", value: 42, color: "bg-indigo-500" },
  { source: "Social Media", value: 28, color: "bg-purple-500" },
  { source: "Direct", value: 18, color: "bg-blue-400" },
  { source: "Referral", value: 12, color: "bg-amber-400" },
];

/* ─── Top Posts ─── */
const topPosts = [
  { title: "A Beginner's Guide to SEO", views: 3102, readTime: "4m 12s" },
  { title: "The Future of AI in Content Creation", views: 2451, readTime: "5m 34s" },
  { title: "Building Scalable SaaS Applications", views: 1832, readTime: "6m 08s" },
];

export default function DashboardOverview() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="max-w-7xl"
    >
      {/* Page Header */}
      <motion.div variants={fadeUp} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
            Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Welcome back, Jane. Here&apos;s what&apos;s happening with your blog.
          </p>
        </div>
        <button className="btn-primary inline-flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" />
          New Post
        </button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="glass-card rounded-2xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-semibold ${stat.accent}`}>
                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts & Content Row */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Audience Growth Chart */}
        <motion.div variants={fadeUp} className="lg:col-span-2 glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Audience Growth</h3>
              <p className="text-xs text-slate-400 mt-0.5">Views & subscribers over time</p>
            </div>
            <div className="flex gap-1">
              {["7d", "30d", "90d", "1y"].map((period) => (
                <button
                  key={period}
                  className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${
                    period === "30d"
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Chart */}
          <svg className="w-full h-48" viewBox="0 0 600 180" fill="none" preserveAspectRatio="none">
            <defs>
              <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366F1" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="subsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Grid lines */}
            {[0, 45, 90, 135].map((y) => (
              <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="#f1f5f9" strokeWidth="1" />
            ))}
            {/* Views line */}
            <path
              d="M0,140 C30,135 60,130 90,120 C120,110 150,105 180,95 C210,85 240,80 270,70 C300,60 330,55 360,50 C390,45 420,40 450,35 C480,30 510,28 540,20 C570,15 590,12 600,10"
              stroke="#6366F1"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M0,140 C30,135 60,130 90,120 C120,110 150,105 180,95 C210,85 240,80 270,70 C300,60 330,55 360,50 C390,45 420,40 450,35 C480,30 510,28 540,20 C570,15 590,12 600,10 L600,180 L0,180 Z"
              fill="url(#viewsGrad)"
            />
            {/* Subscribers line */}
            <path
              d="M0,155 C30,150 60,148 90,142 C120,136 150,130 180,125 C210,120 240,115 270,108 C300,100 330,95 360,88 C390,82 420,78 450,72 C480,68 510,64 540,58 C570,54 590,50 600,48"
              stroke="#8B5CF6"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="6 3"
            />
          </svg>

          {/* Legend */}
          <div className="flex items-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-indigo-500 rounded-full" />
              <span className="text-xs text-slate-500">Page Views</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-purple-500 rounded-full" style={{ borderBottom: "1px dashed" }} />
              <span className="text-xs text-slate-500">Subscribers</span>
            </div>
          </div>
        </motion.div>

        {/* Traffic Sources */}
        <motion.div variants={fadeUp} className="glass-card rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-1">Traffic Sources</h3>
          <p className="text-xs text-slate-400 mb-6">Last 30 days</p>

          {/* Donut chart placeholder */}
          <div className="flex justify-center mb-6">
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {(() => {
                  let offset = 0;
                  const colors = ["#6366F1", "#8B5CF6", "#60A5FA", "#FBBF24"];
                  return trafficSources.map((source, i) => {
                    const circumference = 2 * Math.PI * 38;
                    const strokeDasharray = `${(source.value / 100) * circumference} ${circumference}`;
                    const strokeDashoffset = -(offset / 100) * circumference;
                    offset += source.value;
                    return (
                      <circle
                        key={i}
                        cx="50" cy="50" r="38"
                        fill="none"
                        stroke={colors[i]}
                        strokeWidth="10"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                      />
                    );
                  });
                })()}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold text-slate-900">8.2K</span>
                <span className="text-[10px] text-slate-400">visitors</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {trafficSources.map((source, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${source.color}`} />
                <span className="text-xs text-slate-600 flex-1">{source.source}</span>
                <span className="text-xs font-semibold text-slate-700">{source.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Posts */}
        <motion.div variants={fadeUp} className="lg:col-span-2 glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-semibold text-slate-900">Recent Posts</h3>
            <a href="/dashboard/posts" className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
              View all <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

          <div className="space-y-3">
            {recentPosts.map((post, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50/80 transition-colors group cursor-pointer">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                    {post.title}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-slate-400">{post.category}</span>
                    <span className="text-xs text-slate-300">·</span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.date}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {post.views !== "—" && (
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {post.views}
                    </span>
                  )}
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    post.status === "Published" ? "bg-emerald-50 text-emerald-700" :
                    post.status === "Draft" ? "bg-slate-100 text-slate-600" :
                    "bg-amber-50 text-amber-700"
                  }`}>
                    {post.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Activity Feed */}
        <motion.div variants={fadeUp} className="glass-card rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-5">Recent Activity</h3>
          <div className="space-y-4">
            {activities.map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0">
                  <activity.icon className="w-4 h-4 text-slate-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <span className="font-semibold text-slate-900">{activity.user}</span>{" "}
                    {activity.action}{" "}
                    <span className="font-medium text-indigo-600">{activity.target}</span>
                  </p>
                  <span className="text-[10px] text-slate-400">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Real-time indicator */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs text-slate-500">Live — updating in real-time</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
