import React from "react";
import { SEO } from "../components/SEO";
import { ContactForm } from "../components/ContactForm";
import { Phone, Mail, MapPin, Landmark } from "lucide-react";

interface ContactPageProps {
  theme?: "light" | "dark";
}

export const ContactPage: React.FC<ContactPageProps> = ({ theme = "dark" }) => {
  const isDark = theme === "dark";

  return (
    <div className="pt-24 pb-20 min-h-screen relative overflow-hidden transition-colors duration-300">
      <SEO 
        title="Sparkle RFID | Contact Executive Showroom Desk" 
        description="Get in touch with Sparkle's technical support desk. View maps of our Fifth Avenue headquarters or submit custom solutions quotes."
        keywords="contact Sparkle RFID, office location, support telephone, luxury showroom quote"
      />

      <div className={`absolute top-20 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none ${isDark ? "bg-[#D4A34A]/20" : "bg-[#B98A32]/10"}`} />
      <div className={`absolute bottom-10 left-0 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none ${isDark ? "bg-[#D91CFF]/15" : "bg-[#D91CFF]/5"}`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] font-mono text-[#D4A34A] uppercase tracking-widest font-black block">SECURED CHANNELS</span>
          <h1 className={`text-4xl sm:text-5xl font-display font-black tracking-wide uppercase ${isDark ? "text-white" : "text-zinc-950"}`}>
            Contact Us
          </h1>
          <p className={`text-sm leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-650"}`}>
            Have questions about system custom integrations, hardware shipping times, or pilot programs? Reach out directly.
          </p>
        </div>

        {/* Info Grid & Form Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-center">
            <h3 className={`text-xl font-display font-black uppercase tracking-wider ${isDark ? "text-white" : "text-zinc-950"}`}>
              Direct Executive Desk
            </h3>

            <div className="space-y-4 font-mono text-xs font-bold uppercase tracking-wider">
              {/* Phone */}
              <div className={`p-4 rounded-xl border flex items-center gap-3.5 ${
                isDark ? "bg-zinc-900/50 border-zinc-800" : "bg-white border-zinc-200 shadow-sm"
              }`}>
                <div className="p-2 rounded-lg bg-[#D4A34A]/10 border border-[#D4A34A]/20 text-[#D4A34A]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[8px] text-zinc-500 block">EXECUTIVE PHONE HELPLINE</span>
                  <span className={isDark ? "text-white" : "text-zinc-900"}>+1 (800) 555-SPRK</span>
                </div>
              </div>

              {/* Email */}
              <div className={`p-4 rounded-xl border flex items-center gap-3.5 ${
                isDark ? "bg-zinc-900/50 border-zinc-800" : "bg-white border-zinc-200 shadow-sm"
              }`}>
                <div className="p-2 rounded-lg bg-[#D4A34A]/10 border border-[#D4A34A]/20 text-[#D4A34A]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[8px] text-zinc-500 block">SECURED BRAND INQUIRIES</span>
                  <span className={`lowercase ${isDark ? "text-white" : "text-zinc-900"}`}>showroom@sparklerfid.com</span>
                </div>
              </div>

              {/* Head office location */}
              <div className={`p-4 rounded-xl border flex items-center gap-3.5 ${
                isDark ? "bg-zinc-900/50 border-zinc-800" : "bg-white border-zinc-200 shadow-sm"
              }`}>
                <div className="p-2 rounded-lg bg-[#D4A34A]/10 border border-[#D4A34A]/20 text-[#D4A34A]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[8px] text-zinc-500 block">NEW YORK SHOWROOM</span>
                  <span className={`normal-case leading-relaxed block ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>
                    742 Fifth Avenue, Suite 1200<br />
                    New York, NY 10019
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Reusable Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm theme={theme} />
          </div>

        </div>
      </div>
    </div>
  );
};
