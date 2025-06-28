export interface User {
  id: string;
  email: string;
  name: string;
  role: 'parent' | 'child' | 'admin';
  avatar?: string;
  createdAt: Date;
}

export interface Story {
  id: string;
  title: string;
  content: string;
  category: 'bedtime' | 'educational' | 'adventure' | 'moral';
  ageGroup: '3-5' | '6-8' | '9-12';
  coverImage?: string;
  audioUrl?: string;
  lifeLesson?: string;
  readingTime: number;
  createdAt: Date;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  ageGroup: string;
  coverImage?: string;
  pdfUrl?: string;
  isPublicDomain: boolean;
  createdAt: Date;
}

export interface Activity {
  id: string;
  title: string;
  type: 'coloring' | 'puzzle' | 'drawing' | 'math' | 'letters' | 'words' | 'dictation' | 'paint-by-numbers';
  difficulty: 'easy' | 'medium' | 'hard';
  ageGroup: string;
  content: any;
  instructions: string;
  createdAt: Date;
}

export interface VoiceProfile {
  id: string;
  userId: string;
  name: string;
  audioSample: string;
  isProcessed: boolean;
  createdAt: Date;
}

export interface Donation {
  id: string;
  donorName: string;
  donorEmail: string;
  itemType: 'book' | 'educational-material' | 'monetary';
  description: string;
  quantity?: number;
  amount?: number;
  status: 'pending' | 'approved' | 'distributed';
  createdAt: Date;
}

export interface StoryGenerationRequest {
  theme: string;
  ageGroup: string;
  lifeLesson: string;
  length: 'short' | 'medium' | 'long';
}

export interface ActivityGenerationRequest {
  type: Activity['type'];
  ageGroup: string;
  difficulty: Activity['difficulty'];
  theme?: string;
}