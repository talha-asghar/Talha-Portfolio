import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, ImagePlus, X as XIcon, Loader2 } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useToast } from '../../context/ToastContext';
import type { Project, ProjectInput } from '../../types';
import Modal from '../../components/Modal';
import ConfirmDialog from '../../components/ConfirmDialog';

const EMPTY: ProjectInput = {
  title: '', description: '', tech_stack: [], images: [],
  category: 'Web', live_url: '', code_url: '', sort_order: 0,
};

const inputCls = 'w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

export default function ProjectsManager() {
  const { projects, addProject, updateProject, deleteProject } = usePortfolio();
  const { showToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<ProjectInput>(EMPTY);
  const [techInput, setTechInput] = useState('');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const openAdd = () => { setEditing(null); setForm(EMPTY); setTechInput(''); setImageUrlInput(''); setModalOpen(true); };
  const openEdit = (p: Project) => { setEditing(p); setForm({ ...p }); setTechInput(''); setImageUrlInput(''); setModalOpen(true); };

  const addTech = () => {
    const t = techInput.trim();
    if (t && !form.tech_stack.includes(t)) { setForm((f) => ({ ...f, tech_stack: [...f.tech_stack, t] })); setTechInput(''); }
  };
  const removeTech = (t: string) => setForm((f) => ({ ...f, tech_stack: f.tech_stack.filter((x) => x !== t) }));

  const addImageUrl = () => {
    const url = imageUrlInput.trim();
    if (url && form.images.length < 10 && !form.images.includes(url)) {
      setForm((f) => ({ ...f, images: [...f.images, url] })); setImageUrlInput('');
    }
  };
  const removeImage = (url: string) => setForm((f) => ({ ...f, images: f.images.filter((x) => x !== url) }));

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).slice(0, 10 - form.images.length);
    files.forEach((file) => {
      const localPath = `/assets/images/projects/${file.name}`;
      if (!form.images.includes(localPath)) setForm((f) => ({ ...f, images: [...f.images, localPath] }));
    });
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) { await updateProject(editing.id, form); showToast('Project updated successfully'); }
      else { await addProject(form); showToast('Project added successfully'); }
      setModalOpen(false);
    } catch {
      showToast('Failed to save project. Please try again.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteProject(deleteId);
      showToast('Project deleted', 'error');
      setDeleteId(null);
    } catch {
      showToast('Failed to delete project.', 'error');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-slate-400">{projects.length} projects</p>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 text-white text-sm font-medium hover:shadow-neon-blue transition-all">
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {projects.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="glass rounded-2xl overflow-hidden hover:shadow-neon-blue transition-shadow">
            <div className="h-32 overflow-hidden bg-white/5">
              {p.images?.[0] ? (
                <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300"><ImagePlus className="w-8 h-8" /></div>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="font-semibold text-white truncate">{p.title}</h3>
                  <span className="text-xs text-blue-500 font-medium">{p.category}</span>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => openEdit(p)} className="w-8 h-8 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-blue-400 transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setDeleteId(p.id)} className="w-8 h-8 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-rose-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-2 line-clamp-2">{p.description}</p>
              <div className="flex flex-wrap gap-1 mt-3">
                {p.tech_stack?.slice(0, 4).map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-300">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Project' : 'Add Project'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Title">
            <input required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className={inputCls} />
          </Field>
          <Field label="Description">
            <textarea required rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className={`${inputCls} resize-none`} />
          </Field>
          <Field label="Tech Stack (Enter to add)">
            <div className="flex gap-2">
              <input value={techInput} onChange={(e) => setTechInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTech(); } }} className={inputCls} placeholder="e.g. React" />
              <button type="button" onClick={addTech} className="px-3 rounded-xl glass text-sm font-medium text-slate-200">Add</button>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {form.tech_stack.map((t) => (
                <span key={t} className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono bg-blue-500/10 text-blue-300 border border-blue-500/20">
                  {t} <button type="button" onClick={() => removeTech(t)} className="hover:text-rose-500"><XIcon className="w-3 h-3" /></button>
                </span>
              ))}
            </div>
          </Field>

          <Field label={`Images (${form.images.length}/10)`}>
            <div className="space-y-2">
              <div className="flex gap-2">
                <input value={imageUrlInput} onChange={(e) => setImageUrlInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addImageUrl(); } }} className={inputCls} placeholder="https://..." />
                <button type="button" onClick={addImageUrl} className="px-3 rounded-xl glass text-sm font-medium text-slate-200 shrink-0">Add</button>
              </div>
              <div>
                <input ref={fileRef} type="file" multiple accept="image/*" onChange={handleFileUpload} className="hidden" id="proj-imgs" />
                <label htmlFor="proj-imgs" className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border-2 border-dashed border-slate-300 dark:border-white/20 text-slate-400 text-sm cursor-pointer hover:border-blue-400 hover:text-blue-400 transition-colors">
                  <ImagePlus className="w-4 h-4" /> Upload local images
                </label>
              </div>
              {form.images.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {form.images.map((url, i) => (
                    <div key={i} className="relative group rounded-lg overflow-hidden h-16 bg-white/5">
                      <img src={url} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                      <button type="button" onClick={() => removeImage(url)} className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                        <XIcon className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Category"><input value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className={inputCls} /></Field>
            <Field label="Sort Order"><input type="number" value={form.sort_order} onChange={(e) => setForm((f) => ({ ...f, sort_order: Number(e.target.value) }))} className={inputCls} /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Live URL"><input value={form.live_url ?? ''} onChange={(e) => setForm((f) => ({ ...f, live_url: e.target.value }))} className={inputCls} /></Field>
            <Field label="Code URL"><input value={form.code_url ?? ''} onChange={(e) => setForm((f) => ({ ...f, code_url: e.target.value }))} className={inputCls} /></Field>
          </div>
          <button type="submit" disabled={saving} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 text-white font-medium hover:shadow-neon-blue transition-all disabled:opacity-60">
            {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : editing ? 'Save Changes' : 'Add Project'}
          </button>
        </form>
      </Modal>

      <ConfirmDialog open={!!deleteId} title="Delete Project?" message="This action cannot be undone. The project will be permanently removed." onConfirm={confirmDelete} onCancel={() => setDeleteId(null)} />
    </div>
  );
}
