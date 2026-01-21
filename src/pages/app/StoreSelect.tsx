import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sparkles,
  Store as StoreIcon,
  Plus,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Clock,
  ExternalLink,
  Check,
} from "lucide-react";
import { industryOptions, toneOptions, ctaOptions } from "@/data/sampleData";
import { listStores, createStore } from "@/lib/api/stores";
import { Store } from "@/data/sampleData";
import { getSolutionEntryUrl } from "@/lib/routing/storeEntry";

type OnboardingStep = 1 | 2;

export default function StoreSelect() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [step, setStep] = useState<OnboardingStep>(1);
  const [stores, setStores] = useState<Store[]>([]);
  const [newStore, setNewStore] = useState({
    name: "",
    industry: "",
    region: "",
    tone: "friendly",
    cta: "reservation",
  });

  // 가게 목록 로드
  useEffect(() => {
    listStores().then((loadedStores) => {
      setStores(loadedStores);
    });
  }, []);

  // 엔트리 규칙 적용 및 createStore 쿼리 처리
  useEffect(() => {
    if (stores.length === 0) return; // stores가 로드되지 않았으면 대기

    // createStore 쿼리가 있으면 엔트리 규칙 bypass (모달 열기만)
    const shouldCreateStore = searchParams.get("createStore") === "1";
    if (shouldCreateStore) {
      setDialogOpen(true);
      return; // 엔트리 규칙 리다이렉트 하지 않음
    }

    // 엔트리 규칙 적용: 가게 개수에 따라 자동 리다이렉트
    const entryUrl = getSolutionEntryUrl(stores);
    if (entryUrl !== '/app' && entryUrl !== location.pathname) {
      // 1개인 경우 자동으로 dashboard로 이동
      navigate(entryUrl, { replace: true });
    }
  }, [stores, searchParams, navigate, location.pathname]);

  // /app?new=true로 접근 시 + 가게가 0개일 때만 모달 자동 열기
  useEffect(() => {
    const shouldAutoOpen = searchParams.get("new") === "true" && stores.length === 0;
    if (shouldAutoOpen) {
      setDialogOpen(true);
    }
  }, [searchParams, stores.length]);

  const handleCreateStore = async () => {
    try {
      console.log('[StoreSelect] Creating store with data:', newStore);
      
      // 가게 생성
      const createdStore = await createStore({
        name: newStore.name,
        industry: newStore.industry,
        tone: newStore.tone as 'friendly' | 'professional' | 'emotional',
        region: newStore.region || undefined,
        strengths: [],
        keywords: [],
        blockedWords: [],
        defaultCta: newStore.cta as 'call' | 'reservation' | 'visit' | 'dm' | 'link',
        channels: {
          blog: undefined,
          youtube: undefined,
          instagram: undefined,
          other: undefined,
        },
        operationMode: 'light',
        featuredItems: [],
        allMenuItems: [],
      });

      console.log('[StoreSelect] Store created successfully:', createdStore);

      // 폼 초기화
      setDialogOpen(false);
      setStep(1);
      setNewStore({
        name: "",
        industry: "",
        region: "",
        tone: "friendly",
        cta: "reservation",
      });

      // 목록 새로고침
      console.log('[StoreSelect] Refreshing store list...');
      const updatedStores = await listStores();
      console.log('[StoreSelect] Updated stores:', updatedStores);
      setStores(updatedStores);

      // createStore 쿼리 제거
      if (searchParams.get("createStore") === "1") {
        // 새로 생성한 가게의 dashboard로 이동
        console.log('[StoreSelect] Navigating to new store dashboard:', `/app/${createdStore.id}/dashboard`);
        navigate(`/app/${createdStore.id}/dashboard`, { replace: true });
      } else {
        // 엔트리 규칙 적용: 가게 개수에 따라 이동
        const entryUrl = getSolutionEntryUrl(updatedStores);
        console.log('[StoreSelect] Navigating to:', entryUrl);
        navigate(entryUrl);
      }
      
      toast.success('가게가 생성되었습니다.');
    } catch (error) {
      console.error('[StoreSelect] Failed to create store:', error);
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
      toast.error(`가게 생성에 실패했습니다: ${errorMessage}`);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setStep(1);
    setNewStore({
      name: "",
      industry: "",
      region: "",
      tone: "friendly",
      cta: "reservation",
    });
  };

  const canProceedStep1 = newStore.name.trim() !== "" && newStore.industry !== "";
  const canComplete = canProceedStep1; // Step2에서도 Step1의 필수값만 체크
  
  // 디버깅: canComplete 상태 확인
  useEffect(() => {
    if (step === 2) {
      console.log('[StoreSelect] Step2 - canComplete:', canComplete, 'newStore:', newStore);
    }
  }, [step, canComplete, newStore]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg tracking-tight">
            AI <span className="text-primary">SMarter</span>
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/trial">무료체험</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">로그인</Link>
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="container max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-display-sm font-bold mb-4">
            어떤 가게를 관리할까요?
          </h1>
          <p className="text-muted-foreground text-lg">
            가게를 선택하거나 새로운 가게를 등록하세요
          </p>
        </div>

        {/* Store List */}
        {stores.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {stores.map((store) => (
              <Card
                key={store.id}
                className="p-6 hover:shadow-soft-lg transition-all cursor-pointer group"
                onClick={() => navigate(`/app/${store.id}/dashboard`)}
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <StoreIcon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                      {store.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {store.industry}
                    </p>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      {store.region && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {store.region}
                        </span>
                      )}
                      {store.operatingHours && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {store.operatingHours.split(",")[0]}
                        </span>
                      )}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>

                {/* Quick Stats */}
                <div className="mt-4 pt-4 border-t border-border grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">발행 콘텐츠</p>
                    <p className="text-lg font-bold">12</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">이번주 조회</p>
                    <p className="text-lg font-bold">2.4K</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">전환</p>
                    <p className="text-lg font-bold text-success">+23%</p>
                  </div>
                </div>

                {/* Connected Channels */}
                <div className="mt-4 flex gap-2">
                  {store.channels.blog?.connected && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-lg">
                      블로그
                    </span>
                  )}
                  {store.channels.instagram?.connected && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-lg">
                      인스타
                    </span>
                  )}
                  {store.channels.youtube?.connected && (
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-lg">
                      유튜브
                    </span>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-muted mx-auto mb-4 flex items-center justify-center">
              <StoreIcon className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold mb-2">등록된 가게가 없습니다</h3>
            <p className="text-muted-foreground mb-6">
              첫 번째 가게를 등록하고 AI 마케팅을 시작하세요
            </p>
            <Button size="lg" onClick={() => setDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              가게 등록하기
            </Button>
          </Card>
        )}

        {/* Add New Store Button */}
        <div className="flex justify-center gap-4">
          <Button size="lg" onClick={() => setDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />새 가게 추가
          </Button>

          <Button variant="ghost" asChild>
            <Link to="/">
              <ExternalLink className="w-4 h-4 mr-2" />
              브랜드 사이트로
            </Link>
          </Button>
        </div>
      </main>

      {/* New Store Modal - 2-Step Onboarding */}
      <Dialog open={dialogOpen} onOpenChange={(open) => {
        if (!open) handleCloseDialog();
        else setDialogOpen(true);
      }}>
        <DialogContent className="sm:max-w-lg">
          {/* Step Indicator */}
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {step > 1 ? <Check className="w-4 h-4" /> : "1"}
              </div>
              <span className={`text-sm ${step === 1 ? "font-medium" : "text-muted-foreground"}`}>
                기본 정보
              </span>
            </div>
            <div className="flex-1 h-px bg-border" />
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                2
              </div>
              <span className={`text-sm ${step === 2 ? "font-medium" : "text-muted-foreground"}`}>
                콘텐츠 설정
              </span>
            </div>
          </div>

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <>
              <DialogHeader>
                <DialogTitle>새 가게 등록</DialogTitle>
                <DialogDescription>
                  가게 이름과 업종만 입력하면 바로 시작할 수 있어요
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="store-name">가게 이름 *</Label>
                  <Input
                    id="store-name"
                    placeholder="예: 따뜻한 오후 카페"
                    value={newStore.name}
                    onChange={(e) =>
                      setNewStore({ ...newStore, name: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">업종 *</Label>
                  <Select
                    value={newStore.industry}
                    onValueChange={(value) =>
                      setNewStore({ ...newStore, industry: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="업종을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {industryOptions.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="region">지역 (선택)</Label>
                  <Input
                    id="region"
                    placeholder="예: 서울 마포구 연남동"
                    value={newStore.region}
                    onChange={(e) =>
                      setNewStore({ ...newStore, region: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="ghost" onClick={handleCloseDialog}>
                  취소
                </Button>
                <Button
                  onClick={() => setStep(2)}
                  disabled={!canProceedStep1}
                >
                  다음
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </>
          )}

          {/* Step 2: Content Settings */}
          {step === 2 && (
            <>
              <DialogHeader>
                <DialogTitle>콘텐츠 기본 설정</DialogTitle>
                <DialogDescription>
                  나중에 설정에서 언제든 변경할 수 있어요
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>기본 톤</Label>
                  <Select
                    value={newStore.tone}
                    onValueChange={(value) =>
                      setNewStore({ ...newStore, tone: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {toneOptions.map((tone) => (
                        <SelectItem key={tone.value} value={tone.value}>
                          <span>{tone.label}</span>
                          <span className="text-muted-foreground ml-2">
                            - {tone.description}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>기본 CTA</Label>
                  <Select
                    value={newStore.cta}
                    onValueChange={(value) =>
                      setNewStore({ ...newStore, cta: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ctaOptions.map((cta) => (
                        <SelectItem key={cta.value} value={cta.value}>
                          {cta.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-4 bg-muted/50 rounded-xl">
                  <p className="text-sm text-muted-foreground">
                    💡 자세한 설정(채널 연결, 브랜드 룰, 운영 모드)은 대시보드의{" "}
                    <span className="font-medium text-foreground">설정</span> 메뉴에서 진행할 수 있어요
                  </p>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="ghost" onClick={() => setStep(1)}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  이전
                </Button>
                <Button 
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('[StoreSelect] Create button clicked, canComplete:', canComplete);
                    if (canComplete) {
                      handleCreateStore();
                    }
                  }} 
                  disabled={!canComplete}
                >
                  가게 생성하고 시작하기
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
