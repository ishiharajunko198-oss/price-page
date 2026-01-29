
import { PricingPlan, BillingCycle, FAQItem } from './types';

export const MONTHLY_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: '無料プラン',
    targetAudience: '初心者・ツールを試したい方',
    price: 0,
    billingCycle: BillingCycle.MONTHLY,
    features: {
      teamSize: '1名',
      quota: '1,000回/月',
      exports: '不可',
      countries: '日本のみ',
      support: 'コミュニティのみ'
    },
    details: [
      '基本的な市場リサーチ機能',
      '商品モニタリング (最大5件)',
      'キーワードマイニング制限あり',
      'ブラウザ拡張機能の利用'
    ]
  },
  {
    id: 'std_m',
    name: 'スタンダード会員',
    targetAudience: '本格的にAmazon販売を始める方',
    price: 13998,
    billingCycle: BillingCycle.MONTHLY,
    features: {
      teamSize: '3名',
      quota: '无制限',
      exports: '100回/月',
      countries: '全13カ国',
      support: '標準サポート'
    },
    details: [
      'キーワードリサーチ全機能',
      'ライバル商品分析',
      '広告分析機能',
      'ランキング追跡 (最大500件)'
    ]
  }
];

export const YEARLY_PLANS: PricingPlan[] = [
  {
    id: 'std_y',
    name: 'スタンダード会員',
    targetAudience: '効率的に運営を続けたい方',
    price: 139998,
    originalPrice: 168000,
    billingCycle: BillingCycle.YEARLY,
    isRecommended: false,
    features: {
      teamSize: '3名',
      quota: '无制限',
      exports: '150回/月',
      countries: '全13カ国',
      support: '標準サポート'
    },
    details: [
      'キーワード逆引きリサーチ',
      '商品リサーチ无制限',
      'キーワード順位チェッカー',
      '市場モニタリング'
    ]
  },
  {
    id: 'adv_y',
    name: 'アドバンス会員',
    targetAudience: '複数アカウント・チーム運営の方',
    price: 269831,
    originalPrice: 323810,
    billingCycle: BillingCycle.YEARLY,
    features: {
      teamSize: '10名',
      quota: '无制限',
      exports: '500回/月',
      countries: '全13カ国',
      support: '優先サポート'
    },
    details: [
      'サブアカウント一括管理',
      'API連携サポート',
      '高度な競合分析',
      'バルクデータエクスポート'
    ]
  },
  {
    id: 'vip_y',
    name: 'VIP会員',
    targetAudience: '大規模法人・コンサルティング業',
    price: 339998,
    originalPrice: 408013,
    billingCycle: BillingCycle.YEARLY,
    features: {
      teamSize: '无制限',
      quota: '无制限',
      exports: '无制限',
      countries: '全13カ国',
      support: '専任担当者'
    },
    details: [
      '全機能の无制限利用',
      '個別コンサルティング1回/月',
      '最新ベータ版への早期アクセス',
      'カスタマイズレポート作成'
    ]
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "支払い方法は何がありますか？",
    answer: "Stripe、PayPal、各種クレジットカード（Visa, Master, JCB）に対応しております。法人様向けの請求書払いについても別途ご相談いただけます。"
  },
  {
    question: "プランの変更や解約はいつでもできますか？",
    answer: "はい、マイページからいつでもプラン変更や解約が可能です。解約後も現在の契約期間終了までは全ての機能をご利用いただけます。"
  },
  {
    question: "無料プランから有料プランへの移行はどうすればいいですか？",
    answer: "マイページの料金プラン選択画面から、ご希望のプランの決済ボタンをクリックしていただくだけで、即座に機能がアップグレードされます。"
  },
  {
    question: "複数人で同じアカウントを使えますか？",
    answer: "プランごとに設定された「チーム协作支持人数」の範囲内であれば、サブアカウントを発行して安全に共有いただけます。"
  }
];
