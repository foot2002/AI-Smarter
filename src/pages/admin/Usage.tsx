import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  FileText,
  Video,
  Share2,
  ExternalLink,
  Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  usageEvents,
  errorLogs,
  adminStores,
} from "@/data/adminSampleData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

export default function Usage() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState<"7" | "30" | "90" | "custom">("30");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [storeFilter, setStoreFilter] = useState<string>("all");
  const [routeFilter, setRouteFilter] = useState<string>("all");
  const [keywordFilter, setKeywordFilter] = useState("");
  const [errorDetailOpen, setErrorDetailOpen] = useState(false);
  const [selectedError, setSelectedError] = useState<string | null>(null);

  // 기간 계산
  const dateRange = useMemo(() => {
    const end = new Date();
    let start = new Date();
    if (period === "7") {
      start.setDate(start.getDate() - 7);
    } else if (period === "30") {
      start.setDate(start.getDate() - 30);
    } else if (period === "90") {
      start.setDate(start.getDate() - 90);
    } else if (period === "custom" && customStart && customEnd) {
      start = new Date(customStart);
      end.setTime(new Date(customEnd).getTime());
    }
    return { start, end };
  }, [period, customStart, customEnd]);

  // 필터링된 사용 이벤트
  const filteredEvents = useMemo(() => {
    return usageEvents.filter((event) => {
      const eventDate = new Date(event.createdAt);
      const inRange = eventDate >= dateRange.start && eventDate <= dateRange.end;
      const matchesStore = storeFilter === "all" || event.storeId === storeFilter;
      return inRange && matchesStore;
    });
  }, [dateRange, storeFilter]);

  // 필터링된 에러 로그
  const filteredErrors = useMemo(() => {
    return errorLogs.filter((error) => {
      const errorDate = new Date(error.createdAt);
      const inRange = errorDate >= dateRange.start && errorDate <= dateRange.end;
      const matchesStore = storeFilter === "all" || error.storeId === storeFilter;
      const matchesRoute = routeFilter === "all" || error.route.includes(routeFilter);
      const matchesKeyword =
        !keywordFilter ||
        error.message.toLowerCase().includes(keywordFilter.toLowerCase()) ||
        error.route.toLowerCase().includes(keywordFilter.toLowerCase());
      return inRange && matchesStore && matchesRoute && matchesKeyword;
    });
  }, [dateRange, storeFilter, routeFilter, keywordFilter]);

  // 타입별 사용량 통계
  const typeStats = useMemo(() => {
    const stats = { blog: 0, shorts: 0, sns: 0 };
    filteredEvents.forEach((event) => {
      if (event.status === "success") {
        stats[event.type]++;
      }
    });
    return stats;
  }, [filteredEvents]);

  // 매장별 사용량 TOP
  const storeUsageStats = useMemo(() => {
    const map = new Map<string, number>();
    filteredEvents.forEach((event) => {
      if (event.status === "success") {
        const count = map.get(event.storeId) || 0;
        map.set(event.storeId, count + 1);
      }
    });
    return Array.from(map.entries())
      .map(([storeId, count]) => {
        const store = adminStores.find((s) => s.id === storeId);
        return { store, count };
      })
      .filter((item) => item.store)
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [filteredEvents]);

  // 일자별 성공/실패 추이
  const dailyStats = useMemo(() => {
    const map = new Map<string, { success: number; fail: number }>();
    filteredEvents.forEach((event) => {
      const date = new Date(event.createdAt).toISOString().split("T")[0];
      const stats = map.get(date) || { success: 0, fail: 0 };
      if (event.status === "success") {
        stats.success++;
      } else {
        stats.fail++;
      }
      map.set(date, stats);
    });
    return Array.from(map.entries())
      .map(([date, stats]) => ({
        date: new Date(date).toLocaleDateString("ko-KR", { month: "short", day: "numeric" }),
        성공: stats.success,
        실패: stats.fail,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [filteredEvents]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">사용량/로그</h1>
        <p className="text-muted-foreground">
          콘텐츠 생성 사용량과 에러 로그를 확인하세요
        </p>
      </div>

      {/* 기간 필터 */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex gap-2">
              <Button
                variant={period === "7" ? "default" : "outline"}
                size="sm"
                onClick={() => setPeriod("7")}
              >
                최근 7일
              </Button>
              <Button
                variant={period === "30" ? "default" : "outline"}
                size="sm"
                onClick={() => setPeriod("30")}
              >
                최근 30일
              </Button>
              <Button
                variant={period === "90" ? "default" : "outline"}
                size="sm"
                onClick={() => setPeriod("90")}
              >
                최근 90일
              </Button>
              <Button
                variant={period === "custom" ? "default" : "outline"}
                size="sm"
                onClick={() => setPeriod("custom")}
              >
                직접 선택
              </Button>
            </div>
            {period === "custom" && (
              <div className="flex gap-2">
                <div className="space-y-1">
                  <Label className="text-xs">시작일</Label>
                  <Input
                    type="date"
                    value={customStart}
                    onChange={(e) => setCustomStart(e.target.value)}
                    className="w-[150px]"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">종료일</Label>
                  <Input
                    type="date"
                    value={customEnd}
                    onChange={(e) => setCustomEnd(e.target.value)}
                    className="w-[150px]"
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="by-type" className="space-y-6">
        <TabsList>
          <TabsTrigger value="by-type">타입별 사용량</TabsTrigger>
          <TabsTrigger value="by-store">매장별 사용량 TOP</TabsTrigger>
          <TabsTrigger value="errors">실패/에러 로그</TabsTrigger>
        </TabsList>

        {/* 탭 1: 타입별 사용량 */}
        <TabsContent value="by-type" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>타입별 요청 수</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { name: "블로그", value: typeStats.blog, icon: FileText },
                    { name: "쇼츠", value: typeStats.shorts, icon: Video },
                    { name: "SNS", value: typeStats.sns, icon: Share2 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>일자별 성공/실패 추이</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dailyStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="성공" stroke="hsl(var(--primary))" />
                    <Line type="monotone" dataKey="실패" stroke="hsl(var(--destructive))" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>사용 이벤트 목록</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>시간</TableHead>
                    <TableHead>매장</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead>토큰</TableHead>
                    <TableHead>비용</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvents
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((event) => {
                      const store = adminStores.find((s) => s.id === event.storeId);
                      return (
                        <TableRow key={event.id}>
                          <TableCell className="text-sm">
                            {new Date(event.createdAt).toLocaleString("ko-KR")}
                          </TableCell>
                          <TableCell>{store?.name || event.storeId}</TableCell>
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
                      );
                    })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 탭 2: 매장별 사용량 TOP */}
        <TabsContent value="by-store" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>매장별 사용량 TOP</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>순위</TableHead>
                    <TableHead>매장명</TableHead>
                    <TableHead>업종</TableHead>
                    <TableHead>사용 횟수</TableHead>
                    <TableHead>상태</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {storeUsageStats.map((item, index) => {
                    const store = item.store!;
                    return (
                      <TableRow key={store.id}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell className="font-medium">{store.name}</TableCell>
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
        </TabsContent>

        {/* 탭 3: 실패/에러 로그 */}
        <TabsContent value="errors" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <Select value={storeFilter} onValueChange={setStoreFilter}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="매장 필터" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">모든 매장</SelectItem>
                    {adminStores.map((store) => (
                      <SelectItem key={store.id} value={store.id}>
                        {store.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={routeFilter} onValueChange={setRouteFilter}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="라우트 필터" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">모든 라우트</SelectItem>
                    <SelectItem value="/content">콘텐츠</SelectItem>
                    <SelectItem value="/insights">인사이트</SelectItem>
                    <SelectItem value="/publish">배포</SelectItem>
                    <SelectItem value="/analytics">성과분석</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="키워드 검색..."
                  value={keywordFilter}
                  onChange={(e) => setKeywordFilter(e.target.value)}
                  className="flex-1"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>에러 로그 ({filteredErrors.length}건)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>시간</TableHead>
                    <TableHead>매장</TableHead>
                    <TableHead>라우트</TableHead>
                    <TableHead>에러 메시지</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredErrors
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((error) => {
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
                          <TableCell className="text-sm text-destructive max-w-md truncate">
                            {error.message}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setSelectedError(error.id);
                                setErrorDetailOpen(true);
                              }}
                            >
                              <AlertCircle className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 에러 상세 드로어 */}
      <Sheet open={errorDetailOpen} onOpenChange={setErrorDetailOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>에러 상세</SheetTitle>
          </SheetHeader>
          {selectedError && (
            <div className="space-y-4 py-6">
              {(() => {
                const error = errorLogs.find((e) => e.id === selectedError);
                if (!error) return null;
                const store = adminStores.find((s) => s.id === error.storeId);
                return (
                  <>
                    <div className="flex gap-2 mb-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setErrorDetailOpen(false);
                          navigate(`/admin/stores/${error.storeId}`);
                        }}
                        className="flex-1"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        매장 상세로 이동
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          window.open(error.route, "_blank");
                        }}
                        className="flex-1"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        앱에서 확인
                      </Button>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">시간</Label>
                      <p className="font-medium">
                        {new Date(error.createdAt).toLocaleString("ko-KR")}
                      </p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">매장</Label>
                      <p className="font-medium">{store?.name || error.storeId}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">라우트</Label>
                      <p className="font-medium">{error.route}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">에러 메시지</Label>
                      <p className="font-medium text-destructive mt-2">{error.message}</p>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
