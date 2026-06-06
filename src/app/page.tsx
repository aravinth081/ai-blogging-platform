"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  PenTool,
  BarChart3,
  Search,
  Building2,
  Mail,
  CreditCard,
  Zap,
  Shield,
  Play,
  Check,
  Star,
  ArrowUpRight,
  Users,
  FileText,
  TrendingUp,
  Eye,
} from "lucide-react";
import { Navbar } from "@/components/shared/navbar";
import {
  FEATURES,
  PRICING_PLANS,
} from "@/lib/constants";
import { useState } from "react";

/* ─── Icon Map ─── */
const iconMap: Record<string, React.ElementType> = {
  Sparkles, PenTool, BarChart3, Search, Building2, Mail, CreditCard, Zap, Shield,
};

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

/* ─── Section Wrapper ─── */
function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={stagger}
      className={`py-24 lg:py-32 ${className}`}
    >
      {children}
    </motion.section>
  );
}

/* ═══════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 gradient-mesh" />
      <div className="absolute inset-0 dot-pattern opacity-40" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-blue-200/15 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium glass border border-indigo-100 text-indigo-700 mb-8">
              <Sparkles className="w-3.5 h-3.5" />
              Introducing InkSphere — AI-Powered Blogging
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Where ideas{" "}
            <span className="gradient-text">take shape</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            The AI-powered blogging platform for modern teams. Write beautifully,
            collaborate seamlessly, and grow your audience with enterprise-grade tools.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/signup"
              className="btn-primary inline-flex items-center gap-2 text-base px-8 py-3.5 animate-pulse-glow"
            >
              Start Writing Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button className="btn-secondary inline-flex items-center gap-2 text-base px-8 py-3.5">
              <Play className="w-4 h-4" />
              Watch Demo
            </button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-8 text-sm text-slate-400 flex items-center justify-center gap-4"
          >
            <span className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border-2 border-white gradient-brand-subtle flex items-center justify-center text-[10px] font-bold text-indigo-600"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </span>
            <span>
              Loved by <strong className="text-slate-600">50,000+</strong> creators
            </span>
            <span className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </span>
          </motion.div>
        </div>

        {/* Hero Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 relative max-w-5xl mx-auto"
        >
          {/* Glow effect behind dashboard */}
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-blue-500/10 blur-3xl rounded-3xl" />

          {/* Dashboard mockup */}
          <div className="relative glass-card rounded-2xl overflow-hidden border border-slate-200/60 shadow-2xl">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-white/80">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 bg-slate-50 rounded-lg text-xs text-slate-400 font-mono">
                  app.inksphere.io/dashboard
                </div>
              </div>
            </div>

            {/* Dashboard content */}
            <div className="p-6 bg-gradient-to-b from-slate-50/50 to-white">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="h-3 w-32 bg-slate-200 rounded-full mb-2" />
                  <div className="h-2 w-48 bg-slate-100 rounded-full" />
                </div>
                <div className="flex gap-2">
                  <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-indigo-500" />
                  </div>
                  <div className="h-8 w-24 rounded-lg gradient-brand flex items-center justify-center">
                    <span className="text-white text-xs font-medium">New Post</span>
                  </div>
                </div>
              </div>

              {/* Stats cards */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  { icon: Eye, label: "Views", value: "24.5K", change: "+12.5%", color: "text-indigo-600 bg-indigo-50" },
                  { icon: Users, label: "Subscribers", value: "3,842", change: "+8.2%", color: "text-purple-600 bg-purple-50" },
                  { icon: FileText, label: "Posts", value: "156", change: "+3", color: "text-blue-600 bg-blue-50" },
                  { icon: TrendingUp, label: "Revenue", value: "$12.4K", change: "+23.1%", color: "text-emerald-600 bg-emerald-50" },
                ].map((stat, i) => (
                  <div key={i} className="p-4 bg-white rounded-xl border border-slate-100 shadow-xs">
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.color}`}>
                        <stat.icon className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-lg font-bold text-slate-900">{stat.value}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs text-slate-500">{stat.label}</span>
                      <span className="text-xs text-emerald-600 font-medium">{stat.change}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chart placeholder */}
              <div className="p-4 bg-white rounded-xl border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-slate-700">Audience Growth</span>
                  <div className="flex gap-1">
                    {["7d", "30d", "90d"].map((period) => (
                      <button
                        key={period}
                        className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                          period === "30d"
                            ? "bg-indigo-50 text-indigo-700"
                            : "text-slate-400 hover:text-slate-600"
                        }`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>
                {/* SVG Chart */}
                <svg className="w-full h-32" viewBox="0 0 600 120" fill="none">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366F1" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,100 C50,95 100,80 150,70 C200,60 250,50 300,40 C350,30 400,35 450,25 C500,15 550,10 600,5"
                    stroke="#6366F1"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M0,100 C50,95 100,80 150,70 C200,60 250,50 300,40 C350,30 400,35 450,25 C500,15 550,10 600,5 L600,120 L0,120 Z"
                    fill="url(#chartGrad)"
                  />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   TRUSTED BY SECTION
   ═══════════════════════════════════════════════ */
function TrustedBySection() {
  const logos = [
    "Stripe", "Vercel", "Notion", "Linear", "Figma",
    "GitHub", "Slack", "Shopify", "Atlassian", "Datadog",
  ];

  return (
    <Section className="py-16 lg:py-20 border-y border-slate-100 bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.p
          variants={fadeUp}
          className="text-center text-sm font-medium text-slate-400 uppercase tracking-widest mb-10"
        >
          Trusted by teams at the world&apos;s best companies
        </motion.p>
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50/80 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50/80 to-transparent z-10" />
          <div className="flex animate-marquee">
            {[...logos, ...logos].map((name, i) => (
              <div
                key={i}
                className="flex-shrink-0 mx-10 flex items-center justify-center"
              >
                <span className="text-xl font-bold text-slate-300 tracking-tight whitespace-nowrap" style={{ fontFamily: "var(--font-display)" }}>
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════
   FEATURES SECTION
   ═══════════════════════════════════════════════ */
function FeaturesSection() {
  return (
    <Section id="features" className="relative">
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600 mb-4"
          >
            <Zap className="w-3 h-3" />
            FEATURES
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Everything you need to{" "}
            <span className="gradient-text">publish at scale</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-lg text-slate-500"
          >
            From AI-powered writing to enterprise analytics, InkSphere gives you
            all the tools to create, grow, and monetize your content.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => {
            const Icon = iconMap[feature.icon] || Sparkles;
            return (
              <motion.div
                key={i}
                variants={scaleIn}
                className="glass-card rounded-2xl p-6 group cursor-default"
              >
                <div className="w-11 h-11 rounded-xl gradient-brand-subtle flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════
   PRICING SECTION
   ═══════════════════════════════════════════════ */
function PricingSection() {
  const [yearly, setYearly] = useState(false);

  return (
    <Section id="pricing" className="bg-slate-50/50 border-y border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 mb-4"
          >
            <CreditCard className="w-3 h-3" />
            PRICING
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Simple, transparent{" "}
            <span className="gradient-text">pricing</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-slate-500 mb-8">
            Start free. Upgrade when you&apos;re ready. No hidden fees.
          </motion.p>

          {/* Toggle */}
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-3">
            <span className={`text-sm font-medium ${!yearly ? "text-slate-900" : "text-slate-400"}`}>Monthly</span>
            <button
              onClick={() => setYearly(!yearly)}
              className={`relative w-12 h-6 rounded-full transition-colors ${yearly ? "bg-indigo-600" : "bg-slate-300"}`}
            >
              <div
                className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                  yearly ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${yearly ? "text-slate-900" : "text-slate-400"}`}>
              Yearly
              <span className="ml-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold">
                Save 17%
              </span>
            </span>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PRICING_PLANS.map((plan, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              className={`relative rounded-2xl p-1 ${
                plan.highlighted
                  ? "bg-gradient-to-b from-indigo-500 via-purple-500 to-indigo-600"
                  : ""
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-brand text-white text-xs font-semibold shadow-lg">
                  Most Popular
                </div>
              )}
              <div
                className={`h-full rounded-xl p-6 ${
                  plan.highlighted
                    ? "bg-white shadow-xl"
                    : "glass-card"
                }`}
              >
                <h3 className="text-lg font-bold text-slate-900 mb-1" style={{ fontFamily: "var(--font-display)" }}>
                  {plan.name}
                </h3>
                <p className="text-sm text-slate-500 mb-5">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-slate-900">
                    ${yearly ? Math.round(plan.yearlyPrice / 12) : plan.monthlyPrice}
                  </span>
                  <span className="text-sm text-slate-400">/mo</span>
                  {yearly && plan.yearlyPrice > 0 && (
                    <div className="text-xs text-slate-400 mt-1">
                      Billed ${plan.yearlyPrice}/year
                    </div>
                  )}
                </div>

                <Link
                  href="/signup"
                  className={`block w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    plan.highlighted
                      ? "btn-primary"
                      : "btn-secondary"
                  }`}
                >
                  {plan.cta}
                </Link>

                <div className="border-t border-slate-100 mt-6 pt-6 space-y-3">
                  {plan.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                      <span className="text-sm text-slate-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════
   CTA SECTION
   ═══════════════════════════════════════════════ */
function CTASection() {
  return (
    <Section className="relative overflow-hidden">
      <div className="absolute inset-0 gradient-brand" />
      <div className="absolute inset-0 dot-pattern opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 to-transparent" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          variants={fadeUp}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Start writing your best content today
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="text-lg text-indigo-100 mb-10 max-w-2xl mx-auto"
        >
          Join 50,000+ creators who use InkSphere to build their audience, grow their
          brand, and monetize their expertise.
        </motion.p>
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Get Started Free
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-white font-semibold rounded-xl border border-white/30 hover:bg-white/10 transition-all"
          >
            View Pricing
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>
        <motion.p variants={fadeUp} className="mt-6 text-sm text-indigo-200">
          No credit card required · Free forever plan · Cancel anytime
        </motion.p>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════ */
function Footer() {
  const footerLinks = {
    Product: ["Features", "Pricing", "Templates", "Changelog", "Roadmap"],
    Resources: ["Documentation", "Blog", "API Reference", "Status", "Support"],
    Company: ["About", "Careers", "Press", "Partners", "Contact"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR", "Security"],
  };

  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl gradient-brand flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a7 7 0 0 1 0 20" />
                  <path d="M12 2a7 7 0 0 0 0 20" />
                  <path d="M2 12h20" />
                </svg>
              </div>
              <span className="text-lg font-bold" style={{ fontFamily: "var(--font-display)" }}>
                InkSphere
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              The AI-powered blogging platform for modern teams.
            </p>
            <div className="flex gap-3">
              {["X", "GH", "LI", "YT"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500 transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-slate-900 mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-100 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} InkSphere. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
            <span className="text-sm text-slate-400">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════
   LANDING PAGE
   ═══════════════════════════════════════════════ */
export default function LandingPage() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <TrustedBySection />
      <FeaturesSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  );
}
