import React from "react";

interface SparkleLogoProps {
  className?: string;
  size?: number;
  variant?: "light" | "dark" | "gold-only";
  showText?: boolean;
}

export const SparkleLogo: React.FC<SparkleLogoProps> = ({
  className = "",
  size = 40,
  variant = "light",
  showText = true,
}) => {
  // variant === "dark" renders on dark background (uses light logo)
  // variant === "light" renders on light background (uses dark logo)
  const logoSrc = variant === "dark" ? "/logo_light-transprent.png" : "/logo_dark.png";

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <img
        src={logoSrc}
        alt="Sparkle RFID Logo"
        style={{ width: `${size * 1.25}px`, height: `${size * 1.25}px` }}
        className="shrink-0 object-contain transition-transform duration-300 hover:scale-105"
      />
      {showText && (
        <div className="flex flex-col justify-center">
          <span className={`font-display font-black tracking-[0.12em] text-sm md:text-base uppercase ${variant === "dark" ? "text-white" : "text-zinc-955"
            } leading-none`}>
            SPARKLE
          </span>
          <span className="font-mono text-[8px] md:text-[9px] font-bold text-[#D4A34A] tracking-[0.35em] uppercase leading-none mt-1">
            RFID
          </span>
        </div>
      )}
    </div>
  );
};
