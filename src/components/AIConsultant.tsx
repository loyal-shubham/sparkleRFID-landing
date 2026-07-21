import React, { useState, useEffect } from "react";
import { AISolution, Product } from "../types";
import { RFID_PRODUCTS } from "../data/products";
import { Sparkles, Loader2, Cpu, Check, HelpCircle, ArrowRight, Zap, RefreshCw, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AIConsultantProps {
  onAddAllToCart: (items: { product: Product; qty: number }[]) => void;
  isOpen: boolean;
  onClose: () => void;
}

const LOADING_STEPS = [
  "Mapping luxury showroom dimensions to electromagnetic wave guidelines...",
  "Analyzing gemstone metal mounting signal reflections (Platinum, Gold, Silver)...",
  "Simulating continuous anti-collision scans for high-density jewelry displays...",
  "Calculating optimal beam directions for SA-200 under-counter antennas...",
  "Verifying multi-portal exit gate read tolerances for high-value asset protection...",
  "Compiling technical REST API showroom integration blueprints..."
];

const PRESET_SCENARIOS = [
  {
    title: "High-End Showroom Audit",
    industry: "Luxury Jewelry Retail",
    scenario: "We have 1,500 diamond rings and fine watches spread across 8 glass display cases. We want to perform instant morning and evening audits in seconds without opening cases, touching pieces, or disturbing guests."
  },
  {
    title: "Exit Gate Anti-Theft Portal",
    industry: "Showroom Physical Security",
    scenario: "We need high-accuracy scanning exit portals at our main boutique doors. If a high-value piece of jewelry on a display tray is brought past the vestibule, we must sound a silent alert and trigger security cameras."
  },
  {
    title: "Secure Vault Box Control",
    industry: "Precious Assets Custody",
    scenario: "We track luxury lockboxes and loose gemstone parcels inside an underground vault. Need continuous automated check-in/out logging linked to employee secure badge sweeps with full audit reports."
  }
];

export const AIConsultant: React.FC<AIConsultantProps> = ({ onAddAllToCart, isOpen, onClose }) => {
  const [industry, setIndustry] = useState("Luxury Jewelry Retail");
  const [scale, setScale] = useState<"b2b" | "b2c">("b2b");
  const [scenario, setScenario] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStepIdx, setLoadingStepIdx] = useState(0);
  const [solution, setSolution] = useState<AISolution | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState(false);

  // Rotate loading steps
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingStepIdx((prev) => (prev + 1) % LOADING_STEPS.length);
      }, 2300);
    } else {
      setLoadingStepIdx(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!scenario.trim()) return;

    setIsLoading(true);
    setError(null);
    setSolution(null);
    setSuccessMsg(false);

    try {
      const response = await fetch("/api/consultant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenario, industry, scale }),
      });

      if (!response.ok) {
        throw new Error("Engineering consultant timed out or encountered an API key quota limit.");
      }

      const data = await response.json();
      setSolution(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyPreset = (preset: typeof PRESET_SCENARIOS[0]) => {
    setIndustry(preset.industry);
    setScenario(preset.scenario);
  };

  const handleAddHardwareToQuote = () => {
    if (!solution) return;

    const itemsToBasket = solution.recommendedHardware.map((rec) => {
      // Try to find exact hardware in our core catalog
      const matchedProd = RFID_PRODUCTS.find(
        (p) => p.name.toLowerCase().includes(rec.name.toLowerCase()) || 
               rec.name.toLowerCase().includes(p.name.toLowerCase())
      );
      
      // Fallback if the AI recommends something generic, match to closest
      const finalProd = matchedProd || RFID_PRODUCTS[0];
      return {
        product: finalProd,
        qty: rec.qty || 1,
      };
    });

    onAddAllToCart(itemsToBasket);
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl text-zinc-100"
      >
        {/* Header */}
        <div className="bg-zinc-950 border-b border-zinc-800 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#D4A34A]/10 border border-[#D4A34A]/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#D4A34A]" />
            </div>
            <div>
              <h3 className="text-sm font-display font-black tracking-wider text-white">Sparkle AI: RFID Scenario Planner</h3>
              <p className="text-[9px] font-mono text-[#D4A34A] uppercase tracking-widest font-semibold">Gemini Intelligence Calibration</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-zinc-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content body */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-8 flex-1">
          {/* Preset Buttons */}
          {!solution && !isLoading && (
            <div className="space-y-3">
              <span className="text-[10px] font-mono text-[#D4A34A] uppercase tracking-wider block font-bold">
                Apply Recommended Luxury Presets
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PRESET_SCENARIOS.map((preset) => (
                  <button
                    key={preset.title}
                    type="button"
                    onClick={() => handleApplyPreset(preset)}
                    className="p-3.5 bg-zinc-950/50 border border-zinc-800 hover:border-[#D4A34A] hover:bg-zinc-950 rounded-xl text-left transition-all group"
                  >
                    <span className="text-[9px] text-[#D4A34A] font-mono font-bold block uppercase tracking-wider">{preset.industry}</span>
                    <span className="text-xs font-bold text-white block mt-1.5 group-hover:text-[#D4A34A] transition-colors">{preset.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Form / Output toggle */}
          <AnimatePresence mode="wait">
            {!isLoading && !solution ? (
              <motion.form
                key="consultation-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-2 font-bold">
                      Boutique Segment
                    </label>
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 text-xs focus:outline-none focus:border-[#D4A34A] font-medium"
                    >
                      <option value="Luxury Jewelry Retail">Luxury Jewelry & Fine Watch Showrooms</option>
                      <option value="Diamond & Gemstone Custody">Diamond & Precious Stone Safekeeping</option>
                      <option value="Showroom Asset Tracking">Secure Store Asset Operations</option>
                      <option value="High-Value Secure Logistics">Secured Transport & Safe Box Control</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-2 font-bold">
                      Tracking Scope
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setScale("b2b")}
                        className={`py-3 rounded-xl border text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          scale === "b2b"
                            ? "border-[#D4A34A] bg-[#D4A34A]/10 text-[#D4A34A]"
                            : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700 hover:text-zinc-100"
                        }`}
                      >
                        B2B Showroom Bulk
                      </button>
                      <button
                        type="button"
                        onClick={() => setScale("b2c")}
                        className={`py-3 rounded-xl border text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          scale === "b2c"
                            ? "border-[#D4A34A] bg-[#D4A34A]/10 text-[#D4A34A]"
                            : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700 hover:text-zinc-100"
                        }`}
                      >
                        B2C Single Boutique
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-2 font-bold">
                    Describe Your Showroom Layout & Precious Assets
                  </label>
                  <textarea
                    required
                    value={scenario}
                    onChange={(e) => setScenario(e.target.value)}
                    placeholder="E.g., We have 4 high-contrast display shelves for watches. Platinum mountings interfere with standard RFID waves. Scanners should be hidden under velvet display trays to monitor items continuously..."
                    rows={4}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 text-xs focus:outline-none focus:border-[#D4A34A] placeholder-zinc-500 font-medium leading-relaxed"
                  />
                  <span className="text-[9px] text-zinc-500 font-mono mt-1.5 block leading-relaxed">
                    Sparkle AI automatically factors in signal absorption parameters from diamonds, gold, silver, and platinum.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 bg-[#D4A34A] hover:bg-[#B98A32] text-zinc-950 text-xs font-mono font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-[#D4A34A]/10 flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-zinc-950" />
                  Generate Custom Sparkle RFID Blueprint
                </button>
              </motion.form>
            ) : isLoading ? (
              <motion.div
                key="loading-state"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="py-12 flex flex-col items-center justify-center text-center space-y-6"
              >
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 border-zinc-800 border-t-[#D4A34A] animate-spin" />
                  <Cpu className="w-6 h-6 text-[#D4A34A] absolute inset-0 m-auto animate-pulse" />
                </div>
                
                <div className="space-y-2 max-w-md">
                  <p className="text-white font-sans font-extrabold text-base">Sparkle AI Modeling Physics...</p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={loadingStepIdx}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-[#D4A34A] text-[10px] font-mono tracking-wider h-12"
                    >
                      {LOADING_STEPS[loadingStepIdx]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="solution-display"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6 text-zinc-100"
              >
                {/* Solution Blueprint Card */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 px-3 py-1 bg-[#D4A34A]/10 border-b border-l border-zinc-800 text-[9px] font-mono font-bold text-[#D4A34A] rounded-bl tracking-widest">
                    SECURE-BLUEPRINT-LOADED
                  </div>

                  <span className="text-[10px] font-mono text-[#D4A34A] uppercase tracking-widest block mb-1.5 font-bold">
                    Custom Showroom Blueprint
                  </span>
                  <h4 className="text-lg md:text-xl font-display font-black tracking-wide text-white">
                    {solution?.title}
                  </h4>
                </div>

                {/* Physics & Wave Frequency Card */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Left: Recommended Wave frequency */}
                  <div className="md:col-span-4 bg-zinc-950 border border-zinc-800 rounded-xl p-5 space-y-4">
                    <span className="text-[9px] font-mono text-[#D4A34A] uppercase tracking-wider block font-bold">
                      Recommended Band
                    </span>
                    
                    <div className="text-center p-4 bg-zinc-900 rounded-lg border border-zinc-800">
                      <Zap className="w-5 h-5 text-[#D4A34A] mx-auto mb-2" />
                      <span className="text-xs font-mono font-extrabold text-white block uppercase tracking-wider">
                        {solution?.frequency}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                      {solution?.frequencyReason}
                    </p>
                  </div>

                  {/* Right: Tag & ROI Analysis */}
                  <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 space-y-3">
                      <span className="text-[9px] font-mono text-[#D4A34A] uppercase tracking-wider block font-bold">
                        Precious Tag Placement Strategy
                      </span>
                      <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                        {solution?.tagStrategy}
                      </p>
                    </div>

                    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 flex flex-col justify-between gap-4">
                      <div className="space-y-3">
                        <span className="text-[9px] font-mono text-[#D4A34A] uppercase tracking-wider block font-bold">
                          Insurance & ROI Forecast
                        </span>
                        <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                          {solution?.estimatedROI}
                        </p>
                      </div>

                      <div className="flex justify-between items-center bg-zinc-900 p-2.5 rounded border border-zinc-800 text-xs font-medium">
                        <span className="text-zinc-400">Integration Level:</span>
                        <span className="font-mono font-bold px-2 py-0.5 rounded bg-[#D4A34A]/10 text-[#D4A34A] border border-[#D4A34A]/20">
                          {solution?.integrationComplexity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recommended Hardware shopping list */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
                    <div>
                      <h5 className="text-xs font-display font-black tracking-wider text-white uppercase">Recommended Sparkle Bill of Materials</h5>
                      <p className="text-[11px] text-zinc-400 font-medium">Hardware calibrated for continuous tracking and zero false reads.</p>
                    </div>
                    
                    <button
                      onClick={handleAddHardwareToQuote}
                      className="self-start sm:self-auto py-2 px-4 bg-[#D4A34A] hover:bg-[#B98A32] text-zinc-950 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      {successMsg ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Added to basket!
                        </>
                      ) : (
                        <>
                          <Zap className="w-3.5 h-3.5" /> Add Hardware to Quote
                        </>
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {solution?.recommendedHardware.map((rec) => (
                      <div key={rec.name} className="p-3.5 bg-zinc-900 border border-zinc-800 rounded-lg flex items-start justify-between gap-3 text-xs">
                        <div className="space-y-1">
                          <span className="font-bold text-white block">{rec.name}</span>
                          <span className="text-zinc-400 block line-clamp-2 font-medium">{rec.reason}</span>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-[9px] font-mono text-zinc-500 font-bold block">QTY</span>
                          <span className="font-mono text-sm font-bold text-[#D4A34A]">{rec.qty}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Software Integration Guides (B2B / Enterprise) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 bg-zinc-950 border border-zinc-800 rounded-xl space-y-3">
                    <span className="text-[9px] font-mono text-[#D4A34A] uppercase tracking-wider block font-bold">
                      Luxury ERP & Security API Integration
                    </span>
                    <ul className="space-y-2 text-xs text-zinc-300 font-medium">
                      {solution?.b2bIntegrationTips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#D4A34A] shrink-0 font-bold mt-0.5">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-5 bg-zinc-950 border border-zinc-800 rounded-xl space-y-3">
                    <span className="text-[9px] font-mono text-[#D4A34A] uppercase tracking-wider block font-bold">
                      Boutique Store Pilot Walkthrough
                    </span>
                    <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                      {solution?.b2cPurchaseNote}
                    </p>
                    <div className="pt-2 border-t border-zinc-800">
                      <span className="text-[9px] font-mono text-zinc-500 font-bold block">Need single demo units?</span>
                      <p className="text-xs text-zinc-400 font-medium mt-1">
                        Select single items on our store counter catalog below to start tracking your showroom instantly.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs text-zinc-400 font-medium">
                    Have bespoke jewelry tags requirements? Contact our custom gemstone engineers.
                  </span>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => {
                        setSolution(null);
                        setScenario("");
                      }}
                      className="flex-1 sm:flex-none py-2 px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-xs font-bold font-mono uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Reset AI
                    </button>
                    <button
                      onClick={onClose}
                      className="flex-1 sm:flex-none py-2 px-4 bg-[#D4A34A] text-zinc-950 hover:bg-[#B98A32] rounded-lg text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
