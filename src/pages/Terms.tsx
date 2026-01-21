import { Layout } from "@/components/layout/Layout";

export default function Terms() {
  return (
    <Layout>
      <div className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">이용약관</h1>
          
          <div className="prose prose-gray max-w-none space-y-8 text-foreground/80">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">제1조 (목적)</h2>
              <p className="leading-relaxed">
                이 약관은 주식회사 와이즈인컴퍼니(이하 "회사")가 제공하는 AI SMarter 서비스(이하 "서비스")의 이용조건 및 절차, 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">제2조 (정의)</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>"서비스"란 회사가 제공하는 AI 기반 마케팅 자동화 솔루션 및 관련 부가서비스를 의미합니다.</li>
                <li>"이용자"란 본 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.</li>
                <li>"회원"이란 본 약관에 동의하고 서비스 이용계약을 체결한 자를 말합니다.</li>
                <li>"콘텐츠"란 서비스를 통해 생성되거나 제공되는 텍스트, 이미지, 영상 등 모든 자료를 의미합니다.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">제3조 (약관의 효력 및 변경)</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>본 약관은 서비스 화면에 게시하거나 기타의 방법으로 공지함으로써 효력이 발생합니다.</li>
                <li>회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 변경할 수 있습니다.</li>
                <li>약관이 변경되는 경우 회사는 변경 사항을 시행일자 7일 전부터 서비스 내 공지합니다.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">제4조 (서비스의 제공)</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>회사는 다음과 같은 서비스를 제공합니다:
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>AI 기반 SNS 마케팅 콘텐츠 자동 생성</li>
                    <li>리뷰 및 설문 분석 서비스</li>
                    <li>마케팅 캘린더 및 예약 발행 서비스</li>
                    <li>기타 회사가 정하는 서비스</li>
                  </ul>
                </li>
                <li>서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다.</li>
                <li>회사는 시스템 점검, 설비 교체 등의 사유로 서비스를 일시 중단할 수 있습니다.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">제5조 (이용계약의 성립)</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>이용계약은 이용자가 약관에 동의하고 회원가입 신청을 한 후 회사가 이를 승낙함으로써 성립합니다.</li>
                <li>회사는 다음 각 호에 해당하는 신청에 대해서는 승낙을 거부할 수 있습니다:
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>타인의 명의를 도용한 경우</li>
                    <li>허위 정보를 기재한 경우</li>
                    <li>기타 회사가 정한 이용신청 요건이 충족되지 않은 경우</li>
                  </ul>
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">제6조 (이용자의 의무)</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>이용자는 관계 법령, 본 약관의 규정, 이용안내 및 주의사항을 준수하여야 합니다.</li>
                <li>이용자는 다음 행위를 하여서는 안 됩니다:
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>서비스를 이용하여 얻은 정보를 회사의 사전 승낙 없이 복제, 배포, 판매하는 행위</li>
                    <li>회사 및 제3자의 지적재산권을 침해하는 행위</li>
                    <li>서비스의 안정적 운영을 방해하는 행위</li>
                    <li>기타 관계 법령에 위배되는 행위</li>
                  </ul>
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">제7조 (요금 및 결제)</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>서비스 이용요금은 회사가 별도로 정하는 바에 따릅니다.</li>
                <li>유료 서비스의 결제방법은 신용카드, 계좌이체 등 회사가 정하는 방법으로 합니다.</li>
                <li>요금은 월 단위로 청구되며, 결제일 기준으로 자동 갱신됩니다.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">제8조 (환불)</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>이용자는 유료 서비스 결제 후 7일 이내에 환불을 요청할 수 있습니다.</li>
                <li>다만, 서비스를 이용한 경우에는 이용 일수에 해당하는 금액을 공제한 후 환불합니다.</li>
                <li>환불은 결제 시 사용한 동일한 결제수단으로 처리됩니다.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">제9조 (지적재산권)</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>서비스에 포함된 모든 콘텐츠에 대한 저작권 및 지적재산권은 회사에 귀속됩니다.</li>
                <li>이용자가 서비스를 통해 생성한 콘텐츠의 저작권은 해당 이용자에게 귀속됩니다.</li>
                <li>이용자는 회사의 서비스를 이용함으로써 얻은 정보를 회사의 사전 승낙 없이 상업적으로 이용할 수 없습니다.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">제10조 (면책조항)</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>회사는 천재지변, 전쟁, 기간통신사업자의 서비스 중지 등 불가항력적인 사유로 서비스를 제공할 수 없는 경우 책임이 면제됩니다.</li>
                <li>회사는 이용자의 귀책사유로 인한 서비스 이용 장애에 대해 책임을 지지 않습니다.</li>
                <li>회사는 AI가 생성한 콘텐츠의 정확성, 적법성에 대해 보증하지 않으며, 이용자가 해당 콘텐츠를 활용함으로써 발생하는 문제에 대해 책임을 지지 않습니다.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">제11조 (분쟁해결)</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>회사와 이용자 간 발생한 분쟁에 관한 소송의 관할법원은 서울중앙지방법원으로 합니다.</li>
                <li>본 약관에 명시되지 않은 사항은 관계 법령 및 상관례에 따릅니다.</li>
              </ol>
            </section>

            <section className="pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                <strong>부칙</strong><br />
                본 약관은 2026년 1월 1일부터 시행합니다.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
