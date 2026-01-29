
import React from 'react';
import { PricingPlan, BillingCycle } from '../types';

interface PricingCardProps {
  plan: PricingPlan;
  isFirst?: boolean;
  isLast?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, isFirst, isLast }) => {
  const isYearly = plan.billingCycle === BillingCycle.YEARLY;
  const isFree = plan.id === 'free';
  const monthlyEquivalent = isYearly ? Math.floor(plan.price / 12) : plan.price;

  const getCardClass = () => {
    let cls = 'pricing-card';
    if (plan.isRecommended) cls += ' card-recommended';
    else if (isFree) cls += ' card-free';
    else if (isYearly) cls += ' card-yearly';
    else cls += ' card-monthly';
    
    if (isFirst && !plan.isRecommended) cls += ' pricing-card-first';
    if (isLast && !plan.isRecommended) cls += ' pricing-card-last';
    return cls;
  };

  return (
    <div className={getCardClass()}>
      {plan.isRecommended && <div className="badge-recommended">おすすめ</div>}
      
      <div className="card-body p-3 d-flex flex-column">
        <div className="text-center mb-2">
          <h3 className="mb-1 fw-bold mt-2" style={{ fontSize: isFree ? '0.9rem' : '1.1rem' }}>
            {plan.name}
          </h3>
          
          <div className="price-container mb-1" style={{ minHeight: '65px' }}>
            {!isFree && plan.originalPrice && (
              <span className="price-original">¥{plan.originalPrice.toLocaleString()}</span>
            )}
            {!isFree && <span className="small align-top" style={{ fontSize: '0.75rem' }}>¥</span>}
            <span className="price-main" style={{ fontSize: isFree ? '1.2rem' : '1.6rem', color: isFree ? 'var(--ss-blue)' : 'inherit' }}>
              {isFree ? '無料' : plan.price.toLocaleString()}
            </span>
            {!isFree && <span className="text-muted small" style={{ fontSize: '0.75rem' }}>/{isYearly ? '年' : '月'}</span>}
          </div>

          {/* Embedded Target Audience Card */}
          <div className="audience-embedded-card">
            {plan.targetAudience}
          </div>

          <div style={{ minHeight: '20px' }}>
            {isYearly && plan.originalPrice && (
              <div className="price-save text-danger fw-bold" style={{ fontSize: '0.8rem' }}>
                実質 ¥{monthlyEquivalent.toLocaleString()}/月
              </div>
            )}
          </div>
        </div>

        {/* Differentiating Metrics */}
        <ul className="metric-list">
          <li>
            <span className="metric-label">チーム人数</span>
            <span className="metric-value">{plan.features.teamSize}</span>
          </li>
          <li>
            <span className="metric-label">データ額度</span>
            <span className="metric-value">{plan.features.quota}</span>
          </li>
          <li>
            <span className="metric-label">データ輸出</span>
            <span className="metric-value">{plan.features.exports}</span>
          </li>
        </ul>

        <div className="d-grid mt-auto pt-2">
          {isFree ? (
            <button className="btn btn-payment btn-free">無料で体験</button>
          ) : (
            <button className="btn btn-payment btn-subscription shadow-sm">今すぐ購入</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
