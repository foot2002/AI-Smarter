import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhySection } from "@/components/sections/WhySection";
import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { ResultsPreviewSection } from "@/components/sections/ResultsPreviewSection";
import { ProductMockupSection } from "@/components/sections/ProductMockupSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <WhySection />
      <BeforeAfterSection />
      <HowItWorksSection />
      <ResultsPreviewSection />
      <ProductMockupSection />
      <FAQSection />
      <FinalCTASection />
    </Layout>
  );
};

export default Index;
