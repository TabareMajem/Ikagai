import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

export default function GardenCompanion() {
  return (
    <motion.div
      className="absolute bottom-8 right-8 flex items-end gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="relative">
        <div className="absolute bottom-full mb-2 right-0 w-48">
          <div className="bg-white p-3 rounded-xl shadow-sm">
            <p className="text-sm text-gray-700">
              目標達成に向けて頑張っていますね！
              <br />
              今日も一緒に進みましょう！
            </p>
          </div>
          <div className="absolute bottom-0 right-6 w-3 h-3 bg-white transform rotate-45 translate-y-1.5" />
        </div>
        <div className="bg-indigo-100 p-4 rounded-full">
          <Bot className="w-8 h-8 text-indigo-600" />
        </div>
      </div>
    </motion.div>
  );
}