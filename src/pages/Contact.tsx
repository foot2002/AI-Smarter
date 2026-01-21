import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Building2, User, Phone, Mail, MessageSquare, Send, MapPin, FileText } from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  companyName: z.string().trim().min(1, "기업명을 입력해 주세요").max(100),
  applicantName: z.string().trim().min(1, "신청자명을 입력해 주세요").max(50),
  phone: z.string().trim().min(1, "연락처를 입력해 주세요").regex(/^[0-9-]+$/, "올바른 전화번호 형식이 아닙니다"),
  email: z.string().trim().email("올바른 이메일 형식이 아닙니다"),
  industry: z.string().min(1, "업종을 선택해 주세요"),
  employeeCount: z.string().min(1, "직원 수를 선택해 주세요"),
  message: z.string().trim().min(1, "문의 내용을 입력해 주세요").max(2000),
  privacyConsent: z.literal(true, { errorMap: () => ({ message: "개인정보 수집에 동의해 주세요" }) }),
});

type ContactFormData = z.infer<typeof contactSchema>;

const industries = [
  "카페",
  "음식점",
  "학원",
  "병원·약국",
  "숙박",
  "미용·헬스",
  "소매·유통",
  "기타",
];

const employeeCounts = [
  "1~5명",
  "6~10명",
  "11~30명",
  "31~50명",
  "51~100명",
  "100명 이상",
];

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    companyName: "",
    applicantName: "",
    phone: "",
    email: "",
    industry: "",
    employeeCount: "",
    message: "",
    privacyConsent: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      contactSchema.parse(formData);
      setIsSubmitting(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "문의가 접수되었습니다",
        description: "담당자가 빠른 시일 내에 연락드리겠습니다.",
      });

      // Reset form
      setFormData({
        companyName: "",
        applicantName: "",
        phone: "",
        email: "",
        industry: "",
        employeeCount: "",
        message: "",
        privacyConsent: false,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-display-sm md:text-display-md font-bold mb-4">
            <span className="text-primary">AI SMarter</span> 도입문의
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            비즈니스에 맞는 AI 마케팅 자동화 솔루션을 상담받으세요.<br />
            담당자가 신속하게 연락드립니다.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-section bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-card rounded-3xl border border-border shadow-soft p-8 md:p-10">
              <div className="space-y-6">
                {/* Company Name */}
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="flex items-center gap-2 text-sm font-medium">
                    <Building2 className="w-4 h-4 text-primary" />
                    기업명 <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="companyName"
                    placeholder="기업명을 입력해 주세요"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange("companyName", e.target.value)}
                    className={errors.companyName ? "border-destructive" : ""}
                  />
                  {errors.companyName && (
                    <p className="text-xs text-destructive">{errors.companyName}</p>
                  )}
                </div>

                {/* Applicant Name */}
                <div className="space-y-2">
                  <Label htmlFor="applicantName" className="flex items-center gap-2 text-sm font-medium">
                    <User className="w-4 h-4 text-primary" />
                    신청자명 <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="applicantName"
                    placeholder="신청자명을 입력해 주세요"
                    value={formData.applicantName}
                    onChange={(e) => handleInputChange("applicantName", e.target.value)}
                    className={errors.applicantName ? "border-destructive" : ""}
                  />
                  {errors.applicantName && (
                    <p className="text-xs text-destructive">{errors.applicantName}</p>
                  )}
                </div>

                {/* Phone & Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium">
                      <Phone className="w-4 h-4 text-primary" />
                      연락처 <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="010-0000-0000"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className={errors.phone ? "border-destructive" : ""}
                    />
                    {errors.phone && (
                      <p className="text-xs text-destructive">{errors.phone}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                      <Mail className="w-4 h-4 text-primary" />
                      이메일 <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@company.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Industry & Employee Count Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <FileText className="w-4 h-4 text-primary" />
                      업종 <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.industry}
                      onValueChange={(value) => handleInputChange("industry", value)}
                    >
                      <SelectTrigger className={errors.industry ? "border-destructive" : ""}>
                        <SelectValue placeholder="업종을 선택해 주세요" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.industry && (
                      <p className="text-xs text-destructive">{errors.industry}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <User className="w-4 h-4 text-primary" />
                      직원 수 <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.employeeCount}
                      onValueChange={(value) => handleInputChange("employeeCount", value)}
                    >
                      <SelectTrigger className={errors.employeeCount ? "border-destructive" : ""}>
                        <SelectValue placeholder="직원 수를 선택해 주세요" />
                      </SelectTrigger>
                      <SelectContent>
                        {employeeCounts.map((count) => (
                          <SelectItem key={count} value={count}>
                            {count}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.employeeCount && (
                      <p className="text-xs text-destructive">{errors.employeeCount}</p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="flex items-center gap-2 text-sm font-medium">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    문의 내용 <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="도입 관련 궁금하신 점이나 요청사항을 자유롭게 작성해 주세요."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className={errors.message ? "border-destructive" : ""}
                  />
                  {errors.message && (
                    <p className="text-xs text-destructive">{errors.message}</p>
                  )}
                </div>

                {/* Privacy Consent */}
                <div className="space-y-3 p-4 bg-secondary/50 rounded-xl">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="privacyConsent"
                      checked={formData.privacyConsent}
                      onCheckedChange={(checked) =>
                        handleInputChange("privacyConsent", checked === true)
                      }
                      className={errors.privacyConsent ? "border-destructive" : ""}
                    />
                    <div className="space-y-1">
                      <Label htmlFor="privacyConsent" className="text-sm font-medium cursor-pointer">
                        개인정보 수집 및 이용 동의 <span className="text-destructive">*</span>
                      </Label>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        수집 항목: 기업명, 신청자명, 연락처, 이메일, 문의 내용<br />
                        수집 목적: 도입 상담 및 서비스 안내<br />
                        보유 기간: 문의 처리 완료 후 1년
                      </p>
                    </div>
                  </div>
                  {errors.privacyConsent && (
                    <p className="text-xs text-destructive">{errors.privacyConsent}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-14 text-base font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "접수 중..."
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      도입문의 신청하기
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-12 bg-section-alt border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-center mb-8">회사 정보</h3>
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Building2 className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <span className="text-muted-foreground">상호명</span>
                      <p className="font-medium">(주) 와이즈인컴퍼니</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <User className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <span className="text-muted-foreground">대표</span>
                      <p className="font-medium">김원표</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileText className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <span className="text-muted-foreground">사업자등록번호</span>
                      <p className="font-medium">113-86-13917</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileText className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <span className="text-muted-foreground">통신판매업신고번호</span>
                      <p className="font-medium">제 2010-서울강남-00331호</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <span className="text-muted-foreground">주소</span>
                      <p className="font-medium">서울 강남구 언주로 309 기성빌딩 3층</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <span className="text-muted-foreground">전화 / 팩스</span>
                      <p className="font-medium">TEL 02-558-5144 / FAX 02-558-5146</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <span className="text-muted-foreground">이메일</span>
                      <p className="font-medium">wic@wiseinc.co.kr</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <User className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <span className="text-muted-foreground">개인정보보호책임자</span>
                      <p className="font-medium">김진성</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
