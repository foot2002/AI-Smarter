/**
 * Insights API 서비스 레이어
 * 
 * 인사이트(피드백 분석) 관련 데이터를 가져오는 함수들입니다.
 * 현재는 demo 모드에서는 sampleData를 반환하고, prod 모드에서는 Supabase를 사용하도록 설계되어 있습니다.
 */

import { getSupabaseClient, isSupabaseConfigured } from '../supabaseClient';

const APP_MODE = import.meta.env.VITE_APP_MODE || 'demo';

/**
 * 인사이트 분석 실행
 * 
 * @param storeId 가게 ID
 * @param options 분석 옵션 (범위, 채널, 타입 등)
 */
export async function runInsightAnalysis(
  storeId: string,
  options?: {
    scope?: 'period' | 'channel' | 'type' | 'tag' | 'selected_ids';
    period?: { start: string; end: string };
    channel?: string;
    type?: 'review' | 'survey' | 'inquiry';
    tag?: string;
    selectedIds?: string[];
  }
): Promise<{
  strengths: string[];
  improvements: string[];
  actionPlan: string[];
}> {
  if (APP_MODE === 'demo' || !isSupabaseConfigured()) {
    // Demo 모드에서는 더미 데이터 반환
    return Promise.resolve({
      strengths: ['친절한 서비스', '좋은 분위기', '맛있는 메뉴'],
      improvements: ['주차 공간 확보', '음악 볼륨 조절'],
      actionPlan: [
        '주차 안내 표지판 설치',
        '음악 볼륨 조절 시스템 도입',
        '고객 피드백 수집 체계화',
      ],
    });
  }

  // TODO: 다음 단계에서 Supabase/서버 API 호출 구현
  // const supabase = getSupabaseClient();
  // if (!supabase) {
  //   throw new Error('Supabase client is not configured');
  // }
  // 
  // // 서버 API 호출 (Supabase Edge Function 또는 별도 서버)
  // const response = await fetch('/api/insights/analyze', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ storeId, ...options }),
  // });
  // if (!response.ok) throw new Error('Analysis failed');
  // return response.json();

  throw new Error('runInsightAnalysis is not implemented yet');
}

/**
 * 이전 인사이트 분석 결과 가져오기
 */
export async function getInsightResults(storeId: string): Promise<{
  strengths: string[];
  improvements: string[];
  actionPlan: string[];
  createdAt: string;
} | null> {
  if (APP_MODE === 'demo' || !isSupabaseConfigured()) {
    // Demo 모드에서는 더미 데이터 반환
    return Promise.resolve({
      strengths: ['친절한 서비스', '좋은 분위기', '맛있는 메뉴'],
      improvements: ['주차 공간 확보', '음악 볼륨 조절'],
      actionPlan: [
        '주차 안내 표지판 설치',
        '음악 볼륨 조절 시스템 도입',
        '고객 피드백 수집 체계화',
      ],
      createdAt: new Date().toISOString(),
    });
  }

  // TODO: 다음 단계에서 Supabase 쿼리 구현
  // const supabase = getSupabaseClient();
  // if (!supabase) {
  //   return null;
  // }
  // const { data, error } = await supabase
  //   .from('insight_runs')
  //   .select('*')
  //   .eq('store_id', storeId)
  //   .order('created_at', { ascending: false })
  //   .limit(1)
  //   .single();
  // if (error) return null;
  // return data;

  return null;
}
