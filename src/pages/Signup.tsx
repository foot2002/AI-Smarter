import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Sparkles, Mail, Lock, ArrowRight, Check } from "lucide-react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return;
    }
    setIsLoading(true);
    // 실제 회원가입 로직은 Cursor에서 구현
    setTimeout(() => setIsLoading(false), 1500);
  };

  const features = [
    "리뷰 분석으로 강점/개선점 자동 추출",
    "블로그·쇼츠·SNS 콘텐츠 원클릭 생성",
    "채널별 예약 발행 및 성과 분석",
    "AI 기반 마케팅 전략 추천"
  ];

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

        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold leading-tight">
              마케팅 자동화,<br />
              <span className="text-primary">지금 시작하세요</span>
            </h1>
            <p className="text-lg text-background/70 max-w-md">
              가입 후 가게 기본 설정을 진행하면 바로 콘텐츠 생성을 시작할 수 있습니다.
            </p>
          </div>

          <div className="space-y-4">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <span className="text-background/80">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm text-background/50">
          © 2024 AI SMarter. All rights reserved.
        </p>
      </div>

      {/* Right: Signup Form */}
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
            <h2 className="text-2xl font-bold">회원가입</h2>
            <p className="text-muted-foreground mt-2">
              가입 후 가게 기본 설정을 진행합니다
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
                <Label htmlFor="password">비밀번호</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="8자 이상"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    minLength={8}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="passwordConfirm"
                    type="password"
                    placeholder="비밀번호를 다시 입력"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    className="pl-10"
                    minLength={8}
                    required
                  />
                </div>
                {passwordConfirm && password !== passwordConfirm && (
                  <p className="text-sm text-destructive">비밀번호가 일치하지 않습니다</p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="terms"
                checked={termsAgreed}
                onCheckedChange={(checked) => setTermsAgreed(checked === true)}
                className="mt-0.5"
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                <Link to="/terms" className="text-primary hover:underline">이용약관</Link> 및{" "}
                <Link to="/privacy" className="text-primary hover:underline">개인정보처리방침</Link>에 동의합니다.
                <span className="text-destructive"> (필수)</span>
              </label>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              size="lg" 
              disabled={isLoading || !termsAgreed || password !== passwordConfirm}
            >
              {isLoading ? "가입 중..." : "회원가입"}
              {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            이미 계정이 있으신가요?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">
              로그인
            </Link>
          </p>

          {/* Quick access */}
          <div className="pt-4 border-t border-border">
            <p className="text-center text-sm text-muted-foreground mb-3">
              가입 전에 먼저 체험해보세요
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
