import React from "react";
import { Compass } from "lucide-react";
import { Product } from "../types";
import { SVGProductGraphic } from "./SVGProductGraphic";

interface HardwareCatalogSectionProps {
  theme: "light" | "dark";
  filterCategory: string;
  setFilterCategory: (cat: string) => void;
  filteredProducts: Product[];
  prodQuantities: Record<string, number>;
  updateProductCardQty: (id: string, qty: number) => void;
  handleAddToCart: (prod: Product, qty: number) => void;
  selected3DProductId: string;
  setSelected3DProductId: (id: string) => void;
  hoveredProdId: string | null;
  setHoveredProdId: (id: string | null) => void;
}

export const HardwareCatalogSection: React.FC<HardwareCatalogSectionProps> = ({
  theme,
  filterCategory,
  setFilterCategory,
  filteredProducts,
  prodQuantities,
  updateProductCardQty,
  handleAddToCart,
  selected3DProductId,
  setSelected3DProductId,
  hoveredProdId,
  setHoveredProdId,
}) => {
  const isDark = theme === "dark";

  return (
    <section className={`py-28 transition-colors duration-300 border-b ${
      isDark ? "bg-zinc-950 border-zinc-900 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-900"
    }`} id="hardware-showcase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] font-mono text-[#D4A34A] uppercase tracking-widest font-black block">
            Luxury Hardware Catalog
          </span>
          <h2 className={`text-2xl sm:text-3xl font-display font-black tracking-wide uppercase ${
            isDark ? "text-white" : "text-zinc-955"
          }`}>
            Precision Showroom Equipment
          </h2>
          <p className={`text-sm max-w-2xl mx-auto leading-relaxed ${
            isDark ? "text-zinc-400" : "text-zinc-650"
          }`}>
            Every Sparkle RFID unit is engineered inside an anodized aluminum graphite casing with custom-calibrated circular polarized beams to track gold, silver, and platinum-mounted gemstones.
          </p>

          {/* Interactive Categories switcher tabs */}
          <div className="flex justify-center gap-2 pt-4">
            {["all", "scanners", "printers", "accessories"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-1.5 rounded-lg text-[9px] font-mono font-bold uppercase tracking-widest transition-all cursor-pointer ${
                  filterCategory === cat
                    ? "bg-[#D4A34A] text-zinc-955 shadow-md font-extrabold"
                    : isDark
                      ? "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
                      : "bg-white text-zinc-650 hover:text-zinc-955 border border-zinc-200 shadow-sm"
                }`}
              >
                {cat === "all" ? "Show All" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic products catalog list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {filteredProducts.map((prod) => {
            const qty = prodQuantities[prod.id] || 1;

            // Calculate active bulk discount inside the card
            let activeDiscountPercent = 0;
            const sorted = [...prod.bulkTiers].sort((a, b) => a.minQty - b.minQty);
            for (const tier of sorted) {
              if (qty >= tier.minQty) {
                activeDiscountPercent = tier.discountPercent;
              }
            }
            const discountValue = (prod.price * activeDiscountPercent) / 100;
            const finalCardUnitPrice = prod.price - discountValue;

            return (
              <div
                key={prod.id}
                className={`border rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  isDark
                    ? "bg-zinc-900 border-zinc-800 hover:border-[#D4A34A] hover:shadow-2xl hover:shadow-[#D4A34A]/5 text-white"
                    : "bg-white border-zinc-200 hover:border-[#D4A34A] hover:shadow-2xl hover:shadow-[#D4A34A]/5 text-zinc-900 shadow-sm"
                }`}
                onMouseEnter={() => setHoveredProdId(prod.id)}
                onMouseLeave={() => setHoveredProdId(null)}
              >
                <div className="space-y-4">
                  {/* Dynamic interactive SVG product render with 3D inspection portal shortcut */}
                  <div className="relative group/img cursor-pointer" onClick={() => {
                    setSelected3DProductId(prod.id);
                    document.getElementById("interactive-portal")?.scrollIntoView({ behavior: "smooth" });
                  }}>
                    <SVGProductGraphic
                      type={prod.imageSeed}
                      isHovered={hoveredProdId === prod.id}
                    />
                    <div className="absolute inset-0 bg-[#D91CFF]/10 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-all duration-300 rounded-2xl">
                      <div className={`border px-3.5 py-2 rounded-xl flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase tracking-widest transition-all duration-300 ${
                        isDark 
                          ? "bg-zinc-950 border-[#D91CFF]/30 text-white" 
                          : "bg-white border-[#D91CFF]/50 text-zinc-950 shadow-md"
                      }`}>
                        <Compass className="w-3.5 h-3.5 text-[#D91CFF] animate-spin-slow" />
                        Inspect in 3D
                      </div>
                    </div>
                  </div>

                  {/* Brand Meta */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-extrabold text-[#D4A34A] uppercase tracking-widest">
                        {prod.category}
                      </span>
                      <span className={`text-xs font-mono font-bold uppercase ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
                        {prod.stockStatus}
                      </span>
                    </div>
                    <h3 className={`font-display font-black text-lg uppercase tracking-wide group-hover:text-[#D4A34A] transition-colors ${
                      isDark ? "text-white" : "text-zinc-955"
                    }`}>
                      {prod.name}
                    </h3>
                    <p className={`text-xs leading-relaxed font-sans font-medium ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>{prod.tagline}</p>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  {/* Quantity Selector inside card */}
                  <div className={`flex items-center justify-between border-t pt-3 ${isDark ? "border-zinc-800" : "border-zinc-150"}`}>
                    <span className={`text-xs font-mono font-bold uppercase ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>Set Qty:</span>
                    <div className={`flex items-center border rounded-lg p-0.5 ${
                      isDark ? "bg-zinc-950 border-zinc-850" : "bg-zinc-50 border-zinc-200"
                    }`}>
                      <button
                        onClick={() => updateProductCardQty(prod.id, Math.max(1, qty - 1))}
                        className={`px-2 font-extrabold text-sm cursor-pointer ${
                          isDark ? "text-zinc-500 hover:text-white" : "text-zinc-400 hover:text-zinc-955"
                        }`}
                      >
                        -
                      </button>
                      <span className={`text-sm font-mono font-bold min-w-5 text-center ${isDark ? "text-white" : "text-zinc-800"}`}>{qty}</span>
                      <button
                        onClick={() => updateProductCardQty(prod.id, qty + 1)}
                        className={`px-2 font-extrabold text-sm cursor-pointer ${
                          isDark ? "text-zinc-500 hover:text-white" : "text-zinc-400 hover:text-zinc-955"
                        }`}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Price Block */}
                  <div className="flex items-baseline justify-between">
                    <span className={`text-xs font-medium ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>Subtotal:</span>
                    <div className="text-right">
                      {activeDiscountPercent > 0 ? (
                        <>
                          <span className={`text-xs line-through block font-mono ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
                            ${(prod.price * qty).toLocaleString()}
                          </span>
                          <span className={`text-base font-sans font-extrabold block ${isDark ? "text-white" : "text-zinc-955"}`}>
                            ${(finalCardUnitPrice * qty).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                          </span>
                          <span className="text-[10px] font-mono font-extrabold text-[#D4A34A] bg-[#D4A34A]/10 px-1.5 rounded border border-[#D4A34A]/20 block mt-0.5">
                            -{activeDiscountPercent}% Bulk Saving
                          </span>
                        </>
                      ) : (
                        <span className={`text-base font-sans font-extrabold block font-mono ${isDark ? "text-white" : "text-zinc-955"}`}>
                          ${(prod.price * qty).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <button
                      onClick={() => handleAddToCart(prod, qty)}
                      className="py-2.5 px-4 bg-[#D4A34A] hover:bg-[#B98A32] text-zinc-955 active:scale-95 text-xs font-sans font-bold uppercase tracking-wider rounded-lg transition-all text-center cursor-pointer shadow-sm"
                    >
                      Buy Direct
                    </button>

                    <a
                      href="#roi-calculator"
                      className={`py-2.5 px-4 border text-xs font-sans font-bold uppercase tracking-wider rounded-lg transition-all text-center ${
                        isDark 
                          ? "bg-zinc-950 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white" 
                          : "bg-zinc-100 border-zinc-200 text-zinc-650 hover:bg-zinc-200 hover:text-zinc-955"
                      }`}
                    >
                      Bulk Quote
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
