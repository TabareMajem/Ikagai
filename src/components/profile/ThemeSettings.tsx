import React from 'react';
import { motion } from 'framer-motion';
import { X, Sun, Moon, Flower2, Leaf } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export default function ThemeSettings({ onClose }: Props) {
  const themes = [
    {
      id: 'spring',
      name: '春',
      icon: Flower2,
      colors: ['bg-pink-100', 'bg-green-100'],
    },
    {
      id: 'summer',
      name: '夏',
      icon: Sun,
      colors: ['bg-blue-100', 'bg-yellow-100'],
    },
    {
      id: 'autumn',
      name: '秋',
      icon: Leaf,
      colors: ['bg-orange-100', 'bg-red-100'],
    },
    {
      id: 'winter',
      name: '冬',
      icon: Moon,
      colors: ['bg-indigo-100', 'bg-purple-100'],
    },
  ];

  return (
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
            <h2 className="text-xl font-medium text-gray-800">テーマ設定</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {themes.map((theme) => (
              <button
                key={theme.id}
                className="p-4 rounded-xl border-2 border-gray-200 hover:border-indigo-500 transition-colors"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 bg-gray-100 rounded-full">
                    <theme.icon className="w-6 h-6 text-gray-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {theme.name}
                  </span>
                  <div className="flex gap-2">
                    {theme.colors.map((color, index) => (
                      <div
                        key={index}
                        className={`w-4 h-4 rounded-full ${color}`}
                      />
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Save Button */}
          <div className="mt-8">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              テーマを適用
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}