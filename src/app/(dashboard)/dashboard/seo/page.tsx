"use client";
import { motion } from "framer-motion";
import { Search, TrendingUp, Globe, FileText, AlertTriangle, Check, ExternalLink, ArrowUpRight } from "lucide-react";
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.05 } } };
const seoItems = [
  { page: "The Future of AI", score: 92, issues: 0, status: "Excellent" },
  { page: "Building Scalable SaaS", score: 87, issues: 1, status: "Good" },
  { page: "Design Systems", score: 78, issues: 3, status: "Needs Work" },
  { page: "A Beginner's Guide to SEO", score: 95, issues: 0, status: "Excellent" },
  { page: "Content Strategy 2026", score: 71, issues: 4, status: "Needs Work" },
];
export default function SEOPage() {
  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-7xl">
      <motion.div variants={fadeUp} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>SEO</h1>
          <p className="text-sm text-slate-500 mt-1">Optimize your content for search engines.</p>
        </div>
        <button className="btn-primary inline-flex items-center gap-2 text-sm"><Search className="w-4 h-4" />Run SEO Audit</button>
      </motion.div>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "Avg SEO Score", value: "84/100", icon: TrendingUp, color: "bg-indigo-50 text-indigo-600" },
          { label: "Indexed Pages", value: "142", icon: Globe, color: "bg-emerald-50 text-emerald-600" },
          { label: "Total Keywords", value: "1,234", icon: FileText, color: "bg-purple-50 text-purple-600" },
          { label: "Issues Found", value: "8", icon: AlertTriangle, color: "bg-amber-50 text-amber-600" },
        ].map((s, i) => (
          <motion.div key={i} variants={fadeUp} className="glass-card rounded-2xl p-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color} mb-3`}><s.icon className="w-5 h-5" /></div>
            <div className="text-2xl font-bold text-slate-900">{s.value}</div>
            <div className="text-xs text-slate-500 mt-1">{s.label}</div>
          </motion.div>
        ))}
      </div>
      <motion.div variants={fadeUp} className="glass-card rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">Page SEO Scores</h3>
        <div className="space-y-3">
          {seoItems.map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50/80 transition-colors">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${item.score >= 90 ? "bg-emerald-50 text-emerald-600" : item.score >= 80 ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"}`}>{item.score}</div>
              <div className="flex-1"><div className="text-sm font-medium text-slate-900">{item.page}</div><div className="text-xs text-slate-400">{item.issues === 0 ? "No issues found" : `${item.issues} issues to fix`}</div></div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${item.status === "Excellent" ? "bg-emerald-50 text-emerald-700" : item.status === "Good" ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"}`}>{item.status}</span>
              <button className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400"><ExternalLink className="w-3.5 h-3.5" /></button>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
