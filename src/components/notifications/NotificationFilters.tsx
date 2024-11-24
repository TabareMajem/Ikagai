import React from 'react';
import { MessageCircle, Target, Flower2, Users, Bell } from 'lucide-react';
import type { NotificationType } from '../../pages/NotificationsPage';

interface Props {
  selected: NotificationType;
  onChange: (type: NotificationType) => void;
}

const filters = [
  { id: 'all', label: 'すべて', icon: Bell },
  { id: 'goals', label: '目標', icon: Flower2 },
  { id: 'messages', label: 'メッセージ', icon: MessageCircle },
  { id: 'missions', label: 'ミッション', icon: Target },
  { id: 'family', label: '家族', icon: Users },
] as const;

export default function NotificationFilters({ selected, onChange }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onChange(filter.id as NotificationType)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
            selected === filter.id
              ? 'bg-indigo-100 text-indigo-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <filter.icon className="w-4 h-4" />
          <span className="text-sm font-medium">{filter.label}</span>
        </button>
      ))}
    </div>
  );
}