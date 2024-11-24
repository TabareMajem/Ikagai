import React, { useState } from 'react';
import { ArrowLeft, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import Navigation from '../components/Navigation';
import StoryProgress from '../components/story/StoryProgress';
import StoryContent from '../components/story/StoryContent';
import StoryChoices from '../components/story/StoryChoices';
import StoryCompanion from '../components/story/StoryCompanion';
import ChaptersList from '../components/story/ChaptersList';

interface Props {
  onNavigate: (page: 'home' | 'garden') => void;
}

export default function StoryPage({ onNavigate }: Props) {
  const [showChapters, setShowChapters] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(0);

  const chapters = [
    {
      id: 1,
      title: '桜の季節',
      subtitle: 'The Season of Cherry Blossoms',
      progress: 100,
      completed: true,
    },
    {
      id: 2,
      title: '夏祭りの思い出',
      subtitle: 'Memories of Summer Festival',
      progress: 75,
      completed: false,
    },
    {
      id: 3,
      title: '紅葉の誓い',
      subtitle: 'Promise of Autumn Leaves',
      progress: 0,
      completed: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-10">
        <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={() => onNavigate('home')}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-medium text-gray-800">ストーリークエスト</h1>
          <button 
            onClick={() => setShowChapters(true)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <BookOpen className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="max-w-screen-xl mx-auto px-4 pb-4">
          <StoryProgress chapters={chapters} currentChapter={currentChapter} />
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-28 pb-24">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm overflow-hidden">
            <StoryContent chapter={chapters[currentChapter]} />
            
            {/* Navigation Buttons */}
            <div className="flex justify-between items-center p-6 border-t border-gray-100">
              <button
                onClick={() => setCurrentChapter(prev => Math.max(0, prev - 1))}
                disabled={currentChapter === 0}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>前へ</span>
              </button>
              <button
                onClick={() => setCurrentChapter(prev => Math.min(chapters.length - 1, prev + 1))}
                disabled={currentChapter === chapters.length - 1}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>次へ</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Story Choices */}
          <div className="mt-6">
            <StoryChoices onSelect={(choice) => console.log(choice)} />
          </div>
        </div>
      </main>

      {/* AI Companion */}
      <StoryCompanion />

      {/* Navigation */}
      <Navigation currentPage="home" onNavigate={onNavigate} />

      {/* Chapters List Modal */}
      {showChapters && (
        <ChaptersList
          chapters={chapters}
          currentChapter={currentChapter}
          onSelect={setCurrentChapter}
          onClose={() => setShowChapters(false)}
        />
      )}
    </div>
  );
}