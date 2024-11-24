import React from 'react';
import { motion } from 'framer-motion';

interface Chapter {
  id: number;
  title: string;
  subtitle: string;
}

interface Props {
  chapter: Chapter;
}

export default function StoryContent({ chapter }: Props) {
  // This would come from your content management system or database
  const content = {
    text: `昔々、日本のある小さな村に、おばあさんが住んでいました。
    彼女は毎年、桜の季節になると、家族や村人たちと一緒に花見を楽しむのを楽しみにしていました。
    
    ある春の日、おばあさんは孫たちに、桜の木の下で昔の思い出を語り始めました...`,
    image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=800&q=80',
  };

  return (
    <div className="p-6 space-y-6">
      {/* Chapter Title */}
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-medium text-gray-900"
        >
          {chapter.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sm text-gray-600 mt-1"
        >
          {chapter.subtitle}
        </motion.p>
      </div>

      {/* Story Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="relative aspect-video rounded-xl overflow-hidden"
      >
        <img
          src={content.image}
          alt="Story illustration"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </motion.div>

      {/* Story Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="prose prose-lg max-w-none"
      >
        {content.text.split('\n').map((paragraph, index) => (
          <p key={index} className="text-gray-700 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </motion.div>
    </div>
  );
}