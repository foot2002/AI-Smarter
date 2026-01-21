import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MoreVertical,
  Edit,
  Plus,
  AlertCircle,
  Check,
  X,
} from "lucide-react";
import { toast } from "sonner";
import {
  adminStores,
  adminSubscriptions,
  adminCredits,
  planCatalog,
} from "@/data/adminSampleData";

export default function Billing() {
  const [changePlanDialogOpen, setChangePlanDialogOpen] = useState(false);
  const [addCreditsDialogOpen, setAddCreditsDialogOpen] = useState(false);
  const [editPlanSheetOpen, setEditPlanSheetOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // 탭 1: 플랜/구독 관리
  const filteredSubscriptions = adminSubscriptions.filter((sub) => {
    const store = adminStores.find((s) => s.id === sub.storeId);
    return (
      !searchQuery ||
      store?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store?.ownerEmail.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // 탭 2: 크레딧/사용 제한
  const filteredCredits = adminCredits.filter((credit) => {
    const store = adminStores.find((s) => s.id === credit.storeId);
    return (
      !searchQuery ||
      store?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store?.ownerEmail.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handlePlanChange = (storeId: string, planId: string) => {
    // TODO: 실제 DB 업데이트
    console.log(`Store ${storeId} plan changed to ${planId}`);
    setChangePlanDialogOpen(false);
    setSelectedStore(null);
  };

  const handleAddCredits = (storeId: string, amount: number) => {
    // TODO: 실제 DB 업데이트
    console.log(`Added ${amount} credits to store ${storeId}`);
    setAddCreditsDialogOpen(false);
    setSelectedStore(null);
  };

  const handleTogglePause = (storeId: string, paused: boolean) => {
    // TODO: 실제 DB 업데이트
    console.log(`Store ${storeId} pause toggled: ${paused}`);
  };

  const handleUpdateLimit = (storeId: string, limit: number) => {
    // TODO: 실제 DB 업데이트
    console.log(`Store ${storeId} limit updated to ${limit}`);
  };

  const handleSavePlan = (planData: any) => {
    // TODO: 실제 DB 저장
    console.log("Plan saved:", planData);
    toast.success("요금제 저장 완료");
    setEditPlanSheetOpen(false);
    setSelectedPlan(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">결제/권한 관리</h1>
        <p className="text-muted-foreground">
          플랜, 구독, 크레딧 및 가격정책을 관리하세요
        </p>
      </div>

      <Tabs defaultValue="subscriptions" className="space-y-6">
        <TabsList>
          <TabsTrigger value="subscriptions">플랜/구독 관리</TabsTrigger>
          <TabsTrigger value="credits">크레딧/사용 제한</TabsTrigger>
          <TabsTrigger value="plans">가격정책</TabsTrigger>
        </TabsList>

        {/* 탭 1: 플랜/구독 관리 */}
        <TabsContent value="subscriptions" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Input
                  placeholder="매장명 또는 오너 이메일 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>구독 목록</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium mb-1">안내</p>
                    <p>
                      실제 결제 청구/환불은 PG 대시보드에서 진행합니다. (추후 연동 예정)
                    </p>
                  </div>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>매장명</TableHead>
                    <TableHead>오너</TableHead>
                    <TableHead>플랜</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead>갱신일</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubscriptions.map((sub) => {
                    const store = adminStores.find((s) => s.id === sub.storeId);
                    const plan = planCatalog.find((p) => p.id === sub.planId);
                    return (
                      <TableRow key={sub.storeId}>
                        <TableCell className="font-medium">
                          {store?.name || sub.storeId}
                        </TableCell>
                        <TableCell className="text-sm">
                          {store?.ownerEmail || "-"}
                        </TableCell>
                        <TableCell>
                          {plan ? (
                            <Badge variant="outline">{plan.name}</Badge>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              sub.status === "active"
                                ? "default"
                                : sub.status === "trial"
                                ? "secondary"
                                : "destructive"
                            }
                          >
                            {sub.status === "active"
                              ? "활성"
                              : sub.status === "trial"
                              ? "트라이얼"
                              : "해지"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">
                          {new Date(sub.renewAt).toLocaleDateString("ko-KR")}
                        </TableCell>
                        <TableCell>
                          <Dialog
                            open={
                              changePlanDialogOpen && selectedStore === sub.storeId
                            }
                            onOpenChange={(open) => {
                              setChangePlanDialogOpen(open);
                              if (!open) setSelectedStore(null);
                            }}
                          >
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setSelectedStore(sub.storeId)}
                              >
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>플랜 변경</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <Label>새 플랜 선택</Label>
                                  <Select
                                    onValueChange={(planId) =>
                                      handlePlanChange(sub.storeId, planId)
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="플랜을 선택하세요" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {planCatalog.map((p) => (
                                        <SelectItem key={p.id} value={p.id}>
                                          {p.name} ({p.monthlyPrice.toLocaleString()}원/월)
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 탭 2: 크레딧/사용 제한 */}
        <TabsContent value="credits" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Input
                  placeholder="매장명 또는 오너 이메일 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>크레딧 관리</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium mb-1">경고</p>
                    <p>
                      남용 방지 목적, 운영자 조치가 기록됩니다. (추후 감사로그 연동 예정)
                    </p>
                  </div>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>매장명</TableHead>
                    <TableHead>플랜</TableHead>
                    <TableHead>월 한도</TableHead>
                    <TableHead>사용량</TableHead>
                    <TableHead>잔여</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead className="w-[100px]">일시중지</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCredits.map((credit) => {
                    const store = adminStores.find((s) => s.id === credit.storeId);
                    const subscription = adminSubscriptions.find(
                      (s) => s.storeId === credit.storeId
                    );
                    const plan = planCatalog.find((p) => p.id === subscription?.planId);
                    return (
                      <TableRow key={credit.storeId}>
                        <TableCell className="font-medium">
                          {store?.name || credit.storeId}
                        </TableCell>
                        <TableCell>
                          {plan ? (
                            <Badge variant="outline">{plan.name}</Badge>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                        <TableCell>{credit.monthlyLimit.toLocaleString()}</TableCell>
                        <TableCell>{credit.usedThisMonth.toLocaleString()}</TableCell>
                        <TableCell className="font-medium text-primary">
                          {credit.balance.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={credit.isPaused ? "destructive" : "default"}
                          >
                            {credit.isPaused ? "중지" : "활성"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={credit.isPaused}
                            onCheckedChange={(checked) =>
                              handleTogglePause(credit.storeId, checked)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Dialog
                            open={
                              addCreditsDialogOpen && selectedStore === credit.storeId
                            }
                            onOpenChange={(open) => {
                              setAddCreditsDialogOpen(open);
                              if (!open) setSelectedStore(null);
                            }}
                          >
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setSelectedStore(credit.storeId)}
                              >
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>크레딧 관리</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <Label>월 한도 변경</Label>
                                  <Input
                                    type="number"
                                    placeholder="예: 1000"
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        const limit = parseInt(
                                          (e.target as HTMLInputElement).value
                                        );
                                        if (!isNaN(limit) && limit > 0) {
                                          handleUpdateLimit(credit.storeId, limit);
                                        }
                                      }
                                    }}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>추가 크레딧 지급</Label>
                                  <Input
                                    type="number"
                                    placeholder="예: 100"
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        const amount = parseInt(
                                          (e.target as HTMLInputElement).value
                                        );
                                        if (!isNaN(amount) && amount > 0) {
                                          handleAddCredits(credit.storeId, amount);
                                        }
                                      }
                                    }}
                                  />
                                </div>
                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="outline"
                                    onClick={() => setAddCreditsDialogOpen(false)}
                                  >
                                    취소
                                  </Button>
                                  <Button
                                    onClick={() => {
                                      const limitInput = document.querySelector(
                                        'input[placeholder="예: 1000"]'
                                      ) as HTMLInputElement;
                                      const creditInput = document.querySelector(
                                        'input[placeholder="예: 100"]'
                                      ) as HTMLInputElement;
                                      if (limitInput) {
                                        const limit = parseInt(limitInput.value);
                                        if (!isNaN(limit) && limit > 0) {
                                          handleUpdateLimit(credit.storeId, limit);
                                        }
                                      }
                                      if (creditInput) {
                                        const amount = parseInt(creditInput.value);
                                        if (!isNaN(amount) && amount > 0) {
                                          handleAddCredits(credit.storeId, amount);
                                        }
                                      }
                                    }}
                                  >
                                    저장
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 탭 3: 가격정책 */}
        <TabsContent value="plans" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>요금제 카탈로그</CardTitle>
                <Button
                  onClick={() => {
                    setSelectedPlan(null);
                    setEditPlanSheetOpen(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  새 요금제 추가
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">주의</p>
                    <p>
                      실제 결제 청구는 PG 설정과 함께 맞춰야 합니다. 현재는 운영 정책/노출
                      가격 관리 UI이며, PG 연동 시 동기화가 필요합니다.
                    </p>
                  </div>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>플랜명</TableHead>
                    <TableHead>월 요금</TableHead>
                    <TableHead>연 요금</TableHead>
                    <TableHead>월 크레딧</TableHead>
                    <TableHead>포함 기능</TableHead>
                    <TableHead>노출</TableHead>
                    <TableHead>추천</TableHead>
                    <TableHead>순서</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {planCatalog
                    .sort((a, b) => a.sortOrder - b.sortOrder)
                    .map((plan) => (
                      <TableRow
                        key={plan.id}
                        className="cursor-pointer"
                        onClick={() => {
                          setSelectedPlan(plan.id);
                          setEditPlanSheetOpen(true);
                        }}
                      >
                        <TableCell className="font-medium">
                          {plan.name}
                          {plan.isContactSales && (
                            <Badge variant="outline" className="ml-2">
                              협의
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {plan.isContactSales
                            ? "협의"
                            : `${plan.monthlyPrice.toLocaleString()}원`}
                        </TableCell>
                        <TableCell>
                          {plan.isContactSales
                            ? "협의"
                            : `${plan.yearlyPrice.toLocaleString()}원`}
                        </TableCell>
                        <TableCell>{plan.monthlyCredits.toLocaleString()}</TableCell>
                        <TableCell className="text-sm">
                          {[
                            plan.features.blog && "블로그",
                            plan.features.shorts && "쇼츠",
                            plan.features.sns && "SNS",
                            plan.features.scheduling && "예약",
                            plan.features.analyticsPro && "고급분석",
                            plan.features.multiStore && "다매장",
                            plan.features.team && "팀",
                          ]
                            .filter(Boolean)
                            .join(", ")}
                        </TableCell>
                        <TableCell>
                          {plan.isVisible ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <X className="w-4 h-4 text-muted-foreground" />
                          )}
                        </TableCell>
                        <TableCell>
                          {plan.isRecommended ? (
                            <Badge variant="default">추천</Badge>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                        <TableCell>{plan.sortOrder}</TableCell>
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedPlan(plan.id);
                              setEditPlanSheetOpen(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* 요금제 편집 드로어 */}
          <Sheet open={editPlanSheetOpen} onOpenChange={setEditPlanSheetOpen}>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>
                  {selectedPlan
                    ? planCatalog.find((p) => p.id === selectedPlan)?.name || "요금제 편집"
                    : "새 요금제 추가"}
                </SheetTitle>
              </SheetHeader>
              <PlanEditForm
                plan={
                  selectedPlan
                    ? planCatalog.find((p) => p.id === selectedPlan)
                    : undefined
                }
                onSave={handleSavePlan}
                onCancel={() => setEditPlanSheetOpen(false)}
              />
            </SheetContent>
          </Sheet>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// 요금제 편집 폼 컴포넌트
function PlanEditForm({
  plan,
  onSave,
  onCancel,
}: {
  plan?: typeof planCatalog[0];
  onSave: (data: any) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    name: plan?.name || "",
    monthlyPrice: plan?.monthlyPrice || 0,
    yearlyPrice: plan?.yearlyPrice || 0,
    monthlyCredits: plan?.monthlyCredits || 0,
    isContactSales: plan?.isContactSales || false,
    features: {
      blog: plan?.features.blog || false,
      shorts: plan?.features.shorts || false,
      sns: plan?.features.sns || false,
      scheduling: plan?.features.scheduling || false,
      analyticsPro: plan?.features.analyticsPro || false,
      multiStore: plan?.features.multiStore || false,
      team: plan?.features.team || false,
    },
    isVisible: plan?.isVisible ?? true,
    isRecommended: plan?.isRecommended || false,
    sortOrder: plan?.sortOrder || 0,
    descriptionLines: plan?.descriptionLines.join("\n") || "",
  });

  return (
    <div className="space-y-6 py-6">
      <div className="space-y-2">
        <Label>플랜명 *</Label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="예: Starter"
        />
      </div>

      <div className="space-y-2">
        <Label>도입문의(협의) 플랜</Label>
        <div className="flex items-center space-x-2">
          <Switch
            checked={formData.isContactSales}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, isContactSales: checked })
            }
          />
          <Label className="text-sm text-muted-foreground">
            협의 플랜으로 설정 (가격 입력 비활성화)
          </Label>
        </div>
      </div>

      {!formData.isContactSales && (
        <>
          <div className="space-y-2">
            <Label>월간 요금 (KRW) *</Label>
            <Input
              type="number"
              value={formData.monthlyPrice}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  monthlyPrice: parseInt(e.target.value) || 0,
                })
              }
              placeholder="예: 29000"
            />
          </div>

          <div className="space-y-2">
            <Label>연간 요금 (KRW) *</Label>
            <Input
              type="number"
              value={formData.yearlyPrice}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  yearlyPrice: parseInt(e.target.value) || 0,
                })
              }
              placeholder="예: 290000"
            />
          </div>
        </>
      )}

      <div className="space-y-2">
        <Label>월 크레딧 *</Label>
        <Input
          type="number"
          value={formData.monthlyCredits}
          onChange={(e) =>
            setFormData({
              ...formData,
              monthlyCredits: parseInt(e.target.value) || 0,
            })
          }
          placeholder="예: 500"
        />
      </div>

      <div className="space-y-3">
        <Label>포함 기능</Label>
        <div className="space-y-2">
          {[
            { key: "blog", label: "블로그 생성" },
            { key: "shorts", label: "쇼츠 생성" },
            { key: "sns", label: "SNS 생성" },
            { key: "scheduling", label: "예약 기능" },
            { key: "analyticsPro", label: "성과분석(고급)" },
            { key: "multiStore", label: "팀/다매장" },
            { key: "team", label: "팀 기능" },
          ].map((feature) => (
            <div key={feature.key} className="flex items-center space-x-2">
              <Switch
                checked={formData.features[feature.key as keyof typeof formData.features]}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    features: {
                      ...formData.features,
                      [feature.key]: checked,
                    },
                  })
                }
              />
              <Label className="text-sm">{feature.label}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label>노출 설정</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Switch
              checked={formData.isVisible}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, isVisible: checked })
              }
            />
            <Label className="text-sm">노출 여부</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={formData.isRecommended}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, isRecommended: checked })
              }
            />
            <Label className="text-sm">추천 배지</Label>
          </div>
          <div className="space-y-2">
            <Label className="text-sm">정렬 우선순위</Label>
            <Input
              type="number"
              value={formData.sortOrder}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  sortOrder: parseInt(e.target.value) || 0,
                })
              }
              placeholder="낮을수록 먼저 표시"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>플랜 설명 (랜딩 노출용, 줄바꿈으로 구분)</Label>
        <Textarea
          value={formData.descriptionLines}
          onChange={(e) =>
            setFormData({ ...formData, descriptionLines: e.target.value })
          }
          placeholder="예:&#10;소상공인을 위한 기본 플랜&#10;월 500 크레딧으로 시작하세요"
          rows={4}
        />
      </div>

      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button variant="outline" onClick={onCancel}>
          취소
        </Button>
        <Button onClick={() => onSave(formData)}>저장</Button>
      </div>
    </div>
  );
}
