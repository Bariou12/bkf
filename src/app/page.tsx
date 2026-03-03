import HeroSlider from "@/components/HeroSlider";
import Header from "@/components/Header";
import Manifeste from "@/components/Manifeste";
import Pillars from "@/components/Pillars";
import Projects from "@/components/Projects";
import Support from "@/components/Support";
import Heritage from "@/components/Heritage";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main>
      <Header />
      <HeroSlider />
      <Manifeste />
      <Pillars />
      <Projects />
      <Support />
      <Heritage />
      <Footer />
    </main>
  );
}
