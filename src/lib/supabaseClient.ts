/**
 * Supabase 클라이언트 설정
 * 
 * 환경 변수에서 Supabase URL과 Anon Key를 읽어 클라이언트를 초기화합니다.
 * 환경 변수가 없으면 콘솔에 경고를 출력하고 null을 반환합니다 (런타임 오류 방지).
 */

import { createClient, SupabaseClient as SupabaseClientType } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const appMode = import.meta.env.VITE_APP_MODE || 'demo';

// 환경 변수 검증
if (!supabaseUrl || !supabaseAnonKey) {
  if (appMode === 'prod') {
    console.warn(
      '[Supabase] prod 모드인데 환경 변수가 설정되지 않았습니다. ' +
      'VITE_SUPABASE_URL과 VITE_SUPABASE_ANON_KEY를 .env 파일에 설정하세요.'
    );
  } else {
    console.warn(
      '[Supabase] 환경 변수가 설정되지 않았습니다. ' +
      'VITE_SUPABASE_URL과 VITE_SUPABASE_ANON_KEY를 .env 파일에 설정하세요. ' +
      '현재는 demo 모드로 동작합니다.'
    );
  }
}

let supabaseClient: SupabaseClientType | null = null;

/**
 * Supabase 클라이언트 인스턴스 반환
 * 
 * - demo 모드: null 반환 (Supabase 사용 안 함)
 * - prod 모드: 환경 변수가 없으면 null 반환 + 경고
 * - 환경 변수가 있으면 클라이언트 초기화 및 반환
 */
export function getSupabaseClient(): SupabaseClientType | null {
  // demo 모드에서는 Supabase 사용 안 함
  if (appMode === 'demo') {
    return null;
  }

  // prod 모드에서 환경 변수가 없으면 null 반환
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  // 클라이언트 초기화 (싱글톤)
  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  }

  return supabaseClient;
}

/**
 * Supabase 연결 가능 여부 확인
 */
export function isSupabaseConfigured(): boolean {
  if (appMode === 'demo') {
    return false; // demo 모드에서는 Supabase 사용 안 함
  }
  return !!(supabaseUrl && supabaseAnonKey);
}
