import type { Metadata } from 'next';
import PersonalClient from './PersonalClient';
import { SITE_URL, getBreadcrumbSchema } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'Axoora Personal — 0% Transfer Fees, Dual-Currency Cards & WhatsApp Banking',
  description:
    'Sovereign personal banking for Nigerian consumers. Zero transfer fees across all banks, instant virtual dollar & platinum naira cards that never decline, non-interest Save & Earn vaults, and banking directly inside WhatsApp.',
  keywords: [
    'virtual dollar card Nigeria',
    'zero transfer fees bank Nigeria',
    'WhatsApp banking bot',
    'dual currency debit card',
    'Axoora Personal',
    'halal savings account Nigeria',
    'Paycircle thrift ajo',
    'instant NIP transfers',
  ],
  alternates: {
    canonical: `${SITE_URL}/personal`,
  },
  openGraph: {
    title: 'Axoora Personal — 0% Transfer Fees & WhatsApp Banking',
    description:
      'Zero transfer fees, dual-currency virtual cards that never decline, and conversational banking in WhatsApp.',
    url: `${SITE_URL}/personal`,
  },
  twitter: {
    title: 'Axoora Personal — Banking, in a chat',
    description:
      'Zero transfer fees, dual-currency cards, and conversational WhatsApp banking built for Nigeria.',
  },
};

export default function PersonalPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Personal Banking', url: '/personal' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PersonalClient />
    </>
  );
}
