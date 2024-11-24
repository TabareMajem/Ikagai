import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, 
  Upload, 
  ChevronRight, 
  Flower2, 
  Brush, 
  Coffee, 
  Music, 
  Book, 
  Heart,
  Users,
  Utensils,
  Camera as CameraIcon,
  Palette,
  Leaf
} from 'lucide-react';

interface Props {
  onNext: () => void;
  onSkip: () => void;
}

const roles = [
  { id: 'elder', label: 'ご本人', description: '健康的な生活を楽しみたい方' },
  { id: 'family', label: '家族', description: '大切な人をサポートしたい方' },
  { id: 'volunteer', label: 'ボランティア', description: '地域社会に貢献したい方' },
];

const interests = [
  { id: 'gardening', icon: Flower2, label: '園芸' },
  { id: 'calligraphy', icon: Brush, label: '書道' },
  { id: 'tea', icon: Coffee, label: '茶道' },
  { id: 'music', icon: Music, label: '音楽' },
  { id: 'reading', icon: Book, label: '読書' },
  { id: 'health', icon: Heart, label: '健康' },
  { id: 'social', icon: Users, label: '交流' },
  { id: 'cooking', icon: Utensils, label: '料理' },
  { id: 'photo', icon: CameraIcon, label: '写真' },
  { id: 'art', icon: Palette, label: '芸術' },
  { id: 'nature', icon: Leaf, label: '自然' },
];

export default function ProfileSetupScreen({ onNext, onSkip }: Props) {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleInterest = (interestId: string) => {
    setSelectedInterests(prev =>
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 overflow-y-auto max-h-[calc(100vh-8rem)]"
    >
      {/* Header */}
      <div className="text-center space-y-4 mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-medium text-gray-900"
        >
          プロフィールを設定しましょう
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-base text-gray-600"
        >
          あなたに合った体験をご提供するために、
          <br />
          以下の情報を教えてください
        </motion.p>
      </div>

      <div className="space-y-8">
        {/* Profile Picture Upload */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center"
        >
          <div className="relative">
            <div className={`w-32 h-32 rounded-full overflow-hidden ${
              !avatar ? 'bg-gray-100' : ''
            }`}>
              {avatar ? (
                <img
                  src={avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Camera className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full cursor-pointer hover:bg-indigo-700 transition-colors"
            >
              <Upload className="w-5 h-5" />
            </label>
            <input
              type="file"
              id="avatar-upload"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            プロフィール写真を追加
          </p>
        </motion.div>

        {/* Role Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            ご利用の目的を教えてください
          </h3>
          <div className="grid gap-4">
            {roles.map((role) => (
              <button
                key={role.id}
                type="button"
                onClick={() => setSelectedRole(role.id)}
                className={`w-full p-4 rounded-xl border-2 transition-colors ${
                  selectedRole === role.id
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-left">
                  <h4 className="font-medium text-gray-900">{role.label}</h4>
                  <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Interests Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            興味のある活動を選んでください
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {interests.map((interest) => (
              <button
                key={interest.id}
                type="button"
                onClick={() => toggleInterest(interest.id)}
                className={`p-4 rounded-xl border-2 transition-colors ${
                  selectedInterests.includes(interest.id)
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <interest.icon className={`w-6 h-6 ${
                    selectedInterests.includes(interest.id)
                      ? 'text-indigo-600'
                      : 'text-gray-600'
                  }`} />
                  <span className="text-sm font-medium text-gray-900">
                    {interest.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="sticky bottom-0 bg-white pt-4"
        >
          <button
            onClick={onNext}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
          >
            次へ
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={onSkip}
            className="w-full text-sm text-gray-600 hover:text-gray-700 mt-4"
          >
            後で設定する
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}