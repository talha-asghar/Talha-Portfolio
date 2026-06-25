import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import Section from '../Section';
import { usePortfolio } from '../../context/PortfolioContext';
import type { Project } from '../../types';

function ImageCarousel({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);
  if (!images.length) return null;

  return (
    <div className="relative rounded-2xl overflow-hidden">
      <div className="relative h-64 overflow-hidden bg-white/5">
        <AnimatePresence mode="wait">
          <motion.img
            key={idx}
            src={images[idx]}
            alt=""
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
        {images.length > 1 && (
          <>
            <button onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg glass-strong flex items-center justify-center text-white hover:scale-110 transition-transform">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => setIdx((i) => (i + 1) % images.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg glass-strong flex items-center justify-center text-white hover:scale-110 transition-transform">
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)}
                  className={`rounded-full transition-all ${i === idx ? 'w-5 h-2 bg-blue-500' : 'w-2 h-2 bg-white/60 hover:bg-white'}`} />
              ))}
            </div>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 p-3 overflow-x-auto bg-white/5">
          {images.map((src, i) => (
            <button key={i} onClick={() => setIdx(i)}
              className={`shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${i === idx ? 'border-blue-500 scale-105' : 'border-transparent opacity-50 hover:opacity-100'}`}>
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
        className="glass-strong rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 pb-0">
          <ImageCarousel images={project.images} />
        </div>
        <div className="p-6 space-y-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">{project.category}</span>
              <h2 className="font-display text-2xl font-bold text-white mt-0.5">{project.title}</h2>
            </div>
            <button onClick={onClose}
              className="w-9 h-9 shrink-0 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-slate-300 leading-relaxed text-sm">{project.description}</p>

          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.tech_stack.map((t) => (
                <span key={t} className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold glass text-slate-100 border border-blue-500/20">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            {project.live_url && (
              <a href={project.live_url} target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold text-sm hover:shadow-neon-blue transition-all">
                <ExternalLink className="w-4 h-4" /> Live Demo
              </a>
            )}
            {project.code_url && (
              <a href={project.code_url} target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl glass text-slate-100 font-semibold text-sm hover:shadow-glass-hover transition-all">
                <Github className="w-4 h-4" /> Source Code
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -6, boxShadow: '0 8px 40px rgba(59,130,246,0.2), 0 0 0 1px rgba(59,130,246,0.15)' }}
      onClick={onClick}
      className="group relative glass-card rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
    >
      <div className="relative h-52 overflow-hidden">
        <img src={project.images[0]} alt={project.title} loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-2 glass-strong rounded-xl px-5 py-2.5">
            <Eye className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-white">View Details</span>
          </div>
        </div>
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white text-xs font-semibold">
          {project.category}
        </span>
        {project.images.length > 1 && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs">
            +{project.images.length} imgs
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display font-semibold text-xl text-white">{project.title}</h3>
        <p className="text-sm text-slate-400 mt-1.5 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.tech_stack.slice(0, 4).map((t) => (
            <span key={t} className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20">
              {t}
            </span>
          ))}
          {project.tech_stack.length > 4 && (
            <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono text-slate-400">+{project.tech_stack.length - 4}</span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const { projects } = usePortfolio();
  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];
  const [active, setActive] = useState('All');
  const [selected, setSelected] = useState<Project | null>(null);
  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active);

  return (
    <Section id="projects" title="Featured Projects" subtitle="A selection of work spanning healthcare, AI e-commerce, and full-stack systems.">
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              active === cat
                ? 'bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-neon-blue scale-105'
                : 'glass text-slate-300 hover:scale-105'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} onClick={() => setSelected(p)} />
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </Section>
  );
}
