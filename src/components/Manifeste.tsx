"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Manifeste() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-32 lg:py-40 overflow-hidden"
      style={{ backgroundColor: "#E9E6E1" }}
    >
      {/* Subtle mineral background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B4B32' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Background BIG word */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 text-[#8B4B32]/[0.04] select-none pointer-events-none"
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(8rem, 18vw, 22rem)",
          fontWeight: 700,
          letterSpacing: "-0.05em",
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        IDENTITÉ
      </div>

      <div className="max-w-7xl mx-auto px-8 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            {/* Main image */}
            <div className="relative img-zoom-wrap" style={{ aspectRatio: "3/4" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1517638851339-a711cfcf3279?w=900&q=85&fit=crop&crop=faces"
                alt="Enfant togolais — Transmission culturelle"
                className="w-full h-full object-cover"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%)" }}
              />
              {/* Terre color overlay on bottom */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(139,75,50,0.3) 0%, transparent 50%)",
                  clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%)",
                }}
              />
            </div>

            {/* Floating accent block */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
              className="absolute -bottom-8 -right-8 w-40 h-40 flex items-center justify-center"
              style={{ backgroundColor: "#8B4B32" }}
            >
              <div className="text-center p-4">
                <div
                  className="text-[#F2B632] text-5xl font-light leading-none mb-1"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  15
                </div>
                <div
                  className="text-white/70 text-xs tracking-wider uppercase"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  ans d&apos;engagement
                </div>
              </div>
            </motion.div>

            {/* Gold vertical accent */}
            <div className="absolute -left-4 top-16 bottom-16 w-[2px] bg-gradient-to-b from-transparent via-[#F2B632] to-transparent" />
          </motion.div>

          {/* Right — Text */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-[#F2B632]" />
              <span
                className="text-[#8B4B32] text-xs tracking-[0.25em] uppercase"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Notre mission
              </span>
            </div>

            {/* Title */}
            <h2
              className="text-[#0F0F0F] leading-[1.1] mb-8"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(2.5rem, 4.5vw, 4rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
              }}
            >
              Une vision qui{" "}
              <em
                className="not-italic"
                style={{
                  color: "#8B4B32",
                  fontStyle: "italic",
                }}
              >
                dépasse
              </em>{" "}
              le présent.
            </h2>

            {/* Gold line */}
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: "3rem" } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="h-[2px] bg-[#F2B632] mb-8"
            />

            {/* Text */}
            <div
              className="space-y-5 text-[#0F0F0F]/70 leading-relaxed mb-10"
              style={{ fontFamily: "var(--font-inter)", fontSize: "0.9375rem", fontWeight: 300 }}
            >
              <p>
                La Fondation BKF est née d&apos;une conviction profonde : le développement durable
                d&apos;un territoire repose sur la valorisation de son identité, de sa culture et de son
                potentiel humain.
              </p>
              <p>
                À Notsè et au-delà, nous portons une ambition structurante : créer des écosystèmes
                capables de générer croissance économique, cohésion sociale et transmission culturelle.
              </p>
              <p>
                Notre approche repose sur l&apos;intégration : culture, agriculture, entrepreneuriat,
                solidarité et média agissent ensemble pour produire un impact durable.
              </p>
            </div>

            {/* Citation */}
            <blockquote
              className="bkf-vertical-line mb-10"
              style={{ borderLeftColor: "#F2B632" }}
            >
              <p
                className="text-[#0F0F0F]/80 leading-relaxed"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                  fontWeight: 400,
                  fontStyle: "italic",
                }}
              >
                &ldquo;Un peuple qui honore ses racines construit un avenir solide.&rdquo;
              </p>
            </blockquote>

            {/* CTA */}
            <button className="bkf-btn-gold" style={{ color: "#0F0F0F" }}>
              En savoir plus
              <ArrowRight size={14} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
