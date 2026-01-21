import { MessageSquare, Sparkles, Send } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { LucideIcon } from "lucide-react";

interface Step {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
}

const steps: Step[] = [
  {
    step: 1,
    title: "수집",
    description: "우리 가게의 특장점과 고객 평가로 차별화 메시지를 구성합니다",
    icon: MessageSquare,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    step: 2,
    title: "분석+생성",
    description: "AI가 가장 강력한 강점과 차별화 메시지를 자동 분석 및 생성합니다",
    icon: Sparkles,
    gradient: "from-violet-500 to-purple-500",
  },
  {
    step: 3,
    title: "배포+관리",
    description: "블로그/쇼츠/SNS 생성 → 배포 → 효과분석 관리",
    icon: Send,
    gradient: "from-emerald-500 to-teal-500",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-section bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <ScrollReveal variant="fade-up" duration={800}>
          <h2 className="text-display-sm md:text-display-md font-bold text-center mb-4">
            <span className="text-primary">3단계</span>로 완성되는 마케팅
          </h2>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={100} duration={800}>
          <p className="text-muted-foreground text-center mb-16 text-lg max-w-2xl mx-auto">
            복잡한 설정 없이, 고객 데이터만 연결하면 바로 시작
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <ScrollReveal key={step.step} variant="slide-up" delay={index * 200} duration={700}>
              <div className="group relative h-full">
                {/* Card */}
                <div className="relative h-full p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-slate-200/80 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 dark:from-slate-900 dark:to-slate-800 dark:border-slate-700">
                  {/* Shine effect */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/60 to-transparent rounded-tr-3xl pointer-events-none dark:from-white/10" />
                  
                  {/* Header: Icon + Step/Title side by side */}
                  <div className="flex items-center gap-5 mb-8">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                      <step.icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                    </div>
                    
                    {/* Step badge + Title */}
                    <div>
                      <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${step.gradient} text-white mb-2`}>
                        Step {step.step}
                      </span>
                      <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                    </div>
                  </div>
                  
                  {/* Description with separator */}
                  <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-base text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
