import { create } from 'zustand';
import { Donation } from '../types';
import { DatabaseService } from '../services/databaseService';

interface DonationState {
  donations: Donation[];
  isLoading: boolean;
  error: string | null;
  
  createDonation: (donation: Omit<Donation, 'id' | 'createdAt'>) => Promise<Donation>;
  loadDonations: () => Promise<void>;
  clearError: () => void;
}

export const useDonationStore = create<DonationState>((set, get) => ({
  donations: [],
  isLoading: false,
  error: null,

  createDonation: async (donationData: Omit<Donation, 'id' | 'createdAt'>) => {
    set({ isLoading: true, error: null });
    
    try {
      const donation = await DatabaseService.createDonation(donationData);
      
      set(state => ({
        donations: [donation, ...state.donations],
        isLoading: false,
      }));
      
      return donation;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create donation';
      set({ 
        error: errorMessage,
        isLoading: false 
      });
      throw error;
    }
  },

  loadDonations: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const donations = await DatabaseService.getDonations();
      set({ donations, isLoading: false });
    } catch (error) {
      set({ 
        error: 'Failed to load donations',
        isLoading: false 
      });
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));