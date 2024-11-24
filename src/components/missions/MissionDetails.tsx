import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, Users, MessageSquare, Calendar, CheckCircle, 
  Send, PlusCircle, ChevronRight 
} from 'lucide-react';

interface Message {
  id: number;
  user: string;
  content: string;
  timestamp: string;
}

interface Milestone {
  id: number;
  title: string;
  completed: boolean;
}

interface Mission {
  id: number;
  title: string;
  description: string;
  initiator: string;
  progress: number;
  participants: string[];
  messages: Message[];
  milestones: Milestone[];
  dueDate: string;
}

interface Props {
  mission: Mission;
  onClose: () => void;
}

export default function MissionDetails({ mission, onClose }: Props) {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle message sending
    setNewMessage('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="bg-indigo-50 p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-medium text-gray-900">{mission.title}</h2>
            <p className="text-sm text-gray-600 mt-1">{mission.description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/50 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Mission Stats */}
        <div className="mt-6 flex items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{mission.participants.length}人が参加中</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>期限: {mission.dueDate}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">進捗状況</span>
            <span className="font-medium text-gray-900">{mission.progress}%</span>
          </div>
          <div className="h-2 bg-white/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${mission.progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-8">
        {/* Milestones */}
        <section>
          <h3 className="text-lg font-medium text-gray-900 mb-4">マイルストーン</h3>
          <div className="space-y-3">
            {mission.milestones?.map((milestone) => (
              <div
                key={milestone.id}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl"
              >
                <button
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    milestone.completed
                      ? 'border-green-500 bg-green-500'
                      : 'border-gray-300'
                  }`}
                >
                  {milestone.completed && (
                    <CheckCircle className="w-4 h-4 text-white" />
                  )}
                </button>
                <span className="text-sm text-gray-800">{milestone.title}</span>
              </div>
            ))}
            <button className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700">
              <PlusCircle className="w-4 h-4" />
              <span>マイルストーンを追加</span>
            </button>
          </div>
        </section>

        {/* Communication Thread */}
        <section>
          <h3 className="text-lg font-medium text-gray-900 mb-4">コミュニケーション</h3>
          <div className="space-y-4">
            {/* Messages */}
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {mission.messages?.map((message) => (
                <div key={message.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {message.user[0]}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">
                        {message.user}
                      </span>
                      <span className="text-xs text-gray-500">
                        {message.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="メッセージを入力..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            ミッションを完了する
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            <Users className="w-5 h-5" />
            <span>参加者を招待</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}