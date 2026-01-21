import { Layout } from "@/components/layout/Layout";

export default function Privacy() {
  return (
    <Layout>
      <div className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">개인정보처리방침</h1>
          
          <div className="prose prose-gray max-w-none space-y-8 text-foreground/80">
            <p className="leading-relaxed">
              주식회사 와이즈인컴퍼니(이하 "회사")는 개인정보보호법 등 관련 법령에 따라 이용자의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 다음과 같이 개인정보처리방침을 수립·공개합니다.
            </p>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">제1조 (개인정보의 수집 항목 및 수집 방법)</h2>
              <p className="mb-3">회사는 다음과 같은 개인정보를 수집합니다:</p>
              <ol className="list-decimal list-inside space-y-2">
                <li>필수 수집 항목
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>회원가입: 이름, 이메일, 비밀번호, 연락처</li>
                    <li>도입문의: 기업명, 담당자명, 연락처(전화/이메일), 문의내용</li>
                    <li>결제: 결제수단 정보, 결제 기록</li>
                  </ul>
                </li>
                <li>자동 수집 항목
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>서비스 이용 기록, 접속 로그, IP 주소, 쿠키, 브라우저 정보</li>
                  </ul>
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">제2조 (개인정보의 수집 및 이용 목적)</h2>
              <p className="mb-3">회사는 수집한 개인정보를 다음의 목적을 위해 이용합니다:</p>
              <ol className="list-decimal list-inside space-y-2">
                <li>서비스 제공에 관한 계약 이행 및 요금 정산</li>
                <li>회원 관리: 본인 확인, 서비스 이용 안내, 불만 처리</li>
                <li>마케팅 및 광고에의 활용: 이벤트 정보 및 참여기회 제공, 서비스 안내</li>
                <li>서비스 개선: 신규 서비스 개발 및 맞춤 서비스 제공</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">제3조 (개인정보의 보유 및 이용 기간)</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>회사는 이용자의 개인정보를 수집·이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.</li>
                <li>다만, 관계 법령에 따라 보존할 필요가 있는 경우에는 해당 법령에서 정한 기간 동안 보관합니다:
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>계약 또는 청약철회 등에 관한 기록: 5년 (전자상거래법)</li>
                    <li>대금결제 및 재화 등의 공급에 관한 기록: 5년 (전자상거래법)</li>
                    <li>소비자 불만 또는 분쟁처리에 관한 기록: 3년 (전자상거래법)</li>
                    <li>접속에 관한 기록: 3개월 (통신비밀보호법)</li>
                  </ul>
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">제4조 (개인정보의 제3자 제공)</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>회사는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다.</li>
                <li>다만, 다음의 경우에는 예외로 합니다:
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>이용자가 사전에 동의한 경우</li>
                    <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
                  </ul>
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">제5조 (개인정보의 처리 위탁)</h2>
              <p className="mb-3">회사는 서비스 향상을 위해 다음과 같이 개인정보 처리 업무를 위탁하고 있습니다:</p>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-border">
                  <thead className="bg-muted">
                    <tr>
                      <th className="border border-border px-4 py-2 text-left">수탁업체</th>
                      <th className="border border-border px-4 py-2 text-left">위탁 업무</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border px-4 py-2">결제대행사</td>
                      <td className="border border-border px-4 py-2">결제 처리</td>
                    </tr>
                    <tr>
                      <td className="border border-border px-4 py-2">클라우드 서비스</td>
                      <td className="border border-border px-4 py-2">데이터 저장 및 처리</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">제6조 (이용자의 권리와 의무)</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>이용자는 언제든지 자신의 개인정보를 조회하거나 수정할 수 있습니다.</li>
                <li>이용자는 개인정보의 수집·이용·제공에 대한 동의를 철회할 수 있습니다.</li>
                <li>이용자는 개인정보의 삭제를 요청할 수 있으며, 회사는 지체 없이 필요한 조치를 취합니다.</li>
                <li>이용자는 개인정보 관련 권리행사를 서면, 이메일 등을 통해 할 수 있으며, 회사는 이에 대해 지체 없이 조치합니다.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">제7조 (개인정보의 파기)</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.</li>
                <li>파기 절차 및 방법:
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>전자적 파일: 복원이 불가능한 방법으로 영구 삭제</li>
                    <li>종이 문서: 분쇄기로 분쇄하거나 소각</li>
                  </ul>
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">제8조 (개인정보의 안전성 확보 조치)</h2>
              <p className="mb-3">회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:</p>
              <ol className="list-decimal list-inside space-y-2">
                <li>개인정보 취급 직원의 최소화 및 교육</li>
                <li>개인정보에 대한 접근 통제 및 접근 권한 관리</li>
                <li>개인정보의 암호화</li>
                <li>보안프로그램 설치 및 주기적 갱신</li>
                <li>개인정보 처리 시스템 접속 기록의 보관 및 위변조 방지</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">제9조 (쿠키의 운용 및 거부)</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 쿠키(cookie)를 사용합니다.</li>
                <li>이용자는 쿠키 설치에 대한 선택권을 가지고 있으며, 웹브라우저에서 쿠키 저장을 거부할 수 있습니다.</li>
                <li>다만, 쿠키 저장을 거부할 경우 일부 서비스 이용에 어려움이 있을 수 있습니다.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">제10조 (개인정보 보호책임자)</h2>
              <p className="mb-3">회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 관련 불만처리 및 피해구제를 위해 아래와 같이 개인정보 보호책임자를 지정하고 있습니다:</p>
              <div className="bg-muted p-4 rounded-lg">
                <p><strong>개인정보 보호책임자</strong></p>
                <ul className="mt-2 space-y-1">
                  <li>성명: 김진성</li>
                  <li>직책: 대표</li>
                  <li>연락처: privacy@wiseincompany.com</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">제11조 (권익침해 구제방법)</h2>
              <p className="mb-3">이용자는 개인정보 침해로 인한 구제를 받기 위하여 다음 기관에 분쟁해결이나 상담 등을 신청할 수 있습니다:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>개인정보분쟁조정위원회: (국번없이) 1833-6972 (www.kopico.go.kr)</li>
                <li>개인정보침해신고센터: (국번없이) 118 (privacy.kisa.or.kr)</li>
                <li>대검찰청: (국번없이) 1301 (www.spo.go.kr)</li>
                <li>경찰청: (국번없이) 182 (ecrm.cyber.go.kr)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">제12조 (개인정보처리방침 변경)</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.</li>
              </ol>
            </section>

            <section className="pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                <strong>부칙</strong><br />
                본 개인정보처리방침은 2026년 1월 1일부터 시행합니다.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
