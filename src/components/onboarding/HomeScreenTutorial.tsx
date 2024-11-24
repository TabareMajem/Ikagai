import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X, Flower2, Bot, Grid3X3, Navigation as NavIcon } from 'lucide-react';

interface Props {
  onNext: () => void;
}

type TutorialStep = 'garden' | 'ai' | 'quick-access' | 'navigation';

interface TutorialPoint {
  id: TutorialStep;
  title: string;
  description: string;
  icon: React.ElementType;
  position: string;
}

const tutorialPoints: TutorialPoint[] = [
  {
    id: 'garden',
    title: 'だるまの庭',
    description: 'ここであなたの庭を見ることができます。目標の進捗状況が植物の成長として表現されます。',
    icon: Flower2,
    position: 'top-32 left-4 right-4',
  },
  {
    id: 'ai',
    title: 'AIコンパニオン',
    description: 'あなたの目標達成をサポートする、頼れるパートナーです。',
    icon: Bot,
    position: 'top-72 left-4 right-4',
  },
  {
    id: 'quick-access',
    title: 'クイックアクセス',
    description: 'よく使う機能にすぐにアクセスできます。',
    icon: Grid3X3,
    position: 'top-[60%] left-4 right-4',
  },
  {
    id: 'navigation',
    title: 'ナビゲーション',
    description: 'アプリの主要な機能はここから簡単にアクセスできます。',
    icon: NavIcon,
    position: 'bottom-24 left-4 right-4',
  },
];

export default function HomeScreenTutorial({ onNext }: Props) {
  const [currentStep, setCurrentStep] = useState<TutorialStep>('garden');
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);

  const currentPointIndex = tutorialPoints.findIndex(point => point.id === currentStep);
  const currentPoint = tutorialPoints[currentPointIndex];

  const handleNext = () => {
    const nextIndex = currentPointIndex + 1;
    if (nextIndex < tutorialPoints.length) {
      setCurrentStep(tutorialPoints[nextIndex].id);
    } else {
      onNext();
    }
  };

  return (
    <div className="absolute inset-0 z-50">
      {/* Semi-transparent Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Tutorial Content */}
      <div className="relative h-full">
        {/* Skip Button */}
        <button
          onClick={() => setShowSkipConfirm(true)}
          className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Progress Indicator */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {tutorialPoints.map((point, index) => (
            <div
              key={point.id}
              className={`w-2 h-2 rounded-full transition-colors ${
                index <= currentPointIndex ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* Highlight Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`absolute ${currentPoint.position} mx-4 p-6 bg-white/10 border-2 border-white/20 rounded-2xl backdrop-blur-sm`}
          >
            {/* Pointer Arrow */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-4 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white/20" />
          </motion.div>
        </AnimatePresence>

        {/* Explanation Card */}
        <motion.div
          layout
          className="fixed left-4 right-4 bottom-32 bg-white rounded-2xl p-6 shadow-lg z-20"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-indigo-100 rounded-full">
              <currentPoint.icon className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {currentPoint.title}
              </h3>
              <p className="text-gray-600">
                {currentPoint.description}
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {currentPointIndex + 1} / {tutorialPoints.length}
            </div>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
            >
              {currentPointIndex === tutorialPoints.length - 1 ? '完了' : '次へ'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Skip Confirmation Modal */}
        <AnimatePresence>
          {showSkipConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 flex items-center justify-center p-4 z-30"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-6 max-w-sm w-full"
                onClick={e => e.stopPropagation()}
              >
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  チュートリアルをスキップしますか？
                </h3>
                <p className="text-gray-600 mb-6">
                  基本的な操作方法は「設定」から後でも確認できます。
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowSkipConfirm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    戻る
                  </button>
                  <button
                    onClick={onNext}
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
                  >
                    スキップ
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}