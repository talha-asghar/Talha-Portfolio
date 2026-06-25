import { motion } from 'framer-motion';
import {
  BrainCircuit, Code2, Smartphone, Workflow, Sparkles, Cloud, Database,
  Cpu, Bot, Layers, Zap, Globe, type LucideIcon,
} from 'lucide-react';
import Section from '../Section';
import { usePortfolio } from '../../context/PortfolioContext';

const ICONS: Record<string, LucideIcon> = {
  BrainCircuit, Code2, Smartphone, Workflow, Sparkles, Cloud, Database,
  Cpu, Bot, Layers, Zap, Globe,
};

export const ICON_NAMES = Object.keys(ICONS);

export function resolveIcon(name: string): LucideIcon {
  return ICONS[name] ?? Sparkles;
}

export default function Services() {
  const { services } = usePortfolio();

  return (
    <Section id="services" title="What I Do" subtitle="Specialized services blending full-stack engineering with AI-driven development." alt>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((s, i) => {
          const Icon = resolveIcon(s.icon);
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -8, boxShadow: '0 12px 40px rgba(59,130,246,0.15)' }}
              className="group relative bg-white rounded-2xl p-6 border border-slate-100 shadow-sm overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-blue-100 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-md">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display font-semibold text-lg text-slate-900 mb-2">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{s.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
