import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

export default function StoryCompanion() {
  return (
    <motion.div
      className="fixed bottom-24 right-6 z-10"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="relative">
        <div className="absolute bottom-full mb-2 right-0">
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm max-w-xs">
            <p className="text-sm text-gray-700">
              桜の花見は、日本の大切な文化の一つです。
              家族や友達と一緒に過ごす特別な時間なんですよ。
            </p>
          </div>
          <div className="absolute bottom-0 right-6 w-3 h-3 bg-white transform rotate-45 translate-y-1.5" />
        </div>
        <button className="p-3 bg-indigo-100 rounded-full shadow-sm hover:bg-indigo-200 transition-colors">
          <Bot className="w-6 h-6 text-indigo-600" />
        </button>
      </div>
    </motion.div>
  );
}