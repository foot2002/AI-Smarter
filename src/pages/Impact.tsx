import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Clock,
  BarChart3,
  TrendingUp,
  Coffee,
  UtensilsCrossed,
  GraduationCap,
  Stethoscope,
  Hotel,
  Scissors,
  ArrowRight,
  FileText,
  Video,
  MessageCircle,
} from "lucide-react";
import industryCafe from "@/assets/industry-cafe.jpg";
import industryRestaurant from "@/assets/industry-restaurant.jpg";
import industryAcademy from "@/assets/industry-academy.jpg";
import industryMedical from "@/assets/industry-medical.jpg";
import industryHotel from "@/assets/industry-hotel.jpg";
import industryBeauty from "@/assets/industry-beauty.jpg";

const effects = [
  { icon: Clock, value: "80%", label: "시간 절감", desc: "콘텐츠 제작에 쓰던 시간" },
  { icon: BarChart3, value: "4x", label: "운영 지속", desc: "발행 빈도 증가" },
  { icon: TrendingUp, value: "35%", label: "전환 상승", desc: "문의/예약 증가" },
];

const industries = [
  {
    icon: Coffee,
    name: "카페",
    image: industryCafe,
    contents: ["신메뉴 소개 블로그", "라떼아트 쇼츠", "이벤트 SNS"],
    keywords: ["카페추천", "커피스타그램", "디저트맛집"],
  },
  {
    icon: UtensilsCrossed,
    name: "음식점",
    image: industryRestaurant,
    contents: ["맛집 리뷰 블로그", "조리 과정 쇼츠", "오늘의 메뉴 SNS"],
    keywords: ["맛집", "푸드스타그램", "점심추천"],
  },
  {
    icon: GraduationCap,
    name: "학원",
    image: industryAcademy,
    contents: ["수강 후기 블로그", "강의 하이라이트 쇼츠", "개강 안내 SNS"],
    keywords: ["학원추천", "영어학원", "수학과외"],
  },
  {
    icon: Stethoscope,
    name: "병원·약국",
    image: industryMedical,
    contents: ["건강정보 블로그", "시술 소개 쇼츠", "진료 안내 SNS"],
    keywords: ["피부과", "건강정보", "의료상담"],
  },
  {
    icon: Hotel,
    name: "숙박",
    image: industryHotel,
    contents: ["숙소 후기 블로그", "객실 투어 쇼츠", "프로모션 SNS"],
    keywords: ["호캉스", "펜션", "숙소추천"],
  },
  {
    icon: Scissors,
    name: "미용·헬스",
    image: industryBeauty,
    contents: ["시술 후기 블로그", "비포애프터 쇼츠", "할인 안내 SNS"],
    keywords: ["헤어샵", "네일아트", "PT추천"],
  },
];

const transformSteps = [
  {
    title: "원본 리뷰",
    content: `"여기 분위기 진짜 좋아요! 커피도 맛있고 사장님도 친절해요. 특히 바닐라 라떼가 최고였어요. 매장도 깔끔하고 음악도 좋아서 공부하기 딱이에요. 다음에 또 올게요!"`,
  },
  {
    title: "AI 분석 결과",
    content: `✓ 강점: 분위기, 커피 맛, 친절함, 바닐라 라떼
✓ 키워드: 공부하기 좋은 카페, 깔끔한 매장
✓ 감정: 매우 긍정 (재방문 의사 높음)`,
  },
  {
    title: "생성된 콘텐츠",
    items: [
      { type: "블로그", icon: FileText, preview: '"공부하기 좋은 분위기 카페" 5가지 이유' },
      { type: "쇼츠", icon: Video, preview: "이 카페가 단골이 많은 비결" },
      { type: "SNS", icon: MessageCircle, preview: "조용히 공부하고 싶을 때 여기로 오세요 ☕" },
    ],
  },
];

export default function Impact() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-24 pb-16 bg-foreground text-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-display-md md:text-display-lg font-bold mb-6">
            콘텐츠를 만드는 게 아니라,<br />
            <span className="text-primary">'운영'을 자동화</span>합니다.
          </h1>
          <p className="text-lg text-background/70 max-w-2xl mx-auto">
            AI SMarter 도입 매장들의 실제 변화를 확인하세요
          </p>
        </div>
      </section>

      {/* Key Effects */}
      <section className="py-section bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {effects.map((effect, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <effect.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-display-md font-bold text-primary mb-1">{effect.value}</div>
                <div className="text-lg font-semibold mb-1">{effect.label}</div>
                <div className="text-sm text-muted-foreground">{effect.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Scenarios */}
      <section className="py-section bg-section-alt">
        <div className="container mx-auto px-4">
          <h2 className="text-display-sm md:text-display-md font-bold text-center mb-4">
            <span className="text-primary">업종별</span> 활용 시나리오
          </h2>
          <p className="text-muted-foreground text-center mb-12 text-lg max-w-2xl mx-auto">
            우리 업종에 맞는 콘텐츠 전략을 확인하세요
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {industries.map((industry, index) => (
              <div key={index} className="group bg-card rounded-3xl border border-border overflow-hidden shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300">
                {/* Industry Image */}
                <div className="relative h-32 overflow-hidden">
                  <img 
                    src={industry.image} 
                    alt={industry.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md">
                      <industry.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-white drop-shadow-md">{industry.name}</h3>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <div className="mb-4">
                    <span className="text-xs font-semibold text-primary mb-2 block">추천 콘텐츠</span>
                    <ul className="space-y-2">
                      {industry.contents.map((content, i) => (
                        <li key={i} className="text-sm text-foreground/80 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          {content}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-5">
                    <span className="text-xs font-semibold text-primary mb-2 block">추천 키워드</span>
                    <div className="flex flex-wrap gap-1.5">
                      {industry.keywords.map((keyword, i) => (
                        <Badge key={i} variant="secondary" className="text-xs font-medium">
                          #{keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button variant="default" size="sm" className="w-full group-hover:bg-primary/90" asChild>
                    <Link to="/trial">
                      데모 체험하기
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Transformation */}
      <section className="py-section bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-display-sm md:text-display-md font-bold text-center mb-4">
            리뷰가 콘텐츠가 되기까지
          </h2>
          <p className="text-muted-foreground text-center mb-16 text-lg max-w-2xl mx-auto">
            고객 리뷰 한 줄이 어떻게 마케팅 자산이 되는지 보여드립니다
          </p>

          <div className="max-w-4xl mx-auto space-y-8">
            {transformSteps.map((step, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-3xl ${
                  index === 0
                    ? "bg-secondary/50 border border-border"
                    : index === 1
                    ? "bg-primary/5 border-2 border-primary/20"
                    : "bg-success/5 border-2 border-success/20"
                }`}
              >
                <div className={`absolute -top-3 left-8 px-3 py-1 rounded-full text-sm font-semibold ${
                  index === 0
                    ? "bg-secondary text-foreground"
                    : index === 1
                    ? "bg-primary text-primary-foreground"
                    : "bg-success text-success-foreground"
                }`}>
                  Step {index + 1}: {step.title}
                </div>

                {step.content && (
                  <p className="text-foreground/80 mt-4 whitespace-pre-line leading-relaxed">
                    {step.content}
                  </p>
                )}

                {step.items && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {step.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border">
                        <item.icon className="w-5 h-5 text-success mt-0.5" />
                        <div>
                          <span className="text-xs font-medium text-muted-foreground">{item.type}</span>
                          <p className="text-sm font-medium">{item.preview}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Mockup */}
      <section className="py-section bg-section-alt">
        <div className="container mx-auto px-4">
          <h2 className="text-display-sm md:text-display-md font-bold text-center mb-4">
            <span className="text-primary">성과분석</span> 대시보드
          </h2>
          <p className="text-muted-foreground text-center mb-12 text-lg max-w-2xl mx-auto">
            어떤 콘텐츠가 잘 되는지, 다음엔 뭘 만들지 AI가 알려줍니다
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-3xl border border-border shadow-soft p-8">
              {/* Mock Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-secondary/50 rounded-xl">
                  <div className="text-2xl font-bold text-primary">12,847</div>
                  <div className="text-sm text-muted-foreground">총 조회수</div>
                </div>
                <div className="text-center p-4 bg-secondary/50 rounded-xl">
                  <div className="text-2xl font-bold text-primary">342</div>
                  <div className="text-sm text-muted-foreground">클릭수</div>
                </div>
                <div className="text-center p-4 bg-secondary/50 rounded-xl">
                  <div className="text-2xl font-bold text-primary">28</div>
                  <div className="text-sm text-muted-foreground">문의전환</div>
                </div>
              </div>

              {/* Top Content */}
              <div className="mb-8">
                <h4 className="font-semibold mb-4">🏆 TOP 콘텐츠</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-primary">1</span>
                      <span className="text-sm">"망원동 숨은 카페" 블로그</span>
                    </div>
                    <span className="text-sm text-muted-foreground">조회 4,231</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-primary">2</span>
                      <span className="text-sm">"라떼아트 만들기" 쇼츠</span>
                    </div>
                    <span className="text-sm text-muted-foreground">조회 3,102</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-primary">3</span>
                      <span className="text-sm">신메뉴 출시 SNS</span>
                    </div>
                    <span className="text-sm text-muted-foreground">조회 2,514</span>
                  </div>
                </div>
              </div>

              {/* AI Recommendation */}
              <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                <div className="flex items-start gap-3">
                  <span className="text-xl">💡</span>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">AI 추천 다음 주제</h4>
                    <p className="text-sm text-foreground/80">
                      "바닐라 라떼" 관련 리뷰가 최근 급증했습니다. 바닐라 라떼 제조 과정 쇼츠를 만들어 보세요!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-section bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-display-sm md:text-display-md font-bold mb-6">
            우리 매장도 시작해 보세요
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-10 max-w-xl mx-auto">
            3분 데모로 AI가 만드는 콘텐츠를 직접 확인하세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-base px-8 h-12" asChild>
              <Link to="/trial">
                무료체험 시작하기
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 h-12 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/contact">도입문의</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
