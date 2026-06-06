"use client";

import { motion } from "framer-motion";
import { BarChart3, Eye, Users, Clock, TrendingUp, ArrowUpRight, Globe, Monitor, Smartphone, Calendar } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const metrics = [
  { label: "Total Views", value: "142,521", change: "+18.3%", icon: Eye, color: "bg-indigo-50 text-indigo-600" },
  { label: "Unique Visitors", value: "48,203", change: "+12.1%", icon: Users, color: "bg-purple-50 text-purple-600" },
  { label: "Avg. Read Time", value: "4m 32s", change: "+5.8%", icon: Clock, color: "bg-blue-50 text-blue-600" },
  { label: "Bounce Rate", value: "32.4%", change: "-8.2%", icon: TrendingUp, color: "bg-emerald-50 text-emerald-600" },
];

const topPages = [
  { page: "/blog/beginners-guide-seo", title: "A Beginner's Guide to SEO", views: 12420, uniques: 8340, avgTime: "5m 12s", bounce: "28%" },
  { page: "/blog/future-ai-content", title: "The Future of AI", views: 8941, uniques: 6210, avgTime: "4m 45s", bounce: "31%" },
  { page: "/blog/scalable-saas", title: "Building Scalable SaaS", views: 6832, uniques: 4890, avgTime: "6m 08s", bounce: "25%" },
  { page: "/blog/design-systems", title: "Design Systems That Scale", views: 4521, uniques: 3120, avgTime: "3m 54s", bounce: "35%" },
  { page: "/blog/color-psychology", title: "Color Psychology in UI", views: 3245, uniques: 2340, avgTime: "4m 22s", bounce: "30%" },
];

const countries = [
  { name: "United States", visitors: 18420, pct: 38 },
  { name: "United Kingdom", visitors: 7210, pct: 15 },
  { name: "Germany", visitors: 5890, pct: 12 },
  { name: "India", visitors: 4320, pct: 9 },
  { name: "Canada", visitors: 3780, pct: 8 },
];

const devices = [
  { name: "Desktop", pct: 58, icon: Monitor, color: "bg-indigo-500" },
  { name: "Mobile", pct: 35, icon: Smartphone, color: "bg-purple-500" },
  { name: "Tablet", pct: 7, icon: Monitor, color: "bg-blue-400" },
];

export default function AnalyticsPage() {
  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-7xl">
      <motion.div variants={fadeUp} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Analytics</h1>
          <p className="text-sm text-slate-500 mt-1">Track your blog&apos;s performance and audience insights.</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
          </select>
        </div>
      </motion.div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((m, i) => (
          <motion.div key={i} variants={fadeUp} className="glass-card rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${m.color}`}>
                <m.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" />{m.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-900">{m.value}</div>
            <div className="text-xs text-slate-500 mt-1">{m.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <motion.div variants={fadeUp} className="glass-card rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-semibold text-slate-900">Traffic Overview</h3>
          <div className="flex gap-1">
            {["Views", "Visitors", "Sessions"].map((tab) => (
              <button key={tab} className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${tab === "Views" ? "bg-indigo-50 text-indigo-700" : "text-slate-400 hover:text-slate-600"}`}>
                {tab}
              </button>
            ))}
          </div>
        </div>
        <svg className="w-full h-52" viewBox="0 0 700 200" fill="none">
          <defs>
            <linearGradient id="analyticsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366F1" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 50, 100, 150].map((y) => (
            <line key={y} x1="0" y1={y} x2="700" y2={y} stroke="#f1f5f9" strokeWidth="1" />
          ))}
          <path d="M0,170 C25,168 50,160 75,155 C100,148 125,140 150,128 C175,120 200,115 225,108 C250,100 275,95 300,85 C325,80 350,78 375,70 C400,62 425,55 450,48 C475,42 500,38 525,32 C550,28 575,25 600,20 C625,18 650,15 675,12 L700,10" stroke="#6366F1" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M0,170 C25,168 50,160 75,155 C100,148 125,140 150,128 C175,120 200,115 225,108 C250,100 275,95 300,85 C325,80 350,78 375,70 C400,62 425,55 450,48 C475,42 500,38 525,32 C550,28 575,25 600,20 C625,18 650,15 675,12 L700,10 L700,200 L0,200 Z" fill="url(#analyticsGrad)" />
        </svg>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Top Pages */}
        <motion.div variants={fadeUp} className="lg:col-span-2 glass-card rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Top Pages</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left pb-3 text-xs font-semibold text-slate-400 uppercase">Page</th>
                  <th className="text-right pb-3 text-xs font-semibold text-slate-400 uppercase">Views</th>
                  <th className="text-right pb-3 text-xs font-semibold text-slate-400 uppercase">Uniques</th>
                  <th className="text-right pb-3 text-xs font-semibold text-slate-400 uppercase">Avg Time</th>
                  <th className="text-right pb-3 text-xs font-semibold text-slate-400 uppercase">Bounce</th>
                </tr>
              </thead>
              <tbody>
                {topPages.map((page, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50">
                    <td className="py-3 text-sm text-slate-900 font-medium">{page.title}</td>
                    <td className="py-3 text-sm text-slate-600 text-right">{page.views.toLocaleString()}</td>
                    <td className="py-3 text-sm text-slate-600 text-right">{page.uniques.toLocaleString()}</td>
                    <td className="py-3 text-sm text-slate-600 text-right">{page.avgTime}</td>
                    <td className="py-3 text-sm text-slate-600 text-right">{page.bounce}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Countries */}
          <motion.div variants={fadeUp} className="glass-card rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4 text-slate-400" /> Top Countries
            </h3>
            <div className="space-y-3">
              {countries.map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs text-slate-600 flex-1">{c.name}</span>
                  <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${c.pct}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-slate-700 w-8 text-right">{c.pct}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Devices */}
          <motion.div variants={fadeUp} className="glass-card rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Devices</h3>
            <div className="space-y-3">
              {devices.map((d, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                    <d.icon className="w-4 h-4 text-slate-500" />
                  </div>
                  <span className="text-xs text-slate-600 flex-1">{d.name}</span>
                  <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${d.color}`} style={{ width: `${d.pct}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-slate-700">{d.pct}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
