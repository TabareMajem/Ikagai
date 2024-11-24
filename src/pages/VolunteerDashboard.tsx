import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock,
  Users, 
  Star, 
  Award,
  ChevronRight,
  Search,
  Target,
  Calendar,
  FileText,
  MessageCircle,
  Bell,
  Heart,
  Filter,
  MapPin,
  Book,
  Music,
  Coffee,
  Laptop
} from 'lucide-react';
import Navigation from '../components/Navigation';

interface Props {
  onNavigate: (page: string) => void;
}

export default function VolunteerDashboard({ onNavigate }: Props) {
  const [selectedInterest, setSelectedInterest] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const availableOpportunities = [
    {
      id: 1,
      title: '伝統茶道の継承活動',
      description: '茶道の基本作法から心得まで、若い世代に伝えていきたいです。',
      elder: {
        name: '鈴木さん',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop',
        location: '世田谷区',
      },
      interests: ['文化活動', '教育'],
      priority: true,
      schedule: '週末午後',
      matches: ['文化理解', '教育経験'],
      responses: 0,
    },
    {
      id: 2,
      title: 'スマートフォン活用サポート',
      description: 'LINEやビデオ通話の使い方を教えていただきたいです。',
      elder: {
        name: '山本さん',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop',
        location: '渋谷区',
      },
      interests: ['テクノロジー', 'コミュニケーション'],
      priority: false,
      schedule: '平日午前',
      matches: ['IT スキル'],
      responses: 2,
      bonusReward: true,
    },
    {
      id: 3,
      title: '健康体操の仲間募集',
      description: '一緒に楽しく体を動かしましょう。初心者向けの簡単な運動です。',
      elder: {
        name: '佐藤さん',
        avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=120&h=120&fit=crop',
        location: '杉並区',
      },
      interests: ['健康', 'スポーツ'],
      priority: true,
      schedule: '火曜・木曜午前',
      matches: ['健康・運動'],
      responses: 1,
    },
  ];

  const interestCategories = [
    { id: 'all', label: 'すべて', icon: Target },
    { id: 'tech', label: 'テクノロジー', icon: Laptop },
    { id: 'culture', label: '文化活動', icon: Book },
    { id: 'health', label: '健康', icon: Heart },
    { id: 'social', label: '交流', icon: Music },
    { id: 'education', label: '教育', icon: Book },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50 pb-20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-10">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-medium text-gray-800">ボランティアダッシュボード</h1>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Bell className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="活動を検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full"
            >
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32">
        <div className="max-w-screen-xl mx-auto px-4 space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Clock, label: '活動時間', value: '24時間' },
              { icon: Users, label: 'サポート人数', value: '12人' },
              { icon: Star, label: '評価', value: '4.8' },
              { icon: Award, label: 'ポイント', value: '2,450' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-4 shadow-sm"
              >
                <div className="p-2 bg-indigo-100 rounded-full w-fit mb-2">
                  <stat.icon className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Target, label: 'ミッション', page: 'missions' },
              { icon: MessageCircle, label: 'メッセージ', page: 'messages' },
              { icon: FileText, label: '活動記録', page: 'records' },
              { icon: Calendar, label: 'スケジュール', page: 'schedule' },
            ].map((action, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                onClick={() => onNavigate(action.page)}
                className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition-colors"
              >
                <div className="p-2 bg-indigo-100 rounded-full">
                  <action.icon className="w-5 h-5 text-indigo-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">{action.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Available Opportunities */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">新しい機会</h2>
            </div>

            {/* Interest Categories */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-4">
              {interestCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedInterest(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                    selectedInterest === category.id
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{category.label}</span>
                </button>
              ))}
            </div>

            {/* Opportunities List */}
            <div className="grid gap-4">
              {availableOpportunities.map((opportunity, index) => (
                <motion.div
                  key={opportunity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white rounded-xl p-6 shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <img
                          src={opportunity.elder.avatar}
                          alt={opportunity.elder.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-gray-900">{opportunity.title}</h3>
                            {opportunity.priority && (
                              <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                                優先
                              </span>
                            )}
                            {opportunity.bonusReward && (
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-600 text-xs rounded-full">
                                ボーナスポイント
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{opportunity.elder.name}</p>
                          <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                            <MapPin className="w-4 h-4" />
                            <span>{opportunity.elder.location}</span>
                            <span className="mx-2">•</span>
                            <Calendar className="w-4 h-4" />
                            <span>{opportunity.schedule}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 mt-3">{opportunity.description}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {opportunity.interests.map((interest, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                      {opportunity.matches.length > 0 && (
                        <div className="mt-3 flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">
                            あなたのスキルにマッチ: {opportunity.matches.join(', ')}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                        参加する
                      </button>
                      <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                        <MessageCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{opportunity.responses}人が興味を示しています</span>
                      <button className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                        詳細を見る
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Navigation */}
      <Navigation currentPage="volunteer" onNavigate={onNavigate} userType="volunteer" />
    </div>
  );
}