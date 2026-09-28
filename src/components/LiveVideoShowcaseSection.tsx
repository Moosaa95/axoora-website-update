'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMPANY_INFO } from '../data/mockData';

interface LiveVideoShowcaseSectionProps {
  isLight?: boolean;
  onOpenWaitlist?: () => void;
  onOpenWhatsApp?: () => void;
}

type VideoSceneId = 'pos-street' | 'whatsapp-voice' | 'shop-settlement';

interface SceneInfo {
  id: VideoSceneId;
  title: string;
  tag: string;
  location: string;
  quote: string;
  videoSrc: string;
  timestamp: string;
  stats: { label: string; value: string };
  badgeColor: string;
}

const SCENES: SceneInfo[] = [
  {
    id: 'pos-street',
    title: 'Apex POS Terminal at Wuse Market',
    tag: 'AGENCY BANKING',
    location: 'Wuse Market · Zone 4, Abuja',
    quote:
      'Watch how dual-active eSIM flips between MTN and Airtel during peak market hours without dropping a single transfer.',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    timestamp: '0:45 Field Cut',
    stats: { label: 'Settlement Latency', value: '0.9s NIBSS' },
    badgeColor: '#00DF8F',
  },
  {
    id: 'whatsapp-voice',
    title: 'Adaeze Using Voice AI on WhatsApp',
    tag: 'PERSONAL BANKING',
    location: 'Maitama Commercial District, Abuja',
    quote:
      'Natural speech recognition understands Nigerian English, Pidgin, and local dialects to send money and check balances instantly.',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    timestamp: '1:12 Audio Demo',
    stats: { label: 'Transfer Fee', value: '₦0.00 Free' },
    badgeColor: '#0D95FE',
  },
  {
    id: 'shop-settlement',
    title: 'Wholesale Merchant Batch Settlement',
    tag: 'COMMERCIAL SHOP',
    location: 'Dawanau Grain Market, Kano',
    quote:
      'Disbursing supplier invoices and collecting shop receipts with dedicated NUBANs and zero debt interest.',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    timestamp: '0:58 Merchant Tour',
    stats: { label: 'Riba / Usury', value: '0% Interest-Free' },
    badgeColor: '#F2A93B',
  },
];

export const LiveVideoShowcaseSection: React.FC<LiveVideoShowcaseSectionProps> = ({
  isLight = false,
  onOpenWaitlist,
  onOpenWhatsApp,
}) => {
  const [activeSceneId, setActiveSceneId] = useState<VideoSceneId>('pos-street');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentScene = SCENES.find((s) => s.id === activeSceneId) || SCENES[0];

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {
          // Handled gracefully if browser policy blocks autoplay
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, activeSceneId]);

  return (
    <section
      id="live-video-showcase"
      className="relative w-full px-4 sm:px-6 lg:px-8 py-16 lg:py-24 border-b border-[#14294F] bg-[#020F2E] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[350px] bg-[#0D95FE]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[300px] bg-[#00DF8F]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#14294F]">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00DF8F]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00DF8F] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00DF8F]" />
              </span>
              <span className="font-semibold uppercase tracking-wider">
                LIVE VIDEO // REAL-WORLD COMMERCE IN ACTION
              </span>
              <span aria-hidden="true" className="text-[#14294F]">·</span>
              <span className="text-[#A8BBD6]">Unedited Street Footage</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F2F5F9] tracking-tight">
              See Axoora live on the street.
            </h2>

            <p className="text-base sm:text-lg text-[#A8BBD6] leading-relaxed">
              Watch how market traders, POS operators, and everyday customers move money, settle sales, and bank over WhatsApp with sub-3-second reliability.
            </p>
          </div>

          {/* Scene Selector Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#0A1B3D] border border-[#14294F] rounded-2xl self-start md:self-auto">
            {SCENES.map((scene) => {
              const isActive = scene.id === activeSceneId;
              return (
                <button
                  key={scene.id}
                  onClick={() => {
                    setActiveSceneId(scene.id);
                    setIsPlaying(true);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#14294F] text-[#F2F5F9] font-bold border border-[#0D95FE]/40 shadow-md'
                      : 'text-[#A8BBD6] hover:text-[#F2F5F9] hover:bg-[#14294F]/40'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: scene.badgeColor }}
                  />
                  <span>{scene.tag}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Primary Video Showcase Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main 16:9 Video Player (Takes 8 columns) */}
          <div className="lg:col-span-8 relative rounded-3xl overflow-hidden bg-black border-2 border-[#14294F] shadow-2xl group">
            {/* The Video Element */}
            <div className="relative aspect-video w-full bg-[#020F2E]">
              <video
                ref={videoRef}
                key={currentScene.videoSrc}
                src={currentScene.videoSrc}
                autoPlay
                muted={isMuted}
                loop
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Top Video Telemetry Overlay */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono pointer-events-none z-20">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#020F2E]/85 backdrop-blur-md border border-[#00DF8F]/50 text-[#00DF8F] shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-[#00DF8F] animate-ping" />
                  <span className="font-bold">LIVE // NIBSS RAIL 0.9s</span>
                </div>

                <div className="px-3 py-1.5 rounded-full bg-[#020F2E]/85 backdrop-blur-md border border-[#14294F] text-[#F2F5F9] font-medium shadow-lg">
                  {currentScene.location}
                </div>
              </div>

              {/* Bottom Video Controls Overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between gap-3 pointer-events-auto">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-10 h-10 rounded-full bg-[#020F2E]/90 hover:bg-[#0D95FE] text-[#F2F5F9] hover:text-[#00325b] border border-[#14294F] hover:border-[#0D95FE] flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
                    title={isPlaying ? 'Pause video' : 'Play video'}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {isPlaying ? 'pause' : 'play_arrow'}
                    </span>
                  </button>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="w-10 h-10 rounded-full bg-[#020F2E]/90 hover:bg-[#00DF8F] text-[#F2F5F9] hover:text-[#003825] border border-[#14294F] hover:border-[#00DF8F] flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
                    title={isMuted ? 'Unmute video audio' : 'Mute video audio'}
                  >
                    <span className="material-symbols-outlined text-[19px]">
                      {isMuted ? 'volume_off' : 'volume_up'}
                    </span>
                  </button>

                  <span className="text-[11px] font-mono text-[#A8BBD6] bg-[#020F2E]/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#14294F] hidden sm:inline">
                    {isMuted ? 'Click speaker to hear live audio' : 'Audio active'}
                  </span>
                </div>

                <button
                  onClick={() => setIsFullscreenOpen(true)}
                  className="px-3.5 py-2 rounded-full bg-[#020F2E]/90 hover:bg-[#14294F] text-xs font-semibold text-[#0D95FE] hover:text-[#00DF8F] border border-[#14294F] flex items-center gap-1.5 transition-colors cursor-pointer shadow-lg"
                >
                  <span className="material-symbols-outlined text-[16px]">open_in_full</span>
                  <span className="hidden sm:inline">Fullscreen Mode</span>
                </button>
              </div>

              {/* Gradient Vignette for UI readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
            </div>
          </div>

          {/* Right Commentary & Live Proof Card (Takes 4 columns) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <div className="p-6 sm:p-7 rounded-3xl bg-[#0A1B3D] border-2 border-[#14294F] flex flex-col justify-between gap-6 shadow-xl">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md"
                    style={{
                      backgroundColor: `${currentScene.badgeColor}20`,
                      color: currentScene.badgeColor,
                    }}
                  >
                    {currentScene.tag}
                  </span>
                  <span className="text-xs font-mono text-[#A8BBD6]">
                    {currentScene.timestamp}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#F2F5F9] tracking-tight">
                  {currentScene.title}
                </h3>

                <p className="text-sm text-[#A8BBD6] leading-relaxed">
                  {currentScene.quote}
                </p>
              </div>

              {/* Live Metric Tile */}
              <div className="p-4 rounded-2xl bg-[#020F2E] border border-[#14294F] flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-[#A8BBD6] block">
                    {currentScene.stats.label}
                  </span>
                  <span className="text-xl font-extrabold font-mono text-[#00DF8F]">
                    {currentScene.stats.value}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#00DF8F]/15 text-[#00DF8F] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">
                    verified
                  </span>
                </div>
              </div>

              {/* Interactive Action Links */}
              <div className="flex flex-col gap-2 pt-2 border-t border-[#14294F]">
                <button
                  onClick={onOpenWhatsApp}
                  className="w-full py-3 px-4 rounded-xl bg-[#00DF8F] hover:bg-[#0D95FE] text-[#003825] hover:text-[#00325b] font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>Try It on WhatsApp Now</span>
                </button>

                <button
                  onClick={onOpenWaitlist}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#020F2E] hover:bg-[#14294F] text-[#F2F5F9] font-semibold text-xs border border-[#14294F] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Request Device / Account Access</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Video Modal */}
      <AnimatePresence>
        {isFullscreenOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-5xl rounded-3xl bg-[#0A1B3D] border-2 border-[#14294F] overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Top Bar */}
              <div className="p-4 sm:p-5 border-b border-[#14294F] flex items-center justify-between bg-[#020F2E]">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00DF8F] animate-pulse" />
                  <div>
                    <h4 className="text-base font-bold text-[#F2F5F9]">
                      {currentScene.title}
                    </h4>
                    <p className="text-xs font-mono text-[#00DF8F]">
                      {currentScene.location}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsFullscreenOpen(false)}
                  className="w-9 h-9 rounded-full bg-[#14294F] hover:bg-[#1E3A6B] text-[#F2F5F9] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              {/* Theater Video Frame */}
              <div className="relative aspect-video w-full bg-black">
                <video
                  src={currentScene.videoSrc}
                  autoPlay
                  controls
                  loop
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
