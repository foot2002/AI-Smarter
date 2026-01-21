/**
 * Feedback API 서비스 레이어
 * 
 * 피드백(리뷰/설문/문의) 관련 데이터를 가져오는 함수들입니다.
 * 현재는 demo 모드에서는 sampleData를 반환하고, prod 모드에서는 Supabase를 사용하도록 설계되어 있습니다.
 */

import { Feedback } from '@/data/sampleData';
import { sampleFeedbacks } from '@/data/sampleData';
import { getSupabaseClient, isSupabaseConfigured } from '../supabaseClient';

const APP_MODE = import.meta.env.VITE_APP_MODE || 'demo';

/**
 * 특정 가게의 피드백 목록 가져오기
 */
export async function listFeedbacks(storeId: string): Promise<Feedback[]> {
  if (APP_MODE === 'demo' || !isSupabaseConfigured()) {
    // Demo 모드 또는 Supabase 미설정 시 sampleData 반환
    return Promise.resolve(
      sampleFeedbacks.filter((fb) => fb.storeId === storeId)
    );
  }

  // TODO: 다음 단계에서 Supabase 쿼리 구현
  // const supabase = getSupabaseClient();
  // if (!supabase) {
  //   return Promise.resolve(
  //     sampleFeedbacks.filter((fb) => fb.storeId === storeId)
  //   );
  // }
  // const { data, error } = await supabase
  //   .from('feedback')
  //   .select('*')
  //   .eq('store_id', storeId)
  //   .order('created_at', { ascending: false });
  // if (error) throw error;
  // return data || [];

  return Promise.resolve(
    sampleFeedbacks.filter((fb) => fb.storeId === storeId)
  );
}

/**
 * 특정 피드백 정보 가져오기
 */
export async function getFeedback(feedbackId: string): Promise<Feedback | null> {
  if (APP_MODE === 'demo' || !isSupabaseConfigured()) {
    const feedback = sampleFeedbacks.find((fb) => fb.id === feedbackId);
    return Promise.resolve(feedback || null);
  }

  // TODO: 다음 단계에서 Supabase 쿼리 구현
  // const supabase = getSupabaseClient();
  // if (!supabase) {
  //   const feedback = sampleFeedbacks.find((fb) => fb.id === feedbackId);
  //   return Promise.resolve(feedback || null);
  // }
  // const { data, error } = await supabase
  //   .from('feedback')
  //   .select('*')
  //   .eq('id', feedbackId)
  //   .single();
  // if (error) throw error;
  // return data;

  const feedback = sampleFeedbacks.find((fb) => fb.id === feedbackId);
  return Promise.resolve(feedback || null);
}

/**
 * 피드백 생성
 */
export async function createFeedback(feedbackData: Omit<Feedback, 'id' | 'createdAt'>): Promise<Feedback> {
  if (APP_MODE === 'demo' || !isSupabaseConfigured()) {
    // Demo 모드에서는 임시 ID 생성하여 반환 (실제 저장 안 함)
    const newFeedback: Feedback = {
      ...feedbackData,
      id: `fb-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    return Promise.resolve(newFeedback);
  }

  // TODO: 다음 단계에서 Supabase insert 구현
  throw new Error('createFeedback is not implemented yet');
}
