import React from 'react';
import { motion } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';

interface Props {
  onClose: () => void;
}

const faqs = [
  {
    question: 'アプリの使い方がわかりません',
    answer: 'ホーム画面の「チュートリアル」から基本的な使い方をご確認いただけます。また、各機能には説明が付いていますので、そちらもご参照ください。',
  },
  {
    question: 'パスワードを忘れてしまいました',
    answer: 'ログイン画面の「パスワードを忘れた方」から、登録されているメールアドレスにパスワードリセットのリンクをお送りできます。',
  },
  {
    question: '家族を招待するにはどうすればいいですか？',
    answer: 'プロフィール画面から「家族を招待」を選択し、招待したい方のメールアドレスを入力してください。',
  },
  {
    question: '通知設定を変更したい',
    answer: '設定画面の「通知設定」から、受け取りたい通知の種類を選択できます。',
  },
  {
    question: 'アプリのデータを削除したい',
    answer: '設定画面の「アカウント設定」から、データの削除やアカウントの削除が可能です。この操作は取り消すことができませんのでご注意ください。',
  },
];

export default function FAQSection({ onClose }: Props) {
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
            <h2 className="text-xl font-medium text-gray-800">よくある質問</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-gray-50 rounded-lg"
              >
                <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                  <span className="text-sm font-medium text-gray-900">
                    {faq.question}
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-4 pb-4">
                  <p className="text-sm text-gray-600">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>

          {/* Contact Support Button */}
          <div className="mt-8">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              サポートに問い合わせる
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}