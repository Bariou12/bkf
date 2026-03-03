"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowRight, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* ─── Scroll reveal hook ──────────────────────────────────── */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── Gold animated title ─────────────────────────────────── */
function GoldTitle({ children, className = "", light = false }: { children: React.ReactNode; className?: string; light?: boolean }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      {children}
      <span
        className="absolute -bottom-3 left-0 h-[2px] bg-gradient-to-r from-[#F2B632] to-[#e8a820] transition-all duration-700"
        style={{ width: visible ? "100%" : "0%" }}
      />
    </div>
  );
}

/* ─── Parallax hero ───────────────────────────────────────── */
function HeroParallax({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div className="absolute inset-0 scale-110" style={{ y }}>
        <img src={src} alt={alt} className="w-full h-full object-cover object-center" />
      </motion.div>
    </div>
  );
}

/* ─── Animated SVG network ────────────────────────────────── */
function PillarNetwork({ visible }: { visible: boolean }) {
  const cx = 280, cy = 240;
  const radius = 150;
  const pillars = [
    { label: "Culture", sub: "& Patrimoine", angle: -90, color: "#F2B632" },
    { label: "Agriculture", sub: "Durable", angle: -18, color: "#c9972a" },
    { label: "Entrepreneuriat", sub: "& Emploi", angle: 54, color: "#F2B632" },
    { label: "Solidarité", sub: "& Santé", angle: 126, color: "#c9972a" },
    { label: "Média", sub: "& Transmission", angle: 198, color: "#F2B632" },
  ];

  return (
    <svg viewBox="0 0 560 480" className="w-full max-w-lg mx-auto" style={{ overflow: "visible" }}>
      {/* Connecting lines */}
      {pillars.map((p, i) => {
        const rad = (p.angle * Math.PI) / 180;
        const nx = cx + radius * Math.cos(rad);
        const ny = cy + radius * Math.sin(rad);
        return (
          <motion.line
            key={`line-${i}`}
            x1={cx} y1={cy} x2={nx} y2={ny}
            stroke="#F2B632"
            strokeWidth="1"
            strokeOpacity="0.35"
            strokeDasharray="5 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={visible ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
          />
        );
      })}

      {/* Outer ring */}
      <motion.circle
        cx={cx} cy={cy} r={radius + 10}
        fill="none" stroke="#F2B632" strokeWidth="0.5" strokeOpacity="0.15"
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      />

      {/* Pillar nodes */}
      {pillars.map((p, i) => {
        const rad = (p.angle * Math.PI) / 180;
        const nx = cx + radius * Math.cos(rad);
        const ny = cy + radius * Math.sin(rad);
        const labelOffX = Math.cos(rad) * 42;
        const labelOffY = Math.sin(rad) * 42;
        return (
          <motion.g key={`node-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={visible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 + i * 0.15, type: "spring", stiffness: 200 }}
            style={{ transformOrigin: `${nx}px ${ny}px` }}
          >
            <circle cx={nx} cy={ny} r={28} fill="#8B4B32" />
            <circle cx={nx} cy={ny} r={28} fill="none" stroke="#F2B632" strokeWidth="1.5" strokeOpacity="0.6" />
            <text x={nx} y={ny - 5} textAnchor="middle" fill="white" fontSize="9" fontWeight="600" fontFamily="Inter, sans-serif" letterSpacing="0.05em">
              {p.label}
            </text>
            <text x={nx} y={ny + 9} textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="7.5" fontFamily="Inter, sans-serif">
              {p.sub}
            </text>
            {/* Connection dot */}
            <circle cx={cx + (radius - 30) * Math.cos(rad)} cy={cy + (radius - 30) * Math.sin(rad)} r="2.5" fill="#F2B632" opacity="0.7" />
          </motion.g>
        );
      })}

      {/* Center BKF */}
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={visible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 180 }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      >
        <circle cx={cx} cy={cy} r={44} fill="#F2B632" />
        <circle cx={cx} cy={cy} r={44} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <text x={cx} y={cy - 6} textAnchor="middle" fill="#0F0F0F" fontSize="13" fontWeight="700" fontFamily="Georgia, serif" letterSpacing="0.1em">BKF</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fill="rgba(15,15,15,0.55)" fontSize="7" fontFamily="Inter, sans-serif" letterSpacing="0.12em">FONDATION</text>
      </motion.g>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════ */
export default function PiliersPage() {
  const [showScrollCue, setShowScrollCue] = useState(true);
  useEffect(() => {
    const h = () => setShowScrollCue(window.scrollY < 80);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  /* Reveal refs */
  const rIntro = useReveal();
  const rNetwork = useReveal(0.1);
  const r1 = useReveal();
  const r2 = useReveal();
  const r3 = useReveal();
  const r4 = useReveal();
  const r5 = useReveal();
  const rSynth = useReveal();

  /* Active pilier state for nav */
  const [activePillar, setActivePillar] = useState(0);

  const pillarData = [
    {
      num: "01",
      icon: "◈",
      slug: "culture",
      title: "Culture & Patrimoine",
      bg: "#E9E6E1",
      accent: "#8B4B32",
      image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1000&q=90&auto=format&fit=crop",
      imageAlt: "Contexte culturel togolais",
      label: "Socle identitaire",
      intro: "La valorisation du patrimoine culturel constitue le fondement inaliénable du développement durable. Sans racines vivantes, aucun avenir solide ne peut être bâti.",
      body: [
        "La Fondation BKF œuvre à préserver, transmettre et dynamiser les traditions, l'histoire et les expressions culturelles du territoire togolais. Ancrée dans la mémoire du peuple Ewé, chaque initiative culturelle est un acte de souveraineté.",
        "La culture n'est pas un ornement — c'est l'architecture intérieure d'une société. En valorisant ce patrimoine, la Fondation construit une identité collective forte, capable de nourrir les autres piliers et de leur donner sens.",
      ],
      points: ["Préservation des sites historiques de Notsè", "Transmission intergénérationnelle des savoirs Ewé", "Valorisation artistique et expression contemporaine", "Rayonnement culturel régional et international"],
      quote: "Les racines ne retiennent pas l'arbre — elles lui permettent de grandir.",
    },
    {
      num: "02",
      icon: "◉",
      slug: "agriculture",
      title: "Agriculture Durable",
      bg: "#FFFFFF",
      accent: "#6b5a30",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1000&q=90&auto=format&fit=crop",
      imageAlt: "Agriculture responsable au Togo",
      label: "Autosuffisance alimentaire",
      intro: "L'autosuffisance alimentaire est un levier stratégique fondamental. La maîtrise de sa production est une forme de liberté — économique, politique et humaine.",
      body: [
        "La Fondation développe des initiatives favorisant la production agricole responsable, la formation des jeunes agriculteurs et la création d'emplois durables dans la filière agro-alimentaire togolaise.",
        "En structurant des chaînes de valeur locales et en soutenant l'innovation paysanne, la Fondation contribue à construire une économie résiliente, ancrée dans le territoire et tournée vers l'avenir.",
      ],
      points: ["Formation agro-entrepreneuriale des jeunes", "Production intégrée et circuits courts", "Transformation locale des produits agricoles", "Innovation responsable et durable"],
      quote: "Cultiver la terre, c'est cultiver sa propre dignité.",
    },
    {
      num: "03",
      icon: "◎",
      slug: "entrepreneuriat",
      title: "Entrepreneuriat & Emploi",
      bg: "#E9E6E1",
      accent: "#8B4B32",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1000&q=90&auto=format&fit=crop",
      imageAlt: "Jeunes entrepreneurs togolais",
      label: "Autonomie économique",
      intro: "L'autonomie économique est un facteur essentiel de stabilité, de dignité et de prospérité collective. Elle ne se donne pas — elle se structure.",
      body: [
        "La Fondation accompagne les jeunes générations vers la création d'activités économiques structurées, durables et enracinées dans les besoins réels du territoire togolais.",
        "En construisant un écosystème d'accompagnement — formation, incubation, mise en réseau — la Fondation crée les conditions d'une émergence économique portée de l'intérieur.",
      ],
      points: ["Incubation de projets économiques locaux", "Formations techniques et managériales", "Accompagnement post-création et mentorat", "Création d'écosystèmes entrepreneuriaux durables"],
      quote: "L'autonomie économique est la forme la plus concrète de liberté.",
    },
    {
      num: "04",
      icon: "◈",
      slug: "solidarite",
      title: "Solidarité & Santé",
      bg: "#8B4B32",
      accent: "#F2B632",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1000&q=90&auto=format&fit=crop",
      imageAlt: "Cohésion communautaire",
      label: "Cohésion sociale",
      intro: "Le développement durable implique cohésion sociale et protection des plus vulnérables. Une société forte se mesure à la façon dont elle prend soin d'elle-même.",
      body: [
        "La Fondation agit à travers des initiatives communautaires favorisant l'inclusion sociale, le bien-être collectif et l'accès aux services essentiels pour les populations du territoire togolais.",
        "La solidarité n'est pas une charité — c'est une architecture sociale. En tissant des liens forts entre individus, familles et communautés, la Fondation construit la résilience du territoire.",
      ],
      points: ["Sensibilisation et éducation à la santé", "Soutien aux structures communautaires locales", "Inclusion des groupes vulnérables", "Accès aux services essentiels de proximité"],
      quote: "Une communauté qui se soutient construit une forteresse invisible.",
    },
    {
      num: "05",
      icon: "◉",
      slug: "media",
      title: "Média & Transmission",
      bg: "#0F0F0F",
      accent: "#F2B632",
      image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=1000&q=90&auto=format&fit=crop",
      imageAlt: "Production médiatique et narration culturelle",
      label: "Narration & Rayonnement",
      intro: "Les récits façonnent les identités. La capacité à raconter sa propre histoire est un acte de souveraineté culturelle fondamental.",
      body: [
        "La Fondation développe des initiatives médiatiques permettant de raconter, transmettre et préserver l'histoire collective du peuple Ewé et des communautés togolaises.",
        "En formant de jeunes producteurs de contenus et en construisant des plateformes de diffusion, la Fondation offre au territoire une voix propre — authentique, fière et rayonnante.",
      ],
      points: ["Production de contenus documentaires et culturels", "Formation aux métiers du media et du numérique", "Rayonnement digital national et international", "Valorisation culturelle par la narration"],
      quote: "Celui qui raconte sa propre histoire choisit son avenir.",
    },
  ];

  return (
    <main className="overflow-x-hidden">
      <Header />

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: "82vh" }}>
        <HeroParallax
          src="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1800&q=90&auto=format&fit=crop"
          alt="Enfants togolais Ewé — Fondation BKF"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F]/85 via-[#3d1e0a]/50 to-[#0F0F0F]/95" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
        />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#F2B632]/40 to-transparent" />

        {/* Hero content */}
        <div className="relative z-10 text-center px-8 max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[#F2B632]/70 text-[10px] uppercase mb-6"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 600, letterSpacing: "0.3em" }}
          >
            Fondation BKF — Architecture stratégique
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-white leading-none mb-3"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2.8rem, 8vw, 6.5rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
            }}
          >
            NOS PILIERS
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 1.0 }}
            className="h-[2px] bg-gradient-to-r from-transparent via-[#F2B632] to-transparent mx-auto mb-8"
            style={{ width: "200px", transformOrigin: "center" }}
          />

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="text-white/85 mb-6"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.3rem, 3vw, 2.2rem)",
              fontWeight: 300,
              fontStyle: "italic",
            }}
          >
            Une architecture au service d&rsquo;un développement intégré.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9 }}
            className="text-white/45 max-w-2xl mx-auto mb-12"
            style={{ fontFamily: "var(--font-inter)", fontSize: "0.9rem", fontWeight: 300, lineHeight: 1.8 }}
          >
            La Fondation BKF repose sur cinq piliers complémentaires agissant en synergie
            pour construire un écosystème durable, enraciné et structurant.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <a href="#modele" className="bkf-btn-gold inline-flex items-center gap-2">
              Comprendre notre modèle
              <ArrowDown size={14} />
            </a>
          </motion.div>

          {/* 5 pillar indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="flex justify-center gap-3 mt-16"
          >
            {["Culture", "Agriculture", "Entrepreneuriat", "Solidarité", "Média"].map((p, i) => (
              <div key={i} className="flex flex-col items-center gap-2 cursor-default">
                <div
                  className="w-[1px] bg-gradient-to-b from-[#F2B632]/60 to-transparent"
                  style={{ height: "30px" }}
                />
                <span
                  className="text-white/30 text-[9px] tracking-[0.15em] uppercase hidden sm:block"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {p}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll cue */}
        {showScrollCue && (
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9 }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-[1px] h-10 bg-gradient-to-b from-[#F2B632]/50 to-transparent"
            />
          </motion.div>
        )}

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0 60 C360 10 1080 10 1440 60 L1440 60 L0 60 Z" fill="#E9E6E1" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 1 — VISION SYSTÉMIQUE + RÉSEAU
      ══════════════════════════════════════════════════════ */}
      <section id="modele" className="relative py-32 overflow-hidden" style={{ backgroundColor: "#E9E6E1" }}>
        {/* BG word */}
        <div
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden"
          aria-hidden
        >
          <span
            className="text-[#8B4B32]/[0.03]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(8rem, 22vw, 22rem)",
              fontWeight: 700,
              letterSpacing: "-0.05em",
              whiteSpace: "nowrap",
            }}
          >
            SYSTÈME
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-8 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left — text */}
            <div
              ref={rIntro.ref}
              className="transition-all duration-1000"
              style={{ opacity: rIntro.visible ? 1 : 0, transform: rIntro.visible ? "translateX(0)" : "translateX(-40px)" }}
            >
              <p
                className="text-[#8B4B32] text-[10px] tracking-[0.28em] uppercase mb-5"
                style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}
              >
                01 — Vision systémique
              </p>

              <GoldTitle>
                <h2
                  className="text-[#0F0F0F] mb-10"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                    fontWeight: 300,
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Un modèle<br />
                  <em style={{ color: "#8B4B32", fontStyle: "italic" }}>interconnecté.</em>
                </h2>
              </GoldTitle>

              <div
                className="space-y-5 mb-10"
                style={{ fontFamily: "var(--font-inter)", fontSize: "0.925rem", fontWeight: 300, lineHeight: 1.9, color: "#3a2a22" }}
              >
                <p>
                  La Fondation BKF ne développe pas des actions isolées. Elle construit un système cohérent où chaque pilier renforce les autres et où chaque impact se démultiplie.
                </p>
                <p>
                  Culture, agriculture, entrepreneuriat, solidarité et média ne sont pas cinq sujets séparés — ce sont cinq dimensions d&rsquo;une même vision intégrée du développement durable.
                </p>
                <p>
                  Cette cohérence systémique est ce qui distingue la Fondation d&rsquo;une simple organisation sectorielle : elle agit comme un architecte du territoire.
                </p>
              </div>

              {/* 5 pillar chips */}
              <div className="flex flex-wrap gap-2">
                {["Culture", "Agriculture", "Entrepreneuriat", "Solidarité", "Média"].map((p, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 text-[10px] tracking-[0.15em] uppercase"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontWeight: 600,
                      backgroundColor: "rgba(139,75,50,0.07)",
                      color: "#8B4B32",
                      border: "1px solid rgba(139,75,50,0.15)",
                    }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — SVG network */}
            <div
              ref={rNetwork.ref}
              className="transition-all duration-1000 delay-200"
              style={{ opacity: rNetwork.visible ? 1 : 0, transform: rNetwork.visible ? "translateX(0)" : "translateX(40px)" }}
            >
              <PillarNetwork visible={rNetwork.visible} />
            </div>
          </div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 70" fill="none" preserveAspectRatio="none" className="w-full h-14">
            <path d="M0 0 C480 70 960 70 1440 0 L1440 70 L0 70 Z" fill="#FFFFFF" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PILIER 1 — CULTURE & PATRIMOINE
      ══════════════════════════════════════════════════════ */}
      <PillarSection
        data={pillarData[0]}
        revealRef={r1}
        imageLeft={true}
        waveFill="#E9E6E1"
        waveType="curve"
      />

      {/* ══════════════════════════════════════════════════════
          PILIER 2 — AGRICULTURE
      ══════════════════════════════════════════════════════ */}
      <PillarSection
        data={pillarData[1]}
        revealRef={r2}
        imageLeft={false}
        waveFill="#E9E6E1"
        waveType="diagonal"
      />

      {/* ══════════════════════════════════════════════════════
          PILIER 3 — ENTREPRENEURIAT
      ══════════════════════════════════════════════════════ */}
      <PillarSection
        data={pillarData[2]}
        revealRef={r3}
        imageLeft={true}
        waveFill="#8B4B32"
        waveType="curve-reverse"
      />

      {/* ══════════════════════════════════════════════════════
          PILIER 4 — SOLIDARITÉ & SANTÉ (dark)
      ══════════════════════════════════════════════════════ */}
      <PillarSection
        data={pillarData[3]}
        revealRef={r4}
        imageLeft={false}
        waveFill="#FFFFFF"
        waveType="diagonal"
        dark
      />

      {/* ══════════════════════════════════════════════════════
          PILIER 5 — MÉDIA & TRANSMISSION (darkest)
      ══════════════════════════════════════════════════════ */}
      <PillarSection
        data={pillarData[4]}
        revealRef={r5}
        imageLeft={true}
        waveFill="#0F0F0F"
        waveType="curve"
        dark
        darkest
      />

      {/* ══════════════════════════════════════════════════════
          SECTION SYNTHÈSE — FORCE DU MODÈLE
      ══════════════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden" style={{ backgroundColor: "#0F0F0F" }}>
        {/* Grain */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
        />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#F2B632]/20 to-transparent" />

        <div className="max-w-7xl mx-auto px-8 lg:px-16 relative z-10">
          {/* Header */}
          <div
            ref={rSynth.ref}
            className="text-center mb-20 transition-all duration-1000"
            style={{ opacity: rSynth.visible ? 1 : 0, transform: rSynth.visible ? "translateY(0)" : "translateY(30px)" }}
          >
            <p
              className="text-[#F2B632]/50 text-[10px] tracking-[0.3em] uppercase mb-5"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}
            >
              Synthèse — Force du modèle
            </p>
            <h2
              className="text-white mb-6"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
              }}
            >
              Une synergie au service<br />
              <em className="text-[#F2B632]" style={{ fontStyle: "italic" }}>d&rsquo;un impact durable.</em>
            </h2>
            <div className="w-24 h-[1px] bg-[#F2B632]/40 mx-auto mb-8" />
            <p
              className="text-white/40 max-w-2xl mx-auto"
              style={{ fontFamily: "var(--font-inter)", fontSize: "0.9rem", fontWeight: 300, lineHeight: 1.9 }}
            >
              La complémentarité des cinq piliers permet à la Fondation BKF de construire un modèle intégré,
              résilient et structurant — capable de produire un changement durable à l&rsquo;échelle du territoire.
            </p>
          </div>

          {/* Summary grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-20">
            {pillarData.map((p, i) => (
              <motion.div
                key={i}
                className="group relative p-6 cursor-default transition-all duration-500 hover:-translate-y-2"
                style={{
                  backgroundColor: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(242,182,50,0.1)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={rSynth.visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              >
                {/* Top accent */}
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#F2B632] transition-all duration-500 group-hover:w-full" />

                <div
                  className="text-[#F2B632]/30 text-xs tracking-[0.2em] mb-4"
                  style={{ fontFamily: "var(--font-inter)", fontWeight: 600 }}
                >
                  {p.num}
                </div>

                <div
                  className="text-[#F2B632] text-2xl mb-4"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {p.icon}
                </div>

                <h3
                  className="text-white mb-3 group-hover:text-[#F2B632] transition-colors duration-300 leading-tight"
                  style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.15rem", fontWeight: 400 }}
                >
                  {p.title}
                </h3>

                <p
                  className="text-white/30 text-[0.78rem] leading-relaxed"
                  style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                >
                  {p.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <a href="/projets" className="bkf-btn-gold inline-flex items-center gap-2">
              Découvrir nos projets
              <ArrowRight size={14} />
            </a>
            <a href="/fondation" className="bkf-btn-outline inline-flex items-center gap-2">
              La Fondation
              <ChevronRight size={14} />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* ═══════════════════════════════════════════════════════════
   REUSABLE PILLAR SECTION COMPONENT
══════════════════════════════════════════════════════════ */
interface PillarData {
  num: string;
  icon: string;
  slug: string;
  title: string;
  bg: string;
  accent: string;
  image: string;
  imageAlt: string;
  label: string;
  intro: string;
  body: string[];
  points: string[];
  quote: string;
}

function PillarSection({
  data,
  revealRef,
  imageLeft,
  waveFill,
  waveType,
  dark = false,
  darkest = false,
}: {
  data: PillarData;
  revealRef: { ref: React.RefObject<HTMLDivElement | null>; visible: boolean };
  imageLeft: boolean;
  waveFill: string;
  waveType: "curve" | "curve-reverse" | "diagonal";
  dark?: boolean;
  darkest?: boolean;
}) {
  const textColor = dark ? "white" : "#0F0F0F";
  const mutedColor = dark ? "rgba(255,255,255,0.5)" : "#3a2a22";
  const labelColor = dark ? "rgba(242,182,50,0.6)" : "#8B4B32";
  const borderColor = dark ? "rgba(242,182,50,0.15)" : "rgba(139,75,50,0.12)";

  const textBlock = (
    <div
      ref={revealRef.ref}
      className="transition-all duration-1000"
      style={{
        opacity: revealRef.visible ? 1 : 0,
        transform: revealRef.visible ? "translateX(0)" : (imageLeft ? "translateX(40px)" : "translateX(-40px)"),
      }}
    >
      <p
        className="text-[10px] tracking-[0.28em] uppercase mb-5"
        style={{ fontFamily: "var(--font-inter)", fontWeight: 600, color: labelColor }}
      >
        Pilier {data.num} — {data.label}
      </p>

      {/* Number watermark */}
      <div className="relative mb-8">
        <span
          className="absolute -top-4 -left-2 select-none pointer-events-none leading-none"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "6rem",
            fontWeight: 700,
            color: dark ? "rgba(242,182,50,0.06)" : "rgba(139,75,50,0.06)",
            letterSpacing: "-0.05em",
          }}
        >
          {data.num}
        </span>

        <GoldTitle>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: textColor,
            }}
          >
            {data.title}
          </h2>
        </GoldTitle>
      </div>

      {/* Intro */}
      <p
        className="mb-6 leading-relaxed"
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "1.25rem",
          fontWeight: 400,
          color: dark ? "rgba(255,255,255,0.75)" : "#5a3a28",
          fontStyle: "italic",
          lineHeight: 1.6,
        }}
      >
        {data.intro}
      </p>

      {/* Body paragraphs */}
      <div
        className="space-y-4 mb-10"
        style={{ fontFamily: "var(--font-inter)", fontSize: "0.9rem", fontWeight: 300, lineHeight: 1.9, color: mutedColor }}
      >
        {data.body.map((para, i) => <p key={i}>{para}</p>)}
      </div>

      {/* Points */}
      <div className="space-y-3 mb-10">
        {data.points.map((pt, i) => (
          <div
            key={i}
            className="flex items-start gap-3 py-3 px-4 transition-colors duration-300"
            style={{ borderLeft: `2px solid ${dark ? "rgba(242,182,50,0.2)" : "rgba(242,182,50,0.25)"}` }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
              style={{ backgroundColor: "#F2B632" }}
            />
            <span
              style={{ fontFamily: "var(--font-inter)", fontSize: "0.85rem", fontWeight: 400, color: dark ? "rgba(255,255,255,0.6)" : "#3a2a22" }}
            >
              {pt}
            </span>
          </div>
        ))}
      </div>

      {/* Quote */}
      <blockquote
        className="bkf-vertical-line"
        style={{ borderColor: "#F2B632" }}
      >
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "1.15rem",
            fontWeight: 400,
            fontStyle: "italic",
            color: dark ? "rgba(242,182,50,0.8)" : "#8B4B32",
            lineHeight: 1.5,
          }}
        >
          &ldquo;{data.quote}&rdquo;
        </p>
      </blockquote>
    </div>
  );

  const imageBlock = (
    <div
      className="relative transition-all duration-1000 delay-200"
      style={{
        opacity: revealRef.visible ? 1 : 0,
        transform: revealRef.visible ? "translateX(0)" : (imageLeft ? "translateX(-40px)" : "translateX(40px)"),
      }}
    >
      {/* Decorative frame */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: imageLeft ? "-16px" : undefined,
          bottom: imageLeft ? undefined : "-16px",
          left: imageLeft ? "-16px" : undefined,
          right: imageLeft ? undefined : "-16px",
          width: "100%",
          height: "100%",
          border: `1px solid ${dark ? "rgba(242,182,50,0.2)" : "rgba(139,75,50,0.2)"}`,
        }}
      />

      <div className="img-zoom-wrap relative" style={{ aspectRatio: "3/4", overflow: "hidden" }}>
        <img
          src={data.image}
          alt={data.imageAlt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to top, ${dark ? "rgba(15,15,15,0.5)" : "rgba(139,75,50,0.2)"} 0%, transparent 60%)` }}
        />
      </div>

      {/* Label badge */}
      <div
        className="absolute bottom-6 right-6 px-5 py-3"
        style={{
          backgroundColor: "#F2B632",
          clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
        }}
      >
        <div
          className="text-[#0F0F0F] font-bold"
          style={{ fontFamily: "var(--font-inter)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase" }}
        >
          {data.label}
        </div>
      </div>
    </div>
  );

  const waveShape = waveType === "curve"
    ? <path d={`M0 0 C480 70 960 70 1440 0 L1440 70 L0 70 Z`} fill={waveFill} />
    : waveType === "curve-reverse"
    ? <path d={`M0 70 C480 0 960 0 1440 70 L1440 70 L0 70 Z`} fill={waveFill} />
    : <path d={`M0 0 L1440 70 L1440 70 L0 70 Z`} fill={waveFill} />;

  return (
    <section
      id={`pilier-${data.slug}`}
      className="relative py-32 overflow-hidden"
      style={{ backgroundColor: data.bg }}
    >
      {/* Grain for dark sections */}
      {dark && (
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
        />
      )}

      <div className="max-w-7xl mx-auto px-8 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {imageLeft ? (
            <>
              {imageBlock}
              {textBlock}
            </>
          ) : (
            <>
              {textBlock}
              {imageBlock}
            </>
          )}
        </div>
      </div>

      {/* Wave/shape separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 70" fill="none" preserveAspectRatio="none" className="w-full h-14">
          {waveShape}
        </svg>
      </div>
    </section>
  );
}
