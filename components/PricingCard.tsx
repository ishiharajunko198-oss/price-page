import React from 'react';
import { PricingPlan, BillingCycle } from '../types';

interface PricingCardProps {
  plan: PricingPlan;
  isFirst?: boolean;
  isLast?: boolean;
  isRecommended?: boolean;
  discountRate?: number; // 0 to 1
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, isFirst, isLast, isRecommended, discountRate = 0 }) => {
  const isYearly = plan.billingCycle === BillingCycle.YEARLY;
  const isFree = plan.id === 'free';
  
  // Dynamic calculation for prices
  const currentPrice = isFree ? 0 : Math.floor(plan.price * (1 - discountRate));
  const monthlyEquivalent = isYearly ? Math.floor(currentPrice / 12) : currentPrice;
  
  const recommended = isRecommended || plan.isRecommended;

  const getCardClass = () => {
    let cls = 'pricing-card';
    if (recommended) cls += ' card-recommended';
    else if (isFree) cls += ' card-free';
    else if (isYearly) cls += ' card-yearly';
    else cls += ' card-monthly';
    
    if (isFirst && !recommended) cls += ' pricing-card-first';
    if (isLast && !recommended) cls += ' pricing-card-last';
    return cls;
  };

  return (
    <div className={getCardClass()}>
      {recommended && (
        <div className="badge-recommended">
          <span>おす</span>
          <span>すめ</span>
        </div>
      )}
      
      <div className="card-body p-3 d-flex flex-column" style={{ color: '#000' }}>
        <div className="text-center mt-2 mb-1">
          <h3 className="fw-bold m-0" style={{ fontSize: '1.2rem', color: '#000' }}>
            {plan.name}
          </h3>
        </div>

        <div className="text-center mb-3">
          <p className="m-0 px-2" style={{ color: '#777', fontSize: '0.8rem', fontWeight: 500, lineHeight: 1.4 }}>
            {plan.targetAudience}
          </p>
        </div>

        <div className="text-center mb-2">
          <div className="price-main-wrapper" style={{ color: '#000' }}>
            {!isFree && <span className="small align-top" style={{ fontSize: '1.2rem', fontWeight: 700 }}>¥</span>}
            
            {discountRate > 0 && !isFree && (
              <span className="price-strikethrough" style={{ fontSize: '1rem' }}>{plan.price.toLocaleString()}</span>
            )}

            <span className="price-main" style={{ fontSize: isFree ? '1.8rem' : '3.2rem', color: discountRate > 0 ? 'var(--ss-orange)' : '#000', lineHeight: 1.1 }}>
              {isFree ? '無料' : currentPrice.toLocaleString()}
            </span>
            
            {!isFree && <span className="small" style={{ fontSize: '1rem', color: '#000', marginLeft: '2px' }}>/{isYearly ? '年' : '月'}</span>}
            
            {discountRate > 0 && !isFree && (
              <span className="discount-applied-badge">-{Math.round(discountRate * 100)}%</span>
            )}
          </div>

          <div style={{ height: '20px' }}>
            {!isFree && plan.originalPrice && (
              <span className="price-original" style={{ color: '#999' }}>定価：¥{plan.originalPrice.toLocaleString()}</span>
            )}
          </div>

          <div className="mt-2" style={{ height: '24px' }}>
            {/* Only yearly plans show effective monthly price */}
            {!isFree && isYearly && (
              <div className="fw-bold" style={{ fontSize: '0.85rem', color: '#000' }}>
                実質 <span style={{ color: 'var(--ss-orange)' }}>¥{monthlyEquivalent.toLocaleString()}</span>/月
              </div>
            )}
          </div>
        </div>

        <ul className="metric-list mt-auto" style={{ fontSize: '0.85rem' }}>
          <li>
            <span className="metric-label" style={{ color: '#000' }}>アカウント数</span>
            <span className="metric-value" style={{ color: '#000', fontSize: '1rem', fontWeight: 800 }}>{plan.features.teamSize}</span>
          </li>
          <li>
            <span className="metric-label" style={{ color: '#000' }}>エクスポート回数</span>
            <span className="metric-value" style={{ color: '#000', fontSize: '1rem', fontWeight: 800 }}>{plan.features.quota}</span>
          </li>
          <li>
            <span className="metric-label" style={{ color: '#000' }}>数据出力</span>
            <span className="metric-value" style={{ color: '#000', fontSize: '1rem', fontWeight: 800 }}>{plan.features.exports}</span>
          </li>
          <li>
            <span className="metric-label" style={{ color: '#000' }}>サポート体制</span>
            <span className="metric-value" style={{ color: '#000', fontSize: '0.85rem' }}>{plan.features.support}</span>
          </li>
        </ul>

        <div className="d-grid mt-3 pt-2">
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