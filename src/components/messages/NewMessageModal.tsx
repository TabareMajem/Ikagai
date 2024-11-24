import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Search, Users } from 'lucide-react';

interface Props {
  onClose: () => void;
}

const contacts = [
  {
    id: 1,
    name: '田中花子',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop',
    isOnline: true,
  },
  {
    id: 2,
    name: '田中太郎',
    avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=120&h=120&fit=crop',
    isOnline: false,
  },
  {
    id: 3,
    name: '田中美咲',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop',
    isOnline: true,
  },
];

export default function NewMessageModal({ onClose }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);

  const toggleContact = (contactId: number) => {
    setSelectedContacts(prev =>
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const filteredContacts = contacts.filter(
    contact => contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-lg bg-white rounded-2xl overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium text-gray-800">新しいメッセージ</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="連絡先を検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Selected Contacts */}
          {selectedContacts.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {selectedContacts.map(id => {
                const contact = contacts.find(c => c.id === id);
                if (!contact) return null;
                return (
                  <div
                    key={contact.id}
                    className="flex items-center gap-2 px-3 py-1 bg-indigo-100 rounded-full"
                  >
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-sm text-indigo-700">{contact.name}</span>
                    <button
                      onClick={() => toggleContact(contact.id)}
                      className="p-1 hover:bg-indigo-200 rounded-full"
                    >
                      <X className="w-4 h-4 text-indigo-600" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Contacts List */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredContacts.map(contact => (
              <button
                key={contact.id}
                onClick={() => toggleContact(contact.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl transition-colors ${
                  selectedContacts.includes(contact.id)
                    ? 'bg-indigo-50'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="relative">
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                    contact.isOnline ? 'bg-green-400' : 'bg-gray-300'
                  }`} />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {contact.name}
                </span>
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              キャンセル
            </button>
            <button
              disabled={selectedContacts.length === 0}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {selectedContacts.length > 1 ? 'グループを作成' : 'メッセージを送信'}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}