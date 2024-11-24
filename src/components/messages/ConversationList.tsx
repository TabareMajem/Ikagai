import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

interface Props {
  searchQuery: string;
  onSelectChat: (chatId: number) => void;
}

const conversations = [
  {
    id: 1,
    name: '田中花子',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop',
    lastMessage: 'はい、明日の花見が楽しみですね！',
    timestamp: '5分前',
    unread: 2,
    isOnline: true,
    isGroup: false,
  },
  {
    id: 2,
    name: '家族グループ',
    participants: ['田中花子', '田中太郎', '田中美咲'],
    lastMessage: '写真を共有しました',
    timestamp: '30分前',
    unread: 0,
    isGroup: true,
  },
  {
    id: 3,
    name: '田中太郎',
    avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=120&h=120&fit=crop',
    lastMessage: '了解です！',
    timestamp: '2時間前',
    unread: 0,
    isOnline: false,
    isGroup: false,
  },
];

export default function ConversationList({ searchQuery, onSelectChat }: Props) {
  const filteredConversations = conversations.filter(
    conv => conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-2 px-4">
      {filteredConversations.map((conv, index) => (
        <motion.button
          key={conv.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onSelectChat(conv.id)}
          className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
        >
          {/* Avatar */}
          <div className="relative">
            {conv.isGroup ? (
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
            ) : (
              <div className="relative">
                <img
                  src={conv.avatar}
                  alt={conv.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {!conv.isGroup && (
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                    conv.isOnline ? 'bg-green-400' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-baseline">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {conv.name}
              </h3>
              <span className="text-xs text-gray-500">{conv.timestamp}</span>
            </div>
            <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
            {conv.isGroup && (
              <p className="text-xs text-gray-500 mt-1">
                {conv.participants.join(', ')}
              </p>
            )}
          </div>

          {/* Unread Badge */}
          {conv.unread > 0 && (
            <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-white">
                {conv.unread}
              </span>
            </div>
          )}
        </motion.button>
      ))}
    </div>
  );
}