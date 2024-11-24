import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Lock } from 'lucide-react';

interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  progress: number;
  completed: boolean;
}

interface Props {
  chapters: Chapter[];
  currentChapter: number;
  onSelect: (index: number) => void;
  onClose: () => void;
}

export default function ChaptersList({ chapters, currentChapter, onSelect, onClose }: Props) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="w-full max-w-lg bg-white rounded-2xl overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={e => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium text-gray-800">チャプター一覧</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              {chapters.map((chapter, index) => (
                <button
                  key={chapter.id}
                  onClick={() => {
                    onSelect(index);
                    onClose();
                  }}
                  disabled={index > currentChapter + 1}
                  className={`w-full p-4 rounded-xl transition-colors ${
                    index === currentChapter
                      ? 'bg-indigo-50 border-2 border-indigo-500'
                      : index > currentChapter + 1
                      ? 'bg-gray-50 opacity-50 cursor-not-allowed'
                      : 'bg-white hover:bg-gray-50 border-2 border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-full ${
                      chapter.completed ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      {chapter.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : index > currentChapter + 1 ? (
                        <Lock className="w-5 h-5 text-gray-400" />
                      ) : (
                        <span className="w-5 h-5 flex items-center justify-center text-sm font-medium text-gray-600">
                          {index + 1}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-sm font-medium text-gray-900">
                        {chapter.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {chapter.subtitle}
                      </p>
                      {chapter.progress > 0 && chapter.progress < 100 && (
                        <div className="mt-2">
                          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-indigo-500 rounded-full"
                              style={{ width: `${chapter.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}