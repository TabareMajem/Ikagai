import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Flower2, Info } from 'lucide-react';

interface Props {
  onNext: () => void;
}

export default function DarumaGardenIntroScreen({ onNext }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6"
    >
      {/* Garden Visualization */}
      <div className="relative h-64 bg-gradient-to-b from-pink-50 to-green-50 rounded-2xl overflow-hidden mb-8">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-green-100/30 to-transparent" />
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-pink-100/20 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-blue-100/20 rounded-full blur-3xl" />
        </div>

        {/* Example Plants */}
        <div className="relative h-full">
          {[...Array(3)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.2 }}
              className={`absolute ${
                index === 0 ? 'bottom-12 left-12' :
                index === 1 ? 'bottom-20 right-16' :
                'bottom-16 left-1/2 -translate-x-1/2'
              }`}
            >
              <div className="flex flex-col items-center">
                <Flower2 className={`w-12 h-12 ${
                  index === 0 ? 'text-pink-400' :
                  index === 1 ? 'text-purple-400' :
                  'text-blue-400'
                }`} />
                <div className={`h-16 w-1 ${
                  index === 0 ? 'bg-pink-200' :
                  index === 1 ? 'bg-purple-200' :
                  'bg-blue-200'
                }`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Title and Description */}
      <div className="text-center space-y-4 mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-medium text-gray-900"
        >
          だるまの庭とは？
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-600"
        >
          目標を設定し、その進捗を美しい庭で視覚化しましょう。
          <br />
          あなたの成長とともに、庭も豊かに育っていきます。
        </motion.p>
      </div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl p-6 shadow-sm mb-8"
      >
        <div className="flex items-center gap-3 text-gray-600">
          <Info className="w-5 h-5 text-indigo-600" />
          <p className="text-sm">
            目標を立てると、庭に新しい植物が芽生えます。
            進捗に応じて成長し、達成時には美しい花を咲かせます。
          </p>
        </div>
      </motion.div>

      {/* Navigation Buttons */}
      <div className="space-y-4">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={onNext}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
        >
          次へ
          <ChevronRight className="w-5 h-5" />
        </motion.button>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
        >
          もっと知る
          <Info className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
}