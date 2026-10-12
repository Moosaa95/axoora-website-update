import React, { useState, useEffect } from 'react';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('axoora_cookie_dismissed');
    if (dismissed) return;

    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsVisible(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('axoora_cookie_dismissed', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm p-4 rounded-2xl bg-[#0A1B3D] border border-[#14294F] shadow-2xl text-xs text-[#F2F5F9] flex flex-col gap-2.5 backdrop-blur-md">
      <div className="flex items-center justify-between font-semibold">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00DF8F]" />
          <span>Privacy &amp; Security</span>
        </div>
        <button
          onClick={handleDismiss}
          className="text-[#A8BBD6] hover:text-[#F2F5F9] p-0.5 cursor-pointer"
        >
          ✕
        </button>
      </div>
      <p className="text-[#A8BBD6] leading-relaxed">
        Axoora uses encrypted session cookies to keep your authentication and banking sessions secure. Zero third-party ad tracking.
      </p>
      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={handleDismiss}
          className="px-3.5 py-1.5 rounded-xl bg-[#0D95FE] hover:bg-[#00DF8F] text-[#002447] text-xs font-bold transition-colors cursor-pointer"
        >
          Accept
        </button>
        <button
          onClick={handleDismiss}
          className="px-3.5 py-1.5 rounded-xl bg-[#14294F] hover:bg-[#1E3A6B] text-[#A8BBD6] hover:text-[#F2F5F9] text-xs font-medium transition-colors cursor-pointer"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};
