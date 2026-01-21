import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-xl tracking-tight">
                AI <span className="text-primary">SMarter</span>
              </span>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed max-w-sm">
              소상공인을 위한 AI 마케팅 자동화 솔루션.<br />
              리뷰와 설문을 매출로 연결합니다.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4">서비스</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/" className="hover:text-primary transition-colors">메인화면</Link></li>
              <li><Link to="/pricing" className="hover:text-primary transition-colors">가격</Link></li>
              <li><Link to="/impact" className="hover:text-primary transition-colors">도입효과</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">고객지원</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/contact" className="hover:text-primary transition-colors">도입문의</Link></li>
              <li><a href="mailto:contact@wiseincompany.com" className="hover:text-primary transition-colors">contact@wiseincompany.com</a></li>
            </ul>
          </div>
        </div>

        {/* Company Info */}
        <div className="border-t border-background/20 mt-10 pt-8">
          <div className="text-sm text-background/60 space-y-1">
            <p className="font-medium text-background/80">주식회사 와이즈인컴퍼니</p>
            <p>대표: 김진성 | 사업자등록번호: 513-81-29912</p>
            <p>주소: 대구광역시 동구 동대구로 489, 범어타워 7층</p>
            <p>연락처: 053-751-3022 | 이메일: contact@wiseincompany.com</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-foreground/90 border-t border-background/10">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-sm text-background/50">
            © 2026 AI SMarter. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-background/50">
            <Link to="/terms" className="hover:text-primary transition-colors">이용약관</Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">개인정보처리방침</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
