"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

export default function Heritage() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Full screen background */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1920&q=85&fit=crop"
          alt="Paysage togolais au coucher du soleil"
          className="w-full h-full object-cover"
        />
        {/* Multi-layer overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F]/30 via-transparent to-[#0F0F0F]/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#8B4B32]/20 via-transparent to-transparent" />
        {/* Grain */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div ref={ref} className="relative z-10 w-full max-w-7xl mx-auto px-8 lg:px-16 pb-24 pt-40">
        <div className="max-w-3xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-8 h-[1px] bg-[#F2B632]" />
            <span
              className="text-[#F2B632] text-xs tracking-[0.25em] uppercase"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Héritage
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-white leading-[1.1] mb-8"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2.5rem, 5.5vw, 5rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
            }}
          >
            Un héritage se construit{" "}
            <em className="italic" style={{ color: "#F2B632" }}>
              aujourd&apos;hui
            </em>{" "}
            pour les générations futures.
          </motion.h2>

          {/* Gold divider */}
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "5rem" } : {}}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="h-[2px] bg-gradient-to-r from-[#F2B632] to-[#e8a820] mb-10"
          />

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="flex flex-wrap gap-4"
          >
            <button className="bkf-btn-gold">
              <Mail size={14} />
              Entrer en contact
            </button>
            <button className="bkf-btn-outline">
              À propos de la Fondation
              <ArrowRight size={14} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
