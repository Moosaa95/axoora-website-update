'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScreenType } from '../types';

interface CookieBannerProps {
  onNavigate?: (screen: ScreenType) => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('axoora_cookie_dismissed');
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('axoora_cookie_dismissed', 'accepted_all');
    setIsVisible(false);
  };

  const handleNecessaryOnly = () => {
    localStorage.setItem('axoora_cookie_dismissed', 'necessary_only');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="w-full bg-[#05112A] border-b border-[#14294F] text-xs text-[#A8BBD6] py-3 px-4 sm:px-6 relative z-50 shadow-md"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2.5 text-center md:text-left">
              <span className="material-symbols-outlined text-[18px] text-[#00DF8F] shrink-0 hidden sm:inline">
                cookie
              </span>
              <p className="leading-relaxed">
                We use cookies to give you the most secure and reliable banking experience on our platform.
                Learn more in our{' '}
                <button
                  onClick={() => onNavigate?.('legal')}
                  className="text-white hover:text-[#0D95FE] underline font-semibold transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>{' '}
                and{' '}
                <button
                  onClick={() => onNavigate?.('legal')}
                  className="text-white hover:text-[#0D95FE] underline font-semibold transition-colors cursor-pointer"
                >
                  Cookie Policy
                </button>
                .
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={handleNecessaryOnly}
                className="px-3.5 py-1.5 rounded-full bg-[#0A1B3D] hover:bg-[#14294F] text-[#A8BBD6] hover:text-white border border-[#14294F] font-medium text-xs transition-colors cursor-pointer"
              >
                Necessary Only
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-1.5 rounded-full bg-[#0D95FE] hover:bg-[#00DF8F] text-[#00284D] hover:text-[#003825] font-bold text-xs transition-all shadow-sm cursor-pointer"
              >
                Accept All Cookies
              </button>
              <button
                onClick={handleNecessaryOnly}
                className="text-[#7B9CD2] hover:text-white p-1 rounded-md hover:bg-[#14294F] transition-colors cursor-pointer"
                aria-label="Dismiss cookie notice"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
