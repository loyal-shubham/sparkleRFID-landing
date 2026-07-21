import React, { useState, useEffect } from "react";
import { RFID_PRODUCTS, TESTIMONIALS } from "./data/products";
import { Product, CartItem } from "./types";
import { Header } from "./components/Header";
import { Calculator } from "./components/Calculator";
import { AIConsultant } from "./components/AIConsultant";
import { CartDrawer } from "./components/CartDrawer";
import { ContactForm } from "./components/ContactForm";
import { SVGProductGraphic } from "./components/SVGProductGraphic";
import { ScrollShowcase } from "./components/ScrollShowcase";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Cpu,
  Check,
  Zap,
  ShieldAlert,
  Award,
  Globe2,
  Sparkles,
  ShoppingBag,
  Scale,
  Truck,
  Database,
  Search,
  Star,
  Layers,
  ChevronRight,
  TrendingUp,
  FileCheck2,
  Boxes,
  Compass
} from "lucide-react";
import { SparkleLogo } from "./components/SparkleLogo";
import { Interactive3DViewer } from "./components/Interactive3DViewer";
import { PageLoader } from "./components/PageLoader";

// Homepage Section Component Imports
import { HeroSection } from "./components/HeroSection";
import { ComplianceStrip } from "./components/ComplianceStrip";
import { HardwareCatalogSection } from "./components/HardwareCatalogSection";
import { TestimonialsSection } from "./components/TestimonialsSection";

// Route Page Imports
import { HardwarePage } from "./pages/HardwarePage";
import { SoftwarePage } from "./pages/SoftwarePage";
import { SupportPage } from "./pages/SupportPage";
import { DemoPage } from "./pages/DemoPage";
import { WhySparklePage } from "./pages/WhySparklePage";
import { ContactPage } from "./pages/ContactPage";
import { SEO } from "./components/SEO";

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConsultantOpen, setIsConsultantOpen] = useState(false);
  const [selected3DProductId, setSelected3DProductId] = useState<string>("sparkle-sr-100-reader");
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // Routing State
  const [currentPath, setCurrentPath] = useState<string>("home");
  const [hardwareCategory, setHardwareCategory] = useState<string>("all");

  // Listen to browser hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || "#/";
      window.scrollTo(0, 0); // scroll to top smoothly
      
      const [pathPart, queryPart] = hash.split("?");
      const cleanPath = pathPart.replace(/^#\/?/, "") || "home";
      setCurrentPath(cleanPath);

      if (queryPart) {
        const params = new URLSearchParams(queryPart);
        const category = params.get("category") || "all";
        setHardwareCategory(category);
      } else {
        setHardwareCategory("all");
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Filter products by category or scale
  const [filterCategory, setFilterCategory] = useState<string>("all");

  // Individual product card local quantities (for direct Add to Basket)
  const [prodQuantities, setProdQuantities] = useState<Record<string, number>>({
    "sparkle-sr-100-reader": 1,
    "sparkle-scribe-400-printer": 1,
    "sparkle-st-301-handheld": 1,
    "sparkle-sa-200-antenna": 1
  });

  // Hover states for products to trigger SVG animations
  const [hoveredProdId, setHoveredProdId] = useState<string | null>(null);

  // Cart Handlers
  const handleAddToCart = (product: Product, qty: number) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prevCart, { product, quantity: qty }];
    });
    setIsCartOpen(true);
  };

  const handleAddAllToCart = (items: { product: Product; qty: number }[]) => {
    setCart((prevCart) => {
      let updatedCart = [...prevCart];
      items.forEach((newItem) => {
        const existingIdx = updatedCart.findIndex((item) => item.product.id === newItem.product.id);
        if (existingIdx > -1) {
          updatedCart[existingIdx].quantity += newItem.qty;
        } else {
          updatedCart.push({ product: newItem.product, quantity: newItem.qty });
        }
      });
      return updatedCart;
    });
    setIsCartOpen(true);
  };

  const handleUpdateQty = (productId: string, newQty: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const updateProductCardQty = (productId: string, qty: number) => {
    setProdQuantities((prev) => ({
      ...prev,
      [productId]: qty
    }));
  };

  const filteredProducts = filterCategory === "all"
    ? RFID_PRODUCTS
    : RFID_PRODUCTS.filter(p => p.category === filterCategory);

  return (
    <div className={`min-h-screen font-sans antialiased overflow-x-clip transition-colors duration-300 selection:bg-[#D4A34A]/20 ${
      theme === "dark" 
        ? "bg-zinc-950 text-zinc-100 selection:text-white bg-grid-pattern" 
        : "bg-zinc-50 text-zinc-900 selection:text-zinc-950 bg-grid-pattern opacity-95"
    }`}>

      {/* Page-wide Holographic Loader */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <PageLoader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={isLoading ? "pointer-events-none h-screen overflow-hidden" : ""}
      >
        {/* 1. HEADER */}
      <Header
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenConsultant={() => setIsConsultantOpen(true)}
        theme={theme}
        onToggleTheme={() => setTheme(prev => prev === "light" ? "dark" : "light")}
      />

      {/* DYNAMIC ROUTE PAGES CONDITIONAL SWAP */}
      {currentPath === "home" && (
        <>
          {/* DYNAMIC INDUSTRIAL BACKGROUND ACCENT */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] pointer-events-none -z-10 overflow-hidden">
            <div className="absolute top-[-10%] left-[10%] w-[600px] h-[600px] bg-gradient-to-br from-[#D4A34A]/5 to-transparent rounded-full blur-3xl" />
            <div className="absolute top-[10%] right-[5%] w-[450px] h-[450px] bg-gradient-to-bl from-zinc-800/20 to-transparent rounded-full blur-3xl" />
          </div>

          <SEO 
            title="Sparkle RFID | Luxury Asset Protection Systems" 
            description="Premium industrial RFID scanning hardware, smart velvet trays, and precision barcode tag printers calibrated for high-end retail showrooms."
            keywords="RFID scanners, velvet smart tray, luxury asset tracking, EPC global tag printer"
            routePath="home"
          />

          {/* 2. HERO SECTION */}
          <HeroSection
            theme={theme}
            onOpenConsultant={() => setIsConsultantOpen(true)}
            hoveredProdId={hoveredProdId}
            setHoveredProdId={setHoveredProdId}
          />

          {/* DYNAMIC SCROLL SHOWCASE (Apple / Ciao Energy physics) */}
          <ScrollShowcase />

          {/* 3. COMPLIANCE & CREDIBILITY STRIP */}
          <ComplianceStrip theme={theme} />

          {/* 4. HIGH-PERFORMANCE HARDWARE CATALOG */}
          <HardwareCatalogSection
            theme={theme}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            filteredProducts={filteredProducts}
            prodQuantities={prodQuantities}
            updateProductCardQty={updateProductCardQty}
            handleAddToCart={handleAddToCart}
            selected3DProductId={selected3DProductId}
            setSelected3DProductId={setSelected3DProductId}
            hoveredProdId={hoveredProdId}
            setHoveredProdId={setHoveredProdId}
          />

          {/* INTERACTIVE 3D PRODUCT INSPECTION PORTAL */}
          <Interactive3DViewer
            products={RFID_PRODUCTS}
            selectedProductId={selected3DProductId}
            onAddToQuote={(prod, qty) => handleAddToCart(prod, qty)}
            theme={theme}
          />

          {/* 5. INTERACTIVE CALCULATOR & ADVANTAGE TRACK */}
          <section className={`py-28 transition-colors duration-300 border-y ${
            theme === "dark" ? "bg-zinc-950 border-zinc-900 text-white" : "bg-white border-zinc-200 text-zinc-900"
          }`} id="roi-calculator">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                {/* Split value statement */}
                <div className="lg:col-span-5 space-y-6">
                  <span className="text-[10px] font-mono font-extrabold text-[#D4A34A] uppercase tracking-widest bg-[#D4A34A]/10 px-3 py-1.5 rounded-lg border border-[#D4A34A]/20 inline-block">
                    The Sparkle Advantage
                  </span>
                  <h2 className={`text-2xl sm:text-3xl font-display font-black tracking-wide uppercase leading-tight ${
                    theme === "dark" ? "text-white" : "text-zinc-955"
                  }`}>
                    Architectures For High-Value Showrooms.
                  </h2>
                  <p className={`text-sm leading-relaxed font-medium ${
                    theme === "dark" ? "text-zinc-400" : "text-zinc-650"
                  }`}>
                    We bridge the gap between delicate jewelry store physical space constraints and high-speed daily audit requirements. Our systems are elegant and disappear under luxury velvet showcases.
                  </p>

                  <div className="space-y-4">
                    <div className={`p-4 rounded-xl border transition-colors ${
                      theme === "dark" ? "bg-zinc-900 border-zinc-800 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-900 shadow-sm"
                    }`}>
                      <h4 className="text-[10px] font-mono text-[#D4A34A] uppercase tracking-wider mb-1 font-extrabold flex items-center gap-1.5">
                        <Boxes className="w-3.5 h-3.5" /> For Independent Boutiques (B2C)
                      </h4>
                      <ul className={`space-y-1 text-xs font-medium list-disc pl-4 leading-relaxed ${
                        theme === "dark" ? "text-zinc-400" : "text-zinc-650"
                      }`}>
                        <li>Instant direct online payment — no complex credit reviews.</li>
                        <li>Premium micro jewelry hangtags optimized for tiny precious items.</li>
                        <li>Plug-and-play desktop USB scanners with clean iOS companion app.</li>
                      </ul>
                    </div>

                    <div className={`p-4 rounded-xl border transition-colors ${
                      theme === "dark" ? "bg-zinc-900 border-zinc-800 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-900 shadow-sm"
                    }`}>
                      <h4 className={`text-[10px] font-mono uppercase tracking-wider mb-1 font-extrabold flex items-center gap-1.5 ${
                        theme === "dark" ? "text-white" : "text-zinc-955"
                      }`}>
                        <Layers className="w-3.5 h-3.5 text-carbon-violet" /> For Showroom Networks (B2B)
                      </h4>
                      <ul className={`space-y-1 text-xs font-medium list-disc pl-4 leading-relaxed ${
                        theme === "dark" ? "text-zinc-400" : "text-zinc-650"
                      }`}>
                        <li>Secured sliding bulk price discounts saving up to 40% on enterprise orders.</li>
                        <li>Pre-programmed chip configurations with sequential jewelry catalog numbers.</li>
                        <li>1-on-1 systems engineering help to connect RFID portals directly with ERPs.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Visual ROI Calculator display */}
                <div className="lg:col-span-7">
                  <Calculator
                    onAddToQuote={handleAddToCart}
                    onOpenConsultant={() => setIsConsultantOpen(true)}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 6. TESTIMONIALS SECTION */}
          <TestimonialsSection theme={theme} />

          {/* 7. ADAPTIVE CONTACT / QUOTE REQUEST FORM */}
          <section className={`py-28 border-t transition-colors duration-300 ${
            theme === "dark" ? "bg-zinc-950 border-zinc-900 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-900"
          }`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <ContactForm theme={theme} />
            </div>
          </section>
        </>
      )}

      {currentPath === "hardware" && (
        <HardwarePage 
          theme={theme} 
          onAddToCart={handleAddToCart} 
          onOpenCart={() => setIsCartOpen(true)} 
        />
      )}

      {currentPath === "software" && (
        <SoftwarePage theme={theme} />
      )}

      {currentPath === "support" && (
        <SupportPage theme={theme} />
      )}

      {currentPath === "demo" && (
        <DemoPage theme={theme} />
      )}

      {currentPath === "why-sparkle" && (
        <WhySparklePage theme={theme} />
      )}

      {currentPath === "contact" && (
        <ContactPage theme={theme} />
      )}
 
      {/* 8. FOOTER */}
      <footer className={`py-16 text-xs transition-colors duration-300 border-t ${
        theme === "dark" ? "bg-zinc-950 border-zinc-850 text-zinc-500" : "bg-zinc-100 border-zinc-200 text-zinc-650"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
 
            {/* Branding Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-1">
                <SparkleLogo variant={theme === "dark" ? "dark" : "light"} size={48} />
              </div>
              <p className={`leading-relaxed text-[11px] font-medium ${
                theme === "dark" ? "text-zinc-400" : "text-zinc-600"
              }`}>
                Sleek, gold-standard asset tracking and showroom protective systems. Serving luxury retail and global diamond safe operations.
              </p>
              <p className="font-mono text-[9px] text-zinc-600">
                Secure Terminal Local Time: 2026-07-19 UTC
              </p>
            </div>
 
            {/* Quick Links */}
            <div className="space-y-3">
              <span className={`font-bold uppercase tracking-wider block text-[10px] font-mono ${
                theme === "dark" ? "text-white" : "text-zinc-955"
              }`}>Bespoke Catalog</span>
              <ul className={`space-y-2 text-[11px] font-medium ${
                theme === "dark" ? "text-zinc-400" : "text-zinc-650"
              }`}>
                <li><a href="#hardware-showcase" className="hover:text-[#D4A34A] transition-colors">Under-Counter Antennas</a></li>
                <li><a href="#hardware-showcase" className="hover:text-[#D4A34A] transition-colors">Jewelry Tag Printers</a></li>
                <li><a href="#hardware-showcase" className="hover:text-[#D4A34A] transition-colors">Handheld Showcase Scanners</a></li>
                <li><a href="#hardware-showcase" className="hover:text-[#D4A34A] transition-colors">Micro Jewelry Labels</a></li>
              </ul>
            </div>
 
            {/* Technical Resources */}
            <div className="space-y-3">
              <span className={`font-bold uppercase tracking-wider block text-[10px] font-mono ${
                theme === "dark" ? "text-white" : "text-zinc-955"
              }`}>Precision Tools</span>
              <ul className={`space-y-2 text-[11px] font-medium ${
                theme === "dark" ? "text-zinc-400" : "text-zinc-650"
              }`}>
                <li><a href="#roi-calculator" className="hover:text-[#D4A34A] transition-colors">Pricing Estimator</a></li>
                <li><span className="hover:text-[#D4A34A] transition-colors cursor-pointer" onClick={() => setIsConsultantOpen(true)}>Sparkle AI Planner</span></li>
                <li><span className="hover:text-[#D4A34A] transition-colors cursor-pointer" onClick={() => setIsCartOpen(true)}>Boutique Cart Drawer</span></li>
                <li><a href="#contact-solutions" className="hover:text-[#D4A34A] transition-colors">Jewelry ERP API Guides</a></li>
              </ul>
            </div>
 
            {/* Corporate Contacts */}
            <div className="space-y-3">
              <span className={`font-bold uppercase tracking-wider block text-[10px] font-mono ${
                theme === "dark" ? "text-white" : "text-zinc-955"
              }`}>Executive Desk</span>
              <p className={`leading-relaxed text-[11px] font-medium ${
                theme === "dark" ? "text-zinc-400" : "text-zinc-650"
              }`}>
                Sparkle RFID Systems Ltd.<br />
                540 Fifth Avenue, Suite 12<br />
                New York, NY 10036<br />
                <span className="text-[#D4A34A] font-bold block mt-2">Phone: 1-800-SPARKLE</span>
                <span className={`font-bold block ${theme === "dark" ? "text-zinc-300" : "text-zinc-700"}`}>Email: concierge@sparkle-rfid.com</span>
              </p>
            </div>
          </div>
 
          <div className={`border-t mt-10 pt-6 text-center flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] ${
            theme === "dark" ? "border-zinc-900 text-zinc-600" : "border-zinc-200 text-zinc-500"
          }`}>
            <p>© 2026 Sparkle RFID Solutions. All rights reserved. Registered gold asset protection frameworks.</p>
            <div className={`flex gap-4 font-mono font-bold uppercase tracking-wider ${
              theme === "dark" ? "text-zinc-600 hover:text-white" : "text-zinc-500"
            }`}>
              <a href="#" className={theme === "dark" ? "hover:text-white" : "hover:text-zinc-950"}>Security SLA</a>
              <a href="#" className={theme === "dark" ? "hover:text-white" : "hover:text-zinc-950"}>API License</a>
              <a href="#" className={theme === "dark" ? "hover:text-white" : "hover:text-zinc-950"}>Returns Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* 9. FLOATING WIDGETS */}

      {/* AI Consultant Modal */}
      <AnimatePresence>
        {isConsultantOpen && (
          <AIConsultant
            isOpen={isConsultantOpen}
            onClose={() => setIsConsultantOpen(false)}
            onAddAllToCart={handleAddAllToCart}
          />
        )}
      </AnimatePresence>

      {/* Cart Slider Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cart}
            onUpdateQty={handleUpdateQty}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
          />
        )}
      </AnimatePresence>

      </motion.div>
    </div>
  );
}
