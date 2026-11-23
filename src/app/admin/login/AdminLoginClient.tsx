'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  User,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  LogIn,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { AxooraLogo } from '../../../components/AxooraLogo';
import { useAppDispatch, useAppSelector } from '../../../store';
import { loginThunk, checkAuthThunk, clearAuthError } from '../../../store/slices/authSlice';

// ─── Animated Platform Stats Ticker ──────────────────────────────────────────

const STATS = [
  { label: 'Waitlist Leads', value: '4.8K+' },
  { label: 'Bulk Batch Runs', value: '180+' },
  { label: 'Platform Uptime', value: '99.98%' },
  { label: 'Verified Merchants', value: '320+' },
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
      <div className="min-h-screen bg-[#020F2E] flex items-center justify-center font-['DM_Sans',sans-serif]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#0976da]/30 border-t-[#0976da] rounded-full animate-spin" />
          <span className="text-xs text-[#8492a6]">Verifying credentials…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020F2E] text-[#F2F5F9] flex font-['DM_Sans',sans-serif]">
      {/* ─── Left panel: branding + stats ─── */}
      <div className="hidden lg:flex lg:w-[55%] relative flex-col justify-between p-12 overflow-hidden bg-[#020F2E] border-r border-[#0e214d]">
        {/* Ambient radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 60% at 30% 40%, rgba(4,62,151,0.2) 0%, transparent 70%)',
          }}
        />

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <AxooraLogo size="sm" theme="dark" />
          <div className="h-4 w-px bg-[#162C5B]" />
          <span className="text-[11px] font-bold tracking-wider text-[#53a8f5] bg-[#043e97]/25 px-2.5 py-1 rounded-full border border-[#043e97]/40">
            Console v2.4
          </span>
        </div>

        {/* Hero copy */}
        <div className="relative flex flex-col gap-6 max-w-lg">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[11px] text-[#53a8f5] uppercase font-bold tracking-wider mb-3 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              Axoora Financial Technologies
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl xl:text-5xl font-bold text-white tracking-tight leading-[1.08]"
            >
              Central Operating
              <br />
              <span className="text-[#53a8f5]">Platform</span>
              <br />
              Console
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 text-[#8492a6] text-sm leading-relaxed max-w-sm"
            >
              Control business cashflows, NIBSS batch payouts, customer cards, savings plans, and platform content from one secure console.
            </motion.p>
          </div>

          {/* Live stats ticker */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="p-4 rounded-2xl bg-[#071739] border border-[#162C5B] flex flex-col gap-1 shadow-sm"
                >
                  <span className="text-[10.5px] text-[#8492a6] uppercase font-bold">{s.label}</span>
                  <span className="text-xl font-bold text-white">{s.value}</span>
                </motion.div>
              ))}
            </div>

            {/* Rotating live status pill */}
            <AnimatePresence mode="wait">
              <motion.div
                key={statIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-2 rounded-xl w-fit"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>LIVE SYSTEM · {STATS[statIndex].label}: {STATS[statIndex].value}</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Compliance badge */}
        <div className="relative flex items-center gap-2 text-xs text-[#8492a6]">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>CBN Licensed · NDIC Protected · 256-bit TLS Encrypted</span>
        </div>
      </div>

      {/* ─── Right panel: login form ─── */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 bg-[#020F2E] lg:bg-[#041338]">
        {/* Mobile logo */}
        <div className="lg:hidden mb-8 flex items-center gap-3">
          <AxooraLogo size="sm" theme="dark" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#53a8f5] bg-[#043e97]/20 px-2 py-0.5 rounded-full border border-[#043e97]/30">
            Console
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-sm flex flex-col gap-6"
        >
          {/* Header */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] uppercase tracking-wider text-[#53a8f5] font-bold">
              SECURE ACCESS
            </span>
            <h2 className="text-2xl font-bold text-white">Sign in to console</h2>
            <p className="text-xs text-[#8492a6] leading-relaxed">
              Use your Axoora staff credentials to access the administrative dashboard.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="admin-username" className="text-xs font-semibold text-[#8492a6]">
                Username or Email
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#8492a6] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="admin-username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. admin or admin@axoora.ai"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#071739] border border-[#162C5B] text-sm text-white placeholder-[#6c7a89] focus:outline-none focus:border-[#0976da] transition-colors"
                  disabled={loading}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="admin-password" className="text-xs font-semibold text-[#8492a6]">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8492a6] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="admin-password"
                  type={showPass ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-[#071739] border border-[#162C5B] text-sm text-white placeholder-[#6c7a89] focus:outline-none focus:border-[#0976da] transition-colors"
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8492a6] hover:text-white transition cursor-pointer"
                  tabIndex={-1}
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
                  <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !username.trim() || !password}
              className="mt-1 w-full py-3 bg-[#043e97] hover:bg-[#0976da] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing in…</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Sign in to Console</span>
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div className="flex flex-col gap-2 pt-2 border-t border-[#162C5B]">
            <p className="text-[11px] text-[#8492a6] text-center leading-relaxed">
              This portal is restricted to authorised Axoora team members.
            </p>
            <div className="flex items-center justify-center gap-3 text-[10px] text-[#6c7a89]">
              <span>🔒 256-bit TLS</span>
              <span>·</span>
              <span>Session Auth</span>
              <span>·</span>
              <span>RBAC Enforced</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
