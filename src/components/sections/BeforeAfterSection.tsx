import { X, Check, ArrowRight, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function BeforeAfterSection() {
  return (
    <section className="py-section bg-section-alt overflow-hidden">
      <div className="container mx-auto px-4">
        <ScrollReveal variant="fade-up" duration={800}>
          <h2 className="text-display-sm md:text-display-md font-bold text-center mb-16 max-w-3xl mx-auto">
            마케팅 운영, <span className="text-primary">이렇게 달라집니다</span>
          </h2>
        </ScrollReveal>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto,1fr] gap-4 lg:gap-0 items-center">
            {/* Before */}
            <ScrollReveal variant="fade-right" delay={100} duration={800}>
              <div className="relative p-8 md:p-10 rounded-3xl bg-slate-800 border border-slate-700 h-full shadow-xl">
                <div className="absolute -top-4 left-8 px-5 py-1.5 rounded-full bg-slate-600 text-white text-sm font-bold tracking-wide">
                  Before
                </div>
                <div className="space-y-5 mt-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-4 h-4 text-red-400" />
                    </div>
                    <span className="text-slate-300">글 쓸 시간이 없어서 블로그가 멈춤</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-4 h-4 text-red-400" />
                    </div>
                    <span className="text-slate-300">무슨 내용을 써야 할지 모르겠음</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-4 h-4 text-red-400" />
                    </div>
                    <span className="text-slate-300">올리다 말다 반복, 일관성 없는 채널</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-4 h-4 text-red-400" />
                    </div>
                    <span className="text-slate-300">성과 파악 없이 그냥 올리기만</span>
                  </div>
                </div>
                <p className="mt-8 text-base font-semibold text-red-400">
                  직접 쓰고, 직접 올리고, 자주 끊기는 운영
                </p>
              </div>
            </ScrollReveal>

            {/* Arrow / Transition Indicator */}
            <ScrollReveal variant="zoom-in" delay={400} duration={600}>
              <div className="flex lg:flex-col items-center justify-center py-4 lg:py-0 lg:px-6">
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-xl opacity-50 rounded-full scale-150" />
                  <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl">
                    <ArrowRight className="w-8 h-8 text-white rotate-0 lg:rotate-0" />
                  </div>
                </div>
                <div className="hidden lg:flex flex-col items-center mt-4 gap-1">
                  <Sparkles className="w-5 h-5 text-accent animate-pulse" />
                  <span className="text-xs font-medium text-primary whitespace-nowrap">AI 자동화</span>
                </div>
              </div>
            </ScrollReveal>

            {/* After */}
            <ScrollReveal variant="fade-left" delay={300} duration={800}>
              <div className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 h-full shadow-xl dark:from-emerald-950/50 dark:to-teal-950/50 dark:border-emerald-800">
                {/* Shine effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/40 to-transparent rounded-tr-3xl pointer-events-none dark:from-white/10" />
                
                <div className="absolute -top-4 left-8 px-5 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-bold tracking-wide shadow-lg">
                  After
                </div>
                <div className="space-y-5 mt-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-slate-700 dark:text-slate-200 font-medium">리뷰·설문 기반 콘텐츠 자동 생성</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-slate-700 dark:text-slate-200 font-medium">브랜드 톤에 맞게 일관된 표현</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-slate-700 dark:text-slate-200 font-medium">승인 후 예약발행으로 운영 지속</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-slate-700 dark:text-slate-200 font-medium">성과 분석 → 다음 콘텐츠 추천</span>
                  </div>
                </div>
                <p className="mt-8 text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                  고객 목소리 → 자동 생성 → 승인 → 예약발행 → 성과분석
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
