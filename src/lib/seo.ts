export const SITE_URL = 'https://axoora.ai';
export const SITE_NAME = 'Axoora';
export const SITE_TAGLINE = 'Sovereign Fintech & Street-Level Banking for Nigeria';
export const SITE_DESCRIPTION =
  'AXOORA Financial Technologies Limited. Licensed by the Central Bank of Nigeria (CBN). Eligible deposits insured by the NDIC. 0% transfer fee personal banking, dedicated shop NUBANs, non-interest Save & Earn, and dual-SIM 4G Apex POS terminals.';

export const SEO_DEFAULTS = {
  title: `${SITE_NAME} — ${SITE_TAGLINE}`,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  locale: 'en_NG',
  type: 'website',
  twitterHandle: '@axoora_ai',
  keywords: [
    'Axoora',
    'Axoora MFB',
    'Axoora AI',
    'Nigerian fintech',
    'CBN licensed microfinance bank',
    'NDIC insured bank Nigeria',
    'zero transfer fees Nigeria',
    'virtual dollar card Nigeria',
    'WhatsApp banking Nigeria',
    'shop NUBAN account',
    'halal savings Nigeria',
    'non-interest banking',
    'Apex POS terminal',
    'POS machine Abuja',
    'dual-SIM POS terminal',
    'NIBSS instant settlement',
    'Maitama Abuja fintech',
  ],
};

// Organization & Financial Institution JSON-LD Schema
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'FinancialService', 'BankOrCreditUnion'],
    '@id': `${SITE_URL}/#organization`,
    name: 'AXOORA Financial Technologies Limited',
    alternateName: ['Axoora', 'Axoora Bank', 'Axoora AI'],
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/axoora-logo.svg`,
      width: 512,
      height: 512,
    },
    image: `${SITE_URL}/axoora-og.png`,
    description: SITE_DESCRIPTION,
    email: 'support@axoora.ai',
    telephone: '+234-911-000-2966',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Suite 08 Block C, Cappador Mall, 85 Aguiyi Ironsi Street',
      addressLocality: 'Maitama',
      addressRegion: 'Federal Capital Territory',
      postalCode: '900271',
      addressCountry: 'NG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 9.0833,
      longitude: 7.4951,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    sameAs: [
      'https://twitter.com/axoora_ai',
      'https://linkedin.com/company/axoora',
      'https://instagram.com/axoora_ai',
      'https://wa.me/2349110002966',
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Nigeria',
    },
    currenciesAccepted: 'NGN, USD',
    paymentAccepted: 'Cash, Credit Card, Debit Card, Bank Transfer, WhatsApp Banking, POS Terminal',
    priceRange: '₦',
    slogan: 'Money, simplified for the street',
  };
}

// WebSite Schema with Sitelinks Searchbox
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'Axoora',
    alternateName: 'Axoora Financial Technologies',
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/help?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'en-NG',
  };
}

// BreadcrumbList Schema helper
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

// FAQ Schema helper for rich search snippets
export function getFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
