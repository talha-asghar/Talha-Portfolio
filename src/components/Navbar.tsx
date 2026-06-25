import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, Menu, X, Lock } from 'lucide-react';

const LINKS = [
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleDownload = () => {
  const link = document.createElement('a');
  link.href = '/Talha_Asghar_FullStack_resume.pdf'; // public folder ka path (bina 'public' likhe)
  link.download = 'Talha_Asghar_FullStack_resume.pdf';
  link.click();
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.1 }}
      className="fixed top-4 inset-x-0 z-50 flex justify-center px-4"
    >
      <div className={`flex items-center justify-between gap-2  transition-all duration-300  rounded-full px-3 py-4 w-full max-w-7xl ${
        scrolled ? 'glass-strong' : 'glass'
      }`}>
        <a href="#hero" className="flex items-center gap-2 font-display font-bold text-base text-white shrink-0 pl-1">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-xs shadow-neon-blue">TA</span>
          <span className="hidden sm:inline">Talha<span className="text-gradient">.dev</span></span>
        </a>

        <div className="hidden md:flex items-center gap-0.5">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}
              className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors rounded-lg hover:bg-white/5">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button onClick={handleDownload}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-gradient-to-r from-blue-500 to-violet-500 text-white hover:shadow-neon-blue transition-shadow">
            <Download className="w-3.5 h-3.5" /> CV
          </button>
          <Link to="/admin" className="w-9 h-9 rounded-xl glass flex items-center justify-center text-slate-300 hover:text-blue-400 transition-colors" aria-label="Admin">
            <Lock className="w-4 h-4" />
          </Link>
          <button onClick={() => setOpen((o) => !o)}
            className="md:hidden w-9 h-9 rounded-xl glass flex items-center justify-center text-slate-200" aria-label="Menu">
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full mt-2 inset-x-4 glass-strong rounded-2xl p-3"
          >
            <div className="flex flex-col gap-0.5">
              {LINKS.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                  className="px-4 py-2.5 rounded-lg text-slate-200 hover:bg-blue-500/10 transition-colors text-sm font-medium">
                  {l.label}
                </a>
              ))}
              <div className="flex gap-2 pt-2 mt-1 border-t border-white/10">
                <button onClick={handleDownload} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 text-white text-sm font-medium">
                  <Download className="w-4 h-4" /> Download CV
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
