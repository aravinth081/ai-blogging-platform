"use client";
import { motion } from "framer-motion";
import { Sparkles, PenTool, Search, Globe, Image, Wand2, FileText, Zap, MessageSquare, TrendingUp, ArrowRight } from "lucide-react";
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.06 } } };
const tools = [
  { name: "Blog Generator", desc: "Generate complete blog posts from a topic or outline", icon: FileText, credits: "50 credits", color: "from-indigo-500 to-purple-500" },
  { name: "SEO Optimizer", desc: "Optimize meta tags, headings, and content structure", icon: Search, credits: "20 credits", color: "from-blue-500 to-indigo-500" },
  { name: "Headline Generator", desc: "Create compelling headlines with high CTR potential", icon: Zap, credits: "5 credits", color: "from-purple-500 to-pink-500" },
  { name: "Content Improver", desc: "Enhance clarity, tone, and readability of your content", icon: Wand2, credits: "15 credits", color: "from-emerald-500 to-teal-500" },
  { name: "Grammar Fixer", desc: "Fix grammar, spelling, and punctuation errors", icon: PenTool, credits: "10 credits", color: "from-amber-500 to-orange-500" },
  { name: "AI Translator", desc: "Translate your content into 50+ languages", icon: Globe, credits: "25 credits", color: "from-cyan-500 to-blue-500" },
  { name: "Image Generator", desc: "Generate unique images for your blog posts", icon: Image, credits: "30 credits", color: "from-rose-500 to-pink-500" },
  { name: "Summary Generator", desc: "Create concise summaries of long-form content", icon: MessageSquare, credits: "10 credits", color: "from-violet-500 to-purple-500" },
  { name: "Trending Topics", desc: "Discover trending topics in your niche", icon: TrendingUp, credits: "5 credits", color: "from-indigo-500 to-blue-500" },
];
export default function AIToolsPage() {
  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-7xl">
      <motion.div variants={fadeUp} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>AI Tools</h1>
          <p className="text-sm text-slate-500 mt-1">Supercharge your content with AI-powered tools.</p>
        </div>
        <div className="glass-card rounded-xl px-4 py-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-500" />
          <span className="text-sm font-semibold text-slate-900">842</span>
          <span className="text-xs text-slate-500">credits remaining</span>
        </div>
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool, i) => (
          <motion.div key={i} variants={fadeUp} className="glass-card rounded-2xl p-6 group cursor-pointer">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <tool.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-base font-semibold text-slate-900 mb-1">{tool.name}</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">{tool.desc}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">{tool.credits}</span>
              <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Launch <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
