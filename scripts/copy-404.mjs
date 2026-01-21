import { copyFileSync, existsSync } from "fs";
import { join } from "path";

const distDir = join(process.cwd(), "dist");
const indexHtml = join(distDir, "index.html");
const notFoundHtml = join(distDir, "404.html");

// dist 디렉토리와 index.html이 존재하는지 확인
if (!existsSync(distDir)) {
  console.error("❌ dist 디렉토리가 존재하지 않습니다. 먼저 빌드를 실행하세요.");
  process.exit(1);
}

if (!existsSync(indexHtml)) {
  console.error("❌ dist/index.html이 존재하지 않습니다. 빌드가 완료되지 않았습니다.");
  process.exit(1);
}

// index.html을 404.html로 복사
try {
  copyFileSync(indexHtml, notFoundHtml);
  console.log("✅ dist/404.html이 생성되었습니다.");
} catch (error) {
  console.error("❌ 404.html 생성 중 오류 발생:", error.message);
  process.exit(1);
}
