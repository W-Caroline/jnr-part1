import React from 'react';
import { Clock, Star, Sparkles } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Story } from '../../types';

interface StoryCardProps {
  story: Story;
  onClick?: () => void;
}

export function StoryCard({ story, onClick }: StoryCardProps) {
  const categoryColors = {
    bedtime: 'bg-purple-100 text-purple-700',
    educational: 'bg-blue-100 text-blue-700',
    adventure: 'bg-green-100 text-green-700',
    moral: 'bg-orange-100 text-orange-700',
  };

  const categoryLabels = {
    bedtime: 'Bedtime Tales',
    educational: 'Learning Adventures',
    adventure: 'Epic Quests',
    moral: 'Wisdom Stories',
  };

  return (
    <Card hover onClick={onClick}>
      <div className="relative">
        <div className="h-48 bg-gradient-to-br from-purple-100 to-pink-100 rounded-t-xl flex items-center justify-center">
          {story.coverImage ? (
            <img 
              src={story.coverImage} 
              alt={story.title}
              className="w-full h-full object-cover rounded-t-xl"
            />
          ) : (
            <div className="text-center">
              <div className="bg-white p-4 rounded-full mb-2 shadow-lg">
                <Sparkles className="h-8 w-8 text-purple-600" />
              </div>
              <p className="text-sm text-gray-600 font-medium">Magical Tale</p>
            </div>
          )}
        </div>
        
        <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
          ✨ New
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[story.category]}`}>
            {categoryLabels[story.category]}
          </span>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            Ages {story.ageGroup}
          </span>
        </div>

        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{story.title}</h3>
        
        {story.lifeLesson && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            <strong>Life Lesson:</strong> {story.lifeLesson}
          </p>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{story.readingTime} min read</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>4.8</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}