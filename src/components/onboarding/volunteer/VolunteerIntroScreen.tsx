import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Heart, Users, Sparkles } from 'lucide-react';

interface Props {
  onNext: () => void;
}

const opportunities = [
  {
    icon: Heart,
    title: '高齢者のサポート',
    description: 'デジタル機器の使い方や日常生活のお手伝い',
  },
  {
    icon: Users,
    title: '文化交流',
    description: '世代を超えた対話と経験の共有',
  },
  {
    icon: Sparkles,
    title: 'スキルの活用',
    description: 'あなたの得意分野で地域に貢献',
  },
];

export default function VolunteerIntroScreen({ onNext }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6"
    >
      {/* Hero Image */}
      <div className="relative h-48 rounded-xl overflow-hidden mb-8">
        <img
          src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=300&fit=crop"
          alt="Volunteers helping seniors"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <h1 className="text-2xl font-medium mb-2">
            いきがいアプリへようこそ、<br />
            ボランティアの皆さん！
          </h1>
          <p className="text-sm text-white/90">
            あなたの支援が、誰かの人生を豊かにします
          </p>
        </div>
      </div>

      {/* Mission Statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-indigo-50 rounded-xl p-6 mb-8"
      >
        <h2 className="text-lg font-medium text-indigo-900 mb-2">
          私たちのミッション
        </h2>
        <p className="text-indigo-700">
          高齢者の方々が、より豊かで活動的な生活を送れるようサポートすること。
          あなたの参加が、大きな変化を生み出します。
        </p>
      </motion.div>

      {/* Opportunities */}
      <div className="space-y-4 mb-8">
        {opportunities.map((opportunity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-sm"
          >
            <div className="p-3 bg-indigo-100 rounded-full">
              <opportunity.icon className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">
                {opportunity.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {opportunity.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Impact Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-3 gap-4 mb-8"
      >
        {[
          { value: '1,000+', label: '活動中のボランティア' },
          { value: '5,000+', label: 'サポート実績' },
          { value: '98%', label: '利用者満足度' },
        ].map((stat, index) => (
          <div
            key={index}
            className="text-center bg-white rounded-xl p-4 shadow-sm"
          >
            <div className="text-xl font-bold text-indigo-600">
              {stat.value}
            </div>
            <div className="text-xs text-gray-600 mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Next Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        onClick={onNext}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
      >
        ボランティアを始める
        <ChevronRight className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
}