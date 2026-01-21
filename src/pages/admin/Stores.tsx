import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoreVertical, Search, Plus, ExternalLink, Eye } from "lucide-react";
import {
  adminStores,
  adminSubscriptions,
  adminCredits,
  planCatalog,
} from "@/data/adminSampleData";

export default function Stores() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [planFilter, setPlanFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [changePlanDialogOpen, setChangePlanDialogOpen] = useState(false);
  const [addCreditsDialogOpen, setAddCreditsDialogOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<string | null>(null);

  // 필터링된 매장 목록
  const filteredStores = useMemo(() => {
    return adminStores.filter((store) => {
      const matchesSearch =
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.ownerEmail.toLowerCase().includes(searchQuery.toLowerCase());
      const subscription = adminSubscriptions.find((s) => s.storeId === store.id);
      const matchesPlan = planFilter === "all" || subscription?.planId === planFilter;
      const matchesStatus = statusFilter === "all" || store.status === statusFilter;
      return matchesSearch && matchesPlan && matchesStatus;
    });
  }, [searchQuery, planFilter, statusFilter]);

  const handleStatusChange = (storeId: string, newStatus: "active" | "suspended") => {
    // TODO: 실제 DB 업데이트
    console.log(`Store ${storeId} status changed to ${newStatus}`);
  };

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">매장/계정 관리</h1>
        <p className="text-muted-foreground">
          매장 목록을 확인하고 관리하세요
        </p>
      </div>

      <Tabs defaultValue="stores" className="space-y-6">
        <TabsList>
          <TabsTrigger value="stores">매장</TabsTrigger>
          <TabsTrigger value="accounts" disabled>
            계정 (Coming soon)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="stores" className="space-y-6">

      {/* 필터바 */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="매장명 또는 오너 이메일 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={planFilter} onValueChange={setPlanFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="플랜 필터" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 플랜</SelectItem>
                {planCatalog.map((plan) => (
                  <SelectItem key={plan.id} value={plan.id}>
                    {plan.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="상태 필터" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 상태</SelectItem>
                <SelectItem value="active">활성</SelectItem>
                <SelectItem value="suspended">정지</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* 테이블 */}
      <Card>
        <CardHeader>
          <CardTitle>매장 목록 ({filteredStores.length}개)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>매장명</TableHead>
                <TableHead>업종</TableHead>
                <TableHead>오너 이메일</TableHead>
                <TableHead>플랜</TableHead>
                <TableHead>이번달 사용량</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>생성일</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStores.map((store) => {
                const subscription = adminSubscriptions.find((s) => s.storeId === store.id);
                const credits = adminCredits.find((c) => c.storeId === store.id);
                const plan = planCatalog.find((p) => p.id === subscription?.planId);

                return (
                  <TableRow
                    key={store.id}
                    className="cursor-pointer"
                    onClick={() => navigate(`/admin/stores/${store.id}`)}
                  >
                    <TableCell className="font-medium">{store.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {store.category}
                    </TableCell>
                    <TableCell className="text-sm">{store.ownerEmail}</TableCell>
                    <TableCell>
                      {plan ? (
                        <Badge variant="outline">{plan.name}</Badge>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm">
                      {credits ? (
                        <span>
                          {credits.usedThisMonth} / {credits.monthlyLimit}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={store.status === "active" ? "default" : "destructive"}
                      >
                        {store.status === "active" ? "활성" : "정지"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(store.createdAt).toLocaleDateString("ko-KR")}
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => navigate(`/admin/stores/${store.id}`)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            상세 보기
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              window.open(`/app/${store.id}/dashboard`, "_blank");
                            }}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            앱으로 보기
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedStore(store.id);
                              setChangePlanDialogOpen(true);
                            }}
                          >
                            플랜 변경
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedStore(store.id);
                              setAddCreditsDialogOpen(true);
                            }}
                          >
                            크레딧 추가
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(
                                store.id,
                                store.status === "active" ? "suspended" : "active"
                              )
                            }
                          >
                            {store.status === "active" ? "정지" : "활성화"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 플랜 변경 모달 */}
      <Dialog open={changePlanDialogOpen} onOpenChange={setChangePlanDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>플랜 변경</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>새 플랜 선택</Label>
              <Select
                onValueChange={(planId) => {
                  if (selectedStore) {
                    handlePlanChange(selectedStore, planId);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="플랜을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {planCatalog.map((plan) => (
                    <SelectItem key={plan.id} value={plan.id}>
                      {plan.name} ({plan.monthlyPrice.toLocaleString()}원/월)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 크레딧 추가 모달 */}
      <Dialog open={addCreditsDialogOpen} onOpenChange={setAddCreditsDialogOpen}>
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
                  if (e.key === "Enter" && selectedStore) {
                    const amount = parseInt((e.target as HTMLInputElement).value);
                    if (!isNaN(amount) && amount > 0) {
                      handleAddCredits(selectedStore, amount);
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
                  if (input && selectedStore) {
                    const amount = parseInt(input.value);
                    if (!isNaN(amount) && amount > 0) {
                      handleAddCredits(selectedStore, amount);
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
        </TabsContent>

        <TabsContent value="accounts" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <p className="text-muted-foreground">계정 관리 기능은 준비 중입니다.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
