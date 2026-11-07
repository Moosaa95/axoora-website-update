import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  submitWaitlistLead,
  trackApplication,
  type WaitlistSubmissionPayload,
  type ApplicationTrackingResult,
} from '../../lib/api';
import { waitlistApi, type WaitlistLeadApi } from '../../lib/teamApi';
import { AdminLeadItem } from '../../context/CmsContext';

export interface WaitlistState {
  leads: AdminLeadItem[];
  loading: boolean;
  categoryFilter: string;
  searchFilter: string;
  trackingResult: ApplicationTrackingResult | null;
  trackingLoading: boolean;
  trackingError: string | null;
  submitting: boolean;
  submissionSuccess: boolean;
  lastReference: string | null;
  error: string | null;
}

const DEFAULT_LEADS: AdminLeadItem[] = [
  {
    id: 'lead-001',
    fullName: 'Musa Abdullahi',
    whatsappNumber: '+234 803 123 4567',
    email: 'musa.abdullahi@gmail.com',
    city: 'Kano',
    interest: 'pos-agent',
    status: 'new',
    submittedAt: '2026-10-02T09:15:00Z',
    notes: 'Grain trading aggregator at Dawanau market requesting 5 dual-SIM Apex units.',
  },
  {
    id: 'lead-002',
    fullName: 'Chioma Okonkwo',
    whatsappNumber: '+234 812 987 6543',
    email: 'chioma.couture@yahoo.com',
    city: 'Lagos',
    interest: 'business',
    status: 'contacted',
    submittedAt: '2026-10-01T14:22:00Z',
    notes: 'Fashion boutique owner in Lekki. Interested in multi-till cashier sub-accounts.',
  },
  {
    id: 'lead-003',
    fullName: 'Aisha Bello',
    whatsappNumber: '+234 905 443 2100',
    email: 'aisha.bello@outlook.com',
    city: 'Abuja',
    interest: 'personal',
    status: 'approved',
    submittedAt: '2026-09-30T11:05:00Z',
    notes: 'Approved for early Beta access. Virtual dollar card and WhatsApp bot activated.',
  },
  {
    id: 'lead-004',
    fullName: 'Ibrahim Garba',
    whatsappNumber: '+234 708 554 9901',
    email: 'ibrahim.garba@wuse-agro.ng',
    city: 'Abuja',
    interest: 'aggregator',
    status: 'dispatched',
    submittedAt: '2026-09-28T16:30:00Z',
    notes: 'Aggregator fleet package of 20 terminals dispatched via GIG Logistics.',
  },
];

function loadInitialLeads(): AdminLeadItem[] {
  if (typeof window === 'undefined') return DEFAULT_LEADS;
  try {
    const stored = localStorage.getItem('axoora_cms_leads');
    if (stored) return JSON.parse(stored);
    return DEFAULT_LEADS;
  } catch {
    return DEFAULT_LEADS;
  }
}

const initialState: WaitlistState = {
  leads: loadInitialLeads(),
  loading: false,
  categoryFilter: 'all',
  searchFilter: '',
  trackingResult: null,
  trackingLoading: false,
  trackingError: null,
  submitting: false,
  submissionSuccess: false,
  lastReference: null,
  error: null,
};

function mapBackendLeadToAdmin(l: WaitlistLeadApi): AdminLeadItem {
  const mappedStatus: AdminLeadItem['status'] =
    l.status === 'onboarded'
      ? 'approved'
      : l.status === 'archived'
      ? 'dispatched'
      : l.status === 'contacted'
      ? 'contacted'
      : 'new';
  return {
    id: l.id,
    fullName: l.business_name && l.business_name !== l.full_name
      ? `${l.full_name} (${l.business_name})`
      : l.full_name,
    whatsappNumber: l.whatsapp_number,
    email: l.email,
    city: l.city || l.state || 'Nigeria',
    interest: l.interest,
    status: mappedStatus,
    submittedAt: l.created_at || new Date().toISOString(),
    notes: l.notes || (l.application_ref ? `Ref: ${l.application_ref}` : ''),
  };
}

// Async Thunks
export const fetchBackendLeadsThunk = createAsyncThunk<
  AdminLeadItem[],
  void,
  { rejectValue: string }
>('waitlist/fetchBackendLeads', async (_, { rejectWithValue }) => {
  try {
    const res = await waitlistApi.getLeads();
    if (res && Array.isArray(res.results)) {
      return res.results.map(mapBackendLeadToAdmin);
    }
    return [];
  } catch (err: any) {
    return rejectWithValue(err?.message || 'Failed to load waitlist leads');
  }
});

export const submitLeadThunk = createAsyncThunk<
  { success: boolean; application_ref?: string; data?: any },
  WaitlistSubmissionPayload,
  { rejectValue: string }
>('waitlist/submitLead', async (payload, { rejectWithValue }) => {
  try {
    const res = await submitWaitlistLead(payload);
    return res;
  } catch (err: any) {
    return rejectWithValue(err?.message || 'Failed to submit application');
  }
});

export const trackApplicationThunk = createAsyncThunk<
  ApplicationTrackingResult,
  string,
  { rejectValue: string }
>('waitlist/trackApplication', async (trackingCode, { rejectWithValue }) => {
  try {
    const res = await trackApplication(trackingCode);
    return res;
  } catch (err: any) {
    return rejectWithValue(err?.message || 'Tracking lookup failed');
  }
});

export const waitlistSlice = createSlice({
  name: 'waitlist',
  initialState,
  reducers: {
    addLead: (state, action: PayloadAction<Omit<AdminLeadItem, 'id' | 'submittedAt'>>) => {
      const newLead: AdminLeadItem = {
        id: `lead-${Date.now()}`,
        submittedAt: new Date().toISOString(),
        ...action.payload,
      };
      state.leads.unshift(newLead);
      if (typeof window !== 'undefined') {
        localStorage.setItem('axoora_cms_leads', JSON.stringify(state.leads));
      }
    },
    updateLeadStatus: (
      state,
      action: PayloadAction<{ id: string; status: AdminLeadItem['status'] }>
    ) => {
      state.leads = state.leads.map((l) =>
        l.id === action.payload.id ? { ...l, status: action.payload.status } : l
      );
      if (typeof window !== 'undefined') {
        localStorage.setItem('axoora_cms_leads', JSON.stringify(state.leads));
      }
    },
    deleteLead: (state, action: PayloadAction<string>) => {
      state.leads = state.leads.filter((l) => l.id !== action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('axoora_cms_leads', JSON.stringify(state.leads));
      }
    },
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.categoryFilter = action.payload;
    },
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.searchFilter = action.payload;
    },
    clearTrackingResult: (state) => {
      state.trackingResult = null;
      state.trackingError = null;
    },
    resetSubmissionState: (state) => {
      state.submitting = false;
      state.submissionSuccess = false;
      state.lastReference = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBackendLeadsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBackendLeadsThunk.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.length > 0) {
        const backendIds = new Set(action.payload.map((l) => l.id));
        const localOnly = state.leads.filter(
          (l) => !backendIds.has(l.id) && l.id.startsWith('lead-00')
        );
        state.leads = [...action.payload, ...localOnly];
        if (typeof window !== 'undefined') {
          localStorage.setItem('axoora_cms_leads', JSON.stringify(state.leads));
        }
      }
    });
    builder.addCase(fetchBackendLeadsThunk.rejected, (state) => {
      state.loading = false;
    });

    // Submit Lead
    builder.addCase(submitLeadThunk.pending, (state) => {
      state.submitting = true;
      state.submissionSuccess = false;
      state.error = null;
    });
    builder.addCase(submitLeadThunk.fulfilled, (state, action) => {
      state.submitting = false;
      state.submissionSuccess = true;
      state.lastReference = action.payload.application_ref || null;
      if (action.payload.data && action.payload.data.id) {
        const mapped = mapBackendLeadToAdmin(action.payload.data as WaitlistLeadApi);
        state.leads = [mapped, ...state.leads.filter((l) => l.id !== mapped.id)];
        if (typeof window !== 'undefined') {
          localStorage.setItem('axoora_cms_leads', JSON.stringify(state.leads));
        }
      }
    });
    builder.addCase(submitLeadThunk.rejected, (state, action) => {
      state.submitting = false;
      state.submissionSuccess = false;
      state.error = action.payload || 'Submission failed';
    });

    // Track Application
    builder.addCase(trackApplicationThunk.pending, (state) => {
      state.trackingLoading = true;
      state.trackingError = null;
      state.trackingResult = null;
    });
    builder.addCase(trackApplicationThunk.fulfilled, (state, action) => {
      state.trackingLoading = false;
      state.trackingResult = action.payload;
      state.trackingError = null;
    });
    builder.addCase(trackApplicationThunk.rejected, (state, action) => {
      state.trackingLoading = false;
      state.trackingError = action.payload || 'Application not found';
    });
  },
});

export const {
  addLead,
  updateLeadStatus,
  deleteLead,
  setCategoryFilter,
  setSearchFilter,
  clearTrackingResult,
  resetSubmissionState,
} = waitlistSlice.actions;

export default waitlistSlice.reducer;
