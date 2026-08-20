import React from 'react';
import { BookOpen, Mic, Sparkles, Layers, Award, MessageSquareQuote } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAICoach: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenAICoach }) => {
  const navItems = [
    { id: 'overview', label: 'Phân tích & Giáo trình', icon: BookOpen, badge: 'Chi tiết' },
    { id: 'questions', label: '20 Câu hỏi & Luyện nói', icon: Mic, badge: '20 Câu' },
    { id: 'generator', label: 'Cá nhân hóa câu trả lời', icon: Sparkles, badge: 'AI Tạo' },
    { id: 'flashcards', label: 'Flashcard & Quiz từ vựng', icon: Layers, badge: '20+ cụm' },
    { id: 'mocktest', label: 'Mô phỏng thi B1 (Mock Test)', icon: Award, badge: 'Chấm điểm' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-sky-100 dark:border-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('overview')}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-600 via-blue-600 to-orange-500 flex items-center justify-center text-white shadow-md shadow-sky-600/20 font-black text-lg">
              B1
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                  Speaking Part 1 Master
                </h1>
                <span className="bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 text-xs font-bold px-2 py-0.5 rounded-full border border-orange-200 dark:border-orange-800">
                  Cambridge B1
                </span>
              </div>
              <p className="text-xs text-sky-700 dark:text-sky-400 font-medium hidden sm:block">
                Giáo trình ThS. NGƯT Nguyễn Bùi Thùy Linh
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAICoach}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-orange-500/25 transition-all transform hover:-translate-y-0.5"
              title="Hỏi trợ lý AI về giáo trình B1"
            >
              <MessageSquareQuote className="w-4 h-4" />
              <span className="hidden md:inline">Hỏi Giảng viên AI</span>
              <span className="md:hidden">AI Coach</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-2 border-t border-sky-50 dark:border-slate-800/80">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-md shadow-sky-600/25'
                    : 'text-slate-600 dark:text-slate-300 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-sky-500'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-white/25 text-white' : 'bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
