import type { Metadata } from 'next';
import PosAgentsClient from './PosAgentsClient';
import { SITE_URL, getBreadcrumbSchema } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'Axoora Apex POS — Dual-eSIM 4G Terminals, Instant Float & Sub-2s Settlement',
  description:
    'Accept card and transfer payments reliably with the Axoora Apex POS terminal. Dual-eSIM (MTN + Airtel) auto-failover, 99.98% uptime, instant agent cash float, 0.4% capped fees, and 48hr doorstep delivery across Nigeria.',
  keywords: [
    'POS terminal Nigeria',
    'Apex 4G Android POS machine',
    'POS agent registration Abuja',
    'agency banking float Nigeria',
    'dual SIM POS auto failover',
    'lowest POS charges Nigeria',
    'POS aggregator console',
    'Axoora Apex Pay',
  ],
  alternates: {
    canonical: `${SITE_URL}/pos-agents`,
  },
  openGraph: {
    title: 'Axoora Apex POS — Machine Wey No Get Wahala',
    description:
      'High-uptime Android POS terminals with dual-eSIM auto-failover, sub-2s settlement, and instant agent float.',
    url: `${SITE_URL}/pos-agents`,
  },
  twitter: {
    title: 'Axoora POS Terminals — Built for High-Volume Agency & Retail',
    description:
      'Dual-eSIM connectivity, sub-2s settlement, transparent daily payouts, and 48hr doorstep dispatch.',
  },
};

export default function PosAgentsPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'POS Terminals & Agency', url: '/pos-agents' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PosAgentsClient />
    </>
  );
}
