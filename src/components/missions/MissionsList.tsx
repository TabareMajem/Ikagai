import React from 'react';
import { motion } from 'framer-motion';
import { Users, MessageSquare, Calendar } from 'lucide-react';

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

const missions: Mission[] = [
  {
    id: 1,
    title: '家族の思い出アルバム作り',
    description: '古い写真をデジタル化して、家族で思い出を共有しましょう',
    initiator: '田中花子',
    progress: 75,
    participants: ['田中花子', '田中太郎', '田中美咲'],
    messages: [
      {
        id: 1,
        user: '田中花子',
        content: '昔の写真を見つけました！スキャンを始めます。',
        timestamp: '2時間前'
      },
      {
        id: 2,
        user: '田中太郎',
        content: '僕も手伝います！',
        timestamp: '1時間前'
      }
    ],
    milestones: [
      { id: 1, title: '写真の収集', completed: true },
      { id: 2, title: 'スキャン作業', completed: true },
      { id: 3, title: 'アルバム整理', completed: false }
    ],
    dueDate: '2024年3月末',
    status: 'active',
  },
  {
    id: 2,
    title: '伝統料理を学ぼう',
    description: 'おばあちゃんの得意料理を一緒に作って、レシピを記録します',
    initiator: '田中美咲',
    progress: 30,
    participants: ['田中花子', '田中美咲'],
    messages: [
      {
        id: 1,
        user: '田中美咲',
        content: 'おばあちゃん、今度教えてください！',
        timestamp: '3時間前'
      }
    ],
    milestones: [
      { id: 1, title: 'レシピの選定', completed: true },
      { id: 2, title: '材料の準備', completed: false },
      { id: 3, title: '料理実習', completed: false }
    ],
    dueDate: '2024年4月中旬',
    status: 'active',
  },
];

interface Props {
  onSelectMission: (mission: Mission) => void;
}

export default function MissionsList({ onSelectMission }: Props) {
  return (
    <div className="space-y-4">
      {missions.map((mission, index) => (
        <motion.div
          key={mission.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onSelectMission(mission)}
          className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{mission.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{mission.description}</p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">進捗状況</span>
                <span className="font-medium text-gray-900">{mission.progress}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${mission.progress}%` }}
                />
              </div>
            </div>

            {/* Mission Info */}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{mission.participants.length}人</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>{mission.messages.length}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{mission.dueDate}</span>
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex justify-end">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                mission.status === 'active'
                  ? 'bg-green-100 text-green-700'
                  : mission.status === 'completed'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {mission.status === 'active' ? '進行中'
                  : mission.status === 'completed' ? '完了'
                  : '提案済み'}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}