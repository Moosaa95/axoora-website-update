import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '../context/ThemeContext';
import { CmsProvider } from '../context/CmsContext';
import { NavigationProvider } from '../context/NavigationContext';
import { AppShell } from '../components/AppShell';

export const metadata: Metadata = {
  title: 'Axoora — Money, simplified for the street',
  description:
    'AXOORA Financial Technologies Limited. Licensed by the Central Bank of Nigeria (CBN). Personal banking with Axoora AI, standard accounts for your shop, and high-uptime terminals for agents — all built on sustainable, interest-free principles.',
  openGraph: {
    title: 'Axoora — Money, simplified for the street',
    description:
      'AXOORA Financial Technologies Limited. Licensed by the Central Bank of Nigeria (CBN). Eligible deposits insured by NDIC. Cappador Mall, Maitama, Abuja.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    icon: '/axoora-logo.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#020F2E] text-[#F2F5F9] font-sans antialiased selection:bg-[#0D95FE]/30 selection:text-[#F2F5F9]">
        <ThemeProvider>
          <CmsProvider>
            <NavigationProvider>
              <AppShell>{children}</AppShell>
            </NavigationProvider>
          </CmsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
