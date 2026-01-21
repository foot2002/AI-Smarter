import { useParams, Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import {
  FileText,
  Clock,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  Video,
  Share2,
  ExternalLink,
  Info,
  Sparkles,
  Target,
  Zap,
  Eye,
  MessageSquare,
  ChevronRight,
  Plus,
  Play,
  Check,
  Edit,
  Send,
  BarChart3,
  CalendarDays,
  Hash,
  Timer,
  MousePointer,
} from "lucide-react";
import {
  sampleStores,
  sampleContents,
  sampleFeedbacks,
  statusLabels,
  sampleAnalytics,
} from "@/data/sampleData";

// Dashboard sample data
const dashboardContents = [
  { id: 'dash-1', storeId: 'store-1', type: 'blog', title: '연남동 데이트 카페 추천 | 시그니처 라떼 후기', status: 'published', channel: 'blog', createdAt: '2024-03-08', performance: { views: 1523, inquiries: 12, clicks: 89 } },
  { id: 'dash-2', storeId: 'store-1', type: 'shorts', title: '60초로 알아보는 연남동 숨은 카페', status: 'scheduled', channel: 'youtube', scheduledAt: '2024-03-15', createdAt: '2024-03-10', performance: { views: 0, inquiries: 0, clicks: 0 } },
  { id: 'dash-3', storeId: 'store-1', type: 'sns', title: '인스타그램 피드 - 당근케이크 신메뉴', status: 'approved', channel: 'instagram', createdAt: '2024-03-09', performance: { views: 0, inquiries: 0, clicks: 0 } },
  { id: 'dash-4', storeId: 'store-1', type: 'blog', title: '카페 창업 3년차, 단골 손님 후기', status: 'pending', createdAt: '2024-03-11', performance: { views: 0, inquiries: 0, clicks: 0 } },
  { id: 'dash-5', storeId: 'store-1', type: 'sns', title: '스레드 포스팅 - 봄맞이 신메뉴', status: 'draft', createdAt: '2024-03-12', performance: { views: 0, inquiries: 0, clicks: 0 } },
  { id: 'dash-6', storeId: 'store-1', type: 'shorts', title: '바리스타가 알려주는 라떼아트 비법', status: 'draft', createdAt: '2024-03-13', performance: { views: 0, inquiries: 0, clicks: 0 } },
  { id: 'dash-7', storeId: 'store-1', type: 'blog', title: '연남동 주말 브런치 맛집 | 오후 카페', status: 'published', channel: 'blog', createdAt: '2024-03-01', performance: { views: 2341, inquiries: 18, clicks: 145 } },
  { id: 'dash-8', storeId: 'store-1', type: 'sns', title: '인스타 릴스 - 에티오피아 원두 소개', status: 'published', channel: 'instagram', createdAt: '2024-03-02', performance: { views: 4521, inquiries: 8, clicks: 234 } },
  { id: 'dash-9', storeId: 'store-1', type: 'shorts', title: '45초 카페 투어 - 2층 창가석 뷰', status: 'published', channel: 'youtube', createdAt: '2024-03-03', performance: { views: 8923, inquiries: 25, clicks: 567 } },
  { id: 'dash-10', storeId: 'store-1', type: 'blog', title: '겨울 시즌 한정 메뉴 소개', status: 'published', channel: 'blog', createdAt: '2024-02-20', performance: { views: 1876, inquiries: 9, clicks: 98 } },
  { id: 'dash-11', storeId: 'store-1', type: 'sns', title: '네이버플레이스 포스팅 - 주차 안내', status: 'approved', channel: 'naver', createdAt: '2024-03-14', performance: { views: 0, inquiries: 0, clicks: 0 } },
  { id: 'dash-12', storeId: 'store-1', type: 'blog', title: '카페 인테리어 스토리 | 우리만의 공간', status: 'pending', createdAt: '2024-03-13', performance: { views: 0, inquiries: 0, clicks: 0 } },
  { id: 'dash-13', storeId: 'store-1', type: 'shorts', title: '30초 아메리카노 추출 과정', status: 'scheduled', channel: 'youtube', scheduledAt: '2024-03-18', createdAt: '2024-03-12', performance: { views: 0, inquiries: 0, clicks: 0 } },
  { id: 'dash-14', storeId: 'store-1', type: 'sns', title: '쓰레드 - 오늘의 원두 소개', status: 'draft', createdAt: '2024-03-15', performance: { views: 0, inquiries: 0, clicks: 0 } },
  { id: 'dash-15', storeId: 'store-1', type: 'blog', title: '펫 프렌들리 카페로서의 이야기', status: 'draft', createdAt: '2024-03-14', performance: { views: 0, inquiries: 0, clicks: 0 } },
];

// Strategy recommendations
const strategyCards = [
  {
    id: 1,
    recommendation: "오늘은 쇼츠 45초 1개 + 예약 CTA가 가장 효율적이에요",
    reasons: [
      { label: "강점 TOP", value: "시그니처라떼", icon: Sparkles },
      { label: "성과↑ 시간", value: "오전 10시", icon: Timer },
    ],
    confidence: "high", // high, medium, low
    contentType: "shorts",
  },
  {
    id: 2,
    recommendation: "분위기 강조 블로그로 '데이트 코스' 키워드를 잡아보세요",
    reasons: [
      { label: "검색량↑", value: "연남동브런치", icon: TrendingUp },
      { label: "전환율 높은 CTA", value: "예약 링크", icon: MousePointer },
    ],
    confidence: "medium",
    contentType: "blog",
  },
];

// Weekly plan items
const weeklyPlanItems = [
  { type: 'blog', target: 1, completed: 1, label: '블로그', reason: '주 1회 발행 목표 달성' },
  { type: 'shorts', target: 2, completed: 1, label: '쇼츠', reason: '오전 10시 발행 시 조회↑' },
  { type: 'sns', target: 3, completed: 2, label: 'SNS', reason: '인스타그램 문의 전환율 높음' },
];

// Top patterns data
const topPatterns = {
  keywords: [
    { value: '시그니처라떼', count: 6, total: 10 },
    { value: '연남동카페', count: 5, total: 10 },
    { value: '분위기', count: 4, total: 10 },
  ],
  cta: { value: '예약 링크', conversion: '+23%' },
  time: { value: '오전 10시', performance: '+18%' },
};

export default function Dashboard() {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const store = sampleStores.find((s) => s.id === storeId) || sampleStores[0];
  const storeContents = dashboardContents.filter((c) => c.storeId === storeId || c.storeId === 'store-1');
  const storeFeedbacks = sampleFeedbacks.filter((f) => f.storeId === storeId);
  const analytics = sampleAnalytics[storeId as keyof typeof sampleAnalytics] || sampleAnalytics['store-1'];

  const [periodFilter, setPeriodFilter] = useState("30");
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);
  const [completedTodos, setCompletedTodos] = useState<string[]>([]);

  // KPI calculations
  const pendingContents = storeContents.filter((c) => c.status === "pending").length;
  const scheduledContents = storeContents.filter((c) => c.status === "scheduled").length;
  const totalInquiries = storeContents.reduce((sum, c) => sum + (c.performance?.inquiries || 0), 0);
  const totalViews = storeContents.reduce((sum, c) => sum + (c.performance?.views || 0), 0);

  // Todos with deep links
  const todos = [
    ...(pendingContents > 0
      ? [{
          id: "pending",
          type: "pending",
          label: `${pendingContents}개 콘텐츠 승인 대기`,
          icon: Clock,
          link: `/app/${storeId}/content?status=pending`,
          iconBg: "bg-yellow-100",
          iconColor: "text-yellow-600",
        }]
      : []),
    ...(!store.channels.youtube?.connected
      ? [{
          id: "youtube",
          type: "channel",
          label: "유튜브 채널 연결하기",
          icon: AlertCircle,
          link: `/app/${storeId}/settings?tab=channels`,
          iconBg: "bg-orange-100",
          iconColor: "text-orange-600",
        }]
      : []),
    ...(storeFeedbacks.filter((f) => f.sentiment === "negative").length > 0
      ? [{
          id: "feedback",
          type: "feedback",
          label: "부정 피드백 확인 필요",
          icon: AlertCircle,
          link: `/app/${storeId}/insights?sentiment=negative`,
          iconBg: "bg-red-100",
          iconColor: "text-red-600",
        }]
      : []),
    {
      id: "content",
      type: "content",
      label: "이번 주 쇼츠 1개 더 만들기",
      icon: Video,
      link: `/app/${storeId}/content`,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
  ].filter(todo => !completedTodos.includes(todo.id));

  // Recent contents
  const recentContents = storeContents.slice(0, 6);

  // Insights summary
  const positiveKeywords = storeFeedbacks
    .filter((f) => f.sentiment === "positive")
    .flatMap((f) => f.keywords || [])
    .slice(0, 3);

  const negativeKeywords = storeFeedbacks
    .filter((f) => f.sentiment === "negative")
    .flatMap((f) => f.keywords || [])
    .slice(0, 3);

  const getContentIcon = (type: string) => {
    switch (type) {
      case "blog":
        return FileText;
      case "shorts":
        return Video;
      case "sns":
        return Share2;
      default:
        return FileText;
    }
  };

  const getNextAction = (status: string) => {
    switch (status) {
      case "draft":
        return { label: "계속 작성", icon: Edit };
      case "pending":
        return { label: "승인하기", icon: Check };
      case "approved":
        return { label: "예약하기", icon: Calendar };
      case "scheduled":
        return { label: "일정 보기", icon: CalendarDays };
      case "published":
        return { label: "성과 보기", icon: BarChart3 };
      default:
        return { label: "보기", icon: Eye };
    }
  };

  const getConfidenceBadge = (confidence: string) => {
    switch (confidence) {
      case "high":
        return { label: "근거 충분", color: "bg-green-100 text-green-700" };
      case "medium":
        return { label: "근거 보통", color: "bg-yellow-100 text-yellow-700" };
      case "low":
        return { label: "근거 부족", color: "bg-orange-100 text-orange-700" };
      default:
        return { label: "근거 보통", color: "bg-yellow-100 text-yellow-700" };
    }
  };

  const handleTodoComplete = (todoId: string) => {
    setCompletedTodos([...completedTodos, todoId]);
  };

  const handleStrategyAction = (contentType: string) => {
    navigate(`/app/${storeId}/content?type=${contentType}`);
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Page Header with Period Filter */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">대시보드</h1>
            <p className="text-muted-foreground">
              {store.name}의 마케팅 현황을 한눈에 확인하세요
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Data Collection Status */}
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mr-1.5" />
                수동 입력 중
              </Badge>
              <Dialog open={showPerformanceModal} onOpenChange={setShowPerformanceModal}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="w-3.5 h-3.5 mr-1.5" />
                    성과 입력
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>성과 수동 입력</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>조회수</Label>
                        <Input type="number" placeholder="0" />
                      </div>
                      <div>
                        <Label>클릭수</Label>
                        <Input type="number" placeholder="0" />
                      </div>
                      <div>
                        <Label>문의수</Label>
                        <Input type="number" placeholder="0" />
                      </div>
                      <div>
                        <Label>예약수</Label>
                        <Input type="number" placeholder="0" />
                      </div>
                    </div>
                    <Button className="w-full">저장하기</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            {/* Period Filter */}
            <Select value={periodFilter} onValueChange={setPeriodFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">최근 7일</SelectItem>
                <SelectItem value="30">최근 30일</SelectItem>
                <SelectItem value="90">최근 90일</SelectItem>
              </SelectContent>
            </Select>

            <Button asChild>
              <Link to={`/app/${storeId}/content`}>
                <FileText className="w-4 h-4 mr-2" />
                콘텐츠 생성
              </Link>
            </Button>
          </div>
        </div>

        {/* KPI Cards with Tooltips */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>승인 대기 중인 콘텐츠 수</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="text-sm text-muted-foreground mb-1">승인 대기</p>
            <p className="text-2xl font-bold">{pendingContents}개</p>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>발행 예약된 콘텐츠 수</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="text-sm text-muted-foreground mb-1">예약됨</p>
            <p className="text-2xl font-bold">{scheduledContents}개</p>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-blue-600" />
              </div>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>전화/DM/예약 등 모든 문의 합산</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="text-sm text-muted-foreground mb-1">이번주 문의</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold">{totalInquiries}건</p>
              <span className="text-xs text-green-600">+12%</span>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <Eye className="w-5 h-5 text-green-600" />
              </div>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>선택한 기간의 총 조회수</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="text-sm text-muted-foreground mb-1">총 조회수</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold">{totalViews.toLocaleString()}</p>
              <span className="text-xs text-green-600">+8%</span>
            </div>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Todos + Strategy + Weekly Plan */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Tasks with Deep Links */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  오늘 할 일
                </h2>
                <Badge variant="secondary">{todos.length}개</Badge>
              </div>

              {todos.length > 0 ? (
                <div className="space-y-2">
                  {todos.map((todo) => {
                    const Icon = todo.icon;
                    return (
                      <div
                        key={todo.id}
                        className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
                      >
                        <Checkbox
                          onCheckedChange={() => handleTodoComplete(todo.id)}
                          className="shrink-0"
                        />
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${todo.iconBg} ${todo.iconColor}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="flex-1 text-sm font-medium">{todo.label}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          asChild
                        >
                          <Link to={todo.link}>
                            <span className="text-xs mr-1">바로가기</span>
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <p className="text-muted-foreground">모든 작업을 완료했어요!</p>
                </div>
              )}
            </Card>

            {/* Strategy Cards - Today's Direction */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  오늘의 방향
                </h2>
                <span className="text-xs text-muted-foreground">AI 추천</span>
              </div>

              <div className="space-y-4">
                {strategyCards.map((card) => {
                  const confidenceBadge = getConfidenceBadge(card.confidence);
                  return (
                    <div
                      key={card.id}
                      className="p-4 rounded-xl border border-primary/20 bg-primary/5"
                    >
                      {/* Recommendation */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <p className="text-sm font-medium leading-relaxed">
                          {card.recommendation}
                        </p>
                        <Badge className={`shrink-0 text-xs ${confidenceBadge.color}`}>
                          {confidenceBadge.label}
                        </Badge>
                      </div>

                      {/* Reasons */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {card.reasons.map((reason, idx) => {
                          const ReasonIcon = reason.icon;
                          return (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs font-normal"
                            >
                              <ReasonIcon className="w-3 h-3 mr-1" />
                              {reason.label}: {reason.value}
                            </Badge>
                          );
                        })}
                      </div>

                      {/* Action Button */}
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={() => handleStrategyAction(card.contentType)}
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        이 방향으로 콘텐츠 생성
                      </Button>
                    </div>
                  );
                })}

                {/* Low confidence notice */}
                <div className="p-3 rounded-lg bg-muted/50 border border-dashed">
                  <p className="text-xs text-muted-foreground">
                    💡 피드백/성과 데이터가 쌓일수록 추천 정확도가 높아집니다.{" "}
                    <Link to={`/app/${storeId}/insights`} className="text-primary underline">
                      피드백 추가하기
                    </Link>
                  </p>
                </div>
              </div>
            </Card>

            {/* Weekly Operation Plan */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-primary" />
                  이번 주 운영 플랜
                </h2>
                <Badge variant="outline" className="text-xs">
                  {store.operationMode === 'light' ? '가볍게' : store.operationMode === 'steady' ? '꾸준히' : '공격적'}
                </Badge>
              </div>

              <div className="space-y-3">
                {weeklyPlanItems.map((item) => {
                  const isCompleted = item.completed >= item.target;
                  const progress = Math.min((item.completed / item.target) * 100, 100);
                  return (
                    <div key={item.type} className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{item.label}</span>
                          <span className="text-xs text-muted-foreground">
                            {item.completed}/{item.target}개
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${isCompleted ? 'bg-green-500' : 'bg-primary'}`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{item.reason}</p>
                      </div>
                      <Button
                        variant={isCompleted ? "outline" : "default"}
                        size="sm"
                        className="shrink-0"
                        asChild
                      >
                        <Link to={`/app/${storeId}/content?type=${item.type}`}>
                          {isCompleted ? "예약" : "생성"}
                        </Link>
                      </Button>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Recent Contents with Next Actions */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">최근 콘텐츠</h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link to={`/app/${storeId}/content`}>
                    전체보기
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>

              {recentContents.length > 0 ? (
                <div className="space-y-2">
                  {recentContents.map((content) => {
                    const Icon = getContentIcon(content.type);
                    const status = statusLabels[content.status];
                    const nextAction = getNextAction(content.status);
                    const NextIcon = nextAction.icon;
                    return (
                      <div
                        key={content.id}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{content.title}</p>
                          <p className="text-xs text-muted-foreground">{content.createdAt}</p>
                        </div>
                        <Badge className={`shrink-0 ${status.color}`}>{status.label}</Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                        >
                          <NextIcon className="w-4 h-4 mr-1" />
                          <span className="text-xs">{nextAction.label}</span>
                        </Button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground mb-4">아직 생성된 콘텐츠가 없어요</p>
                  <Button asChild>
                    <Link to={`/app/${storeId}/content`}>첫 콘텐츠 만들기</Link>
                  </Button>
                </div>
              )}
            </Card>
          </div>

          {/* Right Column - Insights + Top Patterns */}
          <div className="space-y-6">
            {/* Insights Summary with Scope */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold">인사이트 요약</h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link to={`/app/${storeId}/insights`}>
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
              
              {/* Scope Badge */}
              <Badge variant="outline" className="mb-4 text-xs font-normal">
                최근 30일 · 리뷰/설문 {storeFeedbacks.length}건 기준
              </Badge>

              {/* Strengths */}
              <div className="mb-5">
                <p className="text-sm font-medium text-green-600 mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  강점 TOP 3
                </p>
                <div className="flex flex-wrap gap-2">
                  {positiveKeywords.length > 0 ? (
                    positiveKeywords.map((keyword, idx) => (
                      <Tooltip key={idx}>
                        <TooltipTrigger>
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-700 cursor-help"
                          >
                            {keyword}
                            <span className="ml-1 text-green-500">({3 - idx}회)</span>
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">클릭하여 근거 문장 보기</p>
                        </TooltipContent>
                      </Tooltip>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">피드백을 추가해주세요</p>
                  )}
                </div>
              </div>

              {/* Improvements */}
              <div className="mb-5">
                <p className="text-sm font-medium text-orange-600 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  개선 필요
                </p>
                <div className="flex flex-wrap gap-2">
                  {negativeKeywords.length > 0 ? (
                    negativeKeywords.map((keyword, idx) => (
                      <Tooltip key={idx}>
                        <TooltipTrigger>
                          <Badge
                            variant="secondary"
                            className="bg-orange-100 text-orange-700 cursor-help"
                          >
                            {keyword}
                            <span className="ml-1 text-orange-500">({2 - idx}회)</span>
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">클릭하여 근거 문장 보기</p>
                        </TooltipContent>
                      </Tooltip>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">부정 피드백 없음</p>
                  )}
                </div>
              </div>

              {/* Action Link */}
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to={`/app/${storeId}/insights`}>
                  <Lightbulb className="w-4 h-4 mr-2" />
                  인사이트 상세 보기
                </Link>
              </Button>
            </Card>

            {/* Top Patterns Widget - "Why it worked" */}
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h3 className="font-bold">이번 달 성과 TOP 패턴</h3>
              </div>

              <div className="space-y-4">
                {/* Top Keywords */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                    <Hash className="w-3 h-3" />
                    많이 먹힌 키워드
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {topPatterns.keywords.map((kw, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {kw.value}
                        <span className="ml-1 text-muted-foreground">
                          ({kw.count}/{kw.total})
                        </span>
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Top CTA */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                    <MousePointer className="w-3 h-3" />
                    잘 먹힌 CTA
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-700">{topPatterns.cta.value}</Badge>
                    <span className="text-xs text-green-600 font-medium">
                      문의 전환 {topPatterns.cta.conversion}
                    </span>
                  </div>
                </div>

                {/* Top Time */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                    <Timer className="w-3 h-3" />
                    잘 먹힌 시간대
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-purple-100 text-purple-700">{topPatterns.time.value}</Badge>
                    <span className="text-xs text-green-600 font-medium">
                      평균 조회 {topPatterns.time.performance}
                    </span>
                  </div>
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                <Link to={`/app/${storeId}/analytics`}>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  성과분석 상세 보기
                </Link>
              </Button>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="font-bold mb-3">빠른 시작</h3>
              <div className="space-y-2">
                <Button className="w-full justify-start" variant="secondary" asChild>
                  <Link to={`/app/${storeId}/content?type=blog`}>
                    <FileText className="w-4 h-4 mr-2" />
                    블로그 글 생성
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="secondary" asChild>
                  <Link to={`/app/${storeId}/content?type=shorts`}>
                    <Video className="w-4 h-4 mr-2" />
                    쇼츠 대본 생성
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="secondary" asChild>
                  <Link to={`/app/${storeId}/insights`}>
                    <Lightbulb className="w-4 h-4 mr-2" />
                    피드백 분석
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
