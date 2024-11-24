import React from 'react';
import { motion } from 'framer-motion';
import { X, Users, Eye, Lock } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export default function PrivacySettings({ onClose }: Props) {
  const privacySettings = [
    {
      id: 'profile',
      title: 'プロフィール表示',
      description: 'プロフィール情報の公開範囲',
      options: ['家族のみ', '友達まで', '全員に公開'],
      current: '家族のみ',
      icon: Users,
    },
    {
      id: 'garden',
      title: '庭の公開設定',
      description: '目標の進捗状況の公開範囲',
      options: ['非公開', '家族のみ', '全員に公開'],
      current: '家族のみ',
      icon: Eye,
    },
    {
      id: 'activity',
      title: '活動の表示',
      description: '活動履歴の表示設定',
      options: ['非公開', '家族のみ', '友達まで'],
      current: '友達まで',
      icon: Lock,
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
            <h2 className="text-xl font-medium text-gray-800">プライバシー設定</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="space-y-6">
            {privacySettings.map((setting) => (
              <div key={setting.id} className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-full">
                    <setting.icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {setting.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {setting.description}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {setting.options.map((option) => (
                    <button
                      key={option}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        setting.current === option
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
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