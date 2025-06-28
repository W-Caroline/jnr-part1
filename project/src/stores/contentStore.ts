import { create } from 'zustand';
import { Story, Activity, StoryGenerationRequest, ActivityGenerationRequest } from '../types';
import { StoryService } from '../services/storyService';
import { ActivityService } from '../services/activityService';
import { DatabaseService } from '../services/databaseService';

interface ContentState {
  stories: Story[];
  activities: Activity[];
  isGenerating: boolean;
  error: string | null;
  
  generateStory: (request: StoryGenerationRequest) => Promise<Story>;
  generateActivity: (request: ActivityGenerationRequest) => Promise<Activity>;
  loadUserContent: (userId: string) => Promise<void>;
  addStory: (story: Story) => void;
  addActivity: (activity: Activity) => void;
  clearError: () => void;
}

export const useContentStore = create<ContentState>((set, get) => ({
  stories: [],
  activities: [],
  isGenerating: false,
  error: null,

  generateStory: async (request: StoryGenerationRequest) => {
    set({ isGenerating: true, error: null });
    
    try {
      const story = await StoryService.generateStory(request);
      
      // Generate cover image if possible
      try {
        const coverImage = await StoryService.generateCoverImage(story.title, request.theme);
        story.coverImage = coverImage;
      } catch (error) {
        console.warn('Cover image generation failed, using fallback');
      }
      
      // Save to database if user is authenticated
      try {
        const currentUser = 'current-user-id'; // This would come from auth store
        await DatabaseService.saveStory(story, currentUser);
      } catch (error) {
        console.warn('Failed to save story to database:', error);
      }
      
      set(state => ({
        stories: [story, ...state.stories],
        isGenerating: false,
      }));
      
      return story;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to generate story',
        isGenerating: false 
      });
      throw error;
    }
  },

  generateActivity: async (request: ActivityGenerationRequest) => {
    set({ isGenerating: true, error: null });
    
    try {
      const activity = await ActivityService.generateActivity(request);
      
      // Generate activity image if it's a visual activity
      if (['coloring', 'drawing', 'paint-by-numbers'].includes(activity.type)) {
        try {
          const activityImage = await ActivityService.generateActivityImage(activity.type, request.theme);
          activity.content.imageUrl = activityImage;
        } catch (error) {
          console.warn('Activity image generation failed, using fallback');
        }
      }
      
      // Save to database if user is authenticated
      try {
        const currentUser = 'current-user-id'; // This would come from auth store
        await DatabaseService.saveActivity(activity, currentUser);
      } catch (error) {
        console.warn('Failed to save activity to database:', error);
      }
      
      set(state => ({
        activities: [activity, ...state.activities],
        isGenerating: false,
      }));
      
      return activity;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to generate activity',
        isGenerating: false 
      });
      throw error;
    }
  },

  loadUserContent: async (userId: string) => {
    try {
      const [stories, activities] = await Promise.all([
        DatabaseService.getUserStories(userId),
        DatabaseService.getUserActivities(userId),
      ]);
      
      set({ stories, activities });
    } catch (error) {
      console.error('Failed to load user content:', error);
      set({ error: 'Failed to load your content' });
    }
  },

  addStory: (story: Story) => {
    set(state => ({
      stories: [story, ...state.stories]
    }));
  },

  addActivity: (activity: Activity) => {
    set(state => ({
      activities: [activity, ...state.activities]
    }));
  },

  clearError: () => {
    set({ error: null });
  },
}));