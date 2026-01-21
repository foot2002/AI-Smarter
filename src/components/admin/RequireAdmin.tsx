import { useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Lock } from "lucide-react";

const ADMIN_KEY_STORAGE = "admin_access_key";

interface RequireAdminProps {
  children: ReactNode;
}

export function RequireAdmin({ children }: RequireAdminProps) {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [adminKey, setAdminKey] = useState("");
  const [error, setError] = useState("");

  const expectedKey = import.meta.env.VITE_ADMIN_KEY;
  const expectedEmails = import.meta.env.VITE_ADMIN_EMAILS?.split(",").map((e: string) => e.trim()) || [];
  const appMode = import.meta.env.VITE_APP_MODE || "demo";

  useEffect(() => {
    // 로컬스토리지에서 저장된 키 확인
    const storedKey = localStorage.getItem(ADMIN_KEY_STORAGE);
    if (storedKey && expectedKey && storedKey === expectedKey) {
      setIsAuthorized(true);
    } else if (appMode === "demo" && !expectedKey && !expectedEmails.length) {
      // demo 모드에서만 env 미설정 시 경고 배지 + 통과
      setIsAuthorized(true);
    } else if (appMode === "prod" && !expectedKey) {
      // prod 모드에서 VITE_ADMIN_KEY가 없으면 무조건 차단
      setIsAuthorized(false);
    } else {
      setIsAuthorized(false);
    }
  }, [expectedKey, expectedEmails, appMode]);

  const handleKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!adminKey.trim()) {
      setError("관리자 키를 입력하세요.");
      return;
    }

    if (expectedKey && adminKey === expectedKey) {
      localStorage.setItem(ADMIN_KEY_STORAGE, adminKey);
      setIsAuthorized(true);
    } else {
      setError("올바른 관리자 키가 아닙니다.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_KEY_STORAGE);
    setIsAuthorized(false);
    setAdminKey("");
    navigate("/");
  };

  // 로딩 중
  if (isAuthorized === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">권한 확인 중...</p>
        </div>
      </div>
    );
  }

  // 인증됨
  if (isAuthorized) {
    return (
      <>
        {appMode === "demo" && !expectedKey && !expectedEmails.length && (
          <div className="fixed top-4 right-4 z-50">
            <Badge variant="destructive" className="bg-yellow-100 text-yellow-800 border-yellow-300">
              <AlertCircle className="w-3 h-3 mr-1" />
              Admin 접근 가드 미설정 (개발 모드)
            </Badge>
          </div>
        )}
        {children}
      </>
    );
  }

  // 인증 필요
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <Lock className="w-8 h-8 text-muted-foreground" />
            </div>
          </div>
          <CardTitle>관리자 접근 권한이 필요합니다</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleKeySubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-key">관리자 키</Label>
              <Input
                id="admin-key"
                type="password"
                placeholder="관리자 키를 입력하세요"
                value={adminKey}
                onChange={(e) => {
                  setAdminKey(e.target.value);
                  setError("");
                }}
                autoFocus
              />
              {error && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full">
              접근하기
            </Button>
          </form>
          {expectedEmails.length > 0 && (
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                허용된 이메일: {expectedEmails.join(", ")}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                (추후 Auth 연동 시 이메일 기반 인증이 활성화됩니다)
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
