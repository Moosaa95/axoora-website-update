'use client';

/**
 * TeamManagementTab
 * Full RBAC Team Management UI wired to /api/v1/team/ backend.
 * Includes: Role list/create/edit, Team member list/invite/edit/deactivate.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  teamRoles,
  teamMembers,
  teamPermissions,
  type TeamRole,
  type TeamMember,
  type PermissionGroup,
} from '../lib/teamApi';
import { useAppDispatch, useAppSelector } from '../store';
import {
  fetchRolesThunk,
  fetchMembersThunk,
  fetchPermissionsThunk,
  deleteRoleThunk,
  deleteMemberThunk,
} from '../store/slices/teamSlice';
import { ConfirmModal } from './ConfirmModal';
import { AdminTableSkeleton, AdminCardsSkeleton } from './AdminSkeleton';

interface TeamManagementTabProps {
  onShowToast: (msg: string) => void;
}

// ─── Sub-tab type ─────────────────────────────────────────────────────────────

type TeamSubTab = 'members' | 'roles';

// ─── Status badge colours ─────────────────────────────────────────────────────

function StatusBadge({ status, hasAccepted }: { status: string; hasAccepted?: boolean }) {
  const isPending = status === 'invited' || hasAccepted === false;
  const cfg: Record<string, { bg: string; text: string; label: string }> = {
    active: { bg: 'bg-[#00DF8F]/15', text: 'text-[#00DF8F]', label: 'Active' },
    invited: { bg: 'bg-[#F2A93B]/15', text: 'text-[#F2A93B]', label: 'Invite Pending' },
    inactive: { bg: 'bg-[#14294F]', text: 'text-[#7B9CD2]', label: 'Inactive' },
    suspended: { bg: 'bg-[#EF4444]/15', text: 'text-[#EF4444]', label: 'Suspended' },
  };
  const c = isPending ? cfg.invited : (cfg[status] || cfg.inactive);
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${c.bg} ${c.text}`}>
      <span className={`w-1 h-1 rounded-full ${status === 'active' && hasAccepted !== false ? 'bg-[#00DF8F] animate-pulse' : isPending ? 'bg-[#F2A93B] animate-pulse' : status === 'suspended' ? 'bg-[#EF4444]' : 'bg-[#7B9CD2]'}`} />
      {isPending ? 'Invite Pending' : c.label}
    </span>
  );
}

// ─── Avatar initials ──────────────────────────────────────────────────────────

function Avatar({ name }: { name: string }) {
  const parts = name.trim().split(' ');
  const initials = parts.length >= 2
    ? `${parts[0][0]}${parts[parts.length - 1][0]}`
    : name.slice(0, 2);
  return (
    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#0D95FE] to-[#00DF8F] flex items-center justify-center font-bold text-xs text-[#00284D] shrink-0 uppercase">
      {initials.toUpperCase()}
    </div>
  );
}

// ─── Department colours ───────────────────────────────────────────────────────

const DEPT_COLOURS: Record<string, string> = {
  executive: 'text-[#F2A93B]',
  operations: 'text-[#0D95FE]',
  engineering: 'text-[#00DF8F]',
  compliance: 'text-[#A78BFA]',
  marketing: 'text-[#F472B6]',
  customer_support: 'text-[#34D399]',
  finance: 'text-[#FBBF24]',
};

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <span className="material-symbols-outlined text-[48px] text-[#14294F]">{icon}</span>
      <div>
        <p className="text-sm font-bold text-[#A8BBD6]">{title}</p>
        <p className="text-xs text-[#7B9CD2] mt-1 max-w-xs">{description}</p>
      </div>
    </div>
  );
}

// ─── Spinner ──────────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="w-6 h-6 border-2 border-[#0D95FE]/30 border-t-[#0D95FE] rounded-full animate-spin" />
    </div>
  );
}

// ─── Role drawer ──────────────────────────────────────────────────────────────

interface RoleDrawerProps {
  role: TeamRole | null;
  isNew: boolean;
  allPermissions: PermissionGroup[];
  onClose: () => void;
  onSaved: (role: TeamRole) => void;
  onShowToast: (msg: string) => void;
}

function RoleDrawer({ role, isNew, allPermissions, onClose, onSaved, onShowToast }: RoleDrawerProps) {
  const [name, setName] = useState(role?.name || '');
  const [description, setDescription] = useState(role?.description || '');
  const [selectedPerms, setSelectedPerms] = useState<Set<string>>(
    new Set(role?.permissions || [])
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isSuperWildcard = selectedPerms.has('*');

  const togglePerm = (id: string) => {
    setSelectedPerms((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (isSuperWildcard) {
      setSelectedPerms(new Set());
    } else {
      setSelectedPerms(new Set(['*']));
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      setError('Role name is required.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const payload = {
        name: name.trim(),
        description: description.trim(),
        permissions: Array.from(selectedPerms),
      };

      let saved: TeamRole;
      if (isNew) {
        const res = await teamRoles.create(payload);
        saved = res.data;
        onShowToast(`Role "${saved.name}" created!`);
      } else if (role) {
        const res = await teamRoles.update(role.id, payload);
        saved = res.data;
        onShowToast(`Role "${saved.name}" updated!`);
      } else {
        return;
      }

      onSaved(saved);
      onClose();
    } catch (err: unknown) {
      const apiErr = err as { detail?: string; name?: string[] };
      setError(apiErr?.detail || apiErr?.name?.[0] || 'Failed to save role. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 400, damping: 38 }}
          className="w-full max-w-lg h-full bg-[#030E26] border-l border-[#14294F] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-[#14294F] flex items-center justify-between shrink-0">
            <div>
              <p className="text-[10px] font-mono text-[#0D95FE] uppercase font-bold">
                {isNew ? 'CREATE NEW ROLE' : 'EDIT ROLE'}
              </p>
              <h3 className="text-base font-black text-white mt-0.5">
                {isNew ? 'Define permissions' : role?.name}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-[#14294F] text-[#7B9CD2] hover:text-white transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#A8BBD6]">Role Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Content Editor"
                disabled={role?.is_system}
                className="w-full px-3 py-2.5 rounded-xl bg-[#05112A] border border-[#14294F] text-sm text-white placeholder-[#7B9CD2] focus:outline-none focus:border-[#0D95FE] transition-colors disabled:opacity-50"
              />
              {role?.is_system && (
                <p className="text-[10px] text-[#F2A93B] font-mono flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">lock</span>
                  System role — name cannot be changed
                </p>
              )}
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#A8BBD6]">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What does this role do?"
                rows={2}
                className="w-full px-3 py-2.5 rounded-xl bg-[#05112A] border border-[#14294F] text-sm text-white placeholder-[#7B9CD2] focus:outline-none focus:border-[#0D95FE] transition-colors resize-none"
              />
            </div>

            {/* Permissions */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[#A8BBD6]">
                  Permissions ({selectedPerms.size} selected)
                </label>
                <button
                  onClick={toggleAll}
                  className={`text-[10px] font-mono px-2 py-1 rounded-lg cursor-pointer transition-colors ${
                    isSuperWildcard
                      ? 'bg-[#F2A93B]/20 text-[#F2A93B] border border-[#F2A93B]/40'
                      : 'bg-[#0D95FE]/10 text-[#0D95FE] border border-[#0D95FE]/30 hover:bg-[#0D95FE]/20'
                  }`}
                >
                  {isSuperWildcard ? '★ Full Access Granted' : '☆ Grant Full Access'}
                </button>
              </div>

              {isSuperWildcard ? (
                <div className="p-4 rounded-2xl bg-[#F2A93B]/10 border border-[#F2A93B]/30 flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#F2A93B] text-[22px]">admin_panel_settings</span>
                  <div>
                    <p className="text-xs font-bold text-[#F2A93B]">Full Super-Admin Access</p>
                    <p className="text-[10px] text-[#A8BBD6]">This role has unrestricted access to all platform features.</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {allPermissions.map((group) => (
                    <div key={group.group} className="flex flex-col gap-2">
                      <p className="text-[10px] font-mono text-[#7B9CD2] uppercase tracking-wider font-bold border-b border-[#14294F] pb-1">
                        {group.group}
                      </p>
                      <div className="flex flex-col gap-1.5">
                        {group.permissions.map((perm) => (
                          <label
                            key={perm.id}
                            className="flex items-start gap-2.5 cursor-pointer group"
                          >
                            <div
                              className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all ${
                                selectedPerms.has(perm.id)
                                  ? 'bg-[#0D95FE] border-[#0D95FE]'
                                  : 'border-[#14294F] bg-[#05112A] group-hover:border-[#0D95FE]/50'
                              }`}
                              onClick={() => togglePerm(perm.id)}
                            >
                              {selectedPerms.has(perm.id) && (
                                <span className="material-symbols-outlined text-white text-[12px]">check</span>
                              )}
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <span className="text-xs font-semibold text-white group-hover:text-[#0D95FE] transition-colors">
                                {perm.label}
                              </span>
                              <span className="text-[10px] text-[#7B9CD2]">{perm.description}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/30 text-xs text-[#EF4444]">
                <span className="material-symbols-outlined text-[16px]">error</span>
                {error}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-[#14294F] flex items-center gap-3 shrink-0">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#A8BBD6] border border-[#14294F] hover:bg-[#0A1B3D] transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 py-2.5 bg-[#0D95FE] hover:bg-[#0C84E4] disabled:opacity-50 text-[#00284D] font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#00284D]/30 border-t-[#00284D] rounded-full animate-spin" />
                  Saving…
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[16px]">save</span>
                  {isNew ? 'Create Role' : 'Save Changes'}
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Credentials Modal ────────────────────────────────────────────────────────

interface CredentialsModalProps {
  isOpen: boolean;
  title: string;
  subtitle: string;
  memberName: string;
  email: string;
  password?: string;
  emailSent?: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

function CredentialsModal({
  isOpen,
  title,
  subtitle,
  memberName,
  email,
  password,
  emailSent,
  onClose,
  onShowToast,
}: CredentialsModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      onShowToast('Password copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-md bg-[#030E26] border border-[#14294F] rounded-2xl p-6 shadow-2xl flex flex-col gap-4 text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00DF8F]/15 border border-[#00DF8F]/30 text-[#00DF8F] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">mark_email_read</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{title}</h3>
              <p className="text-xs text-[#7B9CD2]">{subtitle}</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#05112A] border border-[#14294F] flex flex-col gap-2.5 font-mono text-xs">
            <div className="flex items-center justify-between text-[#7B9CD2]">
              <span>Team Member:</span>
              <span className="text-white font-sans font-bold">{memberName}</span>
            </div>
            <div className="flex items-center justify-between text-[#7B9CD2]">
              <span>Login Email:</span>
              <span className="text-[#0D95FE]">{email}</span>
            </div>
            {password && (
              <div className="flex items-center justify-between pt-2 border-t border-[#14294F]">
                <span className="text-[#7B9CD2]">Temporary Password:</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#00DF8F] font-bold tracking-wider">{password}</span>
                  <button
                    onClick={handleCopy}
                    className="p-1 rounded-lg bg-[#0A1B3D] border border-[#14294F] hover:bg-[#14294F] text-[#7B9CD2] hover:text-white transition-all cursor-pointer"
                    title="Copy password"
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {copied ? 'check' : 'content_copy'}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 rounded-xl bg-[#0D95FE]/10 border border-[#0D95FE]/20 text-[11px] text-[#A8BBD6] flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#0D95FE] shrink-0">
              {emailSent ? 'check_circle' : 'info'}
            </span>
            <span>
              {emailSent
                ? `An invitation email has been dispatched to ${email}.`
                : `Save this password or copy it now to share with the team member directly.`}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-[#0D95FE] hover:bg-[#00DF8F] text-white hover:text-[#003825] font-bold text-xs transition-all cursor-pointer"
          >
            Done
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// ─── Member drawer ────────────────────────────────────────────────────────────

interface MemberDrawerProps {
  member: TeamMember | null;
  isNew: boolean;
  roles: TeamRole[];
  allPermissions: PermissionGroup[];
  onClose: () => void;
  onSaved: (m: TeamMember, generatedPassword?: string, emailSent?: boolean) => void;
  onShowToast: (msg: string) => void;
}

const DEPARTMENTS = [
  { value: 'executive', label: 'Executive' },
  { value: 'operations', label: 'Operations' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'compliance', label: 'Compliance' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'customer_support', label: 'Customer Support' },
  { value: 'finance', label: 'Finance' },
];

function MemberDrawer({ member, isNew, roles, allPermissions, onClose, onSaved, onShowToast }: MemberDrawerProps) {
  const [fullName, setFullName] = useState(member?.full_name || '');
  const [email, setEmail] = useState(member?.email || '');
  const [jobTitle, setJobTitle] = useState(member?.job_title || '');
  const [phone, setPhone] = useState(member?.phone_number || '');
  const [department, setDepartment] = useState(member?.department || 'operations');
  const [roleId, setRoleId] = useState(member?.role?.id || '');
  const [memberStatus, setMemberStatus] = useState(member?.status || 'active');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [customPerms, setCustomPerms] = useState<Set<string>>(
    new Set(member?.custom_permissions || member?.effective_permissions?.filter((p) => p !== '*') || [])
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<'details' | 'permissions'>('details');

  const toggleCustomPerm = (id: string) => {
    setCustomPerms((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSave = async () => {
    if (!fullName.trim()) { setError('Full name is required.'); return; }
    if (isNew && !email.trim()) { setError('Email is required for new members.'); return; }

    setSaving(true);
    setError(null);

    try {
      const payload: Record<string, unknown> = {
        full_name: fullName.trim(),
        email: email.trim(),
        job_title: jobTitle.trim(),
        phone_number: phone.trim(),
        department,
        role_id: roleId || null,
        status: memberStatus,
        custom_permissions: Array.from(customPerms),
      };

      if (password) payload.password = password;

      let saved: TeamMember;
      let genPass: string | undefined;
      let emailDispatched: boolean | undefined;

      if (isNew) {
        const res = await teamMembers.create(payload as Parameters<typeof teamMembers.create>[0]);
        saved = res.data;
        genPass = res.generated_password;
        emailDispatched = res.email_sent;
        onShowToast(`Team member "${saved.full_name}" invited!`);
      } else if (member) {
        const res = await teamMembers.update(member.id, payload as Parameters<typeof teamMembers.update>[1]);
        saved = res.data;
        onShowToast(`"${saved.full_name}" updated!`);
      } else {
        return;
      }

      onSaved(saved, genPass, emailDispatched);
      onClose();
    } catch (err: unknown) {
      const apiErr = err as { detail?: string; email?: string[]; full_name?: string[] };
      setError(apiErr?.detail || apiErr?.email?.[0] || apiErr?.full_name?.[0] || 'Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 400, damping: 38 }}
          className="w-full max-w-lg h-full bg-[#030E26] border-l border-[#14294F] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-[#14294F] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              {!isNew && member && <Avatar name={member.full_name} />}
              <div>
                <p className="text-[10px] font-mono text-[#0D95FE] uppercase font-bold">
                  {isNew ? 'INVITE TEAM MEMBER' : 'EDIT MEMBER'}
                </p>
                <h3 className="text-base font-black text-white mt-0.5">
                  {isNew ? 'New Team Member' : member?.full_name}
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-[#14294F] text-[#7B9CD2] hover:text-white transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Sub-tabs */}
          <div className="px-6 pt-3 pb-0 border-b border-[#14294F] flex gap-1 shrink-0">
            {(['details', 'permissions'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSection(tab)}
                className={`px-4 py-2 text-xs font-semibold rounded-t-xl border-b-2 -mb-px transition-all cursor-pointer capitalize ${
                  activeSection === tab
                    ? 'border-[#0D95FE] text-[#0D95FE] bg-[#0D95FE]/5'
                    : 'border-transparent text-[#7B9CD2] hover:text-[#A8BBD6]'
                }`}
              >
                {tab === 'details' ? 'Details & Role' : 'Extra Permissions'}
              </button>
            ))}
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
            {activeSection === 'details' ? (
              <>
                {/* Full name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#A8BBD6]">Full Name *</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Aisha Balogun"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#05112A] border border-[#14294F] text-sm text-white placeholder-[#7B9CD2] focus:outline-none focus:border-[#0D95FE] transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#A8BBD6]">Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="aisha@axoora.ai"
                    disabled={!isNew}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#05112A] border border-[#14294F] text-sm text-white placeholder-[#7B9CD2] focus:outline-none focus:border-[#0D95FE] transition-colors disabled:opacity-60"
                  />
                </div>

                {/* Job title */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#A8BBD6]">Job Title</label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g. Content Manager"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#05112A] border border-[#14294F] text-sm text-white placeholder-[#7B9CD2] focus:outline-none focus:border-[#0D95FE] transition-colors"
                  />
                </div>

                {/* Phone + Department grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#A8BBD6]">Phone</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+234 ..."
                      className="w-full px-3 py-2.5 rounded-xl bg-[#05112A] border border-[#14294F] text-sm text-white placeholder-[#7B9CD2] focus:outline-none focus:border-[#0D95FE] transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#A8BBD6]">Department</label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#05112A] border border-[#14294F] text-sm text-white focus:outline-none focus:border-[#0D95FE] transition-colors cursor-pointer"
                    >
                      {DEPARTMENTS.map((d) => (
                        <option key={d.value} value={d.value}>{d.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Role */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#A8BBD6]">Role</label>
                  <select
                    value={roleId}
                    onChange={(e) => setRoleId(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#05112A] border border-[#14294F] text-sm text-white focus:outline-none focus:border-[#0D95FE] transition-colors cursor-pointer"
                  >
                    <option value="">— No Role —</option>
                    {roles.map((r) => (
                      <option key={r.id} value={r.id}>{r.name}{r.is_system ? ' (System)' : ''}</option>
                    ))}
                  </select>
                </div>

                {/* Status (edit only) */}
                {!isNew && (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#A8BBD6]">Account Status</label>
                    <div className="flex gap-2">
                      {(['active', 'inactive', 'suspended'] as const).map((s) => (
                        <button
                          key={s}
                          onClick={() => setMemberStatus(s)}
                          className={`flex-1 py-2 rounded-xl text-xs font-mono font-bold uppercase border cursor-pointer transition-all ${
                            memberStatus === s
                              ? s === 'active'
                                ? 'bg-[#00DF8F]/20 border-[#00DF8F]/40 text-[#00DF8F]'
                                : s === 'suspended'
                                  ? 'bg-[#EF4444]/20 border-[#EF4444]/40 text-[#EF4444]'
                                  : 'bg-[#14294F] border-[#7B9CD2]/30 text-[#7B9CD2]'
                              : 'bg-[#05112A] border-[#14294F] text-[#7B9CD2] hover:border-[#7B9CD2]/40'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Password Configuration */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-[#A8BBD6]">
                      {isNew ? 'Password Configuration' : 'New Password'}
                    </label>
                    {isNew && (
                      <button
                        type="button"
                        onClick={() => {
                          const chars = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$%&*';
                          let gen = '';
                          for (let i = 0; i < 12; i++) gen += chars.charAt(Math.floor(Math.random() * chars.length));
                          setPassword(gen);
                          setShowPass(true);
                        }}
                        className="text-[10px] text-[#00DF8F] hover:underline flex items-center gap-1 font-mono cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[13px]">autorenew</span>
                        <span>Auto-Generate</span>
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={isNew ? 'Leave blank to auto-generate & email' : 'Leave blank to keep current'}
                      className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-[#05112A] border border-[#14294F] text-sm text-white placeholder-[#7B9CD2] focus:outline-none focus:border-[#0D95FE] transition-colors font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7B9CD2] hover:text-white cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {showPass ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                  {isNew ? (
                    <p className="text-[11px] text-[#7B9CD2] flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-[14px] text-[#00DF8F]">mail</span>
                      <span>A secure password will be auto-generated and emailed to the member.</span>
                    </p>
                  ) : (
                    <p className="text-[10px] text-[#7B9CD2]">Leave blank to preserve member's existing password.</p>
                  )}
                </div>
              </>
            ) : (
              // Custom permissions tab
              <div className="flex flex-col gap-4">
                <div className="p-3 rounded-xl bg-[#0D95FE]/10 border border-[#0D95FE]/20 flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#0D95FE] text-[16px] mt-0.5">info</span>
                  <p className="text-[10px] text-[#A8BBD6] leading-relaxed">
                    Extra permissions granted <b>in addition to</b> those from the assigned role.
                    Useful for one-off access without changing the role.
                  </p>
                </div>
                {allPermissions.map((group) => (
                  <div key={group.group} className="flex flex-col gap-2">
                    <p className="text-[10px] font-mono text-[#7B9CD2] uppercase tracking-wider font-bold border-b border-[#14294F] pb-1">
                      {group.group}
                    </p>
                    {group.permissions.map((perm) => (
                      <label key={perm.id} className="flex items-start gap-2.5 cursor-pointer group">
                        <div
                          className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all ${
                            customPerms.has(perm.id)
                              ? 'bg-[#00DF8F] border-[#00DF8F]'
                              : 'border-[#14294F] bg-[#05112A] group-hover:border-[#00DF8F]/40'
                          }`}
                          onClick={() => toggleCustomPerm(perm.id)}
                        >
                          {customPerms.has(perm.id) && (
                            <span className="material-symbols-outlined text-white text-[12px]">check</span>
                          )}
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-white">{perm.label}</span>
                          <p className="text-[10px] text-[#7B9CD2]">{perm.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/30 text-xs text-[#EF4444]">
                <span className="material-symbols-outlined text-[16px]">error</span>
                {error}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-[#14294F] flex items-center gap-3 shrink-0">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#A8BBD6] border border-[#14294F] hover:bg-[#0A1B3D] transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 py-2.5 bg-[#0D95FE] hover:bg-[#0C84E4] disabled:opacity-50 text-[#00284D] font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#00284D]/30 border-t-[#00284D] rounded-full animate-spin" />
                  Saving…
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[16px]">save</span>
                  {isNew ? 'Add to Team' : 'Save Changes'}
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Main TeamManagementTab ───────────────────────────────────────────────────

export function TeamManagementTab({ onShowToast }: TeamManagementTabProps) {
  const dispatch = useAppDispatch();
  const { roles, members, permissions: allPermissions, rolesLoading, membersLoading } = useAppSelector(
    (state) => state.team
  );

  const [subTab, setSubTab] = useState<TeamSubTab>('members');
  const [memberSearch, setMemberSearch] = useState('');
  const [memberStatusFilter, setMemberStatusFilter] = useState('');

  // Drawer state
  const [roleDrawer, setRoleDrawer] = useState<{ open: boolean; role: TeamRole | null; isNew: boolean }>({
    open: false, role: null, isNew: false,
  });
  const [memberDrawer, setMemberDrawer] = useState<{ open: boolean; member: TeamMember | null; isNew: boolean }>({
    open: false, member: null, isNew: false,
  });

  const loadRoles = useCallback(() => {
    dispatch(fetchRolesThunk());
  }, [dispatch]);

  const loadMembers = useCallback(() => {
    dispatch(
      fetchMembersThunk({
        search: memberSearch || undefined,
        status: memberStatusFilter || undefined,
      })
    );
  }, [dispatch, memberSearch, memberStatusFilter]);

  const loadPermissions = useCallback(() => {
    dispatch(fetchPermissionsThunk());
  }, [dispatch]);

  useEffect(() => {
    loadRoles();
    loadPermissions();
  }, [loadRoles, loadPermissions]);

  useEffect(() => {
    loadMembers();
  }, [loadMembers]);

  const [confirmState, setConfirmState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    confirmLabel: 'Confirm',
    onConfirm: () => {},
  });

  const [credentialsModal, setCredentialsModal] = useState<{
    isOpen: boolean;
    title: string;
    subtitle: string;
    memberName: string;
    email: string;
    password?: string;
    emailSent?: boolean;
  }>({
    isOpen: false,
    title: '',
    subtitle: '',
    memberName: '',
    email: '',
    password: '',
    emailSent: false,
  });

  const handleResetPassword = (m: TeamMember) => {
    setConfirmState({
      isOpen: true,
      title: 'Reset Member Password?',
      message: `Generate a new password for ${m.full_name}? The new credentials will be immediately emailed to ${m.email}.`,
      confirmLabel: 'Reset & Send Email',
      onConfirm: async () => {
        setConfirmState((prev) => ({ ...prev, isOpen: false }));
        try {
          const res = await teamMembers.resetPassword(m.id);
          setCredentialsModal({
            isOpen: true,
            title: 'Password Reset Successful',
            subtitle: `A new secure password was generated and dispatched to ${m.email}.`,
            memberName: m.full_name,
            email: m.email,
            password: res.new_password,
            emailSent: res.email_sent,
          });
          onShowToast(`Password reset email sent to ${m.email}`);
          loadMembers();
        } catch (err: any) {
          onShowToast(err?.detail || 'Failed to reset password.');
        }
      },
    });
  };

  const handleResendInvite = async (m: TeamMember) => {
    try {
      const res = await teamMembers.resendInvite(m.id);
      setCredentialsModal({
        isOpen: true,
        title: 'Invitation Email Resent',
        subtitle: `A fresh invitation with login credentials has been dispatched to ${m.email}.`,
        memberName: m.full_name,
        email: m.email,
        password: res.temporary_password,
        emailSent: res.email_sent,
      });
      onShowToast(`Invite resent to ${m.email}`);
      loadMembers();
    } catch (err: any) {
      onShowToast(err?.detail || 'Failed to resend invite.');
    }
  };

  const handleDeleteRole = (role: TeamRole) => {
    if (role.is_system) {
      onShowToast('System roles cannot be deleted.');
      return;
    }
    setConfirmState({
      isOpen: true,
      title: `Delete Role "${role.name}"?`,
      message: `Are you sure you want to permanently delete the role "${role.name}"? This action cannot be undone.`,
      confirmLabel: 'Delete Role',
      onConfirm: async () => {
        setConfirmState((prev) => ({ ...prev, isOpen: false }));
        try {
          await dispatch(deleteRoleThunk(role.id)).unwrap();
          onShowToast(`Role "${role.name}" deleted.`);
        } catch {
          onShowToast('Failed to delete role.');
        }
      },
    });
  };

  const handleDeleteMember = (m: TeamMember) => {
    setConfirmState({
      isOpen: true,
      title: `Remove ${m.full_name}?`,
      message: `Remove "${m.full_name}" from the team? This will revoke their access and delete their user account.`,
      confirmLabel: 'Remove Member',
      onConfirm: async () => {
        setConfirmState((prev) => ({ ...prev, isOpen: false }));
        try {
          await dispatch(deleteMemberThunk(m.id)).unwrap();
          onShowToast(`"${m.full_name}" removed from team.`);
        } catch {
          onShowToast('Failed to remove member.');
        }
      },
    });
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#14294F] pb-4">
        <div>
          <span className="text-xs font-mono text-[#A78BFA] uppercase font-bold">RBAC MANAGEMENT</span>
          <h1 className="text-2xl font-black text-white">Team &amp; Access Control</h1>
        </div>
        <div className="flex items-center gap-2">
          {subTab === 'roles' ? (
            <button
              onClick={() => setRoleDrawer({ open: true, role: null, isNew: true })}
              className="px-4 py-2 bg-[#A78BFA] hover:bg-[#9370E8] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-lg transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">add_circle</span>
              New Role
            </button>
          ) : (
            <button
              onClick={() => setMemberDrawer({ open: true, member: null, isNew: true })}
              className="px-4 py-2 bg-[#0D95FE] hover:bg-[#0C84E4] text-[#002447] font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-lg shadow-[#0D95FE]/20 transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">person_add</span>
              Invite Member
            </button>
          )}
        </div>
      </div>

      {/* Sub-tab toggle */}
      <div className="flex gap-1 bg-[#05112A] rounded-2xl p-1 w-fit border border-[#14294F]">
        {([
          { id: 'members', label: 'Team Members', icon: 'group', count: members.length },
          { id: 'roles', label: 'Roles & Permissions', icon: 'admin_panel_settings', count: roles.length },
        ] as const).map((t) => (
          <button
            key={t.id}
            onClick={() => setSubTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              subTab === t.id
                ? 'bg-[#0A1B3D] text-white shadow-sm'
                : 'text-[#7B9CD2] hover:text-[#A8BBD6]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">{t.icon}</span>
            {t.label}
            <span className="px-1.5 py-0.5 bg-[#14294F] text-[#7B9CD2] rounded-full text-[10px] font-mono">{t.count}</span>
          </button>
        ))}
      </div>

      {/* ─── Members Panel ─── */}
      {subTab === 'members' && (
        <div className="flex flex-col gap-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[16px] text-[#7B9CD2]">search</span>
              <input
                type="text"
                value={memberSearch}
                onChange={(e) => setMemberSearch(e.target.value)}
                placeholder="Search by name, email, job title…"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#05112A] border border-[#14294F] text-sm text-white placeholder-[#7B9CD2] focus:outline-none focus:border-[#0D95FE] transition-colors"
              />
            </div>
            <select
              value={memberStatusFilter}
              onChange={(e) => setMemberStatusFilter(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-[#05112A] border border-[#14294F] text-sm text-white focus:outline-none focus:border-[#0D95FE] transition-colors cursor-pointer"
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          {/* List */}
          {membersLoading ? (
            <AdminTableSkeleton rows={4} />
          ) : members.length === 0 ? (
            <EmptyState
              icon="group"
              title="No team members yet"
              description="Invite your first team member by clicking the Invite Member button above."
            />
          ) : (
            <div className="flex flex-col gap-2">
              {members.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl bg-[#05112A] border border-[#14294F] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Avatar name={m.full_name} />
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-white truncate">{m.full_name}</span>
                        <StatusBadge status={m.status} hasAccepted={m.has_accepted} />
                      </div>
                      <span className="text-[11px] text-[#7B9CD2]">{m.email}</span>
                      <div className="flex items-center gap-2 flex-wrap mt-0.5">
                        <span className={`text-[10px] font-mono font-bold capitalize ${DEPT_COLOURS[m.department] || 'text-[#7B9CD2]'}`}>
                          {m.department.replace('_', ' ')}
                        </span>
                        {m.job_title && (
                          <span className="text-[10px] text-[#7B9CD2]">· {m.job_title}</span>
                        )}
                        {m.role && (
                          <span className="px-2 py-0.5 rounded-full bg-[#A78BFA]/15 text-[#A78BFA] text-[10px] font-mono">
                            {m.role.name}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 flex-wrap">
                    {(!m.has_accepted || m.status === 'invited') && (
                      <button
                        onClick={() => handleResendInvite(m)}
                        className="px-2.5 py-1.5 rounded-xl bg-[#F2A93B]/10 text-xs text-[#F2A93B] border border-[#F2A93B]/30 hover:bg-[#F2A93B]/20 cursor-pointer transition-all flex items-center gap-1.5 font-semibold"
                        title="Resend invitation email with new temporary credentials"
                      >
                        <span className="material-symbols-outlined text-[15px]">forward_to_inbox</span>
                        <span>Resend Invite</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleResetPassword(m)}
                      className="px-2.5 py-1.5 rounded-xl bg-[#0A1B3D] text-xs text-[#7B9CD2] hover:text-white border border-[#14294F] hover:border-[#0D95FE]/40 cursor-pointer transition-all flex items-center gap-1.5"
                      title="Reset member password and dispatch credentials"
                    >
                      <span className="material-symbols-outlined text-[15px]">lock_reset</span>
                      <span>Reset Pass</span>
                    </button>

                    <button
                      onClick={() => setMemberDrawer({ open: true, member: m, isNew: false })}
                      className="px-3 py-1.5 rounded-xl bg-[#0A1B3D] text-xs text-[#0D95FE] border border-[#14294F] hover:border-[#0D95FE]/40 cursor-pointer transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteMember(m)}
                      className="p-1.5 rounded-xl text-[#7B9CD2] hover:text-[#EF4444] hover:bg-[#EF4444]/10 cursor-pointer transition-all"
                      title="Remove member"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ─── Roles Panel ─── */}
      {subTab === 'roles' && (
        <div className="flex flex-col gap-4">
          {rolesLoading ? (
            <AdminCardsSkeleton count={4} />
          ) : roles.length === 0 ? (
            <EmptyState
              icon="admin_panel_settings"
              title="No roles defined"
              description="Create your first role to start managing team permissions."
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roles.map((role) => (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-5 rounded-2xl bg-[#05112A] border border-[#14294F] flex flex-col gap-4"
                >
                  {/* Role header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#A78BFA] text-[20px]">
                          {role.permissions.includes('*') ? 'admin_panel_settings' : 'shield'}
                        </span>
                        <h3 className="text-sm font-bold text-white">{role.name}</h3>
                        {role.is_system && (
                          <span className="px-1.5 py-0.5 rounded-full bg-[#F2A93B]/20 text-[#F2A93B] text-[9px] font-mono font-bold uppercase">
                            System
                          </span>
                        )}
                      </div>
                      {role.description && (
                        <p className="text-xs text-[#7B9CD2] leading-relaxed">{role.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => setRoleDrawer({ open: true, role, isNew: false })}
                        className="p-1.5 rounded-xl text-[#7B9CD2] hover:text-[#0D95FE] hover:bg-[#0D95FE]/10 cursor-pointer transition-all"
                        title="Edit role"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      {!role.is_system && (
                        <button
                          onClick={() => handleDeleteRole(role)}
                          className="p-1.5 rounded-xl text-[#7B9CD2] hover:text-[#EF4444] hover:bg-[#EF4444]/10 cursor-pointer transition-all"
                          title="Delete role"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1.5 text-[#7B9CD2]">
                      <span className="material-symbols-outlined text-[14px]">group</span>
                      <span>{role.member_count} member{role.member_count !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#7B9CD2]">
                      <span className="material-symbols-outlined text-[14px]">key</span>
                      {role.permissions.includes('*') ? (
                        <span className="text-[#F2A93B] font-mono">Full Access (*)</span>
                      ) : (
                        <span>{role.permissions.length} permission{role.permissions.length !== 1 ? 's' : ''}</span>
                      )}
                    </div>
                  </div>

                  {/* Permission chips (limited) */}
                  {!role.permissions.includes('*') && role.permissions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {role.permissions.slice(0, 5).map((p) => (
                        <span key={p} className="px-2 py-0.5 rounded-full bg-[#0D95FE]/10 text-[#0D95FE] text-[9px] font-mono">
                          {p}
                        </span>
                      ))}
                      {role.permissions.length > 5 && (
                        <span className="px-2 py-0.5 rounded-full bg-[#14294F] text-[#7B9CD2] text-[9px] font-mono">
                          +{role.permissions.length - 5} more
                        </span>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ─── Drawers ─── */}
      {roleDrawer.open && (
        <RoleDrawer
          role={roleDrawer.role}
          isNew={roleDrawer.isNew}
          allPermissions={allPermissions}
          onClose={() => setRoleDrawer({ open: false, role: null, isNew: false })}
          onSaved={() => {
            loadRoles();
          }}
          onShowToast={onShowToast}
        />
      )}

      {memberDrawer.open && (
        <MemberDrawer
          member={memberDrawer.member}
          isNew={memberDrawer.isNew}
          roles={roles}
          allPermissions={allPermissions}
          onClose={() => setMemberDrawer({ open: false, member: null, isNew: false })}
          onSaved={(saved, genPass, emailDispatched) => {
            loadMembers();
            if (genPass) {
              setCredentialsModal({
                isOpen: true,
                title: 'Team Member Invited',
                subtitle: `Account provisioned for ${saved.full_name}. Credentials dispatched to their inbox.`,
                memberName: saved.full_name,
                email: saved.email,
                password: genPass,
                emailSent: emailDispatched,
              });
            }
          }}
          onShowToast={onShowToast}
        />
      )}

      <CredentialsModal
        isOpen={credentialsModal.isOpen}
        title={credentialsModal.title}
        subtitle={credentialsModal.subtitle}
        memberName={credentialsModal.memberName}
        email={credentialsModal.email}
        password={credentialsModal.password}
        emailSent={credentialsModal.emailSent}
        onClose={() => setCredentialsModal((prev) => ({ ...prev, isOpen: false }))}
        onShowToast={onShowToast}
      />

      <ConfirmModal
        isOpen={confirmState.isOpen}
        title={confirmState.title}
        message={confirmState.message}
        confirmLabel={confirmState.confirmLabel}
        variant="danger"
        onConfirm={confirmState.onConfirm}
        onCancel={() => setConfirmState((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
