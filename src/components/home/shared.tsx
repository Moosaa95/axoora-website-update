'use client';

import React from 'react';

/** Design tokens (Figma "Direction A"). */
export const ink = '#161c22';
export const blue900 = '#043e97';
export const blue600 = '#0976da';

const maskIcon = (src: string, size: number, color: string) => (
  <span
    aria-hidden
    className="inline-block shrink-0"
    style={{
      width: size,
      height: size,
      backgroundColor: color,
      WebkitMask: `url(${src}) center / contain no-repeat`,
      mask: `url(${src}) center / contain no-repeat`,
    }}
  />
);

type StoreTone = 'onBlue' | 'onBlueAlt' | 'onLight';

const storeTones: Record<StoreTone, { fillBg: string; fillFg: string; outline: string; hover: string }> = {
  // White pill on the blue hero (personal)
  onBlue: { fillBg: '#ffffff', fillFg: ink, outline: '#ffffff', hover: 'hover:bg-white/10' },
  // White pill with blue label (business hero and CTA band)
  onBlueAlt: { fillBg: '#ffffff', fillFg: blue900, outline: '#ffffff', hover: 'hover:bg-white/10' },
  // Ink pill on a light page
  onLight: { fillBg: ink, fillFg: '#ffffff', outline: ink, hover: 'hover:bg-slate-100' },
};

export const StoreButtons: React.FC<{
  tone: StoreTone;
  onApp: () => void;
  onWhatsApp: () => void;
  className?: string;
}> = ({ tone, onApp, onWhatsApp, className = '' }) => {
  const t = storeTones[tone];
  const outlineFg = tone === 'onLight' ? ink : '#ffffff';
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <button
        type="button"
        onClick={onApp}
        style={{ backgroundColor: t.fillBg, color: t.fillFg }}
        className="h-[54px] px-[22px] rounded-[10px] text-[16px] font-medium flex items-center gap-[11px] cursor-pointer transition hover:opacity-90"
      >
        <span className="flex items-center gap-[9px]">
          {maskIcon('/brand/apple-dark.svg', 22, t.fillFg)}
          {maskIcon('/brand/play-dark.svg', 20, t.fillFg)}
        </span>
        Get the app
      </button>
      <button
        type="button"
        onClick={onWhatsApp}
        style={{ borderColor: t.outline, color: outlineFg }}
        className={`h-[54px] pl-[22px] pr-6 rounded-[10px] border-[1.5px] text-[16px] font-bold flex items-center justify-center gap-2.5 cursor-pointer transition ${t.hover}`}
      >
        {maskIcon('/brand/whatsapp-white.svg', 21, outlineFg)}
        Start on WhatsApp
      </button>
    </div>
  );
};

/** Black phone bezel with a white screen. `width` is the outer width. */
export const PhoneFrame: React.FC<{
  width: number;
  height: number;
  radius?: number;
  children: React.ReactNode;
  className?: string;
}> = ({ width, height, radius = 48, children, className = '' }) => (
  <div
    className={`relative bg-[#161c22] pt-[10px] px-[10px] flex flex-col shrink-0 ${className}`}
    style={{ width, height, borderTopLeftRadius: radius, borderTopRightRadius: radius }}
  >
    <div
      className="relative flex-1 overflow-hidden bg-white text-[#161c22] font-['IBM_Plex_Sans',sans-serif]"
      style={{ borderTopLeftRadius: radius - 9, borderTopRightRadius: radius - 9 }}
    >
      {children}
    </div>
  </div>
);

export const PhoneStatusBar: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`h-[36px] flex items-center justify-between text-[10.8px] font-semibold ${className}`}>
    <span>9:41</span>
    <span className="text-[9.2px]">●●●●</span>
  </div>
);

/** ₦112,430.00 — currency mark, digits, then muted decimals. */
export const Money: React.FC<{
  amount: string;
  decimals?: string;
  big?: number;
  small?: number;
  sign?: string;
  className?: string;
  mutedClass?: string;
}> = ({ amount, decimals = '.00', big = 33.8, small, sign, className = '', mutedClass = 'text-[#4c5866]' }) => (
  <span className={`inline-flex items-baseline gap-[1.5px] whitespace-nowrap ${className}`}>
    {sign && <span style={{ fontSize: big }} className="font-semibold">{sign}</span>}
    <span style={{ fontSize: small ?? big * 0.727 }} className="font-medium">₦</span>
    <span style={{ fontSize: big }} className="font-semibold tracking-[-0.025em]">{amount}</span>
    <span style={{ fontSize: big }} className={`font-semibold tracking-[-0.025em] ${mutedClass}`}>{decimals}</span>
  </span>
);

export const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => (
  <div className={`bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-[20px] ${className}`}>
    {children}
  </div>
);

/** Section heading used on every lower section (Figma: ~36px, 1.17 lh, -0.04em). */
export const SectionHeading: React.FC<{ children: React.ReactNode; size?: number; className?: string }> = ({
  children,
  size = 36,
  className = '',
}) => (
  <h2
    style={{ fontSize: size, lineHeight: `${Math.round(size * 1.17)}px` }}
    className={`font-bold tracking-[-0.04em] text-[#161c22] dark:text-white ${className}`}
  >
    {children}
  </h2>
);

export const Eyebrow: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <span className={`text-[13px] font-bold leading-[17px] tracking-[0.02em] text-[#0976da] ${className}`}>{children}</span>
);

export const SectionWrap: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 ${className}`}>{children}</div>
);

/** Filled blue circle with a white tick (checklist bullet). */
export const CheckBullet: React.FC = () => (
  <span className="w-[18px] h-[18px] rounded-full bg-[#0976da] flex items-center justify-center shrink-0">
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5.2 4.1 7.2 8 3" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  </span>
);
