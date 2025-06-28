import { Story, StoryGenerationRequest } from '../types';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

export class StoryService {
  private static async generateWithOpenAI(request: StoryGenerationRequest): Promise<Story> {
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
            content: `You are a master storyteller who creates enchanting children's stories. Create engaging, age-appropriate stories with valuable life lessons. The stories should be imaginative, fun, and educational.`
          },
          {
            role: 'user',
            content: `Create a ${request.length} story for children aged ${request.ageGroup} with the theme "${request.theme}" that teaches the life lesson: "${request.lifeLesson}". 

            Return a JSON object with:
            - title: An engaging title
            - content: The complete story (${request.length === 'short' ? '200-400' : request.length === 'medium' ? '400-800' : '800-1200'} words)
            - category: One of "bedtime", "educational", "adventure", "moral"
            - readingTime: Estimated reading time in minutes`
          }
        ],
        temperature: 0.8,
        max_tokens: request.length === 'short' ? 800 : request.length === 'medium' ? 1200 : 2000,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate story');
    }

    const data = await response.json();
    const storyData = JSON.parse(data.choices[0].message.content);

    return {
      id: crypto.randomUUID(),
      title: storyData.title,
      content: storyData.content,
      category: storyData.category,
      ageGroup: request.ageGroup as Story['ageGroup'],
      lifeLesson: request.lifeLesson,
      readingTime: storyData.readingTime,
      createdAt: new Date(),
    };
  }

  private static async generateWithAnthropic(request: StoryGenerationRequest): Promise<Story> {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: request.length === 'short' ? 800 : request.length === 'medium' ? 1200 : 2000,
        messages: [
          {
            role: 'user',
            content: `Create a ${request.length} children's story for ages ${request.ageGroup} with theme "${request.theme}" teaching "${request.lifeLesson}". 

            Return JSON with: title, content, category (bedtime/educational/adventure/moral), readingTime (minutes).
            
            Story length: ${request.length === 'short' ? '200-400' : request.length === 'medium' ? '400-800' : '800-1200'} words.`
          }
        ],
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate story');
    }

    const data = await response.json();
    const storyData = JSON.parse(data.content[0].text);

    return {
      id: crypto.randomUUID(),
      title: storyData.title,
      content: storyData.content,
      category: storyData.category,
      ageGroup: request.ageGroup as Story['ageGroup'],
      lifeLesson: request.lifeLesson,
      readingTime: storyData.readingTime,
      createdAt: new Date(),
    };
  }

  static async generateStory(request: StoryGenerationRequest): Promise<Story> {
    try {
      // Try OpenAI first, fallback to Anthropic
      if (OPENAI_API_KEY) {
        return await this.generateWithOpenAI(request);
      } else if (ANTHROPIC_API_KEY) {
        return await this.generateWithAnthropic(request);
      } else {
        throw new Error('No API keys configured');
      }
    } catch (error) {
      console.error('Story generation failed:', error);
      
      // Fallback to mock data if API fails
      return {
        id: crypto.randomUUID(),
        title: `The Magical Adventure of ${request.theme}`,
        content: `Once upon a time, in a land filled with wonder and magic, there lived a brave little character who would learn about ${request.lifeLesson}. This enchanting tale unfolds with excitement and valuable lessons that will inspire young hearts and minds.`,
        category: 'adventure',
        ageGroup: request.ageGroup as Story['ageGroup'],
        lifeLesson: request.lifeLesson,
        readingTime: 5,
        createdAt: new Date(),
      };
    }
  }

  static async generateCoverImage(title: string, theme: string): Promise<string> {
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
              text: `Children's book cover illustration for "${title}", ${theme}, colorful, whimsical, magical, child-friendly art style`,
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
        throw new Error('Failed to generate cover image');
      }

      const data = await response.json();
      return `data:image/png;base64,${data.artifacts[0].base64}`;
    } catch (error) {
      console.error('Cover image generation failed:', error);
      return `https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400`;
    }
  }
}