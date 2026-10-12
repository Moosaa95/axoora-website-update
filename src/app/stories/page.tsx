import type { Metadata } from 'next';
import { StoriesClient } from './StoriesClient';
import { SITE_NAME, SITE_URL, getBreadcrumbSchema } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'Customer Stories | Real Impact for African Builders',
  description:
    'Discover how businesses, merchants, and everyday Africans build sustainable growth and unlock financial mobility with Axoora.',
  alternates: {
    canonical: `${SITE_URL}/stories`,
  },
  openGraph: {
    title: 'Customer Stories | Real Impact for African Builders - Axoora',
    description:
      'Discover how businesses, merchants, and everyday Africans build sustainable growth and unlock financial mobility with Axoora.',
    url: `${SITE_URL}/stories`,
    siteName: SITE_NAME,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Customer Stories - Axoora',
    description:
      'Real stories from merchants, founders, and everyday savers powering their financial journey with Axoora.',
  },
};

export default function StoriesPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Stories', url: '/stories' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <StoriesClient />
    </>
  );
}
