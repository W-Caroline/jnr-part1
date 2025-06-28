import { VoiceProfile } from '../types';

const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY;

export class VoiceService {
  static async createVoiceProfile(name: string, audioFile: File): Promise<VoiceProfile> {
    if (!ELEVENLABS_API_KEY) {
      throw new Error('ElevenLabs API key not configured');
    }

    try {
      // First, create the voice clone
      const formData = new FormData();
      formData.append('name', name);
      formData.append('files', audioFile);
      formData.append('description', `Voice profile for ${name}`);

      const response = await fetch('https://api.elevenlabs.io/v1/voices/add', {
        method: 'POST',
        headers: {
          'xi-api-key': ELEVENLABS_API_KEY,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to create voice profile');
      }

      const data = await response.json();

      return {
        id: data.voice_id,
        userId: 'current-user', // This would come from auth
        name,
        audioSample: URL.createObjectURL(audioFile),
        isProcessed: true,
        createdAt: new Date(),
      };
    } catch (error) {
      console.error('Voice profile creation failed:', error);
      
      // Fallback to mock profile
      return {
        id: crypto.randomUUID(),
        userId: 'current-user',
        name,
        audioSample: URL.createObjectURL(audioFile),
        isProcessed: false,
        createdAt: new Date(),
      };
    }
  }

  static async generateSpeech(text: string, voiceId: string): Promise<string> {
    if (!ELEVENLABS_API_KEY) {
      throw new Error('ElevenLabs API key not configured');
    }

    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate speech');
      }

      const audioBlob = await response.blob();
      return URL.createObjectURL(audioBlob);
    } catch (error) {
      console.error('Speech generation failed:', error);
      throw error;
    }
  }

  static async getAvailableVoices(): Promise<any[]> {
    if (!ELEVENLABS_API_KEY) {
      return [];
    }

    try {
      const response = await fetch('https://api.elevenlabs.io/v1/voices', {
        headers: {
          'xi-api-key': ELEVENLABS_API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch voices');
      }

      const data = await response.json();
      return data.voices;
    } catch (error) {
      console.error('Failed to fetch voices:', error);
      return [];
    }
  }
}