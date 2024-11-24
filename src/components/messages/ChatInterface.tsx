import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Image, Send, MoreVertical, Users } from 'lucide-react';

interface Props {
  chatId: number;
  onBack: () => void;
}

interface Message {
  id: number;
  content: string;
  sender: string;
  timestamp: string;
  isSent: boolean;
}

const messages: Message[] = [
  {
    id: 1,
    content: 'こんにちは！明日の花見の準備はできましたか？',
    sender: '田中花子',
    timestamp: '14:30',
    isSent: false,
  },
  {
    id: 2,
    content: 'はい、お弁当も作りました！',
    sender: 'あなた',
    timestamp: '14:32',
    isSent: true,
  },
  {
    id: 3,
    content: '天気も良さそうで良かったです。楽しみですね！',
    sender: '田中花子',
    timestamp: '14:33',
    isSent: false,
  },
];

export default function ChatInterface({ chatId, onBack }: Props) {
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage('');
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-20">
      {/* Chat Header */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </button>
              <div>
                <h2 className="text-lg font-medium text-gray-900">田中花子</h2>
                <p className="text-sm text-green-500">オンライン</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Users className="w-6 h-6 text-gray-700" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <MoreVertical className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="pt-20 pb-24 px-4 overflow-y-auto h-screen">
        <div className="max-w-screen-xl mx-auto space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex ${message.isSent ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] ${message.isSent ? 'order-2' : ''}`}>
                {!message.isSent && (
                  <span className="text-sm text-gray-600 ml-12 mb-1 block">
                    {message.sender}
                  </span>
                )}
                <div className="flex items-end gap-2">
                  {!message.isSent && (
                    <img
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop"
                      alt={message.sender}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                  <div
                    className={`p-4 rounded-2xl ${
                      message.isSent
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
                <span className={`text-xs text-gray-500 mt-1 block ${
                  message.isSent ? 'text-right' : 'ml-12'
                }`}>
                  {message.timestamp}
                </span>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex items-center gap-2 text-gray-500">
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
              <div className="text-sm">入力中...</div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <form onSubmit={handleSend} className="max-w-screen-xl mx-auto p-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
            >
              <Image className="w-6 h-6" />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="メッセージを入力..."
              className="flex-1 px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="p-2 text-white bg-indigo-600 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}