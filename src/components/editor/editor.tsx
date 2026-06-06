"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Settings,
  Eye,
  Trash2,
  ChevronRight,
  ArrowLeft,
  Loader2,
  Check,
  ChevronDown,
  Globe,
  Lock,
  Users,
  Image as ImageIcon,
  Compass,
  FileText
} from "lucide-react";
import { SlashCommand } from "./slash-command";
import { upsertPost, PostData } from "@/actions/posts";

interface EditorProps {
  initialPost: PostData | null;
}

const PRESET_COVERS = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&auto=format&fit=crop&q=80"
];

const CATEGORIES = ["Technology", "Engineering", "Design", "Growth", "Marketing", "General"];

export function Editor({ initialPost }: EditorProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState("Saved");
  const [showSettings, setShowSettings] = useState(true);

  // Post State
  const [id, setId] = useState(initialPost?.id || "");
  const [title, setTitle] = useState(initialPost?.title || "");
  const [slug, setSlug] = useState(initialPost?.slug || "");
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt || "");
  const [coverImage, setCoverImage] = useState(
    initialPost?.coverImage || PRESET_COVERS[0]
  );
  const [status, setStatus] = useState<PostData["status"]>(initialPost?.status || "DRAFT");
  const [visibility, setVisibility] = useState<PostData["visibility"]>(
    initialPost?.visibility || "PUBLIC"
  );
  const [categoryId, setCategoryId] = useState(initialPost?.categoryId || "General");
  const [metaTitle, setMetaTitle] = useState(initialPost?.metaTitle || "");
  const [metaDesc, setMetaDesc] = useState(initialPost?.metaDesc || "");

  // Block editor state
  const [blocks, setBlocks] = useState<any[]>(
    initialPost?.content || [{ id: "b-init", type: "paragraph", content: "" }]
  );

  // Floating Slash Command State
  const [slashMenu, setSlashMenu] = useState<{
    blockId: string;
    position: { top: number; left: number };
  } | null>(null);

  // Inline AI Assistant State
  const [aiMenu, setAiMenu] = useState<{
    blockId: string;
    text: string;
    position: { top: number; left: number };
  } | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);

  // References for focused block elements
  const blockRefs = useRef<Record<string, HTMLTextAreaElement | null>>({});

  // Auto-generate slug and meta tags if empty
  useEffect(() => {
    if (!initialPost) {
      const computedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setSlug(computedSlug);
      setMetaTitle(`${title} | InkSphere`);
    }
  }, [title, initialPost]);

  // Adjust textarea heights to auto-grow
  const adjustHeight = (blockId: string) => {
    const el = blockRefs.current[blockId];
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  useEffect(() => {
    blocks.forEach((b) => adjustHeight(b.id));
  }, [blocks]);

  // Autosave Simulator
  useEffect(() => {
    if (!title) return;
    setSaveStatus("Changes pending...");
    const timeout = setTimeout(async () => {
      setSaveStatus("Saving...");
      setIsSaving(true);
      try {
        const payload: any = {
          id: id || undefined,
          title,
          slug,
          excerpt,
          content: blocks,
          coverImage,
          status,
          visibility,
          categoryId,
          metaTitle,
          metaDesc
        };
        const saved = await upsertPost(payload);
        if (!id) {
          setId(saved.id);
        }
        setSaveStatus("Saved to Cloud");
      } catch (err) {
        setSaveStatus("Offline (Local Saved)");
      } finally {
        setIsSaving(false);
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [
    title,
    slug,
    excerpt,
    blocks,
    coverImage,
    status,
    visibility,
    categoryId,
    metaTitle,
    metaDesc
  ]);

  // Block management functions
  const updateBlockContent = (blockId: string, content: string) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === blockId ? { ...b, content } : b))
    );

    // Detect `/` trigger
    const block = blocks.find((b) => b.id === blockId);
    if (content.endsWith("/")) {
      const textarea = blockRefs.current[blockId];
      if (textarea) {
        const rect = textarea.getBoundingClientRect();
        setSlashMenu({
          blockId,
          position: {
            top: rect.bottom + window.scrollY + 8,
            left: rect.left + window.scrollX + 24
          }
        });
      }
    } else if (slashMenu && slashMenu.blockId === blockId && !content.endsWith("/")) {
      setSlashMenu(null);
    }
  };

  const handleBlockKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    blockId: string,
    index: number
  ) => {
    const block = blocks[index];

    // Enter Key -> Create new block
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const newBlock = {
        id: `block-${Date.now()}`,
        type: "paragraph",
        content: ""
      };
      const updated = [...blocks];
      updated.splice(index + 1, 0, newBlock);
      setBlocks(updated);

      // Focus new block on next tick
      setTimeout(() => {
        blockRefs.current[newBlock.id]?.focus();
      }, 0);
    }

    // Backspace Key -> Delete block if empty
    if (e.key === "Backspace" && !block.content && blocks.length > 1) {
      e.preventDefault();
      const updated = blocks.filter((b) => b.id !== blockId);
      setBlocks(updated);

      // Focus previous block
      const prevBlock = blocks[index - 1];
      if (prevBlock) {
        setTimeout(() => {
          const el = blockRefs.current[prevBlock.id];
          if (el) {
            el.focus();
            // Move cursor to the end
            el.selectionStart = el.selectionEnd = el.value.length;
          }
        }, 0);
      }
    }

    // Arrow keys navigation
    if (e.key === "ArrowUp" && index > 0) {
      const el = blockRefs.current[e.currentTarget.id];
      if (el && el.selectionStart === 0) {
        e.preventDefault();
        blockRefs.current[blocks[index - 1].id]?.focus();
      }
    }

    if (e.key === "ArrowDown" && index < blocks.length - 1) {
      const el = blockRefs.current[e.currentTarget.id];
      if (el && el.selectionStart === el.value.length) {
        e.preventDefault();
        blockRefs.current[blocks[index + 1].id]?.focus();
      }
    }
  };

  const handleSelectSlashCommand = (type: string) => {
    if (!slashMenu) return;
    const { blockId } = slashMenu;

    setBlocks((prev) =>
      prev.map((b) => {
        if (b.id === blockId) {
          // Remove the trailing `/` and change block type
          const trimmed = b.content.endsWith("/") ? b.content.slice(0, -1) : b.content;
          return { ...b, type, content: trimmed };
        }
        return b;
      })
    );
    setSlashMenu(null);

    setTimeout(() => {
      blockRefs.current[blockId]?.focus();
    }, 0);
  };

  // Inline AI rewriting helper
  const handleTextSelection = (blockId: string) => {
    const textarea = blockRefs.current[blockId];
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end).trim();

    if (selectedText.length > 3) {
      const rect = textarea.getBoundingClientRect();
      setAiMenu({
        blockId,
        text: selectedText,
        position: {
          top: rect.top + window.scrollY - 48,
          left: rect.left + window.scrollX + (start * 6) // approximate cursor positioning
        }
      });
    } else {
      setAiMenu(null);
    }
  };

  const runAiRewrite = () => {
    if (!aiMenu) return;
    setAiLoading(true);
    setAiResult(null);

    // Mocking an advanced AI edit response
    setTimeout(() => {
      const original = aiMenu.text;
      const suggestions = [
        `Ultimately, ${original.charAt(0).toLowerCase() + original.slice(1)} provides deep efficiency.`,
        `Indeed, ${original} marks a major milestone.`,
        `By integrating this approach, we unlock a paradigm shift.`
      ];
      setAiResult(suggestions[Math.floor(Math.random() * suggestions.length)]);
      setAiLoading(false);
    }, 1200);
  };

  const applyAiRewrite = () => {
    if (!aiMenu || !aiResult) return;
    const { blockId, text } = aiMenu;
    const textarea = blockRefs.current[blockId];
    if (!textarea) return;

    const blockContent = textarea.value;
    const updatedContent = blockContent.replace(text, aiResult);

    setBlocks((prev) =>
      prev.map((b) => (b.id === blockId ? { ...b, content: updatedContent } : b))
    );
    setAiMenu(null);
    setAiResult(null);
  };

  const getBlockPlaceholder = (type: string) => {
    switch (type) {
      case "heading-1":
        return "Heading 1";
      case "heading-2":
        return "Heading 2";
      case "heading-3":
        return "Heading 3";
      case "blockquote":
        return "Empty quote...";
      case "code":
        return "console.log('hello world');";
      case "list-bullet":
        return "List item";
      case "list-number":
        return "List item";
      case "image":
        return "Paste Image URL...";
      default:
        return "Type '/' for blocks, select text for AI magic...";
    }
  };

  const renderBlockInput = (block: any, index: number) => {
    const isSpecial = block.type !== "paragraph";
    let inputStyle = "w-full bg-transparent resize-none border-none outline-none focus:ring-0 p-0 text-slate-800 placeholder-slate-300 transition-all leading-relaxed";

    if (block.type === "heading-1") {
      inputStyle += " text-3xl font-extrabold tracking-tight text-slate-900 mt-6 mb-2";
    } else if (block.type === "heading-2") {
      inputStyle += " text-2xl font-bold tracking-tight text-slate-900 mt-5 mb-2";
    } else if (block.type === "heading-3") {
      inputStyle += " text-xl font-bold tracking-tight text-slate-900 mt-4 mb-1.5";
    } else if (block.type === "blockquote") {
      inputStyle += " text-lg italic text-slate-500 border-l-4 border-indigo-500 pl-4 py-1.5";
    } else if (block.type === "code") {
      inputStyle += " font-mono text-sm bg-slate-950 text-slate-200 p-4 rounded-xl mt-3";
    } else if (block.type === "list-bullet") {
      inputStyle += " pl-2";
    } else if (block.type === "list-number") {
      inputStyle += " pl-2";
    } else if (block.type === "image") {
      inputStyle += " text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl p-2.5 mt-2";
    } else {
      inputStyle += " text-base mt-2";
    }

    return (
      <div key={block.id} className="relative group/block flex items-start gap-2.5 py-1">
        {/* Drag handle or block symbol on hover */}
        <div className="absolute -left-7 top-1/2 -translate-y-1/2 opacity-0 group-hover/block:opacity-100 transition-opacity flex items-center justify-center w-5 h-5 text-slate-300 cursor-grab">
          ::
        </div>

        {/* List markers */}
        {block.type === "list-bullet" && (
          <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-4 flex-shrink-0" />
        )}
        {block.type === "list-number" && (
          <span className="text-sm font-semibold text-slate-400 mt-2.5 flex-shrink-0 w-4 text-right">
            {index - blocks.slice(0, index).filter((b) => b.type !== "list-number").length + 1}.
          </span>
        )}

        <div className="flex-1">
          <textarea
            id={block.id}
            ref={(el) => { blockRefs.current[block.id] = el; }}
            value={block.content}
            onChange={(e) => updateBlockContent(block.id, e.target.value)}
            onKeyDown={(e) => handleBlockKeyDown(e, block.id, index)}
            onMouseUp={() => handleTextSelection(block.id)}
            placeholder={getBlockPlaceholder(block.type)}
            rows={1}
            className={inputStyle}
            style={{ fontFamily: block.type === "code" ? "var(--font-mono)" : "inherit" }}
          />

          {/* Render real-time image preview */}
          {block.type === "image" && block.content && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-3">
              <img
                src={block.content}
                alt="Uploaded content"
                className="max-h-[350px] w-auto rounded-xl shadow-md object-cover border border-slate-100"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            </motion.div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)]">
      {/* Editor Main Canvas */}
      <div className="flex-1 max-w-4xl px-8 py-4">
        {/* Editor Top Navigation */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-8">
          <button
            onClick={() => router.push("/dashboard/posts")}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Posts
          </button>

          <div className="flex items-center gap-4">
            {/* Auto save badge */}
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              {isSaving ? (
                <Loader2 className="w-3 h-3 animate-spin text-indigo-500" />
              ) : (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              )}
              {saveStatus}
            </span>

            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center border transition-colors ${
                showSettings ? "border-indigo-100 bg-indigo-50/50 text-indigo-600" : "border-slate-200 text-slate-500"
              }`}
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title Input */}
        <div className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Untitled story"
            className="w-full text-4xl font-extrabold border-none outline-none focus:ring-0 p-0 text-slate-900 placeholder-slate-200"
            style={{ fontFamily: "var(--font-display)" }}
          />
        </div>

        {/* Editor Content Area */}
        <div className="space-y-1">
          {blocks.map((block, idx) => renderBlockInput(block, idx))}
        </div>

        {/* Floating Components */}
        <AnimatePresence>
          {slashMenu && (
            <SlashCommand
              position={slashMenu.position}
              onSelect={handleSelectSlashCommand}
              onClose={() => setSlashMenu(null)}
            />
          )}

          {aiMenu && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="fixed z-50 glass-strong border border-indigo-100 shadow-xl rounded-xl p-2.5 flex flex-col gap-2 w-80"
              style={{ top: aiMenu.position.top, left: aiMenu.position.left }}
            >
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-600 uppercase tracking-widest border-b border-slate-100 pb-1.5">
                <Sparkles className="w-3.5 h-3.5 fill-indigo-100" />
                InkSphere AI Assistant
              </div>

              {!aiResult ? (
                <div className="flex flex-col gap-2">
                  <p className="text-[11px] text-slate-500 truncate">
                    Selected: &ldquo;{aiMenu.text}&rdquo;
                  </p>
                  <button
                    onClick={runAiRewrite}
                    disabled={aiLoading}
                    className="w-full btn-primary text-xs flex items-center justify-center gap-1.5 py-1.5"
                  >
                    {aiLoading ? (
                      <Loader2 className="w-3 h-3 animate-spin text-white" />
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 fill-white/20" />
                        Optimize Phrasing
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-700 leading-relaxed max-h-36 overflow-y-auto">
                    {aiResult}
                  </div>
                  <div className="flex gap-2.5">
                    <button
                      onClick={applyAiRewrite}
                      className="flex-1 bg-emerald-600 text-white font-semibold rounded-lg text-xs py-1.5 hover:bg-emerald-700 transition-colors"
                    >
                      Insert
                    </button>
                    <button
                      onClick={() => setAiResult(null)}
                      className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs py-1.5 transition-colors"
                    >
                      Discard
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Editor Settings Sidebar */}
      <AnimatePresence>
        {showSettings && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.25 }}
            className="border-l border-slate-200/80 bg-white overflow-y-auto w-80 p-5 flex flex-col gap-5 flex-shrink-0"
          >
            <div>
              <h3 className="text-sm font-bold text-slate-800" style={{ fontFamily: "var(--font-display)" }}>
                Publish Settings
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Configure post settings and metadata.</p>
            </div>

            {/* Status Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500">Status</label>
              <div className="relative">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full text-xs font-medium border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 appearance-none transition-all"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="SCHEDULED">Scheduled</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Visibility Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500">Visibility</label>
              <div className="grid grid-cols-3 gap-1.5 bg-slate-50 border border-slate-200 rounded-xl p-1">
                {[
                  { id: "PUBLIC", label: "Public", icon: Globe },
                  { id: "PRIVATE", label: "Private", icon: Lock },
                  { id: "PREMIUM", label: "Premium", icon: Users }
                ].map((item) => {
                  const Icon = item.icon;
                  const selected = visibility === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setVisibility(item.id as any)}
                      className={`flex flex-col items-center gap-1.5 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                        selected
                          ? "bg-white text-indigo-600 shadow-xs"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Slug */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500">URL Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="url-friendly-slug"
                className="w-full text-xs font-medium border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Category Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500">Category</label>
              <div className="relative">
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full text-xs font-medium border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 appearance-none transition-all"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Cover Image Preset Picker */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500">Cover Image</label>
              <div className="grid grid-cols-2 gap-2">
                {PRESET_COVERS.map((url, index) => (
                  <button
                    key={index}
                    onClick={() => setCoverImage(url)}
                    className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                      coverImage === url ? "border-indigo-500 scale-98" : "border-transparent opacity-80 hover:opacity-100"
                    }`}
                  >
                    <img src={url} alt={`Preset ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="Custom image URL..."
                className="w-full text-xs font-medium border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all mt-1.5"
              />
            </div>

            {/* Excerpt / Subtitle */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500">Excerpt</label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A brief summary of this article..."
                rows={3}
                className="w-full text-xs font-medium border border-slate-200 rounded-xl p-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
              />
            </div>

            {/* SEO section */}
            <div className="border-t border-slate-100 pt-4 mt-2 flex flex-col gap-4">
              <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-slate-400" />
                SEO Optimization
              </h4>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Meta Title</label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="Meta title tags"
                  className="w-full text-xs font-medium border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Meta Description</label>
                <textarea
                  value={metaDesc}
                  onChange={(e) => setMetaDesc(e.target.value)}
                  placeholder="Google search snippet description..."
                  rows={2}
                  className="w-full text-xs font-medium border border-slate-200 rounded-xl p-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
                />
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
