import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Search,
  Filter,
  Plus,
  Users,
  Clock,
  MessageCircle,
  Target,
  Laptop,
  Book,
  Heart,
  Music
} from 'lucide-react';
import NewMissionModal from '../components/volunteer/NewMissionModal';
import MissionDetailsModal from '../components/volunteer/MissionDetailsModal';

interface Props {
  onNavigate: (page: string) => void;
}

type MissionCategory = 'all' | 'tech' | 'cultural' | 'health' | 'social';

interface Mission {
  id: number;
  title: string;
  description: string;
  category: MissionCategory;
  elder: {
    name: string;
    avatar: string;
    location: string;
  };
  timeCommitment: string;
  impact: string;
  participants: number;
  maxParticipants: number;
}

const missions: Mission[] = [
  {
    id: 1,
    title: 'スマートフォン活用サポート',
    description: 'LINEやビデオ通話の使い方をサポートします。初心者の方でも安心して学べる環境です。',
    category: 'tech',
    elder: {
      name: '田中花子さん',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop',
      location: '世田谷区',
    },
    timeCommitment: '週1回・2時間',
    impact: '家族とのオンラインコミュニケーションをサポート',
    participants: 2,
    maxParticipants: 3,
  },
  {
    id: 2,
    title: '伝統茶道の継承活動',
    description: '茶道教室のアシスタントとして、伝統文化の継承をサポートします。',
    category: 'cultural',
    elder: {
      name: '佐藤美咲さん',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop',
      location: '練馬区',
    },
    timeCommitment: '月2回・3時間',
    impact: '日本の伝統文化を次世代に継承',
    participants: 1,
    maxParticipants: 2,
  },
  {
    id: 3,
    title: '健康体操クラスのサポート',
    description: '高齢者向け健康体操教室のアシスタントとして、安全で楽しい運動をサポートします。',
    category: 'health',
    elder: {
      name: '山田太郎さん',
      avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=120&h=120&fit=crop',
      location: '杉並区',
    },
    timeCommitment: '週2回・1時間',
    impact: '健康的な生活習慣の維持をサポート',
    participants: 3,
    maxParticipants: 4,
  },
];

const categories = [
  { id: 'all', label: 'すべて', icon: Target },
  { id: 'tech', label: 'テクノロジー', icon: Laptop },
  { id: 'cultural', label: '文化活動', icon: Book },
  { id: 'health', label: '健康', icon: Heart },
  { id: 'social', label: '交流', icon: Music },
];

export default function VolunteerMissionsPage({ onNavigate }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MissionCategory>('all');
  const [showNewMission, setShowNewMission] = useState(false);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  const filteredMissions = missions.filter(mission => 
    (selectedCategory === 'all' || mission.category === selectedCategory) &&
    (mission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     mission.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50 pb-20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-10">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => onNavigate('volunteer')}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-xl font-medium text-gray-800">ミッション</h1>
            <button
              onClick={() => setShowNewMission(true)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Plus className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="ミッションを検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full">
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Categories */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id as MissionCategory)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{category.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-44">
        <div className="max-w-screen-xl mx-auto px-4 space-y-4">
          {filteredMissions.map((mission, index) => (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    {mission.title}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {mission.description}
                  </p>
                  
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {mission.timeCommitment}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {mission.participants}/{mission.maxParticipants}人
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-4">
                    <img
                      src={mission.elder.avatar}
                      alt={mission.elder.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {mission.elder.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {mission.elder.location}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setSelectedMission(mission)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    詳細を見る
                  </button>
                  <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                    <MessageCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* New Mission Modal */}
      {showNewMission && (
        <NewMissionModal onClose={() => setShowNewMission(false)} />
      )}

      {/* Mission Details Modal */}
      {selectedMission && (
        <MissionDetailsModal
          mission={selectedMission}
          onClose={() => setSelectedMission(null)}
        />
      )}
    </div>
  );
}