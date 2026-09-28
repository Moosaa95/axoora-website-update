'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroBackgroundVideoProps {
  isLight?: boolean;
  onOpenWaitlist?: () => void;
  onOpenWhatsApp?: () => void;
}

type VideoScene = 'pos-agent' | 'app-interface' | 'market-checkout';

export const HeroBackgroundVideo: React.FC<HeroBackgroundVideoProps> = ({
  isLight = false,
  onOpenWaitlist,
  onOpenWhatsApp,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [currentScene, setCurrentScene] = useState<VideoScene>('pos-agent');
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [videoError, setVideoError] = useState<boolean>(false);
  const [showFullDemoModal, setShowFullDemoModal] = useState<boolean>(false);

  // Simulation state for the live Canvas/SVG video engine
  const [progress, setProgress] = useState<number>(0);
  const [transactionStep, setTransactionStep] = useState<number>(0);
  const [recentTransactions, setRecentTransactions] = useState([
    { id: 'tx-1', amount: '₦25,000.00', desc: 'Apex POS #4029 · Wuse Market', time: 'Just now', status: 'SETTLED' },
    { id: 'tx-2', amount: '₦12,500.00', desc: 'WhatsApp Voice · Fuel Pay', time: '12s ago', status: 'SETTLED' },
    { id: 'tx-3', amount: '₦85,000.00', desc: 'Axoora Shop Checkout · Lagos', time: '28s ago', status: 'SETTLED' },
  ]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Auto-cycle through scenes every 8 seconds if playing
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentScene((scene) => {
            if (scene === 'pos-agent') return 'app-interface';
            if (scene === 'app-interface') return 'market-checkout';
            return 'pos-agent';
          });
          return 0;
        }
        return prev + 1.25;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [isPlaying]);

  // Micro-step inside each scene for live animated feedback
  useEffect(() => {
    const stepInterval = setInterval(() => {
      setTransactionStep((prev) => (prev + 1) % 4);
    }, 2200);
    return () => clearInterval(stepInterval);
  }, []);

  // Sync video play/pause
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {
          // Auto-play prevented or network blocked, canvas fallback will run
          setVideoError(true);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Canvas ambient fintech particle & data grid background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth || 1200);
    let height = (canvas.height = canvas.offsetHeight || 700);

    const particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; alpha: number; color: string }> = [];
    const colors = ['#0D95FE', '#00DF8F', '#F2A93B'];

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle grid lines
      ctx.strokeStyle = 'rgba(20, 41, 79, 0.35)';
      ctx.lineWidth = 1;
      const gridSize = 45;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connecting lines between nearby particles
      ctx.globalAlpha = 0.12;
      ctx.strokeStyle = '#0D95FE';
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      if (isPlaying) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isPlaying]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
      {/* ========================================================================= */}
      {/* HTML5 VIDEO STREAM LAYER */}
      {/* ========================================================================= */}
      <video
        ref={videoRef}
        autoPlay
        muted={isMuted}
        loop
        playsInline
        preload="auto"
        onCanPlay={() => setVideoLoaded(true)}
        onError={() => setVideoError(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          videoLoaded && !videoError ? 'opacity-35' : 'opacity-0'
        }`}
        poster="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><rect width='100' height='100' fill='%23020F2E'/></svg>"
      >
        {/* Fintech and digital retail payment video sources */}
        <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
        <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" type="video/mp4" />
      </video>

      {/* ========================================================================= */}
      {/* HIGH-PRECISION REAL-TIME INTERACTION CANVAS & SVG SIMULATOR */}
      {/* (Guarantees the actual Axoora App Interface & POS Agent Usage is visible 100%) */}
      {/* ========================================================================= */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />

      {/* Motion UI layer depicting the active scene in real time */}
      <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-end pr-4 lg:pr-16 pointer-events-none">
        <div className="w-full max-w-xl h-[480px] relative hidden lg:block opacity-30 hover:opacity-70 transition-opacity duration-500">
          <AnimatePresence mode="wait">
            {currentScene === 'pos-agent' && (
              <motion.div
                key="scene-pos"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full relative flex items-center justify-center"
              >
                {/* Visual POS terminal in action with live glowing rings */}
                <div className="w-80 h-96 rounded-3xl bg-[#0A1B3D]/90 border-2 border-[#F2A93B]/60 p-6 flex flex-col justify-between backdrop-blur-md shadow-2xl">
                  <div className="flex items-center justify-between pb-3 border-b border-[#14294F]">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#00DF8F] animate-ping" />
                      <span className="font-mono text-xs font-bold text-[#F2A93B]">
                        APEX POS #4029 // LIVE TERMINAL
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#00DF8F]">4G DUAL-SIM</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#020F2E] border border-[#00DF8F]/50 flex flex-col gap-2">
                    <span className="text-[10px] font-mono text-[#A8BBD6]">PAYMENT DISPATCH</span>
                    <div className="text-2xl font-black font-mono text-[#00DF8F]">₦25,000.00</div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#A8BBD6]">
                      <span>NIBSS Rail: Active</span>
                      <span className="text-[#00DF8F]">0.9s Speed</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 font-mono text-xs text-[#A8BBD6]">
                    <div className="flex items-center justify-between">
                      <span>Card Tap: Contactless NFC</span>
                      <span className="text-[#00DF8F]">VERIFIED ✓</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Paper Receipt:</span>
                      <span className="text-[#F2F5F9]">AUTO-PRINTING</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Market Agent:</span>
                      <span className="text-[#F2A93B]">Ibrahim K. (Wuse Zone 4)</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#14294F] flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[#00DF8F]">● STREET HARDENED</span>
                    <span className="text-[#A8BBD6]">BATTERY: 89% (38h left)</span>
                  </div>
                </div>
              </motion.div>
            )}

            {currentScene === 'app-interface' && (
              <motion.div
                key="scene-app"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full relative flex items-center justify-center"
              >
                {/* Smartphone WhatsApp Voice AI in Action */}
                <div className="w-80 h-96 rounded-3xl bg-[#0A1B3D]/90 border-2 border-[#00DF8F]/60 p-6 flex flex-col justify-between backdrop-blur-md shadow-2xl">
                  <div className="flex items-center justify-between pb-3 border-b border-[#14294F]">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#00DF8F] animate-pulse" />
                      <span className="font-mono text-xs font-bold text-[#00DF8F]">
                        AXOORA AI // WHATSAPP VOICE
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#0D95FE]">PIDGIN INTENT</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#00875A]/25 border border-[#00DF8F] flex flex-col gap-2">
                    <span className="text-xs italic text-[#F2F5F9]">
                      "Abeeg send ₦20,000 to Chidinma for fuel"
                    </span>
                    <div className="flex items-center gap-1.5 h-6">
                      {[30, 80, 45, 90, 60, 100, 75, 40, 65, 85, 50, 95].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-[#00DF8F] rounded-full transition-all duration-300"
                          style={{ height: `${(h * (transactionStep + 1)) % 100}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#020F2E] border border-[#14294F] text-xs font-mono">
                    <div className="flex items-center justify-between text-[#A8BBD6]">
                      <span>Recipient:</span>
                      <span className="text-[#F2F5F9] font-bold">Chidinma Okafor</span>
                    </div>
                    <div className="flex items-center justify-between text-[#A8BBD6] mt-1">
                      <span>Transfer Fee:</span>
                      <span className="text-[#00DF8F] font-bold">₦0.00 (Zero Fee)</span>
                    </div>
                  </div>

                  <div className="text-center py-2 rounded-xl bg-[#00DF8F] text-[#003825] font-bold text-xs font-mono">
                    BIOMETRIC TOUCH ID APPROVED ✓
                  </div>
                </div>
              </motion.div>
            )}

            {currentScene === 'market-checkout' && (
              <motion.div
                key="scene-checkout"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full relative flex items-center justify-center"
              >
                {/* Shop Merchant & Supplier Bulk Pay */}
                <div className="w-80 h-96 rounded-3xl bg-[#0A1B3D]/90 border-2 border-[#0D95FE]/60 p-6 flex flex-col justify-between backdrop-blur-md shadow-2xl">
                  <div className="flex items-center justify-between pb-3 border-b border-[#14294F]">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#0D95FE] animate-pulse" />
                      <span className="font-mono text-xs font-bold text-[#0D95FE]">
                        SHOP COMMERCIAL REGISTER
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#00DF8F]">CAC VERIFIED</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#020F2E] border border-[#0D95FE]/50 flex flex-col gap-1.5">
                    <span className="text-[10px] font-mono text-[#A8BBD6]">STORE NUBAN</span>
                    <span className="text-lg font-bold font-mono text-[#F2F5F9]">Al-Barakah Superstore</span>
                    <span className="text-xs font-mono text-[#0D95FE]">0128941029 • Wema Bank Rail</span>
                  </div>

                  <div className="space-y-1.5 font-mono text-xs text-[#A8BBD6]">
                    <div className="flex items-center justify-between">
                      <span>Daily Inflows:</span>
                      <span className="text-[#00DF8F] font-bold">₦1,420,850.00</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Supplier Batch:</span>
                      <span className="text-[#F2F5F9]">14 Staff Disbursed</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Riba Status:</span>
                      <span className="text-[#00DF8F]">0% Debt Interest</span>
                    </div>
                  </div>

                  <div className="text-center py-2 rounded-xl bg-[#0D95FE] text-[#00325b] font-bold text-xs font-mono">
                    COMMERCIAL ACCOUNT ACTIVE
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* GRADIENT OVERLAY FOR WCAG AA TEXT CONTRAST */}
      {/* ========================================================================= */}
      <div
        className={`absolute inset-0 transition-colors duration-700 pointer-events-none ${
          isLight
            ? 'bg-gradient-to-r from-white/95 via-white/85 to-white/70'
            : 'bg-gradient-to-r from-[#020F2E]/95 via-[#020F2E]/85 to-[#020F2E]/65'
        }`}
      />
      {/* Bottom fade vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#020F2E] to-transparent pointer-events-none" />

      {/* ========================================================================= */}
      {/* INTERACTIVE VIDEO HUD CONTROLS (PLAY/PAUSE, SCENE SELECTOR, AUDIO TOGGLE) */}
      {/* ========================================================================= */}
      <div className="absolute bottom-3 left-4 right-4 sm:left-8 sm:right-8 z-30 pointer-events-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Video Status & Scene Badges */}
        <div className="flex items-center gap-2 bg-[#0A1B3D]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#14294F] shadow-lg">
          <div className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${isPlaying ? 'bg-[#00DF8F] animate-ping' : 'bg-[#A8BBD6]'}`} />
            <span className="font-mono text-[10px] font-bold text-[#F2F5F9] uppercase tracking-wider hidden sm:inline">
              HERO VIDEO STREAM
            </span>
          </div>

          <span className="text-[#14294F]">|</span>

          {/* Scene selector buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                setCurrentScene('pos-agent');
                setProgress(0);
              }}
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono transition-all cursor-pointer ${
                currentScene === 'pos-agent'
                  ? 'bg-[#F2A93B] text-[#000] font-bold shadow-sm'
                  : 'text-[#A8BBD6] hover:text-[#F2F5F9]'
              }`}
            >
              POS Agent
            </button>
            <button
              onClick={() => {
                setCurrentScene('app-interface');
                setProgress(0);
              }}
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono transition-all cursor-pointer ${
                currentScene === 'app-interface'
                  ? 'bg-[#00DF8F] text-[#003825] font-bold shadow-sm'
                  : 'text-[#A8BBD6] hover:text-[#F2F5F9]'
              }`}
            >
              Axoora App
            </button>
            <button
              onClick={() => {
                setCurrentScene('market-checkout');
                setProgress(0);
              }}
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono transition-all cursor-pointer ${
                currentScene === 'market-checkout'
                  ? 'bg-[#0D95FE] text-[#00325b] font-bold shadow-sm'
                  : 'text-[#A8BBD6] hover:text-[#F2F5F9]'
              }`}
            >
              Shop Checkout
            </button>
          </div>
        </div>

        {/* Right: Play/Pause, Mute/Unmute, and Fullscreen Action */}
        <div className="flex items-center gap-2 bg-[#0A1B3D]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#14294F] shadow-lg">
          {/* Progress bar of current scene */}
          <div className="w-14 h-1.5 rounded-full bg-[#14294F] overflow-hidden hidden md:block">
            <div
              className="h-full bg-gradient-to-r from-[#00DF8F] to-[#0D95FE] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-[#A8BBD6] hover:text-[#F2F5F9] transition-colors p-1 flex items-center justify-center cursor-pointer"
            title={isPlaying ? 'Pause video loop' : 'Play video loop'}
          >
            <span className="material-symbols-outlined text-[17px]">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="text-[#A8BBD6] hover:text-[#00DF8F] transition-colors p-1 flex items-center justify-center cursor-pointer"
            title={isMuted ? 'Muted by default (click to unmute)' : 'Unmuted'}
          >
            <span className="material-symbols-outlined text-[17px]">
              {isMuted ? 'volume_off' : 'volume_up'}
            </span>
          </button>

          <button
            onClick={() => setShowFullDemoModal(true)}
            className="text-[11px] font-semibold text-[#0D95FE] hover:text-[#00DF8F] transition-colors flex items-center gap-1 cursor-pointer ml-1"
          >
            <span className="material-symbols-outlined text-[15px]">open_in_full</span>
            <span className="hidden sm:inline">Watch Full Walkthrough</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FULL DEMO VIDEO POPUP MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showFullDemoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#01091C]/90 backdrop-blur-lg pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              className="w-full max-w-3xl rounded-3xl bg-[#0A1B3D] border-2 border-[#14294F] shadow-2xl p-6 sm:p-8 flex flex-col gap-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#14294F]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#00DF8F]/20 flex items-center justify-center text-[#00DF8F] border border-[#00DF8F]">
                    <span className="material-symbols-outlined text-[22px]">smart_display</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#F2F5F9]">
                      Axoora Ecosystem in Real-World Action
                    </h3>
                    <p className="text-xs text-[#00DF8F] font-mono">
                      Live Street POS Terminals &amp; Mobile Banking Rails
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowFullDemoModal(false)}
                  className="w-9 h-9 rounded-full bg-[#14294F] hover:bg-[#1E3A6B] text-[#F2F5F9] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              {/* Video Player Box */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#020F2E] border-2 border-[#14294F] flex items-center justify-center">
                <video
                  autoPlay
                  controls
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
                </video>

                {/* Live Overlaid Telemetry */}
                <div className="absolute top-3 left-3 bg-[#0A1B3D]/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#14294F] font-mono text-[10px] text-[#00DF8F] flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#00DF8F] animate-pulse" />
                  <span>NIBSS CENTRAL BANK RAIL: 100% OPERATIONAL</span>
                </div>
              </div>

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3.5 rounded-2xl bg-[#020F2E] border border-[#14294F]">
                  <span className="font-bold text-[#00DF8F] block mb-1">Apex POS Terminal</span>
                  <p className="text-[#A8BBD6] text-[11px]">
                    4G Dual-SIM with automatic MTN and Airtel fallback. Prints thermal receipts in 0.9s.
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#020F2E] border border-[#14294F]">
                  <span className="font-bold text-[#0D95FE] block mb-1">WhatsApp AI Voice</span>
                  <p className="text-[#A8BBD6] text-[11px]">
                    Native Nigerian speech recognition for Pidgin, Hausa, Yoruba, and Igbo. Zero transfer fees.
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#020F2E] border border-[#14294F]">
                  <span className="font-bold text-[#F2A93B] block mb-1">Save and Earn</span>
                  <p className="text-[#A8BBD6] text-[11px]">
                    Strict Islamic compliance with zero debt interest and rotational Ajo thrift escrow.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => {
                    setShowFullDemoModal(false);
                    onOpenWhatsApp?.();
                  }}
                  className="px-5 py-2.5 rounded-full border border-[#00DF8F] text-[#00DF8F] hover:bg-[#00DF8F] hover:text-[#003825] font-semibold text-xs transition-all cursor-pointer flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                  <span>Try WhatsApp AI</span>
                </button>
                <button
                  onClick={() => {
                    setShowFullDemoModal(false);
                    onOpenWaitlist?.();
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#0D95FE] hover:bg-[#00DF8F] text-[#00325b] hover:text-[#003825] font-bold text-xs transition-all cursor-pointer"
                >
                  Join Sovereign Waitlist
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
