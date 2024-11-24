import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Flower2, ChevronRight } from 'lucide-react';

interface Props {
  onNext: () => void;
}

export default function IntroductionScreen({ onNext }: Props) {
  const features = [
    {
      icon: Heart,
      title: '健康的な生活',
      description: '毎日の運動や健康管理をサポート',
      color: 'text-rose-500',
      bg: 'bg-rose-100',
    },
    {
      icon: Users,
      title: '家族とのつながり',
      description: '大切な人との絆を深める',
      color: 'text-blue-500',
      bg: 'bg-blue-100',
    },
    {
      icon: Flower2,
      title: '日本の伝統',
      description: '文化活動を通じて心を豊かに',
      color: 'text-emerald-500',
      bg: 'bg-emerald-100',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6"
    >
      {/* Main Illustration */}
      <div className="relative h-48 rounded-xl overflow-hidden mb-8">
        <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=300&fit=crop"
          alt="People enjoying life together"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Title and Description */}
      <div className="text-center space-y-4 mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-medium text-gray-900"
        >
          いきがいアプリとは
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-gray-600"
        >
          健康を維持し、家族や友人とつながり、日本の伝統を楽しみましょう。
        </motion.p>
      </div>

      {/* Features */}
      <div className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm"
          >
            <div className={`p-3 rounded-full ${feature.bg}`}>
              <feature.icon className={`w-6 h-6 ${feature.color}`} />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Next Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        onClick={onNext}
        className="w-full p-4 bg-indigo-600 text-white text-xl rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
      >
        次へ
        <ChevronRight className="w-6 h-6" />
      </motion.button>
    </motion.div>
  );
}