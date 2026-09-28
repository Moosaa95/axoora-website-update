import React from 'react';

interface IllustrationProps {
  className?: string;
  isLight?: boolean;
}

/**
 * Handcrafted 3D Isometric Pixel-Art Illustration:
 * Axoora AI Personal Banking (Phone + Chat Voice + Floating Naira Coins)
 */
export const PersonalBankingPixelArt: React.FC<IllustrationProps> = ({ className = 'w-full h-48', isLight = false }) => {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl ${className}`}>
      <svg
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain filter drop-shadow-lg"
      >
        <defs>
          <linearGradient id="phoneBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={isLight ? '#1E293B' : '#0B1938'} />
            <stop offset="100%" stopColor={isLight ? '#0F172A' : '#030A1A'} />
          </linearGradient>
          <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0A224E" />
            <stop offset="100%" stopColor="#040F26" />
          </linearGradient>
          <linearGradient id="nairaGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FCD34D" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="emeraldGlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00DF8F" />
            <stop offset="100%" stopColor="#00A86B" />
          </linearGradient>
          <pattern id="pixelGrid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke={isLight ? '#E2E8F0' : '#14294F'} strokeWidth="0.5" opacity="0.4" />
          </pattern>
        </defs>

        {/* Ambient background glow & grid */}
        <rect width="400" height="300" fill="url(#pixelGrid)" opacity="0.6" />
        <circle cx="200" cy="150" r="90" fill="#00DF8F" opacity="0.08" className="animate-pulse" />

        {/* Isometric Platform / Base */}
        <path d="M 200 240 L 330 175 L 200 110 L 70 175 Z" fill={isLight ? '#F1F5F9' : '#071533'} stroke={isLight ? '#CBD5E1' : '#1E3A6B'} strokeWidth="2" />
        <path d="M 70 175 L 200 240 L 200 255 L 70 190 Z" fill={isLight ? '#E2E8F0' : '#040C1E'} stroke={isLight ? '#94A3B8' : '#14294F'} strokeWidth="1.5" />
        <path d="M 330 175 L 200 240 L 200 255 L 330 190 Z" fill={isLight ? '#CBD5E1' : '#020712'} stroke={isLight ? '#94A3B8' : '#14294F'} strokeWidth="1.5" />

        {/* Isometric Grid lines on base */}
        <path d="M 110 155 L 240 220" stroke={isLight ? '#E2E8F0' : '#0D275A'} strokeWidth="1" strokeDasharray="3 3" />
        <path d="M 160 130 L 290 195" stroke={isLight ? '#E2E8F0' : '#0D275A'} strokeWidth="1" strokeDasharray="3 3" />
        <path d="M 160 220 L 290 155" stroke={isLight ? '#E2E8F0' : '#0D275A'} strokeWidth="1" strokeDasharray="3 3" />
        <path d="M 110 195 L 240 130" stroke={isLight ? '#E2E8F0' : '#0D275A'} strokeWidth="1" strokeDasharray="3 3" />

        {/* 3D Smartphone (Isometric Left-Angled) */}
        {/* Phone Shadow */}
        <path d="M 150 220 L 240 175 L 220 160 L 130 205 Z" fill="rgba(0,0,0,0.3)" />

        {/* Phone Back Body */}
        <rect x="145" y="85" width="110" height="150" rx="18" fill="url(#phoneBody)" stroke="#0D95FE" strokeWidth="2.5" />
        {/* Phone Camera Bump */}
        <rect x="155" y="95" width="34" height="34" rx="8" fill="#040C1E" stroke="#1E3A6B" strokeWidth="1.5" />
        <circle cx="166" cy="106" r="4.5" fill="#0D95FE" />
        <circle cx="178" cy="106" r="4.5" fill="#00DF8F" />
        <circle cx="166" cy="118" r="3.5" fill="#F2A93B" />
        <circle cx="178" cy="118" r="2" fill="#FFFFFF" />

        {/* Phone Screen Glass */}
        <rect x="150" y="90" width="100" height="140" rx="14" fill="url(#screenGrad)" />
        {/* Screen Header Bar */}
        <rect x="158" y="98" width="84" height="14" rx="4" fill="#14294F" />
        <rect x="162" y="103" width="30" height="4" rx="2" fill="#00DF8F" />
        <circle cx="236" cy="105" r="2.5" fill="#00DF8F" />

        {/* WhatsApp Voice Wave Widget on Screen */}
        <rect x="158" y="118" width="84" height="44" rx="8" fill="#0A1B3D" stroke="#00DF8F" strokeWidth="1" />
        <circle cx="172" cy="136" r="8" fill="#00DF8F" />
        <path d="M 170 132 L 176 136 L 170 140 Z" fill="#003825" />
        {/* Voice Bars */}
        <rect x="186" y="132" width="2.5" height="8" rx="1" fill="#00DF8F" />
        <rect x="191" y="128" width="2.5" height="16" rx="1" fill="#00DF8F" />
        <rect x="196" y="124" width="2.5" height="24" rx="1" fill="#0D95FE" />
        <rect x="201" y="130" width="2.5" height="12" rx="1" fill="#00DF8F" />
        <rect x="206" y="126" width="2.5" height="20" rx="1" fill="#00DF8F" />
        <rect x="211" y="133" width="2.5" height="6" rx="1" fill="#00DF8F" />
        <rect x="216" y="131" width="2.5" height="10" rx="1" fill="#A8BBD6" />
        <text x="186" y="154" fill="#00DF8F" fontSize="7" fontFamily="monospace" fontWeight="bold">₦20,000 SENT</text>

        {/* Mini Balance Pill on Screen */}
        <rect x="158" y="168" width="84" height="22" rx="6" fill="#14294F" />
        <rect x="164" y="174" width="40" height="4" rx="2" fill="#A8BBD6" />
        <rect x="164" y="181" width="55" height="5" rx="2" fill="#F2F5F9" />
        <circle cx="234" cy="179" r="4" fill="#0D95FE" />

        {/* Floating 3D Pixel Naira Coin 1 (Top Right) */}
        <g transform="translate(255, 75)">
          {/* Coin Edge */}
          <ellipse cx="25" cy="27" rx="22" ry="12" fill="#B45309" />
          <path d="M 3 22 L 3 27 C 3 34 47 34 47 27 L 47 22 Z" fill="#92400E" />
          {/* Coin Face */}
          <ellipse cx="25" cy="22" rx="22" ry="12" fill="url(#nairaGold)" stroke="#FDE68A" strokeWidth="1.5" />
          <text x="20" y="27" fill="#78350F" fontSize="13" fontFamily="monospace" fontWeight="900">₦</text>
          {/* Sparkle */}
          <path d="M 45 10 L 47 15 L 52 17 L 47 19 L 45 24 L 43 19 L 38 17 L 43 15 Z" fill="#FEF08A" />
        </g>

        {/* Floating 3D Pixel Naira Coin 2 (Bottom Left) */}
        <g transform="translate(85, 175)">
          <ellipse cx="18" cy="20" rx="16" ry="9" fill="#B45309" />
          <ellipse cx="18" cy="17" rx="16" ry="9" fill="url(#nairaGold)" stroke="#FDE68A" strokeWidth="1" />
          <text x="14" y="21" fill="#78350F" fontSize="10" fontFamily="monospace" fontWeight="900">₦</text>
        </g>

        {/* Floating Speech Bubble: WhatsApp Voice Quote */}
        <g transform="translate(50, 80)">
          <rect width="110" height="40" rx="10" fill="#00875A" stroke="#00DF8F" strokeWidth="1.5" />
          <path d="M 110 100 L 125 110 L 105 112 Z" fill="#00875A" />
          <text x="10" y="16" fill="#F2F5F9" fontSize="8.5" fontWeight="bold">"Abeeg send ₦20k"</text>
          <text x="10" y="29" fill="#A7F3D0" fontSize="7.5">Instant WhatsApp Rail</text>
          {/* Checkmark */}
          <circle cx="96" cy="20" r="7" fill="#00DF8F" />
          <path d="M 93 20 L 95 22 L 99 18" stroke="#003825" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Floating Success Pill */}
        <g transform="translate(245, 175)">
          <rect width="95" height="28" rx="6" fill="#0A1B3D" stroke="#00DF8F" strokeWidth="1.5" />
          <circle cx="14" cy="14" r="5" fill="#00DF8F" />
          <text x="24" y="17" fill="#F2F5F9" fontSize="8" fontWeight="bold">0% Transfer Fee</text>
        </g>
      </svg>
    </div>
  );
};

/**
 * Handcrafted 3D Isometric Pixel-Art Illustration:
 * Axoora Business for Shops (Store Counter + Smart Checkout + QR Stand + Stock)
 */
export const BusinessShopPixelArt: React.FC<IllustrationProps> = ({ className = 'w-full h-48', isLight = false }) => {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl ${className}`}>
      <svg
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain filter drop-shadow-lg"
      >
        <defs>
          <linearGradient id="counterTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={isLight ? '#F8FAFC' : '#14294F'} />
            <stop offset="100%" stopColor={isLight ? '#E2E8F0' : '#0B1D40'} />
          </linearGradient>
          <linearGradient id="counterFront" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={isLight ? '#CBD5E1' : '#0A1733'} />
            <stop offset="100%" stopColor={isLight ? '#94A3B8' : '#040B1B'} />
          </linearGradient>
          <linearGradient id="terminalGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0D95FE" />
            <stop offset="100%" stopColor="#006FDB" />
          </linearGradient>
          <pattern id="shopGrid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke={isLight ? '#E2E8F0' : '#14294F'} strokeWidth="0.5" opacity="0.4" />
          </pattern>
        </defs>

        <rect width="400" height="300" fill="url(#shopGrid)" opacity="0.6" />
        <circle cx="200" cy="150" r="95" fill="#0D95FE" opacity="0.08" />

        {/* Isometric Merchant Store Counter */}
        {/* Base Floor Plinth */}
        <path d="M 200 260 L 350 185 L 200 110 L 50 185 Z" fill={isLight ? '#F1F5F9' : '#071533'} stroke={isLight ? '#CBD5E1' : '#1E3A6B'} strokeWidth="2" />
        <path d="M 50 185 L 200 260 L 200 275 L 50 200 Z" fill={isLight ? '#E2E8F0' : '#030A1C'} stroke={isLight ? '#94A3B8' : '#14294F'} strokeWidth="1.5" />
        <path d="M 350 185 L 200 260 L 200 275 L 350 200 Z" fill={isLight ? '#CBD5E1' : '#010510'} stroke={isLight ? '#94A3B8' : '#14294F'} strokeWidth="1.5" />

        {/* Counter Desk (Isometric Box) */}
        {/* Counter Top Surface */}
        <path d="M 120 180 L 260 110 L 320 140 L 180 210 Z" fill="url(#counterTop)" stroke="#0D95FE" strokeWidth="2" />
        {/* Counter Front Left */}
        <path d="M 120 180 L 180 210 L 180 250 L 120 220 Z" fill="url(#counterFront)" stroke="#14294F" strokeWidth="1.5" />
        {/* Counter Front Right */}
        <path d="M 180 210 L 320 140 L 320 180 L 180 250 Z" fill={isLight ? '#94A3B8' : '#061026'} stroke="#14294F" strokeWidth="1.5" />

        {/* Store Shelf in the background */}
        <g transform="translate(60, 60)">
          {/* Shelves */}
          <path d="M 10 90 L 70 60 L 110 80 L 50 110 Z" fill="#0A1B3D" stroke="#1E3A6B" strokeWidth="1.5" />
          <path d="M 10 50 L 70 20 L 110 40 L 50 70 Z" fill="#0A1B3D" stroke="#1E3A6B" strokeWidth="1.5" />
          {/* Product Boxes on Shelf */}
          <rect x="25" y="30" width="14" height="18" rx="2" fill="#0D95FE" />
          <rect x="42" y="24" width="12" height="24" rx="2" fill="#00DF8F" />
          <rect x="58" y="34" width="16" height="14" rx="2" fill="#F2A93B" />
          <rect x="35" y="70" width="18" height="18" rx="2" fill="#A8BBD6" />
          <rect x="58" y="65" width="15" height="23" rx="2" fill="#0D95FE" />
        </g>

        {/* Merchant POS Terminal on Counter */}
        <g transform="translate(190, 130)">
          {/* POS Base */}
          <path d="M 10 40 L 50 20 L 70 30 L 30 50 Z" fill="#020B1D" stroke="#0D95FE" strokeWidth="1.5" />
          {/* Terminal Screen Face */}
          <rect x="24" y="6" width="34" height="42" rx="4" transform="skewY(-12)" fill="#00325b" stroke="#0D95FE" strokeWidth="1.5" />
          <rect x="28" y="10" width="26" height="20" rx="2" transform="skewY(-12)" fill="#0A224E" />
          {/* Green Status Check */}
          <circle cx="41" cy="20" r="5" fill="#00DF8F" />
          {/* Paper receipt coming out top */}
          <path d="M 32 4 L 48 -4 L 46 -14 L 30 -6 Z" fill="#F2F5F9" stroke="#CBD5E1" strokeWidth="1" />
          <line x1="33" y1="-3" x2="44" y2="-9" stroke="#94A3B8" strokeWidth="1" />
          <line x1="34" y1="0" x2="42" y2="-4" stroke="#94A3B8" strokeWidth="1" />
        </g>

        {/* QR Code Payment Stand on Counter */}
        <g transform="translate(265, 120)">
          {/* Stand Plate */}
          <polygon points="10,40 30,30 38,34 18,44" fill="#0A1B3D" stroke="#1E3A6B" strokeWidth="1" />
          {/* QR Card */}
          <rect x="14" y="14" width="22" height="26" rx="2" fill="#FFFFFF" stroke="#0D95FE" strokeWidth="1" transform="rotate(-6)" />
          {/* QR Pattern */}
          <rect x="17" y="17" width="6" height="6" fill="#020F2E" />
          <rect x="27" y="17" width="6" height="6" fill="#020F2E" />
          <rect x="17" y="27" width="6" height="6" fill="#020F2E" />
          <rect x="25" y="25" width="3" height="3" fill="#00DF8F" />
          <rect x="29" y="29" width="3" height="3" fill="#0D95FE" />
        </g>

        {/* Floating Store Name Badge */}
        <g transform="translate(180, 50)">
          <rect width="165" height="42" rx="10" fill="#0A1B3D" stroke="#0D95FE" strokeWidth="1.5" />
          <circle cx="20" cy="21" r="10" fill="#0D95FE" />
          <path d="M 16 21 L 24 21 M 20 17 L 20 25" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <text x="36" y="19" fill="#F2F5F9" fontSize="10" fontWeight="bold">Shop Account Ready</text>
          <text x="36" y="32" fill="#00DF8F" fontSize="8" fontFamily="monospace">Registered CAC Name • NUBAN</text>
        </g>

        {/* Automated Payout Tag (Bottom Right) */}
        <g transform="translate(240, 215)">
          <rect width="135" height="32" rx="8" fill="#020F2E" stroke="#00DF8F" strokeWidth="1" />
          <circle cx="16" cy="16" r="6" fill="#00DF8F" />
          <path d="M 13 16 L 15 18 L 19 14" stroke="#003825" strokeWidth="1.5" strokeLinecap="round" />
          <text x="28" y="15" fill="#F2F5F9" fontSize="8" fontWeight="bold">Auto Staff & Supplier Pay</text>
          <text x="28" y="25" fill="#A8BBD6" fontSize="7">1-Click Bulk Transfers</text>
        </g>
      </svg>
    </div>
  );
};

/**
 * Handcrafted 3D Isometric Pixel-Art Illustration:
 * POS & Aggregator Terminal (Rugged Android POS + Paper Receipt + Dual SIM + NFC)
 */
export const PosTerminalPixelArt: React.FC<IllustrationProps> = ({ className = 'w-full h-48', isLight = false }) => {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl ${className}`}>
      <svg
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain filter drop-shadow-lg"
      >
        <defs>
          <linearGradient id="posBodyGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0B1E45" />
            <stop offset="50%" stopColor="#05122D" />
            <stop offset="100%" stopColor="#010714" />
          </linearGradient>
          <linearGradient id="goldAcc" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <pattern id="posGrid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke={isLight ? '#E2E8F0' : '#14294F'} strokeWidth="0.5" opacity="0.4" />
          </pattern>
        </defs>

        <rect width="400" height="300" fill="url(#posGrid)" opacity="0.6" />
        <circle cx="200" cy="150" r="95" fill="#F2A93B" opacity="0.08" />

        {/* Isometric Base Plinth */}
        <path d="M 200 255 L 340 180 L 200 105 L 60 180 Z" fill={isLight ? '#F1F5F9' : '#071533'} stroke={isLight ? '#CBD5E1' : '#1E3A6B'} strokeWidth="2" />
        <path d="M 60 180 L 200 255 L 200 270 L 60 195 Z" fill={isLight ? '#E2E8F0' : '#030A1C'} stroke={isLight ? '#94A3B8' : '#14294F'} strokeWidth="1.5" />
        <path d="M 340 180 L 200 255 L 200 270 L 340 195 Z" fill={isLight ? '#CBD5E1' : '#010510'} stroke={isLight ? '#94A3B8' : '#14294F'} strokeWidth="1.5" />

        {/* Main 3D Android Smart POS Hardware (Angled Center-Left) */}
        <g transform="translate(130, 60)">
          {/* Terminal Chassis */}
          <path d="M 40 40 L 100 10 L 150 35 L 90 65 Z" fill="#0E2452" stroke="#F2A93B" strokeWidth="2" />
          <path d="M 40 40 L 90 65 L 90 170 L 40 145 Z" fill="url(#posBodyGrad)" stroke="#14294F" strokeWidth="2" />
          <path d="M 90 65 L 150 35 L 150 140 L 90 170 Z" fill="#040D20" stroke="#14294F" strokeWidth="2" />

          {/* Color Display Screen (Touch UI) */}
          <path d="M 48 58 L 86 78 L 86 125 L 48 105 Z" fill="#0A224E" stroke="#00DF8F" strokeWidth="1.5" />
          <text x="52" y="75" fill="#00DF8F" fontSize="6.5" fontFamily="monospace" fontWeight="bold">APPROVED</text>
          <text x="52" y="90" fill="#FFFFFF" fontSize="9" fontWeight="extrabold">₦25,000</text>
          <text x="52" y="101" fill="#A8BBD6" fontSize="5.5" fontFamily="monospace">NIBSS RAIL 0.9s</text>

          {/* Numeric Tactile Keypad */}
          <g transform="translate(48, 114)">
            {[0, 1, 2].map((r) =>
              [0, 1, 2].map((c) => (
                <rect
                  key={`${r}-${c}`}
                  x={c * 11 + 2}
                  y={r * 7 + 2}
                  width="8"
                  height="4.5"
                  rx="1"
                  fill="#14294F"
                  stroke="#334E7E"
                  strokeWidth="0.5"
                />
              ))
            )}
          </g>

          {/* Contactless NFC Waves (Radiating from top) */}
          <path d="M 105 18 C 112 12, 122 12, 128 18" stroke="#00DF8F" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M 100 12 C 112 2, 128 2, 134 12" stroke="#00DF8F" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />

          {/* Printing Thermal Paper Receipt (Curling upwards) */}
          <path
            d="M 100 5 L 138 -15 L 135 -45 Q 120 -55 105 -45 L 98 -15 Z"
            fill="#FFFFFF"
            stroke="#CBD5E1"
            strokeWidth="1.5"
          />
          {/* Receipt lines */}
          <line x1="106" y1="-32" x2="130" y2="-40" stroke="#0F172A" strokeWidth="1.5" />
          <line x1="104" y1="-24" x2="128" y2="-32" stroke="#64748B" strokeWidth="1" />
          <line x1="102" y1="-16" x2="132" y2="-24" stroke="#00DF8F" strokeWidth="1.5" />
          <line x1="100" y1="-8" x2="126" y2="-16" stroke="#64748B" strokeWidth="1" />
          <line x1="99" y1="0" x2="124" y2="-8" stroke="#0F172A" strokeWidth="1" />
        </g>

        {/* Dual Network SIM Badge (MTN + Airtel Auto-Switch) */}
        <g transform="translate(250, 80)">
          <rect width="130" height="48" rx="10" fill="#0A1B3D" stroke="#F2A93B" strokeWidth="1.5" />
          <circle cx="20" cy="24" r="8" fill="#F2A93B" />
          <text x="16" y="28" fill="#000" fontSize="10" fontWeight="bold">4G</text>
          <text x="36" y="21" fill="#F2F5F9" fontSize="9" fontWeight="bold">Dual-SIM Roaming</text>
          <text x="36" y="34" fill="#00DF8F" fontSize="7.5" fontFamily="monospace">Auto-Failover 99.98% Uptime</text>
        </g>

        {/* 48-Hour Battery Endurance Pill */}
        <g transform="translate(250, 145)">
          <rect width="130" height="42" rx="10" fill="#020F2E" stroke="#00DF8F" strokeWidth="1.5" />
          <rect x="14" y="16" width="16" height="10" rx="2" fill="#00DF8F" />
          <rect x="30" y="19" width="2" height="4" rx="1" fill="#00DF8F" />
          <text x="38" y="21" fill="#F2F5F9" fontSize="8.5" fontWeight="bold">48-Hour Street Battery</text>
          <text x="38" y="32" fill="#A8BBD6" fontSize="7">Built for Market Outages</text>
        </g>

        {/* Agent Float Protection Badge (Bottom Left) */}
        <g transform="translate(45, 120)">
          <rect width="115" height="42" rx="8" fill="#0A1B3D" stroke="#1E3A6B" strokeWidth="1" />
          <text x="12" y="18" fill="#F2F5F9" fontSize="8.5" fontWeight="bold">Instant Dispute Desk</text>
          <text x="12" y="32" fill="#00DF8F" fontSize="7.5" fontFamily="monospace">Direct WhatsApp Hotline</text>
        </g>
      </svg>
    </div>
  );
};

/**
 * Handcrafted 3D Isometric Pixel-Art Illustration:
 * Islamic Save & Earn + Paycircle Ajo Thrift (Vault + Treasure Pot + Ethical Riba-Free Growth)
 */
export const SavingsVaultPixelArt: React.FC<IllustrationProps> = ({ className = 'w-full h-48', isLight = false }) => {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl ${className}`}>
      <svg
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain filter drop-shadow-lg"
      >
        <defs>
          <linearGradient id="vaultDoor" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1E3A6B" />
            <stop offset="100%" stopColor="#0B1A36" />
          </linearGradient>
          <linearGradient id="vaultGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FCD34D" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <pattern id="vaultGrid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke={isLight ? '#E2E8F0' : '#14294F'} strokeWidth="0.5" opacity="0.4" />
          </pattern>
        </defs>

        <rect width="400" height="300" fill="url(#vaultGrid)" opacity="0.6" />
        <circle cx="200" cy="150" r="95" fill="#00DF8F" opacity="0.08" />

        {/* Isometric Base */}
        <path d="M 200 255 L 340 180 L 200 105 L 60 180 Z" fill={isLight ? '#F1F5F9' : '#071533'} stroke={isLight ? '#CBD5E1' : '#1E3A6B'} strokeWidth="2" />
        <path d="M 60 180 L 200 255 L 200 270 L 60 195 Z" fill={isLight ? '#E2E8F0' : '#030A1C'} stroke={isLight ? '#94A3B8' : '#14294F'} strokeWidth="1.5" />
        <path d="M 340 180 L 200 255 L 200 270 L 340 195 Z" fill={isLight ? '#CBD5E1' : '#010510'} stroke={isLight ? '#94A3B8' : '#14294F'} strokeWidth="1.5" />

        {/* 3D Bank Vault Safe (Isometric Center) */}
        <g transform="translate(130, 70)">
          {/* Vault Top */}
          <path d="M 30 35 L 90 5 L 140 30 L 80 60 Z" fill="#203A68" stroke="#00DF8F" strokeWidth="2" />
          {/* Vault Left Face (Door) */}
          <path d="M 30 35 L 80 60 L 80 155 L 30 130 Z" fill="url(#vaultDoor)" stroke="#14294F" strokeWidth="2" />
          {/* Vault Right Face */}
          <path d="M 80 60 L 140 30 L 140 125 L 80 155 Z" fill="#051024" stroke="#14294F" strokeWidth="2" />

          {/* Heavy Steel Vault Wheel on Door */}
          <ellipse cx="55" cy="95" rx="16" ry="24" fill="#0A1B3D" stroke="#00DF8F" strokeWidth="2" />
          <ellipse cx="55" cy="95" rx="7" ry="11" fill="#00DF8F" />
          <line x1="55" y1="71" x2="55" y2="119" stroke="#00DF8F" strokeWidth="2" />
          <line x1="39" y1="95" x2="71" y2="95" stroke="#00DF8F" strokeWidth="2" />

          {/* Golden Islamic Ethical Emblem */}
          <circle cx="110" cy="75" r="14" fill="#0A1B3D" stroke="#FCD34D" strokeWidth="1.5" />
          <path d="M 108 67 C 114 69 117 75 114 81 C 111 86 104 88 99 84 C 104 87 111 86 114 80 C 116 75 113 70 108 67 Z" fill="#FCD34D" />
          <polygon points="116,73 118,77 122,77 119,80 120,84 116,82 113,84 114,80 111,77 115,77" fill="#FCD34D" />
        </g>

        {/* Stack of Gold Pixel Coins (Isometric Front Right) */}
        <g transform="translate(230, 160)">
          {/* Coin 1 */}
          <ellipse cx="25" cy="40" rx="20" ry="10" fill="#92400E" />
          <ellipse cx="25" cy="36" rx="20" ry="10" fill="url(#vaultGold)" stroke="#FEF08A" strokeWidth="1" />
          {/* Coin 2 */}
          <ellipse cx="25" cy="30" rx="20" ry="10" fill="#92400E" />
          <ellipse cx="25" cy="26" rx="20" ry="10" fill="url(#vaultGold)" stroke="#FEF08A" strokeWidth="1" />
          {/* Coin 3 */}
          <ellipse cx="25" cy="20" rx="20" ry="10" fill="#92400E" />
          <ellipse cx="25" cy="16" rx="20" ry="10" fill="url(#vaultGold)" stroke="#FEF08A" strokeWidth="1" />
          <text x="21" y="20" fill="#78350F" fontSize="11" fontWeight="bold">₦</text>
        </g>

        {/* Paycircle Escrow Node Rings (Floating Left) */}
        <g transform="translate(45, 95)">
          <rect width="115" height="44" rx="10" fill="#0A1B3D" stroke="#00DF8F" strokeWidth="1.5" />
          <circle cx="20" cy="22" r="9" fill="#00DF8F" />
          <path d="M 16 22 L 24 22 M 20 18 L 20 26" stroke="#003825" strokeWidth="2" strokeLinecap="round" />
          <text x="36" y="19" fill="#F2F5F9" fontSize="9" fontWeight="bold">Paycircle Ajo</text>
          <text x="36" y="32" fill="#00DF8F" fontSize="7.5" fontFamily="monospace">Zero Riba • Not a Loan</text>
        </g>

        {/* NDIC Insured Protection Tag (Top Right) */}
        <g transform="translate(240, 60)">
          <rect width="130" height="38" rx="8" fill="#020F2E" stroke="#1E3A6B" strokeWidth="1.5" />
          <circle cx="16" cy="19" r="6" fill="#0D95FE" />
          <text x="28" y="17" fill="#F2F5F9" fontSize="8" fontWeight="bold">NDIC Custodial Trust</text>
          <text x="28" y="28" fill="#A8BBD6" fontSize="7">CBN Licensed Partner Rails</text>
        </g>
      </svg>
    </div>
  );
};

/**
 * Handcrafted 3D Isometric Pixel-Art Illustration:
 * Dual Virtual Cards (Obsidian Naira + Cyber Cyan USD + Holographic Chip + Global Grid)
 */
export const VirtualCardsPixelArt: React.FC<IllustrationProps> = ({ className = 'w-full h-48', isLight = false }) => {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl ${className}`}>
      <svg
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain filter drop-shadow-lg"
      >
        <defs>
          <linearGradient id="cardNaira" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0A224E" />
            <stop offset="50%" stopColor="#040F28" />
            <stop offset="100%" stopColor="#010614" />
          </linearGradient>
          <linearGradient id="cardDollar" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0D95FE" />
            <stop offset="70%" stopColor="#034B8A" />
            <stop offset="100%" stopColor="#011836" />
          </linearGradient>
          <pattern id="cardGrid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke={isLight ? '#E2E8F0' : '#14294F'} strokeWidth="0.5" opacity="0.4" />
          </pattern>
        </defs>

        <rect width="400" height="300" fill="url(#cardGrid)" opacity="0.6" />
        <circle cx="200" cy="150" r="95" fill="#0D95FE" opacity="0.08" />

        {/* Global isometric grid circle */}
        <ellipse cx="200" cy="160" rx="140" ry="70" stroke="#1E3A6B" strokeWidth="1" strokeDasharray="4 4" fill="none" />
        <ellipse cx="200" cy="160" rx="90" ry="45" stroke="#0D95FE" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.5" />

        {/* BACK CARD: Naira Card (Obsidian Emerald Foil) */}
        <g transform="translate(80, 80)">
          <path
            d="M 20 20 L 160 0 L 220 70 L 80 90 Z"
            fill="url(#cardNaira)"
            stroke="#00DF8F"
            strokeWidth="2"
          />
          {/* Card Details */}
          <text x="45" y="38" fill="#F2F5F9" fontSize="10" fontWeight="bold">Axoora</text>
          <text x="85" y="36" fill="#00DF8F" fontSize="7" fontFamily="monospace">NGN VIRTUAL</text>
          <text x="50" y="60" fill="#A8BBD6" fontSize="8" fontFamily="monospace">5061 •••• •••• 3019</text>
          {/* Chip */}
          <rect x="145" y="35" width="16" height="12" rx="2" fill="#A7F3D0" />
        </g>

        {/* FRONT CARD: USD Dollar Card (Cyber Cyan) */}
        <g transform="translate(130, 110)">
          <path
            d="M 20 20 L 160 0 L 220 70 L 80 90 Z"
            fill="url(#cardDollar)"
            stroke="#67E8F9"
            strokeWidth="2.5"
            className="filter drop-shadow-2xl"
          />
          {/* Card Sheen */}
          <path d="M 20 20 L 100 9 L 60 75 L 80 90 Z" fill="rgba(255,255,255,0.12)" />
          {/* Card Details */}
          <text x="45" y="38" fill="#FFFFFF" fontSize="10" fontWeight="extrabold">Axoora<tspan fill="#A7F3D0">.ai</tspan></text>
          <text x="95" y="36" fill="#BAE6FD" fontSize="7" fontFamily="monospace">USD VIRTUAL</text>
          <text x="50" y="62" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="bold">4284 •••• •••• 1092</text>
          {/* Holographic Chip */}
          <rect x="145" y="35" width="16" height="12" rx="2" fill="#FDE68A" stroke="#B45309" strokeWidth="0.5" />
          <line x1="149" y1="35" x2="149" y2="47" stroke="#92400E" strokeWidth="0.5" />
          <line x1="157" y1="35" x2="157" y2="47" stroke="#92400E" strokeWidth="0.5" />
          {/* Contactless symbol */}
          <path d="M 180 38 C 183 40, 183 44, 180 46" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M 185 36 C 189 39, 189 45, 185 48" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </g>

        {/* Global Merchant Compatibility Floating Badges */}
        <g transform="translate(45, 180)">
          <rect width="110" height="34" rx="8" fill="#0A1B3D" stroke="#0D95FE" strokeWidth="1.5" />
          <text x="14" y="16" fill="#F2F5F9" fontSize="8" fontWeight="bold">Apple • Google • Stripe</text>
          <text x="14" y="26" fill="#00DF8F" fontSize="7" fontFamily="monospace">Zero FX Surcharge</text>
        </g>

        <g transform="translate(250, 70)">
          <rect width="120" height="38" rx="8" fill="#020F2E" stroke="#00DF8F" strokeWidth="1.5" />
          <circle cx="16" cy="19" r="5" fill="#00DF8F" />
          <text x="28" y="17" fill="#F2F5F9" fontSize="8" fontWeight="bold">Rolling 60s CVV</text>
          <text x="28" y="28" fill="#A8BBD6" fontSize="7">Instant Card Freeze</text>
        </g>
      </svg>
    </div>
  );
};
