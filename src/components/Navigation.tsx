import React from 'react';
import { Home, Target, Users, MessageCircle, User, Award } from 'lucide-react';

interface Props {
  currentPage: 'home' | 'missions' | 'community' | 'messages' | 'profile' | 'rewards';
  onNavigate: (page: string) => void;
  userType?: 'elder' | 'volunteer';
}

export default function Navigation({ currentPage, onNavigate, userType = 'elder' }: Props) {
  const volunteerNavItems = [
    { icon: Home, label: 'ホーム', enLabel: 'Home', page: 'volunteer' },
    { icon: Target, label: 'ミッション', enLabel: 'Missions', page: 'missions' },
    { icon: Users, label: 'コミュニティ', enLabel: 'Community', page: 'community' },
    { icon: Award, label: '実績', enLabel: 'Rewards', page: 'rewards' },
    { icon: User, label: 'プロフィール', enLabel: 'Profile', page: 'profile' },
  ];

  const elderNavItems = [
    { icon: Home, label: 'ホーム', enLabel: 'Home', page: 'home' },
    { icon: Target, label: 'ミッション', enLabel: 'Missions', page: 'missions' },
    { icon: Users, label: 'コミュニティ', enLabel: 'Community', page: 'family' },
    { icon: MessageCircle, label: 'メッセージ', enLabel: 'Messages', page: 'messages' },
    { icon: User, label: 'プロフィール', enLabel: 'Profile', page: 'profile' },
  ];

  const navItems = userType === 'volunteer' ? volunteerNavItems : elderNavItems;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-between items-center">
          {navItems.map((item, i) => (
            <button
              key={i}
              onClick={() => onNavigate(item.page)}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                currentPage === item.page
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}