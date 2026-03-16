import { create } from 'zustand';

// Types
export interface Skill {
  name: string;
  proficiency: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  resumeUrl: string;
  skills: {
    frontend: Skill[];
    backend: Skill[];
    devops: Skill[];
    tools: Skill[];
  };
  languages: { language: string; level: string }[];
  education: {
    degree: string;
    institution: string;
    year: string;
    highlights: string[];
  }[];
  experience: {
    role: string;
    company: string;
    duration: string;
    highlights: string[];
  }[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  technologies: string[];
  links: {
    github?: string;
    demo?: string;
    documentation?: string;
  };
  image: string;
  tags: string[];
  featured: boolean;
  year: string;
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  date: string;
  issuer: string;
  type: string;
  url: string;
  icon: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: {
    city: string;
    state: string;
    country: string;
    timezone: string;
  };
  social: {
    github: string;
    linkedin: string;
    twitter: string;
    devto: string;
  };
  contactForm: {
    enabled: boolean;
    emailRecipient: string;
    fields: string[];
  };
}

interface PortfolioState {
  personal: PersonalInfo | null;
  projects: Project[];
  achievements: Achievement[];
  contact: ContactInfo | null;
  isLoading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
}

// Static data imports - included in bundle but state set asynchronously
import personalStatic from '../data/personal.json';
import projectsStatic from '../data/projects.json';
import achievementsStatic from '../data/achievements.json';
import contactStatic from '../data/contact.json';

export const usePortfolioStore = create<PortfolioState>((set) => ({
  personal: null,
  projects: [],
  achievements: [],
  contact: null,
  isLoading: true,
  error: null,
  fetchData: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate network delay to demonstrate loading state
      await new Promise(resolve => setTimeout(resolve, 300));
      set({
        personal: personalStatic,
        projects: projectsStatic,
        achievements: achievementsStatic,
        contact: contactStatic,
        isLoading: false
      });
    } catch (err) {
      set({
        error: (err as Error).message,
        isLoading: false
      });
    }
  }
}));
