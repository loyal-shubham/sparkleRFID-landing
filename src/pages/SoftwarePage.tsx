import React, { useState } from "react";
import { SEO } from "../components/SEO";
import { Cpu, Database, LayoutGrid, Terminal, CheckCircle2, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";

interface SoftwarePageProps {
  theme?: "light" | "dark";
}

export const SoftwarePage: React.FC<SoftwarePageProps> = ({ theme = "dark" }) => {
  const isDark = theme === "dark";
  const [activeTab, setActiveTab] = useState<"dashboard" | "features" | "api">("dashboard");

  // Simulated live stock log updates
  const mockLogs = [
    { time: "17:42:19", event: "STOCK TAKEN", detail: "Sparkle Smart Velvet Tray read 12 items (18K White Gold Rings)", status: "normal" },
    { time: "17:41:05", event: "GATE INTRUSION ALERT", detail: "EAS-900 Gate detected unauthorized Tag #EPC-09AF-2831", status: "warning" },
    { time: "17:39:50", event: "TAG REGISTERED", detail: "Scribe-400 encoded Tag for Diamond Pendant (VVS1 2.4ct)", status: "normal" },
    { time: "17:35:12", event: "AUDIT COMPLETED", detail: "ST-301 Scanner audited 1,492 items in Showroom A (100.00% accuracy)", status: "success" }
  ];

  return (
    <div className="pt-28 pb-20 min-h-screen relative overflow-hidden transition-colors duration-300">
      <SEO 
        title="Sparkle RFID | Sparkle ERP Showroom Software Solutions" 
        description="Explore the unified Sparkle ERP retail database. Track diamond inventory audits, manage anti-theft gate sensors, and access SDKs."
        keywords="ERP software, RFID jewelry database, inventory tracking API, anti-theft logs"
      />

      <div className={`absolute top-20 left-0 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none ${isDark ? "bg-[#D91CFF]/15" : "bg-[#D91CFF]/5"}`} />
      <div className={`absolute bottom-10 right-0 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none ${isDark ? "bg-[#D4A34A]/20" : "bg-[#B98A32]/10"}`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] font-mono text-[#D4A34A] uppercase tracking-widest font-black block">CENTRAL INTELLIGENCE</span>
          <h1 className={`text-4xl sm:text-5xl font-display font-black tracking-wide uppercase ${isDark ? "text-white" : "text-zinc-950"}`}>
            Sparkle ERP Software
          </h1>
          <p className={`text-sm leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-650"}`}>
            A secure, cloud-synchronized retail operations platform. Connects your velvet smart trays, exit gates, tag printers, and handheld inventory devices into a single real-time ledger.
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex justify-center border-b border-zinc-800/10 pb-4">
          <div className={`p-1.5 rounded-xl flex items-center border ${isDark ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200"}`}>
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-sans font-semibold transition-all cursor-pointer ${
                activeTab === "dashboard"
                  ? "bg-[#D4A34A] text-zinc-950 shadow"
                  : isDark ? "text-zinc-400 hover:text-white" : "text-zinc-600 hover:text-zinc-950"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              Live Dashboard
            </button>
            <button
              onClick={() => setActiveTab("features")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-sans font-semibold transition-all cursor-pointer ${
                activeTab === "features"
                  ? "bg-[#D4A34A] text-zinc-950 shadow"
                  : isDark ? "text-zinc-400 hover:text-white" : "text-zinc-600 hover:text-zinc-950"
              }`}
            >
              <Database className="w-4 h-4" />
              Software Core Features
            </button>
            <button
              onClick={() => setActiveTab("api")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-sans font-semibold transition-all cursor-pointer ${
                activeTab === "api"
                  ? "bg-[#D4A34A] text-zinc-950 shadow"
                  : isDark ? "text-zinc-400 hover:text-white" : "text-zinc-600 hover:text-zinc-950"
              }`}
            >
              <Terminal className="w-4 h-4" />
              Developer APIs & SDK
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        <div>
          {activeTab === "dashboard" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Left Column: Stats & Logs Console */}
              <div className="lg:col-span-8 space-y-6">
                <div className={`border rounded-2xl p-6 relative overflow-hidden shadow-2xl ${
                  isDark ? "bg-zinc-900/60 border-zinc-800" : "bg-white border-zinc-200"
                }`}>
                  <div className="flex items-center justify-between border-b border-zinc-800/10 pb-4 mb-6">
                    <div>
                      <h3 className={`text-sm font-mono font-bold uppercase tracking-wider ${isDark ? "text-white" : "text-zinc-950"}`}>
                        Showroom Live Event Logs
                      </h3>
                      <p className="text-[9px] font-mono text-zinc-500 uppercase">Updates every tag sweep</p>
                    </div>
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  </div>

                  {/* Logs list */}
                  <div className="space-y-4 font-mono text-[10px] font-bold">
                    {mockLogs.map((log, i) => (
                      <div key={i} className={`p-3 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                        log.status === "warning"
                          ? "bg-red-500/5 border-red-500/10 text-red-400"
                          : log.status === "success"
                            ? "bg-emerald-500/5 border-emerald-500/10 text-emerald-400"
                            : isDark ? "bg-zinc-950 border-zinc-900 text-zinc-300" : "bg-zinc-50 border-zinc-150 text-zinc-650"
                      }`}>
                        <div className="space-y-1">
                          <span className="text-[8px] bg-black/10 px-1.5 py-0.5 rounded text-zinc-400 uppercase tracking-widest">{log.event}</span>
                          <p className="text-xs">{log.detail}</p>
                        </div>
                        <span className="text-[8px] text-zinc-500 self-end md:self-center">{log.time} GMT</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Database Calibration Details */}
              <div className="lg:col-span-4 space-y-6">
                <div className={`border rounded-2xl p-6 space-y-6 shadow-md ${
                  isDark ? "bg-zinc-900/60 border-zinc-800" : "bg-white border-zinc-200"
                }`}>
                  <h3 className={`text-sm font-mono font-bold uppercase tracking-wider border-b border-zinc-800/10 pb-3 ${
                    isDark ? "text-white" : "text-zinc-950"
                  }`}>
                    System Diagnostics
                  </h3>

                  {/* Diagnostic stats */}
                  <div className="space-y-4 font-mono text-xs font-bold">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">DB STATUS</span>
                      <span className="text-emerald-400">ONLINE (SYNCED)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">ACTIVE tags</span>
                      <span className={isDark ? "text-zinc-300" : "text-zinc-800"}>14,831 items</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">SHOWROOM SENSORS</span>
                      <span className={isDark ? "text-zinc-300" : "text-zinc-800"}>18 active nodes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">LATENCY GATEWAYS</span>
                      <span className="text-emerald-400">12 ms (PoE Edge)</span>
                    </div>
                  </div>

                  <a
                    href="#/demo"
                    className="block text-center py-3 bg-[#D4A34A] text-zinc-950 hover:bg-[#B98A32] font-mono text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md"
                  >
                    Request Software Demo
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "features" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {/* Feature 1 */}
              <div className={`border rounded-2xl p-6 space-y-4 ${
                isDark ? "bg-zinc-900/60 border-zinc-800" : "bg-white border-zinc-200"
              }`}>
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <CheckCircle2 className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className={`text-lg font-display font-black uppercase tracking-wide ${isDark ? "text-white" : "text-zinc-950"}`}>
                  Gold Shield Security
                </h3>
                <p className={`text-xs leading-relaxed font-medium ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                  Proprietary algorithm adjustments that ignore metallic signal bounce. Prevents shielding issues caused by platinum claws or thick 18K gold bands on diamond rings.
                </p>
              </div>

              {/* Feature 2 */}
              <div className={`border rounded-2xl p-6 space-y-4 ${
                isDark ? "bg-zinc-900/60 border-zinc-800" : "bg-white border-zinc-200"
              }`}>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <ShieldAlert className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className={`text-lg font-display font-black uppercase tracking-wide ${isDark ? "text-white" : "text-zinc-950"}`}>
                  Intrusion Protection
                </h3>
                <p className={`text-xs leading-relaxed font-medium ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                  Integrates directly with exit EAS gates. If an unauthorized piece leaves the threshold, the system triggers alerts, locks electronic doors, and timestamps security video logs automatically.
                </p>
              </div>

              {/* Feature 3 */}
              <div className={`border rounded-2xl p-6 space-y-4 ${
                isDark ? "bg-zinc-900/60 border-zinc-800" : "bg-white border-zinc-200"
              }`}>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Cpu className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className={`text-lg font-display font-black uppercase tracking-wide ${isDark ? "text-white" : "text-zinc-950"}`}>
                  Automated Auditing
                </h3>
                <p className={`text-xs leading-relaxed font-medium ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                  Run full store audits daily. Compares active RF inventory sweeps against your POS stock ledger to compile discrepancy reports and highlight missing watch boxes instantly.
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === "api" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`border rounded-2xl p-6 relative overflow-hidden shadow-2xl ${
                isDark ? "bg-zinc-950 border-zinc-900 text-zinc-300" : "bg-zinc-50 border-zinc-200 text-zinc-900"
              }`}
            >
              <div className="border-b pb-4 mb-4 border-zinc-800/10">
                <span className="text-[8px] font-mono text-[#D4A34A] uppercase tracking-widest font-black block">INTEGRATION API CODE</span>
                <h3 className={`text-sm font-mono font-bold uppercase tracking-wider ${isDark ? "text-white" : "text-zinc-950"}`}>
                  REST Webhook Payload Example
                </h3>
              </div>

              <pre className={`p-4 rounded-xl font-mono text-[10px] leading-relaxed overflow-x-auto ${
                isDark ? "bg-zinc-900 text-zinc-300" : "bg-white text-zinc-800 border border-zinc-150"
              }`}>
{`// POST: https://api.sparklerfid.com/v1/showrooms/audits/events
{
  "timestamp": "2026-07-20T17:42:19Z",
  "sensorNode": "VELVET_TRAY_NODE_03",
  "readStatus": "SUCCESS",
  "itemCount": 12,
  "payload": [
    { "epc": "3034257BF4000B0000000001", "name": "VVS1 Diamond Ring", "rssi": -52.5 },
    { "epc": "3034257BF4000B0000000002", "name": "18K Gold Emerald Band", "rssi": -48.0 }
  ]
}`}
              </pre>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-mono font-bold uppercase tracking-wider">
                <span className="text-zinc-500">Supports Node.js, C#, Python, and iOS/Android Handheld SDKs</span>
                <a
                  href="#/support"
                  className={`px-4 py-2 border rounded-lg transition-all hover:bg-zinc-800 hover:text-white cursor-pointer ${
                    isDark ? "border-zinc-800" : "border-zinc-300 bg-white"
                  }`}
                >
                  Download Developer SDK Docs
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
