import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Minus } from 'lucide-react';

interface User {
  name: string;
  role: string;
  interests: string[];
  healthGoals: string[];
}

interface Props {
  user: User;
  onClose: () => void;
}

export default function EditProfileModal({ user, onClose }: Props) {
  const [name, setName] = useState(user.name);
  const [interests, setInterests] = useState(user.interests);
  const [healthGoals, setHealthGoals] = useState(user.healthGoals);

  const addInterest = () => {
    if (interests.length < 5) {
      setInterests([...interests, '']);
    }
  };

  const removeInterest = (index: number) => {
    setInterests(interests.filter((_, i) => i !== index));
  };

  const updateInterest = (index: number, value: string) => {
    const newInterests = [...interests];
    newInterests[index] = value;
    setInterests(newInterests);
  };

  const addHealthGoal = () => {
    if (healthGoals.length < 5) {
      setHealthGoals([...healthGoals, '']);
    }
  };

  const removeHealthGoal = (index: number) => {
    setHealthGoals(healthGoals.filter((_, i) => i !== index));
  };

  const updateHealthGoal = (index: number, value: string) => {
    const newHealthGoals = [...healthGoals];
    newHealthGoals[index] = value;
    setHealthGoals(newHealthGoals);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile update
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
            <h2 className="text-xl font-medium text-gray-800">プロフィールを編集</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                お名前
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            {/* Interests */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  興味・関心
                </label>
                {interests.length < 5 && (
                  <button
                    type="button"
                    onClick={addInterest}
                    className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    追加
                  </button>
                )}
              </div>
              <div className="space-y-3">
                {interests.map((interest, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={interest}
                      onChange={(e) => updateInterest(index, e.target.value)}
                      placeholder={`興味・関心 ${index + 1}`}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {interests.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeInterest(index)}
                        className="p-2 text-gray-400 hover:text-gray-600"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Health Goals */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  健康目標
                </label>
                {healthGoals.length < 5 && (
                  <button
                    type="button"
                    onClick={addHealthGoal}
                    className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    追加
                  </button>
                )}
              </div>
              <div className="space-y-3">
                {healthGoals.map((goal, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={goal}
                      onChange={(e) => updateHealthGoal(index, e.target.value)}
                      placeholder={`健康目標 ${index + 1}`}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {healthGoals.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeHealthGoal(index)}
                        className="p-2 text-gray-400 hover:text-gray-600"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
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
                保存する
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}