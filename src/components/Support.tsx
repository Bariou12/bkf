"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Support() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden" style={{ backgroundColor: "#0F0F0F" }}>
      {/* Background image */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=1920&q=70&fit=crop"
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: "blur(3px) brightness(0.3)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F]/90 via-[#0F0F0F]/70 to-[#0F0F0F]/90" />
        {/* Grain */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Gold accent top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#F2B632]/50 to-transparent" />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-8 lg:px-16 py-32 text-center">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="w-8 h-[1px] bg-[#F2B632]/60" />
          <span
            className="text-[#F2B632] text-xs tracking-[0.25em] uppercase"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Engagement collectif
          </span>
          <div className="w-8 h-[1px] bg-[#F2B632]/60" />
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.15 }}
          className="text-white leading-[1.1] mb-8"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2.5rem, 5.5vw, 5rem)",
            fontWeight: 300,
            letterSpacing: "-0.02em",
          }}
        >
          Soutenir la{" "}
          <em className="italic" style={{ color: "#F2B632" }}>
            Fondation BKF.
          </em>
        </motion.h2>

        {/* Gold line */}
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: "4rem" } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="h-[2px] bg-[#F2B632] mx-auto mb-8"
        />

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-white/60 leading-relaxed mb-12 max-w-2xl mx-auto"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "1rem",
            fontWeight: 300,
          }}
        >
          La transformation durable nécessite un engagement collectif. La Fondation BKF évolue
          grâce au soutien de partenaires et citoyens partageant cette vision d&apos;un Togo
          fort de son identité et tourné vers l&apos;avenir.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <button className="bkf-btn-gold text-[#0F0F0F]">
            Soutenir notre vision
            <ArrowRight size={14} />
          </button>
        </motion.div>

        {/* Subtle note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-8 text-white/25 text-xs tracking-wider"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Partenariats institutionnels · Dons individuels · Mécénat d&apos;entreprise
        </motion.p>
      </div>
    </section>
  );
}
