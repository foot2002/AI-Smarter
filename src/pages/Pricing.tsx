import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, HelpCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    description: "막 시작하는 1인 매장에 딱 맞게",
    monthlyPrice: 39000,
    yearlyPrice: 33000,
    credits: 100,
    features: [
      "블로그/쇼츠/SNS 생성",
      "브랜드 톤 & 금지어 설정",
      "기본 템플릿 10종",
      "이메일 지원",
    ],
    cta: "무료체험",
    ctaLink: "/trial",
    popular: false,
  },
  {
    name: "Growth",
    description: "성장하는 매장을 위한 추천 플랜",
    monthlyPrice: 79000,
    yearlyPrice: 66000,
    credits: 500,
    features: [
      "Starter의 모든 기능",
      "예약발행 (네이버/인스타)",
      "성과 요약 리포트",
      "템플릿 확장팩 30종",
      "채팅 지원",
    ],
    cta: "무료체험",
    ctaLink: "/trial",
    popular: true,
  },
  {
    name: "Pro",
    description: "다매장/팀 운영에 최적화",
    monthlyPrice: null,
    yearlyPrice: null,
    credits: null,
    features: [
      "Growth의 모든 기능",
      "무제한 크레딧 (협의)",
      "다매장/팀 계정 관리",
      "고급 성과분석 대시보드",
      "맞춤 템플릿 제작",
      "전담 매니저 & 우선 지원",
    ],
    cta: "도입문의",
    ctaLink: "/contact",
    popular: false,
  },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <Layout>
      {/* Header */}
      <section className="pt-24 pb-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-display-md md:text-display-lg font-bold mb-4">
            간단한 플랜, <span className="text-primary">바로 시작</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            월 구독 + 생성 크레딧 방식으로 우리 매장에 맞게 선택하세요
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 p-1.5 bg-secondary rounded-full">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !isYearly ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              월간 결제
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                isYearly ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              연간 결제
              <Badge variant="secondary" className="bg-success/10 text-success border-0 text-xs">
                17% 할인
              </Badge>
            </button>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="pb-section bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-3xl border-2 transition-shadow ${
                  plan.popular
                    ? "border-primary bg-card shadow-soft-lg"
                    : "border-border bg-card hover:shadow-soft"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-3 py-1">
                      추천
                    </Badge>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <div className="text-center mb-6">
                  {plan.monthlyPrice !== null ? (
                    <>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-display-sm font-bold">
                          ₩{(isYearly ? plan.yearlyPrice : plan.monthlyPrice)?.toLocaleString()}
                        </span>
                        <span className="text-muted-foreground">/월</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        월 {plan.credits} 크레딧
                      </p>
                    </>
                  ) : (
                    <div className="text-display-sm font-bold">맞춤 견적</div>
                  )}
                </div>

                <Button
                  className={`w-full mb-6 h-12 ${plan.popular ? "" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                  asChild
                >
                  <Link to={plan.ctaLink}>{plan.cta}</Link>
                </Button>

                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credits Explanation */}
      <section className="py-section-sm bg-section-alt">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-4 p-6 bg-card rounded-2xl border border-border">
              <HelpCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold mb-2">크레딧이란?</h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  크레딧은 콘텐츠 생성 및 재생성 시 차감됩니다. 블로그 글 1건 = 약 5크레딧, 쇼츠 대본 1건 = 약 3크레딧, SNS 문구 3종 = 약 2크레딧으로 계산됩니다.
                </p>
                <p className="text-sm text-muted-foreground">
                  크레딧이 부족하면 추가 구매도 가능합니다. (100크레딧 = ₩9,900)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-section bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-display-sm font-bold mb-4">
            3분 데모로 직접 확인하세요
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            우리 매장 리뷰로 만들어지는 콘텐츠를 미리 체험해 보세요
          </p>
          <Button size="lg" className="h-12 px-8" asChild>
            <Link to="/trial">
              무료체험 시작하기
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
