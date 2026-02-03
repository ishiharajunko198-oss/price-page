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
          <div className="price-main-wrapper" style={{ 
            color: '#000', 
            display: 'flex', 
            alignItems: 'baseline', 
            justifyContent: 'center', 
            whiteSpace: 'nowrap',
            flexWrap: 'nowrap'
          }}>
            {!isFree ? (
              <>
                {discountRate > 0 ? (
                  <>
                    <span className="price-strikethrough" style={{ fontSize: '0.95rem', marginRight: '6px', color: '#999', textDecoration: 'line-through' }}>
                      ¥{plan.price.toLocaleString()}
                    </span>
                    <span className="price-main" style={{ fontSize: '2.6rem', color: 'var(--ss-orange)', lineHeight: 1.1 }}>
                      {currentPrice.toLocaleString()}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="small" style={{ fontSize: '1.1rem', fontWeight: 700, marginRight: '1px' }}>¥</span>
                    <span className="price-main" style={{ fontSize: '2.6rem', color: '#000', lineHeight: 1.1 }}>
                      {plan.price.toLocaleString()}
                    </span>
                  </>
                )}
                
                {/* Only show unit if discount code is NOT applied */}
                {discountRate === 0 && (
                  <span className="small" style={{ fontSize: '0.95rem', color: '#000', marginLeft: '2px', fontWeight: 500 }}>
                    /{isYearly ? '年' : '月'}
                  </span>
                )}
                
                {/* Discount percentage badge removed as per request when discount is applied */}
              </>
            ) : (
              <span className="price-main" style={{ fontSize: '1.5rem', color: '#000' }}>無料</span>
            )}
          </div>

          <div style={{ height: '20px' }}>
            {!isFree && plan.originalPrice && (
              <span className="price-original" style={{ color: '#999' }}>定価：¥{plan.originalPrice.toLocaleString()}</span>
            )}
          </div>

          <div className="mt-2" style={{ height: '24px' }}>
            {!isFree && isYearly && (
              <div className="fw-bold" style={{ fontSize: '0.85rem', color: '#000' }}>
                実質 <span style={{ color: 'var(--ss-orange)' }}>¥{monthlyEquivalent.toLocaleString()}</span>/月
              </div>
            )}
          </div>
        </div>

        <ul className="metric-list mt-auto" style={{ fontSize: '0.82rem' }}>
          <li>
            <span className="metric-label">アカウント数</span>
            <span className="metric-value">{plan.features.accountCount}</span>
          </li>
          <li className="align-items-start">
            <div className="d-flex flex-column align-items-start" style={{ lineHeight: 1.2 }}>
              <span className="metric-label">エクスポート回数</span>
              <span style={{ 
                fontSize: '0.65rem', 
                color: '#888', 
                fontWeight: 500, 
                marginTop: '1px',
                visibility: isFree ? 'hidden' : 'visible' 
              }}>
                1日50回/アカウント
              </span>
            </div>
            <span className="metric-value">{plan.features.exportLimit}</span>
          </li>
          <li>
            <span className="metric-label">商品モニタリング</span>
            <span className="metric-value">{plan.features.productMonitor}</span>
          </li>
          <li>
            <span className="metric-label">キーワードモニタリング</span>
            <span className="metric-value">{plan.features.keywordMonitor}</span>
          </li>
          <li>
            <span className="metric-label">店舗モニタリング</span>
            <span className="metric-value">{plan.features.storeMonitor}</span>
          </li>
          <li>
            <span className="metric-label">ブラウザー拡張機能</span>
            <span className="metric-value" style={{ color: '#28a745', fontSize: '1.1rem' }}>{plan.features.browserExt}</span>
          </li>
        </ul>

        <div className="d-grid mt-3 pt-2">
          {isFree ? (
            <div 
              className="text-center py-2" 
              style={{ fontSize: '0.8rem', color: '#1b75bb', fontWeight: '700', lineHeight: '1.5' }}
            >
              無料会員は検索无制限／<br/>一部数据閲覧制限あり
            </div>
          ) : (
            <button className="btn btn-payment btn-subscription shadow-sm">サブスクリプション</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingCard;