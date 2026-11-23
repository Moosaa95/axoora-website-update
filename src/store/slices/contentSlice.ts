import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { COMPANY_INFO, JOURNAL_ARTICLES, FAQ_LIST } from '../../data/mockData';
import { JournalArticle, FaqItem } from '../../types';
import {
  contentApi,
  type JournalArticleApi,
  type HeroConfigApi,
  type MerchantStoryApi,
  type ProductItemApi,
  type FaqItemApi,
} from '../../lib/teamApi';
import {
  AdminHeroConfig,
  AdminStepItem,
  AdminMerchantItem,
  AdminProductItem,
} from '../../context/CmsContext';

export interface ContentState {
  hero: AdminHeroConfig;
  steps: AdminStepItem[];
  merchants: AdminMerchantItem[];
  articles: JournalArticle[];
  products: AdminProductItem[];
  faqs: FaqItem[];
  loading: boolean;
  error: string | null;
}

const DEFAULT_HERO: AdminHeroConfig = {
  headlineBusiness: 'The Business Account Built for the Way Nigeria Trades.',
  subheadlineBusiness:
    'Separate store funds from personal cash, assign staff sub-accounts with strict spending limits, and clear POS payments into your balance with zero network lag.',
  headlinePersonal: 'Your Everyday Money, Finally In One Place.',
  subheadlinePersonal:
    'One account for your daily spending, another for your savings, a physical and virtual card that actually works, and group contributions that track themselves.',
  announcementTicker:
    '⚡ CBN Approved Dual-SIM Apex POS Batch 2 Now Dispatching Nationwide. Instant Settlement Enabled.',
  announcementActive: true,
  ctaTextPrimary: 'Get the app',
  ctaTextSecondary: 'Start on WhatsApp',
  trustLine: COMPANY_INFO.trustLine,
  pageHeroes: {
    personal: {
      tag: 'Personal',
      headline: 'Your Everyday Money, Finally In One Place.',
      subheadline:
        'One account for your daily spending, another for your savings, a physical and virtual card that actually works, and group contributions that track themselves.',
      cta_primary: 'Get the app',
      cta_secondary: 'Start on WhatsApp',
      route: '/personal',
    },
    business: {
      tag: 'Business',
      headline: 'The Business Account Built for the Way Nigeria Trades.',
      subheadline:
        'Separate store funds from personal cash, assign staff sub-accounts with strict spending limits, and clear POS payments into your balance with zero network lag.',
      cta_primary: 'Open Business Account',
      cta_secondary: 'Start on WhatsApp',
      route: '/business',
    },
    payouts: {
      tag: 'Business',
      headline: 'Pay Everyone at Once. From One File.',
      subheadline:
        'Upload a list, fix the rows that fail, and send the rest. On the account you already have.',
      cta_primary: 'Get the app',
      cta_secondary: 'Start on WhatsApp',
      route: '/payouts',
    },
    cards: {
      tag: 'Cards',
      headline: 'The Card That Actually Works When You Need It.',
      subheadline:
        'A physical card for Lagos traffic and POS withdrawals, virtual naira for local subscriptions, and dollar cards that never decline on Spotify, Apple, or AWS.',
      cta_primary: 'Request Card',
      cta_secondary: 'Start on WhatsApp',
      route: '/cards',
    },
    savings: {
      tag: 'Savings',
      headline: 'Save With Purpose. Earn Without Surprises.',
      subheadline:
        'Lock funds away for up to 14% p.a., run digital thrift circles with friends, and grow your emergency buffer without hidden account maintenance fees.',
      cta_primary: 'Start Saving Today',
      cta_secondary: 'Start on WhatsApp',
      route: '/savings',
    },
    pricing: {
      tag: 'Pricing',
      headline: 'What a Run Costs.',
      subheadline:
        'Bulk transfers are priced per recipient, not per batch. The figures are not set yet.',
      cta_primary: 'Get the app',
      cta_secondary: 'Start on WhatsApp',
      route: '/pricing',
    },
    security: {
      tag: 'Security',
      headline: 'You Always Know Where Your Money Is.',
      subheadline:
        'Every payment is approved by you. Every failure says whether you were charged.',
      cta_primary: 'Get the app',
      cta_secondary: 'Start on WhatsApp',
      route: '/security',
    },
    fees: {
      tag: 'Fees',
      headline: "What You Pay. What You Don't.",
      subheadline:
        'No hidden maintenance, no mysterious SMS alert charges, and zero surprise debits. Every fee is stated in plain numbers before you confirm.',
      cta_primary: 'View Fee Breakdown',
      cta_secondary: 'Start on WhatsApp',
      route: '/fees',
    },
    help: {
      tag: 'Help',
      headline: 'Need a Hand?',
      subheadline:
        'Search for the thing you are stuck on, or start a chat in the app.',
      cta_primary: 'Live Chat',
      cta_secondary: 'WhatsApp Support',
      route: '/help',
    },
    about: {
      tag: 'About',
      headline: 'Built from Lagos. For the Way Africans Move Money.',
      subheadline:
        "Axoora was created because moving money in Africa shouldn't feel like a daily battle with network timeouts, hidden deductions, and unresponsive support queues.",
      cta_primary: 'Read Our Mission',
      cta_secondary: 'Join the Team',
      route: '/about',
    },
  },
};

export const DEFAULT_STEPS: AdminStepItem[] = [
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
    id: 'merch-1',
    name: 'Fatima Al-Hassan',
    role: 'Founder, Zaynab Couture',
    location: 'Wuse II, Abuja',
    image: '/merchants/fatima.jpg',
    quote:
      'We run couture and wholesale fabrics. Getting settlement while the client is still adjusting their scarf inside the showroom completely changed how my cashiers manage busy Friday crowds.',
    statLabel: 'Transfer Confirmation',
    statValue: '<1.2s',
    accentColor: '#00DF8F',
    badge: 'Dual-SIM Apex POS',
    featured: true,
  },
  {
    id: 'merch-2',
    name: 'Emeka Chukwu',
    role: 'Distributor, Emeka Gadgets',
    location: 'Computer Village, Lagos',
    image: '/merchants/emeka.jpg',
    quote:
      'During network blackouts in Ikeja, other POS machines start blinking red and declining payments. Axoora switches from MTN to Airtel eSIM automatically without rebooting.',
    statLabel: 'Terminal Uptime',
    statValue: '99.98%',
    accentColor: '#0D95FE',
    badge: 'Automated Failover',
    featured: true,
  },
  {
    id: 'merch-3',
    name: 'Bilkisu Mohammed',
    role: 'Wholesale Grains Merchant',
    location: 'Dawanau Market, Kano',
    image: '/merchants/bilkisu.jpg',
    quote:
      'I send daily sales directly into my Halal Safe vault on WhatsApp. The fact that Axoora operates strictly on zero-interest principles aligns directly with how we trade in the north.',
    statLabel: 'Halal Savings Stored',
    statValue: '₦18.4M+',
    accentColor: '#F2A93B',
    badge: 'Non-Interest Safe',
    featured: true,
  },
  {
    id: 'merch-4',
    name: 'Tunde Bakare',
    role: 'Operations Manager, Fresh Mart',
    location: 'Lekki Phase 1, Lagos',
    image: '/merchants/tunde.jpg',
    quote:
      'Our evening reconciliation used to take 2 hours. With Axoora multi-till accounts, every cashier has their own sub-account and daily totals balance automatically at 9 PM.',
    statLabel: 'Reconciliation Time',
    statValue: '0 mins',
    accentColor: '#0D95FE',
    badge: 'Multi-Till Settlement',
    featured: false,
  },
];

const DEFAULT_PRODUCTS: AdminProductItem[] = [
  {
    id: 'prod-personal',
    name: 'Personal Banking',
    category: 'personal',
    headline: 'Your AI financial concierge on WhatsApp and mobile.',
    feeStructure: 'Free transfers • Zero card maintenance • Halal vaults',
    status: 'active',
    highlight: 'Zero transfer fees on all NIBSS bank transfers forever.',
    description:
      'Clean personal accounts with instant NUBAN, virtual cards, bill payments, and smart WhatsApp banking.',
  },
  {
    id: 'prod-business',
    name: 'Business Accounts',
    category: 'business',
    headline: 'Multi-till business banking with sub-second settlement.',
    feeStructure: 'Instant settlement • Multi-cashier roles • Zero stamp duty',
    status: 'active',
    highlight: 'Dedicated corporate NUBAN ready in under 5 minutes.',
    description:
      'Enterprise and SME accounts with multi-user permissions, automated reconciliation, and instant payouts.',
  },
  {
    id: 'prod-pos',
    name: 'Apex Dual-SIM POS',
    category: 'pos',
    headline: 'Android 12 smart POS with automated telecom failover.',
    feeStructure: '0.5% capped fee • Free paper rolls • 48hr delivery',
    status: 'active',
    highlight: 'Auto-switches between MTN & Airtel eSIMs in 400ms.',
    description:
      'Sovereign hardware designed for rugged Nigerian street conditions, featuring all-day battery life.',
  },
  {
    id: 'prod-capital',
    name: 'Non-Interest Financing',
    category: 'capital',
    headline: 'Murabaha inventory financing without compound interest.',
    feeStructure: 'Cost-plus transparent margin • 0% compounding interest',
    status: 'coming-soon',
    highlight: 'CBN approved Islamic financing framework.',
    description:
      'Stock your shelves for seasonal demand with upfront transparent markups and zero interest compounding.',
  },
];

// Helper to load cached state from localStorage in browser environment
function loadInitialState(): ContentState {
  if (typeof window === 'undefined') {
    return {
      hero: DEFAULT_HERO,
      steps: DEFAULT_STEPS,
      merchants: DEFAULT_MERCHANTS,
      articles: JOURNAL_ARTICLES,
      products: DEFAULT_PRODUCTS,
      faqs: FAQ_LIST,
      loading: false,
      error: null,
    };
  }

  try {
    const hero = localStorage.getItem('axoora_cms_hero');
    const steps = localStorage.getItem('axoora_cms_steps');
    const merchants = localStorage.getItem('axoora_cms_merchants');
    const articles = localStorage.getItem('axoora_cms_articles');
    const products = localStorage.getItem('axoora_cms_products');
    const faqs = localStorage.getItem('axoora_cms_faqs');

    return {
      hero: hero ? { ...DEFAULT_HERO, ...JSON.parse(hero) } : DEFAULT_HERO,
      steps: steps ? JSON.parse(steps) : DEFAULT_STEPS,
      merchants: merchants ? JSON.parse(merchants) : DEFAULT_MERCHANTS,
      articles: articles ? JSON.parse(articles) : JOURNAL_ARTICLES,
      products: products ? JSON.parse(products) : DEFAULT_PRODUCTS,
      faqs: faqs ? JSON.parse(faqs) : FAQ_LIST,
      loading: false,
      error: null,
    };
  } catch {
    return {
      hero: DEFAULT_HERO,
      steps: DEFAULT_STEPS,
      merchants: DEFAULT_MERCHANTS,
      articles: JOURNAL_ARTICLES,
      products: DEFAULT_PRODUCTS,
      faqs: FAQ_LIST,
      loading: false,
      error: null,
    };
  }
}

// Async Thunk: Fetch Articles from Backend
export const fetchBackendArticlesThunk = createAsyncThunk<
  JournalArticle[],
  void,
  { rejectValue: string }
>('content/fetchBackendArticles', async (_, { rejectWithValue }) => {
  try {
    const res = await contentApi.getArticles({ include_drafts: true });
    if (res && Array.isArray(res.results) && res.results.length > 0) {
      return res.results.map((a: JournalArticleApi) => ({
        id: a.id,
        category: a.category,
        title: a.title,
        summary: a.summary,
        content: a.content,
        readTime: a.read_time,
        date: a.published_date,
        author: a.author,
        slug: a.slug,
      }));
    }
    return [];
  } catch (err: any) {
    return rejectWithValue(err?.message || 'Failed to sync backend articles');
  }
});

// Async Thunk: Fetch Hero, Onboarding Steps, Stories, Products, and Articles in 1 Bootstrap Call
export const fetchBackendCmsThunk = createAsyncThunk<
  {
    hero: AdminHeroConfig | null;
    steps: AdminStepItem[] | null;
    merchants: AdminMerchantItem[];
    products: AdminProductItem[];
    articles: JournalArticle[];
    faqs: FaqItem[];
  },
  void,
  { rejectValue: string }
>('content/fetchBackendCms', async (_, { rejectWithValue }) => {
  try {
    const data = await contentApi.getBootstrap(true);

    let hero: AdminHeroConfig | null = null;
    let steps: AdminStepItem[] | null = null;
    if (data?.hero?.headline_business) {
      const h: HeroConfigApi = data.hero;
      hero = {
        headlineBusiness: h.headline_business,
        subheadlineBusiness: h.subheadline_business,
        headlinePersonal: h.headline_personal,
        subheadlinePersonal: h.subheadline_personal,
        announcementTicker: h.announcement_ticker,
        announcementActive: h.announcement_active,
        ctaTextPrimary: h.cta_text_primary,
        ctaTextSecondary: h.cta_text_secondary,
        trustLine: h.trust_line,
        pageHeroes: (h.page_heroes as any) || DEFAULT_HERO.pageHeroes,
      };
      if (
        Array.isArray(h.onboarding_steps) &&
        h.onboarding_steps.length > 0 &&
        typeof (h.onboarding_steps[0] as any)?.num === 'number'
      ) {
        steps = h.onboarding_steps as AdminStepItem[];
      }
    }

    const merchants: AdminMerchantItem[] = Array.isArray(data?.stories)
      ? data.stories.map((m: MerchantStoryApi) => ({
          id: m.id,
          name: m.name,
          role: m.role,
          location: m.location,
          image: m.image_url || '/merchants/bilkisu.jpg',
          quote: m.quote,
          statLabel: m.stat_label,
          statValue: m.stat_value,
          accentColor: m.accent_color || '#00DF8F',
          badge: m.badge || 'Verified Merchant',
          featured: m.featured,
        }))
      : [];

    const products: AdminProductItem[] = Array.isArray(data?.products)
      ? data.products.map((p: ProductItemApi) => ({
          id: p.id,
          name: p.name,
          category: p.category === 'hardware' ? 'pos' : p.category,
          headline: p.headline,
          feeStructure: p.fee_structure,
          status: p.status === 'Active' ? 'active' : p.status === 'Pilot' ? 'beta' : 'coming-soon',
          highlight: p.highlight,
          description: p.description,
        }))
      : [];

    const articles: JournalArticle[] = Array.isArray(data?.articles)
      ? data.articles.map((a: JournalArticleApi) => ({
          id: a.id,
          category: a.category,
          title: a.title,
          summary: a.summary,
          content: a.content,
          readTime: a.read_time,
          date: a.published_date,
          author: a.author,
          slug: a.slug,
        }))
      : [];

    const faqs: FaqItem[] = Array.isArray(data?.faqs) && data.faqs.length > 0
      ? data.faqs.map((f: FaqItemApi) => ({
          id: f.id,
          question: f.question,
          answer: f.answer,
          category: f.category,
          order: f.order,
          isActive: f.is_active,
        }))
      : [];

    return { hero, steps, merchants, products, articles, faqs };
  } catch (err: any) {
    return rejectWithValue(err?.message || 'Failed to sync backend CMS');
  }
});

export const contentSlice = createSlice({
  name: 'content',
  initialState: loadInitialState(),
  reducers: {
    updateHero: (state, action: PayloadAction<Partial<AdminHeroConfig>>) => {
      state.hero = { ...state.hero, ...action.payload };
      if (typeof window !== 'undefined') {
        localStorage.setItem('axoora_cms_hero', JSON.stringify(state.hero));
      }
    },
    updateStep: (
      state,
      action: PayloadAction<{ num: number; patch: Partial<AdminStepItem> }>
    ) => {
      state.steps = state.steps.map((s) =>
        s.num === action.payload.num ? { ...s, ...action.payload.patch } : s
      );
      if (typeof window !== 'undefined') {
        localStorage.setItem('axoora_cms_steps', JSON.stringify(state.steps));
      }
    },
    resetSteps: (state) => {
      state.steps = DEFAULT_STEPS;
      if (typeof window !== 'undefined') {
        localStorage.setItem('axoora_cms_steps', JSON.stringify(DEFAULT_STEPS));
      }
    },
    addMerchant: (state, action: PayloadAction<AdminMerchantItem>) => {
      state.merchants.unshift(action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('axoora_cms_merchants', JSON.stringify(state.merchants));
      }
    },
    updateMerchant: (
      state,
      action: PayloadAction<{ id: string; patch: Partial<AdminMerchantItem> }>
    ) => {
      state.merchants = state.merchants.map((m) =>
        m.id === action.payload.id ? { ...m, ...action.payload.patch } : m
      );
      if (typeof window !== 'undefined') {
        localStorage.setItem('axoora_cms_merchants', JSON.stringify(state.merchants));
      }
    },
    deleteMerchant: (state, action: PayloadAction<string>) => {
      state.merchants = state.merchants.filter((m) => m.id !== action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('axoora_cms_merchants', JSON.stringify(state.merchants));
      }
    },
    addArticle: (state, action: PayloadAction<JournalArticle>) => {
      state.articles.unshift(action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('axoora_cms_articles', JSON.stringify(state.articles));
      }
    },
    updateArticle: (
      state,
      action: PayloadAction<{ id: string; patch: Partial<JournalArticle> }>
    ) => {
      state.articles = state.articles.map((a) =>
        a.id === action.payload.id ? { ...a, ...action.payload.patch } : a
      );
      if (typeof window !== 'undefined') {
        localStorage.setItem('axoora_cms_articles', JSON.stringify(state.articles));
      }
    },
    deleteArticle: (state, action: PayloadAction<string>) => {
      state.articles = state.articles.filter((a) => a.id !== action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('axoora_cms_articles', JSON.stringify(state.articles));
      }
    },
    addProduct: (state, action: PayloadAction<AdminProductItem>) => {
      state.products.push(action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('axoora_cms_products', JSON.stringify(state.products));
      }
    },
    updateProduct: (
      state,
      action: PayloadAction<{ id: string; patch: Partial<AdminProductItem> }>
    ) => {
      state.products = state.products.map((p) =>
        p.id === action.payload.id ? { ...p, ...action.payload.patch } : p
      );
      if (typeof window !== 'undefined') {
        localStorage.setItem('axoora_cms_products', JSON.stringify(state.products));
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('axoora_cms_products', JSON.stringify(state.products));
      }
    },
    addFaq: (state, action: PayloadAction<FaqItem>) => {
      state.faqs.unshift(action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('axoora_cms_faqs', JSON.stringify(state.faqs));
      }
    },
    updateFaq: (
      state,
      action: PayloadAction<{ id: string; patch: Partial<FaqItem> }>
    ) => {
      state.faqs = state.faqs.map((f) =>
        f.id === action.payload.id || f.question === action.payload.id
          ? { ...f, ...action.payload.patch }
          : f
      );
      if (typeof window !== 'undefined') {
        localStorage.setItem('axoora_cms_faqs', JSON.stringify(state.faqs));
      }
    },
    deleteFaq: (state, action: PayloadAction<string>) => {
      state.faqs = state.faqs.filter(
        (f) => f.id !== action.payload && f.question !== action.payload
      );
      if (typeof window !== 'undefined') {
        localStorage.setItem('axoora_cms_faqs', JSON.stringify(state.faqs));
      }
    },
    setFaqs: (state, action: PayloadAction<FaqItem[]>) => {
      state.faqs = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('axoora_cms_faqs', JSON.stringify(state.faqs));
      }
    },
    resetAllContent: (state) => {
      state.hero = DEFAULT_HERO;
      state.steps = DEFAULT_STEPS;
      state.merchants = DEFAULT_MERCHANTS;
      state.articles = JOURNAL_ARTICLES;
      state.products = DEFAULT_PRODUCTS;
      state.faqs = FAQ_LIST;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('axoora_cms_hero');
        localStorage.removeItem('axoora_cms_steps');
        localStorage.removeItem('axoora_cms_merchants');
        localStorage.removeItem('axoora_cms_articles');
        localStorage.removeItem('axoora_cms_products');
        localStorage.removeItem('axoora_cms_faqs');
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBackendArticlesThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBackendArticlesThunk.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.length > 0) {
        state.articles = action.payload;
        if (typeof window !== 'undefined') {
          localStorage.setItem('axoora_cms_articles', JSON.stringify(state.articles));
        }
      }
    });
    builder.addCase(fetchBackendArticlesThunk.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchBackendCmsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBackendCmsThunk.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.hero) {
        state.hero = action.payload.hero;
        if (typeof window !== 'undefined') {
          localStorage.setItem('axoora_cms_hero', JSON.stringify(state.hero));
        }
      }
      if (action.payload.steps && action.payload.steps.length > 0) {
        state.steps = action.payload.steps;
        if (typeof window !== 'undefined') {
          localStorage.setItem('axoora_cms_steps', JSON.stringify(state.steps));
        }
      }
      if (action.payload.merchants.length > 0) {
        state.merchants = action.payload.merchants;
        if (typeof window !== 'undefined') {
          localStorage.setItem('axoora_cms_merchants', JSON.stringify(state.merchants));
        }
      }
      if (action.payload.products.length > 0) {
        state.products = action.payload.products;
        if (typeof window !== 'undefined') {
          localStorage.setItem('axoora_cms_products', JSON.stringify(state.products));
        }
      }
      if (action.payload.articles.length > 0) {
        state.articles = action.payload.articles;
        if (typeof window !== 'undefined') {
          localStorage.setItem('axoora_cms_articles', JSON.stringify(state.articles));
        }
      }
      if (action.payload.faqs && action.payload.faqs.length > 0) {
        state.faqs = action.payload.faqs;
        if (typeof window !== 'undefined') {
          localStorage.setItem('axoora_cms_faqs', JSON.stringify(state.faqs));
        }
      }
    });
    builder.addCase(fetchBackendCmsThunk.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const {
  updateHero,
  updateStep,
  resetSteps,
  addMerchant,
  updateMerchant,
  deleteMerchant,
  addArticle,
  updateArticle,
  deleteArticle,
  addProduct,
  updateProduct,
  deleteProduct,
  addFaq,
  updateFaq,
  deleteFaq,
  setFaqs,
  resetAllContent,
} = contentSlice.actions;

export default contentSlice.reducer;
