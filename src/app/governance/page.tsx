import type { Metadata } from 'next';
import GovernanceClient from './GovernanceClient';
import { SITE_URL, getBreadcrumbSchema } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'Governance & Regulatory Compliance — Licensed by CBN, Insured by NDIC',
  description:
    'Institutional governance framework: Licensed by the Central Bank of Nigeria (CBN), insured by the Nigeria Deposit Insurance Corporation (NDIC). Adherence to AML/CFT statutory compliance and NDPR data privacy laws.',
  keywords: [
    'CBN license Axoora',
    'NDIC insured microfinance bank',
    'Nigerian banking governance',
    'financial compliance Abuja',
    'NDPR compliance Nigeria',
    'ethical Islamic banking principles',
  ],
  alternates: {
    canonical: `${SITE_URL}/governance`,
  },
  openGraph: {
    title: 'Governance & Regulation — Central Bank of Nigeria Oversight',
    description:
      'Regulatory compliance, CBN licensing, NDIC insurance, and corporate stewardship at Axoora.',
    url: `${SITE_URL}/governance`,
  },
  twitter: {
    title: 'Axoora Governance & Regulation',
    description:
      'Licensed by the Central Bank of Nigeria (CBN). Eligible deposits insured by NDIC.',
  },
};

export default function GovernancePage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Governance & Regulation', url: '/governance' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <GovernanceClient />
    </>
  );
}
