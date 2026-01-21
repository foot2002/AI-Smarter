import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  FileText,
  Video,
  Share2,
  Sparkles,
  Loader2,
  Copy,
  Check,
  RefreshCw,
  MoreHorizontal,
  Calendar,
  Download,
  Trash2,
  Eye,
  Filter,
  Search,
  Plus,
  X,
  Image as ImageIcon,
  Upload,
  Star,
  Lightbulb,
  Settings2,
  ChevronRight,
  Save,
  Send,
  ExternalLink,
  SmilePlus,
  Laugh,
  Meh,
  Frown,
  AlertCircle,
} from "lucide-react";
import {
  sampleContents,
  sampleFeedbacks,
  sampleStores,
  sampleMediaItems,
  statusLabels,
  toneOptions,
  ctaOptions,
  mediaCategoryLabels,
  type MediaItem,
  type Feedback,
} from "@/data/sampleData";
import { cn } from "@/lib/utils";

// Extended sample feedbacks for content page (20개)
const extendedFeedbacks: Feedback[] = [
  ...sampleFeedbacks.slice(0, 10),
  { id: 'fb-21', storeId: 'store-1', type: 'review', content: '아이스 아메리카노가 정말 시원하고 깔끔해요. 에티오피아 원두 특유의 산미가 좋았어요.', sentiment: 'positive', rating: 5, source: '네이버', createdAt: '2024-03-11', keywords: ['아메리카노', '원두'] },
  { id: 'fb-22', storeId: 'store-1', type: 'survey', content: '좌석 간격이 조금 넓었으면 좋겠어요. 옆 테이블과 가까워서 대화하기가 조심스러웠어요.', sentiment: 'neutral', createdAt: '2024-03-12', keywords: ['좌석', '간격'] },
  { id: 'fb-23', storeId: 'store-1', type: 'review', content: '노트북 작업하기 딱 좋아요. 콘센트도 있고 와이파이도 빠르고 커피도 맛있어요!', sentiment: 'positive', rating: 5, source: '인스타그램', createdAt: '2024-03-13', keywords: ['노트북', '작업', '와이파이'] },
  { id: 'fb-24', storeId: 'store-1', type: 'inquiry', content: '테라스 자리는 예약 가능한가요? 반려견과 함께 방문하고 싶어요.', sentiment: 'neutral', createdAt: '2024-03-14', keywords: ['테라스', '반려견', '예약'] },
  { id: 'fb-25', storeId: 'store-1', type: 'review', content: '케이크가 너무 달아요. 단맛을 조금 줄여주시면 더 좋을 것 같아요.', sentiment: 'negative', rating: 2, source: '카카오맵', createdAt: '2024-03-15', keywords: ['케이크', '단맛'] },
  { id: 'fb-26', storeId: 'store-1', type: 'review', content: '2층 창가석에서 연남동 골목을 보면서 커피 마시니까 힐링 그 자체예요 ☕', sentiment: 'positive', rating: 5, source: '네이버', createdAt: '2024-03-16', keywords: ['창가석', '힐링'] },
  { id: 'fb-27', storeId: 'store-1', type: 'survey', content: '새로운 메뉴가 나오면 알림 서비스가 있으면 좋겠어요.', sentiment: 'neutral', createdAt: '2024-03-17', keywords: ['신메뉴', '알림'] },
  { id: 'fb-28', storeId: 'store-1', type: 'review', content: '점심시간에 방문했는데 사람이 너무 많아서 자리를 못 잡았어요.', sentiment: 'negative', rating: 2, source: '구글', createdAt: '2024-03-18', keywords: ['점심', '혼잡'] },
  { id: 'fb-29', storeId: 'store-1', type: 'review', content: '브런치 메뉴가 있으면 더 좋을 것 같아요. 디저트만 있어서 아쉬웠어요.', sentiment: 'neutral', rating: 3, source: '네이버', createdAt: '2024-03-19', keywords: ['브런치', '메뉴'] },
  { id: 'fb-30', storeId: 'store-1', type: 'review', content: '인스타에서 보고 왔는데 실제로 보니까 더 예쁘네요! 인생샷 건졌어요 📸', sentiment: 'positive', rating: 5, source: '인스타그램', createdAt: '2024-03-20', keywords: ['인생샷', '인테리어'] },
];

// Extended sample media items (10장)
const extendedMediaItems: MediaItem[] = [
  ...sampleMediaItems,
  { id: 'media-10', storeId: 'store-1', category: 'product', url: '/placeholder.svg', tags: ['브런치', '플레이트', '신메뉴'], description: '주말 브런치 플레이트', uploadedAt: '2024-03-10' },
];

// Direct input templates
const directInputTemplates = [
  { id: 'event', label: '이벤트 공지', content: '🎉 특별 이벤트 안내\n\n기간: 2024년 3월 15일 ~ 31일\n내용: 시그니처 음료 주문 시 디저트 20% 할인!\n\n이번 봄, 따뜻한 오후 카페에서 특별한 혜택을 누려보세요.' },
  { id: 'newmenu', label: '신메뉴 소개', content: '✨ 신메뉴 출시!\n\n봄을 맞아 새로운 메뉴를 준비했어요.\n\n• 딸기 라떼 - 6,500원\n• 벚꽃 마카롱 - 3,500원\n\n지금 바로 맛보러 오세요!' },
  { id: 'promo', label: '오늘의 프로모션', content: '☕ 오늘의 특가!\n\n오전 10시~12시 사이 방문 고객님께\n아메리카노 50% 할인 혜택 드려요.\n\n얼리버드 타임을 놓치지 마세요!' },
  { id: 'hours', label: '운영시간 안내', content: '📅 운영시간 변경 안내\n\n3월 15일(금)은 내부 행사로 인해\n오후 3시에 조기 마감합니다.\n\n다음 날부터 정상 영업하오니\n양해 부탁드립니다. 감사합니다.' },
];

// Sample generated content for preview
const sampleGeneratedContent = {
  blog: {
    titleOptions: [
      '연남동 데이트 카페 추천 | 시그니처 라떼가 맛있는 따뜻한 오후 카페',
      '2층 창가석이 예쁜 연남동 카페 후기 | 따뜻한 오후 카페',
      '연남동 숨은 카페 발견! 분위기 좋은 따뜻한 오후 카페 리뷰',
    ],
    toc: ['첫인상과 분위기', '시그니처 메뉴 후기', '좌석과 편의시설', '방문 팁과 추천 시간대', 'FAQ'],
    intro: '연남동에서 분위기 좋은 카페를 찾고 계신가요? 오늘은 2층 창가석에서 연남동 골목을 내려다보며 여유로운 시간을 보낼 수 있는 "따뜻한 오후 카페"를 소개해드릴게요.\n\n이곳은 아늑한 분위기와 직접 로스팅한 원두로 내린 커피가 유명한데요, 특히 시그니처 라떼는 달콤한 캐러멜과 고소한 우유의 조화가 일품이에요.',
    faq: [
      { q: '주차 가능한가요?', a: '근처 유료 주차장 이용 가능합니다. (도보 2분)' },
      { q: '예약이 필요한가요?', a: '평일은 예약 없이 방문 가능하며, 주말은 대기가 있을 수 있어요.' },
    ],
  },
  shorts: {
    scenes: [
      { time: '0-5초', type: 'hook', content: '연남동에서 가장 아늑한 카페를 찾았습니다 ☕', broll: '카페 외관 전경, 간판 클로즈업' },
      { time: '5-20초', type: 'intro', content: '2층 창가석에서 바라보는 연남동 골목, 이 뷰 진짜 힐링이에요', broll: '창가석 뷰, 골목 풍경, 고객 리액션' },
      { time: '20-40초', type: 'highlight', content: '시그니처 라떼는 캐러멜과 우유의 조화가 완벽하고, 수제 당근케이크는 매일 아침 직접 굽는대요', broll: '라떼 제조 과정, 당근케이크 클로즈업, 시음 장면' },
      { time: '40-55초', type: 'detail', content: '무료 와이파이에 콘센트까지 완비! 노트북 작업하기에도 딱이에요', broll: '노트북 작업 장면, 콘센트, 편의시설' },
      { time: '55-60초', type: 'cta', content: '연남동 데이트, 여기 어때요? 예약 링크는 프로필에서!', broll: '카페 로고, 위치 자막, CTA 텍스트' },
    ],
    subtitles: '모든 장면에 자막 포함 (한글 기본, 키워드 강조 처리)',
    narration: '편안하고 친근한 톤으로 내레이션, TTS 또는 직접 녹음 가능',
  },
  sns: {
    captions: [
      {
        channel: '인스타그램',
        text: '☕ 연남동에서 찾은 아늑한 공간\n\n2층 창가석에서 바라보는 골목 풍경,\n시그니처 라떼 한 잔의 여유로움.\n\n이런 곳이 있다는 게 감사해요 ✨\n\n📍 따뜻한 오후 카페\n🕐 매일 10:00 - 22:00',
        hashtags: '#연남동카페 #연남동데이트 #시그니처라떼 #창가석카페 #서울카페추천 #카페스타그램 #coffeelovers #cafehopping',
      },
      {
        channel: '인스타그램',
        text: '요즘 인생 카페 발견 🏠\n\n아늑한 분위기에 커피도 맛있고\n디저트도 직접 만든다니까 더 특별해요!\n\n다음엔 당근케이크 꼭 먹어볼 거예요 🥕\n\n📍 따뜻한 오후 카페',
        hashtags: '#연남동 #카페투어 #수제디저트 #당근케이크 #연남동맛집 #주말데이트',
      },
      {
        channel: '인스타그램',
        text: '연남동 카페 추천받고 왔는데\n진짜 분위기 맛집이야 ☕✨\n\n2층 창가석 예약 필수!\n\n#연남동카페추천 #카페추천 #연남카페',
        hashtags: '',
      },
    ],
  },
};

export default function Content() {
  const { storeId } = useParams();
  const store = sampleStores.find((s) => s.id === storeId) || sampleStores[0];
  const storeContents = sampleContents.filter((c) => c.storeId === storeId || c.storeId === 'store-1');
  const storeFeedbacks = extendedFeedbacks.filter((f) => f.storeId === storeId || f.storeId === 'store-1');
  const storeMedia = extendedMediaItems.filter((m) => m.storeId === storeId || m.storeId === 'store-1');

  // Main tabs
  const [activeTab, setActiveTab] = useState("create");
  
  // Content type
  const [contentType, setContentType] = useState<"blog" | "shorts" | "sns">("blog");
  
  // Source tabs
  const [sourceTab, setSourceTab] = useState<"feedback" | "direct">("feedback");
  
  // Feedback selection
  const [selectedFeedbacks, setSelectedFeedbacks] = useState<string[]>([]);
  const [feedbackSearch, setFeedbackSearch] = useState("");
  const [feedbackFilter, setFeedbackFilter] = useState({ type: "all", sentiment: "all", source: "all" });
  
  // Direct input
  const [directTitle, setDirectTitle] = useState("");
  const [directContent, setDirectContent] = useState("");
  const [mixWithFeedback, setMixWithFeedback] = useState(false);
  
  // Image selection
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [mediaCategory, setMediaCategory] = useState<string>("all");
  const [mediaSearch, setMediaSearch] = useState("");
  
  // Common options
  const [tone, setTone] = useState("friendly");
  const [length, setLength] = useState("standard");
  const [cta, setCta] = useState("reservation");
  
  // Type-specific options
  // Shorts
  const [shortsLength, setShortsLength] = useState("60");
  const [shortsSubtitle, setShortsSubtitle] = useState("standard");
  const [shortsVoice, setShortsVoice] = useState(true);
  const [shortsCuts, setShortsCuts] = useState("5");
  const [shortsTone, setShortsTone] = useState("narration");
  
  // Blog
  const [blogPurpose, setBlogPurpose] = useState("review");
  const [blogKeywords, setBlogKeywords] = useState<string[]>(["연남동카페", "시그니처라떼"]);
  const [blogFaq, setBlogFaq] = useState(true);
  const [blogLength, setBlogLength] = useState("1200");
  const [blogStructure, setBlogStructure] = useState("standard");
  const [newBlogKeyword, setNewBlogKeyword] = useState("");
  
  // SNS
  const [snsChannel, setSnsChannel] = useState("instagram");
  const [snsCaptionCount, setSnsCaptionCount] = useState("3");
  const [snsHashtag, setSnsHashtag] = useState("standard");
  const [snsEmoji, setSnsEmoji] = useState(true);
  
  // Advanced
  const [showPrompt, setShowPrompt] = useState(false);
  
  // Generation state
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  
  // Preview tabs (shorts)
  const [shortsPreviewTab, setShortsPreviewTab] = useState("script");
  
  // List filters
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");

  // Filtered feedbacks
  const filteredFeedbacks = useMemo(() => {
    return storeFeedbacks.filter((f) => {
      const matchesSearch = feedbackSearch === "" || f.content.toLowerCase().includes(feedbackSearch.toLowerCase());
      const matchesType = feedbackFilter.type === "all" || f.type === feedbackFilter.type;
      const matchesSentiment = feedbackFilter.sentiment === "all" || f.sentiment === feedbackFilter.sentiment;
      const matchesSource = feedbackFilter.source === "all" || f.source === feedbackFilter.source;
      return matchesSearch && matchesType && matchesSentiment && matchesSource;
    });
  }, [storeFeedbacks, feedbackSearch, feedbackFilter]);

  // Filtered media
  const filteredMedia = useMemo(() => {
    return storeMedia.filter((m) => {
      const matchesCategory = mediaCategory === "all" || m.category === mediaCategory;
      const matchesSearch = mediaSearch === "" || m.tags.some(t => t.includes(mediaSearch)) || m.description?.includes(mediaSearch);
      return matchesCategory && matchesSearch;
    });
  }, [storeMedia, mediaCategory, mediaSearch]);

  // Check if can generate
  const canGenerate = useMemo(() => {
    const hasFeedback = selectedFeedbacks.length > 0;
    const hasDirect = directContent.trim().length > 0;
    return hasFeedback || hasDirect;
  }, [selectedFeedbacks, directContent]);

  // Source summary
  const sourceSummary = useMemo(() => {
    const parts = [];
    if (selectedFeedbacks.length > 0) parts.push(`피드백 ${selectedFeedbacks.length}건`);
    if (directContent.trim()) parts.push("직접 입력 1건");
    return parts.length > 0 ? parts.join(" + ") + " 포함" : "소재 없음";
  }, [selectedFeedbacks, directContent]);

  // Handlers
  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 2500);
  };

  const toggleFeedback = (id: string) => {
    setSelectedFeedbacks((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const toggleImage = (id: string) => {
    setSelectedImages((prev) => {
      if (prev.includes(id)) {
        if (featuredImage === id) setFeaturedImage(null);
        return prev.filter((i) => i !== id);
      }
      return [...prev, id];
    });
  };

  const handleRecommendSelect = () => {
    const recommended = contentType === "blog" ? 5 : contentType === "shorts" ? 2 : 1;
    const positives = storeFeedbacks.filter(f => f.sentiment === "positive").slice(0, recommended);
    setSelectedFeedbacks(positives.map(f => f.id));
  };

  const handleInsightImport = () => {
    // Simulate importing from insights
    const recent = storeFeedbacks.slice(0, 5);
    setSelectedFeedbacks(recent.map(f => f.id));
  };

  const applyTemplate = (template: typeof directInputTemplates[0]) => {
    setDirectContent(template.content);
  };

  const addBlogKeyword = () => {
    if (newBlogKeyword && !blogKeywords.includes(newBlogKeyword)) {
      setBlogKeywords([...blogKeywords, newBlogKeyword]);
      setNewBlogKeyword("");
    }
  };

  const removeBlogKeyword = (keyword: string) => {
    setBlogKeywords(blogKeywords.filter(k => k !== keyword));
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive": return <SmilePlus className="w-4 h-4 text-green-500" />;
      case "negative": return <Frown className="w-4 h-4 text-red-500" />;
      default: return <Meh className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "review": return "리뷰";
      case "survey": return "설문";
      case "inquiry": return "문의";
      default: return type;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "blog": return <FileText className="w-4 h-4" />;
      case "shorts": return <Video className="w-4 h-4" />;
      case "sns": return <Share2 className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const filteredContents = storeContents.filter((c) => {
    const matchesStatus = filterStatus === "all" || c.status === filterStatus;
    const matchesType = filterType === "all" || c.type === filterType;
    return matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Media Selection Modal */}
      <Dialog open={mediaModalOpen} onOpenChange={setMediaModalOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>미디어에서 선택</DialogTitle>
            <DialogDescription>
              설정 &gt; 미디어에 등록된 사진을 선택하세요. 권장 1~5장
            </DialogDescription>
          </DialogHeader>
          
          {/* Search & Filter */}
          <div className="flex gap-3 py-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={mediaSearch}
                onChange={(e) => setMediaSearch(e.target.value)}
                placeholder="태그로 검색..."
                className="pl-9"
              />
            </div>
            <Select value={mediaCategory} onValueChange={setMediaCategory}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 카테고리</SelectItem>
                <SelectItem value="store">가게/매장</SelectItem>
                <SelectItem value="product">제품/메뉴</SelectItem>
                <SelectItem value="atmosphere">분위기</SelectItem>
                <SelectItem value="unique">차별점</SelectItem>
                <SelectItem value="other">기타</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Media Grid */}
          <ScrollArea className="flex-1 -mx-6 px-6">
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3 pb-4">
              {filteredMedia.map((media) => (
                <div
                  key={media.id}
                  onClick={() => toggleImage(media.id)}
                  className={cn(
                    "aspect-square rounded-xl overflow-hidden cursor-pointer relative group border-2 transition-all",
                    selectedImages.includes(media.id) ? "border-primary ring-2 ring-primary/20" : "border-transparent hover:border-primary/50"
                  )}
                >
                  <img src={media.url} alt={media.description || ""} className="w-full h-full object-cover" />
                  {selectedImages.includes(media.id) && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex flex-wrap gap-1">
                      {media.tags.slice(0, 2).map((tag, i) => (
                        <Badge key={i} variant="secondary" className="text-[10px] py-0 px-1.5 bg-white/20 text-white border-0">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Selected Strip */}
          {selectedImages.length > 0 && (
            <div className="border-t pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">선택됨 {selectedImages.length}장</span>
                <Button variant="ghost" size="sm" onClick={() => setSelectedImages([])}>
                  전체 해제
                </Button>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {selectedImages.map((id) => {
                  const media = storeMedia.find(m => m.id === id);
                  if (!media) return null;
                  return (
                    <div key={id} className="relative shrink-0">
                      <img src={media.url} alt="" className="w-16 h-16 rounded-lg object-cover" />
                      {featuredImage === id && (
                        <Badge className="absolute -top-2 -left-2 text-[10px] py-0 px-1">대표</Badge>
                      )}
                      <button
                        onClick={(e) => { e.stopPropagation(); setFeaturedImage(id === featuredImage ? null : id); }}
                        className={cn(
                          "absolute bottom-1 right-1 p-1 rounded-full transition-colors",
                          featuredImage === id ? "bg-primary text-primary-foreground" : "bg-black/50 text-white hover:bg-primary"
                        )}
                      >
                        <Star className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setMediaModalOpen(false)}>취소</Button>
            <Button onClick={() => setMediaModalOpen(false)}>
              {selectedImages.length}장 선택 완료
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold mb-1">콘텐츠</h1>
        <p className="text-muted-foreground">
          AI로 블로그, 쇼츠, SNS 콘텐츠를 생성하고 관리하세요
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="create">생성하기</TabsTrigger>
          <TabsTrigger value="list">콘텐츠 목록 ({storeContents.length})</TabsTrigger>
        </TabsList>

        {/* Create Tab */}
        <TabsContent value="create" className="mt-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left - Input Panel */}
            <div className="space-y-5">
              {/* Block 1: Content Type */}
              <Card className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">1</div>
                  <h3 className="font-bold">콘텐츠 타입</h3>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { type: "blog", icon: FileText, label: "블로그", desc: "SEO 최적화 글" },
                    { type: "shorts", icon: Video, label: "쇼츠", desc: "60초 영상 대본" },
                    { type: "sns", icon: Share2, label: "SNS", desc: "캡션/해시태그" },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.type}
                        onClick={() => { setContentType(item.type as typeof contentType); setGenerated(false); }}
                        className={cn(
                          "p-4 rounded-xl border-2 transition-all text-left",
                          contentType === item.type
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <Icon className={cn(
                          "w-5 h-5 mb-2",
                          contentType === item.type ? "text-primary" : "text-muted-foreground"
                        )} />
                        <p className="font-medium text-sm">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </Card>

              {/* Block 2: Sources (Inputs) */}
              <Card className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">2</div>
                  <h3 className="font-bold">소재 (Inputs)</h3>
                </div>

                <Tabs value={sourceTab} onValueChange={(v) => setSourceTab(v as typeof sourceTab)}>
                  <TabsList className="w-full mb-4">
                    <TabsTrigger value="feedback" className="flex-1">피드백에서 선택</TabsTrigger>
                    <TabsTrigger value="direct" className="flex-1">직접 입력</TabsTrigger>
                  </TabsList>

                  {/* Feedback Tab */}
                  <TabsContent value="feedback" className="mt-0 space-y-3">
                    {/* Search & Actions */}
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          value={feedbackSearch}
                          onChange={(e) => setFeedbackSearch(e.target.value)}
                          placeholder="키워드 검색..."
                          className="pl-9 h-9"
                        />
                      </div>
                      <Button variant="outline" size="sm" onClick={handleRecommendSelect}>
                        <Lightbulb className="w-4 h-4 mr-1" />
                        추천
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleInsightImport}>
                        인사이트
                      </Button>
                    </div>

                    {/* Filters */}
                    <div className="flex gap-2 flex-wrap">
                      <Select value={feedbackFilter.type} onValueChange={(v) => setFeedbackFilter({...feedbackFilter, type: v})}>
                        <SelectTrigger className="w-24 h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">전체 유형</SelectItem>
                          <SelectItem value="review">리뷰</SelectItem>
                          <SelectItem value="survey">설문</SelectItem>
                          <SelectItem value="inquiry">문의</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={feedbackFilter.sentiment} onValueChange={(v) => setFeedbackFilter({...feedbackFilter, sentiment: v})}>
                        <SelectTrigger className="w-24 h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">전체 반응</SelectItem>
                          <SelectItem value="positive">긍정</SelectItem>
                          <SelectItem value="neutral">중립</SelectItem>
                          <SelectItem value="negative">부정</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={feedbackFilter.source} onValueChange={(v) => setFeedbackFilter({...feedbackFilter, source: v})}>
                        <SelectTrigger className="w-24 h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">전체 채널</SelectItem>
                          <SelectItem value="네이버">네이버</SelectItem>
                          <SelectItem value="카카오맵">카카오맵</SelectItem>
                          <SelectItem value="인스타그램">인스타그램</SelectItem>
                          <SelectItem value="구글">구글</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Selected Badge */}
                    {selectedFeedbacks.length > 0 && (
                      <div className="flex items-center justify-between p-2 bg-primary/5 rounded-lg">
                        <Badge variant="secondary">선택 {selectedFeedbacks.length}건</Badge>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedFeedbacks([])}>
                          <X className="w-3 h-3 mr-1" /> 전체 해제
                        </Button>
                      </div>
                    )}

                    {/* Feedback List */}
                    <ScrollArea className="h-48">
                      <div className="space-y-2 pr-3">
                        {filteredFeedbacks.map((feedback) => (
                          <div
                            key={feedback.id}
                            onClick={() => toggleFeedback(feedback.id)}
                            className={cn(
                              "p-3 rounded-lg cursor-pointer transition-all border",
                              selectedFeedbacks.includes(feedback.id)
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            )}
                          >
                            <div className="flex items-start gap-2">
                              {getSentimentIcon(feedback.sentiment)}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5 mb-1">
                                  <Badge variant="outline" className="text-[10px] py-0 px-1.5">{getTypeLabel(feedback.type)}</Badge>
                                  {feedback.source && <Badge variant="secondary" className="text-[10px] py-0 px-1.5">{feedback.source}</Badge>}
                                  {feedback.rating && (
                                    <span className="text-[10px] text-muted-foreground flex items-center">
                                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-0.5" />{feedback.rating}
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm line-clamp-2">{feedback.content}</p>
                                <p className="text-[10px] text-muted-foreground mt-1">{feedback.createdAt}</p>
                              </div>
                              {selectedFeedbacks.includes(feedback.id) && (
                                <Check className="w-4 h-4 text-primary shrink-0" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>

                    <p className="text-xs text-muted-foreground">
                      {contentType === "blog" ? "블로그: 3~7개 권장" : contentType === "shorts" ? "쇼츠: 1~3개 권장" : "SNS: 1~2개 권장"}
                    </p>
                  </TabsContent>

                  {/* Direct Input Tab */}
                  <TabsContent value="direct" className="mt-0 space-y-3">
                    <div className="space-y-2">
                      <Label className="text-xs">제목/주제 (선택)</Label>
                      <Input
                        value={directTitle}
                        onChange={(e) => setDirectTitle(e.target.value)}
                        placeholder="예: 봄맞이 신메뉴 출시 안내"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">본문 텍스트 (필수)</Label>
                      <Textarea
                        value={directContent}
                        onChange={(e) => setDirectContent(e.target.value)}
                        placeholder="콘텐츠에 포함할 내용을 입력하세요..."
                        className="min-h-[120px]"
                      />
                    </div>

                    {/* Quick Templates */}
                    <div className="space-y-2">
                      <Label className="text-xs">빠른 템플릿</Label>
                      <div className="flex gap-2 flex-wrap">
                        {directInputTemplates.map((t) => (
                          <Button
                            key={t.id}
                            variant="outline"
                            size="sm"
                            onClick={() => applyTemplate(t)}
                          >
                            {t.label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Mix Toggle */}
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <Label className="text-sm">피드백과 함께 섞어서 사용</Label>
                        <p className="text-xs text-muted-foreground">ON 시 피드백 탭에서 선택한 내용도 함께 포함</p>
                      </div>
                      <Switch checked={mixWithFeedback} onCheckedChange={setMixWithFeedback} />
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Source Summary */}
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">AI에 전달될 소재:</p>
                  <p className="text-sm font-medium">{sourceSummary}</p>
                </div>
              </Card>

              {/* Block 3: Images */}
              <Card className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">3</div>
                  <h3 className="font-bold">이미지</h3>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  설정 &gt; 미디어에 등록한 사진을 선택해 콘텐츠에 활용할 수 있어요.
                </p>

                <div className="flex gap-2 mb-4">
                  <Button variant="outline" size="sm" onClick={() => setMediaModalOpen(true)}>
                    <ImageIcon className="w-4 h-4 mr-2" />
                    미디어에서 선택
                  </Button>
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    사진 1장 업로드
                  </Button>
                </div>

                {/* Selected Images Summary */}
                {selectedImages.length > 0 ? (
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="flex -space-x-2">
                      {selectedImages.slice(0, 4).map((id) => {
                        const media = storeMedia.find(m => m.id === id);
                        return media ? (
                          <img key={id} src={media.url} alt="" className="w-10 h-10 rounded-lg object-cover border-2 border-background" />
                        ) : null;
                      })}
                      {selectedImages.length > 4 && (
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-xs font-medium border-2 border-background">
                          +{selectedImages.length - 4}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">선택 이미지 {selectedImages.length}장</p>
                      {featuredImage && <p className="text-xs text-muted-foreground">대표 1장 지정됨</p>}
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setMediaModalOpen(true)}>
                      변경
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground bg-muted/30 rounded-lg">
                    <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">선택된 이미지 없음</p>
                    <p className="text-xs">권장 1~5장</p>
                  </div>
                )}
              </Card>

              {/* Block 4: Options */}
              <Card className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">4</div>
                  <h3 className="font-bold">옵션</h3>
                </div>

                {/* Common Options */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs">톤</Label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger className="h-9">
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
                    <Label className="text-xs">길이</Label>
                    <Select value={length} onValueChange={setLength}>
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">짧게</SelectItem>
                        <SelectItem value="standard">표준</SelectItem>
                        <SelectItem value="long">길게</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">CTA</Label>
                    <Select value={cta} onValueChange={setCta}>
                      <SelectTrigger className="h-9">
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

                {/* Blocked Words Preview */}
                <div className="p-3 bg-muted/50 rounded-lg mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <Label className="text-xs text-muted-foreground">금지어/주의표현</Label>
                    <Link to={`/app/${storeId}/settings`} className="text-xs text-primary hover:underline flex items-center">
                      설정에서 변경 <ExternalLink className="w-3 h-3 ml-1" />
                    </Link>
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {store.blockedWords.map((w, i) => (
                      <Badge key={i} variant="outline" className="text-xs">{w}</Badge>
                    ))}
                  </div>
                </div>

                {/* Type-specific Options */}
                <Accordion type="single" collapsible defaultValue="type-options">
                  <AccordionItem value="type-options" className="border rounded-lg px-3">
                    <AccordionTrigger className="hover:no-underline py-3">
                      <div className="flex items-center gap-2">
                        <Settings2 className="w-4 h-4" />
                        <span className="font-medium text-sm">
                          {contentType === "blog" ? "블로그 옵션" : contentType === "shorts" ? "쇼츠 옵션" : "SNS 옵션"}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                      {/* Shorts Options */}
                      {contentType === "shorts" && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1.5">
                              <Label className="text-xs">영상 길이</Label>
                              <Select value={shortsLength} onValueChange={setShortsLength}>
                                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="30">30초</SelectItem>
                                  <SelectItem value="45">45초</SelectItem>
                                  <SelectItem value="60">60초</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-1.5">
                              <Label className="text-xs">컷 구성</Label>
                              <Select value={shortsCuts} onValueChange={setShortsCuts}>
                                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="5">5컷</SelectItem>
                                  <SelectItem value="7">7컷</SelectItem>
                                  <SelectItem value="9">9컷</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-1.5">
                              <Label className="text-xs">자막</Label>
                              <Select value={shortsSubtitle} onValueChange={setShortsSubtitle}>
                                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="none">없음</SelectItem>
                                  <SelectItem value="standard">표준</SelectItem>
                                  <SelectItem value="highlight">강조</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-1.5">
                              <Label className="text-xs">진행 톤</Label>
                              <Select value={shortsTone} onValueChange={setShortsTone}>
                                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="narration">내레이션 중심</SelectItem>
                                  <SelectItem value="dialog">대화형</SelectItem>
                                  <SelectItem value="info">정보형</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
                            <div>
                              <Label className="text-sm">음성 (TTS)</Label>
                              <p className="text-xs text-muted-foreground">자동 음성 생성 (Coming soon)</p>
                            </div>
                            <Switch checked={shortsVoice} onCheckedChange={setShortsVoice} />
                          </div>
                        </div>
                      )}

                      {/* Blog Options */}
                      {contentType === "blog" && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1.5">
                              <Label className="text-xs">글 목적</Label>
                              <Select value={blogPurpose} onValueChange={setBlogPurpose}>
                                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="info">정보형</SelectItem>
                                  <SelectItem value="review">후기형</SelectItem>
                                  <SelectItem value="event">이벤트 공지형</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-1.5">
                              <Label className="text-xs">분량</Label>
                              <Select value={blogLength} onValueChange={setBlogLength}>
                                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="800">800자</SelectItem>
                                  <SelectItem value="1200">1200자</SelectItem>
                                  <SelectItem value="2000">2000자</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-1.5">
                              <Label className="text-xs">구조</Label>
                              <Select value={blogStructure} onValueChange={setBlogStructure}>
                                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="minimal">소제목 적게</SelectItem>
                                  <SelectItem value="standard">표준</SelectItem>
                                  <SelectItem value="detailed">소제목 많게</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-xs">SEO 키워드</Label>
                            <div className="flex flex-wrap gap-1.5 mb-2">
                              {blogKeywords.map((k, i) => (
                                <Badge key={i} variant="secondary" className="py-1 px-2">
                                  {k}
                                  <button onClick={() => removeBlogKeyword(k)} className="ml-1.5 hover:text-destructive">
                                    <X className="w-3 h-3" />
                                  </button>
                                </Badge>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <Input
                                value={newBlogKeyword}
                                onChange={(e) => setNewBlogKeyword(e.target.value)}
                                placeholder="키워드 추가"
                                className="h-8"
                                onKeyPress={(e) => e.key === "Enter" && addBlogKeyword()}
                              />
                              <Button variant="outline" size="sm" onClick={addBlogKeyword}>추가</Button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
                            <Label className="text-sm">FAQ 섹션 포함</Label>
                            <Switch checked={blogFaq} onCheckedChange={setBlogFaq} />
                          </div>
                        </div>
                      )}

                      {/* SNS Options */}
                      {contentType === "sns" && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1.5">
                              <Label className="text-xs">채널</Label>
                              <Select value={snsChannel} onValueChange={setSnsChannel}>
                                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="instagram">인스타그램</SelectItem>
                                  <SelectItem value="naver">네이버플레이스</SelectItem>
                                  <SelectItem value="threads">쓰레드</SelectItem>
                                  <SelectItem value="other">기타</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-1.5">
                              <Label className="text-xs">캡션 개수</Label>
                              <Select value={snsCaptionCount} onValueChange={setSnsCaptionCount}>
                                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="3">3개</SelectItem>
                                  <SelectItem value="5">5개</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-1.5">
                              <Label className="text-xs">해시태그</Label>
                              <Select value={snsHashtag} onValueChange={setSnsHashtag}>
                                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="minimal">최소 (5개)</SelectItem>
                                  <SelectItem value="standard">표준 (10개)</SelectItem>
                                  <SelectItem value="heavy">많이 (20개+)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
                            <Label className="text-sm">이모지 사용</Label>
                            <Switch checked={snsEmoji} onCheckedChange={setSnsEmoji} />
                          </div>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Advanced Section */}
                <Accordion type="single" collapsible className="mt-3">
                  <AccordionItem value="advanced" className="border rounded-lg px-3">
                    <AccordionTrigger className="hover:no-underline py-3">
                      <span className="font-medium text-sm text-muted-foreground">고급 설정</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 space-y-4">
                      {/* AI Input Summary */}
                      <div className="p-3 bg-muted rounded-lg space-y-2">
                        <Label className="text-xs font-medium">AI에 전달되는 입력 요약</Label>
                        <div className="text-xs space-y-1">
                          <p>• 가게: {store.name} ({store.industry}) - 톤: {toneOptions.find(t => t.value === store.tone)?.label}</p>
                          <p>• 소재: {sourceSummary}</p>
                          <p>• 이미지: {selectedImages.length > 0 ? `${selectedImages.length}장 선택${featuredImage ? " (대표 1장)" : ""}` : "없음"}</p>
                          <p>• 타입: {contentType === "blog" ? "블로그" : contentType === "shorts" ? "쇼츠" : "SNS"} / 길이: {length === "short" ? "짧게" : length === "long" ? "길게" : "표준"}</p>
                        </div>
                      </div>

                      {/* Prompt Toggle */}
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <Label className="text-sm">프롬프트 보기 (읽기 전용)</Label>
                          <p className="text-xs text-muted-foreground">실제 프롬프트/모델 호출은 Cursor에서 연결됩니다</p>
                        </div>
                        <Switch checked={showPrompt} onCheckedChange={setShowPrompt} />
                      </div>

                      {showPrompt && (
                        <div className="p-3 bg-muted/50 rounded-lg font-mono text-xs whitespace-pre-wrap max-h-40 overflow-auto">
{`[System] You are a marketing content generator for "${store.name}".
[Store Info] Industry: ${store.industry}, Region: ${store.region}
[Tone] ${tone}, [CTA] ${cta}
[Content Type] ${contentType}
[Sources] ${sourceSummary}
[Images] ${selectedImages.length} selected
[Blocked Words] ${store.blockedWords.join(", ")}

Generate engaging ${contentType} content based on the provided materials...`}
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>

              {/* Generate Button */}
              <Button
                className="w-full h-12 text-base"
                size="lg"
                onClick={handleGenerate}
                disabled={generating || !canGenerate}
              >
                {generating ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    생성 중...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    콘텐츠 생성
                  </>
                )}
              </Button>
              {!canGenerate && (
                <p className="text-center text-sm text-destructive flex items-center justify-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  소재를 1개 이상 추가하세요
                </p>
              )}
            </div>

            {/* Right - Preview Panel */}
            <Card className="p-6 lg:sticky lg:top-6 lg:max-h-[calc(100vh-8rem)] lg:overflow-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">결과 프리뷰</h3>
                {generated && (
                  <Badge variant="secondary">
                    {contentType === "blog" ? "블로그" : contentType === "shorts" ? "쇼츠" : "SNS"}
                  </Badge>
                )}
              </div>

              {generating ? (
                <div className="space-y-4">
                  <div className="h-8 bg-muted rounded animate-pulse" />
                  <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
                  <div className="h-40 bg-muted rounded animate-pulse" />
                  <div className="flex gap-2">
                    <div className="h-10 bg-muted rounded animate-pulse flex-1" />
                    <div className="h-10 bg-muted rounded animate-pulse flex-1" />
                  </div>
                </div>
              ) : generated ? (
                <div className="space-y-4">
                  {/* Used Materials Badge */}
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">사용된 소재</p>
                    <div className="flex gap-1.5 flex-wrap">
                      <Badge variant="outline" className="text-xs">{sourceSummary}</Badge>
                      {selectedImages.length > 0 && <Badge variant="outline" className="text-xs">이미지 {selectedImages.length}장</Badge>}
                    </div>
                  </div>

                  {/* Blog Preview */}
                  {contentType === "blog" && (
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">제목 후보</p>
                        {sampleGeneratedContent.blog.titleOptions.map((title, i) => (
                          <div key={i} className={cn(
                            "p-2 rounded border mb-2 cursor-pointer hover:border-primary transition-colors",
                            i === 0 ? "border-primary bg-primary/5" : "border-border"
                          )}>
                            <p className="text-sm font-medium">{title}</p>
                          </div>
                        ))}
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">목차</p>
                        <ol className="list-decimal list-inside text-sm space-y-1 p-3 bg-muted rounded-lg">
                          {sampleGeneratedContent.blog.toc.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ol>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">본문 미리보기</p>
                        <div className="p-4 bg-muted rounded-lg text-sm whitespace-pre-wrap">
                          {sampleGeneratedContent.blog.intro}
                        </div>
                      </div>
                      {blogFaq && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-2">FAQ</p>
                          <div className="space-y-2">
                            {sampleGeneratedContent.blog.faq.map((faq, i) => (
                              <div key={i} className="p-3 bg-muted rounded-lg">
                                <p className="font-medium text-sm">Q. {faq.q}</p>
                                <p className="text-sm text-muted-foreground mt-1">A. {faq.a}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Shorts Preview */}
                  {contentType === "shorts" && (
                    <div className="space-y-4">
                      <Tabs value={shortsPreviewTab} onValueChange={setShortsPreviewTab}>
                        <TabsList className="w-full">
                          <TabsTrigger value="script" className="flex-1">대본</TabsTrigger>
                          <TabsTrigger value="subtitle" className="flex-1">자막</TabsTrigger>
                          <TabsTrigger value="broll" className="flex-1">장면 가이드</TabsTrigger>
                        </TabsList>
                        <TabsContent value="script" className="mt-3 space-y-2">
                          {sampleGeneratedContent.shorts.scenes.map((scene, i) => (
                            <div key={i} className="p-3 bg-muted rounded-lg">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className="text-[10px]">{scene.time}</Badge>
                                <Badge variant="secondary" className="text-[10px]">{scene.type}</Badge>
                              </div>
                              <p className="text-sm">{scene.content}</p>
                            </div>
                          ))}
                        </TabsContent>
                        <TabsContent value="subtitle" className="mt-3">
                          <div className="p-4 bg-muted rounded-lg text-sm">
                            <p className="font-medium mb-2">자막 설정</p>
                            <p>{sampleGeneratedContent.shorts.subtitles}</p>
                          </div>
                        </TabsContent>
                        <TabsContent value="broll" className="mt-3 space-y-2">
                          {sampleGeneratedContent.shorts.scenes.map((scene, i) => (
                            <div key={i} className="p-3 bg-muted rounded-lg">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className="text-[10px]">{scene.time}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{scene.broll}</p>
                            </div>
                          ))}
                        </TabsContent>
                      </Tabs>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground">내레이션</p>
                        <p className="text-sm">{sampleGeneratedContent.shorts.narration}</p>
                      </div>
                    </div>
                  )}

                  {/* SNS Preview */}
                  {contentType === "sns" && (
                    <div className="space-y-3">
                      {sampleGeneratedContent.sns.captions.map((caption, i) => (
                        <div key={i} className="p-4 bg-muted rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="text-xs">{caption.channel}</Badge>
                            <Badge variant="outline" className="text-xs">캡션 {i + 1}</Badge>
                          </div>
                          <p className="text-sm whitespace-pre-wrap mb-2">{caption.text}</p>
                          {caption.hashtags && (
                            <p className="text-sm text-primary">{caption.hashtags}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                    <Button variant="outline" size="sm">
                      <Copy className="w-4 h-4 mr-1" />
                      복사
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      다운로드
                    </Button>
                    <Button variant="outline" size="sm">
                      <Save className="w-4 h-4 mr-1" />
                      저장
                    </Button>
                    <Button variant="outline" size="sm">
                      <Send className="w-4 h-4 mr-1" />
                      승인요청
                    </Button>
                    <Button size="sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      예약
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="w-full" onClick={() => setGenerated(false)}>
                    <RefreshCw className="w-4 h-4 mr-1" />
                    재생성
                  </Button>
                </div>
              ) : (
                // Empty State with Sample Preview
                <div className="space-y-4">
                  <div className="text-center py-4 text-muted-foreground">
                    <Sparkles className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p className="font-medium">결과가 여기에 표시됩니다</p>
                    <p className="text-sm">소재를 선택하고 생성 버튼을 누르세요</p>
                  </div>
                  
                  {/* Sample Preview by Type */}
                  <div className="border-t pt-4">
                    <p className="text-xs text-muted-foreground mb-3">
                      📌 {contentType === "blog" ? "블로그" : contentType === "shorts" ? "쇼츠" : "SNS"} 결과 형태 예시
                    </p>
                    {contentType === "blog" && (
                      <div className="p-4 bg-muted/50 rounded-lg text-sm space-y-2 opacity-70">
                        <p className="font-bold text-base">연남동 데이트 카페 추천 | 시그니처 라떼</p>
                        <p className="text-xs text-muted-foreground">목차: 첫인상 / 메뉴 후기 / 방문 팁 / FAQ</p>
                        <p className="text-muted-foreground line-clamp-3">연남동에서 분위기 좋은 카페를 찾고 계신가요? 오늘은 2층 창가석에서...</p>
                      </div>
                    )}
                    {contentType === "shorts" && (
                      <div className="space-y-2 opacity-70">
                        <div className="p-3 bg-muted/50 rounded-lg text-sm">
                          <Badge variant="outline" className="text-[10px] mb-1">0-5초 Hook</Badge>
                          <p>연남동에서 꼭 가봐야 할 곳!</p>
                        </div>
                        <div className="p-3 bg-muted/50 rounded-lg text-sm">
                          <Badge variant="outline" className="text-[10px] mb-1">5-40초 본문</Badge>
                          <p>분위기 장면 + 메뉴 클로즈업</p>
                        </div>
                      </div>
                    )}
                    {contentType === "sns" && (
                      <div className="p-4 bg-muted/50 rounded-lg text-sm opacity-70">
                        <p className="mb-2">☕ 연남동에서 찾은 아늑한 공간...</p>
                        <p className="text-primary text-xs">#연남동카페 #시그니처라떼 #카페스타그램</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Card>
          </div>
        </TabsContent>

        {/* List Tab */}
        <TabsContent value="list" className="mt-6">
          <Card>
            {/* Filters */}
            <div className="p-4 border-b border-border flex gap-3">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="상태" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체 상태</SelectItem>
                  <SelectItem value="draft">작성중</SelectItem>
                  <SelectItem value="pending">승인대기</SelectItem>
                  <SelectItem value="approved">승인됨</SelectItem>
                  <SelectItem value="scheduled">예약됨</SelectItem>
                  <SelectItem value="published">발행완료</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="타입" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체 타입</SelectItem>
                  <SelectItem value="blog">블로그</SelectItem>
                  <SelectItem value="shorts">쇼츠</SelectItem>
                  <SelectItem value="sns">SNS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">타입</TableHead>
                  <TableHead>제목</TableHead>
                  <TableHead className="w-24">상태</TableHead>
                  <TableHead className="w-24">채널</TableHead>
                  <TableHead className="w-28">생성일</TableHead>
                  <TableHead className="w-20">성과</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContents.map((content) => {
                  const status = statusLabels[content.status];
                  return (
                    <TableRow key={content.id}>
                      <TableCell>{getTypeIcon(content.type)}</TableCell>
                      <TableCell className="font-medium">
                        <span className="line-clamp-1">{content.title}</span>
                      </TableCell>
                      <TableCell>
                        <Badge className={status.color}>{status.label}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {content.channel || "-"}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {content.createdAt}
                      </TableCell>
                      <TableCell>
                        {content.performance?.views ? (
                          <span className="text-sm">
                            {content.performance.views.toLocaleString()}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              보기
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="w-4 h-4 mr-2" />
                              복사
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="w-4 h-4 mr-2" />
                              예약
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" />
                              내보내기
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="w-4 h-4 mr-2" />
                              삭제
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
