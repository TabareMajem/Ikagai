import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Award, 
  Star, 
  Gift, 
  Trophy,
  Heart,
  MessageSquare,
  ChevronRight,
  Users,
  Clock,
  MessageCircle
} from 'lucide-react';
import Navigation from '../components/Navigation';

interface Props {
  onNavigate: (page: string) => void;
}

export default function VolunteerRewardsPage({ onNavigate }: Props) {
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);

  const stats = [
    { icon: Clock, label: '活動時間', value: '24時間' },
    { icon: Users, label: 'サポート人数', value: '12人' },
    { icon: Star, label: '評価', value: '4.8/5.0' },
    { icon: Award, label: 'ポイント', value: '2,450pt' },
  ];

  const badges = [
    { id: 'tech', name: 'テックマスター', description: '10回以上のテクノロジーサポート', progress: 80 },
    { id: 'care', name: 'ケアの達人', description: '50時間以上の活動', progress: 65 },
    { id: 'social', name: 'コミュニケーター', description: '20人以上とのつながり', progress: 45 },
  ];

  const testimonials = [
    {
      id: 1,
      elder: '田中花子さん',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop',
      message: 'とても丁寧に教えていただき、スマートフォンの使い方がよく分かりました。',
      date: '1週間前',
    },
    {
      id: 2,
      elder: '佐藤美咲さん',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop',
      message: '優しく接していただき、楽しく活動できました。',
      date: '2週間前',
    },
  ];

  const rewards = [
    { id: 1, name: 'オリジナルTシャツ', points: 1000, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop' },
    { id: 2, name: 'コーヒーチケット', points: 500, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&fit=crop' },
    { id: 3, name: '活動証明書', points: 2000, image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=200&h=200&fit=crop' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50 pb-20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-10">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => onNavigate('volunteer')}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-xl font-medium text-gray-800">実績とリワード</h1>
            <div className="w-10" /> {/* Spacer for alignment */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        <div className="max-w-screen-xl mx-auto px-4 space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
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

          {/* Badges */}
          <section>
            <h2 className="text-lg font-medium text-gray-900 mb-4">獲得バッジ</h2>
            <div className="grid gap-4">
              {badges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-white rounded-xl p-4 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-yellow-100 rounded-full">
                      <Trophy className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{badge.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{badge.description}</p>
                      <div className="mt-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">進捗状況</span>
                          <span className="text-gray-900">{badge.progress}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-500 rounded-full transition-all duration-500"
                            style={{ width: `${badge.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Testimonials */}
          <section>
            <h2 className="text-lg font-medium text-gray-900 mb-4">感謝の声</h2>
            <div className="grid gap-4">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white rounded-xl p-4 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.elder}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-gray-900">
                          {testimonial.elder}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {testimonial.date}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1">{testimonial.message}</p>
                      <div className="flex items-center gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Available Rewards */}
          <section>
            <h2 className="text-lg font-medium text-gray-900 mb-4">交換可能なリワード</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {rewards.map((reward, index) => (
                <motion.div
                  key={reward.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-white rounded-xl overflow-hidden shadow-sm"
                >
                  <img
                    src={reward.image}
                    alt={reward.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900">{reward.name}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-gray-600">
                        {reward.points} pt
                      </span>
                      <button className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700">
                        交換する
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
      <Navigation currentPage="rewards" onNavigate={onNavigate} userType="volunteer" />
    </div>
  );
}