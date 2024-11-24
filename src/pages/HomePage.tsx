import React from 'react';
import DarumaGarden from '../components/DarumaGarden';
import AICompanion from '../components/AICompanion';
import QuickAccess from '../components/QuickAccess';
import Navigation from '../components/Navigation';

interface Props {
  onNavigate: (page: 'home' | 'garden' | 'family' | 'missions' | 'story' | 'messages' | 'profile') => void;
}

export default function HomePage({ onNavigate }: Props) {
  return (
    <div className="min-h-screen pb-20">
      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
        {/* Garden Preview */}
        <DarumaGarden onNavigate={onNavigate} />

        {/* AI Companion Section */}
        <AICompanion />

        {/* Quick Access Grid */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-800 mb-4">クイックアクセス</h2>
          <QuickAccess onNavigate={onNavigate} />
        </div>
      </main>

      {/* Navigation */}
      <Navigation currentPage="home" onNavigate={onNavigate} />
    </div>
  );
}