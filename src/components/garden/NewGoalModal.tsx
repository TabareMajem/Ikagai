import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Flower2, TreePine, Sprout, Heart, Brain, Users, Plus, Minus } from 'lucide-react';

interface Props {
  onClose: () => void;
  onPlant: (goal: any) => void;
}

const plantTypes = [
  { id: 'sakura', name: '桜', icon: Flower2, color: 'pink' },
  { id: 'pine', name: '松', icon: TreePine, color: 'green' },
  { id: 'bamboo', name: '竹', icon: Sprout, color: 'emerald' },
];

const goalTypes = [
  { id: 'health', name: '健康', icon: Heart },
  { id: 'skill', name: 'スキル', icon: Brain },
  { id: 'relationship', name: '人間関係', icon: Users },
];

export default function NewGoalModal({ onClose, onPlant }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedType, setSelectedType] = useState('health');
  const [selectedPlant, setSelectedPlant] = useState('sakura');
  const [shareWithFamily, setShareWithFamily] = useState(false);
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
    onPlant({
      title,
      description,
      type: selectedType,
      plantType: selectedPlant,
      shareWithFamily,
      milestones: milestones.filter(m => m.trim() !== ''),
    });
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
            <h2 className="text-xl font-medium text-gray-800">新しい目標を植える</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Goal Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                目標タイトル
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

            {/* Goal Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                目標の説明
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Goal Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                目標の種類
              </label>
              <div className="flex gap-4">
                {goalTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(type.id)}
                    className={`flex-1 p-3 rounded-lg border-2 transition-colors ${
                      selectedType === type.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <type.icon className="w-6 h-6 mx-auto mb-1 text-gray-700" />
                    <span className="text-sm font-medium text-gray-900">{type.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Plant Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                植物を選ぶ
              </label>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {plantTypes.map((plant) => (
                  <button
                    key={plant.id}
                    type="button"
                    onClick={() => setSelectedPlant(plant.id)}
                    className={`flex-none w-24 p-4 rounded-lg border-2 transition-colors ${
                      selectedPlant === plant.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <plant.icon className={`w-8 h-8 mx-auto mb-2 text-${plant.color}-500`} />
                    <span className="text-sm font-medium text-gray-900">{plant.name}</span>
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

            {/* Share with Family */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">家族と共有する</span>
              <button
                type="button"
                onClick={() => setShareWithFamily(!shareWithFamily)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  shareWithFamily ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    shareWithFamily ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
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
                目標を植える
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}