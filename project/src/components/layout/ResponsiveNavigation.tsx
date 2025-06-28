import React, { useState } from 'react';
import { Menu, X, Sparkles, Heart, BookOpen, Palette, Gamepad2, User } from 'lucide-react';
import { Button } from '../ui/Button';

interface ResponsiveNavigationProps {
  onNavigate: (section: string) => void;
  activeSection: string;
}

export function ResponsiveNavigation({ onNavigate, activeSection }: ResponsiveNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { id: 'stories', label: 'Enchanted Tales', icon: Sparkles },
    { id: 'library', label: 'Story Library', icon: BookOpen },
    { id: 'activities', label: 'Creative Workshops', icon: Palette },
    { id: 'games', label: 'Learning Games', icon: Gamepad2 },
    { id: 'donate', label: 'Share Magic', icon: Heart },
  ];

  const handleNavigate = (section: string) => {
    onNavigate(section);
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center space-x-8">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all ${
                activeSection === item.id
                  ? 'text-purple-600 bg-purple-50'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Mobile Navigation Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg z-50">
          <div className="px-4 py-2 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg font-medium transition-all text-left ${
                    activeSection === item.id
                      ? 'text-purple-600 bg-purple-50'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            
            <div className="border-t border-gray-100 pt-2 mt-2">
              <Button variant="outline" size="sm" className="w-full mb-2">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
              <Button size="sm" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Begin Journey
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}