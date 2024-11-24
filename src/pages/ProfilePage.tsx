import React, { useState } from 'react';
import { ArrowLeft, Camera, Edit2, Bell, Moon, Lock, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import Navigation from '../components/Navigation';
import EditProfileModal from '../components/profile/EditProfileModal';
import NotificationSettings from '../components/profile/NotificationSettings';
import ThemeSettings from '../components/profile/ThemeSettings';
import PrivacySettings from '../components/profile/PrivacySettings';

interface Props {
  onNavigate: (page: 'home' | 'garden' | 'support') => void;
}

export default function ProfilePage({ onNavigate }: Props) {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const user = {
    name: '田中花子',
    role: 'シニア会員',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop',
    interests: ['園芸', '料理', '写真'],
    healthGoals: ['毎日30分散歩', '週2回のヨガ'],
  };

  const settingsSections = [
    {
      id: 'notifications',
      title: '通知設定',
      icon: Bell,
      component: NotificationSettings,
    },
    {
      id: 'theme',
      title: 'テーマ設定',
      icon: Moon,
      component: ThemeSettings,
    },
    {
      id: 'privacy',
      title: 'プライバシー設定',
      icon: Lock,
      component: PrivacySettings,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-10">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => onNavigate('home')}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-xl font-medium text-gray-800">プロフィール</h1>
            <div className="w-10" /> {/* Spacer for alignment */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        <div className="max-w-screen-xl mx-auto px-4">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="relative h-32 bg-gradient-to-r from-indigo-500 to-purple-500">
              <div className="absolute -bottom-12 left-6">
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-24 h-24 rounded-full border-4 border-white object-cover"
                  />
                  <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                    <Camera className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
            <div className="pt-16 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-medium text-gray-900">{user.name}</h2>
                  <p className="text-sm text-gray-600">{user.role}</p>
                </div>
                <button
                  onClick={() => setShowEditProfile(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>編集</span>
                </button>
              </div>

              {/* Interests & Goals */}
              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">興味・関心</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">健康目標</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.healthGoals.map((goal, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm"
                      >
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Sections */}
          <div className="mt-6 bg-white rounded-2xl shadow-sm">
            <div className="divide-y divide-gray-100">
              {settingsSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-full">
                      <section.icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {section.title}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              ))}
            </div>
          </div>

          {/* Support & Help */}
          <div className="mt-6 bg-white rounded-2xl shadow-sm">
            <div className="divide-y divide-gray-100">
              <button 
                onClick={() => onNavigate('support')}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-full">
                    <HelpCircle className="w-5 h-5 text-gray-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    サポートと設定
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Logout Button */}
          <div className="mt-6">
            <button className="w-full flex items-center justify-center gap-2 p-4 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">ログアウト</span>
            </button>
          </div>
        </div>
      </main>

      {/* Navigation */}
      <Navigation currentPage="profile" onNavigate={onNavigate} />

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <EditProfileModal
          user={user}
          onClose={() => setShowEditProfile(false)}
        />
      )}

      {/* Settings Modals */}
      {activeSection && (
        <div className="fixed inset-0 bg-black/50 z-50">
          {settingsSections.find(s => s.id === activeSection)?.component({
            onClose: () => setActiveSection(null)
          })}
        </div>
      )}
    </div>
  );
}