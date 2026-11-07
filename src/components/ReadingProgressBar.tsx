'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ScreenType } from '../types';

interface ReadingProgressBarProps {
  currentScreen: ScreenType;
}

export const ReadingProgressBar: React.FC<ReadingProgressBarProps> = ({ currentScreen }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001,
  });

  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentScreen]);

  // Accent gradient tailored dynamically or institutional electric cyan/emerald
  const getGradient = () => {
    switch (currentScreen) {
      case 'personal':
        return 'from-[#00DF8F] via-[#0D95FE] to-[#00DF8F]';
      case 'business':
        return 'from-[#0D95FE] via-[#00DF8F] to-[#0D95FE]';
      case 'pos-agents':
        return 'from-[#F2A93B] via-[#0D95FE] to-[#F2A93B]';
      case 'about':
      case 'impact':
      case 'stories':
      case 'journal':
      case 'press':
      case 'careers':
      case 'events':
      case 'help':
      default:
        return 'from-[#00DF8F] via-[#0D95FE] to-[#F2A93B]';
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 h-[3px] z-[9999] pointer-events-none transition-opacity duration-300 ${
        hasScrolled ? 'opacity-100' : 'opacity-0'
      }`}
      role="progressbar"
      aria-label="Page scroll progress"
    >
      {/* Background track for subtle depth */}
      <div className="absolute inset-0 bg-[#14294F]/40" />

      {/* Active Fill Bar */}
      <motion.div
        className={`h-full w-full origin-left bg-gradient-to-r ${getGradient()} shadow-[0_0_8px_rgba(13,149,254,0.6)]`}
        style={{ scaleX }}
      />
    </div>
  );
};
