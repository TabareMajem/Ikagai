import React from 'react';
import { motion } from 'framer-motion';
import { Flower2 } from 'lucide-react';

interface Goal {
  id: number;
  title: string;
  progress: number;
  plantType: string;
}

interface Props {
  goal: Goal;
  position: number;
  onClick: () => void;
}

export default function GardenPlant({ goal, position, onClick }: Props) {
  const getPlantColor = () => {
    switch (goal.plantType) {
      case 'sakura': return 'text-pink-400';
      case 'maple': return 'text-red-400';
      case 'bamboo': return 'text-green-500';
      default: return 'text-purple-400';
    }
  };

  const getPosition = () => {
    const positions = [
      'bottom-1/4 left-1/4',
      'bottom-1/3 right-1/3',
      'bottom-1/2 left-1/2',
    ];
    return positions[position % positions.length];
  };

  return (
    <motion.button
      className={`absolute ${getPosition()}`}
      whileHover={{ scale: 1.1 }}
      onClick={onClick}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', duration: 0.5 }}
    >
      <div className="flex flex-col items-center">
        <Flower2 className={`w-16 h-16 ${getPlantColor()}`} />
        <div className="mt-2 px-3 py-1 bg-white/90 rounded-full shadow-sm">
          <p className="text-sm font-medium text-gray-700">{goal.title}</p>
        </div>
      </div>
    </motion.button>
  );
}