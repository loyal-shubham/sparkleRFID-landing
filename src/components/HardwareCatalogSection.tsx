import React from "react";
import { Product } from "../types";
import { Product3DCardViewer } from "./Product3DCardViewer";

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
      isDark ? "bg-zinc-950 border-zinc-900 text-white" : "bg-white border-zinc-200 text-zinc-900"
    }`} id="hardware-showcase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] font-display text-[#D4A34A] uppercase tracking-widest font-black block">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {filteredProducts.map((prod) => {
            return (
              <div
                key={prod.id}
                className={`border rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 ${
                  isDark
                    ? "bg-zinc-900 border-zinc-800 hover:border-[#D4A34A] hover:shadow-2xl hover:shadow-[#D4A34A]/5 text-white"
                    : "bg-white border-zinc-200 hover:border-[#D4A34A] hover:shadow-2xl hover:shadow-[#D4A34A]/5 text-zinc-900 shadow-sm"
                }`}
                onMouseEnter={() => setHoveredProdId(prod.id)}
                onMouseLeave={() => setHoveredProdId(null)}
              >
                <div className="space-y-4">
                  {/* Interactive 3D Canvas Card View */}
                  <Product3DCardViewer productId={prod.id} theme={theme} height={180} />

                  {/* Brand Meta */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-extrabold text-[#D4A34A] uppercase tracking-widest block">
                      {prod.category}
                    </span>
                    <h3 className={`font-display font-black text-lg uppercase tracking-wide group-hover:text-[#D4A34A] transition-colors ${
                      isDark ? "text-white" : "text-zinc-955"
                    }`}>
                      {prod.name}
                    </h3>
                    <p className={`text-xs leading-relaxed font-sans font-medium ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
                      {prod.tagline}
                    </p>
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
