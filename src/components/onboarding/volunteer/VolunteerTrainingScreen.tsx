import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, MessageSquare, Heart, Shield } from 'lucide-react';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

interface TrainingModule {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  content: string[];
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
  };
}

const trainingModules: TrainingModule[] = [
  {
    id: 'communication',
    title: '効果的なコミュニケーション',
    description: '高齢者の方々との円滑な対話のために',
    icon: MessageSquare,
    content: [
      '相手のペースに合わせて話す',
      '明確でシンプルな言葉を使う',
      '積極的に傾聴する',
      '非言語コミュニケーションにも注意を払う',
    ],
    quiz: {
      question: '高齢者との会話で最も重要なのは？',
      options: [
        '早く話して時間を節約する',
        '相手のペースに合わせて話を聞く',
        '専門用語を使って説明する',
        '自分の意見を主張する',
      ],
      correctIndex: 1,
    },
  },
  {
    id: 'respect',
    title: '文化的配慮と敬意',
    description: '世代間の相互理解を深めるために',
    icon: Heart,
    content: [
      '経験と知恵を尊重する',
      '生活習慣や価値観の違いを理解する',
      'プライバシーに配慮する',
      '適切な敬語を使用する',
    ],
    quiz: {
      question: '高齢者との関係で大切なことは？',
      options: [
        '年齢による区別をする',
        '過去の経験を軽視する',
        '経験と知恵を尊重する',
        '若者の価値観を押し付ける',
      ],
      correctIndex: 2,
    },
  },
  {
    id: 'safety',
    title: '安全とプライバシー',
    description: '安心できる環境づくりのために',
    icon: Shield,
    content: [
      '個人情報の適切な取り扱い',
      '緊急時の対応手順',
      '健康上の注意点',
      '活動における安全確保',
    ],
    quiz: {
      question: '個人情報を取り扱う際の原則は？',
      options: [
        '必要に応じて共有する',
        'SNSで共有する',
        '厳重に管理し保護する',
        '記録として保存する',
      ],
      correctIndex: 2,
    },
  },
];

export default function VolunteerTrainingScreen({ onNext, onBack }: Props) {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentModule = trainingModules[currentModuleIndex];

  const handleNext = () => {
    if (showQuiz) {
      if (currentModuleIndex < trainingModules.length - 1) {
        setCurrentModuleIndex(currentModuleIndex + 1);
        setShowQuiz(false);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        onNext();
      }
    } else {
      setShowQuiz(true);
    }
  };

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setIsCorrect(index === currentModule.quiz?.correctIndex);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6"
    >
      {/* Progress Indicator */}
      <div className="flex justify-center gap-2 mb-8">
        {trainingModules.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentModuleIndex
                ? 'bg-indigo-600'
                : index < currentModuleIndex
                ? 'bg-indigo-200'
                : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!showQuiz ? (
          // Training Content
          <motion.div
            key="content"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="inline-block p-3 bg-indigo-100 rounded-full mb-4">
                <currentModule.icon className="w-8 h-8 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-medium text-gray-900">
                {currentModule.title}
              </h2>
              <p className="text-gray-600 mt-2">
                {currentModule.description}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
              {currentModule.content.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                  <p className="text-gray-700">{point}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          // Quiz Section
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-medium text-gray-900">
                理解度チェック
              </h2>
              <p className="text-gray-600 mt-2">
                {currentModule.quiz?.question}
              </p>
            </div>

            <div className="space-y-4">
              {currentModule.quiz?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={isCorrect !== null}
                  className={`w-full p-4 rounded-xl text-left transition-colors ${
                    selectedAnswer === index
                      ? isCorrect
                        ? 'bg-green-100 border-2 border-green-500'
                        : 'bg-red-100 border-2 border-red-500'
                      : 'bg- white border-2 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === index
                        ? isCorrect
                          ? 'border-green-500 bg-green-500'
                          : 'border-red-500 bg-red-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedAnswer === index && (
                        <div className="w-3 h-3 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-gray-900">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {isCorrect !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl ${
                  isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                }`}
              >
                {isCorrect
                  ? '正解です！次のステップに進みましょう。'
                  : 'もう一度考えてみましょう。'}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={onBack}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          戻る
        </button>
        <button
          onClick={handleNext}
          disabled={showQuiz && isCorrect === null}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentModuleIndex === trainingModules.length - 1 && showQuiz && isCorrect !== null
            ? '完了'
            : '次へ'}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}