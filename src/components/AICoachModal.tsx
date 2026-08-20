import React, { useState, useRef, useEffect } from 'react';
import { MessageSquareQuote, Send, X, Bot, User, Sparkles, Volume2 } from 'lucide-react';

interface AICoachModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  role: 'assistant' | 'user';
  text: string;
}

export const AICoachModal: React.FC<AICoachModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: 'Xin chào bạn! Tôi là Giảng viên AI cố vấn bài thi Cambridge B1 Speaking Part 1 theo tài liệu của ThS. NGƯT Nguyễn Bùi Thùy Linh. Bạn có thắc mắc gì về 20 câu hỏi, cách nối âm (linking sounds), mẹo dùng từ vựng hay các tiêu chí chấm điểm không?'
    }
  ]);
  const [inputVal, setInputVal] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSendMessage = async () => {
    if (!inputVal.trim() || isLoading) return;

    const userText = inputVal.trim();
    const updatedMsgs: Message[] = [...messages, { role: 'user', text: userText }];
    setMessages(updatedMsgs);
    setInputVal('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ask-ai-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userText,
          history: updatedMsgs.slice(-6).map((m) => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
          }))
        })
      });

      const data = await res.json();
      if (data.success && data.reply) {
        setMessages((prev) => [...prev, { role: 'assistant', text: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', text: 'Xin lỗi bạn, hiện tại đường truyền đang bận. Bạn vui lòng thử lại nhé!' }
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: 'Có lỗi kết nối xảy ra. Vui lòng kiểm tra lại mạng của bạn.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayVoice = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-sky-200 shadow-2xl w-full max-w-2xl flex flex-col h-[620px] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-sky-600 via-blue-600 to-orange-500 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white font-bold">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-sm sm:text-base">
                  Giảng Viên AI Cố Vấn B1
                </h3>
                <span className="bg-orange-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                  Cô Thùy Linh's Methodology
                </span>
              </div>
              <p className="text-xs text-sky-100">
                Giải đáp phát âm, từ vựng và chiến lược Speaking Part 1
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Container */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-sky-50/30">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                m.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs ${
                  m.role === 'user'
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'bg-sky-600 text-white shadow-sm'
                }`}
              >
                {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[80%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-orange-500 text-white font-medium rounded-tr-none shadow-sm'
                    : 'bg-white border border-sky-100 text-slate-800 rounded-tl-none shadow-sm space-y-2'
                }`}
              >
                <p className="whitespace-pre-line">{m.text}</p>
                {m.role === 'assistant' && (
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => handlePlayVoice(m.text)}
                      className="text-slate-400 hover:text-sky-600 p-1"
                      title="Nghe đọc"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl bg-white border border-sky-100 rounded-tl-none text-xs text-slate-500 flex items-center gap-2 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce delay-100"></div>
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce delay-200"></div>
                <span>Giảng viên AI đang soạn câu trả lời...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-sky-100 flex items-center gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Đặt câu hỏi về từ vựng, ngữ pháp, mẹo thi Speaking..."
            className="flex-1 p-3.5 rounded-2xl bg-sky-50/50 border border-sky-200 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputVal.trim() || isLoading}
            className="p-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:opacity-50 text-white shadow-md shadow-orange-500/25 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
