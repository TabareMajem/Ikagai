import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Target } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'achievement',
    user: '田中花子',
    action: '散歩の目標を達成しました！',
    time: '2時間前',
    icon: Trophy,
    color: 'text-yellow-500',
    bg: 'bg-yellow-100',
  },
  {
    id: 2,
    type: 'milestone',
    user: '田中太郎',
    action: '新しいマイルストーンを達成しました',
    time: '4時間前',
    icon: Star,
    color: 'text-purple-500',
    bg: 'bg-purple-100',
  },
  {
    id: 3,
    type: 'mission',
    user: '田中美咲',
    action: '新しい家族ミッションを提案しました',
    time: '昨日',
    icon: Target,
    color: 'text-blue-500',
    bg: 'bg-blue-100',
  },
];

export default function ActivityFeed() {
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl p-4 shadow-sm"
        >
          <div className="flex items-start gap-4">
            <div className={`p-2 rounded-full ${activity.bg}`}>
              <activity.icon className={`w-5 h-5 ${activity.color}`} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{activity.user}</p>
              <p className="text-sm text-gray-600">{activity.action}</p>
              <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}