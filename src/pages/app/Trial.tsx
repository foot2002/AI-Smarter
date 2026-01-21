import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sparkles,
  FileText,
  Video,
  Share2,
  ArrowRight,
  Loader2,
  Send,
  Store,
  Copy,
  Download,
  ChevronDown,
  Coffee,
  UtensilsCrossed,
  GraduationCap,
  Heart,
  RotateCcw,
  Package,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";
import { toneOptions, ctaOptions } from "@/data/sampleData";

// 업종별 샘플 데이터
const scenarioData = {
  cafe: {
    name: "따뜻한 오후 카페",
    industry: "카페/음료",
    tone: "friendly",
    cta: "reservation",
    reviews: `정말 분위기 좋은 카페예요! 시그니처 라떼가 너무 맛있어서 또 방문했습니다.
2층 창가 자리가 정말 아늑하고 인테리어도 예뻐요.
다만 주말에는 자리 잡기가 조금 어려워요. 예약 시스템이 있으면 좋겠어요.
디저트 중에 당근케이크 강추합니다! 촉촉하고 크림치즈 양도 넉넉해요.
직원분들도 친절하시고 음악도 좋아요. 공부하기에도 좋은 곳!`,
    result: {
      keywords: ["시그니처라떼", "분위기", "당근케이크"],
      blog: {
        titles: [
          "연남동 분위기 카페 추천 | 시그니처 라떼가 맛있는 곳",
          "2층 창가석이 예쁜 카페 | 당근케이크 맛집",
          "아늑한 인테리어 카페 | 데이트 코스 추천"
        ],
        toc: [
          "첫인상 - 2층 창가석의 매력",
          "시그니처 라떼 솔직 후기",
          "디저트 강추 - 당근케이크",
          "방문 전 알아두면 좋은 팁"
        ],
        content: "연남동 골목길을 걷다 보면 만나게 되는 아늑한 공간, 따뜻한 오후 카페입니다. 2층 창가석에서 바라보는 거리 풍경이 정말 예쁘고, 시그니처 라떼 한 잔이면 오후가 행복해져요...",
        faq: [
          { q: "예약이 가능한가요?", a: "현재 예약 시스템 도입을 검토 중입니다." },
          { q: "주차는 가능한가요?", a: "인근 유료 주차장을 이용해주세요." }
        ]
      },
      shorts: {
        hook: "연남동에서 가장 아늑한 카페를 찾았습니다",
        scenes: [
          { time: "0-5초", desc: "훅 - 연남동에서 가장 아늑한 카페" },
          { time: "5-20초", desc: "2층 창가석에서 바라보는 연남동 골목길" },
          { time: "20-40초", desc: "시그니처 라떼 + 당근케이크 클로즈업" },
          { time: "40-55초", desc: "고객 리뷰 자막 오버레이" },
          { time: "55-60초", desc: "CTA - 예약은 프로필 링크에서!" }
        ],
        thumbnails: ["연남동 찐맛집 카페 🍰", "시그니처 라떼 = 인생라떼", "2층 창가석 뷰 최고✨"]
      },
      sns: {
        captions: [
          { tone: "친근한", text: "오늘도 시그니처 라떼 마시러 왔어요 ☕ 2층 창가석 최고~!" },
          { tone: "감성적", text: "창밖으로 스며드는 오후의 햇살, 그리고 달콤한 라떼 한 잔" }
        ],
        hashtags: "#연남동카페 #시그니처라떼 #카페스타그램 #당근케이크 #분위기좋은카페 #데이트코스 #연남동맛집 #카페추천 #인스타카페 #홈메이드디저트 #창가석카페 #아늑한카페"
      }
    }
  },
  restaurant: {
    name: "맛있는 한끼 식당",
    industry: "음식점/레스토랑",
    tone: "friendly",
    cta: "reservation",
    reviews: `점심 특선이 정말 가성비 좋아요! 제육볶음 양도 많고 맛도 끝내줍니다.
반찬이 신선하고 종류도 다양해서 좋았어요. 된장찌개도 집밥 느낌이에요.
주차가 좀 불편하긴 한데, 맛으로 다 보상됩니다.
가족끼리 와도 좋을 것 같아요. 아이들 메뉴도 따로 있어서 편했어요.
점심시간에 줄이 길어서 일찍 오는 게 좋아요.`,
    result: {
      keywords: ["점심특선", "가성비", "집밥느낌"],
      blog: {
        titles: [
          "가성비 점심 맛집 추천 | 제육볶음이 맛있는 곳",
          "집밥 느낌 한식당 | 점심 특선 메뉴 리뷰",
          "가족 외식 추천 맛집 | 아이 메뉴도 있는 식당"
        ],
        toc: [
          "점심 특선 메뉴 소개",
          "제육볶음 솔직 후기",
          "반찬과 된장찌개",
          "방문 팁 (주차, 대기시간)"
        ],
        content: "점심시간 직장인들 사이에서 입소문 난 '맛있는 한끼 식당'을 다녀왔습니다. 제육볶음 정식이 인기 메뉴인데, 양도 푸짐하고 밥도둑이에요...",
        faq: [
          { q: "주차 가능한가요?", a: "건물 뒤편에 협소한 주차 공간이 있습니다." },
          { q: "아이 의자가 있나요?", a: "네, 유아용 의자 준비되어 있습니다." }
        ]
      },
      shorts: {
        hook: "직장인들 사이에서 난리난 점심 맛집",
        scenes: [
          { time: "0-5초", desc: "훅 - 점심시간 줄 서는 맛집" },
          { time: "5-20초", desc: "제육볶음 정식 세팅 장면" },
          { time: "20-40초", desc: "먹방 + 반찬 클로즈업" },
          { time: "40-55초", desc: "가격 자막 + 고객 반응" },
          { time: "55-60초", desc: "CTA - 위치는 프로필에서!" }
        ],
        thumbnails: ["점심 특선 7,000원 🍚", "제육볶음 맛집 발견", "줄 서는 이유가 있다"]
      },
      sns: {
        captions: [
          { tone: "친근한", text: "오늘 점심은 여기서 제육볶음! 양도 많고 맛도 최고 👍" },
          { tone: "정보형", text: "점심 특선 7,000원에 이 퀄리티? 재방문 확정입니다" }
        ],
        hashtags: "#점심맛집 #제육볶음 #가성비맛집 #직장인점심 #한식맛집 #서울맛집 #점심특선 #밥도둑 #맛스타그램 #푸짐한양 #집밥느낌 #가족외식"
      }
    }
  },
  academy: {
    name: "스마트 영어학원",
    industry: "학원/교육",
    tone: "professional",
    cta: "phone",
    reviews: `아이가 영어를 싫어했는데, 여기 다니면서 흥미를 붙였어요.
선생님들이 친절하시고 아이 수준에 맞춰서 진도를 나가주세요.
원어민 회화 수업이 정말 좋아요. 발음이 많이 좋아졌어요.
상담도 친절하고, 진도 상황도 카톡으로 알려주셔서 좋아요.
다만 주차가 좀 불편해요. 픽업 시간에 차가 많이 막혀요.`,
    result: {
      keywords: ["원어민회화", "맞춤진도", "친절상담"],
      blog: {
        titles: [
          "영어 흥미 붙이는 학원 | 원어민 회화 수업 후기",
          "아이 영어학원 추천 | 맞춤 진도 커리큘럼",
          "초등 영어학원 비교 | 스마트 영어학원 솔직 리뷰"
        ],
        toc: [
          "학원 분위기와 시설",
          "원어민 회화 수업 특징",
          "맞춤 진도 시스템",
          "학부모 소통 방식"
        ],
        content: "아이가 영어를 싫어해서 걱정이 많았는데, 스마트 영어학원에 보내고 나서 변화가 생겼어요. 원어민 선생님과의 회화 수업이 재미있대요...",
        faq: [
          { q: "무료 레벨테스트가 있나요?", a: "네, 무료 레벨테스트 후 맞춤 반 배정을 해드립니다." },
          { q: "셔틀버스가 있나요?", a: "현재 셔틀버스는 운영하지 않습니다." }
        ]
      },
      shorts: {
        hook: "영어 싫어하던 아이가 달라졌어요",
        scenes: [
          { time: "0-5초", desc: "훅 - 영어 싫어하던 아이의 변화" },
          { time: "5-20초", desc: "원어민 수업 장면" },
          { time: "20-40초", desc: "학생 인터뷰 + 발음 비교" },
          { time: "40-55초", desc: "학부모 후기 자막" },
          { time: "55-60초", desc: "CTA - 무료 상담 예약!" }
        ],
        thumbnails: ["원어민 회화 수업 🗣️", "영어 흥미 붙이는 법", "발음이 달라졌어요"]
      },
      sns: {
        captions: [
          { tone: "친근한", text: "아이가 영어를 좋아하게 된 비결! 원어민 수업 덕분이에요 ✨" },
          { tone: "전문적", text: "맞춤 진도 시스템으로 아이 수준에 딱 맞는 수업을 제공합니다" }
        ],
        hashtags: "#영어학원 #원어민수업 #초등영어 #맞춤진도 #영어회화 #학원추천 #영어교육 #아이영어 #발음교정 #영어흥미 #학부모추천 #무료상담"
      }
    }
  },
  hospital: {
    name: "미소 치과의원",
    industry: "병원/의원",
    tone: "professional",
    cta: "phone",
    reviews: `치료 전 설명을 정말 자세하게 해주셔서 안심이 됐어요.
주사 맞을 때도 거의 안 아팠어요. 손이 부드러우세요.
대기 시간이 좀 길긴 한데, 그만큼 꼼꼼하게 봐주시는 것 같아요.
스케일링 받았는데 개운해요. 양치 방법도 알려주셔서 좋았어요.
어린이 전용 진료실이 있어서 아이 데려가기 좋아요.`,
    result: {
      keywords: ["자세한설명", "통증최소화", "꼼꼼진료"],
      blog: {
        titles: [
          "통증 없는 치과 찾기 | 미소 치과의원 후기",
          "꼼꼼한 진료로 유명한 치과 | 스케일링 체험기",
          "아이도 안심하는 치과 | 어린이 전용 진료실"
        ],
        toc: [
          "첫 방문 상담 후기",
          "통증 최소화 치료",
          "스케일링 & 양치 교육",
          "어린이 진료 환경"
        ],
        content: "치과 공포증이 있어서 병원 가기가 무서웠는데, 미소 치과의원에서 좋은 경험을 했어요. 치료 전에 뭘 할 건지 상세하게 설명해주시고...",
        faq: [
          { q: "주말 진료하나요?", a: "토요일 오전 진료 가능합니다." },
          { q: "주차 가능한가요?", a: "건물 지하 주차장 2시간 무료입니다." }
        ]
      },
      shorts: {
        hook: "치과 공포증 있는 분들 주목!",
        scenes: [
          { time: "0-5초", desc: "훅 - 치과가 무서우신 분들?" },
          { time: "5-20초", desc: "친절한 상담 장면" },
          { time: "20-40초", desc: "통증 없는 치료 과정" },
          { time: "40-55초", desc: "환자 인터뷰 + 만족 후기" },
          { time: "55-60초", desc: "CTA - 예약 문의!" }
        ],
        thumbnails: ["무통 치료 치과 🦷", "치과 공포증 극복!", "어린이 전용 진료실"]
      },
      sns: {
        captions: [
          { tone: "친근한", text: "치과 가기 무서우셨죠? 여기서 치료받고 생각이 바뀌었어요 😊" },
          { tone: "전문적", text: "통증 최소화 치료와 꼼꼼한 사전 설명으로 안심 진료를 제공합니다" }
        ],
        hashtags: "#치과추천 #무통치료 #스케일링 #치과공포증 #어린이치과 #친절한치과 #꼼꼼진료 #치아건강 #치과의원 #사전설명 #통증없는치과 #토요진료"
      }
    }
  }
};

// 빈 상태 샘플 프리뷰 데이터
const samplePreview = {
  blog: {
    titles: ["[가게명] 추천 이유 TOP 3 | 키워드 중심 제목", "[업종] 맛집/전문점 후기 | 솔직 리뷰"],
    toc: ["1. 첫인상과 분위기", "2. 대표 메뉴/서비스 소개", "3. 고객 후기 요약", "4. 방문 팁"],
    content: "가게 정보와 리뷰를 입력하면, AI가 분석해서 SEO 최적화된 블로그 글을 생성합니다..."
  },
  shorts: {
    hook: "[0-5초] 시선을 사로잡는 훅 문장",
    scenes: ["[5-20초] 장면 1 설명", "[20-40초] 장면 2 설명", "[40-60초] CTA로 마무리"],
    thumbnails: ["썸네일 문구 1", "썸네일 문구 2"]
  },
  sns: {
    captions: ["[친근한 톤] 오늘도 여기서... ☕", "[감성 톤] 일상 속 작은 행복..."],
    hashtags: "#해시태그 #키워드 #브랜드명 ..."
  }
};

type ScenarioKey = "cafe" | "restaurant" | "academy" | "hospital";

export default function Trial() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<ScenarioKey | null>(null);
  const [expandedResult, setExpandedResult] = useState<"blog" | "shorts" | "sns" | null>(null);
  
  const [storeInfo, setStoreInfo] = useState({
    name: "",
    industry: "",
    tone: "friendly",
    cta: "reservation",
  });
  const [reviewText, setReviewText] = useState("");
  const [email, setEmail] = useState("");
  
  // 옵션
  const [purpose, setPurpose] = useState("promo");
  const [length, setLength] = useState("standard");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState("");

  const currentResult = selectedScenario ? scenarioData[selectedScenario].result : null;

  const handleSelectScenario = (key: ScenarioKey) => {
    setSelectedScenario(key);
    const data = scenarioData[key];
    setStoreInfo({
      name: data.name,
      industry: data.industry,
      tone: data.tone,
      cta: data.cta,
    });
    setReviewText(data.reviews);
    setGenerated(false);
  };

  const handleReset = () => {
    setSelectedScenario(null);
    setStoreInfo({ name: "", industry: "", tone: "friendly", cta: "reservation" });
    setReviewText("");
    setGenerated(false);
    setKeywords([]);
  };

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
    }, 2500);
  };

  const handleCopy = (type: "blog" | "shorts" | "sns") => {
    const labels = { blog: "블로그", shorts: "쇼츠 대본", sns: "SNS 캡션" };
    toast({
      title: `${labels[type]} 복사 완료`,
      description: "클립보드에 복사되었습니다.",
    });
  };

  const handleAddKeyword = () => {
    if (keywordInput.trim() && keywords.length < 3) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput("");
    }
  };

  const handleRemoveKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg tracking-tight">
            AI <span className="text-primary">SMarter</span>
          </span>
        </Link>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/app/demo-store/dashboard">솔루션 둘러보기</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to="/contact">도입문의</Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="py-10 lg:py-14 bg-gradient-to-b from-primary/5 to-background">
        <div className="container max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-display-sm lg:text-display-md font-bold mb-3">
            1분 무료체험
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            리뷰 몇 개만 붙여넣으면 블로그·쇼츠·SNS 콘텐츠가 자동 생성됩니다
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary" className="px-3 py-1.5 text-sm gap-1.5">
              <Package className="w-3.5 h-3.5" />
              패키지로 한 번에
            </Badge>
            <Badge variant="secondary" className="px-3 py-1.5 text-sm gap-1.5">
              <Copy className="w-3.5 h-3.5" />
              복사/다운로드
            </Badge>
            <Badge variant="secondary" className="px-3 py-1.5 text-sm gap-1.5">
              <Store className="w-3.5 h-3.5" />
              내 가게로 시작
            </Badge>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Input Section */}
          <div className="space-y-5">
            {/* Scenario Selection */}
            <Card className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold">샘플 시나리오 선택</h2>
                {selectedScenario && (
                  <Button variant="ghost" size="sm" onClick={handleReset} className="text-muted-foreground h-8">
                    <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                    내 데이터로 시작
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { key: "cafe" as const, label: "카페", icon: Coffee },
                  { key: "restaurant" as const, label: "음식점", icon: UtensilsCrossed },
                  { key: "academy" as const, label: "학원", icon: GraduationCap },
                  { key: "hospital" as const, label: "병원", icon: Heart },
                ].map((item) => (
                  <Button
                    key={item.key}
                    variant={selectedScenario === item.key ? "default" : "outline"}
                    className="flex-col h-auto py-3 gap-1.5"
                    onClick={() => handleSelectScenario(item.key)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-xs">{item.label}</span>
                  </Button>
                ))}
              </div>
            </Card>

            {/* Store Info */}
            <Card className="p-5">
              <h2 className="text-base font-bold mb-4">가게 정보</h2>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-sm">가게 이름</Label>
                    <Input
                      placeholder="예: 따뜻한 오후 카페"
                      value={storeInfo.name}
                      onChange={(e) => setStoreInfo({ ...storeInfo, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm">업종</Label>
                    <Select
                      value={storeInfo.industry}
                      onValueChange={(v) => setStoreInfo({ ...storeInfo, industry: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="카페/음료">카페/음료</SelectItem>
                        <SelectItem value="음식점/레스토랑">음식점/레스토랑</SelectItem>
                        <SelectItem value="학원/교육">학원/교육</SelectItem>
                        <SelectItem value="병원/의원">병원/의원</SelectItem>
                        <SelectItem value="숙박/호텔">숙박/호텔</SelectItem>
                        <SelectItem value="뷰티/헤어">뷰티/헤어</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-sm">톤</Label>
                    <Select
                      value={storeInfo.tone}
                      onValueChange={(v) => setStoreInfo({ ...storeInfo, tone: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {toneOptions.map((t) => (
                          <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm">CTA</Label>
                    <Select
                      value={storeInfo.cta}
                      onValueChange={(v) => setStoreInfo({ ...storeInfo, cta: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ctaOptions.map((c) => (
                          <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </Card>

            {/* Review Input */}
            <Card className="p-5">
              <h2 className="text-base font-bold mb-3">리뷰/설문 붙여넣기</h2>
              <Textarea
                placeholder="고객 리뷰나 설문 응답을 붙여넣으세요.
(여러 줄 붙여넣으면 자동으로 분리됩니다)"
                className="min-h-[140px] text-sm"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-2">
                💡 여러 줄 붙여넣으면 자동 분리됩니다
              </p>
            </Card>

            {/* Options */}
            <Card className="p-5">
              <h2 className="text-base font-bold mb-4">옵션</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm">목적</Label>
                  <RadioGroup value={purpose} onValueChange={setPurpose} className="flex gap-3">
                    {[
                      { value: "promo", label: "기본 홍보" },
                      { value: "event", label: "이벤트" },
                      { value: "review", label: "후기" },
                    ].map((item) => (
                      <div key={item.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={item.value} id={item.value} />
                        <Label htmlFor={item.value} className="text-sm font-normal cursor-pointer">{item.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm">길이</Label>
                  <Select value={length} onValueChange={setLength}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">짧게</SelectItem>
                      <SelectItem value="standard">표준</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">키워드 (선택, 최대 3개)</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="예: 데이트코스"
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddKeyword()}
                      className="flex-1"
                    />
                    <Button variant="outline" size="sm" onClick={handleAddKeyword} disabled={keywords.length >= 3}>
                      추가
                    </Button>
                  </div>
                  {keywords.length > 0 && (
                    <div className="flex gap-1.5 flex-wrap mt-2">
                      {keywords.map((kw, i) => (
                        <Badge key={i} variant="secondary" className="cursor-pointer" onClick={() => handleRemoveKeyword(i)}>
                          {kw} ✕
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <p className="text-xs text-muted-foreground pt-1">
                  더 자세한 설정은 <Link to="/app/setup" className="text-primary underline">솔루션</Link>에서 가능합니다
                </p>
              </div>
            </Card>

            {/* Generate Button */}
            <Button
              className="w-full h-12 text-base"
              size="lg"
              onClick={handleGenerate}
              disabled={loading || !storeInfo.name || !reviewText}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  콘텐츠 생성 중...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  콘텐츠 생성하기
                </>
              )}
            </Button>
          </div>

          {/* Right: Result Section */}
          <div className="space-y-5">
            {/* Result Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold">생성 결과</h2>
              {generated && currentResult && (
                <Badge variant="outline" className="gap-1.5 text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  생성 완료
                </Badge>
              )}
            </div>

            {loading ? (
              /* Loading State */
              <Card className="p-6">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-3/4" />
                  </div>
                  <div className="space-y-3">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                  <div className="space-y-3">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                </div>
                <p className="text-center text-sm text-muted-foreground mt-6">
                  AI가 리뷰를 분석하고 콘텐츠를 생성하고 있습니다...
                </p>
              </Card>
            ) : generated && currentResult ? (
              /* Generated State - Package Cards */
              <div className="space-y-4">
                {/* Reason Badge */}
                <Card className="p-3 bg-primary/5 border-primary/20">
                  <p className="text-sm">
                    <span className="font-medium">📊 리뷰에서 추출한 키워드:</span>{" "}
                    {currentResult.keywords.map((kw, i) => (
                      <Badge key={i} variant="secondary" className="mx-0.5 text-xs">{kw}</Badge>
                    ))}
                  </p>
                </Card>

                {/* Blog Card */}
                <Card className={`p-4 transition-all ${expandedResult === "blog" ? "ring-2 ring-primary" : ""}`}>
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setExpandedResult(expandedResult === "blog" ? null : "blog")}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">블로그</h3>
                        <p className="text-xs text-muted-foreground">제목 3개 + 목차 + 본문</p>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${expandedResult === "blog" ? "rotate-180" : ""}`} />
                  </div>
                  {expandedResult === "blog" && (
                    <div className="mt-4 pt-4 border-t space-y-4">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-2">추천 제목</p>
                        <ul className="space-y-1.5">
                          {currentResult.blog.titles.map((title, i) => (
                            <li key={i} className="text-sm p-2.5 bg-muted rounded-lg">{i + 1}. {title}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-2">목차</p>
                        <ol className="list-decimal list-inside text-sm space-y-1 text-muted-foreground">
                          {currentResult.blog.toc.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ol>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-2">본문 미리보기</p>
                        <p className="text-sm text-muted-foreground p-3 bg-muted rounded-lg">
                          {currentResult.blog.content}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-2">FAQ</p>
                        <div className="space-y-2 text-sm">
                          {currentResult.blog.faq.map((item, i) => (
                            <div key={i} className="p-2.5 bg-muted rounded-lg">
                              <p className="font-medium">Q. {item.q}</p>
                              <p className="text-muted-foreground">A. {item.a}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </Card>

                {/* Shorts Card */}
                <Card className={`p-4 transition-all ${expandedResult === "shorts" ? "ring-2 ring-primary" : ""}`}>
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setExpandedResult(expandedResult === "shorts" ? null : "shorts")}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                        <Video className="w-4 h-4 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">쇼츠 대본</h3>
                        <p className="text-xs text-muted-foreground">60초 대본 + 장면 가이드</p>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${expandedResult === "shorts" ? "rotate-180" : ""}`} />
                  </div>
                  {expandedResult === "shorts" && (
                    <div className="mt-4 pt-4 border-t space-y-4">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-2">훅 (Hook)</p>
                        <p className="text-sm font-medium p-2.5 bg-muted rounded-lg">"{currentResult.shorts.hook}"</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-2">장면 구성</p>
                        <div className="space-y-1.5">
                          {currentResult.shorts.scenes.map((scene, i) => (
                            <div key={i} className="text-sm p-2.5 bg-muted rounded-lg flex gap-2">
                              <span className="font-medium text-primary shrink-0">[{scene.time}]</span>
                              <span className="text-muted-foreground">{scene.desc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-2">썸네일 문구</p>
                        <div className="flex flex-wrap gap-1.5">
                          {currentResult.shorts.thumbnails.map((th, i) => (
                            <Badge key={i} variant="secondary">{th}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </Card>

                {/* SNS Card */}
                <Card className={`p-4 transition-all ${expandedResult === "sns" ? "ring-2 ring-primary" : ""}`}>
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setExpandedResult(expandedResult === "sns" ? null : "sns")}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                        <Share2 className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">SNS 캡션</h3>
                        <p className="text-xs text-muted-foreground">캡션 2종 + 해시태그</p>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${expandedResult === "sns" ? "rotate-180" : ""}`} />
                  </div>
                  {expandedResult === "sns" && (
                    <div className="mt-4 pt-4 border-t space-y-4">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-2">캡션</p>
                        <div className="space-y-2">
                          {currentResult.sns.captions.map((cap, i) => (
                            <div key={i} className="text-sm p-2.5 bg-muted rounded-lg">
                              <p className="text-xs text-muted-foreground mb-1">{cap.tone}</p>
                              <p>{cap.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-2">해시태그</p>
                        <p className="text-sm text-muted-foreground p-2.5 bg-muted rounded-lg">
                          {currentResult.sns.hashtags}
                        </p>
                      </div>
                    </div>
                  )}
                </Card>

                {/* Action Buttons */}
                <Card className="p-4">
                  <p className="text-xs font-medium text-muted-foreground mb-3">원클릭 복사</p>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm" className="text-xs" onClick={() => handleCopy("blog")}>
                      <Copy className="w-3.5 h-3.5 mr-1.5" />
                      블로그
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs" onClick={() => handleCopy("shorts")}>
                      <Copy className="w-3.5 h-3.5 mr-1.5" />
                      쇼츠 대본
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs" onClick={() => handleCopy("sns")}>
                      <Copy className="w-3.5 h-3.5 mr-1.5" />
                      SNS 캡션
                    </Button>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button variant="ghost" size="sm" className="flex-1 text-xs text-muted-foreground">
                      <Download className="w-3.5 h-3.5 mr-1.5" />
                      다운로드
                    </Button>
                  </div>
                </Card>
              </div>
            ) : (
              /* Empty State - Sample Preview */
              <Card className="p-5">
                <p className="text-sm text-muted-foreground mb-4 text-center">
                  생성 결과는 여기에서 즉시 확인됩니다
                </p>
                
                <div className="space-y-4">
                  {/* Blog Preview */}
                  <div className="p-4 bg-muted/50 rounded-xl border border-dashed">
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">블로그 예시</span>
                    </div>
                    <div className="space-y-1.5 text-xs text-muted-foreground">
                      {samplePreview.blog.titles.map((t, i) => (
                        <p key={i} className="p-2 bg-background rounded">• {t}</p>
                      ))}
                    </div>
                  </div>

                  {/* Shorts Preview */}
                  <div className="p-4 bg-muted/50 rounded-xl border border-dashed">
                    <div className="flex items-center gap-2 mb-3">
                      <Video className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium">쇼츠 대본 예시</span>
                    </div>
                    <div className="space-y-1.5 text-xs text-muted-foreground">
                      {samplePreview.shorts.scenes.map((s, i) => (
                        <p key={i} className="p-2 bg-background rounded">{s}</p>
                      ))}
                    </div>
                  </div>

                  {/* SNS Preview */}
                  <div className="p-4 bg-muted/50 rounded-xl border border-dashed">
                    <div className="flex items-center gap-2 mb-3">
                      <Share2 className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium">SNS 캡션 예시</span>
                    </div>
                    <div className="space-y-1.5 text-xs text-muted-foreground">
                      {samplePreview.sns.captions.map((c, i) => (
                        <p key={i} className="p-2 bg-background rounded">{c}</p>
                      ))}
                      <p className="p-2 bg-background rounded">{samplePreview.sns.hashtags}</p>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Conversion Section */}
        {generated && (
          <Card className="mt-8 p-6 lg:p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <div className="grid lg:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-xl font-bold mb-2">마음에 드셨나요?</h3>
                <p className="text-muted-foreground text-sm">
                  솔루션에서는 <span className="font-medium text-foreground">이미지 선택, 채널 예약, 성과분석</span>까지 지원합니다.
                </p>
              </div>
              <div className="space-y-3">
                {/* Email Lead */}
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="이메일로 결과 받기"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                {/* CTA Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <Button size="lg" className="w-full" asChild>
                    <Link to="/app/setup">
                      <Store className="w-4 h-4 mr-2" />
                      내 가게로 시작
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="w-full" asChild>
                    <Link to="/contact">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      도입문의
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}
