import React, { useState } from "react";
import { SEO } from "../components/SEO";
import { HelpCircle, Terminal, Download, Wrench, Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SupportPageProps {
  theme?: "light" | "dark";
}

export const SupportPage: React.FC<SupportPageProps> = ({ theme = "dark" }) => {
  const isDark = theme === "dark";
  const [ticketName, setTicketName] = useState("");
  const [ticketEmail, setTicketEmail] = useState("");
  const [ticketText, setTicketText] = useState("");
  const [ticketType, setTicketType] = useState("hardware");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate mock ticket ID
    const randomId = `SPK-${Math.floor(1000 + Math.random() * 9000)}-${ticketType.toUpperCase()}`;
    setTicketId(randomId);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setTicketName("");
    setTicketEmail("");
    setTicketText("");
  };

  const faqs = [
    {
      q: "How does Sparkle handle signal reflections around metal jewelry trays?",
      a: "Sparkle's hardware uses circularly polarized antenna arrays that resolve multipath wave cancellations. Our firmware filters ignore secondary reflections, registering only direct, micro-calibrated tag replies."
    },
    {
      q: "What is the life expectancy of Reusable Clasp Tags?",
      a: "Our alloy clasp tags are engineered for longevity, supporting over 100,000 read/write lock cycles. They feature scratch-resistant internal cushioning to protect fine 18K gold bands."
    },
    {
      q: "How do I integrate the exit gates (EAS-900) with our inventory system?",
      a: "The exit gates communicate directly via REST APIs or TCP IP sockets. You can configure Webhooks in the Sparkle ERP console to receive push alerts whenever an active tag exits."
    }
  ];

  return (
    <div className="pt-28 pb-20 min-h-screen relative overflow-hidden transition-colors duration-300">
      <SEO 
        title="Sparkle RFID | Client Support & Resource Portal" 
        description="Access technical user manuals, download scanner drivers, search hardware troubleshooting guides, and open support tickets."
        keywords="RFID support desk, scanner drivers, jewelry tag manuals, open technical ticket"
      />

      <div className={`absolute top-20 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none ${isDark ? "bg-[#D4A34A]/20" : "bg-[#B98A32]/10"}`} />
      <div className={`absolute bottom-10 left-0 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none ${isDark ? "bg-[#D91CFF]/15" : "bg-[#D91CFF]/5"}`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] font-mono text-[#D4A34A] uppercase tracking-widest font-black block">TECHNICAL RESOURCE CENTEr</span>
          <h1 className={`text-4xl sm:text-5xl font-display font-black tracking-wide uppercase ${isDark ? "text-white" : "text-zinc-950"}`}>
            Client Support
          </h1>
          <p className={`text-sm leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-650"}`}>
            Access system manuals, download desktop/handheld utility drivers, configure database links, or contact our network operations center directly.
          </p>
        </div>

        {/* FAQs and Diagnostics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: FAQs & Downloads */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* FAQ Sub-section */}
            <div className="space-y-4">
              <h3 className={`text-lg font-display font-black uppercase tracking-wide flex items-center gap-2 ${
                isDark ? "text-white" : "text-zinc-950"
              }`}>
                <HelpCircle className="w-5 h-5 text-[#D4A34A]" />
                Frequently Answered Queries
              </h3>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className={`p-5 rounded-2xl border ${
                    isDark ? "bg-zinc-900/50 border-zinc-800" : "bg-white border-zinc-200 shadow-sm"
                  }`}>
                    <h4 className={`text-xs font-mono font-black uppercase tracking-wider mb-2 ${
                      isDark ? "text-white" : "text-zinc-900"
                    }`}>
                      Q: {faq.q}
                    </h4>
                    <p className={`text-xs leading-relaxed font-medium ${isDark ? "text-zinc-400" : "text-zinc-650"}`}>
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Downloads sub-section */}
            <div className="space-y-4">
              <h3 className={`text-lg font-display font-black uppercase tracking-wide flex items-center gap-2 ${
                isDark ? "text-white" : "text-zinc-950"
              }`}>
                <Download className="w-5 h-5 text-[#D4A34A]" />
                Utility Downloads
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-[10px] font-bold uppercase tracking-wider">
                {/* Download 1 */}
                <div className={`p-4 rounded-xl border flex items-center justify-between gap-3 ${
                  isDark ? "bg-zinc-900/50 border-zinc-800" : "bg-white border-zinc-200 shadow-xs"
                }`}>
                  <div>
                    <span className={`block font-black ${isDark ? "text-white" : "text-zinc-900"}`}>ST-301 Scanner Utility</span>
                    <span className="text-[8px] text-zinc-500">Android APK build v4.2.1</span>
                  </div>
                  <button className="p-2 bg-[#D4A34A]/10 border border-[#D4A34A]/20 hover:bg-[#D4A34A] hover:text-zinc-950 text-[#D4A34A] rounded-lg transition-all cursor-pointer">
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Download 2 */}
                <div className={`p-4 rounded-xl border flex items-center justify-between gap-3 ${
                  isDark ? "bg-zinc-900/50 border-zinc-800" : "bg-white border-zinc-200 shadow-xs"
                }`}>
                  <div>
                    <span className={`block font-black ${isDark ? "text-white" : "text-zinc-900"}`}>Scribe-400 Print Engine</span>
                    <span className="text-[8px] text-zinc-500">Windows Driver Package (64-bit)</span>
                  </div>
                  <button className="p-2 bg-[#D4A34A]/10 border border-[#D4A34A]/20 hover:bg-[#D4A34A] hover:text-zinc-950 text-[#D4A34A] rounded-lg transition-all cursor-pointer">
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Technical Support Ticket Form */}
          <div className="lg:col-span-5">
            <div className={`border p-6 md:p-8 rounded-2xl relative shadow-2xl transition-all duration-300 ${
              isDark ? "bg-zinc-900 border-zinc-800 text-zinc-100" : "bg-white border-zinc-200 text-zinc-900 shadow-md"
            }`}>
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl pointer-events-none bg-[#D4A34A]/5" />

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 text-center space-y-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#D4A34A]/10 border border-[#D4A34A]/20 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8 text-[#D4A34A]" />
                    </div>

                    <div className="space-y-2">
                      <h4 className={`text-lg font-display font-black tracking-wide ${isDark ? "text-white" : "text-zinc-950"}`}>
                        Support Ticket Opened
                      </h4>
                      <p className={`text-xs max-w-md mx-auto leading-relaxed font-medium ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                        Your ticket has been logged directly into the system with ID: <span className="font-mono text-[#D4A34A] font-bold">{ticketId}</span>. A technician will contact you at {ticketEmail} within 2 hours.
                      </p>
                    </div>

                    <button
                      onClick={handleReset}
                      className="py-2.5 px-6 bg-[#D4A34A] text-zinc-950 hover:bg-[#B98A32] text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer"
                    >
                      Open New Support Ticket
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                    <div className="space-y-1">
                      <span className="text-[10px] font-display text-[#D4A34A] uppercase tracking-widest font-black block">SECURE DESK</span>
                      <h3 className={`text-2xl font-display font-black tracking-wide ${isDark ? "text-white" : "text-zinc-950"}`}>
                        Open Ticket
                      </h3>
                      <p className={`text-xs font-medium ${isDark ? "text-zinc-400" : "text-zinc-650"}`}>
                        Experiencing hardware alignment challenges, tag print errors, or database synchronization lag? Log it directly here.
                      </p>
                    </div>

                    <form onSubmit={handleSubmitTicket} className="space-y-4">
                      {/* Name */}
                      <div className="space-y-1">
                        <label className={`text-[9px] font-mono font-bold block uppercase tracking-wider ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>Name</label>
                        <input
                          required
                          type="text"
                          value={ticketName}
                          onChange={(e) => setTicketName(e.target.value)}
                          placeholder="Appraiser/Operator"
                          className={`w-full border focus:border-[#D4A34A] rounded-xl px-4 py-2.5 text-xs focus:outline-none transition-all font-medium ${
                            isDark ? "bg-zinc-950 border-zinc-800 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-900"
                          }`}
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-1">
                        <label className={`text-[9px] font-mono font-bold block uppercase tracking-wider ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>Email</label>
                        <input
                          required
                          type="email"
                          value={ticketEmail}
                          onChange={(e) => setTicketEmail(e.target.value)}
                          placeholder="operator@brand.com"
                          className={`w-full border focus:border-[#D4A34A] rounded-xl px-4 py-2.5 text-xs focus:outline-none transition-all font-medium ${
                            isDark ? "bg-zinc-950 border-zinc-800 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-900"
                          }`}
                        />
                      </div>

                      {/* Ticket Type */}
                      <div className="space-y-1">
                        <label className={`text-[9px] font-mono font-bold block uppercase tracking-wider ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>Department</label>
                        <select
                          value={ticketType}
                          onChange={(e) => setTicketType(e.target.value)}
                          className={`w-full border focus:border-[#D4A34A] rounded-xl px-4 py-2.5 text-xs focus:outline-none font-medium ${
                            isDark ? "bg-zinc-950 border-zinc-800 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-900"
                          }`}
                        >
                          <option value="hardware">Hardware / Antennas Calibration</option>
                          <option value="software">Sparkle ERP Sync / REST APIs</option>
                          <option value="tagging">Tags Programing & Verification</option>
                        </select>
                      </div>

                      {/* Details */}
                      <div className="space-y-1">
                        <label className={`text-[9px] font-mono font-bold block uppercase tracking-wider ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>Trouble Description</label>
                        <textarea
                          required
                          value={ticketText}
                          onChange={(e) => setTicketText(e.target.value)}
                          placeholder="Describe tag error codes, reader port LEDs status, or diagnostic console output logs..."
                          rows={4}
                          className={`w-full border focus:border-[#D4A34A] rounded-xl px-4 py-3 text-xs focus:outline-none transition-all font-medium ${
                            isDark ? "bg-zinc-950 border-zinc-800 text-white placeholder-zinc-700" : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-450"
                          }`}
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        className="w-full py-3.5 px-6 text-zinc-950 text-xs font-mono font-bold uppercase tracking-widest rounded-xl shadow-lg cursor-pointer transition-all active:scale-[0.99] bg-[#D4A34A] hover:bg-[#B98A32]"
                      >
                        <Send className="w-3.5 h-3.5 shrink-0 inline-block mr-2" />
                        File Support Ticket
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
