/**
 * 가게 진입 라우팅 유틸리티
 * 
 * 가게 개수에 따른 솔루션 진입점 URL을 결정하는 순수 함수입니다.
 * 
 * 규칙:
 * - 0개: /app (빈 상태, UI에서 '새 가게 추가' 모달 오픈은 다음 단계)
 * - 1개: /app/:storeId/dashboard (바로 대시보드로 이동)
 * - 2개 이상: /app (가게 선택 화면)
 */

import { Store } from '@/data/sampleData';

/**
 * 가게 목록을 입력으로 받아 진입 경로를 반환하는 순수 함수
 * 
 * @param stores 가게 목록
 * @returns 진입 경로 URL
 */
export function getSolutionEntryUrl(stores: Store[]): string {
  const storeCount = stores.length;

  if (storeCount === 0) {
    return '/app'; // 빈 상태, 모달 자동 오픈은 UI에서 처리
  } else if (storeCount === 1) {
    return `/app/${stores[0].id}/dashboard`; // 바로 대시보드
  } else {
    return '/app'; // 가게 선택 화면
  }
}

/**
 * 가게 개수 반환
 * 
 * @param stores 가게 목록
 * @returns 가게 개수
 */
export function getStoreCount(stores: Store[]): number {
  return stores.length;
}
