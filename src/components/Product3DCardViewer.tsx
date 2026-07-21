import React, { useRef, useState, useEffect } from "react";
import { Compass, RotateCw } from "lucide-react";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Face {
  indices: number[];
  color: string;
  outlineColor: string;
  isGlowing?: boolean;
}

interface ModelData {
  vertices: Point3D[];
  faces: Face[];
}

interface Product3DCardViewerProps {
  productId: string;
  theme?: "light" | "dark";
  height?: number;
}

const MODELS: Record<string, ModelData> = {
  "sparkle-sr-100-reader": {
    vertices: [
      { x: -90, y: -15, z: -70 }, { x: 90, y: -15, z: -70 }, { x: 90, y: 15, z: -70 }, { x: -90, y: 15, z: -70 },
      { x: -90, y: -15, z: 70 }, { x: 90, y: -15, z: 70 }, { x: 90, y: 15, z: 70 }, { x: -90, y: 15, z: 70 },
      { x: -60, y: -5, z: -75 }, { x: -45, y: -5, z: -75 }, { x: -45, y: 5, z: -75 }, { x: -60, y: 5, z: -75 },
      { x: 45, y: -5, z: -75 }, { x: 60, y: -5, z: -75 }, { x: 60, y: 5, z: -75 }, { x: 45, y: 5, z: -75 },
      { x: -15, y: 16, z: -15 }, { x: 15, y: 16, z: -15 }, { x: 15, y: 16, z: 15 }, { x: -15, y: 16, z: 15 },
      { x: -15, y: 19, z: -15 }, { x: 15, y: 19, z: 15 }, { x: 15, y: 19, z: 15 }, { x: -15, y: 19, z: 15 },
    ],
    faces: [
      { indices: [0, 1, 2, 3], color: "rgba(30, 30, 30, 0.8)", outlineColor: "rgba(217, 28, 255, 0.2)" },
      { indices: [4, 5, 6, 7], color: "rgba(38, 38, 38, 0.8)", outlineColor: "rgba(217, 28, 255, 0.3)" },
      { indices: [0, 1, 5, 4], color: "rgba(26, 26, 26, 0.8)", outlineColor: "rgba(217, 28, 255, 0.2)" },
      { indices: [2, 3, 7, 6], color: "rgba(42, 42, 42, 0.85)", outlineColor: "rgba(217, 28, 255, 0.45)" },
      { indices: [0, 3, 7, 4], color: "rgba(34, 34, 34, 0.8)", outlineColor: "rgba(217, 28, 255, 0.2)" },
      { indices: [1, 2, 6, 5], color: "rgba(34, 34, 34, 0.8)", outlineColor: "rgba(217, 28, 255, 0.2)" },
      { indices: [8, 9, 10, 11], color: "rgba(212, 163, 74, 0.7)", outlineColor: "#D4A34A" },
      { indices: [12, 13, 14, 15], color: "rgba(212, 163, 74, 0.7)", outlineColor: "#D4A34A" },
      { indices: [16, 17, 21, 20], color: "rgba(212, 163, 74, 0.9)", outlineColor: "#D4A34A", isGlowing: true },
      { indices: [17, 18, 22, 21], color: "rgba(185, 138, 50, 0.9)", outlineColor: "#B98A32" },
      { indices: [18, 19, 23, 22], color: "rgba(212, 163, 74, 0.9)", outlineColor: "#D4A34A" },
      { indices: [19, 16, 20, 23], color: "rgba(185, 138, 50, 0.9)", outlineColor: "#B98A32" },
      { indices: [20, 21, 22, 23], color: "#D4A34A", outlineColor: "#FFFFFF", isGlowing: true },
    ]
  },
  "sparkle-scribe-400-printer": {
    vertices: [
      { x: -70, y: -30, z: -80 }, { x: 70, y: -30, z: -80 }, { x: 70, y: 30, z: -80 }, { x: -70, y: 30, z: -80 },
      { x: -70, y: -30, z: 80 }, { x: 70, y: -30, z: 80 }, { x: 70, y: 30, z: 80 }, { x: -70, y: 30, z: 80 },
      { x: -65, y: 30, z: -70 }, { x: 65, y: 30, z: -70 }, { x: 65, y: 65, z: -40 }, { x: -65, y: 65, z: -40 },
      { x: -65, y: 30, z: 10 }, { x: 65, y: 30, z: 10 }, { x: 65, y: 65, z: -10 }, { x: -65, y: 65, z: -10 },
      { x: -30, y: -10, z: 81 }, { x: 30, y: -10, z: 81 }, { x: 30, y: -25, z: 110 }, { x: -30, y: -25, z: 110 }
    ],
    faces: [
      { indices: [0, 1, 2, 3], color: "rgba(28, 28, 28, 0.8)", outlineColor: "rgba(217, 28, 255, 0.2)" },
      { indices: [4, 5, 6, 7], color: "rgba(34, 34, 34, 0.8)", outlineColor: "rgba(217, 28, 255, 0.3)" },
      { indices: [0, 1, 5, 4], color: "rgba(20, 20, 20, 0.8)", outlineColor: "rgba(217, 28, 255, 0.15)" },
      { indices: [2, 3, 7, 6], color: "rgba(40, 40, 40, 0.85)", outlineColor: "rgba(217, 28, 255, 0.4)" },
      { indices: [0, 3, 7, 4], color: "rgba(30, 30, 30, 0.8)", outlineColor: "rgba(217, 28, 255, 0.2)" },
      { indices: [1, 2, 6, 5], color: "rgba(30, 30, 30, 0.8)", outlineColor: "rgba(217, 28, 255, 0.2)" },
      { indices: [8, 9, 10, 11], color: "rgba(45, 45, 45, 0.8)", outlineColor: "rgba(217, 28, 255, 0.25)" },
      { indices: [12, 13, 14, 15], color: "rgba(45, 45, 45, 0.8)", outlineColor: "rgba(217, 28, 255, 0.25)" },
      { indices: [10, 11, 15, 14], color: "rgba(50, 50, 50, 0.85)", outlineColor: "rgba(217, 28, 255, 0.35)" },
      { indices: [8, 12, 15, 11], color: "rgba(38, 38, 38, 0.8)", outlineColor: "rgba(217, 28, 255, 0.2)" },
      { indices: [9, 13, 14, 10], color: "rgba(38, 38, 38, 0.8)", outlineColor: "rgba(217, 28, 255, 0.2)" },
      { indices: [16, 17, 18, 19], color: "rgba(212, 163, 74, 0.85)", outlineColor: "#FFFFFF", isGlowing: true }
    ]
  },
  "sparkle-st-301-handheld": {
    vertices: [
      { x: -12, y: -70, z: -15 }, { x: 12, y: -70, z: -15 }, { x: 12, y: 0, z: -15 }, { x: -12, y: 0, z: -15 },
      { x: -12, y: -70, z: 15 }, { x: 12, y: -70, z: 15 }, { x: 12, y: 0, z: 15 }, { x: -12, y: 0, z: 15 },
      { x: -25, y: 0, z: -70 }, { x: 25, y: 0, z: -70 }, { x: 25, y: 30, z: -70 }, { x: -25, y: 30, z: -70 },
      { x: -25, y: 0, z: 60 }, { x: 25, y: 0, z: 60 }, { x: 25, y: 30, z: 60 }, { x: -25, y: 30, z: 60 },
      { x: -3, y: 30, z: 30 }, { x: 3, y: 30, z: 30 },
      { x: -18, y: 55, z: 35 }, { x: 18, y: 55, z: 35 },
      { x: -18, y: 80, z: 35 }, { x: 18, y: 80, z: 35 },
      { x: -3, y: 95, z: 30 }, { x: 3, y: 95, z: 30 }
    ],
    faces: [
      { indices: [0, 1, 2, 3], color: "rgba(24, 24, 24, 0.8)", outlineColor: "rgba(217, 28, 255, 0.15)" },
      { indices: [4, 5, 6, 7], color: "rgba(30, 30, 30, 0.8)", outlineColor: "rgba(217, 28, 255, 0.15)" },
      { indices: [0, 1, 5, 4], color: "rgba(18, 18, 18, 0.8)", outlineColor: "rgba(217, 28, 255, 0.1)" },
      { indices: [2, 3, 7, 6], color: "rgba(36, 36, 36, 0.8)", outlineColor: "rgba(217, 28, 255, 0.2)" },
      { indices: [0, 3, 7, 4], color: "rgba(26, 26, 26, 0.8)", outlineColor: "rgba(217, 28, 255, 0.15)" },
      { indices: [1, 2, 6, 5], color: "rgba(26, 26, 26, 0.8)", outlineColor: "rgba(217, 28, 255, 0.15)" },
      { indices: [8, 9, 10, 11], color: "rgba(28, 28, 28, 0.85)", outlineColor: "rgba(217, 28, 255, 0.25)" },
      { indices: [12, 13, 14, 15], color: "rgba(32, 32, 32, 0.85)", outlineColor: "rgba(217, 28, 255, 0.3)" },
      { indices: [8, 9, 13, 12], color: "rgba(22, 22, 22, 0.8)", outlineColor: "rgba(217, 28, 255, 0.15)" },
      { indices: [10, 11, 15, 14], color: "rgba(44, 44, 44, 0.9)", outlineColor: "rgba(217, 28, 255, 0.5)" },
      { indices: [8, 11, 15, 12], color: "rgba(26, 26, 26, 0.8)", outlineColor: "rgba(217, 28, 255, 0.2)" },
      { indices: [9, 10, 14, 13], color: "rgba(26, 26, 26, 0.8)", outlineColor: "rgba(217, 28, 255, 0.2)" },
      { indices: [16, 18, 20, 22, 23, 21, 19, 17], color: "rgba(212, 163, 74, 0.1)", outlineColor: "#D4A34A", isGlowing: true }
    ]
  },
  "sparkle-sa-200-antenna": {
    vertices: [
      { x: -80, y: -80, z: -6 }, { x: 80, y: -80, z: -6 }, { x: 80, y: 80, z: -6 }, { x: -80, y: 80, z: -6 },
      { x: -80, y: -80, z: 6 }, { x: 80, y: -80, z: 6 }, { x: 80, y: 80, z: 6 }, { x: -80, y: 80, z: 6 },
      { x: -20, y: -20, z: -25 }, { x: 20, y: -20, z: -25 }, { x: 20, y: 20, z: -25 }, { x: -20, y: 20, z: -25 },
      { x: -20, y: -20, z: -7 }, { x: 20, y: -20, z: -7 }, { x: 20, y: 20, z: -7 }, { x: -20, y: 20, z: -7 }
    ],
    faces: [
      { indices: [0, 1, 2, 3], color: "rgba(22, 22, 22, 0.8)", outlineColor: "rgba(217, 28, 255, 0.15)" },
      { indices: [4, 5, 6, 7], color: "rgba(40, 40, 40, 0.9)", outlineColor: "rgba(217, 28, 255, 0.55)", isGlowing: true },
      { indices: [0, 1, 5, 4], color: "rgba(28, 28, 28, 0.8)", outlineColor: "rgba(217, 28, 255, 0.2)" },
      { indices: [2, 3, 7, 6], color: "rgba(28, 28, 28, 0.8)", outlineColor: "rgba(217, 28, 255, 0.2)" },
      { indices: [0, 3, 7, 4], color: "rgba(28, 28, 28, 0.8)", outlineColor: "rgba(217, 28, 255, 0.2)" },
      { indices: [1, 2, 6, 5], color: "rgba(28, 28, 28, 0.8)", outlineColor: "rgba(217, 28, 255, 0.2)" },
      { indices: [8, 9, 10, 11], color: "rgba(212, 163, 74, 0.2)", outlineColor: "#D4A34A" },
      { indices: [8, 9, 13, 12], color: "rgba(185, 138, 50, 0.4)", outlineColor: "#B98A32" },
      { indices: [10, 11, 15, 14], color: "rgba(185, 138, 50, 0.4)", outlineColor: "#B98A32" }
    ]
  }
};

export const Product3DCardViewer: React.FC<Product3DCardViewerProps> = ({
  productId,
  theme = "dark",
  height = 220
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rx, setRx] = useState(0.4);
  const [ry, setRy] = useState(0.6);
  const [targetRx, setTargetRx] = useState(0.4);
  const [targetRy, setTargetRy] = useState(0.6);
  const [isHovered, setIsHovered] = useState(false);

  // Fallback pattern if explicit model is missing (e.g. for tags or custom tray)
  const activeProductId = MODELS[productId] ? productId : "sparkle-sr-100-reader";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const render = () => {
      let currentRx = rx;
      let currentRy = ry;

      if (!isHovered) {
        const nextRy = (ry + 0.005) % (Math.PI * 2);
        setRy(nextRy);
        setTargetRy(nextRy);
        currentRy = nextRy;
      } else {
        const speed = 0.08;
        const diffRx = targetRx - rx;
        const diffRy = targetRy - ry;

        const nextRx = rx + diffRx * speed;
        const nextRy = ry + diffRy * speed;

        setRx(nextRx);
        setRy(nextRy);
        currentRx = nextRx;
        currentRy = nextRy;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width / window.devicePixelRatio;
      const heightVal = canvas.height / window.devicePixelRatio;
      const cx = width / 2;
      const cy = heightVal / 2;

      // Draw subtle scanner background details
      ctx.strokeStyle = "rgba(217, 28, 255, 0.04)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, 75, 0, Math.PI * 2);
      ctx.stroke();

      const model = MODELS[activeProductId];
      const { vertices, faces } = model;

      const cosX = Math.cos(currentRx);
      const sinX = Math.sin(currentRx);
      const cosY = Math.cos(currentRy);
      const sinY = Math.sin(currentRy);

      const fov = 200; // smaller fov to fit inside card beautifully
      const cameraDistance = 240;

      const projected = vertices.map(v => {
        let x1 = v.x * cosY - v.z * sinY;
        let z1 = v.x * sinY + v.z * cosY;

        let y2 = v.y * cosX - z1 * sinX;
        let z2 = v.y * sinX + z1 * cosX;

        const scale = fov / (z2 + cameraDistance);
        return {
          x: cx + x1 * scale,
          y: cy + y2 * scale,
          z: z2
        };
      });

      const faceDepths = faces.map((face, index) => {
        let sumZ = 0;
        face.indices.forEach(idx => {
          sumZ += projected[idx].z;
        });
        return { index, avgZ: sumZ / face.indices.length };
      });
      faceDepths.sort((a, b) => b.avgZ - a.avgZ);

      faceDepths.forEach(fd => {
        const face = faces[fd.index];
        const points = face.indices.map(idx => projected[idx]);

        if (face.indices.length >= 3) {
          let fillStyle = face.color;
          let strokeStyle = face.outlineColor;

          if (theme === "light") {
            if (face.color.startsWith("rgba(3") || face.color.startsWith("rgba(2") || face.color.startsWith("rgba(4")) {
              fillStyle = "rgba(242, 242, 242, 0.8)";
            }
            if (face.outlineColor.startsWith("rgba(217, 28, 255")) {
              strokeStyle = "rgba(217, 28, 255, 0.35)";
            }
          }

          ctx.fillStyle = fillStyle;
          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);
          for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
          }
          ctx.closePath();
          ctx.fill();

          ctx.strokeStyle = strokeStyle;
          ctx.lineWidth = face.isGlowing ? 1.2 : 0.6;
          ctx.stroke();
        }
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [activeProductId, rx, ry, targetRx, targetRy, isHovered, theme]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const dx = mx - rect.width / 2;
    const dy = my - rect.height / 2;

    setTargetRx((dy / rect.height) * Math.PI);
    setTargetRy((dx / rect.width) * Math.PI * 2);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTargetRx(0.4);
  };

  const isDark = theme === "dark";

  return (
    <div 
      className={`w-full rounded-2xl border overflow-hidden relative transition-all duration-300 ${
        isDark ? "bg-zinc-950/70 border-zinc-800" : "bg-zinc-100/50 border-zinc-200"
      }`}
      style={{ height: `${height}px` }}
    >
      <div className={`absolute inset-0 bg-scanner-grid ${isDark ? "opacity-[0.06]" : "opacity-[0.03]"}`} />
      
      {/* Laser horizontal swipe animation */}
      <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-gradient-to-r from-carbon-violet/20 to-transparent pointer-events-none" style={{ left: "50%", animation: "pulse 2.5s infinite" }} />
      
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full cursor-grab active:cursor-grabbing relative z-10"
      />
      
      <div className={`absolute bottom-3 right-3 z-10 flex items-center gap-1 text-[8px] font-mono font-bold uppercase tracking-wider select-none ${
        isDark ? "text-zinc-600" : "text-zinc-400"
      }`}>
        <Compass className="w-3 h-3" />
        <span>Orbit</span>
      </div>
    </div>
  );
};
