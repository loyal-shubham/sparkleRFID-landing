import React, { useState } from "react";
import { CartItem, Product } from "../types";
import { ShoppingBag, Trash2, ShieldCheck, FileCheck, ArrowRight, X, Building2, User, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (productId: string, newQty: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Checkout Form fields (Adaptive)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  // Colors based on Sparkle Brand Guidelines
  const sparkleGold = "#D4A34A";

  // Calculate overall basket metrics
  let totalRetailValue = 0;
  let totalDiscountedValue = 0;
  let totalQuantity = 0;
  let hasB2BScale = false;

  cartItems.forEach((item) => {
    const basePrice = item.product.price;
    totalQuantity += item.quantity;
    
    // Check if bulk pricing applies for this item
    let discountPercent = 0;
    const sortedTiers = [...item.product.bulkTiers].sort((a, b) => a.minQty - b.minQty);
    for (const tier of sortedTiers) {
      if (item.quantity >= tier.minQty) {
        discountPercent = tier.discountPercent;
      }
    }

    if (item.quantity >= 10) {
      hasB2BScale = true;
    }

    const itemDiscount = (basePrice * discountPercent) / 100;
    const itemFinalPrice = basePrice - itemDiscount;

    totalRetailValue += basePrice * item.quantity;
    totalDiscountedValue += itemFinalPrice * item.quantity;
  });

  const totalSavings = totalRetailValue - totalDiscountedValue;

  const handleSubmitCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClearCart();
    setName("");
    setEmail("");
    setCompany("");
    setAddress("");
    setNotes("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-zinc-950/80 backdrop-blur-md flex justify-end">
      {/* Backdrop closer */}
      <div className="absolute inset-0 -z-10 cursor-pointer" onClick={onClose} />

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="w-full max-w-lg bg-zinc-900 border-l border-zinc-800 h-full flex flex-col justify-between shadow-2xl relative overflow-hidden text-zinc-100"
      >
        {/* Dynamic header */}
        <div className="p-5 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#D4A34A]" />
            <h3 className="text-xs font-display font-black tracking-wider text-white">
              {hasB2BScale ? "B2B Showroom Quote Compiler" : "Sparkle Store Counter Basket"}
            </h3>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white font-mono text-xs font-bold uppercase cursor-pointer">
            CLOSE ✕
          </button>
        </div>

        {/* Dynamic checkout content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="submission-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 text-center space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-[#D4A34A]/10 border border-[#D4A34A]/20 flex items-center justify-center mx-auto">
                  <FileCheck className="w-8 h-8 text-[#D4A34A]" />
                </div>
                
                <div className="space-y-2 px-4">
                  <h4 className="text-lg font-display font-black tracking-wide text-white">
                    {hasB2BScale ? "Secure Quote Requested" : "Boutique Order Confirmed!"}
                  </h4>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed font-medium">
                    {hasB2BScale 
                      ? `Thank you, ${name}. A personalized Sparkle enterprise contract draft has been compiled for ${company || "your showroom"}. We've registered projected bulk savings of $${totalSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}. Our luxury asset engineers will email you at ${email} shortly.`
                      : `Your direct pilot checkout was processed successfully. High-contrast Sparkle jewelry label packages and hardware trackers have been dispatched to ${address}. A confirmation invoice is arriving at ${email}.`}
                  </p>
                </div>

                <button
                  onClick={handleReset}
                  className="py-2.5 px-6 bg-[#D4A34A] text-zinc-950 hover:bg-[#B98A32] text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer"
                >
                  Continue Browsing
                </button>
              </motion.div>
            ) : cartItems.length === 0 ? (
              <motion.div
                key="empty-cart"
                className="py-16 text-center text-zinc-500 space-y-4"
              >
                <ShoppingBag className="w-12 h-12 stroke-1 mx-auto text-zinc-600" />
                <div>
                  <p className="text-sm font-bold text-zinc-300">Your store basket is currently empty.</p>
                  <p className="text-xs text-zinc-500 mt-1 font-medium">Select Sparkle RFID scanners, labels, or hardware to initialize quote compilation.</p>
                </div>
              </motion.div>
            ) : (
              <motion.div key="cart-content" className="space-y-6">
                {/* List Items */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-[#D4A34A] font-bold uppercase tracking-wider block">
                    1. Hardware Selected ({cartItems.length})
                  </span>
                  
                  {cartItems.map((item) => {
                    // Calc item subtotal
                    let itemDiscountPercent = 0;
                    const sorted = [...item.product.bulkTiers].sort((a, b) => a.minQty - b.minQty);
                    for (const tier of sorted) {
                      if (item.quantity >= tier.minQty) {
                        itemDiscountPercent = tier.discountPercent;
                      }
                    }
                    const discountValue = (item.product.price * itemDiscountPercent) / 100;
                    const finalUnit = item.product.price - discountValue;

                    return (
                      <div key={item.product.id} className="p-3.5 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-between gap-3">
                        <div className="space-y-1">
                          <span className="text-xs font-bold text-white block">{item.product.name}</span>
                          <span className="text-[10px] text-zinc-500 font-mono block">${item.product.price.toLocaleString()} retail unit</span>
                          {itemDiscountPercent > 0 && (
                            <span className="text-[9px] font-mono font-bold text-[#D4A34A] bg-[#D4A34A]/10 px-1.5 py-0.5 rounded border border-[#D4A34A]/20 inline-block uppercase mt-0.5">
                              -{itemDiscountPercent}% Bulk Saving
                            </span>
                          )}
                        </div>

                        {/* Controls & final Price */}
                        <div className="flex items-center gap-4 shrink-0">
                          <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
                            <button
                              onClick={() => onUpdateQty(item.product.id, Math.max(1, item.quantity - 1))}
                              className="text-zinc-500 hover:text-white px-1 font-extrabold text-xs disabled:opacity-30"
                            >
                              -
                            </button>
                            <span className="text-xs font-mono font-bold text-white min-w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQty(item.product.id, item.quantity + 1)}
                              className="text-zinc-500 hover:text-white px-1 font-extrabold text-xs"
                            >
                              +
                            </button>
                          </div>

                          <div className="text-right min-w-16">
                            <span className="text-xs font-bold text-[#D4A34A] block font-mono">
                              ${(finalUnit * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-zinc-500 hover:text-red-500 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Savings and Cost display */}
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2">
                  <div className="flex justify-between text-xs text-zinc-500 font-medium">
                    <span>Retail Baseline Total:</span>
                    <span className="font-mono">${totalRetailValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                  {totalSavings > 0 && (
                    <div className="flex justify-between text-xs text-emerald-500 font-bold">
                      <span>Volume Pricing Savings:</span>
                      <span className="font-mono">-${totalSavings.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-zinc-850">
                    <span>{hasB2BScale ? "Quote Target Total:" : "Calculated Subtotal:"}</span>
                    <span className="text-base text-[#D4A34A] font-mono font-extrabold">
                      ${totalDiscountedValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                {/* Adaptive Checkout Form */}
                <form onSubmit={handleSubmitCheckout} className="space-y-4 pt-4 border-t border-zinc-800">
                  <div className="flex items-center gap-2 mb-2">
                    {hasB2BScale ? (
                      <Building2 className="w-4 h-4 text-[#D4A34A]" />
                    ) : (
                      <User className="w-4 h-4 text-[#D4A34A]" />
                    )}
                    <span className="text-[10px] font-mono text-[#D4A34A] font-bold uppercase tracking-wider">
                      {hasB2BScale ? "2. Secure Showroom Verification" : "2. Direct Boutique Checkout"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <label className="text-[9px] text-zinc-400 font-mono font-bold block mb-1 uppercase tracking-wider">Contact Person Name</label>
                      <input
                        required
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Elena Vance"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4A34A] font-medium"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="text-[9px] text-zinc-400 font-mono font-bold block mb-1 uppercase tracking-wider">Secured Email Address</label>
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="evance@vance-jewelry.com"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4A34A] font-medium"
                      />
                    </div>

                    {hasB2BScale && (
                      <div className="col-span-2">
                        <label className="text-[9px] text-zinc-400 font-mono font-bold block mb-1 uppercase tracking-wider">Showroom / Jewelry Brand Name</label>
                        <input
                          required
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Vance Fine Gemstones Ltd."
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4A34A] font-medium"
                        />
                      </div>
                    )}

                    <div className="col-span-2">
                      <label className="text-[9px] text-zinc-400 font-mono font-bold block mb-1 uppercase tracking-wider">
                        {hasB2BScale ? "Showroom Delivery Destination" : "Store Delivery Destination Address"}
                      </label>
                      <input
                        required
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="544 Fifth Avenue, Suite 12, New York NY"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4A34A] font-medium"
                      />
                    </div>

                    {!hasB2BScale ? (
                      <div className="col-span-2 bg-zinc-950 p-3.5 rounded-lg border border-zinc-800">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider flex items-center gap-1 font-bold">
                            <CreditCard className="w-3.5 h-3.5 text-[#D4A34A]" />
                            Encrypted Payment Shield
                          </span>
                        </div>
                        <input
                          type="text"
                          required
                          placeholder="••••  ••••  ••••  4242"
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#D4A34A] font-medium"
                        />
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <input
                            type="text"
                            required
                            placeholder="MM/YY"
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#D4A34A] font-medium"
                          />
                          <input
                            type="text"
                            required
                            placeholder="CVC"
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#D4A34A] font-medium"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="col-span-2">
                        <label className="text-[9px] text-zinc-400 font-mono font-bold block mb-1 uppercase tracking-wider">Bespoke Jewelry Label Customization requests</label>
                        <textarea
                          rows={2}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="E.g., Flag tag alignment requirements, pre-printed luxury store branding, or 1-on-1 appraiser calibration support."
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4A34A] placeholder-zinc-600 font-medium leading-relaxed"
                        />
                      </div>
                    )}
                  </div>

                  {/* Submission triggers */}
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 mt-2 bg-[#D4A34A] text-zinc-950 hover:bg-[#B98A32] text-xs font-mono font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
                  >
                    {hasB2BScale ? (
                      <>
                        Compile Secured B2B Contract Proposal <ArrowRight className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Process Encrypted Showroom Payment <ShieldCheck className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
