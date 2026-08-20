export interface QuestionItem {
  id: number;
  group: number;
  groupNameVi: string;
  groupNameEn: string;
  questionEn: string;
  questionVi: string;
  sampleAnswer: string;
  sampleAnswerTranslation: string;
  scoringTips: string[];
  vocabulary: {
    phrase: string;
    meaning: string;
    type?: 'collocation' | 'phrasal_verb' | 'idiom' | 'grammar_structure' | 'filler';
    example?: string;
  }[];
  grammarFocus: string[];
  pronunciationTip?: string;
  linkingSounds?: string[];
  followUpQuestions?: string[];
}

export interface QuestionGroup {
  id: number;
  titleVi: string;
  titleEn: string;
  description: string;
  questionCount: number;
  iconName: string;
}

export const QUESTION_GROUPS: QuestionGroup[] = [
  {
    id: 1,
    titleVi: "Thông tin cá nhân cơ bản",
    titleEn: "Personal Information",
    description: "Các câu hỏi khởi động về tên, cách đánh vần và họ. Trọng tâm là phát âm 26 chữ cái và nối âm tự nhiên.",
    questionCount: 3,
    iconName: "User"
  },
  {
    id: 2,
    titleVi: "Gia đình & Nơi sống",
    titleEn: "Family & Hometown",
    description: "Hỏi về anh chị em, quê hương, thời tiết, địa chỉ, khoảng cách và phương tiện di chuyển hàng ngày.",
    questionCount: 6,
    iconName: "Home"
  },
  {
    id: 3,
    titleVi: "Học tập & Công việc",
    titleEn: "Study & English",
    description: "Hỏi về chuyên ngành, thời gian học tiếng Anh, lý do học tiếng Anh và mục tiêu tương lai.",
    questionCount: 3,
    iconName: "GraduationCap"
  },
  {
    id: 4,
    titleVi: "Sở thích & Thời gian rảnh",
    titleEn: "Hobbies & Free Time",
    description: "Hỏi về hoạt động lúc rảnh rỗi, thể loại âm nhạc, phim ảnh, sách và các môn thể thao yêu thích.",
    questionCount: 5,
    iconName: "Heart"
  },
  {
    id: 5,
    titleVi: "Hoạt động thường nhật & Kế hoạch",
    titleEn: "Daily Activities & Plans",
    description: "Hỏi về hoạt động đã làm hôm qua (quá khứ), dự định cuối tuần tới (tương lai) và khoảng thời gian yêu thích trong ngày.",
    questionCount: 3,
    iconName: "Calendar"
  }
];

export const SPEAKING_CRITERIA = [
  {
    id: "pronunciation",
    nameVi: "Pronunciation (Phát âm)",
    weight: "25%",
    description: "Phát âm chuẩn từng âm trong bảng chữ cái và từ vựng, biết cách đọc nối âm tự nhiên (Linking sounds). Tránh phát âm sai đuôi -s/es, -ed.",
    keyPoints: [
      "Phát âm chính xác 26 chữ cái tiếng Anh để đánh vần tên (A-Z, chú ý các âm khó như J, G, H, W, Y, R, E, I).",
      "Nối âm phụ âm - nguyên âm tự nhiên (Consonant to Vowel Linking), ví dụ: 'name is' -> /neɪmɪz/.",
      "Ngữ điệu tự nhiên (Intonation), lên giọng cuối câu hỏi Yes/No, xuống giọng câu hỏi Wh- và câu trần thuật.",
      "Phát âm chuẩn đuôi -ed (excited /ɪd/, relaxed /t/, celebrated /ɪd/) và -s/es."
    ],
    color: "amber"
  },
  {
    id: "grammar",
    nameVi: "Grammar (Ngữ pháp)",
    weight: "25%",
    description: "Có nền tảng vững vàng, đặt câu đầy đủ chủ ngữ - vị ngữ, đa dạng hóa các thì và cấu trúc câu phức/ghép.",
    keyPoints: [
      "Đa dạng thì: Hiện tại đơn (Present Simple), Hiện tại tiếp diễn (Present Continuous), Hiện tại hoàn thành tiếp diễn (Present Perfect Continuous), Quá khứ đơn (Past Simple), Tương lai (Be going to / Will).",
      "Sử dụng Danh động từ (Gerund V-ing) làm chủ ngữ: 'Helping other people and curing diseases make me happy.'",
      "Cấu trúc chỉ thời gian & phương tiện: 'It takes / doesn't take someone time to do something', 'by + phương tiện', 'on foot'.",
      "Sử dụng mệnh đề quan hệ và liên từ chỉ nguyên nhân/kết quả: which, because, so, therefore, although."
    ],
    color: "blue"
  },
  {
    id: "vocabulary",
    nameVi: "Vocabulary (Từ vựng)",
    weight: "25%",
    description: "Sử dụng từ vựng phong phú, tự nhiên, thay thế các từ lặp lại cơ bản bằng Phrasal Verbs, Collocations và Idiomatic expressions.",
    keyPoints: [
      "Thay thế 'like' bằng: 'be keen on', 'be interested in', 'be fond of', 'go for'.",
      "Cụm từ ghi điểm: 'an only child', 'get on well with each other', 'release stress', 'get out of my mind', 'broaden my horizon', 'avid reader', 'maintain a healthy lifestyle', 'take up sports', 'sleep in', 'recharge energy'.",
      "Từ vựng chuyên sâu theo chủ đề: instrumental music, genres, sound system, e-books, street food stalls, private time.",
      "Tính từ miêu tả cảm xúc chính xác: excited, relaxed (đuôi -ed chỉ cảm xúc bản thân) vs exciting, impressive (đuôi -ing/-ive chỉ tính chất sự vật)."
    ],
    color: "emerald"
  },
  {
    id: "fluency",
    nameVi: "Fluency & Confidence (Độ trôi chảy & Tự tin)",
    weight: "25%",
    description: "Diễn đạt mạch lạc, kết hợp cảm xúc tự nhiên, tránh học vẹt hay ngập ngừng quá lâu bằng cách sử dụng Filler Words hợp lý.",
    keyPoints: [
      "Sử dụng từ đệm tự nhiên (Fillers): 'Actually', 'I would say that', 'Well', 'To be honest', 'I guess'.",
      "Trình bày theo cấu trúc phân nhánh rõ ràng (Signposting): 'First,... Second,... Finally,...'.",
      "Mở rộng câu trả lời với lý do và ví dụ thực tế (Rule of Extension: Answer + Reason + Detail/Example).",
      "Tốc độ nói vừa phải, ngắt nghỉ đúng cụm từ (chunking) thay vì ngắt từng chữ rời rạc."
    ],
    color: "purple"
  }
];

export const QUESTIONS_DATA: QuestionItem[] = [
  // Nhóm 1
  {
    id: 1,
    group: 1,
    groupNameVi: "Thông tin cá nhân cơ bản",
    groupNameEn: "Personal Information",
    questionEn: "What is your full name?",
    questionVi: "Họ tên đầy đủ của bạn là gì?",
    sampleAnswer: "My full name is Trương Kiệt Anh.",
    sampleAnswerTranslation: "Họ tên đầy đủ của tôi là Trương Kiệt Anh.",
    scoringTips: [
      "Chú ý hiện tượng nối âm tự nhiên giữa 'name' và 'is' (/neɪmɪz/ -> My name_is).",
      "Nói rõ ràng, tự tin, phát âm chính xác âm đuôi /m/ và /z/.",
      "Có thể nói thêm tên gọi thân mật (nickname) hoặc tên thường được bạn bè gọi: 'You can call me Kiet Anh.'"
    ],
    vocabulary: [
      { phrase: "Full name", meaning: "Họ và tên đầy đủ", type: "collocation", example: "Please write your full name in the form." },
      { phrase: "First name / Given name", meaning: "Tên chính", type: "collocation", example: "My first name is Anh." },
      { phrase: "Middle name", meaning: "Tên đệm / Tên lót", type: "collocation", example: "My middle name is Kiet." }
    ],
    grammarFocus: [
      "Câu đơn chuẩn S + V + C (My full name + is + [Name])",
      "Nối âm phụ âm cuối với nguyên âm đầu: name + is -> /neɪmɪz/"
    ],
    pronunciationTip: "Luyện phát âm /neɪm/ khép môi nhẹ và nối âm /z/ sang nguyên âm tiếp theo.",
    linkingSounds: ["name_is -> /neɪmɪz/"],
    followUpQuestions: ["Can I check your ID card, please?", "Where are you from?"]
  },
  {
    id: 2,
    group: 1,
    groupNameVi: "Thông tin cá nhân cơ bản",
    groupNameEn: "Personal Information",
    questionEn: "How do you spell your name?",
    questionVi: "Bạn đánh vần tên mình như thế nào?",
    sampleAnswer: "My first name is Trương Kiệt Anh, and it is spelled as K-I-E-T-A-N-H.",
    sampleAnswerTranslation: "Tên của tôi là Trương Kiệt Anh, và nó được đánh vần là K-I-E-T-A-N-H.",
    scoringTips: [
      "Luyện tập phát âm chuẩn xác 26 chữ cái tiếng Anh vì nó bổ trợ cực kỳ tốt cho cả kỹ năng Speaking và Listening.",
      "Đánh vần dứt khoát, ngắt nhịp nhẹ nhàng giữa các từ ghép tiếng Việt.",
      "Phân biệt rõ: E /iː/ vs I /aɪ/, G /dʒiː/ vs J /dʒeɪ/, H /eɪtʃ/, W /ˈdʌbəl.juː/."
    ],
    vocabulary: [
      { phrase: "Spell", meaning: "Đánh vần từng chữ cái", type: "collocation", example: "Could you spell that word for me, please?" },
      { phrase: "It is spelled as...", meaning: "Nó được đánh vần là...", type: "grammar_structure", example: "My name is spelled as A-N-H." }
    ],
    grammarFocus: [
      "Dạng bị động (Passive voice): 'it is spelled as...'",
      "Cấu trúc nối câu với liên từ 'and'"
    ],
    pronunciationTip: "Phát âm chuẩn từng chữ cái: K /keɪ/, I /aɪ/, E /iː/, T /tiː/, A /eɪ/, N /en/, H /eɪtʃ/.",
    linkingSounds: ["spelled_as -> /speld æz/"],
    followUpQuestions: ["Does your name have any special meaning?", "Do you like your name?"]
  },
  {
    id: 3,
    group: 1,
    groupNameVi: "Thông tin cá nhân cơ bản",
    groupNameEn: "Personal Information",
    questionEn: "What is your last name / surname? / How do you spell your last name?",
    questionVi: "Họ của bạn là gì và đánh vần ra sao?",
    sampleAnswer: "My last name is Trương, and it is spelled as T-R-U-O-N-G.",
    sampleAnswerTranslation: "Họ của tôi là Trương, và nó được đánh vần là T-R-U-O-N-G.",
    scoringTips: [
      "Ghi nhớ các từ đồng nghĩa chỉ 'Họ' bao gồm: last name, surname, và family name.",
      "Giám khảo có thể hỏi 'What's your surname?' thay vì 'last name', hãy sẵn sàng nhận diện từ khóa.",
      "Tự tin đánh vần chuẩn xác từng ký tự trong họ của bạn."
    ],
    vocabulary: [
      { phrase: "Last name / Surname / Family name", meaning: "Họ (dòng họ)", type: "collocation", example: "Nguyen is the most common family name in Vietnam." },
      { phrase: "Maiden name", meaning: "Họ thời con gái (của phụ nữ trước khi lấy chồng)", type: "collocation", example: "Her maiden name was Johnson." }
    ],
    grammarFocus: [
      "Câu ghép đẳng lập: S1 + V1 + C1, and S2 + V2 + C2"
    ],
    pronunciationTip: "T /tiː/, R /ɑːr/, U /juː/, O /oʊ/, N /en/, G /dʒiː/.",
    linkingSounds: ["name_is -> /neɪmɪz/", "spelled_as -> /speld æz/"]
  },

  // Nhóm 2
  {
    id: 4,
    group: 2,
    groupNameVi: "Gia đình & Nơi sống",
    groupNameEn: "Family & Hometown",
    questionEn: "Do you have any brothers or sisters?",
    questionVi: "Bạn có anh chị em trong gia đình không?",
    sampleAnswer: "I have a brother and a sister. We get on well with each other. / I am an only child. However, my parents and I get on well with each other.",
    sampleAnswerTranslation: "Tôi có một anh trai và một em gái. Chúng tôi rất hòa thuận với nhau. / Tôi là con một. Tuy nhiên, bố mẹ và tôi rất hòa thuận, thân thiết với nhau.",
    scoringTips: [
      "Nếu có anh chị em: Dùng cụm 'get on well with each other' hoặc 'get along well together' để diễn tả mối quan hệ tốt đẹp.",
      "Nếu là con một: Dùng cụm 'an only child' và dùng liên từ 'However' nối sang mối quan hệ với cha mẹ.",
      "Tránh chỉ trả lời ngắn 'Yes, I do' hoặc 'No, I don't' - luôn mở rộng thêm 1 câu miêu tả mối quan hệ."
    ],
    vocabulary: [
      { phrase: "Get on well with / Get along well with each other", meaning: "Hòa thuận, có mối quan hệ tốt đẹp, thân thiết", type: "phrasal_verb", example: "I get on well with my colleagues at work." },
      { phrase: "An only child", meaning: "Con một (trong gia đình)", type: "collocation", example: "Being an only child taught me how to be independent." },
      { phrase: "Sibling / Siblings", meaning: "Anh/chị/em ruột nói chung", type: "collocation", example: "I have three siblings." }
    ],
    grammarFocus: [
      "Hiện tại đơn diễn tả sự thật hiển nhiên (Present Simple)",
      "Liên từ chuyển ý: 'However,...' tạo sự tương phản khéo léo"
    ],
    pronunciationTip: "Cụm 'each other' nối âm /iːtʃ ˈʌðər/, 'get on' nối âm thành /ɡet ɒn/ -> /ɡetɒn/.",
    linkingSounds: ["get_on_well -> /ɡet ɒn wel/", "with_each_other -> /wɪð iːtʃ ˈʌðər/"]
  },
  {
    id: 5,
    group: 2,
    groupNameVi: "Gia đình & Nơi sống",
    groupNameEn: "Family & Hometown",
    questionEn: "Where do you live?",
    questionVi: "Bạn đang sống ở đâu?",
    sampleAnswer: "I'm living in Buon Ma Thuot City. It is a beautiful city.",
    sampleAnswerTranslation: "Tôi đang sống tại thành phố Buôn Ma Thuột. Đó là một thành phố rất xinh đẹp.",
    scoringTips: [
      "Thay vì dùng thì hiện tại đơn giản thông thường (I live in...), hãy sử dụng thì hiện tại tiếp diễn (I'm living in...) hoặc hiện tại hoàn thành tiếp diễn (I have been living in... for X years) để phô diễn sự đa dạng trong ngữ pháp.",
      "Thêm một tính từ miêu tả thành phố (beautiful, peaceful, bustling, dynamic, historic) để câu nói giàu hình ảnh hơn."
    ],
    vocabulary: [
      { phrase: "Live in...", meaning: "Sống ở...", type: "collocation", example: "I have been living in Da Nang for over 5 years." },
      { phrase: "Bustling city / Vibrant city", meaning: "Thành phố nhộn nhịp, sôi động", type: "collocation", example: "Ho Chi Minh City is a vibrant, bustling city." },
      { phrase: "Peaceful hometown", meaning: "Quê hương yên bình", type: "collocation", example: "I love the peaceful atmosphere of my hometown." }
    ],
    grammarFocus: [
      "Hiện tại tiếp diễn (Present Continuous) biểu thị hoàn cảnh sống hiện tại: 'I'm living in...'",
      "Đại từ thay thế 'It is...' để mở rộng câu mà không lặp lại tên địa danh"
    ],
    pronunciationTip: "Phát âm chuẩn từ 'City' /ˈsɪti/ và 'beautiful' /ˈbjuːtɪfl/.",
    linkingSounds: ["living_in -> /ˈlɪvɪŋɪn/"]
  },
  {
    id: 6,
    group: 2,
    groupNameVi: "Gia đình & Nơi sống",
    groupNameEn: "Family & Hometown",
    questionEn: "What is the weather like in your city?",
    questionVi: "Thời tiết ở thành phố của bạn như thế nào?",
    sampleAnswer: "Actually, the weather here is so nice and comfortable, but sometimes the weather can be pretty cold.",
    sampleAnswerTranslation: "Thực ra thì thời tiết ở đây rất đẹp và dễ chịu, nhưng thỉnh thoảng thời tiết cũng có thể khá là lạnh.",
    scoringTips: [
      "Dùng từ đệm (filler words) như 'Actually' hoặc 'I would say that' ở đầu câu giúp bài nói tự nhiên và không bị khô cứng.",
      "Dùng 'pretty cold / pretty hot' (bằng nghĩa với quite/rather) để nâng cấp vốn từ chỉ mức độ.",
      "Dùng 'comfortable' (dễ chịu, thoải mái) và liên từ đối lập 'but sometimes...' để thể hiện sự phong phú của thời tiết."
    ],
    vocabulary: [
      { phrase: "Actually / I would say that", meaning: "Thực ra / Tôi muốn nói rằng (cụm từ đệm tự nhiên)", type: "filler", example: "Actually, I prefer tea to coffee." },
      { phrase: "Pretty (cold / hot / warm)", meaning: "Khá là (lạnh / nóng / ấm) = quite / rather", type: "collocation", example: "The weather today is pretty warm." },
      { phrase: "Comfortable", meaning: "Dễ chịu, thoải mái", type: "collocation", example: "The temperature is very comfortable in autumn." },
      { phrase: "Tropical climate", meaning: "Khí hậu nhiệt đới", type: "collocation", example: "Vietnam has a tropical climate with a rainy season." }
    ],
    grammarFocus: [
      "Trạng từ chỉ mức độ: so, pretty, quite, really",
      "Động từ khuyết thiếu chỉ khả năng: 'can be pretty cold'",
      "Liên từ đẳng lập 'but' nối 2 mệnh đề tương phản"
    ],
    pronunciationTip: "Từ 'comfortable' phát âm 3 âm tiết /ˈkʌmftəbl/ (không đọc là com-for-ta-ble).",
    linkingSounds: ["nice_and -> /naɪs ænd/", "weather_here -> /ˈweðər hɪər/"]
  },
  {
    id: 7,
    group: 2,
    groupNameVi: "Gia đình & Nơi sống",
    groupNameEn: "Family & Hometown",
    questionEn: "What is your address?",
    questionVi: "Địa chỉ của bạn ở đâu?",
    sampleAnswer: "My address is... in Buon Ma Thuot City. It is not far from my university, so it is easy for me to go to school every day.",
    sampleAnswerTranslation: "Địa chỉ của tôi ở... tại thành phố Buôn Ma Thuột. Nó không quá xa trường đại học của tôi, vì thế tôi đi học hàng ngày rất thuận tiện.",
    scoringTips: [
      "Không chỉ nêu địa chỉ đơn thuần, hãy liên hệ vị trí nhà với trường học/nơi làm việc bằng cấu trúc 'It is not far from...'.",
      "Sử dụng cấu trúc nguyên nhân - kết quả: 'so it is easy for me to...'.",
      "Cấu trúc: 'It is + adj + for someone + to V'."
    ],
    vocabulary: [
      { phrase: "It is not far from...", meaning: "Không quá xa so với...", type: "collocation", example: "My apartment is not far from the city center." },
      { phrase: "Within walking distance", meaning: "Ở khoảng cách có thể đi bộ được", type: "collocation", example: "The bus stop is within walking distance." },
      { phrase: "Convenient location", meaning: "Vị trí thuận tiện", type: "collocation", example: "It is a very convenient location for commuting." }
    ],
    grammarFocus: [
      "Cấu trúc giả định chủ ngữ giả: 'It is + adj + for sb + to do sth'",
      "Liên từ chỉ kết quả: ', so + clause'"
    ],
    pronunciationTip: "Address có trọng âm rơi vào âm tiết thứ hai /əˈdres/.",
    linkingSounds: ["not_far_from -> /nɒt fɑːr frɒm/", "easy_for_me -> /ˈiːzi fɔːr miː/"]
  },
  {
    id: 8,
    group: 2,
    groupNameVi: "Gia đình & Nơi sống",
    groupNameEn: "Family & Hometown",
    questionEn: "How far is it from your home to your university/work?",
    questionVi: "Từ nhà đến trường/nơi làm việc của bạn bao xa?",
    sampleAnswer: "It is about 1 to 2 kilometers. It's not far from my university, so I can travel to school easily.",
    sampleAnswerTranslation: "Khoảng chừng 1 đến 2 cây số. Nó không xa trường đại học của tôi nên tôi có thể di chuyển tới trường một cách dễ dàng.",
    scoringTips: [
      "Dùng từ 'about' hoặc 'around' (khoảng chừng, ước lượng) giúp câu trả lời tự nhiên, chân thực hơn việc đưa ra con số tuyệt đối.",
      "Dùng động từ 'travel' với nghĩa di chuyển từ điểm A đến điểm B (commute / travel) thay vì chỉ dùng 'go'.",
      "Dùng trạng từ 'easily' để bổ nghĩa cho động từ 'travel'."
    ],
    vocabulary: [
      { phrase: "About / Around [distance]", meaning: "Khoảng chừng [khoảng cách]", type: "collocation", example: "It is about 5 kilometers from here." },
      { phrase: "Travel to [place]", meaning: "Di chuyển, đi lại đến nơi nào", type: "collocation", example: "Thousands of people travel to work by train daily." },
      { phrase: "Commute", meaning: "Đi lại làm việc/học tập đều đặn hàng ngày", type: "collocation", example: "My daily commute takes about 20 minutes." }
    ],
    grammarFocus: [
      "Cấu trúc hỏi và trả lời khoảng cách: 'How far is it from A to B?' -> 'It is about...'",
      "Trạng từ chỉ thể cách bổ nghĩa cho động từ: 'travel ... easily'"
    ],
    pronunciationTip: "Kilometer phát âm là /kɪˈlɒmɪtər/ hoặc /ˈkɪləmiːtər/.",
    linkingSounds: ["about_one -> /əˈbaʊt wʌn/", "travel_to -> /ˈtrævl tuː/"]
  },
  {
    id: 9,
    group: 2,
    groupNameVi: "Gia đình & Nơi sống",
    groupNameEn: "Family & Hometown",
    questionEn: "How do you go to university/work every day?",
    questionVi: "Bạn đi học/đi làm bằng phương tiện gì mỗi ngày?",
    sampleAnswer: "I travel to my university by motorbike. It doesn't take me too much time to get there.",
    sampleAnswerTranslation: "Tôi đi đến trường bằng xe máy. Tôi không mất quá nhiều thời gian để tới đó.",
    scoringTips: [
      "Cấu trúc chỉ phương tiện: by motorbike / by bicycle / by car / by bus (hoặc 'on foot' nếu đi bộ).",
      "Áp dụng cấu trúc thời gian kinh điển: 'It takes / doesn't take someone time to do something' (Ai đó mất/không mất nhiều thời gian để làm gì).",
      "Sử dụng 'get there' (đến nơi đó) thay vì lặp lại 'arrive at my university'."
    ],
    vocabulary: [
      { phrase: "By motorbike / car / bus", meaning: "Bằng xe máy / ô tô / xe buýt", type: "collocation", example: "I usually travel by bus to save money." },
      { phrase: "On foot", meaning: "Đi bộ (chú ý dùng 'on', không dùng 'by')", type: "collocation", example: "Since my house is close, I go to school on foot." },
      { phrase: "It takes/doesn't take someone time to V", meaning: "Mất / Không mất nhiều thời gian của ai để làm gì", type: "grammar_structure", example: "It takes me 15 minutes to ride to my office." },
      { phrase: "Get there", meaning: "Đến được nơi đó", type: "collocation", example: "It only takes 10 minutes to get there." }
    ],
    grammarFocus: [
      "Giới từ đi với phương tiện: 'by + vehicle' vs 'on foot'",
      "Cấu trúc đo lường thời gian: 'It takes + sb + time + to-infinitive'"
    ],
    pronunciationTip: "Motorbike /ˈməʊtəbaɪk/ nhấn âm tiết thứ nhất. Không nuốt âm /k/.",
    linkingSounds: ["travel_to -> /ˈtrævl tuː/", "take_me -> /teɪk miː/"]
  },

  // Nhóm 3
  {
    id: 10,
    group: 3,
    groupNameVi: "Học tập & Công việc",
    groupNameEn: "Study & English",
    questionEn: "What is your major? / What do you study?",
    questionVi: "Ngành học của bạn là gì?",
    sampleAnswer: "My major is medicine. I want to be a doctor in the future because helping other people and curing diseases make me happy.",
    sampleAnswerTranslation: "Chuyên ngành của tôi là Y khoa. Tôi muốn trở thành một bác sĩ trong tương lai bởi vì việc giúp đỡ mọi người và chữa bệnh khiến tôi cảm thấy hạnh phúc.",
    scoringTips: [
      "Nêu rõ ngành học với từ 'major' (ngành học chính).",
      "Nêu ước mơ nghề nghiệp trong tương lai: 'I want to be a... in the future'.",
      "Sử dụng Danh động từ (Gerund V-ing) làm chủ ngữ như 'helping other people' hay 'curing diseases' để nâng cao điểm ngữ pháp vượt trội.",
      "Cấu trúc tác động: 'make someone + adjective' (make me happy)."
    ],
    vocabulary: [
      { phrase: "Major", meaning: "Ngành học chính, chuyên ngành", type: "collocation", example: "My major is Computer Science at Hanoi University." },
      { phrase: "Medicine", meaning: "Ngành y học, y khoa", type: "collocation", example: "Studying medicine requires dedication and compassion." },
      { phrase: "Curing diseases", meaning: "Chữa trị bệnh tật", type: "collocation", example: "Scientists are working hard on curing serious diseases." },
      { phrase: "Make me happy / Make me proud", meaning: "Khiến tôi cảm thấy hạnh phúc / tự hào", type: "grammar_structure", example: "Seeing my students progress makes me proud." }
    ],
    grammarFocus: [
      "Danh động từ (V-ing) đóng vai trò làm Chủ ngữ trong mệnh đề phụ: 'helping other people and curing diseases...'",
      "Mệnh đề chỉ nguyên nhân: 'because + clause'",
      "Cấu trúc: Make + O + Adj (make me happy)"
    ],
    pronunciationTip: "Medicine đọc là /ˈmedsn/ (2 âm tiết phổ biến) hoặc /ˈmedɪsn/.",
    linkingSounds: ["want_to -> /ˈwɒn.tə/", "curing_diseases -> /ˈkjʊərɪŋ dɪˈziːzɪz/"]
  },
  {
    id: 11,
    group: 3,
    groupNameVi: "Học tập & Công việc",
    groupNameEn: "Study & English",
    questionEn: "How long have you been learning English?",
    questionVi: "Bạn học tiếng Anh được bao lâu rồi?",
    sampleAnswer: "I have been learning English for ten years.",
    sampleAnswerTranslation: "Tôi đã và đang học tiếng Anh được 10 năm rồi.",
    scoringTips: [
      "Sử dụng thì Hiện tại hoàn thành tiếp diễn (Present Perfect Continuous): 'I have been learning English for [number] years' để chứng tỏ năng lực ngữ pháp cao hơn thì hiện tại đơn giản.",
      "Thì này nhấn mạnh hành động đã bắt đầu trong quá khứ, vẫn đang tiếp diễn ở hiện tại và sẽ tiếp tục trong tương lai.",
      "Sử dụng giới từ 'for' + khoảng thời gian (for 5 years) hoặc 'since' + mốc thời gian (since I was in primary school)."
    ],
    vocabulary: [
      { phrase: "Have been learning English for...", meaning: "Đã và đang học tiếng Anh được (khoảng thời gian)...", type: "grammar_structure", example: "I have been learning English for almost seven years." },
      { phrase: "Since primary school", meaning: "Kể từ khi học tiểu học", type: "collocation", example: "I have loved foreign languages since primary school." },
      { phrase: "Improve my skills", meaning: "Cải thiện các kỹ năng của tôi", type: "collocation", example: "I want to improve my speaking and listening skills." }
    ],
    grammarFocus: [
      "Hiện tại hoàn thành tiếp diễn (Present Perfect Continuous): S + have/has + been + V-ing + for/since...",
      "Phân biệt 'for' (khoảng thời gian) và 'since' (mốc thời gian bắt đầu)"
    ],
    pronunciationTip: "'have been' thường được đọc lướt giảm âm /həv bɪn/ hoặc /əv bɪn/ để tạo nhịp điệu tự nhiên.",
    linkingSounds: ["learning_English -> /ˈlɜːnɪŋ ˈɪŋɡlɪʃ/"]
  },
  {
    id: 12,
    group: 3,
    groupNameVi: "Học tập & Công việc",
    groupNameEn: "Study & English",
    questionEn: "Do you like learning English? Why?",
    questionVi: "Bạn có thích học tiếng Anh không? Tại sao?",
    sampleAnswer: "Yes, absolutely. I study English because of three main reasons. First, it is an international language, which helps me find a good job in the future. Second, I have opportunities to communicate with foreigners and make new friends. Finally, I can easily read English documents and newspapers to enrich my knowledge.",
    sampleAnswerTranslation: "Vâng, chắc chắn rồi. Tôi học tiếng Anh vì 3 lý do chính. Thứ nhất, đây là ngôn ngữ quốc tế, giúp tôi tìm được một công việc tốt trong tương lai. Thứ hai, tôi có cơ hội giao tiếp với người nước ngoài và kết bạn mới. Cuối cùng, tôi có thể dễ dàng đọc tài liệu và báo chí tiếng Anh để mở rộng vốn kiến thức của mình.",
    scoringTips: [
      "Khởi đầu mạnh mẽ bằng 'Yes, absolutely' thay vì chỉ 'Yes, I do'.",
      "Sử dụng kỹ thuật đánh dấu bố cục (Signposting): 'three main reasons. First,... Second,... Finally,...' giúp bài nói cực kỳ mạch lạc và giám khảo dễ theo dõi.",
      "Sử dụng mệnh đề quan hệ không xác định: ', which helps me find a good job...' để ghi điểm ngữ pháp phức hợp.",
      "Vận dụng các cụm collocation đắt giá: 'international language', 'communicate with foreigners', 'make friends', 'enrich my knowledge'."
    ],
    vocabulary: [
      { phrase: "International language", meaning: "Ngôn ngữ quốc tế toàn cầu", type: "collocation", example: "English is widely recognized as an international language." },
      { phrase: "Communicate with foreigners", meaning: "Giao tiếp với người nước ngoài", type: "collocation", example: "Learning English helps me communicate with foreigners confidently." },
      { phrase: "Make friends / Make new friends", meaning: "Kết bạn / Kết thêm bạn mới", type: "collocation", example: "It is easy to make friends when traveling abroad." },
      { phrase: "Enrich my knowledge", meaning: "Làm giàu / trau dồi thêm vốn kiến thức của bản thân", type: "collocation", example: "Reading diverse books definitely enriches my knowledge." },
      { phrase: "Have opportunities to V", meaning: "Có cơ hội để làm gì", type: "collocation", example: "I have great opportunities to work abroad." }
    ],
    grammarFocus: [
      "Mệnh đề quan hệ bổ nghĩa cho cả câu trước: ', which + V'",
      "Từ nối chuyển ý tuần tự (Sequencing linkers): First, Second, Finally",
      "Cấu trúc chỉ mục đích: 'to + V' (to enrich my knowledge)"
    ],
    pronunciationTip: "Absolutely nhấn mạnh âm đầu /ˈæbsəluːtli/. Đọc rõ âm đuôi /ts/ trong 'documents'.",
    linkingSounds: ["find_a_good_job -> /faɪnd ə ɡʊd dʒɒb/", "read_English -> /riːd ˈɪŋɡlɪʃ/"]
  },

  // Nhóm 4
  {
    id: 13,
    group: 4,
    groupNameVi: "Sở thích & Thời gian rảnh",
    groupNameEn: "Hobbies & Free Time",
    questionEn: "What do you do in your free time?",
    questionVi: "Bạn làm gì vào thời gian rảnh rỗi?",
    sampleAnswer: "In my free time, I am keen on listening to music because it helps me release stress and get out of my mind. Sometimes, I am interested in reading books to broaden my horizon. At the weekends, I often meet my friends to go to the cinema, enjoy good food, and drink milk tea. Additionally, I play volleyball with my friends after studying, which helps me stay fit physically and mentally.",
    sampleAnswerTranslation: "Vào thời gian rảnh, tôi rất thích nghe nhạc vì nó giúp tôi giải tỏa căng thẳng và thư giãn đầu óc. Thỉnh thoảng, tôi thích đọc sách để mở rộng tầm nhìn hiểu biết. Vào cuối tuần, tôi thường gặp gỡ bạn bè để đi xem phim, thưởng thức đồ ăn ngon và uống trà sữa. Ngoài ra, tôi chơi bóng chuyền cùng bạn bè sau giờ học, điều đó giúp tôi duy trì vóc dáng và sức khỏe cả về thể chất lẫn tinh thần.",
    scoringTips: [
      "Thay thế từ 'like' bị lặp lại bằng các cụm cao cấp: 'be keen on', 'be interested in', 'be fond of'.",
      "Vận dụng các thành ngữ/cụm từ giải tỏa tâm lý: 'release stress', 'get out of my mind', 'broaden my horizon'.",
      "Mô tả đa dạng hoạt động theo mốc thời gian: 'In my free time,... Sometimes,... At the weekends,... Additionally,...'.",
      "Ghi điểm với cụm từ toàn diện: 'stay fit physically and mentally'."
    ],
    vocabulary: [
      { phrase: "Be keen on / Be interested in / Be fond of", meaning: "Thích, say mê cái gì (thay cho 'like')", type: "phrasal_verb", example: "I am really keen on photography." },
      { phrase: "Release stress / Get out of stress", meaning: "Giải tỏa áp lực, căng thẳng", type: "collocation", example: "Jogging in the park is my favorite way to release stress." },
      { phrase: "Get out of my mind", meaning: "Giúp đầu óc thoải mái, tạm quên đi muộn phiền lo âu", type: "idiom", example: "Listening to soft melodies helps me get out of my mind after work." },
      { phrase: "Broaden my horizon", meaning: "Mở rộng tầm nhìn, tích lũy kiến thức phong phú", type: "idiom", example: "Traveling abroad truly broadens your horizon." },
      { phrase: "Stay fit physically and mentally", meaning: "Giữ gìn sự khỏe mạnh, cân đối cả thể chất lẫn tinh thần", type: "collocation", example: "Regular workouts keep me fit physically and mentally." }
    ],
    grammarFocus: [
      "Giới từ đi kèm cấu trúc sở thích: keen on + V-ing, interested in + V-ing, fond of + V-ing",
      "Mệnh đề quan hệ không xác định ', which helps me...'",
      "Liên từ nối bổ sung: 'Additionally,...', 'Besides,...'"
    ],
    pronunciationTip: "Cụm 'physically and mentally' /ˈfɪzɪkli ænd ˈmentəli/ có nhịp điệu đối xứng mượt mà.",
    linkingSounds: ["keen_on -> /kiːn ɒn/", "interested_in -> /ˈɪntrəstɪd ɪn/", "release_stress -> /rɪˈliːs stres/"]
  },
  {
    id: 14,
    group: 4,
    groupNameVi: "Sở thích & Thời gian rảnh",
    groupNameEn: "Hobbies & Free Time",
    questionEn: "What kind of music do you like?",
    questionVi: "Bạn thích thể loại nhạc nào?",
    sampleAnswer: "I'm keen on instrumental music because it helps me concentrate on my study or work. However, sometimes I put on my earphones and enjoy different genres of music like pop, rock, or EDM to relax and feel energized.",
    sampleAnswerTranslation: "Tôi rất thích nhạc không lời (nhạc cụ) vì nó giúp tôi tập trung vào việc học hay công việc. Tuy nhiên, thỉnh thoảng tôi đeo tai nghe vào và thưởng thức nhiều thể loại nhạc khác nhau như pop, rock hay EDM để thư giãn và cảm thấy tràn đầy năng lượng.",
    scoringTips: [
      "Nêu thể loại nhạc cụ thể kèm lý do rõ ràng: 'instrumental music' -> 'helps me concentrate on...'.",
      "Dùng phrasal verb thực tế: 'put on my earphones' (đeo tai nghe vào).",
      "Dùng từ vựng nâng cao: 'genres of music' (thay vì chỉ dùng 'kinds of music').",
      "Dùng cụm cảm xúc tích cực: 'feel energized' (cảm thấy tràn đầy năng lượng)."
    ],
    vocabulary: [
      { phrase: "Instrumental music", meaning: "Nhạc không lời, nhạc hòa tấu / nhạc cụ", type: "collocation", example: "I love listening to instrumental music when reading." },
      { phrase: "Concentrate on (study / work)", meaning: "Tập trung cao độ vào việc học / công việc", type: "phrasal_verb", example: "Quiet environments help me concentrate on my tasks." },
      { phrase: "Put on my earphones", meaning: "Đeo tai nghe vào", type: "phrasal_verb", example: "I put on my earphones to enjoy my favorite podcast." },
      { phrase: "Genres of music", meaning: "Các thể loại âm nhạc", type: "collocation", example: "She explores diverse genres of music from jazz to classical." },
      { phrase: "Feel energized", meaning: "Cảm thấy tràn đầy sinh lực và năng lượng", type: "collocation", example: "A brisk morning walk makes me feel energized all day." }
    ],
    grammarFocus: [
      "Động từ đi kèm giới từ: concentrate ON something",
      "Cấu trúc chỉ mục đích: 'to relax and feel energized'",
      "Cụm liên từ tương phản 'However, sometimes...'"
    ],
    pronunciationTip: "Genres đọc chuẩn là /ˈʒɒnrəz/ (âm /ʒ/ nhẹ ở đầu, không đọc là gen-re).",
    linkingSounds: ["concentrate_on -> /ˈkɒnsntreɪt ɒn/", "put_on -> /pʊt ɒn/"]
  },
  {
    id: 15,
    group: 4,
    groupNameVi: "Sở thích & Thời gian rảnh",
    groupNameEn: "Hobbies & Free Time",
    questionEn: "What kind of movies/films do you like to watch?",
    questionVi: "Bạn thích xem thể loại phim nào?",
    sampleAnswer: "I guess I would go for action movies. The main reason is that they always make me feel excited and relaxed, especially when watching them in the cinema. It has a big screen and an amazing sound system, which make the movie more impressive.",
    sampleAnswerTranslation: "Tôi nghĩ là mình sẽ lựa chọn phim hành động. Lý do chính là chúng luôn khiến tôi cảm thấy hào hứng và thư giãn, đặc biệt là khi xem ở rạp chiếu phim. Rạp có màn hình lớn và hệ thống âm thanh tuyệt vời, điều đó làm cho bộ phim trở nên ấn tượng hơn rất nhiều.",
    scoringTips: [
      "Dùng cụm lựa chọn tự nhiên: 'I guess I would go for [genre]' (thay vì 'I like...').",
      "Sử dụng đúng tính từ chỉ cảm xúc đuôi -ed: 'feel excited and relaxed' (chú ý: người cảm thấy dùng -ed, sự vật ấn tượng dùng -ive/ing như impressive).",
      "Miêu tả trải nghiệm xem phim tại rạp: 'big screen', 'amazing sound system', 'impressive'.",
      "Dùng mệnh đề ', which make the movie more impressive'."
    ],
    vocabulary: [
      { phrase: "Go for", meaning: "Lựa chọn, nghiêng về, chuộng cái gì", type: "phrasal_verb", example: "If I have to choose, I would definitely go for comedies." },
      { phrase: "Excited / Relaxed", meaning: "Hào hứng / Thư giãn (tính từ đuôi -ed chỉ cảm xúc con người)", type: "collocation", example: "I felt very excited when my favorite team won." },
      { phrase: "Sound system", meaning: "Hệ thống âm thanh", type: "collocation", example: "The cinema features a state-of-the-art sound system." },
      { phrase: "Impressive", meaning: "Gây ấn tượng sâu sắc", type: "collocation", example: "The visual effects in that sci-fi movie were impressive." }
    ],
    grammarFocus: [
      "Cấu trúc giả định nhẹ nhàng: 'I guess I would go for...'",
      "Cấu trúc giải thích lý do: 'The main reason is that + clause'",
      "Mệnh đề quan hệ: ', which make...'"
    ],
    pronunciationTip: "Excited /ɪkˈsaɪtɪd/, Relaxed /rɪˈlækst/ (đuôi -ed đọc là /t/), Impressive /ɪmˈpresɪv/.",
    linkingSounds: ["feel_excited -> /fiːl ɪkˈsaɪtɪd/", "sound_system -> /saʊnd ˈsɪstəm/"]
  },
  {
    id: 16,
    group: 4,
    groupNameVi: "Sở thích & Thời gian rảnh",
    groupNameEn: "Hobbies & Free Time",
    questionEn: "What kind of books do you like to read?",
    questionVi: "Bạn thích đọc thể loại sách nào?",
    sampleAnswer: "I am an avid reader. Therefore, I tend to read e-books and online newspapers because they are fast and convenient. All I need is a smartphone connected to the internet to search for anything I like.",
    sampleAnswerTranslation: "Tôi là một người rất say mê đọc sách. Do đó, tôi có xu hướng đọc sách điện tử và báo mạng bởi vì chúng nhanh chóng và tiện lợi. Tất cả những gì tôi cần chỉ là một chiếc điện thoại thông minh có kết nối internet để tìm kiếm bất kỳ thứ gì tôi thích.",
    scoringTips: [
      "Khẳng định thói quen bằng danh từ đắt giá: 'I am an avid reader' (Người say mê đọc sách).",
      "Dùng cấu trúc thói quen: 'I tend to read...' (Tôi có xu hướng đọc...).",
      "Nêu lý do thuyết phục: 'fast and convenient'.",
      "Cấu trúc nhấn mạnh: 'All I need is [noun] + to V'."
    ],
    vocabulary: [
      { phrase: "Avid reader", meaning: "Người say mê, nghiện đọc sách", type: "collocation", example: "Since childhood, she has been an avid reader of fiction." },
      { phrase: "Tend to + V", meaning: "Có xu hướng làm gì", type: "grammar_structure", example: "Young people tend to read news on social media." },
      { phrase: "E-books / Online newspapers", meaning: "Sách điện tử / Báo điện tử trực tuyến", type: "collocation", example: "E-books allow me to carry hundreds of novels in my pocket." },
      { phrase: "Fast and convenient", meaning: "Nhanh chóng và vô cùng tiện lợi", type: "collocation", example: "Online banking is fast and convenient." }
    ],
    grammarFocus: [
      "Liên từ nối trang trọng chỉ hệ quả: 'Therefore, + clause'",
      "Cấu trúc mệnh đề danh từ làm chủ ngữ: 'All I need is...'",
      "Phân từ rút gọn: 'a smartphone connected to the internet'"
    ],
    pronunciationTip: "Avid reader phát âm là /ˈævɪd ˈriːdər/. Convenient phát âm là /kənˈviːniənt/.",
    linkingSounds: ["avid_reader -> /ˈævɪd ˈriːdər/", "connected_to -> /kəˈnektɪd tuː/"]
  },
  {
    id: 17,
    group: 4,
    groupNameVi: "Sở thích & Thời gian rảnh",
    groupNameEn: "Hobbies & Free Time",
    questionEn: "What kind of sports do you like to play?",
    questionVi: "Bạn thích chơi môn thể thao nào?",
    sampleAnswer: "I try to maintain a healthy lifestyle, so I take up sports like badminton, volleyball, or tennis. Playing sports brings me good health, keeps me fit, and allows me to make new friends.",
    sampleAnswerTranslation: "Tôi luôn cố gắng duy trì một lối sống lành mạnh, vì vậy tôi tham gia các môn thể thao như cầu lông, bóng chuyền hoặc quần vợt. Việc chơi thể thao mang lại cho tôi sức khỏe tốt, giúp tôi giữ vóc dáng thon gọn và cho phép tôi kết thêm nhiều bạn mới.",
    scoringTips: [
      "Mở đầu bằng mục tiêu sống tích cực: 'maintain a healthy lifestyle'.",
      "Dùng phrasal verb bắt đầu chơi thể thao: 'take up sports' (thay cho 'play sports').",
      "Dùng Danh động từ làm chủ ngữ (Gerund subject): 'Playing sports brings me... keeps me fit, and allows me to...'.",
      "Cấu trúc bộ ba lợi ích (Rule of Three) tạo nhịp điệu nói đĩnh đạc."
    ],
    vocabulary: [
      { phrase: "Maintain a healthy lifestyle", meaning: "Duy trì một lối sống lành mạnh, khoa học", type: "collocation", example: "Eating vegetables and exercising help maintain a healthy lifestyle." },
      { phrase: "Take up (sports / a hobby)", meaning: "Bắt đầu tham gia hoặc theo đuổi một môn thể thao / sở thích mới", type: "phrasal_verb", example: "I decided to take up swimming this summer." },
      { phrase: "Keep me fit / Stay fit", meaning: "Giữ cho cơ thể thon gọn, săn chắc, cân đối", type: "collocation", example: "Running daily keeps me fit." },
      { phrase: "Allow someone to V", meaning: "Cho phép / Tạo điều kiện cho ai làm gì", type: "grammar_structure", example: "Joining a club allows me to socialize easily." }
    ],
    grammarFocus: [
      "Danh động từ làm chủ ngữ: 'Playing sports + singular verb (brings/keeps/allows)'",
      "Cấu trúc song hành (Parallel structure): brings..., keeps..., and allows..."
    ],
    pronunciationTip: "Lifestyle /ˈlaɪfstaɪl/, Maintain /meɪnˈteɪn/ nhấn âm 2.",
    linkingSounds: ["take_up -> /teɪk ʌp/", "keeps_me_fit -> /kiːps miː fɪt/"]
  },

  // Nhóm 5
  {
    id: 18,
    group: 5,
    groupNameVi: "Hoạt động thường nhật & Kế hoạch",
    groupNameEn: "Daily Activities & Plans",
    questionEn: "What did you do yesterday?",
    questionVi: "Hôm qua bạn đã làm gì?",
    sampleAnswer: "Yesterday, I did some tasks. First, I took an English test in my class in the morning. After that, I went to the supermarket. In the evening, my family and I celebrated a small birthday party for my sister at home. We had a great time together.",
    sampleAnswerTranslation: "Hôm qua, tôi đã hoàn thành một số công việc. Đầu tiên, tôi đã làm một bài kiểm tra tiếng Anh trên lớp vào buổi sáng. Sau đó, tôi đi siêu thị. Vào buổi tối, gia đình tôi đã tổ chức một bữa tiệc sinh nhật nhỏ cho em gái tại nhà. Chúng tôi đã có khoảng thời gian rất tuyệt vời bên nhau.",
    scoringTips: [
      "BẮT BUỘC ĐỒNG BỘ THÌ QUÁ KHỨ ĐƠN: Đây là câu hỏi về quá khứ ('did you do'), bắt buộc TẤT CẢ động từ trong câu trả lời phải được chia ở thì quá khứ đơn (V2/V-ed) như: did, took, went, celebrated, had.",
      "Sử dụng từ nối chỉ trình tự thời gian trong ngày: 'First,... in the morning', 'After that,...', 'In the evening,...'.",
      "Kết câu bằng cảm xúc trọn vẹn: 'We had a great time together'."
    ],
    vocabulary: [
      { phrase: "Take an English test -> Took an English test", meaning: "Làm bài kiểm tra tiếng Anh (quá khứ)", type: "collocation", example: "I took a difficult chemistry test yesterday." },
      { phrase: "Celebrate a birthday party -> Celebrated a birthday party", meaning: "Tổ chức tiệc sinh nhật", type: "collocation", example: "We celebrated my mother's 50th birthday last week." },
      { phrase: "Have a great time together -> Had a great time together", meaning: "Có khoảng thời gian vui vẻ, tuyệt vời bên nhau", type: "collocation", example: "All the guests had a great time together." }
    ],
    grammarFocus: [
      "Thì Quá khứ đơn (Past Simple Tense) cho toàn bộ chuỗi hành động kết thúc trong quá khứ",
      "Bảng động từ bất quy tắc: take -> took, go -> went, have -> had, do -> did",
      "Động từ có quy tắc thêm -ed: celebrate -> celebrated (/ɪd/)"
    ],
    pronunciationTip: "Celebrated phát âm đuôi -ed là /ɪd/ -> /ˈselɪbreɪtɪd/. Took /tʊk/ đọc âm u ngắn.",
    linkingSounds: ["took_an_English_test -> /tʊk ən ˈɪŋɡlɪʃ test/", "had_a_great_time -> /hæd ə ɡreɪt taɪm/"]
  },
  {
    id: 19,
    group: 5,
    groupNameVi: "Hoạt động thường nhật & Kế hoạch",
    groupNameEn: "Daily Activities & Plans",
    questionEn: "What are you going to do next weekend?",
    questionVi: "Bạn dự định làm gì vào cuối tuần tới?",
    sampleAnswer: "I'm going to have a lot of things to do next weekend. On Saturday, I am going to meet my friends to go shopping, watch a movie, and enjoy delicious street food. On Sunday, I will sleep in after a busy week to recharge my energy, then complete my homework and prepare for the next week.",
    sampleAnswerTranslation: "Tôi dự định sẽ có rất nhiều việc để làm vào cuối tuần tới. Vào thứ Bảy, tôi dự định gặp bạn bè để đi mua sắm, xem phim và thưởng thức các món ăn đường phố thơm ngon. Vào Chủ nhật, tôi sẽ ngủ nướng sau một tuần bận rộn để nạp lại năng lượng, sau đó hoàn thành bài tập về nhà và chuẩn bị cho tuần mới.",
    scoringTips: [
      "Sử dụng phối hợp cấu trúc diễn đạt tương lai: 'Be going to + V' (cho kế hoạch/dự định đã lên lịch) và 'Will + V' (cho quyết định/dự tính).",
      "Phân chia lịch trình rõ ràng theo từng ngày: 'On Saturday,... On Sunday,...'.",
      "Sử dụng các cụm từ đắt giá về đời sống: 'enjoy delicious street food', 'sleep in' (ngủ nướng), 'recharge my energy' (nạp lại năng lượng).",
      "Kèm lý do 'after a busy week' để câu văn logic và tự nhiên."
    ],
    vocabulary: [
      { phrase: "Be going to + V / Will + V", meaning: "Cấu trúc diễn tả kế hoạch dự định trong tương lai", type: "grammar_structure", example: "I am going to visit my grandparents this weekend." },
      { phrase: "Street food / Street food stalls", meaning: "Thức ăn đường phố / Quán ăn vỉa hè", type: "collocation", example: "Hanoi is famous for its delicious street food." },
      { phrase: "Sleep in", meaning: "Ngủ nướng, ngủ dậy muộn hơn ngày thường", type: "phrasal_verb", example: "On Sundays, I love to sleep in until 9 AM." },
      { phrase: "Recharge energy / Recharge my energy", meaning: "Nạp lại năng lượng sau những ngày mệt mỏi", type: "collocation", example: "A weekend trip to the beach helps me recharge my energy." }
    ],
    grammarFocus: [
      "Thì tương lai gần: 'Be going to + V' chỉ kế hoạch có chủ đích từ trước",
      "Thì tương lai đơn: 'Will + V' kết hợp với mục đích 'to recharge...'",
      "Giới từ chỉ ngày: 'On Saturday', 'On Sunday'"
    ],
    pronunciationTip: "Cụm 'sleep in' nối âm thành /sliːp ɪn/. Delicious /dɪˈlɪʃəs/.",
    linkingSounds: ["going_to -> /ˈɡəʊɪŋ tuː/ (hoặc /ˈɡənə/ trong văn nói tự nhiên)", "sleep_in -> /sliːp ɪn/", "recharge_my_energy -> /riːˈtʃɑːdʒ maɪ ˈenədʒi/"]
  },
  {
    id: 20,
    group: 5,
    groupNameVi: "Hoạt động thường nhật & Kế hoạch",
    groupNameEn: "Daily Activities & Plans",
    questionEn: "What is your favorite part of the day?",
    questionVi: "Khoảng thời gian nào trong ngày bạn thích nhất?",
    sampleAnswer: "I prefer the evening because that is when I get my own private time. I can do what I like such as listening to music, reading books, or surfing the internet. It is a great way to release stress.",
    sampleAnswerTranslation: "Tôi thích buổi tối nhất bởi vì đó là lúc tôi có được khoảng thời gian riêng tư cho riêng mình. Tôi có thể làm những gì mình thích như nghe nhạc, đọc sách, hoặc lướt mạng. Đó là một cách tuyệt vời để giải tỏa căng thẳng.",
    scoringTips: [
      "Dùng động từ 'prefer' (thích hơn) thay vì lặp lại 'My favorite part is...'.",
      "Giải thích lý do sắc sảo với mệnh đề: 'because that is when I get my own private time'.",
      "Liệt kê các hoạt động thư giãn với 'such as + V-ing': 'listening to music, reading books, or surfing the internet'.",
      "Chốt lại lợi ích: 'It is a great way to release stress'."
    ],
    vocabulary: [
      { phrase: "Prefer [something]", meaning: "Thích cái gì hơn (ưu tiên)", type: "collocation", example: "I prefer mornings because I feel most productive then." },
      { phrase: "Get my own private time", meaning: "Có được khoảng thời gian riêng tư cho riêng mình", type: "collocation", example: "Parents need to get their own private time after kids sleep." },
      { phrase: "Surf the internet", meaning: "Lướt mạng, lướt web", type: "collocation", example: "I often surf the internet to catch up on global news." },
      { phrase: "It is a great way to V", meaning: "Đó là một cách tuyệt vời để làm gì", type: "grammar_structure", example: "Cooking is a great way to relax." }
    ],
    grammarFocus: [
      "Mệnh đề quan hệ chỉ thời gian: 'that is when + clause'",
      "Cấu trúc liệt kê: 'such as + V-ing, V-ing, or V-ing'",
      "Cấu trúc nhận định: 'It is a + adjective + way + to-infinitive'"
    ],
    pronunciationTip: "Private time /ˈpraɪvət taɪm/. Chú ý âm /v/ và /t/.",
    linkingSounds: ["part_of_the_day -> /pɑːt əv ðə deɪ/", "surf_the_internet -> /sɜːf ði ˈɪntənet/"]
  }
];

export const VOCABULARY_FLASHCARDS = [
  { id: 1, term: "Get on well with each other", meaning: "Hòa thuận, có mối quan hệ rất tốt đẹp, thân thiết với nhau", group: "Family & Relationships", type: "Phrasal Verb", example: "My brothers and I always get on well with each other." },
  { id: 2, term: "An only child", meaning: "Con một trong gia đình", group: "Family & Relationships", type: "Collocation", example: "Although I am an only child, I never feel lonely." },
  { id: 3, term: "Broaden my horizon", meaning: "Mở rộng tầm nhìn, hiểu biết và tích lũy kiến thức", group: "Education & Growth", type: "Idiom", example: "Reading books and traveling abroad truly broaden your horizon." },
  { id: 4, term: "Release stress / Get out of stress", meaning: "Giải tỏa áp lực, căng thẳng mệt mỏi", group: "Lifestyle & Health", type: "Collocation", example: "Listening to acoustic music helps me release stress." },
  { id: 5, term: "Get out of my mind", meaning: "Giúp đầu óc thoải mái, tạm quên đi muộn phiền lo âu", group: "Lifestyle & Health", type: "Idiom", example: "A long walk in the woods helped me get out of my mind." },
  { id: 6, term: "Stay fit physically and mentally", meaning: "Giữ gìn sự khỏe mạnh, cân đối cả về thể chất lẫn tinh thần", group: "Lifestyle & Health", type: "Collocation", example: "Yoga helps practitioners stay fit physically and mentally." },
  { id: 7, term: "Take up (a sport / hobby)", meaning: "Bắt đầu tham gia hoặc theo đuổi một môn thể thao / sở thích mới", group: "Hobbies & Sports", type: "Phrasal Verb", example: "I decided to take up badminton to stay active." },
  { id: 8, term: "Maintain a healthy lifestyle", meaning: "Duy trì một lối sống lành mạnh, khoa học", group: "Lifestyle & Health", type: "Collocation", example: "Drinking enough water is essential to maintain a healthy lifestyle." },
  { id: 9, term: "Avid reader", meaning: "Người say mê, nghiện đọc sách", group: "Hobbies & Habits", type: "Collocation", example: "As an avid reader, he reads at least three novels a month." },
  { id: 10, term: "Sleep in", meaning: "Ngủ nướng, ngủ dậy muộn hơn ngày thường để nghỉ ngơi", group: "Daily Routine", type: "Phrasal Verb", example: "I usually sleep in on Sundays to recharge after a hectic week." },
  { id: 11, term: "Recharge energy", meaning: "Nạp lại năng lượng, phục hồi sinh lực", group: "Lifestyle & Health", type: "Collocation", example: "A short power nap helps recharge my energy for the afternoon." },
  { id: 12, term: "Enrich my knowledge", meaning: "Làm giàu, trau dồi thêm vốn kiến thức của bản thân", group: "Education & Growth", type: "Collocation", example: "Documentaries are great tools to enrich our knowledge." },
  { id: 13, term: "Communicate with foreigners", meaning: "Giao tiếp với người nước ngoài", group: "Language & Communication", type: "Collocation", example: "Speaking English fluently allows you to communicate with foreigners easily." },
  { id: 14, term: "Instrumental music", meaning: "Nhạc không lời, nhạc hòa tấu cụ", group: "Arts & Entertainment", type: "Collocation", example: "Instrumental piano music helps students concentrate." },
  { id: 15, term: "Put on earphones", meaning: "Đeo tai nghe vào", group: "Daily Actions", type: "Phrasal Verb", example: "I put on my earphones whenever I board the bus." },
  { id: 16, term: "Feel energized", meaning: "Cảm thấy tràn đầy năng lượng, phấn chấn", group: "Lifestyle & Health", type: "Collocation", example: "A cold shower in the morning leaves me feeling energized." },
  { id: 17, term: "Go for (something)", meaning: "Lựa chọn, yêu thích và nghiêng về cái gì", group: "Preferences", type: "Phrasal Verb", example: "I usually go for comedies when I want a good laugh." },
  { id: 18, term: "Street food stalls", meaning: "Quán ăn vỉa hè / Quầy hàng thức ăn đường phố", group: "Food & Culture", type: "Collocation", example: "We visited several night street food stalls in Da Nang." },
  { id: 19, term: "Get my own private time", meaning: "Có được khoảng thời gian riêng tư cho riêng mình", group: "Daily Routine", type: "Collocation", example: "Late night is when I can get my own private time." },
  { id: 20, term: "It takes someone time to V", meaning: "Ai đó mất bao nhiêu thời gian để làm việc gì", group: "Grammar Patterns", type: "Structure", example: "It takes me 20 minutes to ride my bike to university." }
];

export const GRAMMAR_MASTERY_POINTS = [
  {
    title: "1. Sự đa dạng các Thì (Tense Variety)",
    badge: "Bắt buộc cho B1",
    description: "Giám khảo B1 đánh giá cao thí sinh biết sử dụng linh hoạt các thì phù hợp với ngữ cảnh câu hỏi thay vì chỉ dùng thì Hiện tại đơn giản.",
    items: [
      {
        tense: "Hiện tại tiếp diễn (Present Continuous)",
        usage: "Nói về tình trạng cư trú / hoạt động đang diễn ra (Câu 5): 'I am living in Buon Ma Thuot City...'",
        formula: "S + am/is/are + V-ing"
      },
      {
        tense: "Hiện tại hoàn thành tiếp diễn (Present Perfect Continuous)",
        usage: "Nói về khoảng thời gian kéo dài từ quá khứ đến hiện tại (Câu 11): 'I have been learning English for ten years.'",
        formula: "S + have/has + been + V-ing + for/since..."
      },
      {
        tense: "Quá khứ đơn (Past Simple)",
        usage: "Tuyệt đối đồng bộ tất cả động từ khi kể về ngày hôm qua (Câu 18): 'Yesterday, I took an English test... went to the supermarket... celebrated a birthday party... had a great time.'",
        formula: "S + V2/V-ed"
      },
      {
        tense: "Tương lai dự định (Be going to & Will)",
        usage: "Phân biệt kế hoạch dự định và quyết định (Câu 19): 'I am going to meet my friends... On Sunday, I will sleep in to recharge my energy.'",
        formula: "S + is/am/are + going to + V  |  S + will + V"
      }
    ]
  },
  {
    title: "2. Danh động từ (Gerund V-ing) làm Chủ ngữ",
    badge: "Ngữ pháp ăn điểm",
    description: "Biến đổi động từ thành dạng V-ing làm chủ ngữ câu giúp câu nói mang tính học thuật, sang trọng và chuẩn B1 Cambridge.",
    items: [
      {
        tense: "Ví dụ 1 (Câu 10 - Ngành học)",
        usage: "'Helping other people and curing diseases make me happy.'",
        formula: "[V-ing + Object] + Verb + Object + Adj"
      },
      {
        tense: "Ví dụ 2 (Câu 17 - Thể thao)",
        usage: "'Playing sports brings me good health, keeps me fit, and allows me to make new friends.'",
        formula: "[V-ing + Object] + V1(s/es) + O1, V2(s/es) + O2, and V3(s/es) + O3"
      }
    ]
  },
  {
    title: "3. Cấu trúc câu Phức & Mệnh đề Quan hệ (Complex Sentences)",
    badge: "Tăng điểm Fluency & Cohesion",
    description: "Nối ý mượt mà bằng mệnh đề quan hệ không xác định ', which + V' và liên từ chỉ nguyên nhân/kết quả.",
    items: [
      {
        tense: "Mệnh đề ', which + V' thay cho cả câu trước",
        usage: "'...which helps me find a good job in the future' (Câu 12) | '...which make the movie more impressive' (Câu 15)",
        formula: "Main clause, which + Verb + Object"
      },
      {
        tense: "Cấu trúc mục đích & kết quả",
        usage: "'It is not far from my university, so it is easy for me to go to school every day.' (Câu 7)",
        formula: "Cause clause, so + [It is + Adj + for sb + to V]"
      }
    ]
  },
  {
    title: "4. Tính từ cảm xúc (-ed) vs Tính chất sự vật (-ing / -ive)",
    badge: "Lỗi thường gặp",
    description: "Rất nhiều thí sinh nhầm lẫn giữa excited (cảm xúc của người) và exciting (tính chất sự vật).",
    items: [
      {
        tense: "Quy tắc cốt lõi",
        usage: "Cảm xúc con người: I feel excited / relaxed / energized / interested. | Tính chất bộ phim/sự việc: The movie is impressive / exciting / relaxing.",
        formula: "Feel + V-ed  |  Thing + is + Adj(-ing / -ive)"
      }
    ]
  }
];
