import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 환경변수 로드 (mode별 .env 파일 읽기)
  const env = loadEnv(mode, process.cwd(), "");
  
  // VITE_BASE_PATH 환경변수로 base 설정, 기본값은 "/"
  // GitHub Pages: "/<repo>/", Vercel 등 일반 호스팅: "/"
  const base = env.VITE_BASE_PATH || "/";

  return {
    base,
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
