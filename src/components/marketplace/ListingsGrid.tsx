import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';
import type { Category } from '../../pages/MarketplacePage';

interface Props {
  searchQuery: string;
  category: Category;
  onSelect: (id: number) => void;
}

const listings = [
  {
    id: 1,
    title: '伝統的な茶道レッスン',
    category: 'cultural',
    description: '経験豊富な茶道講師が丁寧に指導します。',
    price: '¥3,000/回',
    image: 'https://images.unsplash.com/photo-1545048702-79362596cdc9?w=500&h=300&fit=crop',
    rating: 4.8,
    reviews: 12,
    host: '田中花子',
  },
  {
    id: 2,
    title: '健康体操クラス',
    category: 'health',
    description: 'シニアの方向けにカスタマイズされた体操教室です。',
    price: '¥1,500/回',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&h=300&fit=crop',
    rating: 4.9,
    reviews: 28,
    host: '鈴木一郎',
  },
  {
    id: 3,
    title: '家庭菜園アドバイス',
    category: 'services',
    description: '野菜作りのコツを教えます。',
    price: '無料',
    image: 'https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=500&h=300&fit=crop',
    rating: 4.7,
    reviews: 8,
    host: '佐藤美咲',
  },
];

export default function ListingsGrid({ searchQuery, category, onSelect }: Props) {
  const filteredListings = listings.filter(listing => 
    (category === 'all' || listing.category === category) &&
    listing.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFavorite = (e: React.MouseEvent, listingId: number) => {
    e.stopPropagation();
    // Handle favoriting
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredListings.map((listing, index) => (
        <motion.div
          key={listing.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onSelect(listing.id)}
        >
          <div className="relative">
            <img
              src={listing.image}
              alt={listing.title}
              className="w-full h-48 object-cover"
            />
            <div 
              onClick={(e) => handleFavorite(e, listing.id)}
              className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white cursor-pointer"
            >
              <Heart className="w-5 h-5 text-gray-600" />
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {listing.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {listing.description}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-gray-900">
                  {listing.rating}
                </span>
                <span className="text-sm text-gray-500">
                  ({listing.reviews}件のレビュー)
                </span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {listing.price}
              </span>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">
                  {listing.host[0]}
                </span>
              </div>
              <span className="text-sm text-gray-600">{listing.host}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}