import React, { useState } from "react";
import { ShoppingBag, Sparkles, Sun, Moon, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SparkleLogo } from "./SparkleLogo";

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenConsultant: () => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenConsultant,
  theme,
  onToggleTheme
}) => {
  const isDark = theme === "dark";
  // INVERSE NAVIGATION STATE:
  // In light theme (isDark === false), the navbar is dark charcoal.
  // In dark theme (isDark === true), the navbar is clean light white.
  const isDarkNavbar = !isDark;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHardwareOpen, setIsHardwareOpen] = useState(false);
  const [isSoftwareOpen, setIsSoftwareOpen] = useState(false);

  // Mobile submenu accordion state
  const [mobileHardwareExpanded, setMobileHardwareExpanded] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 shadow-lg flex flex-col">
      {/* 1. TOP BANNER (White Background Company Info Stripe) */}
      <div className="bg-white text-zinc-900 border-b border-zinc-200 text-[10px] sm:text-xs font-sans font-medium py-2 px-4 sm:px-6 lg:px-8 flex items-center justify-between z-50">
        <span className="font-semibold text-zinc-800 tracking-wide">
          Loyal String International Pvt. Ltd.
        </span>
        <a href="tel:+919004033881" className="hover:text-zinc-650 font-bold transition-colors">
          Mobile: +91 90040 33881
        </a>
      </div>

      {/* 2. MAIN NAVIGATION DOCK (Inversed Layout) */}
      <div className={`transition-colors duration-300 border-b backdrop-blur-md relative z-40 ${isDarkNavbar ? "bg-zinc-950/95 border-zinc-900 text-zinc-100" : "bg-white/95 border-zinc-200 text-zinc-900"
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative z-45">

          {/* Sparkle Brand Logo */}
          <a href="#/" className="flex items-center gap-1 group">
            <SparkleLogo variant={isDarkNavbar ? "dark" : "light"} size={48} />
          </a>

          {/* Navigation Links (Desktop) */}
          <nav className={`hidden md:flex items-center gap-8 text-sm font-sans font-medium tracking-wide relative z-50 transition-colors ${isDarkNavbar ? "text-zinc-300" : "text-zinc-600"
            }`}>
            {/* Hardware Dropdown Nav */}
            <div
              className="relative py-5 cursor-pointer group"
              onMouseEnter={() => setIsHardwareOpen(true)}
              onMouseLeave={() => setIsHardwareOpen(false)}
            >
              <span className="flex items-center gap-1 transition-all hover:text-[#D4A34A]">
                Hardware <ChevronDown className="w-3.5 h-3.5 text-zinc-500 group-hover:rotate-180 transition-transform" />
              </span>
              <AnimatePresence>
                {isHardwareOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute top-full left-0 mt-0 w-52 rounded-xl border p-4 shadow-2xl space-y-2.5 z-50 ${isDarkNavbar ? "bg-zinc-950 border-zinc-850 text-zinc-400" : "bg-white border-zinc-200 text-zinc-600"
                      }`}
                  >
                    <span className={`block font-mono text-[7px] tracking-widest uppercase border-b pb-1 mb-2 ${isDarkNavbar ? "text-zinc-600 border-zinc-900" : "text-zinc-400 border-zinc-150"
                      }`}>Product Categories</span>
                    <a href="#/hardware?category=scanners" className="block hover:text-[#D4A34A] transition-colors text-xs font-medium font-sans">RFID Scanners</a>
                    <a href="#/hardware?category=smart-trays" className="block hover:text-[#D4A34A] transition-colors text-xs font-medium font-sans">Smart Velvet Trays</a>
                    <a href="#/hardware?category=eas-gates" className="block hover:text-[#D4A34A] transition-colors text-xs font-medium font-sans">EAS Shield Gates</a>
                    <a href="#/hardware?category=reusable-tags" className="block hover:text-[#D4A34A] transition-colors text-xs font-medium font-sans">Reusable Clasp Tags</a>
                    <a href="#/hardware?category=onetime-tags" className="block hover:text-[#D4A34A] transition-colors text-xs font-medium font-sans">One-Time Adhesive Tags</a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Software Dropdown Nav */}
            <div
              className="relative py-5 cursor-pointer group"
              onMouseEnter={() => setIsSoftwareOpen(true)}
              onMouseLeave={() => setIsSoftwareOpen(false)}
            >
              <span className="flex items-center gap-1 transition-all hover:text-[#D4A34A]">
                Software <ChevronDown className="w-3.5 h-3.5 text-zinc-500 group-hover:rotate-180 transition-transform" />
              </span>
              <AnimatePresence>
                {isSoftwareOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute top-full left-0 mt-0 w-52 rounded-xl border p-4 shadow-2xl space-y-2.5 z-50 ${isDarkNavbar ? "bg-zinc-950 border-zinc-850 text-zinc-400" : "bg-white border-zinc-200 text-zinc-600"
                      }`}
                  >
                    <span className={`block font-mono text-[7px] tracking-widest uppercase border-b pb-1 mb-2 ${isDarkNavbar ? "text-zinc-600 border-zinc-900" : "text-zinc-400 border-zinc-150"
                      }`}>Operations Core</span>
                    <a href="#/software" className="block hover:text-[#D4A34A] transition-colors text-xs font-medium font-sans">Sparkle ERP Software</a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a href="#/support" className="transition-all hover:text-[#D4A34A]">Support</a>
            <a href="#/demo" className="transition-all hover:text-[#D4A34A]">Inquiry / Demo</a>
            <a href="#/why-sparkle" className="transition-all hover:text-[#D4A34A]">Why Sparkle</a>
            <a href="#/contact" className="transition-all hover:text-[#D4A34A]">Contact Us</a>
          </nav>

          {/* Action Tray */}
          <div className="flex items-center gap-3">
            {/* Smart AI Consultant Trigger button */}
            <button
              onClick={onOpenConsultant}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#D4A34A]/10 border border-[#D4A34A]/30 text-[#D4A34A] hover:bg-[#D4A34A] hover:text-zinc-950 text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Sparkle AI
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all cursor-pointer group ${isDarkNavbar
                  ? "bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800"
                  : "bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-zinc-955 hover:bg-zinc-200"
                }`}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? (
                <Sun className="w-4 h-4 transition-transform group-hover:rotate-45 text-current" />
              ) : (
                <Moon className="w-4 h-4 transition-transform group-hover:-rotate-12 text-current" />
              )}
            </button>

            {/* Commerce Cart button */}
            <button
              onClick={onOpenCart}
              className={`relative w-9 h-9 rounded-lg border flex items-center justify-center transition-all cursor-pointer group ${isDarkNavbar
                  ? "bg-zinc-900 border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-300"
                  : "bg-zinc-100 border-zinc-200 hover:bg-zinc-200 hover:border-zinc-300 text-zinc-600"
                }`}
            >
              <ShoppingBag className="w-4 h-4 transition-colors text-current" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#D4A34A] text-zinc-955 font-mono text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-zinc-950">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button (Hamburger) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden w-9 h-9 rounded-lg border flex items-center justify-center transition-all cursor-pointer group ${isDarkNavbar
                  ? "bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800"
                  : "bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-zinc-955 hover:bg-zinc-200"
                }`}
              title="Toggle Menu"
            >
              {isMenuOpen ? (
                <X className="w-4 h-4 transition-transform hover:scale-110" />
              ) : (
                <Menu className="w-4 h-4 transition-transform hover:scale-110" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`absolute top-[116px] left-0 right-0 w-full border-b shadow-2xl z-30 p-6 flex flex-col gap-4 md:hidden max-h-[80vh] overflow-y-auto ${isDarkNavbar ? "bg-zinc-950/98 border-zinc-800 text-zinc-100" : "bg-white/98 border-zinc-200 text-zinc-900"
              }`}
          >
            <div className="flex flex-col gap-3.5 text-sm font-sans font-medium tracking-wide">
              {/* Mobile Hardware link block */}
              <div>
                <button
                  onClick={() => setMobileHardwareExpanded(!mobileHardwareExpanded)}
                  className={`w-full py-2 border-b flex justify-between items-center text-left ${isDarkNavbar ? "text-zinc-300 border-zinc-900" : "text-zinc-700 border-zinc-150"
                    }`}
                >
                  <span>Hardware Suite</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${mobileHardwareExpanded ? "rotate-180" : ""}`} />
                </button>

                {mobileHardwareExpanded && (
                  <div className={`pl-4 py-2 flex flex-col gap-2.5 text-xs border-l mt-1 ${isDarkNavbar ? "border-zinc-800/20 text-zinc-400" : "border-zinc-200 text-zinc-650"
                    }`}>
                    <a href="#/hardware?category=scanners" onClick={() => setIsMenuOpen(false)} className="hover:text-[#D4A34A] transition-colors">RFID Scanner</a>
                    <a href="#/hardware?category=smart-trays" onClick={() => setIsMenuOpen(false)} className="hover:text-[#D4A34A] transition-colors">Smart Tray</a>
                    <a href="#/hardware?category=eas-gates" onClick={() => setIsMenuOpen(false)} className="hover:text-[#D4A34A] transition-colors">EAS Gates</a>
                    <a href="#/hardware?category=reusable-tags" onClick={() => setIsMenuOpen(false)} className="hover:text-[#D4A34A] transition-colors">Reusable Tags</a>
                    <a href="#/hardware?category=onetime-tags" onClick={() => setIsMenuOpen(false)} className="hover:text-[#D4A34A] transition-colors">One time tags</a>
                  </div>
                )}
              </div>

              {/* Mobile Software */}
              <a
                href="#/software"
                onClick={() => setIsMenuOpen(false)}
                className={`transition-colors py-2 border-b hover:text-[#D4A34A] ${isDarkNavbar ? "text-zinc-300 border-zinc-900" : "text-zinc-700 border-zinc-150"
                  }`}
              >
                Sparkle ERP Software
              </a>

              {/* Mobile Support */}
              <a
                href="#/support"
                onClick={() => setIsMenuOpen(false)}
                className={`transition-colors py-2 border-b hover:text-[#D4A34A] ${isDarkNavbar ? "text-zinc-300 border-zinc-900" : "text-zinc-700 border-zinc-150"
                  }`}
              >
                Support Portal
              </a>

              {/* Mobile Demo */}
              <a
                href="#/demo"
                onClick={() => setIsMenuOpen(false)}
                className={`transition-colors py-2 border-b hover:text-[#D4A34A] ${isDarkNavbar ? "text-zinc-300 border-zinc-900" : "text-zinc-700 border-zinc-150"
                  }`}
              >
                Inquiry / Demo
              </a>

              {/* Mobile Why Sparkle */}
              <a
                href="#/why-sparkle"
                onClick={() => setIsMenuOpen(false)}
                className={`transition-colors py-2 border-b hover:text-[#D4A34A] ${isDarkNavbar ? "text-zinc-300 border-zinc-900" : "text-zinc-700 border-zinc-150"
                  }`}
              >
                Why Sparkle
              </a>

              {/* Mobile Contact */}
              <a
                href="#/contact"
                onClick={() => setIsMenuOpen(false)}
                className={`transition-colors py-2 hover:text-[#D4A34A] ${isDarkNavbar ? "text-zinc-300" : "text-zinc-700"
                  }`}
              >
                Contact Us
              </a>
            </div>

            {/* Mobile AI consultant quick button */}
            <button
              onClick={() => {
                onOpenConsultant();
                setIsMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#D4A34A] hover:bg-[#B98A32] text-zinc-955 font-mono text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer mt-3"
            >
              <Sparkles className="w-4 h-4 text-zinc-955" />
              Ask Sparkle AI
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
