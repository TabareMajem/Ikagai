import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check, Shield, Heart, AlertCircle } from 'lucide-react';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const guidelines = [
  {
    icon: Shield,
    title: 'プライバシーの保護',
    points: [
      '個人情報は厳重に管理し、無断で共有しない',
      '活動中に知り得た情報は秘密として保持する',
      '写真や動画の撮影・共有は事前に許可を得る',
    ],
  },
  {
    icon: Heart,
    title: '思いやりと敬意',
    points: [
      '相手の立場や気持ちを常に考える',
      '丁寧な言葉遣いと適切な敬語を使用する',
      '文化的背景や価値観の違いを尊重する',
    ],
  },
  {
    icon: AlertCircle,
    title: '安全とコンプライアンス',
    points: [
      '活動中の事故防止に細心の注意を払う',
      '緊急時の連絡体制を常に確認する',
      'ハラスメント行為は一切禁止',
    ],
  },
];

export default function VolunteerGuidelinesScreen({ onNext, onBack }: Props) {
  const [accepted, setAccepted] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6"
    >
      <div className="space-y-8">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-2xl font-medium text-gray-900">
            コミュニティガイドライン
          </h2>
          <p className="text-gray-600 mt-2">
            安全で信頼できるコミュニティを維持するために、
            <br />
            以下のガイドラインを必ずお守りください。
          </p>
        </div>

        {/* Guidelines */}
        <div className="space-y-6">
          {guidelines.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-100 rounded-full">
                  <section.icon className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  {section.title}
                </h3>
              </div>
              <ul className="space-y-3">
                {section.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1">
                      <Check className="w-4 h-4 text-indigo-600" />
                    </div>
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Agreement Checkbox */}
        <div className="bg-indigo-50 rounded-xl p-6">
          <label className="flex items-start gap-3 cursor-pointer">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="w-5 h-5 border-2 border-indigo-500 rounded checked:bg-indigo-500 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <span className="text-sm text-indigo-900">
              上記のガイドラインを読み、理解し、遵守することに同意します。
              違反があった場合、アカウントが停止される可能性があることを理解しています。
            </span>
          </label>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            戻る
          </button>
          <button
            onClick={onNext}
            disabled={!accepted}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            同意して次へ
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}