import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useToast } from '../../context/ToastContext';
import type { Service, ServiceInput } from '../../types';
import { resolveIcon, ICON_NAMES } from '../../components/sections/Services';
import Modal from '../../components/Modal';
import ConfirmDialog from '../../components/ConfirmDialog';

const EMPTY: ServiceInput = { title: '', description: '', icon: 'Sparkles', sort_order: 0 };
const inputCls = 'w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm';

export default function ServicesManager() {
  const { services, addService, updateService, deleteService } = usePortfolio();
  const { showToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState<ServiceInput>(EMPTY);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const openAdd = () => { setEditing(null); setForm(EMPTY); setModalOpen(true); };
  const openEdit = (s: Service) => { setEditing(s); setForm({ ...s }); setModalOpen(true); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) { await updateService(editing.id, form); showToast('Service updated'); }
      else { await addService(form); showToast('Service added'); }
      setModalOpen(false);
    } catch {
      showToast('Failed to save service.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteService(deleteId);
      showToast('Service deleted', 'error');
      setDeleteId(null);
    } catch {
      showToast('Failed to delete service.', 'error');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-slate-400">{services.length} services</p>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 text-white text-sm font-medium hover:shadow-neon-blue transition-all">
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s, i) => {
          const Icon = resolveIcon(s.icon);
          return (
            <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-5 hover:shadow-neon-blue transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 flex items-center justify-center text-blue-400">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(s)} className="w-8 h-8 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-blue-400 transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setDeleteId(s.id)} className="w-8 h-8 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-rose-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <h3 className="font-semibold text-white">{s.title}</h3>
              <p className="text-xs text-slate-400 mt-1.5 line-clamp-3">{s.description}</p>
            </motion.div>
          );
        })}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Service' : 'Add Service'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Title</label>
            <input required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Description</label>
            <textarea required rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className={`${inputCls} resize-none`} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Icon</label>
            <div className="grid grid-cols-6 gap-2">
              {ICON_NAMES.map((name) => {
                const Icon = resolveIcon(name);
                return (
                  <button key={name} type="button" onClick={() => setForm((f) => ({ ...f, icon: name }))}
                    className={`aspect-square rounded-xl flex items-center justify-center transition-all ${
                      form.icon === name ? 'bg-gradient-to-br from-blue-500 to-violet-500 text-white scale-105' : 'glass text-slate-300 hover:scale-105'
                    }`} title={name}>
                    <Icon className="w-5 h-5" />
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Sort Order</label>
            <input type="number" value={form.sort_order} onChange={(e) => setForm((f) => ({ ...f, sort_order: Number(e.target.value) }))} className={inputCls} />
          </div>
          <button type="submit" disabled={saving} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 text-white font-medium hover:shadow-neon-blue transition-all disabled:opacity-60">
            {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : editing ? 'Save Changes' : 'Add Service'}
          </button>
        </form>
      </Modal>

      <ConfirmDialog open={!!deleteId} title="Delete Service?" message="This service will be permanently removed." onConfirm={confirmDelete} onCancel={() => setDeleteId(null)} />
    </div>
  );
}
