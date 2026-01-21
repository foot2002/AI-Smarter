// Sample data for AI SMarter App

export interface Store {
  id: string;
  name: string;
  industry: string;
  tone: 'friendly' | 'professional' | 'emotional';
  region?: string;
  contact?: string;
  operatingHours?: string;
  strengths: string[];
  additionalStrengths?: string[];
  featuredItems: { name: string; description: string; price?: string }[];
  allMenuItems?: { name: string; description: string; price?: string }[];
  usp?: string;
  keywords: string[];
  blockedWords: string[];
  defaultCta: string;
  channels: {
    blog?: { url: string; connected: boolean };
    youtube?: { url: string; connected: boolean };
    instagram?: { url: string; connected: boolean };
    other?: { url: string; connected: boolean };
  };
  operationMode: 'light' | 'steady' | 'aggressive';
  createdAt: string;
}

export interface MediaItem {
  id: string;
  storeId: string;
  category: 'store' | 'product' | 'atmosphere' | 'unique' | 'other';
  url: string;
  tags: string[];
  description?: string;
  location?: string;
  uploadedAt: string;
  isFeatured?: boolean;
}

export interface Feedback {
  id: string;
  storeId: string;
  type: 'review' | 'survey' | 'inquiry';
  content: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  rating?: number;
  source?: string;
  createdAt: string;
  keywords?: string[];
}

export interface Content {
  id: string;
  storeId: string;
  type: 'blog' | 'shorts' | 'sns';
  title: string;
  content: string;
  status: 'draft' | 'pending' | 'approved' | 'scheduled' | 'published' | 'failed';
  channel?: string;
  scheduledAt?: string;
  publishedAt?: string;
  createdAt: string;
  performance?: {
    views: number;
    inquiries: number;
  };
}

export interface Schedule {
  id: string;
  storeId: string;
  contentId: string;
  channel: string;
  scheduledAt: string;
  status: 'pending' | 'completed' | 'failed';
}

// Sample Stores
export const sampleStores: Store[] = [
  {
    id: 'store-1',
    name: '따뜻한 오후 카페',
    industry: '카페/음료',
    tone: 'friendly',
    region: '서울 마포구 연남동',
    contact: '02-1234-5678',
    operatingHours: '매일 10:00 - 22:00',
    strengths: ['아늑한 분위기', '넓은 좌석', '무료 와이파이', '친절한 서비스', '디저트 직접 제조'],
    additionalStrengths: ['2층 창가석', '루프탑 테라스', '펫 프렌들리', '콘센트 완비', '주차 2대 가능', '단체석 보유'],
    featuredItems: [
      { name: '연남 시그니처 라떼', description: '달콤한 캐러멜과 고소한 우유가 조화로운 인기 메뉴', price: '6,500원' },
      { name: '수제 당근케이크', description: '매일 아침 직접 굽는 촉촉한 홈메이드 케이크', price: '7,000원' },
      { name: '아이스 아메리카노', description: '에티오피아 원두로 내린 깔끔한 산미', price: '4,500원' },
    ],
    allMenuItems: [
      { name: '연남 시그니처 라떼', description: '달콤한 캐러멜과 고소한 우유가 조화로운 인기 메뉴', price: '6,500원' },
      { name: '수제 당근케이크', description: '매일 아침 직접 굽는 촉촉한 홈메이드 케이크', price: '7,000원' },
      { name: '아이스 아메리카노', description: '에티오피아 원두로 내린 깔끔한 산미', price: '4,500원' },
      { name: '바닐라 라떼', description: '부드러운 바닐라 시럽과 에스프레소의 조화', price: '5,500원' },
      { name: '딸기 스무디', description: '신선한 딸기와 요거트를 블렌딩', price: '6,000원' },
      { name: '티라미수', description: '이탈리안 정통 레시피로 만든 디저트', price: '7,500원' },
      { name: '크로플', description: '바삭한 크로와상 반죽으로 만든 와플', price: '5,000원' },
      { name: '레몬에이드', description: '직접 짜낸 레몬으로 만든 상큼한 음료', price: '5,500원' },
    ],
    usp: '연남동에서 가장 아늑한 2층 창가석',
    keywords: ['연남동카페', '시그니처라떼', '데이트카페', '당근케이크'],
    blockedWords: ['저렴한', '할인', '가성비'],
    defaultCta: 'reservation',
    channels: {
      blog: { url: 'https://blog.naver.com/warmafternoon', connected: true },
      instagram: { url: '@warm_afternoon_cafe', connected: true },
      youtube: { url: '', connected: false },
    },
    operationMode: 'steady',
    createdAt: '2024-01-15',
  },
  {
    id: 'store-2',
    name: '스마트 영어학원',
    industry: '교육/학원',
    tone: 'professional',
    region: '서울 강남구 대치동',
    contact: '02-9876-5432',
    operatingHours: '평일 14:00 - 22:00, 주말 10:00 - 18:00',
    strengths: ['1:1 맞춤 커리큘럼', '원어민 강사진', '소수정예 수업', '성적 향상 보장'],
    additionalStrengths: ['온라인 병행 수업', '자습실 완비', '주차 가능', '상담실 별도 운영'],
    featuredItems: [
      { name: '토익 집중반', description: '8주 만에 200점 상승 보장 프로그램', price: '월 45만원' },
      { name: '영어회화 마스터', description: '실전 비즈니스 영어 완성 과정', price: '월 50만원' },
      { name: '수능영어 특강', description: '1등급 달성을 위한 전략적 접근', price: '월 55만원' },
    ],
    allMenuItems: [
      { name: '토익 집중반', description: '8주 만에 200점 상승 보장 프로그램', price: '월 45만원' },
      { name: '영어회화 마스터', description: '실전 비즈니스 영어 완성 과정', price: '월 50만원' },
      { name: '수능영어 특강', description: '1등급 달성을 위한 전략적 접근', price: '월 55만원' },
      { name: '주니어 영어', description: '초등학생 대상 기초 영어', price: '월 35만원' },
      { name: '오픽 대비반', description: 'OPic IH 이상 목표 과정', price: '월 40만원' },
    ],
    usp: '강남 최고 합격률 92% 달성',
    keywords: ['대치동영어', '토익학원', '영어회화', '수능영어'],
    blockedWords: ['싼', '무료', '이벤트'],
    defaultCta: 'call',
    channels: {
      blog: { url: 'https://blog.naver.com/smartenglish', connected: true },
      youtube: { url: '@smartenglish_academy', connected: false },
    },
    operationMode: 'aggressive',
    createdAt: '2024-02-01',
  },
];

// Sample Media Items
export const sampleMediaItems: MediaItem[] = [
  // 가게/매장 카테고리 (3장)
  {
    id: 'media-1',
    storeId: 'store-1',
    category: 'store',
    url: '/placeholder.svg',
    tags: ['외관', '입구', '간판'],
    description: '따뜻한 오후 카페 외관 전경',
    location: '외관',
    uploadedAt: '2024-03-05',
    isFeatured: true,
  },
  {
    id: 'media-2',
    storeId: 'store-1',
    category: 'store',
    url: '/placeholder.svg',
    tags: ['내부', '1층', '카운터'],
    description: '1층 카운터와 메뉴판',
    location: '내부',
    uploadedAt: '2024-03-04',
  },
  {
    id: 'media-3',
    storeId: 'store-1',
    category: 'store',
    url: '/placeholder.svg',
    tags: ['2층', '창가석', '좌석'],
    description: '인기 있는 2층 창가석 전경',
    location: '좌석',
    uploadedAt: '2024-03-03',
  },
  // 제품/메뉴 카테고리 (3장)
  {
    id: 'media-4',
    storeId: 'store-1',
    category: 'product',
    url: '/placeholder.svg',
    tags: ['시그니처라떼', '음료', '베스트'],
    description: '연남 시그니처 라떼',
    location: '메뉴',
    uploadedAt: '2024-03-08',
  },
  {
    id: 'media-5',
    storeId: 'store-1',
    category: 'product',
    url: '/placeholder.svg',
    tags: ['당근케이크', '디저트', '수제'],
    description: '매일 굽는 수제 당근케이크',
    location: '메뉴',
    uploadedAt: '2024-03-07',
  },
  {
    id: 'media-6',
    storeId: 'store-1',
    category: 'product',
    url: '/placeholder.svg',
    tags: ['아메리카노', '커피', '원두'],
    description: '에티오피아 원두 아이스 아메리카노',
    location: '메뉴',
    uploadedAt: '2024-03-06',
  },
  // 분위기 카테고리 (2장)
  {
    id: 'media-7',
    storeId: 'store-1',
    category: 'atmosphere',
    url: '/placeholder.svg',
    tags: ['감성', '조명', '인테리어'],
    description: '따뜻한 조명의 저녁 분위기',
    uploadedAt: '2024-03-02',
  },
  {
    id: 'media-8',
    storeId: 'store-1',
    category: 'atmosphere',
    url: '/placeholder.svg',
    tags: ['창밖', '연남동', '골목'],
    description: '창밖으로 보이는 연남동 골목',
    uploadedAt: '2024-03-01',
  },
  // 차별점 카테고리 (1장)
  {
    id: 'media-9',
    storeId: 'store-1',
    category: 'unique',
    url: '/placeholder.svg',
    tags: ['펫프렌들리', '반려동물', '강아지'],
    description: '반려동물과 함께 방문 가능',
    uploadedAt: '2024-02-28',
  },
];

// Sample Feedbacks (20개)
export const sampleFeedbacks: Feedback[] = [
  // 카페 피드백 (10개)
  { id: 'fb-1', storeId: 'store-1', type: 'review', content: '시그니처 라떼가 정말 맛있어요! 달달하면서도 너무 달지 않고 딱 좋았습니다. 창가석에서 마시니까 분위기도 최고!', sentiment: 'positive', rating: 5, source: '네이버', createdAt: '2024-03-10', keywords: ['시그니처라떼', '분위기'] },
  { id: 'fb-2', storeId: 'store-1', type: 'review', content: '2층 좌석이 정말 아늑해요. 책 읽으면서 시간 보내기 좋습니다. 다만 주말에는 자리 잡기가 조금 어려워요.', sentiment: 'positive', rating: 4, source: '카카오맵', createdAt: '2024-03-09', keywords: ['아늑함', '좌석'] },
  { id: 'fb-3', storeId: 'store-1', type: 'review', content: '당근케이크 먹으러 일부러 왔는데 역시 맛있네요. 촉촉하고 크림치즈 양도 넉넉해요.', sentiment: 'positive', rating: 5, source: '인스타그램', createdAt: '2024-03-08', keywords: ['당근케이크', '디저트'] },
  { id: 'fb-4', storeId: 'store-1', type: 'survey', content: '분위기는 좋은데 음악이 조금 시끄러웠으면 합니다. 대화하기 어려울 때가 있어요.', sentiment: 'neutral', createdAt: '2024-03-07', keywords: ['음악', '대화'] },
  { id: 'fb-5', storeId: 'store-1', type: 'review', content: '연남동에서 이만한 카페 없어요. 직원분들도 친절하시고 커피맛도 좋아요. 와이파이 빵빵!', sentiment: 'positive', rating: 5, source: '네이버', createdAt: '2024-03-06', keywords: ['친절', '와이파이'] },
  { id: 'fb-6', storeId: 'store-1', type: 'inquiry', content: '생일파티 예약 가능한가요? 10명 정도 단체 자리 있는지 궁금합니다.', sentiment: 'neutral', createdAt: '2024-03-05', keywords: ['예약', '단체'] },
  { id: 'fb-7', storeId: 'store-1', type: 'review', content: '아메리카노가 좀 연한 것 같아요. 진하게 해달라고 하면 추가 비용이 있던데...', sentiment: 'negative', rating: 3, source: '네이버', createdAt: '2024-03-04', keywords: ['아메리카노', '농도'] },
  { id: 'fb-8', storeId: 'store-1', type: 'review', content: '데이트 장소로 완벽해요! 여자친구가 너무 좋아했어요. 다음에 또 올게요~', sentiment: 'positive', rating: 5, source: '인스타그램', createdAt: '2024-03-03', keywords: ['데이트', '분위기'] },
  { id: 'fb-9', storeId: 'store-1', type: 'survey', content: '주차 공간이 없어서 불편했어요. 인근 주차장 안내가 있으면 좋겠습니다.', sentiment: 'negative', createdAt: '2024-03-02', keywords: ['주차', '불편'] },
  { id: 'fb-10', storeId: 'store-1', type: 'review', content: '에티오피아 원두 새로 바뀐 거 같은데 이전보다 더 좋아요! 산미 있는 커피 좋아하시면 추천!', sentiment: 'positive', rating: 5, source: '카카오맵', createdAt: '2024-03-01', keywords: ['원두', '산미'] },

  // 학원 피드백 (10개)
  { id: 'fb-11', storeId: 'store-2', type: 'review', content: '토익 200점 올랐어요! 8주 과정인데 정말 효과적이었습니다. 선생님들이 체계적으로 가르쳐주세요.', sentiment: 'positive', rating: 5, source: '네이버', createdAt: '2024-03-10', keywords: ['토익', '성적향상'] },
  { id: 'fb-12', storeId: 'store-2', type: 'survey', content: '원어민 선생님 수업이 너무 좋아요. 발음 교정에 큰 도움이 됩니다.', sentiment: 'positive', createdAt: '2024-03-09', keywords: ['원어민', '발음'] },
  { id: 'fb-13', storeId: 'store-2', type: 'review', content: '소수정예라 질문할 기회가 많아서 좋아요. 다른 학원처럼 붐비지 않습니다.', sentiment: 'positive', rating: 5, source: '카카오맵', createdAt: '2024-03-08', keywords: ['소수정예', '질문'] },
  { id: 'fb-14', storeId: 'store-2', type: 'inquiry', content: '수능영어 특강 일정이 어떻게 되나요? 고2 학생인데 시작하기 늦지 않은지...', sentiment: 'neutral', createdAt: '2024-03-07', keywords: ['수능', '상담'] },
  { id: 'fb-15', storeId: 'store-2', type: 'review', content: '가격이 조금 비싼 편이지만 그만큼 효과가 있어요. 투자할 가치 있습니다.', sentiment: 'positive', rating: 4, source: '네이버', createdAt: '2024-03-06', keywords: ['가격', '효과'] },
  { id: 'fb-16', storeId: 'store-2', type: 'review', content: '주차 공간이 협소해서 불편해요. 대중교통으로 오는 게 나을 것 같습니다.', sentiment: 'negative', rating: 3, source: '카카오맵', createdAt: '2024-03-05', keywords: ['주차', '접근성'] },
  { id: 'fb-17', storeId: 'store-2', type: 'survey', content: '온라인 수업도 병행해주시면 좋겠어요. 출장이 잦아서 매번 오기 어렵습니다.', sentiment: 'neutral', createdAt: '2024-03-04', keywords: ['온라인', '수업'] },
  { id: 'fb-18', storeId: 'store-2', type: 'review', content: '비즈니스 영어 과정 수료했는데 회사에서 영어 프레젠테이션 자신있게 할 수 있게 됐어요!', sentiment: 'positive', rating: 5, source: '네이버', createdAt: '2024-03-03', keywords: ['비즈니스', '프레젠테이션'] },
  { id: 'fb-19', storeId: 'store-2', type: 'review', content: '1:1 맞춤 피드백이 정말 좋아요. 제 약점을 정확히 파악해서 보완해주십니다.', sentiment: 'positive', rating: 5, source: '인스타그램', createdAt: '2024-03-02', keywords: ['맞춤', '피드백'] },
  { id: 'fb-20', storeId: 'store-2', type: 'inquiry', content: '그룹 수업과 개인 수업 비용 차이가 어떻게 되나요? 상담 예약 원합니다.', sentiment: 'neutral', createdAt: '2024-03-01', keywords: ['비용', '상담'] },
];

// Sample Contents (15개)
export const sampleContents: Content[] = [
  // 카페 콘텐츠
  { id: 'cnt-1', storeId: 'store-1', type: 'blog', title: '연남동 데이트 카페 추천 | 따뜻한 오후 카페 시그니처 라떼 후기', content: '연남동에서 분위기 좋은 카페를 찾고 계신가요? 2층 창가석에서 즐기는 시그니처 라떼의 매력을 소개합니다...', status: 'published', channel: 'blog', publishedAt: '2024-03-08', createdAt: '2024-03-07', performance: { views: 1523, inquiries: 12 } },
  { id: 'cnt-2', storeId: 'store-1', type: 'shorts', title: '60초로 알아보는 연남동 숨은 카페', content: '[훅] 연남동에서 가장 아늑한 카페를 찾았습니다\n[장면1] 2층 창가석에서 바라보는 연남동 골목길\n[장면2] 시그니처 라떼를 내리는 바리스타\n[CTA] 예약 링크는 프로필에서!', status: 'scheduled', channel: 'youtube', scheduledAt: '2024-03-15', createdAt: '2024-03-10', performance: { views: 0, inquiries: 0 } },
  { id: 'cnt-3', storeId: 'store-1', type: 'sns', title: '인스타그램 피드 - 당근케이크 신메뉴', content: '🥕 매일 아침 굽는 수제 당근케이크\n\n촉촉한 케이크 시트에 진한 크림치즈 프로스팅!\n#연남동카페 #당근케이크 #카페스타그램 #디저트맛집 #홈메이드케이크', status: 'approved', channel: 'instagram', createdAt: '2024-03-09', performance: { views: 0, inquiries: 0 } },
  { id: 'cnt-4', storeId: 'store-1', type: 'blog', title: '카페 창업 3년차, 단골 손님이 말하는 우리 카페의 매력', content: '카페를 운영하면서 가장 뿌듯한 순간은 고객님들의 진심어린 후기를 받을 때입니다...', status: 'pending', createdAt: '2024-03-11', performance: { views: 0, inquiries: 0 } },
  { id: 'cnt-5', storeId: 'store-1', type: 'sns', title: '스레드 포스팅 - 봄맞이 신메뉴', content: '봄이 오면 생각나는 맛 🌸\n딸기 라떼 출시 기념, 이번 주말까지 케이크 10% 할인!', status: 'draft', createdAt: '2024-03-12', performance: { views: 0, inquiries: 0 } },
  { id: 'cnt-6', storeId: 'store-1', type: 'shorts', title: '바리스타가 알려주는 라떼아트 비법', content: '[훅] 집에서도 예쁜 라떼아트 만들 수 있어요\n[장면1] 우유 거품 만들기\n[장면2] 하트 모양 그리기\n[CTA] 더 많은 팁은 블로그에서!', status: 'draft', createdAt: '2024-03-13', performance: { views: 0, inquiries: 0 } },

  // 학원 콘텐츠
  { id: 'cnt-7', storeId: 'store-2', type: 'blog', title: '토익 200점 향상 비결 | 스마트 영어학원 8주 집중반 후기', content: '많은 분들이 토익 점수 올리기 어려워하시죠. 오늘은 저희 학원에서 8주 만에 200점 향상에 성공한 수강생의 이야기를 들려드립니다...', status: 'published', channel: 'blog', publishedAt: '2024-03-05', createdAt: '2024-03-04', performance: { views: 2341, inquiries: 28 } },
  { id: 'cnt-8', storeId: 'store-2', type: 'blog', title: '2024 수능영어 1등급 전략 | 대치동 영어학원 선생님이 알려드립니다', content: '수능영어 1등급, 어렵게만 느껴지시나요? 정확한 전략과 꾸준한 학습으로 충분히 달성 가능합니다...', status: 'published', channel: 'blog', publishedAt: '2024-03-01', createdAt: '2024-02-28', performance: { views: 3156, inquiries: 45 } },
  { id: 'cnt-9', storeId: 'store-2', type: 'shorts', title: '영어 면접 필수 표현 5가지', content: '[훅] 외국계 기업 면접, 이 5문장만 외우세요\n[장면1] Tell me about yourself 대답법\n[장면2] 강점/약점 표현하기\n[CTA] 전체 스크립트는 블로그에서!', status: 'scheduled', channel: 'youtube', scheduledAt: '2024-03-18', createdAt: '2024-03-10', performance: { views: 0, inquiries: 0 } },
  { id: 'cnt-10', storeId: 'store-2', type: 'sns', title: '인스타그램 릴스 - 발음 교정 팁', content: '🎯 원어민처럼 발음하는 비법\n\nR과 L 발음, 이렇게 구분하세요!\n#영어발음 #영어공부 #토익 #영어회화 #대치동영어', status: 'approved', channel: 'instagram', createdAt: '2024-03-09', performance: { views: 0, inquiries: 0 } },
  { id: 'cnt-11', storeId: 'store-2', type: 'blog', title: '비즈니스 영어 이메일 작성법 완벽 가이드', content: '회사에서 영어 이메일 쓸 때마다 고민되시죠? 상황별 템플릿과 자주 쓰는 표현을 정리했습니다...', status: 'pending', createdAt: '2024-03-11', performance: { views: 0, inquiries: 0 } },
  { id: 'cnt-12', storeId: 'store-2', type: 'sns', title: '스레드 포스팅 - 토익 단어 암기법', content: '토익 단어, 이렇게 외우면 절대 안 까먹어요 📚\n어원으로 외우는 토익 필수 어휘 10개!', status: 'draft', createdAt: '2024-03-12', performance: { views: 0, inquiries: 0 } },
  { id: 'cnt-13', storeId: 'store-2', type: 'shorts', title: '30초 영어 표현 - 회의에서 의견 말하기', content: '[훅] 영어 회의에서 당당하게 의견 말하기\n[표현1] I think we should...\n[표현2] In my opinion...\n[CTA] 상담 신청은 프로필 링크에서!', status: 'failed', channel: 'youtube', createdAt: '2024-03-08', performance: { views: 0, inquiries: 0 } },
  { id: 'cnt-14', storeId: 'store-2', type: 'blog', title: '영어 스피킹 실력 늘리는 3가지 습관', content: '영어 회화 실력, 혼자서도 늘릴 수 있습니다. 원어민 강사진이 추천하는 3가지 습관을 소개합니다...', status: 'draft', createdAt: '2024-03-13', performance: { views: 0, inquiries: 0 } },
  { id: 'cnt-15', storeId: 'store-2', type: 'sns', title: '페이스북 광고 - 봄학기 모집', content: '🌸 2024 봄학기 수강생 모집!\n\n✅ 토익 8주 집중반\n✅ 영어회화 마스터\n✅ 수능영어 특강\n\n지금 상담 신청하시면 레벨테스트 무료!', status: 'scheduled', channel: 'other', scheduledAt: '2024-03-20', createdAt: '2024-03-14', performance: { views: 0, inquiries: 0 } },
];

// Sample Schedules (5개)
export const sampleSchedules: Schedule[] = [
  { id: 'sch-1', storeId: 'store-1', contentId: 'cnt-2', channel: 'youtube', scheduledAt: '2024-03-15T14:00:00', status: 'pending' },
  { id: 'sch-2', storeId: 'store-2', contentId: 'cnt-9', channel: 'youtube', scheduledAt: '2024-03-18T10:00:00', status: 'pending' },
  { id: 'sch-3', storeId: 'store-2', contentId: 'cnt-15', channel: 'other', scheduledAt: '2024-03-20T09:00:00', status: 'pending' },
  { id: 'sch-4', storeId: 'store-1', contentId: 'cnt-1', channel: 'blog', scheduledAt: '2024-03-08T12:00:00', status: 'completed' },
  { id: 'sch-5', storeId: 'store-2', contentId: 'cnt-7', channel: 'blog', scheduledAt: '2024-03-05T11:00:00', status: 'completed' },
];

// Sample Analytics Data
export const sampleAnalytics = {
  'store-1': {
    weekly: [
      { date: '3/4', views: 234, inquiries: 3 },
      { date: '3/5', views: 312, inquiries: 5 },
      { date: '3/6', views: 289, inquiries: 2 },
      { date: '3/7', views: 445, inquiries: 7 },
      { date: '3/8', views: 523, inquiries: 8 },
      { date: '3/9', views: 612, inquiries: 10 },
      { date: '3/10', views: 478, inquiries: 6 },
    ],
    topContent: [
      { title: '연남동 데이트 카페 추천', views: 1523, inquiries: 12 },
      { title: '시그니처 라떼 소개', views: 892, inquiries: 5 },
      { title: '당근케이크 신메뉴', views: 654, inquiries: 3 },
    ],
    recommendations: [
      { type: 'keyword', value: '연남동브런치', reason: '검색량 급상승 키워드' },
      { type: 'timing', value: '오전 10시', reason: '조회수 최고 시간대' },
      { type: 'cta', value: '예약 링크', reason: '전환율 23% 더 높음' },
    ],
  },
  'store-2': {
    weekly: [
      { date: '3/4', views: 456, inquiries: 8 },
      { date: '3/5', views: 534, inquiries: 12 },
      { date: '3/6', views: 478, inquiries: 9 },
      { date: '3/7', views: 623, inquiries: 15 },
      { date: '3/8', views: 712, inquiries: 18 },
      { date: '3/9', views: 589, inquiries: 11 },
      { date: '3/10', views: 667, inquiries: 14 },
    ],
    topContent: [
      { title: '2024 수능영어 1등급 전략', views: 3156, inquiries: 45 },
      { title: '토익 200점 향상 비결', views: 2341, inquiries: 28 },
      { title: '비즈니스 영어 이메일 가이드', views: 1234, inquiries: 15 },
    ],
    recommendations: [
      { type: 'keyword', value: '토익독학', reason: '검색량 증가 추세' },
      { type: 'timing', value: '저녁 8시', reason: '학부모 조회 피크' },
      { type: 'tone', value: '전문적', reason: '신뢰도 점수 높음' },
    ],
  },
};

// Industry options
export const industryOptions = [
  '카페/음료',
  '음식점/레스토랑',
  '교육/학원',
  '미용/뷰티',
  '의료/병원',
  '숙박/호텔',
  '피트니스/헬스',
  '반려동물',
  '꽃집/플라워',
  '기타',
];

// Tone options
export const toneOptions = [
  { value: 'friendly', label: '친근한', description: '편안하고 따뜻한 말투' },
  { value: 'professional', label: '전문적', description: '신뢰감 있는 격식체' },
  { value: 'emotional', label: '감성적', description: '감동과 공감을 주는 톤' },
];

// CTA options
export const ctaOptions = [
  { value: 'call', label: '전화 문의' },
  { value: 'reservation', label: '예약하기' },
  { value: 'visit', label: '방문하기' },
  { value: 'dm', label: 'DM 보내기' },
  { value: 'link', label: '링크 클릭' },
];

// Operation mode options
export const operationModeOptions = [
  { value: 'light', label: '가볍게 시작', description: '주 1-2회 발행, 부담 없이 시작', recommended: true },
  { value: 'steady', label: '꾸준히 운영', description: '주 3-4회 발행, 안정적 운영' },
  { value: 'aggressive', label: '공격적으로 운영', description: '매일 발행, 빠른 성장 목표' },
];

// Status labels
export const statusLabels: Record<string, { label: string; color: string }> = {
  draft: { label: '작성중', color: 'bg-muted text-muted-foreground' },
  pending: { label: '승인대기', color: 'bg-yellow-100 text-yellow-800' },
  approved: { label: '승인됨', color: 'bg-blue-100 text-blue-800' },
  scheduled: { label: '예약됨', color: 'bg-purple-100 text-purple-800' },
  published: { label: '발행완료', color: 'bg-green-100 text-green-800' },
  failed: { label: '실패', color: 'bg-red-100 text-red-800' },
};

// Content type labels
export const contentTypeLabels: Record<string, { label: string; icon: string }> = {
  blog: { label: '블로그', icon: 'FileText' },
  shorts: { label: '쇼츠', icon: 'Video' },
  sns: { label: 'SNS', icon: 'Share2' },
};

// Media category labels
export const mediaCategoryLabels: Record<string, { label: string; description: string }> = {
  store: { label: '가게/매장', description: '외관, 내부, 좌석 등 가게 전경 사진' },
  product: { label: '제품/메뉴', description: '대표 메뉴, 상품 사진' },
  atmosphere: { label: '분위기', description: '무드, 인테리어 포인트, 감성컷' },
  unique: { label: '차별점', description: '특이한 요소, 베네핏, 서비스, 이벤트' },
  other: { label: '기타', description: '그 외 활용 가능한 사진' },
};

// Media location options
export const mediaLocationOptions = [
  { value: '외관', label: '외관' },
  { value: '내부', label: '내부' },
  { value: '좌석', label: '좌석' },
  { value: '메뉴', label: '메뉴' },
  { value: '기타', label: '기타' },
];
