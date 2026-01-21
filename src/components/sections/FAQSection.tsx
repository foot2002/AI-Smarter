import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const faqs = [
  {
    question: "정말 자동인가요? 수정은 어디서 하나요?",
    answer: "네, AI가 리뷰/설문 데이터를 기반으로 콘텐츠를 자동 생성합니다. 생성된 콘텐츠는 '콘텐츠 스튜디오'에서 확인하고, 필요시 직접 수정한 후 승인하면 됩니다. 승인 전까지 발행되지 않으니 안심하세요.",
  },
  {
    question: "우리 업종도 잘 되나요?",
    answer: "카페, 음식점, 학원, 병원, 미용실, 숙박업 등 소상공인 업종에 최적화되어 있습니다. 업종별 특화 템플릿과 키워드를 제공하며, 도입 전 데모를 통해 우리 업종에 맞는 결과물을 미리 확인하실 수 있습니다.",
  },
  {
    question: "브랜드 톤은 어떻게 맞추나요?",
    answer: "최초 설정 시 브랜드 톤(친근함/전문성/감성 등)과 금지어를 지정할 수 있습니다. 이후 생성되는 모든 콘텐츠가 해당 톤에 맞춰 작성됩니다.",
  },
  {
    question: "채널 연동/예약발행은 어떻게 되나요?",
    answer: "블로그(네이버, 티스토리), 인스타그램, 유튜브 쇼츠 등 주요 채널과 연동됩니다. 승인된 콘텐츠는 캘린더에서 원하는 날짜/시간에 예약 발행할 수 있습니다.",
  },
  {
    question: "데이터는 안전한가요?",
    answer: "모든 고객 데이터는 암호화되어 저장되며, AI 학습에 활용되지 않습니다. 서비스 해지 시 모든 데이터는 완전 삭제됩니다.",
  },
  {
    question: "가격은 어떻게 계산되나요?",
    answer: "월 구독료 + 생성 크레딧 방식입니다. 크레딧은 콘텐츠 생성/재생성 시 차감되며, 플랜에 따라 월 제공량이 다릅니다. 자세한 내용은 가격 페이지를 확인해 주세요.",
  },
];

export function FAQSection() {
  return (
    <section className="py-section bg-section-alt overflow-hidden">
      <div className="container mx-auto px-4">
        <ScrollReveal variant="fade-up" duration={800}>
          <h2 className="text-display-sm md:text-display-md font-bold text-center mb-4">
            자주 묻는 <span className="text-primary">질문</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={100} duration={800}>
          <p className="text-muted-foreground text-center mb-12 text-lg max-w-2xl mx-auto">
            궁금한 점이 있으신가요?
          </p>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <ScrollReveal key={index} variant="fade-up" delay={index * 100} duration={600}>
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-soft"
                >
                  <AccordionTrigger className="text-left py-5 hover:no-underline">
                    <span className="text-base font-medium">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </ScrollReveal>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
