"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, ChevronLeft, Share2, Quote, ArrowRight, User } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useParams } from "next/navigation";

/* ─── Gold animated underline ─────────────────────────────── */
function GoldTitle({ children, className = "", visible: forcedVisible }: { children: React.ReactNode; className?: string; visible?: boolean }) {
  return (
    <div className={`relative inline-block ${className}`}>
      {children}
      <motion.span
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-[#F2B632] to-[#e8a820]"
      />
    </div>
  );
}

const ARTICLES_DATA: Record<string, any> = {
  "inauguration-dzotsope-center": {
    title: "Inauguration officielle du Dzotsope Center",
    subtitle: "Un nouveau chapitre pour la transmission de la culture Ewé à Notsè.",
    category: "Culture",
    date: "15 Mai 2024",
    heroImage: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1800&q=90&auto=format&fit=crop",
    author: "Direction de la Communication",
    content: [
      {
        type: "paragraph",
        text: "La ville de Notsè, berceau historique du peuple Ewé, a vibré au rythme d'une cérémonie mémorable pour l'inauguration de la première phase du Dzotsope Center. Porté par la vision stratégique de la Fondation BKF, ce pôle culturel ambitionne de devenir un centre d'excellence pour la sauvegarde et la valorisation du patrimoine ancestral."
      },
      {
        type: "paragraph",
        text: "Devant une assemblée composée de dignitaires, d'acteurs culturels et de la jeunesse locale, le projet a été présenté comme un pont entre passé et futur. 'Le Dzotsope Center n'est pas qu'un bâtiment, c'est un sanctuaire de mémoire et un laboratoire d'avenir', a souligné la direction de la Fondation lors du discours d'ouverture."
      },
      {
        type: "quote",
        text: "Nous construisons ici les fondations d'une identité fière et structurée, capable de rayonner bien au-delà de nos frontières.",
        author: "Koffi B., Responsable du Programme Culturel"
      },
      {
        type: "paragraph",
        text: "Cette première phase comprend un sanctuaire de transmission, une agora de rassemblement et des espaces dédiés aux archives orales. Les premiers ateliers de conte et de musique traditionnelle débuteront dès le mois prochain, impliquant activement les enfants des écoles environnantes."
      }
    ],
    impact: [
      { label: "Bénéficiaires directs", value: "500+ enfants/mois" },
      { label: "Domaine d'impact", value: "Patrimoine Immatériel" },
      { label: "Emplois locaux créés", value: "12 permanents" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1526726538690-5cbf95642cb0?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80&auto=format&fit=crop"
    ],
    testimony: {
      name: "Akouélé G.",
      role: "Étudiante et bénévole",
      text: "Avoir accès à un tel lieu à Notsè change tout pour nous. On apprend enfin l'histoire de nos ancêtres de manière vivante et moderne.",
      image: "https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?w=400&q=80&auto=format&fit=crop"
    }
  }
};

export default function ArticleDetail() {
  const params = useParams();
  const slug = params?.slug as string;
  const article = ARTICLES_DATA[slug] || ARTICLES_DATA["inauguration-dzotsope-center"];
  
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"]
  });
  
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main className="bg-white min-h-screen">
      <Header />

      {/* 🎬 HERO ARTICLE IMMERSIF — 75vh */}
      <section ref={scrollRef} className="relative h-[75vh] flex items-end overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img 
            src={article.heroImage} 
            alt={article.title} 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/40 to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-[#F2B632] text-[#0F0F0F] text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                {article.category}
              </span>
              <div className="flex items-center gap-2 text-white/60 text-xs font-medium uppercase tracking-wider">
                <Calendar size={12} />
                <span>{article.date}</span>
              </div>
            </div>
            
            <GoldTitle className="mb-6">
              <h1 
                className="text-white text-4xl md:text-6xl font-light leading-tight tracking-tight"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {article.title}
              </h1>
            </GoldTitle>
            
            <p 
              className="text-white/80 text-xl md:text-2xl font-light max-w-3xl"
              style={{ fontFamily: "var(--font-inter)", lineHeight: 1.6 }}
            >
              {article.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ✍️ CONTENT SECTION */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Sidebar Left: Author & Social */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="sticky top-32 space-y-12">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-[#E9E6E1] flex items-center justify-center text-[#8B4B32]">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#8B4B32]/60 font-bold mb-1">Publié par</p>
                  <p className="text-sm font-bold text-[#0F0F0F]">{article.author}</p>
                </div>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#8B4B32]/60 font-bold mb-4">Partager</p>
                <div className="flex gap-4">
                  {[1, 2, 3].map((i) => (
                    <button key={i} className="w-10 h-10 border border-[#E9E6E1] flex items-center justify-center text-[#0F0F0F] hover:bg-[#F2B632] hover:border-[#F2B632] transition-all duration-300">
                      <Share2 size={16} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-[#E9E6E1]">
                <a href="/actualites" className="inline-flex items-center gap-2 text-[#8B4B32] text-[10px] font-bold uppercase tracking-widest group">
                  <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                  Retour aux actualités
                </a>
              </div>
            </div>
          </div>

          {/* Main Body */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="prose prose-lg prose-stone max-w-none">
              {article.content.map((block: any, idx: number) => {
                if (block.type === "paragraph") {
                  return (
                    <p 
                      key={idx} 
                      className="text-[#3a2a22]/80 mb-8 leading-relaxed text-lg font-light"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {block.text}
                    </p>
                  );
                }
                if (block.type === "quote") {
                  return (
                    <div key={idx} className="my-12 relative p-10 bg-[#E9E6E1]/50 border-l-4 border-[#F2B632]">
                      <Quote className="absolute top-6 left-6 text-[#F2B632]/20 w-16 h-16" />
                      <p className="text-2xl text-[#8B4B32] font-serif italic mb-4 relative z-10" style={{ fontFamily: "var(--font-cormorant)" }}>
                        &ldquo;{block.text}&rdquo;
                      </p>
                      <p className="text-sm font-bold uppercase tracking-widest text-[#0F0F0F] relative z-10">
                        — {block.author}
                      </p>
                    </div>
                  );
                }
                return null;
              })}
            </div>

            {/* 👤 BLOC TÉMOIGNAGE */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20 flex flex-col md:flex-row bg-[#E9E6E1] overflow-hidden shadow-xl"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)" }}
            >
              <div className="md:w-1/3">
                <img src={article.testimony.image} alt={article.testimony.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
              <div className="md:w-2/3 p-10 flex flex-col justify-center">
                <p className="text-xl text-[#0F0F0F] font-light italic mb-6 leading-relaxed">
                  &ldquo;{article.testimony.text}&rdquo;
                </p>
                <div>
                  <p className="font-bold text-[#8B4B32] tracking-wider uppercase text-xs">{article.testimony.name}</p>
                  <p className="text-[#0F0F0F]/50 text-[10px] uppercase tracking-widest font-medium">{article.testimony.role}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar Right: Impact */}
          <div className="lg:col-span-2 order-3">
            <div className="sticky top-32 p-8 bg-white border-2 border-[#F2B632]/20 space-y-8">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#F2B632] font-bold">Impact Clé</p>
              {article.impact.map((item: any, i: number) => (
                <div key={i}>
                  <p className="text-2xl font-light text-[#0F0F0F] mb-1" style={{ fontFamily: "var(--font-cormorant)" }}>{item.value}</p>
                  <p className="text-[10px] uppercase tracking-widest text-[#8B4B32]/60 font-bold">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 🖼 GALERIE CONTEXTUELLE */}
      <section className="py-24 bg-[#0F0F0F] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {article.gallery.map((img: string, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`overflow-hidden group ${i === 1 ? "lg:col-span-1 lg:row-span-2 h-full" : "h-[300px]"}`}
                style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)" }}
              >
                <img src={img} alt="Gallery item" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-[#8B4B32]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔄 ARTICLES LIÉS */}
      <section className="py-24 bg-[#E9E6E1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-light text-[#0F0F0F] mb-12 text-center" style={{ fontFamily: "var(--font-cormorant)" }}>À lire également</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "BKF Songhaï : Première promotion d'agro-entrepreneurs", cat: "Agriculture", slug: "promotion-songhai", img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80" },
              { title: "Dzotsope TV : Nouveau documentaire sur les récits Ewé", cat: "Culture", slug: "documentaire-ewe", img: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80" },
              { title: "Bilan 2023 : Un impact structurant pour le territoire", cat: "Communiqués", slug: "bilan-2023", img: "https://images.unsplash.com/photo-1504817343863-5092a923803e?w=600&q=80" }
            ].map((related, i) => (
              <a key={i} href={`/actualites/${related.slug}`} className="group block bg-white shadow-lg overflow-hidden flex flex-col h-full">
                <div className="aspect-video overflow-hidden">
                  <img src={related.img} alt={related.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[9px] font-bold text-[#F2B632] uppercase tracking-[0.2em] mb-3">{related.cat}</span>
                  <h3 className="text-lg text-[#0F0F0F] font-bold leading-tight mb-4 group-hover:text-[#8B4B32] transition-colors">{related.title}</h3>
                  <div className="mt-auto flex items-center gap-2 text-[#8B4B32] text-[10px] font-bold uppercase tracking-widest">
                    Lire la suite <ArrowRight size={12} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 📬 CTA STRATÉGIQUE */}
      <section className="py-32 bg-[#0F0F0F] relative overflow-hidden flex items-center justify-center text-center">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1800&q=90" alt="CTA BG" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h2 className="text-white text-4xl md:text-5xl font-light mb-8" style={{ fontFamily: "var(--font-cormorant)" }}>Soutenir <em className="italic text-[#F2B632]">nos initiatives.</em></h2>
          <p className="text-white/60 text-lg mb-12 max-w-2xl mx-auto font-light">Votre engagement permet de renforcer l&rsquo;impact de la Fondation BKF et d&rsquo;accélérer la transformation culturelle et économique du territoire.</p>
          <a href="/fondation" className="bkf-btn-gold px-12 py-4">Découvrir comment soutenir</a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
