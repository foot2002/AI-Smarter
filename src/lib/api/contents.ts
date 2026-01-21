/**
 * Contents API 서비스 레이어
 * 
 * 콘텐츠(블로그/쇼츠/SNS) 관련 데이터를 가져오는 함수들입니다.
 * 현재는 demo 모드에서는 sampleData를 반환하고, prod 모드에서는 Supabase를 사용하도록 설계되어 있습니다.
 */

import { Content } from '@/data/sampleData';
import { sampleContents } from '@/data/sampleData';
import { getSupabaseClient, isSupabaseConfigured } from '../supabaseClient';

const APP_MODE = import.meta.env.VITE_APP_MODE || 'demo';

/**
 * 특정 가게의 콘텐츠 목록 가져오기
 */
export async function listContents(storeId: string): Promise<Content[]> {
  if (APP_MODE === 'demo' || !isSupabaseConfigured()) {
    // Demo 모드 또는 Supabase 미설정 시 sampleData 반환
    return Promise.resolve(
      sampleContents.filter((cnt) => cnt.storeId === storeId)
    );
  }

  // TODO: 다음 단계에서 Supabase 쿼리 구현
  // const supabase = getSupabaseClient();
  // if (!supabase) {
  //   return Promise.resolve(
  //     sampleContents.filter((cnt) => cnt.storeId === storeId)
  //   );
  // }
  // const { data, error } = await supabase
  //   .from('contents')
  //   .select('*')
  //   .eq('store_id', storeId)
  //   .order('created_at', { ascending: false });
  // if (error) throw error;
  // return data || [];

  return Promise.resolve(
    sampleContents.filter((cnt) => cnt.storeId === storeId)
  );
}

/**
 * 특정 콘텐츠 정보 가져오기
 */
export async function getContent(contentId: string): Promise<Content | null> {
  if (APP_MODE === 'demo' || !isSupabaseConfigured()) {
    const content = sampleContents.find((cnt) => cnt.id === contentId);
    return Promise.resolve(content || null);
  }

  // TODO: 다음 단계에서 Supabase 쿼리 구현
  // const supabase = getSupabaseClient();
  // if (!supabase) {
  //   const content = sampleContents.find((cnt) => cnt.id === contentId);
  //   return Promise.resolve(content || null);
  // }
  // const { data, error } = await supabase
  //   .from('contents')
  //   .select('*')
  //   .eq('id', contentId)
  //   .single();
  // if (error) throw error;
  // return data;

  const content = sampleContents.find((cnt) => cnt.id === contentId);
  return Promise.resolve(content || null);
}

/**
 * 콘텐츠 생성
 */
export async function createContent(contentData: Omit<Content, 'id' | 'createdAt'>): Promise<Content> {
  if (APP_MODE === 'demo' || !isSupabaseConfigured()) {
    // Demo 모드에서는 임시 ID 생성하여 반환 (실제 저장 안 함)
    const newContent: Content = {
      ...contentData,
      id: `cnt-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    return Promise.resolve(newContent);
  }

  // TODO: 다음 단계에서 Supabase insert 구현
  throw new Error('createContent is not implemented yet');
}

/**
 * 콘텐츠 업데이트
 */
export async function updateContent(contentId: string, updates: Partial<Content>): Promise<Content> {
  if (APP_MODE === 'demo' || !isSupabaseConfigured()) {
    // Demo 모드에서는 업데이트된 객체 반환 (실제 저장 안 함)
    const content = sampleContents.find((cnt) => cnt.id === contentId);
    if (!content) {
      throw new Error(`Content with id ${contentId} not found`);
    }
    return Promise.resolve({ ...content, ...updates });
  }

  // TODO: 다음 단계에서 Supabase update 구현
  throw new Error('updateContent is not implemented yet');
}
