
import { PricingPlan, BillingCycle, FAQItem } from './types';

export const MONTHLY_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: '無料プラン',
    targetAudience: '初心者・ツールを試したい方',
    price: 0,
    billingCycle: BillingCycle.MONTHLY,
    features: {
      accountCount: '1名',
      exportLimit: '不可',
      productMonitor: '0件',
      keywordMonitor: '0件',
      storeMonitor: '0件',
      browserExt: '一部表示'
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
    targetAudience: 'スタンダードアップ',
    price: 13998,
    billingCycle: BillingCycle.MONTHLY,
    features: {
      accountCount: '1名',
      exportLimit: '50回/日',
      productMonitor: '100件',
      keywordMonitor: '500件',
      storeMonitor: '50件',
      browserExt: '全部表示'
    },
    details: [
      'キーワードリサーチ全機能',
      'ライバル商品分析',
      '广告分析機能',
      'ランキング追跡 (最大500件)'
    ]
  }
];

export const YEARLY_PLANS: PricingPlan[] = [
  {
    id: 'std_y',
    name: 'スタンダード会員',
    targetAudience: '个人・小規模事業者様向け',
    price: 139998,
    originalPrice: 168000,
    billingCycle: BillingCycle.YEARLY,
    isRecommended: false,
    features: {
      accountCount: '1主+3子',
      exportLimit: '200回/日',
      productMonitor: '100件',
      keywordMonitor: '500件',
      storeMonitor: '50件',
      browserExt: '全部表示'
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
    targetAudience: '成長中のビジネス事業者様向け',
    price: 269831,
    originalPrice: 323810,
    billingCycle: BillingCycle.YEARLY,
    features: {
      accountCount: '1主+6子',
      exportLimit: '350回/日',
      productMonitor: '300件',
      keywordMonitor: '1000件',
      storeMonitor: '100件',
      browserExt: '全部表示'
    },
    details: [
      'サブアカウント一括管理',
      'API連携サポート',
      '高度な竞合分析',
      'バルクデータエクスポート'
    ]
  },
  {
    id: 'vip_y',
    name: 'VIP会員',
    targetAudience: '大規模運用を行う事業者様向け',
    price: 339998,
    originalPrice: 408013,
    billingCycle: BillingCycle.YEARLY,
    features: {
      accountCount: '1主+9子',
      exportLimit: '500回/日',
      productMonitor: '500件',
      keywordMonitor: '2000件',
      storeMonitor: '200件',
      browserExt: '全部表示'
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
    answer: "Stripe、PayPal、各種クレジットカード（Visa, Master, JCB）に対応しております。法人様向けの請求书払いについても別途ご相談いただけます。"
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
    question: "サブアカウントの追加方法を教えてください。",
    answer: "マイページの「アカウント設定」或者「チーム管理」メニューから、新しいメンバーのメールアドレスを入力して招待を送ることができます。プランごとの上限人数まで追加可能です。"
  },
  {
    question: "1つのアカウントを複数のデバイスで同時に利用できますか？",
    answer: "技術的には可能ですが、セキュリティ保護と数据整合性の観点から、複数人での同時操作が必要な場合はサブアカウントの発行を強くお勧めしております。"
  },
  {
    question: "もしアカウントがロック（封鎖）された場合はどうすればいいですか？",
    answer: "不正アクセスの検知や利用規約違反の疑いにより自动ロックされる場合があります。その際は至急、登録メールアドレスをご確認いただくか、サポート（support@sellersprite.com）までご連絡ください。"
  },
  {
    question: "複数人で同じアカウントを使えますか？",
    answer: "プランごとに設定された「チーム协作支持人数」の范围内であれば、サブアカウントを発行して安全に共有いただけます。"
  }
];
