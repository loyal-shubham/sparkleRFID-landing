import React from "react";
import { Award, ShieldAlert, Globe2 } from "lucide-react";

interface ComplianceStripProps {
  theme: "light" | "dark";
}

export const ComplianceStrip: React.FC<ComplianceStripProps> = ({ theme }) => {
  const isDark = theme === "dark";

  return (
    <section className={`border-y py-8 transition-colors duration-300 ${
      isDark ? "bg-zinc-900 border-zinc-800" : "bg-zinc-100 border-zinc-200"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">

          {/* Certifications left */}
          <div className={`flex flex-wrap items-center justify-center gap-6 text-[9px] font-mono font-bold tracking-wider ${
            isDark ? "text-zinc-400" : "text-zinc-650"
          }`}>
            <span className={`flex items-center gap-1.5 transition-colors ${isDark ? "hover:text-white" : "hover:text-zinc-950"}`}>
              <Award className="w-4 h-4 text-[#D4A34A]" /> ISO 9001 AUDITED
            </span>
            <span className={`flex items-center gap-1.5 transition-colors ${isDark ? "hover:text-white" : "hover:text-zinc-950"}`}>
              <ShieldAlert className="w-4 h-4 text-[#D4A34A]" /> FCC SECURED CHANNELS
            </span>
            <span className={`flex items-center gap-1.5 transition-colors ${isDark ? "hover:text-white" : "hover:text-zinc-950"}`}>
              <Globe2 className="w-4 h-4 text-[#D4A34A]" /> RoHS NICKEL-FREE TAGS
            </span>
          </div>

          {/* Industrial Partners scroll strip */}
          <div className={`flex flex-wrap items-center justify-center gap-8 font-display font-bold text-[10px] tracking-widest uppercase ${
            isDark ? "text-zinc-500" : "text-zinc-400"
          }`}>
            <span>Appraiser Standard</span>
            <span className="text-[#D4A34A]">Sparkle Diamond Secure</span>
            <span>UHF High-Asset Protocol</span>
          </div>
        </div>
      </div>
    </section>
  );
};
