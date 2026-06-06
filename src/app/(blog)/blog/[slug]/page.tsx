"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Send, Sparkles, MessageSquare, Reply, User } from "lucide-react";
import { getPublicPostBySlug, PostData } from "@/actions/posts";
import { getCommentsForPost, addComment, CommentData } from "@/actions/comments";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ArticleView({ params }: PageProps) {
  const { slug } = use(params);
  const [post, setPost] = useState<PostData | null>(null);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // New Comment Form States
  const [commentText, setCommentText] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [replyToId, setReplyToId] = useState<string | null>(null);
  const [replyToName, setReplyToName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadPost() {
      try {
        const pData = await getPublicPostBySlug(slug);
        if (pData) {
          setPost(pData);
          const cData = await getCommentsForPost(pData.id);
          setComments(cData);
        } else {
          setPost(null);
        }
      } catch (err) {
        console.error("Failed to load article", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadPost();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <div className="w-8 h-8 border-3 border-indigo-500/20 border-t-indigo-600 rounded-full animate-spin" />
        <p className="text-xs text-slate-400 font-medium">Loading story...</p>
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText || !authorName || !authorEmail) return;

    setIsSubmitting(true);
    try {
      const added = await addComment(post.id, commentText, replyToId, {
        name: authorName,
        email: authorEmail
      });

      // Update comments local list
      const updated = await getCommentsForPost(post.id);
      setComments(updated);

      setCommentText("");
      setReplyToId(null);
      setReplyToName(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderBlock = (block: any) => {
    switch (block.type) {
      case "heading-1":
        return (
          <h2 key={block.id} className="text-3xl font-extrabold text-slate-900 tracking-tight mt-10 mb-4" style={{ fontFamily: "var(--font-display)" }}>
            {block.content}
          </h2>
        );
      case "heading-2":
        return (
          <h3 key={block.id} className="text-2xl font-bold text-slate-900 tracking-tight mt-8 mb-3.5" style={{ fontFamily: "var(--font-display)" }}>
            {block.content}
          </h3>
        );
      case "heading-3":
        return (
          <h4 key={block.id} className="text-xl font-bold text-slate-900 tracking-tight mt-6 mb-3" style={{ fontFamily: "var(--font-display)" }}>
            {block.content}
          </h4>
        );
      case "blockquote":
        return (
          <blockquote key={block.id} className="text-lg italic text-slate-500 border-l-4 border-indigo-500 pl-4 py-1.5 my-6 bg-slate-50/60 rounded-r-xl">
            {block.content}
          </blockquote>
        );
      case "code":
        return (
          <pre key={block.id} className="font-mono text-sm bg-slate-950 text-slate-200 p-4.5 rounded-2xl my-6 overflow-x-auto">
            <code>{block.content}</code>
          </pre>
        );
      case "image":
        return block.content ? (
          <div key={block.id} className="my-8">
            <img src={block.content} alt="Article imagery" className="w-full rounded-2xl shadow-md border border-slate-100 object-cover max-h-[450px]" />
          </div>
        ) : null;
      case "list-bullet":
        return (
          <div key={block.id} className="flex items-start gap-2.5 pl-2 my-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2.5 flex-shrink-0" />
            <p className="text-slate-700 leading-relaxed">{block.content}</p>
          </div>
        );
      case "list-number":
        return (
          <div key={block.id} className="flex items-start gap-2 pl-2 my-2.5">
            <span className="text-slate-400 font-semibold mr-1">·</span>
            <p className="text-slate-700 leading-relaxed">{block.content}</p>
          </div>
        );
      default:
        return (
          <p key={block.id} className="text-slate-700 leading-relaxed text-base my-4">
            {block.content}
          </p>
        );
    }
  };

  const renderComment = (comment: CommentData, isChild = false) => {
    return (
      <div key={comment.id} className={`flex gap-4 ${isChild ? "ml-10 border-l border-slate-100 pl-4 mt-4" : "mt-6"}`}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center flex-shrink-0 text-xs font-bold text-indigo-500 border border-indigo-100/50">
          {comment.authorInitials}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800">{comment.authorName}</span>
            <span className="text-[10px] text-slate-400">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed mt-1">{comment.content}</p>

          <button
            onClick={() => {
              setReplyToId(comment.id);
              setReplyToName(comment.authorName);
            }}
            className="inline-flex items-center gap-1 text-[10px] text-slate-400 hover:text-indigo-600 transition-colors mt-2"
          >
            <Reply className="w-3 h-3" />
            Reply
          </button>

          {/* Child replies */}
          {comment.replies && comment.replies.map((reply) => renderComment(reply, true))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to feed
        </Link>
      </div>

      {/* Article Header */}
      <header className="mb-10">
        <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
          {post.categoryId}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mt-2 mb-6" style={{ fontFamily: "var(--font-display)" }}>
          {post.title}
        </h1>

        <div className="flex items-center justify-between border-y border-slate-100 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg gradient-brand-subtle flex items-center justify-center text-sm font-bold text-indigo-600">
              {post.authorName.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <div className="text-sm font-bold text-slate-800">{post.authorName}</div>
              <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-3.5 h-3.5" />
                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ""}
                <span>·</span>
                <Clock className="w-3.5 h-3.5" />
                {post.readTime} read
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="aspect-video rounded-3xl overflow-hidden mb-12 shadow-md">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Article Body */}
      <article className="prose-inksphere max-w-none mb-16">
        {post.content && post.content.map((b: any) => renderBlock(b))}
      </article>

      {/* Discussion Thread */}
      <section className="border-t border-slate-100 pt-12 mt-16">
        <div className="flex items-center gap-2 mb-6">
          <MessageSquare className="w-5 h-5 text-slate-400" />
          <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
            Discussion ({comments.reduce((acc, c) => acc + 1 + c.replies.length, 0)})
          </h3>
        </div>

        {/* Comment Thread */}
        <div className="space-y-6 divide-y divide-slate-50">
          {comments.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No comments yet. Start the conversation!</p>
          ) : (
            comments.map((c) => renderComment(c))
          )}
        </div>

        {/* Post Comment Form */}
        <div className="glass-card rounded-2xl p-6 mt-12 border border-slate-100 shadow-sm">
          <h4 className="text-sm font-bold text-slate-800 mb-4">
            {replyToId ? `Reply to ${replyToName}` : "Join the discussion"}
          </h4>

          <form onSubmit={handleCommentSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Name</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Email</label>
                <input
                  type="email"
                  value={authorEmail}
                  onChange={(e) => setAuthorEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Comment</label>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your feedback or reply..."
                rows={4}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
                required
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              {replyToId && (
                <button
                  type="button"
                  onClick={() => { setReplyToId(null); setReplyToName(null); }}
                  className="text-[10px] font-semibold text-slate-400 hover:text-slate-600"
                >
                  Cancel Reply
                </button>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary inline-flex items-center gap-1.5 text-xs py-2 px-4 shadow-sm ml-auto"
              >
                {isSubmitting ? (
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Submit Comment
                    <Send className="w-3 h-3" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
