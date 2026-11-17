import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { teamAuth, type TeamMember, type LoginResponse } from '../../lib/teamApi';

export interface AuthState {
  user: TeamMember | null;
  permissions: string[];
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'authenticated' | 'unauthenticated' | 'error';
  error: string | null;
}

function loadInitialAuthState(): AuthState {
  if (typeof window === 'undefined') {
    return {
      user: null,
      permissions: [],
      isAuthenticated: false,
      status: 'idle',
      error: null,
    };
  }
  try {
    const raw = localStorage.getItem('axoora_auth_session');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.user) {
        return {
          user: parsed.user,
          permissions: parsed.permissions || [],
          isAuthenticated: true,
          status: 'authenticated',
          error: null,
        };
      }
    }
  } catch {}
  return {
    user: null,
    permissions: [],
    isAuthenticated: false,
    status: 'idle',
    error: null,
  };
}

const initialState: AuthState = loadInitialAuthState();

// Async Thunks
export const checkAuthThunk = createAsyncThunk<LoginResponse, void, { rejectValue: string }>(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const data = await teamAuth.me();
      return data;
    } catch (err: any) {
      return rejectWithValue(err?.message || 'Session expired or not authenticated');
    }
  }
);

export const loginThunk = createAsyncThunk<
  LoginResponse,
  { username: string; password: string },
  { rejectValue: string }
>('auth/login', async ({ username, password }, { rejectWithValue }) => {
  try {
    const data = await teamAuth.login(username, password);
    return data;
  } catch (err: any) {
    const detail =
      err?.detail ||
      (Array.isArray(err?.non_field_errors) ? err.non_field_errors[0] : null) ||
      err?.message ||
      'Invalid credentials. Please check your username and password.';
    return rejectWithValue(detail);
  }
});

export const logoutThunk = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await teamAuth.logout();
    } catch (err: any) {
      return rejectWithValue(err?.message || 'Failed to logout cleanly');
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
    setMockAuthenticated: (state, action: PayloadAction<{ user: TeamMember; permissions: string[] }>) => {
      state.user = action.payload.user;
      state.permissions = action.payload.permissions;
      state.isAuthenticated = true;
      state.status = 'authenticated';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Check Auth
    builder.addCase(checkAuthThunk.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(checkAuthThunk.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.permissions = action.payload.permissions || [];
      state.isAuthenticated = true;
      state.status = 'authenticated';
      state.error = null;
      if (typeof window !== 'undefined' && action.payload.user) {
        try {
          localStorage.setItem(
            'axoora_auth_session',
            JSON.stringify({ user: action.payload.user, permissions: action.payload.permissions || [] })
          );
        } catch {}
      }
    });
    builder.addCase(checkAuthThunk.rejected, (state) => {
      // If we already have a persisted local session, keep it valid to prevent flash redirect on refresh
      if (typeof window !== 'undefined' && localStorage.getItem('axoora_auth_session')) {
        return;
      }
      state.user = null;
      state.permissions = [];
      state.isAuthenticated = false;
      state.status = 'unauthenticated';
    });

    // Login
    builder.addCase(loginThunk.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.permissions = action.payload.permissions || [];
      state.isAuthenticated = true;
      state.status = 'authenticated';
      state.error = null;
      if (typeof window !== 'undefined' && action.payload.user) {
        try {
          localStorage.setItem(
            'axoora_auth_session',
            JSON.stringify({ user: action.payload.user, permissions: action.payload.permissions || [] })
          );
        } catch {}
      }
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.user = null;
      state.permissions = [];
      state.isAuthenticated = false;
      state.status = 'error';
      state.error = action.payload || 'Login failed';
      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem('axoora_auth_session');
        } catch {}
      }
    });

    // Logout
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.user = null;
      state.permissions = [];
      state.isAuthenticated = false;
      state.status = 'unauthenticated';
      state.error = null;
      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem('axoora_auth_session');
        } catch {}
      }
    });
  },
});

export const { clearAuthError, setMockAuthenticated } = authSlice.actions;
export default authSlice.reducer;
