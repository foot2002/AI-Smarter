-- Stores 테이블 스키마
-- Supabase 대시보드 > SQL Editor에서 실행하세요

-- stores 테이블 생성
CREATE TABLE IF NOT EXISTS stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NULL, -- Auth 전이라 null 허용 (추후 auth.users(id) 참조)
  name TEXT NOT NULL,
  category TEXT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- updated_at 자동 업데이트 트리거 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- updated_at 트리거 생성
CREATE TRIGGER update_stores_updated_at
  BEFORE UPDATE ON stores
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) 설정
-- 이 단계에서는 동작 우선으로 RLS를 OFF로 설정
-- 추후 Auth 연동 시 RLS 정책을 추가하여 owner_id 기반 접근 제어를 구현할 예정
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;

-- 임시 정책: 모든 사용자가 읽기/쓰기 가능 (개발 단계)
-- 프로덕션 배포 전에 반드시 수정 필요
CREATE POLICY "Allow all operations for now" ON stores
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- 인덱스 생성 (성능 최적화)
CREATE INDEX IF NOT EXISTS idx_stores_owner_id ON stores(owner_id);
CREATE INDEX IF NOT EXISTS idx_stores_created_at ON stores(created_at DESC);
