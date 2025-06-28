import React, { useState } from 'react';
import { Palette, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import { useContentStore } from '../../stores/contentStore';
import { ActivityGenerationRequest, Activity } from '../../types';

export function ActivityGenerator() {
  const [request, setRequest] = useState<ActivityGenerationRequest>({
    type: 'coloring',
    ageGroup: '3-5',
    difficulty: 'easy',
    theme: '',
  });

  const { generateActivity, isGenerating, error } = useContentStore();

  const handleGenerate = async () => {
    try {
      await generateActivity(request);
      // Reset theme
      setRequest({ ...request, theme: '' });
    } catch (error) {
      console.error('Failed to generate activity:', error);
    }
  };

  const activityTypes: { value: Activity['type']; label: string }[] = [
    { value: 'coloring', label: 'Color Magic' },
    { value: 'drawing', label: 'Art Studio' },
    { value: 'math', label: 'Number Adventure' },
    { value: 'letters', label: 'Letter Discovery' },
    { value: 'words', label: 'Word Wizard' },
    { value: 'puzzle', label: 'Brain Quest' },
    { value: 'paint-by-numbers', label: 'Paint Quest' },
    { value: 'dictation', label: 'Voice Magic' },
  ];

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
            <Palette className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Create Learning Adventure</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Activity Type
            </label>
            <select
              value={request.type}
              onChange={(e) => setRequest({ ...request, type: e.target.value as Activity['type'] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {activityTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Theme (Optional)
            </label>
            <input
              type="text"
              value={request.theme}
              onChange={(e) => setRequest({ ...request, theme: e.target.value })}
              placeholder="e.g., animals, space, underwater, fairy tale"
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
                Difficulty
              </label>
              <select
                value={request.difficulty}
                onChange={(e) => setRequest({ ...request, difficulty: e.target.value as Activity['difficulty'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
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
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating Adventure...
              </>
            ) : (
              <>
                <Palette className="h-4 w-4 mr-2" />
                Create Learning Adventure
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}