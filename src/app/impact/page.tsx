import type { Metadata } from 'next';
import ImpactClient from './ImpactClient';
import { SITE_URL, getBreadcrumbSchema } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'Economic Impact, Financial Inclusion & Street Commerce — Axoora',
  description:
    'Our social and economic impact across Nigeria: eliminating predatory bank fees for market traders, providing reliable 4G POS agency banking, and unlocking non-interest working capital for small retailers.',
  keywords: [
    'fintech impact Nigeria',
    'financial inclusion Africa',
    'support Nigerian market traders',
    'zero transfer fees economic impact',
    'SME enablement Nigeria',
  ],
  alternates: {
    canonical: `${SITE_URL}/impact`,
  },
  openGraph: {
    title: 'Axoora Economic Impact & Street Financial Inclusion',
    description:
      'Lifting trading friction for retail merchants, agency cashiers, and households across Nigeria.',
    url: `${SITE_URL}/impact`,
  },
  twitter: {
    title: 'Axoora Social & Economic Impact',
    description:
      'Real empowerment for street traders and shop owners through sustainable, interest-free rails.',
  },
};

export default function ImpactPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Social & Economic Impact', url: '/impact' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ImpactClient />
    </>
  );
}
