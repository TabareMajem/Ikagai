import React from 'react';
import { motion } from 'framer-motion';
import { Flower2 } from 'lucide-react';

const familyPlants = [
  { id: 1, name: 'おばあちゃんの散歩目標', progress: 85, owner: '田中花子', color: 'pink' },
  { id: 2, name: '孫との週末の約束', progress: 60, owner: '田中太郎', color: 'purple' },
  { id: 3, name: '家族での料理教室', progress: 40, owner: '田中美咲', color: 'blue' },
];

export default function SharedGarden() {
  return (
    <div className="relative h-64 bg-gradient-to-b from-transparent to-green-100/50 rounded-xl overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-green-100/30 to-transparent" />
      </div>

      <div className="relative h-full p-6">
        {familyPlants.map((plant, index) => (
          <motion.div
            key={plant.id}
            className={`absolute ${
              index === 0 ? 'bottom-1/4 left-1/4' :
              index === 1 ? 'bottom-1/3 right-1/3' :
              'bottom-1/2 left-1/2'
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="flex flex-col items-center">
              <Flower2 className={`w-12 h-12 text-${plant.color}-400`} />
              <div className="mt-2 px-3 py-1 bg-white/90 rounded-full shadow-sm">
                <p className="text-xs font-medium text-gray-700">{plant.owner}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}