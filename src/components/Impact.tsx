"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";

const stats = [
  { value: 5, suffix: "+", label: "Initiatives structurantes", description: "Projets majeurs actifs" },
  { value: 1000, suffix: "+", label: "Emplois ciblés", description: "Directs et indirects" },
  { value: 4, suffix: "", label: "Domaines d'action", description: "Intégrés et complémentaires" },
  { value: 1, suffix: "", label: "Vision durable", description: "Ancrée dans l'identité" },
];

function AnimatedNumber({
  target,
  suffix,
  isInView,
}: {
  target: number;
  suffix: string;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = 16;
    const increment = target / (duration / step);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span>
      {count.toLocaleString("fr-FR")}
      {suffix}
    </span>
  );
}

export default function Impact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      className="relative py-32 overflow-hidden"
      style={{ backgroundColor: "#E9E6E1" }}
    >
      {/* Background image (very subtle) */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1920&q=60&fit=crop"
          alt=""
          className="w-full h-full object-cover opacity-[0.07]"
        />
        <div className="absolute inset-0" style={{ backgroundColor: "#E9E6E1", opacity: 0.93 }} />
      </div>

      <div className="max-w-7xl mx-auto px-8 lg:px-16 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-[1px] bg-[#F2B632]" />
            <span
              className="text-[#8B4B32] text-xs tracking-[0.25em] uppercase"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Notre impact
            </span>
            <div className="w-8 h-[1px] bg-[#F2B632]" />
          </div>

          <h2
            className="text-[#0F0F0F] leading-[1.1]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
            }}
          >
            Des chiffres qui{" "}
            <em className="italic" style={{ color: "#8B4B32" }}>
              parlent
            </em>
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="relative p-10 text-center group cursor-default"
              style={{
                backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#0F0F0F",
              }}
            >
              {/* Left border accent */}
              {i > 0 && (
                <div
                  className="absolute left-0 top-8 bottom-8 w-[1px]"
                  style={{ backgroundColor: i % 2 === 0 ? "rgba(139,75,50,0.15)" : "rgba(242,182,50,0.2)" }}
                />
              )}

              {/* Number */}
              <div
                className="leading-none mb-3"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(3rem, 5vw, 5rem)",
                  fontWeight: 300,
                  color: i % 2 === 0 ? "#8B4B32" : "#F2B632",
                }}
              >
                <AnimatedNumber
                  target={stat.value}
                  suffix={stat.suffix}
                  isInView={isInView}
                />
              </div>

              {/* Gold line */}
              <div
                className="w-8 h-[2px] mx-auto mb-3 transition-all duration-300 group-hover:w-16"
                style={{ backgroundColor: "#F2B632" }}
              />

              {/* Label */}
              <p
                className="font-medium mb-1"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "1.1rem",
                  color: i % 2 === 0 ? "#0F0F0F" : "#FFFFFF",
                }}
              >
                {stat.label}
              </p>

              {/* Sub */}
              <p
                className="text-xs tracking-wide"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 300,
                  color: i % 2 === 0 ? "rgba(15,15,15,0.5)" : "rgba(255,255,255,0.4)",
                }}
              >
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
