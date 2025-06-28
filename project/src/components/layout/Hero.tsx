import React from 'react';
import { Sparkles, BookOpen, Palette, Puzzle } from 'lucide-react';
import { Button } from '../ui/Button';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 lg:py-20 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-16 lg:w-20 h-16 lg:h-20 bg-yellow-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-32 right-20 w-12 lg:w-16 h-12 lg:h-16 bg-pink-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-8 lg:w-12 h-8 lg:h-12 bg-purple-200 rounded-full opacity-20 animate-bounce delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-6 lg:w-8 h-6 lg:h-8 bg-blue-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 lg:p-4 rounded-2xl shadow-lg animate-pulse">
              <Sparkles className="h-8 lg:h-12 w-8 lg:w-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 lg:mb-6">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Magical Moments
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-gray-600 mb-6 lg:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            Discover enchanting stories with life lessons, creative workshops, and a world of learning 
            designed to inspire young minds and create unforgettable magical moments.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 lg:mb-12 px-4">
            <Button size="lg" className="text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Begin Your Adventure
            </Button>
            <Button variant="outline" size="lg" className="text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4 border-purple-300 text-purple-600 hover:bg-purple-50">
              Explore Magic
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-12 lg:mt-16">
            <div className="text-center group">
              <div className="bg-purple-100 w-12 lg:w-16 h-12 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="h-6 lg:h-8 w-6 lg:w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Enchanted Tales</h3>
              <p className="text-gray-600 text-sm lg:text-base">Personalized stories with valuable life lessons and timeless wisdom</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-pink-100 w-12 lg:w-16 h-12 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Palette className="h-6 lg:h-8 w-6 lg:w-8 text-pink-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Creative Workshops</h3>
              <p className="text-gray-600 text-sm lg:text-base">Coloring adventures, drawing inspiration, and artistic challenges</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-blue-100 w-12 lg:w-16 h-12 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Puzzle className="h-6 lg:h-8 w-6 lg:w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Learning Adventures</h3>
              <p className="text-gray-600 text-sm lg:text-base">Math quests, letter discoveries, and puzzle challenges that make learning magical</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}