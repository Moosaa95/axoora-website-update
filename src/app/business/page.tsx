import type { Metadata } from 'next';
import BusinessClient from './BusinessClient';
import { SITE_URL, getBreadcrumbSchema } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'Axoora Business — Dedicated Shop NUBAN, Sub-2s Settlement & Expense Cards',
  description:
    'Dedicated commercial NUBAN for your shop. Instant POS settlement directly to your balance, multi-user staff expense cards, automated invoice reconciliations, Moniebook stock inventory, and halal inventory loans.',
  keywords: [
    'business bank account Nigeria',
    'shop NUBAN account',
    'POS settlement Nigeria',
    'staff expense cards',
    'SME retail banking Nigeria',
    'halal working capital loans',
    'moniebook inventory POS',
    'Axoora Business',
  ],
  alternates: {
    canonical: `${SITE_URL}/business`,
  },
  openGraph: {
    title: 'Axoora Business — Power Your Shop with Dedicated NUBAN & Sub-2s Settlement',
    description:
      'Commercial banking engineered for Nigerian merchants: instant settlements, multi-card controls, and halal business loans.',
    url: `${SITE_URL}/business`,
  },
  twitter: {
    title: 'Axoora Business — Free Commercial Accounts for Retailers',
    description:
      'Dedicated NUBANs, sub-2s settlement, expense cards, and stock financing built for Nigerian enterprise.',
  },
};

export default function BusinessPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Business Banking', url: '/business' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BusinessClient />
    </>
  );
}
