export type ActiveTab = 'landing' | 'dashboard' | 'candidates' | 'utility';

export interface ScoreBreakdown {
  skillMatch: number;
  experienceMatch: number;
  projectMatch: number;
  educationMatch: number;
  certificationMatch: number;
  softSkillsMatch: number;
  overallScore: number;
}

export interface Candidate {
  id: string;
  rank: number;
  name: string;
  email?: string;
  phone?: string;
  role: string;
  targetRole?: string;
  company: string;
  location: string;
  matchScore: number;
  skills: string[];
  missingSkills?: string[];
  experience: string;
  education?: string;
  status: 'Screened' | 'Shortlisted' | 'New' | 'Rejected';
  avatar: string;
  topMatch?: boolean;
  aiVerified?: boolean;
  ocrProcessed?: boolean;
  ocrMethod?: string;
  extractedText?: string;
  aiSummary?: string;
  hiringConfidence?: 'High' | 'Medium' | 'Low';
  overallMatchNumber?: number;
  scores?: ScoreBreakdown;
  recommendation?: string;
  timeline?: {
    period: string;
    role: string;
    company: string;
  }[];
  strengths?: string[];
  growthAreas?: string[];
}

export interface JobDescription {
  id: string;
  title: string;
  company: string;
  requiredSkills: string[];
  preferredSkills: string[];
  experienceRequired: string;
  educationRequired: string;
  responsibilities: string[];
  keywords: string[];
  rawText: string;
}

