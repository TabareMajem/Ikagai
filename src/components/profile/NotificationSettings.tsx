import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export default function NotificationSettings({ onClose }: Props) {
  const notifications = [
    {
      id: 'goals',
      title: '目標の通知',
      description: '目標の進捗や達成に関する通知',
      enabled: true,
    },
    {
      id: 'messages',
      title: 'メッセージ通知',
      description: '新しいメッセージの受信通知',
      enabled: true,
    },
    {
      id: 'family',
      title: '家族の活動',
      description: '家族の活動に関する通知',
      enabled: true,
    },
    {
      id: 'missions',
      title: 'ミッション通知',
      description: '新しいミッションや進捗の通知',
      enabled: false,
    },
    {
      id: 'story',
      title: 'ストーリー更新',
      description: '新しいストーリーの追加通知',
      enabled: true,
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
            <h2 className="text-xl font-medium text-gray-800">通知設定</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="space-y-6">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-center justify-between"
              >
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {notification.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {notification.description}
                  </p>
                </div>
                <button
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notification.enabled ? 'bg-indigo-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notification.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
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