import React, { useState, useEffect, useRef } from 'react';
import { QUESTIONS_DATA, QuestionItem } from '../data/questionsData';
import { 
  Award, Play, Volume2, Mic, MicOff, RotateCcw, 
  CheckCircle2, Clock, Sparkles, ChevronRight, AlertCircle, HeartHandshake 
} from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface TestStepAnswer {
  question: QuestionItem;
  userAnswer: string;
}

export const MockTestSimulator: React.FC = () => {
  const [testActive, setTestActive] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedQuestions, setSelectedQuestions] = useState<QuestionItem[]>([]);
  const [answers, setAnswers] = useState<TestStepAnswer[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(25);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isEvaluatingFullTest, setIsEvaluatingFullTest] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<any | null>(null);

  const recognitionRef = useRef<any>(null);
  const timerIntervalRef = useRef<any>(null);

  // Setup Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let text = '';
        for (let i = 0; i < event.results.length; i++) {
          text += event.results[i][0].transcript;
        }
        setCurrentTranscript(text);
      };

      recognition.onerror = (err: any) => {
        console.error('Speech recognition error:', err);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) recognitionRef.current.abort();
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  const handleStartTest = () => {
    // Pick 4 representative questions across groups (Group 1, 2, 3/4, 5)
    const q1 = QUESTIONS_DATA.filter((q) => q.group === 1)[Math.floor(Math.random() * 3)];
    const q2 = QUESTIONS_DATA.filter((q) => q.group === 2)[Math.floor(Math.random() * 6)];
    const q3 = QUESTIONS_DATA.filter((q) => q.group === 3 || q.group === 4)[Math.floor(Math.random() * 8)];
    const q4 = QUESTIONS_DATA.filter((q) => q.group === 5)[Math.floor(Math.random() * 3)];

    const chosen = [q1, q2, q3, q4];
    setSelectedQuestions(chosen);
    setAnswers([]);
    setCurrentStep(0);
    setCurrentTranscript('');
    setTestActive(true);
    setTestResult(null);

    // Prompt examiner voice
    speakExaminer(chosen[0].questionEn);
    startTimer();
  };

  const speakExaminer = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const startTimer = () => {
    setTimerSeconds(25);
    setIsTimerRunning(true);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    timerIntervalRef.current = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timerIntervalRef.current);
          setIsTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert('Vui lòng gõ câu trả lời trực tiếp nếu trình duyệt chưa hỗ trợ ghi âm trực tiếp.');
      return;
    }
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const handleNextQuestion = () => {
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    const updatedAnswers = [
      ...answers,
      {
        question: selectedQuestions[currentStep],
        userAnswer: currentTranscript.trim() || '(Thí sinh không trả lời)',
      },
    ];
    setAnswers(updatedAnswers);

    if (currentStep < selectedQuestions.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setCurrentTranscript('');
      speakExaminer(selectedQuestions[nextStep].questionEn);
      startTimer();
    } else {
      // Completed all questions -> Evaluate Full Test
      setTestActive(false);
      evaluateFullMockTest(updatedAnswers);
    }
  };

  const evaluateFullMockTest = async (allAnswers: TestStepAnswer[]) => {
    setIsEvaluatingFullTest(true);
    try {
      // Build prompt for AI Examiner
      const payload = {
        questionId: 999,
        questionEn: "Complete B1 Preliminary Speaking Part 1 Exam",
        questionVi: "Toàn bộ bài thi mẫu 4 câu B1 Speaking Part 1",
        userAnswer: allAnswers.map((a, i) => `Q${i + 1}: ${a.question.questionEn}\nCandidate Answer: ${a.userAnswer}`).join("\n\n"),
        targetSampleAnswer: allAnswers.map((a, i) => `Q${i + 1}: ${a.question.sampleAnswer}`).join("\n"),
      };

      const res = await fetch('/api/evaluate-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setTestResult(data.data);
        if (data.data.overallScore >= 3.8) {
          soundEffects.triggerGrandCelebration();
        } else {
          soundEffects.triggerGentleEncouragement();
        }
      }
    } catch (err) {
      console.error(err);
      alert('Không thể xuất bảng điểm lúc này.');
    } finally {
      setIsEvaluatingFullTest(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      {/* Header */}
      <div className="border-b border-sky-100 pb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold mb-2">
          <Award className="w-3.5 h-3.5" />
          Cambridge B1 Mock Exam
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">
          Phòng Thi Thử B1 Speaking Part 1 (AI Examiner)
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Mô phỏng 1 lượt phỏng vấn thực tế gồm 4 câu hỏi từ các nhóm chủ đề khác nhau với đồng hồ đếm ngược và chấm điểm 4 tiêu chí kèm hiệu ứng âm thanh.
        </p>
      </div>

      {!testActive && !testResult && !isEvaluatingFullTest && (
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-sky-100 text-center space-y-6 shadow-sm">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-sky-600 to-blue-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-sky-600/20">
            <Award className="w-10 h-10" />
          </div>

          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              Sẵn sàng bắt đầu bài thi thử?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Giám khảo sẽ lần lượt hỏi bạn 4 câu hỏi. Bạn có khoảng 25 giây để trả lời cho mỗi câu bằng cách nói qua micro hoặc gõ vào ô trả lời.
            </p>
          </div>

          <button
            onClick={handleStartTest}
            className="px-9 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-sm sm:text-base shadow-lg shadow-orange-500/30 inline-flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5"
          >
            <Play className="w-5 h-5 fill-current" />
            Bắt đầu thi thử ngay
          </button>
        </div>
      )}

      {/* Active Mock Test Screen */}
      {testActive && selectedQuestions.length > 0 && (
        <div className="space-y-6">
          {/* Progress bar */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>Câu hỏi {currentStep + 1} / {selectedQuestions.length}</span>
            <div className="flex items-center gap-1.5 text-orange-600 font-mono bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
              <Clock className="w-4 h-4" />
              <span>{timerSeconds}s</span>
            </div>
          </div>

          <div className="w-full bg-sky-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-sky-600 to-blue-600 h-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / selectedQuestions.length) * 100}%` }}
            ></div>
          </div>

          {/* Question Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-sky-900 via-blue-950 to-slate-900 text-white border border-sky-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-orange-400 uppercase tracking-wider">
                Giám khảo Cambridge đang hỏi:
              </span>
              <button
                onClick={() => speakExaminer(selectedQuestions[currentStep].questionEn)}
                className="p-2 rounded-xl bg-sky-800/80 hover:bg-sky-700 text-sky-200 text-xs font-bold flex items-center gap-1.5"
              >
                <Volume2 className="w-4 h-4 text-orange-400" />
                <span>Nghe lại câu hỏi</span>
              </button>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
              "{selectedQuestions[currentStep].questionEn}"
            </h3>
            <p className="text-xs sm:text-sm text-sky-200 font-medium">
              ({selectedQuestions[currentStep].questionVi})
            </p>
          </div>

          {/* User Input & Microphone */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-sky-100 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">
                Câu trả lời của bạn:
              </span>
              {isRecording && (
                <span className="text-xs text-rose-600 font-bold flex items-center gap-1.5 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                  Đang ghi âm câu trả lời...
                </span>
              )}
            </div>

            <textarea
              value={currentTranscript}
              onChange={(e) => setCurrentTranscript(e.target.value)}
              placeholder="Nhấn 'Bật Micro' để nói hoặc gõ câu trả lời tiếng Anh của bạn tại đây..."
              rows={3}
              className="w-full p-4 rounded-2xl bg-sky-50/50 border border-sky-200 text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={toggleRecording}
                className={`px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all ${
                  isRecording
                    ? 'bg-rose-600 text-white animate-pulse shadow-md shadow-rose-600/30'
                    : 'bg-white hover:bg-orange-50 text-orange-600 border border-orange-200 shadow-xs'
                }`}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                <span>{isRecording ? 'Dừng Micro' : 'Bật Micro & Trả lời'}</span>
              </button>

              <button
                onClick={handleNextQuestion}
                className="px-7 py-3 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-sky-600/25 flex items-center gap-2 transition-all"
              >
                <span>{currentStep === selectedQuestions.length - 1 ? 'Hoàn thành & Chấm điểm' : 'Câu tiếp theo'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Evaluating State */}
      {isEvaluatingFullTest && (
        <div className="p-12 text-center bg-white rounded-3xl border border-sky-100 space-y-4 shadow-sm">
          <div className="w-14 h-14 rounded-full border-4 border-orange-500 border-t-transparent animate-spin mx-auto"></div>
          <h3 className="text-lg font-black text-slate-900">
            Hội đồng Giám khảo AI đang chấm điểm 4 tiêu chí...
          </h3>
          <p className="text-xs text-slate-500">
            Đang phân tích Pronunciation, Grammar, Vocabulary và Fluency của toàn bộ bài thi.
          </p>
        </div>
      )}

      {/* Final Scorecard */}
      {testResult && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-sky-400 shadow-xl space-y-6 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sky-100">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-600 to-blue-600 text-white flex flex-col items-center justify-center font-black shadow-lg shadow-sky-600/25">
                <span className="text-xl leading-none">{testResult.overallScore}</span>
                <span className="text-xs text-sky-200">/ 5.0</span>
              </div>
              <div>
                <span className="text-xs font-black px-3 py-1 rounded-full bg-orange-100 text-orange-700 border border-orange-200">
                  {testResult.bandLevel}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                  Bảng Điểm B1 Speaking Part 1
                </h3>
              </div>
            </div>

            <button
              onClick={handleStartTest}
              className="px-5 py-2.5 rounded-2xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold flex items-center gap-1.5 border border-sky-200"
            >
              <RotateCcw className="w-4 h-4" />
              Thi lại đề khác
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs sm:text-sm text-slate-700 italic">
            "{testResult.overallComment}"
          </div>

          {/* 4 Criteria Scores */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(testResult.criteria).map(([key, item]: [string, any]) => (
              <div
                key={key}
                className="p-4 rounded-2xl bg-slate-50 border border-sky-100 text-center space-y-1"
              >
                <span className="text-xs text-slate-500 capitalize block font-semibold">
                  {key}
                </span>
                <strong className="text-base font-black text-sky-700">
                  {item.score}/5
                </strong>
                <p className="text-[11px] text-slate-500 line-clamp-2">
                  {item.feedback}
                </p>
              </div>
            ))}
          </div>

          {/* Upgraded Recommendation */}
          {testResult.upgradedAnswer && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-sky-50 to-orange-50 border border-sky-200 space-y-1.5">
              <span className="text-xs font-black text-sky-800 flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-orange-500" />
                Gợi ý nâng cấp toàn bài theo chuẩn B1 Distinction:
              </span>
              <p className="text-sm font-semibold text-slate-900">
                "{testResult.upgradedAnswer}"
              </p>
              <p className="text-xs text-slate-600 italic">
                → {testResult.upgradedTranslation}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
