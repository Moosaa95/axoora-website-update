import React, { createContext, useContext, useState, useEffect } from 'react';
import { COMPANY_INFO, JOURNAL_ARTICLES, VALUES_LIST } from '../data/mockData';
import { JournalArticle } from '../types';

export interface AdminStepItem {
  num: number;
  tag: string;
  title: string;
  desc: string;
  accent: string;
  user: {
    photo: string;
    name: string;
    role: string;
    location: string;
    comment: string;
  };
}

export interface AdminMerchantItem {
  id: string;
  name: string;
  role: string;
  location: string;
  image: string;
  quote: string;
  statLabel: string;
  statValue: string;
  accentColor: string;
  badge: string;
  featured: boolean;
}

export interface AdminHeroConfig {
  headlineBusiness: string;
  subheadlineBusiness: string;
  headlinePersonal: string;
  subheadlinePersonal: string;
  announcementTicker: string;
  announcementActive: boolean;
  ctaTextPrimary: string;
  ctaTextSecondary: string;
  trustLine: string;
}

export interface AdminLeadItem {
  id: string;
  fullName: string;
  whatsappNumber: string;
  email: string;
  city?: string;
  interest: 'personal' | 'business' | 'pos-agent' | 'aggregator';
  status: 'new' | 'contacted' | 'approved' | 'dispatched';
  submittedAt: string;
  notes?: string;
}

export interface AdminProductItem {
  id: string;
  name: string;
  category: 'personal' | 'business' | 'pos' | 'capital';
  headline: string;
  feeStructure: string;
  status: 'active' | 'beta' | 'coming-soon';
  highlight: string;
  description: string;
}

interface CmsContextType {
  hero: AdminHeroConfig;
  updateHero: (patch: Partial<AdminHeroConfig>) => void;
  steps: AdminStepItem[];
  updateStep: (num: number, patch: Partial<AdminStepItem>) => void;
  resetSteps: () => void;
  merchants: AdminMerchantItem[];
  addMerchant: (merchant: AdminMerchantItem) => void;
  updateMerchant: (id: string, patch: Partial<AdminMerchantItem>) => void;
  deleteMerchant: (id: string) => void;
  articles: JournalArticle[];
  addArticle: (article: JournalArticle) => void;
  updateArticle: (id: string, patch: Partial<JournalArticle>) => void;
  deleteArticle: (id: string) => void;
  leads: AdminLeadItem[];
  updateLeadStatus: (id: string, status: AdminLeadItem['status']) => void;
  deleteLead: (id: string) => void;
  addLead: (lead: Omit<AdminLeadItem, 'id' | 'submittedAt'>) => void;
  products: AdminProductItem[];
  updateProduct: (id: string, patch: Partial<AdminProductItem>) => void;
  resetAllCmsData: () => void;
}

const DEFAULT_HERO: AdminHeroConfig = {
  headlineBusiness: 'Money, simplified for the street.',
  subheadlineBusiness: 'One dedicated Nigerian account for your personal money, one for your store, and a dual-SIM Apex POS that settles transfers in 0 seconds.',
  headlinePersonal: 'Your AI financial concierge.',
  subheadlinePersonal: 'Bank safely on WhatsApp, split group contributions with Paycircle, and keep your savings halal with zero interest and zero hidden charges.',
  announcementTicker: '⚡ CBN Approved Dual-SIM Apex POS Batch 2 Now Dispatching Nationwide. Instant Settlement Enabled.',
  announcementActive: true,
  ctaTextPrimary: 'Open Account & Request POS',
  ctaTextSecondary: 'Bank on WhatsApp',
  trustLine: COMPANY_INFO.trustLine,
};

const DEFAULT_STEPS: AdminStepItem[] = [
  {
    num: 1,
    tag: '01. Instant Setup',
    title: 'Download the App & Enter Phone Number',
    desc: 'Get Axoora on iOS, Android, or bank straight through WhatsApp. Enter your Nigerian mobile number to receive an instant 6-digit WhatsApp or SMS verification code.',
    accent: '#0D95FE',
    user: {
      photo: '/merchants/shopper.jpg',
      name: 'Amina Bello',
      role: 'Personal & Business Shopper',
      location: 'Ikeja, Lagos',
      comment: 'Received WhatsApp OTP in 1.2 seconds flat.',
    },
  },
  {
    num: 2,
    tag: '02. Identity & BVN',
    title: '30-Second BVN & Facial Biometrics Match',
    desc: 'Verify your identity in under 30 seconds via direct CBN NIBSS check. Take a quick selfie for 3D liveness match—no bank queues, zero paper affidavits, Tier-3 limits unlocked.',
    accent: '#00DF8F',
    user: {
      photo: '/merchants/fatima.jpg',
      name: 'Fatima Al-Hassan',
      role: 'Founder, Zaynab Couture',
      location: 'Wuse II, Abuja',
      comment: 'BVN & selfie matched in 20s without bank queues.',
    },
  },
  {
    num: 3,
    tag: '03. Dedicated NUBAN',
    title: 'Instant Account Funding & Dedicated NUBAN',
    desc: 'Your dedicated Nigerian business or personal NUBAN is assigned instantly. Receive customer transfers from all commercial banks with sub-second NIBSS settlement.',
    accent: '#0D95FE',
    user: {
      photo: '/merchants/emeka.jpg',
      name: 'Emeka Chukwu',
      role: 'Distributor, Emeka Gadgets',
      location: 'Computer Village, Lagos',
      comment: 'Shop NUBAN was active and taking payments on Day 1.',
    },
  },
  {
    num: 4,
    tag: '04. Transact & Hardware',
    title: 'Ready for Business: Card Active & POS Dispatched',
    desc: 'Activate your free virtual Dollar & Naira card immediately. Request your dual-eSIM Apex POS terminal delivered directly to your shop counter within 48 hours.',
    accent: '#F2A93B',
    user: {
      photo: '/merchants/tunde.jpg',
      name: 'Tunde Bakare',
      role: 'Operations Manager, Fresh Mart',
      location: 'Lekki Phase 1, Lagos',
      comment: 'Apex terminal arrived at our store in under 48 hours.',
    },
  },
];

const DEFAULT_MERCHANTS: AdminMerchantItem[] = [
  {
    id: 'bilkisu',
    name: 'Hajiya Bilkisu Danladi',
    role: 'Wholesale Grain Merchant',
    location: 'Dawanau Market, Kano',
    image: '/merchants/bilkisu.jpg',
    quote: 'We dispatch 40 tonnes of grains across Northern Nigeria weekly. Axoora gave us halal zero-interest inventory capital and sub-second supplier settlements.',
    statLabel: 'Weekly Turnover',
    statValue: '₦18.4M+',
    accentColor: '#00DF8F',
    badge: 'Halal Capital Merchant',
    featured: true,
  },
  {
    id: 'emeka',
    name: 'Emeka Chukwu',
    role: 'Electronics & Gadgets Distributor',
    location: 'Computer Village, Ikeja, Lagos',
    image: '/merchants/emeka.jpg',
    quote: 'Network downtime on Saturdays used to cost us dozens of angry customers. Our 8 Apex POS terminals switch automatically between MTN and Airtel with zero glitches.',
    statLabel: 'Terminal Uptime',
    statValue: '99.98%',
    accentColor: '#0D95FE',
    badge: 'Apex POS Fleet',
    featured: true,
  },
  {
    id: 'fatima',
    name: 'Fatima Al-Hassan',
    role: 'Founder, Zaynab Couture',
    location: 'Wuse II, Abuja',
    image: '/merchants/fatima.jpg',
    quote: 'Banking on WhatsApp is a game-changer. I check balances, generate invoice links, and pay textile suppliers in Kano while on the go. Zero monthly fees.',
    statLabel: 'Transfer Fees Saved',
    statValue: '₦0 Fees',
    accentColor: '#F2A93B',
    badge: 'WhatsApp AI Banking',
    featured: true,
  },
  {
    id: 'tunde',
    name: 'Tunde Bakare',
    role: 'Supermarket Operations Manager',
    location: 'Lekki Phase 1, Lagos',
    image: '/merchants/tunde.jpg',
    quote: 'Each checkout desk has its own dedicated shop NUBAN. Cashiers balance their shift in 2 minutes without disputes or manual paper receipts.',
    statLabel: 'Shift Audit Speed',
    statValue: '2 Mins',
    accentColor: '#00DF8F',
    badge: 'Instant NUBAN Checkout',
    featured: true,
  },
];

const DEFAULT_PRODUCTS: AdminProductItem[] = [
  {
    id: 'prod-pos',
    name: 'Axoora Apex Pro Smart POS',
    category: 'pos',
    headline: 'Dual-SIM 4G Terminal with Zero-Delay Receipt Printing',
    feeStructure: '0.5% capped at ₦100 per transaction',
    status: 'active',
    highlight: '99.98% Network Uptime with Auto MTN/Airtel Switch',
    description: 'Ruggedized Android 13 touch screen terminal with physical keypad, 48-hour battery standby, and camera scanner for QR codes.',
  },
  {
    id: 'prod-biz-nuban',
    name: 'Dedicated Business NUBAN',
    category: 'business',
    headline: 'Instant Shop Account without Bank Visit',
    feeStructure: 'Free Opening // Zero Maintenance Fees',
    status: 'active',
    highlight: 'Sub-3s NIBSS Instant Clearing',
    description: 'Get verified in 2 minutes with BVN. Create distinct sub-accounts for multiple cashier tills or shop branches.',
  },
  {
    id: 'prod-halal-capital',
    name: 'Murabaha Halal Inventory Financing',
    category: 'capital',
    headline: 'Zero-Interest Stock Financing for Market Traders',
    feeStructure: 'Fixed Transparent Cost-Plus Mark-up',
    status: 'active',
    highlight: 'Shari’ah Board Certified // No Compound Debt',
    description: 'We purchase goods directly from approved manufacturers and deliver to your warehouse with flexible seasonal repayment terms.',
  },
  {
    id: 'prod-whatsapp',
    name: 'Axoora AI on WhatsApp',
    category: 'personal',
    headline: 'Bank in Pidgin, Hausa, Yoruba, or English via Text & Voice',
    feeStructure: '100% Free on WhatsApp',
    status: 'active',
    highlight: 'Zero Data Mode Available',
    description: 'Check balances, generate receipt images, and send money using simple natural voice notes or chats.',
  },
];

const DEFAULT_LEADS: AdminLeadItem[] = [
  {
    id: 'lead-1',
    fullName: 'Musa Abdullahi',
    whatsappNumber: '+234 803 456 7890',
    email: 'musa.abdullah@karmarket.ng',
    city: 'Kano',
    interest: 'pos-agent',
    status: 'approved',
    submittedAt: '2026-09-29T10:14:00Z',
    notes: 'Requested 3 Apex Terminals for Kurmi textile stalls.',
  },
  {
    id: 'lead-2',
    fullName: 'Chidinma Okafor',
    whatsappNumber: '+234 902 334 1122',
    email: 'chidinma@chidi-salon.com',
    city: 'Enugu',
    interest: 'business',
    status: 'contacted',
    submittedAt: '2026-09-29T11:45:00Z',
    notes: 'Interested in Dedicated NUBAN & QR code receipts.',
  },
  {
    id: 'lead-3',
    fullName: 'Babatunde Adeleke',
    whatsappNumber: '+234 812 998 7766',
    email: 'tunde.adeleke@gmail.com',
    city: 'Lagos',
    interest: 'personal',
    status: 'new',
    submittedAt: '2026-09-30T00:20:00Z',
    notes: 'Waiting for iOS App Store Beta link.',
  },
  {
    id: 'lead-4',
    fullName: 'Ibrahim Sani Garba',
    whatsappNumber: '+234 708 554 9901',
    email: 'ibrahim.garba@wuse-agro.ng',
    city: 'Abuja',
    interest: 'aggregator',
    status: 'dispatched',
    submittedAt: '2026-09-28T16:30:00Z',
    notes: 'Aggregator fleet package of 20 terminals dispatched via GIG Logistics.',
  },
];

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hero, setHero] = useState<AdminHeroConfig>(() => {
    try {
      const stored = localStorage.getItem('axoora_cms_hero');
      return stored ? { ...DEFAULT_HERO, ...JSON.parse(stored) } : DEFAULT_HERO;
    } catch {
      return DEFAULT_HERO;
    }
  });

  const [steps, setSteps] = useState<AdminStepItem[]>(() => {
    try {
      const stored = localStorage.getItem('axoora_cms_steps');
      return stored ? JSON.parse(stored) : DEFAULT_STEPS;
    } catch {
      return DEFAULT_STEPS;
    }
  });

  const [merchants, setMerchants] = useState<AdminMerchantItem[]>(() => {
    try {
      const stored = localStorage.getItem('axoora_cms_merchants');
      return stored ? JSON.parse(stored) : DEFAULT_MERCHANTS;
    } catch {
      return DEFAULT_MERCHANTS;
    }
  });

  const [articles, setArticles] = useState<JournalArticle[]>(() => {
    try {
      const stored = localStorage.getItem('axoora_cms_articles');
      return stored ? JSON.parse(stored) : JOURNAL_ARTICLES;
    } catch {
      return JOURNAL_ARTICLES;
    }
  });

  const [leads, setLeads] = useState<AdminLeadItem[]>(() => {
    try {
      const stored = localStorage.getItem('axoora_cms_leads');
      if (stored) return JSON.parse(stored);
      // Fallback check: check old waitlist submissions
      const legacy = localStorage.getItem('axoora_waitlist');
      if (legacy) {
        const parsed = JSON.parse(legacy);
        return [
          ...parsed.map((item: any, idx: number) => ({
            id: `legacy-${idx}`,
            fullName: item.fullName || 'Waitlist User',
            whatsappNumber: item.whatsappNumber || '',
            email: item.email || '',
            city: item.city || 'Nigeria',
            interest: item.interest || 'personal',
            status: 'new' as const,
            submittedAt: item.submittedAt || new Date().toISOString(),
          })),
          ...DEFAULT_LEADS,
        ];
      }
      return DEFAULT_LEADS;
    } catch {
      return DEFAULT_LEADS;
    }
  });

  const [products, setProducts] = useState<AdminProductItem[]>(() => {
    try {
      const stored = localStorage.getItem('axoora_cms_products');
      return stored ? JSON.parse(stored) : DEFAULT_PRODUCTS;
    } catch {
      return DEFAULT_PRODUCTS;
    }
  });

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('axoora_cms_hero', JSON.stringify(hero));
    } catch {}
  }, [hero]);

  useEffect(() => {
    try {
      localStorage.setItem('axoora_cms_steps', JSON.stringify(steps));
    } catch {}
  }, [steps]);

  useEffect(() => {
    try {
      localStorage.setItem('axoora_cms_merchants', JSON.stringify(merchants));
    } catch {}
  }, [merchants]);

  useEffect(() => {
    try {
      localStorage.setItem('axoora_cms_articles', JSON.stringify(articles));
    } catch {}
  }, [articles]);

  useEffect(() => {
    try {
      localStorage.setItem('axoora_cms_leads', JSON.stringify(leads));
    } catch {}
  }, [leads]);

  useEffect(() => {
    try {
      localStorage.setItem('axoora_cms_products', JSON.stringify(products));
    } catch {}
  }, [products]);

  const updateHero = (patch: Partial<AdminHeroConfig>) => {
    setHero((prev) => ({ ...prev, ...patch }));
  };

  const updateStep = (num: number, patch: Partial<AdminStepItem>) => {
    setSteps((prev) => prev.map((s) => (s.num === num ? { ...s, ...patch } : s)));
  };

  const resetSteps = () => {
    setSteps(DEFAULT_STEPS);
  };

  const addMerchant = (merchant: AdminMerchantItem) => {
    setMerchants((prev) => [merchant, ...prev]);
  };

  const updateMerchant = (id: string, patch: Partial<AdminMerchantItem>) => {
    setMerchants((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)));
  };

  const deleteMerchant = (id: string) => {
    setMerchants((prev) => prev.filter((m) => m.id !== id));
  };

  const addArticle = (article: JournalArticle) => {
    setArticles((prev) => [article, ...prev]);
  };

  const updateArticle = (id: string, patch: Partial<JournalArticle>) => {
    setArticles((prev) => prev.map((a) => (a.id === id ? { ...a, ...patch } : a)));
  };

  const deleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  const updateLeadStatus = (id: string, status: AdminLeadItem['status']) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  const addLead = (leadData: Omit<AdminLeadItem, 'id' | 'submittedAt'>) => {
    const newLead: AdminLeadItem = {
      ...leadData,
      id: `lead-${Date.now()}`,
      submittedAt: new Date().toISOString(),
    };
    setLeads((prev) => [newLead, ...prev]);
  };

  const updateProduct = (id: string, patch: Partial<AdminProductItem>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  };

  const resetAllCmsData = () => {
    setHero(DEFAULT_HERO);
    setSteps(DEFAULT_STEPS);
    setMerchants(DEFAULT_MERCHANTS);
    setArticles(JOURNAL_ARTICLES);
    setLeads(DEFAULT_LEADS);
    setProducts(DEFAULT_PRODUCTS);
    localStorage.removeItem('axoora_cms_hero');
    localStorage.removeItem('axoora_cms_steps');
    localStorage.removeItem('axoora_cms_merchants');
    localStorage.removeItem('axoora_cms_articles');
    localStorage.removeItem('axoora_cms_leads');
    localStorage.removeItem('axoora_cms_products');
  };

  return (
    <CmsContext.Provider
      value={{
        hero,
        updateHero,
        steps,
        updateStep,
        resetSteps,
        merchants,
        addMerchant,
        updateMerchant,
        deleteMerchant,
        articles,
        addArticle,
        updateArticle,
        deleteArticle,
        leads,
        updateLeadStatus,
        deleteLead,
        addLead,
        products,
        updateProduct,
        resetAllCmsData,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = () => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};
