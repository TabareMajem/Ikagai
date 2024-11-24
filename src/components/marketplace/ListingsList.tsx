import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, MapPin, Calendar } from 'lucide-react';
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
    description: '経験豊富な茶道講師が丁寧に指導します。初心者の方も安心してご参加いただけます。',
    price: '¥3,000/回',
    image: 'https://images.unsplash.com/photo-1545048702-79362596cdc9?w=500&h=300&fit=crop',
    rating: 4.8,
    reviews: 12,
    host: '田中花子',
    location: '東京都世田谷区',
    nextAvailable: '来週火曜日',
  },
  {
    id: 2,
    title: '健康体操クラス',
    category: 'health',
    description: 'シニアの方向けにカスタマイズされた体操教室です。無理なく楽しく体を動かしましょう。',
    price: '¥1,500/回',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&h=300&fit=crop',
    rating: 4.9,
    reviews: 28,
    host: '鈴木一郎',
    location: '東京都練馬区',
    nextAvailable: '今週木曜日',
  },
];

export default function ListingsList({ searchQuery, category, onSelect }: Props) {
  const filteredListings = listings.filter(listing => 
    (category === 'all' || listing.category === category) &&
    listing.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {filteredListings.map((listing, index) => (
        <motion.div
          key={listing.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
        >
          <button
            onClick={() => onSelect(listing.id)}
            className="w-full text-left"
          >
            <div className="flex">
              <div className="w-48 h-48">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 p-6">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {listing.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {listing.description}
                    </p>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{listing.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{listing.nextAvailable}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-900">
                        {listing.rating}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({listing.reviews}件のレビュー)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">
                          {listing.host[0]}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">{listing.host}</span>
                    </div>
                  </div>
                  <span className="text-lg font-medium text-gray-900">
                    {listing.price}
                  </span>
                </div>
              </div>
            </div>
          </button>
        </motion.div>
      ))}
    </div>
  );
}