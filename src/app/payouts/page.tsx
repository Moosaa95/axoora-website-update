import type { Metadata } from 'next';
import PayoutsClient from './PayoutsClient';
import { SITE_URL, getBreadcrumbSchema } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'Bulk Payouts & Automated Payroll — Axoora Business',
  description:
    'Two ways in, one run out. Type the rows yourself or upload a CSV. Pre-validated row-by-row NIBSS batch transfers with instant receipts.',
  keywords: [
    'Axoora bulk payouts',
    'Nigeria business payroll',
    'instant salary disbursement Nigeria',
    'batch transfer CSV upload',
    'commercial account bulk clearing',
  ],
  alternates: {
    canonical: `${SITE_URL}/payouts`,
  },
  openGraph: {
    title: 'Axoora Business Bulk Payouts',
    description:
      'Two ways in, one run out. Names resolved against the receiving bank, invalid rows flagged individually.',
    url: `${SITE_URL}/payouts`,
  },
  twitter: {
    title: 'Axoora Business Bulk Payouts',
    description: 'Two ways in, one run out. Batch transfer engine.',
  },
};

export default function PayoutsPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Business', url: '/business' },
    { name: 'Bulk Payouts', url: '/payouts' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PayoutsClient />
    </>
  );
}
