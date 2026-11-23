'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { JournalArticle, FaqItem } from '../types';
import { useAppDispatch, useAppSelector } from '../store';
import {
  DEFAULT_STEPS,
  updateHero as updateHeroAction,
  updateStep as updateStepAction,
  resetSteps as resetStepsAction,
  addMerchant as addMerchantAction,
  updateMerchant as updateMerchantAction,
  deleteMerchant as deleteMerchantAction,
  addArticle as addArticleAction,
  updateArticle as updateArticleAction,
  deleteArticle as deleteArticleAction,
  addProduct as addProductAction,
  updateProduct as updateProductAction,
  deleteProduct as deleteProductAction,
  addFaq as addFaqAction,
  updateFaq as updateFaqAction,
  deleteFaq as deleteFaqAction,
  resetAllContent as resetAllContentAction,
  fetchBackendCmsThunk,
} from '../store/slices/contentSlice';
import {
  addLead as addLeadAction,
  updateLeadStatus as updateLeadStatusAction,
  deleteLead as deleteLeadAction,
  fetchBackendLeadsThunk,
} from '../store/slices/waitlistSlice';
import { contentApi, waitlistApi } from '../lib/teamApi';

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

export interface PageHeroItem {
  tag: string;
  headline: string;
  subheadline: string;
  cta_primary?: string;
  cta_secondary?: string;
  route?: string;
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
  pageHeroes?: Record<string, PageHeroItem>;
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
  faqs: FaqItem[];
  addFaq: (faq: FaqItem) => void;
  updateFaq: (id: string, patch: Partial<FaqItem>) => void;
  deleteFaq: (id: string) => void;
  leads: AdminLeadItem[];
  updateLeadStatus: (id: string, status: AdminLeadItem['status']) => void;
  deleteLead: (id: string) => void;
  addLead: (lead: Omit<AdminLeadItem, 'id' | 'submittedAt'>) => void;
  products: AdminProductItem[];
  addProduct: (product: AdminProductItem) => void;
  updateProduct: (id: string, patch: Partial<AdminProductItem>) => void;
  deleteProduct: (id: string) => void;
  resetAllCmsData: () => void;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { hero, steps, merchants, articles, products, faqs } = useAppSelector((state) => state.content);
  const { leads } = useAppSelector((state) => state.waitlist);

  useEffect(() => {
    dispatch(fetchBackendCmsThunk());
    dispatch(fetchBackendLeadsThunk());
  }, [dispatch]);

  const updateHero = (patch: Partial<AdminHeroConfig>) => {
    dispatch(updateHeroAction(patch));
    const merged = { ...hero, ...patch };
    contentApi
      .updateHero({
        headline_business: merged.headlineBusiness,
        subheadline_business: merged.subheadlineBusiness,
        headline_personal: merged.headlinePersonal,
        subheadline_personal: merged.subheadlinePersonal,
        announcement_ticker: merged.announcementTicker,
        announcement_active: merged.announcementActive,
        cta_text_primary: merged.ctaTextPrimary,
        cta_text_secondary: merged.ctaTextSecondary,
        trust_line: merged.trustLine,
        page_heroes: merged.pageHeroes as any,
      })
      .catch(() => {});
  };

  const updateStep = (num: number, patch: Partial<AdminStepItem>) => {
    dispatch(updateStepAction({ num, patch }));
    const nextSteps = steps.map((s) => (s.num === num ? { ...s, ...patch } : s));
    contentApi.updateHero({ onboarding_steps: nextSteps }).catch(() => {});
  };

  const resetSteps = () => {
    dispatch(resetStepsAction());
    contentApi.updateHero({ onboarding_steps: DEFAULT_STEPS }).catch(() => {});
  };

  const addMerchant = (merchant: AdminMerchantItem) => {
    dispatch(addMerchantAction(merchant));
    contentApi
      .createStory({
        name: merchant.name,
        role: merchant.role,
        location: merchant.location,
        quote: merchant.quote,
        stat_label: merchant.statLabel,
        stat_value: merchant.statValue,
        badge: merchant.badge,
        accent_color: merchant.accentColor,
        image_url: merchant.image,
        featured: merchant.featured,
      })
      .then((res) => {
        if (res?.data?.id && res.data.id !== merchant.id) {
          dispatch(updateMerchantAction({ id: merchant.id, patch: { id: res.data.id } }));
        }
      })
      .catch(() => {});
  };

  const updateMerchant = (id: string, patch: Partial<AdminMerchantItem>) => {
    dispatch(updateMerchantAction({ id, patch }));
    const current = merchants.find((m) => m.id === id);
    const merged = current ? { ...current, ...patch } : patch;
    contentApi
      .updateStory(id, {
        ...(merged.name !== undefined ? { name: merged.name } : {}),
        ...(merged.role !== undefined ? { role: merged.role } : {}),
        ...(merged.location !== undefined ? { location: merged.location } : {}),
        ...(merged.quote !== undefined ? { quote: merged.quote } : {}),
        ...(merged.statLabel !== undefined ? { stat_label: merged.statLabel } : {}),
        ...(merged.statValue !== undefined ? { stat_value: merged.statValue } : {}),
        ...(merged.badge !== undefined ? { badge: merged.badge } : {}),
        ...(merged.accentColor !== undefined ? { accent_color: merged.accentColor } : {}),
        ...(merged.image !== undefined ? { image_url: merged.image } : {}),
        ...(merged.featured !== undefined ? { featured: merged.featured } : {}),
      })
      .then((res) => {
        if (res?.data?.id && res.data.id !== id) {
          dispatch(updateMerchantAction({ id, patch: { id: res.data.id } }));
        }
      })
      .catch(() => {});
  };

  const deleteMerchant = (id: string) => {
    const target = merchants.find((m) => m.id === id);
    dispatch(deleteMerchantAction(id));
    contentApi.deleteStory(id).catch(() => {
      if (target?.name) {
        contentApi.deleteStory(target.name).catch(() => {});
      }
    });
  };

  const addArticle = (article: JournalArticle) => {
    dispatch(addArticleAction(article));
    contentApi
      .createArticle({
        title: article.title,
        category: article.category,
        summary: article.summary,
        content: article.content || '',
        author: article.author || 'Axoora Editorial Board',
        read_time: article.readTime || '4 min read',
        published_date: article.date || 'Oct 2026',
        is_published: true,
      })
      .then((res) => {
        if (res?.data?.id && res.data.id !== article.id) {
          dispatch(
            updateArticleAction({
              id: article.id,
              patch: { id: res.data.id, slug: res.data.slug },
            })
          );
        }
      })
      .catch((err) => {
        console.warn('Failed to persist article to backend API, cached locally:', err);
      });
  };

  const updateArticle = (id: string, patch: Partial<JournalArticle>) => {
    dispatch(updateArticleAction({ id, patch }));
    const current = articles.find((a) => a.id === id);
    const merged = current ? { ...current, ...patch } : patch;
    const slugOrId = (merged as any).slug || id;
    contentApi
      .updateArticle(slugOrId, {
        ...(merged.title !== undefined ? { title: merged.title } : {}),
        ...(merged.category !== undefined ? { category: merged.category } : {}),
        ...(merged.summary !== undefined ? { summary: merged.summary } : {}),
        ...(merged.content !== undefined ? { content: merged.content } : {}),
        ...(merged.author !== undefined ? { author: merged.author } : {}),
        ...(merged.readTime !== undefined ? { read_time: merged.readTime } : {}),
        ...(merged.date !== undefined ? { published_date: merged.date } : {}),
      })
      .then((res) => {
        if (res?.data?.slug && res.data.slug !== (merged as any).slug) {
          dispatch(updateArticleAction({ id, patch: { slug: res.data.slug } }));
        }
      })
      .catch((err) => {
        console.warn('Failed to update article on backend API, cached locally:', err);
      });
  };

  const deleteArticle = (id: string) => {
    const target = articles.find((a) => a.id === id);
    const slugOrId = (target as any)?.slug || id;
    dispatch(deleteArticleAction(id));
    contentApi.deleteArticle(slugOrId).catch((err) => {
      console.warn('Failed to delete article on backend API, removed locally:', err);
    });
  };

  const addFaq = (faq: FaqItem) => {
    dispatch(addFaqAction(faq));
    contentApi
      .createFaq({
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
        order: faq.order || 0,
        is_active: faq.isActive !== undefined ? faq.isActive : true,
      })
      .then((res) => {
        if (res?.data?.id && res.data.id !== faq.id) {
          dispatch(
            updateFaqAction({
              id: faq.id || faq.question,
              patch: { id: res.data.id },
            })
          );
        }
      })
      .catch((err) => {
        console.warn('Failed to create FAQ on backend API, cached locally:', err);
      });
  };

  const updateFaq = (id: string, patch: Partial<FaqItem>) => {
    dispatch(updateFaqAction({ id, patch }));
    const current = faqs.find((f) => f.id === id || f.question === id);
    const merged = current ? { ...current, ...patch } : patch;
    const faqId = current?.id || id;
    contentApi
      .updateFaq(faqId, {
        ...(merged.question !== undefined ? { question: merged.question } : {}),
        ...(merged.answer !== undefined ? { answer: merged.answer } : {}),
        ...(merged.category !== undefined ? { category: merged.category } : {}),
        ...(merged.order !== undefined ? { order: merged.order } : {}),
        ...(merged.isActive !== undefined ? { is_active: merged.isActive } : {}),
      })
      .catch((err) => {
        console.warn('Failed to update FAQ on backend API, cached locally:', err);
      });
  };

  const deleteFaq = (id: string) => {
    const target = faqs.find((f) => f.id === id || f.question === id);
    const faqId = target?.id || id;
    dispatch(deleteFaqAction(id));
    contentApi.deleteFaq(faqId).catch((err) => {
      console.warn('Failed to delete FAQ on backend API, removed locally:', err);
    });
  };

  const updateLeadStatus = (id: string, status: AdminLeadItem['status']) => {
    dispatch(updateLeadStatusAction({ id, status }));
    const backendStatus =
      status === 'approved'
        ? 'onboarded'
        : status === 'dispatched'
        ? 'archived'
        : status;
    waitlistApi.updateLead(id, { status: backendStatus }).catch(() => {});
  };

  const deleteLead = (id: string) => {
    dispatch(deleteLeadAction(id));
    waitlistApi.deleteLead(id).catch(() => {});
  };

  const addLead = (leadData: Omit<AdminLeadItem, 'id' | 'submittedAt'>) => {
    dispatch(addLeadAction(leadData));
  };

  const addProduct = (product: AdminProductItem) => {
    dispatch(addProductAction(product));
    contentApi
      .createProduct({
        name: product.name,
        category: product.category === 'pos' ? 'hardware' : product.category === 'capital' ? 'business' : product.category,
        headline: product.headline,
        fee_structure: product.feeStructure,
        status: product.status === 'active' ? 'Active' : product.status === 'beta' ? 'Pilot' : 'Waitlist',
        highlight: product.highlight,
        description: product.description,
      })
      .then((res) => {
        if (res?.data?.id && res.data.id !== product.id) {
          dispatch(updateProductAction({ id: product.id, patch: { id: res.data.id } }));
        }
      })
      .catch(() => {});
  };

  const updateProduct = (id: string, patch: Partial<AdminProductItem>) => {
    dispatch(updateProductAction({ id, patch }));
    const current = products.find((p) => p.id === id);
    const merged = current ? { ...current, ...patch } : patch;
    contentApi
      .updateProduct(id, {
        ...(merged.name !== undefined ? { name: merged.name } : {}),
        ...(merged.category !== undefined
          ? { category: merged.category === 'pos' ? 'hardware' : merged.category === 'capital' ? 'business' : merged.category }
          : {}),
        ...(merged.headline !== undefined ? { headline: merged.headline } : {}),
        ...(merged.feeStructure !== undefined ? { fee_structure: merged.feeStructure } : {}),
        ...(merged.status !== undefined
          ? { status: merged.status === 'active' ? 'Active' : merged.status === 'beta' ? 'Pilot' : 'Waitlist' }
          : {}),
        ...(merged.highlight !== undefined ? { highlight: merged.highlight } : {}),
        ...(merged.description !== undefined ? { description: merged.description } : {}),
      })
      .then((res) => {
        if (res?.data?.id && res.data.id !== id) {
          dispatch(updateProductAction({ id, patch: { id: res.data.id } }));
        }
      })
      .catch(() => {});
  };

  const deleteProduct = (id: string) => {
    const target = products.find((p) => p.id === id);
    dispatch(deleteProductAction(id));
    contentApi.deleteProduct(id).catch(() => {
      if (target?.name) {
        contentApi.deleteProduct(target.name).catch(() => {});
      }
    });
  };

  const resetAllCmsData = () => {
    dispatch(resetAllContentAction());
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
        faqs,
        addFaq,
        updateFaq,
        deleteFaq,
        leads,
        updateLeadStatus,
        deleteLead,
        addLead,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
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
