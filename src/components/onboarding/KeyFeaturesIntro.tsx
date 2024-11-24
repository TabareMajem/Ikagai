import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft,
  Bot, 
  Target, 
  Users, 
  MessageCircle 
} from 'lucide-react';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  image: string;
}

const features: Feature[] = [
  {
    id: 'ai',
    title: 'AIコンパニオン',
    description: 'あなたをサポートするバーチャルパートナーです。日々の目標達成をお手伝いします。',
    icon: Bot,
    color: 'indigo',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop',
  },
  {
    id: 'missions',
    title: '世代間ミッション',
    description: '家族や友人と一緒にチャレンジしましょう。共に過ごす時間がより豊かになります。',
    icon: Target,
    color: 'purple',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=400&fit=crop',
  },
  {
    id: 'family',
    title: '家族・友人ダッシュボード',
    description: 'つながりを維持し、進捗を共有します。大切な人との絆を深めましょう。',
    icon: Users,
    color: 'pink',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=400&fit=crop',
  },
  {
    id: 'messages',
    title: 'メッセージ機能',
    description: '簡単にメッセージを送信できます。写真や思い出を共有しましょう。',
    icon: MessageCircle,
    color: 'blue',
    image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&h=400&fit=crop',
  },
];

export default function KeyFeaturesIntro({ onNext, onBack }: Props) {
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const currentFeature = features[currentFeatureIndex];

  const handleNext = () => {
    if (currentFeatureIndex < features.length - 1) {
      setCurrentFeatureIndex(currentFeatureIndex + 1);
    } else {
      onNext();
    }
  };

  const handleBack = () => {
    if (currentFeatureIndex > 0) {
      setCurrentFeatureIndex(currentFeatureIndex - 1);
    } else {
      onBack();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6"
    >
      {/* Progress Dots */}
      <div className="flex justify-center gap-2 mb-8">
        {features.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentFeatureIndex
                ? 'bg-indigo-600'
                : index < currentFeatureIndex
                ? 'bg-indigo-200'
                : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Feature Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentFeature.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          {/* Feature Image */}
          <div className="relative h-48 rounded-xl overflow-hidden mb-8">
            <img
              src={currentFeature.image}
              alt={currentFeature.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-3">
              <div className={`p-2 bg-${currentFeature.color}-100 rounded-full`}>
                <currentFeature.icon className={`w-6 h-6 text-${currentFeature.color}-600`} />
              </div>
              <h2 className="text-xl font-medium text-white">
                {currentFeature.title}
              </h2>
            </div>
          </div>

          {/* Feature Description */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-lg text-gray-600 leading-relaxed">
              {currentFeature.description}
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleBack}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              戻る
            </button>
            <button
              onClick={handleNext}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
            >
              {currentFeatureIndex === features.length - 1 ? '完了' : '次へ'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}