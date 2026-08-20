import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API: Health check
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API: Evaluate User Speaking Answer
app.post("/api/evaluate-answer", async (req: Request, res: Response) => {
  try {
    const { questionId, questionEn, questionVi, userAnswer, targetSampleAnswer } = req.body;

    if (!userAnswer || !userAnswer.trim()) {
      return res.status(400).json({ error: "Vui lòng cung cấp câu trả lời của bạn." });
    }

    const ai = getGeminiClient();

    const prompt = `
Bạn là Giám khảo chấm thi Cambridge B1 Preliminary Speaking (Part 1) và là chuyên gia khảo thí theo phương pháp của Thạc sĩ Nhà giáo Ưu tú Nguyễn Bùi Thùy Linh.

Hãy đánh giá chi tiết câu trả lời của thí sinh cho câu hỏi sau:
- Câu hỏi (EN): "${questionEn}"
- Câu hỏi (VI): "${questionVi}"
- Câu trả lời mẫu chuẩn B1 của cô Thùy Linh: "${targetSampleAnswer}"
- Câu trả lời thực tế của thí sinh: "${userAnswer}"

Hãy đánh giá chính xác dựa trên 4 tiêu chí B1 Cambridge:
1. Pronunciation (Phát âm & Nối âm: nối âm tự nhiên, phát âm đuôi -s/es, -ed, trọng âm từ)
2. Grammar (Ngữ pháp: sự đa dạng thì, thì Quá khứ đơn, Hiện tại hoàn thành tiếp diễn, Danh động từ V-ing làm chủ ngữ, mệnh đề quan hệ)
3. Vocabulary (Từ vựng: dùng Phrasal verbs, Collocations, Idioms như 'get on well', 'avid reader', 'release stress', 'recharge energy', tránh lặp từ cơ bản 'like')
4. Fluency & Coherence (Độ trôi chảy, sử dụng từ nối First/Second/Finally, filler words 'Actually, I would say that')

Trả về kết quả dưới định dạng JSON với cấu trúc:
{
  "overallScore": number (thang điểm từ 1.0 đến 5.0, ví dụ 4.2),
  "bandLevel": string (ví dụ: "B1 Pass", "B1 Merit", "B1 Distinction", "A2 Borderline"),
  "overallComment": string (nhận xét tổng quan súc tích, khích lệ bằng tiếng Việt),
  "criteria": {
    "pronunciation": {
      "score": number (thang 5),
      "feedback": string (nhận xét & chỉ dẫn nối âm/trọng âm cụ thể)
    },
    "grammar": {
      "score": number (thang 5),
      "feedback": string (chỉ ra lỗi sai nếu có và khen các cấu trúc tốt)
    },
    "vocabulary": {
      "score": number (thang 5),
      "feedback": string (đánh giá từ vựng & gợi ý từ cao cấp hơn)
    },
    "fluency": {
      "score": number (thang 5),
      "feedback": string (đánh giá độ mạch lạc, từ nối)
    }
  },
  "strengths": string[] (2-3 điểm mạnh nổi bật),
  "improvements": string[] (2-3 điểm cần cải thiện ngay),
  "upgradedAnswer": string (câu trả lời viết lại chuẩn B1 Distinction mượt mà nhất bằng tiếng Anh),
  "upgradedTranslation": string (bản dịch tiếng Việt của câu viết lại),
  "keyPhrasesLearned": string[] (3 cụm từ vựng/cấu trúc đắt giá có thể áp dụng)
}
Chỉ trả về JSON thuần túy, không bọc trong markdown code block nếu có thể hoặc bọc chuẩn.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const resultText = response.text || "{}";
    const parsedData = JSON.parse(resultText);
    res.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error("Error evaluating answer:", error);
    res.status(500).json({
      error: "Không thể đánh giá câu trả lời lúc này. Vui lòng thử lại sau.",
      details: error.message,
    });
  }
});

// API: Generate Customized Answers
app.post("/api/generate-custom-answer", async (req: Request, res: Response) => {
  try {
    const { questionId, questionEn, userProfile } = req.body;
    // userProfile: { name, city, jobOrMajor, favoriteHobby, weekendActivity, etc. }

    const ai = getGeminiClient();

    const prompt = `
Bạn là chuyên gia luyện thi Cambridge B1 Speaking theo bài giảng của ThS. NGƯT Nguyễn Bùi Thùy Linh.
Nhiệm vụ: Tạo một câu trả lời mẫu chuẩn B1 (đạt mức Distinction) được CÁ NHÂN HÓA theo thông tin của học viên.

- Câu hỏi: "${questionEn}"
- Thông tin học viên cung cấp: ${JSON.stringify(userProfile)}

Yêu cầu bắt buộc:
1. Áp dụng chuẩn các kỹ thuật ghi điểm trong giáo trình:
   - Dùng phrasal verbs và collocations ghi điểm (get on well, maintain a healthy lifestyle, broaden horizon, release stress, avid reader, sleep in, recharge energy,...).
   - Đa dạng ngữ pháp (Hiện tại tiếp diễn / Hoàn thành tiếp diễn / Quá khứ đơn / Danh từ V-ing làm chủ ngữ / Mệnh đề ', which...').
   - Dùng từ nối hoặc từ đệm tự nhiên (Actually, First/Second/Finally).
2. Tự nhiên, dài từ 3 đến 5 câu (khoảng 35 - 55 từ), phù hợp bài thi B1 Part 1 (trả lời trong 15-25 giây).

Trả về JSON:
{
  "customAnswerEn": string (câu trả lời tiếng Anh),
  "customAnswerVi": string (dịch nghĩa tiếng Việt),
  "appliedTechniques": string[] (danh sách các mẹo/cấu trúc ghi điểm đã được áp dụng trong câu),
  "linkingSoundNotes": string[] (hướng dẫn các chỗ nối âm quan trọng trong câu này)
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const resultText = response.text || "{}";
    res.json({ success: true, data: JSON.parse(resultText) });
  } catch (error: any) {
    console.error("Error generating custom answer:", error);
    res.status(500).json({
      error: "Không thể tạo câu trả lời cá nhân hóa lúc này.",
      details: error.message,
    });
  }
});

// API: Ask AI Speaking Coach
app.post("/api/ask-coach", async (req: Request, res: Response) => {
  try {
    const { userQuestion, contextQuestion } = req.body;

    if (!userQuestion || !userQuestion.trim()) {
      return res.status(400).json({ error: "Vui lòng nhập câu hỏi." });
    }

    const ai = getGeminiClient();

    const systemInstruction = `
Bạn là Giảng viên AI hướng dẫn luyện thi Speaking B1 Cambridge, chuyên sâu vào tài liệu "20 CÂU HỎI VÀ TRẢ LỜI MẪU SPEAKING PART 1 B1 CAMBRIDGE" của Thạc sĩ Nhà giáo Ưu tú Nguyễn Bùi Thùy Linh.
Hãy giải thích ngắn gọn, súc tích, dễ hiểu, đưa ví dụ song ngữ Anh - Việt, tập trung vào mẹo phát âm, nối âm, từ vựng ăn điểm và cấu trúc ngữ pháp chuẩn B1.
`;

    const prompt = `
Ngữ cảnh câu hỏi thi B1: ${contextQuestion || "Chung về 20 câu hỏi Speaking B1 Part 1"}
Câu hỏi của học viên: "${userQuestion}"

Hãy trả lời học viên bằng tiếng Việt thân thiện, rõ ràng, có phiên âm IPA nếu liên quan đến phát âm, và cung cấp ví dụ mẫu.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        systemInstruction,
      },
    });

    res.json({ success: true, answer: response.text });
  } catch (error: any) {
    console.error("Error in ask-coach:", error);
    res.status(500).json({
      error: "Không thể kết nối với Giảng viên AI lúc này.",
      details: error.message,
    });
  }
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`B1 Speaking Master Server running on port ${PORT}`);
  });
}

startServer();
