# AI SMarter

소상공인을 위한 AI 기반 마케팅 콘텐츠 생성 및 관리 솔루션

## 기술 스택

- **Vite** - 빌드 도구
- **React** - UI 프레임워크
- **TypeScript** - 타입 안정성
- **react-router-dom** - 라우팅
- **Tailwind CSS** - 스타일링
- **shadcn/ui** - UI 컴포넌트
- **Supabase** - 백엔드/DB (연동 예정)

## 로컬 실행 방법

### 1. 의존성 설치

```sh
npm i
```

### 2. 환경 변수 설정

`.env.example` 파일을 참고하여 `.env` 파일을 생성하고 필요한 값들을 설정하세요:

```sh
cp .env.example .env
```

`.env` 파일에 다음 변수들을 설정하세요:
- `VITE_SUPABASE_URL`: Supabase 프로젝트 URL
- `VITE_SUPABASE_ANON_KEY`: Supabase Anon Key
- `VITE_APP_MODE`: `demo` 또는 `prod` (demo 모드에서는 sampleData 사용)

### 3. Supabase 데이터베이스 설정 (prod 모드 사용 시)

prod 모드에서 Supabase를 사용하려면 데이터베이스 스키마를 설정해야 합니다:

1. Supabase 대시보드에 접속
2. SQL Editor 메뉴로 이동
3. `supabase/schema.sql` 파일의 내용을 복사하여 SQL Editor에 붙여넣기
4. "Run" 버튼을 클릭하여 실행

이렇게 하면 `stores` 테이블이 생성되고 기본 인덱스와 트리거가 설정됩니다.

### 4. 개발 서버 실행

```sh
npm run dev
```

개발 서버가 **포트 8080**에서 실행됩니다. 브라우저에서 `http://localhost:8080`으로 접속하세요.

## Sample Data 사용 위치

현재 프로젝트는 개발/데모 목적으로 `src/data/sampleData.ts`에 샘플 데이터를 포함하고 있습니다:

- **가게 데이터**: `sampleStores` - 가게 목록 및 설정 정보
- **미디어 데이터**: `sampleMediaItems` - 가게별 이미지/미디어 파일
- **피드백 데이터**: `sampleFeedbacks` - 리뷰/설문/문의 피드백
- **콘텐츠 데이터**: `sampleContents` - 생성된 마케팅 콘텐츠
- **일정 데이터**: `sampleSchedules` - 콘텐츠 배포 일정
- **분석 데이터**: `sampleAnalytics` - 성과 분석 데이터

이 데이터들은 다음 단계에서 Supabase 연동 시 실제 DB 데이터로 교체될 예정입니다. 현재는 `VITE_APP_MODE=demo`일 때 API 레이어(`src/lib/api/`)에서 이 샘플 데이터를 반환하도록 구현되어 있습니다.

## 프로젝트 구조

```
src/
├── lib/
│   ├── api/          # API 서비스 레이어 (stores, feedback, contents, insights)
│   ├── routing/      # 라우팅 유틸리티 (storeEntry.ts)
│   └── supabaseClient.ts  # Supabase 클라이언트
├── data/
│   └── sampleData.ts # 샘플 데이터 (개발/데모용)
├── pages/            # 페이지 컴포넌트
├── components/       # 재사용 가능한 컴포넌트
└── ...
```

## 개발 가이드

### API 레이어 사용

`src/lib/api/` 폴더의 서비스 함수들을 사용하여 데이터를 가져오세요:

```typescript
import { listStores, getStore } from '@/lib/api/stores';

// 가게 목록 가져오기
const stores = await listStores();

// 특정 가게 정보 가져오기
const store = await getStore(storeId);
```

현재는 `VITE_APP_MODE=demo`일 때 sampleData를 반환하고, `prod` 모드에서는 Supabase를 사용하도록 설계되어 있습니다 (실제 쿼리는 다음 단계에서 구현 예정).

### 라우팅 유틸리티

`src/lib/routing/storeEntry.ts`의 `getSolutionEntryUrl()` 함수를 사용하여 가게 개수에 따른 진입 경로를 결정할 수 있습니다:

- 0개: `/app` (새 가게 추가 모달)
- 1개: `/app/:storeId/dashboard` (바로 대시보드)
- 2개 이상: `/app` (가게 선택 화면)

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## 배포 방법

이 프로젝트는 GitHub Pages와 Vercel 등 다양한 호스팅 환경에서 동일한 코드로 동작하도록 설계되었습니다.

### 환경 변수 설정

배포 전에 `.env` 파일에 다음 변수를 설정하세요:

- `VITE_BASE_PATH`: Vite의 base 경로 설정
  - **Vercel 등 일반 호스팅**: `"/"` (기본값)
  - **GitHub Pages**: `"/<repo>/"` (예: `"/AI-Smarter/"`)

### Vercel 배포

1. Vercel에 프로젝트를 연결합니다.
2. 환경 변수는 기본값(`VITE_BASE_PATH="/"`)으로 동작하므로 별도 설정이 필요 없습니다.
3. 빌드 명령어: `npm run build`
4. 출력 디렉토리: `dist`

### GitHub Pages 배포

1. **환경 변수 설정**
   - GitHub 저장소의 Settings > Secrets and variables > Actions에서 `VITE_BASE_PATH`를 `"/<repo>/"` 형태로 설정하거나
   - 로컬에서 빌드 시 `.env.production` 파일에 `VITE_BASE_PATH="/<repo>/"` 설정

2. **빌드 및 배포**
   ```sh
   # GitHub Pages용 빌드 (예: repo 이름이 AI-Smarter인 경우)
   VITE_BASE_PATH="/AI-Smarter/" npm run build
   
   # 또는 .env.production 파일 생성 후
   npm run build
   
   # GitHub Pages에 배포
   npm run deploy
   ```

3. **404.html 자동 생성**
   - 빌드 후 `postbuild` 스크립트가 자동으로 `dist/index.html`을 `dist/404.html`로 복사합니다.
   - 이는 GitHub Pages에서 SPA 라우팅(`/app/...` 등) 직접 접근 시 404 오류를 방지하기 위함입니다.

### 빌드 결과물

빌드 후 `dist` 디렉토리에는 다음 파일들이 생성됩니다:
- `index.html`: 메인 HTML 파일
- `404.html`: GitHub Pages SPA fallback용 (자동 생성)
- `assets/`: CSS, JS 등 정적 파일들

### 주의사항

- **HashRouter 사용 금지**: URL을 깔끔하게 유지하기 위해 BrowserRouter를 사용합니다.
- **base 경로 일치**: `VITE_BASE_PATH`와 React Router의 `basename`이 자동으로 동기화됩니다.
- **GitHub Pages 서브패스**: GitHub Pages는 `https://<user>.github.io/<repo>/` 형태로 서비스되므로 반드시 `VITE_BASE_PATH`를 설정해야 합니다.
