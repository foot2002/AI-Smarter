import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Mail, Lock, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // 실제 로그인 로직은 Cursor에서 구현
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left: Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-foreground text-background p-12 flex-col justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="font-bold text-2xl tracking-tight">
            AI <span className="text-primary">SMarter</span>
          </span>
        </Link>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight">
            우리 가게 마케팅,<br />
            <span className="text-primary">AI가 대신합니다</span>
          </h1>
          <p className="text-lg text-background/70 max-w-md">
            리뷰 분석부터 콘텐츠 생성, 예약 발행, 성과 분석까지.
            로그인하고 내 가게 대시보드를 시작하세요.
          </p>
        </div>

        <p className="text-sm text-background/50">
          © 2024 AI SMarter. All rights reserved.
        </p>
      </div>

      {/* Right: Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-bold text-2xl tracking-tight">
                AI <span className="text-primary">SMarter</span>
              </span>
            </Link>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold">로그인</h2>
            <p className="text-muted-foreground mt-2">
              로그인하면 내 가게 대시보드로 이동합니다
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">비밀번호</Label>
                  <Link 
                    to="#" 
                    className="text-sm text-primary hover:underline"
                  >
                    비밀번호 찾기
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? "로그인 중..." : "로그인"}
              {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </form>

          <div className="relative">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-4 text-sm text-muted-foreground">
              또는
            </span>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full relative" 
              size="lg"
              disabled
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google로 로그인
              <span className="absolute right-3 text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">
                Coming soon
              </span>
            </Button>
            <Button 
              variant="outline" 
              className="w-full relative" 
              size="lg"
              disabled
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              GitHub로 로그인
              <span className="absolute right-3 text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">
                Coming soon
              </span>
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            계정이 없으신가요?{" "}
            <Link to="/signup" className="text-primary font-medium hover:underline">
              회원가입
            </Link>
          </p>

          {/* Quick access */}
          <div className="pt-4 border-t border-border">
            <p className="text-center text-sm text-muted-foreground mb-3">
              로그인 없이 먼저 체험해보세요
            </p>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/trial">
                <Sparkles className="w-4 h-4 mr-2" />
                무료체험 바로가기
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
