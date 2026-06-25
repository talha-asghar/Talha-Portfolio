import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import type { Project, Service, Skill, ProjectInput, ServiceInput, SkillInput } from '../types';

interface PortfolioContextValue {
  projects: Project[];
  services: Service[];
  skills: Skill[];
  loading: boolean;
  addProject: (input: ProjectInput) => Promise<void>;
  updateProject: (id: string, input: Partial<ProjectInput>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  addService: (input: ServiceInput) => Promise<void>;
  updateService: (id: string, input: Partial<ServiceInput>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  addSkill: (input: SkillInput) => Promise<void>;
  updateSkill: (id: string, input: Partial<SkillInput>) => Promise<void>;
  deleteSkill: (id: string) => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextValue | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  // Initial load
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [p, s, sk] = await Promise.all([
        supabase.from('projects').select('*').order('sort_order'),
        supabase.from('services').select('*').order('sort_order'),
        supabase.from('skills').select('*').order('sort_order'),
      ]);
      if (cancelled) return;
      if (p.data) setProjects(p.data as Project[]);
      if (s.data) setServices(s.data as Service[]);
      if (sk.data) setSkills(sk.data as Skill[]);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  // Realtime subscriptions — UI updates instantly when DB changes
  useEffect(() => {
    const ch = supabase.channel('portfolio-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' },
        () => { supabase.from('projects').select('*').order('sort_order').then(({ data }) => data && setProjects(data as Project[])); })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'services' },
        () => { supabase.from('services').select('*').order('sort_order').then(({ data }) => data && setServices(data as Service[])); })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'skills' },
        () => { supabase.from('skills').select('*').order('sort_order').then(({ data }) => data && setSkills(data as Skill[])); })
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, []);

  // Projects
  const addProject = useCallback(async (input: ProjectInput) => {
    const { data, error } = await supabase.from('projects').insert(input).select().single();
    if (error) throw error;
    if (data) setProjects((prev) => [...prev, data as Project].sort((a, b) => a.sort_order - b.sort_order));
  }, []);

  const updateProject = useCallback(async (id: string, input: Partial<ProjectInput>) => {
    const { data, error } = await supabase.from('projects').update(input).eq('id', id).select().single();
    if (error) throw error;
    if (data) setProjects((prev) => prev.map((p) => (p.id === id ? data as Project : p)).sort((a, b) => a.sort_order - b.sort_order));
  }, []);

  const deleteProject = useCallback(async (id: string) => {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) throw error;
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  // Services
  const addService = useCallback(async (input: ServiceInput) => {
    const { data, error } = await supabase.from('services').insert(input).select().single();
    if (error) throw error;
    if (data) setServices((prev) => [...prev, data as Service].sort((a, b) => a.sort_order - b.sort_order));
  }, []);

  const updateService = useCallback(async (id: string, input: Partial<ServiceInput>) => {
    const { data, error } = await supabase.from('services').update(input).eq('id', id).select().single();
    if (error) throw error;
    if (data) setServices((prev) => prev.map((s) => (s.id === id ? data as Service : s)).sort((a, b) => a.sort_order - b.sort_order));
  }, []);

  const deleteService = useCallback(async (id: string) => {
    const { error } = await supabase.from('services').delete().eq('id', id);
    if (error) throw error;
    setServices((prev) => prev.filter((s) => s.id !== id));
  }, []);

  // Skills
  const addSkill = useCallback(async (input: SkillInput) => {
    const { data, error } = await supabase.from('skills').insert(input).select().single();
    if (error) throw error;
    if (data) setSkills((prev) => [...prev, data as Skill].sort((a, b) => a.sort_order - b.sort_order));
  }, []);

  const updateSkill = useCallback(async (id: string, input: Partial<SkillInput>) => {
    const { data, error } = await supabase.from('skills').update(input).eq('id', id).select().single();
    if (error) throw error;
    if (data) setSkills((prev) => prev.map((s) => (s.id === id ? data as Skill : s)).sort((a, b) => a.sort_order - b.sort_order));
  }, []);

  const deleteSkill = useCallback(async (id: string) => {
    const { error } = await supabase.from('skills').delete().eq('id', id);
    if (error) throw error;
    setSkills((prev) => prev.filter((s) => s.id !== id));
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        projects, services, skills, loading,
        addProject, updateProject, deleteProject,
        addService, updateService, deleteService,
        addSkill, updateSkill, deleteSkill,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider');
  return ctx;
}
