import type { Metadata } from 'next';
import CareersClient from './CareersClient';
import { SITE_URL, getBreadcrumbSchema } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'Careers at Axoora — Build Sovereign Financial Rails for Africa',
  description:
    'Join our team in Maitama, Abuja. We are hiring distributed systems engineers, mobile developers, AML compliance officers, and field operations managers to build Nigeria’s most resilient fintech.',
  keywords: [
    'Axoora jobs',
    'fintech careers Abuja',
    'software engineering jobs Nigeria',
    'Golang fintech jobs Nigeria',
    'work at Axoora',
    'fintech recruitment Nigeria',
  ],
  alternates: {
    canonical: `${SITE_URL}/careers`,
  },
  openGraph: {
    title: 'Careers at Axoora — Build the Future of African Commerce',
    description:
      'We are solving real commerce friction for millions of merchants and consumers across Nigeria. Explore open opportunities.',
    url: `${SITE_URL}/careers`,
  },
  twitter: {
    title: 'Work at Axoora',
    description:
      'Engineers, operators, and compliance champions building sovereign fintech in Abuja.',
  },
};

export default function CareersPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Careers', url: '/careers' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CareersClient />
    </>
  );
}
