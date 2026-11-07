import type { Metadata } from 'next';
import AboutClient from './AboutClient';
import { SITE_URL, getBreadcrumbSchema } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'About Axoora — Sovereign Fintech Infrastructure & Abuja Headquarters',
  description:
    'Discover Axoora: our founding thesis, executive leadership, and headquarters at Cappador Mall, Maitama, Abuja. Licensed by the Central Bank of Nigeria (CBN) and insured by the NDIC.',
  keywords: [
    'About Axoora',
    'Axoora leadership',
    'fintech headquarters Abuja',
    'Cappador Mall Maitama',
    'CBN licensed fintech Nigeria',
    'Axoora founders',
    'Nigerian microfinance bank',
  ],
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: 'About Axoora — Sovereign Fintech & Leadership Team',
    description:
      'Learn about Axoora, our thesis, engineering leadership, and Maitama Abuja headquarters.',
    url: `${SITE_URL}/about`,
  },
  twitter: {
    title: 'About Axoora — Sovereign Fintech Infrastructure',
    description:
      'Executive leadership, values, and headquarters in Maitama, Abuja. Licensed by the CBN.',
  },
};

export default function AboutPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'About Us', url: '/about' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutClient />
    </>
  );
}
