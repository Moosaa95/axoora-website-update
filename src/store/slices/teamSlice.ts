import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  teamRoles,
  teamMembers,
  teamPermissions,
  type TeamRole,
  type TeamMember,
  type PermissionGroup,
} from '../../lib/teamApi';

export interface TeamState {
  roles: TeamRole[];
  members: TeamMember[];
  permissions: PermissionGroup[];
  rolesLoading: boolean;
  membersLoading: boolean;
  permissionsLoading: boolean;
  searchQuery: string;
  statusFilter: string;
  roleFilter: string;
  error: string | null;
}

const initialState: TeamState = {
  roles: [],
  members: [],
  permissions: [],
  rolesLoading: false,
  membersLoading: false,
  permissionsLoading: false,
  searchQuery: '',
  statusFilter: '',
  roleFilter: '',
  error: null,
};

// Async Thunks
export const fetchRolesThunk = createAsyncThunk<TeamRole[], void, { rejectValue: string }>(
  'team/fetchRoles',
  async (_, { rejectWithValue }) => {
    try {
      const res = await teamRoles.getAll();
      return res.results || [];
    } catch (err: any) {
      return rejectWithValue(err?.detail || err?.message || 'Failed to fetch roles');
    }
  }
);

export const createRoleThunk = createAsyncThunk<
  TeamRole,
  { name: string; description?: string; permissions?: string[] },
  { rejectValue: string }
>('team/createRole', async (payload, { rejectWithValue }) => {
  try {
    const res = await teamRoles.create(payload);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err?.error || err?.detail || 'Failed to create role');
  }
});

export const updateRoleThunk = createAsyncThunk<
  TeamRole,
  { id: string; data: { name?: string; description?: string; permissions?: string[] } },
  { rejectValue: string }
>('team/updateRole', async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await teamRoles.update(id, data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err?.error || err?.detail || 'Failed to update role');
  }
});

export const deleteRoleThunk = createAsyncThunk<string, string, { rejectValue: string }>(
  'team/deleteRole',
  async (id, { rejectWithValue }) => {
    try {
      await teamRoles.delete(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err?.error || err?.detail || 'Failed to delete role');
    }
  }
);

export const fetchMembersThunk = createAsyncThunk<
  TeamMember[],
  { search?: string; role_id?: string; status?: string } | void,
  { rejectValue: string }
>('team/fetchMembers', async (params, { rejectWithValue }) => {
  try {
    const res = await teamMembers.getAll(params || undefined);
    return res.results || [];
  } catch (err: any) {
    return rejectWithValue(err?.detail || err?.message || 'Failed to fetch members');
  }
});

export const createMemberThunk = createAsyncThunk<
  TeamMember,
  {
    full_name: string;
    email: string;
    role_id?: string;
    job_title?: string;
    phone_number?: string;
    department?: string;
    password?: string;
  },
  { rejectValue: string }
>('team/createMember', async (payload, { rejectWithValue }) => {
  try {
    const res = await teamMembers.create(payload);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err?.error || err?.detail || 'Failed to create member');
  }
});

export const updateMemberThunk = createAsyncThunk<
  TeamMember,
  {
    id: string;
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
    };
  },
  { rejectValue: string }
>('team/updateMember', async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await teamMembers.update(id, data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err?.error || err?.detail || 'Failed to update member');
  }
});

export const deleteMemberThunk = createAsyncThunk<string, string, { rejectValue: string }>(
  'team/deleteMember',
  async (id, { rejectWithValue }) => {
    try {
      await teamMembers.delete(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err?.error || err?.detail || 'Failed to delete member');
    }
  }
);

export const fetchPermissionsThunk = createAsyncThunk<PermissionGroup[], void, { rejectValue: string }>(
  'team/fetchPermissions',
  async (_, { rejectWithValue }) => {
    try {
      const res = await teamPermissions.getAll();
      return res.permissions || [];
    } catch (err: any) {
      return rejectWithValue(err?.message || 'Failed to fetch permissions');
    }
  }
);

export const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.statusFilter = action.payload;
    },
    setRoleFilter: (state, action: PayloadAction<string>) => {
      state.roleFilter = action.payload;
    },
    clearTeamError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Roles
    builder.addCase(fetchRolesThunk.pending, (state) => {
      state.rolesLoading = true;
    });
    builder.addCase(fetchRolesThunk.fulfilled, (state, action) => {
      state.roles = action.payload;
      state.rolesLoading = false;
    });
    builder.addCase(fetchRolesThunk.rejected, (state, action) => {
      state.rolesLoading = false;
      state.error = action.payload || 'Failed to fetch roles';
    });
    builder.addCase(createRoleThunk.fulfilled, (state, action) => {
      state.roles.unshift(action.payload);
    });
    builder.addCase(updateRoleThunk.fulfilled, (state, action) => {
      const idx = state.roles.findIndex((r) => r.id === action.payload.id);
      if (idx !== -1) state.roles[idx] = action.payload;
    });
    builder.addCase(deleteRoleThunk.fulfilled, (state, action) => {
      state.roles = state.roles.filter((r) => r.id !== action.payload);
    });

    // Members
    builder.addCase(fetchMembersThunk.pending, (state) => {
      state.membersLoading = true;
    });
    builder.addCase(fetchMembersThunk.fulfilled, (state, action) => {
      state.members = action.payload;
      state.membersLoading = false;
    });
    builder.addCase(fetchMembersThunk.rejected, (state, action) => {
      state.membersLoading = false;
      state.error = action.payload || 'Failed to fetch members';
    });
    builder.addCase(createMemberThunk.fulfilled, (state, action) => {
      state.members.unshift(action.payload);
    });
    builder.addCase(updateMemberThunk.fulfilled, (state, action) => {
      const idx = state.members.findIndex((m) => m.id === action.payload.id);
      if (idx !== -1) state.members[idx] = action.payload;
    });
    builder.addCase(deleteMemberThunk.fulfilled, (state, action) => {
      state.members = state.members.filter((m) => m.id !== action.payload);
    });

    // Permissions
    builder.addCase(fetchPermissionsThunk.pending, (state) => {
      state.permissionsLoading = true;
    });
    builder.addCase(fetchPermissionsThunk.fulfilled, (state, action) => {
      state.permissions = action.payload;
      state.permissionsLoading = false;
    });
    builder.addCase(fetchPermissionsThunk.rejected, (state) => {
      state.permissionsLoading = false;
    });
  },
});

export const { setSearchQuery, setStatusFilter, setRoleFilter, clearTeamError } = teamSlice.actions;
export default teamSlice.reducer;
