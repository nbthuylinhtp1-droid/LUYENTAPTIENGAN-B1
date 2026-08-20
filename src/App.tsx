import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { OverviewAnalysis } from './components/OverviewAnalysis';
import { QuestionsExplorer } from './components/QuestionsExplorer';
import { PersonalizedAnswerBuilder } from './components/PersonalizedAnswerBuilder';
import { FlashcardsAndQuiz } from './components/FlashcardsAndQuiz';
import { MockTestSimulator } from './components/MockTestSimulator';
import { AICoachModal } from './components/AICoachModal';
import { MessageSquareQuote, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedGroupId, setSelectedGroupId] = useState<number>(0);
  const [isAICoachOpen, setIsAICoachOpen] = useState<boolean>(false);

  const handleNavigateToQuestions = (groupId?: number) => {
    setSelectedGroupId(groupId || 0);
    setActiveTab('questions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToMockTest = () => {
    setActiveTab('mocktest');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50/60 via-white to-orange-50/40 text-slate-800 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'questions') setSelectedGroupId(0);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAICoach={() => setIsAICoachOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {activeTab === 'overview' && (
          <OverviewAnalysis
            onNavigateToQuestions={handleNavigateToQuestions}
            onNavigateToMockTest={handleNavigateToMockTest}
          />
        )}

        {activeTab === 'questions' && (
          <QuestionsExplorer initialGroupId={selectedGroupId} />
        )}

        {activeTab === 'generator' && (
          <PersonalizedAnswerBuilder />
        )}

        {activeTab === 'flashcards' && (
          <FlashcardsAndQuiz />
        )}

        {activeTab === 'mocktest' && (
          <MockTestSimulator />
        )}
      </main>

      {/* Floating AI Coach Button */}
      <button
        onClick={() => setIsAICoachOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-3.5 sm:px-5 sm:py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-xl shadow-orange-500/30 flex items-center gap-2 font-bold text-xs sm:text-sm transition-all transform hover:scale-105"
        title="Trò chuyện với Giảng viên AI"
      >
        <MessageSquareQuote className="w-5 h-5" />
        <span className="hidden sm:inline">Hỏi Giảng viên AI</span>
      </button>

      {/* AI Coach Dialog Modal */}
      <AICoachModal isOpen={isAICoachOpen} onClose={() => setIsAICoachOpen(false)} />

      {/* Footer */}
      <footer className="border-t border-sky-100 bg-white/80 py-8 text-center text-xs text-slate-500 space-y-2 mt-12">
        <p>
          Giáo trình phân tích dựa trên bài giảng của{' '}
          <strong className="text-sky-700">ThS. NGƯT Nguyễn Bùi Thùy Linh</strong> — Cambridge B1 Preliminary Speaking Part 1.
        </p>
        <p className="text-[11px] text-slate-400">
          Tích hợp Google Gemini AI Chấm điểm 4 Tiêu chí & Hiệu ứng Âm thanh Chúc mừng Hoành tráng / Khích lệ.
        </p>
      </footer>
    </div>
  );
}
