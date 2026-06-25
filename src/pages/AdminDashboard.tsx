import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, FolderKanban, Wrench, Cpu, LogOut, Home, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ProjectsManager from './admin/ProjectsManager';
import ServicesManager from './admin/ServicesManager';
import SkillsManager from './admin/SkillsManager';

type Tab = 'overview' | 'projects' | 'services' | 'skills';

const NAV: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'services', label: 'Services', icon: Wrench },
  { id: 'skills',   label: 'Skills',   icon: Cpu },
];

export default function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="min-h-screen text-white flex">
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 glass-strong  z-40 flex flex-col transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-6 flex items-center gap-2 font-display font-bold text-lg text-white border-b border-white/10">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-sm">TA</span>
          Admin Panel
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map((item) => (
            <button key={item.id} onClick={() => { setTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                tab === item.id
                  ? 'bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-neon-blue'
                  : 'text-slate-300 hover:bg-white/5'
              }`}>
              <item.icon className="w-4 h-4" /> {item.label}
            </button>
          ))}
        </nav>
        <div className="p-3 space-y-1">
          <Link to="/" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/5 transition-colors">
            <Home className="w-4 h-4" /> View Site
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-colors">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-20 glass-strong border-b border-white/10 px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen((o) => !o)} className="lg:hidden w-10 h-10 rounded-xl glass flex items-center justify-center">
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="font-display font-semibold text-lg capitalize text-white">{tab}</h1>
          </div>
        </header>

        <main className="flex-1 p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.22 }}
            >
              {tab === 'overview' && <Overview onNavigate={setTab} />}
              {tab === 'projects' && <ProjectsManager />}
              {tab === 'services' && <ServicesManager />}
              {tab === 'skills'   && <SkillsManager />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function Overview({ onNavigate }: { onNavigate: (t: Tab) => void }) {
  const cards: { tab: Tab; label: string; icon: typeof LayoutDashboard; desc: string }[] = [
    { tab: 'projects', label: 'Manage Projects', icon: FolderKanban, desc: 'Add, edit, and remove portfolio projects' },
    { tab: 'services', label: 'Manage Services', icon: Wrench,       desc: 'Curate the services you offer' },
    { tab: 'skills',   label: 'Manage Skills',   icon: Cpu,          desc: 'Update proficiency and categories' },
  ];
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {cards.map((c) => (
        <button key={c.tab} onClick={() => onNavigate(c.tab)}
          className="group glass-card rounded-2xl p-6 text-left hover:shadow-glass-hover transition-shadow hover:-translate-y-1 transition-transform">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
            <c.icon className="w-6 h-6" />
          </div>
          <h3 className="font-display font-semibold text-lg text-white mb-1">{c.label}</h3>
          <p className="text-sm text-slate-400">{c.desc}</p>
        </button>
      ))}
    </div>
  );
}
