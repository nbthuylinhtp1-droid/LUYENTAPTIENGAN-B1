import React, { useState } from 'react';
import { SPEAKING_CRITERIA, QUESTION_GROUPS, GRAMMAR_MASTERY_POINTS } from '../data/questionsData';
import { 
  CheckCircle2, Sparkles, ArrowRight, Flame, Target, BookCheck, ShieldAlert 
} from 'lucide-react';

interface OverviewAnalysisProps {
  onNavigateToQuestions: (groupId?: number) => void;
  onNavigateToMockTest: () => void;
}

export const OverviewAnalysis: React.FC<OverviewAnalysisProps> = ({ 
  onNavigateToQuestions, 
  onNavigateToMockTest 
}) => {
  const [selectedCriteriaTab, setSelectedCriteriaTab] = useState<string>('pronunciation');

  const activeCriterion = SPEAKING_CRITERIA.find(c => c.id === selectedCriteriaTab) || SPEAKING_CRITERIA[0];

  return (
    <div className="space-y-10 pb-16 max-w-7xl mx-auto">
      {/* Banner / Introduction Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-900 via-blue-950 to-slate-900 border border-sky-800 p-6 sm:p-8 md:p-10 shadow-xl text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-orange-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/20 text-orange-300 text-xs font-bold border border-orange-500/30 mb-4">
            <Sparkles className="w-4 h-4 text-amber-300" />
            Tài liệu Độc quyền & Chuẩn khảo thí Cambridge
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
            Phân Tích Chi Tiết 20 Câu Hỏi Speaking Part 1 (B1 Cambridge)
          </h1>
          <p className="text-sm sm:text-base text-slate-200 mt-3 leading-relaxed">
            Hệ thống phân tích bài bản dựa trên tài liệu giảng dạy của <strong className="text-orange-400 font-bold">Thạc sĩ Nhà giáo Ưu tú Nguyễn Bùi Thùy Linh</strong>. Tổng hợp đầy đủ 4 tiêu chí chấm thi, 5 nhóm câu hỏi thường gặp nhất, ma trận ngữ pháp ăn điểm, cụm từ vựng chuẩn B1 và kỹ thuật nối âm tự nhiên kèm chấm điểm AI và âm thanh chúc mừng hoành tráng.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateToQuestions()}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs sm:text-sm font-black shadow-lg shadow-orange-500/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              Luyện 20 câu hỏi ngay
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onNavigateToMockTest}
              className="px-6 py-3 rounded-2xl bg-sky-800/80 hover:bg-sky-700 text-sky-100 border border-sky-600/50 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all"
            >
              Thi thử với AI Examiner
            </button>
          </div>
        </div>
      </div>

      {/* Section 1: 4 B1 Assessment Criteria Breakdown */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-sky-100 pb-3">
          <div>
            <span className="text-xs font-bold text-sky-600 tracking-wider uppercase">
              Phần 1: Khung Chấm Điểm Chuẩn
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <Target className="w-6 h-6 text-sky-600" />
              4 Tiêu Chí Đánh Giá Trong Speaking B1
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Mỗi tiêu chí chiếm 25% tổng số điểm Speaking Part 1
          </p>
        </div>

        {/* Criteria Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {SPEAKING_CRITERIA.map((criterion) => {
            const isSelected = selectedCriteriaTab === criterion.id;
            return (
              <button
                key={criterion.id}
                onClick={() => setSelectedCriteriaTab(criterion.id)}
                className={`p-4 rounded-2xl text-left border transition-all duration-200 relative overflow-hidden ${
                  isSelected
                    ? 'bg-white border-sky-500 shadow-md ring-2 ring-sky-500/20'
                    : 'bg-white border-sky-100 hover:border-sky-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-black text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                    {criterion.weight} Điểm
                  </span>
                  <span className="text-xs text-orange-600 font-bold font-mono">
                    Cambridge
                  </span>
                </div>
                <h3 className="font-black text-slate-900 text-sm sm:text-base mt-2">
                  {criterion.nameVi}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Selected Criteria Deep Dive Card */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-sky-100 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-sky-100">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-slate-900">
                  {activeCriterion.nameVi}
                </h3>
                <span className="px-3 py-0.5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold border border-orange-200">
                  Trọng số: {activeCriterion.weight}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                {activeCriterion.description}
              </p>
            </div>
          </div>

          {/* Key Points */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <BookCheck className="w-4 h-4 text-emerald-600" />
              Các điểm trọng tâm cần đạt theo phương pháp cô Thùy Linh:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeCriterion.keyPoints.map((point, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 bg-sky-50/60 p-3.5 rounded-2xl border border-sky-100 text-xs sm:text-sm text-slate-700"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: 5 Question Groups */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-sky-100 pb-3">
          <div>
            <span className="text-xs font-bold text-sky-600 tracking-wider uppercase">
              Phần 2: Bản Đồ 20 Câu Hỏi
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <Flame className="w-6 h-6 text-orange-500" />
              5 Nhóm Chủ Đề Cốt Lõi Trong Speaking Part 1
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Khóa học phân loại chuẩn xác 100% dạng câu hỏi Cambridge
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {QUESTION_GROUPS.map((grp) => (
            <div
              key={grp.id}
              onClick={() => onNavigateToQuestions(grp.id)}
              className="p-5 rounded-3xl bg-white border border-sky-100 hover:border-sky-300 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-xl bg-gradient-to-tr from-sky-600 to-blue-600 text-white font-black text-xs flex items-center justify-center">
                    {grp.id}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-600 border border-orange-200">
                    {grp.questionCount} câu hỏi
                  </span>
                </div>
                <h3 className="font-black text-slate-900 text-base group-hover:text-sky-600 transition-colors">
                  {grp.titleVi}
                </h3>
                <p className="text-xs font-mono text-sky-700">{grp.titleEn}</p>
                <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                  {grp.description}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-sky-50 flex items-center justify-between text-xs font-bold text-sky-600 group-hover:text-orange-600">
                <span>Xem câu hỏi nhóm {grp.id}</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Grammar Matrix & Mastery Points */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-sky-100 pb-3">
          <div>
            <span className="text-xs font-bold text-sky-600 tracking-wider uppercase">
              Phần 3: Chiến Thuật Ngữ Pháp & Nối Âm
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-orange-500" />
              Ma Trận Cấu Trúc Ăn Điểm Tuyệt Đối
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Các thì và kỹ thuật nối âm bắt buộc phải nhớ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GRAMMAR_MASTERY_POINTS.map((g, idx) => (
            <div
              key={idx}
              className="p-5 rounded-3xl bg-white border border-sky-100 space-y-3 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-black text-sky-900 text-sm sm:text-base">
                  {g.title}
                </h3>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700">
                  {g.badge}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {g.description}
              </p>
              
              <div className="space-y-2 pt-1">
                {g.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="p-3 rounded-2xl bg-sky-50/60 border border-sky-100 text-xs space-y-1">
                    <strong className="text-sky-800 block font-bold">{item.tense}</strong>
                    <p className="text-slate-700">{item.usage}</p>
                    <p className="text-[11px] font-mono text-orange-600 bg-white p-1.5 rounded-lg border border-orange-200">
                      Công thức: {item.formula}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
