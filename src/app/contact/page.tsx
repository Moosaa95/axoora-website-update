import type { Metadata } from 'next';
import ContactClient from './ContactClient';
import { SITE_URL, getBreadcrumbSchema } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'Contact Us — Abuja Headquarters, WhatsApp Hotline & Support Desk',
  description:
    'Get in touch with Axoora. Headquarters: Suite 08 Block C, Cappador Mall, 85 Aguiyi Ironsi Street, Maitama, Abuja. Support inbox: support@axoora.ai. Official WhatsApp desk: +234 911 000 2966.',
  keywords: [
    'contact Axoora',
    'Axoora phone number',
    'Axoora office address Abuja',
    'Cappador Mall Maitama address',
    'Axoora support email',
    'Axoora WhatsApp number',
  ],
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: 'Contact Axoora — Maitama Abuja Headquarters & Live Support',
    description:
      'Reach our Abuja customer desk via WhatsApp, email, or visit our Maitama offices.',
    url: `${SITE_URL}/contact`,
  },
  twitter: {
    title: 'Contact Axoora Customer Desk',
    description:
      'Suite 08 Block C, Cappador Mall, Maitama, Abuja. WhatsApp and email response within minutes.',
  },
};

export default function ContactPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Contact Us', url: '/contact' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContactClient />
    </>
  );
}
