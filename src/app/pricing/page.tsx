import type { Metadata } from 'next';
import PricingClient from './PricingClient';
import { SITE_URL, getBreadcrumbSchema } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'Pricing — What a Run Costs · Axoora Business',
  description:
    'Bulk transfers are priced per recipient, not per batch. The structure is set. Transparent bulk clearing with no charges you cannot see.',
  keywords: [
    'Axoora pricing',
    'bulk transfer pricing Nigeria',
    'payroll cost per recipient',
    'commercial batch pricing',
    'business transfer charges',
  ],
  alternates: {
    canonical: `${SITE_URL}/pricing`,
  },
  openGraph: {
    title: 'Axoora Business Pricing — What a Run Costs',
    description:
      'Bulk transfers are priced per recipient, not per batch. Transparent commercial clearing.',
    url: `${SITE_URL}/pricing`,
  },
  twitter: {
    title: 'Axoora Business Pricing — What a Run Costs',
    description: 'Bulk transfers are priced per recipient, not per batch.',
  },
};

export default function PricingPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Business', url: '/business' },
    { name: 'Pricing', url: '/pricing' },
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
