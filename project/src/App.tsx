import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Hero } from './components/layout/Hero';
import { StoryCard } from './components/features/StoryCard';
import { ActivityCard } from './components/features/ActivityCard';
import { StoryGenerator } from './components/features/StoryGenerator';
import { ActivityGenerator } from './components/features/ActivityGenerator';
import { ManualActivityCreator } from './components/features/ManualActivityCreator';
import { DigitalLibrary } from './components/features/DigitalLibrary';
import { GameCenter } from './components/features/GameCenter';
import { DonationCenter } from './components/features/DonationCenter';
import { ResponsiveNavigation } from './components/layout/ResponsiveNavigation';
import { Story, Activity } from './types';

// Sample magical content
const sampleStories: Story[] = [
  {
    id: '1',
    title: 'The Brave Little Firefly',
    content: 'In a magical forest where dreams come true...',
    category: 'bedtime',
    ageGroup: '3-5',
    lifeLesson: 'Even the smallest light can brighten the darkest night',
    readingTime: 5,
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'The Secret of the Rainbow Bridge',
    content: 'High above the clouds, where colors dance...',
    category: 'moral',
    ageGroup: '6-8',
    lifeLesson: 'Kindness creates bridges between hearts',
    readingTime: 7,
    createdAt: new Date(),
  },
  {
    id: '3',
    title: 'Quest for the Crystal of Wisdom',
    content: 'In an enchanted kingdom filled with wonder...',
    category: 'adventure',
    ageGroup: '9-12',
    lifeLesson: 'True wisdom comes from helping others',
    readingTime: 12,
    createdAt: new Date(),
  },
];

const sampleActivities: Activity[] = [
  {
    id: '1',
    title: 'Enchanted Garden Coloring',
    type: 'coloring',
    difficulty: 'easy',
    ageGroup: '3-5',
    content: {},
    instructions: 'Bring this magical garden to life with your favorite colors!',
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Treasure Hunt Math Quest',
    type: 'math',
    difficulty: 'medium',
    ageGroup: '6-8',
    content: {},
    instructions: 'Solve magical number puzzles to find the hidden treasure!',
    createdAt: new Date(),
  },
  {
    id: '3',
    title: 'Alphabet Adventure',
    type: 'letters',
    difficulty: 'easy',
    ageGroup: '3-5',
    content: {},
    instructions: 'Join the letter friends on their magical journey!',
    createdAt: new Date(),
  },
];

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'stories':
        return (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  ✨ Create Your Magical Tale
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Generate personalized stories with valuable life lessons
                </p>
              </div>
              
              <div className="mb-16">
                <StoryGenerator />
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Recent Stories</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {sampleStories.map((story) => (
                  <StoryCard 
                    key={story.id} 
                    story={story} 
                    onClick={() => console.log('Story clicked:', story.title)}
                  />
                ))}
              </div>
            </div>
          </section>
        );

      case 'library':
        return <DigitalLibrary />;

      case 'activities':
        return (
          <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  🎨 Creative Workshops & Learning Adventures
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Create engaging activities that make learning magical
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                <ActivityGenerator />
                <ManualActivityCreator />
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Recent Activities</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {sampleActivities.map((activity) => (
                  <ActivityCard 
                    key={activity.id} 
                    activity={activity} 
                    onClick={() => console.log('Activity clicked:', activity.title)}
                  />
                ))}
              </div>
            </div>
          </section>
        );

      case 'games':
        return <GameCenter />;

      case 'donate':
        return <DonationCenter />;

      default:
        return (
          <>
            <Hero />
            
            {/* Stories Section */}
            <section className="py-12 lg:py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8 lg:mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    ✨ Enchanted Tales & Wisdom Stories
                  </h2>
                  <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
                    Discover personalized stories that entertain, educate, and inspire young minds
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {sampleStories.map((story) => (
                    <StoryCard 
                      key={story.id} 
                      story={story} 
                      onClick={() => console.log('Story clicked:', story.title)}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Activities Section */}
            <section className="py-12 lg:py-16 bg-gradient-to-br from-purple-50 to-pink-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8 lg:mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    🎨 Creative Workshops & Learning Adventures
                  </h2>
                  <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
                    Engaging activities that make learning magical through art, puzzles, and games
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {sampleActivities.map((activity) => (
                    <ActivityCard 
                      key={activity.id} 
                      activity={activity} 
                      onClick={() => console.log('Activity clicked:', activity.title)}
                    />
                  ))}
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header>
        <ResponsiveNavigation 
          onNavigate={setActiveSection} 
          activeSection={activeSection} 
        />
      </Header>
      
      <main>
        {renderSection()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-lg">
                <span className="text-2xl">✨</span>
              </div>
            </div>
            <h3 className="text-xl lg:text-2xl font-bold mb-4">J&R Magical Moments</h3>
            <p className="text-gray-400 mb-6 lg:mb-8 max-w-2xl mx-auto">
              Creating magical learning experiences that inspire young hearts and minds
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm">
              <a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;