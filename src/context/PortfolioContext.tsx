import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Project, Service, Skill, ProjectInput, ServiceInput, SkillInput } from '../types';
import projectsData from '../data/projects.json';
import servicesData from '../data/services.json';
import skillsData from '../data/skills.json';

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

function base64DecodeUnicode(base64: string) {
  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [services, setServices] = useState<Service[]>(servicesData);
  const [skills, setSkills] = useState<Skill[]>(skillsData);
  const [loading, setLoading] = useState(false);

  // Fetch projects from GitHub every 2 seconds to sync with admin panel changes
  useEffect(() => {
    const token = import.meta.env.VITE_GITHUB_TOKEN as string;
    if (!token) return;

    const fetchFromGithub = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/talha-asghar/Talha-Portfolio/contents/src/data/projects.json', {
          method: 'GET',
          headers: {
            Authorization: `token ${token}`,
            Accept: 'application/vnd.github+json',
          },
        });
        if (response.ok) {
          const data = await response.json() as { content: string };
          const content = data.content?.replace(/\n/g, '');
          if (content) {
            const projectsArray = JSON.parse(base64DecodeUnicode(content)) as Project[];
            setProjects(projectsArray.sort((a, b) => a.sort_order - b.sort_order));
          }
        }
      } catch (err) {
        // Silently fail - keep using local data
        console.debug('Failed to fetch from GitHub, using local data');
      }
    };

    const interval = setInterval(fetchFromGithub, 2000);
    return () => clearInterval(interval);
  }, []);

  // Projects
  const addProject = useCallback(async (input: ProjectInput) => {
    const newProject: Project = {
      id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      ...input,
    };
    setProjects((prev) => [...prev, newProject].sort((a, b) => a.sort_order - b.sort_order));
  }, []);

  const updateProject = useCallback(async (id: string, input: Partial<ProjectInput>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...input } : p)).sort((a, b) => a.sort_order - b.sort_order));
  }, []);

  const deleteProject = useCallback(async (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  // Services
  const addService = useCallback(async (input: ServiceInput) => {
    const newService: Service = {
      id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      ...input,
    };
    setServices((prev) => [...prev, newService].sort((a, b) => a.sort_order - b.sort_order));
  }, []);

  const updateService = useCallback(async (id: string, input: Partial<ServiceInput>) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...input } : s)).sort((a, b) => a.sort_order - b.sort_order));
  }, []);

  const deleteService = useCallback(async (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  }, []);

  // Skills
  const addSkill = useCallback(async (input: SkillInput) => {
    const newSkill: Skill = {
      id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      ...input,
    };
    setSkills((prev) => [...prev, newSkill].sort((a, b) => a.sort_order - b.sort_order));
  }, []);

  const updateSkill = useCallback(async (id: string, input: Partial<SkillInput>) => {
    setSkills((prev) => prev.map((s) => (s.id === id ? { ...s, ...input } : s)).sort((a, b) => a.sort_order - b.sort_order));
  }, []);

  const deleteSkill = useCallback(async (id: string) => {
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
