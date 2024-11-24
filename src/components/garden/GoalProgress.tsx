import React from 'react';
import { motion } from 'framer-motion';
import { Flower2, TreePine, Sprout } from 'lucide-react';

interface Props {
  progress: number;
  plantType: string;
}

export default function GoalProgress({ progress, plantType }: Props) {
  const getPlantIcon = () => {
    switch (plantType) {
      case 'sakura': return Flower2;
      case 'pine': return TreePine;
      case 'bamboo': return Sprout;
      default: return Flower2;
    }
  };

  const getPlantColor = () => {
    switch (plantType) {
      case 'sakura': return 'text-pink-500';
      case 'pine': return 'text-green-600';
      case 'bamboo': return 'text-emerald-500';
      default: return 'text-purple-500';
    }
  };

  const PlantIcon = getPlantIcon();

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        {/* Progress Circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="60"
            className="fill-none stroke-gray-200"
            strokeWidth="8"
          />
          <motion.circle
            cx="64"
            cy="64"
            r="60"
            className={`fill-none ${getPlantColor().replace('text-', 'stroke-')}`}
            strokeWidth="8"
            strokeDasharray={377}
            initial={{ strokeDashoffset: 377 }}
            animate={{ strokeDashoffset: 377 - (377 * progress) / 100 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        
        {/* Plant Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <PlantIcon className={`w-16 h-16 ${getPlantColor()}`} />
        </div>
      </div>

      {/* Progress Text */}
      <div className="mt-4 text-center">
        <div className="text-3xl font-bold text-gray-800">{progress}%</div>
        <div className="text-sm text-gray-600">達成度</div>
      </div>
    </div>
  );
}