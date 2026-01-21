import { useState, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { toast } from "sonner";
import {
  Store,
  Star,
  Palette,
  Link as LinkIcon,
  Zap,
  Bell,
  Save,
  Plus,
  X,
  Check,
  Lock,
  Upload,
  MapPin,
  Clock,
  Crown,
  AlertTriangle,
  Image,
  Trash2,
  Edit3,
  CalendarIcon,
  Search,
  ArrowUpDown,
  ImagePlus,
} from "lucide-react";
import {
  sampleStores,
  sampleMediaItems,
  industryOptions,
  toneOptions,
  ctaOptions,
  operationModeOptions,
  mediaCategoryLabels,
  mediaLocationOptions,
  type MediaItem,
} from "@/data/sampleData";
import { cn } from "@/lib/utils";

// Helper: format phone number with hyphens
const formatPhoneNumber = (value: string) => {
  const numbers = value.replace(/[^\d]/g, "");
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  if (numbers.length <= 11) return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
};

// Suggested strengths by industry
const strengthSuggestions: Record<string, string[]> = {
  "카페/음료": ["아늑한 분위기", "넓은 좌석", "무료 와이파이", "친절한 서비스", "빠른 제공", "주차 가능", "펫 프렌들리", "루프탑", "24시 운영"],
  "음식점/레스토랑": ["신선한 재료", "넓은 좌석", "단체석 보유", "친절한 서비스", "빠른 제공", "주차 가능", "프라이빗룸", "아이 동반 가능"],
  "교육/학원": ["1:1 맞춤", "소수정예", "원어민 강사", "성적 보장", "쾌적한 시설", "자습실 완비", "온라인 병행", "주차 가능"],
  "미용/뷰티": ["친절한 상담", "예약 필수", "개인 공간", "프리미엄 제품", "주차 가능", "야간 영업", "남성 전용", "키즈 환영"],
  "의료/병원": ["친절한 상담", "최신 장비", "야간 진료", "주말 진료", "주차 가능", "온라인 예약", "전문의 상주", "소아 전문"],
  default: ["친절한 서비스", "깨끗한 시설", "주차 가능", "예약 가능", "빠른 응대"],
};

// Operation mode channel mix recommendations
const operationModeChannelMix: Record<string, string> = {
  light: "블로그 1 + SNS 1 / 주",
  steady: "쇼츠 2 + SNS 1 + 블로그 1 / 주",
  aggressive: "쇼츠 3 + SNS 2 + 블로그 2 / 주",
};

export default function Settings() {
  const { storeId } = useParams();
  const store = sampleStores.find((s) => s.id === storeId) || sampleStores[0];

  // Initial form data with extended fields
  const initialFormData = useMemo(() => ({
    // Tab 1: Store Info
    name: store.name,
    industry: store.industry,
    region: store.region || "",
    address: "서울 마포구 연남로 123",
    addressDetail: "2층",
    mapLink: "https://naver.me/warmafternoon",
    reservationLink: "https://pf.kakao.com/_warmcafe",
    contact: store.contact || "",
    operatingHours: store.operatingHours || "",
    logoUrl: "",

    // Tab 2: Strengths
    strengths: store.strengths.slice(0, 5),
    additionalStrengths: store.additionalStrengths || [],
    featuredItems: store.featuredItems.map(item => ({
      ...item,
      price: item.price || ""
    })),
    allMenuItems: store.allMenuItems || [],
    usp: store.usp || "",

    // Tab 3: Brand Rules
    tone: store.tone,
    polite: true,
    keywords: store.keywords,
    blockedWords: store.blockedWords,
    cta: store.defaultCta,
    useEmoji: true,
    hashtagStyle: "standard" as "minimal" | "standard" | "heavy",
    allowPricing: false,

    // Tab 4: Channels
    channels: {
      blog: store.channels.blog?.url || "https://blog.naver.com/warmafternoon",
      youtube: store.channels.youtube?.url || "@warm_afternoon_cafe",
      instagram: store.channels.instagram?.url || "@warm_afternoon_cafe",
      others: ["https://threads.net/@warmcafe"] as string[],
    },
    ctaLandingUrl: "https://pf.kakao.com/_warmcafe/chat",

    // Tab 5: Operation
    operationMode: store.operationMode,
    approvalMode: "manual" as "manual" | "auto",

    // Tab 6: Notifications
    notifications: {
      approval: true,
      publish: true,
      feedback: true,
      report: false,
    },
    notificationChannel: "email" as "email" | "app" | "both",
    notificationEmail: "",
    notificationFrequency: "daily" as "immediate" | "daily" | "weekly",
  }), [store]);

  const [formData, setFormData] = useState(initialFormData);
  const [savedFormData, setSavedFormData] = useState(initialFormData);
  const [lastSaved, setLastSaved] = useState<Date | null>(new Date());
  const [activeTab, setActiveTab] = useState("store");
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [pendingTab, setPendingTab] = useState<string | null>(null);

  // Input states
  const [newStrength, setNewStrength] = useState("");
  const [newAdditionalStrength, setNewAdditionalStrength] = useState("");
  const [newKeyword, setNewKeyword] = useState("");
  const [newBlockedWord, setNewBlockedWord] = useState("");
  const [newOtherChannel, setNewOtherChannel] = useState("");

  // Media states
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(
    sampleMediaItems.filter(m => m.storeId === storeId || m.storeId === 'store-1')
  );
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [mediaSheetOpen, setMediaSheetOpen] = useState(false);
  const [mediaSearchQuery, setMediaSearchQuery] = useState("");
  const [mediaSortOrder, setMediaSortOrder] = useState<"newest" | "oldest">("newest");
  const [newMediaTag, setNewMediaTag] = useState("");

  // Check for changes
  const hasChanges = useMemo(() => {
    return JSON.stringify(formData) !== JSON.stringify(savedFormData);
  }, [formData, savedFormData]);

  // Format last saved time
  const formatLastSaved = useCallback(() => {
    if (!lastSaved) return "";
    const diff = Math.floor((Date.now() - lastSaved.getTime()) / 1000);
    if (diff < 60) return "방금";
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
    return lastSaved.toLocaleDateString("ko-KR");
  }, [lastSaved]);

  // Handle save
  const handleSave = () => {
    if (!formData.name.trim()) {
      toast.error("가게 이름은 필수 항목입니다");
      return;
    }
    if (!formData.industry || formData.industry === "") {
      toast.error("업종을 선택해주세요");
      return;
    }
    if (formData.strengths.length === 0) {
      toast.error("최소 1개 이상의 강점을 입력해주세요");
      return;
    }

    setSavedFormData({ ...formData });
    setLastSaved(new Date());
    toast.success("저장 완료", {
      description: "변경사항이 성공적으로 저장되었습니다.",
    });
  };

  // Handle tab change with unsaved warning
  const handleTabChange = (newTab: string) => {
    if (hasChanges) {
      setPendingTab(newTab);
      setShowUnsavedDialog(true);
    } else {
      setActiveTab(newTab);
    }
  };

  const confirmTabChange = () => {
    if (pendingTab) {
      setActiveTab(pendingTab);
      setPendingTab(null);
    }
    setShowUnsavedDialog(false);
  };

  const cancelTabChange = () => {
    setPendingTab(null);
    setShowUnsavedDialog(false);
  };

  // Strength handlers
  const addStrength = (value?: string) => {
    const strengthToAdd = value || newStrength;
    if (strengthToAdd && formData.strengths.length < 5 && !formData.strengths.includes(strengthToAdd)) {
      setFormData({
        ...formData,
        strengths: [...formData.strengths, strengthToAdd],
      });
      setNewStrength("");
    }
  };

  const removeStrength = (idx: number) => {
    setFormData({
      ...formData,
      strengths: formData.strengths.filter((_, i) => i !== idx),
    });
  };

  // Additional strength handlers
  const addAdditionalStrength = () => {
    if (newAdditionalStrength && !formData.additionalStrengths.includes(newAdditionalStrength)) {
      setFormData({
        ...formData,
        additionalStrengths: [...formData.additionalStrengths, newAdditionalStrength],
      });
      setNewAdditionalStrength("");
    }
  };

  const removeAdditionalStrength = (idx: number) => {
    setFormData({
      ...formData,
      additionalStrengths: formData.additionalStrengths.filter((_, i) => i !== idx),
    });
  };

  // Keyword handlers
  const addKeyword = () => {
    if (newKeyword && !formData.keywords.includes(newKeyword)) {
      setFormData({
        ...formData,
        keywords: [...formData.keywords, newKeyword],
      });
      setNewKeyword("");
    }
  };

  const removeKeyword = (idx: number) => {
    setFormData({
      ...formData,
      keywords: formData.keywords.filter((_, i) => i !== idx),
    });
  };

  // Blocked word handlers
  const addBlockedWord = () => {
    if (newBlockedWord && !formData.blockedWords.includes(newBlockedWord)) {
      setFormData({
        ...formData,
        blockedWords: [...formData.blockedWords, newBlockedWord],
      });
      setNewBlockedWord("");
    }
  };

  const removeBlockedWord = (idx: number) => {
    setFormData({
      ...formData,
      blockedWords: formData.blockedWords.filter((_, i) => i !== idx),
    });
  };

  // Featured item handlers
  const updateFeaturedItem = (idx: number, field: string, value: string) => {
    const updated = [...formData.featuredItems];
    updated[idx] = { ...updated[idx], [field]: value };
    setFormData({ ...formData, featuredItems: updated });
  };

  const addFeaturedItem = () => {
    if (formData.featuredItems.length < 3) {
      setFormData({
        ...formData,
        featuredItems: [...formData.featuredItems, { name: "", description: "", price: "" }],
      });
    }
  };

  const removeFeaturedItem = (idx: number) => {
    setFormData({
      ...formData,
      featuredItems: formData.featuredItems.filter((_, i) => i !== idx),
    });
  };

  // All menu item handlers
  const updateAllMenuItem = (idx: number, field: string, value: string) => {
    const updated = [...formData.allMenuItems];
    updated[idx] = { ...updated[idx], [field]: value };
    setFormData({ ...formData, allMenuItems: updated });
  };

  const addAllMenuItem = () => {
    setFormData({
      ...formData,
      allMenuItems: [...formData.allMenuItems, { name: "", description: "", price: "" }],
    });
  };

  const removeAllMenuItem = (idx: number) => {
    setFormData({
      ...formData,
      allMenuItems: formData.allMenuItems.filter((_, i) => i !== idx),
    });
  };

  // Other channel handlers
  const addOtherChannel = () => {
    if (newOtherChannel) {
      setFormData({
        ...formData,
        channels: {
          ...formData.channels,
          others: [...formData.channels.others, newOtherChannel],
        },
      });
      setNewOtherChannel("");
    }
  };

  const removeOtherChannel = (idx: number) => {
    setFormData({
      ...formData,
      channels: {
        ...formData.channels,
        others: formData.channels.others.filter((_, i) => i !== idx),
      },
    });
  };

  // Media handlers
  const handleUploadMedia = (category: MediaItem['category']) => {
    const newMedia: MediaItem = {
      id: `media-${Date.now()}`,
      storeId: storeId || 'store-1',
      category,
      url: '/placeholder.svg',
      tags: [],
      description: '',
      uploadedAt: new Date().toISOString().split('T')[0],
    };
    setMediaItems([newMedia, ...mediaItems]);
    setSelectedMedia(newMedia);
    setMediaSheetOpen(true);
    toast.success("사진이 업로드되었습니다", {
      description: "메타데이터를 입력해주세요.",
    });
  };

  const handleUpdateMedia = (updatedMedia: MediaItem) => {
    setMediaItems(mediaItems.map(m => m.id === updatedMedia.id ? updatedMedia : m));
    setSelectedMedia(updatedMedia);
  };

  const handleDeleteMedia = (mediaId: string) => {
    setMediaItems(mediaItems.filter(m => m.id !== mediaId));
    setMediaSheetOpen(false);
    setSelectedMedia(null);
    toast.success("사진이 삭제되었습니다");
  };

  const handleSetFeaturedMedia = (mediaId: string) => {
    setMediaItems(mediaItems.map(m => ({
      ...m,
      isFeatured: m.id === mediaId ? !m.isFeatured : (m.category === 'store' ? false : m.isFeatured)
    })));
    toast.success("대표 사진이 변경되었습니다");
  };

  const addMediaTag = () => {
    if (selectedMedia && newMediaTag && !selectedMedia.tags.includes(newMediaTag)) {
      const updated = { ...selectedMedia, tags: [...selectedMedia.tags, newMediaTag] };
      handleUpdateMedia(updated);
      setNewMediaTag("");
    }
  };

  const removeMediaTag = (tag: string) => {
    if (selectedMedia) {
      const updated = { ...selectedMedia, tags: selectedMedia.tags.filter(t => t !== tag) };
      handleUpdateMedia(updated);
    }
  };

  // Filter and sort media
  const getFilteredMedia = (category: MediaItem['category']) => {
    let filtered = mediaItems.filter(m => m.category === category);
    
    if (mediaSearchQuery) {
      filtered = filtered.filter(m => 
        m.tags.some(t => t.includes(mediaSearchQuery)) ||
        m.description?.includes(mediaSearchQuery)
      );
    }
    
    filtered.sort((a, b) => {
      const dateA = new Date(a.uploadedAt).getTime();
      const dateB = new Date(b.uploadedAt).getTime();
      return mediaSortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
    
    return filtered;
  };

  // Get suggested strengths based on industry
  const suggestedStrengths = strengthSuggestions[formData.industry] || strengthSuggestions.default;

  return (
    <div className="space-y-6">
      {/* Unsaved Changes Dialog */}
      <Dialog open={showUnsavedDialog} onOpenChange={setShowUnsavedDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              저장되지 않은 변경사항
            </DialogTitle>
            <DialogDescription>
              저장하지 않은 변경사항이 있습니다. 탭을 이동하면 변경사항이 사라집니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={cancelTabChange}>
              취소
            </Button>
            <Button variant="destructive" onClick={confirmTabChange}>
              저장 안 함
            </Button>
            <Button onClick={() => { handleSave(); confirmTabChange(); }}>
              저장 후 이동
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Media Edit Sheet */}
      <Sheet open={mediaSheetOpen} onOpenChange={setMediaSheetOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>사진 상세 정보</SheetTitle>
            <SheetDescription>
              사진의 메타데이터를 입력하세요. 태그는 콘텐츠 생성 시 활용됩니다.
            </SheetDescription>
          </SheetHeader>
          {selectedMedia && (
            <div className="mt-6 space-y-6">
              {/* Preview */}
              <div className="aspect-video bg-muted rounded-xl overflow-hidden">
                <img 
                  src={selectedMedia.url} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Upload Date */}
              <div className="space-y-2">
                <Label>업로드 날짜</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedMedia.uploadedAt ? format(new Date(selectedMedia.uploadedAt), "PPP", { locale: ko }) : "날짜 선택"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedMedia.uploadedAt ? new Date(selectedMedia.uploadedAt) : undefined}
                      onSelect={(date) => {
                        if (date) {
                          handleUpdateMedia({
                            ...selectedMedia,
                            uploadedAt: date.toISOString().split('T')[0]
                          });
                        }
                      }}
                      locale={ko}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  태그 <span className="text-destructive">(권장)</span>
                </Label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {selectedMedia.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary" className="py-1 px-2">
                      #{tag}
                      <button onClick={() => removeMediaTag(tag)} className="ml-1.5 hover:text-destructive">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newMediaTag}
                    onChange={(e) => setNewMediaTag(e.target.value)}
                    placeholder="태그 입력 (예: 창가석)"
                    onKeyPress={(e) => e.key === "Enter" && addMediaTag()}
                  />
                  <Button variant="outline" size="icon" onClick={addMediaTag}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  콘텐츠 생성 시 태그를 기반으로 적절한 사진을 추천합니다
                </p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label>간단 설명/메모 <span className="text-muted-foreground text-xs">(선택)</span></Label>
                <Input
                  value={selectedMedia.description || ""}
                  onChange={(e) => handleUpdateMedia({ ...selectedMedia, description: e.target.value })}
                  placeholder="사진에 대한 간단한 설명"
                />
              </div>

              {/* Location (only for store/product) */}
              {(selectedMedia.category === 'store' || selectedMedia.category === 'product') && (
                <div className="space-y-2">
                  <Label>촬영 장소/구역 <span className="text-muted-foreground text-xs">(선택)</span></Label>
                  <Select
                    value={selectedMedia.location || ""}
                    onValueChange={(v) => handleUpdateMedia({ ...selectedMedia, location: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="구역 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {mediaLocationOptions.map(opt => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Featured Toggle (only for store category) */}
              {selectedMedia.category === 'store' && (
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <Label>대표 사진으로 지정</Label>
                    <p className="text-sm text-muted-foreground">프로필/썸네일에 우선 사용됩니다</p>
                  </div>
                  <Switch
                    checked={selectedMedia.isFeatured || false}
                    onCheckedChange={() => handleSetFeaturedMedia(selectedMedia.id)}
                  />
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t">
                <Button 
                  variant="destructive" 
                  className="flex-1"
                  onClick={() => handleDeleteMedia(selectedMedia.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  삭제
                </Button>
                <Button className="flex-1" onClick={() => setMediaSheetOpen(false)}>
                  <Check className="w-4 h-4 mr-2" />
                  완료
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">설정</h1>
          <p className="text-muted-foreground">
            가게 정보와 콘텐츠 설정을 관리하세요
          </p>
        </div>
        <div className="flex items-center gap-4">
          {lastSaved && (
            <span className="text-sm text-muted-foreground">
              마지막 저장: {formatLastSaved()}
            </span>
          )}
          <Button onClick={handleSave} disabled={!hasChanges}>
            <Save className="w-4 h-4 mr-2" />
            변경사항 저장
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="flex-wrap">
          <TabsTrigger value="store">
            <Store className="w-4 h-4 mr-2" />
            가게정보
          </TabsTrigger>
          <TabsTrigger value="strengths">
            <Star className="w-4 h-4 mr-2" />
            특징/장점
          </TabsTrigger>
          <TabsTrigger value="brand">
            <Palette className="w-4 h-4 mr-2" />
            브랜드 룰
          </TabsTrigger>
          <TabsTrigger value="channels">
            <LinkIcon className="w-4 h-4 mr-2" />
            채널 연결
          </TabsTrigger>
          <TabsTrigger value="operation">
            <Zap className="w-4 h-4 mr-2" />
            운영
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="w-4 h-4 mr-2" />
            알림
          </TabsTrigger>
          <TabsTrigger value="media">
            <Image className="w-4 h-4 mr-2" />
            미디어
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Store Info */}
        <TabsContent value="store" className="mt-6">
          <Card className="p-6 space-y-6">
            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  가게 이름 <span className="text-destructive">(필수)</span>
                </Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="예: 따뜻한 오후 카페"
                />
                {!formData.name.trim() && (
                  <p className="text-sm text-destructive">가게 이름을 입력해주세요</p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  업종 <span className="text-destructive">(필수)</span>
                </Label>
                <Select
                  value={formData.industry}
                  onValueChange={(v) => setFormData({ ...formData, industry: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="업종을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {industryOptions.filter(i => i !== '기타').map((i) => (
                      <SelectItem key={i} value={i}>
                        {i}
                      </SelectItem>
                    ))}
                    <SelectItem value="기타">기타</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                주소 <span className="text-muted-foreground text-xs">(선택)</span>
              </Label>
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="도로명 주소 (예: 서울 마포구 연남로 123)"
                />
                <Input
                  value={formData.addressDetail}
                  onChange={(e) => setFormData({ ...formData, addressDetail: e.target.value })}
                  placeholder="상세 주소 (예: 2층)"
                />
              </div>
            </div>

            {/* Region */}
            <div className="space-y-2">
              <Label>
                지역 <span className="text-muted-foreground text-xs">(선택)</span>
              </Label>
              <Input
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                placeholder="예: 서울 마포구 연남동"
              />
            </div>

            {/* Links */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  지도/플레이스 링크 <span className="text-muted-foreground text-xs">(선택)</span>
                </Label>
                <Input
                  value={formData.mapLink}
                  onChange={(e) => setFormData({ ...formData, mapLink: e.target.value })}
                  placeholder="네이버플레이스/카카오맵/구글맵 URL"
                />
                <p className="text-xs text-muted-foreground">
                  예: https://naver.me/xxxxx 또는 https://place.map.kakao.com/xxxxx
                </p>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <LinkIcon className="w-4 h-4" />
                  예약/문의 링크 <span className="text-muted-foreground text-xs">(선택)</span>
                </Label>
                <Input
                  value={formData.reservationLink}
                  onChange={(e) => setFormData({ ...formData, reservationLink: e.target.value })}
                  placeholder="예약 링크 또는 카카오채널/톡톡 링크"
                />
                <p className="text-xs text-muted-foreground">
                  예: https://pf.kakao.com/_xxxxx 또는 https://booking.naver.com/xxxxx
                </p>
              </div>
            </div>

            {/* Contact & Hours */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>연락처 <span className="text-muted-foreground text-xs">(선택)</span></Label>
                <Input
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: formatPhoneNumber(e.target.value) })}
                  placeholder="02-1234-5678"
                />
                <p className="text-xs text-muted-foreground">
                  숫자만 입력하면 자동으로 하이픈이 추가됩니다
                </p>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  운영시간 <span className="text-muted-foreground text-xs">(선택)</span>
                </Label>
                <Input
                  value={formData.operatingHours}
                  onChange={(e) => setFormData({ ...formData, operatingHours: e.target.value })}
                  placeholder="매일 10:00-22:00 (라스트오더 21:30) / 월 휴무"
                />
                <p className="text-xs text-muted-foreground">
                  예: 평일 10:00-22:00 / 주말 11:00-21:00 / 월요일 휴무
                </p>
              </div>
            </div>

            {/* Logo Upload */}
            <div className="space-y-2">
              <Label>대표 이미지/로고 <span className="text-muted-foreground text-xs">(선택)</span></Label>
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="font-medium">이미지를 드래그하거나 클릭하여 업로드</p>
                <p className="text-sm text-muted-foreground mt-1">
                  PNG, JPG, WEBP (최대 5MB)
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Tab 2: Strengths - Separated with Accordions */}
        <TabsContent value="strengths" className="mt-6">
          <Card className="p-6 space-y-8">
            {/* Section 1: Main Strengths */}
            <div>
              <Label className="mb-3 block text-lg font-semibold">
                대표 강점 <span className="text-destructive">(필수, 최대 5개)</span>
              </Label>
              <p className="text-sm text-muted-foreground mb-4">
                가게의 특징 중심으로 선택하세요 (예: 분위기, 서비스, 시설 등)
              </p>
              
              {/* Selected Strengths */}
              <div className="flex flex-wrap gap-2 mb-4">
                {formData.strengths.map((strength, idx) => (
                  <Badge key={idx} variant="default" className="py-1.5 px-3">
                    {strength}
                    <button
                      onClick={() => removeStrength(idx)}
                      className="ml-2 hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>

              {/* Suggested Strengths */}
              {formData.strengths.length < 5 && (
                <>
                  <p className="text-sm text-muted-foreground mb-2">추천 강점 (클릭하여 추가)</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {suggestedStrengths
                      .filter(s => !formData.strengths.includes(s))
                      .slice(0, 6)
                      .map((suggestion, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="py-1.5 px-3 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                          onClick={() => addStrength(suggestion)}
                        >
                          + {suggestion}
                        </Badge>
                      ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newStrength}
                      onChange={(e) => setNewStrength(e.target.value)}
                      placeholder="직접 입력"
                      onKeyPress={(e) => e.key === "Enter" && addStrength()}
                    />
                    <Button variant="outline" onClick={() => addStrength()}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              )}
              {formData.strengths.length === 0 && (
                <p className="text-sm text-destructive">최소 1개 이상의 강점을 선택해주세요</p>
              )}

              {/* Additional Strengths Accordion */}
              <Accordion type="single" collapsible className="mt-6">
                <AccordionItem value="additional-strengths" className="border rounded-xl px-4">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">추가 강점</span>
                      <Badge variant="secondary" className="text-xs">
                        {formData.additionalStrengths.length}개
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      대표 강점 5개는 콘텐츠에 기본 반영됩니다. 추가 강점은 필요 시 참고됩니다.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {formData.additionalStrengths.map((strength, idx) => (
                        <Badge key={idx} variant="secondary" className="py-1.5 px-3">
                          {strength}
                          <button
                            onClick={() => removeAdditionalStrength(idx)}
                            className="ml-2 hover:text-destructive"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={newAdditionalStrength}
                        onChange={(e) => setNewAdditionalStrength(e.target.value)}
                        placeholder="강점 입력 (검색/자동완성)"
                        onKeyPress={(e) => e.key === "Enter" && addAdditionalStrength()}
                      />
                      <Button variant="outline" onClick={addAdditionalStrength}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Section 2: Featured Items */}
            <div className="border-t pt-6">
              <Label className="mb-3 block text-lg font-semibold">
                대표 메뉴/상품 <span className="text-muted-foreground text-sm font-normal">(최대 3개)</span>
              </Label>
              <p className="text-sm text-muted-foreground mb-4">
                가장 인기 있거나 추천하고 싶은 메뉴/상품을 등록하세요
              </p>
              
              <div className="space-y-4">
                {formData.featuredItems.map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start p-4 bg-muted/50 rounded-xl">
                    <div className="flex-1 grid md:grid-cols-3 gap-3">
                      <Input
                        value={item.name}
                        onChange={(e) => updateFeaturedItem(idx, "name", e.target.value)}
                        placeholder="메뉴/상품 이름"
                      />
                      <Input
                        value={item.description}
                        onChange={(e) => updateFeaturedItem(idx, "description", e.target.value)}
                        placeholder="한 줄 설명"
                        className="md:col-span-1"
                      />
                      <Input
                        value={item.price || ""}
                        onChange={(e) => updateFeaturedItem(idx, "price", e.target.value)}
                        placeholder="가격 (선택)"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFeaturedItem(idx)}
                      className="shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                {formData.featuredItems.length < 3 && (
                  <Button variant="outline" onClick={addFeaturedItem} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    대표 메뉴/상품 추가
                  </Button>
                )}
              </div>

              {/* All Menu Items Accordion */}
              <Accordion type="single" collapsible className="mt-6">
                <AccordionItem value="all-menu" className="border rounded-xl px-4">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">전체 메뉴/상품</span>
                      <Badge variant="secondary" className="text-xs">
                        {formData.allMenuItems.length}개
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      대표 3개는 기본 홍보에 자주 사용됩니다. 전체 메뉴는 필요 시 확장 저장입니다.
                    </p>
                    <div className="space-y-3">
                      {formData.allMenuItems.map((item, idx) => (
                        <div key={idx} className="flex gap-3 items-start p-3 bg-muted/30 rounded-lg">
                          <div className="flex-1 grid md:grid-cols-3 gap-2">
                            <Input
                              value={item.name}
                              onChange={(e) => updateAllMenuItem(idx, "name", e.target.value)}
                              placeholder="메뉴/상품 이름"
                              className="h-9"
                            />
                            <Input
                              value={item.description}
                              onChange={(e) => updateAllMenuItem(idx, "description", e.target.value)}
                              placeholder="한 줄 설명"
                              className="h-9"
                            />
                            <Input
                              value={item.price || ""}
                              onChange={(e) => updateAllMenuItem(idx, "price", e.target.value)}
                              placeholder="가격 (선택)"
                              className="h-9"
                            />
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeAllMenuItem(idx)}
                            className="shrink-0 h-9 w-9"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <Button variant="outline" onClick={addAllMenuItem} className="w-full" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        메뉴/상품 추가
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Section 3: USP */}
            <div className="border-t pt-6">
              <Label className="mb-3 block text-lg font-semibold">
                한 줄 USP <span className="text-muted-foreground text-sm font-normal">(선택)</span>
              </Label>
              <p className="text-sm text-muted-foreground mb-4">
                우리 가게만의 특별한 점을 한 문장으로 표현하세요
              </p>
              <Textarea
                value={formData.usp}
                onChange={(e) => setFormData({ ...formData, usp: e.target.value })}
                placeholder="예: 연남동에서 가장 아늑한 2층 창가석"
                className="resize-none"
                rows={2}
              />
              <div className="flex justify-between mt-2">
                <p className="text-xs text-muted-foreground">
                  권장: 40~60자
                </p>
                <p className={cn(
                  "text-xs",
                  formData.usp.length >= 40 && formData.usp.length <= 60
                    ? "text-primary"
                    : "text-muted-foreground"
                )}>
                  {formData.usp.length}자
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Tab 3: Brand Rules */}
        <TabsContent value="brand" className="mt-6">
          <Card className="p-6 space-y-6">
            <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
              💡 이 설정은 기본값입니다. 콘텐츠 생성 시 언제든 덮어쓸 수 있어요.
            </p>
            
            {/* Tone & CTA */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  기본 톤 <span className="text-destructive">(필수)</span>
                </Label>
                <Select
                  value={formData.tone}
                  onValueChange={(v) => setFormData({ ...formData, tone: v as 'friendly' | 'professional' | 'emotional' })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {toneOptions.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        <div>
                          <span>{t.label}</span>
                          <span className="text-muted-foreground ml-2">- {t.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  기본 CTA <span className="text-destructive">(필수)</span>
                </Label>
                <Select
                  value={formData.cta}
                  onValueChange={(v) => setFormData({ ...formData, cta: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">없음</SelectItem>
                    {ctaOptions.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Polite Toggle */}
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <Label>존댓말 사용</Label>
              <Switch
                checked={formData.polite}
                onCheckedChange={(v) => setFormData({ ...formData, polite: v })}
              />
            </div>

            {/* Keywords - Tag Input */}
            <div className="space-y-2">
              <Label>꼭 넣을 키워드</Label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.keywords.map((keyword, idx) => (
                  <Badge key={idx} variant="secondary" className="py-1.5 px-3">
                    {keyword}
                    <button
                      onClick={() => removeKeyword(idx)}
                      className="ml-2 hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  placeholder="키워드 입력 후 Enter 또는 추가 버튼"
                  onKeyPress={(e) => e.key === "Enter" && addKeyword()}
                />
                <Button variant="outline" onClick={addKeyword}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                콘텐츠에 자주 포함시킬 키워드를 등록하세요
              </p>
            </div>

            {/* Blocked Words - Tag Input */}
            <div className="space-y-2">
              <Label>금지어/피해야 할 표현</Label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.blockedWords.map((word, idx) => (
                  <Badge key={idx} variant="destructive" className="py-1.5 px-3">
                    {word}
                    <button
                      onClick={() => removeBlockedWord(idx)}
                      className="ml-2 hover:text-destructive-foreground"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newBlockedWord}
                  onChange={(e) => setNewBlockedWord(e.target.value)}
                  placeholder="금지어 입력 후 Enter 또는 추가 버튼"
                  onKeyPress={(e) => e.key === "Enter" && addBlockedWord()}
                />
                <Button variant="outline" onClick={addBlockedWord}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                콘텐츠에서 제외할 단어나 표현을 등록하세요
              </p>
            </div>

            {/* Additional Options */}
            <div className="border-t pt-6 space-y-4">
              <h3 className="font-semibold">추가 옵션</h3>
              
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <Label>이모지 사용</Label>
                  <p className="text-sm text-muted-foreground">콘텐츠에 이모지를 포함합니다</p>
                </div>
                <Switch
                  checked={formData.useEmoji}
                  onCheckedChange={(v) => setFormData({ ...formData, useEmoji: v })}
                />
              </div>

              <div className="p-3 bg-muted rounded-lg space-y-2">
                <Label>해시태그 스타일</Label>
                <Select
                  value={formData.hashtagStyle}
                  onValueChange={(v) => setFormData({ ...formData, hashtagStyle: v as "minimal" | "standard" | "heavy" })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minimal">최소 (5개 이하)</SelectItem>
                    <SelectItem value="standard">표준 (10~15개)</SelectItem>
                    <SelectItem value="heavy">많이 (20개 이상)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <Label>가격/할인 표현 허용</Label>
                  <p className="text-sm text-muted-foreground">콘텐츠에 가격이나 할인 정보를 포함할 수 있습니다</p>
                </div>
                <Switch
                  checked={formData.allowPricing}
                  onCheckedChange={(v) => setFormData({ ...formData, allowPricing: v })}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Tab 4: Channels */}
        <TabsContent value="channels" className="mt-6">
          <Card className="p-6 space-y-6">
            <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
              💡 아이디/비밀번호는 저장하지 않습니다. API/OAuth 자동 연결은 추후 지원 예정입니다.
            </p>
            
            <div className="space-y-2">
              <Label>블로그 URL</Label>
              <Input
                value={formData.channels.blog}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    channels: { ...formData.channels, blog: e.target.value },
                  })
                }
                placeholder="https://blog.naver.com/..."
              />
              <p className="text-xs text-muted-foreground">
                예: https://blog.naver.com/username 또는 https://username.tistory.com
              </p>
            </div>

            <div className="space-y-2">
              <Label>유튜브 채널 URL 또는 @핸들</Label>
              <Input
                value={formData.channels.youtube}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    channels: { ...formData.channels, youtube: e.target.value },
                  })
                }
                placeholder="https://youtube.com/@channel 또는 @채널명"
              />
              <p className="text-xs text-muted-foreground">
                예: https://youtube.com/@mychannel 또는 @mychannel
              </p>
            </div>

            <div className="space-y-2">
              <Label>인스타그램 프로필 URL 또는 @아이디</Label>
              <Input
                value={formData.channels.instagram}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    channels: { ...formData.channels, instagram: e.target.value },
                  })
                }
                placeholder="https://instagram.com/username 또는 @username"
              />
              <p className="text-xs text-muted-foreground">
                예: https://instagram.com/myshop 또는 @myshop
              </p>
            </div>

            {/* Other SNS - Multiple */}
            <div className="space-y-2">
              <Label>기타 SNS (여러 개 추가 가능)</Label>
              <div className="space-y-2 mb-3">
                {formData.channels.others.map((url, idx) => (
                  <div key={idx} className="flex gap-2">
                    <Input
                      value={url}
                      onChange={(e) => {
                        const updated = [...formData.channels.others];
                        updated[idx] = e.target.value;
                        setFormData({
                          ...formData,
                          channels: { ...formData.channels, others: updated },
                        });
                      }}
                      placeholder="URL 또는 계정명"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeOtherChannel(idx)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newOtherChannel}
                  onChange={(e) => setNewOtherChannel(e.target.value)}
                  placeholder="스레드, 페이스북, 틱톡 등 URL 또는 계정명"
                  onKeyPress={(e) => e.key === "Enter" && addOtherChannel()}
                />
                <Button variant="outline" onClick={addOtherChannel}>
                  <Plus className="w-4 h-4 mr-2" />
                  채널 추가
                </Button>
              </div>
            </div>

            {/* CTA Landing URL */}
            <div className="space-y-2 border-t pt-6">
              <Label>CTA 랜딩 링크 (최종 CTA 링크)</Label>
              <Input
                value={formData.ctaLandingUrl}
                onChange={(e) => setFormData({ ...formData, ctaLandingUrl: e.target.value })}
                placeholder="예약/문의 시 연결될 최종 URL"
              />
              <p className="text-xs text-muted-foreground">
                콘텐츠의 "예약하기", "문의하기" 등 CTA 버튼 클릭 시 연결되는 링크입니다
              </p>
            </div>

            {/* API/OAuth Coming Soon */}
            <div className="p-6 border-2 border-dashed border-border rounded-xl">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-muted rounded-xl">
                  <Lock className="w-6 h-6 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold">API/OAuth 자동 연결</p>
                    <Badge variant="secondary">Coming Soon</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    자동 로그인 없이 콘텐츠를 직접 업로드하는 기능입니다. 
                    현재는 콘텐츠를 내보내기하여 직접 업로드하는 방식을 이용해주세요.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    📌 예상 지원: 네이버 블로그, 유튜브, 인스타그램 (순차 오픈)
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Tab 5: Operation */}
        <TabsContent value="operation" className="mt-6">
          <Card className="p-6 space-y-6">
            <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
              💡 세부 발행 일정은 '배포' 메뉴에서 캘린더로 관리하세요.
            </p>
            
            {/* Operation Mode */}
            <div className="space-y-3">
              <Label className="text-lg font-semibold">운영 모드</Label>
              {operationModeOptions.map((mode) => (
                <div
                  key={mode.value}
                  onClick={() => setFormData({ ...formData, operationMode: mode.value as 'light' | 'steady' | 'aggressive' })}
                  className={cn(
                    "p-4 rounded-xl border-2 cursor-pointer transition-all",
                    formData.operationMode === mode.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{mode.label}</h3>
                        {mode.recommended && <Badge variant="secondary">추천</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {mode.description}
                      </p>
                      <p className="text-sm text-primary mt-2 font-medium">
                        📅 권장 믹스: {operationModeChannelMix[mode.value]}
                      </p>
                    </div>
                    {formData.operationMode === mode.value && (
                      <Check className="w-5 h-5 text-primary" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Approval Mode */}
            <div className="border-t pt-6 space-y-3">
              <Label className="text-lg font-semibold flex items-center gap-1">
                승인 방식 <span className="text-destructive">(필수)</span>
              </Label>
              
              <div
                onClick={() => setFormData({ ...formData, approvalMode: "manual" })}
                className={cn(
                  "p-4 rounded-xl border-2 cursor-pointer transition-all",
                  formData.approvalMode === "manual"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                )}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold">자동 생성 → 승인 후 예약</h3>
                      <Badge variant="secondary">추천</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      AI가 콘텐츠를 생성하면 검토 후 직접 승인하고 예약합니다
                    </p>
                  </div>
                  {formData.approvalMode === "manual" && (
                    <Check className="w-5 h-5 text-primary" />
                  )}
                </div>
              </div>

              <div
                className={cn(
                  "p-4 rounded-xl border-2 transition-all relative",
                  formData.approvalMode === "auto"
                    ? "border-destructive bg-destructive/5"
                    : "border-border hover:border-destructive/50 cursor-pointer"
                )}
                onClick={() => setFormData({ ...formData, approvalMode: "auto" })}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold">완전 자동</h3>
                      <Badge variant="outline" className="border-destructive text-destructive">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        고급
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      AI가 생성한 콘텐츠를 자동으로 예약하고 발행합니다
                    </p>
                    {formData.approvalMode === "auto" && (
                      <p className="text-sm text-destructive mt-2">
                        ⚠️ 검토 없이 발행되므로 품질 관리에 주의가 필요합니다
                      </p>
                    )}
                  </div>
                  {formData.approvalMode === "auto" && (
                    <Check className="w-5 h-5 text-destructive" />
                  )}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Tab 6: Notifications */}
        <TabsContent value="notifications" className="mt-6">
          <Card className="p-6 space-y-6">
            {/* Notification Toggles */}
            <div className="space-y-3">
              <h3 className="font-semibold">알림 유형</h3>
              
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">콘텐츠 승인 알림</p>
                  <p className="text-sm text-muted-foreground">
                    승인 대기 콘텐츠가 있을 때 알림
                  </p>
                </div>
                <Switch
                  checked={formData.notifications.approval}
                  onCheckedChange={(v) => setFormData({
                    ...formData,
                    notifications: { ...formData.notifications, approval: v }
                  })}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">예약 발행 알림</p>
                  <p className="text-sm text-muted-foreground">
                    콘텐츠가 발행되면 알림
                  </p>
                </div>
                <Switch
                  checked={formData.notifications.publish}
                  onCheckedChange={(v) => setFormData({
                    ...formData,
                    notifications: { ...formData.notifications, publish: v }
                  })}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">새 피드백 알림</p>
                  <p className="text-sm text-muted-foreground">
                    새 리뷰/설문이 추가되면 알림
                  </p>
                </div>
                <Switch
                  checked={formData.notifications.feedback}
                  onCheckedChange={(v) => setFormData({
                    ...formData,
                    notifications: { ...formData.notifications, feedback: v }
                  })}
                />
              </div>

              {/* Performance Report - Disabled with explanation */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg opacity-60">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">성과 리포트</p>
                          <Badge variant="outline" className="text-xs">
                            <Crown className="w-3 h-3 mr-1" />
                            Pro 기능
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          주간 성과 요약 이메일
                        </p>
                      </div>
                      <Switch disabled checked={false} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Pro 플랜에서 사용 가능한 기능입니다</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Notification Settings */}
            <div className="border-t pt-6 space-y-4">
              <h3 className="font-semibold">알림 수신 설정</h3>
              
              <div className="p-3 bg-muted rounded-lg space-y-2">
                <Label>수신 방법</Label>
                <Select
                  value={formData.notificationChannel}
                  onValueChange={(v) => setFormData({ ...formData, notificationChannel: v as "email" | "app" | "both" })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">이메일</SelectItem>
                    <SelectItem value="app">앱 내 알림</SelectItem>
                    <SelectItem value="both">둘 다</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(formData.notificationChannel === "email" || formData.notificationChannel === "both") && (
                <div className="space-y-2">
                  <Label>수신 이메일</Label>
                  <Input
                    type="email"
                    value={formData.notificationEmail}
                    onChange={(e) => setFormData({ ...formData, notificationEmail: e.target.value })}
                    placeholder="알림 받을 이메일 주소"
                  />
                </div>
              )}

              <div className="p-3 bg-muted rounded-lg space-y-2">
                <Label>요약 빈도</Label>
                <Select
                  value={formData.notificationFrequency}
                  onValueChange={(v) => setFormData({ ...formData, notificationFrequency: v as "immediate" | "daily" | "weekly" })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">즉시</SelectItem>
                    <SelectItem value="daily">하루 1회</SelectItem>
                    <SelectItem value="weekly">주간 요약</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Tab 7: Media */}
        <TabsContent value="media" className="mt-6">
          <div className="space-y-6">
            {/* Header Info */}
            <div className="bg-muted/50 p-4 rounded-xl">
              <p className="text-sm text-muted-foreground">
                📸 여기서 등록한 사진은 콘텐츠 생성/썸네일 추천/쇼츠 제작에 활용됩니다.
              </p>
            </div>

            {/* Search & Sort */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={mediaSearchQuery}
                  onChange={(e) => setMediaSearchQuery(e.target.value)}
                  placeholder="태그로 검색..."
                  className="pl-9"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setMediaSortOrder(mediaSortOrder === "newest" ? "oldest" : "newest")}
              >
                <ArrowUpDown className="w-4 h-4 mr-2" />
                {mediaSortOrder === "newest" ? "최신순" : "오래된순"}
              </Button>
            </div>

            {/* Media Categories */}
            {(Object.keys(mediaCategoryLabels) as Array<keyof typeof mediaCategoryLabels>).map((category) => {
              const categoryMedia = getFilteredMedia(category as MediaItem['category']);
              const categoryInfo = mediaCategoryLabels[category];
              
              return (
                <Card key={category} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{categoryInfo.label}</h3>
                      <p className="text-sm text-muted-foreground">{categoryInfo.description}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleUploadMedia(category as MediaItem['category'])}
                    >
                      <ImagePlus className="w-4 h-4 mr-2" />
                      사진 추가
                    </Button>
                  </div>

                  {categoryMedia.length === 0 ? (
                    <div 
                      className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                      onClick={() => handleUploadMedia(category as MediaItem['category'])}
                    >
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="font-medium">사진을 드래그하거나 클릭하여 업로드</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {category === 'store' && '가게 외관, 내부, 좌석 등을 촬영한 사진'}
                        {category === 'product' && '대표 메뉴, 상품을 촬영한 사진'}
                        {category === 'atmosphere' && '분위기, 인테리어 포인트, 감성컷'}
                        {category === 'unique' && '특이한 요소, 이벤트, 인증서 등'}
                        {category === 'other' && '그 외 활용 가능한 사진'}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {categoryMedia.map((media) => (
                        <div 
                          key={media.id}
                          className="group relative aspect-square rounded-xl overflow-hidden bg-muted cursor-pointer"
                          onClick={() => {
                            setSelectedMedia(media);
                            setMediaSheetOpen(true);
                          }}
                        >
                          <img 
                            src={media.url} 
                            alt={media.description || "Media"} 
                            className="w-full h-full object-cover"
                          />
                          
                          {/* Featured Badge */}
                          {media.isFeatured && (
                            <div className="absolute top-2 left-2">
                              <Badge variant="default" className="text-xs">
                                <Star className="w-3 h-3 mr-1" />
                                대표
                              </Badge>
                            </div>
                          )}

                          {/* Overlay */}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                            {/* Tags */}
                            <div className="flex flex-wrap gap-1">
                              {media.tags.slice(0, 3).map((tag, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs py-0.5 px-1.5 bg-white/20 text-white border-0">
                                  #{tag}
                                </Badge>
                              ))}
                              {media.tags.length > 3 && (
                                <Badge variant="secondary" className="text-xs py-0.5 px-1.5 bg-white/20 text-white border-0">
                                  +{media.tags.length - 3}
                                </Badge>
                              )}
                            </div>
                            
                            {/* Actions & Date */}
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-white/80">
                                {media.uploadedAt}
                              </span>
                              <div className="flex gap-1">
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-7 w-7 text-white hover:bg-white/20"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedMedia(media);
                                    setMediaSheetOpen(true);
                                  }}
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-7 w-7 text-white hover:bg-destructive/80"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteMedia(media.id);
                                  }}
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Add More Card */}
                      <div 
                        className="aspect-square rounded-xl border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary"
                        onClick={() => handleUploadMedia(category as MediaItem['category'])}
                      >
                        <Plus className="w-6 h-6" />
                        <span className="text-sm">추가</span>
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
