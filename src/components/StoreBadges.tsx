'use client';

import React from 'react';

interface StoreBadgeProps {
  onClick?: () => void;
  className?: string;
  isLight?: boolean;
}

export const AppleAppStoreBadge: React.FC<StoreBadgeProps> = ({
  onClick,
  className = '',
  isLight = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2.5 rounded-xl border flex items-center gap-3 transition-all cursor-pointer shadow-sm active:scale-95 ${
        isLight
          ? 'bg-black text-white border-black hover:bg-neutral-800'
          : 'bg-[#0A1B3D] text-white border-[#14294F] hover:bg-[#14294F] hover:border-[#0D95FE]/50'
      } ${className}`}
      title="Download on Apple App Store"
    >
      {/* Official Apple Logo SVG */}
      <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 170 170" aria-hidden="true">
        <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.07-7.73-7.91-12.1-14.52-6.52-9.87-11.66-21.2-15.42-34-3.75-12.79-5.63-25.04-5.63-36.75 0-15.45 3.79-28.16 11.37-38.12 7.58-9.97 17.06-15.06 28.44-15.28 4.8.12 10.3 1.29 16.51 3.52 6.22 2.23 10.42 3.38 12.61 3.46 1.83 0 6.07-1.15 12.72-3.46 6.64-2.31 12.19-3.43 16.63-3.37 12.98.67 23.36 5.56 31.14 14.67-11.39 6.89-16.96 16.48-16.71 28.77.25 9.77 4.02 17.84 11.31 24.23 7.29 6.39 16.03 10.15 26.22 11.27-2.31 6.88-5.26 14.15-8.86 21.81zM119.22 33.15c0-7.29 2.58-14.18 7.74-20.67 5.16-6.49 11.59-10.74 19.3-12.75.44 1.13.68 2.29.72 3.49.03 1.19.05 2.23.05 3.12 0 7.42-2.73 14.39-8.19 20.91-5.46 6.52-12.12 10.45-19.98 11.78-.22-1.99-.44-3.95-.64-5.88z" />
      </svg>
      <div className="flex flex-col text-left leading-none">
        <span className="text-[9px] font-mono tracking-wider opacity-80 mb-0.5">Download on the</span>
        <span className="text-xs sm:text-sm font-bold tracking-tight">App Store</span>
      </div>
    </button>
  );
};

export const GooglePlayBadge: React.FC<StoreBadgeProps> = ({
  onClick,
  className = '',
  isLight = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2.5 rounded-xl border flex items-center gap-3 transition-all cursor-pointer shadow-sm active:scale-95 ${
        isLight
          ? 'bg-black text-white border-black hover:bg-neutral-800'
          : 'bg-[#0A1B3D] text-white border-[#14294F] hover:bg-[#14294F] hover:border-[#0D95FE]/50'
      } ${className}`}
      title="Get it on Google Play"
    >
      {/* Official Authentic Google Play Triangle Logo SVG */}
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 512 512" aria-hidden="true">
        <path
          fill="#4285F4"
          d="M48.7 18.2C43.2 24.1 40 33.2 40 44.8v422.4c0 11.6 3.2 20.7 8.7 26.6l1.5 1.5 240.2-240.2v-6.2L50.2 16.7l-1.5 1.5z"
        />
        <path
          fill="#FBBC04"
          d="M371.4 332.1l-81-81v-6.2l81-81 1.7 1 96.2 54.7c27.5 15.6 27.5 41.2 0 56.8l-96.2 54.7-1.7 1z"
        />
        <path
          fill="#EA4335"
          d="M373.1 331.1L290.4 248.4 48.7 493.8c9 9.5 23.8 10.7 40.5 1.3l283.9-164z"
        />
        <path
          fill="#34A853"
          d="M373.1 174.9L89.2 13.9C72.5 4.5 57.7 5.7 48.7 15.2L290.4 260.6l82.7-85.7z"
        />
      </svg>
      <div className="flex flex-col text-left leading-none">
        <span className="text-[9px] font-mono tracking-wider opacity-80 uppercase mb-0.5">GET IT ON</span>
        <span className="text-xs sm:text-sm font-bold tracking-tight">Google Play</span>
      </div>
    </button>
  );
};
