import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles, LogIn } from "lucide-react";
import { getSolutionEntryUrl } from "@/lib/storeRouting";

const navItems = [
  { label: "메인화면", path: "/" },
  { label: "가격", path: "/pricing" },
  { label: "도입효과", path: "/impact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const solutionUrl = getSolutionEntryUrl();

  const handleSolutionClick = () => {
    setMobileMenuOpen(false);
    navigate(solutionUrl);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-bold text-xl tracking-tight">
              AI <span className="text-primary">SMarter</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA - 3 buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link 
              to="/login" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
            >
              <LogIn className="w-4 h-4" />
              로그인
            </Link>
            <Button variant="outline" size="sm" asChild>
              <Link to="/trial">무료체험</Link>
            </Button>
            <Button size="sm" onClick={handleSolutionClick}>
              솔루션 시작하기
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border animate-fade-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium transition-colors hover:text-primary ${
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Mobile CTA section */}
            <div className="pt-4 border-t border-border space-y-3">
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" asChild>
                  <Link to="/trial" onClick={() => setMobileMenuOpen(false)}>무료체험</Link>
                </Button>
                <Button className="flex-1" onClick={handleSolutionClick}>
                  솔루션 시작
                </Button>
              </div>
              <Link 
                to="/login" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground py-2"
              >
                <LogIn className="w-4 h-4" />
                로그인
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
