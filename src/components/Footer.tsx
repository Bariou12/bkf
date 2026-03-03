"use client";

import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="relative py-20 overflow-hidden"
      style={{ backgroundColor: "#0F0F0F" }}
    >
      {/* Top gold border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#F2B632]/30 to-transparent" />

      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-8 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 flex items-center justify-center"
                style={{
                  backgroundColor: "#F2B632",
                  clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                }}
              >
                <span
                  className="text-[#0F0F0F] font-bold"
                  style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.9rem" }}
                >
                  BKF
                </span>
              </div>
              <span
                className="text-white"
                style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem", letterSpacing: "0.05em" }}
              >
                FONDATION BKF
              </span>
            </div>

            <p
              className="text-white/40 leading-relaxed mb-6 max-w-sm"
              style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", fontWeight: 300 }}
            >
              Institution togolaise engagée dans la transformation culturelle, sociale et
              économique durable à travers des projets structurants.
            </p>

            <blockquote
              className="text-[#F2B632]/70 italic"
              style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem" }}
            >
              &ldquo;Un peuple qui honore ses racines construit un avenir solide.&rdquo;
            </blockquote>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-white text-xs tracking-[0.2em] uppercase mb-6"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}
            >
              Navigation
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { label: "La Fondation", href: "/fondation" },
                  { label: "Nos piliers", href: "/piliers" },
                  { label: "Nos projets", href: "/projets" },
                  { label: "Actualité", href: "/actualites" },
                { label: "Nous soutenir", href: "/#soutenir" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-white/40 hover:text-[#F2B632] transition-colors flex items-center gap-2 group"
                  style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", fontWeight: 300 }}
                >
                    <span className="w-3 h-[1px] bg-[#F2B632]/0 group-hover:bg-[#F2B632] transition-all" />
                    {item.label}
                  </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-white text-xs tracking-[0.2em] uppercase mb-6"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}
            >
              Contact
            </h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin size={14} className="text-[#F2B632] mt-0.5 flex-shrink-0" />
                <p
                  className="text-white/40"
                  style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", fontWeight: 300 }}
                >
                  Notsè, Région Plateaux<br />République Togolaise
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-[#F2B632] flex-shrink-0" />
                <a
                  href="mailto:contact@fondationbkf.org"
                  className="text-white/40 hover:text-[#F2B632] transition-colors"
                  style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", fontWeight: 300 }}
                >
                  contact@fondationbkf.org
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-[#F2B632] flex-shrink-0" />
                <a
                  href="tel:+228"
                  className="text-white/40 hover:text-[#F2B632] transition-colors"
                  style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", fontWeight: 300 }}
                >
                  +228 XX XX XX XX
                </a>
              </div>
            </div>

            <button
              className="mt-8 flex items-center gap-2 text-[#F2B632] hover:gap-3 transition-all"
              style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}
            >
              Nous écrire
              <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-white/20 text-xs"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            © {new Date().getFullYear()} Fondation BKF. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            {["Politique de confidentialité", "Mentions légales"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-white/20 hover:text-white/50 transition-colors text-xs"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
