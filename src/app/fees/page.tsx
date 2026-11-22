import type { Metadata } from 'next';
import FeesClient from './FeesClient';
import { SITE_URL, getBreadcrumbSchema } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'What It Costs — Transparent Everyday Fees | Axoora',
  description:
    'One table, in plain words. No hidden deductions, no surprise maintenance fees. You see any fee on the confirm screen before you agree to it.',
  keywords: [
    'Axoora fees',
    'zero hidden fees banking',
    'transparent bank charges Nigeria',
    'dollar card fees',
    'free transfer bank Nigeria',
    'Axoora pricing',
  ],
  alternates: {
    canonical: `${SITE_URL}/fees`,
  },
  openGraph: {
    title: 'What It Costs — Transparent Everyday Fees | Axoora',
    description:
      'One table, in plain words. You see any fee on the confirm screen before you agree to it.',
    url: `${SITE_URL}/fees`,
  },
  twitter: {
    title: 'What It Costs — Axoora Everyday Fees',
    description: 'Every fee on the screen, before you agree.',
  },
};

export default function FeesPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Fees & Pricing', url: '/fees' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <FeesClient />
    </>
  );
}

