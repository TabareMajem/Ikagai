import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  Camera, 
  Upload,
  Clock,
  Briefcase,
  Heart
} from 'lucide-react';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const skills = [
  { id: 'tech', label: 'テクノロジー' },
  { id: 'health', label: '健康・介護' },
  { id: 'culture', label: '文化活動' },
  { id: 'education', label: '教育' },
  { id: 'language', label: '語学' },
  { id: 'art', label: '芸術' },
  { id: 'sports', label: 'スポーツ' },
  { id: 'cooking', label: '料理' },
];

const availabilityOptions = [
  { id: 'weekday_morning', label: '平日午前' },
  { id: 'weekday_afternoon', label: '平日午後' },
  { id: 'weekday_evening', label: '平日夕方' },
  { id: 'weekend_morning', label: '週末午前' },
  { id: 'weekend_afternoon', label: '週末午後' },
  { id: 'weekend_evening', label: '週末夕方' },
];

export default function VolunteerProfileScreen({ onNext, onBack }: Props) {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [motivation, setMotivation] = useState('');

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

  const toggleSkill = (skillId: string) => {
    setSelectedSkills(prev =>
      prev.includes(skillId)
        ? prev.filter(id => id !== skillId)
        : [...prev, skillId]
    );
  };

  const toggleAvailability = (availabilityId: string) => {
    setSelectedAvailability(prev =>
      prev.includes(availabilityId)
        ? prev.filter(id => id !== availabilityId)
        : [...prev, availabilityId]
    );
  };

  const isFormValid = () => {
    return (
      selectedSkills.length > 0 &&
      selectedAvailability.length > 0 &&
      motivation.trim().length > 0
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 overflow-y-auto max-h-[calc(100vh-8rem)]"
    >
      <div className="space-y-8">
        {/* Profile Picture */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
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

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-medium text-gray-900">
              提供できるスキル
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {skills.map((skill) => (
              <button
                key={skill.id}
                onClick={() => toggleSkill(skill.id)}
                className={`p-3 rounded-xl text-sm transition-colors ${
                  selectedSkills.includes(skill.id)
                    ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-500'
                    : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                {skill.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Availability */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-medium text-gray-900">
              活動可能な時間帯
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {availabilityOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => toggleAvailability(option.id)}
                className={`p-3 rounded-xl text-sm transition-colors ${
                  selectedAvailability.includes(option.id)
                    ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-500'
                    : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Motivation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-medium text-gray-900">
              ボランティアを始めた理由
            </h3>
          </div>
          <textarea
            value={motivation}
            onChange={(e) => setMotivation(e.target.value)}
            placeholder="高齢者の方々をサポートしたい理由を教えてください"
            className="w-full h-32 p-4 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            戻る
          </button>
          <button
            onClick={onNext}
            disabled={!isFormValid()}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            次へ
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}