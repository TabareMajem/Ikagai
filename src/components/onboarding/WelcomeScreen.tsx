import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, ChevronRight, Heart, HandHeart } from 'lucide-react';

interface Props {
  onNext: (userType: 'elder' | 'volunteer') => void;
}

const languages = [
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
];

export default function WelcomeScreen({ onNext }: Props) {
  const [selectedLanguage, setSelectedLanguage] = useState('ja');
  const [showLanguages, setShowLanguages] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<'elder' | 'volunteer' | null>(null);

  const handleContinue = () => {
    if (selectedUserType) {
      onNext(selectedUserType);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6"
    >
      {/* Garden Background */}
      <div className="relative h-48 rounded-xl overflow-hidden mb-8">
        <img
          src="https://images.unsplash.com/photo-1614593748720-8d6c8bd12cdf?w=800&h=300&fit=crop"
          alt="Japanese Garden"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
        
        {/* Animated Cherry Blossoms */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-pink-200 rounded-full opacity-80"
              initial={{
                x: Math.random() * 100 + '%',
                y: -20,
                rotate: 0
              }}
              animate={{
                x: Math.random() * 100 + '%',
                y: '120%',
                rotate: 360
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: 'linear',
                delay: Math.random() * 2
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Welcome Text */}
      <div className="text-center space-y-4 mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-medium text-gray-900"
        >
          ようこそ、いきがいアプリへ！
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-gray-600"
        >
          あなたの毎日に、もっと喜びと目的を
        </motion.p>
      </div>

      {/* User Type Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4 mb-8"
      >
        <h2 className="text-lg font-medium text-gray-900 text-center mb-4">
          ご利用の目的を教えてください
        </h2>
        <button
          onClick={() => setSelectedUserType('elder')}
          className={`w-full flex items-center gap-4 p-6 rounded-xl transition-colors ${
            selectedUserType === 'elder'
              ? 'bg-indigo-50 border-2 border-indigo-500'
              : 'bg-white border-2 border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="p-3 bg-indigo-100 rounded-full">
            <Heart className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-medium text-gray-900">
              ご利用者様
            </h3>
            <p className="text-sm text-gray-600">
              健康的な生活を楽しみ、家族や友人とつながりたい方
            </p>
          </div>
        </button>

        <button
          onClick={() => setSelectedUserType('volunteer')}
          className={`w-full flex items-center gap-4 p-6 rounded-xl transition-colors ${
            selectedUserType === 'volunteer'
              ? 'bg-indigo-50 border-2 border-indigo-500'
              : 'bg-white border-2 border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="p-3 bg-indigo-100 rounded-full">
            <HandHeart className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-medium text-gray-900">
              ボランティア
            </h3>
            <p className="text-sm text-gray-600">
              高齢者の方々をサポートし、地域社会に貢献したい方
            </p>
          </div>
        </button>
      </motion.div>

      {/* Language Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <button
          onClick={() => setShowLanguages(!showLanguages)}
          className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Globe className="w-6 h-6 text-gray-600" />
            <span className="text-lg text-gray-900">
              {languages.find(lang => lang.code === selectedLanguage)?.name}
            </span>
          </div>
          <ChevronRight className="w-6 h-6 text-gray-400" />
        </button>

        {/* Language Options */}
        {showLanguages && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 bg-white rounded-xl shadow-lg overflow-hidden"
          >
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => {
                  setSelectedLanguage(language.code);
                  setShowLanguages(false);
                }}
                className={`w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors ${
                  selectedLanguage === language.code ? 'bg-indigo-50' : ''
                }`}
              >
                <span className="text-2xl">{language.flag}</span>
                <span className="text-lg text-gray-900">{language.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Continue Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onClick={handleContinue}
        disabled={!selectedUserType}
        className="w-full p-4 bg-indigo-600 text-white text-xl rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        はじめる
        <ChevronRight className="w-6 h-6" />
      </motion.button>
    </motion.div>
  );
}