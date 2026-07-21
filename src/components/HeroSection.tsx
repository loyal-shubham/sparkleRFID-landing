import React from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { SVGProductGraphic } from "./SVGProductGraphic";

interface HeroSectionProps {
  theme: "light" | "dark";
  onOpenConsultant: () => void;
  hoveredProdId: string | null;
  setHoveredProdId: (id: string | null) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  theme,
  onOpenConsultant,
  hoveredProdId,
  setHoveredProdId,
}) => {
  const isDark = theme === "dark";

  return (
    <section className={`relative pt-36 pb-24 transition-colors duration-300 border-b ${
      isDark ? "bg-zinc-950 border-zinc-900 text-white" : "bg-white border-zinc-200 text-zinc-900"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Hero text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border ${
                isDark ? "bg-zinc-900 border-zinc-800 text-zinc-400" : "bg-zinc-50 border-zinc-200 text-zinc-500 shadow-sm"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#D4A34A] animate-pulse" />
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest">
                EPC Global Gen2v2 Micro-Calibrated
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-wide leading-tight ${
                isDark ? "text-white" : "text-zinc-955"
              }`}
            >
              Securing Luxury Assets.<br />
              <span className="text-[#D4A34A] font-black">
                With Perfect Precision.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-sm md:text-base max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium ${
                isDark ? "text-zinc-400" : "text-zinc-650"
              }`}
            >
              Sparkle RFID manufactures gold-standard, premium industrial RFID scanning hardware and precision tag printers calibrated specifically for luxury showroom inventory, diamond tracking, and jewelry asset protective auditing.
            </motion.p>

            {/* DUAL ACTION GATEWAY */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3"
            >
              {/* B2C Direct Gateway */}
              <a
                href="#/hardware"
                className="w-full sm:w-auto px-6 py-3.5 bg-[#D4A34A] hover:bg-[#B98A32] text-zinc-950 font-mono font-extrabold rounded-lg text-[10px] text-center uppercase tracking-widest transition-all shadow-md active:scale-95"
              >
                Explore Jewelry Catalog
              </a>

              {/* B2B Enterprise Quote */}
              <button
                onClick={onOpenConsultant}
                className={`w-full sm:w-auto px-6 py-3.5 font-mono font-extrabold rounded-lg text-[10px] text-center uppercase tracking-widest transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 border ${
                  isDark 
                    ? "bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800" 
                    : "bg-white border-zinc-200 text-zinc-800 hover:bg-zinc-50 shadow-sm"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4A34A]" />
                Launch Sparkle AI
              </button>
            </motion.div>

            {/* Enterprise Credentials Badge Row */}
            <div className={`grid grid-cols-3 gap-4 pt-6 max-w-md mx-auto lg:mx-0 border-t ${
              isDark ? "border-zinc-800" : "border-zinc-200"
            }`}>
              <div>
                <span className="text-zinc-500 font-mono text-[9px] uppercase tracking-wider block">Global Audits</span>
                <span className={`font-display font-bold text-xs block ${isDark ? "text-zinc-200" : "text-zinc-800"}`}>150k+ Daily</span>
              </div>
              <div>
                <span className="text-zinc-500 font-mono text-[9px] uppercase tracking-wider block">Gold Interference Solve</span>
                <span className={`font-display font-bold text-xs block ${isDark ? "text-zinc-200" : "text-zinc-800"}`}>100% Calibrated</span>
              </div>
              <div>
                <span className="text-zinc-500 font-mono text-[9px] uppercase tracking-wider block">Security Response</span>
                <span className={`font-display font-bold text-xs block ${isDark ? "text-zinc-200" : "text-zinc-800"}`}>Silent / Immediate</span>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-[360px]"
              onMouseEnter={() => setHoveredProdId("hero")}
              onMouseLeave={() => setHoveredProdId(null)}
            >
              <SVGProductGraphic
                type="ranger_handheld_gun"
                isHovered={hoveredProdId === "hero" || true}
                className={isDark ? "border-zinc-800 shadow-2xl" : "border-zinc-200 shadow-xl"}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
