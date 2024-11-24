import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Clock, Users, MessageCircle, Target, Award } from 'lucide-react';

interface Mission {
  id: number;
  title: string;
  description: string;
  category: string;
  elder: {
    name: string;
    avatar: string;
    location: string;
  };
  timeCommitment: string;
  impact: string;
  participants: number;
  maxParticipants: number;
}

interface Props {
  mission: Mission;
  onClose: () => void;
}

export default function MissionDetailsModal({ mission, onClose }: Props) {
  const [showChat, setShowChat] = useState(false);

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
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-medium text-gray-900">{mission.title}</h2>
              <p className="text-gray-600 mt-1">{mission.description}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Elder Info */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl mb-6">
            <img
              src={mission.elder.avatar}
              alt={mission.elder.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-medium text-gray-900">{mission.elder.name}</h3>
              <p className="text-gray-600">{mission.elder.location}</p>
              <button
                onClick={() => setShowChat(true)}
                className="flex items-center gap-2 mt-2 text-sm text-indigo-600 hover:text-indigo-700"
              >
                <MessageCircle className="w-4 h-4" />
                メッセージを送る
              </button>
            </div>
          </div>

          {/* Mission Details */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">所要時間</span>
                </div>
                <p className="font-medium text-gray-900">{mission.timeCommitment}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">参加人数</span>
                </div>
                <p className="font-medium text-gray-900">
                  {mission.participants}/{mission.maxParticipants}人
                </p>
              </div>
            </div>

            {/* Impact */}
            <div className="p-4 bg-indigo-50 rounded-xl">
              <div className="flex items-center gap-2 text-indigo-600 mb-2">
                <Target className="w-5 h-5" />
                <span className="font-medium">期待される効果</span>
              </div>
              <p className="text-indigo-900">{mission.impact}</p>
            </div>

            {/* Rewards */}
            <div className="p-4 bg-yellow-50 rounded-xl">
              <div className="flex items-center gap-2 text-yellow-600 mb-2">
                <Award className="w-5 h-5" />
                <span className="font-medium">獲得ポイント</span>
              </div>
              <p className="text-yellow-900">このミッションで500ポイント獲得できます</p>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-6">
            <button className="w-full px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors">
              ミッションに参加する
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}