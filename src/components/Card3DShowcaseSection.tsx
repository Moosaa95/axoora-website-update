import React, { useState, useEffect, useRef } from 'react';
import { BankAccount } from '../types';

interface Card3DShowcaseSectionProps {
  account: BankAccount;
  onOpenTransfer: () => void;
  onOpenOnboarding: () => void;
}

type CardType = 'physical' | 'virtual';
type CardFinish = 'obsidian' | 'emerald' | 'cyan' | 'platinum';

export const Card3DShowcaseSection: React.FC<Card3DShowcaseSectionProps> = ({
  account,
  onOpenTransfer,
  onOpenOnboarding,
}) => {
  // Mode: Physical Titanium vs Virtual USD/NGN
  const [cardType, setCardType] = useState<CardType>('physical');
  const [selectedFinish, setSelectedFinish] = useState<CardFinish>('obsidian');

  // Interactive controls
  const [spendLimit, setSpendLimit] = useState<number>(3420);
  const [isInternationalEnabled, setIsInternationalEnabled] = useState<boolean>(true);
  const [isAtmEnabled, setIsAtmEnabled] = useState<boolean>(true);
  const [isCardFrozen, setIsCardFrozen] = useState<boolean>(false);
  const [copiedPan, setCopiedPan] = useState<boolean>(false);

  // Dynamic Rolling CVV
  const [cvv, setCvv] = useState<string>('824');
  const [cvvSeconds, setCvvSeconds] = useState<number>(54);

  // 3D Parallax Tilt state
  const [tilt, setTilt] = useState<{ x: number; y: number; sheenX: number; sheenY: number }>({
    x: 0,
    y: 0,
    sheenX: 50,
    sheenY: 50,
  });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);

  const cardRef = useRef<HTMLDivElement>(null);

  // Timer for 60s rolling CVV
  useEffect(() => {
    const timer = setInterval(() => {
      setCvvSeconds((prev) => {
        if (prev <= 1) {
          setCvv(Math.floor(100 + Math.random() * 900).toString());
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle Card Type Switch with 3D Flip/Spin Animation
  const handleTypeSwitch = (type: CardType) => {
    if (type === cardType) return;
    setIsFlipping(true);
    setTimeout(() => {
      setCardType(type);
      if (type === 'virtual') {
        setSelectedFinish('cyan');
        setIsAtmEnabled(false);
      } else {
        setSelectedFinish('obsidian');
        setIsAtmEnabled(true);
      }
    }, 200);
    setTimeout(() => {
      setIsFlipping(false);
    }, 600);
  };

  // Mouse move handler for realistic 3D perspective and specular sheen
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (-14deg to +14deg)
    const rotateY = ((x - centerX) / centerX) * 14;
    const rotateX = -((y - centerY) / centerY) * 14;

    // Sheen position percentage (0 to 100)
    const sheenX = (x / rect.width) * 100;
    const sheenY = (y / rect.height) * 100;

    setTilt({ x: rotateX, y: rotateY, sheenX, sheenY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0, sheenX: 50, sheenY: 50 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleCopyCard = () => {
    const pan = cardType === 'physical' ? '5399 8240 1928 9012' : '4111 9028 3491 5821';
    navigator.clipboard?.writeText?.(pan.replace(/\s+/g, ''));
    setCopiedPan(true);
    setTimeout(() => setCopiedPan(false), 2000);
  };

  // Colorway styling maps
  const finishStyles = {
    obsidian: {
      bg: 'from-[#0b1220] via-[#050b16] to-[#010610]',
      border: 'border-[#1E3A6B]',
      accent: '#0D95FE',
      textAccent: 'text-[#6FBDFE]',
      name: 'Obsidian Stealth',
      material: '18g Solid Heavy Brushed Titanium',
    },
    emerald: {
      bg: 'from-[#002418] via-[#01140e] to-[#010a07]',
      border: 'border-[#00DF8F]',
      accent: '#00DF8F',
      textAccent: 'text-[#00DF8F]',
      name: 'Sovereign Emerald',
      material: 'Brushed Forest Metal with Gold Chamfer',
    },
    cyan: {
      bg: 'from-[#031d38] via-[#011124] to-[#010a16]',
      border: 'border-[#00DF8F]',
      accent: '#00DF8F',
      textAccent: 'text-[#00DF8F]',
      name: 'Cyber Glass Hologram',
      material: 'Translucent Multi-Currency Virtual Matrix',
    },
    platinum: {
      bg: 'from-[#1a2942] via-[#0d1728] to-[#080f1c]',
      border: 'border-[#A8BBD6]',
      accent: '#F2F5F9',
      textAccent: 'text-[#F2F5F9]',
      name: 'Raw Platinum',
      material: 'Laser-Etched Pure Metallic Alloy',
    },
  };

  const currentFinish = finishStyles[selectedFinish];

  return (
    <section
      id="card-3d-showcase"
      className="relative w-full px-4 sm:px-8 py-16 lg:py-28 border-b border-[#14294F] bg-[#020F2E] overflow-hidden"
    >
      {/* Subtle Ambient Lighting: Radial glow matching card palette */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#0D95FE]/10 via-[#00DF8F]/5 to-transparent rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col gap-10 relative z-10">
        {/* Revolut-inspired Minimalist Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#14294F]">
          <div className="flex flex-col gap-2 max-w-2xl">
            <span className="font-mono text-xs font-bold tracking-widest text-[#00DF8F] uppercase">
              REVOLUT-GRADE 3D HARDWARE ARCHITECTURE
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#F2F5F9] tracking-tight leading-[1.08]">
              Elevate your spend
            </h2>
            <p className="text-base sm:text-lg text-[#A8BBD6]">
              Customize your card to match your vibe. Tap into instant multi-currency liquidity with zero FX markup and hardware-grade security.
            </p>
          </div>

          {/* Interactive Pill Toggle Buttons: Physical Titanium vs Virtual USD/NGN */}
          <div className="flex items-center p-1.5 rounded-full bg-[#0A1B3D] border-2 border-[#14294F] self-start md:self-auto shadow-none">
            <button
              onClick={() => handleTypeSwitch('physical')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-2 ${
                cardType === 'physical'
                  ? 'bg-[#14294F] text-[#F2F5F9] border-2 border-[#0D95FE]'
                  : 'text-[#A8BBD6] hover:text-[#F2F5F9]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">credit_card</span>
              <span>Physical Titanium</span>
            </button>

            <button
              onClick={() => handleTypeSwitch('virtual')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-2 ${
                cardType === 'virtual'
                  ? 'bg-[#14294F] text-[#00DF8F] border-2 border-[#00DF8F]'
                  : 'text-[#A8BBD6] hover:text-[#F2F5F9]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">bolt</span>
              <span>Virtual USD/NGN</span>
            </button>
          </div>
        </div>

        {/* 3D Showcase Stage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* LEFT 3D PERSPECTIVE CARD DISPLAY */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative perspective-[1200px] py-6">
            {/* Interactive Card Container with 3D tilt and mouse follow */}
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={`w-full max-w-[430px] aspect-[1.586] rounded-3xl p-7 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br ${
                currentFinish.bg
              } border-2 ${currentFinish.border} cursor-grab active:cursor-grabbing transition-transform duration-200 select-none`}
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipping
                  ? 'rotateY(180deg) scale(0.95)'
                  : isHovered
                  ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.03)`
                  : 'rotateX(4deg) rotateY(-8deg)',
                transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s ease-out',
              }}
            >
              {/* Dynamic Specular Sheen Highlight following cursor */}
              <div
                className="absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-300 mix-blend-overlay"
                style={{
                  background: `radial-gradient(circle at ${tilt.sheenX}% ${tilt.sheenY}%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.05) 45%, transparent 70%)`,
                  opacity: isHovered ? 1 : 0.35,
                }}
              ></div>

              {/* Brushed Metallic Micro-Texture Overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-20 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(255,255,255,0.06)_3px,transparent_4px)]"></div>

              {/* CARD TOP ROW: Brand + Mode Badge + Contactless Icon */}
              <div className="flex items-center justify-between relative z-10" style={{ transform: 'translateZ(30px)' }}>
                <div className="flex items-center gap-2.5">
                  <span className="font-extrabold text-2xl tracking-tight text-[#F2F5F9]">
                    Axoora<span className="text-[#0D95FE]">.ai</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#14294F] border border-[#14294F] text-[#A8BBD6] font-mono text-[10px] uppercase font-bold tracking-wider">
                    {cardType === 'physical' ? 'TITANIUM 18G' : 'VIRTUAL MULTI-FX'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#A8BBD6] text-[24px]">
                    contactless
                  </span>
                </div>
              </div>

              {/* CARD MIDDLE ROW: EMV Microchip & Card PAN */}
              <div className="flex flex-col gap-4 relative z-10" style={{ transform: 'translateZ(40px)' }}>
                {/* Microchip */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-9 rounded-lg bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-500 border border-amber-600/50 flex items-center justify-center shadow-none relative overflow-hidden">
                    <div className="w-8 h-6 border border-amber-800/40 rounded-sm"></div>
                    <div className="absolute inset-x-0 h-[1px] bg-amber-800/40 top-1/2"></div>
                    <div className="absolute inset-y-0 w-[1px] bg-amber-800/40 left-1/2"></div>
                  </div>

                  {cardType === 'virtual' && (
                    <span className="px-2.5 py-1 rounded bg-[#00DF8F]/20 text-[#00DF8F] font-mono text-xs font-bold border border-[#00DF8F]">
                      LIVE FX: ₦1,540 / $1
                    </span>
                  )}
                </div>

                {/* Card PAN with copy indicator */}
                <div
                  onClick={handleCopyCard}
                  className="font-mono text-xl sm:text-2xl text-[#F2F5F9] font-bold tracking-widest flex items-center justify-between cursor-pointer group/pan"
                  title="Click to copy full card number"
                >
                  {cardType === 'physical' ? (
                    <>
                      <span>5399</span>
                      <span>8240</span>
                      <span>••••</span>
                      <span>9012</span>
                    </>
                  ) : (
                    <>
                      <span>4111</span>
                      <span>9028</span>
                      <span>3491</span>
                      <span>5821</span>
                    </>
                  )}
                  <span className="material-symbols-outlined text-[18px] text-[#A8BBD6] group-hover/pan:text-[#00DF8F] transition-colors">
                    {copiedPan ? 'check' : 'content_copy'}
                  </span>
                </div>
              </div>

              {/* CARD BOTTOM ROW: Holder, Expiry & Mastercard Logo */}
              <div className="flex items-end justify-between relative z-10" style={{ transform: 'translateZ(25px)' }}>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-[#A8BBD6] uppercase tracking-wider">
                    Cardholder
                  </span>
                  <span className="text-sm font-bold text-[#F2F5F9] tracking-wider uppercase">
                    {account.accountName}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex flex-col text-right">
                    <span className="text-[10px] font-mono text-[#A8BBD6] uppercase tracking-wider">
                      Expires
                    </span>
                    <span className="font-mono text-xs font-bold text-[#F2F5F9]">
                      {cardType === 'physical' ? '09/29' : '12/28'}
                    </span>
                  </div>

                  {/* Mastercard Dual Foil Logo */}
                  <div className="flex -space-x-3">
                    <div className="w-8 h-8 rounded-full bg-red-500 opacity-90"></div>
                    <div className="w-8 h-8 rounded-full bg-amber-400 opacity-90"></div>
                  </div>
                </div>
              </div>

              {/* FROZEN OVERLAY STATE */}
              {isCardFrozen && (
                <div className="absolute inset-0 bg-[#01091C]/90 backdrop-blur-sm flex flex-col items-center justify-center gap-2 z-30">
                  <span className="material-symbols-outlined text-[#FF6A6A] text-[48px] animate-pulse">
                    lock
                  </span>
                  <span className="font-mono text-sm text-[#FF6A6A] font-bold uppercase tracking-wider">
                    CARD FROZEN SECURELY
                  </span>
                  <span className="text-[11px] text-[#A8BBD6]">Zero auth attempts will pass</span>
                </div>
              )}
            </div>

            {/* Reflection Plane underneath the card */}
            <div className="w-3/4 h-8 bg-gradient-to-b from-[#0D95FE]/15 to-transparent blur-xl rounded-full mt-2 pointer-events-none"></div>

            {/* Tactile Material Badge */}
            <div className="flex items-center gap-2 pt-2">
              <span className="font-mono text-xs text-[#A8BBD6]">
                Material Finish: <strong className="text-[#F2F5F9]">{currentFinish.material}</strong>
              </span>
            </div>
          </div>

          {/* RIGHT LIVE CONTROLS & SECURITY LIMITS CONSOLE */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            {/* Colorway / Finish Switcher */}
            <div className="p-4 rounded-2xl bg-[#0A1B3D] border border-[#14294F] flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#F2F5F9]">Select Aesthetic Finish</span>
                <span className="font-mono text-[#00DF8F]">{currentFinish.name}</span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[
                  { key: 'obsidian', label: 'Obsidian', color: 'bg-[#0b1220]', border: 'border-[#1E3A6B]' },
                  { key: 'emerald', label: 'Emerald', color: 'bg-[#002418]', border: 'border-[#00DF8F]' },
                  { key: 'cyan', label: 'Cyber Cyan', color: 'bg-[#031d38]', border: 'border-[#0D95FE]' },
                  { key: 'platinum', label: 'Platinum', color: 'bg-[#1a2942]', border: 'border-[#A8BBD6]' },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setSelectedFinish(item.key as CardFinish)}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                      selectedFinish === item.key
                        ? `bg-[#14294F] text-[#F2F5F9] border-2 ${item.border}`
                        : 'bg-[#01091C] border border-[#14294F] text-[#A8BBD6] hover:text-[#F2F5F9]'
                    }`}
                  >
                    <span className={`w-3.5 h-3.5 rounded-full ${item.color} border border-white/30`}></span>
                    <span className="text-[11px] truncate">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Real-time Spending Limit Slider */}
            <div className="p-4 rounded-2xl bg-[#0A1B3D] border border-[#14294F] flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#F2F5F9]">Monthly Spending Limit</span>
                <span className="font-mono font-bold text-[#0D95FE]">
                  ${spendLimit.toLocaleString()} / $10,000
                </span>
              </div>

              <input
                type="range"
                min="500"
                max="10000"
                step="100"
                value={spendLimit}
                onChange={(e) => setSpendLimit(Number(e.target.value))}
                className="w-full accent-[#0D95FE] bg-[#01091C] rounded-lg cursor-pointer h-2"
              />

              <div className="flex items-center justify-between text-xs text-[#A8BBD6] font-mono">
                <span>Auto-freeze threshold at 95%</span>
                <span className="text-[#00DF8F] font-bold">₦{(spendLimit * 1540).toLocaleString()} Equivalent</span>
              </div>
            </div>

            {/* Toggle Controls: International Multi-Currency & ATM Physical Cashouts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* International multi-currency toggle */}
              <div className="p-3.5 rounded-xl bg-[#0A1B3D] border border-[#14294F] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#0D95FE]/10 flex items-center justify-center text-[#0D95FE]">
                    <span className="material-symbols-outlined text-[18px]">public</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#F2F5F9]">Multi-Currency FX</span>
                    <span className="text-[10px] text-[#A8BBD6]">USD, GBP, EUR</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsInternationalEnabled(!isInternationalEnabled)}
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors relative focus:outline-none ${
                    isInternationalEnabled ? 'bg-[#0D95FE]' : 'bg-[#01091C] border border-[#14294F]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full transition-transform ${
                      isInternationalEnabled ? 'bg-[#020F2E] translate-x-5' : 'bg-[#A8BBD6] translate-x-0'
                    }`}
                  ></div>
                </button>
              </div>

              {/* ATM Physical Cashout toggle */}
              <div className="p-3.5 rounded-xl bg-[#0A1B3D] border border-[#14294F] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#00DF8F]/10 flex items-center justify-center text-[#00DF8F]">
                    <span className="material-symbols-outlined text-[18px]">local_atm</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#F2F5F9]">ATM Cashouts</span>
                    <span className="text-[10px] text-[#A8BBD6]">
                      {cardType === 'physical' ? 'Active on Hardware' : 'Disabled for Virtual'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsAtmEnabled(!isAtmEnabled)}
                  disabled={cardType === 'virtual'}
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors relative focus:outline-none disabled:opacity-40 ${
                    isAtmEnabled ? 'bg-[#00DF8F]' : 'bg-[#01091C] border border-[#14294F]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full transition-transform ${
                      isAtmEnabled ? 'bg-[#01091C] translate-x-5' : 'bg-[#A8BBD6] translate-x-0'
                    }`}
                  ></div>
                </button>
              </div>
            </div>

            {/* Rolling CVV & One-Click Freeze Action Button */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
              {/* Rolling Dynamic CVV */}
              <div className="p-3.5 rounded-xl bg-[#0A1B3D] border border-[#14294F] flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-[#A8BBD6] uppercase">
                    Rolling 3-Digit CVV
                  </span>
                  <span className="font-mono text-lg font-bold text-[#00DF8F]">{cvv}</span>
                </div>

                <div className="flex items-center gap-1.5 font-mono text-xs text-[#A8BBD6]">
                  <span className="material-symbols-outlined text-[16px] text-[#00DF8F] animate-spin">
                    refresh
                  </span>
                  <span>{cvvSeconds}s</span>
                </div>
              </div>

              {/* Instant Freeze Card Button */}
              <button
                onClick={() => setIsCardFrozen(!isCardFrozen)}
                className={`py-3.5 px-4 rounded-xl border-2 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                  isCardFrozen
                    ? 'bg-[#FF6A6A] text-white border-[#FF6A6A]'
                    : 'bg-[#01091C] hover:bg-[#FF6A6A]/10 border-[#FF6A6A] text-[#FF6A6A]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">lock</span>
                <span>{isCardFrozen ? 'Unfreeze Card' : 'Freeze Card Instantly'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
