import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Edit, Plus } from "lucide-react";
import {
  adminStores,
  adminSubscriptions,
  adminCredits,
  planCatalog,
  usageEvents,
  errorLogs,
  adminNotes,
} from "@/data/adminSampleData";
import { useState } from "react";

export default function StoreDetail() {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const [changePlanDialogOpen, setChangePlanDialogOpen] = useState(false);
  const [addCreditsDialogOpen, setAddCreditsDialogOpen] = useState(false);
  const [adminNote, setAdminNote] = useState("");

  const store = adminStores.find((s) => s.id === storeId);
  const subscription = adminSubscriptions.find((s) => s.storeId === storeId);
  const credits = adminCredits.find((c) => c.storeId === storeId);
  const plan = planCatalog.find((p) => p.id === subscription?.planId);
  const storeNotes = adminNotes.filter((n) => n.targetId === storeId);
  const recentUsage = usageEvents
    .filter((e) => e.storeId === storeId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10);
  const recentErrors = errorLogs
    .filter((e) => e.storeId === storeId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  if (!store) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => navigate("/admin/stores")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          목록으로
        </Button>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">매장을 찾을 수 없습니다.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handlePlanChange = (planId: string) => {
    // TODO: 실제 DB 업데이트
    console.log(`Store ${storeId} plan changed to ${planId}`);
    setChangePlanDialogOpen(false);
  };

  const handleAddCredits = (amount: number) => {
    // TODO: 실제 DB 업데이트
    console.log(`Added ${amount} credits to store ${storeId}`);
    setAddCreditsDialogOpen(false);
  };

  const handleTogglePause = (paused: boolean) => {
    // TODO: 실제 DB 업데이트
    console.log(`Store ${storeId} pause toggled: ${paused}`);
  };

  const handleSaveNote = () => {
    // TODO: 실제 DB 저장
    console.log(`Note saved for store ${storeId}: ${adminNote}`);
    setAdminNote("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" onClick={() => navigate("/admin/stores")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            목록으로
          </Button>
          <h1 className="text-2xl font-bold mt-2">{store.name}</h1>
        </div>
      </div>

      {/* 권한 바(요약) */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6">
              <div>
                <Label className="text-xs text-muted-foreground">플랜</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-sm">
                    {plan?.name || "-"}
                  </Badge>
                  {subscription && (
                    <Badge
                      variant={
                        subscription.status === "active"
                          ? "default"
                          : subscription.status === "trial"
                          ? "secondary"
                          : "destructive"
                      }
                      className="text-xs"
                    >
                      {subscription.status === "active"
                        ? "활성"
                        : subscription.status === "trial"
                        ? "트라이얼"
                        : "해지"}
                    </Badge>
                  )}
                </div>
              </div>
              {credits && (
                <>
                  <div>
                    <Label className="text-xs text-muted-foreground">월 크레딧</Label>
                    <p className="text-sm font-medium mt-1">
                      {credits.usedThisMonth.toLocaleString()} / {credits.monthlyLimit.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">잔여</Label>
                    <p className="text-sm font-medium text-primary mt-1">
                      {credits.balance.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">일시중지</Label>
                    <div className="mt-1">
                      <Badge
                        variant={credits.isPaused ? "destructive" : "outline"}
                        className="text-xs"
                      >
                        {credits.isPaused ? "중지됨" : "정상"}
                      </Badge>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Dialog open={changePlanDialogOpen} onOpenChange={setChangePlanDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    플랜 변경
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>플랜 변경</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>새 플랜 선택</Label>
                      <Select onValueChange={handlePlanChange}>
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
              <Dialog open={addCreditsDialogOpen} onOpenChange={setAddCreditsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    크레딧 추가
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>크레딧 추가</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>추가할 크레딧 수량</Label>
                      <Input
                        type="number"
                        placeholder="예: 100"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            const amount = parseInt((e.target as HTMLInputElement).value);
                            if (!isNaN(amount) && amount > 0) {
                              handleAddCredits(amount);
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
                          const input = document.querySelector(
                            'input[type="number"]'
                          ) as HTMLInputElement;
                          if (input) {
                            const amount = parseInt(input.value);
                            if (!isNaN(amount) && amount > 0) {
                              handleAddCredits(amount);
                            }
                          }
                        }}
                      >
                        추가
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              {credits && (
                <Button
                  variant={credits.isPaused ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleTogglePause(!credits.isPaused)}
                >
                  {credits.isPaused ? "일시중지 해제" : "생성 일시중지"}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 기본 정보 */}
      <Card>
        <CardHeader>
          <CardTitle>기본 정보</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label className="text-muted-foreground">매장명</Label>
              <p className="font-medium">{store.name}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">업종</Label>
              <p className="font-medium">{store.category}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">오너 이메일</Label>
              <p className="font-medium">{store.ownerEmail}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">상태</Label>
              <div className="mt-1">
                <Badge
                  variant={store.status === "active" ? "default" : "destructive"}
                >
                  {store.status === "active" ? "활성" : "정지"}
                </Badge>
              </div>
            </div>
            <div>
              <Label className="text-muted-foreground">생성일</Label>
              <p className="font-medium">
                {new Date(store.createdAt).toLocaleDateString("ko-KR")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 권한/플랜 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>권한/플랜</CardTitle>
            <Dialog open={changePlanDialogOpen} onOpenChange={setChangePlanDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  플랜 변경
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>플랜 변경</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>새 플랜 선택</Label>
                    <Select onValueChange={handlePlanChange}>
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
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label className="text-muted-foreground">현재 플랜</Label>
              <p className="font-medium mt-1">
                {plan ? (
                  <>
                    {plan.name}
                    {plan.isContactSales && (
                      <Badge variant="outline" className="ml-2">
                        협의
                      </Badge>
                    )}
                  </>
                ) : (
                  "-"
                )}
              </p>
            </div>
            <div>
              <Label className="text-muted-foreground">상태</Label>
              <div className="mt-1">
                <Badge
                  variant={
                    subscription?.status === "active"
                      ? "default"
                      : subscription?.status === "trial"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {subscription?.status === "active"
                    ? "활성"
                    : subscription?.status === "trial"
                    ? "트라이얼"
                    : "해지"}
                </Badge>
              </div>
            </div>
            <div>
              <Label className="text-muted-foreground">
                {subscription?.status === "trial" ? "트라이얼 종료일" : "갱신일"}
              </Label>
              <p className="font-medium mt-1">
                {subscription?.trialEndsAt
                  ? new Date(subscription.trialEndsAt).toLocaleDateString("ko-KR")
                  : subscription?.renewAt
                  ? new Date(subscription.renewAt).toLocaleDateString("ko-KR")
                  : "-"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 크레딧/사용량 요약 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>크레딧/사용량 요약</CardTitle>
            <Dialog open={addCreditsDialogOpen} onOpenChange={setAddCreditsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  크레딧 추가
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>크레딧 추가</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>추가할 크레딧 수량</Label>
                    <Input
                      type="number"
                      placeholder="예: 100"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const amount = parseInt((e.target as HTMLInputElement).value);
                          if (!isNaN(amount) && amount > 0) {
                            handleAddCredits(amount);
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
                        const input = document.querySelector(
                          'input[type="number"]'
                        ) as HTMLInputElement;
                        if (input) {
                          const amount = parseInt(input.value);
                          if (!isNaN(amount) && amount > 0) {
                            handleAddCredits(amount);
                          }
                        }
                      }}
                    >
                      추가
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {credits ? (
              <>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <Label className="text-muted-foreground">월 한도</Label>
                    <p className="font-medium text-lg mt-1">
                      {credits.monthlyLimit.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">사용량</Label>
                    <p className="font-medium text-lg mt-1">
                      {credits.usedThisMonth.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">잔여</Label>
                    <p className="font-medium text-lg mt-1 text-primary">
                      {credits.balance.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="space-y-1">
                    <Label>생성 일시중지</Label>
                    <p className="text-sm text-muted-foreground">
                      콘텐츠 생성 기능을 일시적으로 중지합니다
                    </p>
                  </div>
                  <Switch
                    checked={credits.isPaused}
                    onCheckedChange={handleTogglePause}
                  />
                </div>
              </>
            ) : (
              <p className="text-muted-foreground">크레딧 정보가 없습니다.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 최근 사용 로그 */}
      <Card>
        <CardHeader>
          <CardTitle>최근 사용 로그</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-3">최근 10건 생성 로그</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>시간</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead>토큰</TableHead>
                    <TableHead>비용</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsage.length > 0 ? (
                    recentUsage.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="text-sm">
                          {new Date(event.createdAt).toLocaleString("ko-KR")}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{event.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={event.status === "success" ? "default" : "destructive"}
                          >
                            {event.status === "success" ? "성공" : "실패"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">
                          {event.tokens?.toLocaleString() || "-"}
                        </TableCell>
                        <TableCell className="text-sm">
                          {event.cost ? `${event.cost.toLocaleString()}원` : "-"}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground">
                        사용 로그가 없습니다.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div>
              <h3 className="font-medium mb-3">최근 실패 로그 5건</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>시간</TableHead>
                    <TableHead>라우트</TableHead>
                    <TableHead>에러 메시지</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentErrors.length > 0 ? (
                    recentErrors.map((error) => (
                      <TableRow key={error.id}>
                        <TableCell className="text-sm">
                          {new Date(error.createdAt).toLocaleString("ko-KR")}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {error.route}
                        </TableCell>
                        <TableCell className="text-sm text-destructive">
                          {error.message}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-muted-foreground">
                        실패 로그가 없습니다.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 내부 메모 */}
      <Card>
        <CardHeader>
          <CardTitle>지원 메모</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {storeNotes.length > 0 && (
              <div className="space-y-2">
                <Label>기존 메모</Label>
                {storeNotes.map((note) => (
                  <div
                    key={note.id}
                    className="p-3 bg-muted rounded-lg text-sm"
                  >
                    <p className="text-muted-foreground text-xs mb-1">
                      {new Date(note.createdAt).toLocaleString("ko-KR")}
                    </p>
                    <p>{note.note}</p>
                  </div>
                ))}
              </div>
            )}
            <div className="space-y-2">
              <Label>새 메모 작성</Label>
              <Textarea
                placeholder="내부 메모를 입력하세요..."
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                rows={4}
              />
            </div>
            <div className="flex justify-end">
              <Button onClick={handleSaveNote} disabled={!adminNote.trim()}>
                저장
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
