"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    id: 1,
    tag: "Culture & Architecture",
    title: "DZOTSOPE CENTER",
    subtitle: "Centre culturel & artistique",
    description:
      "Un espace de vie culturelle unique au cœur de Notsè — scènes, ateliers, expositions et transmission du patrimoine Ewé dans une architecture contemporaine ancrée dans la tradition.",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=85&fit=crop",
    year: "2024",
  },
  {
    id: 2,
    tag: "Agriculture & Formation",
    title: "BKF SONGHAÏ TOGO",
    subtitle: "Centre agroécologique",
    description:
      "Inspiré du modèle Songhaï du Bénin, ce centre forme des jeunes aux techniques d'agriculture durable, d'élevage et de transformation agroalimentaire pour créer de vraies filières.",
    image:
      "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=1200&q=85&fit=crop",
    year: "2023",
  },
  {
    id: 3,
    tag: "Tourisme Responsable",
    title: "COMPLEXE HÔTELIER",
    subtitle: "Éco-tourisme & hospitality",
    description:
      "Un complexe hôtelier éco-responsable qui valorise la nature togolaise et génère des revenus locaux durables, tout en offrant une expérience immersive et authentique aux visiteurs.",
    image:
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=85&fit=crop",
    year: "2025",
  },
  {
    id: 4,
    tag: "Média & Storytelling",
    title: "DZOTSOPE TV",
    subtitle: "Chaîne média culturelle",
    description:
      "Une chaîne de production audiovisuelle portée par des jeunes togolais — pour raconter les histoires de leur territoire, diffuser la culture Ewé et former une nouvelle génération de créateurs.",
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=85&fit=crop",
    year: "2024",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden cursor-pointer"
      style={{
        clipPath: isEven
          ? "polygon(0 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%)"
          : "polygon(24px 0, 100% 0, 100% 100%, 0 100%, 0 24px)",
      }}
    >
      {/* Image */}
      <div className="img-zoom-wrap" style={{ aspectRatio: "16/10" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/95 via-[#0F0F0F]/40 to-transparent" />
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{ backgroundColor: "rgba(139,75,50,0.3)", opacity: hovered ? 1 : 0 }}
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-10">
        {/* Top tag + year */}
        <div className="flex items-center justify-between mb-auto pt-6">
          <span
            className="text-[#F2B632] text-xs tracking-[0.2em] uppercase"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {project.tag}
          </span>
          <span
            className="text-white/40 text-xs"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {project.year}
          </span>
        </div>

        {/* Title */}
        <div>
          <p
            className="text-white/50 text-sm mb-2"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
          >
            {project.subtitle}
          </p>
          <h3
            className="text-white leading-tight mb-4"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
            }}
          >
            {project.title}
          </h3>

          {/* Gold line */}
          <div
            className="h-[1px] bg-[#F2B632] mb-4 transition-all duration-500 origin-left"
            style={{ width: hovered ? "100%" : "3rem" }}
          />

          {/* Description — hover reveal */}
          <p
            className="text-white/70 leading-relaxed text-sm mb-5 transition-all duration-500"
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 300,
              maxHeight: hovered ? "120px" : "0px",
              overflow: "hidden",
              opacity: hovered ? 1 : 0,
            }}
          >
            {project.description}
          </p>

          {/* Arrow */}
          <div
            className="flex items-center gap-2 text-[#F2B632] transition-opacity duration-300"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              opacity: hovered ? 1 : 0,
            }}
          >
            Découvrir le projet
            <ArrowRight size={12} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section
      className="relative py-32 overflow-hidden"
      style={{ backgroundColor: "#0F0F0F" }}
    >
      {/* Mineral grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Terre accent top border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#8B4B32] to-transparent" />

      <div className="max-w-7xl mx-auto px-8 lg:px-16 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="w-8 h-[1px] bg-[#F2B632]" />
            <span
              className="text-[#F2B632] text-xs tracking-[0.25em] uppercase"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Projets structurants
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="text-white leading-[1.1] max-w-3xl"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
            }}
          >
            Des projets concrets au service{" "}
            <em className="italic" style={{ color: "#F2B632" }}>
              d&apos;une vision globale.
            </em>
          </motion.h2>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-14 text-center"
        >
          <button className="bkf-btn-outline">
            Découvrir tous les projets
            <ArrowRight size={14} />
          </button>
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-[0]">
        <svg
          viewBox="0 0 1440 60"
          xmlns="http://www.w3.org/2000/svg"
          className="block w-full"
          preserveAspectRatio="none"
          style={{ height: 60 }}
        >
          <path
            d="M0,40 C240,0 480,60 720,30 C960,0 1200,60 1440,20 L1440,60 L0,60 Z"
            fill="#E9E6E1"
          />
        </svg>
      </div>
    </section>
  );
}
