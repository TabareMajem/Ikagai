import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const familyMembers = [
  {
    id: 1,
    name: '田中花子',
    role: 'おばあちゃん',
    online: true,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop',
  },
  {
    id: 2,
    name: '田中太郎',
    role: '息子',
    online: true,
    avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=120&h=120&fit=crop',
  },
  {
    id: 3,
    name: '田中美咲',
    role: '娘',
    online: false,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop',
  },
];

export default function FamilyList() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {familyMembers.map((member, index) => (
        <motion.div
          key={member.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl p-4 shadow-sm"
        >
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                member.online ? 'bg-green-400' : 'bg-gray-300'
              }`} />
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">{member.name}</h3>
            <p className="text-xs text-gray-500">{member.role}</p>
            <button className="mt-3 flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-medium hover:bg-indigo-100 transition-colors">
              <MessageCircle className="w-3 h-3" />
              メッセージ
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}