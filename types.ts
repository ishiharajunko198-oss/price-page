
export enum BillingCycle {
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY'
}

export interface PricingPlan {
  id: string;
  name: string;
  targetAudience: string;
  price: number;
  originalPrice?: number;
  billingCycle: BillingCycle;
  isRecommended?: boolean;
  features: {
    accountCount: string;       // アカウント数
    exportLimit: string;        // エクスポート回数
    productMonitor: string;     // 商品モニタリング
    keywordMonitor: string;     // キーワードモニタリング
    storeMonitor: string;       // 店舗モニタリング
    browserExt: string;         // ブラウザー拡張機能
  };
  details: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}
