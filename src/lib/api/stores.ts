/**
 * Stores API 서비스 레이어
 * 
 * 가게(Store) 관련 데이터를 가져오는 함수들입니다.
 * 현재는 demo 모드에서는 sampleData를 반환하고, prod 모드에서는 Supabase를 사용하도록 설계되어 있습니다.
 */

import { Store } from '@/data/sampleData';
import { sampleStores } from '@/data/sampleData';
import { getSupabaseClient, isSupabaseConfigured } from '../supabaseClient';

const APP_MODE = import.meta.env.VITE_APP_MODE || 'demo';

// Supabase stores 테이블 타입 (최소 스키마)
interface SupabaseStore {
  id: string;
  owner_id: string | null;
  name: string;
  category: string | null;
  created_at: string;
  updated_at: string;
}

// Supabase Store를 앱 Store 타입으로 변환
function mapSupabaseStoreToStore(supabaseStore: SupabaseStore): Store {
  return {
    id: supabaseStore.id,
    name: supabaseStore.name,
    industry: supabaseStore.category || '',
    tone: 'friendly', // 기본값 (추후 스키마 확장 시 추가)
    region: undefined,
    contact: undefined,
    operatingHours: undefined,
    strengths: [],
    additionalStrengths: [],
    featuredItems: [],
    allMenuItems: [],
    usp: undefined,
    keywords: [],
    blockedWords: [],
    defaultCta: 'reservation',
    channels: {
      blog: undefined,
      youtube: undefined,
      instagram: undefined,
      other: undefined,
    },
    operationMode: 'light',
    createdAt: supabaseStore.created_at.split('T')[0], // YYYY-MM-DD 형식으로 변환
  };
}

/**
 * 모든 가게 목록 가져오기
 */
export async function listStores(): Promise<Store[]> {
  if (APP_MODE === 'demo' || !isSupabaseConfigured()) {
    // Demo 모드 또는 Supabase 미설정 시 sampleData 반환
    return Promise.resolve([...sampleStores]);
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    console.warn('[Stores API] Supabase client is not available, falling back to sampleData');
    return Promise.resolve([...sampleStores]);
  }

  try {
    const { data, error } = await supabase
      .from('stores')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[Stores API] Error fetching stores:', error);
      console.warn('[Stores API] Falling back to sampleData');
      return Promise.resolve([...sampleStores]);
    }

    if (!data || data.length === 0) {
      return [];
    }

    return data.map(mapSupabaseStoreToStore);
  } catch (err) {
    console.error('[Stores API] Unexpected error:', err);
    console.warn('[Stores API] Falling back to sampleData');
    return Promise.resolve([...sampleStores]);
  }
}

/**
 * 특정 가게 정보 가져오기
 */
export async function getStore(storeId: string): Promise<Store | null> {
  if (APP_MODE === 'demo' || !isSupabaseConfigured()) {
    // Demo 모드 또는 Supabase 미설정 시 sampleData에서 찾기
    const store = sampleStores.find((s) => s.id === storeId);
    return Promise.resolve(store || null);
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    console.warn('[Stores API] Supabase client is not available, falling back to sampleData');
    const store = sampleStores.find((s) => s.id === storeId);
    return Promise.resolve(store || null);
  }

  try {
    const { data, error } = await supabase
      .from('stores')
      .select('*')
      .eq('id', storeId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Not found
        return null;
      }
      console.error('[Stores API] Error fetching store:', error);
      console.warn('[Stores API] Falling back to sampleData');
      const store = sampleStores.find((s) => s.id === storeId);
      return Promise.resolve(store || null);
    }

    if (!data) {
      return null;
    }

    return mapSupabaseStoreToStore(data);
  } catch (err) {
    console.error('[Stores API] Unexpected error:', err);
    console.warn('[Stores API] Falling back to sampleData');
    const store = sampleStores.find((s) => s.id === storeId);
    return Promise.resolve(store || null);
  }
}

/**
 * 새 가게 생성
 */
export async function createStore(storeData: Omit<Store, 'id' | 'createdAt'>): Promise<Store> {
  if (APP_MODE === 'demo' || !isSupabaseConfigured()) {
    // Demo 모드에서는 임시 ID 생성하여 반환 (실제 저장 안 함)
    const newStore: Store = {
      ...storeData,
      id: `store-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    return Promise.resolve(newStore);
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    console.warn('[Stores API] Supabase client is not available, falling back to demo mode');
    const newStore: Store = {
      ...storeData,
      id: `store-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    return Promise.resolve(newStore);
  }

  try {
    // Supabase에 저장할 데이터 매핑 (최소 필드만)
    const insertData = {
      name: storeData.name,
      category: storeData.industry || null,
      owner_id: null, // 추후 Auth 연동 시 설정
    };

    const { data, error } = await supabase
      .from('stores')
      .insert([insertData])
      .select()
      .single();

    if (error) {
      console.error('[Stores API] Error creating store:', error);
      throw error;
    }

    if (!data) {
      throw new Error('Store creation failed: no data returned');
    }

    return mapSupabaseStoreToStore(data);
  } catch (err) {
    console.error('[Stores API] Unexpected error creating store:', err);
    throw err;
  }
}

/**
 * 가게 정보 업데이트
 */
export async function updateStore(storeId: string, updates: Partial<Store>): Promise<Store> {
  if (APP_MODE === 'demo' || !isSupabaseConfigured()) {
    // Demo 모드에서는 업데이트된 객체 반환 (실제 저장 안 함)
    const store = sampleStores.find((s) => s.id === storeId);
    if (!store) {
      throw new Error(`Store with id ${storeId} not found`);
    }
    return Promise.resolve({ ...store, ...updates });
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    console.warn('[Stores API] Supabase client is not available, falling back to demo mode');
    const store = sampleStores.find((s) => s.id === storeId);
    if (!store) {
      throw new Error(`Store with id ${storeId} not found`);
    }
    return Promise.resolve({ ...store, ...updates });
  }

  try {
    // Supabase에 업데이트할 데이터 매핑
    const updateData: Partial<SupabaseStore> = {};
    if (updates.name) updateData.name = updates.name;
    if (updates.industry) updateData.category = updates.industry;
    // updated_at은 트리거로 자동 업데이트됨

    const { data, error } = await supabase
      .from('stores')
      .update(updateData)
      .eq('id', storeId)
      .select()
      .single();

    if (error) {
      console.error('[Stores API] Error updating store:', error);
      throw error;
    }

    if (!data) {
      throw new Error(`Store with id ${storeId} not found`);
    }

    return mapSupabaseStoreToStore(data);
  } catch (err) {
    console.error('[Stores API] Unexpected error updating store:', err);
    throw err;
  }
}
