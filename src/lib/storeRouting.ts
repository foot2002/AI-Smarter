/**
 * @deprecated 이 파일은 더 이상 사용되지 않습니다.
 * 대신 src/lib/routing/storeEntry.ts의 getSolutionEntryUrl()을 사용하세요.
 * 
 * 이 파일은 하위 호환성을 위해 유지되지만, 새로운 코드에서는 사용하지 마세요.
 */

import { listStores } from '@/lib/api/stores';
import { getSolutionEntryUrl as getEntryUrl } from './routing/storeEntry';
import { sampleStores } from '@/data/sampleData';

/**
 * 가게 개수에 따른 솔루션 진입점 URL 반환
 * 
 * @deprecated 비동기 함수로 변경되었습니다. getSolutionEntryUrlAsync()를 사용하세요.
 */
export function getSolutionEntryUrl(): string {
  // 하위 호환성을 위해 동기적으로 sampleData를 직접 참조
  // 새로운 코드에서는 getSolutionEntryUrlAsync()를 사용하세요
  return getEntryUrl(sampleStores);
}

/**
 * 가게 개수에 따른 솔루션 진입점 URL 반환 (비동기)
 * 
 * @returns 진입 경로 URL
 */
export async function getSolutionEntryUrlAsync(): Promise<string> {
  const stores = await listStores();
  return getEntryUrl(stores);
}

/**
 * 가게 개수 반환
 * 
 * @deprecated 비동기 함수로 변경되었습니다. getStoreCountAsync()를 사용하세요.
 */
export function getStoreCount(): number {
  return sampleStores.length;
}

/**
 * 가게 개수 반환 (비동기)
 * 
 * @returns 가게 개수
 */
export async function getStoreCountAsync(): Promise<number> {
  const stores = await listStores();
  return stores.length;
}
