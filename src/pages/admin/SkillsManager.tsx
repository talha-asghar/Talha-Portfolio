import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useToast } from '../../context/ToastContext';
import type { Skill, SkillInput } from '../../types';
import Modal from '../../components/Modal';
import ConfirmDialog from '../../components/ConfirmDialog';

const CATEGORIES = ['Languages', 'Frontend/Backend', 'AI & Cloud'];
const EMPTY: SkillInput = { name: '', category: 'Languages', proficiency: 80, sort_order: 0 };
const inputCls = 'w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm';

export default function SkillsManager() {
  const { skills, addSkill, updateSkill, deleteSkill } = usePortfolio();
  const { showToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [form, setForm] = useState<SkillInput>(EMPTY);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const openAdd = () => { setEditing(null); setForm(EMPTY); setModalOpen(true); };
  const openEdit = (s: Skill) => { setEditing(s); setForm({ ...s }); setModalOpen(true); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) { await updateSkill(editing.id, form); showToast('Skill updated'); }
      else { await addSkill(form); showToast('Skill added'); }
      setModalOpen(false);
    } catch {
      showToast('Failed to save skill.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteSkill(deleteId);
      showToast('Skill deleted', 'error');
      setDeleteId(null);
    } catch {
      showToast('Failed to delete skill.', 'error');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-slate-400">{skills.length} skills</p>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 text-white text-sm font-medium hover:shadow-neon-blue transition-all">
          <Plus className="w-4 h-4" /> Add Skill
        </button>
      </div>

      {CATEGORIES.map((cat) => {
        const catSkills = skills.filter((s) => s.category === cat);
        if (!catSkills.length) return null;
        return (
          <div key={cat} className="mb-8">
            <h3 className="font-display font-semibold text-white mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" /> {cat}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {catSkills.map((s, i) => (
                <motion.div key={s.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  className="glass rounded-xl p-4 hover:shadow-neon-blue transition-shadow">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="font-medium text-white text-sm">{s.name}</span>
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(s)} className="w-7 h-7 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-blue-400 transition-colors"><Pencil className="w-3 h-3" /></button>
                      <button onClick={() => setDeleteId(s.id)} className="w-7 h-7 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-rose-400 transition-colors"><Trash2 className="w-3 h-3" /></button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500" style={{ width: `${s.proficiency}%` }} />
                    </div>
                    <span className="text-xs font-mono text-slate-400 w-9 text-right">{s.proficiency}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Skill' : 'Add Skill'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Skill Name</label>
            <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Category</label>
            <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className={inputCls}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Proficiency: <span className="text-blue-400">{form.proficiency}%</span>
            </label>
            <input type="range" min={0} max={100} value={form.proficiency} onChange={(e) => setForm((f) => ({ ...f, proficiency: Number(e.target.value) }))} className="w-full accent-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Sort Order</label>
            <input type="number" value={form.sort_order} onChange={(e) => setForm((f) => ({ ...f, sort_order: Number(e.target.value) }))} className={inputCls} />
          </div>
          <button type="submit" disabled={saving} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 text-white font-medium hover:shadow-neon-blue transition-all disabled:opacity-60">
            {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : editing ? 'Save Changes' : 'Add Skill'}
          </button>
        </form>
      </Modal>

      <ConfirmDialog open={!!deleteId} title="Delete Skill?" message="This skill will be permanently removed." onConfirm={confirmDelete} onCancel={() => setDeleteId(null)} />
    </div>
  );
}
