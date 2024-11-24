import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Target, Flower2, Users, Star } from 'lucide-react';
import type { NotificationType } from '../../pages/NotificationsPage';

interface Props {
  filter: NotificationType;
}

const notifications = [
  {
    id: 1,
    type: 'messages',
    title: '田中花子さんからメッセージ',
    description: '明日の茶道レッスンについて',
    time: '5分前',
    unread: true,
    icon: MessageCircle,
    color: 'text-blue-500',
    bg: 'bg-blue-100',
  },
  {
    id: 2,
    type: 'goals',
    title: '目標達成おめでとう！',
    description: '「毎日30分散歩」の目標を達成しました',
    time: '1時間前',
    unread: true,
    icon: Flower2,
    color: 'text-green-500',
    bg: 'bg-green-100',
  },
  {
    id: 3,
    type: 'missions',
    title: '新しいミッション',
    description: '家族写真アルバムの整理',
    time: '3時間前',
    unread: false,
    icon: Target,
    color: 'text-purple-500',
    bg: 'bg-purple-100',
  },
  {
    id: 4,
    type: 'family',
    title: '家族の活動',
    description: '田中太郎さんが新しい目標を設定しました',
    time: '昨日',
    unread: false,
    icon: Users,
    color: 'text-orange-500',
    bg: 'bg-orange-100',
  },
];

export default function NotificationsList({ filter }: Props) {
  const filteredNotifications = notifications.filter(
    notification => filter === 'all' || notification.type === filter
  );

  return (
    <AnimatePresence>
      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <motion.div
            key={notification.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className={`bg-white rounded-xl p-4 shadow-sm ${
              notification.unread ? 'border-l-4 border-indigo-500' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-full ${notification.bg}`}>
                <notification.icon className={`w-5 h-5 ${notification.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`text-sm font-medium ${
                      notification.unread ? 'text-gray-900' : 'text-gray-700'
                    }`}>
                      {notification.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.description}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                    {notification.time}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
}