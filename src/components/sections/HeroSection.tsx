import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, Infinity, Heart, Play, LayoutDashboard } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { getSolutionEntryUrl } from "@/lib/storeRouting";

export function HeroSection() {
  const navigate = useNavigate();
  const solutionUrl = getSolutionEntryUrl();

  const handleSolutionClick = () => {
    navigate(solutionUrl);
  };

  return (
    <section className="relative overflow-hidden bg-foreground text-background">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="AI 마케팅 자동화"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/60" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-24 md:py-32 lg:py-40">
        <div className="max-w-2xl">
          {/* Headline */}
          <h1 className="font-bold mb-6 animate-fade-up">
            <span className="block text-2xl md:text-3xl lg:text-4xl mb-2">우리 가게의 장점이 자동으로</span>
            <span className="text-display-md md:text-display-lg lg:text-display-xl">
              <span className="text-primary">블로그·쇼츠·SNS</span>가 됩니다.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-background/80 mb-8 leading-relaxed max-w-xl animate-fade-up [word-break:keep-all]" style={{ animationDelay: "0.1s" }}>
            AI SMarter는 고객평가와 우리 사업의 차별점을 분석해 매출로 이어지는 마케팅 콘텐츠를 자동으로 생성하고 운영까지 돕습니다.
          </p>

          {/* CTA Buttons - Updated with clear hierarchy */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="flex flex-col">
              <Button size="lg" variant="outline" className="text-base px-8 h-12 border-background text-background bg-background/10 hover:bg-background/20" asChild>
                <Link to="/trial">
                  <Play className="w-4 h-4 mr-2" />
                  무료체험
                </Link>
              </Button>
              <span className="text-xs text-background/60 mt-2 text-center">1분 맛보기 · 로그인 없이</span>
            </div>
            <div className="flex flex-col">
              <Button size="lg" className="text-base px-8 h-12" onClick={handleSolutionClick}>
                <LayoutDashboard className="w-4 h-4 mr-2" />
                솔루션 시작하기
              </Button>
              <span className="text-xs text-background/60 mt-2 text-center">대시보드·인사이트·성과분석까지</span>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-background/10 border border-background/20 text-sm text-background/90">
              <Sparkles className="w-4 h-4 text-accent" />
              AI 마케팅
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-background/10 border border-background/20 text-sm text-background/90">
              <Infinity className="w-4 h-4 text-accent" />
              마케팅 콘텐츠 무한 생성
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-background/10 border border-background/20 text-sm text-background/90">
              <Heart className="w-4 h-4 text-accent" />
              고객을 끄는 매력적 문구
            </div>
          </div>
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-hero-radial opacity-50 animate-glow-pulse" />
    </section>
  );
}
