import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  MessageCircle, 
  UserPlus, 
  Search, 
  Filter,
  Heart,
  Calendar,
  Users,
  Target,
  Bot,
  MapPin,
  Star
} from 'lucide-react';
import Navigation from '../components/Navigation';

interface Props {
  onNavigate: (page: 'home' | 'garden') => void;
}

// Sample data for volunteers
const volunteers = [
  {
    id: 1,
    name: '山田太郎',
    avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=120&h=120&fit=crop',
    interests: ['園芸', '読書', '料理'],
    bio: '高齢者の方々と一緒に楽しい時間を過ごしたいと思っています。',
    rating: 4.8,
    reviews: 12,
  },
  {
    id: 2,
    name: '佐藤美咲',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop',
    interests: ['音楽', '手芸', '散歩'],
    bio: '音楽を通じて皆様と交流できることを楽しみにしています。',
    rating: 4.9,
    reviews: 15,
  },
];

// Sample data for community events
const events = [
  {
    id: 1,
    title: '季節の茶道体験',
    image: 'https://images.unsplash.com/photo-1545048702-79362596cdc9?w=500&h=300&fit=crop',
    date: '2024年3月15日',
    time: '14:00 - 16:00',
    location: '文化センター',
    description: '伝統的な茶道を体験しながら、新しい友達を作りましょう。',
    participants: 8,
    maxParticipants: 12,
  },
  {
    id: 2,
    title: '春の園芸教室',
    image: 'https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=500&h=300&fit=crop',
    date: '2024年3月20日',
    time: '10:00 - 12:00',
    location: 'コミュニティガーデン',
    description: '季節の花や野菜の育て方を学びながら交流を深めます。',
    participants: 5,
    maxParticipants: 10,
  },
];

// Sample data for support groups
const groups = [
  {
    id: 1,
    name: '健康体操の会',
    icon: Heart,
    description: '一緒に楽しく体を動かしましょう。初心者歓迎です。',
    members: 25,
  },
  {
    id: 2,
    name: '思い出シェア',
    icon: Calendar,
    description: '懐かしい思い出や写真を共有する楽しいグループです。',
    members: 18,
  },
];

export default function FamilyFriendsPage({ onNavigate }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-rose-50 pb-20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-10">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => onNavigate('home')}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-xl font-medium text-gray-800">コミュニティ</h1>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <MessageCircle className="w-6 h-6 text-gray-700" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <UserPlus className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="活動や人を検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
            >
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32">
        <div className="max-w-screen-xl mx-auto px-4 space-y-8">
          {/* Welcome Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <h2 className="text-xl font-medium text-gray-900 mb-2">
              新しい仲間や活動を見つけましょう！
            </h2>
            <p className="text-gray-600">
              一緒に楽しい時間を過ごす仲間が待っています。
              興味のある活動に参加して、新しい出会いを見つけましょう。
            </p>
          </motion.div>

          {/* Volunteer Matching Section */}
          <section>
            <h2 className="text-lg font-medium text-gray-800 mb-4">ボランティアとつながる</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {volunteers.map((volunteer, index) => (
                <motion.div
                  key={volunteer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={volunteer.avatar}
                      alt={volunteer.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">{volunteer.name}</h3>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600">
                              {volunteer.rating} ({volunteer.reviews}件のレビュー)
                            </span>
                          </div>
                        </div>
                        <button className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-full hover:bg-indigo-700">
                          つながる
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{volunteer.bio}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {volunteer.interests.map((interest, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Community Events */}
          <section>
            <h2 className="text-lg font-medium text-gray-800 mb-4">コミュニティイベント</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl overflow-hidden shadow-sm"
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-medium text-gray-900 mb-2">{event.title}</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date} {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{event.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        参加者: {event.participants}/{event.maxParticipants}
                      </div>
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                        イベントに参加する
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Support Groups */}
          <section>
            <h2 className="text-lg font-medium text-gray-800 mb-4">サポートグループ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {groups.map((group, index) => (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-indigo-100 rounded-full">
                      <group.icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">{group.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            メンバー: {group.members}人
                          </p>
                        </div>
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                          グループに参加する
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        {group.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* AI Companion */}
      <div className="fixed bottom-24 right-6">
        <button className="p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700">
          <Bot className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation */}
      <Navigation currentPage="family" onNavigate={onNavigate} />
    </div>
  );
}