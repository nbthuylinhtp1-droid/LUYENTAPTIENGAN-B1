import React, { useState, useEffect, useRef } from 'react';
import { QuestionItem } from '../data/questionsData';
import { 
  Volume2, Mic, MicOff, Sparkles, CheckCircle2, 
  Lightbulb, BookOpen, MessageSquare, RotateCcw, AlertTriangle, Send, HeartHandshake 
} from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface QuestionCardProps {
  question: QuestionItem;
  onSelectForPractice?: (question: QuestionItem) => void;
}

interface EvaluationResult {
  overallScore: number;
  bandLevel: string;
  overallComment: string;
  criteria: {
    pronunciation: { score: number; feedback: string };
    grammar: { score: number; feedback: string };
    vocabulary: { score: number; feedback: string };
    fluency: { score: number; feedback: string };
  };
  strengths: string[];
  improvements: string[];
  upgradedAnswer: string;
  upgradedTranslation: string;
  keyPhrasesLearned: string[];
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [userTranscript, setUserTranscript] = useState<string>('');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResult | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'sample' | 'practice' | 'analysis'>('sample');
  const [speechSupported, setSpeechSupported] = useState<boolean>(true);

  const recognitionRef = useRef<any>(null);

  // Initialize Speech Recognition if supported
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setUserTranscript(currentTranscript);
      };

      recognition.onerror = (err: any) => {
        console.error('Speech recognition error:', err);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    } else {
      setSpeechSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const handlePlayAudio = (textToSpeak: string) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'en-US';
    utterance.rate = playbackSpeed;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert('Trình duyệt của bạn chưa hỗ trợ nhận diện giọng nói tự động. Bạn có thể gõ câu trả lời vào ô bên dưới.');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      setUserTranscript('');
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const handleEvaluateAnswer = async () => {
    if (!userTranscript.trim()) return;

    setIsEvaluating(true);
    try {
      const res = await fetch('/api/evaluate-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: question.id,
          questionEn: question.questionEn,
          questionVi: question.questionVi,
          userAnswer: userTranscript,
          targetSampleAnswer: question.sampleAnswer,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setEvaluationResult(data.data);

        // Sound & visual feedback based on score
        if (data.data.overallScore >= 3.8) {
          soundEffects.triggerGrandCelebration();
        } else {
          soundEffects.triggerGentleEncouragement();
        }
      } else {
        alert(data.error || 'Có lỗi xảy ra khi chấm điểm.');
      }
    } catch (error) {
      console.error('Evaluation error:', error);
      alert('Không thể kết nối với Giám khảo AI lúc này.');
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div
      id={`question-${question.id}`}
      className="rounded-3xl bg-white border border-sky-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
    >
      {/* Question Header */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-sky-50/70 via-white to-orange-50/30 border-b border-sky-100">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-600 to-blue-600 text-white font-black text-xs flex items-center justify-center shadow-sm">
              {question.id}
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
              Nhóm {question.group}: {question.groupNameVi}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handlePlayAudio(question.questionEn)}
              className="p-2 rounded-xl bg-white hover:bg-sky-50 text-sky-700 border border-sky-200 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
              title="Nghe câu hỏi"
            >
              <Volume2 className="w-4 h-4 text-orange-500" />
              <span className="hidden sm:inline">Nghe câu hỏi</span>
            </button>
          </div>
        </div>

        <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
          {question.questionEn}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
          {question.questionVi}
        </p>

        {/* Sub Navigation */}
        <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-sky-100">
          <button
            onClick={() => setActiveSubTab('sample')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'sample'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-sky-50'
            }`}
          >
            Câu trả lời mẫu & Audio
          </button>
          <button
            onClick={() => setActiveSubTab('analysis')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'analysis'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-sky-50'
            }`}
          >
            Mẹo ghi điểm & Từ vựng ({question.vocabulary.length})
          </button>
          <button
            onClick={() => setActiveSubTab('practice')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
              activeSubTab === 'practice'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm'
                : 'text-orange-600 hover:bg-orange-50'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            Luyện nói & AI Chấm điểm
          </button>
        </div>
      </div>

      {/* SubTab 1: Sample Answer & Audio Player */}
      {activeSubTab === 'sample' && (
        <div className="p-5 sm:p-6 space-y-4">
          <div className="p-5 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-sky-800 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-orange-500" />
                Câu trả lời mẫu B1 Distinction (Cô Thùy Linh):
              </span>

              {/* Speed Controller */}
              <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
                <span className="hidden sm:inline">Tốc độ:</span>
                {[0.8, 1.0, 1.2].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setPlaybackSpeed(spd)}
                    className={`px-2 py-0.5 rounded-lg font-bold ${
                      playbackSpeed === spd
                        ? 'bg-sky-600 text-white shadow-sm'
                        : 'bg-white text-slate-600 border border-sky-100'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>

            <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
              "{question.sampleAnswer}"
            </p>
            <p className="text-xs sm:text-sm text-slate-600 italic">
              → {question.sampleAnswerTranslation}
            </p>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => handlePlayAudio(question.sampleAnswer)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  isPlaying
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white shadow-md shadow-sky-600/20'
                }`}
              >
                <Volume2 className="w-4 h-4" />
                <span>{isPlaying ? 'Đang phát...' : 'Nghe giọng phát âm bản xứ'}</span>
              </button>
            </div>
          </div>

          {/* Linking sound highlight if available */}
          {question.linkingSounds && question.linkingSounds.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-orange-50/70 border border-orange-200/80 text-xs">
              <span className="font-bold text-orange-900 flex items-center gap-1.5 mb-1.5">
                <Lightbulb className="w-4 h-4 text-orange-600" />
                Vị trí nối âm tự nhiên (Linking Sounds):
              </span>
              <div className="flex flex-wrap gap-2 mt-1">
                {question.linkingSounds.map((link, idx) => (
                  <span
                    key={idx}
                    className="font-mono px-2.5 py-1 rounded-lg bg-white border border-orange-300 text-orange-800 font-bold shadow-2xs"
                  >
                    {link}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* SubTab 2: Scoring Tips & Vocabulary */}
      {activeSubTab === 'analysis' && (
        <div className="p-5 sm:p-6 space-y-5">
          {/* Scoring Tips */}
          <div>
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-orange-500" />
              Mẹo ghi điểm cốt lõi từ cô Thùy Linh:
            </h4>
            <ul className="space-y-2">
              {question.scoringTips.map((tip, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-sky-50/60 p-3 rounded-xl border border-sky-100"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-medium">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Vocabulary */}
          <div>
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-sky-600" />
              Từ vựng & Cụm từ ghi điểm (High-scoring Vocab):
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {question.vocabulary.map((v, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-sky-100 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <strong className="text-sky-700 font-black text-xs sm:text-sm">
                      {v.phrase}
                    </strong>
                    {v.type && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 font-bold">
                        {v.type}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-700 font-medium">{v.meaning}</p>
                  {v.example && (
                    <p className="text-slate-500 italic text-[11px] pt-1">
                      VD: "{v.example}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SubTab 3: Practice & AI Examiner */}
      {activeSubTab === 'practice' && (
        <div className="p-5 sm:p-6 space-y-4">
          <div className="p-5 rounded-2xl bg-sky-50/50 border border-sky-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Mic className="w-4 h-4 text-orange-500" />
                Thu âm hoặc Gõ câu trả lời của bạn:
              </span>
              {isRecording && (
                <span className="flex items-center gap-1.5 text-xs text-rose-600 font-bold animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                  Đang thu âm qua micro...
                </span>
              )}
            </div>

            <textarea
              value={userTranscript}
              onChange={(e) => setUserTranscript(e.target.value)}
              placeholder="Nhấn 'Bắt đầu nói' để ghi âm hoặc tự gõ câu trả lời tiếng Anh của bạn tại đây..."
              rows={3}
              className="w-full p-3.5 rounded-2xl bg-white border border-sky-200 text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleRecording}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                    isRecording
                      ? 'bg-rose-600 text-white animate-pulse shadow-md shadow-rose-600/30'
                      : 'bg-white hover:bg-orange-50 text-orange-600 border border-orange-200 shadow-xs'
                  }`}
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  <span>{isRecording ? 'Dừng thu âm' : 'Bắt đầu nói (Micro)'}</span>
                </button>

                {userTranscript && (
                  <button
                    onClick={() => setUserTranscript('')}
                    className="p-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-500 text-xs border border-slate-200"
                    title="Xóa nội dung"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
              </div>

              <button
                onClick={handleEvaluateAnswer}
                disabled={isEvaluating || !userTranscript.trim()}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-orange-500/25 flex items-center gap-1.5 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isEvaluating ? 'Giám khảo AI đang chấm...' : 'Chấm điểm B1 & Nghe Nhạc Thưởng'}</span>
              </button>
            </div>
          </div>

          {/* AI Evaluation Output */}
          {evaluationResult && (
            <div className="p-6 rounded-3xl bg-white border-2 border-sky-400 shadow-xl space-y-4 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-sky-100">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-600 to-blue-600 text-white flex flex-col items-center justify-center font-black shadow-md shadow-sky-600/20">
                    <span className="text-lg leading-none">{evaluationResult.overallScore}</span>
                    <span className="text-[10px] text-sky-200">/ 5.0</span>
                  </div>
                  <div>
                    <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700 border border-orange-200">
                      {evaluationResult.bandLevel}
                    </span>
                    <h4 className="text-sm sm:text-base font-black text-slate-900 mt-1">
                      {evaluationResult.overallScore >= 3.8 ? '🎉 Đạt Chuẩn Xuất Sắc B1!' : '🌱 Lời Khuyên Khích Lệ Từ Giám Khảo'}
                    </h4>
                  </div>
                </div>

                {evaluationResult.overallScore < 3.8 && (
                  <div className="text-xs text-orange-600 bg-orange-50 px-3 py-1.5 rounded-xl border border-orange-200 font-bold flex items-center gap-1.5">
                    <HeartHandshake className="w-4 h-4" />
                    Cố lên bạn nhé! Đọc kỹ gợi ý để nâng điểm ngay nào.
                  </div>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-700 italic bg-sky-50/70 p-3.5 rounded-2xl border border-sky-100">
                "{evaluationResult.overallComment}"
              </p>

              {/* 4 Criteria Scores */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {Object.entries(evaluationResult.criteria).map(([key, crit]: [string, { score: number; feedback: string }]) => (
                  <div
                    key={key}
                    className="p-3 rounded-2xl bg-slate-50 border border-sky-100 text-xs text-center"
                  >
                    <span className="text-[11px] text-slate-500 capitalize block mb-0.5 font-semibold">
                      {key}
                    </span>
                    <strong className="text-sm font-black text-sky-700">
                      {crit.score}/5
                    </strong>
                  </div>
                ))}
              </div>

              {/* Strengths & Improvements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                  <strong className="text-emerald-900 flex items-center gap-1 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Điểm mạnh:
                  </strong>
                  <ul className="list-disc list-inside text-slate-700 space-y-1">
                    {evaluationResult.strengths.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-2xl bg-orange-50 border border-orange-200 space-y-1">
                  <strong className="text-orange-900 flex items-center gap-1 font-bold">
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                    Cần cải thiện:
                  </strong>
                  <ul className="list-disc list-inside text-slate-700 space-y-1">
                    {evaluationResult.improvements.map((imp, idx) => (
                      <li key={idx}>{imp}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Upgraded B1 Distinction Answer */}
              {evaluationResult.upgradedAnswer && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-50 to-orange-50 border border-sky-200 space-y-1.5">
                  <span className="text-xs font-black text-sky-800 flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-orange-500" />
                    Phiên bản nâng cấp chuẩn B1 Distinction (Khuyên dùng):
                  </span>
                  <p className="text-sm font-semibold text-slate-900">
                    "{evaluationResult.upgradedAnswer}"
                  </p>
                  <p className="text-xs text-slate-600 italic">
                    → {evaluationResult.upgradedTranslation}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
