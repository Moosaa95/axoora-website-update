'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { JournalArticle } from '../types';
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
  addProduct: (product: AdminProductItem) => void;
  updateProduct: (id: string, patch: Partial<AdminProductItem>) => void;
  deleteProduct: (id: string) => void;
  resetAllCmsData: () => void;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { hero, steps, merchants, articles, products } = useAppSelector((state) => state.content);
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
  };

  const updateArticle = (id: string, patch: Partial<JournalArticle>) => {
    dispatch(updateArticleAction({ id, patch }));
  };

  const deleteArticle = (id: string) => {
    dispatch(deleteArticleAction(id));
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
