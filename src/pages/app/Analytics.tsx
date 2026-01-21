import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Eye,
  MessageSquare,
  Lightbulb,
  Calendar,
  Clock,
  Hash,
  FileText,
  Video,
  Share2,
  Filter,
  Search,
  ArrowUpDown,
  ChevronRight,
  Target,
  MousePointer,
  Phone,
  Link as LinkIcon,
  AlertCircle,
  Plus,
  Info,
  ExternalLink,
  Sparkles,
  BarChart3,
  RefreshCw,
  Download,
  HelpCircle,
} from "lucide-react";
import { sampleStores } from "@/data/sampleData";
import { cn } from "@/lib/utils";

// Extended sample analytics data for the page
interface AnalyticsContent {
  id: string;
  type: 'blog' | 'shorts' | 'sns';
  title: string;
  channel: string;
  publishedAt: string;
  publishedTime: string;
  views: number;
  clicks: number;
  inquiries: number;
  reservations: number;
  conversionRate: number;
  tags: string[];
  status: 'published' | 'scheduled' | 'draft';
  cta: string;
  // Shorts specific
  duration?: number;
  subtitles?: string;
  voiceover?: boolean;
  // Blog specific
  wordCount?: number;
  hasFaq?: boolean;
  // SNS specific
  hashtagStyle?: string;
  useEmoji?: boolean;
  // Why analysis
  whyReasons: string[];
  improvements: string[];
}

const sampleAnalyticsContents: AnalyticsContent[] = [
  {
    id: 'ac-1',
    type: 'blog',
    title: '연남동 데이트 카페 추천 | 따뜻한 오후 카페 시그니처 라떼 후기',
    channel: '네이버블로그',
    publishedAt: '2024-03-08',
    publishedTime: '10:00',
    views: 2847,
    clicks: 234,
    inquiries: 18,
    reservations: 12,
    conversionRate: 0.63,
    tags: ['연남동카페', '데이트', '시그니처라떼'],
    status: 'published',
    cta: 'reservation',
    wordCount: 1200,
    hasFaq: true,
    whyReasons: [
      '지역 키워드(연남동) 포함으로 검색 노출 증가',
      '시그니처 메뉴 중심 소개로 차별성 강조',
      'CTA가 예약 링크로 명확하게 유도',
      '발행 시간대(오전 10시)가 성과 높은 구간',
    ],
    improvements: [
      '제목에 가격대 정보 추가 시 클릭률 예상 +15%',
      'FAQ 섹션 확대로 검색 노출 강화 가능',
    ],
  },
  {
    id: 'ac-2',
    type: 'shorts',
    title: '60초로 알아보는 연남동 숨은 카페',
    channel: '유튜브',
    publishedAt: '2024-03-10',
    publishedTime: '14:00',
    views: 4523,
    clicks: 189,
    inquiries: 8,
    reservations: 5,
    conversionRate: 0.18,
    tags: ['연남동', '카페투어', '쇼츠'],
    status: 'published',
    cta: 'link',
    duration: 60,
    subtitles: '강조',
    voiceover: true,
    whyReasons: [
      '60초 포맷이 완주율 78%로 높음',
      '강조 자막이 음소거 시청자에게 효과적',
      '카페투어 태그가 트렌드와 일치',
    ],
    improvements: [
      '45초로 단축 시 완주율 예상 +12%',
      'CTA 위치를 영상 중간에 추가 권장',
    ],
  },
  {
    id: 'ac-3',
    type: 'sns',
    title: '인스타그램 피드 - 당근케이크 신메뉴',
    channel: '인스타그램',
    publishedAt: '2024-03-09',
    publishedTime: '18:30',
    views: 1256,
    clicks: 98,
    inquiries: 15,
    reservations: 8,
    conversionRate: 1.19,
    tags: ['당근케이크', '홈메이드', '디저트'],
    status: 'published',
    cta: 'dm',
    hashtagStyle: 'standard',
    useEmoji: true,
    whyReasons: [
      '저녁 시간대(18:30) 인스타 활성 시간',
      '이모지 사용으로 친근한 느낌 전달',
      'DM CTA가 즉시 문의 유도에 효과적',
    ],
    improvements: [
      '해시태그를 "많이"로 변경 시 도달 예상 +20%',
      '캐러셀 형식으로 변경 권장',
    ],
  },
  {
    id: 'ac-4',
    type: 'blog',
    title: '연남동 브런치 맛집 5곳 | 주말 데이트 코스',
    channel: '네이버블로그',
    publishedAt: '2024-03-05',
    publishedTime: '09:00',
    views: 3421,
    clicks: 287,
    inquiries: 22,
    reservations: 14,
    conversionRate: 0.64,
    tags: ['연남동브런치', '주말데이트', '맛집'],
    status: 'published',
    cta: 'reservation',
    wordCount: 2000,
    hasFaq: true,
    whyReasons: [
      '"5곳" 리스트 형식이 클릭율 높음',
      '주말 키워드가 시즌 검색량과 일치',
      'FAQ 포함으로 롱테일 검색 유입',
    ],
    improvements: [
      '지도 임베드 추가 시 체류시간 예상 +25%',
      '각 매장 예약 버튼 개별 추가 권장',
    ],
  },
  {
    id: 'ac-5',
    type: 'shorts',
    title: '바리스타가 알려주는 라떼아트 비법',
    channel: '유튜브',
    publishedAt: '2024-03-07',
    publishedTime: '12:00',
    views: 6234,
    clicks: 312,
    inquiries: 5,
    reservations: 2,
    conversionRate: 0.08,
    tags: ['라떼아트', '바리스타', '커피'],
    status: 'published',
    cta: 'link',
    duration: 45,
    subtitles: '표준',
    voiceover: false,
    whyReasons: [
      '교육형 콘텐츠가 저장률 높음',
      '45초 포맷이 최적 완주 구간',
      '점심시간(12시) 발행 효과',
    ],
    improvements: [
      '음성 내레이션 추가 시 몰입도 예상 +30%',
      '매장 방문 CTA 강화 필요',
    ],
  },
  {
    id: 'ac-6',
    type: 'sns',
    title: '스레드 포스팅 - 봄맞이 신메뉴',
    channel: '스레드',
    publishedAt: '2024-03-06',
    publishedTime: '11:00',
    views: 543,
    clicks: 32,
    inquiries: 4,
    reservations: 1,
    conversionRate: 0.74,
    tags: ['봄시즌', '신메뉴', '딸기'],
    status: 'published',
    cta: 'visit',
    hashtagStyle: 'minimal',
    useEmoji: true,
    whyReasons: [
      '스레드 얼리어답터 타겟에 적합',
      '봄 시즌 키워드가 시의성 있음',
    ],
    improvements: [
      '해시태그 추가로 도달 확대 필요',
      '인스타그램 연동 포스팅 권장',
    ],
  },
  {
    id: 'ac-7',
    type: 'blog',
    title: '카페 창업 3년차, 단골 손님이 말하는 우리 카페의 매력',
    channel: '네이버블로그',
    publishedAt: '2024-03-04',
    publishedTime: '16:00',
    views: 1823,
    clicks: 145,
    inquiries: 12,
    reservations: 7,
    conversionRate: 0.66,
    tags: ['카페창업', '단골', '후기'],
    status: 'published',
    cta: 'reservation',
    wordCount: 1500,
    hasFaq: false,
    whyReasons: [
      '스토리텔링 형식이 체류시간 높음',
      '실제 후기 기반으로 신뢰도 상승',
      '감성적 톤이 타겟과 일치',
    ],
    improvements: [
      'FAQ 섹션 추가 시 검색 노출 예상 +15%',
      '사진 추가로 시각적 매력 강화 필요',
    ],
  },
  {
    id: 'ac-8',
    type: 'shorts',
    title: '1분 안에 보는 창가석 뷰',
    channel: '유튜브',
    publishedAt: '2024-03-03',
    publishedTime: '15:00',
    views: 2156,
    clicks: 87,
    inquiries: 6,
    reservations: 4,
    conversionRate: 0.28,
    tags: ['창가석', '카페뷰', '연남동'],
    status: 'published',
    cta: 'reservation',
    duration: 60,
    subtitles: '없음',
    voiceover: false,
    whyReasons: [
      '시각적 콘텐츠가 분위기 전달에 효과적',
      '예약 CTA가 직접 전환 유도',
    ],
    improvements: [
      '자막 추가 시 접근성 및 완주율 예상 +20%',
      '30초로 단축하여 리텐션 강화 권장',
    ],
  },
  {
    id: 'ac-9',
    type: 'sns',
    title: '인스타 릴스 - 오늘의 커피 한 잔',
    channel: '인스타그램',
    publishedAt: '2024-03-02',
    publishedTime: '08:00',
    views: 987,
    clicks: 45,
    inquiries: 3,
    reservations: 1,
    conversionRate: 0.30,
    tags: ['모닝커피', '일상', '카페'],
    status: 'published',
    cta: 'dm',
    hashtagStyle: 'heavy',
    useEmoji: false,
    whyReasons: [
      '아침 시간대(08:00)가 출근길 타겟에 적합',
      '해시태그 "많이" 스타일로 도달 확대',
    ],
    improvements: [
      '이모지 추가로 친근감 상승 필요',
      'CTA를 예약 링크로 변경 권장',
    ],
  },
  {
    id: 'ac-10',
    type: 'blog',
    title: '연남동 펫프렌들리 카페 | 반려견과 함께',
    channel: '네이버블로그',
    publishedAt: '2024-03-01',
    publishedTime: '11:00',
    views: 2534,
    clicks: 198,
    inquiries: 16,
    reservations: 9,
    conversionRate: 0.63,
    tags: ['펫프렌들리', '반려견', '연남동'],
    status: 'published',
    cta: 'reservation',
    wordCount: 1200,
    hasFaq: true,
    whyReasons: [
      '펫프렌들리 니치 키워드로 타겟 정확',
      'FAQ에 반려견 관련 질문 포함',
      '예약 CTA가 명확',
    ],
    improvements: [
      '반려견 메뉴 정보 추가 권장',
      '인스타 연동 포스팅으로 확산 필요',
    ],
  },
  {
    id: 'ac-11',
    type: 'shorts',
    title: '30초 카페 ASMR | 에스프레소 추출',
    channel: '유튜브',
    publishedAt: '2024-02-28',
    publishedTime: '20:00',
    views: 8923,
    clicks: 234,
    inquiries: 2,
    reservations: 1,
    conversionRate: 0.02,
    tags: ['ASMR', '에스프레소', '커피'],
    status: 'published',
    cta: 'link',
    duration: 30,
    subtitles: '없음',
    voiceover: false,
    whyReasons: [
      'ASMR 트렌드와 일치하여 조회수 폭발',
      '30초 짧은 포맷이 완주율 92% 달성',
      '저녁 시간대(20:00)가 릴렉스 시청에 적합',
    ],
    improvements: [
      '매장 정보 CTA 강화로 전환 필요',
      '시리즈화로 구독자 확보 권장',
    ],
  },
  {
    id: 'ac-12',
    type: 'sns',
    title: '페이스북 - 주말 이벤트 공지',
    channel: '페이스북',
    publishedAt: '2024-02-27',
    publishedTime: '09:00',
    views: 432,
    clicks: 28,
    inquiries: 5,
    reservations: 3,
    conversionRate: 1.16,
    tags: ['이벤트', '주말', '할인'],
    status: 'published',
    cta: 'visit',
    hashtagStyle: 'minimal',
    useEmoji: true,
    whyReasons: [
      '이벤트/할인 정보가 즉시 액션 유도',
      '방문 CTA가 오프라인 전환에 효과적',
    ],
    improvements: [
      '인스타그램 동시 게시로 도달 확대',
      '이벤트 기간 명시로 긴급성 강화 필요',
    ],
  },
  {
    id: 'ac-13',
    type: 'blog',
    title: '연남동 카페 메뉴판 전체 공개 | 가격 정보',
    channel: '네이버블로그',
    publishedAt: '2024-02-25',
    publishedTime: '14:00',
    views: 1567,
    clicks: 112,
    inquiries: 8,
    reservations: 4,
    conversionRate: 0.51,
    tags: ['메뉴판', '가격', '연남동'],
    status: 'published',
    cta: 'call',
    wordCount: 800,
    hasFaq: false,
    whyReasons: [
      '가격 정보 키워드가 구매 의도 높은 검색 유입',
      '실용적 정보로 저장/공유 높음',
    ],
    improvements: [
      '예약 CTA로 변경 시 전환 예상 +25%',
      'FAQ 추가로 검색 노출 강화 필요',
    ],
  },
  {
    id: 'ac-14',
    type: 'shorts',
    title: '카페 알바생의 하루 브이로그',
    channel: '유튜브',
    publishedAt: '2024-02-23',
    publishedTime: '17:00',
    views: 3456,
    clicks: 156,
    inquiries: 4,
    reservations: 2,
    conversionRate: 0.12,
    tags: ['브이로그', '알바', '카페'],
    status: 'published',
    cta: 'link',
    duration: 60,
    subtitles: '표준',
    voiceover: true,
    whyReasons: [
      '브이로그 형식이 젊은 층에 인기',
      '음성 내레이션으로 친근감 상승',
      '저녁 시간대(17:00)가 퇴근길 시청에 적합',
    ],
    improvements: [
      '채용 CTA 추가로 다각도 활용 가능',
      '시리즈화로 팬덤 형성 권장',
    ],
  },
  {
    id: 'ac-15',
    type: 'sns',
    title: '인스타 스토리 - 오늘의 추천 메뉴',
    channel: '인스타그램',
    publishedAt: '2024-02-22',
    publishedTime: '12:00',
    views: 654,
    clicks: 34,
    inquiries: 6,
    reservations: 3,
    conversionRate: 0.92,
    tags: ['추천메뉴', '점심', '라떼'],
    status: 'published',
    cta: 'dm',
    hashtagStyle: 'standard',
    useEmoji: true,
    whyReasons: [
      '점심시간(12:00) 발행이 식사 타겟에 적합',
      '스토리 형식이 즉시성 강조',
      'DM CTA가 빠른 문의 유도',
    ],
    improvements: [
      '하이라이트 저장으로 지속 노출 필요',
      '설문 스티커 추가로 인터랙션 강화 권장',
    ],
  },
  {
    id: 'ac-16',
    type: 'blog',
    title: '연남동 카페 좌석 안내 | 2층 창가석 예약 팁',
    channel: '네이버블로그',
    publishedAt: '2024-02-20',
    publishedTime: '10:00',
    views: 2189,
    clicks: 178,
    inquiries: 14,
    reservations: 10,
    conversionRate: 0.64,
    tags: ['창가석', '예약', '좌석'],
    status: 'published',
    cta: 'reservation',
    wordCount: 1000,
    hasFaq: true,
    whyReasons: [
      '"예약 팁" 키워드가 액션 의도 높은 검색 유입',
      '좌석 정보가 실용적 가치 제공',
      'FAQ로 예약 관련 질문 해결',
    ],
    improvements: [
      '실시간 좌석 현황 연동 시 전환 극대화 가능',
      '사진 추가로 좌석 매력 강화 필요',
    ],
  },
  {
    id: 'ac-17',
    type: 'shorts',
    title: '카페 사장님이 추천하는 커피 조합',
    channel: '유튜브',
    publishedAt: '2024-02-18',
    publishedTime: '11:00',
    views: 5678,
    clicks: 267,
    inquiries: 7,
    reservations: 4,
    conversionRate: 0.12,
    tags: ['커피조합', '사장님추천', '꿀조합'],
    status: 'published',
    cta: 'link',
    duration: 45,
    subtitles: '강조',
    voiceover: true,
    whyReasons: [
      '"사장님 추천" 권위가 신뢰도 상승',
      '꿀조합 트렌드 키워드 활용',
      '강조 자막이 핵심 정보 전달에 효과적',
    ],
    improvements: [
      '메뉴 가격 정보 추가로 구매 의도 자극',
      '매장 방문 CTA 강화 필요',
    ],
  },
  {
    id: 'ac-18',
    type: 'sns',
    title: '네이버플레이스 - 신메뉴 소개',
    channel: '네이버',
    publishedAt: '2024-02-15',
    publishedTime: '15:00',
    views: 876,
    clicks: 67,
    inquiries: 9,
    reservations: 6,
    conversionRate: 1.03,
    tags: ['신메뉴', '플레이스', '소개'],
    status: 'published',
    cta: 'reservation',
    hashtagStyle: 'minimal',
    useEmoji: false,
    whyReasons: [
      '네이버플레이스가 지역 검색 노출에 효과적',
      '예약 CTA가 플레이스 내 즉시 전환 유도',
    ],
    improvements: [
      '이모지 추가로 친근감 상승 필요',
      '정기 업데이트로 활성도 유지 권장',
    ],
  },
  {
    id: 'ac-19',
    type: 'blog',
    title: '연남동 카페 영업시간 & 휴무일 안내',
    channel: '네이버블로그',
    publishedAt: '2024-02-12',
    publishedTime: '09:00',
    views: 1234,
    clicks: 89,
    inquiries: 5,
    reservations: 2,
    conversionRate: 0.41,
    tags: ['영업시간', '휴무일', '안내'],
    status: 'published',
    cta: 'call',
    wordCount: 600,
    hasFaq: true,
    whyReasons: [
      '실용 정보가 지속적 검색 유입',
      'FAQ로 자주 묻는 질문 해결',
    ],
    improvements: [
      '예약 CTA 추가로 전환 강화 필요',
      '계절별 영업시간 업데이트 권장',
    ],
  },
  {
    id: 'ac-20',
    type: 'shorts',
    title: '비 오는 날 카페 분위기',
    channel: '유튜브',
    publishedAt: '2024-02-10',
    publishedTime: '19:00',
    views: 4321,
    clicks: 189,
    inquiries: 3,
    reservations: 1,
    conversionRate: 0.07,
    tags: ['비오는날', '분위기', '감성'],
    status: 'published',
    cta: 'link',
    duration: 30,
    subtitles: '표준',
    voiceover: false,
    whyReasons: [
      '감성 콘텐츠가 저장/공유 높음',
      '30초 포맷이 완주율 극대화',
      '저녁 시간대(19:00)가 감성 시청에 적합',
    ],
    improvements: [
      '방문 CTA 강화로 전환 필요',
      '시리즈화로 브랜드 이미지 구축 권장',
    ],
  },
];

// Channel performance data
const channelPerformance = [
  { channel: '네이버블로그', views: 15615, clicks: 1209, inquiries: 95, reservations: 58, published: 8, change: 18 },
  { channel: '유튜브', views: 35291, clicks: 1434, inquiries: 35, reservations: 19, published: 8, change: 32 },
  { channel: '인스타그램', views: 2897, clicks: 177, inquiries: 24, reservations: 12, published: 4, change: -5 },
  { channel: '기타', views: 1851, clicks: 127, inquiries: 18, reservations: 10, published: 3, change: 8 },
];

// Keyword factor data
const keywordFactors = {
  top: [
    { keyword: '연남동', count: 12, inTop10: 8, evidence: 'TOP 10 중 8개 포함' },
    { keyword: '시그니처라떼', count: 8, inTop10: 6, evidence: 'TOP 10 중 6개 포함' },
    { keyword: '창가석', count: 6, inTop10: 5, evidence: 'TOP 10 중 5개 포함' },
    { keyword: '데이트', count: 5, inTop10: 4, evidence: 'TOP 10 중 4개 포함' },
  ],
  bottom: [
    { keyword: '가격', count: 3, inBottom: 2, evidence: '하위 콘텐츠에 자주 등장' },
    { keyword: '주차', count: 2, inBottom: 2, evidence: '부정적 언급 다수' },
  ],
};

// Time factor data
const timeFactors = [
  { time: '08:00', avgViews: 987, change: -12 },
  { time: '09:00', avgViews: 1234, change: -5 },
  { time: '10:00', avgViews: 2518, change: 18 },
  { time: '11:00', avgViews: 2890, change: 22 },
  { time: '12:00', avgViews: 1567, change: 5 },
  { time: '14:00', avgViews: 2847, change: 15 },
  { time: '15:00', avgViews: 1823, change: 3 },
  { time: '16:00', avgViews: 1567, change: -2 },
  { time: '17:00', avgViews: 3456, change: 28 },
  { time: '18:30', avgViews: 1256, change: 8 },
  { time: '19:00', avgViews: 4321, change: 35 },
  { time: '20:00', avgViews: 8923, change: 85 },
];

// CTA factor data
const ctaFactors = [
  { cta: '예약 링크', inquiries: 89, conversionRate: 0.62, change: 23 },
  { cta: 'DM', inquiries: 24, conversionRate: 0.87, change: 15 },
  { cta: '전화', inquiries: 13, conversionRate: 0.48, change: -5 },
  { cta: '링크', inquiries: 31, conversionRate: 0.12, change: -18 },
  { cta: '방문', inquiries: 8, conversionRate: 0.95, change: 8 },
];

// Format factor data
const formatFactors = {
  shorts: {
    duration: [
      { value: '30초', avgViews: 6622, avgConversion: 0.05 },
      { value: '45초', avgViews: 5956, avgConversion: 0.10 },
      { value: '60초', avgViews: 3378, avgConversion: 0.19 },
    ],
    subtitles: [
      { value: '없음', avgViews: 3789, avgConversion: 0.12 },
      { value: '표준', avgViews: 3945, avgConversion: 0.15 },
      { value: '강조', avgViews: 5685, avgConversion: 0.18 },
    ],
    voiceover: [
      { value: 'ON', avgViews: 4456, avgConversion: 0.15 },
      { value: 'OFF', avgViews: 5412, avgConversion: 0.11 },
    ],
  },
  blog: {
    wordCount: [
      { value: '800자', avgViews: 1400, avgConversion: 0.46 },
      { value: '1200자', avgViews: 2190, avgConversion: 0.63 },
      { value: '2000자', avgViews: 3421, avgConversion: 0.64 },
    ],
    hasFaq: [
      { value: '포함', avgViews: 2445, avgConversion: 0.61 },
      { value: '미포함', avgViews: 1695, avgConversion: 0.52 },
    ],
  },
  sns: {
    hashtagStyle: [
      { value: '최소', avgViews: 617, avgConversion: 0.90 },
      { value: '표준', avgViews: 956, avgConversion: 0.76 },
      { value: '많이', avgViews: 987, avgConversion: 0.30 },
    ],
    useEmoji: [
      { value: 'ON', avgViews: 798, avgConversion: 0.95 },
      { value: 'OFF', avgViews: 932, avgConversion: 0.67 },
    ],
  },
};

// Recommendations with evidence
const recommendations = [
  { 
    type: 'keyword', 
    value: '연남동브런치', 
    reason: 'TOP 콘텐츠에서 반복 등장 (6/10)',
    evidence: '상위 10개 콘텐츠 중 6개에서 "연남동" 키워드 사용' 
  },
  { 
    type: 'timing', 
    value: '오전 10-11시 / 저녁 19-20시', 
    reason: '이 시간대 평균 조회 +35%',
    evidence: '오전 10시 게시물 평균 조회수 2,518회, 저녁 19-20시 평균 6,622회' 
  },
  { 
    type: 'cta', 
    value: '예약 링크', 
    reason: '문의 전환율 +23%',
    evidence: '예약 링크 CTA 사용 시 전환율 0.62%, 일반 링크 대비 +23%' 
  },
  { 
    type: 'format', 
    value: '30-45초 쇼츠 + 강조 자막', 
    reason: '조회수 최고 조합',
    evidence: '30초 쇼츠 평균 조회 6,622회, 강조 자막 시 전환율 +50%' 
  },
];

export default function Analytics() {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const store = sampleStores.find((s) => s.id === storeId) || sampleStores[0];

  // Filter states
  const [period, setPeriod] = useState("30d");
  const [channel, setChannel] = useState("all");
  const [contentType, setContentType] = useState("all");
  const [kpiMetric, setKpiMetric] = useState("views");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("views");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // UI states
  const [selectedContent, setSelectedContent] = useState<AnalyticsContent | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [inputModalOpen, setInputModalOpen] = useState(false);
  const [factorTab, setFactorTab] = useState("keyword");

  // Filter contents
  const filteredContents = sampleAnalyticsContents
    .filter(c => {
      if (channel !== "all" && !c.channel.includes(channel === "blog" ? "블로그" : channel === "youtube" ? "유튜브" : channel === "instagram" ? "인스타" : "")) return false;
      if (contentType !== "all" && c.type !== contentType) return false;
      if (searchQuery && !c.title.toLowerCase().includes(searchQuery.toLowerCase()) && !c.tags.some(t => t.includes(searchQuery))) return false;
      return true;
    })
    .sort((a, b) => {
      const aVal = sortBy === "views" ? a.views : sortBy === "inquiries" ? a.inquiries : a.conversionRate;
      const bVal = sortBy === "views" ? b.views : sortBy === "inquiries" ? b.inquiries : b.conversionRate;
      return sortOrder === "desc" ? bVal - aVal : aVal - bVal;
    });

  // Calculate totals
  const totalViews = sampleAnalyticsContents.reduce((sum, c) => sum + c.views, 0);
  const totalInquiries = sampleAnalyticsContents.reduce((sum, c) => sum + c.inquiries, 0);
  const totalReservations = sampleAnalyticsContents.reduce((sum, c) => sum + c.reservations, 0);
  const avgConversion = (totalInquiries / totalViews * 100).toFixed(2);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "blog": return <FileText className="w-4 h-4" />;
      case "shorts": return <Video className="w-4 h-4" />;
      case "sns": return <Share2 className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getChannelBadge = (channel: string) => {
    if (channel.includes("네이버")) return "bg-green-100 text-green-800";
    if (channel.includes("유튜브")) return "bg-red-100 text-red-800";
    if (channel.includes("인스타")) return "bg-pink-100 text-pink-800";
    if (channel.includes("스레드")) return "bg-purple-100 text-purple-800";
    if (channel.includes("페이스북")) return "bg-blue-100 text-blue-800";
    return "bg-muted text-muted-foreground";
  };

  const openContentDrawer = (content: AnalyticsContent) => {
    setSelectedContent(content);
    setDrawerOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Content Detail Drawer */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>콘텐츠 상세 분석</SheetTitle>
            <SheetDescription>성과 원인과 개선 제안을 확인하세요</SheetDescription>
          </SheetHeader>
          {selectedContent && (
            <div className="mt-6 space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={getChannelBadge(selectedContent.channel)}>
                    {selectedContent.channel}
                  </Badge>
                  <Badge variant="outline">{selectedContent.type}</Badge>
                </div>
                <h3 className="font-semibold text-lg">{selectedContent.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedContent.publishedAt} {selectedContent.publishedTime} 발행
                </p>
              </div>

              {/* KPI Summary */}
              <div className="grid grid-cols-4 gap-3">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-xl font-bold">{selectedContent.views.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">조회</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-xl font-bold">{selectedContent.clicks}</p>
                  <p className="text-xs text-muted-foreground">클릭</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-xl font-bold">{selectedContent.inquiries}</p>
                  <p className="text-xs text-muted-foreground">문의</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-xl font-bold">{selectedContent.conversionRate.toFixed(2)}%</p>
                  <p className="text-xs text-muted-foreground">전환율</p>
                </div>
              </div>

              {/* Tags & Options */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">사용된 태그/키워드</Label>
                <div className="flex flex-wrap gap-2">
                  {selectedContent.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary">#{tag}</Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline">CTA: {
                    selectedContent.cta === 'reservation' ? '예약 링크' :
                    selectedContent.cta === 'call' ? '전화' :
                    selectedContent.cta === 'dm' ? 'DM' :
                    selectedContent.cta === 'visit' ? '방문' : '링크'
                  }</Badge>
                  {selectedContent.type === 'shorts' && (
                    <>
                      <Badge variant="outline">{selectedContent.duration}초</Badge>
                      <Badge variant="outline">자막: {selectedContent.subtitles}</Badge>
                      <Badge variant="outline">음성: {selectedContent.voiceover ? 'ON' : 'OFF'}</Badge>
                    </>
                  )}
                  {selectedContent.type === 'blog' && (
                    <>
                      <Badge variant="outline">{selectedContent.wordCount}자</Badge>
                      <Badge variant="outline">FAQ: {selectedContent.hasFaq ? '포함' : '미포함'}</Badge>
                    </>
                  )}
                  {selectedContent.type === 'sns' && (
                    <>
                      <Badge variant="outline">해시태그: {selectedContent.hashtagStyle}</Badge>
                      <Badge variant="outline">이모지: {selectedContent.useEmoji ? 'ON' : 'OFF'}</Badge>
                    </>
                  )}
                </div>
              </div>

              {/* Why it worked */}
              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <h4 className="font-semibold flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-green-600" />
                  왜 먹혔나 (자동 분석)
                </h4>
                <ul className="space-y-2">
                  {selectedContent.whyReasons.map((reason, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <div className="w-5 h-5 rounded-full bg-green-200 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-xs text-green-800 font-bold">{idx + 1}</span>
                      </div>
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Improvements */}
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <h4 className="font-semibold flex items-center gap-2 mb-3">
                  <Lightbulb className="w-4 h-4 text-blue-600" />
                  개선 제안 (A/B 테스트 아이디어)
                </h4>
                <ul className="space-y-2">
                  {selectedContent.improvements.map((imp, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <ChevronRight className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      {imp}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t">
                <Button 
                  className="flex-1"
                  onClick={() => navigate(`/app/${storeId}/content`)}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  변형 생성 (A/B)
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => navigate(`/app/${storeId}/publish`)}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  예약에 추가
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Performance Input Modal */}
      <Dialog open={inputModalOpen} onOpenChange={setInputModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>성과 수동 입력</DialogTitle>
            <DialogDescription>
              채널에서 확인한 성과 데이터를 직접 입력하세요
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>조회수</Label>
                <Input type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label>클릭수</Label>
                <Input type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label>문의수</Label>
                <Input type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label>예약수</Label>
                <Input type="number" placeholder="0" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              * 자동 수집 연동은 추후 지원 예정입니다
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInputModalOpen(false)}>취소</Button>
            <Button onClick={() => setInputModalOpen(false)}>저장</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">성과분석</h1>
          <p className="text-muted-foreground">
            무엇이 먹혔는지, 왜 먹혔는지 분석하고 다음 전략을 세우세요
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-xs">
            <AlertCircle className="w-3 h-3 mr-1" />
            데이터: 수동 입력
          </Badge>
          <Button variant="outline" size="sm" onClick={() => setInputModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            성과 입력
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-32">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">최근 7일</SelectItem>
              <SelectItem value="30d">최근 30일</SelectItem>
              <SelectItem value="90d">최근 90일</SelectItem>
              <SelectItem value="custom">직접 선택</SelectItem>
            </SelectContent>
          </Select>

          <Select value={channel} onValueChange={setChannel}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="채널" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 채널</SelectItem>
              <SelectItem value="blog">블로그</SelectItem>
              <SelectItem value="youtube">유튜브</SelectItem>
              <SelectItem value="instagram">인스타그램</SelectItem>
              <SelectItem value="other">기타</SelectItem>
            </SelectContent>
          </Select>

          <Select value={contentType} onValueChange={setContentType}>
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

          <Select value={kpiMetric} onValueChange={setKpiMetric}>
            <SelectTrigger className="w-32">
              <Target className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="views">조회수</SelectItem>
              <SelectItem value="clicks">클릭수</SelectItem>
              <SelectItem value="inquiries">문의수</SelectItem>
              <SelectItem value="reservations">예약수</SelectItem>
              <SelectItem value="conversion">전환율</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex-1" />

          <Badge variant="secondary" className="px-3 py-1.5">
            현재 범위: {period === "7d" ? "최근 7일" : period === "30d" ? "최근 30일" : "최근 90일"} · {filteredContents.length}건
          </Badge>
        </div>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <Eye className="w-5 h-5 text-blue-600" />
            </div>
            <Badge variant="secondary" className="text-xs text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />+18%
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-1">총 조회수</p>
          <p className="text-2xl font-bold">{totalViews.toLocaleString()}</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-green-600" />
            </div>
            <Badge variant="secondary" className="text-xs text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />+12%
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-1">총 문의/예약</p>
          <p className="text-2xl font-bold">{totalInquiries + totalReservations}</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">발행 콘텐츠</p>
          <p className="text-2xl font-bold">{sampleAnalyticsContents.length}</p>
          <p className="text-xs text-muted-foreground mt-1">예약 대기: 3건</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>전환율 = 문의 ÷ 조회 × 100</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-sm text-muted-foreground mb-1">평균 전환율</p>
          <p className="text-2xl font-bold">{avgConversion}%</p>
          <p className="text-xs text-green-600 mt-1">업계 평균 대비 +0.15%</p>
        </Card>
      </div>

      {/* Section 1: Channel Performance Comparison */}
      <Card>
        <div className="p-5 border-b border-border">
          <h3 className="font-bold flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            채널별 성과 비교
          </h3>
          <p className="text-sm text-muted-foreground mt-1">어떤 채널이 가장 효과적인지 한눈에 비교하세요</p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>채널</TableHead>
              <TableHead className="text-right">조회수</TableHead>
              <TableHead className="text-right">클릭</TableHead>
              <TableHead className="text-right">문의</TableHead>
              <TableHead className="text-right">예약</TableHead>
              <TableHead className="text-right">
                전환율
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="w-3 h-3 ml-1 inline" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>문의 ÷ 조회 × 100</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableHead>
              <TableHead className="text-right">발행</TableHead>
              <TableHead className="text-right">변화</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {channelPerformance.map((ch) => (
              <TableRow 
                key={ch.channel} 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => setChannel(ch.channel.includes("블로그") ? "blog" : ch.channel.includes("유튜브") ? "youtube" : ch.channel.includes("인스타") ? "instagram" : "other")}
              >
                <TableCell>
                  <Badge className={getChannelBadge(ch.channel)}>{ch.channel}</Badge>
                </TableCell>
                <TableCell className="text-right font-medium">{ch.views.toLocaleString()}</TableCell>
                <TableCell className="text-right">{ch.clicks.toLocaleString()}</TableCell>
                <TableCell className="text-right">{ch.inquiries}</TableCell>
                <TableCell className="text-right">{ch.reservations}</TableCell>
                <TableCell className="text-right">
                  <Badge variant="secondary">{((ch.inquiries / ch.views) * 100).toFixed(2)}%</Badge>
                </TableCell>
                <TableCell className="text-right">{ch.published}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={ch.change >= 0 ? "default" : "destructive"} className="text-xs">
                    {ch.change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {ch.change >= 0 ? "+" : ""}{ch.change}%
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Section 2: Content Performance Ranking */}
      <Card>
        <div className="p-5 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold flex items-center gap-2">
                콘텐츠별 성과 랭킹
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                행을 클릭하면 "왜 먹혔는지" 상세 분석을 볼 수 있어요
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="제목/태그 검색..."
                  className="pl-9 w-48"
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-28">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="views">조회순</SelectItem>
                  <SelectItem value="inquiries">문의순</SelectItem>
                  <SelectItem value="conversionRate">전환율순</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Top 3 Summary */}
        <div className="p-5 bg-gradient-to-r from-primary/5 to-transparent border-b border-border">
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            TOP 3 콘텐츠 요약
          </h4>
          <div className="grid md:grid-cols-3 gap-4">
            {filteredContents.slice(0, 3).map((content, idx) => (
              <div 
                key={content.id} 
                className="p-3 bg-background rounded-lg border cursor-pointer hover:border-primary transition-colors"
                onClick={() => openContentDrawer(content)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="text-xs">{idx + 1}위</Badge>
                  <Badge variant="outline" className="text-xs">{content.type}</Badge>
                </div>
                <p className="font-medium text-sm line-clamp-1 mb-2">{content.title}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <span>조회 {content.views.toLocaleString()}</span>
                  <span>·</span>
                  <span>문의 {content.inquiries}</span>
                </div>
                <div className="space-y-1">
                  {content.whyReasons.slice(0, 2).map((reason, ridx) => (
                    <p key={ridx} className="text-xs text-green-700 flex items-center gap-1">
                      <ChevronRight className="w-3 h-3" />
                      {reason.length > 35 ? reason.slice(0, 35) + "..." : reason}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">타입</TableHead>
              <TableHead>제목</TableHead>
              <TableHead>채널</TableHead>
              <TableHead>발행</TableHead>
              <TableHead className="text-right">조회</TableHead>
              <TableHead className="text-right">문의</TableHead>
              <TableHead className="text-right">전환율</TableHead>
              <TableHead>태그</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContents.map((content) => (
              <TableRow 
                key={content.id} 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => openContentDrawer(content)}
              >
                <TableCell>{getTypeIcon(content.type)}</TableCell>
                <TableCell className="font-medium max-w-xs">
                  <span className="line-clamp-1">{content.title}</span>
                </TableCell>
                <TableCell>
                  <Badge className={cn("text-xs", getChannelBadge(content.channel))}>
                    {content.channel}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {content.publishedAt}<br/>
                  <span className="text-xs">{content.publishedTime}</span>
                </TableCell>
                <TableCell className="text-right font-medium">{content.views.toLocaleString()}</TableCell>
                <TableCell className="text-right">{content.inquiries}</TableCell>
                <TableCell className="text-right">
                  <Badge variant="secondary">{content.conversionRate.toFixed(2)}%</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {content.tags.slice(0, 2).map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">#{tag}</Badge>
                    ))}
                    {content.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">+{content.tags.length - 2}</Badge>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Section 3: Why Analysis Panels */}
      <Card>
        <div className="p-5 border-b border-border">
          <h3 className="font-bold flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            왜 먹혔나 — 요인 분석
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            성과 상위 콘텐츠에서 반복된 패턴을 분석합니다
          </p>
        </div>

        <Tabs value={factorTab} onValueChange={setFactorTab} className="p-5">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="keyword">
              <Hash className="w-4 h-4 mr-2" />
              키워드/태그
            </TabsTrigger>
            <TabsTrigger value="time">
              <Clock className="w-4 h-4 mr-2" />
              시간/요일
            </TabsTrigger>
            <TabsTrigger value="cta">
              <MousePointer className="w-4 h-4 mr-2" />
              CTA
            </TabsTrigger>
            <TabsTrigger value="format">
              <BarChart3 className="w-4 h-4 mr-2" />
              포맷
            </TabsTrigger>
          </TabsList>

          {/* Keyword Factor */}
          <TabsContent value="keyword" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <h4 className="font-semibold text-green-800 mb-3">🔥 성과 상위 키워드</h4>
                <div className="space-y-3">
                  {keywordFactors.top.map((kw) => (
                    <div key={kw.keyword} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">#{kw.keyword}</Badge>
                        <span className="text-sm text-muted-foreground">{kw.count}회</span>
                      </div>
                      <span className="text-xs text-green-700 font-medium">{kw.evidence}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                <h4 className="font-semibold text-red-800 mb-3">⚠️ 성과 하위 키워드</h4>
                <div className="space-y-3">
                  {keywordFactors.bottom.map((kw) => (
                    <div key={kw.keyword} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="destructive">#{kw.keyword}</Badge>
                        <span className="text-sm text-muted-foreground">{kw.count}회</span>
                      </div>
                      <span className="text-xs text-red-700 font-medium">{kw.evidence}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  * 이 키워드는 피하거나 긍정적 맥락으로 전환하세요
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Time Factor */}
          <TabsContent value="time" className="space-y-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeFactors}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="avgViews" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="평균 조회수" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm font-medium text-green-800">🌅 오전 10-11시</p>
                <p className="text-xs text-green-700 mt-1">평균 조회 2,704회 (+20%)</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm font-medium text-green-800">🌙 저녁 19-20시</p>
                <p className="text-xs text-green-700 mt-1">평균 조회 6,622회 (+60%)</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium">📅 요일별</p>
                <p className="text-xs text-muted-foreground mt-1">금-토요일 성과 +25% 높음</p>
              </div>
            </div>
          </TabsContent>

          {/* CTA Factor */}
          <TabsContent value="cta" className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>CTA 유형</TableHead>
                  <TableHead className="text-right">문의 수</TableHead>
                  <TableHead className="text-right">전환율</TableHead>
                  <TableHead className="text-right">변화율</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ctaFactors.map((cta) => (
                  <TableRow key={cta.cta}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {cta.cta === '예약 링크' && <LinkIcon className="w-4 h-4" />}
                        {cta.cta === 'DM' && <MessageSquare className="w-4 h-4" />}
                        {cta.cta === '전화' && <Phone className="w-4 h-4" />}
                        {cta.cta === '링크' && <ExternalLink className="w-4 h-4" />}
                        {cta.cta === '방문' && <Target className="w-4 h-4" />}
                        <span className="font-medium">{cta.cta}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{cta.inquiries}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary">{(cta.conversionRate * 100).toFixed(0)}%</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={cta.change >= 0 ? "default" : "destructive"}>
                        {cta.change >= 0 ? "+" : ""}{cta.change}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p className="text-sm text-green-700 p-3 bg-green-50 rounded-lg">
              💡 <strong>예약 링크 CTA</strong>가 문의 전환에 가장 효과적입니다 (+23%)
            </p>
          </TabsContent>

          {/* Format Factor */}
          <TabsContent value="format" className="space-y-4">
            <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
              💡 콘텐츠 옵션값이 입력된 경우에만 분석이 가능합니다
            </p>
            
            <Accordion type="single" collapsible className="space-y-2">
              <AccordionItem value="shorts" className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4" />
                    <span className="font-medium">쇼츠 옵션별 성과</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4 space-y-4">
                  <div>
                    <Label className="text-sm mb-2 block">영상 길이</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {formatFactors.shorts.duration.map((d) => (
                        <div key={d.value} className="p-3 bg-muted rounded-lg text-center">
                          <p className="font-bold">{d.value}</p>
                          <p className="text-xs text-muted-foreground">조회 {d.avgViews.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">전환 {(d.avgConversion * 100).toFixed(1)}%</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm mb-2 block">자막 스타일</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {formatFactors.shorts.subtitles.map((s) => (
                        <div key={s.value} className={cn(
                          "p-3 rounded-lg text-center",
                          s.value === '강조' ? "bg-green-50 border border-green-200" : "bg-muted"
                        )}>
                          <p className="font-bold">{s.value}</p>
                          <p className="text-xs text-muted-foreground">조회 {s.avgViews.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">전환 {(s.avgConversion * 100).toFixed(1)}%</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="blog" className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span className="font-medium">블로그 옵션별 성과</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4 space-y-4">
                  <div>
                    <Label className="text-sm mb-2 block">분량</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {formatFactors.blog.wordCount.map((w) => (
                        <div key={w.value} className={cn(
                          "p-3 rounded-lg text-center",
                          w.value === '2000자' ? "bg-green-50 border border-green-200" : "bg-muted"
                        )}>
                          <p className="font-bold">{w.value}</p>
                          <p className="text-xs text-muted-foreground">조회 {w.avgViews.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">전환 {(w.avgConversion * 100).toFixed(1)}%</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm mb-2 block">FAQ 포함 여부</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {formatFactors.blog.hasFaq.map((f) => (
                        <div key={f.value} className={cn(
                          "p-3 rounded-lg text-center",
                          f.value === '포함' ? "bg-green-50 border border-green-200" : "bg-muted"
                        )}>
                          <p className="font-bold">{f.value}</p>
                          <p className="text-xs text-muted-foreground">조회 {f.avgViews.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">전환 {(f.avgConversion * 100).toFixed(1)}%</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="sns" className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    <span className="font-medium">SNS 옵션별 성과</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4 space-y-4">
                  <div>
                    <Label className="text-sm mb-2 block">해시태그 스타일</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {formatFactors.sns.hashtagStyle.map((h) => (
                        <div key={h.value} className="p-3 bg-muted rounded-lg text-center">
                          <p className="font-bold">{h.value}</p>
                          <p className="text-xs text-muted-foreground">조회 {h.avgViews.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">전환 {(h.avgConversion * 100).toFixed(1)}%</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm mb-2 block">이모지 사용</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {formatFactors.sns.useEmoji.map((e) => (
                        <div key={e.value} className={cn(
                          "p-3 rounded-lg text-center",
                          e.value === 'ON' ? "bg-green-50 border border-green-200" : "bg-muted"
                        )}>
                          <p className="font-bold">{e.value}</p>
                          <p className="text-xs text-muted-foreground">조회 {e.avgViews.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">전환 {(e.avgConversion * 100).toFixed(1)}%</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Recommendations with Evidence */}
      <Card className="p-5">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-primary" />
          다음 추천 — 근거 기반
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommendations.map((rec, idx) => (
            <div key={idx} className="p-4 bg-gradient-to-br from-primary/5 to-transparent rounded-xl border">
              <div className="flex items-center gap-2 mb-2">
                {rec.type === "keyword" && <Hash className="w-4 h-4 text-primary" />}
                {rec.type === "timing" && <Clock className="w-4 h-4 text-primary" />}
                {rec.type === "cta" && <MousePointer className="w-4 h-4 text-primary" />}
                {rec.type === "format" && <BarChart3 className="w-4 h-4 text-primary" />}
                <span className="text-sm font-medium">
                  {rec.type === "keyword" && "추천 키워드"}
                  {rec.type === "timing" && "추천 발행 시간"}
                  {rec.type === "cta" && "추천 CTA"}
                  {rec.type === "format" && "추천 포맷"}
                </span>
              </div>
              <p className="text-lg font-bold mb-1">{rec.value}</p>
              <p className="text-sm text-green-700 font-medium mb-2">{rec.reason}</p>
              <p className="text-xs text-muted-foreground">{rec.evidence}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
