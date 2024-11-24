import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles, ChevronRight } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

export default function CompletionScreen({ onComplete }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6"
    >
      {/* Celebration Animation */}
      <div className="relative h-64 bg-gradient-to-b from-indigo-50 to-pink-50 rounded-2xl overflow-hidden mb-8">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.3 
          }}
        >
          {/* Sparkles Animation */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                opacity: 0,
                scale: 0,
                x: 0,
                y: 0,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: Math.cos(i * 30 * Math.PI / 180) * 100,
                y: Math.sin(i * 30 * Math.PI / 180) * 100,
              }}
              transition={{
                duration: 2,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 1
              }}
            >
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </motion.div>
          ))}

          {/* AI Companion */}
          <motion.div
            className="relative z-10"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center">
              <Bot className="w-12 h-12 text-indigo-600" />
            </div>
          </motion.div>
        </motion.div>

        {/* Background Decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-pink-100/50 rounded-full blur-2xl" />
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-indigo-100/50 rounded-full blur-2xl" />
        </div>
      </div>

      {/* Congratulatory Message */}
      <div className="text-center space-y-4 mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-medium text-gray-900"
        >
          おめでとうございます！
          <br />
          準備ができました
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-gray-600"
        >
          さあ、いきがいアプリを楽しみましょう
          <br />
          あなたの新しい一歩を応援します
        </motion.p>
      </div>

      {/* Start Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        onClick={onComplete}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-indigo-600 text-white text-lg rounded-xl hover:bg-indigo-700 transition-colors"
      >
        始める
        <ChevronRight className="w-6 h-6" />
      </motion.button>

      {/* Additional Message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-center text-sm text-gray-500 mt-4"
      >
        いつでもサポートが必要な時は、AIコンパニオンにお声がけください
      </motion.p>
    </motion.div>
  );
}