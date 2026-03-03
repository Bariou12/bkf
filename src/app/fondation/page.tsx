"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* ─── Scroll reveal hook ──────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ─── Gold animated underline ─────────────────────────────── */
function GoldTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      {children}
      <span
        className="absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-[#F2B632] to-[#e8a820] transition-all duration-700"
        style={{ width: visible ? "100%" : "0%" }}
      />
    </div>
  );
}

/* ─── Animated counter ────────────────────────────────────── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const { ref, visible } = useReveal();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, 25);
    return () => clearInterval(timer);
  }, [visible, target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── Parallax hero image ─────────────────────────────────── */
function HeroParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div className="absolute inset-0 scale-110" style={{ y }}>
        <img
          src="https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?w=1800&q=90&auto=format&fit=crop"
          alt="Enfant Ewé — Fondation BKF"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════ */
export default function FondationPage() {
  /* Scroll cue */
  const [showScrollCue, setShowScrollCue] = useState(true);
  useEffect(() => {
    const h = () => setShowScrollCue(window.scrollY < 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  /* Reveal refs */
  const r1 = useReveal();
  const r2 = useReveal();
  const r3 = useReveal();
  const r4 = useReveal();
  const r5 = useReveal();
  const r6 = useReveal();
  const r7 = useReveal();

  return (
    <main className="overflow-x-hidden">
      <Header />

      {/* ══════════════════════════════════════════════════════
          HERO — 85vh, portrait immersif
      ══════════════════════════════════════════════════════ */}
      <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: "88vh" }}>
        <HeroParallax />

        {/* Multi-layer overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F]/80 via-[#4a2010]/40 to-[#0F0F0F]/90" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
        />

        {/* Top golden band */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#F2B632]/50 to-transparent" />

        {/* Content */}
        <div className="relative z-10 text-center px-8 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.4em" }}
            animate={{ opacity: 1, letterSpacing: "0.25em" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-[#F2B632]/80 text-xs tracking-[0.25em] uppercase mb-6"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 500 }}
          >
            Fondation BKF — Notsè, Togo
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-white leading-none mb-3"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
            }}
          >
            LA FONDATION
          </motion.h1>

          {/* Gold line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="h-[2px] bg-gradient-to-r from-transparent via-[#F2B632] to-transparent mx-auto mb-8"
            style={{ width: "160px", transformOrigin: "center" }}
          />

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8 }}
            className="text-white/90 mb-6"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
              fontWeight: 300,
              fontStyle: "italic",
              letterSpacing: "0.01em",
            }}
          >
            Une institution au service d&rsquo;un avenir durable.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.0 }}
            className="text-white/50 max-w-2xl mx-auto mb-12"
            style={{ fontFamily: "var(--font-inter)", fontSize: "0.9rem", fontWeight: 300, lineHeight: 1.8 }}
          >
            La Fondation BKF œuvre pour la transformation culturelle, sociale et économique
            du territoire togolais à travers une vision intégrée et structurante.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <a href="#origine" className="bkf-btn-gold inline-flex items-center gap-2">
              Découvrir notre vision
              <ArrowDown size={14} />
            </a>
          </motion.div>
        </div>

        {/* Scroll cue */}
        {showScrollCue && (
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            <span className="text-white/30 text-[10px] tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-inter)" }}>
              Défiler
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-[1px] h-8 bg-gradient-to-b from-[#F2B632]/60 to-transparent"
            />
          </motion.div>
        )}

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0 60 C360 20 1080 20 1440 60 L1440 60 L0 60 Z" fill="#E9E6E1" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 1 — ORIGINE & RAISON D'ÊTRE
      ══════════════════════════════════════════════════════ */}
      <section id="origine" className="relative py-32 overflow-hidden" style={{ backgroundColor: "#E9E6E1" }}>
        {/* Background word */}
        <div
          className="absolute top-1/2 -translate-y-1/2 right-0 text-[#8B4B32]/[0.04] select-none pointer-events-none leading-none"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(8rem, 18vw, 18rem)",
            fontWeight: 700,
            letterSpacing: "-0.05em",
          }}
        >
          ORIGINE
        </div>

        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left — text */}
            <div
              ref={r1.ref}
              className="transition-all duration-1000"
              style={{ opacity: r1.visible ? 1 : 0, transform: r1.visible ? "translateX(0)" : "translateX(-40px)" }}
            >
              <p
                className="text-[#8B4B32] text-xs tracking-[0.25em] uppercase mb-5"
                style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}
              >
                01 — Notre origine
              </p>

              <GoldTitle>
                <h2
                  className="text-[#0F0F0F] mb-8"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(2rem, 4vw, 3.2rem)",
                    fontWeight: 300,
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Une conviction<br />
                  <em style={{ fontStyle: "italic", color: "#8B4B32" }}>profonde et ancrée.</em>
                </h2>
              </GoldTitle>

              <div
                className="space-y-5 mb-10"
                style={{ fontFamily: "var(--font-inter)", fontSize: "0.925rem", fontWeight: 300, lineHeight: 1.9, color: "#3a2a22" }}
              >
                <p>
                  La Fondation BKF est née d&rsquo;une conviction profonde : le développement d&rsquo;un territoire ne peut être durable que s&rsquo;il est enraciné dans son identité, sa culture et son potentiel humain.
                </p>
                <p>
                  Ancrée à Notsè, berceau historique et culturel du peuple Ewé, la Fondation porte une ambition de transformation intégrée articulée autour de plusieurs piliers complémentaires.
                </p>
                <p>
                  Elle ne se limite pas à une intervention sectorielle, mais développe un écosystème structurant capable de générer croissance économique, cohésion sociale et transmission culturelle dans la durée.
                </p>
              </div>

              {/* Quote */}
              <blockquote className="bkf-vertical-line" style={{ borderColor: "#F2B632" }}>
                <p
                  className="text-[#8B4B32] italic"
                  style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.35rem", fontWeight: 400, lineHeight: 1.5 }}
                >
                  &ldquo;Un peuple qui honore ses racines construit un avenir solide.&rdquo;
                </p>
              </blockquote>
            </div>

            {/* Right — image */}
            <div
              ref={r2.ref}
              className="relative transition-all duration-1000 delay-200"
              style={{ opacity: r2.visible ? 1 : 0, transform: r2.visible ? "translateX(0)" : "translateX(40px)" }}
            >
              {/* Decorative frame */}
              <div
                className="absolute -top-4 -right-4 w-full h-full"
                style={{ border: "1px solid rgba(242,182,50,0.25)", borderRadius: "2px" }}
              />

              <div className="img-zoom-wrap relative" style={{ aspectRatio: "3/4", borderRadius: "2px", overflow: "hidden" }}>
                <img
                  src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=900&q=90&auto=format&fit=crop"
                  alt="Paysage togolais"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#8B4B32]/30 to-transparent" />
              </div>

              {/* Floating stat */}
              <div
                className="absolute -bottom-6 -left-6 px-6 py-5"
                style={{
                  backgroundColor: "#F2B632",
                  clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                }}
              >
                <div
                  className="text-[#0F0F0F]"
                  style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.2rem", fontWeight: 600, lineHeight: 1 }}
                >
                  Notsè
                </div>
                <div
                  className="text-[#0F0F0F]/60 mt-1"
                  style={{ fontFamily: "var(--font-inter)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase" }}
                >
                  Berceau Ewé · Togo
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 70" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-14">
            <path d="M0 0 C480 70 960 70 1440 0 L1440 70 L0 70 Z" fill="#FFFFFF" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — VISION STRATÉGIQUE
      ══════════════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden" style={{ backgroundColor: "#FFFFFF" }}>
        {/* Large background word */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#0F0F0F]/[0.025] select-none pointer-events-none leading-none whitespace-nowrap"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(8rem, 20vw, 20rem)",
            fontWeight: 700,
            letterSpacing: "-0.05em",
          }}
        >
          VISION
        </div>

        <div className="max-w-7xl mx-auto px-8 lg:px-16 relative z-10">
          {/* Header */}
          <div
            ref={r3.ref}
            className="text-center mb-20 transition-all duration-1000"
            style={{ opacity: r3.visible ? 1 : 0, transform: r3.visible ? "translateY(0)" : "translateY(30px)" }}
          >
            <p
              className="text-[#8B4B32] text-xs tracking-[0.25em] uppercase mb-4"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}
            >
              02 — Vision stratégique
            </p>
            <GoldTitle>
              <h2
                className="text-[#0F0F0F]"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(2.2rem, 5vw, 4rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                Une vision intégrée et structurante.
              </h2>
            </GoldTitle>

            <p
              className="text-[#3a2a22]/60 max-w-2xl mx-auto mt-6"
              style={{ fontFamily: "var(--font-inter)", fontSize: "0.925rem", fontWeight: 300, lineHeight: 1.8 }}
            >
              La Fondation BKF conçoit le développement comme un système interconnecté où chaque domaine agit en synergie pour produire un impact durable et mesurable.
            </p>
          </div>

          {/* Pillars infographic */}
          <div className="relative">
            {/* Center connector lines — desktop only */}
            <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40">
              <svg viewBox="0 0 160 160" className="w-full h-full">
                {[0, 72, 144, 216, 288].map((angle, i) => {
                  const rad = (angle - 90) * (Math.PI / 180);
                  const x2 = 80 + 75 * Math.cos(rad);
                  const y2 = 80 + 75 * Math.sin(rad);
                  return <line key={i} x1="80" y1="80" x2={x2} y2={y2} stroke="#F2B632" strokeWidth="0.8" strokeOpacity="0.4" strokeDasharray="3 3" />;
                })}
                <circle cx="80" cy="80" r="14" fill="#F2B632" opacity="0.15" />
                <circle cx="80" cy="80" r="8" fill="#F2B632" opacity="0.4" />
                <circle cx="80" cy="80" r="3" fill="#F2B632" />
              </svg>
            </div>

            {/* Pillar cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { num: "01", icon: "◈", label: "Culture & Identité", sub: "Valorisation du patrimoine Ewé, transmission des savoirs ancestraux.", color: "#8B4B32" },
                { num: "02", icon: "◉", label: "Agriculture & Autosuffisance", sub: "Systèmes agricoles durables et formation des jeunes.", color: "#6b5a30" },
                { num: "03", icon: "◎", label: "Entrepreneuriat & Autonomie", sub: "Création d'emplois et d'écosystèmes économiques locaux.", color: "#8B4B32" },
                { num: "04", icon: "◈", label: "Solidarité & Cohésion", sub: "Inclusion sociale, santé communautaire, tissu local fort.", color: "#6b5a30" },
                { num: "05", icon: "◉", label: "Média & Transmission", sub: "Narration culturelle, jeunes producteurs, voix togolaise.", color: "#8B4B32" },
              ].map((pillar, i) => (
                <div
                  key={i}
                  className="group relative p-6 cursor-default transition-all duration-500 hover:-translate-y-2"
                  style={{
                    backgroundColor: "#F9F7F4",
                    borderTop: `2px solid ${pillar.color}20`,
                    transitionDelay: `${i * 80}ms`,
                  }}
                >
                  {/* Top accent */}
                  <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#F2B632] transition-all duration-500 group-hover:w-full" />

                  <div
                    className="text-[#F2B632] text-2xl mb-4"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {pillar.icon}
                  </div>

                  <div
                    className="text-[#8B4B32]/40 text-xs tracking-[0.2em] mb-2"
                    style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}
                  >
                    {pillar.num}
                  </div>

                  <h3
                    className="text-[#0F0F0F] mb-3 leading-tight"
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "1.2rem",
                      fontWeight: 500,
                    }}
                  >
                    {pillar.label}
                  </h3>

                  <p
                    className="text-[#3a2a22]/50"
                    style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", fontWeight: 300, lineHeight: 1.7 }}
                  >
                    {pillar.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Diagonal bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 70" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-14">
            <path d="M0 70 L1440 0 L1440 70 Z" fill="#8B4B32" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — VALEURS FONDAMENTALES
      ══════════════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden" style={{ backgroundColor: "#8B4B32" }}>
        {/* Grain */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
        />
        {/* Padding top for diagonal */}
        <div className="absolute top-0 left-0 right-0 h-14 bg-white" style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }} />

        <div className="max-w-7xl mx-auto px-8 lg:px-16 relative z-10">
          {/* Header */}
          <div
            ref={r4.ref}
            className="mb-16 transition-all duration-1000"
            style={{ opacity: r4.visible ? 1 : 0, transform: r4.visible ? "translateY(0)" : "translateY(30px)" }}
          >
            <p
              className="text-[#F2B632]/70 text-xs tracking-[0.25em] uppercase mb-4"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}
            >
              03 — Valeurs fondamentales
            </p>
            <h2
              className="text-white"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(2.2rem, 5vw, 4rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              Nos valeurs.
            </h2>
          </div>

          {/* Values grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
            {[
              {
                num: "01",
                name: "Enracinement",
                desc: "Respect et valorisation du patrimoine culturel. Nos racines sont la fondation de notre action, non un héritage figé, mais une source vive d'inspiration.",
                img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80&auto=format&fit=crop",
              },
              {
                num: "02",
                name: "Transmission",
                desc: "Passage intergénérationnel du savoir, des traditions et de l'identité culturelle. La mémoire collective est notre bien le plus précieux.",
                img: "https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?w=600&q=80&auto=format&fit=crop",
              },
              {
                num: "03",
                name: "Responsabilité",
                desc: "Engagement durable et structuré. Chaque projet est conçu pour produire des effets mesurables sur le long terme.",
                img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80&auto=format&fit=crop",
              },
              {
                num: "04",
                name: "Excellence",
                desc: "Recherche constante de qualité et d'impact. Nous refusons la médiocrité et visons l'exemplarité dans chaque initiative.",
                img: "https://images.unsplash.com/photo-1504817343863-5092a923803e?w=600&q=80&auto=format&fit=crop",
              },
              {
                num: "05",
                name: "Solidarité",
                desc: "Cohésion sociale et inclusion. Personne n'est laissé de côté dans notre vision d'un territoire fort et uni.",
                img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&q=80&auto=format&fit=crop",
              },
              {
                num: "06",
                name: "Vision",
                desc: "Perspective à long terme et capacité à anticiper les transformations pour construire un futur solide et souverain.",
                img: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80&auto=format&fit=crop",
              },
            ].map((val, i) => (
              <div
                key={i}
                className="group relative overflow-hidden cursor-default"
                style={{ backgroundColor: "#7a3e28" }}
              >
                {/* Background image */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
                  <img src={val.img} alt={val.name} className="w-full h-full object-cover" />
                </div>

                {/* Gold top line on hover */}
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#F2B632] transition-all duration-500 group-hover:w-full" />

                <div className="relative z-10 p-8">
                  <div
                    className="text-[#F2B632]/30 text-xs tracking-[0.2em] mb-5"
                    style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}
                  >
                    {val.num}
                  </div>

                  <h3
                    className="text-white mb-4 group-hover:text-[#F2B632] transition-colors duration-300"
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "1.7rem",
                      fontWeight: 400,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {val.name}
                  </h3>

                  <p
                    className="text-white/40 group-hover:text-white/60 transition-colors duration-300"
                    style={{ fontFamily: "var(--font-inter)", fontSize: "0.85rem", fontWeight: 300, lineHeight: 1.8 }}
                  >
                    {val.desc}
                  </p>

                  {/* Bottom gold line on hover */}
                  <div className="mt-6 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-6 h-[1px] bg-[#F2B632]" />
                    <span
                      className="text-[#F2B632] text-[10px] tracking-[0.2em] uppercase"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      Valeur fondatrice
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 70" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-14">
            <path d="M0 60 C360 10 1080 10 1440 60 L1440 70 L0 70 Z" fill="#E9E6E1" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 4 — GOUVERNANCE
      ══════════════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden" style={{ backgroundColor: "#E9E6E1" }}>
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left — image */}
            <div
              ref={r5.ref}
              className="relative transition-all duration-1000"
              style={{ opacity: r5.visible ? 1 : 0, transform: r5.visible ? "translateX(0)" : "translateX(-40px)" }}
            >
              <div
                className="absolute -top-4 -left-4 w-full h-full"
                style={{ border: "1px solid rgba(139,75,50,0.2)" }}
              />
              <div className="img-zoom-wrap relative" style={{ aspectRatio: "4/3", overflow: "hidden" }}>
                <img
                  src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=900&q=85&auto=format&fit=crop"
                  alt="Gouvernance Fondation BKF"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#8B4B32]/20 to-transparent" />
              </div>
            </div>

            {/* Right — text */}
            <div
              ref={r5.ref}
              className="transition-all duration-1000 delay-200"
              style={{ opacity: r5.visible ? 1 : 0, transform: r5.visible ? "translateX(0)" : "translateX(40px)" }}
            >
              <p
                className="text-[#8B4B32] text-xs tracking-[0.25em] uppercase mb-5"
                style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}
              >
                04 — Gouvernance
              </p>

              <GoldTitle>
                <h2
                  className="text-[#0F0F0F] mb-8"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(1.8rem, 4vw, 3rem)",
                    fontWeight: 300,
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Une gouvernance<br />
                  <em style={{ color: "#8B4B32", fontStyle: "italic" }}>structurée et transparente.</em>
                </h2>
              </GoldTitle>

              <p
                className="text-[#3a2a22]/70 mb-10"
                style={{ fontFamily: "var(--font-inter)", fontSize: "0.925rem", fontWeight: 300, lineHeight: 1.9 }}
              >
                La Fondation BKF s&rsquo;appuie sur une gouvernance organisée, garante de la cohérence stratégique et de la transparence dans chaque initiative portée.
              </p>

              <div className="space-y-4">
                {[
                  { icon: "→", label: "Supervision des projets", sub: "Suivi rigoureux de chaque initiative structurante" },
                  { icon: "→", label: "Cohérence de la vision", sub: "Alignement de toutes les actions avec la mission fondatrice" },
                  { icon: "→", label: "Gestion responsable", sub: "Transparence dans l'allocation et l'utilisation des ressources" },
                  { icon: "→", label: "Suivi d'impact", sub: "Évaluation continue des résultats et apprentissages" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 group hover:bg-white transition-colors duration-300"
                    style={{ borderLeft: "2px solid rgba(242,182,50,0.15)" }}
                  >
                    <span className="text-[#F2B632] mt-0.5 text-lg leading-none">{item.icon}</span>
                    <div>
                      <div
                        className="text-[#0F0F0F] mb-1"
                        style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", fontWeight: 600 }}
                      >
                        {item.label}
                      </div>
                      <div
                        className="text-[#3a2a22]/50"
                        style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", fontWeight: 300 }}
                      >
                        {item.sub}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Diagonal */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0 0 L1440 60 L1440 60 L0 60 Z" fill="#FFFFFF" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 5 — APPROCHE & MÉTHODOLOGIE
      ══════════════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div
            ref={r6.ref}
            className="transition-all duration-1000"
            style={{ opacity: r6.visible ? 1 : 0, transform: r6.visible ? "translateY(0)" : "translateY(30px)" }}
          >
            <p
              className="text-[#8B4B32] text-xs tracking-[0.25em] uppercase mb-5"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}
            >
              05 — Approche & Méthodologie
            </p>

            <GoldTitle>
              <h2
                className="text-[#0F0F0F] mb-6"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                  fontWeight: 300,
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                }}
              >
                Une approche systémique.
              </h2>
            </GoldTitle>

            <p
              className="text-[#3a2a22]/60 max-w-2xl mb-20"
              style={{ fontFamily: "var(--font-inter)", fontSize: "0.925rem", fontWeight: 300, lineHeight: 1.9 }}
            >
              Chaque projet de la Fondation suit un cycle rigoureux assurant pertinence, impact et pérennité.
            </p>
          </div>

          {/* Steps — horizontal timeline */}
          <div className="relative">
            {/* Connector line */}
            <div
              className="hidden lg:block absolute top-10 left-0 right-0 h-[1px]"
              style={{ background: "linear-gradient(90deg, transparent, #F2B632 10%, #F2B632 90%, transparent)" }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {[
                { step: "01", title: "Diagnostic territorial", desc: "Analyse approfondie des besoins, atouts et dynamiques du territoire." },
                { step: "02", title: "Conception intégrée", desc: "Design de projets articulant culture, économie et cohésion sociale." },
                { step: "03", title: "Mobilisation", desc: "Engagement des partenaires locaux, nationaux et internationaux." },
                { step: "04", title: "Mise en œuvre", desc: "Déploiement structuré avec suivi opérationnel continu." },
                { step: "05", title: "Évaluation & Apprentissage", desc: "Mesure d'impact et capitalisation pour améliorer les futurs projets." },
              ].map((s, i) => (
                <div key={i} className="relative group">
                  {/* Step number */}
                  <div
                    className="w-20 h-20 flex items-center justify-center mb-6 mx-auto lg:mx-0 transition-all duration-400 group-hover:scale-110"
                    style={{
                      backgroundColor: "#F2B632",
                      clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                    }}
                  >
                    <span
                      className="text-[#0F0F0F] font-bold"
                      style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.6rem", fontWeight: 600 }}
                    >
                      {s.step}
                    </span>
                  </div>

                  <h3
                    className="text-[#0F0F0F] mb-3 text-center lg:text-left"
                    style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.15rem", fontWeight: 500 }}
                  >
                    {s.title}
                  </h3>

                  <p
                    className="text-[#3a2a22]/50 text-center lg:text-left"
                    style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", fontWeight: 300, lineHeight: 1.7 }}
                  >
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 6 — CHIFFRES CLÉS
      ══════════════════════════════════════════════════════ */}
      <section className="relative py-20 overflow-hidden" style={{ backgroundColor: "#E9E6E1" }}>
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: 5, suffix: "+", label: "Projets structurants" },
              { value: 1000, suffix: "+", label: "Emplois ciblés" },
              { value: 4, suffix: "", label: "Domaines d'action" },
              { value: 15, suffix: " ans", label: "De vision long terme" },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div
                  className="text-[#8B4B32] mb-2"
                  style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300, lineHeight: 1 }}
                >
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="w-8 h-[1px] bg-[#F2B632] mx-auto mb-3" />
                <div
                  className="text-[#3a2a22]/60"
                  style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", fontWeight: 400, letterSpacing: "0.05em" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 7 — GÉNÉRATIONS FUTURES
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: "70vh" }}>
        {/* Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504817343863-5092a923803e?w=1800&q=85&auto=format&fit=crop"
            alt="Enfant regardant l'horizon"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F]/95 via-[#0F0F0F]/70 to-[#0F0F0F]/40" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
        />

        <div
          ref={r7.ref}
          className="relative z-10 flex items-center min-h-[70vh] max-w-7xl mx-auto px-8 lg:px-16"
        >
          <div
            className="max-w-2xl transition-all duration-1200"
            style={{ opacity: r7.visible ? 1 : 0, transform: r7.visible ? "translateY(0)" : "translateY(40px)" }}
          >
            <p
              className="text-[#F2B632]/70 text-xs tracking-[0.25em] uppercase mb-6"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}
            >
              06 — Perspective intergénérationnelle
            </p>

            <h2
              className="text-white mb-6"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              Construire aujourd&rsquo;hui
              <br />
              <em className="text-[#F2B632]" style={{ fontStyle: "italic" }}>pour transmettre demain.</em>
            </h2>

            <div className="w-20 h-[1px] bg-[#F2B632]/50 mb-8" />

            <p
              className="text-white/50 mb-12 max-w-xl"
              style={{ fontFamily: "var(--font-inter)", fontSize: "0.925rem", fontWeight: 300, lineHeight: 1.9 }}
            >
              Chaque action de la Fondation BKF s&rsquo;inscrit dans une perspective intergénérationnelle. L&rsquo;objectif n&rsquo;est pas uniquement de répondre aux besoins actuels, mais de structurer un avenir durable pour les générations futures.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="/projets" className="bkf-btn-gold inline-flex items-center gap-2">
                Découvrir nos projets
                <ArrowRight size={14} />
              </a>
              <a href="#contact" className="bkf-btn-outline inline-flex items-center gap-2">
                Nous contacter
                <ChevronRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
