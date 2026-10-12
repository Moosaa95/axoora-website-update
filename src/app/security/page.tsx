import type { Metadata } from 'next';
import SecurityClient from './SecurityClient';
import { SITE_URL, getBreadcrumbSchema } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'Security, Encryption & NDIC Deposit Insurance — Axoora',
  description:
    'Institutional security standards: 256-bit AES encryption, multi-factor biometric liveness verification, automated transaction anomaly detection, and NDIC deposit insurance coverage. We will never ask for your PIN or OTP.',
  keywords: [
    'Axoora security architecture',
    'NDIC insured bank deposits',
    'freeze card instant Nigeria',
    'anti-fraud fintech Nigeria',
    'biometric facial liveness BVN',
    'secure banking WhatsApp',
    'ISO 27001 fintech compliance',
  ],
  alternates: {
    canonical: `${SITE_URL}/security`,
  },
  openGraph: {
    title: 'Axoora Security & Fraud Defense Architecture',
    description:
      'Bank-grade encryption, NDIC deposit protection, biometric liveness, and 24/7 security response.',
    url: `${SITE_URL}/security`,
  },
  twitter: {
    title: 'Axoora Security & Insurance',
    description:
      'We lock the door on money and data. NDIC insured deposits and instant card freezing.',
  },
};

export default function SecurityPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Security & Compliance', url: '/security' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <SecurityClient />
    </>
  );
}
