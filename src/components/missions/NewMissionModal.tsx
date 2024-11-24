import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Users, Calendar, Target, Plus, Minus } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export default function NewMissionModal({ onClose }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('1週間');
  const [milestones, setMilestones] = useState(['']);

  const addMilestone = () => {
    if (milestones.length < 5) {
      setMilestones([...milestones, '']);
    }
  };

  const removeMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  const updateMilestone = (index: number, value: string) => {
    const newMilestones = [...milestones];
    newMilestones[index] = value;
    setMilestones(newMilestones);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle mission creation
    onClose();
  };

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
            <h2 className="text-xl font-medium text-gray-800">新しいミッションを作成</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Mission Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                ミッションタイトル
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            {/* Mission Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                ミッションの説明
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                期間
              </label>
              <div className="grid grid-cols-3 gap-4">
                {['1週間', '2週間', '1ヶ月'].map((period) => (
                  <button
                    key={period}
                    type="button"
                    onClick={() => setDuration(period)}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      duration === period
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Calendar className="w-5 h-5 mx-auto mb-1 text-gray-700" />
                    <span className="text-sm font-medium text-gray-900">{period}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Milestones */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  マイルストーン
                </label>
                {milestones.length < 5 && (
                  <button
                    type="button"
                    onClick={addMilestone}
                    className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    追加
                  </button>
                )}
              </div>
              <div className="space-y-3">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={milestone}
                      onChange={(e) => updateMilestone(index, e.target.value)}
                      placeholder={`マイルストーン ${index + 1}`}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {milestones.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMilestone(index)}
                        className="p-2 text-gray-400 hover:text-gray-600"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Participants */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                参加者を選ぶ
              </label>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-600">全員を招待</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                キャンセル
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                作成する
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}