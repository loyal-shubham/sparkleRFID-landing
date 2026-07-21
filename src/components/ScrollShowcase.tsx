import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "motion/react";
import { SleekScannerGun } from "./SleekScannerGun";
import { SVGProductGraphic } from "./SVGProductGraphic";
import {
  Cpu,
  Layers,
  Zap,
  Sparkles,
  ChevronRight,
  Compass,
  ShieldCheck,
  Maximize2,
  MousePointerClick
} from "lucide-react";

export const ScrollShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track mouse coordinates for the interactive 3D drift/tilt effect
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Scroll tracking from Framer Motion
  const { scrollYProgress: rawScrollProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth scroll progress using spring physics for inertia
  const scrollYProgress = useSpring(rawScrollProgress, {
    stiffness: 45,
    damping: 25,
    restDelta: 0.001
  });

  // Keep track of mouse movement to simulate a floating 3D tilt
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return;
      const { clientX, clientY } = e;
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Calculate normal coordinates from -0.5 to 0.5
      const x = (clientX / width) - 0.5;
      const y = (clientY / height) - 0.5;

      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHovered]);

  // Map scroll progress to 3D rotation, position, and scale of the main floating product container
  // Scroll progresses:
  // 0.0 - 0.2: Screen 1 (Intro, Centered)
  // 0.2 - 0.5: Screen 2 (Android Panel, shifts right, rotates)
  // 0.5 - 0.75: Screen 3 (Antenna Ribs, shifts left, tilts)
  // 0.75 - 1.0: Screen 4 (All Products Morph, stays centered, zooms)

  // X Position: starts center (0), shifts right (250px on desktop), shifts left (-250px on desktop), returns center (0)
  const productX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.45, 0.55, 0.75, 0.85, 1],
    ["0px", "0px", "180px", "180px", "-180px", "-180px", "0px"]
  );

  // Y Position: gentle float, moves slightly up or down to align with text
  const productY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.75, 1],
    ["0px", "-20px", "10px", "-10px", "0px"]
  );

  // 3D Rotations based on scroll depth
  const productRotateX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.75, 1],
    [10, 15, -10, 25, 0]
  );

  const productRotateY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.75, 1],
    [-15, 45, -40, 20, 360] // full spin at the end
  );

  const productRotateZ = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [-5, 5, 0]
  );

  // Scale: starts big, zooms in on detail, then scales down to allow room for multiple products
  const productScale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 0.9, 1],
    [1, 1.15, 1.1, 0.9, 0.8, 0.85]
  );

  // Glow aura background color transition matching scroll segments
  const auraColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 0.9, 1],
    [
      "radial-gradient(circle, rgba(212,163,74,0.15) 0%, transparent 70%)",
      "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)",
      "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
      "radial-gradient(circle, rgba(212,163,74,0.2) 0%, transparent 70%)",
      "radial-gradient(circle, rgba(212,163,74,0.15) 0%, transparent 70%)"
    ]
  );

  // Detect which stage we are on to trigger text elements and render alternate products
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (latest < 0.25) {
        setCurrentStage(0); // Intro
      } else if (latest >= 0.25 && latest < 0.55) {
        setCurrentStage(1); // Android detail (shifted right)
      } else if (latest >= 0.55 && latest < 0.8) {
        setCurrentStage(2); // Antenna detail (shifted left)
      } else {
        setCurrentStage(3); // All products (morph)
      }
    });
  }, [scrollYProgress]);

  // Smooth out mouse tilt calculations
  const tiltX = isHovered ? mousePos.y * 30 : 0;
  const tiltY = isHovered ? mousePos.x * 30 : 0;

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[400vh] bg-zinc-950 border-b border-zinc-900"
      id="scroll-journey"
    >
      {/* Sticky container that remains pinned while text content scrolls */}
      <div className="sticky top-16 left-0 w-full h-[calc(100vh-4rem)] overflow-hidden flex items-center justify-center">

        {/* Animated dynamic radial background glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none -z-20 transition-all duration-700"
          style={{ background: auraColor }}
        />

        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none -z-30" />

        {/* Dynamic Watermark Header mimicking luxury landing pages */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-full max-w-7xl px-4 flex justify-between items-center text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest pointer-events-none">
          <span>MODEL ID: SPARKLE-RANGER-STX</span>
          <span className="text-[#D4A34A] animate-pulse">● INTERACTIVE PHYSICS CALIBRATION</span>
          <span>EPC GLOBAL GEN2V2</span>
        </div>

        {/* FLOATING INDICATOR */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40 pointer-events-none">
          <span className="text-[8px] font-mono tracking-widest text-zinc-400 uppercase">Scroll to Rotate & Calibrate</span>
          <motion.div
            className="w-1 h-3 rounded-full bg-zinc-400"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>

        {/* ================= STAGE TEXT OVERLAYS ================= */}
        {/* Responsive layout with layout grids. Text content switches based on scroll stage */}
        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center pointer-events-none z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full">

            {/* Screen 1 text (Centered Intro - Fades out as you scroll) */}
            <AnimatePresence>
              {currentStage === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5 }}
                  className="col-span-12 md:col-span-6 flex flex-col justify-center space-y-4 text-center md:text-left self-center pointer-events-auto bg-zinc-950/20 p-6 rounded-2xl backdrop-blur-xs md:bg-transparent"
                >
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#D4A34A]/10 border border-[#D4A34A]/20 rounded-lg self-center md:self-start">
                    <Sparkles className="w-3 h-3 text-[#D4A34A]" />
                    <span className="text-[9px] font-mono font-bold text-[#D4A34A] uppercase tracking-wider">Scroll-Driven Showcase</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white leading-tight uppercase">
                    THE CANS ANIMATION<br />
                    <span className="text-[#D4A34A] font-black">REIMAGINED.</span>
                  </h2>
                  <p className="text-zinc-400 text-xs md:text-sm font-medium leading-relaxed max-w-md">
                    Inspired by the floating, scroll-synchronized physics of **Ciao Energy**, we present the Sparkle Ranger STX. Watch the scanner spin, translate, and cross-fade dynamically as you explore our B2B and B2C luxury ecosystem.
                  </p>

                  <div className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-[#D4A34A] uppercase tracking-widest pt-2 justify-center md:justify-start">
                    <span>Scroll Down to calibrate hardware</span>
                    <ChevronRight className="w-3.5 h-3.5 animate-bounce-horizontal" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Screen 2 text (Android touchscreen details - shifts scanner gun to the right) */}
            <AnimatePresence>
              {currentStage === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="col-span-12 md:col-span-5 flex flex-col justify-center space-y-4 self-center pointer-events-auto bg-zinc-950/80 p-6 md:p-0 rounded-2xl md:bg-transparent border border-zinc-800 md:border-none shadow-2xl md:shadow-none"
                >
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
                    <Cpu className="w-4 h-4 text-emerald-400" />
                    <span>CALIBRATION STAGE 01</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-black text-white tracking-wide uppercase">
                    Micro-Calibrated Android Module
                  </h3>
                  <p className="text-zinc-400 text-xs leading-relaxed font-medium">
                    The integrated Android mobile computer is tilted at a precise ergonomic angle to allow appraisers and store clerks to verify diamond tag scans comfortably.
                  </p>
                  <ul className="space-y-2.5 text-xs text-zinc-300 font-medium">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>**Real-time RSSI Signal Graphs**: View wave strengths to pinpoint hidden rings instantly behind wooden counters or drawers.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>**Touchscreen Appraiser Suite**: Check inventories directly on the device with instant cloud sync with ERPs.</span>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Screen 3 text (Antenna Ribs detail - shifts scanner gun to the left) */}
            <AnimatePresence>
              {currentStage === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5 }}
                  className="col-span-12 md:col-span-5 md:col-start-8 flex flex-col justify-center space-y-4 self-center pointer-events-auto bg-zinc-950/80 p-6 md:p-0 rounded-2xl md:bg-transparent border border-zinc-800 md:border-none shadow-2xl md:shadow-none"
                >
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest">
                    <Layers className="w-4 h-4 text-blue-400" />
                    <span>CALIBRATION STAGE 02</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-black text-white tracking-wide uppercase">
                    EPC Gen2v2 Ribbed Antenna
                  </h3>
                  <p className="text-zinc-400 text-xs leading-relaxed font-medium">
                    The square flat antenna block underneath features deep 3D rugged cooling ribs, optimized to handle high power output for uninterrupted showroom auditing.
                  </p>
                  <ul className="space-y-2.5 text-xs text-zinc-300 font-medium">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold">•</span>
                      <span>**Diamond Signal Penetration**: Emits circular polarized waves that easily bypass metal mounts (Platinum, 18K Gold, Silver).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold">•</span>
                      <span>**Anti-Collision Algorithm**: Scan up to 1,500 jewelry pieces in a single sweep in seconds without opening glass cabinets.</span>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Screen 4 text (All Products Suite - centers and shows multiple devices) */}
            <AnimatePresence>
              {currentStage === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5 }}
                  className="col-span-12 text-center flex flex-col items-center justify-center space-y-4 self-center pointer-events-auto bg-zinc-950/80 md:bg-zinc-950/40 p-6 rounded-2xl backdrop-blur-xs max-w-2xl mx-auto border border-zinc-800"
                >
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#D4A34A] uppercase tracking-widest">
                    <ShieldCheck className="w-4 h-4 text-[#D4A34A]" />
                    <span>CALIBRATION STAGE 03</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-black text-white tracking-wide uppercase">
                    The Complete Sparkle Showroom Suite
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm max-w-xl leading-relaxed font-medium">
                    The Ranger STX Handheld represents only a single node of our complete protection suite. Drag items into your basket below to compile a custom pilot layout.
                  </p>

                  {/* Grid showing miniature badges of the morphed products */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                    <div className="px-3 py-1.5 bg-zinc-900 rounded-lg border border-zinc-800 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4A34A]" /> RANGER HANDHELD
                    </div>
                    <div className="px-3 py-1.5 bg-zinc-900 rounded-lg border border-zinc-800 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> MULTI-PORT FIXED
                    </div>
                    <div className="px-3 py-1.5 bg-zinc-900 rounded-lg border border-zinc-800 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> PRECISION PRINTER
                    </div>
                    <div className="px-3 py-1.5 bg-zinc-900 rounded-lg border border-zinc-800 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400" /> HIGH-GAIN ANTENNA
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

        {/* ================= CENTRAL FLOATING DYNAMIC CAN / PRODUCT DISPLAY ================= */}
        {/* Just like CiaoEnergy, this container is sticky and rotates/translates with scroll & mouse hover */}
        <motion.div
          className="absolute inset-0 m-auto z-0 w-full max-w-[420px] h-[420px] flex items-center justify-center cursor-grab active:cursor-grabbing pointer-events-auto"
          style={{
            x: productX,
            y: productY,
            scale: productScale,
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setMousePos({ x: 0, y: 0 });
          }}
          animate={{
            // Add a very subtle idle floating hover animation when not actively scrolled or hovered
            y: isHovered ? 0 : [0, -12, 0],
            rotateX: isHovered ? tiltX : productRotateX.get(),
            rotateY: isHovered ? tiltY : productRotateY.get(),
            rotateZ: productRotateZ.get(),
          }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 20,
            mass: 0.8,
            y: isHovered ? { duration: 0.3 } : { repeat: Infinity, duration: 4, ease: "easeInOut" }
          }}
        >
          {/* Stage Morph Switcher: Cross-fade between products based on stage */}
          <AnimatePresence mode="wait">
            {currentStage < 3 ? (
              // Stage 0, 1, 2: Display the main focus product, our meticulously crafted "Sleek Scanner Gun"
              <motion.div
                key="sleek-scanner-gun"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full"
              >
                <SleekScannerGun
                  isHovered={isHovered || currentStage > 0}
                  pulseColor={currentStage === 1 ? "#10b981" : currentStage === 2 ? "#3b82f6" : "#D4A34A"}
                />

                {/* Pointer dots showing callouts in Stage 1 & Stage 2 */}
                {currentStage === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-[30%] right-[20%] z-20 flex items-center gap-2 pointer-events-none"
                  >
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <span className="text-[9px] font-mono font-bold bg-zinc-900 px-2 py-0.5 rounded border border-emerald-500/30 text-emerald-400 uppercase tracking-wider backdrop-blur-xs shadow-xl">Android Compute Engine</span>
                  </motion.div>
                )}

                {currentStage === 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute bottom-[40%] left-[25%] z-20 flex items-center gap-2 pointer-events-none"
                  >
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                    </span>
                    <span className="text-[9px] font-mono font-bold bg-zinc-900 px-2 py-0.5 rounded border border-blue-500/30 text-blue-400 uppercase tracking-wider backdrop-blur-xs shadow-xl">Ribbed RFID Shield</span>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              // Stage 3 (Final Stage): The central gun "morphs" or cross-fades into the core multi-product stack!
              // Here, we render a floating concentric cluster of all Sparkle products
              <motion.div
                key="all-product-morph"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                {/* Outer concentric float of the fixed reader, tag printer, and wall antenna around the centered scanner */}
                <div className="absolute w-full h-full flex items-center justify-center">

                  {/* Item 1: Handheld (Top Left) */}
                  <motion.div
                    className="absolute -top-6 -left-6 w-44 h-44 opacity-90 shadow-2xl"
                    animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  >
                    <SVGProductGraphic type="ranger_handheld_gun" isHovered={isHovered} />
                  </motion.div>

                  {/* Item 2: Multi-Port Fixed Reader (Bottom Right) */}
                  <motion.div
                    className="absolute -bottom-8 -right-8 w-44 h-44 opacity-90 shadow-2xl"
                    animate={{ y: [0, 8, 0], rotate: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 4.5, delay: 0.5, ease: "easeInOut" }}
                  >
                    <SVGProductGraphic type="apex_fixed_reader" isHovered={isHovered} />
                  </motion.div>

                  {/* Item 3: Precision Printer (Top Right) */}
                  <motion.div
                    className="absolute -top-10 -right-10 w-44 h-44 opacity-90 shadow-2xl"
                    animate={{ y: [0, -8, 0], rotate: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 4.8, delay: 1, ease: "easeInOut" }}
                  >
                    <SVGProductGraphic type="scribe_400_printer" isHovered={isHovered} />
                  </motion.div>

                  {/* Item 4: High Gain Wall Antenna (Bottom Left) */}
                  <motion.div
                    className="absolute -bottom-10 -left-10 w-44 h-44 opacity-90 shadow-2xl"
                    animate={{ y: [0, 10, 0], rotate: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 5.2, delay: 0.3, ease: "easeInOut" }}
                  >
                    <SVGProductGraphic type="signpost_antenna" isHovered={isHovered} />
                  </motion.div>

                </div>

                {/* Subtle core logo watermark behind */}
                <div className="absolute opacity-5">
                  <Compass className="w-56 h-56 text-white stroke-1 animate-spin-slow" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
