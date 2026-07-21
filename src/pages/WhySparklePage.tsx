import React from "react";
import { SEO } from "../components/SEO";
import { ShieldCheck, Zap, Sparkles, Compass, Cpu, DollarSign } from "lucide-react";
import { motion } from "motion/react";

interface WhySparklePageProps {
  theme?: "light" | "dark";
}

export const WhySparklePage: React.FC<WhySparklePageProps> = ({ theme = "dark" }) => {
  const isDark = theme === "dark";

  return (
    <div className="pt-28 pb-20 min-h-screen relative overflow-hidden transition-colors duration-300">
      <SEO 
        title="Sparkle RFID | The Luxury Showroom Advantage" 
        description="Learn how Sparkle solves gold-interference challenges, cuts annual showroom stock shrinkage, and accelerates inventory times."
        keywords="RFID advantages, jewelry tracking security, metal interference RFID, boutique ROI"
      />

      <div className={`absolute top-20 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none ${isDark ? "bg-[#D4A34A]/20" : "bg-[#B98A32]/10"}`} />
      <div className={`absolute bottom-10 left-0 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none ${isDark ? "bg-[#D91CFF]/15" : "bg-[#D91CFF]/5"}`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] font-mono text-[#D4A34A] uppercase tracking-widest font-black block">THE SPARKLE EDGE</span>
          <h1 className={`text-4xl sm:text-5xl font-display font-black tracking-wide uppercase ${isDark ? "text-white" : "text-zinc-950"}`}>
            Why Sparkle
          </h1>
          <p className={`text-sm leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-650"}`}>
            How our circular wave alignments and shielded gold nodes solved the final physical limits of RFID technology for luxury retail showrooms.
          </p>
        </div>

        {/* Advantage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Card 1: Gold Interference */}
          <div className={`border p-6 md:p-8 rounded-2xl space-y-4 shadow-xl ${
            isDark ? "bg-zinc-900/60 border-zinc-800" : "bg-white border-zinc-200"
          }`}>
            <div className="w-10 h-10 rounded-xl bg-[#D4A34A]/10 border border-[#D4A34A]/20 flex items-center justify-center text-[#D4A34A]">
              <Cpu className="w-5 h-5 text-[#D4A34A]" />
            </div>
            <h3 className={`text-xl font-display font-black uppercase tracking-wide ${isDark ? "text-white" : "text-zinc-950"}`}>
              Gold-Shield Wave Tuning
            </h3>
            <p className={`text-xs leading-relaxed font-medium ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
              Standard RFID tags suffer from signal reflection when attached to thick gold bands or metallic watches. Sparkle micro tags utilize a high-inductance coupling circuit that detunes wave cancellations, capturing reads reliably through gold, silver, and solid platinum mounts.
            </p>
          </div>

          {/* Card 2: Speed Auditing */}
          <div className={`border p-6 md:p-8 rounded-2xl space-y-4 shadow-xl ${
            isDark ? "bg-zinc-900/60 border-zinc-800" : "bg-white border-zinc-200"
          }`}>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Zap className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className={`text-xl font-display font-black uppercase tracking-wide ${isDark ? "text-white" : "text-zinc-950"}`}>
              98% Reduction in Audit Hours
            </h3>
            <p className={`text-xs leading-relaxed font-medium ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
              Instead of manually scanning barcodes or logging jewelry pieces by hand for hours, operators can audit entire showcases containing thousands of rings in under 3 minutes, with direct live synchronization to centralized cloud ledgers.
            </p>
          </div>

          {/* Card 3: Anti-Collision */}
          <div className={`border p-6 md:p-8 rounded-2xl space-y-4 shadow-xl ${
            isDark ? "bg-zinc-900/60 border-zinc-800" : "bg-white border-zinc-200"
          }`}>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className={`text-xl font-display font-black uppercase tracking-wide ${isDark ? "text-white" : "text-zinc-950"}`}>
              Dynamic Anti-Collision
            </h3>
            <p className={`text-xs leading-relaxed font-medium ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
              Built on our custom firmware protocols, our readers support reading speeds exceeding 1,100 tags per second. Even when tags are stacked inside boxes or grouped closely on trays, the anti-collision engine registers every individual micro-chip.
            </p>
          </div>

          {/* Card 4: Financial ROI */}
          <div className={`border p-6 md:p-8 rounded-2xl space-y-4 shadow-xl ${
            isDark ? "bg-zinc-900/60 border-zinc-800" : "bg-white border-zinc-200"
          }`}>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <DollarSign className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className={`text-xl font-display font-black uppercase tracking-wide ${isDark ? "text-white" : "text-zinc-950"}`}>
              Proven Security ROI
            </h3>
            <p className={`text-xs leading-relaxed font-medium ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
              By connecting exit gates to real-time database locks, Sparkle reduces annual boutique inventory shrinkage by an average of 98%. Immediate missing item alerts enable rapid floor recovery.
            </p>
          </div>
        </div>

        {/* Certifications strip */}
        <div className={`p-8 rounded-2xl border text-center space-y-4 ${
          isDark ? "bg-zinc-900/30 border-zinc-800" : "bg-zinc-100 border-zinc-200"
        }`}>
          <h3 className={`text-xs font-mono font-bold uppercase tracking-widest ${isDark ? "text-white" : "text-zinc-950"}`}>
            REGULATORY SAFETY & INDUSTRIAL CERTIFICATIONS
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-6 font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
            <div className="flex items-center gap-1.5 border border-zinc-850/50 px-3 py-1.5 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> EPC GLOBAL GEN2V2
            </div>
            <div className="flex items-center gap-1.5 border border-zinc-850/50 px-3 py-1.5 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> FCC ID SECURED
            </div>
            <div className="flex items-center gap-1.5 border border-zinc-850/50 px-3 py-1.5 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> CE COMPLIANT
            </div>
            <div className="flex items-center gap-1.5 border border-zinc-850/50 px-3 py-1.5 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> ISO 9001 SYSTEM
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
