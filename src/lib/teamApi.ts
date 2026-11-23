/**
 * Team Management API client
 * Connects to /api/v1/team/ backend endpoints for authentication,
 * role management, and team member directory.
 */

export const getApiBase = (): string => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, '');
  }
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host && !host.includes('localhost') && !host.includes('127.0.0.1')) {
      return 'https://axoora-backend.onrender.com';
    }
  }
  if (process.env.NODE_ENV === 'production') {
    return 'https://axoora-backend.onrender.com';
  }
  return 'http://localhost:8000';
};

const API_BASE = getApiBase();
const TEAM_API = `${API_BASE}/api/v1/team`;

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TeamRole {
  id: string;
  name: string;
  slug: string;
  description: string;
  permissions: string[];
  is_system: boolean;
  member_count: number;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  email: string;
  full_name: string;
  username: string;
  job_title: string;
  phone_number: string;
  department: string;
  status: 'active' | 'inactive' | 'suspended' | 'invited';
  role: TeamRole | null;
  custom_permissions?: string[];
  effective_permissions: string[];
  has_accepted?: boolean;
  last_login?: string | null;
  created_at: string;
  updated_at: string;
}

export interface PermissionGroup {
  group: string;
  permissions: Array<{
    id: string;
    label: string;
    description: string;
  }>;
}

export interface LoginResponse {
  success?: boolean;
  authenticated?: boolean;
  user: TeamMember | null;       // Backend serializes the TeamMember profile as 'user'
  permissions: string[];
  message?: string;
}

export interface ApiError {
  detail?: string;
  non_field_errors?: string[];
  [key: string]: unknown;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getCsrfToken(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/(?:^|;\s*)csrftoken=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const csrfToken = getCsrfToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };
  if (csrfToken) {
    headers['X-CSRFToken'] = csrfToken;
  }

  const base = getApiBase();
  const res = await fetch(`${base}/api/v1/team${path}`, {
    credentials: 'include',
    headers,
    ...options,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw data as ApiError;
  }

  return data as T;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export const teamAuth = {
  login: (username: string, password: string) =>
    apiFetch<LoginResponse>('/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),

  me: async () => {
    const data = await apiFetch<LoginResponse>('/auth/me/');
    // The /me endpoint returns 200 even for anonymous users
    if (data.authenticated === false) {
      throw new Error('Not authenticated');
    }
    return data;
  },

  logout: () => apiFetch<{ success: boolean }>('/auth/logout/', { method: 'POST' }),

  changePassword: (old_password: string, new_password: string) =>
    apiFetch<{ success: boolean; message: string }>('/auth/change-password/', {
      method: 'POST',
      body: JSON.stringify({ old_password, new_password }),
    }),
};

// ─── Permissions ──────────────────────────────────────────────────────────────

export const teamPermissions = {
  getAll: async () => {
    const res = await apiFetch<any>('/permissions/');
    if (res && Array.isArray(res.permissions)) {
      return res as { permissions: PermissionGroup[] };
    }
    return { permissions: [] };
  },
};

// ─── Roles ────────────────────────────────────────────────────────────────────

export const teamRoles = {
  getAll: async () => {
    const res = await apiFetch<any>('/roles/');
    if (Array.isArray(res)) {
      return { count: res.length, results: res as TeamRole[] };
    }
    return res as { count: number; results: TeamRole[] };
  },

  create: (data: { name: string; description?: string; permissions?: string[] }) =>
    apiFetch<{ success: boolean; data: TeamRole }>('/roles/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (
    id: string,
    data: { name?: string; description?: string; permissions?: string[] }
  ) =>
    apiFetch<{ success: boolean; data: TeamRole }>(`/roles/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiFetch<{ success: boolean }>(`/roles/${id}/`, { method: 'DELETE' }),
};

// ─── Team Members ─────────────────────────────────────────────────────────────

export const teamMembers = {
  getAll: (params?: { search?: string; role_id?: string; status?: string }) => {
    const qs = new URLSearchParams();
    if (params?.search) qs.set('search', params.search);
    if (params?.role_id) qs.set('role_id', params.role_id);
    if (params?.status) qs.set('status', params.status);
    const query = qs.toString() ? `?${qs.toString()}` : '';
    return apiFetch<{ count: number; results: TeamMember[] }>(`/members/${query}`);
  },

  create: (data: {
    full_name: string;
    email: string;
    role_id?: string;
    job_title?: string;
    phone_number?: string;
    department?: string;
    password?: string;
  }) =>
    apiFetch<{ success: boolean; data: TeamMember; generated_password?: string; email_sent?: boolean }>('/members/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (
    id: string,
    data: {
      full_name?: string;
      email?: string;
      role_id?: string;
      job_title?: string;
      phone_number?: string;
      department?: string;
      status?: string;
      password?: string;
      custom_permissions?: string[];
    }
  ) =>
    apiFetch<{ success: boolean; data: TeamMember }>(`/members/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiFetch<{ success: boolean }>(`/members/${id}/`, { method: 'DELETE' }),

  resetPassword: (id: string, new_password?: string) =>
    apiFetch<{ success: boolean; message: string; new_password: string; email_sent: boolean }>(
      `/members/${id}/reset-password/`,
      {
        method: 'POST',
        body: JSON.stringify(new_password ? { new_password } : {}),
      }
    ),

  resendInvite: (id: string) =>
    apiFetch<{ success: boolean; message: string; temporary_password: string; email_sent: boolean }>(
      `/members/${id}/resend-invite/`,
      { method: 'POST' }
    ),
};

// ─── Content / Articles / Hero / Stories / Products API ──────────────────────

const CONTENT_API = `${getApiBase()}/api/v1/content`;
const WAITLIST_API = `${getApiBase()}/api/v1/waitlist`;

export interface HeroConfigApi {
  id?: string;
  headline_business: string;
  subheadline_business: string;
  headline_personal: string;
  subheadline_personal: string;
  announcement_ticker: string;
  announcement_active: boolean;
  cta_text_primary: string;
  cta_text_secondary: string;
  trust_line: string;
  onboarding_steps?: unknown[];
  page_heroes?: Record<string, {
    tag: string;
    headline: string;
    subheadline: string;
    cta_primary?: string;
    cta_secondary?: string;
    route?: string;
  }>;
  updated_at?: string;
}

export interface ContentBootstrapApi {
  hero: HeroConfigApi;
  stories: MerchantStoryApi[];
  products: ProductItemApi[];
  articles: JournalArticleApi[];
  faqs?: FaqItemApi[];
}

export interface FaqItemApi {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface JournalArticleApi {
  id: string;
  title: string;
  summary: string;
  category: string;
  content: string;
  author: string;
  read_time: string;
  published_date: string;
  is_published: boolean;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface MerchantStoryApi {
  id: string;
  name: string;
  role: string;
  location: string;
  quote: string;
  stat_label: string;
  stat_value: string;
  badge: string;
  accent_color: string;
  image_url: string;
  featured: boolean;
  order: number;
}

export interface ProductItemApi {
  id: string;
  name: string;
  category: 'personal' | 'business' | 'hardware';
  headline: string;
  fee_structure: string;
  status: 'Active' | 'Pilot' | 'Waitlist';
  highlight: string;
  description: string;
  order: number;
}

export interface WaitlistLeadApi {
  id: string;
  reference_id: string;
  application_ref: string;
  tracking_number: string;
  full_name: string;
  whatsapp_number: string;
  email: string;
  city: string;
  state: string;
  business_name: string;
  interest: 'personal' | 'business' | 'pos-agent' | 'aggregator';
  status: 'new' | 'contacted' | 'onboarded' | 'archived';
  notes: string;
  created_at: string;
  updated_at: string;
}

export const contentApi = {
  getBootstrap: (includeDrafts = true) =>
    fetch(`${CONTENT_API}/bootstrap/?include_drafts=${includeDrafts ? 'true' : 'false'}`, {
      credentials: 'include',
    }).then((r) => r.json() as Promise<ContentBootstrapApi>),

  getHero: () =>
    fetch(`${CONTENT_API}/hero/`, { credentials: 'include' }).then((r) =>
      r.json() as Promise<HeroConfigApi>
    ),

  updateHero: (data: Partial<HeroConfigApi>) =>
    fetch(`${CONTENT_API}/hero/`, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((r) => r.json() as Promise<HeroConfigApi>),

  getArticles: (params?: { include_drafts?: boolean; category?: string }) => {
    const qs = new URLSearchParams();
    if (params?.include_drafts) qs.set('include_drafts', 'true');
    if (params?.category) qs.set('category', params.category);
    const query = qs.toString() ? `?${qs.toString()}` : '';
    return fetch(`${CONTENT_API}/articles/${query}`, { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => d as { count: number; results: JournalArticleApi[] });
  },

  createArticle: (data: Partial<JournalArticleApi>) =>
    fetch(`${CONTENT_API}/articles/`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(async (r) => {
      const json = await r.json();
      if (!r.ok) throw json;
      return json;
    }),

  updateArticle: (slug: string, data: Partial<JournalArticleApi>) =>
    fetch(`${CONTENT_API}/articles/${slug}/`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(async (r) => {
      const json = await r.json();
      if (!r.ok) throw json;
      return json;
    }),

  deleteArticle: (slug: string) =>
    fetch(`${CONTENT_API}/articles/${slug}/`, {
      method: 'DELETE',
      credentials: 'include',
    }).then(async (r) => {
      const json = await r.json().catch(() => ({}));
      if (!r.ok) throw json;
      return { success: true };
    }),

  getFaqs: (params?: { include_inactive?: boolean; category?: string; search?: string }) => {
    const qs = new URLSearchParams();
    if (params?.include_inactive) qs.set('include_inactive', 'true');
    if (params?.category && params.category.toLowerCase() !== 'all') qs.set('category', params.category);
    if (params?.search) qs.set('search', params.search);
    const query = qs.toString() ? `?${qs.toString()}` : '';
    return fetch(`${CONTENT_API}/faqs/${query}`, { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => d as { count: number; results: FaqItemApi[] });
  },

  createFaq: (data: Partial<FaqItemApi>) =>
    fetch(`${CONTENT_API}/faqs/`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(async (r) => {
      const json = await r.json();
      if (!r.ok) throw json;
      return json;
    }),

  updateFaq: (id: string, data: Partial<FaqItemApi>) =>
    fetch(`${CONTENT_API}/faqs/${id}/`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(async (r) => {
      const json = await r.json();
      if (!r.ok) throw json;
      return json;
    }),

  deleteFaq: (id: string) =>
    fetch(`${CONTENT_API}/faqs/${id}/`, {
      method: 'DELETE',
      credentials: 'include',
    }).then(async (r) => {
      const json = await r.json().catch(() => ({}));
      if (!r.ok) throw json;
      return { success: true };
    }),

  getStories: () =>
    fetch(`${CONTENT_API}/stories/`, { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => d as { count: number; results: MerchantStoryApi[] }),

  createStory: (data: Partial<MerchantStoryApi>) =>
    fetch(`${CONTENT_API}/stories/`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((r) => r.json()),

  updateStory: (id: string, data: Partial<MerchantStoryApi>) =>
    fetch(`${CONTENT_API}/stories/${id}/`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((r) => r.json()),

  deleteStory: (id: string) =>
    fetch(`${CONTENT_API}/stories/${id}/`, {
      method: 'DELETE',
      credentials: 'include',
    }).then((r) => (r.ok ? { success: true } : r.json())),

  getProducts: () =>
    fetch(`${CONTENT_API}/products/`, { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => d as { count: number; results: ProductItemApi[] }),

  createProduct: (data: Partial<ProductItemApi>) =>
    fetch(`${CONTENT_API}/products/`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((r) => r.json()),

  updateProduct: (id: string, data: Partial<ProductItemApi>) =>
    fetch(`${CONTENT_API}/products/${id}/`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((r) => r.json()),

  deleteProduct: (id: string) =>
    fetch(`${CONTENT_API}/products/${id}/`, {
      method: 'DELETE',
      credentials: 'include',
    }).then((r) => (r.ok ? { success: true } : r.json())),
};

export const waitlistApi = {
  getLeads: (params?: { status?: string; interest?: string; search?: string }) => {
    const qs = new URLSearchParams();
    if (params?.status && params.status !== 'all') qs.set('status', params.status);
    if (params?.interest && params.interest !== 'all') qs.set('interest', params.interest);
    if (params?.search) qs.set('search', params.search);
    const query = qs.toString() ? `?${qs.toString()}` : '';
    return fetch(`${WAITLIST_API}/leads/${query}`, { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => d as { count: number; results: WaitlistLeadApi[] });
  },

  updateLead: (leadId: string, data: { status?: string; notes?: string }) =>
    fetch(`${WAITLIST_API}/leads/${leadId}/`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((r) => r.json()),

  deleteLead: (leadId: string) =>
    fetch(`${WAITLIST_API}/leads/${leadId}/`, {
      method: 'DELETE',
      credentials: 'include',
    }).then((r) => (r.ok ? { success: true } : r.json())),
};
