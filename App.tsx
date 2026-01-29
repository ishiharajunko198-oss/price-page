
import React, { useState } from 'react';
import PricingCard from './components/PricingCard';
import ComparisonTable from './components/ComparisonTable';
import Schema from './components/Schema';
import { MONTHLY_PLANS, YEARLY_PLANS, FAQS } from './constants';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<'PLANS' | 'API'>('PLANS');

  const freePlan = MONTHLY_PLANS[0];
  const allPaidPlans = [
    MONTHLY_PLANS[1],   // Standard Monthly
    YEARLY_PLANS[0],    // Standard Yearly
    YEARLY_PLANS[1],    // Advanced Yearly
    YEARLY_PLANS[2]     // VIP Yearly
  ];

  return (
    <div className="app-container pb-5">
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
      <section className="container-fluid container-xxl" style={{ marginBottom: '100px', maxWidth: '1440px' }}>
        {viewMode === 'PLANS' ? (
          <div className="pricing-unified-container">
            <div className="pricing-grid">
              {/* Row 1: Refined Group Labels */}
              <div className="spacer-cell d-none d-lg-block"></div>
              
              {/* Free Plan Area: Label Removed */}
              <div className="group-title-cell d-none d-lg-flex">
                {/* Space maintained for alignment, label removed per request */}
              </div>
              
              {/* Monthly Group (Covers ONLY Standard Monthly) */}
              <div className="group-title-cell d-none d-lg-flex">
                <div className="group-title-label label-monthly">
                  月間プラン
                </div>
              </div>
              
              {/* Yearly Group (Covers 3 Yearly Plans) */}
              <div className="group-title-cell d-none d-lg-flex" style={{ gridColumn: 'span 3' }}>
                <div className="group-title-label label-yearly">
                  年間プラン <span className="savings-pill">お得! 30%OFF</span>
                </div>
              </div>

              {/* Row 2: Pricing Cards */}
              <div className="pricing-card-spacer d-none d-lg-block"></div>
              
              <PricingCard plan={freePlan} isFirst={true} />
              <PricingCard plan={allPaidPlans[0]} />
              <PricingCard plan={allPaidPlans[1]} />
              <PricingCard plan={allPaidPlans[2]} />
              <PricingCard plan={allPaidPlans[3]} isLast={true} />
            </div>

            {/* Seamless Comparison Table */}
            <ComparisonTable plans={allPaidPlans} freePlan={freePlan} />
          </div>
        ) : (
          <div className="api-view-container mx-auto" style={{ maxWidth: '800px', marginTop: '-50px' }}>
             <div className="api-banner shadow-lg text-center py-5">
                <h2 className="mb-4">APIインターフェース</h2>
                <p className="lead mb-4 px-4">
                  システム連携や大量数据取得が必要な場合は、API専用プランをご案内いたします。
                </p>
                <div className="p-4 bg-white rounded text-dark d-inline-block text-start mb-4 shadow-sm mx-3">
                  <p className="mb-2 fw-bold text-warning">APIの主な機能：</p>
                  <ul className="mb-0 small">
                    <li>全13カ国のリアルタイム市場データ直接取得</li>
                    <li>キーワード逆引き・商品リサーチの自動化</li>
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

      <footer className="py-5 border-top bg-light">
        <div className="container text-center">
          <p className="mb-0 text-muted small">&copy; 2024-2025 SellerSprite. Global Data Intelligence for Amazon Sellers.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
