
import React, { useState } from 'react';
import PricingCard from './components/PricingCard';
import ComparisonTable from './components/ComparisonTable';
import Schema from './components/Schema';
import { MONTHLY_PLANS, YEARLY_PLANS, FAQS } from './constants';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<'PLANS' | 'API'>('PLANS');
  const [discountCode, setDiscountCode] = useState('');
  const [discountRate, setDiscountRate] = useState(0); // 0.2 means 20% off
  const [isVerifying, setIsVerifying] = useState(false);
  const [discountMessage, setDiscountMessage] = useState('');

  const freePlan = MONTHLY_PLANS[0];
  const allPaidPlans = [
    MONTHLY_PLANS[1],   // Standard Monthly
    YEARLY_PLANS[0],    // Standard Yearly
    YEARLY_PLANS[1],    // Advanced Yearly
    YEARLY_PLANS[2]     // VIP Yearly
  ];

  // Handle discount code input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDiscountCode(value);
    
    // Logic: If input is cleared, restore pricing to original
    if (value === '') {
      setDiscountRate(0);
      setDiscountMessage('');
    }
  };

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) return;
    setIsVerifying(true);
    setDiscountMessage('');

    setTimeout(() => {
      const code = discountCode.toUpperCase();
      if (code === 'OFF20') {
        setDiscountRate(0.2);
        setDiscountMessage('20%オフクーポンが適用されました！');
      } else if (code === 'SPECIAL') {
        setDiscountRate(0.1);
        setDiscountMessage('10%オフクーポンがされました！');
      } else {
        setDiscountRate(0);
        setDiscountMessage('無効なクーポンコードです。');
      }
      setIsVerifying(false);
    }, 600);
  };

  const partnerLogos = [
    "TOYOTA SYSTEMS", "SARAYA", "NIPPON EXPRESS", "NISSAY", "JAF", "TANAKA",
    "SEVEN STEP", "FUKUI", "GS YUASA", "BML", "PILOT", "TOHO", "NX 商事",
    "hoyu", "UGIKO", "MANDOM", "SNK", "BSP", "Dai-ichi Life"
  ];

  return (
    <div className="app-container">
      <Schema />

      {/* Hero Section */}
      <section className="bg-orange-gradient text-center">
        <div className="container">
          <h1 className="display-6 fw-bold mb-3">
            ご自身のニーズに応えられる料金プラン
          </h1>

          <div className="plan-switcher-container">
            <button 
              className={`switcher-item ${viewMode === 'PLANS' ? 'active first' : ''}`}
              onClick={() => setViewMode('PLANS')}
              style={{ paddingLeft: '60px', paddingRight: '60px' }}
            >
              プラン一覧
            </button>
            <button 
              className={`switcher-item ${viewMode === 'API' ? 'active last' : ''}`}
              onClick={() => setViewMode('API')}
              style={{ paddingLeft: '60px', paddingRight: '60px' }}
            >
              API連携
            </button>
          </div>

          <p className="mt-2 fw-normal opacity-90 px-3 small">
            契約日から30日間（月単位）または365日間（年単位）の利用が保証されます。
          </p>
        </div>
      </section>

      {/* Pricing Content */}
      <section className="container-fluid container-xxl" style={{ marginBottom: '80px', maxWidth: '1440px' }}>
        {viewMode === 'PLANS' ? (
          <div className="pricing-unified-container">
            {/* Refined Discount Code Section */}
            <div className="discount-section">
              <div className="discount-guide">
                <div>クーポンコードをお持ちですか?入力すると割引後の価格をご確認いただけます。</div>
                {discountRate > 0 && (
                  <div className="text-danger fw-bold mt-1">割引は定価から適用されます！</div>
                )}
              </div>
              <div className="d-flex flex-column align-items-end gap-1">
                <div className="discount-input-group shadow-sm">
                  <input 
                    type="text" 
                    placeholder="クーポンコードを入力" 
                    value={discountCode}
                    onChange={handleInputChange}
                    onKeyDown={(e) => e.key === 'Enter' && handleApplyDiscount()}
                  />
                  <button 
                    className="discount-btn" 
                    onClick={handleApplyDiscount}
                    disabled={isVerifying}
                  >
                    {isVerifying ? '確認中' : '適用'}
                  </button>
                </div>
                {discountMessage && (
                  <span className={`small fw-bold mt-1 ${discountRate > 0 ? 'text-success' : 'text-danger'}`} style={{ fontSize: '0.75rem' }}>
                    {discountMessage}
                  </span>
                )}
              </div>
            </div>

            <div className="pricing-grid">
              <div className="spacer-cell d-none d-lg-block"></div>
              <div className="group-title-cell d-none d-lg-flex"></div>
              <div className="group-title-cell d-none d-lg-flex">
                <div className="group-title-label label-monthly">月間プラン</div>
              </div>
              <div className="group-title-cell d-none d-lg-flex" style={{ gridColumn: 'span 3' }}>
                <div className="group-title-label label-yearly" style={{ position: 'relative' }}>
                  年間プラン <span className="savings-pill">お得！2ヶ月分無料</span>
                </div>
              </div>

              <div className="pricing-card-spacer d-none d-lg-block"></div>
              <PricingCard plan={freePlan} isFirst={true} />
              <PricingCard plan={allPaidPlans[0]} discountRate={discountRate} />
              <PricingCard plan={allPaidPlans[1]} isRecommended={true} discountRate={discountRate} />
              <PricingCard plan={allPaidPlans[2]} discountRate={discountRate} />
              <PricingCard plan={allPaidPlans[3]} isLast={true} discountRate={discountRate} />
            </div>

            <ComparisonTable plans={allPaidPlans} freePlan={freePlan} />
          </div>
        ) : (
          <div className="api-view-container mx-auto" style={{ maxWidth: '800px', marginTop: '-50px' }}>
             <div className="api-banner shadow-lg text-center py-5">
                <h2 className="mb-4">APIインターフェース</h2>
                <p className="lead mb-4 px-4">
                  系统連携や大量数据取得が必要な場合は、API専用プランをご案内いたします。
                </p>
                <div className="p-4 bg-white rounded text-dark d-inline-block text-start mb-4 shadow-sm mx-3">
                  <p className="mb-2 fw-bold text-warning">APIの主な機能：</p>
                  <ul className="mb-0 small">
                    <li>全13カ国のリアルタイム市場データ直接取得</li>
                    <li>キーワード逆引き・商品リサーチの自动化</li>
                    <li>自社BIツールやERPへのシームレスな数据連携</li>
                  </ul>
                </div>
                <br/>
                <button className="btn btn-warning btn-lg fw-bold text-white rounded-pill px-5 shadow">
                  API詳細・見積もり依頼
                </button>
                <p className="mt-4 small opacity-75">テクニカルサポート: bi@sellersprite.com</p>
             </div>
          </div>
        )}
      </section>

      {/* Partners Section */}
      <section className="py-5 bg-white border-top overflow-hidden">
        <div className="container-fluid text-center">
          <h2 className="fw-bold mb-4" style={{ fontSize: '1.5rem' }}>導入企業</h2>
          <div className="marquee-container">
            <div className="marquee-content">
              {/* Double the logos for seamless looping */}
              {[...partnerLogos, ...partnerLogos].map((name, index) => (
                <div key={index} className="partner-logo">
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mb-5 pt-5">
        <h2 className="text-center fw-bold mb-5">よくあるご質問</h2>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="accordion accordion-flush" id="faqAccordion">
              {FAQS.map((faq, index) => (
                <div className="accordion-item bg-transparent border-bottom mb-2" key={index}>
                  <h3 className="accordion-header">
                    <button className="accordion-button collapsed fw-bold bg-transparent px-0 py-3" type="button" data-bs-toggle="collapse" data-bs-target={`#faq-${index}`}>
                      <span className="me-3 text-warning">Q.</span> {faq.question}
                    </button>
                  </h3>
                  <div id={`faq-${index}`} className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body px-0 pt-0 pb-3 text-muted small">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Conversion CTA Section */}
      <section className="cta-conversion-section">
        <div className="container">
          <div className="row align-items-center justify-content-center py-5 px-4 rounded-4 shadow-lg cta-inner">
            <div className="col-lg-4 text-center mb-4 mb-lg-0">
              <a 
                href="https://www.sellersprite.com/jp/index/register" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-cta-register shadow"
              >
                今すぐ無料で登録する
              </a>
            </div>
            <div className="col-lg-7 text-start ps-lg-5">
              <h3 className="fw-bold text-white mb-2">Amazonビジネスの成長を加速させる</h3>
              <p className="text-white opacity-90 mb-0" style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>
                市場リサーチから広告分析まで、Amazon出品者に必要なすべてのツールがここに。
                まずは無料プランから、あなたのビジネスの可能性を広げましょう。
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-5 border-top bg-light">
        <div className="container text-center">
          <p className="mb-0 text-muted small">&copy; 2024-2025 SellerSprite. Global Data Intelligence for Amazon Sellers.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
