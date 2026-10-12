'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InteractivePosTerminalProps {
  isLight?: boolean;
  onSimulateTap?: () => void;
}

export const InteractivePosTerminal: React.FC<InteractivePosTerminalProps> = ({
  isLight = false,
  onSimulateTap,
}) => {
  // 3D Rotation angles (in degrees) - angled view by default
  const [rotateY, setRotateY] = useState<number>(-18);
  const [rotateX, setRotateX] = useState<number>(10);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isAutoSpinning, setIsAutoSpinning] = useState<boolean>(true);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'approved'>('idle');

  const terminalRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; y: number; startRotY: number; startRotX: number }>({
    x: 0,
    y: 0,
    startRotY: -18,
    startRotX: 10,
  });
  const velocityRef = useRef<{ vx: number; vy: number }>({ vx: 0, vy: 0 });
  const lastPointerRef = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });
  const animationFrameRef = useRef<number | null>(null);

  // Auto-spin slowly and continuously so it rotates gracefully
  useEffect(() => {
    if (!isAutoSpinning || isDragging) return;

    let id: number;
    const spinLoop = () => {
      setRotateY((prev) => (prev + 0.35) % 360);
      id = requestAnimationFrame(spinLoop);
    };

    id = requestAnimationFrame(spinLoop);
    return () => cancelAnimationFrame(id);
  }, [isAutoSpinning, isDragging]);

  // Pointer drag event handlers for full 360° rotation with realistic inertia
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);

    setIsDragging(true);

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      startRotY: rotateY,
      startRotX: rotateX,
    };

    lastPointerRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: performance.now(),
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;

    const nextRotY = (dragStartRef.current.startRotY + dx * 0.7) % 360;
    const nextRotX = Math.max(-28, Math.min(28, dragStartRef.current.startRotX - dy * 0.4));

    setRotateY(nextRotY);
    setRotateX(nextRotX);

    const now = performance.now();
    const dt = Math.max(now - lastPointerRef.current.time, 16);
    velocityRef.current = {
      vx: (e.clientX - lastPointerRef.current.x) / dt,
      vy: (e.clientY - lastPointerRef.current.y) / dt,
    };

    lastPointerRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: now,
    };
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);

    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // ignore
    }

    let vx = velocityRef.current.vx * 10;
    let currentY = rotateY;

    const decayInertia = () => {
      if (Math.abs(vx) > 0.08) {
        vx *= 0.92;
        currentY = (currentY + vx) % 360;
        setRotateY(currentY);
        animationFrameRef.current = requestAnimationFrame(decayInertia);
      }
    };

    if (Math.abs(vx) > 0.4) {
      animationFrameRef.current = requestAnimationFrame(decayInertia);
    }
  };

  // Simulate payment processing
  const handleTriggerPayment = () => {
    if (paymentStatus === 'processing') return;
    setPaymentStatus('processing');
    onSimulateTap?.();

    setTimeout(() => {
      setPaymentStatus('approved');
      setTimeout(() => {
        setPaymentStatus('idle');
      }, 4000);
    }, 1200);
  };

  const normalizedAngle = ((rotateY % 360) + 360) % 360;
  const isBackVisible = normalizedAngle > 90 && normalizedAngle < 270;

  return (
    <div className="relative w-full flex flex-col items-center select-none py-2">
      {/* 3D Perspectived Stage for the POS Terminal */}
      <div
        className="w-full max-w-[340px] sm:max-w-[360px] aspect-[1/1.55] relative flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
        style={{ perspective: 1200 }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Animated 3D POS Shell */}
        <div
          ref={terminalRef}
          className="relative w-[260px] sm:w-[280px] h-[400px] sm:h-[430px] transition-transform duration-75 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            filter: isLight
              ? 'drop-shadow(0 25px 35px rgba(13, 149, 254, 0.35))'
              : 'drop-shadow(0 30px 50px rgba(0, 0, 0, 0.85)) drop-shadow(0 0 25px rgba(13, 149, 254, 0.3))',
          }}
        >
          {/* ========================================================================= */}
          {/* FRONT FACE: REALISTIC BLUE/BLACK AXOORA APEX PRO 4G SMART POS */}
          {/* ========================================================================= */}
          <div
            className="absolute inset-0 w-full h-full rounded-[40px] p-2.5 flex flex-col justify-between overflow-hidden border-2 border-[#1E88E5]/70"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              background:
                'linear-gradient(155deg, #0288D1 0%, #0D95FE 28%, #0059B3 65%, #003366 100%)',
              boxShadow:
                'inset 0 2px 5px rgba(255,255,255,0.45), inset 0 -6px 12px rgba(0,0,0,0.55)',
            }}
          >
            {/* Ergonomic Textured Side Grip Panels */}
            <div
              className="absolute bottom-0 left-0 w-14 h-48 bg-[#070C16] rounded-tr-[42px] pointer-events-none opacity-95 border-r border-[#14294F]/80"
              style={{
                clipPath: 'polygon(0 15%, 100% 45%, 100% 100%, 0 100%)',
              }}
            />
            <div
              className="absolute bottom-0 right-0 w-14 h-48 bg-[#070C16] rounded-tl-[42px] pointer-events-none opacity-95 border-l border-[#14294F]/80"
              style={{
                clipPath: 'polygon(0 45%, 100% 15%, 100% 100%, 0 100%)',
              }}
            />

            {/* Specular Glare across metallic blue casing */}
            <div
              className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay"
              style={{
                background:
                  'linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.85) 50%, transparent 80%)',
              }}
            />

            {/* ------------------------------------------------------------- */}
            {/* 1. TOP THERMAL PRINTER CHAMBER & PAPER EXIT */}
            {/* ------------------------------------------------------------- */}
            <div className="relative z-10 w-full pt-1 px-3 flex flex-col items-center">
              {/* Paper exit slit */}
              <div className="w-32 h-2.5 rounded-full bg-[#030914] border border-white/20 shadow-inner flex items-center justify-center">
                <div className="w-24 h-[1.5px] bg-[#00DF8F]/50 animate-pulse" />
              </div>

              {/* Thermal Receipt Paper Ejection Animation */}
              <motion.div
                animate={{
                  height: paymentStatus === 'approved' ? 88 : 34,
                  opacity: 1,
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-44 bg-[#FFFDF7] text-slate-900 font-mono rounded-t-sm shadow-md overflow-hidden px-2 pt-1 border-x border-t border-amber-200/70 z-20 -mt-0.5 text-center flex flex-col justify-start"
              >
                <div className="border-b border-dashed border-slate-400 pb-0.5 mb-0.5">
                  <span className="text-[8px] font-extrabold tracking-wider block text-slate-900">
                    AXOORA APEX PRO 4G
                  </span>
                  <span className="text-[6.5px] text-slate-600 block">
                    GARKI COMMERCIAL TERMINAL #7821
                  </span>
                </div>
                {paymentStatus === 'approved' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col text-[7px] text-left leading-tight py-0.5"
                  >
                    <div className="flex justify-between">
                      <span>SALE (NIBSS)</span>
                      <span className="font-bold">₦25,000.00</span>
                    </div>
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>STATUS: APPROVED</span>
                      <span>1.2s</span>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* 4 Status LEDs (Blue, Green, Yellow, Red) */}
              <div className="flex items-center gap-2 pt-1.5 pb-0.5">
                <div className="w-2 h-2 rounded-full bg-[#0D95FE] shadow-[0_0_6px_#0D95FE]" />
                <div
                  className={`w-2 h-2 rounded-full transition-colors ${
                    paymentStatus === 'approved'
                      ? 'bg-[#00DF8F] shadow-[0_0_8px_#00DF8F]'
                      : 'bg-emerald-500/50'
                  }`}
                />
                <div
                  className={`w-2 h-2 rounded-full transition-colors ${
                    paymentStatus === 'processing'
                      ? 'bg-amber-400 shadow-[0_0_8px_#F59E0B] animate-ping'
                      : 'bg-amber-500/30'
                  }`}
                />
                <div className="w-2 h-2 rounded-full bg-slate-700/50" />
              </div>

              {/* White Contactless / NFC waves symbol printed on the blue lid */}
              <div className="flex items-center gap-1.5 text-white/90">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M4.5 10.5c1.5-2 3.8-3 6.5-3s5 1 6.5 3l1.5-1.5C16.8 6.8 14 5.5 11 5.5s-5.8 1.3-8 3.5l1.5 1.5zm3 3c.9-1.2 2.2-1.8 3.5-1.8s2.6.6 3.5 1.8l1.5-1.5c-1.3-1.6-3.1-2.3-5-2.3s-3.7.7-5 2.3l1.5 1.5zm3 3c.6-.4 1.3-.5 2-.5s1.4.1 2 .5l1.5-1.5c-1-.8-2.2-1-3.5-1s-2.5.2-3.5 1l1.5 1.5z" />
                </svg>
                <span className="text-[8.5px] font-mono font-bold tracking-widest text-white/90">
                  APEX PRO 4G
                </span>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* 2. THE TOUCHSCREEN GLASS BEZEL & ANDROID DISPLAY */}
            {/* ------------------------------------------------------------- */}
            <div className="relative z-10 w-full h-[270px] sm:h-[295px] rounded-[24px] bg-[#000000] p-2 border border-slate-700/70 shadow-2xl flex flex-col justify-between overflow-hidden">
              {/* Bezel Top: Speaker Grille + Camera Lens */}
              <div className="w-full flex items-center justify-center gap-2 pb-1 shrink-0">
                <div className="w-8 h-1 rounded-full bg-neutral-800" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#0a1a36] border border-neutral-700 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-cyan-400/80" />
                </div>
              </div>

              {/* Live Android Screen Glass */}
              <div
                className="w-full flex-1 rounded-[18px] bg-[#0A162B] text-white p-2.5 flex flex-col justify-between overflow-hidden border border-white/10"
                style={{
                  background:
                    'linear-gradient(180deg, #0A1C3C 0%, #030C1C 60%, #010612 100%)',
                }}
              >
                {/* Android Status Bar */}
                <div className="flex items-center justify-between text-[9px] font-mono text-[#A8BBD6] pb-1 border-b border-white/10">
                  <span className="font-bold text-white">09:41</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8px] text-[#00DF8F] font-bold">MTN 4G</span>
                    <span className="material-symbols-outlined text-[11px]">wifi</span>
                    <span className="material-symbols-outlined text-[11px]">battery_full</span>
                  </div>
                </div>

                {/* Android Applications Header */}
                <div className="p-2 rounded-xl bg-gradient-to-r from-[#0D95FE] to-[#0055B3] text-white shadow-md my-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-md bg-white/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[14px]">store</span>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-tight">
                        AXOORA APEX PAY
                      </span>
                    </div>
                    <span className="text-[8px] font-mono px-1.5 py-0.5 rounded-full bg-[#00DF8F] text-[#003825] font-extrabold">
                      LIVE
                    </span>
                  </div>
                </div>

                {/* Transaction Amount & Tap Trigger */}
                <div className="p-2 rounded-xl bg-[#0F2447] border border-[#1E3A6B] flex flex-col items-center justify-center gap-0.5">
                  <span className="text-[8px] font-mono text-[#A8BBD6]">COLLECT PAYMENT</span>
                  <span className="text-xl font-black font-mono text-[#00DF8F] tracking-tight">
                    ₦25,000.00
                  </span>

                  {paymentStatus === 'idle' && (
                    <button
                      onClick={handleTriggerPayment}
                      className="mt-1 px-3 py-1 rounded-full bg-[#0D95FE] hover:bg-[#00DF8F] text-[#002447] hover:text-[#003825] text-[10px] font-extrabold flex items-center gap-1 transition-all cursor-pointer shadow-sm active:scale-95"
                    >
                      <span className="material-symbols-outlined text-[13px]">contactless</span>
                      <span>Tap or Insert to Pay</span>
                    </button>
                  )}

                  {paymentStatus === 'processing' && (
                    <div className="mt-1 flex items-center gap-1 text-[10px] font-mono text-[#0D95FE] animate-pulse">
                      <span className="w-2.5 h-2.5 border-2 border-[#0D95FE] border-t-transparent rounded-full animate-spin" />
                      <span>NIBSS Rail Verifying...</span>
                    </div>
                  )}

                  {paymentStatus === 'approved' && (
                    <div className="mt-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-[#00DF8F] text-[10px] font-mono font-bold flex items-center gap-1">
                      <span>✓ Credited in 1.2s</span>
                    </div>
                  )}
                </div>

                {/* Live Terminal Rails */}
                <div className="space-y-1 pt-1">
                  {[
                    { name: 'NIBSS Instant Settlement', sub: 'Sub-2s Real-time', color: '#00DF8F' },
                    { name: 'Dual-SIM 4G MTN/Airtel', sub: '99.98% Uptime', color: '#0D95FE' },
                  ].map((row, i) => (
                    <div
                      key={i}
                      className="p-1 rounded-lg bg-[#071326] border border-white/5 flex items-center justify-between text-[8.5px]"
                    >
                      <div className="flex items-center gap-1.5">
                        <div
                          className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px]"
                          style={{ backgroundColor: `${row.color}25`, color: row.color }}
                        >
                          ✓
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold leading-tight">{row.name}</span>
                          <span className="text-[7.5px] text-[#A8BBD6] font-mono">{row.sub}</span>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-[#00DF8F] text-[13px]">
                        arrow_downward
                      </span>
                    </div>
                  ))}
                </div>

                {/* Android Capacitive Navigation Keys */}
                <div className="pt-1 border-t border-white/10 flex items-center justify-around text-white/50 text-xs">
                  <span className="text-[10px]">▢</span>
                  <span className="text-[10px]">⌂</span>
                  <span className="text-[10px]">◁</span>
                </div>
              </div>
            </div>

            {/* Bottom Card Chip insertion slot */}
            <div className="relative z-10 w-full flex items-center justify-center pt-0.5 pb-1">
              <div className="w-20 h-1.5 rounded-full bg-[#030A14] border border-white/15" />
            </div>
          </div>

          {/* ========================================================================= */}
          {/* BACK FACE OF POS TERMINAL (Visible when rotated 180 degrees) */}
          {/* ========================================================================= */}
          <div
            className="absolute inset-0 w-full h-full rounded-[40px] p-5 flex flex-col justify-between overflow-hidden border-2 border-slate-700 bg-gradient-to-b from-[#0F1E38] via-[#091428] to-[#040A17] text-white shadow-2xl"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            {/* Top Barcode / Camera Scanner Window */}
            <div className="w-full flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                </div>
                <span className="text-[9px] font-mono text-[#A8BBD6]">Laser Scanner Window</span>
              </div>
              <span className="text-[8px] font-mono text-emerald-400">DUAL-SIM 4G</span>
            </div>

            {/* Ergonomic Hand Grip Ridge & Battery Hatch */}
            <div className="my-auto p-4 rounded-2xl bg-[#060F1E] border border-white/10 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-white">REMOVABLE BATTERY PACK</span>
                <span className="text-[9px] font-mono text-emerald-400">5200 mAh · 72h</span>
              </div>

              {/* Rear Regulatory Plate */}
              <div className="p-2.5 rounded-xl bg-black/60 border border-white/15 font-mono text-[8px] text-[#A8BBD6] space-y-1">
                <div className="flex justify-between font-bold text-white">
                  <span>AXOORA APEX PRO 4G</span>
                  <span>CBN APPROVED</span>
                </div>
                <div className="flex justify-between">
                  <span>MODEL: AP-800</span>
                  <span>NIBSS CERTIFIED</span>
                </div>
                <div className="flex justify-between text-white/50">
                  <span>S/N: AX-2026-99201</span>
                  <span>MADE FOR NIGERIA</span>
                </div>
              </div>
            </div>

            {/* Bottom Charging Contacts */}
            <div className="w-full flex items-center justify-center gap-4 pt-2 border-t border-white/10">
              <div className="w-3 h-1.5 rounded-sm bg-amber-400/80" />
              <div className="w-3 h-1.5 rounded-sm bg-amber-400/80" />
              <div className="w-3 h-1.5 rounded-sm bg-amber-400/80" />
            </div>
          </div>

          {/* Side Hardware Features: Blue buttons on left side, Card swipe groove on right */}
          <div className="absolute left-[-4px] top-[140px] w-[4px] h-[22px] bg-[#0055B3] rounded-l-sm" />
          <div className="absolute left-[-4px] top-[170px] w-[4px] h-[22px] bg-[#0055B3] rounded-l-sm" />
          <div className="absolute right-[-3px] top-[110px] w-[3px] h-[180px] bg-[#050D1A] rounded-r-sm border-l border-white/10" />
        </div>
      </div>
    </div>
  );
};
