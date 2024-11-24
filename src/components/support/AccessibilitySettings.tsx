import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Type, Volume2, Eye } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export default function AccessibilitySettings({ onClose }: Props) {
  const [fontSize, setFontSize] = useState('medium');
  const [contrast, setContrast] = useState(false);
  const [textToSpeech, setTextToSpeech] = useState(false);

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
            <h2 className="text-xl font-medium text-gray-800">アクセシビリティ設定</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Font Size */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-100 rounded-full">
                  <Type className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    文字サイズ
                  </h3>
                  <p className="text-sm text-gray-500">
                    テキストの表示サイズを調整します
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {['small', 'medium', 'large'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      fontSize === size
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className={`font-medium text-gray-900 ${
                      size === 'small' ? 'text-sm' :
                      size === 'medium' ? 'text-base' :
                      'text-lg'
                    }`}>
                      {size === 'small' ? '小' :
                       size === 'medium' ? '中' :
                       '大'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* High Contrast */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-full">
                  <Eye className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    ハイコントラストモード
                  </h3>
                  <p className="text-sm text-gray-500">
                    テキストと背景のコントラストを強調します
                  </p>
                </div>
              </div>
              <button
                onClick={() => setContrast(!contrast)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  contrast ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    contrast ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Text to Speech */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-full">
                  <Volume2 className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    テキスト読み上げ
                  </h3>
                  <p className="text-sm text-gray-500">
                    画面のテキストを音声で読み上げます
                  </p>
                </div>
              </div>
              <button
                onClick={() => setTextToSpeech(!textToSpeech)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  textToSpeech ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    textToSpeech ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              設定を保存
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}