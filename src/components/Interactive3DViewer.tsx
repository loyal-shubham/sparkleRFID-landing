import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Compass, Cpu, Maximize2, MousePointerClick, Zap, RefreshCw } from "lucide-react";
import { Product } from "../types";

// --- 3D Vector types ---
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

interface Hotspot {
  name: string;
  desc: string;
  pos: Point3D;
}

interface ModelData {
  vertices: Point3D[];
  faces: Face[];
  hotspots: Hotspot[];
}

interface Interactive3DViewerProps {
  products: Product[];
  selectedProductId?: string;
  onAddToQuote?: (product: Product, qty: number) => void;
  theme?: "light" | "dark";
}

export const Interactive3DViewer: React.FC<Interactive3DViewerProps> = ({
  products,
  selectedProductId = "sparkle-sr-100-reader",
  onAddToQuote,
  theme = "dark"
}) => {
  const [activeProductId, setActiveProductId] = useState<string>(selectedProductId);
  const activeProduct = products.find(p => p.id === activeProductId) || products[0];

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rx, setRx] = useState(0.4); // rotation pitch (X)
  const [ry, setRy] = useState(0.6); // rotation yaw (Y)
  const [targetRx, setTargetRx] = useState(0.4);
  const [targetRy, setTargetRy] = useState(0.6);
  const [isHovered, setIsHovered] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [hoveredHotspot, setHoveredHotspot] = useState<Hotspot | null>(null);
  const [projectedHotspots, setProjectedHotspots] = useState<Array<{ hotspot: Hotspot; x: number; y: number; isBack: boolean }>>([]);

  // Synergize selected product with props updates (e.g. from catalog click)
  useEffect(() => {
    if (selectedProductId) {
      setActiveProductId(selectedProductId);
    }
  }, [selectedProductId]);

  // Define 3D Meshes
  const models: Record<string, ModelData> = {
    // 1. SR-100 FIXED READER
    "sparkle-sr-100-reader": {
      vertices: [
        // Box Base (8 vertices)
        { x: -90, y: -15, z: -70 }, { x: 90, y: -15, z: -70 }, { x: 90, y: 15, z: -70 }, { x: -90, y: 15, z: -70 },
        { x: -90, y: -15, z: 70 }, { x: 90, y: -15, z: 70 }, { x: 90, y: 15, z: 70 }, { x: -90, y: 15, z: 70 },
        // Ports on the back (RP-TNC - 8 vertices)
        { x: -60, y: -5, z: -75 }, { x: -45, y: -5, z: -75 }, { x: -45, y: 5, z: -75 }, { x: -60, y: 5, z: -75 },
        { x: 45, y: -5, z: -75 }, { x: 60, y: -5, z: -75 }, { x: 60, y: 5, z: -75 }, { x: 45, y: 5, z: -75 },
        // Central Gold Node (8 vertices)
        { x: -15, y: 16, z: -15 }, { x: 15, y: 16, z: -15 }, { x: 15, y: 16, z: 15 }, { x: -15, y: 16, z: 15 },
        { x: -15, y: 19, z: -15 }, { x: 15, y: 19, z: -15 }, { x: 15, y: 19, z: 15 }, { x: -15, y: 19, z: 15 },
      ],
      faces: [
        // Base Box
        { indices: [0, 1, 2, 3], color: "rgba(30, 30, 30, 0.8)", outlineColor: "rgba(217, 28, 255, 0.2)" }, // Back
        { indices: [4, 5, 6, 7], color: "rgba(38, 38, 38, 0.8)", outlineColor: "rgba(217, 28, 255, 0.3)" }, // Front
        { indices: [0, 1, 5, 4], color: "rgba(26, 26, 26, 0.8)", outlineColor: "rgba(217, 28, 255, 0.2)" }, // Bottom
        { indices: [2, 3, 7, 6], color: "rgba(42, 42, 42, 0.85)", outlineColor: "rgba(217, 28, 255, 0.45)" }, // Top
        { indices: [0, 3, 7, 4], color: "rgba(34, 34, 34, 0.8)", outlineColor: "rgba(217, 28, 255, 0.2)" }, // Left
        { indices: [1, 2, 6, 5], color: "rgba(34, 34, 34, 0.8)", outlineColor: "rgba(217, 28, 255, 0.2)" }, // Right
        // Back port 1
        { indices: [8, 9, 10, 11], color: "rgba(212, 163, 74, 0.7)", outlineColor: "#D4A34A" },
        // Back port 2
        { indices: [12, 13, 14, 15], color: "rgba(212, 163, 74, 0.7)", outlineColor: "#D4A34A" },
        // Gold core floating rect
        { indices: [16, 17, 21, 20], color: "rgba(212, 163, 74, 0.9)", outlineColor: "#D4A34A", isGlowing: true },
        { indices: [17, 18, 22, 21], color: "rgba(185, 138, 50, 0.9)", outlineColor: "#B98A32" },
        { indices: [18, 19, 23, 22], color: "rgba(212, 163, 74, 0.9)", outlineColor: "#D4A34A" },
        { indices: [19, 16, 20, 23], color: "rgba(185, 138, 50, 0.9)", outlineColor: "#B98A32" },
        { indices: [20, 21, 22, 23], color: "#D4A34A", outlineColor: "#FFFFFF", isGlowing: true },
      ],
      hotspots: [
        { name: "4x RP-TNC Ports", desc: "Multi-antenna connectors engineered for secure coax linkages with under-counter scan pads.", pos: { x: 52, y: 0, z: -75 } },
        { name: "Anodized Casing", desc: "Heavy-duty thermal aluminum chassis providing heat dissipation and IP53 environmental protection.", pos: { x: -90, y: 0, z: 0 } },
        { name: "Intelligent Security Core", desc: "Micro-node hosting dynamic anticollision algorithms to bypass metal and liquid scan blockages.", pos: { x: 0, y: 20, z: 0 } }
      ]
    },
    // 2. SCRIBE-400 PRINTER
    "sparkle-scribe-400-printer": {
      vertices: [
        // Main block base (8 vertices)
        { x: -70, y: -30, z: -80 }, { x: 70, y: -30, z: -80 }, { x: 70, y: 30, z: -80 }, { x: -70, y: 30, z: -80 },
        { x: -70, y: -30, z: 80 }, { x: 70, y: -30, z: 80 }, { x: 70, y: 30, z: 80 }, { x: -70, y: 30, z: 80 },
        // Cylindrical Cover at back top (8 vertices)
        { x: -65, y: 30, z: -70 }, { x: 65, y: 30, z: -70 }, { x: 65, y: 65, z: -40 }, { x: -65, y: 65, z: -40 },
        { x: -65, y: 30, z: 10 }, { x: 65, y: 30, z: 10 }, { x: 65, y: 65, z: -10 }, { x: -65, y: 65, z: -10 },
        // Label out of slot (4 vertices)
        { x: -30, y: -10, z: 81 }, { x: 30, y: -10, z: 81 }, { x: 30, y: -25, z: 110 }, { x: -30, y: -25, z: 110 }
      ],
      faces: [
        // Base Box
        { indices: [0, 1, 2, 3], color: "rgba(28, 28, 28, 0.8)", outlineColor: "rgba(217, 28, 255, 0.2)" },
        { indices: [4, 5, 6, 7], color: "rgba(34, 34, 34, 0.8)", outlineColor: "rgba(217, 28, 255, 0.3)" },
        { indices: [0, 1, 5, 4], color: "rgba(20, 20, 20, 0.8)", outlineColor: "rgba(217, 28, 255, 0.15)" },
        { indices: [2, 3, 7, 6], color: "rgba(40, 40, 40, 0.85)", outlineColor: "rgba(217, 28, 255, 0.4)" },
        { indices: [0, 3, 7, 4], color: "rgba(30, 30, 30, 0.8)", outlineColor: "rgba(217, 28, 255, 0.2)" },
        { indices: [1, 2, 6, 5], color: "rgba(30, 30, 30, 0.8)", outlineColor: "rgba(217, 28, 255, 0.2)" },
        // Cylinder Roll housing
        { indices: [8, 9, 10, 11], color: "rgba(45, 45, 45, 0.8)", outlineColor: "rgba(217, 28, 255, 0.25)" },
        { indices: [12, 13, 14, 15], color: "rgba(45, 45, 45, 0.8)", outlineColor: "rgba(217, 28, 255, 0.25)" },
        { indices: [10, 11, 15, 14], color: "rgba(50, 50, 50, 0.85)", outlineColor: "rgba(217, 28, 255, 0.35)" },
        { indices: [8, 12, 15, 11], color: "rgba(38, 38, 38, 0.8)", outlineColor: "rgba(217, 28, 255, 0.2)" },
        { indices: [9, 13, 14, 10], color: "rgba(38, 38, 38, 0.8)", outlineColor: "rgba(217, 28, 255, 0.2)" },
        // Label strip
        { indices: [16, 17, 18, 19], color: "rgba(212, 163, 74, 0.85)", outlineColor: "#FFFFFF", isGlowing: true }
      ],
      hotspots: [
        { name: "300 DPI Print Head", desc: "Ultra-fine thermal graphic node calibrated to align barcodes and text onto micro jewelry rings.", pos: { x: 0, y: -10, z: 81 } },
        { name: "Adaptive RFID Writer", desc: "Internal smart coupler encoding EPC chip codes with verification loop prior to print ejection.", pos: { x: 0, y: 10, z: 0 } },
        { name: "Ribbon Feed Spindle", desc: "450-meter heavy metal core built for continuous roll configurations and smooth industrial print runs.", pos: { x: 0, y: 48, z: -35 } }
      ]
    },
    // 3. ST-301 HANDHELD SCANNER
    "sparkle-st-301-handheld": {
      vertices: [
        // Handle (8 vertices)
        { x: -12, y: -70, z: -15 }, { x: 12, y: -70, z: -15 }, { x: 12, y: 0, z: -15 }, { x: -12, y: 0, z: -15 },
        { x: -12, y: -70, z: 15 }, { x: 12, y: -70, z: 15 }, { x: 12, y: 0, z: 15 }, { x: -12, y: 0, z: 15 },
        // Scanner Top Body (8 vertices)
        { x: -25, y: 0, z: -70 }, { x: 25, y: 0, z: -70 }, { x: 25, y: 30, z: -70 }, { x: -25, y: 30, z: -70 },
        { x: -25, y: 0, z: 60 }, { x: 25, y: 0, z: 60 }, { x: 25, y: 30, z: 60 }, { x: -25, y: 30, z: 60 },
        // Antenna Ring (Octagon layout on top - 8 vertices)
        { x: -3, y: 30, z: 30 }, { x: 3, y: 30, z: 30 },
        { x: -18, y: 55, z: 35 }, { x: 18, y: 55, z: 35 },
        { x: -18, y: 80, z: 35 }, { x: 18, y: 80, z: 35 },
        { x: -3, y: 95, z: 30 }, { x: 3, y: 95, z: 30 }
      ],
      faces: [
        // Handle Box
        { indices: [0, 1, 2, 3], color: "rgba(24, 24, 24, 0.8)", outlineColor: "rgba(217, 28, 255, 0.15)" },
        { indices: [4, 5, 6, 7], color: "rgba(30, 30, 30, 0.8)", outlineColor: "rgba(217, 28, 255, 0.15)" },
        { indices: [0, 1, 5, 4], color: "rgba(18, 18, 18, 0.8)", outlineColor: "rgba(217, 28, 255, 0.1)" },
        { indices: [2, 3, 7, 6], color: "rgba(36, 36, 36, 0.8)", outlineColor: "rgba(217, 28, 255, 0.2)" },
        { indices: [0, 3, 7, 4], color: "rgba(26, 26, 26, 0.8)", outlineColor: "rgba(217, 28, 255, 0.15)" },
        { indices: [1, 2, 6, 5], color: "rgba(26, 26, 26, 0.8)", outlineColor: "rgba(217, 28, 255, 0.15)" },
        // Body Box
        { indices: [8, 9, 10, 11], color: "rgba(28, 28, 28, 0.85)", outlineColor: "rgba(217, 28, 255, 0.25)" },
        { indices: [12, 13, 14, 15], color: "rgba(32, 32, 32, 0.85)", outlineColor: "rgba(217, 28, 255, 0.3)" },
        { indices: [8, 9, 13, 12], color: "rgba(22, 22, 22, 0.8)", outlineColor: "rgba(217, 28, 255, 0.15)" },
        { indices: [10, 11, 15, 14], color: "rgba(44, 44, 44, 0.9)", outlineColor: "rgba(217, 28, 255, 0.5)" }, // Screen/Top Face
        { indices: [8, 11, 15, 12], color: "rgba(26, 26, 26, 0.8)", outlineColor: "rgba(217, 28, 255, 0.2)" },
        { indices: [9, 10, 14, 13], color: "rgba(26, 26, 26, 0.8)", outlineColor: "rgba(217, 28, 255, 0.2)" },
        // Ring Antenna Wireframe polygons
        { indices: [16, 18, 20, 22, 23, 21, 19, 17], color: "rgba(212, 163, 74, 0.1)", outlineColor: "#D4A34A", isGlowing: true }
      ],
      hotspots: [
        { name: "Circular Polarized Helix", desc: "High-efficiency circularly polarized emitter that reads tags at multi-angles, ignoring human body blockages.", pos: { x: 0, y: 65, z: 32 } },
        { name: "Pistol Scan Trigger", desc: "Ergonomically placed tactile micro-switch to activate high-power scans without fatigue.", pos: { x: 8, y: -15, z: 15 } },
        { name: "Android Core Screen", desc: "High-definition interface featuring real-time RSSI signal graphs to physically track down tag locations.", pos: { x: 0, y: 25, z: -10 } }
      ]
    },
    // 4. SA-200 HIGH-GAIN ANTENNA
    "sparkle-sa-200-antenna": {
      vertices: [
        // Thin Square Panel (8 vertices)
        { x: -80, y: -80, z: -6 }, { x: 80, y: -80, z: -6 }, { x: 80, y: 80, z: -6 }, { x: -80, y: 80, z: -6 },
        { x: -80, y: -80, z: 6 }, { x: 80, y: -80, z: 6 }, { x: 80, y: 80, z: 6 }, { x: -80, y: 80, z: 6 },
        // VESA Mount bracket on back (8 vertices)
        { x: -20, y: -20, z: -25 }, { x: 20, y: -20, z: -25 }, { x: 20, y: 20, z: -25 }, { x: -20, y: 20, z: -25 },
        { x: -20, y: -20, z: -7 }, { x: 20, y: -20, z: -7 }, { x: 20, y: 20, z: -7 }, { x: -20, y: 20, z: -7 }
      ],
      faces: [
        // Main Panel
        { indices: [0, 1, 2, 3], color: "rgba(22, 22, 22, 0.8)", outlineColor: "rgba(217, 28, 255, 0.15)" }, // Back
        { indices: [4, 5, 6, 7], color: "rgba(40, 40, 40, 0.9)", outlineColor: "rgba(217, 28, 255, 0.55)", isGlowing: true }, // Front Emitter Plate
        { indices: [0, 1, 5, 4], color: "rgba(28, 28, 28, 0.8)", outlineColor: "rgba(217, 28, 255, 0.2)" },
        { indices: [2, 3, 7, 6], color: "rgba(28, 28, 28, 0.8)", outlineColor: "rgba(217, 28, 255, 0.2)" },
        { indices: [0, 3, 7, 4], color: "rgba(28, 28, 28, 0.8)", outlineColor: "rgba(217, 28, 255, 0.2)" },
        { indices: [1, 2, 6, 5], color: "rgba(28, 28, 28, 0.8)", outlineColor: "rgba(217, 28, 255, 0.2)" },
        // Mounting Bracket
        { indices: [8, 9, 10, 11], color: "rgba(212, 163, 74, 0.2)", outlineColor: "#D4A34A" },
        { indices: [8, 9, 13, 12], color: "rgba(185, 138, 50, 0.4)", outlineColor: "#B98A32" },
        { indices: [10, 11, 15, 14], color: "rgba(185, 138, 50, 0.4)", outlineColor: "#B98A32" }
      ],
      hotspots: [
        { name: "Directional Emitter Plate", desc: "9 dBi high-gain front facing aperture that focus beams, preventing read spillover outside display shelves.", pos: { x: 0, y: 0, z: 6 } },
        { name: "IP67 Weatherproof Frame", desc: "Slim 12mm thick structural housing sealed to support heavy industrial operations and outdoor security frames.", pos: { x: -80, y: 80, z: 0 } },
        { name: "VESA 100 Mounting Hinge", desc: "Heavy-duty rear configuration to secure and hide antennas underneath luxury velvet tables.", pos: { x: 0, y: 0, z: -25 } }
      ]
    }
  };

  // Animation Loop for Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    // Canvas scaling for high-dpi screens
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Render loop
    const render = () => {
      // Smoothly interpolate rotations
      let currentRx = rx;
      let currentRy = ry;

      if (autoRotate && !isHovered) {
        // Automatically revolve around Y-axis
        const nextRy = (ry + 0.006) % (Math.PI * 2);
        setRy(nextRy);
        setTargetRy(nextRy);
        currentRy = nextRy;
      } else {
        // Interpolate current rotation values towards target values
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
      const height = canvas.height / window.devicePixelRatio;
      const cx = width / 2;
      const cy = height / 2;

      // Draw subtle holographic target rings in the background
      ctx.strokeStyle = "rgba(217, 28, 255, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, 140, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, 80, 0, Math.PI * 2);
      ctx.stroke();

      // Draw scanning laser beam running horizontally
      const laserY = cy + Math.sin(Date.now() / 800) * 120;
      ctx.strokeStyle = "rgba(217, 28, 255, 0.15)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx - 150, laserY);
      ctx.lineTo(cx + 150, laserY);
      ctx.stroke();

      // Retrieve active mesh data
      const model = models[activeProductId] || models["sparkle-sr-100-reader"];
      const { vertices, faces, hotspots } = model;

      // Rotation matrix values
      const cosX = Math.cos(currentRx);
      const sinX = Math.sin(currentRx);
      const cosY = Math.cos(currentRy);
      const sinY = Math.sin(currentRy);

      // Perspective settings
      const fov = 350;
      const cameraDistance = 280;

      // Project vertices to 2D screen coordinates
      const projected = vertices.map(v => {
        // Rotate Y-axis (Yaw)
        let x1 = v.x * cosY - v.z * sinY;
        let z1 = v.x * sinY + v.z * cosY;

        // Rotate X-axis (Pitch)
        let y2 = v.y * cosX - z1 * sinX;
        let z2 = v.y * sinX + z1 * cosX;

        // Perspective Projection
        const scale = fov / (z2 + cameraDistance);
        const px = cx + x1 * scale;
        const py = cy + y2 * scale;

        return { x: px, y: py, z: z2 };
      });

      // Directional light vector (coming from top-right-front)
      const lightSource = { x: 0.4, y: 0.8, z: -0.5 };
      const magnitude = Math.sqrt(lightSource.x ** 2 + lightSource.y ** 2 + lightSource.z ** 2);
      const light = { x: lightSource.x / magnitude, y: lightSource.y / magnitude, z: lightSource.z / magnitude };

      // Compute faces centroids and depths for rendering order (z-sorting)
      const faceDepths = faces.map((face, index) => {
        let sumZ = 0;
        face.indices.forEach(idx => {
          sumZ += projected[idx].z;
        });
        return { index, avgZ: sumZ / face.indices.length };
      });

      // Sort faces (painter's algorithm - back faces drawn first)
      faceDepths.sort((a, b) => b.avgZ - a.avgZ);

      // Draw faces
      faceDepths.forEach(fd => {
        const face = faces[fd.index];
        const projectedPoints = face.indices.map(idx => projected[idx]);

        // Calculate face normal to compute shading
        // We use three vertices of the face to get two coplanar vectors
        if (face.indices.length >= 3) {
          const v0 = vertices[face.indices[0]];
          const v1 = vertices[face.indices[1]];
          const v2 = vertices[face.indices[2]];

          // Vector A (v1 - v0)
          const ax = v1.x - v0.x;
          const ay = v1.y - v0.y;
          const az = v1.z - v0.z;

          // Vector B (v2 - v0)
          const bx = v2.x - v0.x;
          const by = v2.y - v0.y;
          const bz = v2.z - v0.z;

          // Cross product (Normal vector)
          let nx = ay * bz - az * by;
          let ny = az * bx - ax * bz;
          let nz = ax * by - ay * bx;

          // Normalize normal
          const len = Math.sqrt(nx ** 2 + ny ** 2 + nz ** 2);
          if (len > 0) {
            nx /= len;
            ny /= len;
            nz /= len;
          }

          // Rotate Normal vector
          // Rotate Y
          let rnx1 = nx * cosY - nz * sinY;
          let rnz1 = nx * sinY + nz * cosY;
          // Rotate X
          let rny2 = ny * cosX - rnz1 * sinX;
          let rnz2 = ny * sinX + rnz1 * cosX;

          // Dot product with light
          const dot = rnx1 * light.x + rny2 * light.y + rnz2 * light.z;
          const intensity = Math.max(0.15, Math.min(1.0, (dot + 1) / 2)); // map to 0.15 - 1.0

          // Apply shading to face color
          let fillStyle = face.color;
          let strokeStyle = face.outlineColor;

          if (theme === "light") {
            // Adapt base shapes to a light blueprint design
            if (face.color.startsWith("rgba(3") || face.color.startsWith("rgba(2") || face.color.startsWith("rgba(4")) {
              fillStyle = `rgba(240, 240, 240, 0.85)`;
            }
            if (face.outlineColor.startsWith("rgba(217, 28, 255")) {
              strokeStyle = "rgba(217, 28, 255, 0.45)"; // enhance violet wireframe lines in light mode
            }
          }

          ctx.fillStyle = fillStyle;

          // Draw filled face
          ctx.beginPath();
          ctx.moveTo(projectedPoints[0].x, projectedPoints[0].y);
          for (let i = 1; i < projectedPoints.length; i++) {
            ctx.lineTo(projectedPoints[i].x, projectedPoints[i].y);
          }
          ctx.closePath();

          // Create custom shading overlay
          ctx.fill();

          // Draw outline
          ctx.strokeStyle = strokeStyle;
          ctx.lineWidth = face.isGlowing ? 1.5 : 0.8;
          ctx.stroke();

          // Add a holographic gradient scan highlight on top-facing surfaces
          if (face.isGlowing) {
            ctx.fillStyle = `rgba(217, 28, 255, ${0.1 * intensity})`;
            ctx.fill();
          }
        }
      });

      // Calculate and store projected coordinates of Hotspots
      const projectedHotspotList = hotspots.map(h => {
        let x1 = h.pos.x * cosY - h.pos.z * sinY;
        let z1 = h.pos.x * sinY + h.pos.z * cosY;

        let y2 = h.pos.y * cosX - z1 * sinX;
        let z2 = h.pos.y * sinX + z1 * cosX;

        const scale = fov / (z2 + cameraDistance);
        const px = cx + x1 * scale;
        const py = cy + y2 * scale;

        // A hotspot is in the "back" if z2 is deep
        return {
          hotspot: h,
          x: px,
          y: py,
          isBack: z2 > 50
        };
      });

      setProjectedHotspots(projectedHotspotList);

      // Draw hotspots on canvas
      projectedHotspotList.forEach(ph => {
        if (ph.isBack) return; // skip back hotspots to reduce clutter

        const isHovered = hoveredHotspot?.name === ph.hotspot.name;

        // Draw pulsing outer glow circle
        ctx.strokeStyle = ph.hotspot.name.includes("Gold") || ph.hotspot.name.includes("Writer") || ph.hotspot.name.includes("Trigger")
          ? "rgba(212, 163, 74, 0.4)"
          : "rgba(217, 28, 255, 0.4)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        const pulseRadius = 8 + Math.sin(Date.now() / 150) * 3;
        ctx.arc(ph.x, ph.y, isHovered ? 12 : pulseRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Draw central core dot
        ctx.fillStyle = ph.hotspot.name.includes("Gold") || ph.hotspot.name.includes("Writer") || ph.hotspot.name.includes("Trigger")
          ? "#D4A34A"
          : "#D91CFF";
        ctx.beginPath();
        ctx.arc(ph.x, ph.y, isHovered ? 5 : 3.5, 0, Math.PI * 2);
        ctx.fill();

        // White core reflection dot
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(ph.x - 1, ph.y - 1, 1, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [activeProductId, targetRx, targetRy, rx, ry, autoRotate, isHovered, hoveredHotspot]);

  // Handle Mouse rotation interaction
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    // Set rotation angles directly based on position offset
    const dx = mx - rect.width / 2;
    const dy = my - rect.height / 2;

    // Max rotation is ~90 degrees pitch and full yaw
    setTargetRx((dy / rect.height) * Math.PI);
    setTargetRy((dx / rect.width) * Math.PI * 2);

    // Identify if mouse is hovering over any hotspot
    const tolerance = 15;
    let foundHotspot = false;

    for (const ph of projectedHotspots) {
      if (ph.isBack) continue;
      const distance = Math.sqrt((mx - ph.x) ** 2 + (my - ph.y) ** 2);
      if (distance <= tolerance) {
        setHoveredHotspot(ph.hotspot);
        foundHotspot = true;
        break;
      }
    }

    if (!foundHotspot) {
      setHoveredHotspot(null);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setAutoRotate(false);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setAutoRotate(true);
    setHoveredHotspot(null);
    // Smoothly return to natural showcase angles
    setTargetRx(0.4);
  };

  const isDark = theme === "dark";

  return (
    <section className={`py-24 transition-colors duration-300 border-t overflow-hidden ${
      isDark ? "bg-zinc-950 border-zinc-900 text-zinc-100" : "bg-zinc-100 border-zinc-200 text-zinc-900"
    }`} id="interactive-portal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-carbon-violet/10 border border-carbon-violet/20 rounded-lg">
            <Sparkles className="w-3.5 h-3.5 text-carbon-violet animate-pulse" />
            <span className="text-[9px] font-mono font-bold text-carbon-violet uppercase tracking-widest">
              Sparkle CAD Portal v1.0
            </span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-display font-black tracking-wide uppercase ${
            isDark ? "text-white" : "text-zinc-950"
          }`}>
            Interactive 3D Inspection Portal
          </h2>
          <p className={`text-xs md:text-sm max-w-xl mx-auto leading-relaxed ${
            isDark ? "text-zinc-400" : "text-zinc-600"
          }`}>
            Select a product below to inspect the design details in real-time. Hover over the glowing hotspots to read structural and functional specifications.
          </p>
        </div>

        {/* Product selector tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {products.map((prod) => (
            <button
              key={prod.id}
              onClick={() => {
                setActiveProductId(prod.id);
                setHoveredHotspot(null);
              }}
              className={`px-5 py-2.5 rounded-xl text-[10px] font-mono font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 cursor-pointer border ${
                activeProductId === prod.id
                  ? (isDark ? "bg-carbon-violet/15 text-white border-carbon-violet shadow-glow-violet" : "bg-carbon-violet/10 text-zinc-950 border-carbon-violet shadow-glow-violet font-black")
                  : (isDark ? "bg-zinc-900/60 text-zinc-400 border-zinc-800/80 hover:text-white hover:border-zinc-700" : "bg-white text-zinc-500 border-zinc-200 hover:text-zinc-900 hover:border-zinc-350")
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activeProductId === prod.id ? "bg-carbon-violet" : "bg-zinc-600"}`} />
              {prod.name.replace("Sparkle ", "").replace(" Multi-Port Fixed Reader", " Reader").replace(" Precision Jewelry Tag Printer", " Tag Printer").replace(" Rugged Handheld Scanner", " Handheld").replace(" High-Gain RFID Antenna", " Antenna")}
            </button>
          ))}
        </div>

        {/* Main interactive splits */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 md:p-8 rounded-3xl border transition-all duration-300 ${
          isDark ? "bg-zinc-900/40 border-zinc-800/60 backdrop-blur-md" : "bg-white border-zinc-200 shadow-md"
        }`}>
          
          {/* Left panel: Info & Hotspots description */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between h-full">
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-bold text-rfid-gold uppercase tracking-widest block">
                {activeProduct.category} Catalog Item
              </span>
              <h3 className={`text-xl sm:text-2xl font-display font-black tracking-wide uppercase leading-tight ${
                isDark ? "text-white" : "text-zinc-950"
              }`}>
                {activeProduct.name}
              </h3>
              <p className={`text-xs leading-relaxed font-medium ${
                isDark ? "text-zinc-400" : "text-zinc-650"
              }`}>
                {activeProduct.description}
              </p>

              {/* Grid Specifications list */}
              <div className={`grid grid-cols-2 gap-x-4 gap-y-2 pt-2 border-t ${
                isDark ? "border-zinc-800" : "border-zinc-200"
              }`}>
                <div>
                  <span className="text-[9px] font-mono text-zinc-500 block uppercase">Read Range</span>
                  <span className={`text-xs font-bold block mt-0.5 ${
                    isDark ? "text-zinc-300" : "text-zinc-800"
                  }`}>{activeProduct.readRange}</span>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-zinc-500 block uppercase">Frequency</span>
                  <span className={`text-xs font-bold block mt-0.5 ${
                    isDark ? "text-zinc-300" : "text-zinc-800"
                  }`}>{activeProduct.frequency ? activeProduct.frequency.split(" ")[0] : "UHF"} band</span>
                </div>
              </div>
            </div>

            {/* Hotspot details card */}
            <div className={`p-5 rounded-2xl border min-h-[145px] flex flex-col justify-center relative overflow-hidden transition-all duration-300 ${
              isDark ? "bg-zinc-950/80 border-zinc-800" : "bg-zinc-50 border-zinc-200"
            }`}>
              <div className={`absolute inset-0 bg-scanner-grid pointer-events-none ${
                isDark ? "opacity-10" : "opacity-5"
              }`} />
              
              <AnimatePresence mode="wait">
                {hoveredHotspot ? (
                  <motion.div
                    key={hoveredHotspot.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2 relative"
                  >
                    <h4 className="text-xs font-mono font-black text-carbon-violet uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-carbon-violet fill-current" />
                      {hoveredHotspot.name}
                    </h4>
                    <p className="text-[11px] text-zinc-300 leading-relaxed font-medium">
                      {hoveredHotspot.desc}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-4 space-y-2"
                  >
                    <MousePointerClick className="w-6 h-6 text-zinc-600 mx-auto animate-pulse" />
                    <p className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">
                      Hover glowing nodes to inspect specific details
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Price & Basket action */}
            <div className={`flex items-center justify-between gap-4 pt-4 border-t ${
              isDark ? "border-zinc-800" : "border-zinc-200"
            }`}>
              <div>
                <span className="text-[9px] font-mono text-zinc-500 block uppercase">Unit Price</span>
                <span className={`text-xl font-sans font-black tracking-tight ${
                  isDark ? "text-white" : "text-zinc-950"
                }`}>${activeProduct.price.toLocaleString()}</span>
              </div>
              
              <button
                onClick={() => onAddToQuote && onAddToQuote(activeProduct, 1)}
                className="px-6 py-3.5 bg-rfid-gold hover:bg-signal-gold text-zinc-950 text-[10px] font-mono font-black uppercase tracking-widest rounded-xl transition-all duration-300 active:scale-95 shadow-glow-gold cursor-pointer"
              >
                Add to Basket
              </button>
            </div>
          </div>

          {/* Right panel: 3D Canvas element */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
            
            {/* Engineering stats box overlay */}
            <div className={`absolute top-4 left-4 z-10 p-3 rounded-xl border text-[8px] font-mono uppercase space-y-1 select-none transition-colors duration-300 ${
              isDark ? "bg-zinc-950/80 border-zinc-800 text-zinc-500" : "bg-white/90 border-zinc-200 text-zinc-600"
            }`}>
              <div className="flex justify-between gap-8">
                <span>Model State:</span>
                <span className="text-emerald-400 font-bold">CALIBRATED</span>
              </div>
              <div className="flex justify-between gap-8">
                <span>Yaw (Y):</span>
                <span className={`${isDark ? "text-zinc-300" : "text-zinc-800"} font-bold`}>{(ry * (180 / Math.PI)).toFixed(0)}°</span>
              </div>
              <div className="flex justify-between gap-8">
                <span>Pitch (X):</span>
                <span className={`${isDark ? "text-zinc-300" : "text-zinc-800"} font-bold`}>{(rx * (180 / Math.PI)).toFixed(0)}°</span>
              </div>
              <div className="flex justify-between gap-8">
                <span>Mesh Resolution:</span>
                <span className={`${isDark ? "text-zinc-300" : "text-zinc-800"} font-bold`}>LOD 0 (HIGH)</span>
              </div>
            </div>

            {/* Interaction helpers overlay */}
            <div className={`absolute bottom-4 right-4 z-10 flex items-center gap-1.5 rounded-lg border text-[9px] font-mono font-bold uppercase tracking-wider select-none transition-colors duration-300 ${
              isDark ? "bg-zinc-950/80 border-zinc-850 text-zinc-400" : "bg-white/90 border-zinc-200 text-zinc-650"
            }`}>
              <Compass className="w-3.5 h-3.5 text-carbon-violet" />
              <span>Drag / Hover to Orbit</span>
            </div>

            {/* Control controls button */}
            <button
              onClick={() => {
                setTargetRx(0.4);
                setTargetRy(0.6);
                setRx(0.4);
                setRy(0.6);
              }}
              className={`absolute bottom-4 left-4 z-10 w-7 h-7 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                isDark ? "bg-zinc-950/80 border-zinc-850 text-zinc-400 hover:bg-zinc-900" : "bg-white/90 border-zinc-200 text-zinc-650 hover:bg-zinc-50"
              }`}
              title="Reset angle"
            >
              <RefreshCw className="w-3.5 h-3.5 text-zinc-400" />
            </button>

            {/* Mathematical 3D canvas viewport */}
            <div className={`w-full h-[320px] md:h-[400px] rounded-2xl border overflow-hidden shadow-2xl relative transition-all duration-300 ${
              isDark ? "bg-zinc-950 border-zinc-850" : "bg-zinc-100/50 border-zinc-200"
            }`}>
              
              {/* Futuristic scanning grids background */}
              <div className={`absolute inset-0 bg-scanner-grid ${
                isDark ? "opacity-10" : "opacity-5"
              }`} />

              {/* Scanner radar scanning effect */}
              <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-r from-carbon-violet/30 to-transparent animate-scanner-line" style={{ left: "50%", animation: "pulse 3s infinite" }} />
              
              <canvas
                ref={canvasRef}
                className="w-full h-full cursor-grab active:cursor-grabbing relative z-0"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
