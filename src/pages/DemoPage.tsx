import React, { useState } from "react";
import { SEO } from "../components/SEO";
import { Calendar, Clock, Laptop, Building2, User, ChevronRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface DemoPageProps {
  theme?: "light" | "dark";
}

export const DemoPage: React.FC<DemoPageProps> = ({ theme = "dark" }) => {
  const isDark = theme === "dark";
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [attendeeName, setAttendeeName] = useState("");
  const [attendeeEmail, setAttendeeEmail] = useState("");
  const [showroomCount, setShowroomCount] = useState("1");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Available mock time slots
  const timeSlots = ["09:00 AM EST", "11:00 AM EST", "02:00 PM EST", "04:00 PM EST"];

  const handleBookDemo = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSelectedDate("");
    setSelectedTimeSlot("");
    setCompanyName("");
    setAttendeeName("");
    setAttendeeEmail("");
  };

  return (
    <div className="pt-28 pb-20 min-h-screen relative overflow-hidden transition-colors duration-300">
      <SEO 
        title="Sparkle RFID | Schedule a Live ERP Software Demo" 
        description="Book a technical demo of our luxury asset tracking dashboard. Pick date and time slots for live hardware calibrations."
        keywords="book ERP demo, hardware trial, schedule RFID meeting, custom calibration setup"
      />

      <div className={`absolute top-20 left-0 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none ${isDark ? "bg-[#D4A34A]/20" : "bg-[#B98A32]/10"}`} />
      <div className={`absolute bottom-10 right-0 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none ${isDark ? "bg-[#D91CFF]/15" : "bg-[#D91CFF]/5"}`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] font-mono text-[#D4A34A] uppercase tracking-widest font-black block">LIVE SYSTEM CALIBRATION</span>
          <h1 className={`text-4xl sm:text-5xl font-display font-black tracking-wide uppercase ${isDark ? "text-white" : "text-zinc-950"}`}>
            Inquiry & Software Demo
          </h1>
          <p className={`text-sm leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-650"}`}>
            Schedule a 30-minute high-fidelity screen share with our hardware architecture desk. We will walk through real-time read logs, ERP databases, API webhooks, and tag security rules.
          </p>
        </div>

        {/* Demo Scheduler Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
          {/* Left Column: Why schedule a demo info */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-center">
            <h3 className={`text-xl font-display font-black uppercase tracking-wider ${isDark ? "text-white" : "text-zinc-950"}`}>
              What we will cover:
            </h3>

            <div className="space-y-4 font-mono text-xs font-bold">
              {/* Point 1 */}
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded bg-[#D4A34A]/10 border border-[#D4A34A]/30 flex items-center justify-center text-[#D4A34A] shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <span className={`block uppercase ${isDark ? "text-white" : "text-zinc-900"}`}>Live Hardware Sync</span>
                  <p className={`text-[10px] lowercase normal-case leading-relaxed font-medium ${isDark ? "text-zinc-400" : "text-zinc-550"}`}>
                    Demonstration of the Smart Velvet Tray and exit EAS gates pushing tag read events with zero latency.
                  </p>
                </div>
              </div>

              {/* Point 2 */}
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded bg-[#D4A34A]/10 border border-[#D4A34A]/30 flex items-center justify-center text-[#D4A34A] shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <span className={`block uppercase ${isDark ? "text-white" : "text-zinc-900"}`}>ERP Ledger Setup</span>
                  <p className={`text-[10px] lowercase normal-case leading-relaxed font-medium ${isDark ? "text-zinc-400" : "text-zinc-550"}`}>
                    How the database updates retail stocks, records customer tray durations, and tags missing diamonds.
                  </p>
                </div>
              </div>

              {/* Point 3 */}
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded bg-[#D4A34A]/10 border border-[#D4A34A]/30 flex items-center justify-center text-[#D4A34A] shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <span className={`block uppercase ${isDark ? "text-white" : "text-zinc-900"}`}>Custom API Calibrations</span>
                  <p className={`text-[10px] lowercase normal-case leading-relaxed font-medium ${isDark ? "text-zinc-400" : "text-zinc-550"}`}>
                    Integrating JSON webhook push payloads directly into your boutique's current ERP/POS system.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Scheduling Form Card */}
          <div className="lg:col-span-7">
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
                        Software Demo Blocked!
                      </h4>
                      <p className={`text-xs max-w-md mx-auto leading-relaxed font-medium ${isDark ? "text-zinc-400" : "text-zinc-650"}`}>
                        Thank you, {attendeeName}. We have reserved <span className="font-mono text-[#D4A34A] font-bold">{selectedTimeSlot}</span> on <span className="font-mono text-[#D4A34A] font-bold">{selectedDate}</span> for {companyName}. A calendar invite has been dispatched to {attendeeEmail}.
                      </p>
                    </div>

                    <button
                      onClick={handleReset}
                      className="py-2.5 px-6 bg-[#D4A34A] text-zinc-950 hover:bg-[#B98A32] text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer"
                    >
                      Book Another Time Slot
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-[#D4A34A] uppercase tracking-widest font-black block">CALENDAR SCHEDULER</span>
                      <h3 className={`text-2xl font-display font-black tracking-wide ${isDark ? "text-white" : "text-zinc-950"}`}>
                        Book Slot
                      </h3>
                    </div>

                    <form onSubmit={handleBookDemo} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Attendee Name */}
                        <div className="space-y-1">
                          <label className={`text-[9px] font-mono font-bold block uppercase tracking-wider ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>Full Name</label>
                          <input
                            required
                            type="text"
                            value={attendeeName}
                            onChange={(e) => setAttendeeName(e.target.value)}
                            placeholder="Arthur Sterling"
                            className={`w-full border focus:border-[#D4A34A] rounded-xl px-4 py-2.5 text-xs focus:outline-none transition-all font-medium ${
                              isDark ? "bg-zinc-950 border-zinc-800 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-900"
                            }`}
                          />
                        </div>

                        {/* Attendee Email */}
                        <div className="space-y-1">
                          <label className={`text-[9px] font-mono font-bold block uppercase tracking-wider ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>Work Email</label>
                          <input
                            required
                            type="email"
                            value={attendeeEmail}
                            onChange={(e) => setAttendeeEmail(e.target.value)}
                            placeholder="asterling@brand.com"
                            className={`w-full border focus:border-[#D4A34A] rounded-xl px-4 py-2.5 text-xs focus:outline-none transition-all font-medium ${
                              isDark ? "bg-zinc-950 border-zinc-800 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-900"
                            }`}
                          />
                        </div>

                        {/* Company Name */}
                        <div className="space-y-1">
                          <label className={`text-[9px] font-mono font-bold block uppercase tracking-wider ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>Boutique / Showroom Brand</label>
                          <input
                            required
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="Sterling Fine Jewelry"
                            className={`w-full border focus:border-[#D4A34A] rounded-xl px-4 py-2.5 text-xs focus:outline-none transition-all font-medium ${
                              isDark ? "bg-zinc-950 border-zinc-800 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-900"
                            }`}
                          />
                        </div>

                        {/* Showroom Count */}
                        <div className="space-y-1">
                          <label className={`text-[9px] font-mono font-bold block uppercase tracking-wider ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>Number of Showrooms</label>
                          <select
                            value={showroomCount}
                            onChange={(e) => setShowroomCount(e.target.value)}
                            className={`w-full border focus:border-[#D4A34A] rounded-xl px-4 py-2.5 text-xs focus:outline-none font-medium ${
                              isDark ? "bg-zinc-950 border-zinc-800 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-900"
                            }`}
                          >
                            <option value="1">1 Active Showroom</option>
                            <option value="2-5">2 - 5 Showrooms</option>
                            <option value="6-20">6 - 20 Boutiques</option>
                            <option value="21+">21+ Enterprise Fleet</option>
                          </select>
                        </div>
                      </div>

                      {/* Date Picker */}
                      <div className="space-y-1">
                        <label className={`text-[9px] font-mono font-bold block uppercase tracking-wider ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>Select Date</label>
                        <input
                          required
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className={`w-full border focus:border-[#D4A34A] rounded-xl px-4 py-2.5 text-xs focus:outline-none transition-all font-mono font-bold ${
                            isDark ? "bg-zinc-950 border-zinc-800 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-900"
                          }`}
                        />
                      </div>

                      {/* Time Slots chips */}
                      <div className="space-y-2">
                        <label className={`text-[9px] font-mono font-bold block uppercase tracking-wider ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>Available Hour Slots</label>
                        <div className="grid grid-cols-2 gap-2">
                          {timeSlots.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedTimeSlot(slot)}
                              className={`py-2 rounded-xl text-[10px] font-mono font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                                selectedTimeSlot === slot
                                  ? "bg-[#D4A34A] text-zinc-950 border-[#D4A34A] shadow"
                                  : isDark
                                    ? "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900"
                                    : "bg-zinc-50 border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-150"
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={!selectedDate || !selectedTimeSlot}
                        className="w-full py-3.5 px-6 text-zinc-950 text-xs font-mono font-bold uppercase tracking-widest rounded-xl shadow-lg cursor-pointer transition-all active:scale-[0.99] bg-[#D4A34A] hover:bg-[#B98A32] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Confirm Software Demo Booking
                        <ChevronRight className="w-3.5 h-3.5 inline-block ml-1" />
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
