import React, { useState } from "react";
import { Send, CheckCircle2, Building, UserCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ContactFormProps {
  theme?: "light" | "dark";
}

export const ContactForm: React.FC<ContactFormProps> = ({ theme = "dark" }) => {
  const [formMode, setFormMode] = useState<"b2c" | "b2b">("b2b");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [productInterest, setProductInterest] = useState("Sparkle ST-301 Handheld");
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  // B2B Specific Fields
  const [companyName, setCompanyName] = useState("");
  const [estimatedVolume, setEstimatedVolume] = useState("10-49 units");
  const [integrationNeeds, setIntegrationNeeds] = useState("Showroom ERP API");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName("");
    setEmail("");
    setPhone("");
    setQuantity(1);
    setAddress("");
    setMessage("");
    setCompanyName("");
  };

  const isDark = theme === "dark";

  return (
    <div className={`border p-6 md:p-8 rounded-2xl relative shadow-2xl transition-all duration-300 text-zinc-100 ${
      isDark ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200 text-zinc-900 shadow-md"
    }`} id="contact-solutions">
      {/* Dynamic background accents */}
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
                {formMode === "b2b" ? "Showroom Integration Docket Opened" : "Inquiry Safely Received"}
              </h4>
              <p className={`text-xs max-w-md mx-auto leading-relaxed font-medium ${isDark ? "text-zinc-400" : "text-zinc-650"}`}>
                {formMode === "b2b" 
                  ? `Thank you, ${name}. We have routed your custom ${productInterest} showroom inquiry (Volume: ${estimatedVolume}) directly to our luxury asset security desk. A specialist will call you at ${phone} or email ${email} within 4 business hours.`
                  : `Hi ${name}, thank you for reaching out. We have logged your interest in our ${productInterest} system. Your pilot shipping estimate is being processed for ${address || "your showroom"} and will arrive in your inbox shortly.`}
              </p>
            </div>

            <button
              onClick={handleReset}
              className="py-2.5 px-6 bg-[#D4A34A] text-zinc-950 hover:bg-[#B98A32] text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer"
            >
              Submit Another Inquiry
            </button>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="text-center md:text-left space-y-1">
              <span className="text-[10px] font-mono text-[#D4A34A] uppercase tracking-widest font-black block">SECURE CHANNELS</span>
              <h3 className={`text-2xl font-display font-black tracking-wide ${isDark ? "text-white" : "text-zinc-950"}`}>Request Custom Design or Direct Quote</h3>
              <p className={`text-xs md:text-sm max-w-2xl font-medium ${isDark ? "text-zinc-400" : "text-zinc-650"}`}>
                Whether you need single scanners to secure an independent jewelry boutique or a comprehensive multi-facility showroom calibration with custom ERP integrations, write us here.
              </p>
            </div>

            {/* Mode Switcher Slider */}
            <div className="flex justify-center md:justify-start">
              <div className={`p-1 rounded-xl border flex items-center ${isDark ? "bg-zinc-950 border-zinc-800" : "bg-zinc-100 border-zinc-200"}`}>
                <button
                  type="button"
                  onClick={() => setFormMode("b2b")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-mono font-bold uppercase tracking-widest transition-all cursor-pointer ${
                    formMode === "b2b"
                      ? "bg-[#D4A34A] text-zinc-950 shadow-sm"
                      : isDark ? "text-zinc-400 hover:text-zinc-100" : "text-zinc-600 hover:text-zinc-950"
                  }`}
                >
                  <Building className="w-3.5 h-3.5" />
                  Showroom Brand (B2B)
                </button>
                <button
                  type="button"
                  onClick={() => setFormMode("b2c")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-mono font-bold uppercase tracking-widest transition-all cursor-pointer ${
                    formMode === "b2c"
                      ? "bg-[#D4A34A] text-zinc-950 shadow-sm"
                      : isDark ? "text-zinc-400 hover:text-zinc-100" : "text-zinc-600 hover:text-zinc-950"
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  Independent Pilot (B2C)
                </button>
              </div>
            </div>

            {/* Main Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Field 1: Full Name */}
                <div className="space-y-1.5">
                  <label className={`text-[9px] font-mono font-bold block uppercase tracking-wider ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>Full Name</label>
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Marcus Vance"
                    className={`w-full border focus:border-[#D4A34A] rounded-xl px-4 py-2.5 text-xs focus:outline-none transition-all font-medium ${
                      isDark ? "bg-zinc-950 border-zinc-800 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-900"
                    }`}
                  />
                </div>

                {/* Field 2: Company Name (B2B) vs Shipping Address (B2C) */}
                {formMode === "b2b" ? (
                  <div className="space-y-1.5">
                    <label className={`text-[9px] font-mono font-bold block uppercase tracking-wider ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>Boutique / Showroom Brand Name</label>
                    <input
                      required
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Vance Fine Gemstones"
                      className={`w-full border focus:border-[#D4A34A] rounded-xl px-4 py-2.5 text-xs focus:outline-none transition-all font-medium ${
                        isDark ? "bg-zinc-950 border-zinc-800 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-900"
                      }`}
                    />
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <label className={`text-[9px] font-mono font-bold block uppercase tracking-wider ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>Shipping/Delivery Address</label>
                    <input
                      required
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="742 Fifth Avenue, New York NY"
                      className={`w-full border focus:border-[#D4A34A] rounded-xl px-4 py-2.5 text-xs focus:outline-none transition-all font-medium ${
                        isDark ? "bg-zinc-950 border-zinc-800 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-900"
                      }`}
                    />
                  </div>
                )}

                {/* Field 3: Email Address */}
                <div className="space-y-1.5">
                  <label className={`text-[9px] font-mono font-bold block uppercase tracking-wider ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>Secured Email Address</label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="mvance@vance-jewelry.com"
                    className={`w-full border focus:border-[#D4A34A] rounded-xl px-4 py-2.5 text-xs focus:outline-none transition-all font-medium ${
                      isDark ? "bg-zinc-950 border-zinc-800 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-900"
                    }`}
                  />
                </div>

                {/* Field 4: Phone Number */}
                <div className="space-y-1.5">
                  <label className={`text-[9px] font-mono font-bold block uppercase tracking-wider ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>Contact Phone Number</label>
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 019-2834"
                    className={`w-full border focus:border-[#D4A34A] rounded-xl px-4 py-2.5 text-xs focus:outline-none transition-all font-medium ${
                      isDark ? "bg-zinc-950 border-zinc-800 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-900"
                    }`}
                  />
                </div>

                {/* Field 5: Product Interest Dropdown */}
                <div className="space-y-1.5">
                  <label className={`text-[9px] font-mono font-bold block uppercase tracking-wider ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>System Line Interest</label>
                  <select
                    value={productInterest}
                    onChange={(e) => setProductInterest(e.target.value)}
                    className={`w-full border focus:border-[#D4A34A] rounded-xl px-4 py-2.5 text-xs focus:outline-none font-medium ${
                      isDark ? "bg-zinc-950 border-zinc-800 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-900"
                    }`}
                  >
                    <option value="Sparkle ST-301 Handheld">Sparkle ST-301 Handheld Scanner</option>
                    <option value="Sparkle SR-100 Reader">Sparkle SR-100 Multi-Port Fixed Reader</option>
                    <option value="Sparkle Scribe Printer">Sparkle Scribe-400 Precision Jewelry Tag Printer</option>
                    <option value="Sparkle SA-200 Antenna">Sparkle SA-200 Antenna & Micro Tags</option>
                    <option value="Custom Showroom Solution">Full Custom Showroom API & Counter Integration</option>
                  </select>
                </div>

                {/* Field 6: Estimated Volume (B2B) vs Quantity (B2C) */}
                {formMode === "b2b" ? (
                  <div className="space-y-1.5">
                    <label className={`text-[9px] font-mono font-bold block uppercase tracking-wider ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>Expected Showroom Volume</label>
                    <select
                      value={estimatedVolume}
                      onChange={(e) => setEstimatedVolume(e.target.value)}
                      className={`w-full border focus:border-[#D4A34A] rounded-xl px-4 py-2.5 text-xs focus:outline-none font-medium ${
                        isDark ? "bg-zinc-950 border-zinc-800 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-900"
                      }`}
                    >
                      <option value="1-9 units">1 - 9 Units (Direct Pilot Trial)</option>
                      <option value="10-49 units">10 - 49 Units (Regional Showroom Pricing)</option>
                      <option value="50-199 units">50 - 199 Units (Boutique Chain Tier)</option>
                      <option value="200+ units">200+ Units (Enterprise SLA Contract)</option>
                    </select>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <label className={`text-[9px] font-mono font-bold block uppercase tracking-wider ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>Quantity Requested</label>
                    <input
                      type="number"
                      min="1"
                      max="9"
                      value={quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setQuantity(isNaN(val) || val < 1 ? 1 : val);
                      }}
                      className={`w-full border focus:border-[#D4A34A] rounded-xl px-4 py-2.5 text-xs focus:outline-none transition-all font-medium ${
                        isDark ? "bg-zinc-950 border-zinc-800 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-900"
                      }`}
                    />
                  </div>
                )}

                {/* Field 7: B2B Integration Needs (B2B Only) */}
                {formMode === "b2b" && (
                  <div className="space-y-1.5 md:col-span-2">
                    <label className={`text-[9px] font-mono font-bold block uppercase tracking-wider ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>Software Integration Requirements</label>
                    <select
                      value={integrationNeeds}
                      onChange={(e) => setIntegrationNeeds(e.target.value)}
                      className={`w-full border focus:border-[#D4A34A] rounded-xl px-4 py-2.5 text-xs focus:outline-none font-medium ${
                        isDark ? "bg-zinc-950 border-zinc-800 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-900"
                      }`}
                    >
                      <option value="Showroom ERP API">REST API integration with luxury ERP showroom software</option>
                      <option value="Handheld iOS/Android SDK">Bespoke iOS/Android mobile developer SDK kits</option>
                      <option value="Standalone App">Sparkle Standalone Companion Auditing App</option>
                      <option value="Hardware only">Hardware Calibration Only (Self-Managed Software)</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Field 8: Message */}
              <div className="space-y-1.5">
                <label className={`text-[9px] font-mono font-bold block uppercase tracking-wider ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
                  {formMode === "b2b" ? "Showroom Layout & Custom Calibration Requirements" : "Your Message or Questions"}
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={formMode === "b2b" 
                    ? "Briefly describe your showroom environments (e.g. glass display cases, metallic trays), total jewelry tag count, or custom tag size limits..."
                    : "Write any questions regarding pilot packages, desktop calibrators, or fast shipping options..."}
                  rows={3}
                  className={`w-full border focus:border-[#D4A34A] rounded-xl px-4 py-3 text-xs focus:outline-none transition-all font-medium ${
                    isDark ? "bg-zinc-950 border-zinc-800 text-white placeholder-zinc-700" : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-450"
                  }`}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 text-zinc-950 text-xs font-mono font-bold uppercase tracking-widest rounded-xl shadow-lg cursor-pointer transition-all active:scale-[0.99] bg-[#D4A34A] hover:bg-[#B98A32]"
              >
                <Send className="w-3.5 h-3.5 shrink-0 inline-block mr-2" />
                {formMode === "b2b" ? "Submit Showroom Proposal Inquiry" : "Submit Pilot Order Quote"}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
