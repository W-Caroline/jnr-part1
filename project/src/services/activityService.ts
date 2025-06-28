import { Activity, ActivityGenerationRequest } from '../types';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

export class ActivityService {
  private static async generateWithOpenAI(request: ActivityGenerationRequest): Promise<Activity> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are an expert in creating engaging educational activities for children. Create fun, interactive activities that promote learning and creativity.`
          },
          {
            role: 'user',
            content: `Create a ${request.type} activity for children aged ${request.ageGroup} with ${request.difficulty} difficulty${request.theme ? ` themed around "${request.theme}"` : ''}. 

            Return JSON with:
            - title: Engaging activity title
            - instructions: Clear, child-friendly instructions
            - content: Activity-specific content (questions for math, words for letters, etc.)
            
            Make it fun and educational!`
          }
        ],
        temperature: 0.8,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate activity');
    }

    const data = await response.json();
    const activityData = JSON.parse(data.choices[0].message.content);

    return {
      id: crypto.randomUUID(),
      title: activityData.title,
      type: request.type,
      difficulty: request.difficulty,
      ageGroup: request.ageGroup,
      content: activityData.content,
      instructions: activityData.instructions,
      createdAt: new Date(),
    };
  }

  private static async generateWithAnthropic(request: ActivityGenerationRequest): Promise<Activity> {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: `Create a ${request.type} activity for children aged ${request.ageGroup}, ${request.difficulty} difficulty${request.theme ? `, themed: "${request.theme}"` : ''}. 

            Return JSON: title, instructions, content (activity-specific data).`
          }
        ],
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate activity');
    }

    const data = await response.json();
    const activityData = JSON.parse(data.content[0].text);

    return {
      id: crypto.randomUUID(),
      title: activityData.title,
      type: request.type,
      difficulty: request.difficulty,
      ageGroup: request.ageGroup,
      content: activityData.content,
      instructions: activityData.instructions,
      createdAt: new Date(),
    };
  }

  static async generateActivity(request: ActivityGenerationRequest): Promise<Activity> {
    try {
      if (OPENAI_API_KEY) {
        return await this.generateWithOpenAI(request);
      } else if (ANTHROPIC_API_KEY) {
        return await this.generateWithAnthropic(request);
      } else {
        throw new Error('No API keys configured');
      }
    } catch (error) {
      console.error('Activity generation failed:', error);
      
      // Fallback to mock data
      return {
        id: crypto.randomUUID(),
        title: `${request.type.charAt(0).toUpperCase() + request.type.slice(1)} Adventure`,
        type: request.type,
        difficulty: request.difficulty,
        ageGroup: request.ageGroup,
        content: this.getMockContent(request.type),
        instructions: `Let's have fun with this ${request.type} activity! Follow the steps and enjoy learning.`,
        createdAt: new Date(),
      };
    }
  }

  private static getMockContent(type: Activity['type']): any {
    const mockContent = {
      'coloring': { 
        imageUrl: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
        colors: ['red', 'blue', 'yellow', 'green', 'purple', 'orange']
      },
      'math': {
        problems: [
          { question: '2 + 3 = ?', answer: 5 },
          { question: '5 - 2 = ?', answer: 3 },
          { question: '4 + 1 = ?', answer: 5 }
        ]
      },
      'letters': {
        letters: ['A', 'B', 'C', 'D', 'E'],
        words: ['Apple', 'Ball', 'Cat', 'Dog', 'Elephant']
      },
      'puzzle': {
        pieces: 12,
        imageUrl: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      'drawing': {
        prompt: 'Draw your favorite animal',
        tools: ['pencil', 'crayon', 'marker']
      },
      'words': {
        vocabulary: ['happy', 'sunny', 'friend', 'play', 'learn']
      },
      'dictation': {
        sentences: ['The cat is happy.', 'I love to play.', 'Books are fun.']
      },
      'paint-by-numbers': {
        imageUrl: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
        colorMap: { '1': 'red', '2': 'blue', '3': 'yellow' }
      }
    };

    return mockContent[type] || {};
  }

  static async generateActivityImage(type: Activity['type'], theme?: string): Promise<string> {
    const STABILITY_API_KEY = import.meta.env.VITE_STABILITY_API_KEY;
    
    if (!STABILITY_API_KEY) {
      return `https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400`;
    }

    try {
      const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${STABILITY_API_KEY}`,
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: `Children's ${type} activity illustration${theme ? ` with ${theme} theme` : ''}, colorful, educational, fun, child-friendly`,
              weight: 1
            }
          ],
          cfg_scale: 7,
          height: 512,
          width: 512,
          steps: 20,
          samples: 1,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate activity image');
      }

      const data = await response.json();
      return `data:image/png;base64,${data.artifacts[0].base64}`;
    } catch (error) {
      console.error('Activity image generation failed:', error);
      return `https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400`;
    }
  }
}