import React from "react";
import { motion } from "motion/react";

interface SleekScannerGunProps {
  className?: string;
  isHovered?: boolean;
  pulseColor?: string;
}

export const SleekScannerGun: React.FC<SleekScannerGunProps> = ({
  className = "w-full h-full",
  isHovered = false,
  pulseColor = "#D4A34A",
}) => {
  return (
    <div className={`relative flex items-center justify-center p-4 ${className}`}>
      {/* Glow aura background */}
      <div className="absolute w-72 h-72 rounded-full bg-[#D4A34A]/5 blur-3xl pointer-events-none" />

      {/* SVG Canvas for the complex 3D-angled RFID scanner gun from the image */}
      <svg
        viewBox="0 0 500 450"
        className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="metal-dark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2d3135" />
            <stop offset="50%" stopColor="#1e2022" />
            <stop offset="100%" stopColor="#0f1011" />
          </linearGradient>
          
          <linearGradient id="grip-gray" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#43484d" />
            <stop offset="100%" stopColor="#1a1c1e" />
          </linearGradient>

          <linearGradient id="antenna-ribs" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#151719" />
            <stop offset="15%" stopColor="#2c3035" />
            <stop offset="50%" stopColor="#181a1c" />
            <stop offset="85%" stopColor="#2c3035" />
            <stop offset="100%" stopColor="#0f1011" />
          </linearGradient>

          <linearGradient id="screen-glare" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
            <stop offset="30%" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="31%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="sparkle-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F3E7C4" />
            <stop offset="50%" stopColor="#D4A34A" />
            <stop offset="100%" stopColor="#8F6317" />
          </linearGradient>

          {/* Android screen glowing galaxy gradient */}
          <linearGradient id="galaxy-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0d1b2a" />
            <stop offset="30%" stopColor="#1b263b" />
            <stop offset="70%" stopColor="#415a77" />
            <stop offset="100%" stopColor="#778da9" />
          </linearGradient>

          {/* Filter for shadows */}
          <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="2" dy="12" stdDeviation="8" floodColor="#000000" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* ================= BACKGROUND SCANNING WAVES ================= */}
        <g>
          {/* Concentric high-tech waves radiating forward from the ribbed antenna panel */}
          <motion.path
            d="M 40,220 C -20,170 -20,90 40,40"
            stroke={pulseColor}
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.3"
            animate={{
              scale: isHovered ? [0.95, 1.25, 0.95] : [1, 1.1, 1],
              opacity: isHovered ? [0.6, 0.1, 0.6] : 0.3,
              x: isHovered ? [-10, -40, -10] : 0,
            }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut" }}
          />
          <motion.path
            d="M 60,200 C 15,160 15,100 60,60"
            stroke={pulseColor}
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.5"
            animate={{
              scale: isHovered ? [0.95, 1.2, 0.95] : [1, 1.05, 1],
              opacity: isHovered ? [0.8, 0, 0.8] : 0.5,
              x: isHovered ? [-5, -20, -5] : 0,
            }}
            transition={{ repeat: Infinity, duration: 2.2, delay: 0.7, ease: "easeOut" }}
          />
          <motion.circle
            cx="100"
            cy="130"
            r="12"
            fill="none"
            stroke={pulseColor}
            strokeWidth="1"
            opacity="0.4"
            animate={{
              scale: [1, 2.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
        </g>

        {/* ================= DETAILED SCANNER GUN DRAWING ================= */}
        {/* We build the scanner in layers starting from back (Antenna panel) to front (Handle, Phone Screen) */}

        {/* 1. THE FRONT/BACK RFID ANTENNA PANEL (Ribbed box on the left, angled back) */}
        <g filter="url(#shadow)">
          {/* Base outer plate of antenna */}
          <path
            d="M 120,135 L 205,175 L 145,285 L 60,245 Z"
            fill="url(#metal-dark)"
            stroke="#3a3e42"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Rugged rubberized protective bezel around the antenna */}
          <path
            d="M 115,145 L 195,182 L 140,278 L 65,241 Z"
            fill="#141618"
            stroke="#26282a"
            strokeWidth="2.5"
          />

          {/* Deep Horizontal 3D-Shaded Ribs (as seen in the uploaded image) */}
          <g fill="url(#antenna-ribs)">
            {/* Rib 1 */}
            <path d="M 110,165 L 180,198 L 175,208 L 105,175 Z" />
            {/* Rib 2 */}
            <path d="M 100,183 L 170,216 L 165,226 L 95,193 Z" />
            {/* Rib 3 */}
            <path d="M 90,201 L 160,234 L 155,244 L 85,211 Z" />
            {/* Rib 4 */}
            <path d="M 80,219 L 150,252 L 145,262 L 75,229 Z" />
          </g>

          {/* Antenna panel outer highlight strip */}
          <path
            d="M 120,135 L 60,245"
            stroke="#4e5359"
            strokeWidth="2"
            opacity="0.5"
          />
        </g>

        {/* 2. THE MAIN GUN HANDLE (Matte-black rubberized grip extending down) */}
        <g filter="url(#shadow)">
          {/* Upper grip transition block */}
          <path
            d="M 210,178 L 275,210 L 260,250 L 200,215 Z"
            fill="#1b1c1e"
            stroke="#2a2c2f"
            strokeWidth="2"
          />

          {/* The pistol handle body */}
          <path
            d="M 220,210 L 285,380 C 285,395 260,405 240,405 C 225,405 215,395 210,380 L 190,240 Z"
            fill="url(#grip-gray)"
            stroke="#121314"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Rubber grip pattern on the back/front of the handle */}
          <path
            d="M 233,260 L 235,370 C 235,375 230,378 225,378 C 220,378 217,375 217,370 L 210,260"
            fill="#0c0d0e"
            opacity="0.8"
          />

          {/* Gold safety lanyard eyelet / bottom bumper */}
          <path
            d="M 235,395 C 235,405 265,405 265,395 Z"
            fill="url(#sparkle-gold-grad)"
            stroke="#9c752c"
            strokeWidth="1"
          />
          
          {/* Sparkle Gold Trigger Button (underneath screen/front of handle) */}
          <path
            d="M 195,218 C 190,218 185,224 185,230 C 185,236 193,242 198,242 L 202,230 Z"
            fill="url(#sparkle-gold-grad)"
            stroke="#b08432"
            strokeWidth="1.5"
          />
        </g>

        {/* 3. THE SMART ANDROID COMPUTER UNIT (Mounted flat on top, highly angled) */}
        <g filter="url(#shadow)">
          {/* Dark gray heavy base housing of the phone */}
          <path
            d="M 125,90 L 370,225 L 435,195 L 180,60 Z"
            fill="url(#metal-dark)"
            stroke="#3b3f43"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Glossy Android bezel casing */}
          <path
            d="M 132,87 L 368,217 L 427,189 L 182,59 Z"
            fill="#16181a"
            stroke="#2b2d30"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Rounded smartphone metallic trim strip */}
          <path
            d="M 130,90 C 130,80 145,72 155,75 L 415,185 C 425,188 430,195 425,200 Z"
            stroke="url(#sparkle-gold-grad)"
            strokeWidth="1.5"
            opacity="0.6"
            fill="none"
          />

          {/* Android Side Buttons (Sleek volume/power tactile keys on phone side) */}
          <g fill="#4e5359" stroke="#1d1e20" strokeWidth="1">
            {/* Button 1 */}
            <polygon points="152,70 162,65 166,72 156,77" />
            {/* Button 2 */}
            <polygon points="172,80 182,75 186,82 176,87" />
            {/* Button 3 */}
            <polygon points="192,90 202,85 206,92 196,97" />
          </g>

          {/* ================= HIGH-TECH SCREEN SCREEN GLOW ================= */}
          {/* Screen Content Window */}
          <path
            d="M 145,91 L 362,211 L 417,185 L 192,65 Z"
            fill="url(#galaxy-bg)"
            stroke="#090a0b"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* Cosmic Galaxy Wallpaper & Interface Details */}
          {/* Earth / Space glowing graphic background (resembling the user's uploaded image screen) */}
          <circle cx="340" cy="150" r="50" fill="#315c8e" opacity="0.6" filter="blur(15px)" />
          <circle cx="280" cy="120" r="40" fill="#4fa5d8" opacity="0.4" filter="blur(10px)" />
          <circle cx="200" cy="90" r="30" fill="#9d4edd" opacity="0.3" filter="blur(12px)" />

          {/* High-tech overlay grid on screen */}
          <path
            d="M 145,91 L 417,185 M 192,65 L 362,211"
            stroke="#ffffff"
            strokeWidth="0.5"
            opacity="0.1"
          />

          {/* Status Bar Indicators at the top of the phone screen (tilted) */}
          <g transform="translate(180, 52) rotate(22)">
            {/* Time / Wifi / Battery */}
            <text x="0" y="10" fill="#ffffff" fontSize="7" fontFamily="sans-serif" fontWeight="bold" opacity="0.8">5G</text>
            <rect x="18" y="4" width="10" height="5" rx="1" fill="#ffffff" opacity="0.8" />
            <rect x="29" y="3" width="1.5" height="7" fill="#ffffff" opacity="0.8" />
            <circle cx="38" cy="6" r="1.5" fill="#10b981" /> {/* Connected indicator */}
          </g>

          {/* Mock App Icons (Tilted, aligned to phone screen) */}
          <g transform="translate(230, 95) rotate(22)" opacity="0.9">
            {/* App Icon 1 (Gold Sparkle) */}
            <rect x="0" y="0" width="14" height="14" rx="3" fill="#D4A34A" />
            <polygon points="7,2 10,7 12,7 9,10 7,12 5,10 2,7 4,7" fill="#121212" transform="scale(0.8) translate(1, 1)" />

            {/* App Icon 2 (Database Green) */}
            <rect x="20" y="0" width="14" height="14" rx="3" fill="#10b981" />
            <rect x="23" y="3" width="8" height="2" fill="#ffffff" />
            <rect x="23" y="6" width="8" height="2" fill="#ffffff" />
            <rect x="23" y="9" width="8" height="2" fill="#ffffff" />

            {/* App Icon 3 (Blue Communication) */}
            <rect x="40" y="0" width="14" height="14" rx="3" fill="#3b82f6" />
            <circle cx="47" cy="7" r="3" fill="#ffffff" />
          </g>

          {/* Dynamic real-time RFID RSSI Signal Chart overlay (pulsing when hovered) */}
          <g transform="translate(195, 125) rotate(22)">
            <text x="0" y="0" fill={pulseColor} fontSize="8" fontFamily="monospace" fontWeight="bold">
              {isHovered ? "SECURE SCAN" : "CALIBRATING"}
            </text>
            <motion.text
              x="0"
              y="12"
              fill="#ffffff"
              fontSize="12"
              fontFamily="monospace"
              fontWeight="black"
              animate={{
                textShadow: isHovered ? "0 0 10px #D4A34A, 0 0 20px #D4A34A" : "none",
              }}
            >
              {isHovered ? "RSSI: -45dBm" : "STANDBY"}
            </motion.text>
            
            {/* Animated bar graph representing actual scans */}
            <g fill={pulseColor}>
              <motion.rect
                x="0"
                y="18"
                width="3"
                height="8"
                animate={{ height: isHovered ? [8, 18, 5, 12, 8] : 8 }}
                transition={{ repeat: Infinity, duration: 1.2, delay: 0.1 }}
              />
              <motion.rect
                x="5"
                y="18"
                width="3"
                height="12"
                animate={{ height: isHovered ? [12, 6, 22, 10, 12] : 12 }}
                transition={{ repeat: Infinity, duration: 1.2, delay: 0.3 }}
              />
              <motion.rect
                x="10"
                y="18"
                width="3"
                height="15"
                animate={{ height: isHovered ? [15, 25, 12, 18, 15] : 15 }}
                transition={{ repeat: Infinity, duration: 1.2, delay: 0.5 }}
              />
              <motion.rect
                x="15"
                y="18"
                width="3"
                height="6"
                animate={{ height: isHovered ? [6, 12, 4, 15, 6] : 6 }}
                transition={{ repeat: Infinity, duration: 1.2, delay: 0.7 }}
              />
            </g>
          </g>

          {/* Glass Glare reflection overlay on top of screen */}
          <path
            d="M 145,91 L 362,211 L 417,185 L 192,65 Z"
            fill="url(#screen-glare)"
            pointerEvents="none"
          />
        </g>
      </svg>
    </div>
  );
};
