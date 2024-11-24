import React from 'react';
import { Activity, Palette, HeartPulse, ShoppingBag } from 'lucide-react';
import type { Category } from '../../pages/MarketplacePage';

interface Props {
  selected: Category;
  onChange: (category: Category) => void;
}

const categories = [
  { id: 'all', label: 'すべて', icon: Activity },
  { id: 'cultural', label: '文化', icon: Palette },
  { id: 'health', label: '健康', icon: HeartPulse },
  { id: 'services', label: 'サービス', icon: ShoppingBag },
] as const;

export default function CategoryFilter({ selected, onChange }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onChange(category.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
            selected === category.id
              ? 'bg-indigo-100 text-indigo-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <category.icon className="w-4 h-4" />
          <span className="text-sm font-medium">{category.label}</span>
        </button>
      ))}
    </div>
  );
}