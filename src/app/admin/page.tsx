import type { Metadata } from 'next';
import { AdminClient } from './AdminClient';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Axoora Internal',
  description: 'Axoora Internal Operations and Waitlist Portal',
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nocache: true,
  },
};

export default function AdminPage() {
  return <AdminClient />;
}
