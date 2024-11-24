import React, { useState } from 'react';
import { ArrowLeft, Plus, Search } from 'lucide-react';
import Navigation from '../components/Navigation';
import ConversationList from '../components/messages/ConversationList';
import ChatInterface from '../components/messages/ChatInterface';
import NewMessageModal from '../components/messages/NewMessageModal';

interface Props {
  onNavigate: (page: 'home' | 'garden') => void;
}

export default function MessagesPage({ onNavigate }: Props) {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-10 border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => onNavigate('home')}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-xl font-medium text-gray-800">メッセージ</h1>
            <button
              onClick={() => setShowNewMessage(true)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Plus className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="メッセージを検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-20">
        <div className="max-w-screen-xl mx-auto">
          {selectedChat ? (
            <ChatInterface
              chatId={selectedChat}
              onBack={() => setSelectedChat(null)}
            />
          ) : (
            <ConversationList
              searchQuery={searchQuery}
              onSelectChat={setSelectedChat}
            />
          )}
        </div>
      </main>

      {/* Navigation */}
      <Navigation currentPage="home" onNavigate={onNavigate} />

      {/* New Message Modal */}
      {showNewMessage && (
        <NewMessageModal onClose={() => setShowNewMessage(false)} />
      )}
    </div>
  );
}