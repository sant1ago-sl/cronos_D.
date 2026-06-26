export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  institution?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorAvatar?: string;
  coverImage?: string;
  progress?: number;
  students?: number;
  startDate: string;
  endDate: string;
  modules: Module[];
  announcements?: Announcement[];
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  materials: Material[];
  assignments: Assignment[];
  quizzes: Quiz[];
}

export interface Material {
  id: string;
  moduleId: string;
  title: string;
  type: 'pdf' | 'video' | 'image' | 'link' | 'text';
  url?: string;
  content?: string;
  uploadDate: string;
}

export interface Assignment {
  id: string;
  moduleId: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  points: number;
  submitted?: boolean;
  grade?: number;
  feedback?: string;
  status: 'pending' | 'submitted' | 'graded' | 'late';
}

export interface Quiz {
  id: string;
  moduleId: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  duration: number;
  questions: Question[];
  attempts?: number;
  maxAttempts: number;
  grade?: number;
}

export interface Question {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  options?: string[];
  correctAnswer?: string | number;
  points: number;
}

export interface Announcement {
  id: string;
  courseId: string;
  title: string;
  content: string;
  author: string;
  date: string;
}

export interface Message {
  id: string;
  from: string;
  to: string;
  subject: string;
  content: string;
  date: string;
  read: boolean;
}

export interface AICharacter {
  id: string;
  name: string;
  era: string;
  avatar: string;
  description: string;
  personality: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  characterId?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  type: 'assignment' | 'quiz' | 'class' | 'event';
  date: string;
  course?: string;
  courseId?: string;
}

export interface Grade {
  courseId: string;
  courseName: string;
  assignments: {
    name: string;
    grade: number;
    maxGrade: number;
    weight: number;
  }[];
  quizzes: {
    name: string;
    grade: number;
    maxGrade: number;
    weight: number;
  }[];
  finalGrade?: number;
}

export interface Institution {
  id: string;
  name: string;
  plan: 'free' | 'premium' | 'family' | 'institutional';
  students: number;
  teachers: number;
  courses: number;
  createdAt: string;
}
