"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "La Fondation", href: "/fondation" },
  { label: "Nos piliers", href: "/piliers" },
  { label: "Projets", href: "/projets" },
  { label: "Actualité", href: "/actualites" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(15,15,15,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(242,182,50,0.1)" : "none",
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 group">
              {/* Logo mark */}
              <div
                className="w-9 h-9 flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                style={{
                  backgroundColor: "#F2B632",
                  clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                }}
              >
                <span
                  className="text-[#0F0F0F] font-bold text-sm"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  BKF
                </span>
              </div>

              {/* Logo text */}
              <div>
                <div
                  className="text-white text-sm font-medium leading-tight"
                  style={{ fontFamily: "var(--font-cormorant)", letterSpacing: "0.05em" }}
                >
                  FONDATION BKF
                </div>
                <div
                  className="text-white/40 text-[9px] tracking-[0.2em] uppercase leading-tight"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Notsè · Togo
                </div>
              </div>
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="group relative text-white/70 hover:text-white transition-colors duration-300"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                  }}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#F2B632] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* CTA + menu */}
            <div className="flex items-center gap-4">
              <button
                className="hidden lg:flex items-center gap-2 text-[#0F0F0F] transition-all duration-300 hover:shadow-[0_4px_20px_rgba(242,182,50,0.4)] hover:-translate-y-0.5"
                style={{
                  backgroundColor: "#F2B632",
                  padding: "0.6rem 1.5rem",
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                }}
              >
                Nous soutenir
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden text-white p-2"
                aria-label="Menu"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{ backgroundColor: "#0F0F0F" }}
          >
            {/* Grain */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }}
            />

            <div className="relative z-10 flex flex-col h-full p-8 pt-24">
              {/* Close */}
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-6 right-8 text-white"
              >
                <X size={24} />
              </button>

              {/* Nav links */}
              <nav className="flex flex-col gap-1 flex-1 justify-center">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 + 0.1, duration: 0.5 }}
                    className="text-white/80 hover:text-[#F2B632] transition-colors py-3 border-b border-white/10"
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "2rem",
                      fontWeight: 300,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              {/* Bottom info */}
              <div className="pb-8">
                <p
                  className="text-white/30 text-xs tracking-wider mb-4"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Fondation BKF · Notsè, Togo
                </p>
                <button className="bkf-btn-gold w-full justify-center">
                  Nous soutenir
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
