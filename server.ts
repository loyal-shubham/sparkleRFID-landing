import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3030;

app.use(express.json());

// Initialize Gemini client lazily to prevent crashing on startup if key is missing
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== "MY_GEMINI_API_KEY" && key.trim() !== "") {
      aiClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  }
  return aiClient;
}

// Pre-packaged industry solutions for local fallback
const fallbackSolutions: Record<string, any> = {
  warehouse: {
    title: "Boutique Jewelry Showroom Real-Time Audit & Anti-Theft Protection",
    frequency: "UHF (Ultra High Frequency, 860-960 MHz)",
    frequencyReason: "UHF is ideal for luxury jewelry and precious metals because circularly polarized wave patterns can audit up to 2,000 items in seconds without opening glass showrooms, bypass liquid body attenuation, and trigger instant security alarms at lobby exit gates.",
    recommendedHardware: [
      { name: "Sparkle SR-100 Multi-Port Fixed Reader", type: "Scanner", qty: 2, reason: "Mount above exit lobbies and under-counter stations for continuous real-time tracking." },
      { name: "Sparkle ST-301 Rugged Handheld Scanner", type: "Scanner Gun", qty: 1, reason: "Allows retail associates to perform full display audits in 30 seconds." },
      { name: "Sparkle Scribe-400 Precision Jewelry Tag Printer", type: "Printer", qty: 1, reason: "Print micro-caliber barcode and RFID tag labels for diamonds and fine metals." },
      { name: "Sparkle SA-200 High-Gain RFID Antenna", type: "Accessory", qty: 4, reason: "Install behind display cabinets and entry frames to secure exits and focus read zones." }
    ],
    tagStrategy: "Apply tamper-resistant micro jewelry tags to watch straps and necklaces. Use specialized flag tags to avoid signal absorption from platinum and gold mountings.",
    integrationComplexity: "Medium",
    estimatedROI: "4-6 months. Prevents shrinkage, reduces morning audit times from 2 hours to 30 seconds, and provides continuous insurance-grade tracking.",
    b2bIntegrationTips: [
      "Use our pre-built REST API to sync real-time scan logs into your luxury showroom ERP or security hub.",
      "Trigger live alerts on security cameras when a high-value asset enters the lobby exit portal range.",
      "Utilize the Sparkle WebSocket API for instant display tray lift-and-learn triggers."
    ],
    b2cPurchaseNote: "For boutique watch and jewelry retailers, we recommend starting with a single handheld ST-301 scanner and 1,000 apparel micro-tags for instant standalone counts."
  },
  retail: {
    title: "Luxury Watch & Boutique Jewelry Showcase Calibration",
    frequency: "UHF (Ultra High Frequency, 860-960 MHz)",
    frequencyReason: "UHF delivers outstanding non-line-of-sight counts of high-value stock, meaning sales associates can audit an entire diamond showroom case in seconds without handling individual trays.",
    recommendedHardware: [
      { name: "Sparkle ST-301 Rugged Handheld Scanner", type: "Scanner Gun", qty: 1, reason: "Conduct instantaneous showcase audits and identify missing rings or necklaces instantly." },
      { name: "Sparkle Scribe-400 Precision Jewelry Tag Printer", type: "Printer", qty: 1, reason: "Create micro-fine barcode price tags with embedded RFID chips at point of entry." },
      { name: "Sparkle SA-200 High-Gain RFID Antenna", type: "Accessory", qty: 2, reason: "Mount under showcase trays to detect customer interactions with pieces in real-time." }
    ],
    tagStrategy: "Apply ultra-thin adhesive smart labels to fine chains or ring tags, utilizing flag-oriented antenna offsets to ensure optimal signal coupling near precious metals.",
    integrationComplexity: "Low",
    estimatedROI: "3-5 months. Eliminates security blind spots, streamlines manual verification processes, and ensures absolute showroom control.",
    b2bIntegrationTips: [
      "Leverage the Sparkle mobile SDK to build a native iOS/Android showroom auditing app for sales personnel.",
      "Integrate directly with luxury POS systems to automate stock deduction during checkout."
    ],
    b2cPurchaseNote: "Independent boutique owners can deploy our pilot package containing 1 Scribe-400 printer, 1 handheld ST-301 scanner, and 500 micro-jewelry labels for direct plug-and-play operation."
  },
  asset: {
    title: "High-Value Enterprise Vault & Gemstone Asset Control",
    frequency: "UHF / HF Dual Frequency System",
    frequencyReason: "UHF delivers continuous long-range security sweeps, while HF/NFC lets authorized appraisers verify gemstone certificates on their personal smartphones via secure cryptographic handshakes.",
    recommendedHardware: [
      { name: "Sparkle SR-100 Multi-Port Fixed Reader", type: "Scanner", qty: 1, reason: "Secure vault entry doors to monitor any movement of lockboxes." },
      { name: "Sparkle ST-301 Rugged Handheld Scanner", type: "Scanner Gun", qty: 1, reason: "Carry out localized physical audits of gold bars, loose gems, and premium boxes." },
      { name: "Sparkle Scribe-400 Precision Jewelry Tag Printer", type: "Printer", qty: 1, reason: "Print secure polyester tamper-evident tracking labels with high-definition barcodes." }
    ],
    tagStrategy: "Apply durable, custom-encoded adhesive on-metal tags to bullion storage cases, and tamper-resistant cryptotags to loose gems packages.",
    integrationComplexity: "Medium",
    estimatedROI: "6-8 months. Eliminates manual check-in sheets, guarantees vault ledger integrity, and maintains audit logs for insurance compliance.",
    b2bIntegrationTips: [
      "Integrate real-time scan event payloads directly into your security center or physical security access control system.",
      "Enable secure badge-scanning correlation to record who accessed specific asset boxes."
    ],
    b2cPurchaseNote: "For specialized collectors, our direct purchase store provides a simple desktop USB reader, micro labels, and standalone companion software."
  }
};

// POST route for RFID AI consultant
app.post("/api/consultant", async (req, res) => {
  const { scenario, industry, scale } = req.body;

  if (!scenario || !industry) {
    return res.status(400).json({ error: "Scenario and industry fields are required." });
  }

  const normalizedIndustry = (industry || "").toLowerCase();
  const scaleText = scale === "b2b" ? "Enterprise Bulk Showroom / Distributor Scale" : "Individual Boutique / Small Retail Scale";

  const ai = getAiClient();

  if (!ai) {
    // If no API key, return a highly rich fallback based on matched industry
    console.log("Gemini API key is not configured or placeholder. Falling back to local Sparkle RFID expert logic.");
    let matchedKey = "retail";
    if (normalizedIndustry.includes("warehous") || normalizedIndustry.includes("logis") || normalizedIndustry.includes("distrib") || normalizedIndustry.includes("vault") || normalizedIndustry.includes("secur")) {
      matchedKey = "asset";
    } else if (normalizedIndustry.includes("jewelry") || normalizedIndustry.includes("shop") || normalizedIndustry.includes("boutique") || normalizedIndustry.includes("retail")) {
      matchedKey = "warehouse";
    }

    const solution = { ...fallbackSolutions[matchedKey] };
    solution.title = `[Sparkle AI] ${solution.title}`;
    // Personalize the fallback message slightly
    solution.title = solution.title.replace("System", `System for ${scenario.substring(0, 30)}...`);
    return res.json(solution);
  }

  try {
    const prompt = `
      You are the elite Sparkle RFID engineering consultant. A client has requested a custom RFID hardware and integration strategy.
      
      Client Context:
      - Industry: ${industry}
      - Target Scale: ${scaleText}
      - Detailed Business Scenario: "${scenario}"
      
      Design a custom, premium RFID solution tailored EXACTLY to their needs, focused on luxury retail showroom security, jewelry stores, watch shops, and high-value asset tracking.
      Provide detailed, highly specific, and practical recommendations. Use the names of our hardware catalog where appropriate:
      1. "Sparkle SR-100 Multi-Port Fixed Reader" (Desktop/fixed scanner for showroom counters, vault doors, security exit portals)
      2. "Sparkle Scribe-400 Precision Jewelry Tag Printer" (High-end printer for micro smart jewelry labels and barcodes)
      3. "Sparkle ST-301 Rugged Handheld Scanner" (Ergonomic handheld terminal with circularly polarized antenna for rapid case audits)
      4. "Sparkle SA-200 High-Gain RFID Antenna" (Minimalist panel antenna for exit gates and drawers)
      5. "Sparkle Micro Jewelry Adhesive RFID Tags" (Small tamper-resistant smart tags for fine metals and precious gems)
      
      You must respond in strict JSON format matching the schema requested below. Do not use markdown wrappers, just raw JSON.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are the head engineer of Sparkle RFID, specializing in premium high-value retail asset tracking, jewelry security systems, and rapid showroom audit physical designs. Return highly technical, accurate, and professional recommendation data structures.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: [
            "title",
            "frequency",
            "frequencyReason",
            "recommendedHardware",
            "tagStrategy",
            "integrationComplexity",
            "estimatedROI",
            "b2bIntegrationTips",
            "b2cPurchaseNote"
          ],
          properties: {
            title: {
              type: Type.STRING,
              description: "An elegant, descriptive title for their specific Sparkle RFID security project."
            },
            frequency: {
              type: Type.STRING,
              description: "The recommended RFID frequency band: UHF (860-960 MHz), HF/NFC (13.56 MHz), or LF (125-134 kHz)."
            },
            frequencyReason: {
              type: Type.STRING,
              description: "The physics and operational reasoning for this specific frequency selection in the context of their business scenario."
            },
            recommendedHardware: {
              type: Type.ARRAY,
              description: "An array of specific hardware modules from our catalog to purchase.",
              items: {
                type: Type.OBJECT,
                required: ["name", "type", "qty", "reason"],
                properties: {
                  name: { type: Type.STRING, description: "Name of the equipment (Sparkle SR-100 fixed reader, Sparkle Scribe printer, Sparkle ST-301 scanner gun, etc.)" },
                  type: { type: Type.STRING, description: "One of: Scanner, Printer, Scanner Gun, Accessory" },
                  qty: { type: Type.INTEGER, description: "Recommended quantity based on the scenario" },
                  reason: { type: Type.STRING, description: "Why this specific hardware and quantity are required" }
                }
              }
            },
            tagStrategy: {
              type: Type.STRING,
              description: "Explanation of what physical tags they need, how to apply them, and precious metal interference avoidance (e.g. platinum/gold flags)."
            },
            integrationComplexity: {
              type: Type.STRING,
              description: "One of: Low, Medium, High"
            },
            estimatedROI: {
              type: Type.STRING,
              description: "Estimated return on investment timeline and key quantitative benefits (e.g., '4-6 months due to complete theft protection and 98% showroom inventory speedup')."
            },
            b2bIntegrationTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3-4 technical tips on connecting this setup to their luxury showroom ERP, access logs, or CRM."
            },
            b2cPurchaseNote: {
              type: Type.STRING,
              description: "A note on how a small boutique or independent gemologist could pilot this setup at low cost on a smaller scale."
            }
          }
        }
      }
    });

    const jsonText = response.text.trim();
    const solution = JSON.parse(jsonText);
    res.json(solution);
  } catch (error: any) {
    console.error("Gemini API call failed:", error);
    res.status(500).json({
      error: "Failed to generate AI recommendations due to an API error.",
      details: error.message
    });
  }
});

// Setup development server middleware or production static folder serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Sparkle Server] RFID portal active on port ${PORT}`);
  });
}

startServer();
