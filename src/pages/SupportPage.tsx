import React, { useState } from 'react';
import { ArrowLeft, Type, Globe, MessageSquare, HelpCircle } from 'lucide-react';
import Navigation from '../components/Navigation';
import AccessibilitySettings from '../components/support/AccessibilitySettings';
import FAQSection from '../components/support/FAQSection';
import ContactSupport from '../components/support/ContactSupport';
import FeedbackForm from '../components/support/FeedbackForm';
import LanguageSettings from '../components/support/LanguageSettings';

interface Props {
  onNavigate: (page: 'home' | 'profile') => void;
}

type SettingsSection = 'accessibility' | 'faq' | 'contact' | 'language' | 'feedback' | null;

const settingsSections = [
  {
    id: 'accessibility' as const,
    title: 'アクセシビリティ設定',
    description: '表示とナビゲーションの設定',
    icon: Type,
    Component: AccessibilitySettings,
  },
  {
    id: 'language' as const,
    title: '言語設定',
    description: 'アプリの表示言語を変更',
    icon: Globe,
    Component: LanguageSettings,
  },
  {
    id: 'faq' as const,
    title: 'よくある質問',
    description: 'サービスに関する一般的な質問',
    icon: HelpCircle,
    Component: FAQSection,
  },
  {
    id: 'contact' as const,
    title: 'サポートに連絡',
    description: '困ったことがあればお問い合わせください',
    icon: MessageSquare,
    Component: ContactSupport,
  },
  {
    id: 'feedback' as const,
    title: 'フィードバック',
    description: 'サービス改善のためのご意見',
    icon: MessageSquare,
    Component: FeedbackForm,
  },
];

export default function SupportPage({ onNavigate }: Props) {
  const [activeSection, setActiveSection] = useState<SettingsSection>(null);

  const ActiveComponent = activeSection 
    ? settingsSections.find(s => s.id === activeSection)?.Component 
    : null;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-10">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => onNavigate('profile')}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-xl font-medium text-gray-800">サポートと設定</h1>
            <div className="w-10" /> {/* Spacer for alignment */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        <div className="max-w-screen-xl mx-auto px-4">
          {/* Settings Sections */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {settingsSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
              >
                <div className={`p-2 rounded-full bg-gray-100`}>
                  <section.icon className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-sm font-medium text-gray-900">
                    {section.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {section.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Navigation */}
      <Navigation currentPage="profile" onNavigate={onNavigate} />

      {/* Settings Modal */}
      {activeSection && ActiveComponent && (
        <div className="fixed inset-0 bg-black/50 z-50">
          <ActiveComponent onClose={() => setActiveSection(null)} />
        </div>
      )}
    </div>
  );
}