import type { Metadata } from 'next';
import EventsClient from './EventsClient';
import { SITE_URL, getBreadcrumbSchema } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'Events, Roadshows & Merchant Summits — Axoora',
  description:
    'Join Axoora at market square roadshows, retailer workshops, agent onboarding fairs, and financial inclusion symposiums across Nigeria.',
  keywords: [
    'fintech events Nigeria',
    'merchant roadshows Abuja',
    'POS agent workshops Kano',
    'trade exhibitions Lagos',
    'Axoora events',
  ],
  alternates: {
    canonical: `${SITE_URL}/events`,
  },
  openGraph: {
    title: 'Axoora Events, Merchant Summits & Roadshows',
    description:
      'Connecting with market traders, agency leaders, and digital commerce pioneers.',
    url: `${SITE_URL}/events`,
  },
  twitter: {
    title: 'Axoora Events & Summits',
    description:
      'Community engagements and merchant training programs in major commercial clusters.',
  },
};

export default function EventsPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Events & Summits', url: '/events' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <EventsClient />
    </>
  );
}
