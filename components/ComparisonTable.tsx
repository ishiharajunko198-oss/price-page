
import React from 'react';
import { PricingPlan } from '../types';

interface ComparisonTableProps {
  plans: PricingPlan[];
  freePlan: PricingPlan;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ plans, freePlan }) => {
  const allPlans = [freePlan, ...plans];
  
  // 指定要显示的套餐名称
  const displayNames = [
    '無料プラン',
    'スタンダード会員（月間）',
    'スタンダード会員（年間）',
    'アドバンス会員（年間）',
    'VIP会員（年間）'
  ];

  const aiFeatures = [
    { name: 'AI-ライバル商品リサーチ', values: ['10回', '100回', '100回', '100回', '100回'] },
    { name: 'AI-市場インサイト', values: ['10回', '100回', '100回', '100回', '100回'] },
    { name: 'AI-keepa分析', values: ['10回', '100回', '100回', '100回', '100回'] },
    { name: 'AIレビュー分析', values: ['利用不可', '100回', '100回', '100回', '100回'] },
  ];

  const mainFeatures = [
    { name: 'キーワードマイニング', values: ['上位20つ(拡張機能:上位10つ)', '無制限', '無制限', '無制限', '無制限', '無制限'], isHot: true },
    { name: 'キーワードリサーチ', values: ['上位20つ', '無制限', '無制限', '無制限', '無制限'] },
    { name: 'キーワード逆引きリサーチ', values: ['上位20つ', '無制限', '無制限', '無制限', '無制限'], isHot: true },
    { name: 'ライバル商品リサーチ', values: ['上位20つ表示(ASIN検索:1日2回のみ)', '無制限', '無制限', '無制限', '無制限'], isHot: true },
    { name: 'トラフィック源リサーチ', values: ['上位20つ', '無制限', '無制限', '无制限', '无制限'] },
    { name: '注文ワード逆引きリサーチ', values: ['上位5つ', '無制限', '無制限', '無制限', '無制限'] },
    { name: '広告インサイト', values: ['上位5つ', '無制限', '無制限', '無制限', '無制限'] },
    { name: '関連トラフィック', values: ['上位20つ', '無制限', '無制限', '無制限', '無制限'] },
    { name: '商品リサーチ', values: ['上位20つ表示', '無制限', '无制限', '无制限', '无制限'], isHot: true },
    { name: '市場リサーチ', values: ['上位30つ表示', '无制限', '无制限', '无制限', '无制限'], isHot: true },
    { name: 'キーワードシソーラス', values: ['10件のみ', '无制限', '无制限', '无制限', '无制限'] },
    { name: '商品ライブラリー', values: ['10件のみ', '无制限', '无制限', '无制限', '无制限'] },
    { name: '商標ライブラリー', values: ['10件のみ', '无制限', '无制限', '无制限', '无制限'] },
    { 
      name: '意匠権検索', 
      values: ['0回(別に購入)', '5回(別に購入)', '80回(別に購入)', '150回(別に購入)', '200回(別に購入)'], 
      isPurchaseLink: true,
      hasCustomTooltip: true,
      tooltipText: '無料枠 (画像検索・簡易検索共用)'
    },
    { 
      name: '対象国サポート', 
      values: Array(5).fill('10ヵ国以上'),
      hasTooltip: true 
    },
  ];

  const freeTools = [
    { name: 'Keepa拡張機能代替', values: Array(5).fill('✓ 拡張機能でご利用') },
    { name: '順位チェッカー', values: Array(5).fill('✓ 拡張機能でご利用') },
    { name: '販売数予測', values: Array(5).fill('✓') },
    { name: '利益販売計算機', values: Array(5).fill('✓') },
    { name: 'Listingエディター', values: Array(5).fill('✓') },
    { name: 'Googleトレンド', values: Array(5).fill('✓') },
  ];

  const renderCellContent = (val: string, isPurchaseLink?: boolean) => {
    if (val === '✓' || val.startsWith('✓')) {
      const hasSubtext = val.length > 1;
      const subtext = hasSubtext ? val.replace('✓', '').trim() : '';
      
      return (
        <div className="d-flex flex-column align-items-center justify-content-center">
          <span className="check-icon" style={{ color: '#28a745', fontWeight: 'bold', fontSize: '1.2rem' }}>✓</span>
          {hasSubtext && (
            <span style={{ fontSize: '0.65rem', color: '#666', marginTop: '2px', display: 'block', lineHeight: 1.2 }}>
              {subtext}
            </span>
          )}
        </div>
      );
    }
    if (val === '✕' || val === '利用不可') {
      return <span className="cross-icon" style={{ color: '#dc3545', fontWeight: 'bold', fontSize: '1.1rem' }}>✕</span>;
    }
    if (val === '無制限') {
      return <span style={{ fontWeight: '800', color: '#1b75bb' }}>無制限</span>;
    }
    if (isPurchaseLink && val.includes('別に購入')) {
      const count = val.split('(')[0];
      return (
        <span style={{ fontWeight: '500', fontSize: '0.8rem' }}>
          {count}(
          <span className="tooltip-trigger">
            <a 
              href="https://www.sellersprite.com/appearance-patent-purchase" 
              target="_blank" 
              rel="noopener noreferrer"
              className="purchase-link"
            >
              別に購入
            </a>
            <span className="tooltip-bubble" style={{ bottom: '150%', left: '-80px' }}>
              クリックして、「意匠権」購入ページへ
            </span>
          </span>
          )
        </span>
      );
    }
    return <span style={{ fontWeight: '500', fontSize: '0.8rem' }}>{val}</span>;
  };

  const SectionHeader = ({ title }: { title: string }) => (
    <tr>
      <td colSpan={6} style={{ 
        backgroundColor: '#f8f9fa', 
        textAlign: 'center', 
        fontWeight: '700', 
        padding: '16px',
        fontSize: '1rem',
        color: '#333',
        borderTop: '1px solid var(--table-border)',
        borderBottom: '1px solid var(--table-border)'
      }}>
        {title}
      </td>
    </tr>
  );

  return (
    <div className="comparison-table-wrapper custom-scrollbar">
      <style>{`
        .comparison-table-wrapper {
          max-height: 700px;
          overflow-y: auto;  /* 开启纵向滚动 */
          overflow-x: hidden; /* 取消横向滑动条 */
          background: white;
          border: 1px solid #eee;
          border-radius: 0 0 16px 16px;
          box-shadow: var(--ss-card-shadow);
          position: relative;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #999;
        }

        .comparison-table {
          width: 100%;
          table-layout: fixed;
          border-collapse: separate;
          border-spacing: 0;
        }
        
        .comparison-table thead th {
          position: sticky;
          top: 0;
          background-color: #fff;
          z-index: 100;
          padding: 18px 10px;
          border-bottom: 2px solid var(--ss-blue);
          font-weight: 700;
          color: #333;
          font-size: 0.85rem;
          text-align: center; /* 套餐名居中展示 */
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .comparison-table thead th.recommended-th {
          background-color: #fffdfa;
          color: var(--ss-orange);
          border-bottom: 2px solid var(--ss-orange);
        }

        .comparison-table thead th.row-header-sticky {
          width: 200px;
          background-color: #eff6fb;
          text-align: left; /* 功能比较标题保持靠左 */
          padding-left: 20px;
          border-right: 1px solid var(--table-border);
          left: 0;
          z-index: 101;
        }

        @media (max-width: 1400px) {
          .comparison-table thead th.row-header-sticky { width: 180px; }
        }

        .comparison-table td.row-header {
          position: sticky;
          left: 0;
          background: #eff6fb;
          z-index: 10;
          text-align: left;
          font-weight: 600;
          padding-left: 20px;
          color: #777;
          width: 200px;
          border-right: 1px solid var(--table-border);
        }

        @media (max-width: 1400px) {
          .comparison-table td.row-header { width: 180px; }
        }

        .tooltip-trigger {
          border-bottom: 1px dashed #777;
          cursor: help;
          position: relative;
          display: inline-block;
        }
        .tooltip-bubble {
          visibility: hidden;
          width: 240px;
          background-color: #333;
          color: #fff;
          text-align: left;
          border-radius: 6px;
          padding: 8px 12px;
          position: absolute;
          z-index: 2000;
          bottom: 125%;
          left: 0;
          opacity: 0;
          transition: opacity 0.3s;
          font-size: 0.75rem;
          font-weight: 400;
          line-height: 1.4;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          pointer-events: none;
        }
        .tooltip-trigger:hover .tooltip-bubble {
          visibility: visible;
          opacity: 1;
        }
        .hot-badge {
          display: inline-flex;
          align-items: center;
          margin-left: 6px;
          color: #ff4d4f;
          font-size: 0.9rem;
          vertical-align: middle;
        }
        .purchase-link {
          color: inherit;
          text-decoration: none;
          transition: color 0.2s;
        }
        .purchase-link:hover {
          color: #1b75bb;
        }
      `}</style>
      <table className="comparison-table">
        <thead>
          <tr>
            <th className="row-header-sticky">機能比較</th>
            {allPlans.map((plan, idx) => (
              <th key={idx} className={plan.isRecommended ? 'recommended-th' : ''}>
                {displayNames[idx]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* AI Features Section */}
          <SectionHeader title="AI機能 (1日あたりの回数)" />
          {aiFeatures.map((f, fIdx) => (
            <tr key={`ai-${fIdx}`}>
              <td className="row-header">{f.name}</td>
              {allPlans.map((plan, pIdx) => (
                <td key={pIdx} className={plan.isRecommended ? 'highlight-col' : ''}>
                  {renderCellContent(f.values[pIdx])}
                </td>
              ))}
            </tr>
          ))}

          {/* Main Features Section */}
          <SectionHeader title="基本機能・リサーチ限度額" />
          {mainFeatures.map((f, fIdx) => (
            <tr key={`main-${fIdx}`}>
              <td className="row-header">
                <div className="d-flex align-items-center">
                  {f.hasTooltip || f.hasCustomTooltip ? (
                    <span className="tooltip-trigger">
                      {f.name}
                      <span className="tooltip-bubble">
                        {f.hasCustomTooltip ? (
                          f.tooltipText
                        ) : (
                          <>
                            サポート可能なAmazonマーケット：<br/>
                            日本、アメリカ、イギリス、ドイツ、イタリア、フランス、スペイン、メキシコ、カナダ、インドなど。
                          </>
                        )}
                      </span>
                    </span>
                  ) : (
                    f.name
                  )}
                  {f.isHot && (
                    <span className="hot-badge" title="人気機能">
                      🔥
                    </span>
                  )}
                </div>
              </td>
              {allPlans.map((plan, pIdx) => (
                <td key={pIdx} className={plan.isRecommended ? 'highlight-col' : ''}>
                  {renderCellContent(f.values[pIdx], f.isPurchaseLink)}
                </td>
              ))}
            </tr>
          ))}

          {/* Free Tools Rows Section */}
          <SectionHeader title="無料ツール" />
          {freeTools.map((f, fIdx) => (
            <tr key={`free-${fIdx}`}>
              <td className="row-header">{f.name}</td>
              {allPlans.map((plan, pIdx) => (
                <td key={pIdx} className={plan.isRecommended ? 'highlight-col' : ''}>
                  {renderCellContent(f.values[pIdx])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;
