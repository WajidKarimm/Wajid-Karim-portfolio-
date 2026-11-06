export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'agents' | 'rag' | 'vision' | 'ml';
  categoryLabel: string;
  date: string;
  description: string;
  bulletPoints: string[];
  techStack: string[];
  githubUrl: string;
  demoUrl?: string;
  featured: boolean;
  architectureNotes?: string[];
  codeSnippet?: {
    filename: string;
    language: string;
    code: string;
  };
}

export interface Experience {
  role: string;
  company: string;
  type?: string;
  period: string;
  location: string;
  summary?: string;
  bulletPoints: string[];
  technologies: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period?: string;
  location?: string;
  details?: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  topics: string[];
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level?: 'Advanced' | 'Proficient' | 'Core';
    highlight?: boolean;
  }[];
}
