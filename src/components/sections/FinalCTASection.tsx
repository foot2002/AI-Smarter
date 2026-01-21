import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function FinalCTASection() {
  return (
    <section className="py-section bg-primary text-primary-foreground overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <ScrollReveal variant="zoom-in" duration={800}>
          <h2 className="text-display-sm md:text-display-md font-bold mb-6">
            오늘부터, 마케팅을 자동화하세요.
          </h2>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={200} duration={800}>
          <p className="text-lg text-white mb-10 max-w-xl mx-auto">
            AI SMarter는 우리 매장에 맞는 마케팅 콘텐츠를 세상에 알립니다.
          </p>
        </ScrollReveal>
        <ScrollReveal variant="slide-up" delay={400} duration={700}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-base px-8 h-12 hover:scale-105 transition-transform" asChild>
              <Link to="/trial">
                무료체험 시작하기
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 h-12 bg-white/20 border-white text-foreground hover:bg-white/30 hover:scale-105 transition-transform" asChild>
              <Link to="/contact">도입문의</Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
