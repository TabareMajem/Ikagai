import React from 'react';
import { motion } from 'framer-motion';

const missions = [
  {
    id: 1,
    title: '家族で料理を学ぼう',
    description: 'おばあちゃんの得意料理を一緒に作る',
    progress: 75,
    participants: ['田中花子', '田中美咲'],
  },
  {
    id: 2,
    title: '思い出アルバム作り',
    description: '古い写真をデジタル化して共有',
    progress: 45,
    participants: ['田中太郎', '田中花子'],
  },
  {
    id: 3,
    title: '週末の公園散歩',
    description: '一緒に自然を楽しむ時間',
    progress: 30,
    participants: ['田中花子', '田中太郎', '田中美咲'],
  },
];

export default function MissionsList() {
  return (
    <div className="space-y-4">
      {missions.map((mission, index) => (
        <motion.div
          key={mission.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl p-4 shadow-sm"
        >
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-medium text-gray-900">{mission.title}</h3>
              <p className="text-xs text-gray-600">{mission.description}</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full"
                  style={{ width: `${mission.progress}%` }}
                />
              </div>
              <span className="text-xs font-medium text-gray-600">
                {mission.progress}%
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {mission.participants.map((participant, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center"
                  >
                    <span className="text-xs font-medium text-gray-600">
                      {participant[0]}
                    </span>
                  </div>
                ))}
              </div>
              <span className="text-xs text-gray-500">
                {mission.participants.length}人が参加中
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}