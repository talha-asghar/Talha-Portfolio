import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Sparkles, ChevronDown } from 'lucide-react';

const KEYWORDS = ['React.js', 'Next.js', 'Agentic AI', 'RAG', 'MCP Servers', 'React Native', 'Node.js', 'TypeScript'];

function useTypedText(words: string[], typeSpeed = 90, deleteSpeed = 45, pause = 1800) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === '') {
      setDeleting(false);
      setWordIndex((i) => i + 1);
    } else {
      timeout = setTimeout(() => {
        setText((t) => deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1));
      }, deleting ? deleteSpeed : typeSpeed);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, typeSpeed, deleteSpeed, pause]);

  return text;
}

const stagger = { animate: { transition: { staggerChildren: 0.12 } } };
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Hero() {
  const typed = useTypedText(KEYWORDS);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-24 overflow-hidden">
      {/* Ambient glows over the mesh */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-[120px] animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-violet-500/20 blur-[120px] animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[100px] animate-glow-pulse" style={{ animationDelay: '0.8s' }} />
      </div>

      <motion.div variants={stagger} initial="initial" animate="animate" className="max-w-4xl mx-auto text-center">
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium text-slate-200">Available for freelance & full-time</span>
        </motion.div>

        <motion.h1 variants={fadeUp} className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.05] tracking-tight">
          Talha Asghar
        </motion.h1>

        <motion.div variants={fadeUp} className="mt-5 h-12 flex items-center justify-center">
          <span className="font-mono text-xl md:text-2xl text-gradient font-medium">
            {typed}
            <span className="inline-block w-0.5 h-6 ml-1 bg-blue-400 animate-pulse align-middle" />
          </span>
        </motion.div>

        <motion.p variants={fadeUp} className="mt-6 text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Dynamic and result-oriented Developer with <span className="font-semibold text-blue-400">4+ years</span> of experience
          specializing in scalable web and mobile applications using React.js, Next.js, React Native, and Node.js.
          Expert in AI-driven development leveraging Agentic AI models, RAG implementations, and MCP servers.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="#projects" className="group flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 text-white font-medium hover:shadow-neon-blue transition-all hover:scale-105">
            View My Work
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a href="#contact" className="px-8 py-3.5 rounded-xl glass font-medium text-slate-100 hover:scale-105 transition-transform">
            Hire Me
          </a>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-10 flex items-center justify-center gap-4">
          {[
            { href: 'https://github.com/talha-54-ism', label: 'GitHub', icon: Github },
            { href: 'https://linkedin.com/in/talha-asghar', label: 'LinkedIn', icon: Linkedin },
          ].map(({ href, label, icon: Icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
              className="w-12 h-12 rounded-xl glass flex items-center justify-center text-slate-200 hover:text-blue-400 hover:shadow-neon-blue hover:scale-110 transition-all">
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="mt-16 flex flex-col items-center gap-1 text-slate-500">
          <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </motion.div>
      </motion.div>
    </section>
  );
}
