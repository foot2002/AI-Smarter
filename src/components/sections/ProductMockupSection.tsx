import { LayoutDashboard, Palette, Calendar } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import mockupDashboard from "@/assets/mockup-dashboard.jpg";
import mockupContentStudio from "@/assets/mockup-content-studio.jpg";
import mockupCalendar from "@/assets/mockup-calendar.jpg";

const mockups = [
  {
    icon: LayoutDashboard,
    title: "대시보드",
    description: "이번주 생성/예약/성과 한눈에",
    image: mockupDashboard,
  },
  {
    icon: Palette,
    title: "콘텐츠 스튜디오",
    description: "생성 결과 수정 및 승인",
    image: mockupContentStudio,
  },
  {
    icon: Calendar,
    title: "배포 캘린더",
    description: "예약 발행 일정 관리",
    image: mockupCalendar,
  },
];

export function ProductMockupSection() {
  return (
    <section className="py-section bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <ScrollReveal variant="fade-up" duration={800}>
          <h2 className="text-display-sm md:text-display-md font-bold text-center mb-4">
            <span className="text-primary">직관적인</span> 대시보드
          </h2>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={100} duration={800}>
          <p className="text-muted-foreground text-center mb-16 text-lg max-w-2xl mx-auto">
            콘텐츠 생성부터 예약발행, 성과분석까지 한 곳에서
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {mockups.map((mockup, index) => (
            <ScrollReveal key={index} variant="zoom-in" delay={index * 150} duration={700}>
              <div className="group">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-secondary to-muted mb-4 shadow-soft group-hover:shadow-soft-lg group-hover:scale-[1.02] transition-all duration-300">
                  <img 
                    src={mockup.image} 
                    alt={mockup.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <mockup.icon className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">{mockup.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{mockup.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
