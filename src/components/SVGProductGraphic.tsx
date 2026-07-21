import React from "react";
import { motion } from "motion/react";

interface SVGProductGraphicProps {
  type: string;
  className?: string;
  isHovered?: boolean;
}

export const SVGProductGraphic: React.FC<SVGProductGraphicProps> = ({
  type,
  className = "w-full h-full",
  isHovered = false,
}) => {
  const signalTransition = {
    repeat: Infinity,
    duration: 2.5,
    ease: "easeOut",
  };

  // Sparkle brand RFID Gold accent: #D4A34A
  const sparkleGold = "#D4A34A";

  switch (type) {
    case "apex_fixed_reader":
      return (
        <div className={`relative flex items-center justify-center bg-zinc-950 rounded-2xl overflow-hidden p-6 aspect-4/3 border border-zinc-800 shadow-xl ${className}`}>
          {/* Circular scanning grid backdrop */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4A34A]/20 via-transparent to-transparent pointer-events-none" />
          
          <svg viewBox="0 0 400 300" className="w-full h-full max-w-[280px]">
            {/* Signal Waves (Animating in Sparkle Gold) */}
            <motion.circle
              cx="200"
              cy="150"
              r="100"
              fill="none"
              stroke={sparkleGold}
              strokeWidth="2"
              strokeDasharray="4,6"
              opacity="0.3"
              animate={{
                scale: isHovered ? [1, 1.4, 1.8] : [1, 1.25, 1.5],
                opacity: isHovered ? [0.4, 0.2, 0] : [0.3, 0.1, 0],
              }}
              transition={signalTransition}
            />
            <motion.circle
              cx="200"
              cy="150"
              r="70"
              fill="none"
              stroke={sparkleGold}
              strokeWidth="1.5"
              opacity="0.5"
              animate={{
                scale: isHovered ? [1, 1.3, 1.6] : [1, 1.15, 1.3],
                opacity: isHovered ? [0.6, 0.3, 0] : [0.5, 0.2, 0],
              }}
              transition={{ ...signalTransition, delay: 0.8 }}
            />

            {/* Ports/Connectors on the top */}
            <g transform="translate(100, 70)">
              {/* Coaxial Port 1 */}
              <rect x="25" y="-15" width="12" height="20" fill="#4b5563" rx="2" />
              <rect x="28" y="-20" width="6" height="5" fill={sparkleGold} />
              {/* Coaxial Port 2 */}
              <rect x="75" y="-15" width="12" height="20" fill="#4b5563" rx="2" />
              <rect x="78" y="-20" width="6" height="5" fill={sparkleGold} />
              {/* Coaxial Port 3 */}
              <rect x="125" y="-15" width="12" height="20" fill="#4b5563" rx="2" />
              <rect x="128" y="-20" width="6" height="5" fill={sparkleGold} />
              {/* Coaxial Port 4 */}
              <rect x="175" y="-15" width="12" height="20" fill="#4b5563" rx="2" />
              <rect x="178" y="-20" width="6" height="5" fill={sparkleGold} />
            </g>

            {/* Anodized Graphite Chassis Main Body */}
            <rect x="80" y="80" width="240" height="150" rx="16" fill="#1e1e1e" stroke="#3f3f46" strokeWidth="4" />
            <rect x="85" y="85" width="230" height="140" rx="12" fill="#121212" />

            {/* Metal Heatsink fins lines */}
            <g fill="#27272a">
              <rect x="110" y="100" width="180" height="4" rx="2" />
              <rect x="110" y="110" width="180" height="4" rx="2" />
              <rect x="110" y="120" width="180" height="4" rx="2" />
              <rect x="110" y="130" width="180" height="4" rx="2" />
            </g>

            {/* Status Panel Glow */}
            <rect x="100" y="150" width="200" height="60" rx="8" fill="#18181b" opacity="0.8" />
            
            {/* Blinking LEDs */}
            <g transform="translate(115, 175)">
              {/* Power Indicator */}
              <circle cx="10" cy="10" r="6" fill="#10b981" />
              <circle cx="10" cy="10" r="10" fill="none" stroke="#10b981" strokeWidth="2" opacity="0.3" />
              <text x="25" y="13" fill="#a1a1aa" fontSize="9" fontFamily="monospace" fontWeight="bold">PWR</text>
              
              {/* Activity RFID scanning indicator */}
              <motion.circle
                cx="80"
                cy="10"
                r="6"
                fill={sparkleGold}
                animate={{
                  opacity: isHovered ? [1, 0.2, 1] : [0.8, 0.4, 0.8],
                }}
                transition={{ repeat: Infinity, duration: 0.6 }}
              />
              <text x="95" y="13" fill="#a1a1aa" fontSize="9" fontFamily="monospace" fontWeight="bold">ACTIVE</text>

              {/* GPIO / LAN Link indicator */}
              <motion.circle
                cx="145"
                cy="10"
                r="6"
                fill="#3b82f6"
                animate={{
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
              />
              <text x="160" y="13" fill="#a1a1aa" fontSize="9" fontFamily="monospace" fontWeight="bold">LINK</text>
            </g>
          </svg>

          {/* Glowing bottom badge */}
          <div className="absolute bottom-3 text-[10px] font-mono font-extrabold tracking-widest px-2.5 py-1 bg-[#1e1e1e] border border-zinc-800 rounded text-[#D4A34A]">
            SPARKLE SR-100 • FIXED
          </div>
        </div>
      );

    case "scribe_400_printer":
      return (
        <div className={`relative flex items-center justify-center bg-zinc-950 rounded-2xl overflow-hidden p-6 aspect-4/3 border border-zinc-800 shadow-xl ${className}`}>
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4A34A]/20 via-transparent to-transparent pointer-events-none" />

          <svg viewBox="0 0 400 300" className="w-full h-full max-w-[280px]">
            {/* Main Printer Body (Heavy Carbon Black) */}
            <rect x="90" y="60" width="220" height="190" rx="12" fill="#1e1e1e" stroke="#3f3f46" strokeWidth="5" />
            
            {/* Viewport Window / Plexiglass */}
            <rect x="110" y="80" width="110" height="90" rx="8" fill="#121212" stroke="#52525b" strokeWidth="2" />
            
            {/* Internal ribbon roller drawing */}
            <g transform="translate(125, 95)" stroke="#3f3f46" strokeWidth="2">
              <circle cx="30" cy="30" r="22" fill="#09090b" />
              <circle cx="30" cy="30" r="10" fill="#71717a" />
              {/* Paper roll representation */}
              <path d="M 30,8 A 22,22 0 0,1 52,30 L 52,50" fill="none" stroke="#e4e4e7" strokeWidth="4" />
            </g>

            {/* Touchscreen UI panel */}
            <g transform="translate(235, 80)">
              <rect x="0" y="0" width="60" height="90" rx="6" fill="#09090b" stroke="#52525b" strokeWidth="2" />
              {/* Screen graphic */}
              <rect x="5" y="5" width="50" height="40" rx="2" fill="#1c1917" />
              <rect x="10" y="15" width="20" height="3" fill={sparkleGold} />
              <rect x="10" y="22" width="35" height="2" fill={sparkleGold} opacity="0.8" />
              <rect x="10" y="28" width="40" height="2" fill={sparkleGold} opacity="0.6" />
              {/* Touchscreen interactive buttons */}
              <circle cx="15" cy="65" r="4" fill="#ef4444" />
              <circle cx="30" cy="65" r="4" fill="#10b981" />
              <circle cx="45" cy="65" r="4" fill="#3b82f6" />
            </g>

            {/* Label Exit Slot */}
            <rect x="110" y="195" width="180" height="12" rx="4" fill="#09090b" stroke="#3f3f46" strokeWidth="2" />

            {/* Label Emerging (Animating when hovered) */}
            <motion.g
              transform="translate(130, 204)"
              animate={{
                y: isHovered ? [0, 15, 0] : 0,
              }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              {/* White adhesive paper tag */}
              <path d="M 0,0 L 0,25 Q 0,30 5,30 L 135,30 Q 140,30 140,25 L 140,0 Z" fill="#ffffff" />
              
              {/* RFID Antenna chip pattern printed on the label in Sparkle Gold */}
              <g transform="translate(25, 6)" stroke={sparkleGold} strokeWidth="1" fill="none">
                <rect x="0" y="0" width="90" height="15" rx="3" strokeWidth="1.5" />
                {/* Spiral RFID loop layout */}
                <path d="M 10,7 L 30,7 L 30,11 L 15,11 L 15,5 L 45,5 L 45,13 L 75,13" />
                <rect x="42" y="7" width="6" height="4" fill="#18181b" />
              </g>
            </motion.g>
          </svg>

          {/* Floating badge */}
          <div className="absolute bottom-3 text-[10px] font-mono font-extrabold tracking-widest px-2.5 py-1 bg-[#1e1e1e] border border-zinc-800 rounded text-[#D4A34A]">
            SCRIBE-400 • PRECISION
          </div>
        </div>
      );

    case "ranger_handheld_gun":
      return (
        <div className={`relative flex items-center justify-center bg-zinc-950 rounded-2xl overflow-hidden p-6 aspect-4/3 border border-zinc-800 shadow-xl ${className}`}>
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4A34A]/20 via-transparent to-transparent pointer-events-none" />

          <svg viewBox="0 0 400 300" className="w-full h-full max-w-[280px]">
            {/* Handheld Device - Circular Polarized Antenna on top */}
            <g transform="translate(130, 30)">
              {/* Antenna Housing in Graphite & Gold */}
              <polygon points="20,50 120,50 100,10 40,10" fill="#1e1e1e" stroke="#3f3f46" strokeWidth="3" />
              <rect x="50" y="20" width="40" height="20" rx="3" fill={sparkleGold} opacity="0.9" />
              
              {/* Focused Signal Waves (from handheld gun scanner) */}
              <motion.path
                d="M 10,0 Q 70,-30 130,0"
                fill="none"
                stroke={sparkleGold}
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.6"
                animate={{
                  y: isHovered ? [-5, -25, -5] : -10,
                  scale: isHovered ? [0.9, 1.2, 0.9] : 1,
                  opacity: isHovered ? [0.8, 0.1, 0.8] : 0.5,
                }}
                transition={signalTransition}
              />
              <motion.path
                d="M 30,-15 Q 70,-40 110,-15"
                fill="none"
                stroke="#fafafa"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.4"
                animate={{
                  y: isHovered ? [-10, -40, -10] : -22,
                  scale: isHovered ? [0.8, 1.3, 0.8] : 1,
                  opacity: isHovered ? [0.7, 0, 0.7] : 0.4,
                }}
                transition={{ ...signalTransition, delay: 0.7 }}
              />
            </g>

            {/* Alphanumeric Handheld Main Body */}
            <g transform="translate(160, 80)">
              {/* Rugged protective gold bumper */}
              <rect x="-10" y="0" width="100" height="150" rx="14" fill={sparkleGold} stroke="#b98a32" strokeWidth="2" />
              <rect x="-6" y="4" width="92" height="142" rx="10" fill="#1e1e1e" />

              {/* Android touchscreen display */}
              <rect x="4" y="10" width="72" height="70" rx="4" fill="#09090b" stroke="#3f3f46" strokeWidth="1.5" />
              
              {/* Scanning status text/chart on screen */}
              <g transform="translate(10, 20)">
                <text x="0" y="10" fill={sparkleGold} fontSize="8" fontFamily="monospace" fontWeight="bold">TAGS SCANNED</text>
                <motion.text
                  x="0"
                  y="28"
                  fill="#ffffff"
                  fontSize="15"
                  fontFamily="monospace"
                  fontWeight="bold"
                  animate={{
                    textShadow: isHovered ? "0 0 8px #D4A34A" : "none",
                  }}
                >
                  {isHovered ? "1,840/sec" : "STANDBY"}
                </motion.text>
                
                {/* RSSI Signal strength bar chart on android */}
                <rect x="0" y="40" width="52" height="14" rx="2" fill="#18181b" />
                <motion.rect
                  x="2"
                  y="42"
                  width={isHovered ? 48 : 20}
                  height="10"
                  rx="1"
                  fill="#10b981"
                  animate={{
                    width: isHovered ? [20, 48, 35, 48] : 20,
                  }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              </g>

              {/* Keyboard Grid */}
              <g fill="#3f3f46" transform="translate(10, 90)">
                <rect x="0" y="0" width="12" height="8" rx="1" />
                <rect x="18" y="0" width="12" height="8" rx="1" />
                <rect x="36" y="0" width="12" height="8" rx="1" />
                <rect x="54" y="0" width="12" height="8" rx="1" />
                
                <rect x="0" y="12" width="12" height="8" rx="1" />
                <rect x="18" y="12" width="12" height="8" rx="1" />
                <rect x="36" y="12" width="12" height="8" rx="1" />
                <rect x="54" y="12" width="12" height="8" rx="1" />

                <rect x="0" y="24" width="12" height="8" rx="1" />
                <rect x="18" y="24" width="12" height="8" rx="1" fill={sparkleGold} /> {/* GOLD TRIGGER */}
                <rect x="36" y="24" width="12" height="8" rx="1" />
                <rect x="54" y="24" width="12" height="8" rx="1" />
              </g>
            </g>

            {/* Pistol Grip trigger handle coming down */}
            <path d="M 190,200 L 175,260 L 210,260 L 215,200 Z" fill="#1e1e1e" stroke="#3f3f46" strokeWidth="2" />
            <rect x="165" y="200" width="12" height="24" rx="3" fill={sparkleGold} /> {/* Trigger button */}
          </svg>

          {/* Floating badge */}
          <div className="absolute bottom-3 text-[10px] font-mono font-extrabold tracking-widest px-2.5 py-1 bg-[#1e1e1e] border border-zinc-800 rounded text-[#D4A34A]">
            SPARKLE ST-301 • HANDHELD
          </div>
        </div>
      );

    case "signpost_antenna":
    default:
      return (
        <div className={`relative flex items-center justify-center bg-zinc-950 rounded-2xl overflow-hidden p-6 aspect-4/3 border border-zinc-800 shadow-xl ${className}`}>
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4A34A]/20 via-transparent to-transparent pointer-events-none" />

          <svg viewBox="0 0 400 300" className="w-full h-full max-w-[280px]">
            {/* Concentric radar beams emanating outward from high gain antenna */}
            <motion.circle
              cx="200"
              cy="150"
              r="120"
              fill="none"
              stroke={sparkleGold}
              strokeWidth="1.5"
              strokeDasharray="6,8"
              opacity="0.2"
              animate={{
                scale: isHovered ? [0.8, 1.25, 1.5] : [0.9, 1.1, 1.2],
                opacity: isHovered ? [0.4, 0.15, 0] : [0.3, 0.1, 0],
              }}
              transition={signalTransition}
            />
            <motion.circle
              cx="200"
              cy="150"
              r="80"
              fill="none"
              stroke={sparkleGold}
              strokeWidth="2"
              opacity="0.4"
              animate={{
                scale: isHovered ? [0.8, 1.2, 1.4] : [0.95, 1.05, 1.1],
                opacity: isHovered ? [0.6, 0.2, 0] : [0.5, 0.15, 0],
              }}
              transition={{ ...signalTransition, delay: 0.9 }}
            />

            {/* Heavy-duty wall mounting bracket behind */}
            <rect x="180" y="160" width="40" height="50" fill="#1e1e1e" rx="4" />
            <line x1="200" y1="210" x2="200" y2="245" stroke="#3f3f46" strokeWidth="12" strokeLinecap="round" />
            <circle cx="200" cy="245" r="14" fill="#09090b" />

            {/* Circular High Gain Panel Antenna in premium off-white & gold detailing */}
            <rect x="110" y="60" width="180" height="180" rx="20" fill="#27272a" stroke="#3f3f46" strokeWidth="6" />
            
            {/* Inner aesthetic casing lines */}
            <rect x="125" y="75" width="150" height="150" rx="12" fill="#1e1e1e" stroke="#27272a" strokeWidth="2" />
            
            {/* Signal target center graphic */}
            <circle cx="200" cy="150" r="30" fill="none" stroke={sparkleGold} strokeWidth="3" strokeDasharray="3,3" />
            <circle cx="200" cy="150" r="12" fill={sparkleGold} />
            
            {/* Tiny glowing green connection status light */}
            <circle cx="260" cy="210" r="4" fill="#10b981" />
            <circle cx="260" cy="210" r="8" fill="none" stroke="#10b981" strokeWidth="2" opacity="0.4" />
          </svg>

          {/* Floating badge */}
          <div className="absolute bottom-3 text-[10px] font-mono font-extrabold tracking-widest px-2.5 py-1 bg-[#1e1e1e] border border-zinc-800 rounded text-[#D4A34A]">
            SPARKLE SA-200 • 9.0 dBi
          </div>
        </div>
      );
  }
};
