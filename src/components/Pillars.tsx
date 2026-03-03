"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Leaf, Users, Lightbulb, Heart, Radio } from "lucide-react";

const pillars = [
  {
    id: 1,
    icon: Radio,
    title: "Culture & Patrimoine",
    text: "Préserver, valoriser et transmettre le patrimoine culturel Ewé comme socle d'une identité forte et d'un avenir cohérent.",
    image: "https://images.unsplash.com/photo-1514222709107-a180c68d72b4?w=600&q=80&fit=crop",
    color: "#8B4B32",
  },
  {
    id: 2,
    icon: Leaf,
    title: "Agriculture Durable",
    text: "Former les jeunes aux pratiques agroécologiques pour assurer la souveraineté alimentaire et créer des emplois durables.",
    image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=600&q=80&fit=crop",
    color: "#8B4B32",
  },
  {
    id: 3,
    icon: Lightbulb,
    title: "Entrepreneuriat & Emploi",
    text: "Accompagner les porteurs de projets, stimuler l'innovation locale et créer des filières économiques structurantes.",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&q=80&fit=crop&crop=faces",
    color: "#8B4B32",
  },
  {
    id: 4,
    icon: Heart,
    title: "Solidarité & Santé",
    text: "Renforcer le tissu communautaire, soutenir les populations vulnérables et promouvoir l'accès aux soins essentiels.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80&fit=crop",
    color: "#8B4B32",
  },
  {
    id: 5,
    icon: Users,
    title: "Média & Transmission",
    text: "Donner une voix aux communautés togolaises à travers des médias indépendants et un storytelling culturel authentique.",
    image: "https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?w=600&q=80&fit=crop",
    color: "#8B4B32",
  },
];

function PillarCard({
  pillar,
  index,
}: {
  pillar: (typeof pillars)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const Icon = pillar.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group relative overflow-hidden cursor-pointer"
      style={{
        clipPath:
          "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
      }}
    >
      {/* Image */}
      <div className="img-zoom-wrap" style={{ aspectRatio: "4/3" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={pillar.image}
          alt={pillar.title}
          className="w-full h-full object-cover"
        />
        {/* Base overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/90 via-[#0F0F0F]/20 to-transparent" />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#8B4B32]/0 group-hover:bg-[#8B4B32]/70 transition-all duration-500" />
        {/* Gold bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F2B632] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        {/* Icon */}
        <div className="mb-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
          <div
            className="w-10 h-10 flex items-center justify-center"
            style={{ backgroundColor: "#F2B632" }}
          >
            <Icon size={18} style={{ color: "#0F0F0F" }} />
          </div>
        </div>

        {/* Title */}
        <h3
          className="text-white mb-2 leading-tight"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "1.35rem",
            fontWeight: 500,
          }}
        >
          {pillar.title}
        </h3>

        {/* Text — reveals on hover */}
        <p
          className="text-white/0 group-hover:text-white/85 transition-all duration-500 leading-relaxed text-sm"
          style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
        >
          {pillar.text}
        </p>
      </div>
    </motion.div>
  );
}

export default function Pillars() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section className="relative py-32 overflow-hidden" style={{ backgroundColor: "#FFFFFF" }}>
      {/* Watermark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#0F0F0F]/[0.025] select-none pointer-events-none"
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(8rem, 20vw, 28rem)",
          fontWeight: 700,
          whiteSpace: "nowrap",
          letterSpacing: "-0.05em",
        }}
      >
        VISION
      </div>

      <div className="max-w-7xl mx-auto px-8 lg:px-16 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center gap-3 mb-5"
          >
            <div className="w-8 h-[1px] bg-[#F2B632]" />
            <span
              className="text-[#8B4B32] text-xs tracking-[0.25em] uppercase"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Nos domaines d&apos;action
            </span>
            <div className="w-8 h-[1px] bg-[#F2B632]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[#0F0F0F] leading-[1.1]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
            }}
          >
            Cinq piliers{" "}
            <em className="italic" style={{ color: "#8B4B32" }}>
              fondateurs
            </em>
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            animate={headerInView ? { width: "4rem" } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="h-[2px] bg-[#F2B632] mx-auto mt-6"
          />
        </div>

        {/* Grid — dynamic layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.slice(0, 3).map((p, i) => (
            <PillarCard key={p.id} pillar={p} index={i} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 lg:grid-cols-2 max-w-3xl mx-auto">
          {pillars.slice(3).map((p, i) => (
            <PillarCard key={p.id} pillar={p} index={i + 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
