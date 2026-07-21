import React from "react";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "../data/products";

interface TestimonialsSectionProps {
  theme: "light" | "dark";
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ theme }) => {
  const isDark = theme === "dark";

  return (
    <section className={`py-28 transition-colors duration-300 border-b ${
      isDark ? "bg-zinc-950 border-zinc-900 text-white" : "bg-zinc-100 border-zinc-200 text-zinc-900"
    }`} id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] font-mono text-[#D4A34A] uppercase tracking-widest font-black block">
            Client Success Records
          </span>
          <h2 className={`text-2xl sm:text-3xl font-display font-black tracking-wide uppercase ${
            isDark ? "text-white" : "text-zinc-950"
          }`}>
            Trusted by the Finest Jewellers
          </h2>
          <p className={`text-sm max-w-xl mx-auto leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-650"}`}>
            From single-room master boutiques to multi-location gemstone showroom enterprises.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className={`p-8 rounded-3xl flex flex-col justify-between gap-6 shadow-2xl border transition-all duration-300 ${
                isDark 
                  ? "bg-zinc-900 border-zinc-800 text-white hover:border-[#D4A34A]/50" 
                  : "bg-white border-zinc-200 text-zinc-900 hover:border-[#D4A34A]/50 shadow-sm"
              }`}
            >
              <div className="space-y-4">
                {/* Stars and Audience Type */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-[#D4A34A]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <span className={`text-[9px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    test.type === "b2b"
                      ? "bg-[#D4A34A]/10 text-[#D4A34A] border border-[#D4A34A]/20"
                      : isDark
                        ? "bg-zinc-800 text-zinc-300 border border-zinc-700"
                        : "bg-zinc-100 text-zinc-600 border border-zinc-200"
                  }`}>
                    {test.type === "b2b" ? "Showroom Network" : "Independent Boutique"}
                  </span>
                </div>

                <p className={`text-sm leading-relaxed italic font-medium ${isDark ? "text-zinc-300" : "text-zinc-750"}`}>
                  "{test.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold font-mono text-xs uppercase tracking-wider border ${
                  isDark ? "bg-zinc-950 border-zinc-850 text-[#D4A34A]" : "bg-zinc-100 border-zinc-205 text-[#B98A32]"
                }`}>
                  {test.author.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <span className={`font-bold block text-sm ${isDark ? "text-white" : "text-zinc-955"}`}>{test.author}</span>
                  <span className="text-[11px] block leading-none mt-1 font-medium text-zinc-500">
                    {test.role}, <strong className={`font-bold ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>{test.company}</strong>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
