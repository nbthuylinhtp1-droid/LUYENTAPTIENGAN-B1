import React, { useState } from 'react';
import { QUESTIONS_DATA } from '../data/questionsData';
import { Sparkles, User, MapPin, Briefcase, Heart, Calendar, Volume2, Copy, Check, ArrowRight } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

export const PersonalizedAnswerBuilder: React.FC = () => {
  const [userProfile, setUserProfile] = useState({
    fullName: 'Nguyễn Văn Minh',
    spelling: 'M-I-N-H',
    hometown: 'Đà Nẵng',
    jobOrMajor: 'Công nghệ thông tin (Information Technology)',
    studyDuration: '6 years',
    hobby1: 'Nghe nhạc Pop và đọc sách (listening to pop music and reading books)',
    sport: 'Cầu lông (badminton)',
    weekendPlan: 'Đi cà phê với bạn bè và ngủ nướng (hang out at a cafe with friends and sleep in)',
    favoritePartOfDay: 'Buổi tối (Evening)'
  });

  const [selectedQuestionId, setSelectedQuestionId] = useState<number>(1);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedAnswer, setGeneratedAnswer] = useState<{
    customAnswerEn: string;
    customAnswerVi: string;
    appliedTechniques: string[];
    linkingSoundNotes: string[];
  } | null>(null);

  const [copied, setCopied] = useState<boolean>(false);

  const selectedQuestion = QUESTIONS_DATA.find((q) => q.id === selectedQuestionId) || QUESTIONS_DATA[0];

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate-custom-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: selectedQuestion.id,
          questionEn: selectedQuestion.questionEn,
          userProfile,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setGeneratedAnswer(data.data);
        soundEffects.triggerGrandCelebration();
      } else {
        alert(data.error || 'Có lỗi xảy ra.');
      }
    } catch (err) {
      console.error(err);
      alert('Không thể tạo câu trả lời lúc này.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (generatedAnswer?.customAnswerEn) {
      navigator.clipboard.writeText(generatedAnswer.customAnswerEn);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePlayAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="border-b border-sky-100 pb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          AI Tailored Answers
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">
          Tạo Câu Trả Lời Speaking Part 1 Của Riêng Bạn
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Nhập thông tin thực tế của bạn, AI sẽ tự động sinh câu trả lời chuẩn B1 Distinction áp dụng đúng các công thức ghi điểm của cô Thùy Linh.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: User Profile Inputs */}
        <div className="lg:col-span-5 space-y-5 bg-white p-6 sm:p-7 rounded-3xl border border-sky-100 shadow-sm">
          <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
            <User className="w-5 h-5 text-sky-600" />
            Hồ sơ thông tin của bạn
          </h3>

          <div className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Họ và Tên đầy đủ:
              </label>
              <input
                type="text"
                value={userProfile.fullName}
                onChange={(e) => setUserProfile({ ...userProfile, fullName: e.target.value })}
                className="w-full p-3 rounded-2xl bg-sky-50/50 border border-sky-200 text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                placeholder="VD: Nguyễn Văn Minh"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Cách đánh vần tên:
              </label>
              <input
                type="text"
                value={userProfile.spelling}
                onChange={(e) => setUserProfile({ ...userProfile, spelling: e.target.value })}
                className="w-full p-3 rounded-2xl bg-sky-50/50 border border-sky-200 text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                placeholder="VD: M-I-N-H"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Nơi sinh sống / Quê hương:
              </label>
              <input
                type="text"
                value={userProfile.hometown}
                onChange={(e) => setUserProfile({ ...userProfile, hometown: e.target.value })}
                className="w-full p-3 rounded-2xl bg-sky-50/50 border border-sky-200 text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                placeholder="VD: Da Nang City"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Ngành học hoặc Công việc:
              </label>
              <input
                type="text"
                value={userProfile.jobOrMajor}
                onChange={(e) => setUserProfile({ ...userProfile, jobOrMajor: e.target.value })}
                className="w-full p-3 rounded-2xl bg-sky-50/50 border border-sky-200 text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                placeholder="VD: Computer Science / Marketing Manager"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Sở thích lúc rảnh rỗi & Thể thao:
              </label>
              <input
                type="text"
                value={userProfile.hobby1}
                onChange={(e) => setUserProfile({ ...userProfile, hobby1: e.target.value })}
                className="w-full p-3 rounded-2xl bg-sky-50/50 border border-sky-200 text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                placeholder="VD: Listening to acoustic music, swimming"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Kế hoạch cuối tuần tới:
              </label>
              <input
                type="text"
                value={userProfile.weekendPlan}
                onChange={(e) => setUserProfile({ ...userProfile, weekendPlan: e.target.value })}
                className="w-full p-3 rounded-2xl bg-sky-50/50 border border-sky-200 text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                placeholder="VD: Go to the cinema, sleep in, recharge energy"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Select Question & Generate */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-sky-100 shadow-sm space-y-4">
            <h3 className="font-black text-slate-900 text-base">
              Chọn câu hỏi bạn muốn tạo câu trả lời riêng:
            </h3>

            <select
              value={selectedQuestionId}
              onChange={(e) => {
                setSelectedQuestionId(Number(e.target.value));
                setGeneratedAnswer(null);
              }}
              className="w-full p-3.5 rounded-2xl bg-sky-50/50 border border-sky-200 text-xs sm:text-sm text-slate-900 font-bold focus:ring-2 focus:ring-sky-500 focus:outline-none"
            >
              {QUESTIONS_DATA.map((q) => (
                <option key={q.id} value={q.id}>
                  Câu {q.id}: {q.questionEn} ({q.questionVi})
                </option>
              ))}
            </select>

            <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100 text-xs space-y-1">
              <span className="font-black text-sky-800 block">
                Câu trả lời mẫu gốc của cô Thùy Linh:
              </span>
              <p className="text-slate-600 italic">
                "{selectedQuestion.sampleAnswer}"
              </p>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-sm shadow-md shadow-orange-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isGenerating ? 'Đang soạn câu trả lời B1...' : 'Tạo câu trả lời cá nhân hóa & Nghe Nhạc Thưởng'}</span>
            </button>
          </div>

          {/* Generated Result */}
          {generatedAnswer && (
            <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-sky-400 shadow-xl space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  Đã tạo thành công chuẩn B1 Distinction
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePlayAudio(generatedAnswer.customAnswerEn)}
                    className="p-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs flex items-center gap-1.5 font-bold border border-sky-200"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-4 h-4 text-orange-500" />
                    <span>Nghe</span>
                  </button>

                  <button
                    onClick={handleCopy}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs flex items-center gap-1.5 font-bold"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Đã copy' : 'Sao chép'}</span>
                  </button>
                </div>
              </div>

              {/* Answer Content */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-sky-50 to-orange-50/50 border border-sky-100 space-y-2">
                <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                  "{generatedAnswer.customAnswerEn}"
                </p>
                <p className="text-xs sm:text-sm text-slate-600 italic">
                  → {generatedAnswer.customAnswerVi}
                </p>
              </div>

              {/* Applied Techniques */}
              {generatedAnswer.appliedTechniques && (
                <div className="text-xs space-y-1.5 pt-2">
                  <strong className="text-slate-900 block font-black">
                    Các kỹ thuật ghi điểm được lồng ghép:
                  </strong>
                  <ul className="list-disc list-inside space-y-1 text-slate-700 font-medium">
                    {generatedAnswer.appliedTechniques.map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Linking Notes */}
              {generatedAnswer.linkingSoundNotes && generatedAnswer.linkingSoundNotes.length > 0 && (
                <div className="p-3.5 rounded-2xl bg-orange-50 border border-orange-200 text-xs">
                  <strong className="text-orange-900 block mb-1.5 font-black">
                    Gợi ý vị trí nối âm trong câu này:
                  </strong>
                  <div className="flex flex-wrap gap-2">
                    {generatedAnswer.linkingSoundNotes.map((note, idx) => (
                      <span
                        key={idx}
                        className="font-mono px-2.5 py-0.5 rounded-lg bg-white border border-orange-300 text-orange-800 font-bold"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
