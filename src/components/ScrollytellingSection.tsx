import React, { useState, useEffect, useRef } from 'react';

interface ScrollytellingSectionProps {
  onOpenTransfer: () => void;
  onOpenOnboarding: () => void;
  onNavigateToWhatsApp: () => void;
}

interface StepData {
  id: string;
  stepNum: string;
  badge: string;
  title: string;
  headline: string;
  description: string;
  accentColor: string;
  accentBorder: string;
  accentBg: string;
  tagColor: string;
  audioQuote?: string;
  audioDuration?: string;
  metricBadge: string;
  metricLabel: string;
  specPill: string;
  chatSnippet: {
    userText: string;
    aiBadge: string;
    aiTitle: string;
    details: { label: string; value: string; isHighlight?: boolean }[];
    actionText: string;
    actionIcon: string;
    actionSuccess: boolean;
  };
}

export const ScrollytellingSection: React.FC<ScrollytellingSectionProps> = ({
  onOpenTransfer,
  onOpenOnboarding,
  onNavigateToWhatsApp,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioPlayhead, setAudioPlayhead] = useState<number>(35);
  const [approvedSteps, setApprovedSteps] = useState<Record<number, boolean>>({});

  const steps: StepData[] = [
    {
      id: 'step-voice',
      stepNum: '01',
      badge: 'INITIAL PIN // ZERO-APP VOICE COMMERCE',
      title: 'Send money instantly via voice & chat.',
      headline: 'Send money instantly via voice & chat.',
      description:
        'Send Pidgin, Yorùbá, Hausa, or Igbo voice notes on WhatsApp. Axoora’s fine-tuned RAG parses bank details, confirms recipients, and authorizes instant NIP transfers in under 0.89 seconds.',
      accentColor: '#00DF8F',
      accentBorder: 'border-[#00DF8F]',
      accentBg: 'bg-[#00DF8F]/10',
      tagColor: 'text-[#00DF8F]',
      audioQuote: '"Abeeg send ₦5,000 to Chidinma for fuel"',
      audioDuration: '0:04',
      metricBadge: '0.89s DISPATCH',
      metricLabel: 'NIP Central Bank Switch',
      specPill: 'FIDO2 Touch ID / Face ID Biometric Hash',
      chatSnippet: {
        userText: 'Abeeg send ₦5,000 to Chidinma for fuel',
        aiBadge: 'INTENT RESOLVED // NIP DISPATCH',
        aiTitle: '₦5,000.00 → Chidinma Okafor',
        details: [
          { label: 'Destination Bank', value: 'Access Bank Plc' },
          { label: 'NUBAN Account', value: '0128941029' },
          { label: 'Transfer Fee', value: '₦0.00 (Zero Fee)', isHighlight: true },
          { label: 'Settlement Rail', value: 'NIBSS Instant 0.84s' },
        ],
        actionText: 'Authorize with Touch ID',
        actionIcon: 'fingerprint',
        actionSuccess: true,
      },
    },
    {
      id: 'step-vtu',
      stepNum: '02',
      badge: 'MODULE A // DIRECT TELCO GATEWAY',
      title: 'Buy Airtime & Data Super Fast',
      headline: 'Buy Airtime & Data Super Fast.',
      description:
        'Instant airtime recharges and high-speed data bundles across MTN, Airtel, Glo, and 9mobile. Zero network surcharges, direct telco API clearing, and automated low-balance renewals via voice command.',
      accentColor: '#0D95FE',
      accentBorder: 'border-[#0D95FE]',
      accentBg: 'bg-[#0D95FE]/10',
      tagColor: 'text-[#0D95FE]',
      audioQuote: '"Load 10GB MTN data to my shop number"',
      audioDuration: '0:03',
      metricBadge: '0.22s RECHARGE',
      metricLabel: 'Tier 1 Telco Switch API',
      specPill: 'MTN / Airtel / Glo / 9mobile Direct Rail',
      chatSnippet: {
        userText: 'Load 10GB MTN data to my shop number',
        aiBadge: 'VTU TELCO DISPATCHED',
        aiTitle: '10GB Monthly Data Bundle',
        details: [
          { label: 'Telco Line', value: '0803 491 0283 (MTN 4G)' },
          { label: 'Bundle Type', value: '30-Day SME Super Speed' },
          { label: 'Total Charged', value: '₦3,000.00', isHighlight: true },
          { label: 'Token Receipt', value: 'VTU-MTN-994182-OK' },
        ],
        actionText: 'Data Bundle Active on SIM',
        actionIcon: 'verified',
        actionSuccess: true,
      },
    },
    {
      id: 'step-utilities',
      stepNum: '03',
      badge: 'MODULE B // DISCO & CABLE BOUQUET CLEARING',
      title: 'Pay TV Subscription Bills via Chat',
      headline: 'Pay TV Subscription Bills via Chat.',
      description:
        'Renew DStv, GOtv, StarTimes, or recharge Ikeja & Abuja Electric prepaid meters directly within your chat stream. Token digits are generated and formatted into instant copyable blocks with zero waiting.',
      accentColor: '#F2A93B',
      accentBorder: 'border-[#F2A93B]',
      accentBg: 'bg-[#F2A93B]/10',
      tagColor: 'text-[#F2A93B]',
      audioQuote: '"Pay my DStv Compact bouquet for 1 month"',
      audioDuration: '0:05',
      metricBadge: 'INSTANT TOKEN',
      metricLabel: 'Direct MultiChoice Gateway',
      specPill: 'Prepaid Token Generated in Chat',
      chatSnippet: {
        userText: 'Pay my DStv Compact bouquet for 1 month',
        aiBadge: 'MULTICHOICE DIRECT CLEARED',
        aiTitle: 'DStv Compact (1 Month Renewal)',
        details: [
          { label: 'Smartcard ID', value: '1049 2810 92 (Babatunde A.)' },
          { label: 'Bouquet Tier', value: 'Compact HD 135+ Channels' },
          { label: 'Amount Billed', value: '₦15,700.00', isHighlight: true },
          { label: 'Signal Status', value: 'Reactivated in 8 seconds' },
        ],
        actionText: 'Signal Restored Instantly',
        actionIcon: 'tv',
        actionSuccess: true,
      },
    },
    {
      id: 'step-schedule',
      stepNum: '04',
      badge: 'MODULE C // AUTONOMOUS ROTATIONAL LEDGER',
      title: 'Schedule Payments Daily to Anyone',
      headline: 'Schedule Payments Daily to Anyone.',
      description:
        'Automate standing supplier floats, daily market thrift (Ajo/Esusu) payouts, and staff salary disbursements. Axoora executes autonomous cron-ledger transactions with cryptographic double-entry integrity.',
      accentColor: '#00DF8F',
      accentBorder: 'border-[#00DF8F]',
      accentBg: 'bg-[#00DF8F]/10',
      tagColor: 'text-[#00DF8F]',
      audioQuote: '"Every morning send ₦20k to supplier Musa at 8am"',
      audioDuration: '0:06',
      metricBadge: '0.00s DELAY',
      metricLabel: 'Automated Standing Cron Order',
      specPill: 'HSM Cryptographic Schedule Rule',
      chatSnippet: {
        userText: 'Every morning send ₦20k to supplier Musa at 8am',
        aiBadge: 'STANDING ORDER #882 REGISTERED',
        aiTitle: 'Daily Supplier Float: ₦20,000.00',
        details: [
          { label: 'Recipient', value: 'Musa Aliyu (Zenith Bank)' },
          { label: 'Schedule Frequency', value: 'Daily at 08:00 AM WAT' },
          { label: 'Funding Source', value: 'Street Vault (15.5% APY)' },
          { label: 'Next Execution', value: 'Tomorrow 08:00 AM' },
        ],
        actionText: 'Standing Rule Locked in HSM',
        actionIcon: 'lock_clock',
        actionSuccess: true,
      },
    },
  ];

  // Scroll listener for the 300vh container
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalScrollableDistance = rect.height - windowH;

      if (rect.top <= 0 && rect.bottom >= windowH) {
        // We are inside the pinned frame
        const currentScrolled = -rect.top;
        const progress = Math.max(0, Math.min(1, currentScrolled / totalScrollableDistance));
        setScrollProgress(progress);

        // Map progress to steps [0, 1, 2, 3]
        const stepIndex = Math.min(3, Math.floor(progress * 4));
        setActiveStep(stepIndex);
      } else if (rect.top > 0) {
        setScrollProgress(0);
        setActiveStep(0);
      } else if (rect.bottom < windowH) {
        setScrollProgress(1);
        setActiveStep(3);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Audio simulation timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingAudio) {
      timer = setInterval(() => {
        setAudioPlayhead((prev) => {
          if (prev >= 95) {
            setIsPlayingAudio(false);
            return 10;
          }
          return prev + 5;
        });
      }, 150);
    }
    return () => clearInterval(timer);
  }, [isPlayingAudio]);

  const current = steps[activeStep];

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    if (!containerRef.current) return;
    const windowH = window.innerHeight;
    const totalDist = containerRef.current.offsetHeight - windowH;
    const targetScrollY =
      window.scrollY + containerRef.current.getBoundingClientRect().top + (index / 3) * totalDist;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  const handleApproveAction = (stepIdx: number) => {
    setApprovedSteps((prev) => ({ ...prev, [stepIdx]: true }));
  };

  return (
    <section
      ref={containerRef}
      id="scrollytelling-wrapper"
      className="relative w-full h-[300vh] bg-[#020F2E] border-b border-[#14294F]"
    >
      {/* Sticky Viewport Stage (Pinned while scrolling through the 300vh container) */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center px-4 sm:px-8 overflow-hidden z-20 bg-[#020F2E]">
        {/* Subtle Ambient Lighting Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[radial-gradient(#0D95FE_1.5px,transparent_1.5px)] [background-size:28px_28px]"></div>

        {/* Dynamic ambient color glow according to current step */}
        <div
          className="absolute -top-32 right-1/4 w-[420px] h-[420px] rounded-full blur-[140px] pointer-events-none transition-colors duration-700 opacity-20"
          style={{ backgroundColor: current.accentColor }}
        ></div>

        <div className="max-w-7xl mx-auto w-full flex flex-col gap-6 py-4 relative z-10">
          {/* Top Telemetry & Step Scrub Pills */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-[#14294F]">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A1B3D] border-2 border-[#00DF8F] text-[#00DF8F] font-mono text-xs font-bold uppercase tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00DF8F] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00DF8F]"></span>
                </span>
                Pinned Storytelling Stage
              </span>
              <span className="font-mono text-xs text-[#A8BBD6] hidden lg:inline">
                OwO.app Cinematic Architecture // 300vh Scroll Lock
              </span>
            </div>

            {/* Interactive Step Scrub Pills */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0A1B3D] border border-[#14294F] overflow-x-auto">
              {steps.map((st, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={st.id}
                    onClick={() => handleStepClick(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      isActive
                        ? `bg-[#14294F] text-[#F2F5F9] border-2 ${st.accentBorder}`
                        : 'text-[#A8BBD6] hover:text-[#F2F5F9]'
                    }`}
                  >
                    <span className="font-mono text-[10px] opacity-70">{st.stepNum}.</span>
                    <span>{st.title.split(' ')[0]} {st.title.split(' ')[1]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Stage Grid: Left Narrative Card + Right Live Google Pixel Phone Mockup */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* LEFT COLUMN: Cinematic Narrative Container */}
            <div className="lg:col-span-6 flex flex-col justify-center gap-5">
              {/* Badge & Step indicator */}
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#0A1B3D] border-2 border-[#0D95FE] text-[#0D95FE]">
                  STEP {current.stepNum} OF 04
                </span>
                <span className={`font-mono text-xs font-bold tracking-wider uppercase ${current.tagColor}`}>
                  {current.badge}
                </span>
              </div>

              {/* Dynamic Title */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F2F5F9] tracking-tight leading-[1.12] transition-all duration-300">
                {current.headline}
              </h2>

              {/* Subtext description */}
              <p className="text-base sm:text-lg text-[#A8BBD6] max-w-xl leading-relaxed transition-all duration-300">
                {current.description}
              </p>

              {/* Tactile Feature Block with Audio Waveform */}
              <div
                className={`p-5 rounded-2xl bg-[#0A1B3D] border-2 ${current.accentBorder} flex flex-col gap-3.5 transition-all duration-300`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-xs font-bold flex items-center gap-1.5 ${current.tagColor}`}>
                    <span className="material-symbols-outlined text-[16px]">graphic_eq</span>
                    {current.metricLabel}
                  </span>
                  <span className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-[#14294F] border border-[#14294F] text-[#F2F5F9] font-bold">
                    {current.metricBadge}
                  </span>
                </div>

                {/* Simulated Audio Note Bar */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#01091C] border border-[#14294F]">
                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-transform active:scale-95"
                    style={{ backgroundColor: current.accentColor, color: '#01091C' }}
                    title={isPlayingAudio ? 'Pause Voice Note' : 'Play Voice Note'}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {isPlayingAudio ? 'pause' : 'play_arrow'}
                    </span>
                  </button>

                  <div className="flex flex-col flex-1 min-w-0 gap-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-[#F2F5F9] truncate">
                        {current.audioQuote}
                      </span>
                      <span className="font-mono text-[11px] text-[#A8BBD6] shrink-0 ml-2">
                        {current.audioDuration}
                      </span>
                    </div>

                    {/* Animated Waveform Visualizer */}
                    <div className="h-3 flex items-center gap-1">
                      {[30, 70, 45, 90, 60, 100, 40, 85, 55, 95, 35, 75, 50, 80, 60, 90, 40, 70].map(
                        (h, i) => (
                          <div
                            key={i}
                            className={`w-1 rounded-full transition-all duration-200 ${
                              (i / 18) * 100 <= audioPlayhead ? 'opacity-100' : 'opacity-30'
                            }`}
                            style={{
                              height: isPlayingAudio ? `${Math.max(20, (h * (i % 2 === 0 ? 1 : 0.7)))}%` : `${h * 0.7}%`,
                              backgroundColor: current.accentColor,
                            }}
                          ></div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Security and rail metadata */}
                <div className="flex items-center justify-between text-xs text-[#A8BBD6] font-mono pt-1 border-t border-[#14294F]">
                  <span>{current.specPill}</span>
                  <span className={`font-semibold ${current.tagColor}`}>100% NIP Clearing SLA</span>
                </div>
              </div>

              {/* Progress Scrubber and Vertical Stepper Buttons */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-36 bg-[#01091C] h-2 rounded-full overflow-hidden border border-[#14294F]">
                    <div
                      className="h-full transition-all duration-200"
                      style={{
                        width: `${Math.round(scrollProgress * 100)}%`,
                        backgroundColor: current.accentColor,
                      }}
                    ></div>
                  </div>
                  <span className="font-mono text-xs text-[#A8BBD6]">
                    {Math.round(scrollProgress * 100)}% (Scroll to Scrub)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStepClick(Math.max(0, activeStep - 1))}
                    disabled={activeStep === 0}
                    className="w-9 h-9 rounded-lg bg-[#0A1B3D] border border-[#14294F] hover:bg-[#14294F] disabled:opacity-30 flex items-center justify-center text-[#F2F5F9] transition-all"
                    title="Previous Module"
                  >
                    <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
                  </button>
                  <button
                    onClick={() => handleStepClick(Math.min(3, activeStep + 1))}
                    disabled={activeStep === 3}
                    className="w-9 h-9 rounded-lg bg-[#0A1B3D] border border-[#14294F] hover:bg-[#14294F] disabled:opacity-30 flex items-center justify-center text-[#F2F5F9] transition-all"
                    title="Next Module"
                  >
                    <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Live Google Pixel Phone Mockup with WhatsApp Screen */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <div
                className={`w-full max-w-[340px] sm:max-w-[360px] rounded-[44px] p-3.5 bg-[#01091C] border-2 ${current.accentBorder} relative transition-all duration-500`}
              >
                {/* Outer Hardware Chassis Frame */}
                <div className="rounded-[36px] bg-[#01091C] border border-[#14294F] overflow-hidden flex flex-col relative text-[#F2F5F9] min-h-[500px]">
                  {/* Google Pixel Android Top Camera Punch Hole & Status Bar */}
                  <div className="px-5 pt-3 pb-2 flex items-center justify-between text-[#A8BBD6] font-mono text-[11px] bg-[#005c4b]/30 border-b border-[#14294F]/40">
                    <span className="font-semibold text-[#F2F5F9]">14:32</span>
                    {/* Pixel Center Hole Punch */}
                    <div className="w-3.5 h-3.5 rounded-full bg-[#01091C] border border-[#14294F]"></div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[14px]">signal_cellular_alt</span>
                      <span className="material-symbols-outlined text-[14px]">wifi</span>
                      <span className="material-symbols-outlined text-[14px]">battery_full</span>
                    </div>
                  </div>

                  {/* WhatsApp App Header */}
                  <div className="px-4 py-2.5 flex items-center justify-between border-b border-[#14294F] bg-[#005c4b]/70">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#0D95FE] flex items-center justify-center text-white font-bold">
                        <span className="material-symbols-outlined text-[18px]">smart_toy</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-[13px] text-[#F2F5F9] font-bold">
                            Axoora AI Copilot
                          </span>
                          <span className="material-symbols-outlined text-[#00DF8F] text-[14px]">
                            verified
                          </span>
                        </div>
                        <span className="text-[10px] text-teal-200">
                          CBN PSSP Rail • Verified Business
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-teal-200">
                      <span className="material-symbols-outlined text-[16px] cursor-pointer">call</span>
                      <span className="material-symbols-outlined text-[16px] cursor-pointer">more_vert</span>
                    </div>
                  </div>

                  {/* WhatsApp Chat Body (Smoothly morphs with active module) */}
                  <div className="p-3.5 flex flex-col gap-2.5 flex-1 justify-end text-sm bg-[#020F2E]/60">
                    {/* User Voice Bubble */}
                    <div className="self-end max-w-[85%] bg-[#005c4b] text-white rounded-xl rounded-tr-none px-3.5 py-2.5 flex flex-col gap-1 transition-all">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                          className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white"
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            {isPlayingAudio ? 'pause' : 'play_arrow'}
                          </span>
                        </button>
                        <p className="text-xs font-medium leading-tight">
                          {current.chatSnippet.userText}
                        </p>
                      </div>
                      <div className="self-end text-[10px] text-teal-200 flex items-center gap-1 pt-0.5">
                        <span>14:32</span>
                        <span className="material-symbols-outlined text-[12px]">done_all</span>
                      </div>
                    </div>

                    {/* AI Response Interactive Card */}
                    <div
                      className={`self-start max-w-[96%] bg-[#0A1B3D] border-2 ${current.accentBorder} rounded-xl rounded-tl-none p-3.5 flex flex-col gap-2.5 transition-all duration-300`}
                    >
                      <div className="flex items-center justify-between pb-1 border-b border-[#14294F]">
                        <span className="px-1.5 py-0.5 rounded font-mono text-[9px] font-bold bg-[#14294F] text-[#F2F5F9]">
                          {current.chatSnippet.aiBadge}
                        </span>
                        <span className="text-[10px] font-mono text-[#00DF8F]">0.84s RAG</span>
                      </div>

                      <div className="text-xs font-bold text-[#F2F5F9]">
                        {current.chatSnippet.aiTitle}
                      </div>

                      {/* Detail Key-Values */}
                      <div className="p-2 rounded bg-[#01091C] border border-[#14294F] text-[11px] flex flex-col gap-1">
                        {current.chatSnippet.details.map((d, i) => (
                          <div key={i} className="flex justify-between items-center text-[#A8BBD6]">
                            <span>{d.label}:</span>
                            <span
                              className={`font-semibold ${
                                d.isHighlight ? current.tagColor : 'text-[#F2F5F9]'
                              }`}
                            >
                              {d.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Action Approval Button */}
                      <button
                        onClick={() => handleApproveAction(activeStep)}
                        className={`w-full py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                          approvedSteps[activeStep]
                            ? 'bg-[#14294F] text-[#00DF8F] border border-[#00DF8F]'
                            : 'hover:brightness-110 active:scale-95'
                        }`}
                        style={{
                          backgroundColor: approvedSteps[activeStep] ? '#14294F' : current.accentColor,
                          color: approvedSteps[activeStep] ? '#00DF8F' : '#01091C',
                        }}
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {approvedSteps[activeStep] ? 'check_circle' : current.chatSnippet.actionIcon}
                        </span>
                        <span>
                          {approvedSteps[activeStep]
                            ? '✓ Handshake Verified & Settled'
                            : current.chatSnippet.actionText}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Input bar */}
                  <div className="p-2.5 bg-[#0A1B3D] border-t border-[#14294F] flex items-center gap-2">
                    <div className="flex-1 bg-[#01091C] border border-[#14294F] rounded-full px-3 py-1.5 text-[#A8BBD6] text-xs flex items-center justify-between">
                      <span className="truncate">Say in Pidgin or Yorùbá...</span>
                      <span className="material-symbols-outlined text-[#0D95FE] text-[16px]">
                        attach_file
                      </span>
                    </div>
                    <button
                      onClick={onNavigateToWhatsApp}
                      className="w-7 h-7 rounded-full flex items-center justify-center transition-transform active:scale-95"
                      style={{ backgroundColor: current.accentColor, color: '#01091C' }}
                    >
                      <span className="material-symbols-outlined text-[16px]">mic</span>
                    </button>
                  </div>

                  {/* Android gesture navigation bar */}
                  <div className="w-24 h-1 bg-[#14294F] rounded-full mx-auto my-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
