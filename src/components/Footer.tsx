import { Github, Linkedin, Mail, Heart, ArrowUp, Phone, MapPin, Sparkles, Code2, BrainCircuit } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const SERVICES = ['AI & RAG Integration', 'Full-Stack Web Development', 'Mobile App Development', 'Advanced AI Automation'];

const SOCIAL = [
  { href: 'https://github.com/talha-54-ism', icon: Github, label: 'GitHub' },
  { href: 'https://linkedin.com/in/talha-asghar', icon: Linkedin, label: 'LinkedIn' },
  { href: 'mailto:ta449011@gmail.com', icon: Mail, label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="relative px-6 pt-20 pb-8 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        {/* Top section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand + bio */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 font-display font-bold text-xl text-white mb-4">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-sm shadow-neon-blue">TA</span>
              Talha<span className="text-gradient">.dev</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              Full-Stack & AI Developer specializing in scalable web, mobile, and AI-driven solutions. Always open to new opportunities and collaborations.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL.map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" aria-label={label}
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-slate-300 hover:text-blue-400 hover:scale-110 hover:shadow-neon-blue transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Navigation
            </h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                    <span className="w-0 h-0.5 bg-blue-400 group-hover:w-3 transition-all" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" /> Services
            </h4>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s} className="text-sm text-slate-400 flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-violet-400 mt-0.5 shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Get in Touch
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:ta449011@gmail.com" className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg glass flex items-center justify-center shrink-0">
                    <Mail className="w-3.5 h-3.5 text-blue-400" />
                  </span>
                  ta449011@gmail.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/9203089460061" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg glass flex items-center justify-center shrink-0">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  </span>
                  03089460061
                </a>
              </li>
              <li className="text-sm text-slate-400 flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg glass flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                </span>
                Pakistan — Remote
              </li>
            </ul>
          </div>
        </div>

        {/* Tech badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10 pb-10 border-b border-white/10">
          {[
            { icon: Code2, label: 'React.js' },
            { icon: Code2, label: 'Next.js' },
            { icon: BrainCircuit, label: 'Agentic AI' },
            { icon: BrainCircuit, label: 'RAG Systems' },
            { icon: Code2, label: 'React Native' },
            { icon: Code2, label: 'Node.js' },
            { icon: BrainCircuit, label: 'MCP Servers' },
          ].map(({ icon: Icon, label }) => (
            <span key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass text-xs font-mono font-semibold text-slate-300">
              <Icon className="w-3.5 h-3.5 text-blue-400" />
              {label}
            </span>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400 flex items-center gap-1.5">
            Built with <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> by Talha Asghar
          </p>
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Talha Asghar. All rights reserved.
          </p>
          <a href="#hero" className="group flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm font-medium text-slate-300 hover:text-blue-400 hover:shadow-neon-blue transition-all">
            Back to Top
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </footer>
  );
}
