import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { toast } from "sonner";
import {
  Plus,
  Search,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Lightbulb,
  AlertCircle,
  TrendingUp,
  ArrowRight,
  Star,
  Filter,
  Download,
  Upload,
  FileText,
  QrCode,
  Zap,
  Lock,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  Clock,
  Copy,
  Check,
  CalendarIcon,
  Loader2,
  ClipboardPaste,
  FileSpreadsheet,
  ClipboardList,
  Globe,
  Sparkles,
  X,
  Info,
  CheckCircle2,
  Circle,
  ExternalLink,
} from "lucide-react";
import { sampleFeedbacks, sampleStores } from "@/data/sampleData";
import { cn } from "@/lib/utils";

// Extended sample feedbacks for demo
const extendedFeedbacks = [
  ...sampleFeedbacks,
  { id: 'fb-21', storeId: 'store-1', type: 'review' as const, content: '창가석이 예약이 안 돼서 아쉬웠어요. 그래도 분위기는 좋았습니다.', sentiment: 'neutral' as const, rating: 4, source: '네이버', createdAt: '2024-03-11', keywords: ['창가석', '예약', '분위기'] },
  { id: 'fb-22', storeId: 'store-1', type: 'survey' as const, content: '전반적으로 만족합니다. 특히 시그니처 라떼가 맛있었어요.', sentiment: 'positive' as const, createdAt: '2024-03-11', keywords: ['만족', '시그니처라떼'] },
  { id: 'fb-23', storeId: 'store-1', type: 'inquiry' as const, content: '주차 공간이 있는지 문의드립니다. 네비에 안 나와서요.', sentiment: 'neutral' as const, createdAt: '2024-03-10', keywords: ['주차', '문의'] },
  { id: 'fb-24', storeId: 'store-1', type: 'review' as const, content: '강아지랑 같이 왔는데 펫 프렌들리해서 좋았어요! 물도 따로 주시고 감동!', sentiment: 'positive' as const, rating: 5, source: '인스타그램', createdAt: '2024-03-10', keywords: ['펫프렌들리', '친절'] },
  { id: 'fb-25', storeId: 'store-1', type: 'review' as const, content: '주말 오후에 가니까 너무 시끄러웠어요. 대화가 어려울 정도...', sentiment: 'negative' as const, rating: 2, source: '카카오맵', createdAt: '2024-03-09', keywords: ['소음', '주말'] },
  { id: 'fb-26', storeId: 'store-1', type: 'survey' as const, content: '재방문 의향 있습니다. 가격은 조금 비싸지만 맛있어요.', sentiment: 'positive' as const, createdAt: '2024-03-09', keywords: ['재방문', '가격'] },
  { id: 'fb-27', storeId: 'store-1', type: 'review' as const, content: '2층 창가석 분위기 최고입니다. 인스타 사진 찍기 딱 좋아요.', sentiment: 'positive' as const, rating: 5, source: '인스타그램', createdAt: '2024-03-08', keywords: ['창가석', '분위기', '인스타'] },
  { id: 'fb-28', storeId: 'store-1', type: 'inquiry' as const, content: '단체 예약 (15명) 가능한가요? 회사 모임으로 이용하고 싶습니다.', sentiment: 'neutral' as const, createdAt: '2024-03-08', keywords: ['단체', '예약'] },
  { id: 'fb-29', storeId: 'store-1', type: 'review' as const, content: '라스트오더 시간이 너무 빨라요. 21시까지인데 20시 반에 가니까 디저트를 못 시켰어요.', sentiment: 'negative' as const, rating: 3, source: '네이버', createdAt: '2024-03-07', keywords: ['라스트오더', '운영시간'] },
  { id: 'fb-30', storeId: 'store-1', type: 'review' as const, content: '당근케이크가 진짜 맛있어요. 일부러 먹으러 왔는데 역시 최고!', sentiment: 'positive' as const, rating: 5, source: '네이버', createdAt: '2024-03-07', keywords: ['당근케이크', '디저트'] },
];

// Channel options
const channelOptions = [
  { value: 'all', label: '전체' },
  { value: 'naver', label: '네이버' },
  { value: 'kakao', label: '카카오' },
  { value: 'google', label: '구글' },
  { value: 'instagram', label: '인스타' },
  { value: 'survey', label: '설문' },
  { value: 'inquiry', label: '문의' },
];

// Type options
const typeOptions = [
  { value: 'all', label: '전체' },
  { value: 'review', label: '리뷰' },
  { value: 'survey', label: '설문' },
  { value: 'inquiry', label: '문의' },
];

// Period options
const periodOptions = [
  { value: '7', label: '최근 7일' },
  { value: '30', label: '최근 30일' },
  { value: '90', label: '최근 90일' },
  { value: 'custom', label: '직접 선택' },
];

// Survey templates
const surveyTemplates = [
  { id: 'satisfaction', name: '만족도(추천) 3문항', questions: ['전반적인 만족도는?', '친구에게 추천하시겠습니까?', '재방문 의향이 있으신가요?'] },
  { id: 'improvement', name: '개선점 수집 3문항', questions: ['가장 좋았던 점은?', '개선이 필요한 점은?', '추가로 바라는 점이 있으신가요?'] },
  { id: 'loyalty', name: '재방문/추천 의향 4문항', questions: ['오늘 방문은 어떠셨나요?', '가장 만족스러웠던 점은?', '재방문 의향은?', '추천 의향은?'] },
];

// Sample action plan
const sampleActionPlan = {
  immediate: [
    { id: 'a1', text: '주차 안내 문구 SNS/입구 게시', done: false },
    { id: 'a2', text: '라스트오더 시간 안내 강화', done: true },
  ],
  shortTerm: [
    { id: 'a3', text: '예약 시스템 도입 검토', done: false },
    { id: 'a4', text: '주말 피크타임 직원 배치 조정', done: false },
  ],
  midTerm: [
    { id: 'a5', text: '2층 좌석 추가 확보 방안 검토', done: false },
    { id: 'a6', text: '노이즈 캔슬링 인테리어 개선', done: false },
    { id: 'a7', text: '단체석 확보 및 홍보', done: false },
  ],
};

// Strength keywords with evidence
const strengthKeywords = [
  { keyword: '분위기', count: 8, evidence: ['2층 창가석 분위기 최고입니다.', '분위기는 좋았습니다.', '연남동에서 분위기 좋은 카페'] },
  { keyword: '시그니처라떼', count: 6, evidence: ['시그니처 라떼가 정말 맛있어요!', '시그니처 라떼가 맛있었어요.', '달달하면서도 딱 좋았습니다.'] },
  { keyword: '친절', count: 5, evidence: ['직원분들도 친절하시고', '물도 따로 주시고 감동!', '친절한 서비스가 좋았어요'] },
  { keyword: '당근케이크', count: 4, evidence: ['당근케이크가 진짜 맛있어요.', '당근케이크 먹으러 일부러 왔는데', '촉촉하고 크림치즈 양도 넉넉'] },
  { keyword: '창가석', count: 4, evidence: ['창가석에서 마시니까 분위기도 최고!', '2층 좌석이 정말 아늑해요.', '인스타 사진 찍기 딱 좋아요'] },
];

// Improvement keywords with evidence
const improvementKeywords = [
  { keyword: '주차', count: 5, evidence: ['주차 공간이 없어서 불편했어요.', '주차 공간이 있는지 문의드립니다.', '인근 주차장 안내가 있으면 좋겠습니다.'] },
  { keyword: '소음', count: 3, evidence: ['주말 오후에 가니까 너무 시끄러웠어요.', '음악이 조금 시끄러웠으면 합니다.', '대화가 어려울 정도...'] },
  { keyword: '예약', count: 3, evidence: ['창가석이 예약이 안 돼서 아쉬웠어요.', '주말에는 자리 잡기가 조금 어려워요.', '단체 예약 가능한가요?'] },
  { keyword: '라스트오더', count: 2, evidence: ['라스트오더 시간이 너무 빨라요.', '20시 반에 가니까 디저트를 못 시켰어요.'] },
];

export default function Insights() {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const store = sampleStores.find((s) => s.id === storeId) || sampleStores[0];

  // Filter states
  const [period, setPeriod] = useState("30");
  const [channel, setChannel] = useState("all");
  const [feedbackType, setFeedbackType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOnly, setSelectedOnly] = useState(false);
  const [customDateRange, setCustomDateRange] = useState<{ from?: Date; to?: Date }>({});

  // Selection states
  const [selectedFeedbacks, setSelectedFeedbacks] = useState<string[]>([]);
  const [expandedKeyword, setExpandedKeyword] = useState<string | null>(null);

  // Modal states
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [importTab, setImportTab] = useState("bulk");
  const [addFeedbackOpen, setAddFeedbackOpen] = useState(false);
  const [contentModalOpen, setContentModalOpen] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  // Import states
  const [bulkText, setBulkText] = useState("");
  const [bulkChannel, setBulkChannel] = useState("naver");
  const [bulkSeparator, setBulkSeparator] = useState("newline");
  const [selectedSurveyTemplate, setSelectedSurveyTemplate] = useState<string | null>(null);
  const [qrGenerated, setQrGenerated] = useState(false);
  const [surveyCollected, setSurveyCollected] = useState(12);

  // Content generation states
  const [contentTypes, setContentTypes] = useState<string[]>(["blog"]);
  const [contentDirection, setContentDirection] = useState("strength");
  const [contentTone, setContentTone] = useState("default");
  const [contentLength, setContentLength] = useState("standard");
  const [generating, setGenerating] = useState(false);

  // Analysis states
  const [lastAnalyzed, setLastAnalyzed] = useState(new Date(Date.now() - 2 * 60 * 60 * 1000)); // 2 hours ago
  const [actionPlan, setActionPlan] = useState(sampleActionPlan);

  // Get feedbacks for current store
  const storeFeedbacks = useMemo(() => {
    return extendedFeedbacks.filter((f) => f.storeId === storeId || f.storeId === 'store-1');
  }, [storeId]);

  // Apply filters
  const filteredFeedbacks = useMemo(() => {
    return storeFeedbacks.filter((f) => {
      const matchesSearch = f.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = feedbackType === "all" || f.type === feedbackType;
      const matchesChannel = channel === "all" || 
        (f.source?.includes('네이버') && channel === 'naver') ||
        (f.source?.includes('카카오') && channel === 'kakao') ||
        (f.source?.includes('인스타') && channel === 'instagram') ||
        (f.type === 'survey' && channel === 'survey') ||
        (f.type === 'inquiry' && channel === 'inquiry');
      const matchesSelected = !selectedOnly || selectedFeedbacks.includes(f.id);
      return matchesSearch && matchesType && matchesChannel && matchesSelected;
    });
  }, [storeFeedbacks, searchQuery, feedbackType, channel, selectedOnly, selectedFeedbacks]);

  // Calculate stats
  const positiveCount = filteredFeedbacks.filter((f) => f.sentiment === "positive").length;
  const negativeCount = filteredFeedbacks.filter((f) => f.sentiment === "negative").length;
  const neutralCount = filteredFeedbacks.filter((f) => f.sentiment === "neutral").length;

  // Helpers
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <ThumbsUp className="w-4 h-4 text-green-600" />;
      case "negative":
        return <ThumbsDown className="w-4 h-4 text-red-600" />;
      default:
        return <MessageSquare className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">긍정</Badge>;
      case "negative":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">부정</Badge>;
      default:
        return <Badge variant="secondary">중립</Badge>;
    }
  };

  const getSourceBadge = (source?: string, type?: string) => {
    if (type === 'survey') return <Badge variant="outline" className="text-xs">설문</Badge>;
    if (type === 'inquiry') return <Badge variant="outline" className="text-xs">문의</Badge>;
    if (source?.includes('네이버')) return <Badge variant="outline" className="text-xs bg-green-50">네이버</Badge>;
    if (source?.includes('카카오')) return <Badge variant="outline" className="text-xs bg-yellow-50">카카오</Badge>;
    if (source?.includes('인스타')) return <Badge variant="outline" className="text-xs bg-pink-50">인스타</Badge>;
    return <Badge variant="outline" className="text-xs">기타</Badge>;
  };

  const formatLastAnalyzed = () => {
    const diff = Math.floor((Date.now() - lastAnalyzed.getTime()) / 1000);
    if (diff < 60) return "방금";
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
    return lastAnalyzed.toLocaleDateString("ko-KR");
  };

  // Handlers
  const handleSelectFeedback = (id: string) => {
    setSelectedFeedbacks(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedFeedbacks.length === filteredFeedbacks.length) {
      setSelectedFeedbacks([]);
    } else {
      setSelectedFeedbacks(filteredFeedbacks.map(f => f.id));
    }
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setLastAnalyzed(new Date());
      toast.success("분석 완료", {
        description: `${filteredFeedbacks.length}건의 피드백을 분석했습니다.`
      });
    }, 2000);
  };

  const handleBulkImport = () => {
    const lines = bulkText.split(bulkSeparator === 'newline' ? '\n' : '\n\n').filter(l => l.trim());
    toast.success(`${lines.length}건 가져오기 완료`, {
      description: "피드백이 추가되었습니다. 재분석을 실행하세요."
    });
    setImportModalOpen(false);
    setBulkText("");
  };

  const handleGenerateQR = () => {
    setQrGenerated(true);
    toast.success("QR 코드 생성됨", {
      description: "설문 수집이 시작되었습니다."
    });
  };

  const handleGenerateContent = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setContentModalOpen(false);
      toast.success("콘텐츠 생성 완료", {
        description: "콘텐츠 페이지로 이동합니다."
      });
      navigate(`/app/${storeId}/content`);
    }, 2500);
  };

  const toggleActionDone = (section: keyof typeof actionPlan, id: string) => {
    setActionPlan(prev => ({
      ...prev,
      [section]: prev[section].map(item => 
        item.id === id ? { ...item, done: !item.done } : item
      )
    }));
  };

  // Sample bulk text
  const sampleBulkText = `시그니처 라떼 맛있어요! 분위기도 좋고 자리도 넓어서 좋았습니다.
창가석이 너무 예뻐요. 사진 찍기 딱 좋아요~
주차가 어려워서 조금 불편했지만 커피는 맛있었어요.
친구 추천으로 왔는데 역시 소문대로 좋네요. 당근케이크 강추!
주말에 가니까 사람이 너무 많아서 시끄러웠어요.`;

  return (
    <TooltipProvider>
      <div className="space-y-4">
        {/* Import Modal */}
        <Sheet open={importModalOpen} onOpenChange={setImportModalOpen}>
          <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                피드백 불러오기
              </SheetTitle>
              <SheetDescription>
                다양한 방법으로 피드백을 수집하고 가져올 수 있습니다
              </SheetDescription>
            </SheetHeader>

            <Tabs value={importTab} onValueChange={setImportTab} className="mt-6">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="bulk" className="text-xs">
                  <ClipboardPaste className="w-4 h-4 mr-1.5" />
                  대량 붙여넣기
                </TabsTrigger>
                <TabsTrigger value="csv" className="text-xs">
                  <FileSpreadsheet className="w-4 h-4 mr-1.5" />
                  CSV
                </TabsTrigger>
                <TabsTrigger value="survey" className="text-xs">
                  <QrCode className="w-4 h-4 mr-1.5" />
                  설문/QR
                </TabsTrigger>
                <TabsTrigger value="auto" className="text-xs">
                  <Zap className="w-4 h-4 mr-1.5" />
                  자동
                </TabsTrigger>
              </TabsList>

              {/* Tab 1: Bulk Paste */}
              <TabsContent value="bulk" className="mt-6 space-y-4">
                <div className="bg-muted/50 p-3 rounded-lg text-sm text-muted-foreground">
                  💡 여러 리뷰를 한 번에 붙여넣으면 자동으로 건별로 분리합니다.
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>리뷰 내용</Label>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setBulkText(sampleBulkText)}
                    >
                      샘플 채우기
                    </Button>
                  </div>
                  <Textarea
                    value={bulkText}
                    onChange={(e) => setBulkText(e.target.value)}
                    placeholder="여러 리뷰를 붙여넣으세요. 각 줄이 하나의 리뷰로 분리됩니다."
                    className="min-h-[160px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>분리 기준</Label>
                    <Select value={bulkSeparator} onValueChange={setBulkSeparator}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newline">줄바꿈 기준</SelectItem>
                        <SelectItem value="empty">빈 줄 기준</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>채널</Label>
                    <Select value={bulkChannel} onValueChange={setBulkChannel}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="naver">네이버</SelectItem>
                        <SelectItem value="kakao">카카오맵</SelectItem>
                        <SelectItem value="google">구글맵</SelectItem>
                        <SelectItem value="instagram">인스타그램</SelectItem>
                        <SelectItem value="other">기타</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {bulkText && (
                  <div className="p-4 border rounded-xl bg-background">
                    <p className="text-sm font-medium mb-2">
                      미리보기: {bulkText.split(bulkSeparator === 'newline' ? '\n' : '\n\n').filter(l => l.trim()).length}건으로 분리됩니다
                    </p>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {bulkText.split(bulkSeparator === 'newline' ? '\n' : '\n\n').filter(l => l.trim()).slice(0, 3).map((line, idx) => (
                        <div key={idx} className="text-xs p-2 bg-muted rounded">
                          {line.slice(0, 80)}{line.length > 80 && '...'}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Button 
                  className="w-full" 
                  onClick={handleBulkImport}
                  disabled={!bulkText.trim()}
                >
                  <Download className="w-4 h-4 mr-2" />
                  가져오기
                </Button>
              </TabsContent>

              {/* Tab 2: CSV Upload */}
              <TabsContent value="csv" className="mt-6 space-y-4">
                <div className="bg-muted/50 p-3 rounded-lg text-sm text-muted-foreground">
                  💡 엑셀/CSV로 정리된 피드백을 한 번에 업로드합니다.
                </div>

                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="font-medium">파일을 드래그하거나 클릭하여 업로드</p>
                  <p className="text-sm text-muted-foreground mt-1">CSV, XLSX (최대 10MB)</p>
                </div>

                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  CSV 템플릿 다운로드
                </Button>

                <div className="space-y-2">
                  <Label>컬럼 매핑</Label>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="p-2 bg-muted rounded flex justify-between">
                      <span>날짜</span>
                      <span className="text-muted-foreground">date</span>
                    </div>
                    <div className="p-2 bg-muted rounded flex justify-between">
                      <span>채널</span>
                      <span className="text-muted-foreground">source</span>
                    </div>
                    <div className="p-2 bg-muted rounded flex justify-between">
                      <span>평점 (선택)</span>
                      <span className="text-muted-foreground">rating</span>
                    </div>
                    <div className="p-2 bg-muted rounded flex justify-between">
                      <span>내용</span>
                      <span className="text-muted-foreground">content</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full" disabled>
                  <Upload className="w-4 h-4 mr-2" />
                  업로드 및 가져오기
                </Button>
              </TabsContent>

              {/* Tab 3: Survey & QR */}
              <TabsContent value="survey" className="mt-6 space-y-4">
                <div className="bg-muted/50 p-3 rounded-lg text-sm text-muted-foreground">
                  💡 간단 설문을 만들고 QR을 발급해 매장에서 바로 수집합니다.
                </div>

                <div className="space-y-2">
                  <Label>설문 템플릿 선택</Label>
                  <div className="space-y-2">
                    {surveyTemplates.map(template => (
                      <div 
                        key={template.id}
                        onClick={() => setSelectedSurveyTemplate(template.id)}
                        className={cn(
                          "p-4 border rounded-xl cursor-pointer transition-all",
                          selectedSurveyTemplate === template.id 
                            ? "border-primary bg-primary/5" 
                            : "hover:border-primary/50"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{template.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {template.questions.join(' → ')}
                            </p>
                          </div>
                          {selectedSurveyTemplate === template.id && (
                            <Check className="w-5 h-5 text-primary" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedSurveyTemplate && (
                  <>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <FileText className="w-4 h-4 mr-2" />
                        설문 편집
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        미리보기
                      </Button>
                    </div>

                    <Card className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold">QR 코드</h4>
                        {qrGenerated && (
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            수집 중 · {surveyCollected}건
                          </Badge>
                        )}
                      </div>

                      {!qrGenerated ? (
                        <Button className="w-full" onClick={handleGenerateQR}>
                          <QrCode className="w-4 h-4 mr-2" />
                          QR 생성
                        </Button>
                      ) : (
                        <div className="space-y-4">
                          <div className="aspect-square max-w-48 mx-auto bg-muted rounded-xl flex items-center justify-center">
                            <QrCode className="w-24 h-24 text-muted-foreground" />
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" className="flex-1" size="sm">
                              <Copy className="w-4 h-4 mr-2" />
                              URL 복사
                            </Button>
                            <Button variant="outline" className="flex-1" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              QR 다운로드
                            </Button>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <span className="text-sm">설문 종료</span>
                            <Switch />
                          </div>
                        </div>
                      )}
                    </Card>
                  </>
                )}
              </TabsContent>

              {/* Tab 4: Auto Collect (Coming Soon) */}
              <TabsContent value="auto" className="mt-6 space-y-4">
                <div className="bg-muted/50 p-3 rounded-lg text-sm text-muted-foreground">
                  💡 네이버플레이스/구글맵/인스타 등 자동 수집은 추후 지원됩니다.
                </div>

                <div className="space-y-3">
                  {[
                    { name: '네이버플레이스', reason: '플레이스 API 정책으로 직접 연동 불가, 크롤링 제한' },
                    { name: '구글맵', reason: 'Google Places API 비용 및 권한 제한' },
                    { name: '인스타그램', reason: 'Meta API OAuth 인증 및 비즈니스 계정 필요' },
                  ].map(channel => (
                    <Card key={channel.name} className="p-4 opacity-60">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-muted rounded-lg">
                          <Lock className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{channel.name}</p>
                            <Badge variant="outline" className="text-xs">Coming Soon</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{channel.reason}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <Button variant="outline" className="w-full">
                  <Globe className="w-4 h-4 mr-2" />
                  자동 수집 연동 신청 (도입 문의)
                </Button>
              </TabsContent>
            </Tabs>
          </SheetContent>
        </Sheet>

        {/* Add Single Feedback Dialog */}
        <Dialog open={addFeedbackOpen} onOpenChange={setAddFeedbackOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>피드백 추가 (단건)</DialogTitle>
              <DialogDescription>
                리뷰, 설문, 문의를 직접 입력합니다
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>유형</Label>
                  <Select defaultValue="review">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="review">리뷰</SelectItem>
                      <SelectItem value="survey">설문</SelectItem>
                      <SelectItem value="inquiry">문의</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>채널</Label>
                  <Select defaultValue="naver">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="naver">네이버</SelectItem>
                      <SelectItem value="kakao">카카오맵</SelectItem>
                      <SelectItem value="instagram">인스타그램</SelectItem>
                      <SelectItem value="other">기타</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>평점 (선택)</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 4, 3, 2, 1].map(r => (
                      <SelectItem key={r} value={String(r)}>
                        {'★'.repeat(r)}{'☆'.repeat(5-r)} {r}점
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>내용</Label>
                <Textarea placeholder="피드백 내용을 입력하세요..." className="min-h-[100px]" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddFeedbackOpen(false)}>취소</Button>
              <Button onClick={() => { setAddFeedbackOpen(false); toast.success("피드백이 추가되었습니다"); }}>
                추가하기
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Content Generation Modal */}
        <Dialog open={contentModalOpen} onOpenChange={setContentModalOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                인사이트 기반 콘텐츠 생성
              </DialogTitle>
              <DialogDescription>
                {selectedFeedbacks.length > 0 
                  ? `선택한 ${selectedFeedbacks.length}건을 기반으로` 
                  : `${filteredFeedbacks.length}건의 피드백을 기반으로`
                } 콘텐츠를 생성합니다
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 py-4">
              {/* Content Type */}
              <div className="space-y-3">
                <Label>생성할 콘텐츠 (복수 선택)</Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'blog', label: '블로그' },
                    { value: 'shorts', label: '쇼츠' },
                    { value: 'sns', label: 'SNS' },
                  ].map(type => (
                    <Badge
                      key={type.value}
                      variant={contentTypes.includes(type.value) ? "default" : "outline"}
                      className="cursor-pointer py-1.5 px-3"
                      onClick={() => {
                        setContentTypes(prev => 
                          prev.includes(type.value) 
                            ? prev.filter(t => t !== type.value)
                            : [...prev, type.value]
                        );
                      }}
                    >
                      {contentTypes.includes(type.value) && <Check className="w-3 h-3 mr-1" />}
                      {type.label}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Direction */}
              <div className="space-y-3">
                <Label>소재 방향</Label>
                <div className="space-y-2">
                  {[
                    { value: 'strength', label: '강점 강조', desc: '긍정 피드백 기반 홍보 콘텐츠', recommended: true },
                    { value: 'improvement', label: '개선 안내', desc: '신뢰형 공지/안내 콘텐츠' },
                    { value: 'faq', label: 'FAQ/문의 대응', desc: '자주 묻는 질문 대응 콘텐츠' },
                  ].map(dir => (
                    <div
                      key={dir.value}
                      onClick={() => setContentDirection(dir.value)}
                      className={cn(
                        "p-3 border rounded-lg cursor-pointer transition-all flex items-center justify-between",
                        contentDirection === dir.value 
                          ? "border-primary bg-primary/5" 
                          : "hover:border-primary/50"
                      )}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{dir.label}</span>
                          {dir.recommended && <Badge variant="secondary" className="text-xs">추천</Badge>}
                        </div>
                        <p className="text-xs text-muted-foreground">{dir.desc}</p>
                      </div>
                      {contentDirection === dir.value && <Check className="w-4 h-4 text-primary" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Evidence */}
              <div className="space-y-3">
                <Label>포함할 근거 문장</Label>
                <div className="max-h-32 overflow-y-auto space-y-2">
                  {strengthKeywords.slice(0, 3).flatMap(k => k.evidence.slice(0, 1)).map((evidence, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Checkbox defaultChecked id={`evidence-${idx}`} />
                      <label htmlFor={`evidence-${idx}`} className="text-sm leading-tight cursor-pointer">
                        "{evidence}"
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Options */}
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs">톤</Label>
                  <Select value={contentTone} onValueChange={setContentTone}>
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">설정 기본값</SelectItem>
                      <SelectItem value="friendly">친근한</SelectItem>
                      <SelectItem value="professional">전문적</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">CTA</Label>
                  <Select defaultValue="default">
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">설정 기본값</SelectItem>
                      <SelectItem value="reservation">예약하기</SelectItem>
                      <SelectItem value="call">전화문의</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">길이</Label>
                  <Select value={contentLength} onValueChange={setContentLength}>
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
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setContentModalOpen(false)}>취소</Button>
              <Button onClick={handleGenerateContent} disabled={generating || contentTypes.length === 0}>
                {generating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    생성 중...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    콘텐츠 생성하기
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Page Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">인사이트</h1>
            <p className="text-muted-foreground text-sm">
              고객 피드백을 불러오고 자동 분석해 강점/개선 포인트와 실행 플랜을 확인하세요
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              마지막 분석: {formatLastAnalyzed()}
            </div>
            <Badge variant="outline" className="text-xs">
              {periodOptions.find(p => p.value === period)?.label} · {channelOptions.find(c => c.value === channel)?.label} · {filteredFeedbacks.length}건
            </Badge>
            <Button variant="outline" onClick={handleAnalyze} disabled={analyzing}>
              {analyzing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
              {analyzing ? "분석 중..." : "재분석"}
            </Button>
            <Button onClick={() => setImportModalOpen(true)}>
              <Download className="w-4 h-4 mr-2" />
              불러오기
            </Button>
          </div>
        </div>

        {/* Filter Bar */}
        <Card className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-32">
                <CalendarIcon className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {periodOptions.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={channel} onValueChange={setChannel}>
              <SelectTrigger className="w-28">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {channelOptions.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={feedbackType} onValueChange={setFeedbackType}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {typeOptions.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex-1" />

            <div className="flex items-center gap-2">
              <Switch 
                id="selected-only" 
                checked={selectedOnly} 
                onCheckedChange={setSelectedOnly}
                disabled={selectedFeedbacks.length === 0}
              />
              <Label htmlFor="selected-only" className="text-sm cursor-pointer">
                선택 항목만
              </Label>
            </div>

            <Badge variant="secondary">
              현재 범위: {filteredFeedbacks.length}건
            </Badge>
          </div>
        </Card>

        {/* Selection Bar */}
        {selectedFeedbacks.length > 0 && (
          <Card className="p-3 bg-primary/5 border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox 
                  checked={selectedFeedbacks.length === filteredFeedbacks.length}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm font-medium">
                  {selectedFeedbacks.length}건 선택됨
                </span>
                <Button variant="ghost" size="sm" onClick={() => setSelectedFeedbacks([])}>
                  <X className="w-3 h-3 mr-1" />
                  선택 해제
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleAnalyze}>
                  <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                  선택 항목 분석
                </Button>
                <Button size="sm" onClick={() => setContentModalOpen(true)}>
                  <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                  선택 항목으로 콘텐츠 생성
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Main Content - 2 Column Layout */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left: Feedback List */}
          <div className="lg:col-span-3 space-y-4">
            {/* Search & Add */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="피드백 검색..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" onClick={() => setAddFeedbackOpen(true)}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-3 gap-3">
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl">
                <ThumbsUp className="w-4 h-4 text-green-600" />
                <div>
                  <p className="text-lg font-bold text-green-700">{positiveCount}</p>
                  <p className="text-xs text-green-600">긍정</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-muted rounded-xl">
                <MessageSquare className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-lg font-bold">{neutralCount}</p>
                  <p className="text-xs text-muted-foreground">중립</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-red-50 rounded-xl">
                <ThumbsDown className="w-4 h-4 text-red-600" />
                <div>
                  <p className="text-lg font-bold text-red-700">{negativeCount}</p>
                  <p className="text-xs text-red-600">부정</p>
                </div>
              </div>
            </div>

            {/* Feedback Items */}
            <ScrollArea className="h-[calc(100vh-420px)] min-h-[400px]">
              <div className="space-y-3 pr-4">
                {filteredFeedbacks.map((feedback) => (
                  <Card
                    key={feedback.id}
                    className={cn(
                      "p-4 transition-all hover:shadow-sm cursor-pointer",
                      selectedFeedbacks.includes(feedback.id) && "ring-2 ring-primary bg-primary/5"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={selectedFeedbacks.includes(feedback.id)}
                        onCheckedChange={() => handleSelectFeedback(feedback.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="mt-0.5">{getSentimentIcon(feedback.sentiment)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          {getSentimentBadge(feedback.sentiment)}
                          {getSourceBadge(feedback.source, feedback.type)}
                          {feedback.rating && (
                            <span className="flex items-center gap-1 text-xs">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              {feedback.rating}
                            </span>
                          )}
                        </div>
                        <p className="text-sm leading-relaxed line-clamp-2">{feedback.content}</p>
                        {feedback.keywords && feedback.keywords.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {feedback.keywords.slice(0, 4).map((kw, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs py-0">
                                {kw}
                              </Badge>
                            ))}
                          </div>
                        )}
                        <p className="text-xs text-muted-foreground mt-2">{feedback.createdAt}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Right: Insight Report Panel */}
          <div className="lg:col-span-2 space-y-4">
            {/* Panel Header */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  자동 분석 결과
                </h3>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" onClick={handleAnalyze} disabled={analyzing}>
                      <RefreshCw className={cn("w-4 h-4", analyzing && "animate-spin")} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>새 피드백이 추가되면 재분석하세요</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <p className="text-xs text-muted-foreground">
                선택한 피드백을 AI가 자동 분류/요약해 강점과 개선 포인트를 도출합니다.
              </p>
              <div className="flex items-center gap-2 mt-3">
                <Badge variant="outline" className="text-xs">
                  {periodOptions.find(p => p.value === period)?.label}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {channelOptions.find(c => c.value === channel)?.label}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {filteredFeedbacks.length}건 분석
                </Badge>
              </div>
            </Card>

            {/* Strengths */}
            <Card className="p-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2 text-green-700">
                <Lightbulb className="w-4 h-4" />
                강점 TOP 키워드
              </h4>
              <div className="space-y-2">
                {strengthKeywords.map((item) => (
                  <Accordion key={item.keyword} type="single" collapsible>
                    <AccordionItem value={item.keyword} className="border-0">
                      <AccordionTrigger className="py-2 px-3 bg-green-50 rounded-lg hover:no-underline hover:bg-green-100">
                        <div className="flex items-center justify-between flex-1 mr-2">
                          <span className="text-sm font-medium">{item.keyword}</span>
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">{item.count}회</Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-0 px-3">
                        <div className="space-y-1.5">
                          {item.evidence.map((e, idx) => (
                            <p key={idx} className="text-xs text-muted-foreground italic">
                              "{e}"
                            </p>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
            </Card>

            {/* Improvements */}
            <Card className="p-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2 text-orange-700">
                <AlertCircle className="w-4 h-4" />
                개선 필요 키워드
              </h4>
              <div className="space-y-2">
                {improvementKeywords.map((item) => (
                  <Accordion key={item.keyword} type="single" collapsible>
                    <AccordionItem value={item.keyword} className="border-0">
                      <AccordionTrigger className="py-2 px-3 bg-orange-50 rounded-lg hover:no-underline hover:bg-orange-100">
                        <div className="flex items-center justify-between flex-1 mr-2">
                          <span className="text-sm font-medium">{item.keyword}</span>
                          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">{item.count}회</Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-0 px-3">
                        <div className="space-y-1.5">
                          {item.evidence.map((e, idx) => (
                            <p key={idx} className="text-xs text-muted-foreground italic">
                              "{e}"
                            </p>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
            </Card>

            {/* Action Plan */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold flex items-center gap-2 text-primary">
                  <TrendingUp className="w-4 h-4" />
                  개선 Action Plan
                </h4>
                <Button variant="ghost" size="sm" className="text-xs">
                  편집
                </Button>
              </div>

              <div className="space-y-4">
                {/* Immediate */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    즉시 실행
                  </p>
                  <div className="space-y-2">
                    {actionPlan.immediate.map(item => (
                      <div 
                        key={item.id} 
                        className={cn(
                          "flex items-center gap-2 p-2 rounded-lg text-sm",
                          item.done ? "bg-green-50 line-through text-muted-foreground" : "bg-muted"
                        )}
                      >
                        <Checkbox 
                          checked={item.done} 
                          onCheckedChange={() => toggleActionDone('immediate', item.id)}
                        />
                        <span className="flex-1">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Short Term */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">📅 단기 (1주)</p>
                  <div className="space-y-2">
                    {actionPlan.shortTerm.map(item => (
                      <div 
                        key={item.id} 
                        className={cn(
                          "flex items-center gap-2 p-2 rounded-lg text-sm",
                          item.done ? "bg-green-50 line-through text-muted-foreground" : "bg-muted"
                        )}
                      >
                        <Checkbox 
                          checked={item.done} 
                          onCheckedChange={() => toggleActionDone('shortTerm', item.id)}
                        />
                        <span className="flex-1">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mid Term */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">📆 중기 (1개월)</p>
                  <div className="space-y-2">
                    {actionPlan.midTerm.map(item => (
                      <div 
                        key={item.id} 
                        className={cn(
                          "flex items-center gap-2 p-2 rounded-lg text-sm",
                          item.done ? "bg-green-50 line-through text-muted-foreground" : "bg-muted"
                        )}
                      >
                        <Checkbox 
                          checked={item.done} 
                          onCheckedChange={() => toggleActionDone('midTerm', item.id)}
                        />
                        <span className="flex-1">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* CTA */}
            <Card className="p-4 bg-primary/5 border-primary/20">
              <Button className="w-full" size="lg" onClick={() => setContentModalOpen(true)}>
                <Sparkles className="w-4 h-4 mr-2" />
                이 인사이트로 콘텐츠 생성
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-2">
                {selectedFeedbacks.length > 0 
                  ? `선택한 ${selectedFeedbacks.length}건을 기반으로`
                  : '현재 범위를 기반으로'
                } 블로그/쇼츠/SNS를 생성합니다
              </p>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
