import type { Metadata } from 'next';
import LegalClient from './LegalClient';
import { SITE_URL, getBreadcrumbSchema } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'Legal, Terms of Service & Privacy Policy — NDPR Certified',
  description:
    'Legal framework, account terms of use, cardholder agreements, privacy policy, and Nigeria Data Protection Regulation (NDPR) certification details for Axoora customers and merchants.',
  keywords: [
    'Axoora terms of service',
    'Axoora privacy policy',
    'NDPR compliant fintech',
    'cardholder terms Nigeria',
    'deposit insurance legal terms',
  ],
  alternates: {
    canonical: `${SITE_URL}/legal`,
  },
  openGraph: {
    title: 'Legal Terms, Privacy Policy & NDPR Compliance — Axoora',
    description:
      'Consumer rights, data privacy guarantees, and regulatory agreements for Axoora account holders.',
    url: `${SITE_URL}/legal`,
  },
  twitter: {
    title: 'Axoora Legal & Privacy Policy',
    description:
      'Clear, honest, and NDPR certified legal policies for consumers and business owners.',
  },
};

export default function LegalPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Legal & Privacy Policy', url: '/legal' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <LegalClient />
    </>
  );
}
