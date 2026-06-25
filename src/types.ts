export interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  images: string[];
  category: string;
  live_url?: string | null;
  code_url?: string | null;
  sort_order: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  sort_order: number;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  sort_order: number;
}

export type ProjectInput = Omit<Project, 'id'>;
export type ServiceInput = Omit<Service, 'id'>;
export type SkillInput = Omit<Skill, 'id'>;
