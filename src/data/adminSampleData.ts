/**
 * Admin 콘솔용 샘플 데이터
 * 
 * 실제 DB 연동 시 이 데이터는 Supabase에서 가져오도록 교체됩니다.
 */

export interface User {
  id: string;
  email: string;
  createdAt: string;
  status: 'active' | 'suspended';
}

export interface AdminStore {
  id: string;
  name: string;
  category: string;
  ownerEmail: string;
  createdAt: string;
  status: 'active' | 'suspended';
}

export interface Subscription {
  storeId: string;
  planId: string;
  planName: string;
  renewAt: string;
  status: 'active' | 'trial' | 'canceled';
  trialEndsAt?: string;
}

export interface Credits {
  storeId: string;
  monthlyLimit: number;
  usedThisMonth: number;
  balance: number;
  isPaused: boolean;
}

export interface PlanCatalog {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  currency: 'KRW';
  monthlyCredits: number;
  features: {
    blog: boolean;
    shorts: boolean;
    sns: boolean;
    scheduling: boolean;
    analyticsPro: boolean;
    multiStore: boolean;
    team: boolean;
  };
  isVisible: boolean;
  isRecommended: boolean;
  sortOrder: number;
  descriptionLines: string[];
  isContactSales: boolean;
}

export interface UsageEvent {
  id: string;
  storeId: string;
  type: 'blog' | 'shorts' | 'sns';
  status: 'success' | 'fail';
  createdAt: string;
  tokens?: number;
  cost?: number;
}

export interface ErrorLog {
  id: string;
  storeId: string;
  route: string;
  message: string;
  createdAt: string;
}

export interface AdminNote {
  id: string;
  targetType: 'store' | 'user' | 'content';
  targetId: string;
  note: string;
  createdAt: string;
}

// 샘플 데이터
export const adminUsers: User[] = [
  { id: 'user-1', email: 'owner1@example.com', createdAt: '2024-01-15', status: 'active' },
  { id: 'user-2', email: 'owner2@example.com', createdAt: '2024-02-01', status: 'active' },
  { id: 'user-3', email: 'owner3@example.com', createdAt: '2024-02-10', status: 'active' },
  { id: 'user-4', email: 'owner4@example.com', createdAt: '2024-02-20', status: 'suspended' },
  { id: 'user-5', email: 'owner5@example.com', createdAt: '2024-03-01', status: 'active' },
];

export const adminStores: AdminStore[] = [
  { id: 'store-1', name: '따뜻한 오후 카페', category: '카페/음료', ownerEmail: 'owner1@example.com', createdAt: '2024-01-15', status: 'active' },
  { id: 'store-2', name: '스마트 영어학원', category: '교육/학원', ownerEmail: 'owner2@example.com', createdAt: '2024-02-01', status: 'active' },
  { id: 'store-3', name: '미용실 뷰티샵', category: '미용/뷰티', ownerEmail: 'owner3@example.com', createdAt: '2024-02-10', status: 'active' },
  { id: 'store-4', name: '피자 레스토랑', category: '음식점/레스토랑', ownerEmail: 'owner4@example.com', createdAt: '2024-02-20', status: 'suspended' },
  { id: 'store-5', name: '요가 스튜디오', category: '피트니스/헬스', ownerEmail: 'owner5@example.com', createdAt: '2024-03-01', status: 'active' },
  { id: 'store-6', name: '반려동물 카페', category: '반려동물', ownerEmail: 'owner1@example.com', createdAt: '2024-03-05', status: 'active' },
  { id: 'store-7', name: '꽃집 플라워샵', category: '꽃집/플라워', ownerEmail: 'owner2@example.com', createdAt: '2024-03-10', status: 'active' },
  { id: 'store-8', name: '의료 클리닉', category: '의료/병원', ownerEmail: 'owner3@example.com', createdAt: '2024-03-12', status: 'active' },
];

export const adminSubscriptions: Subscription[] = [
  { storeId: 'store-1', planId: 'plan-growth', planName: 'Growth', renewAt: '2024-04-15', status: 'active' },
  { storeId: 'store-2', planId: 'plan-pro', planName: 'Pro', renewAt: '2024-04-01', status: 'active' },
  { storeId: 'store-3', planId: 'plan-starter', planName: 'Starter', renewAt: '2024-04-10', status: 'active' },
  { storeId: 'store-4', planId: 'plan-starter', planName: 'Starter', renewAt: '2024-04-20', status: 'canceled' },
  { storeId: 'store-5', planId: 'plan-growth', planName: 'Growth', renewAt: '2024-04-01', status: 'trial', trialEndsAt: '2024-03-25' },
  { storeId: 'store-6', planId: 'plan-starter', planName: 'Starter', renewAt: '2024-04-05', status: 'active' },
  { storeId: 'store-7', planId: 'plan-starter', planName: 'Starter', renewAt: '2024-04-10', status: 'active' },
  { storeId: 'store-8', planId: 'plan-pro', planName: 'Pro', renewAt: '2024-04-12', status: 'active' },
];

export const adminCredits: Credits[] = [
  { storeId: 'store-1', monthlyLimit: 1000, usedThisMonth: 342, balance: 658, isPaused: false },
  { storeId: 'store-2', monthlyLimit: 5000, usedThisMonth: 2845, balance: 2155, isPaused: false },
  { storeId: 'store-3', monthlyLimit: 500, usedThisMonth: 123, balance: 377, isPaused: false },
  { storeId: 'store-4', monthlyLimit: 500, usedThisMonth: 0, balance: 0, isPaused: true },
  { storeId: 'store-5', monthlyLimit: 1000, usedThisMonth: 456, balance: 544, isPaused: false },
  { storeId: 'store-6', monthlyLimit: 500, usedThisMonth: 89, balance: 411, isPaused: false },
  { storeId: 'store-7', monthlyLimit: 500, usedThisMonth: 234, balance: 266, isPaused: false },
  { storeId: 'store-8', monthlyLimit: 5000, usedThisMonth: 3124, balance: 1876, isPaused: false },
];

export const planCatalog: PlanCatalog[] = [
  {
    id: 'plan-starter',
    name: 'Starter',
    monthlyPrice: 29000,
    yearlyPrice: 290000,
    currency: 'KRW',
    monthlyCredits: 500,
    features: {
      blog: true,
      shorts: true,
      sns: true,
      scheduling: false,
      analyticsPro: false,
      multiStore: false,
      team: false,
    },
    isVisible: true,
    isRecommended: false,
    sortOrder: 1,
    descriptionLines: [
      '소상공인을 위한 기본 플랜',
      '월 500 크레딧으로 시작하세요',
    ],
    isContactSales: false,
  },
  {
    id: 'plan-growth',
    name: 'Growth',
    monthlyPrice: 79000,
    yearlyPrice: 790000,
    currency: 'KRW',
    monthlyCredits: 1000,
    features: {
      blog: true,
      shorts: true,
      sns: true,
      scheduling: true,
      analyticsPro: false,
      multiStore: false,
      team: false,
    },
    isVisible: true,
    isRecommended: true,
    sortOrder: 2,
    descriptionLines: [
      '성장하는 비즈니스를 위한 플랜',
      '예약 기능과 월 1,000 크레딧 포함',
    ],
    isContactSales: false,
  },
  {
    id: 'plan-pro',
    name: 'Pro',
    monthlyPrice: 149000,
    yearlyPrice: 1490000,
    currency: 'KRW',
    monthlyCredits: 5000,
    features: {
      blog: true,
      shorts: true,
      sns: true,
      scheduling: true,
      analyticsPro: true,
      multiStore: true,
      team: false,
    },
    isVisible: true,
    isRecommended: false,
    sortOrder: 3,
    descriptionLines: [
      '전문가를 위한 고급 플랜',
      '고급 분석, 다매장 관리 포함',
    ],
    isContactSales: false,
  },
  {
    id: 'plan-enterprise',
    name: 'Enterprise',
    monthlyPrice: 0,
    yearlyPrice: 0,
    currency: 'KRW',
    monthlyCredits: 0,
    features: {
      blog: true,
      shorts: true,
      sns: true,
      scheduling: true,
      analyticsPro: true,
      multiStore: true,
      team: true,
    },
    isVisible: true,
    isRecommended: false,
    sortOrder: 4,
    descriptionLines: [
      '대규모 비즈니스를 위한 맞춤 플랜',
      '전담 지원 및 커스터마이징 가능',
    ],
    isContactSales: true,
  },
];

export const usageEvents: UsageEvent[] = [
  { id: 'usage-1', storeId: 'store-1', type: 'blog', status: 'success', createdAt: '2024-03-15T10:30:00', tokens: 1200, cost: 12 },
  { id: 'usage-2', storeId: 'store-1', type: 'shorts', status: 'success', createdAt: '2024-03-15T11:15:00', tokens: 800, cost: 8 },
  { id: 'usage-3', storeId: 'store-2', type: 'blog', status: 'success', createdAt: '2024-03-15T09:20:00', tokens: 1500, cost: 15 },
  { id: 'usage-4', storeId: 'store-2', type: 'sns', status: 'fail', createdAt: '2024-03-15T14:45:00', tokens: 0, cost: 0 },
  { id: 'usage-5', storeId: 'store-3', type: 'blog', status: 'success', createdAt: '2024-03-15T08:10:00', tokens: 900, cost: 9 },
  { id: 'usage-6', storeId: 'store-1', type: 'sns', status: 'success', createdAt: '2024-03-14T16:30:00', tokens: 600, cost: 6 },
  { id: 'usage-7', storeId: 'store-5', type: 'shorts', status: 'success', createdAt: '2024-03-14T13:20:00', tokens: 1100, cost: 11 },
  { id: 'usage-8', storeId: 'store-2', type: 'blog', status: 'success', createdAt: '2024-03-14T10:00:00', tokens: 1800, cost: 18 },
  { id: 'usage-9', storeId: 'store-4', type: 'blog', status: 'fail', createdAt: '2024-03-13T15:30:00', tokens: 0, cost: 0 },
  { id: 'usage-10', storeId: 'store-6', type: 'sns', status: 'success', createdAt: '2024-03-13T11:45:00', tokens: 500, cost: 5 },
  { id: 'usage-11', storeId: 'store-7', type: 'blog', status: 'success', createdAt: '2024-03-13T09:15:00', tokens: 1300, cost: 13 },
  { id: 'usage-12', storeId: 'store-8', type: 'shorts', status: 'success', createdAt: '2024-03-12T14:20:00', tokens: 2000, cost: 20 },
  { id: 'usage-13', storeId: 'store-1', type: 'blog', status: 'success', createdAt: '2024-03-12T10:30:00', tokens: 1400, cost: 14 },
  { id: 'usage-14', storeId: 'store-2', type: 'sns', status: 'success', createdAt: '2024-03-11T16:00:00', tokens: 700, cost: 7 },
  { id: 'usage-15', storeId: 'store-3', type: 'blog', status: 'fail', createdAt: '2024-03-11T12:30:00', tokens: 0, cost: 0 },
];

export const errorLogs: ErrorLog[] = [
  { id: 'error-1', storeId: 'store-2', route: '/app/store-2/content', message: 'LLM API timeout: Request exceeded 30s', createdAt: '2024-03-15T14:45:00' },
  { id: 'error-2', storeId: 'store-4', route: '/app/store-4/content', message: 'Insufficient credits: 0 remaining', createdAt: '2024-03-13T15:30:00' },
  { id: 'error-3', storeId: 'store-3', route: '/app/store-3/content', message: 'Invalid content type parameter', createdAt: '2024-03-11T12:30:00' },
  { id: 'error-4', storeId: 'store-1', route: '/app/store-1/insights', message: 'Database connection failed', createdAt: '2024-03-10T09:20:00' },
  { id: 'error-5', storeId: 'store-5', route: '/app/store-5/publish', message: 'Scheduling API rate limit exceeded', createdAt: '2024-03-09T14:15:00' },
  { id: 'error-6', storeId: 'store-2', route: '/app/store-2/analytics', message: 'Analytics data fetch timeout', createdAt: '2024-03-08T11:30:00' },
  { id: 'error-7', storeId: 'store-6', route: '/app/store-6/content', message: 'Media upload failed: File too large', createdAt: '2024-03-07T16:45:00' },
  { id: 'error-8', storeId: 'store-1', route: '/app/store-1/content', message: 'LLM API error: Invalid prompt format', createdAt: '2024-03-06T10:20:00' },
];

export const adminNotes: AdminNote[] = [
  { id: 'note-1', targetType: 'store', targetId: 'store-4', note: '결제 이슈로 인한 일시 정지. 고객 문의 대기 중.', createdAt: '2024-03-13T15:00:00' },
  { id: 'note-2', targetType: 'store', targetId: 'store-2', note: 'Pro 플랜 업그레이드 요청. 영업팀 연락 완료.', createdAt: '2024-03-10T11:00:00' },
  { id: 'note-3', targetType: 'user', targetId: 'user-4', note: '정책 위반으로 인한 계정 정지. 재심사 예정일: 2024-04-01', createdAt: '2024-02-25T09:00:00' },
];
