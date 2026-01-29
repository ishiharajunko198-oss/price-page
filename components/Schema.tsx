
import React from 'react';
import { FAQS } from '../constants';

const Schema: React.FC = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "セラースプライト (SellerSprite)",
    "description": "Amazon出品者向けデータ分析・リサーチツール",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "JPY",
      "offerCount": "5",
      "lowPrice": "0",
      "highPrice": "339998"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "ホーム",
        "item": "https://sellersprite.com/jp/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "料金プラン",
        "item": "https://sellersprite.com/jp/price"
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(productSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </>
  );
};

export default Schema;
