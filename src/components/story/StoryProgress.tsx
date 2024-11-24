import React from 'react';
import { motion } from 'framer-motion';

interface Chapter {
  id: number;
  title: string;
  progress: number;
  completed: boolean;
}

interface Props {
  chapters: Chapter[];
  currentChapter: number;
}

export default function StoryProgress({ chapters, currentChapter }: Props) {
  return (
    <div className="relative">
      {/* Progress Line */}
      <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200">
        <motion.div
          className="h-full bg-indigo-500"
          initial={{ width: 0 }}
          animate={{
            width: `${(currentChapter / (chapters.length - 1)) * 100}%`,
          }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Chapter Points */}
      <div className="relative flex justify-between">
        {chapters.map((chapter, index) => (
          <div
            key={chapter.id}
            className="flex flex-col items-center"
          >
            <motion.div
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                index <= currentChapter
                  ? 'border-indigo-500 bg-indigo-500 text-white'
                  : 'border-gray-300 bg-white text-gray-500'
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {chapter.completed ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span className="text-sm">{index + 1}</span>
              )}
            </motion.div>
            <span className="mt-2 text-xs font-medium text-gray-600">
              {chapter.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}