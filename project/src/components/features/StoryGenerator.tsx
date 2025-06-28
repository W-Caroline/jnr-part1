import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import { useContentStore } from '../../stores/contentStore';
import { StoryGenerationRequest } from '../../types';

export function StoryGenerator() {
  const [request, setRequest] = useState<StoryGenerationRequest>({
    theme: '',
    ageGroup: '3-5',
    lifeLesson: '',
    length: 'medium',
  });

  const { generateStory, isGenerating, error } = useContentStore();

  const handleGenerate = async () => {
    if (!request.theme || !request.lifeLesson) return;
    
    try {
      await generateStory(request);
      // Reset form
      setRequest({
        theme: '',
        ageGroup: '3-5',
        lifeLesson: '',
        length: 'medium',
      });
    } catch (error) {
      console.error('Failed to generate story:', error);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Create Your Magical Tale</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Story Theme
            </label>
            <input
              type="text"
              value={request.theme}
              onChange={(e) => setRequest({ ...request, theme: e.target.value })}
              placeholder="e.g., brave little mouse, magical forest, friendship"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Life Lesson
            </label>
            <input
              type="text"
              value={request.lifeLesson}
              onChange={(e) => setRequest({ ...request, lifeLesson: e.target.value })}
              placeholder="e.g., kindness matters, never give up, sharing is caring"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age Group
              </label>
              <select
                value={request.ageGroup}
                onChange={(e) => setRequest({ ...request, ageGroup: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="3-5">3-5 years</option>
                <option value="6-8">6-8 years</option>
                <option value="9-12">9-12 years</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Story Length
              </label>
              <select
                value={request.length}
                onChange={(e) => setRequest({ ...request, length: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="short">Short (2-3 min)</option>
                <option value="medium">Medium (5-7 min)</option>
                <option value="long">Long (10-15 min)</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <Button
            onClick={handleGenerate}
            disabled={!request.theme || !request.lifeLesson || isGenerating}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating Magic...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Create Magical Story
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}