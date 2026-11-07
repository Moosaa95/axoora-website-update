import type { Metadata } from 'next';
import PressClient from './PressClient';
import { SITE_URL, getBreadcrumbSchema } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'Press Room, Media Kit & Announcements — Axoora',
  description:
    'Official news, product releases, regulatory milestones, brand assets, and spokesperson contacts for AXOORA Financial Technologies Limited. Press inbox: press@axoora.ai.',
  keywords: [
    'Axoora press releases',
    'fintech news Nigeria',
    'Axoora media kit',
    'fintech announcements Abuja',
    'Axoora brand assets',
  ],
  alternates: {
    canonical: `${SITE_URL}/press`,
  },
  openGraph: {
    title: 'Axoora Press Room & Media Center',
    description:
      'Official announcements, product launches, executive statements, and media kit.',
    url: `${SITE_URL}/press`,
  },
  twitter: {
    title: 'Axoora Press & News',
    description:
      'Verified statements, announcements, and media assets from Axoora Financial Technologies.',
  },
};

export default function PressPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Press & Media', url: '/press' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PressClient />
    </>
  );
}
