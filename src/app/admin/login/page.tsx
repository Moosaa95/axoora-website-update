import type { Metadata } from 'next';
import { AdminLoginClient } from './AdminLoginClient';

export const metadata: Metadata = {
  title: 'Team Login — Axoora CMS Console',
  description: 'Secure login portal for Axoora platform managers and editorial team.',
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return <AdminLoginClient />;
}
