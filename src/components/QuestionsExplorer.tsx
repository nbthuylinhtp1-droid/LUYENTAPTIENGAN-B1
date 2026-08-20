import React, { useState, useMemo } from 'react';
import { QUESTIONS_DATA, QUESTION_GROUPS, QuestionItem } from '../data/questionsData';
import { QuestionCard } from './QuestionCard';
import { Search, Filter, Mic, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';

interface QuestionsExplorerProps {
  initialGroupId?: number;
}

export const QuestionsExplorer: React.FC<QuestionsExplorerProps> = ({ initialGroupId = 0 }) => {
  const [selectedGroup, setSelectedGroup] = useState<number>(initialGroupId);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredQuestions = useMemo(() => {
    return QUESTIONS_DATA.filter((q) => {
      const matchGroup = selectedGroup === 0 || q.group === selectedGroup;
      const matchSearch =
        q.questionEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.questionVi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.sampleAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.vocabulary.some(v => v.phrase.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchGroup && matchSearch;
    });
  }, [selectedGroup, searchQuery]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sky-100 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <Mic className="w-6 h-6 text-sky-600" />
            20 Câu Hỏi & Câu Trả Lời Mẫu B1 Cambridge
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Luyện nghe, tập nói, phân tích mẹo ghi điểm và kiểm tra phát âm từng câu
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative min-w-[240px] sm:min-w-[280px]">
            <Search className="w-4 h-4 text-sky-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo câu hỏi, từ vựng..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-sky-200 text-xs sm:text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none text-slate-900 shadow-xs"
            />
          </div>
        </div>
      </div>

      {/* Group Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <button
          onClick={() => setSelectedGroup(0)}
          className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
            selectedGroup === 0
              ? 'bg-sky-600 text-white shadow-md shadow-sky-600/25'
              : 'bg-white text-slate-600 border border-sky-100 hover:bg-sky-50'
          }`}
        >
          Tất cả 20 câu
        </button>

        {QUESTION_GROUPS.map((group) => {
          const isSelected = selectedGroup === group.id;
          return (
            <button
              key={group.id}
              onClick={() => setSelectedGroup(group.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-md shadow-sky-600/25'
                  : 'bg-white text-slate-700 border border-sky-100 hover:bg-sky-50'
              }`}
            >
              <span>Nhóm {group.id}: {group.titleVi}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isSelected ? 'bg-white/20 text-white' : 'bg-orange-50 text-orange-600 border border-orange-200'}`}>
                {group.questionCount}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Group Description Summary */}
      {selectedGroup !== 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-sky-50 via-white to-orange-50 border border-sky-100 text-xs sm:text-sm text-sky-900 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-orange-500 shrink-0" />
            <span>
              <strong className="text-sky-900">Nhóm {selectedGroup} ({QUESTION_GROUPS[selectedGroup - 1].titleEn}):</strong> {QUESTION_GROUPS[selectedGroup - 1].description}
            </span>
          </div>
          <span className="font-bold text-xs bg-white text-orange-600 px-3 py-1 rounded-full border border-orange-200 shrink-0 ml-3 shadow-2xs">
            {QUESTION_GROUPS[selectedGroup - 1].questionCount} câu hỏi
          </span>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((q) => (
            <QuestionCard key={q.id} question={q} />
          ))
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-sky-100 shadow-sm">
            <BookOpen className="w-12 h-12 text-sky-300 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-800">
              Không tìm thấy câu hỏi phù hợp
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Vui lòng thử đổi từ khóa tìm kiếm hoặc chọn nhóm khác
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
