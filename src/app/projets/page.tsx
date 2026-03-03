"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ─── Scroll reveal hook ───────────────────────────────────
function useReveal(margin = "-80px") {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: margin as Parameters<typeof useInView>[1]["margin"] });
  return { ref, inView };
}

// ─── Gold animated line ───────────────────────────────────
function GoldLine({ visible, width = "4rem" }: { visible: boolean; width?: string }) {
  return (
    <motion.div
      className="h-[2px] bg-gradient-to-r from-[#F2B632] to-[#e8a820]"
      initial={{ width: 0 }}
      animate={{ width: visible ? width : 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    />
  );
}

// ─── Section label ────────────────────────────────────────
function SectionLabel({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-8 h-[1px] bg-[#F2B632]" />
      <span
        className={`text-xs tracking-[0.25em] uppercase ${light ? "text-white/50" : "text-[#F2B632]"}`}
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {text}
      </span>
    </div>
  );
}

// ─── Grain overlay ────────────────────────────────────────
function Grain({ opacity = 0.04 }: { opacity?: number }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

// ─── Hero ─────────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#0F0F0F]"
      style={{ height: "90vh", minHeight: 700 }}
    >
      {/* Parallax image */}
      <motion.div className="absolute inset-0 scale-110" style={{ y: imgY }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1920&q=85&fit=crop"
          alt="Enfants togolais"
          className="w-full h-full object-cover"
          onLoad={() => setLoaded(true)}
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F]/90 via-[#0F0F0F]/65 to-[#3a1a0a]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/70 via-transparent to-[#0F0F0F]/30" />
        {/* Terre texture overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(139,75,50,0.15) 0%, transparent 60%)" }}
        />
        <Grain />
      </motion.div>

      {/* Left gold accent */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-transparent via-[#F2B632]/70 to-transparent z-10" />

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex items-center"
        style={{ y: textY }}
      >
        <div className="max-w-7xl mx-auto px-8 lg:px-16 w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={loaded ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-10 h-[1px] bg-[#F2B632]" />
            <span
              className="text-[#F2B632] text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Fondation BKF · Nos Projets
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-white leading-[1.05] mb-6 max-w-3xl"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(3rem, 6vw, 5.5rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
            }}
          >
            Des initiatives structurantes au service{" "}
            <em className="italic" style={{ color: "#F2B632" }}>
              d&apos;une vision globale.
            </em>
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={loaded ? { width: "5rem" } : {}}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="h-[2px] bg-gradient-to-r from-[#F2B632] to-[#e8a820] mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1, duration: 0.7 }}
            className="text-white/65 leading-relaxed max-w-xl mb-12"
            style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)", fontWeight: 300 }}
          >
            Chaque projet de la Fondation BKF incarne une stratégie intégrée de transformation
            culturelle, sociale et économique durable.
          </motion.p>

          <motion.a
            href="#projets"
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.7 }}
            className="bkf-btn-outline inline-flex"
          >
            Explorer nos initiatives
            <ArrowDown size={14} />
          </motion.a>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#F2B632] to-transparent" />
        <ArrowDown size={12} className="text-[#F2B632]" />
      </motion.div>
    </section>
  );
}

// ─── Section 1 — Intro Stratégique ──────────────────────
function IntroStrategique() {
  const { ref, inView } = useReveal("-60px");

  const nodes = [
    { angle: -90, label: "Culture" },
    { angle: -30, label: "Agriculture" },
    { angle: 30, label: "Tourisme" },
    { angle: 90, label: "Média" },
    { angle: 150, label: "Formation" },
    { angle: 210, label: "Patrimoine" },
  ];

  return (
    <section className="relative py-28 overflow-hidden" style={{ backgroundColor: "#E9E6E1" }}>
      {/* Subtle mineral texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-8 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Text */}
          <div ref={ref}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <SectionLabel text="Vision stratégique" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="leading-[1.1] mb-4"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(2.2rem, 4vw, 3.8rem)",
                fontWeight: 300,
                color: "#0F0F0F",
                letterSpacing: "-0.02em",
              }}
            >
              Une stratégie{" "}
              <em className="italic" style={{ color: "#8B4B32" }}>
                d&apos;écosystème.
              </em>
            </motion.h2>

            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: "3rem" } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="h-[2px] bg-[#F2B632] mb-6"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="leading-relaxed mb-5"
              style={{ fontFamily: "var(--font-inter)", fontSize: "1rem", fontWeight: 300, color: "#3a2a22" }}
            >
              Les projets de la Fondation BKF ne sont pas isolés. Ils s&apos;inscrivent
              dans une logique d&apos;interconnexion et de complémentarité visant à produire
              un impact durable sur le territoire.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="leading-relaxed"
              style={{ fontFamily: "var(--font-inter)", fontSize: "1rem", fontWeight: 300, color: "#6b5a4e" }}
            >
              Culture, agriculture, tourisme, formation — chaque domaine renforce les
              autres dans un modèle intégré conçu pour durer.
            </motion.p>
          </div>

          {/* Orbit infographic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex justify-center items-center"
          >
            <div className="relative" style={{ width: 340, height: 340 }}>
              {/* Outer orbit ring */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 340 340">
                <circle
                  cx="170"
                  cy="170"
                  r="130"
                  fill="none"
                  stroke="#F2B632"
                  strokeWidth="0.5"
                  strokeDasharray="4 6"
                  opacity="0.4"
                />
                <circle
                  cx="170"
                  cy="170"
                  r="85"
                  fill="none"
                  stroke="#8B4B32"
                  strokeWidth="0.5"
                  strokeDasharray="2 8"
                  opacity="0.25"
                />
                {/* Connecting lines from center to nodes */}
                {nodes.map((node, i) => {
                  const rad = (node.angle * Math.PI) / 180;
                  const x2 = 170 + 130 * Math.cos(rad);
                  const y2 = 170 + 130 * Math.sin(rad);
                  return (
                    <motion.line
                      key={i}
                      x1="170"
                      y1="170"
                      x2={x2}
                      y2={y2}
                      stroke="#F2B632"
                      strokeWidth="0.8"
                      opacity="0.35"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={inView ? { pathLength: 1, opacity: 0.35 } : {}}
                      transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
                    />
                  );
                })}
              </svg>

              {/* Center node */}
              <div
                className="absolute flex flex-col items-center justify-center"
                style={{
                  width: 90,
                  height: 90,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "#8B4B32",
                  clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                }}
              >
                <div
                  className="w-7 h-7 flex items-center justify-center mb-1"
                  style={{
                    backgroundColor: "#F2B632",
                    clipPath: "polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px))",
                  }}
                >
                  <span
                    className="text-[#0F0F0F] font-bold"
                    style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.65rem" }}
                  >
                    BKF
                  </span>
                </div>
                <span
                  className="text-white text-center"
                  style={{ fontFamily: "var(--font-inter)", fontSize: "0.55rem", letterSpacing: "0.12em", opacity: 0.8 }}
                >
                  FONDATION
                </span>
              </div>

              {/* Orbit nodes */}
              {nodes.map((node, i) => {
                const rad = (node.angle * Math.PI) / 180;
                const x = 170 + 130 * Math.cos(rad);
                const y = 170 + 130 * Math.sin(rad);
                return (
                  <motion.div
                    key={i}
                    className="absolute flex items-center justify-center"
                    style={{
                      left: x,
                      top: y,
                      transform: "translate(-50%, -50%)",
                      width: 52,
                      height: 52,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.7 + i * 0.1, ease: "backOut" }}
                  >
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{
                        backgroundColor: i % 2 === 0 ? "#0F0F0F" : "#E9E6E1",
                        border: `1px solid ${i % 2 === 0 ? "#F2B632" : "#8B4B32"}`,
                        borderRadius: "50%",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "0.5rem",
                          fontWeight: 600,
                          letterSpacing: "0.08em",
                          color: i % 2 === 0 ? "#F2B632" : "#8B4B32",
                          textTransform: "uppercase",
                          textAlign: "center",
                        }}
                      >
                        {node.label}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Project block ────────────────────────────────────────
interface ProjectBlockProps {
  tag: string;
  title: string;
  description: string;
  axes: string[];
  image: string;
  imageAlt: string;
  reverse?: boolean;
  dark?: boolean;
  cta?: string;
}

function ProjectBlock({
  tag,
  title,
  description,
  axes,
  image,
  imageAlt,
  reverse = false,
  dark = false,
  cta = "Découvrir le projet",
}: ProjectBlockProps) {
  const { ref, inView } = useReveal("-60px");

  const bg = dark ? "#0F0F0F" : "#FFFFFF";
  const textPrimary = dark ? "#FFFFFF" : "#0F0F0F";
  const textSecondary = dark ? "rgba(255,255,255,0.6)" : "#6b5a4e";

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: bg }}>
      <Grain opacity={0.03} />
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#F2B632]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-8 lg:px-16 py-24 relative z-10">
        <div
          ref={ref}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch ${
            reverse ? "lg:[direction:rtl]" : ""
          }`}
        >
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: reverse ? 60 : -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="img-zoom-wrap relative overflow-hidden"
            style={{
              aspectRatio: "4/3",
              direction: "ltr",
              clipPath: reverse
                ? "polygon(24px 0, 100% 0, 100% 100%, 0 100%, 0 24px)"
                : "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={imageAlt}
              className="w-full h-full object-cover"
            />
            {/* Warm color grade */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#8B4B32]/30 via-transparent to-transparent" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: reverse ? -60 : 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`flex flex-col justify-center px-0 lg:px-14 py-12 lg:py-0 ${
              reverse ? "direction: ltr" : ""
            }`}
            style={{ direction: "ltr" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-[1px] bg-[#F2B632]" />
              <span
                className="text-[#F2B632] text-xs tracking-[0.25em] uppercase"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {tag}
              </span>
            </div>

            <h2
              className="leading-tight mb-4"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                fontWeight: 300,
                color: textPrimary,
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </h2>

            <GoldLine visible={inView} width="3.5rem" />

            <p
              className="mt-6 mb-8 leading-relaxed"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.95rem",
                fontWeight: 300,
                color: textSecondary,
              }}
            >
              {description}
            </p>

            {/* Axes */}
            <div className="grid grid-cols-1 gap-2 mb-10">
              {axes.map((axis, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: "#F2B632" }} />
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.85rem",
                      fontWeight: 300,
                      color: textSecondary,
                    }}
                  >
                    {axis}
                  </span>
                </motion.div>
              ))}
            </div>

            <a
              href="#"
              className={`inline-flex items-center gap-2 group w-fit ${
                dark ? "text-[#F2B632]" : "text-[#8B4B32]"
              }`}
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              {cta}
              <ArrowRight
                size={12}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Complexe Hôtelier — Wave section ─────────────────────
function ComplexeHotelierSection() {
  const { ref, inView } = useReveal("-60px");

  const axes = [
    "Tourisme durable et responsable",
    "Valorisation du patrimoine naturel togolais",
    "Développement économique local",
    "Emplois directs et indirects",
  ];

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: "#E9E6E1" }}>
      {/* Wave top */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-[0] z-10">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="block w-full" preserveAspectRatio="none" style={{ height: 60 }}>
          <path d="M0,20 C360,60 720,0 1080,40 C1260,60 1380,20 1440,30 L1440,0 L0,0 Z" fill="#FFFFFF" />
        </svg>
      </div>
      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-[0] z-10">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="block w-full" preserveAspectRatio="none" style={{ height: 60 }}>
          <path d="M0,40 C240,0 480,60 720,30 C960,0 1200,60 1440,20 L1440,60 L0,60 Z" fill="#0F0F0F" />
        </svg>
      </div>

      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div ref={ref} className="max-w-7xl mx-auto px-8 lg:px-16 py-36 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-[1px] bg-[#F2B632]" />
              <span className="text-[#F2B632] text-xs tracking-[0.25em] uppercase" style={{ fontFamily: "var(--font-inter)" }}>
                Tourisme Responsable
              </span>
            </div>

            <h2
              className="leading-tight mb-4"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                fontWeight: 300,
                color: "#0F0F0F",
                letterSpacing: "-0.02em",
              }}
            >
              Complexe Hôtelier{" "}
              <em className="italic" style={{ color: "#8B4B32" }}>
                & Écotourisme
              </em>
            </h2>

            <GoldLine visible={inView} width="3.5rem" />

            <p
              className="mt-6 mb-8 leading-relaxed"
              style={{ fontFamily: "var(--font-inter)", fontSize: "0.95rem", fontWeight: 300, color: "#6b5a4e" }}
            >
              Développer une infrastructure touristique responsable favorisant l&apos;attractivité
              du territoire et la création d&apos;emplois locaux, dans le respect de l&apos;environnement
              naturel togolais.
            </p>

            <div className="grid grid-cols-1 gap-2 mb-10">
              {axes.map((axis, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-1 h-1 rounded-full bg-[#F2B632]" />
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.85rem", fontWeight: 300, color: "#6b5a4e" }}>
                    {axis}
                  </span>
                </motion.div>
              ))}
            </div>

            <a
              href="#"
              className="inline-flex items-center gap-2 group text-[#8B4B32]"
              style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}
            >
              Découvrir le projet
              <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="img-zoom-wrap relative overflow-hidden"
            style={{
              aspectRatio: "4/3",
              clipPath: "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200&q=85&fit=crop"
              alt="Complexe Hôtelier & Écotourisme Togo"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tl from-[#8B4B32]/20 via-transparent to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Impact Global ─────────────────────────────────────────
function ImpactGlobal() {
  const { ref, inView } = useReveal("-60px");

  const stats = [
    { number: "5+", label: "Initiatives majeures" },
    { number: "1 000+", label: "Emplois ciblés" },
    { number: "4", label: "Domaines d'action" },
    { number: "1", label: "Vision intégrée" },
  ];

  return (
    <section className="relative py-28 overflow-hidden" style={{ backgroundColor: "#E9E6E1" }}>
      {/* Background image faint */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1920&q=70&fit=crop"
          alt=""
          className="w-full h-full object-cover opacity-[0.06]"
        />
        <div className="absolute inset-0" style={{ backgroundColor: "#E9E6E1", opacity: 0.85 }} />
      </div>
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#8B4B32]/20 to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto px-8 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <SectionLabel text="Impact" />
          <h2
            className="leading-tight"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2.5rem, 4.5vw, 4rem)",
              fontWeight: 300,
              color: "#0F0F0F",
              letterSpacing: "-0.02em",
            }}
          >
            Un impact{" "}
            <em className="italic" style={{ color: "#8B4B32" }}>
              structurant.
            </em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: "rgba(139,75,50,0.1)" }}>
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.12 }}
              className="flex flex-col items-center justify-center py-14 px-6 text-center"
              style={{ backgroundColor: "#E9E6E1" }}
            >
              <span
                className="block mb-3"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
                  fontWeight: 300,
                  color: "#8B4B32",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}
              >
                {stat.number}
              </span>
              <div className="w-8 h-[1px] bg-[#F2B632] mb-3" />
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#6b5a4e",
                }}
              >
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Synergie ──────────────────────────────────────────────
function Synergie() {
  const { ref, inView } = useReveal("-60px");

  const projectNames = ["Dzotsope\nCenter", "BKF\nSonghaï", "Complexe\nHôtelier", "Dzotsope\nTV"];
  const positions = [
    { x: "20%", y: "20%" },
    { x: "72%", y: "18%" },
    { x: "18%", y: "72%" },
    { x: "70%", y: "70%" },
  ];
  const connections = [
    [0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3],
  ];

  // SVG coordinates for connection lines (percentage to svg 400x300)
  const svgPositions = [
    { x: 80, y: 60 },
    { x: 288, y: 54 },
    { x: 72, y: 216 },
    { x: 280, y: 210 },
  ];

  return (
    <section className="relative py-28 overflow-hidden" style={{ backgroundColor: "#0F0F0F" }}>
      <Grain />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F2B632]/30 to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto px-8 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-[1px] bg-[#F2B632]" />
              <span className="text-[#F2B632] text-xs tracking-[0.25em] uppercase" style={{ fontFamily: "var(--font-inter)" }}>
                Écosystème BKF
              </span>
            </div>

            <h2
              className="text-white leading-tight mb-4"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(2.2rem, 4vw, 3.8rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
              }}
            >
              Des projets{" "}
              <em className="italic" style={{ color: "#F2B632" }}>
                complémentaires.
              </em>
            </h2>

            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: "3rem" } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="h-[2px] bg-[#F2B632] mb-6"
            />

            <p
              className="leading-relaxed mb-10"
              style={{ fontFamily: "var(--font-inter)", fontSize: "0.95rem", fontWeight: 300, color: "rgba(255,255,255,0.6)" }}
            >
              La complémentarité des projets permet de créer un modèle intégré où culture,
              agriculture, entrepreneuriat et transmission se renforcent mutuellement
              pour un impact durable.
            </p>

            <a href="/" className="bkf-btn-gold inline-flex">
              Découvrir la Fondation
              <ArrowRight size={14} />
            </a>
          </motion.div>

          {/* Animated connection graph */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <div className="relative" style={{ height: 300 }}>
              {/* SVG lines */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 360 300"
                preserveAspectRatio="xMidYMid meet"
              >
                {connections.map(([a, b], i) => (
                  <motion.line
                    key={i}
                    x1={svgPositions[a].x}
                    y1={svgPositions[a].y}
                    x2={svgPositions[b].x}
                    y2={svgPositions[b].y}
                    stroke="#F2B632"
                    strokeWidth="0.8"
                    opacity={0.25}
                    initial={{ pathLength: 0 }}
                    animate={inView ? { pathLength: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                  />
                ))}
              </svg>

              {/* Project nodes */}
              {projectNames.map((name, i) => (
                <motion.div
                  key={i}
                  className="absolute flex items-center justify-center text-center"
                  style={{
                    left: positions[i].x,
                    top: positions[i].y,
                    transform: "translate(-50%, -50%)",
                    width: 96,
                    height: 68,
                    backgroundColor: i === 0 ? "#8B4B32" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${i === 0 ? "#8B4B32" : "rgba(242,182,50,0.3)"}`,
                    clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.15, ease: "backOut" }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.6rem",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: i === 0 ? "#F2B632" : "rgba(242,182,50,0.7)",
                      whiteSpace: "pre-line",
                      textAlign: "center",
                    }}
                  >
                    {name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────
export default function ProjetsPage() {
  return (
    <main>
      <Header />
      <Hero />

      <IntroStrategique />

      {/* Projects */}
      <div id="projets">
        <ProjectBlock
          tag="Culture & Architecture"
          title="DZOTSOPE CENTER"
          description="Un pôle culturel et spirituel destiné à faire de Notsè un centre de mémoire, de transmission et de valorisation du patrimoine Ewé, dans une architecture contemporaine ancrée dans la tradition."
          axes={[
            "Sanctuaire culturel & arena de rassemblement",
            "Salon d'art & expositions patrimoniales",
            "Valorisation du patrimoine historique Ewé",
            "Espace de transmission intergénérationnelle",
          ]}
          image="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200&q=85&fit=crop"
          imageAlt="Dzotsope Center — pôle culturel togolais"
          dark
          cta="Découvrir le projet"
        />

        <ProjectBlock
          tag="Agriculture & Formation"
          title="BKF SONGHAÏ TOGO"
          description="Un centre d'excellence en agriculture durable visant à former une nouvelle génération d'agro-entrepreneurs capables de créer de vraies filières locales."
          axes={[
            "Production intégrée et élevage durable",
            "Formation technique des jeunes",
            "Transformation et valorisation agroalimentaire",
            "Création d'emplois et d'entreprises locales",
          ]}
          image="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=1200&q=85&fit=crop"
          imageAlt="BKF Songhaï Togo — formation agricole"
          reverse
        />

        <ComplexeHotelierSection />

        <ProjectBlock
          tag="Média & Storytelling"
          title="DZOTSOPE TV"
          description="Un média dédié à la documentation, à la transmission et à la valorisation des récits culturels africains, porté par une nouvelle génération de créateurs togolais."
          axes={[
            "Production audiovisuelle locale",
            "Transmission culturelle & storytelling",
            "Rayonnement numérique panafricain",
            "Formation de créateurs de contenu",
          ]}
          image="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=85&fit=crop"
          imageAlt="Dzotsope TV — média culturel africain"
          dark
          reverse
          cta="Voir le projet"
        />
      </div>

      <ImpactGlobal />
      <Synergie />
      <Footer />
    </main>
  );
}
