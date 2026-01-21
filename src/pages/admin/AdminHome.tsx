import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Store,
  TrendingUp,
  CreditCard,
  AlertCircle,
  FileText,
  ArrowRight,
} from "lucide-react";
import {
  adminStores,
  adminSubscriptions,
  usageEvents,
  errorLogs,
} from "@/data/adminSampleData";

export default function AdminHome() {
  // KPI 계산
  const today = new Date().toISOString().split("T")[0];
  const todayStores = adminStores.filter(
    (s) => s.createdAt === today
  ).length;
  const activeStores = adminStores.filter((s) => s.status === "active").length;
  const paidStores = adminSubscriptions.filter(
    (s) => s.status === "active"
  ).length;
  const thisWeekEvents = usageEvents.filter((e) => {
    const eventDate = new Date(e.createdAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return eventDate >= weekAgo;
  }).length;
  const failedEvents = usageEvents.filter((e) => e.status === "fail").length;
  const totalTokens = usageEvents
    .filter((e) => e.status === "success")
    .reduce((sum, e) => sum + (e.tokens || 0), 0);
  const estimatedCost = usageEvents
    .filter((e) => e.status === "success")
    .reduce((sum, e) => sum + (e.cost || 0), 0);

  // 최근 이슈 (실패 로그 상위 10건)
  const recentErrors = errorLogs
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10);

  // 최근 가입 매장
  const recentStores = adminStores
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  // 최근 사용 TOP 매장
  const storeUsageMap = new Map<string, number>();
  usageEvents.forEach((e) => {
    const count = storeUsageMap.get(e.storeId) || 0;
    storeUsageMap.set(e.storeId, count + 1);
  });
  const topStores = Array.from(storeUsageMap.entries())
    .map(([storeId, count]) => {
      const store = adminStores.find((s) => s.id === storeId);
      return { store, count };
    })
    .filter((item) => item.store)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">관리자 대시보드</h1>
        <p className="text-muted-foreground">
          플랫폼 운영 현황을 한눈에 확인하세요
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">오늘 신규 매장</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStores}</div>
            <p className="text-xs text-muted-foreground">신규 가입</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">활성 매장 수</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeStores}</div>
            <p className="text-xs text-muted-foreground">전체 {adminStores.length}개 중</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">유료 매장 수</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paidStores}</div>
            <p className="text-xs text-muted-foreground">활성 구독</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">이번주 생성 요청</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{thisWeekEvents}</div>
            <p className="text-xs text-muted-foreground">콘텐츠 생성</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">실패 건수</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{failedEvents}</div>
            <p className="text-xs text-muted-foreground">이번주</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">예상 사용량</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTokens.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              토큰 / 약 {estimatedCost.toLocaleString()}원
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 최근 이슈 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>최근 이슈</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/usage">
                전체 보기
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>시간</TableHead>
                <TableHead>매장</TableHead>
                <TableHead>라우트</TableHead>
                <TableHead>에러 메시지</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentErrors.map((error) => {
                const store = adminStores.find((s) => s.id === error.storeId);
                return (
                  <TableRow key={error.id}>
                    <TableCell className="text-sm">
                      {new Date(error.createdAt).toLocaleString("ko-KR")}
                    </TableCell>
                    <TableCell>{store?.name || error.storeId}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {error.route}
                    </TableCell>
                    <TableCell className="text-sm text-destructive">
                      {error.message}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 최근 가입 / 최근 사용 TOP 매장 */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>최근 가입 매장</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>매장명</TableHead>
                  <TableHead>업종</TableHead>
                  <TableHead>가입일</TableHead>
                  <TableHead>상태</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentStores.map((store) => (
                  <TableRow key={store.id}>
                    <TableCell>
                      <Link
                        to={`/admin/stores/${store.id}`}
                        className="font-medium hover:underline"
                      >
                        {store.name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {store.category}
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(store.createdAt).toLocaleDateString("ko-KR")}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={store.status === "active" ? "default" : "destructive"}
                      >
                        {store.status === "active" ? "활성" : "정지"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>최근 사용 TOP 매장</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>매장명</TableHead>
                  <TableHead>업종</TableHead>
                  <TableHead>사용 횟수</TableHead>
                  <TableHead>상태</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topStores.map((item) => {
                  const store = item.store!;
                  return (
                    <TableRow key={store.id}>
                      <TableCell>
                        <Link
                          to={`/admin/stores/${store.id}`}
                          className="font-medium hover:underline"
                        >
                          {store.name}
                        </Link>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {store.category}
                      </TableCell>
                      <TableCell className="font-medium">{item.count}회</TableCell>
                      <TableCell>
                        <Badge
                          variant={store.status === "active" ? "default" : "destructive"}
                        >
                          {store.status === "active" ? "활성" : "정지"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
