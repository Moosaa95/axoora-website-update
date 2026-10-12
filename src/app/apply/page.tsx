import type { Metadata } from 'next';
import { ApplyClient } from './ApplyClient';
import { SITE_NAME, SITE_URL, getBreadcrumbSchema } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'Apply for Axoora | Open an Account, POS Terminal or Partnership',
  description:
    'Start your application with Axoora. Apply for a personal account, high-yield business corporate treasury, smart 4G POS terminal, or aggregator partnership.',
  alternates: {
    canonical: `${SITE_URL}/apply`,
  },
  openGraph: {
    title: 'Apply for Axoora | Modern Banking & Merchant Terminals',
    description:
      'Start your application with Axoora. Apply for a personal account, business banking, 4G POS terminal, or aggregator partnership.',
    url: `${SITE_URL}/apply`,
    siteName: SITE_NAME,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apply for Axoora',
    description:
      'Apply online in minutes for Axoora accounts, POS terminals, and partnership networks.',
  },
};

export default function ApplyPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Apply', url: '/apply' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ApplyClient />
    </>
  );
}
