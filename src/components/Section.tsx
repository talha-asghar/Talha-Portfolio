import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  alt?: boolean;
}

export default function Section({ id, title, subtitle, children, alt }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative py-24 px-6 scroll-mt-20 ${
        alt ? 'bg-white' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className={`inline-block text-xs font-mono tracking-[0.3em] uppercase mb-3 ${
            alt ? 'text-blue-600' : 'text-blue-400'
          }`}>
            {id}
          </span>
          <h2 className={`font-display text-4xl md:text-5xl font-bold ${
            alt ? 'text-slate-900' : 'text-white'
          }`}>
            {title}
          </h2>
          {subtitle && (
            <p className={`mt-4 max-w-2xl mx-auto ${
              alt ? 'text-slate-500' : 'text-slate-400'
            }`}>{subtitle}</p>
          )}
          <div className="mt-6 h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
        </motion.div>
        {children}
      </div>
    </section>
  );
}
