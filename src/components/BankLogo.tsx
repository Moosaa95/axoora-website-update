'use client';

import React from 'react';

export interface BankLogoProps {
  id: string;
  name?: string;
  code?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const BankLogo: React.FC<BankLogoProps> = ({
  id,
  name,
  code,
  size = 'md',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-10 h-10 sm:w-11 sm:h-11 rounded-xl',
    lg: 'w-13 h-13 rounded-2xl',
    xl: 'w-16 h-16 rounded-2xl',
  };

  const containerClasses = `${sizeMap[size]} flex items-center justify-center shrink-0 shadow-sm overflow-hidden select-none ${className}`;

  switch (id.toLowerCase()) {
    // -------------------------------------------------------------------------
    // 1. GUARANTY TRUST BANK (GTBank) - Signature Orange with White Corner Square
    // -------------------------------------------------------------------------
    case 'gtb':
      return (
        <div className={`${containerClasses} bg-[#E03C00] relative p-1`}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            {/* Top right white square */}
            <rect x="64" y="14" width="22" height="22" rx="3" fill="#FFFFFF" />
            {/* Bold GT text */}
            <text
              x="14"
              y="62"
              fill="#FFFFFF"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="44"
              fontWeight="900"
              letterSpacing="-2"
            >
              GT
            </text>
            <text
              x="15"
              y="84"
              fill="#FFFFFF"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="20"
              fontWeight="700"
              letterSpacing="0"
            >
              Bank
            </text>
          </svg>
        </div>
      );

    // -------------------------------------------------------------------------
    // 2. ACCESS BANK - Signature Double Right Chevrons
    // -------------------------------------------------------------------------
    case 'access':
      return (
        <div className={`${containerClasses} bg-[#00205B] p-1.5`}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            {/* Left Chevron (Dark Navy/White) */}
            <path
              d="M 22 25 L 42 50 L 22 75 L 34 75 L 54 50 L 34 25 Z"
              fill="#FFFFFF"
            />
            {/* Right Chevron (Vibrant Access Orange) */}
            <path
              d="M 46 25 L 66 50 L 46 75 L 58 75 L 78 50 L 58 25 Z"
              fill="#FF6200"
            />
          </svg>
        </div>
      );

    // -------------------------------------------------------------------------
    // 3. ZENITH BANK - Signature Crimson Red with Geometric Z Monogram
    // -------------------------------------------------------------------------
    case 'zenith':
      return (
        <div className={`${containerClasses} bg-[#C41230] p-1.5`}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            {/* Top horizontal bar */}
            <path d="M 22 24 L 78 24 L 78 36 L 44 36 L 78 72 L 78 76 L 22 76 L 22 64 L 56 64 L 22 28 Z" fill="#FFFFFF" />
            {/* Silver accent slash */}
            <rect x="42" y="44" width="28" height="6" transform="rotate(-40 42 44)" fill="#E2E8F0" rx="2" />
          </svg>
        </div>
      );

    // -------------------------------------------------------------------------
    // 4. FIRST BANK OF NIGERIA - Deep Navy with Royal Gold Elephant Silhouette
    // -------------------------------------------------------------------------
    case 'firstbank':
      return (
        <div className={`${containerClasses} bg-[#002B49] p-1.5`}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            {/* Star of Excellence */}
            <path
              d="M 68 18 L 70 23 L 75 23 L 71 26 L 73 31 L 68 28 L 64 31 L 66 26 L 62 23 L 67 23 Z"
              fill="#F2A93B"
            />
            {/* Elephant Silhouette */}
            <path
              d="M 32 68 
                 C 32 50, 40 42, 54 40
                 C 62 38, 70 42, 74 46
                 C 77 49, 78 54, 76 60
                 C 74 65, 78 68, 82 60
                 C 84 55, 83 45, 76 38
                 C 68 30, 50 30, 38 38
                 C 28 45, 24 55, 24 68
                 C 24 76, 32 76, 32 68 Z"
              fill="#F2A93B"
            />
            {/* Legs & Trunk Accent */}
            <path
              d="M 28 68 L 36 68 L 36 78 L 28 78 Z
                 M 44 68 L 52 68 L 52 78 L 44 78 Z
                 M 60 68 L 68 68 L 68 78 L 60 78 Z"
              fill="#F2A93B"
            />
          </svg>
        </div>
      );

    // -------------------------------------------------------------------------
    // 5. UNITED BANK FOR AFRICA (UBA) - Vivid Red with White Bold UBA Typography
    // -------------------------------------------------------------------------
    case 'uba':
      return (
        <div className={`${containerClasses} bg-[#CF0000] p-1.5`}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <text
              x="50"
              y="58"
              fill="#FFFFFF"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="30"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="1"
            >
              UBA
            </text>
            {/* White stepped chevron bar */}
            <path d="M 25 68 L 50 78 L 75 68 L 68 64 L 50 71 L 32 64 Z" fill="#FFFFFF" />
          </svg>
        </div>
      );

    // -------------------------------------------------------------------------
    // 6. PROVIDUS BANK - Warm Amber with Dark Navy Interlocking Diamonds
    // -------------------------------------------------------------------------
    case 'providus':
      return (
        <div className={`${containerClasses} bg-[#F59E0B] p-2`}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            {/* 4 Rotated Interlocking Diamonds */}
            <g transform="translate(50, 50) rotate(45) translate(-50, -50)">
              <rect x="25" y="25" width="22" height="22" rx="3" fill="#0C2340" />
              <rect x="53" y="25" width="22" height="22" rx="3" fill="#0C2340" />
              <rect x="25" y="53" width="22" height="22" rx="3" fill="#0C2340" />
              <rect x="53" y="53" width="22" height="22" rx="3" fill="#FFFFFF" />
            </g>
          </svg>
        </div>
      );

    // -------------------------------------------------------------------------
    // 7. STANBIC IBTC BANK - Cobalt Blue with White Shield
    // -------------------------------------------------------------------------
    case 'stanbic':
      return (
        <div className={`${containerClasses} bg-[#0033A0] p-2`}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            {/* Heraldic Shield */}
            <path
              d="M 26 22 L 74 22 C 74 52, 64 74, 50 82 C 36 74, 26 52, 26 22 Z"
              fill="#FFFFFF"
            />
            {/* Inner Blue Shield Accent */}
            <path
              d="M 33 29 L 67 29 C 67 50, 58 68, 50 74 C 42 68, 33 50, 33 29 Z"
              fill="#0033A0"
            />
            {/* Standard Bank Bird profile */}
            <circle cx="50" cy="46" r="8" fill="#FFFFFF" />
          </svg>
        </div>
      );

    // -------------------------------------------------------------------------
    // 8. FIDELITY BANK - Deep Navy & Emerald Green Dual Triangles
    // -------------------------------------------------------------------------
    case 'fidelity':
      return (
        <div className={`${containerClasses} bg-[#002D62] p-2`}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            {/* Green Upper Chevron */}
            <path d="M 20 25 L 50 48 L 80 25 L 80 45 L 50 68 L 20 45 Z" fill="#00DF8F" />
            {/* White Swoosh */}
            <circle cx="50" cy="48" r="7" fill="#FFFFFF" />
          </svg>
        </div>
      );

    // -------------------------------------------------------------------------
    // 9. FIRST CITY MONUMENT BANK (FCMB) - Royal Purple with Gold Geometric Emblem
    // -------------------------------------------------------------------------
    case 'fcmb':
      return (
        <div className={`${containerClasses} bg-[#5C068C] p-2`}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            {/* Gold Geometric Stylized Tree */}
            <path d="M 50 16 L 76 45 L 62 45 L 78 72 L 22 72 L 38 45 L 24 45 Z" fill="#F59E0B" />
            {/* Central Stem */}
            <rect x="46" y="72" width="8" height="12" fill="#F59E0B" />
          </svg>
        </div>
      );

    // -------------------------------------------------------------------------
    // 10. STERLING BANK - Crimson Red with White Swirling Sun / 'S'
    // -------------------------------------------------------------------------
    case 'sterling':
      return (
        <div className={`${containerClasses} bg-[#CE1126] p-2`}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            {/* Swirling Sun / S Motif */}
            <circle cx="50" cy="50" r="28" stroke="#FFFFFF" strokeWidth="6" strokeDasharray="30 14" />
            <circle cx="50" cy="50" r="14" fill="#FFFFFF" />
          </svg>
        </div>
      );

    // -------------------------------------------------------------------------
    // 11. WEMA BANK / ALAT - Deep Purple with Magenta Asterisk
    // -------------------------------------------------------------------------
    case 'wema':
      return (
        <div className={`${containerClasses} bg-[#6B1D73] p-2`}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            {/* ALAT 8-point Asterisk / Flower */}
            <g transform="translate(50, 50)">
              {[0, 45, 90, 135].map((angle, idx) => (
                <rect
                  key={idx}
                  x="-5"
                  y="-28"
                  width="10"
                  height="56"
                  rx="5"
                  fill={idx % 2 === 0 ? '#FFFFFF' : '#E11D48'}
                  transform={`rotate(${angle})`}
                />
              ))}
              <circle cx="0" cy="0" r="8" fill="#6B1D73" />
            </g>
          </svg>
        </div>
      );

    // -------------------------------------------------------------------------
    // 12. UNION BANK OF NIGERIA - Sky Blue with Galloping White Stallion
    // -------------------------------------------------------------------------
    case 'union':
      return (
        <div className={`${containerClasses} bg-[#00A3E0] p-1.5`}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            {/* Galloping Stallion Silhouette */}
            <path
              d="M 24 55
                 C 26 42, 34 32, 44 26
                 C 50 22, 58 20, 62 26
                 C 64 28, 62 34, 58 36
                 C 66 36, 76 42, 80 50
                 C 82 54, 76 56, 72 52
                 C 68 56, 62 62, 54 62
                 C 48 62, 44 68, 38 74
                 C 34 78, 30 76, 32 70
                 C 26 70, 20 62, 24 55 Z"
              fill="#FFFFFF"
            />
            {/* Flying mane & tail */}
            <path
              d="M 42 28 C 38 34, 34 44, 30 52 L 26 48 C 30 40, 36 32, 42 28 Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      );

    // -------------------------------------------------------------------------
    // 13. POLARIS BANK - Deep Plum with Neon Lime Propeller
    // -------------------------------------------------------------------------
    case 'polaris':
      return (
        <div className={`${containerClasses} bg-[#4A0E4E] p-2`}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            {/* 4-blade swirl in lime green */}
            <g transform="translate(50, 50)">
              {[0, 90, 180, 270].map((angle, idx) => (
                <path
                  key={idx}
                  d="M 0 0 C 10 -15, 25 -20, 25 -5 C 25 10, 10 5, 0 0 Z"
                  fill="#CCFF00"
                  transform={`rotate(${angle})`}
                />
              ))}
            </g>
          </svg>
        </div>
      );

    // -------------------------------------------------------------------------
    // 14. KEYSTONE BANK - Navy with Cyan Keystone Arch
    // -------------------------------------------------------------------------
    case 'keystone':
      return (
        <div className={`${containerClasses} bg-[#0C2340] p-2`}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            {/* Keystone Architectural Arch */}
            <path
              d="M 30 75 L 30 45 C 30 32, 38 24, 50 24 C 62 24, 70 32, 70 45 L 70 75 L 58 75 L 58 45 C 58 40, 54 36, 50 36 C 46 36, 42 40, 42 45 L 42 75 Z"
              fill="#00A3E0"
            />
            {/* Top Keystone wedge */}
            <polygon points="44,18 56,18 53,28 47,28" fill="#53BDEB" />
          </svg>
        </div>
      );

    // -------------------------------------------------------------------------
    // 15. UNITY BANK - Vibrant Orange with Flower Motif
    // -------------------------------------------------------------------------
    case 'unity':
      return (
        <div className={`${containerClasses} bg-[#F58220] p-2`}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <g transform="translate(50, 50)">
              {[0, 60, 120, 180, 240, 300].map((angle, idx) => (
                <circle
                  key={idx}
                  cx="16"
                  cy="0"
                  r="10"
                  fill={idx % 2 === 0 ? '#10B981' : '#FFFFFF'}
                  transform={`rotate(${angle})`}
                />
              ))}
              <circle cx="0" cy="0" r="9" fill="#FBBF24" />
            </g>
          </svg>
        </div>
      );

    // -------------------------------------------------------------------------
    // 16. TITAN TRUST BANK - Navy with Gold Monogram Shield
    // -------------------------------------------------------------------------
    case 'titantrust':
      return (
        <div className={`${containerClasses} bg-[#1A2B4C] p-2`}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path
              d="M 28 24 L 72 24 L 72 54 C 72 68, 50 82, 50 82 C 50 82, 28 68, 28 54 Z"
              fill="#F59E0B"
            />
            <text
              x="50"
              y="58"
              fill="#1A2B4C"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="28"
              fontWeight="900"
              textAnchor="middle"
            >
              TT
            </text>
          </svg>
        </div>
      );

    // -------------------------------------------------------------------------
    // 17. PREMIUMTRUST BANK - Emerald Green with White Ribbon PT
    // -------------------------------------------------------------------------
    case 'premiumtrust':
      return (
        <div className={`${containerClasses} bg-[#005C42] p-2`}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <circle cx="50" cy="50" r="32" stroke="#FFFFFF" strokeWidth="5" />
            <text
              x="50"
              y="58"
              fill="#FFFFFF"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="24"
              fontWeight="900"
              textAnchor="middle"
            >
              PT
            </text>
          </svg>
        </div>
      );

    // -------------------------------------------------------------------------
    // 18. KUDA BANK - Deep Purple with Iconic White Kuda 'K'
    // -------------------------------------------------------------------------
    case 'kuda':
      return (
        <div className={`${containerClasses} bg-[#40196D] p-2`}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            {/* Vertical Bar */}
            <rect x="28" y="24" width="12" height="52" rx="6" fill="#FFFFFF" />
            {/* Top diagonal */}
            <path d="M 44 50 L 68 28 C 72 24, 76 28, 72 32 L 54 50 Z" fill="#FFFFFF" />
            {/* Bottom diagonal with rounded dot */}
            <path d="M 44 50 L 68 72 C 72 76, 76 72, 72 68 L 54 50 Z" fill="#FFFFFF" />
            <circle cx="70" cy="70" r="5" fill="#00DF8F" />
          </svg>
        </div>
      );

    // -------------------------------------------------------------------------
    // 19. MONIEPOINT - Cobalt Blue with White Circular Target / 'M'
    // -------------------------------------------------------------------------
    case 'moniepoint':
      return (
        <div className={`${containerClasses} bg-[#0033FF] p-2`}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            {/* Target Circle with Center M */}
            <circle cx="50" cy="50" r="30" stroke="#FFFFFF" strokeWidth="6" />
            <path
              d="M 36 62 L 36 40 L 50 52 L 64 40 L 64 62"
              stroke="#FFFFFF"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      );

    // -------------------------------------------------------------------------
    // 20. OPAY - Emerald Green with White Circular Ring Loop
    // -------------------------------------------------------------------------
    case 'opay':
      return (
        <div className={`${containerClasses} bg-[#10B981] p-2`}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <circle cx="50" cy="50" r="28" stroke="#FFFFFF" strokeWidth="10" />
            <rect x="50" y="44" width="28" height="12" rx="6" fill="#FFFFFF" />
          </svg>
        </div>
      );

    // -------------------------------------------------------------------------
    // 21. PALMPAY - Violet Gradient with White Palm / 'P'
    // -------------------------------------------------------------------------
    case 'palmpay':
      return (
        <div className={`${containerClasses} bg-[#6366F1] p-2`}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            {/* Stylized P with palm branch */}
            <path
              d="M 32 76 L 32 24 C 32 24, 62 20, 68 36 C 74 52, 54 58, 32 58"
              stroke="#FFFFFF"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <circle cx="50" cy="38" r="5" fill="#FBBF24" />
          </svg>
        </div>
      );

    // -------------------------------------------------------------------------
    // 22. JAIZ BANK - Islamic Green with Gold Crescent & Date Palm
    // -------------------------------------------------------------------------
    case 'jaiz':
      return (
        <div className={`${containerClasses} bg-[#008752] p-2`}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            {/* Gold Crescent */}
            <path
              d="M 60 26 C 42 28, 32 44, 38 64 C 44 78, 62 80, 72 72 C 54 72, 46 58, 52 42 C 56 34, 64 28, 60 26 Z"
              fill="#F59E0B"
            />
            {/* Palm Frond */}
            <path d="M 44 48 C 52 38, 66 38, 70 42 C 64 48, 54 50, 44 48 Z" fill="#F59E0B" />
          </svg>
        </div>
      );

    // -------------------------------------------------------------------------
    // 23. TAJBANK - Crimson Red with Gold 8-Point Islamic Star
    // -------------------------------------------------------------------------
    case 'tajbank':
      return (
        <div className={`${containerClasses} bg-[#7A1315] p-2`}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            {/* Interlocking Dual Squares (8-point Islamic Star) */}
            <g transform="translate(50, 50)">
              <rect x="-24" y="-24" width="48" height="48" rx="4" fill="#F59E0B" />
              <rect x="-24" y="-24" width="48" height="48" rx="4" fill="#F59E0B" transform="rotate(45)" />
              <circle cx="0" cy="0" r="14" fill="#7A1315" />
            </g>
          </svg>
        </div>
      );

    // -------------------------------------------------------------------------
    // 24. LOTUS BANK - Deep Teal with Lotus Flower Petals
    // -------------------------------------------------------------------------
    case 'lotus':
      return (
        <div className={`${containerClasses} bg-[#0D6E53] p-2`}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            {/* Center Petal */}
            <path d="M 50 20 C 40 38, 40 55, 50 72 C 60 55, 60 38, 50 20 Z" fill="#F59E0B" />
            {/* Left Petal */}
            <path d="M 50 72 C 34 68, 22 52, 26 36 C 36 44, 46 58, 50 72 Z" fill="#FFFFFF" />
            {/* Right Petal */}
            <path d="M 50 72 C 66 68, 78 52, 74 36 C 64 44, 54 58, 50 72 Z" fill="#FFFFFF" />
          </svg>
        </div>
      );

    // -------------------------------------------------------------------------
    // 25. THE ALTERNATIVE BANK - Royal Purple with Stylized Geometric 'A'
    // -------------------------------------------------------------------------
    case 'alternativebank':
      return (
        <div className={`${containerClasses} bg-[#5B21B6] p-2`}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path d="M 50 22 L 78 76 L 62 76 L 50 50 L 38 76 L 22 76 Z" fill="#F59E0B" />
            <polygon points="46,42 54,42 50,32" fill="#5B21B6" />
          </svg>
        </div>
      );

    // -------------------------------------------------------------------------
    // 26. PIGGYVEST / POCKET - Blue with Piggybank
    // -------------------------------------------------------------------------
    case 'piggyvest':
      return (
        <div className={`${containerClasses} bg-[#3B82F6] p-2`}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            {/* Piggy body */}
            <path
              d="M 32 40 C 32 30, 45 28, 58 28 C 72 28, 80 38, 80 50 C 80 62, 72 70, 58 70 L 38 70 C 32 70, 32 60, 32 50 Z"
              fill="#FFFFFF"
            />
            {/* Snout */}
            <rect x="22" y="44" width="10" height="12" rx="3" fill="#FFFFFF" />
            {/* Coin slot */}
            <rect x="52" y="22" width="12" height="4" rx="2" fill="#3B82F6" />
            {/* Eye */}
            <circle cx="42" cy="42" r="3" fill="#3B82F6" />
          </svg>
        </div>
      );

    // -------------------------------------------------------------------------
    // 27. COWRYWISE - Cyan with Cowry Shell
    // -------------------------------------------------------------------------
    case 'cowrywise':
      return (
        <div className={`${containerClasses} bg-[#06B6D4] p-2`}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <ellipse cx="50" cy="50" rx="24" ry="32" fill="#FFFFFF" />
            {/* Cowry slit */}
            <path d="M 50 26 L 50 74" stroke="#06B6D4" strokeWidth="5" strokeLinecap="round" />
            <path d="M 44 36 L 56 36 M 42 46 L 58 46 M 42 56 L 58 56 M 44 66 L 56 66" stroke="#06B6D4" strokeWidth="3" />
          </svg>
        </div>
      );

    // -------------------------------------------------------------------------
    // 28. CARBON - Matte Black with Neon Green 'C'
    // -------------------------------------------------------------------------
    case 'carbon':
      return (
        <div className={`${containerClasses} bg-[#18181B] p-2`}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <circle cx="50" cy="50" r="28" stroke="#00DF8F" strokeWidth="10" strokeDasharray="140 40" strokeLinecap="round" />
          </svg>
        </div>
      );

    // -------------------------------------------------------------------------
    // 29. FAiRMONEY - Teal with Double-Arc 'F'
    // -------------------------------------------------------------------------
    case 'fairmoney':
      return (
        <div className={`${containerClasses} bg-[#0D9488] p-2`}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <text
              x="50"
              y="68"
              fill="#FFFFFF"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="52"
              fontWeight="900"
              textAnchor="middle"
            >
              F
            </text>
          </svg>
        </div>
      );

    // -------------------------------------------------------------------------
    // 30. NIBSS (NIP Switch) - Navy with Multi-Node Clearing Rails
    // -------------------------------------------------------------------------
    case 'nibss':
      return (
        <div className={`${containerClasses} bg-[#003865] p-2`}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            {/* Interconnected Network Nodes */}
            <line x1="30" y1="50" x2="70" y2="50" stroke="#00DF8F" strokeWidth="4" />
            <line x1="50" y1="30" x2="50" y2="70" stroke="#00DF8F" strokeWidth="4" />
            <circle cx="30" cy="50" r="8" fill="#FF6200" />
            <circle cx="70" cy="50" r="8" fill="#00DF8F" />
            <circle cx="50" cy="30" r="8" fill="#0D95FE" />
            <circle cx="50" cy="70" r="8" fill="#FFFFFF" />
          </svg>
        </div>
      );

    // -------------------------------------------------------------------------
    // 31. INTERSWITCH / VERVE - Red with Dual Switch Arcs
    // -------------------------------------------------------------------------
    case 'interswitch':
      return (
        <div className={`${containerClasses} bg-[#E11D48] p-2`}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            {/* Dual interlocking arcs */}
            <path d="M 30 36 C 45 20, 65 24, 72 38" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
            <path d="M 70 64 C 55 80, 35 76, 28 62" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
            <circle cx="50" cy="50" r="7" fill="#FFFFFF" />
          </svg>
        </div>
      );

    // -------------------------------------------------------------------------
    // 32. REMITA - Orange with White 'R' Ribbon
    // -------------------------------------------------------------------------
    case 'remita':
      return (
        <div className={`${containerClasses} bg-[#F97316] p-2`}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <text
              x="50"
              y="68"
              fill="#FFFFFF"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="52"
              fontWeight="900"
              textAnchor="middle"
            >
              R
            </text>
          </svg>
        </div>
      );

    // -------------------------------------------------------------------------
    // 33. PAYSTACK - Cyan with Double Horizontal Bars
    // -------------------------------------------------------------------------
    case 'paystack':
      return (
        <div className={`${containerClasses} bg-[#00C3F9] p-2.5`}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <rect x="22" y="34" width="56" height="12" rx="4" fill="#020F2E" />
            <rect x="22" y="54" width="56" height="12" rx="4" fill="#020F2E" />
          </svg>
        </div>
      );

    // -------------------------------------------------------------------------
    // DEFAULT FALLBACK: Clean Monogram with Authentic Brand Colors
    // -------------------------------------------------------------------------
    default: {
      const displayLabel = code || name?.slice(0, 3) || id.slice(0, 3).toUpperCase();
      return (
        <div className={`${containerClasses} bg-slate-800 text-white font-mono font-black text-xs`}>
          {displayLabel}
        </div>
      );
    }
  }
};
