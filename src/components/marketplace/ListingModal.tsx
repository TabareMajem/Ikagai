import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Star, MapPin, Calendar, Heart, Share2, Flag } from 'lucide-react';

interface Props {
  listingId: number;
  onClose: () => void;
}

export default function ListingModal({ listingId, onClose }: Props) {
  const [showReviewForm, setShowReviewForm] = useState(false);

  // This would come from your data store
  const listing = {
    id: 1,
    title: '伝統的な茶道レッスン',
    description: `経験豊富な茶道講師が丁寧に指導します。初心者の方も安心してご参加いただけます。

    【内容】
    ・基本的な作法
    ・お茶の点て方
    ・和菓子の頂き方
    ・茶道の歴史

    【持ち物】
    ・白い靴下
    ・扇子（お持ちの方）`,
    price: '¥3,000/回',
    image: 'https://images.unsplash.com/photo-1545048702-79362596cdc9?w=800&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1545048702-79362596cdc9?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1584970026373-a4de0b7d3e00?w=800&h=400&fit=crop',
    ],
    rating: 4.8,
    reviews: [
      {
        id: 1,
        user: '佐藤美咲',
        rating: 5,
        comment: 'とても丁寧に教えていただきました。',
        date: '1週間前',
      },
      {
        id: 2,
        user: '山田太郎',
        rating: 4,
        comment: '楽しく学べました。',
        date: '2週間前',
      },
    ],
    host: {
      name: '田中花子',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop',
      rating: 4.9,
      listings: 3,
      response: '通常1日以内',
    },
    location: '東京都世田谷区',
    nextAvailable: '来週火曜日',
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-3xl bg-white rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 border-b border-gray-200">
          <div className="flex justify-between items-center p-4">
            <h2 className="text-xl font-medium text-gray-900">{listing.title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Images */}
          <div className="grid grid-cols-2 gap-4">
            {listing.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${listing.title} - ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg"
              />
            ))}
          </div>

          {/* Quick Actions */}
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100">
              <Heart className="w-5 h-5" />
              <span>保存</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100">
              <Share2 className="w-5 h-5" />
              <span>シェア</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100">
              <Flag className="w-5 h-5" />
              <span>報告</span>
            </button>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                リストの詳細
              </h3>
              <p className="text-gray-600 whitespace-pre-line">
                {listing.description}
              </p>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{listing.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>次回: {listing.nextAvailable}</span>
              </div>
            </div>
          </div>

          {/* Host */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              ホスト情報
            </h3>
            <div className="flex items-start gap-4">
              <img
                src={listing.host.image}
                alt={listing.host.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h4 className="font-medium text-gray-900">
                  {listing.host.name}
                </h4>
                <div className="mt-1 space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{listing.host.rating} • {listing.host.listings}件のリスト</span>
                  </div>
                  <p>応答時間: {listing.host.response}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                レビュー
              </h3>
              <button
                onClick={() => setShowReviewForm(true)}
                className="text-sm text-indigo-600 hover:text-indigo-700"
              >
                レビューを書く
              </button>
            </div>
            <div className="space-y-4">
              {listing.reviews.map(review => (
                <div key={review.id} className="border-b border-gray-100 pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">
                          {review.user[0]}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900">
                        {review.user}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
          <button className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            予約する
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}