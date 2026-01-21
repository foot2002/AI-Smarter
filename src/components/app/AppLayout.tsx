import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sparkles,
  LayoutDashboard,
  Lightbulb,
  FileText,
  Send,
  BarChart3,
  Settings,
  Bell,
  ChevronDown,
  Store as StoreIcon,
  Menu,
  X,
  LogOut,
  User,
} from "lucide-react";
import { listStores } from "@/lib/api/stores";
import type { Store } from "@/data/sampleData";

const sidebarItems = [
  { label: "대시보드", path: "dashboard", icon: LayoutDashboard },
  { label: "인사이트", path: "insights", icon: Lightbulb },
  { label: "콘텐츠", path: "content", icon: FileText },
  { label: "배포", path: "publish", icon: Send },
  { label: "성과분석", path: "analytics", icon: BarChart3 },
  { label: "설정", path: "settings", icon: Settings },
];

export function AppLayout() {
  const location = useLocation();
  const { storeId } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stores, setStores] = useState<Store[]>([]);

  // 가게 목록 로드
  useEffect(() => {
    listStores().then(setStores);
  }, []);

  const currentStore = stores.find((s) => s.id === storeId) || stores[0];

  const isActivePath = (path: string) => {
    return location.pathname.includes(`/${path}`);
  };

  // Store가 로드되지 않았거나 없을 때 처리
  if (stores.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">가게 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!currentStore) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">가게를 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col bg-card border-r border-border transition-all duration-300",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-border">
          <Link to="/app" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary text-primary-foreground">
              <Sparkles className="w-5 h-5" />
            </div>
            {sidebarOpen && (
              <span className="font-bold text-lg tracking-tight">
                AI <span className="text-primary">SMarter</span>
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActivePath(item.path);
            return (
              <Link
                key={item.path}
                to={`/app/${storeId}/${item.path}`}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Toggle */}
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full justify-center"
          >
            {sidebarOpen ? "접기" : "펼치기"}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Store Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <StoreIcon className="w-4 h-4" />
                <span className="max-w-[150px] truncate">{currentStore.name}</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {stores.map((store) => (
                <DropdownMenuItem key={store.id} asChild>
                  <Link to={`/app/${store.id}/dashboard`} className="cursor-pointer">
                    <StoreIcon className="w-4 h-4 mr-2" />
                    {store.name}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem asChild>
                <Link to="/app?createStore=1" className="cursor-pointer text-primary">
                  <span className="mr-2">+</span> 새 가게 추가
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      AI
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  내 계정
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/">
                    <LogOut className="w-4 h-4 mr-2" />
                    로그아웃
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-card border-b border-border p-4 animate-fade-in">
            <nav className="space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.path);
                return (
                  <Link
                    key={item.path}
                    to={`/app/${storeId}/${item.path}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
