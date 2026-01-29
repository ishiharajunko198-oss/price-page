
import React from 'react';
import { PricingPlan } from '../types';

interface ComparisonTableProps {
  plans: PricingPlan[];
  freePlan: PricingPlan;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ plans, freePlan }) => {
  const allPlans = [freePlan, ...plans];

  const features = [
    { name: 'キーワードマイニング 🔥', values: ['制限あり', '✓', '✓', '✓', '✓'] },
    { name: 'キーワード逆引き', values: ['✕', '✓', '✓', '✓', '✓'] },
    { name: 'インデックスチェッカー', values: ['✕', '✓', '✓', '✓', '✓'] },
    { name: 'ライバル商品分析', values: ['✕', '✓', '✓', '✓', '✓'] },
    { name: '市場モニタリング', values: ['✕', '✓', '✓', '✓', '✓'] },
    { name: '商品リサーチ機能', values: ['✓', '✓', '✓', '✓', '✓'] },
    { name: '広告分析機能', values: ['✕', '✓', '✓', '✓', '✓'] },
    { name: 'ブラウザ拡張機能', values: ['✓', '✓', '✓', '✓', '✓'] },
    { name: '対象国サポート', values: ['日本のみ', '全13カ国', '全13カ国', '全13カ国', '全13カ国'] },
    { name: 'API連携サポート', values: ['✕', '✕', '✕', '✓', '✓'] },
    { name: 'カスタマイズレポート', values: ['✕', '✕', '✕', '✕', '✓'] },
    { name: 'サポート体制', values: ['コミュニティ', '標準', '標準', '優先', '専任担当'] },
  ];

  return (
    <div className="comparison-table-wrapper">
      <table className="comparison-table">
        <tbody>
          {features.map((f, fIdx) => (
            <tr key={fIdx}>
              <td className="row-header">{f.name}</td>
              {allPlans.map((plan, pIdx) => {
                const val = f.values[pIdx];
                return (
                  <td key={pIdx} className={plan.isRecommended ? 'highlight-col' : ''}>
                    {val === '✓' ? (
                      <span className="check-icon">✓</span>
                    ) : val === '✕' ? (
                      <span className="cross-icon">✕</span>
                    ) : (
                      val
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;
