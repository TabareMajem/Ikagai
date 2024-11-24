import React from 'react';
import { Flower2, ChevronRight } from 'lucide-react';

interface Props {
  onNavigate: (page: 'garden') => void;
}

export default function DarumaGarden({ onNavigate }: Props) {
  return (
    <button 
      onClick={() => onNavigate('garden')}
      className="w-full relative h-48 bg-gradient-to-b from-pink-50 to-green-50 rounded-xl overflow-hidden p-4 group"
    >
      <div className="absolute top-3 left-4">
        <h2 className="text-lg font-medium text-gray-800">だるまの庭</h2>
        <p className="text-sm text-gray-600">Your Daruma Garden</p>
      </div>
      
      <div className="absolute top-3 right-4">
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
      </div>
      
      <div className="flex items-end justify-center h-full gap-4 pb-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <Flower2 
              className={`w-12 h-12 ${
                i === 0 ? 'text-pink-400' : 
                i === 1 ? 'text-purple-400' : 
                'text-blue-400'
              }`}
            />
            <div className={`h-16 w-1 ${
              i === 0 ? 'bg-pink-200' : 
              i === 1 ? 'bg-purple-200' : 
              'bg-blue-200'
            }`} />
          </div>
        ))}
      </div>
    </button>
  );
}