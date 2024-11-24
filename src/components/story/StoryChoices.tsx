import React from 'react';
import { motion } from 'framer-motion';

interface Choice {
  id: number;
  text: string;
  consequence: string;
}

interface Props {
  onSelect: (choice: Choice) => void;
}

export default function StoryChoices({ onSelect }: Props) {
  const choices: Choice[] = [
    {
      id: 1,
      text: 'おばあさんに昔の写真を見せてもらう',
      consequence: '思い出の共有',
    },
    {
      id: 2,
      text: '一緒に桜の木の下でお茶を飲む',
      consequence: '絆の深まり',
    },
    {
      id: 3,
      text: '他の家族を呼んで集まる',
      consequence: '家族の団らん',
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">どうしますか？</h3>
      <div className="grid gap-4">
        {choices.map((choice, index) => (
          <motion.button
            key={choice.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelect(choice)}
            className="w-full text-left p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <p className="text-gray-900">{choice.text}</p>
            <p className="text-sm text-gray-500 mt-1">{choice.consequence}</p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}