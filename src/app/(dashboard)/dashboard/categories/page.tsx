"use client";

import { motion } from "framer-motion";
import { FolderOpen, Plus, MoreHorizontal, FileText, Edit, Trash2 } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.05 } } };

const categories = [
  { name: "Technology", slug: "technology", posts: 24, color: "#6366F1", description: "Latest in tech, AI, and software development" },
  { name: "Design", slug: "design", posts: 18, color: "#8B5CF6", description: "UI/UX, design systems, and visual thinking" },
  { name: "Engineering", slug: "engineering", posts: 15, color: "#3B82F6", description: "Backend, infrastructure, and architecture" },
  { name: "Marketing", slug: "marketing", posts: 12, color: "#10B981", description: "Growth, SEO, and content strategy" },
  { name: "Growth", slug: "growth", posts: 8, color: "#F59E0B", description: "Scaling, metrics, and user acquisition" },
  { name: "Product", slug: "product", posts: 6, color: "#EF4444", description: "Product management and strategy" },
];

export default function CategoriesPage() {
  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-7xl">
      <motion.div variants={fadeUp} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Categories</h1>
          <p className="text-sm text-slate-500 mt-1">Organize your content with categories.</p>
        </div>
        <button className="btn-primary inline-flex items-center gap-2 text-sm"><Plus className="w-4 h-4" />New Category</button>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat, i) => (
          <motion.div key={i} variants={fadeUp} className="glass-card rounded-2xl p-5 group">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${cat.color}15` }}>
                <FolderOpen className="w-5 h-5" style={{ color: cat.color }} />
              </div>
              <button className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            <h3 className="text-base font-semibold text-slate-900 mb-1">{cat.name}</h3>
            <p className="text-xs text-slate-500 mb-3">{cat.description}</p>
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <FileText className="w-3 h-3" />{cat.posts} posts
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
