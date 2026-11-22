import type { Metadata } from 'next';
import PricingClient from './PricingClient';
import { SITE_URL, getBreadcrumbSchema } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'Pricing & Bulk Payouts — Axoora Business',
  description:
    'Two ways in, one run out. Type rows yourself or upload a CSV. Transparent bulk payment clearing and pricing for Nigerian businesses.',
  keywords: [
    'Axoora business pricing',
    'bulk payouts Nigeria',
    'payroll CSV upload',
    'commercial banking fees Nigeria',
    'business transfer rates',
  ],
  alternates: {
    canonical: `${SITE_URL}/pricing`,
  },
  openGraph: {
    title: 'Axoora Business Pricing & Payouts',
    description:
      'Two ways in, one run out. Type rows yourself or bring a CSV. Transparent batch clearing.',
    url: `${SITE_URL}/pricing`,
  },
  twitter: {
    title: 'Axoora Business Pricing & Payouts',
    description: 'Two ways in, one run out. Batch clearing and pricing.',
  },
};

export default function PricingPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Pricing & Payouts', url: '/pricing' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PricingClient />
    </>
  );
}
