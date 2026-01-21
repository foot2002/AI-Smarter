import { useState, useEffect, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Video, MessageCircle, Heart, MessageSquare, Share2, Bookmark, MoreHorizontal } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import blogCafeInterior from "@/assets/blog-cafe-interior.jpg";
import blogCafeDrinks from "@/assets/blog-cafe-drinks.jpg";
import blogCoffeeRoasting from "@/assets/blog-coffee-roasting.jpg";
import shortsCafePreview from "@/assets/shorts-cafe-preview.jpg";
import snsInstagramCoffee from "@/assets/sns-instagram-coffee.jpg";
import snsFacebookCafe from "@/assets/sns-facebook-cafe.jpg";
import snsThreadsCoffee from "@/assets/sns-threads-coffee.jpg";

const blogContent = {
  title: "망원동 핫플! 직접 로스팅한 원두의 향이 가득한 카페",
  titles: [
    "망원동 핫플! 직접 로스팅한 원두의 향이 가득한 카페",
    "\"여기 커피 진짜 맛있어요\" 단골 리뷰로 증명하는 로컬 카페",
    "작지만 확실한 커피 한 잔, 망원동 숨은 명소 소개",
  ],
  toc: ["1. 매장 분위기", "2. 시그니처 메뉴 소개", "3. 고객 후기 하이라이트", "4. 위치 및 영업시간"],
};

const shortsContent = {
  hook: '[장면 1] "이 카페, 왜 매일 줄 서 있냐고요?"',
  scenes: [
    { time: "0:00-0:05", content: "매장 외관 + 줄 서있는 손님들 (드론 or 타임랩스)" },
    { time: "0:05-0:15", content: "원두 로스팅 장면 클로즈업 + 연기 효과" },
    { time: "0:15-0:30", content: "시그니처 메뉴 제조 과정 (에스프레소 추출 → 토닉 부딪히는 소리)" },
    { time: "0:30-0:45", content: "고객 리뷰 자막 + 행복하게 커피 마시는 손님" },
    { time: "0:45-0:55", content: "매장 내부 분위기 + 위치 정보" },
    { time: "0:55-1:00", content: 'CTA: "직접 맛보러 오세요!" + 위치 태그' },
  ],
  cta: "직접 맛보러 오세요! 📍 망원동 XX카페",
};

const snsContent = {
  friendly: `☕ 오늘도 여기 커피로 하루 시작!
직접 로스팅한 원두 향이 코끝을 자극하는 이 곳...
출근 전 한 잔이 행복의 시작이에요 ✨

#망원동카페 #로컬카페 #커피스타그램 #원두로스팅`,
  professional: `[망원동 로컬 카페 추천]
자체 로스팅 원두로 만드는 스페셜티 커피 전문점.
시그니처 에스프레소 토닉과 바닐라 라떼를 추천드립니다.

📍 서울시 마포구 망원동
⏰ 평일 8-21시

#스페셜티커피 #망원동맛집 #카페추천`,
  emotional: `커피 한 잔에 담긴 정성...
이른 아침부터 원두를 볶는 사장님의 손길이
이 한 잔의 향이 되었습니다 ☕🤎

일상에 지쳤을 때, 여기 커피가 위로가 되어줄 거예요.

#힐링카페 #커피사랑 #망원동`,
  hashtags: ["#망원동카페", "#로컬카페", "#커피스타그램", "#원두로스팅", "#스페셜티커피", "#망원동맛집", "#카페추천", "#힐링카페", "#커피사랑", "#서울카페", "#카페투어", "#커피맛집", "#핫플", "#분위기카페", "#데이트코스"],
};

const TABS = ["blog", "shorts", "sns"] as const;
const AUTO_ROTATE_INTERVAL = 3000; // 3 seconds

export function ResultsPreviewSection() {
  const [activeTab, setActiveTab] = useState<string>("blog");
  const [isPaused, setIsPaused] = useState(false);

  const goToNextTab = useCallback(() => {
    setActiveTab((current) => {
      const currentIndex = TABS.indexOf(current as typeof TABS[number]);
      const nextIndex = (currentIndex + 1) % TABS.length;
      return TABS[nextIndex];
    });
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(goToNextTab, AUTO_ROTATE_INTERVAL);
    return () => clearInterval(interval);
  }, [isPaused, goToNextTab]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setIsPaused(true);
    // Resume auto-rotation after 10 seconds of inactivity
    setTimeout(() => setIsPaused(false), 10000);
  };

  return (
    <section className="py-section bg-section-alt overflow-hidden">
      <div className="container mx-auto px-4">
        <ScrollReveal variant="fade-up" duration={800}>
          <h2 className="text-display-sm md:text-display-md font-bold text-center mb-4">
            AI가 만드는 <span className="text-primary">실제 결과물</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={100} duration={800}>
          <p className="text-muted-foreground text-center mb-12 text-lg max-w-2xl mx-auto">
            리뷰 몇 줄이 블로그 글, 쇼츠 대본, SNS 문구로 변환됩니다
          </p>
        </ScrollReveal>

        <ScrollReveal variant="zoom-in" delay={200} duration={700}>
          <Tabs value={activeTab} onValueChange={handleTabChange} className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8 h-12">
              <TabsTrigger value="blog" className="flex items-center gap-2 text-sm">
                <FileText className="w-4 h-4" />
                블로그 글
              </TabsTrigger>
              <TabsTrigger value="shorts" className="flex items-center gap-2 text-sm">
                <Video className="w-4 h-4" />
                쇼츠 대본
              </TabsTrigger>
              <TabsTrigger value="sns" className="flex items-center gap-2 text-sm">
                <MessageCircle className="w-4 h-4" />
                SNS 문구
              </TabsTrigger>
            </TabsList>

            {/* Blog Content with Images */}
            <TabsContent value="blog" className="mt-0 min-h-[1300px]">
              <div className="bg-card rounded-2xl border border-border shadow-soft p-6 md:p-8">
                <div className="mb-6">
                  <span className="text-xs font-medium text-muted-foreground mb-2 block">추천 제목 3종</span>
                  <ul className="space-y-2">
                    {blogContent.titles.map((title, i) => (
                      <li key={i} className="text-sm text-foreground/80 pl-4 border-l-2 border-primary/30">
                        {title}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-6">
                  <span className="text-xs font-medium text-muted-foreground mb-2 block">목차</span>
                  <div className="flex flex-wrap gap-2">
                    {blogContent.toc.map((item, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-secondary rounded-md">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="border-t border-border pt-6">
                  <span className="text-xs font-medium text-muted-foreground mb-3 block">본문 미리보기</span>
                  <div className="prose prose-sm max-w-none text-foreground/80 leading-relaxed space-y-4">
                    <p>안녕하세요, 오늘은 망원동에 숨어있는 로컬 카페를 소개해 드릴게요.</p>
                    
                    <p>이 카페의 가장 큰 특징은 <strong>직접 로스팅한 원두</strong>예요. 매장에 들어서는 순간 고소하면서도 깊은 커피 향이 온몸을 감싸는 느낌이 들어요.</p>
                    
                    {/* Blog Image 1 */}
                    <div className="rounded-xl overflow-hidden my-6">
                      <img src={blogCoffeeRoasting} alt="직접 로스팅하는 원두" className="w-full h-48 md:h-64 object-cover" />
                      <p className="text-xs text-muted-foreground text-center mt-2 italic">▲ 매일 아침 직접 로스팅하는 신선한 원두</p>
                    </div>
                    
                    <p><strong>시그니처 메뉴</strong>로는 에스프레소 토닉과 바닐라 라떼가 있는데요, 특히 에스프레소 토닉은 여름에 마시면 정말 시원하고 상쾌해요. 단맛을 좋아하시는 분들께는 바닐라 라떼를 추천드려요.</p>
                    
                    {/* Blog Image 2 */}
                    <div className="rounded-xl overflow-hidden my-6">
                      <img src={blogCafeDrinks} alt="시그니처 메뉴" className="w-full h-48 md:h-64 object-cover" />
                      <p className="text-xs text-muted-foreground text-center mt-2 italic">▲ 에스프레소 토닉과 바닐라 라떼</p>
                    </div>
                    
                    <p><strong>고객 리뷰</strong>를 살펴보면:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>"매일 출근길에 들러요. 여기 커피 아니면 안 마셔요" - 김○○님</li>
                      <li>"분위기도 좋고 사장님도 친절해요" - 이○○님</li>
                    </ul>
                    
                    {/* Blog Image 3 */}
                    <div className="rounded-xl overflow-hidden my-6">
                      <img src={blogCafeInterior} alt="매장 내부" className="w-full h-48 md:h-64 object-cover" />
                      <p className="text-xs text-muted-foreground text-center mt-2 italic">▲ 아늑한 매장 분위기</p>
                    </div>
                    
                    <p>📍 위치: 서울시 마포구 망원동 XX-XX<br/>⏰ 영업시간: 평일 8:00-21:00 / 주말 10:00-20:00</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Shorts Content with Preview Image */}
            <TabsContent value="shorts" className="mt-0 min-h-[1300px]">
              <div className="bg-card rounded-2xl border border-border shadow-soft p-6 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr,280px] gap-8">
                  {/* Script Section */}
                  <div>
                    <div className="mb-6">
                      <span className="text-xs font-medium text-muted-foreground mb-2 block">훅 (첫 장면)</span>
                      <p className="text-lg font-semibold text-primary">{shortsContent.hook}</p>
                    </div>
                    <div className="mb-6">
                      <span className="text-xs font-medium text-muted-foreground mb-3 block">60초 대본 (장면별)</span>
                      <div className="space-y-3">
                        {shortsContent.scenes.map((scene, i) => (
                          <div key={i} className="flex gap-4 p-3 bg-secondary/50 rounded-lg">
                            <span className="text-xs font-mono text-primary whitespace-nowrap">{scene.time}</span>
                            <span className="text-sm text-foreground/80">{scene.content}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <span className="text-xs font-medium text-muted-foreground mb-2 block">CTA (클로징)</span>
                      <p className="text-base font-medium text-accent">{shortsContent.cta}</p>
                    </div>
                  </div>
                  
                  {/* Shorts Preview Image */}
                  <div className="flex justify-center lg:justify-end">
                    <div className="relative w-[200px] md:w-[240px]">
                      {/* Phone Frame */}
                      <div className="relative rounded-[2rem] overflow-hidden bg-black p-2 shadow-2xl">
                        <div className="rounded-[1.5rem] overflow-hidden">
                          <img 
                            src={shortsCafePreview} 
                            alt="쇼츠 미리보기" 
                            className="w-full aspect-[9/16] object-cover"
                          />
                          {/* Shorts UI Overlay */}
                          <div className="absolute inset-0 pointer-events-none">
                            {/* Top gradient */}
                            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/50 to-transparent" />
                            {/* Bottom gradient */}
                            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />
                            {/* Side actions */}
                            <div className="absolute right-3 bottom-20 flex flex-col gap-4 items-center">
                              <div className="flex flex-col items-center">
                                <Heart className="w-7 h-7 text-white" />
                                <span className="text-xs text-white mt-1">2.4K</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <MessageSquare className="w-7 h-7 text-white" />
                                <span className="text-xs text-white mt-1">48</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <Share2 className="w-7 h-7 text-white" />
                                <span className="text-xs text-white mt-1">공유</span>
                              </div>
                            </div>
                            {/* Bottom text */}
                            <div className="absolute bottom-4 left-3 right-14">
                              <p className="text-white text-sm font-medium">@망원동카페</p>
                              <p className="text-white/80 text-xs mt-1 line-clamp-2">이 카페, 왜 매일 줄 서있냐고요? ☕</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground text-center mt-3">쇼츠 미리보기</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* SNS Content - Instagram/Facebook Style */}
            <TabsContent value="sns" className="mt-0 min-h-[1300px]">
              <div className="bg-card rounded-2xl border border-border shadow-soft p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {/* Instagram Style Card */}
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-md dark:bg-slate-900 dark:border-slate-700">
                    {/* Instagram Header */}
                    <div className="flex items-center gap-3 p-3 border-b border-gray-100 dark:border-slate-700">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 p-0.5">
                        <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center">
                          <span className="text-xs font-bold">☕</span>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-foreground">mangwon_cafe</span>
                      <MoreHorizontal className="w-4 h-4 text-muted-foreground ml-auto" />
                    </div>
                    {/* Image */}
                    <div className="aspect-square">
                      <img src={snsInstagramCoffee} alt="라떼아트 커피" className="w-full h-full object-cover" />
                    </div>
                    {/* Instagram Actions */}
                    <div className="p-3">
                      <div className="flex items-center gap-4 mb-2">
                        <Heart className="w-6 h-6 text-foreground" />
                        <MessageCircle className="w-6 h-6 text-foreground" />
                        <Share2 className="w-6 h-6 text-foreground" />
                        <Bookmark className="w-6 h-6 text-foreground ml-auto" />
                      </div>
                      <p className="text-xs font-semibold text-foreground mb-1">좋아요 128개</p>
                      <p className="text-xs text-foreground/80 whitespace-pre-line leading-relaxed">{snsContent.friendly}</p>
                    </div>
                  </div>
                  
                  {/* Facebook Style Card */}
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-md dark:bg-slate-900 dark:border-slate-700">
                    {/* Facebook Header */}
                    <div className="flex items-center gap-3 p-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                        <span className="text-white text-sm font-bold">MC</span>
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-foreground block">망원동 카페</span>
                        <span className="text-xs text-muted-foreground">1시간 전 · 🌐</span>
                      </div>
                      <MoreHorizontal className="w-5 h-5 text-muted-foreground ml-auto" />
                    </div>
                    {/* Content */}
                    <div className="px-3 pb-3">
                      <p className="text-sm text-foreground/80 whitespace-pre-line leading-relaxed mb-3">{snsContent.professional}</p>
                    </div>
                    {/* Image */}
                    <div className="aspect-video">
                      <img src={snsFacebookCafe} alt="카페 인테리어" className="w-full h-full object-cover" />
                    </div>
                    {/* Facebook Actions */}
                    <div className="p-3 border-t border-gray-100 dark:border-slate-700">
                      <div className="flex justify-between text-xs text-muted-foreground mb-2">
                        <span>👍❤️ 56</span>
                        <span>댓글 12개 · 공유 8회</span>
                      </div>
                      <div className="flex justify-around pt-2 border-t border-gray-100 dark:border-slate-700">
                        <button className="text-sm text-muted-foreground hover:bg-secondary px-4 py-1 rounded">👍 좋아요</button>
                        <button className="text-sm text-muted-foreground hover:bg-secondary px-4 py-1 rounded">💬 댓글</button>
                        <button className="text-sm text-muted-foreground hover:bg-secondary px-4 py-1 rounded">↗️ 공유</button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Thread/Twitter Style Card */}
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-md dark:bg-slate-900 dark:border-slate-700">
                    {/* Header */}
                    <div className="flex items-start gap-3 p-4 pb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm">🤎</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-foreground">망원동카페</span>
                          <span className="text-xs text-muted-foreground">@mangwon_cafe</span>
                          <span className="text-xs text-muted-foreground">· 2시간</span>
                        </div>
                        <p className="text-sm text-foreground/80 whitespace-pre-line leading-relaxed mt-2">{snsContent.emotional}</p>
                      </div>
                    </div>
                    {/* Image */}
                    <div className="aspect-video">
                      <img src={snsThreadsCoffee} alt="원두와 커피" className="w-full h-full object-cover" />
                    </div>
                    {/* Actions */}
                    <div className="flex justify-start gap-6 p-4 text-muted-foreground">
                      <div className="flex items-center gap-1 text-xs">
                        <MessageCircle className="w-4 h-4" />
                        <span>24</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <Share2 className="w-4 h-4" />
                        <span>12</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <Heart className="w-4 h-4" />
                        <span>89</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <span className="text-xs font-medium text-muted-foreground mb-3 block">추천 해시태그 15종</span>
                  <div className="flex flex-wrap gap-2">
                    {snsContent.hashtags.map((tag, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </ScrollReveal>
      </div>
    </section>
  );
}
