import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';

interface Props {
  onClose: () => void;
}

const languages = [
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
];

export default function LanguageSettings({ onClose }: Props) {
  const [selectedLanguage, setSelectedLanguage] = useState('ja');

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
            <h2 className="text-xl font-medium text-gray-800">言語設定</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="space-y-2">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => setSelectedLanguage(language.code)}
                className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${
                  selectedLanguage === language.code
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{language.flag}</span>
                  <span className="text-sm font-medium">{language.name}</span>
                </div>
                {selectedLanguage === language.code && (
                  <Check className="w-5 h-5" />
                )}
              </button>
            ))}
          </div>

          {/* Save Button */}
          <div className="mt-8">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              言語を変更
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}