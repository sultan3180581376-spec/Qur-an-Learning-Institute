export enum CourseType {
  QAIDA = 'QAIDA',
  TAJWEED = 'TAJWEED',
  HIFZ = 'HIFZ',
  NAMAZ = 'NAMAZ',
  ARABIC = 'ARABIC'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin' | 'teacher';
  status: 'active' | 'inactive';
  plan: 'TRIAL' | 'BASIC' | 'STANDARD' | 'PREMIUM';
  trialEndsAt: number; // Timestamp
  hasPaid: boolean;
  progress: {
    courseId: string;
    completedLessons: number;
    totalLessons: number;
  }[];
}

export interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  audioUrl?: string;
  type?: 'text' | 'correction' | 'exercise';
  correctionData?: {
    mistake: string;
    explanation: string;
    score: number;
  };
}

export interface Course {
  id: string;
  title: string;
  description: string;
  type: CourseType;
  image: string;
  lessonsCount: number;
  rating: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  recommended?: boolean;
}

export interface Teacher {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  languages: string[];
}

export interface Language {
  code: string;
  name: string;
  greeting: string;
  voiceName?: string;
}