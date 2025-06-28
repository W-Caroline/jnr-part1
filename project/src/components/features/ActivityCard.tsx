import React from 'react';
import { Palette, Puzzle, Calculator, Type, Mic, Paintbrush } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Activity } from '../../types';

interface ActivityCardProps {
  activity: Activity;
  onClick?: () => void;
}

export function ActivityCard({ activity, onClick }: ActivityCardProps) {
  const getActivityIcon = (type: Activity['type']) => {
    const icons = {
      'coloring': Palette,
      'puzzle': Puzzle,
      'drawing': Paintbrush,
      'math': Calculator,
      'letters': Type,
      'words': Type,
      'dictation': Mic,
      'paint-by-numbers': Paintbrush,
    };
    return icons[type] || Palette;
  };

  const getDifficultyColor = (difficulty: Activity['difficulty']) => {
    const colors = {
      easy: 'bg-green-100 text-green-700',
      medium: 'bg-yellow-100 text-yellow-700',
      hard: 'bg-red-100 text-red-700',
    };
    return colors[difficulty];
  };

  const getActivityLabel = (type: Activity['type']) => {
    const labels = {
      'coloring': 'Color Magic',
      'puzzle': 'Brain Quest',
      'drawing': 'Art Studio',
      'math': 'Number Adventure',
      'letters': 'Letter Discovery',
      'words': 'Word Wizard',
      'dictation': 'Voice Magic',
      'paint-by-numbers': 'Paint Quest',
    };
    return labels[type] || 'Creative Fun';
  };

  const Icon = getActivityIcon(activity.type);

  return (
    <Card hover onClick={onClick}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-lg shadow-lg">
            <Icon className="h-6 w-6 text-white" />
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(activity.difficulty)}`}>
            {activity.difficulty}
          </span>
        </div>

        <h3 className="font-semibold text-gray-900 mb-2">{activity.title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{activity.instructions}</p>

        <div className="flex items-center justify-between text-sm">
          <span className="text-purple-600 font-medium">{getActivityLabel(activity.type)}</span>
          <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
            Ages {activity.ageGroup}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}