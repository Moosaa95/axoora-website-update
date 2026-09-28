import { JournalArticle, FaqItem } from '../types';

export const BRAND_LOGO_URL = 'https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/www/public/apple-touch-icon.png';

export const COMPANY_INFO = {
  name: 'AXOORA Financial Technologies Limited',
  brand: 'Axoora',
  office: 'Cappador Mall, Maitama, Abuja, Nigeria',
  supportEmail: 'support@axoora.ai',
  pressEmail: 'press@axoora.ai',
  careersEmail: 'careers@axoora.ai',
  whatsappNumber: '+234 911 000 2966',
  whatsappUrl: 'https://wa.me/2349110002966?text=Hello%20Axoora%20AI%2C%20I%20want%20to%20bank%20with%20you',
  trustLine: 'We are a Nigerian financial institution. We are licensed by the Central Bank of Nigeria. Eligible deposits are insured by NDIC. We hold a data protection certificate.',
  aimSentence: 'Our aim as a company is simple. Reduce the number of unbanked people and unbanked businesses. Give them finance that is affordable, sustainable, and free of interest. And on the same app, give them a taste of ordinary lifestyle experiences — a booking, a meal, a line of data — so inclusion does not stop at a balance.',
};

export const VALUES_LIST = [
  {
    title: 'Security',
    tag: 'Locked Doors',
    description: 'We lock the door on money and data, and we never ask for a PIN on the website or a phone call.',
  },
  {
    title: 'Ownership',
    tag: 'Named Care',
    description: 'Your problem has a name on our side; we do not pass you around.',
  },
  {
    title: 'Integrity',
    tag: 'The True Thing',
    description: 'We tell the true thing; fees and terms are visible; Islamic products stay free of interest.',
  },
  {
    title: 'Passion',
    tag: 'The Life Across',
    description: 'We care about the life on the other side of the transfer.',
  },
  {
    title: 'Teamwork',
    tag: 'One House',
    description: 'Personal, business and agents are one house; you should not meet six different companies.',
  },
  {
    title: 'Innovative',
    tag: 'Useful New',
    description: 'New is useful, or it is not new enough — Ajo becomes Paycircle, a first account sits beside a card and a booking.',
  },
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'art-1',
    category: 'Engineering',
    title: 'Designing resilient NIBSS payment rails for intermittent networks',
    summary: 'How our engineering team built idempotent retry mechanisms and offline-tolerant handshakes that settle transfers across erratic rural cellular signals.',
    readTime: '6 min read',
    date: 'September 2026',
    author: 'Axoora Engineering',
  },
  {
    id: 'art-2',
    category: 'Technology',
    title: 'Natural language intent resolution for Nigerian commerce on WhatsApp',
    summary: 'Understanding speech and text in Nigerian English, Pidgin, Hausa, Yoruba, and Igbo to execute zero-friction transfers and account queries safely.',
    readTime: '8 min read',
    date: 'September 2026',
    author: 'Axoora AI Research',
  },
  {
    id: 'art-3',
    category: 'Business',
    title: 'Why interest-free Islamic finance creates resilient merchant supply chains',
    summary: 'Examining how risk-sharing and ethical asset backing protect market traders from the debt cycles common in conventional high-interest microfinance.',
    readTime: '7 min read',
    date: 'August 2026',
    author: 'Treasury & Islamic Products',
  },
  {
    id: 'art-4',
    category: 'Guides',
    title: 'A guide to Paycircle: bringing traditional Ajo thrift into a licensed room',
    summary: 'A clear walkthrough of rotational contributions, escrow protection, member turns, and why Paycircle is purely communal thrift, not a loan.',
    readTime: '5 min read',
    date: 'August 2026',
    author: 'Customer Experience',
  },
  {
    id: 'art-5',
    category: 'Engineering',
    title: 'Virtual card isolation and dynamic rolling CVV architecture',
    summary: 'How isolating dollar card transactions prevents cross-border fraud while allowing Nigerian businesses and consumers to settle global SaaS subscriptions safely.',
    readTime: '6 min read',
    date: 'July 2026',
    author: 'Card Systems Group',
  },
  {
    id: 'art-6',
    category: 'Business',
    title: 'The dignity of informal commerce: banking the market trader properly',
    summary: 'Why moving beyond pity narratives to deliver professional merchant NUBANs, transparent fees, and reliable POS terminals transforms local enterprise.',
    readTime: '5 min read',
    date: 'July 2026',
    author: 'Market Operations',
  },
];

export const FAQ_LIST: FaqItem[] = [
  {
    id: 'faq-what-is-axoora',
    category: 'General',
    question: 'What is Axoora?',
    answer: 'Axoora is a Nigerian financial institution licensed by the Central Bank of Nigeria (CBN). Eligible deposits are insured by NDIC. We provide personal banking with Axoora AI, business accounts for shops, and POS solutions for agents, alongside ordinary lifestyle services like travel and data.',
    tags: ['cbn', 'license', 'ndic', 'about', 'banking'],
    actionLink: {
      label: 'Explore Our Story & Purpose',
      action: 'navigate',
      screen: 'about',
    },
  },
  {
    id: 'faq-open-account-website',
    category: 'General',
    question: 'Can I open an account or transfer money directly on this website?',
    answer: 'No. This website is how people meet Axoora. People do not open accounts, send money, or take loans in the browser. You can join our waitlist to be notified when we are live, download the mobile app when released, or bank with Axoora AI on WhatsApp.',
    tags: ['account', 'security', 'waitlist', 'app', 'browser'],
    actionLink: {
      label: 'Join Early Access Waitlist',
      action: 'waitlist',
      interest: 'personal',
    },
  },
  {
    id: 'faq-whatsapp-banking-explained',
    category: 'General',
    question: 'What does "Bank with Axoora AI on WhatsApp" mean?',
    answer: 'Our official WhatsApp channel (+234 911 000 2966) is not merely a customer service line. It is Axoora AI on WhatsApp — the same personal banking, built so you can send money, check balances, save, and ask questions directly in a chat just as you would in the app.',
    tags: ['whatsapp', 'ai', 'chatbot', 'transfer', 'chat'],
    actionLink: {
      label: 'Open WhatsApp Banking Desk',
      action: 'whatsapp',
    },
  },
  {
    id: 'faq-instant-transfers-nibss',
    category: 'General',
    question: 'How fast do money transfers settle across Nigerian banks?',
    answer: 'Transfers execute over direct NIBSS Instant Payment (NIP) rails with dual-redundant routing, settling in under 3 seconds. In case of network downtime at a recipient bank, our idempotent retry system tracks the status until confirmed without debiting your account twice.',
    tags: ['transfers', 'nibss', 'nip', 'speed', 'settlement'],
  },
  {
    id: 'faq-pin-password-security',
    category: 'Security',
    question: 'Will Axoora ever ask for my PIN or password?',
    answer: 'NEVER. We will never ask for your PIN, OTP, BVN, or password on this website, and our team will never call you asking for your PIN. If anyone asks you for a PIN pretending to be Axoora, hang up and notify support@axoora.ai.',
    tags: ['security', 'pin', 'otp', 'scam', 'fraud', 'bvn'],
    actionLink: {
      label: 'Contact Security Desk',
      action: 'email',
    },
  },
  {
    id: 'faq-suspicious-activity-report',
    category: 'Security',
    question: 'How do I immediately freeze my card or report suspicious activity?',
    answer: 'You can instantly freeze any virtual or physical card with one tap in the mobile app, or by sending "FREEZE CARD" to Axoora AI on WhatsApp. Our fraud response team monitors anomalous transactions 24/7.',
    tags: ['freeze', 'fraud', 'stolen', 'security', 'card lock'],
    actionLink: {
      label: 'Message WhatsApp Emergency',
      action: 'whatsapp',
    },
  },
  {
    id: 'faq-virtual-cards-dollar-naira',
    category: 'Personal & Cards',
    question: 'How do the Virtual Naira and Virtual Dollar cards work?',
    answer: 'You can hold both cards inside the Axoora app and through WhatsApp AI. The Virtual Dollar card is specifically for paying for goods and services priced in dollars from Nigeria (such as software subscriptions and online checkouts). It is NOT a United States bank account.',
    tags: ['cards', 'dollar card', 'virtual card', 'mastercard', 'subscriptions', 'naira card'],
    actionLink: {
      label: 'View Card Details & Limits',
      action: 'navigate',
      screen: 'personal',
    },
  },
  {
    id: 'faq-axoora-points-system',
    category: 'Personal & Cards',
    question: 'What are Axoora Points?',
    answer: 'Axoora Points are earned as you spend, refer, and transact. They are a thank-you for using the house. They are not interest and they are not Save and Earn. We will publish details on how Points can be redeemed as we roll out.',
    tags: ['points', 'rewards', 'perks', 'referrals'],
  },
  {
    id: 'faq-save-and-earn-halal',
    category: 'Save and Earn',
    question: 'What is Save and Earn, and is it interest-based?',
    answer: 'Save and Earn means putting money aside and receiving a return that is strictly Islamic-compliant — no interest, no riba. Returns are generated through ethical asset-backed trade principles rather than conventional debt interest.',
    tags: ['save', 'earn', 'islamic', 'halal', 'riba', 'interest-free', 'sharia'],
    actionLink: {
      label: 'Learn Save and Earn Principles',
      action: 'navigate',
      screen: 'personal',
    },
  },
  {
    id: 'faq-paycircle-esusu-ajo',
    category: 'Paycircle',
    question: 'What is Paycircle?',
    answer: 'Paycircle is traditional Ajo (Esusu) built inside the app. A trusted group contributes on a set schedule and each member takes a turn to collect the pool. Paycircle is not a loan.',
    tags: ['paycircle', 'ajo', 'esusu', 'thrift', 'group savings'],
    actionLink: {
      label: 'How Paycircle Works',
      action: 'navigate',
      screen: 'personal',
    },
  },
  {
    id: 'faq-business-financing-ethical',
    category: 'Business & POS',
    question: 'What is Axoora Business financing?',
    answer: 'After an account has been actively used, a business owner may apply for financing built on Islamic principles — without interest. Approval is based on real business activity, is not automatic, and is not guaranteed. We do not provide payday loans or instant cash schemes.',
    tags: ['business', 'financing', 'working capital', 'halal loan', 'islamic financing', 'trade'],
    actionLink: {
      label: 'Explore Business Accounts',
      action: 'navigate',
      screen: 'business',
    },
  },
  {
    id: 'faq-pos-terminal-request',
    category: 'Business & POS',
    question: 'How do I request a POS terminal or become an agent?',
    answer: 'You can register your interest for a terminal, agent onboarding, or an aggregator network directly through our waitlist, or contact our POS desk directly on WhatsApp.',
    tags: ['pos', 'agent', 'terminal', 'apex', 'aggregator', 'merchant'],
    actionLink: {
      label: 'Register for Apex POS Hardware',
      action: 'waitlist',
      interest: 'pos-agent',
    },
  },
  {
    id: 'faq-pos-offline-signals',
    category: 'Business & POS',
    question: 'What happens if a POS terminal encounters poor cellular signal?',
    answer: 'The Axoora Apex POS terminal is built with dual active 4G SIM slots (MTN and Airtel/Glo) that auto-failover without dropping a transaction. It includes offline transaction cryptographic buffering for uninterrupted outdoor market operations.',
    tags: ['pos', 'signal', 'offline', 'dual sim', 'hardware', 'connectivity'],
    actionLink: {
      label: 'View POS Specs & Hardware',
      action: 'navigate',
      screen: 'pos-agents',
    },
  },
];
