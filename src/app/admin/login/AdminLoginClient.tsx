'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AxooraLogo } from '../../../components/AxooraLogo';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../../store';
import { loginThunk, checkAuthThunk, clearAuthError } from '../../../store/slices/authSlice';

// ─── Animated number ticker ───────────────────────────────────────────────────

const STATS = [
  { label: 'Waitlist Leads', value: '4.8K+' },
  { label: 'POS Inquiries', value: '1.2K+' },
  { label: 'Platform Uptime', value: '99.9%' },
  { label: 'Active Merchants', value: '320+' },
];

export function AdminLoginClient() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { status, error: reduxError, isAuthenticated } = useAppSelector((state) => state.auth);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [localError, setLocalError] = useState<string | null>(null);
  const [statIndex, setStatIndex] = useState(0);

  const loading = status === 'loading';
  const error = localError || reduxError;

  // Rotate stats ticker
  useEffect(() => {
    const t = setInterval(() => setStatIndex((i) => (i + 1) % STATS.length), 3500);
    return () => clearInterval(t);
  }, []);

  // Check existing session via Redux
  useEffect(() => {
    dispatch(checkAuthThunk())
      .unwrap()
      .then(() => {
        router.replace('/admin');
      })
      .catch(() => {
        setCheckingSession(false);
      });
  }, [dispatch, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) return;

    setLocalError(null);
    dispatch(clearAuthError());

    try {
      await dispatch(loginThunk({ username: username.trim(), password })).unwrap();
      router.push('/admin');
    } catch (err: any) {
      setLocalError(typeof err === 'string' ? err : 'Invalid credentials. Please try again.');
    }
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-[#020B1D] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#0D95FE]/30 border-t-[#0D95FE] rounded-full animate-spin" />
          <span className="text-xs text-[#7B9CD2] font-mono">Checking session…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020B1D] flex">
      {/* ─── Left panel: branding + stats ─── */}
      <div className="hidden lg:flex lg:w-[55%] relative flex-col justify-between p-12 overflow-hidden">
        {/* Radial glow bg */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 70% at 30% 40%, rgba(13,149,254,0.12) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 70% 70%, rgba(0,223,143,0.08) 0%, transparent 70%)',
          }}
        />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(13,149,254,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(13,149,254,0.5) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <AxooraLogo />
          <div className="h-4 w-px bg-[#14294F]" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#0D95FE] bg-[#0D95FE]/10 px-2.5 py-1 rounded-full border border-[#0D95FE]/30">
            CMS Console v2.4
          </span>
        </div>

        {/* Hero copy */}
        <div className="relative flex flex-col gap-6 max-w-lg">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[11px] font-mono text-[#0D95FE] uppercase font-bold tracking-widest mb-3"
            >
              AXOORA FINANCIAL TECHNOLOGIES
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl xl:text-5xl font-black text-white tracking-tight leading-[1.1]"
            >
              Fintech
              <br />
              <span className="bg-gradient-to-r from-[#0D95FE] to-[#00DF8F] bg-clip-text text-transparent">
                Operations
              </span>
              <br />
              Center
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-[#7B9CD2] text-sm leading-relaxed max-w-sm"
            >
              Manage your content, team, waitlist leads, and platform
              settings — all from a single secure console.
            </motion.p>
          </div>

          {/* Live stats ticker */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="p-3.5 rounded-2xl bg-[#05112A] border border-[#14294F] flex flex-col gap-1"
                >
                  <span className="text-[10px] font-mono text-[#7B9CD2] uppercase">{s.label}</span>
                  <span className="text-xl font-black text-white">{s.value}</span>
                </motion.div>
              ))}
            </div>

            {/* Rotating live status pill */}
            <AnimatePresence mode="wait">
              <motion.div
                key={statIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="flex items-center gap-2 text-xs font-mono text-[#00DF8F] bg-[#00DF8F]/10 border border-[#00DF8F]/30 px-3 py-2 rounded-xl w-fit"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#00DF8F] animate-pulse" />
                <span>LIVE — {STATS[statIndex].label}: {STATS[statIndex].value}</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* CBN compliance badge */}
        <div className="relative flex items-center gap-3 text-xs text-[#7B9CD2]">
          <span className="material-symbols-outlined text-[16px] text-[#00DF8F]">verified_user</span>
          <span>CBN Licensed · NDIC Protected · 256-bit TLS Encrypted</span>
        </div>
      </div>

      {/* ─── Right panel: login form ─── */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 bg-[#020B1D] lg:bg-[#030E26] lg:border-l lg:border-[#14294F]">
        {/* Mobile logo */}
        <div className="lg:hidden mb-8 flex items-center gap-3">
          <AxooraLogo />
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#0D95FE] bg-[#0D95FE]/10 px-2 py-0.5 rounded-full border border-[#0D95FE]/30">
            CMS Console
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm flex flex-col gap-8"
        >
          {/* Header */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#0D95FE] font-bold">
              SECURE ACCESS PORTAL
            </span>
            <h2 className="text-2xl font-black text-white">Sign in to your workspace</h2>
            <p className="text-xs text-[#7B9CD2] leading-relaxed">
              Use your Axoora platform credentials to access the CMS.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="admin-username" className="text-xs font-semibold text-[#A8BBD6]">
                Username or Email
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[18px] text-[#7B9CD2]">
                  person
                </span>
                <input
                  id="admin-username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. admin or admin@axoora.ai"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#05112A] border border-[#14294F] text-sm text-white placeholder-[#7B9CD2] focus:outline-none focus:border-[#0D95FE] transition-colors"
                  disabled={loading}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="admin-password" className="text-xs font-semibold text-[#A8BBD6]">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[18px] text-[#7B9CD2]">
                  lock
                </span>
                <input
                  id="admin-password"
                  type={showPass ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-[#05112A] border border-[#14294F] text-sm text-white placeholder-[#7B9CD2] focus:outline-none focus:border-[#0D95FE] transition-colors"
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7B9CD2] hover:text-[#A8BBD6] cursor-pointer"
                  tabIndex={-1}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPass ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/30 text-xs text-[#EF4444]">
                    <span className="material-symbols-outlined text-[16px]">error</span>
                    <span>{error}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !username.trim() || !password}
              className="mt-1 w-full py-3 bg-[#0D95FE] hover:bg-[#0C84E4] disabled:opacity-50 disabled:cursor-not-allowed text-[#00284D] font-bold text-sm rounded-xl shadow-lg shadow-[#0D95FE]/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#00284D]/30 border-t-[#00284D] rounded-full animate-spin" />
                  <span>Signing in…</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">login</span>
                  <span>Sign in to Console</span>
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div className="flex flex-col gap-2">
            <div className="h-px bg-[#14294F]" />
            <p className="text-[10px] text-[#7B9CD2] text-center leading-relaxed">
              This portal is restricted to authorised Axoora team members.
              <br />
              Unauthorised access attempts are logged and prosecutable under NDPR.
            </p>
            <div className="flex items-center justify-center gap-3 text-[10px] text-[#7B9CD2] font-mono">
              <span>🔒 256-bit TLS</span>
              <span>·</span>
              <span>Session-based Auth</span>
              <span>·</span>
              <span>RBAC Enforced</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
