import React, { useState } from 'react';
import { VOCABULARY_FLASHCARDS } from '../data/questionsData';
import { 
  Layers, CheckCircle2, XCircle, RotateCcw, Volume2, 
  HelpCircle, Award, Sparkles, ChevronLeft, ChevronRight, HeartHandshake 
} from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Để thay thế cho động từ 'like' bị lặp lại nhiều lần trong Speaking B1, ta nên dùng cụm nào?",
    options: [
      "I am keen on / I am interested in / I am fond of",
      "I am very liking to do",
      "I have like with",
      "I am likeable for"
    ],
    correctAnswer: 0,
    explanation: "Các cấu trúc 'be keen on + V-ing', 'be interested in + V-ing', 'be fond of + V-ing' là những cụm chuẩn B1 Cambridge nâng cao band điểm Vocabulary."
  },
  {
    id: 2,
    question: "Vị trí nối âm (Linking Sound) tự nhiên trong câu 'My name is...' là gì?",
    options: [
      "/neɪm ɪz/ (ngắt rõ từng từ)",
      "/neɪmɪz/ (nối phụ âm /m/ với nguyên âm /ɪ/)",
      "/neɪz ɪm/",
      "/neɪm ziː/"
    ],
    correctAnswer: 1,
    explanation: "Hiện tượng Consonant-to-Vowel linking: phụ âm /m/ của 'name' nối mượt sang nguyên âm /ɪ/ của 'is' thành /neɪmɪz/."
  },
  {
    id: 3,
    question: "Khi giám khảo hỏi 'What did you do yesterday?' (Câu 18), toàn bộ động từ trong câu trả lời phải được chia ở thì nào?",
    options: [
      "Hiện tại hoàn thành (Have + V3)",
      "Quá khứ tiếp diễn (Was/were + V-ing)",
      "Quá khứ đơn (Past Simple: did, took, went, celebrated, had)",
      "Hiện tại đơn (Present Simple: do, take, go)"
    ],
    correctAnswer: 2,
    explanation: "Câu hỏi về hành động đã kết thúc trong quá khứ ('yesterday') bắt buộc 100% động từ phải đồng bộ ở thì Quá khứ đơn (V2/V-ed)."
  },
  {
    id: 4,
    question: "Cụm từ nào diễn đạt ý 'ngủ nướng, dậy muộn hơn ngày thường vào cuối tuần để nghỉ ngơi'?",
    options: [
      "Sleep out",
      "Sleep in",
      "Sleep over",
      "Sleep away"
    ],
    correctAnswer: 1,
    explanation: "'Sleep in' là một phrasal verb tự nhiên của người bản xứ chỉ việc ngủ dậy muộn hơn thường lệ."
  },
  {
    id: 5,
    question: "Cụm từ nào sau đây dùng danh từ ghép chỉ 'người say mê đọc sách'?",
    options: [
      "Avid reader",
      "Crazy booker",
      "Strong reader",
      "Heavy reading"
    ],
    correctAnswer: 0,
    explanation: "'Avid reader' là một collocation học thuật cao cấp chỉ người có niềm đam mê đọc sách mãnh liệt."
  },
  {
    id: 6,
    question: "Cấu trúc Danh động từ (Gerund V-ing) làm chủ ngữ nào sau đây là chính xác và ăn điểm cao?",
    options: [
      "Help other people make me happy",
      "Helping other people and curing diseases make me happy",
      "To helped people make me happy",
      "For helping people is happy"
    ],
    correctAnswer: 1,
    explanation: "Sử dụng Danh động từ V-ing làm chủ ngữ ('Helping other people and curing diseases...') chứng minh khả năng làm chủ cấu trúc câu phức của thí sinh B1."
  }
];

export const FlashcardsAndQuiz: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'flashcards' | 'quiz'>('flashcards');

  // Flashcards state
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Quiz state
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const [feedbackToast, setFeedbackToast] = useState<{ type: 'correct' | 'incorrect'; text: string } | null>(null);

  const currentCard = VOCABULARY_FLASHCARDS[currentCardIndex];

  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev + 1) % VOCABULARY_FLASHCARDS.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev - 1 + VOCABULARY_FLASHCARDS.length) % VOCABULARY_FLASHCARDS.length);
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

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (showResults) return;
    
    const targetQ = QUIZ_QUESTIONS.find(q => q.id === questionId);
    const isRight = targetQ && targetQ.correctAnswer === optionIdx;

    setUserAnswers(prev => ({ ...prev, [questionId]: optionIdx }));

    // Instant sound and visual feedback
    if (isRight) {
      soundEffects.triggerGrandCelebration();
      setFeedbackToast({
        type: 'correct',
        text: '🎉 Xuất sắc! Bạn đã chọn đáp án hoàn toàn chính xác!'
      });
    } else {
      soundEffects.triggerGentleEncouragement();
      setFeedbackToast({
        type: 'incorrect',
        text: '🌱 Chưa chính xác rồi! Đừng nản lòng nhé, hãy đọc kỹ gợi ý bên dưới để tiến bộ hơn nào!'
      });
    }

    setTimeout(() => {
      setFeedbackToast(null);
    }, 3200);
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
    let correctCount = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) correctCount++;
    });

    if (correctCount >= 4) {
      soundEffects.triggerGrandCelebration();
    } else {
      soundEffects.triggerGentleEncouragement();
    }
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setShowResults(false);
    setFeedbackToast(null);
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Toast Feedback Notification */}
      {feedbackToast && (
        <div
          className={`fixed top-20 right-4 sm:right-8 z-50 p-4 rounded-2xl shadow-xl border flex items-center gap-3 transition-all animate-bounce ${
            feedbackToast.type === 'correct'
              ? 'bg-emerald-500 text-white border-emerald-400'
              : 'bg-orange-500 text-white border-orange-400'
          }`}
        >
          {feedbackToast.type === 'correct' ? (
            <Sparkles className="w-6 h-6 text-amber-200 shrink-0" />
          ) : (
            <HeartHandshake className="w-6 h-6 text-white shrink-0" />
          )}
          <span className="text-xs sm:text-sm font-bold">{feedbackToast.text}</span>
        </div>
      )}

      {/* Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sky-100 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-6 h-6 text-sky-600" />
            Luyện Từ Vựng & Cấu Trúc Ghi Điểm B1
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            20+ Collocations, Phrasal Verbs và Idioms độc quyền từ giáo trình cô Thùy Linh
          </p>
        </div>

        <div className="flex items-center p-1.5 bg-sky-50 rounded-2xl border border-sky-100">
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'flashcards'
                ? 'bg-white text-sky-700 shadow-sm border border-sky-100'
                : 'text-slate-600 hover:text-sky-600'
            }`}
          >
            Thẻ Flashcards ({VOCABULARY_FLASHCARDS.length})
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'quiz'
                ? 'bg-white text-orange-600 shadow-sm border border-orange-100'
                : 'text-slate-600 hover:text-orange-600'
            }`}
          >
            Trắc Nghiệm B1 (6 Câu)
          </button>
        </div>
      </div>

      {/* Mode 1: Flashcards */}
      {activeTab === 'flashcards' && (
        <div className="space-y-6 flex flex-col items-center">
          <div className="w-full flex items-center justify-between text-xs font-semibold text-slate-500 max-w-xl">
            <span className="px-2.5 py-1 rounded-full bg-sky-100 text-sky-800">
              Thẻ {currentCardIndex + 1} / {VOCABULARY_FLASHCARDS.length}
            </span>
            <span className="font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
              {currentCard.group}
            </span>
          </div>

          {/* Flip Card Container */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full max-w-xl h-72 sm:h-80 cursor-pointer perspective-1000 select-none"
          >
            <div
              className={`relative w-full h-full rounded-3xl p-8 transition-transform duration-500 transform-style-3d shadow-xl border ${
                isFlipped
                  ? 'bg-gradient-to-br from-sky-900 via-blue-900 to-slate-900 text-white border-sky-600 rotate-y-180'
                  : 'bg-white text-slate-900 border-sky-100 hover:border-sky-300'
              } flex flex-col justify-between`}
            >
              {!isFlipped ? (
                // Front
                <div className="flex flex-col justify-between h-full">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                      {currentCard.type}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayAudio(currentCard.term);
                      }}
                      className="p-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-600 transition-colors"
                      title="Nghe phát âm"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="text-center my-auto">
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      {currentCard.term}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2">
                      (Nhấn vào thẻ để xem nghĩa tiếng Việt & ví dụ câu)
                    </p>
                  </div>

                  <div className="text-center text-xs text-sky-600 font-bold">
                    Chạm để lật mặt sau ↻
                  </div>
                </div>
              ) : (
                // Back
                <div className="flex flex-col justify-between h-full transform rotate-y-180">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                      Ý nghĩa & Cách dùng
                    </span>
                    <span className="text-xs text-sky-300 font-mono">B1 Distinction</span>
                  </div>

                  <div className="my-auto space-y-3">
                    <p className="text-lg sm:text-xl font-extrabold text-amber-300">
                      {currentCard.meaning}
                    </p>
                    <div className="p-3.5 rounded-2xl bg-sky-950/80 border border-sky-800 text-xs sm:text-sm text-slate-100 leading-relaxed">
                      <strong className="text-orange-400">Ví dụ: </strong>
                      "{currentCard.example}"
                    </div>
                  </div>

                  <div className="text-center text-xs text-slate-300">
                    Chạm để quay lại mặt trước ↻
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrevCard}
              className="p-3.5 rounded-2xl bg-white hover:bg-sky-50 text-slate-700 border border-sky-100 shadow-sm transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-sky-600/25 transition-all"
            >
              Lật thẻ xem nghĩa
            </button>
            <button
              onClick={handleNextCard}
              className="p-3.5 rounded-2xl bg-white hover:bg-sky-50 text-slate-700 border border-sky-100 shadow-sm transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Mode 2: Quiz */}
      {activeTab === 'quiz' && (
        <div className="space-y-6">
          <div className="space-y-6">
            {QUIZ_QUESTIONS.map((q, qIndex) => {
              const isAnswered = userAnswers[q.id] !== undefined;
              const isCorrect = userAnswers[q.id] === q.correctAnswer;

              return (
                <div
                  key={q.id}
                  className={`p-6 rounded-3xl border transition-all shadow-sm ${
                    showResults
                      ? isCorrect
                        ? 'bg-emerald-50/70 border-emerald-300'
                        : 'bg-orange-50/70 border-orange-300'
                      : 'bg-white border-sky-100 hover:border-sky-200'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-600 to-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                      {qIndex + 1}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                      {q.question}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = userAnswers[q.id] === optIdx;
                      let optionClasses = 'p-3.5 rounded-2xl border text-xs sm:text-sm font-medium text-left transition-all ';

                      if (showResults) {
                        if (optIdx === q.correctAnswer) {
                          optionClasses += 'bg-emerald-500 text-white border-emerald-600 font-bold shadow-sm';
                        } else if (isSelected && !isCorrect) {
                          optionClasses += 'bg-orange-500 text-white border-orange-600 font-bold shadow-sm';
                        } else {
                          optionClasses += 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                        }
                      } else {
                        if (isSelected) {
                          optionClasses += 'bg-sky-600 text-white border-sky-700 shadow-md shadow-sky-600/20 font-bold';
                        } else {
                          optionClasses += 'bg-slate-50 border-sky-100 text-slate-700 hover:bg-sky-50 hover:border-sky-300';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={optionClasses}
                        >
                          <span className="mr-2 font-black">{String.fromCharCode(65 + optIdx)}.</span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {showResults && (
                    <div className="mt-4 p-4 rounded-2xl bg-white border border-sky-100 text-xs sm:text-sm text-slate-700 space-y-1.5 shadow-sm">
                      <strong className="text-sky-800 block font-bold flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-orange-500" />
                        Giải thích chi tiết:
                      </strong>
                      <p className="leading-relaxed">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quiz Action Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-sky-100">
            {!showResults ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(userAnswers).length < QUIZ_QUESTIONS.length}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:opacity-50 text-white font-bold text-sm shadow-md shadow-orange-500/25 transition-all ml-auto"
              >
                Nộp bài & Xem điểm tổng
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-600 to-blue-600 text-white flex flex-col items-center justify-center font-black shadow-md shadow-sky-600/20">
                    <span className="text-lg leading-none">{calculateScore()}</span>
                    <span className="text-[11px] text-sky-200">/{QUIZ_QUESTIONS.length}</span>
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-sm sm:text-base">
                      {calculateScore() >= 5 ? '🎉 Xuất sắc! Nắm chắc lý thuyết B1' : '🌱 Rất tốt! Hãy tiếp tục rèn luyện nhé'}
                    </h4>
                    <p className="text-xs text-slate-500">
                      Bạn đã trả lời đúng {calculateScore()}/{QUIZ_QUESTIONS.length} câu hỏi
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleResetQuiz}
                  className="px-5 py-2.5 rounded-2xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold flex items-center gap-1.5 border border-sky-200"
                >
                  <RotateCcw className="w-4 h-4" />
                  Làm lại bài thi
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
