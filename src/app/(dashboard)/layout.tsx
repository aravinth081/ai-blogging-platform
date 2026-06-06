"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FileText, FolderOpen, MessageSquare, BarChart3,
  Users, Mail, Search, Sparkles, CreditCard, Puzzle, UserPlus,
  Settings, Shield, Bell, ChevronLeft, ChevronRight, LogOut,
  PanelLeftClose, PanelLeft, Plus, Command,
} from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { DASHBOARD_NAV } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, FileText, FolderOpen, MessageSquare, BarChart3,
  Users, Mail, Search, Sparkles, CreditCard, Puzzle, UserPlus,
  Settings, Shield, Bell,
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [user, setUser] = useState({
    name: "User",
    email: "user@inksphere.io",
    initials: "U"
  });

  useEffect(() => {
    // Priority 1: Real Google OAuth session from NextAuth
    if (session?.user?.name && session?.user?.email) {
      const initials = session.user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
      setUser({
        name: session.user.name,
        email: session.user.email,
        initials: initials || "U"
      });
      // Also sync to localStorage for consistency
      localStorage.setItem("user_session", JSON.stringify({ name: session.user.name, email: session.user.email }));
      return;
    }

    // Priority 2: localStorage session (email/password login)
    const sessionStr = localStorage.getItem("user_session");
    if (sessionStr) {
      try {
        const localSession = JSON.parse(sessionStr);
        if (localSession.name && localSession.email) {
          const initials = localSession.name
            .split(" ")
            .map((n: string) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
          setUser({
            name: localSession.name,
            email: localSession.email,
            initials: initials || "U"
          });
        }
      } catch (e) {
        console.error("Failed to parse session", e);
      }
    }
  }, [session]);

  const handleLogout = async () => {
    localStorage.removeItem("user_session");
    if (session) {
      // Sign out from real Google OAuth session
      await signOut({ callbackUrl: "/login" });
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-0 top-0 bottom-0 z-40 bg-white border-r border-slate-200/80 flex flex-col"
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-100">
          {!collapsed && <Logo />}
          {collapsed && (
            <div className="w-8 h-8 rounded-xl gradient-brand flex items-center justify-center mx-auto">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a7 7 0 0 1 0 20" />
              </svg>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex w-7 h-7 rounded-lg hover:bg-slate-100 items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
          >
            {collapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>
        </div>

        {/* Quick Action */}
        {!collapsed && (
          <div className="px-3 py-3">
            <Link
              href="/dashboard/posts?new=true"
              className="flex items-center gap-2 w-full px-3 py-2 gradient-brand text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" />
              New Post
            </Link>
          </div>
        )}
        {collapsed && (
          <div className="px-3 py-3 flex justify-center">
            <Link
              href="/dashboard/posts?new=true"
              className="w-9 h-9 gradient-brand text-white rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
          {DASHBOARD_NAV.map((item) => {
            const Icon = iconMap[item.icon] || LayoutDashboard;
            const isActive = pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                } ${collapsed ? "justify-center" : ""}`}
                title={collapsed ? item.label : undefined}
              >
                <Icon
                  className={`w-[18px] h-[18px] flex-shrink-0 ${
                    isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
                  }`}
                />
                {!collapsed && <span>{item.label}</span>}
                {isActive && !collapsed && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-slate-100 p-3">
          {/* User */}
          <div className={`flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors cursor-default ${collapsed ? "flex-col justify-center gap-2" : ""}`}>
            <div className="w-8 h-8 rounded-lg gradient-brand-subtle flex items-center justify-center text-xs font-bold text-indigo-600 flex-shrink-0 animate-scale-in">
              {user.initials}
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0 animate-fade-in-up">
                <div className="text-sm font-semibold text-slate-900 truncate">{user.name}</div>
                <div className="text-xs text-slate-400 truncate">{user.email}</div>
              </div>
            )}
            <button
              onClick={handleLogout}
              className={`w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0 ${collapsed ? "mt-1" : ""}`}
              title="Log out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: collapsed ? 72 : 260 }}
      >
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-400 w-72 cursor-pointer hover:border-slate-300 transition-colors">
              <Search className="w-4 h-4" />
              <span>Search posts, pages, settings...</span>
              <kbd className="ml-auto px-1.5 py-0.5 bg-white rounded border border-slate-200 text-[10px] font-mono text-slate-400">
                ⌘K
              </kbd>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative w-9 h-9 rounded-xl hover:bg-slate-50 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors"
            >
              <Bell className="w-[18px] h-[18px]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* Quick Settings */}
            <button className="w-9 h-9 rounded-xl hover:bg-slate-50 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors">
              <Settings className="w-[18px] h-[18px]" />
            </button>

            {/* User avatar */}
            <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center text-xs font-bold text-white cursor-pointer" title={`${user.name} (${user.email})`}>
              {user.initials}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
