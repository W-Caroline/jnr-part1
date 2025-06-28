import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: 'parent' | 'child' | 'admin';
          avatar: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          role?: 'parent' | 'child' | 'admin';
          avatar?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          role?: 'parent' | 'child' | 'admin';
          avatar?: string | null;
          updated_at?: string;
        };
      };
      stories: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          content: string;
          category: 'bedtime' | 'educational' | 'adventure' | 'moral';
          age_group: '3-5' | '6-8' | '9-12';
          cover_image: string | null;
          audio_url: string | null;
          life_lesson: string | null;
          reading_time: number;
          is_favorite: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          content: string;
          category: 'bedtime' | 'educational' | 'adventure' | 'moral';
          age_group: '3-5' | '6-8' | '9-12';
          cover_image?: string | null;
          audio_url?: string | null;
          life_lesson?: string | null;
          reading_time?: number;
          is_favorite?: boolean;
          created_at?: string;
        };
        Update: {
          title?: string;
          content?: string;
          category?: 'bedtime' | 'educational' | 'adventure' | 'moral';
          age_group?: '3-5' | '6-8' | '9-12';
          cover_image?: string | null;
          audio_url?: string | null;
          life_lesson?: string | null;
          reading_time?: number;
          is_favorite?: boolean;
        };
      };
      activities: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          type: 'coloring' | 'puzzle' | 'drawing' | 'math' | 'letters' | 'words' | 'dictation' | 'paint-by-numbers';
          difficulty: 'easy' | 'medium' | 'hard';
          age_group: string;
          content: any;
          instructions: string;
          image_url: string | null;
          completion_count: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          type: 'coloring' | 'puzzle' | 'drawing' | 'math' | 'letters' | 'words' | 'dictation' | 'paint-by-numbers';
          difficulty: 'easy' | 'medium' | 'hard';
          age_group: string;
          content?: any;
          instructions: string;
          image_url?: string | null;
          completion_count?: number;
          created_at?: string;
        };
        Update: {
          title?: string;
          type?: 'coloring' | 'puzzle' | 'drawing' | 'math' | 'letters' | 'words' | 'dictation' | 'paint-by-numbers';
          difficulty?: 'easy' | 'medium' | 'hard';
          age_group?: string;
          content?: any;
          instructions?: string;
          image_url?: string | null;
          completion_count?: number;
        };
      };
      voice_profiles: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          audio_sample: string;
          elevenlabs_voice_id: string | null;
          is_processed: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          audio_sample: string;
          elevenlabs_voice_id?: string | null;
          is_processed?: boolean;
          created_at?: string;
        };
        Update: {
          name?: string;
          audio_sample?: string;
          elevenlabs_voice_id?: string | null;
          is_processed?: boolean;
        };
      };
      donations: {
        Row: {
          id: string;
          donor_name: string;
          donor_email: string;
          item_type: 'book' | 'educational-material' | 'monetary';
          description: string;
          quantity: number | null;
          amount: number | null;
          status: 'pending' | 'approved' | 'distributed';
          recipient_info: string | null;
          created_at: string;
          distributed_at: string | null;
        };
        Insert: {
          id?: string;
          donor_name: string;
          donor_email: string;
          item_type: 'book' | 'educational-material' | 'monetary';
          description: string;
          quantity?: number | null;
          amount?: number | null;
          status?: 'pending' | 'approved' | 'distributed';
          recipient_info?: string | null;
          created_at?: string;
          distributed_at?: string | null;
        };
        Update: {
          donor_name?: string;
          donor_email?: string;
          item_type?: 'book' | 'educational-material' | 'monetary';
          description?: string;
          quantity?: number | null;
          amount?: number | null;
          status?: 'pending' | 'approved' | 'distributed';
          recipient_info?: string | null;
          distributed_at?: string | null;
        };
      };
    };
  };
};