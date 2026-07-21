import React, { useState } from "react";
import { SEO } from "../components/SEO";
import { RFID_PRODUCTS } from "../data/products";
import { Search, ShieldCheck, Plus, Minus, Tag, Cpu, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HardwarePageProps {
  theme?: "light" | "dark";
  onAddToCart: (product: any, quantity: number) => void;
  onOpenCart: () => void;
}

export const HardwarePage: React.FC<HardwarePageProps> = ({
  theme = "dark",
  onAddToCart,
  onOpenCart
}) => {
  const isDark = theme === "dark";
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [localQuantities, setLocalQuantities] = useState<Record<string, number>>({});

  // Product category filters
  const filters = [
    { id: "all", label: "All Hardware" },
    { id: "scanners", label: "RFID Scanners" },
    { id: "smart-trays", label: "Smart Velvet Trays" },
    { id: "eas-gates", label: "EAS Shield Gates" },
    { id: "tags", label: "Security Tags" }
  ];

  // Get active quantity
  const getQty = (id: string) => localQuantities[id] || 1;
  const adjustQty = (id: string, delta: number) => {
    const current = getQty(id);
    const updated = Math.max(1, Math.min(999, current + delta));
    setLocalQuantities(prev => ({ ...prev, [id]: updated }));
  };

  // Filter hardware list
  const filteredProducts = RFID_PRODUCTS.filter(product => {
    // Filter matches
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    if (selectedFilter === "all") return true;
    if (selectedFilter === "tags") {
      return product.category === "reusable-tags" || product.category === "onetime-tags";
    }
    return product.category === selectedFilter;
  });

  return (
    <div className="pt-24 pb-20 min-h-screen relative overflow-hidden transition-colors duration-300">
      <SEO 
        title="Sparkle RFID | Professional Showroom Hardware Catalog" 
        description="Browse military-grade UHF RFID readers, smart velvet showcase trays, exit gate portals, and micro diamond security tag fleets."
        keywords="RFID scanners, smart trays, EAS gates, reusable tags, retail asset tracking"
      />

      {/* Decorative backdrop elements */}
      <div className={`absolute top-20 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none ${isDark ? "bg-[#D4A34A]/20" : "bg-[#B98A32]/10"}`} />
      <div className={`absolute bottom-10 left-0 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none ${isDark ? "bg-[#D91CFF]/15" : "bg-[#D91CFF]/5"}`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] font-mono text-[#D4A34A] uppercase tracking-widest font-black block">PROFESSIONAL FLEET</span>
          <h1 className={`text-4xl sm:text-5xl font-display font-black tracking-wide uppercase ${isDark ? "text-white" : "text-zinc-950"}`}>
            Luxury RFID Hardware
          </h1>
          <p className={`text-sm leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-650"}`}>
            Custom-calibrated for precious metal structures, diamond refraction interference, and elegant boutique spaces. Secure your entire showroom inventory with absolute real-time auditing.
          </p>
        </div>

        {/* Filter and Search Bar Row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 border-b pb-6 border-zinc-800/10">
          {/* Horizontal Filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedFilter === filter.id
                    ? "bg-[#D4A34A] text-zinc-950 shadow-md"
                    : isDark 
                      ? "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800"
                      : "bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative max-w-xs w-full">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-3.5 w-3.5 text-zinc-500" />
            </span>
            <input
              type="text"
              placeholder="Search catalog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:border-[#D4A34A] transition-all font-sans font-medium ${
                isDark ? "bg-zinc-900/60 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-950"
              }`}
            />
          </div>
        </div>

        {/* Catalog Grid */}
        <AnimatePresence mode="popLayout">
          {filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-20 text-center"
            >
              <Cpu className="w-12 h-12 text-zinc-600 mx-auto mb-3 animate-pulse" />
              <p className={`font-mono text-xs uppercase tracking-widest ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
                No matching hardware products found
              </p>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto"
            >
              {filteredProducts.map(product => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className={`border rounded-3xl p-8 transition-all duration-300 relative group flex flex-col justify-between ${
                    isDark 
                      ? "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700/80 shadow-2xl" 
                      : "bg-white border-zinc-200 hover:border-zinc-300 shadow-md"
                  }`}
                >
                  <div className="space-y-4">
                    {/* Badge */}
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider ${
                        product.stockStatus === "In Stock" || product.stockStatus.startsWith("In Stock")
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-[#D4A34A]/10 text-[#D4A34A] border border-[#D4A34A]/20"
                      }`}>
                        {product.stockStatus}
                      </span>
                      <span className={`text-[8px] font-mono tracking-widest uppercase ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
                        ID: {product.id.substring(8).toUpperCase()}
                      </span>
                    </div>

                    {/* Headline Info */}
                    <div className="space-y-1">
                      <h3 className={`text-lg font-display font-black tracking-wide uppercase group-hover:text-[#D4A34A] transition-colors ${
                        isDark ? "text-white" : "text-zinc-900"
                      }`}>
                        {product.name}
                      </h3>
                      <p className={`text-[10px] font-mono font-bold leading-relaxed ${isDark ? "text-[#D4A34A]" : "text-[#B98A32]"}`}>
                        {product.tagline}
                      </p>
                    </div>

                    <p className={`text-xs leading-relaxed font-medium ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                      {product.description}
                    </p>

                    {/* Specs List */}
                    <div className={`p-3.5 rounded-xl border space-y-2 text-[10px] font-mono font-bold ${
                      isDark ? "bg-zinc-950/80 border-zinc-900" : "bg-zinc-50 border-zinc-150"
                    }`}>
                      <span className={`text-[8px] block uppercase tracking-wider border-b pb-1 mb-1.5 ${
                        isDark ? "text-zinc-500 border-zinc-900" : "text-zinc-400 border-zinc-200"
                      }`}>Technical Metrics</span>
                      {product.specs.map(spec => (
                        <div key={spec.label} className="flex justify-between">
                          <span className={isDark ? "text-zinc-500" : "text-zinc-400"}>{spec.label}</span>
                          <span className={isDark ? "text-zinc-300" : "text-zinc-800"}>{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions & Price */}
                  <div className="pt-6 mt-6 border-t border-zinc-800/10 flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <span className={`text-[8px] font-mono uppercase tracking-wider block ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>UNIT PRICE</span>
                      <span className={`text-lg font-mono font-black ${isDark ? "text-[#D4A34A]" : "text-[#B98A32]"}`}>
                        ${product.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Quantity Selector & Add Button */}
                    <div className="flex items-center gap-2">
                      <div className={`flex items-center border rounded-lg ${isDark ? "bg-zinc-950 border-zinc-800" : "bg-zinc-100 border-zinc-200"}`}>
                        <button
                          onClick={() => adjustQty(product.id, -1)}
                          className={`p-1.5 transition-colors cursor-pointer ${isDark ? "hover:text-white" : "hover:text-zinc-900"}`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-mono font-bold">{getQty(product.id)}</span>
                        <button
                          onClick={() => adjustQty(product.id, 1)}
                          className={`p-1.5 transition-colors cursor-pointer ${isDark ? "hover:text-white" : "hover:text-zinc-900"}`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          onAddToCart(product, getQty(product.id));
                          onOpenCart();
                        }}
                        className="p-2.5 bg-[#D4A34A] hover:bg-[#B98A32] text-zinc-950 rounded-lg shadow transition-all active:scale-[0.96] cursor-pointer"
                        title="Add to Quote Docket"
                      >
                        <ShoppingBag className="w-4 h-4 text-zinc-950" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Security Standard Banner */}
        <div className={`p-6 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left ${
          isDark ? "bg-zinc-900/30 border-zinc-800/80" : "bg-zinc-100 border-zinc-200"
        }`}>
          <div className="space-y-1">
            <h4 className={`text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center md:justify-start gap-1.5 ${
              isDark ? "text-white" : "text-zinc-900"
            }`}>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              EPC Global Gen2v2 Compliance
            </h4>
            <p className={`text-[10px] leading-relaxed max-w-2xl font-medium ${isDark ? "text-zinc-500" : "text-zinc-500"}`}>
              Every component in our hardware lineup, from fixed readers to adhesive tags, aligns with global industrial RFID requirements, featuring 128-bit custom cryptographic tag signing.
            </p>
          </div>
          <a
            href="#/demo"
            className="px-5 py-2.5 bg-[#D4A34A]/10 border border-[#D4A34A]/20 hover:bg-[#D4A34A] hover:text-zinc-950 text-[#D4A34A] font-mono text-[9px] font-bold uppercase tracking-widest rounded-lg transition-all cursor-pointer shadow-sm"
          >
            Book Hardware Calibration Demo
          </a>
        </div>
      </div>
    </div>
  );
};
