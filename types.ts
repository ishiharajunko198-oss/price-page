
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
    teamSize: string;
    quota: string;
    exports: string;
    countries: string;
    support: string;
  };
  details: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}
