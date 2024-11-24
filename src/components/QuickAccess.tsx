import React from 'react';
import { Flower2, BookOpen, Users, MessageCircle } from 'lucide-react';

interface Props {
  onNavigate: (page: 'home' | 'garden' | 'family' | 'story' | 'messages') => void;
}

const quickLinks = [
  { icon: Flower2, label: 'だるまの庭', enLabel: 'Daruma Garden', page: 'garden' as const },
  { icon: BookOpen, label: 'ストーリー', enLabel: 'Story Quest', page: 'story' as const },
  { icon: Users, label: '家族と友達', enLabel: 'Family & Friends', page: 'family' as const },
  { icon: MessageCircle, label: 'メッセージ', enLabel: 'Messages', page: 'messages' as const },
];

export default function QuickAccess({ onNavigate }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {quickLinks.map((link, i) => (
        <button
          key={i}
          onClick={() => link.page && onNavigate(link.page)}
          className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition-colors"
        >
          <link.icon className="w-6 h-6 text-gray-700 mb-2" />
          <div className="text-center">
            <div className="text-sm font-medium text-gray-800">{link.label}</div>
            <div className="text-xs text-gray-500">{link.enLabel}</div>
          </div>
        </button>
      ))}
    </div>
  );
}