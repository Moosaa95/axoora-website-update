'use client';

import React, { useState, useRef, useEffect } from 'react';

interface InteractiveAtmCardProps {
  isLight?: boolean;
}

export const InteractiveAtmCard: React.FC<InteractiveAtmCardProps> = ({ isLight = false }) => {
  // 3D Rotation angles (in degrees)
  const [rotateY, setRotateY] = useState<number>(-15);
  const [rotateX, setRotateX] = useState<number>(8);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; y: number; startRotY: number; startRotX: number }>({
    x: 0,
    y: 0,
    startRotY: -15,
    startRotX: 8,
  });
  const velocityRef = useRef<{ vx: number; vy: number }>({ vx: 0, vy: 0 });
  const lastPointerRef = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });
  const animationFrameRef = useRef<number | null>(null);

  // Auto-spin slowly and continuously by default (Graceful and smooth)
  useEffect(() => {
    if (isDragging) return;

    let id: number;
    const spinLoop = () => {
      setRotateY((prev) => (prev + 0.35) % 360);
      id = requestAnimationFrame(spinLoop);
    };

    id = requestAnimationFrame(spinLoop);
    return () => cancelAnimationFrame(id);
  }, [isDragging]);

  // Pointer drag event handlers for mouse spin with smooth inertia
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

    const nextRotY = (dragStartRef.current.startRotY + dx * 0.75) % 360;
    const nextRotX = Math.max(-35, Math.min(35, dragStartRef.current.startRotX - dy * 0.45));

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

    let vx = velocityRef.current.vx * 12;
    let currentY = rotateY;

    const decayInertia = () => {
      if (Math.abs(vx) > 0.08) {
        vx *= 0.93;
        currentY = (currentY + vx) % 360;
        setRotateY(currentY);
        animationFrameRef.current = requestAnimationFrame(decayInertia);
      }
    };

    if (Math.abs(vx) > 0.4) {
      animationFrameRef.current = requestAnimationFrame(decayInertia);
    }
  };

  // Specular reflection calculations
  const normalizedAngle = ((rotateY % 360) + 360) % 360;
  const glarePosition = `${((normalizedAngle / 360) * 100).toFixed(0)}%`;

  return (
    <div className="w-full flex flex-col items-center select-none py-2 relative">
      {/* Soft studio ambient glow in light mode to make the emerald card pop */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[420px] h-[280px] sm:h-[340px] rounded-full blur-[80px] pointer-events-none transition-opacity duration-300 ${
          isLight
            ? 'bg-gradient-to-tr from-emerald-400/20 via-sky-400/20 to-teal-400/15 opacity-80'
            : 'bg-gradient-to-tr from-[#00DF8F]/15 via-[#0D95FE]/15 to-transparent opacity-60'
        }`}
      />

      {/* 3D Perspectived Stage - JUST THE FLOATING AUTO-SPINNING CARD */}
      <div
        className="w-full max-w-[420px] aspect-[1.586/1] relative flex items-center justify-center cursor-grab active:cursor-grabbing touch-none my-2 z-10"
        style={{ perspective: 1200 }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Animated 3D Card Shell */}
        <div
          ref={cardRef}
          className="dark-hardware preserve-dark relative w-full h-full rounded-[24px] sm:rounded-[28px] transition-transform duration-75 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            boxShadow: isLight
              ? '0 25px 50px -12px rgba(13, 149, 254, 0.25), 0 10px 20px -5px rgba(0, 0, 0, 0.1)'
              : '0 25px 60px -10px rgba(0, 0, 0, 0.8), 0 0 35px -5px rgba(13, 149, 254, 0.3)',
          }}
        >
          {/* ============================================================== */}
          {/* FRONT FACE OF CARD (rotateY = 0) */}
          {/* ============================================================== */}
          <div
            className="dark-hardware preserve-dark absolute inset-0 w-full h-full rounded-[24px] sm:rounded-[28px] p-5 sm:p-7 flex flex-col justify-between overflow-hidden border-2 bg-gradient-to-br from-[#02182B] via-[#042838] to-[#0A3D2E] border-[#00DF8F]/40 text-white transition-all"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(0deg)',
            }}
          >
            {/* Dynamic Specular Lighting Glare */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
              style={{
                background: `linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.7) ${glarePosition}, transparent 80%)`,
              }}
            />

            {/* Micro-texture lines */}
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 50% 50%, #00DF8F 1px, transparent 1px)',
                backgroundSize: '16px 16px',
              }}
            />

            {/* Top Bar: Brand Logo & Chip */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-[#00DF8F] to-[#0D95FE] flex items-center justify-center font-black text-white text-xs sm:text-sm shadow-md">
                  ▲
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="font-extrabold tracking-tight text-sm sm:text-base text-white">
                    AXOORA
                  </span>
                  <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-[#00DF8F] uppercase">
                    PLATINUM DEBIT
                  </span>
                </div>
              </div>

              {/* Contactless waves symbol */}
              <div className="flex items-center gap-1 opacity-80">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-white/90" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" opacity="0"/>
                  <path d="M4.5 10.5c1.5-2 3.8-3 6.5-3s5 1 6.5 3l1.5-1.5C16.8 6.8 14 5.5 11 5.5s-5.8 1.3-8 3.5l1.5 1.5zm3 3c.9-1.2 2.2-1.8 3.5-1.8s2.6.6 3.5 1.8l1.5-1.5c-1.3-1.6-3.1-2.3-5-2.3s-3.7.7-5 2.3l1.5 1.5zm3 3c.6-.4 1.3-.5 2-.5s1.4.1 2 .5l1.5-1.5c-1-.8-2.2-1-3.5-1s-2.5.2-3.5 1l1.5 1.5z"/>
                </svg>
              </div>
            </div>

            {/* Middle: EMV Gold Chip & Holographic Seal */}
            <div className="relative z-10 flex items-center justify-between my-auto pt-2">
              {/* EMV Smart Chip */}
              <div className="w-11 sm:w-13 h-8 sm:h-10 rounded-lg bg-gradient-to-br from-[#FFE29F] via-[#FFAE34] to-[#C77C1E] p-[1.5px] shadow-md border border-[#8C5413]">
                <div className="w-full h-full rounded-[6px] grid grid-cols-3 grid-rows-2 gap-[1px] p-[2px] bg-[#E3A330]/40">
                  <div className="border border-[#7A490F]/40 rounded-xs" />
                  <div className="border border-[#7A490F]/40 rounded-xs" />
                  <div className="border border-[#7A490F]/40 rounded-xs" />
                  <div className="border border-[#7A490F]/40 rounded-xs" />
                  <div className="border border-[#7A490F]/40 rounded-xs" />
                  <div className="border border-[#7A490F]/40 rounded-xs" />
                </div>
              </div>

              {/* Holographic Security Stamp */}
              <div
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/30 shadow-inner flex items-center justify-center text-[9px] font-mono font-bold"
                style={{
                  background:
                    'conic-gradient(from 180deg at 50% 50%, #00DF8F 0deg, #0D95FE 90deg, #F2A93B 180deg, #9C27B0 270deg, #00DF8F 360deg)',
                  opacity: 0.85,
                }}
              >
                <span className="text-white drop-shadow">CBN</span>
              </div>
            </div>

            {/* Card Number Row */}
            <div className="relative z-10 pt-2">
              <div className="font-mono text-base sm:text-xl font-bold tracking-[0.22em] text-white drop-shadow-md">
                5399 •••• •••• 8421
              </div>
            </div>

            {/* Bottom Row: Cardholder Name, Expiry & Network Brand */}
            <div className="relative z-10 flex items-end justify-between pt-1">
              <div className="flex flex-col">
                <span className="text-[8px] font-mono uppercase tracking-wider text-white/60">
                  CARDHOLDER
                </span>
                <span className="text-xs sm:text-sm font-semibold tracking-wider text-white uppercase">
                  AYOMIDE BELLO
                </span>
              </div>

              <div className="flex items-end gap-4">
                <div className="flex flex-col text-right">
                  <span className="text-[8px] font-mono uppercase tracking-wider text-white/60">
                    EXPIRES
                  </span>
                  <span className="text-xs font-mono font-bold text-white">10/29</span>
                </div>

                {/* Mastercard Network Logo */}
                <div className="flex items-center -space-x-2.5">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#EB001B] opacity-90 shadow-sm" />
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#F79E1B] opacity-90 shadow-sm" />
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* BACK FACE OF CARD (rotateY = 180) */}
          {/* ============================================================== */}
          <div
            className="dark-hardware preserve-dark absolute inset-0 w-full h-full rounded-[24px] sm:rounded-[28px] py-5 flex flex-col justify-between overflow-hidden border-2 bg-gradient-to-br from-[#031526] via-[#052433] to-[#0A3D2E] border-[#00DF8F]/40 text-white transition-all"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            {/* Magnetic Stripe */}
            <div className="w-full h-11 sm:h-12 bg-[#00050E] border-y border-white/10 shadow-inner mt-2" />

            {/* Signature Panel & CVV Box */}
            <div className="px-6 flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-9 rounded-sm bg-slate-100 flex items-center px-3 justify-between shadow-inner">
                  <span className="font-serif italic text-xs text-slate-800 select-none">
                    Ayomide Bello
                  </span>
                  <span className="text-[8px] font-mono text-slate-400">AUTHORIZED SIGNATURE</span>
                </div>
                <div className="w-14 h-9 rounded-sm bg-white flex flex-col items-center justify-center border border-slate-300">
                  <span className="text-[8px] font-mono text-slate-500 uppercase">CVV</span>
                  <span className="font-mono text-xs font-bold text-slate-900">842</span>
                </div>
              </div>

              {/* Disclaimer / Assurance Copy */}
              <div className="text-[9px] font-mono leading-relaxed text-white/70 pt-2 flex flex-col gap-1">
                <p>
                  This card is issued by Axoora under Central Bank of Nigeria authorization.
                  Eligible deposits are insured up to statutory limits by NDIC.
                </p>
                <div className="flex items-center justify-between text-[8px] text-white/50 pt-1 border-t border-white/15">
                  <span>24/7 Priority Support: 0700-AXOORA</span>
                  <span>help@axoora.com</span>
                </div>
              </div>
            </div>

            {/* Bottom Bar: Hologram & Network */}
            <div className="px-6 flex items-center justify-between text-xs pb-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-[#00DF8F]">
                  SUB-2S IDEMPOTENT RAILS
                </span>
              </div>
              <span className="text-[10px] font-mono opacity-60">MADE FOR NIGERIA</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
