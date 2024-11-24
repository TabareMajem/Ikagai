import React, { useState } from 'react';
import { ArrowLeft, Plus, Filter } from 'lucide-react';
import Navigation from '../components/Navigation';
import MissionsList from '../components/missions/MissionsList';
import MissionDetails from '../components/missions/MissionDetails';
import NewMissionModal from '../components/missions/NewMissionModal';

interface Mission {
  id: number;
  title: string;
  description: string;
  initiator: string;
  progress: number;
  participants: string[];
  messages: {
    id: number;
    user: string;
    content: string;
    timestamp: string;
  }[];
  milestones: {
    id: number;
    title: string;
    completed: boolean;
  }[];
  dueDate: string;
  status: 'active' | 'completed' | 'proposed';
}

interface Props {
  onNavigate: (page: 'home' | 'garden') => void;
}

export default function MissionsPage({ onNavigate }: Props) {
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [showNewMission, setShowNewMission] = useState(false);
  const [filter, setFilter] = useState('すべて');

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50 pb-20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-10">
        <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={() => onNavigate('home')}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-medium text-gray-800">世代間ミッション</h1>
          <div className="flex gap-2">
            <button 
              onClick={() => setShowNewMission(true)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Plus className="w-6 h-6 text-gray-700" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Filter className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="max-w-screen-xl mx-auto px-4 py-2 flex gap-4 overflow-x-auto">
          {['すべて', '進行中', '完了済み', '提案済み'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === tab
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32">
        <div className="max-w-screen-xl mx-auto px-4">
          {selectedMission ? (
            <MissionDetails
              mission={selectedMission}
              onClose={() => setSelectedMission(null)}
            />
          ) : (
            <MissionsList onSelectMission={setSelectedMission} />
          )}
        </div>
      </main>

      {/* Navigation */}
      <Navigation currentPage="missions" onNavigate={onNavigate} />

      {/* New Mission Modal */}
      {showNewMission && (
        <NewMissionModal onClose={() => setShowNewMission(false)} />
      )}
    </div>
  );
}