"use client";
import { motion } from "framer-motion";
import { CreditCard, Check, ArrowRight, Zap, Shield, Download, FileText } from "lucide-react";
import { PRICING_PLANS } from "@/lib/constants";
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.05 } } };
const invoices = [
  { id: "INV-001", date: "Jun 1, 2026", amount: "$19.00", status: "Paid" },
  { id: "INV-002", date: "May 1, 2026", amount: "$19.00", status: "Paid" },
  { id: "INV-003", date: "Apr 1, 2026", amount: "$19.00", status: "Paid" },
];
export default function BillingPage() {
  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-5xl">
      <motion.div variants={fadeUp} className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Billing</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your subscription and billing details.</p>
      </motion.div>
      {/* Current Plan */}
      <motion.div variants={fadeUp} className="glass-card rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl gradient-brand flex items-center justify-center"><Zap className="w-6 h-6 text-white" /></div>
            <div>
              <div className="text-lg font-bold text-slate-900">Pro Plan</div>
              <div className="text-sm text-slate-500">$19/month · Renews Jun 7, 2026</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary text-sm">Change Plan</button>
            <button className="text-sm text-red-500 hover:text-red-600 font-medium px-4">Cancel</button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100">
          {[
            { label: "Posts Used", value: "156 / ∞" },
            { label: "Team Members", value: "3 / 5" },
            { label: "AI Credits", value: "842 / 1,000" },
            { label: "Storage", value: "2.4GB / 10GB" },
          ].map((u, i) => (
            <div key={i}>
              <div className="text-xs text-slate-400 mb-1">{u.label}</div>
              <div className="text-sm font-semibold text-slate-900">{u.value}</div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${30 + i * 15}%` }} />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      {/* Invoices */}
      <motion.div variants={fadeUp} className="glass-card rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">Invoice History</h3>
        <div className="space-y-3">
          {invoices.map((inv, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50/80 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center"><FileText className="w-4 h-4 text-slate-500" /></div>
                <div><div className="text-sm font-medium text-slate-900">{inv.id}</div><div className="text-xs text-slate-400">{inv.date}</div></div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-900">{inv.amount}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700">{inv.status}</span>
                <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"><Download className="w-3 h-3" />PDF</button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
