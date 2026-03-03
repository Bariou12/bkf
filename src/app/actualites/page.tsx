"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowDown, Calendar, ChevronRight, Play, Mail, Filter } from "lucide-react";
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
function GoldTitle({ children, className = "", visible: forcedVisible }: { children: React.ReactNode; className?: string; visible?: boolean }) {
  const { ref, visible: revealed } = useReveal();
  const isVisible = forcedVisible ?? revealed;
  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      {children}
      <motion.span
        initial={{ width: "0%" }}
        animate={{ width: isVisible ? "100%" : "0%" }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-[#F2B632] to-[#e8a820]"
      />
    </div>
  );
}

const CATEGORIES = ["Tous", "Culture", "Agriculture", "Solidarité", "Événements", "Communiqués"];

const ALL_NEWS = [
  {
    id: 1,
    date: "15 Mai 2024",
    category: "Culture",
    title: "Inauguration de la phase 1 du Dzotsope Center",
    excerpt: "Un moment historique pour la ville de Notsè avec l'ouverture des premiers espaces de transmission culturelle et de valorisation du patrimoine Ewé.",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&q=90&auto=format&fit=crop",
    slug: "inauguration-dzotsope-center",
    featured: true,
  },
  {
    id: 2,
    date: "28 Avril 2024",
    category: "Agriculture",
    title: "BKF Songhaï : Première promotion d'agro-entrepreneurs",
    excerpt: "Vingt-cinq jeunes diplômés rejoignent le réseau des entrepreneurs agricoles formés aux techniques durables et à la production intégrée.",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80&auto=format&fit=crop",
    slug: "promotion-songhai",
  },
  {
    id: 3,
    date: "10 Mars 2024",
    category: "Solidarité",
    title: "Lancement du programme de bourses 'Identité & Avenir'",
    excerpt: "La Fondation BKF annonce un nouveau dispositif d'accompagnement pour les étudiants méritants de la région des Plateaux.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80&auto=format&fit=crop",
    slug: "bourses-identite-avenir",
  },
  {
    id: 4,
    date: "22 Février 2024",
    category: "Culture",
    title: "Dzotsope TV : Nouveau documentaire sur les récits Ewé",
    excerpt: "Une plongée inédite dans l'histoire de Notsè à travers les témoignages des gardiens de la tradition et de la sagesse ancestrale.",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80&auto=format&fit=crop",
    slug: "documentaire-ewe",
  },
  {
    id: 5,
    date: "05 Janvier 2024",
    category: "Communiqués",
    title: "Bilan 2023 : Un impact structurant pour le territoire",
    excerpt: "Retour sur une année de déploiement stratégique et de consolidation des piliers de la Fondation BKF pour un avenir durable.",
    image: "https://images.unsplash.com/photo-1504817343863-5092a923803e?w=800&q=80&auto=format&fit=crop",
    slug: "bilan-2023",
  },
  {
    id: 6,
    date: "12 Décembre 2023",
    category: "Événements",
    title: "Collaboration stratégique avec l'UNESCO Togo",
    excerpt: "Signature d'un protocole d'accord pour la protection et la valorisation du patrimoine immatériel régional du peuple Ewé.",
    image: "https://images.unsplash.com/photo-1541976535096-26bb2530188b?w=800&q=80&auto=format&fit=crop",
    slug: "partenariat-unesco",
  },
];

const VIDEOS = [
  { id: 1, title: "L'âme de Notsè", type: "Documentaire", duration: "12:45", image: "https://images.unsplash.com/photo-1523813355648-479ad51f586b?w=600&q=80&auto=format&fit=crop" },
  { id: 2, title: "Semer l'avenir", type: "Reportage", duration: "08:20", image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80&auto=format&fit=crop" },
  { id: 3, title: "Paroles d'Ewé", type: "Interview", duration: "05:15", image: "https://images.unsplash.com/photo-1531050171669-014464ce50e0?w=600&q=80&auto=format&fit=crop" },
];

const GALLERY = [
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1509059852496-f3822ae057bc?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526726538690-5cbf95642cb0?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542044896530-05d85be9b11a?w=600&q=80&auto=format&fit=crop",
];

export default function ActualitesPage() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [filteredNews, setFilteredNews] = useState(ALL_NEWS);
  const featuredArticle = ALL_NEWS.find(a => a.featured) || ALL_NEWS[0];

  useEffect(() => {
    if (activeCategory === "Tous") {
      setFilteredNews(ALL_NEWS);
    } else {
      setFilteredNews(ALL_NEWS.filter(n => n.category === activeCategory));
    }
  }, [activeCategory]);

  return (
    <main className="bg-white overflow-x-hidden min-h-screen">
      <Header />

      {/* 🎬 HERO ÉDITORIAL IMMERSIF — 80vh */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1800&q=90&auto=format&fit=crop"
            alt="Hero Actualités BKF"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#8B4B32]/70 via-[#0F0F0F]/40 to-[#0F0F0F]/90" />
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#F2B632] tracking-[0.3em] uppercase text-xs font-bold mb-6" style={{ fontFamily: "var(--font-inter)" }}>
              Actualités
            </p>
            <GoldTitle visible={true} className="mb-8">
              <h1 
                className="text-white text-5xl md:text-8xl font-light tracking-tight"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                L&rsquo;action BKF
              </h1>
            </GoldTitle>
            <p 
              className="text-white/70 text-lg md:text-xl font-light max-w-2xl mx-auto mb-12"
              style={{ fontFamily: "var(--font-inter)", lineHeight: 1.8 }}
            >
              Suivez les avancées, événements et initiatives qui structurent notre impact sur le territoire.
            </p>
            <a href="#featured" className="inline-flex flex-col items-center gap-4 text-white/50 hover:text-[#F2B632] transition-colors">
              <span className="text-[10px] tracking-[0.2em] uppercase font-bold">Explorer</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowDown size={20} />
              </motion.div>
            </a>
          </motion.div>
        </div>
      </section>

      {/* 📰 ARTICLE À LA UNE */}
      <section id="featured" className="py-24 bg-[#E9E6E1] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row bg-white shadow-2xl overflow-hidden"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)" }}
          >
            <div className="lg:w-3/5 relative overflow-hidden group">
              <img 
                src={featuredArticle.image} 
                alt={featuredArticle.title}
                className="w-full h-[400px] lg:h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#8B4B32]/10 mix-blend-multiply" />
            </div>
            <div className="lg:w-2/5 p-12 flex flex-col justify-center bg-white relative">
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-[#F2B632] text-[#0F0F0F] text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                  {featuredArticle.category}
                </span>
                <span className="text-[#8B4B32]/60 text-xs font-medium uppercase tracking-wider">
                  {featuredArticle.date}
                </span>
              </div>
              <h2 
                className="text-[#0F0F0F] text-3xl md:text-4xl leading-tight mb-6"
                style={{ fontFamily: "var(--font-cormorant)", fontWeight: 500 }}
              >
                {featuredArticle.title}
              </h2>
              <p 
                className="text-[#3a2a22]/70 text-lg mb-8"
                style={{ fontFamily: "var(--font-inter)", fontWeight: 300, lineHeight: 1.7 }}
              >
                {featuredArticle.excerpt}
              </p>
              <a 
                href={`/actualites/${featuredArticle.slug}`}
                className="inline-flex items-center gap-3 text-[#8B4B32] font-bold uppercase tracking-widest text-xs group"
              >
                Lire l&rsquo;article
                <ChevronRight size={16} className="transition-transform group-hover:translate-x-2" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🗂 FILTRE CATÉGORIEL */}
      <section className="py-12 bg-white border-b border-[#E9E6E1] sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto">
          <div className="flex items-center justify-center gap-4 min-w-max pb-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 text-xs uppercase tracking-[0.2em] font-bold border transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[#F2B632] border-[#F2B632] text-[#0F0F0F]"
                    : "border-[#E9E6E1] text-[#0F0F0F]/60 hover:border-[#F2B632] hover:text-[#8B4B32]"
                }`}
                style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)" }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 📰 GRILLE ÉDITORIALE ASYMÉTRIQUE */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <AnimatePresence mode="popLayout">
              {filteredNews.filter(a => !a.featured).map((news, i) => (
                <motion.article
                  layout
                  key={news.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group flex flex-col"
                >
                  <div className="relative aspect-[4/5] overflow-hidden mb-8 shadow-lg" style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)" }}>
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-6 left-6">
                      <span className="bg-white text-[#0F0F0F] text-[9px] font-bold px-3 py-1 uppercase tracking-widest shadow-md">
                        {news.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-4 text-[#8B4B32]/60 text-[10px] uppercase tracking-widest font-bold">
                    <Calendar size={12} />
                    <span>{news.date}</span>
                  </div>
                  <h3 
                    className="text-[#0F0F0F] text-2xl leading-tight mb-4 group-hover:text-[#8B4B32] transition-colors"
                    style={{ fontFamily: "var(--font-cormorant)", fontWeight: 500 }}
                  >
                    {news.title}
                  </h3>
                  <p 
                    className="text-[#3a2a22]/60 text-sm leading-relaxed mb-6 line-clamp-3"
                    style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                  >
                    {news.excerpt}
                  </p>
                  <a 
                    href={`/actualites/${news.slug}`}
                    className="mt-auto inline-flex items-center gap-2 text-[#8B4B32] text-[10px] font-bold uppercase tracking-[0.2em] group/link"
                  >
                    Lire la suite
                    <div className="w-8 h-[1px] bg-[#8B4B32] origin-left group-hover/link:scale-x-150 transition-transform duration-300" />
                  </a>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 🎥 SECTION VIDÉO (DZOTSOPE TV) */}
      <section className="py-24 bg-[#0F0F0F] overflow-hidden relative">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <p className="text-[#F2B632] tracking-[0.3em] uppercase text-xs font-bold mb-4">Dzotsope TV</p>
              <h2 
                className="text-white text-4xl md:text-5xl font-light"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                L&rsquo;action en <em className="italic text-[#F2B632]">mouvement.</em>
              </h2>
            </div>
            <a href="#" className="bkf-btn-outline border-white/20 text-white hover:border-[#F2B632]">
              Voir toutes les vidéos
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VIDEOS.map((vid, i) => (
              <motion.div
                key={vid.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative cursor-pointer"
              >
                <div className="relative aspect-video overflow-hidden mb-6" style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)" }}>
                  <img src={vid.image} alt={vid.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-[#0F0F0F]/40 group-hover:bg-[#8B4B32]/30 transition-colors duration-500 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-[#F2B632] group-hover:border-[#F2B632] transition-all duration-300">
                      <Play size={24} className="text-white fill-current ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-[#0F0F0F]/80 px-2 py-1 text-[10px] text-white font-bold tracking-widest">
                    {vid.duration}
                  </div>
                </div>
                <p className="text-[#F2B632] text-[10px] uppercase tracking-widest font-bold mb-2">{vid.type}</p>
                <h3 className="text-white text-xl font-light" style={{ fontFamily: "var(--font-inter)" }}>{vid.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 📸 GALERIE DOCUMENTAIRE */}
      <section className="py-24 bg-[#E9E6E1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center mb-16">
          <GoldTitle>
            <h2 
              className="text-[#0F0F0F] text-4xl font-light mb-4"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Regards sur le terrain
            </h2>
          </GoldTitle>
        </div>
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
            {GALLERY.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative overflow-hidden group shadow-xl"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)" }}
              >
                <img src={img} alt="Galerie BKF" className="w-full grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-[#8B4B32]/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 📬 NEWSLETTER */}
      <section className="relative py-32 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1523813355648-479ad51f586b?w=1800&q=90&auto=format&fit=crop" 
            alt="Newsletter Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0F0F0F]/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-[#0F0F0F]/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Mail size={48} className="text-[#F2B632] mx-auto mb-8" />
            <h2 
              className="text-white text-4xl md:text-6xl font-light mb-8"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Restez <em className="italic text-[#F2B632]">informé.</em>
            </h2>
            <p className="text-white/60 text-lg mb-12 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}>
              Rejoignez notre communauté pour recevoir les actualités stratégiques et les récits d&rsquo;impact de la Fondation BKF directement dans votre boîte mail.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input 
                type="email" 
                placeholder="Votre adresse email"
                className="flex-1 bg-white/5 border border-white/20 px-8 py-4 text-white placeholder:text-white/30 focus:border-[#F2B632] outline-none transition-colors"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)" }}
              />
              <button 
                className="bkf-btn-gold px-12 py-4 whitespace-nowrap"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)" }}
              >
                S&rsquo;inscrire
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
