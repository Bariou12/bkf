"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1590675484259-6bd4c6df7ed8?w=1920&q=85&fit=crop",
    title: "FONDATION BKF",
    subtitle: "Bâtir un avenir enraciné\ndans nos valeurs.",
    body: "Institution togolaise engagée dans la transformation culturelle, sociale et économique durable à travers des projets structurants.",
    cta1: "Découvrir la Fondation",
    cta2: "Nos projets",
    accent: "#F2B632",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=1920&q=85&fit=crop",
    title: "TRANSMISSION",
    subtitle: "Transmettre aujourd'hui.\nÉlever demain.",
    body: "La Fondation BKF cultive le lien entre générations, valorisant le patrimoine Ewé comme fondement d'un avenir solide.",
    cta1: "Notre vision",
    cta2: "Culture & Patrimoine",
    accent: "#F2B632",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=85&fit=crop",
    title: "AVENIR",
    subtitle: "Construire pour les\ngénérations futures.",
    body: "Chaque initiative de la Fondation BKF trace un chemin durable — pour les enfants de Notsè et au-delà.",
    cta1: "Nos initiatives",
    cta2: "Nous rejoindre",
    accent: "#F2B632",
  },
];

const SLIDE_DURATION = 6000;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating || index === current) return;
      setIsAnimating(true);
      setCurrent(index);
      setProgress(0);
      setTimeout(() => setIsAnimating(false), 1000);
    },
    [current, isAnimating]
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  useEffect(() => {
    let start: number | null = null;
    let raf: number;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(step);
      } else {
        next();
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [current, next]);

  const slide = slides[current];

  return (
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden bg-[#0F0F0F]">
      {/* Background images */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          {/* Layered overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F]/85 via-[#0F0F0F]/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/60 via-transparent to-[#0F0F0F]/20" />
          {/* Grain texture */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "256px 256px",
            }}
          />
          {/* Terre-colored left edge accent */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#F2B632]/60 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id + "-content"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl"
            >
              {/* Foundation label */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="w-10 h-[1px] bg-[#F2B632]" />
                <span
                  className="text-[#F2B632] text-xs tracking-[0.25em] uppercase"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {slide.title}
                </span>
              </motion.div>

              {/* Main title */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-white mb-6 leading-[1.05]"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(3rem, 6vw, 5.5rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.02em",
                  whiteSpace: "pre-line",
                }}
              >
                {slide.subtitle}
              </motion.h1>

              {/* Gold line */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "4rem" }}
                transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
                className="h-[2px] bg-gradient-to-r from-[#F2B632] to-[#e8a820] mb-7"
              />

              {/* Body */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.7, ease: "easeOut" }}
                className="text-white/70 leading-relaxed mb-10 max-w-lg"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
                  fontWeight: 300,
                }}
              >
                {slide.body}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.7, ease: "easeOut" }}
                className="flex flex-wrap gap-4"
              >
                <button className="bkf-btn-gold">
                  {slide.cta1}
                  <ArrowRight size={14} />
                </button>
                <button className="bkf-btn-outline">
                  {slide.cta2}
                </button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            className="relative h-[2px] overflow-hidden cursor-pointer group"
            style={{ width: i === current ? 48 : 24 }}
          >
            <div className="absolute inset-0 bg-white/30" />
            {i === current && (
              <motion.div
                className="absolute inset-y-0 left-0 bg-[#F2B632]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0 }}
              />
            )}
            {i !== current && (
              <div className="absolute inset-0 bg-white/30 group-hover:bg-white/60 transition-colors" />
            )}
          </button>
        ))}
      </div>

      {/* Slide counter */}
      <div
        className="absolute bottom-12 right-16 z-20 text-white/40 text-xs tracking-[0.2em]"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        0{current + 1} / 0{slides.length}
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-12 left-16 z-20 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#F2B632] to-transparent" />
        <ChevronDown size={14} className="text-[#F2B632]" />
      </motion.div>
    </section>
  );
}
