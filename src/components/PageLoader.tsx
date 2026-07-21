import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { SparkleLogo } from "./SparkleLogo";
import { Cpu } from "lucide-react";

interface PageLoaderProps {
  onComplete: () => void;
}

const READOUTS = [
  "INITIALIZING PORTAL CORE...",
  "CONNECTING SECURE GATEWAYS...",
  "TUNING UHF CARRIER WAVES (860-960 MHz)...",
  "ESTABLISHING CRYPTOGRAPHIC HANDSHAKES...",
  "CALIBRATING RSSI NOISE REJECTION...",
  "OPTIMIZING ANTENNA BEAM PROFILES...",
  "EPC GLOBAL DIRECTORY VERIFIED",
  "PORTAL SYNCHRONIZED"
];

export const PageLoader: React.FC<PageLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [readoutIndex, setReadoutIndex] = useState(0);

  useEffect(() => {
    // Simulate premium holographic system calibration
    const duration = 2500; // 2.5 seconds total
    const intervalTime = 25;
    const steps = duration / intervalTime;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      const currentProgress = Math.min(100, Math.floor((stepCount / steps) * 100));
      setProgress(currentProgress);

      // Map progress to current technical log message
      const textIdx = Math.min(
        READOUTS.length - 1,
        Math.floor((currentProgress / 100) * READOUTS.length)
      );
      setReadoutIndex(textIdx);

      if (stepCount >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          onComplete();
        }, 600); // short pause at 100% for transition pacing
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 z-50 bg-zinc-950 flex flex-col items-center justify-center p-6 select-none overflow-hidden"
    >
      {/* Background Holographic Scan Patterns */}
      <div className="absolute inset-0 bg-scanner-grid opacity-10" />
      
      {/* Concentric rotating design lines */}
      <div className="absolute w-[450px] h-[450px] rounded-full border border-carbon-violet/5 animate-spin-slow pointer-events-none" />
      <div className="absolute w-[350px] h-[350px] rounded-full border border-rfid-gold/5 animate-spin" style={{ animationDuration: "25s", animationDirection: "reverse" }} />

      <div className="space-y-10 flex flex-col items-center relative z-10 max-w-sm w-full text-center">
        
        {/* Core Brand Mark */}
        <div className="relative p-8 bg-zinc-900/40 rounded-3xl border border-zinc-800/80 shadow-glow-violet backdrop-blur-md flex items-center justify-center w-36 h-36">
          <SparkleLogo variant="dark" size={72} showText={false} className="relative z-10" />
          
          {/* Radar sweep light effect */}
          <div className="absolute inset-0 rounded-3xl border border-carbon-violet/25 animate-ping" style={{ animationDuration: "3s" }} />
        </div>

        {/* Loading Progress Stats */}
        <div className="space-y-4 w-full">
          <div className="space-y-1">
            <span className="text-3xl font-display font-black text-white tracking-widest block text-glow-violet">
              {progress}%
            </span>
            <span className="text-[9px] font-mono font-bold text-rfid-gold tracking-[0.25em] uppercase block">
              System Calibrating
            </span>
          </div>

          {/* Golden/Violet Gradient Progress Bar */}
          <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800/50">
            <motion.div
              className="h-full bg-gradient-to-r from-rfid-gold to-carbon-violet"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeInOut" }}
            />
          </div>

          {/* Running technical readouts */}
          <div className="flex items-center justify-center gap-2 text-[9px] font-mono text-zinc-500 font-bold tracking-wider h-6">
            <Cpu className="w-3 h-3 text-carbon-violet animate-pulse" />
            <span className="w-[280px] truncate text-center">{READOUTS[readoutIndex]}</span>
          </div>
        </div>

      </div>

      {/* Corporate Watermark Footer */}
      <div className="absolute bottom-8 text-[8px] font-mono text-zinc-600 font-bold uppercase tracking-[0.3em] text-center select-none">
        Sparkle RFID © 2026 Portal Authorization Required
      </div>
    </motion.div>
  );
};
