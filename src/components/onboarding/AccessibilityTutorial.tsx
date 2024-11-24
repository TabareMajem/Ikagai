import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Type, Eye, Volume2, Settings } from 'lucide-react';

interface Props {
  onNext: () => void;
}

export default function AccessibilityTutorial({ onNext }: Props) {
  const [previewFontSize, setPreviewFontSize] = useState<'normal' | 'large'>('normal');
  const [previewContrast, setPreviewContrast] = useState<'normal' | 'high'>('normal');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6"
    >
      {/* Title and Description */}
      <div className="text-center space-y-4 mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-medium text-gray-900"
        >
          アクセシビリティ設定
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-gray-600"
        >
          文字サイズやコントラストを調整できます。
          <br />
          快適にご利用いただくために、お好みの設定をお選びください。
        </motion.p>
      </div>

      {/* Feature Previews */}
      <div className="space-y-8 mb-8">
        {/* Font Size Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-full">
                <Type className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">文字サイズ</h3>
            </div>
            <button
              onClick={() => setPreviewFontSize(prev => prev === 'normal' ? 'large' : 'normal')}
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              プレビュー切替
            </button>
          </div>
          <div className={`p-4 bg-gray-50 rounded-lg ${
            previewFontSize === 'large' ? 'text-lg' : 'text-base'
          }`}>
            <p className="text-gray-900">
              文字サイズを大きくすると、テキストが読みやすくなります。
            </p>
          </div>
        </motion.div>

        {/* Contrast Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-full">
                <Eye className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">コントラスト</h3>
            </div>
            <button
              onClick={() => setPreviewContrast(prev => prev === 'normal' ? 'high' : 'normal')}
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              プレビュー切替
            </button>
          </div>
          <div className={`p-4 rounded-lg ${
            previewContrast === 'high' 
              ? 'bg-gray-900 text-white' 
              : 'bg-gray-50 text-gray-900'
          }`}>
            <p>
              コントラストを高くすると、テキストがより見やすくなります。
            </p>
          </div>
        </motion.div>

        {/* Voice Guidance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-100 rounded-full">
              <Volume2 className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">音声ガイド</h3>
          </div>
          <p className="text-gray-600">
            画面の内容を音声で読み上げることができます。
          </p>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          onClick={onNext}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
        >
          <Settings className="w-5 h-5" />
          設定に移動
        </motion.button>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          onClick={onNext}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
        >
          後で変更
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
}