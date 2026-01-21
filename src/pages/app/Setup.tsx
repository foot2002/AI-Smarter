import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// /app/setup 접근 시 /app으로 리다이렉트하고 새 가게 모달을 자동으로 열도록 처리
export default function Setup() {
  const navigate = useNavigate();

  useEffect(() => {
    // ?new=true 파라미터를 붙여서 StoreSelect에서 모달이 자동으로 열리도록 함
    navigate("/app?new=true", { replace: true });
  }, [navigate]);

  // 리다이렉트 중 잠깐 표시될 수 있는 로딩 상태
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">가게 등록으로 이동 중...</p>
      </div>
    </div>
  );
}
