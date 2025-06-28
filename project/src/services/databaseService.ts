import { supabase } from '../lib/supabase';
import { Story, Activity, VoiceProfile, Donation, User } from '../types';

export class DatabaseService {
  // User Management
  static async createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .insert({
        email: userData.email,
        name: userData.name,
        role: userData.role,
        avatar: userData.avatar,
      })
      .select()
      .single();

    if (error) throw error;
    
    return {
      id: data.id,
      email: data.email,
      name: data.name,
      role: data.role,
      avatar: data.avatar,
      createdAt: new Date(data.created_at),
    };
  }

  static async getUser(userId: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) return null;
    
    return {
      id: data.id,
      email: data.email,
      name: data.name,
      role: data.role,
      avatar: data.avatar,
      createdAt: new Date(data.created_at),
    };
  }

  // Story Management
  static async saveStory(story: Omit<Story, 'id' | 'createdAt'>, userId: string): Promise<Story> {
    const { data, error } = await supabase
      .from('stories')
      .insert({
        user_id: userId,
        title: story.title,
        content: story.content,
        category: story.category,
        age_group: story.ageGroup,
        cover_image: story.coverImage,
        audio_url: story.audioUrl,
        life_lesson: story.lifeLesson,
        reading_time: story.readingTime,
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      title: data.title,
      content: data.content,
      category: data.category,
      ageGroup: data.age_group,
      coverImage: data.cover_image,
      audioUrl: data.audio_url,
      lifeLesson: data.life_lesson,
      readingTime: data.reading_time,
      createdAt: new Date(data.created_at),
    };
  }

  static async getUserStories(userId: string): Promise<Story[]> {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(story => ({
      id: story.id,
      title: story.title,
      content: story.content,
      category: story.category,
      ageGroup: story.age_group,
      coverImage: story.cover_image,
      audioUrl: story.audio_url,
      lifeLesson: story.life_lesson,
      readingTime: story.reading_time,
      createdAt: new Date(story.created_at),
    }));
  }

  // Activity Management
  static async saveActivity(activity: Omit<Activity, 'id' | 'createdAt'>, userId: string): Promise<Activity> {
    const { data, error } = await supabase
      .from('activities')
      .insert({
        user_id: userId,
        title: activity.title,
        type: activity.type,
        difficulty: activity.difficulty,
        age_group: activity.ageGroup,
        content: activity.content,
        instructions: activity.instructions,
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      title: data.title,
      type: data.type,
      difficulty: data.difficulty,
      ageGroup: data.age_group,
      content: data.content,
      instructions: data.instructions,
      createdAt: new Date(data.created_at),
    };
  }

  static async getUserActivities(userId: string): Promise<Activity[]> {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(activity => ({
      id: activity.id,
      title: activity.title,
      type: activity.type,
      difficulty: activity.difficulty,
      ageGroup: activity.age_group,
      content: activity.content,
      instructions: activity.instructions,
      createdAt: new Date(activity.created_at),
    }));
  }

  // Voice Profile Management
  static async saveVoiceProfile(profile: Omit<VoiceProfile, 'id' | 'createdAt'>, userId: string): Promise<VoiceProfile> {
    const { data, error } = await supabase
      .from('voice_profiles')
      .insert({
        user_id: userId,
        name: profile.name,
        audio_sample: profile.audioSample,
        elevenlabs_voice_id: profile.userId, // Using userId field for elevenlabs_voice_id
        is_processed: profile.isProcessed,
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      userId: data.user_id,
      name: data.name,
      audioSample: data.audio_sample,
      isProcessed: data.is_processed,
      createdAt: new Date(data.created_at),
    };
  }

  static async getUserVoiceProfiles(userId: string): Promise<VoiceProfile[]> {
    const { data, error } = await supabase
      .from('voice_profiles')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(profile => ({
      id: profile.id,
      userId: profile.user_id,
      name: profile.name,
      audioSample: profile.audio_sample,
      isProcessed: profile.is_processed,
      createdAt: new Date(profile.created_at),
    }));
  }

  // Donation Management
  static async createDonation(donation: Omit<Donation, 'id' | 'createdAt'>): Promise<Donation> {
    const { data, error } = await supabase
      .from('donations')
      .insert({
        donor_name: donation.donorName,
        donor_email: donation.donorEmail,
        item_type: donation.itemType,
        description: donation.description,
        quantity: donation.quantity,
        amount: donation.amount,
        status: donation.status,
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      donorName: data.donor_name,
      donorEmail: data.donor_email,
      itemType: data.item_type,
      description: data.description,
      quantity: data.quantity,
      amount: data.amount,
      status: data.status,
      createdAt: new Date(data.created_at),
    };
  }

  static async getDonations(): Promise<Donation[]> {
    const { data, error } = await supabase
      .from('donations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(donation => ({
      id: donation.id,
      donorName: donation.donor_name,
      donorEmail: donation.donor_email,
      itemType: donation.item_type,
      description: donation.description,
      quantity: donation.quantity,
      amount: donation.amount,
      status: donation.status,
      createdAt: new Date(donation.created_at),
    }));
  }
}