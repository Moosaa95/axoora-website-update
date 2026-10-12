import type { Metadata } from 'next';
import HelpClient from './HelpClient';
import { SITE_URL, getBreadcrumbSchema, getFaqSchema } from '../../lib/seo';
import { FAQ_LIST } from '../../data/mockData';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions & Help Desk — Axoora Support',
  description:
    'Instant answers regarding Axoora personal accounts, zero transfer fees, virtual dollar & naira debit cards, halal Save & Earn vaults, shop NUBANs, and dual-eSIM Apex POS terminals. 24/7 WhatsApp resolution desk.',
  keywords: [
    'Axoora FAQ',
    'Axoora customer care number',
    'Axoora WhatsApp support',
    'freeze Axoora card',
    'virtual dollar card declined Nigeria',
    'POS terminal dispute resolution',
    'NDIC insurance status Axoora',
    'Abuja customer desk',
  ],
  alternates: {
    canonical: `${SITE_URL}/help`,
  },
  openGraph: {
    title: 'Axoora Help & Resolution Desk — Everything You Need to Know',
    description:
      'Answers to common questions about accounts, dual-currency cards, Islamic savings, shop accounts, and POS hardware.',
    url: `${SITE_URL}/help`,
  },
  twitter: {
    title: 'Axoora FAQ & Help Desk',
    description:
      '24/7 named care and instant dispute resolution for personal accounts, cards, and merchant POS terminals.',
  },
};

export default function HelpPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Help & Resolution Desk', url: '/help' },
  ]);

  const faqSchema = getFaqSchema(
    FAQ_LIST.map((f) => ({
      question: f.question,
      answer: f.answer,
    }))
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HelpClient />
    </>
  );
}
