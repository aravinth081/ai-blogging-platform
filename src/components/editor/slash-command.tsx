"use client";

import { useEffect, useRef, useState } from "react";
import { Heading1, Heading2, Heading3, Text, Quote, Code, List, ListOrdered, Image as ImageIcon } from "lucide-react";

export interface CommandItem {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
}

const COMMAND_ITEMS: CommandItem[] = [
  { id: "paragraph", label: "Text", description: "Start writing with plain text.", icon: Text },
  { id: "heading-1", label: "Heading 1", description: "Large section heading.", icon: Heading1 },
  { id: "heading-2", label: "Heading 2", description: "Medium section heading.", icon: Heading2 },
  { id: "heading-3", label: "Heading 3", description: "Small section heading.", icon: Heading3 },
  { id: "blockquote", label: "Quote", description: "Capture a quote or highlight.", icon: Quote },
  { id: "code", label: "Code block", description: "Write code snippet with syntax.", icon: Code },
  { id: "list-bullet", label: "Bulleted list", description: "Create a simple bulleted list.", icon: List },
  { id: "list-number", label: "Numbered list", description: "Create a list with numbers.", icon: ListOrdered },
  { id: "image", label: "Image", description: "Upload or paste an image link.", icon: ImageIcon }
];

interface SlashCommandProps {
  onSelect: (type: string) => void;
  onClose: () => void;
  position: { top: number; left: number };
}

export function SlashCommand({ onSelect, onClose, position }: SlashCommandProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % COMMAND_ITEMS.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + COMMAND_ITEMS.length) % COMMAND_ITEMS.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        onSelect(COMMAND_ITEMS[selectedIndex].id);
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, onSelect, onClose]);

  // Handle outside click to close
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [onClose]);

  // Auto scroll focused item into view
  useEffect(() => {
    const activeEl = containerRef.current?.querySelector("[data-active='true']");
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  return (
    <div
      ref={containerRef}
      className="fixed z-50 w-72 max-h-80 overflow-y-auto glass rounded-xl border border-slate-200/80 shadow-xl p-1.5 focus:outline-none"
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
        Basic Blocks
      </div>
      {COMMAND_ITEMS.map((item, index) => {
        const Icon = item.icon;
        const isActive = index === selectedIndex;
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            data-active={isActive}
            className={`w-full flex items-center gap-3 px-2.5 py-2 text-left rounded-lg transition-all ${
              isActive
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-700 hover:bg-slate-50"
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              isActive ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-500"
            }`}>
              <Icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold">{item.label}</div>
              <div className="text-[10px] text-slate-400 truncate mt-0.5">{item.description}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
