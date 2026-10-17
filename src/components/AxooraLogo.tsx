'use client';

import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface AxooraLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon';
  theme?: 'dark' | 'light' | 'auto';
}

export const AxooraLogo: React.FC<AxooraLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'full',
  theme = 'auto',
}) => {
  // Access global theme to make sure logo text is always crisp & visible
  let activeTheme = 'dark';
  try {
    const themeContext = useTheme();
    activeTheme = themeContext.theme;
  } catch {
    // fallback if used outside provider
  }

  const effectiveTheme = theme === 'auto' ? activeTheme : theme;
  const isLight = effectiveTheme === 'light';

  // Height sizing
  const heightClasses = {
    sm: 'h-6',
    md: 'h-8 sm:h-9',
    lg: 'h-10 sm:h-12',
  }[size];

  const wordmarkTextColor = isLight ? 'text-[#0A1B3D]' : 'text-[#F2F5F9]';

  return (
    <div className={`inline-flex items-center gap-2.5 ${heightClasses} ${className}`}>
      {/* Official Axoora Diamond Wave Emblem */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto aspect-square shrink-0 select-none"
      >
        <defs>
          <linearGradient id="axooraDiamondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0C91FA" />
            <stop offset="45%" stopColor="#0D95FE" />
            <stop offset="100%" stopColor="#075FBE" />
          </linearGradient>
          <filter id="axooraGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#0C91FA" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Rounded Rhombus / Diamond Base */}
        <g filter="url(#axooraGlow)">
          <path
            d="M 50 8 
               C 54 8, 57 11, 88 42
               C 92 46, 92 54, 88 58
               C 57 89, 54 92, 50 92
               C 46 92, 43 89, 12 58
               C 8 54, 8 46, 12 42
               C 43 11, 46 8, 50 8 Z"
            fill="url(#axooraDiamondGrad)"
          />
          {/* Characteristic Smooth Flowing White Wave Crest */}
          <path
            d="M 12 53
               C 22 55, 33 46, 42 41
               C 47 38, 53 38, 58 41
               C 67 46, 78 55, 88 53
               C 88 55, 87 57, 85 59
               C 76 59, 65 50, 56 46
               C 52 44, 48 44, 44 46
               C 35 50, 24 59, 15 59
               C 13 57, 12 55, 12 53 Z"
            fill="#FFFFFF"
          />
        </g>
      </svg>

      {/* Official "axoora" Geometric Lowercase Wordmark with Linked 'oo' */}
      {variant === 'full' && (
        <span className={`font-extrabold tracking-tight text-xl sm:text-2xl lowercase leading-none ${wordmarkTextColor} transition-colors select-none flex items-center font-sans`}>
          <span>ax</span>
          <span className="relative flex items-center mx-[0.5px]">
            <span className="text-[#0C91FA] font-black">oo</span>
            {/* Subtle infinity link bridge */}
            <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="w-2.5 h-[3px] bg-[#0C91FA] rounded-full -ml-[1px]" />
            </span>
          </span>
          <span>ra</span>
          <span className="text-[#00DF8F] ml-0.5 text-xs font-mono font-bold tracking-normal">.</span>
        </span>
      )}
    </div>
  );
};
