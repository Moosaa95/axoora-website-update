import type { Metadata } from 'next';
import SendClient from './SendClient';
import { SITE_NAME, SITE_URL } from '../../lib/seo';

export const metadata: Metadata = {
  title: `Send and Pay — ${SITE_NAME}`,
  description: 'Bank on WhatsApp or in the app. Instant transfers with bank health status and zero hidden charges.',
  alternates: {
    canonical: `${SITE_URL}/send`,
  },
};

export default function SendPage() {
  return <SendClient />;
}

