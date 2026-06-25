import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Section from '../Section';
import { usePortfolio } from '../../context/PortfolioContext';

const CATEGORY_META: Record<string, { grad: string; bar: string }> = {
  Languages:          { grad: 'from-blue-500 to-cyan-400',    bar: 'bg-gradient-to-r from-blue-500 to-cyan-400' },
  'Frontend/Backend': { grad: 'from-violet-500 to-blue-500', bar: 'bg-gradient-to-r from-violet-500 to-blue-500' },
  'AI & Cloud':       { grad: 'from-emerald-500 to-teal-400', bar: 'bg-gradient-to-r from-emerald-500 to-teal-400' },
};

function CircleProgress({ value }: { value: number }) {
  const r = 22;
  const circ = 2 * Math.PI * r;
  return (
    <div className="relative w-14 h-14 shrink-0">
      <svg className="w-14 h-14 -rotate-90" viewBox="0 0 52 52">
        <circle cx="26" cy="26" r={r} fill="none" strokeWidth="4.5" className="stroke-white/10" />
        <motion.circle
          cx="26" cy="26" r={r} fill="none" strokeWidth="4.5"
          strokeLinecap="round"
          stroke="url(#skill-grad)"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          whileInView={{ strokeDashoffset: circ - (value / 100) * circ }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        <defs>
          <linearGradient id="skill-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-200">{value}%</span>
    </div>
  );
}

function SkillCard({ name, proficiency, meta }: { name: string; proficiency: number; meta: { grad: string; bar: string } }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6, boxShadow: '0 8px 40px rgba(59,130,246,0.2), 0 0 0 1px rgba(59,130,246,0.15)' }}
      transition={{ duration: 0.3 }}
      className="relative glass-card rounded-2xl p-5 flex items-center gap-4 cursor-default overflow-hidden group"
    >
      <div className={`absolute -top-6 -left-6 w-20 h-20 rounded-full bg-gradient-to-br ${meta.grad} opacity-10 group-hover:opacity-20 blur-xl transition-opacity`} />
      <CircleProgress value={proficiency} />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-white truncate">{name}</p>
        <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${meta.bar}`}
            initial={{ width: 0 }}
            whileInView={{ width: `${proficiency}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: 'easeOut', delay: 0.1 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

const CARDS_PER_PAGE = 6;

export default function Skills() {
  const { skills } = usePortfolio();
  const categories = Array.from(new Set(skills.map((s) => s.category)));
  const [activeTab, setActiveTab] = useState(categories[0] ?? '');
  const [page, setPage] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const filtered = skills.filter((s) => s.category === activeTab);
  const totalPages = Math.ceil(filtered.length / CARDS_PER_PAGE);
  const visible = filtered.slice(page * CARDS_PER_PAGE, (page + 1) * CARDS_PER_PAGE);
  const meta = CATEGORY_META[activeTab] ?? CATEGORY_META['Languages'];

  const handleTab = (cat: string) => { setActiveTab(cat); setPage(0); };

  return (
    <Section id="skills" title="Skills & Expertise" subtitle="Technologies I work with across languages, frameworks, and AI/cloud platforms.">
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => {
          const m = CATEGORY_META[cat] ?? CATEGORY_META['Languages'];
          return (
            <button
              key={cat}
              onClick={() => handleTab(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === cat
                  ? `bg-gradient-to-r ${m.grad} text-white shadow-neon-blue scale-105`
                  : 'glass text-slate-300 hover:scale-105'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div ref={sliderRef}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + page}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {visible.map((s) => (
              <SkillCard key={s.id} name={s.name} proficiency={s.proficiency} meta={meta} />
            ))}
          </motion.div>
        </AnimatePresence>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-8">
            <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}
              className="w-10 h-10 rounded-xl glass flex items-center justify-center text-slate-300 disabled:opacity-30 hover:text-blue-400 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button key={i} onClick={() => setPage(i)}
                  className={`rounded-full transition-all ${i === page ? 'w-6 h-2.5 bg-blue-500' : 'w-2.5 h-2.5 bg-white/20 hover:bg-blue-400'}`} />
              ))}
            </div>
            <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1}
              className="w-10 h-10 rounded-xl glass flex items-center justify-center text-slate-300 disabled:opacity-30 hover:text-blue-400 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </Section>
  );
}
