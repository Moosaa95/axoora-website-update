import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '../context/ThemeContext';
import { CmsProvider } from '../context/CmsContext';
import { NavigationProvider } from '../context/NavigationContext';
import { AppShell } from '../components/AppShell';
import {
  SITE_URL,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_DESCRIPTION,
  SEO_DEFAULTS,
  getOrganizationSchema,
  getWebSiteSchema,
} from '../lib/seo';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#020F2E' },
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: 'AXOORA Financial Technologies Limited', url: SITE_URL }],
  creator: 'AXOORA Financial Technologies Limited',
  publisher: 'AXOORA Financial Technologies Limited',
  keywords: SEO_DEFAULTS.keywords,
  category: 'Finance',
  classification: 'Financial Technology & Sovereign Banking',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-NG': '/',
      en: '/',
    },
  },
  openGraph: {
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    site: SEO_DEFAULTS.twitterHandle,
    creator: SEO_DEFAULTS.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/axoora-logo.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/axoora-logo.svg' },
    ],
  },
  manifest: '/manifest.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = getOrganizationSchema();
  const websiteSchema = getWebSiteSchema();

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        {/* Official Brand Fonts: Satoshi (Primary) & Manrope (Secondary) */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,800,700,600,500,400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
        {/* Institutional Structured Data Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
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
