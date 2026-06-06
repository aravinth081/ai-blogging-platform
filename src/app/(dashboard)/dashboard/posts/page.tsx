"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Plus, Search, MessageSquare, Clock, Edit, Trash2, ExternalLink,
  FileText, ArrowUpDown, Loader2
} from "lucide-react";
import { getAllDashboardPosts, deletePost, PostData } from "@/actions/posts";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.05 } } };

const statusColors: Record<string, string> = {
  PUBLISHED: "bg-emerald-50 text-emerald-700",
  DRAFT: "bg-slate-100 text-slate-600",
  SCHEDULED: "bg-amber-50 text-amber-700",
  ARCHIVED: "bg-red-50 text-red-600",
};

export default function PostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<PostData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  const loadPosts = async () => {
    try {
      const data = await getAllDashboardPosts();
      setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this post?")) {
      setIsLoading(true);
      await deletePost(id);
      await loadPosts();
    }
  };

  const filteredPosts = posts.filter((post) => {
    const titleMatch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const statusMatch = selectedStatus === "All" || post.status === selectedStatus;
    return titleMatch && statusMatch;
  });

  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-7xl">
      {/* Header */}
      <motion.div variants={fadeUp} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Posts</h1>
          <p className="text-sm text-slate-500 mt-1">Manage and organize all your blog posts.</p>
        </div>
        <button
          onClick={() => router.push("/dashboard/editor/new")}
          className="btn-primary inline-flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          New Post
        </button>
      </motion.div>

      {/* Filters Bar */}
      <motion.div variants={fadeUp} className="glass-card rounded-2xl p-4 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Status filter */}
          <div className="flex gap-1">
            {["All", "PUBLISHED", "DRAFT", "SCHEDULED"].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedStatus === status
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                }`}
              >
                {status.charAt(0) + status.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Posts Table */}
      <motion.div variants={fadeUp} className="glass-card rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
            <span className="text-xs text-slate-400">Loading posts...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700">
                      Title <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="text-left px-4 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-4 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                  <th className="text-left px-4 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700">
                      Views <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="text-left px-4 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="text-right px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post) => (
                  <tr
                    key={post.id}
                    onClick={() => router.push(`/dashboard/editor/${post.id}`)}
                    className="border-b border-slate-55 hover:bg-slate-50/50 transition-colors group cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-4 h-4 text-indigo-500" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-900 group-hover:text-indigo-600 transition-colors">{post.title}</div>
                          <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-semibold ${statusColors[post.status]}`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-xs text-slate-600 font-medium">{post.categoryId}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-slate-700 font-medium">{post.views.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-xs text-slate-500">
                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/dashboard/editor/${post.id}`);
                          }}
                          className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        {post.status === "PUBLISHED" && (
                          <Link
                            href={`/blog/${post.slug}`}
                            onClick={(e) => e.stopPropagation()}
                            target="_blank"
                            className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        )}
                        <button
                          onClick={(e) => handleDelete(e, post.id)}
                          className="w-7 h-7 rounded-lg hover:bg-red-55 flex items-center justify-center text-slate-400 hover:text-red-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
          <span className="text-xs text-slate-500">Showing {filteredPosts.length} of {posts.length} posts</span>
          <div className="flex gap-1">
            <button className="px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-50 text-indigo-700">1</button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:bg-slate-50">2</button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:bg-slate-50">3</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
