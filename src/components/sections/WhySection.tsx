import { FileText, CalendarCheck, TrendingUp } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const points = [
  {
    icon: FileText,
    title: "소재 걱정 끝",
    description: "리뷰·설문이 자동 소재가 됩니다",
    gradient: "from-blue-500 to-indigo-600",
    bgGlow: "bg-blue-500/20",
  },
  {
    icon: CalendarCheck,
    title: "콘텐츠 꾸준히",
    description: "예약발행으로 운영이 지속됩니다",
    gradient: "from-emerald-500 to-teal-600",
    bgGlow: "bg-emerald-500/20",
  },
  {
    icon: TrendingUp,
    title: "성과로 다음 액션",
    description: "무엇을 더 만들지 AI가 추천합니다",
    gradient: "from-violet-500 to-purple-600",
    bgGlow: "bg-violet-500/20",
  },
];

export function WhySection() {
  return (
    <section className="py-section bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Headline */}
        <ScrollReveal variant="fade-up" duration={800}>
          <h2 className="text-display-sm md:text-display-md font-bold text-center mb-4 max-w-3xl mx-auto">
            사장님이 마케팅에 쓰는 시간을,
            <br className="hidden md:block" />
            <span className="text-primary">사업에 집중할 수 있도록.</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={100} duration={800}>
          <p className="text-muted-foreground text-center mb-16 text-lg max-w-2xl mx-auto">
            AI SMarter가 리뷰와 설문을 분석해 콘텐츠를 자동 생성합니다.
          </p>
        </ScrollReveal>

        {/* Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {points.map((point, index) => (
            <ScrollReveal key={index} variant="fade-up" delay={index * 150} duration={600}>
              <div className="group relative bg-card border border-border rounded-3xl p-8 shadow-soft hover:shadow-soft-lg hover:-translate-y-2 transition-all duration-500 cursor-pointer">
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 ${point.bgGlow} rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10`} />
                
                <div className="flex flex-col items-center text-center">
                  {/* Icon with gradient background */}
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${point.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                    <point.icon className="w-10 h-10 text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{point.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{point.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
