import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import Skills from '../components/sections/Skills';
import Projects from '../components/sections/Projects';
import Contact from '../components/sections/Contact';
import { usePortfolio } from '../context/PortfolioContext';
import { Loader2 } from 'lucide-react';

export default function PortfolioPage() {
  const { loading } = usePortfolio();

  return (
    <div className="relative min-h-screen text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        {loading ? (
          <div className="py-24 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
          </div>
        ) : (
          <>
            <Skills />
            <Services />
            <Projects />
            <Contact />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
