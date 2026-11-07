import type { Metadata } from 'next';
import JournalClient from './JournalClient';
import { SITE_URL, getBreadcrumbSchema } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'Engineering & Fintech Journal — Insights & Systems Architecture — Axoora',
  description:
    'Deep dives on high-throughput payment rails, dual-SIM failover systems, zero-interest financial engineering, and sovereign ledger design from Axoora engineers and researchers.',
  keywords: [
    'fintech engineering blog Nigeria',
    'distributed payment systems',
    'NIBSS integration architecture',
    'WhatsApp banking NLP engine',
    'Islamic fintech technical papers',
    'Axoora engineering journal',
  ],
  alternates: {
    canonical: `${SITE_URL}/journal`,
  },
  openGraph: {
    title: 'Axoora Engineering & Systems Journal',
    description:
      'Technical perspectives on distributed transaction routing, conversational NLP, and sovereign banking.',
    url: `${SITE_URL}/journal`,
  },
  twitter: {
    title: 'Axoora Tech & Research Journal',
    description:
      'Engineering notes from the builders of sovereign African fintech rails.',
  },
};

export default function JournalPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Engineering Journal', url: '/journal' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <JournalClient />
    </>
  );
}
