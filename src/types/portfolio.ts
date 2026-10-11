export interface PersonalInfo {
  name: string;
  degree: string;
  college: string;
  graduationPeriod: string;
  location: string;
  email: string;
  phone: string;
  linkedIn: string;
  title: string;
  shortIntro: string;
  aboutStory: string;
  profilePhoto?: string;
  languages: { name: string; proficiency: string }[];
  interestHighlights: string[];
}

export interface EducationItem {
  id: string;
  level: string;
  institution: string;
  period: string;
  score: string;
  description: string;
  status: 'Pursuing' | 'Completed';
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Programming' | 'Web Technologies' | 'Data & AI' | 'Core';
  proficiencyLabel: string;
  description: string;
  keyConcepts: string[];
}

export interface InternshipItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  technologiesUsed: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  isFeatured: boolean;
  technologies: string[];
  features: string[];
  liveDemoUrl?: string;
  githubUrl?: string;
  status: string;
  fullArchitecture?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issuePeriod: string;
  description: string;
  skills: string[];
  credentialId?: string;
}

export interface StrengthItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  education: EducationItem[];
  skills: SkillItem[];
  internship: InternshipItem;
  projects: ProjectItem[];
  certifications: CertificationItem[];
  strengths: StrengthItem[];
  accentColor: 'emerald' | 'cyan' | 'sapphire' | 'teal';
  theme: 'dark' | 'light';
  hasCustomResume?: boolean;
  resumeFileName?: string;
}

export interface CropState {
  zoom: number;
  panX: number;
  panY: number;
  rotation: number;
}
