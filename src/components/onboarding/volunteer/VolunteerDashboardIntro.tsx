import React from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  Users, 
  Calendar, 
  MessageSquare, 
  Award,
  Star
} from 'lucide-react';

interface Props {
  onComplete: () => void;
}

const features = [
  {
    icon: Users,
    title: 'マッチング',
    description: 'あなたのスキルと時間に合った活動を見つけられます',
  },
  {
    icon: Calendar,
    title: 'スケジュール管理',
    description: '活動予定を簡単に管理できます',
  },
  {
    icon: MessageSquare,
    title: 'コミュニケーション',
    description: '高齢者の方々や他のボランティアと安全にメッセージのやり取りができます',
  },
  {
    icon: Award,
    title: '実績とフィードバック',
    description: '活動実績を記録し、感謝の声を受け取れます',
  },
];

export default function VolunteerDashboardIntro({ onComplete }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6"
    >
      {/* Welcome Section */}
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-indigo-100 rounded-full mb-4">
          <Star className="w-8 h-8 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-medium text-gray-900">
          準備が整いました！
        </h2>
        <p className="text-gray-600 mt-2">
          ボランティア活動を始める準備が整いました。
          <br />
          ダッシュボードから活動を開始できます。
        </p>
      </div>

      {/* Features Overview */}
      <div className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-sm"
          >
            <div className="p-2 bg-indigo-100 rounded-full">
              <feature.icon className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* First Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-indigo-50 rounded-xl p-6 mb-8"
      >
        <h3 className="font-medium text-indigo-900 mb-4">
          最初のステップ
        </h3>
        <ul className="space-y-3">
          <li className="flex items-center gap-3 text-indigo-800">
            <div className="w-6 h-6 bg-indigo-200 rounded-full flex items-center justify-center text-sm">
              1
            </div>
            <span>活動できる日時を設定する</span>
          </li>
          <li className="flex items-center gap-3 text-indigo-800">
            <div className="w-6 h-6 bg-indigo-200 rounded-full flex items-center justify-center text-sm">
              2
            </div>
            <span>興味のある活動を探す</span>
          </li>
          <li className="flex items-center gap-3 text-indigo-800">
            <div className="w-6 h-6 bg-indigo-200 rounded-full flex items-center justify-center text-sm">
              3
            </div>
            <span>最初の活動に参加する</span>
          </li>
        </ul>
      </motion.div>

      {/* Start Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        onClick={onComplete}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
      >
        ダッシュボードへ
        <ChevronRight className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
}