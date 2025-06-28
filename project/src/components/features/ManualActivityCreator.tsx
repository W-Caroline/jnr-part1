import React, { useState } from 'react';
import { Plus, Save, Loader2, Palette, Calculator, Type, Puzzle, Paintbrush, Mic } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import { Activity } from '../../types';
import { useContentStore } from '../../stores/contentStore';

export function ManualActivityCreator() {
  const [isOpen, setIsOpen] = useState(false);
  const [activity, setActivity] = useState<Partial<Activity>>({
    title: '',
    type: 'coloring',
    difficulty: 'easy',
    ageGroup: '3-5',
    instructions: '',
    content: {},
  });
  const [isCreating, setIsCreating] = useState(false);
  
  const { addActivity } = useContentStore();

  const activityTypes = [
    { value: 'coloring', label: 'Color Magic', icon: Palette },
    { value: 'drawing', label: 'Art Studio', icon: Paintbrush },
    { value: 'math', label: 'Number Adventure', icon: Calculator },
    { value: 'letters', label: 'Letter Discovery', icon: Type },
    { value: 'words', label: 'Word Wizard', icon: Type },
    { value: 'puzzle', label: 'Brain Quest', icon: Puzzle },
    { value: 'paint-by-numbers', label: 'Paint Quest', icon: Paintbrush },
    { value: 'dictation', label: 'Voice Magic', icon: Mic },
  ];

  const handleCreate = async () => {
    if (!activity.title || !activity.instructions) return;
    
    setIsCreating(true);
    
    try {
      const newActivity: Activity = {
        id: crypto.randomUUID(),
        title: activity.title!,
        type: activity.type!,
        difficulty: activity.difficulty!,
        ageGroup: activity.ageGroup!,
        content: getDefaultContent(activity.type!),
        instructions: activity.instructions!,
        createdAt: new Date(),
      };
      
      addActivity(newActivity);
      
      // Reset form
      setActivity({
        title: '',
        type: 'coloring',
        difficulty: 'easy',
        ageGroup: '3-5',
        instructions: '',
        content: {},
      });
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to create activity:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const getDefaultContent = (type: Activity['type']) => {
    const defaultContent = {
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

    return defaultContent[type] || {};
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
      >
        <Plus className="h-4 w-4 mr-2" />
        Create Custom Activity
      </Button>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg">
              <Plus className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Create Custom Activity</h2>
          </div>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Activity Title
            </label>
            <input
              type="text"
              value={activity.title}
              onChange={(e) => setActivity({ ...activity, title: e.target.value })}
              placeholder="e.g., Rainbow Coloring Adventure"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Activity Type
            </label>
            <select
              value={activity.type}
              onChange={(e) => setActivity({ ...activity, type: e.target.value as Activity['type'] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
              Instructions
            </label>
            <textarea
              value={activity.instructions}
              onChange={(e) => setActivity({ ...activity, instructions: e.target.value })}
              placeholder="Provide clear, fun instructions for children..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age Group
              </label>
              <select
                value={activity.ageGroup}
                onChange={(e) => setActivity({ ...activity, ageGroup: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                value={activity.difficulty}
                onChange={(e) => setActivity({ ...activity, difficulty: e.target.value as Activity['difficulty'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          <Button
            onClick={handleCreate}
            disabled={!activity.title || !activity.instructions || isCreating}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          >
            {isCreating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating Activity...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Create Activity
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}