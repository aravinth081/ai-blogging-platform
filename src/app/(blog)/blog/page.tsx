"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, Clock, ArrowRight, BookOpen, Sparkles, Send, Check } from "lucide-react";
import { getPublicPosts, PostData } from "@/actions/posts";

const CATEGORIES = ["All", "Technology", "Engineering", "Design", "Growth", "Marketing", "General"];

export default function BlogHome() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  // Newsletter State
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "submitting" | "success">("idle");

  useEffect(() => {
    async function load() {
      try {
        const data = await getPublicPosts();
        setPosts(data);
      } catch (err) {
        console.error("Failed to load posts", err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setNewsletterStatus("submitting");
    setTimeout(() => {
      setNewsletterStatus("success");
      setEmail("");
    }, 1200);
  };

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = filteredPosts.find((p) => p.views > 2000) || filteredPosts[0];
  const gridPosts = filteredPosts.filter((p) => p.id !== featuredPost?.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Blog Intro Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600 mb-4">
          <BookOpen className="w-3.5 h-3.5" />
          INKSPHERE PUBLICATIONS
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4" style={{ fontFamily: "var(--font-display)" }}>
          Perspectives on technology, design, & growth
        </h1>
        <p className="text-lg text-slate-500 leading-relaxed">
          Discover stories, blueprints, and insights curated by our team of builders.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card rounded-2xl p-4 mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Categories */}
        <div className="flex gap-1 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-8 h-8 border-3 border-indigo-500/20 border-t-indigo-600 rounded-full animate-spin" />
          <p className="text-xs text-slate-400 font-medium">Loading publication...</p>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-20 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
          <p className="text-sm text-slate-500">No articles matched your criteria.</p>
          <button
            onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
            className="mt-4 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="space-y-16">
          {/* Featured Post Card */}
          {featuredPost && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="group cursor-pointer grid lg:grid-cols-2 gap-8 items-center bg-white border border-slate-100 rounded-3xl p-6 hover:shadow-xl hover:border-slate-200/80 transition-all"
            >
              <Link href={`/blog/${featuredPost.slug}`} className="block overflow-hidden rounded-2xl aspect-video relative">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-indigo-600/90 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md">
                  Featured
                </span>
              </Link>
              <div className="flex flex-col justify-center">
                <span className="text-xs font-semibold text-indigo-600 mb-2.5 uppercase tracking-wider">
                  {featuredPost.categoryId}
                </span>
                <Link href={`/blog/${featuredPost.slug}`}>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight mb-4" style={{ fontFamily: "var(--font-display)" }}>
                    {featuredPost.title}
                  </h2>
                </Link>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg gradient-brand-subtle flex items-center justify-center text-xs font-bold text-indigo-600">
                      {featuredPost.authorName.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{featuredPost.authorName}</div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <Calendar className="w-3 h-3" />
                        {featuredPost.publishedAt ? new Date(featuredPost.publishedAt).toLocaleDateString() : ""}
                        <span>·</span>
                        <Clock className="w-3 h-3" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="w-8 h-8 rounded-full bg-slate-50 hover:bg-indigo-50 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* Grid of Other Articles */}
          {gridPosts.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gridPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group flex flex-col bg-white border border-slate-100 rounded-3xl p-5 hover:shadow-lg hover:border-slate-200/60 transition-all cursor-pointer"
                >
                  <Link href={`/blog/${post.slug}`} className="block aspect-video overflow-hidden rounded-2xl relative mb-5">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-700 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md border border-slate-100">
                      {post.categoryId}
                    </span>
                  </Link>
                  <div className="flex-1 flex flex-col">
                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight line-clamp-2 mb-2" style={{ fontFamily: "var(--font-display)" }}>
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 mb-6">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto border-t border-slate-50 pt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-slate-50 text-[10px] font-bold text-slate-600 flex items-center justify-center">
                          {post.authorName.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-slate-800">{post.authorName}</div>
                          <div className="text-[9px] text-slate-400 flex items-center gap-1 mt-0.5">
                            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ""}
                            <span>·</span>
                            {post.readTime}
                          </div>
                        </div>
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-xs font-semibold text-slate-400 group-hover:text-indigo-600 flex items-center gap-1 transition-colors"
                      >
                        Read
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Newsletter Signup Banner */}
      <div className="mt-24 relative overflow-hidden rounded-3xl p-8 md:p-12 border border-slate-200/60 shadow-xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-purple-950 text-white">
        {/* Glow effects */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-white/10 text-indigo-200 mb-4 tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 fill-white/10" />
            Stay informed
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight mb-3" style={{ fontFamily: "var(--font-display)" }}>
            Subscribe to our newsletter
          </h2>
          <p className="text-indigo-200/80 text-sm leading-relaxed mb-8">
            Get the latest architecture blueprints, tech updates, and design tips sent directly to your inbox every week.
          </p>

          <form onSubmit={handleSubscribe} className="w-full max-w-md flex flex-col sm:flex-row items-center gap-2.5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder-indigo-200/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 focus:bg-white/15 transition-all"
              required
              disabled={newsletterStatus !== "idle"}
            />
            <button
              type="submit"
              disabled={newsletterStatus !== "idle"}
              className="w-full sm:w-auto px-6 py-2.5 bg-white text-indigo-900 font-bold rounded-xl text-sm transition-all hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 flex-shrink-0"
            >
              {newsletterStatus === "submitting" ? (
                <div className="w-4 h-4 border-2 border-indigo-900/30 border-t-indigo-900 rounded-full animate-spin" />
              ) : newsletterStatus === "success" ? (
                <>
                  <Check className="w-4 h-4" />
                  Subscribed!
                </>
              ) : (
                <>
                  Subscribe
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
