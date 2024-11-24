import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Edit2, Trash2, AlertCircle } from 'lucide-react';
import GoalProgress from './GoalProgress';
import DeleteConfirmation from './DeleteConfirmation';

interface Milestone {
  text: string;
  completed: boolean;
}

interface Goal {
  id: number;
  title: string;
  progress: number;
  milestones: Milestone[];
  plantType: string;
}

interface Props {
  goal: Goal;
  onClose: () => void;
  onDelete?: (goalId: number) => void;
  onUpdateProgress?: (goalId: number, progress: number) => void;
  onToggleMilestone?: (goalId: number, index: number) => void;
}

export default function GoalModal({ goal, onClose, onDelete, onUpdateProgress, onToggleMilestone }: Props) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    onDelete?.(goal.id);
    onClose();
  };

  const getMotivationalMessage = () => {
    if (goal.progress < 30) {
      return "始まりが大切です。一歩一歩進んでいきましょう！";
    } else if (goal.progress < 70) {
      return "素晴らしい進捗です！この調子で頑張りましょう！";
    } else {
      return "目標達成まであと少し！最後まで頑張りましょう！";
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-end z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="w-full bg-white rounded-t-3xl overflow-hidden"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-b from-indigo-50 to-white px-6 pt-6 pb-8">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-medium text-gray-800">{goal.title}</h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/50 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Progress Circle */}
            <GoalProgress progress={goal.progress} plantType={goal.plantType} />
          </div>

          {/* Content */}
          <div className="px-6 pb-6 space-y-6">
            {/* Milestones */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700">マイルストーン</h4>
              <div className="space-y-2">
                {goal.milestones.map((milestone, index) => (
                  <button
                    key={index}
                    onClick={() => onToggleMilestone?.(goal.id, index)}
                    className="w-full flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      milestone.completed ? 'border-green-500 bg-green-500' : 'border-gray-300'
                    }`}>
                      {milestone.completed && (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-sm ${milestone.completed ? 'text-gray-600' : 'text-gray-800'}`}>
                      {milestone.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Companion Message */}
            <div className="bg-indigo-50 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-indigo-100 rounded-full">
                  <AlertCircle className="w-5 h-5 text-indigo-600" />
                </div>
                <p className="text-sm text-gray-700">{getMotivationalMessage()}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                <span>目標を編集</span>
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center justify-center gap-2 px-4 py-2 border border-red-200 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>目標を削除</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <DeleteConfirmation
            onConfirm={handleDelete}
            onCancel={() => setShowDeleteConfirm(false)}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}