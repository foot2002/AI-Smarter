# AI SMarter PRD (MVP)

## 1. 목적
소상공인이 리뷰/설문/문의 피드백을 기반으로 블로그/쇼츠/SNS 마케팅 콘텐츠를 생성하고,
예약/배포(초기엔 반자동), 성과를 확인하며 다음 액션을 추천받는 솔루션 제공.

## 2. 대상 사용자
- 1인 소상공인(단일 매장)
- 다점포/대행 운영자(2개 이상 매장 관리)

## 3. 제품 구조(라우팅)
### 브랜드(퍼블릭)
- / : 메인
- /pricing : 가격
- /impact : 도입효과
- /trial : 1분 무료체험(로그인 없이)
- /login : 로그인(UI)
- /signup : 회원가입(UI)

### 솔루션(App)
- /app : 매장 선택(엔트리)
- /app/:storeId/dashboard : 대시보드
- /app/:storeId/insights : 인사이트(피드백 수집/분석)
- /app/:storeId/content : 콘텐츠 생성/관리
- /app/:storeId/publish : 배포(예약/내보내기)
- /app/:storeId/analytics : 성과분석
- /app/:storeId/settings : 설정

## 4. 엔트리 규칙(/app 진입)
- 매장 0개: /app 빈 상태 → “새 매장 추가” 모달(처음 1회 자동 오픈)
- 매장 1개: /app/:storeId/dashboard로 바로 이동
- 매장 2개 이상: /app(선택 화면) 유지, 모달 자동 오픈 금지

## 5. MVP 범위(이번 구현 목표)
### 5.1 반드시 동작해야 하는 것
- Auth(로그인/회원가입) 연결(추후 단계면 Demo Mode로 우선 가능)
- 매장 CRUD: 생성/선택/기본 설정 저장
- 피드백 입력: 단건 + 대량 붙여넣기 + CSV 업로드(설문 QR/자동수집은 UI 우선)
- 인사이트: 강점TOP/개선필요/Action Plan “자동 분석” 실행 버튼(초기엔 더미/LLM)
- 콘텐츠 생성: 블로그/쇼츠/SNS (피드백+직접입력) + 이미지 선택(설정 미디어) + 타입별 옵션
- 배포: 예약 등록 + 예약 리스트/캘린더 + 내보내기(복사/다운로드) + 업로드 완료 체크(반자동)
- 성과분석: 채널별/콘텐츠별 성과 테이블 + “왜 먹혔나(근거)” 패널(UI+더미/LLM)
- 대시보드: 작업(To-do) + 전략 카드(근거/신뢰도) + 실행 버튼 딥링크

### 5.2 이번 MVP에서 ‘UI만’ (Coming soon/Placeholder)
- 네이버플레이스/구글맵/인스타 자동 수집(OAuth/정책 이슈)
- 채널 자동 업로드(완전 자동 배포)
- 설문 QR: UI는 제공, 실제 수집은 2차에서 연결 가능
- 프롬프트 직접 편집(읽기 전용 프롬프트 미리보기만)

## 6. 핵심 데이터(개념 모델)
- user
- store
- store_settings (tone, CTA, banned_words, strengths, products, etc.)
- media (category: store/menu/mood/differentiator/etc, tags, uploaded_at)
- feedback (type: review/survey/inquiry, channel, text, sentiment?, tags?)
- insight_run (scope: period/channel/type/tag/selected_ids, outputs)
- content (type: blog/shorts/sns, source_refs, options, status)
- publish_job (scheduled_at, channel, status, done_check)
- metric (views/clicks/inquiries/reservations, time window)

## 7. API/서버 전략
- 프론트는 Vite(react-router). /api 내장 없음.
- LLM 호출 및 시크릿은 서버로 분리(예: Supabase Edge Functions / 별도 Node/FastAPI).
- 프론트는 서버 API만 호출.

## 8. 화면별 수용 기준(간단)
- /trial: 샘플 프리뷰 + 패키지 결과 + 복사 버튼 + 이메일로 받기 + “내 가게로 시작하기” 동작
- /insights: Import(붙여넣기/CSV/설문QR UI/자동수집 잠금) + 범위 필터 + 분석 실행 + 근거 문장 표시 + 콘텐츠 생성 연결
- /content: (피드백/직접입력) + (설정 미디어 선택/1장 업로드) + (타입별 옵션) + 결과 프리뷰 + 저장/복사/예약으로 보내기
- /publish: 예약 추가/수정 + 예약 클릭 시 업로드 체크리스트/복사/다운로드 + 완료 체크
- /analytics: 채널 비교 + 콘텐츠 랭킹 + 드릴다운(왜 먹혔나/근거) + 다음 액션 버튼
- /dashboard: 작업 + 전략(근거/신뢰도) + 실행 딥링크(콘텐츠 생성/인사이트/배포/설정)

## 9. 개발 순서(추천)
1) Auth/Demo Mode 결정 → 보호 라우팅 적용
2) store CRUD + /app 진입 규칙 확정
3) feedback 저장(붙여넣기/CSV) → insights 분석(더미/LLM)
4) content 생성(LLM) + media 선택 연결
5) publish 예약/완료 체크(반자동) → analytics(지표 입력/표/근거)
