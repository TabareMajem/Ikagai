import React, { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import Navigation from '../components/Navigation';
import NotificationsList from '../components/notifications/NotificationsList';
import NotificationFilters from '../components/notifications/NotificationFilters';

interface Props {
  onNavigate: (page: 'home' | 'garden') => void;
}

export type NotificationType = 'all' | 'goals' | 'messages' | 'missions' | 'family';

export default function NotificationsPage({ onNavigate }: Props) {
  const [selectedFilter, setSelectedFilter] = useState<NotificationType>('all');

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-10">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => onNavigate('home')}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-xl font-medium text-gray-800">通知</h1>
            <button className="p-2 hover:bg-gray-100 rounded-full text-indigo-600">
              <Check className="w-6 h-6" />
            </button>
          </div>

          {/* Filters */}
          <div className="mt-4">
            <NotificationFilters
              selected={selectedFilter}
              onChange={setSelectedFilter}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32">
        <div className="max-w-screen-xl mx-auto px-4">
          <NotificationsList filter={selectedFilter} />
        </div>
      </main>

      {/* Navigation */}
      <Navigation currentPage="home" onNavigate={onNavigate} />
    </div>
  );
}