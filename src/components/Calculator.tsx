import React, { useState } from "react";
import { RFID_PRODUCTS } from "../data/products";
import { Product } from "../types";
import { Scale, TrendingUp, Cpu, Truck, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CalculatorProps {
  onAddToQuote: (product: Product, qty: number) => void;
  onOpenConsultant: () => void;
}

export const Calculator: React.FC<CalculatorProps> = ({ onAddToQuote, onOpenConsultant }) => {
  const [selectedProductId, setSelectedProductId] = useState(RFID_PRODUCTS[0].id);
  const [quantity, setQuantity] = useState(1);

  const product = RFID_PRODUCTS.find((p) => p.id === selectedProductId) || RFID_PRODUCTS[0];

  // Calculate discount tier
  let activeDiscountPercent = 0;
  let nextTierMinQty = 0;
  let nextTierDiscountPercent = 0;

  // Find active discount
  const sortedTiers = [...product.bulkTiers].sort((a, b) => a.minQty - b.minQty);
  for (const tier of sortedTiers) {
    if (quantity >= tier.minQty) {
      activeDiscountPercent = tier.discountPercent;
    }
  }

  // Find next tier for gamification
  const nextTier = sortedTiers.find((tier) => quantity < tier.minQty);
  if (nextTier) {
    nextTierMinQty = nextTier.minQty;
    nextTierDiscountPercent = tierDiscountPercent(product, nextTier.minQty);
  }

  function tierDiscountPercent(prod: Product, q: number): number {
    let disc = 0;
    const sorted = [...prod.bulkTiers].sort((a, b) => a.minQty - b.minQty);
    for (const t of sorted) {
      if (q >= t.minQty) {
        disc = t.discountPercent;
      }
    }
    return disc;
  }

  const basePrice = product.price;
  const discountAmount = (basePrice * activeDiscountPercent) / 100;
  const unitPrice = basePrice - discountAmount;
  const totalPrice = unitPrice * quantity;
  const totalSavings = discountAmount * quantity;

  // Estimate read range metrics dynamically based on antenna gain / trigger rate
  const tagsScannedPerMinute = product.category === "scanners" 
    ? 1100 * 60 
    : product.category === "handhelds" 
      ? 450 * 60 
      : 0;

  const isB2B = quantity >= 10;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8 relative overflow-hidden shadow-sm" id="roi-calculator">
      {/* Decorative subtle warm gray background glows */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-mono text-orange-600 uppercase tracking-widest bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20 inline-block mb-3 font-bold">
            Interactive Cost & ROI Tool
          </span>
          <h3 className="text-2xl lg:text-3xl font-sans font-extrabold text-slate-950 tracking-tight">
            Volume Pricing Estimator
          </h3>
          <p className="text-slate-500 text-sm mt-1 max-w-xl font-medium">
            Adjust your deployment scale to unlock tiered enterprise discounts, preview bulk shipping times, and see ROI estimates.
          </p>
        </div>
        <button
          onClick={onOpenConsultant}
          className="self-start md:self-auto flex items-center gap-2 text-xs text-orange-600 hover:text-white font-mono font-bold uppercase tracking-wider transition-all bg-orange-500/10 hover:bg-orange-600 px-4 py-2.5 rounded-lg border border-orange-500/20 cursor-pointer shadow-sm"
        >
          <Cpu className="w-4 h-4 shrink-0" />
          Try AI Consultant
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column: Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Product Select cards */}
          <div>
            <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-3 font-bold">
              1. Select Hardware Equipment
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {RFID_PRODUCTS.map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => {
                    setSelectedProductId(prod.id);
                  }}
                  className={`flex flex-col items-start p-3.5 rounded-xl border text-left transition-all relative cursor-pointer ${
                    selectedProductId === prod.id
                      ? "border-orange-500 bg-orange-50/50 text-slate-900 shadow-sm"
                      : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-800"
                  }`}
                >
                  <span className="text-xs font-extrabold line-clamp-1">{prod.name.replace(" RFID", "")}</span>
                  <span className="text-sm font-extrabold mt-1 text-slate-900">${prod.price.toLocaleString()}</span>
                  {selectedProductId === prod.id && (
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-orange-600 border-2 border-white" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">
                2. Select Deployment Scale (Quantity)
              </label>
              <div className="flex items-center gap-2">
                <button
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-50 transition-colors flex items-center justify-center font-extrabold text-lg cursor-pointer"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setQuantity(isNaN(val) || val < 1 ? 1 : val);
                  }}
                  className="w-16 h-8 text-center bg-white border border-slate-200 rounded-lg text-slate-950 font-mono font-semibold focus:outline-none focus:border-orange-500"
                />
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center justify-center font-extrabold text-lg cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            <div className="relative pt-4">
              <input
                type="range"
                min="1"
                max="250"
                value={quantity > 250 ? 250 : quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600 focus:outline-none"
              />
              {/* Slider marks */}
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-2 font-bold uppercase">
                <span>1 Unit (Pilot)</span>
                <span>10 (B2B Discount)</span>
                <span>50 (Volume Tier)</span>
                <span>150+ (Enterprise)</span>
              </div>
            </div>
          </div>

          {/* Interactive features based on B2B scale */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h4 className="text-xs font-mono font-bold text-slate-900 mb-3 flex items-center gap-2 uppercase tracking-wider">
              <Scale className="w-4 h-4 text-orange-600" />
              Audience Benefits & Service SLA
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-500">
              <div className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-slate-900 block text-xs">Fulfillment SLA</span>
                  {quantity < 5 ? (
                    <span className="font-medium">Ships within 24 hours. Free tracking and 30-day consumer returns.</span>
                  ) : quantity < 20 ? (
                    <span className="font-medium">Bulk freight palletization. Delivered in 2-4 business days.</span>
                  ) : (
                    <span className="font-medium">LTL Freight Logistics. Customized containerized secure batch shipping.</span>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Cpu className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-slate-900 block text-xs">Calibration & Support</span>
                  {!isB2B ? (
                    <span className="font-medium">Plug-and-play presets. Direct digital manuals & community setup forums.</span>
                  ) : (
                    <span className="font-medium">Pre-configured tag frequency locks. 1-on-1 engineer systems onboarding.</span>
                  )}
                </div>
              </div>
            </div>

            {/* B2B Upgrade Nudge */}
            {nextTierMinQty > 0 && (
              <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between font-medium">
                <span>
                  Add <strong className="text-orange-600 font-extrabold">{nextTierMinQty - quantity}</strong> more units to unlock the <strong className="text-slate-900 font-extrabold">{nextTierDiscountPercent}% off</strong> bulk tier.
                </span>
                <span className="text-[9px] font-mono font-extrabold text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200 uppercase tracking-wider">
                  Bulk Save
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right column: Dynamic Bill & Estimate */}
        <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-5 md:p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">Purchase Summary</span>
              <span className={`text-[9px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full font-bold ${
                isB2B 
                  ? "bg-orange-100 border border-orange-200 text-orange-700" 
                  : "bg-slate-200 text-slate-700"
              }`}>
                {isB2B ? "B2B Bulk Pricing" : "B2C Consumer"}
              </span>
            </div>

            {/* Calculations display */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-500 font-medium">
                <span>Retail Base Unit Price:</span>
                <span className="font-mono">${basePrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              
              {activeDiscountPercent > 0 && (
                <div className="flex justify-between text-xs text-emerald-600 font-bold">
                  <span>Volume Discount ({activeDiscountPercent}%):</span>
                  <span className="font-mono">-${discountAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })} / unit</span>
                </div>
              )}

              <div className="flex justify-between text-xs text-slate-900 pt-2 border-t border-slate-200 font-bold">
                <span>Calculated Unit Price:</span>
                <span className="font-mono text-orange-600">
                  ${unitPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex justify-between text-[10px] font-mono text-slate-400 font-bold">
                <span>Quantity:</span>
                <span>x {quantity}</span>
              </div>
            </div>

            {/* Big Total */}
            <div className="pt-4 border-t border-slate-200 space-y-1">
              <div className="flex items-baseline justify-between">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Estimated Total:</span>
                <span className="text-3xl font-sans font-extrabold text-slate-900 tracking-tight">
                  ${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              
              {totalSavings > 0 && (
                <div className="text-[10px] font-mono text-emerald-600 text-right font-bold uppercase">
                  You save ${totalSavings.toLocaleString(undefined, { minimumFractionDigits: 2 })} in bulk margins!
                </div>
              )}
            </div>

            {/* Dynamic Performance Metrics */}
            <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                <TrendingUp className="w-3.5 h-3.5 text-orange-600" />
                <span>ESTIMATED OPERATIONAL ROI</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-[10px] font-medium text-slate-500">
                <div className="bg-slate-50 p-2 rounded border border-slate-100">
                  <span className="text-slate-400 block text-[9px] font-bold uppercase">Read Capability</span>
                  <span className="font-bold text-slate-900 font-mono block mt-0.5">
                    {tagsScannedPerMinute > 0 ? `${(tagsScannedPerMinute * quantity).toLocaleString()}/min` : "Continuous Tag Encode"}
                  </span>
                </div>
                <div className="bg-slate-50 p-2 rounded border border-slate-100">
                  <span className="text-slate-400 block text-[9px] font-bold uppercase">Investment ROI</span>
                  <span className="font-bold text-emerald-600 block mt-0.5">
                    {quantity < 5 ? "8 - 12 Months" : quantity < 25 ? "5 - 8 Months" : "Sub-4 Months"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons based on scale */}
          <div className="mt-6 pt-4 border-t border-slate-200 space-y-2.5">
            <button
              onClick={() => onAddToQuote(product, quantity)}
              className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 active:scale-[0.98] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isB2B ? "Request Formal Bulk Quote" : "Add to Order Basket"}
            </button>
            
            <p className="text-[9px] font-mono text-slate-400 text-center uppercase tracking-wider leading-relaxed">
              {isB2B 
                ? "Our engineering desk will supply formal contract paperwork." 
                : "Checkout uses rapid encrypted payment. No B2B paperwork required."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
