import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  Link as LinkIcon,
  Plus,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Check,
  X,
  FileText,
  Video,
  Share2,
  Download,
  Copy,
  ExternalLink,
} from "lucide-react";
import {
  sampleStores,
  sampleContents,
  sampleSchedules,
  statusLabels,
} from "@/data/sampleData";
import { cn } from "@/lib/utils";

const channels = [
  { id: "blog", name: "블로그", icon: FileText, color: "bg-green-100 text-green-700" },
  { id: "youtube", name: "유튜브", icon: Video, color: "bg-red-100 text-red-700" },
  { id: "instagram", name: "인스타그램", icon: Share2, color: "bg-purple-100 text-purple-700" },
  { id: "other", name: "기타 SNS", icon: LinkIcon, color: "bg-blue-100 text-blue-700" },
];

const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

export default function Publish() {
  const { storeId } = useParams();
  const store = sampleStores.find((s) => s.id === storeId) || sampleStores[0];
  const storeContents = sampleContents.filter((c) => c.storeId === storeId);
  const storeSchedules = sampleSchedules.filter((s) => s.storeId === storeId);

  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 2, 1)); // March 2024
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: (Date | null)[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const days = getDaysInMonth(currentMonth);

  const getSchedulesForDate = (date: Date) => {
    return storeSchedules.filter((s) => {
      const scheduleDate = new Date(s.scheduledAt);
      return (
        scheduleDate.getDate() === date.getDate() &&
        scheduleDate.getMonth() === date.getMonth() &&
        scheduleDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const getContentById = (id: string) => {
    return storeContents.find((c) => c.id === id);
  };

  const getChannelInfo = (channelId: string) => {
    return channels.find((c) => c.id === channelId) || channels[0];
  };

  const scheduledContents = storeContents.filter((c) => c.status === "scheduled");
  const approvedContents = storeContents.filter((c) => c.status === "approved");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">배포</h1>
          <p className="text-muted-foreground">
            콘텐츠를 예약하고 채널에 배포하세요
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              예약 추가
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>예약 추가</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">콘텐츠 선택</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="콘텐츠를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {approvedContents.map((content) => (
                      <SelectItem key={content.id} value={content.id}>
                        {content.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">채널</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="채널을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {channels.map((channel) => (
                      <SelectItem key={channel.id} value={channel.id}>
                        {channel.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">날짜</label>
                  <input
                    type="date"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">시간</label>
                  <input
                    type="time"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <Button className="w-full" onClick={() => setDialogOpen(false)}>
                예약하기
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Channel Connection */}
      <Card className="p-5">
        <h3 className="font-bold mb-4">채널 연결 상태</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {channels.map((channel) => {
            const Icon = channel.icon;
            const isConnected = store.channels[channel.id as keyof typeof store.channels]?.connected;
            return (
              <div
                key={channel.id}
                className={cn(
                  "p-4 rounded-xl border-2 transition-all",
                  isConnected ? "border-green-200 bg-green-50" : "border-dashed border-border"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", channel.color)}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{channel.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {isConnected ? "연결됨" : "미연결"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground mt-3 p-3 bg-muted rounded-lg">
          💡 자동 업로드 기능은 추후 지원 예정입니다. 현재는 콘텐츠를 복사하여 직접 업로드해주세요.
        </p>
      </Card>

      <Tabs defaultValue="calendar">
        <TabsList>
          <TabsTrigger value="calendar">
            <Calendar className="w-4 h-4 mr-2" />
            캘린더
          </TabsTrigger>
          <TabsTrigger value="list">목록</TabsTrigger>
          <TabsTrigger value="export">내보내기</TabsTrigger>
        </TabsList>

        {/* Calendar View */}
        <TabsContent value="calendar" className="mt-6">
          <Card className="p-5">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">
                {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
              </h3>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={prevMonth}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={nextMonth}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Weekday Headers */}
              {weekDays.map((day) => (
                <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                  {day}
                </div>
              ))}

              {/* Days */}
              {days.map((day, idx) => {
                if (!day) {
                  return <div key={idx} className="p-2" />;
                }

                const schedules = getSchedulesForDate(day);
                const isToday =
                  day.getDate() === new Date().getDate() &&
                  day.getMonth() === new Date().getMonth();

                return (
                  <div
                    key={idx}
                    className={cn(
                      "min-h-[80px] p-2 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors",
                      isToday && "bg-primary/5 border-primary"
                    )}
                    onClick={() => setSelectedDate(day)}
                  >
                    <p className={cn(
                      "text-sm font-medium mb-1",
                      isToday && "text-primary"
                    )}>
                      {day.getDate()}
                    </p>
                    <div className="space-y-1">
                      {schedules.slice(0, 2).map((schedule) => {
                        const channel = getChannelInfo(schedule.channel);
                        return (
                          <div
                            key={schedule.id}
                            className={cn("px-1.5 py-0.5 rounded text-xs truncate", channel.color)}
                          >
                            {getContentById(schedule.contentId)?.title.slice(0, 10)}...
                          </div>
                        );
                      })}
                      {schedules.length > 2 && (
                        <p className="text-xs text-muted-foreground">
                          +{schedules.length - 2}개 더
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </TabsContent>

        {/* List View */}
        <TabsContent value="list" className="mt-6">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>콘텐츠</TableHead>
                  <TableHead>채널</TableHead>
                  <TableHead>예약 일시</TableHead>
                  <TableHead>상태</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {storeSchedules.map((schedule) => {
                  const content = getContentById(schedule.contentId);
                  const channel = getChannelInfo(schedule.channel);
                  const Icon = channel.icon;
                  return (
                    <TableRow key={schedule.id}>
                      <TableCell className="font-medium">
                        {content?.title}
                      </TableCell>
                      <TableCell>
                        <Badge className={channel.color}>
                          <Icon className="w-3 h-3 mr-1" />
                          {channel.name}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(schedule.scheduledAt).toLocaleString("ko-KR")}
                      </TableCell>
                      <TableCell>
                        {schedule.status === "pending" && (
                          <Badge variant="secondary">
                            <Clock className="w-3 h-3 mr-1" />
                            대기중
                          </Badge>
                        )}
                        {schedule.status === "completed" && (
                          <Badge className="bg-green-100 text-green-700">
                            <Check className="w-3 h-3 mr-1" />
                            완료
                          </Badge>
                        )}
                        {schedule.status === "failed" && (
                          <Badge variant="destructive">
                            <X className="w-3 h-3 mr-1" />
                            실패
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Export View */}
        <TabsContent value="export" className="mt-6">
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-5">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-green-700" />
              </div>
              <h3 className="font-bold mb-2">블로그</h3>
              <p className="text-sm text-muted-foreground mb-4">
                마크다운 또는 HTML 형식으로 내보내기
              </p>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Markdown 다운로드
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Copy className="w-4 h-4 mr-2" />
                  HTML 복사
                </Button>
              </div>
            </Card>

            <Card className="p-5">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mb-4">
                <Video className="w-6 h-6 text-red-700" />
              </div>
              <h3 className="font-bold mb-2">쇼츠</h3>
              <p className="text-sm text-muted-foreground mb-4">
                대본, 자막, 장면 가이드 내보내기
              </p>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  TXT 다운로드
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Copy className="w-4 h-4 mr-2" />
                  대본 복사
                </Button>
              </div>
            </Card>

            <Card className="p-5">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                <Share2 className="w-6 h-6 text-purple-700" />
              </div>
              <h3 className="font-bold mb-2">SNS</h3>
              <p className="text-sm text-muted-foreground mb-4">
                캡션과 해시태그 묶음 내보내기
              </p>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  <Copy className="w-4 h-4 mr-2" />
                  캡션 복사
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Copy className="w-4 h-4 mr-2" />
                  해시태그 복사
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
