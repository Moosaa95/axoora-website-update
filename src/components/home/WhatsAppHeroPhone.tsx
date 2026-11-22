'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MoreVertical, CheckCheck } from 'lucide-react';
import { PhoneFrame, PhoneStatusBar } from './shared';

export const WhatsAppHeroPhone: React.FC = () => {
  const [step, setStep] = useState(0);

  // Progressive chat bubble sequence (matching Figma media_1795345313397_7eebf866.png)
  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 5);
    }, 2800);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative select-none flex items-center justify-center">
      <PhoneFrame width={320} height={590} className="shadow-[0_25px_60px_rgba(2,15,46,0.35)]">
        <div className="h-full flex flex-col justify-between bg-[#efeae2] relative overflow-hidden font-sans">
          {/* Top Status Bar */}
          <div className="px-[14px] bg-[#075e54] text-white shrink-0">
            <PhoneStatusBar />
          </div>

          {/* WhatsApp Green App Bar */}
          <div className="px-3 py-2 bg-[#075e54] text-white flex items-center justify-between shadow-xs z-10 shrink-0">
            <div className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 cursor-pointer" />
              <div className="w-8 h-8 rounded-full bg-white text-[#043e97] flex items-center justify-center font-bold text-[13px] shadow-xs">
                A
              </div>
              <div className="leading-tight">
                <div className="text-[13px] font-bold">Axoora</div>
                <div className="text-[9px] text-[#b2dcd2]">Business account</div>
              </div>
            </div>
            <MoreVertical className="w-4 h-4 text-white/80 cursor-pointer" />
          </div>

          {/* Chat Messages Canvas */}
          <div className="flex-1 p-3 flex flex-col justify-end gap-2 overflow-y-auto">
            {/* Date Pill */}
            <div className="self-center">
              <span className="px-2.5 py-0.5 rounded-full bg-white/90 text-[8.5px] font-bold text-[#54656f] uppercase tracking-wider shadow-2xs">
                TODAY
              </span>
            </div>

            {/* Bubble 1: Bot initial greeting */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="self-start max-w-[85%] bg-white text-[#111b21] p-2.5 rounded-[12px] rounded-tl-none text-[10.5px] shadow-2xs leading-relaxed"
            >
              <div>Hi Adaeze. What do you want to do?</div>
              <div className="text-[8px] text-[#667781] text-right mt-1">14:06</div>
            </motion.div>

            {/* Bubble 2: User "Send 25k to Chidinma" */}
            <AnimatePresence>
              {step >= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className="self-end max-w-[80%] bg-[#d9fdd3] text-[#111b21] p-2.5 rounded-[12px] rounded-tr-none text-[10.5px] shadow-2xs"
                >
                  <div>Send 25k to Chidinma</div>
                  <div className="flex items-center justify-end gap-1 text-[8px] text-[#667781] mt-1">
                    <span>14:07</span>
                    <CheckCheck className="w-3 h-3 text-[#53bdeb]" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bubble 3: Bot transfer confirmation */}
            <AnimatePresence>
              {step >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className="self-start max-w-[90%] bg-white text-[#111b21] p-2.5 rounded-[12px] rounded-tl-none text-[10.5px] shadow-2xs border border-[#edf2f7]"
                >
                  <div className="font-bold text-[#111b21] text-[11px]">CHIDINMA OKAFOR</div>
                  <div className="text-[9.5px] text-[#667781]">GTBank · 0123456789</div>
                  <div className="text-[10.5px] font-semibold text-[#043e97] mt-1">
                    ₦25,000.00 · fee ₦10.00
                  </div>
                  <div className="text-[9.5px] font-medium text-[#111b21] mt-1">
                    Reply YES to send.
                  </div>
                  <div className="text-[8px] text-[#667781] text-right mt-1">14:07</div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bubble 4: User "YES" */}
            <AnimatePresence>
              {step >= 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className="self-end bg-[#d9fdd3] text-[#111b21] px-3.5 py-1.5 rounded-[12px] rounded-tr-none text-[10.5px] font-bold shadow-2xs"
                >
                  <div>YES</div>
                  <div className="flex items-center justify-end gap-1 text-[8px] text-[#667781] mt-0.5">
                    <span>14:08</span>
                    <CheckCheck className="w-3 h-3 text-[#53bdeb]" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bubble 5: Bot final confirmation */}
            <AnimatePresence>
              {step >= 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className="self-start max-w-[92%] bg-white text-[#111b21] p-2.5 rounded-[12px] rounded-tl-none text-[10px] shadow-2xs border-l-4 border-[#25d366]"
                >
                  <div className="font-semibold">
                    Done. ₦25,000.00 sent to CHIDINMA OKAFOR.
                  </div>
                  <div className="text-[9px] text-[#0976da] font-medium mt-0.5">
                    Balance now ₦87,420.00
                  </div>
                  <div className="text-[8px] text-[#667781] text-right mt-1">14:08</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Fake WhatsApp Message Input Bar */}
          <div className="p-2 bg-[#f0f2f5] flex items-center gap-2 shrink-0">
            <div className="flex-1 bg-white rounded-full px-3 py-1.5 text-[10px] text-[#8696a0] shadow-2xs">
              Message
            </div>
            <div className="w-7 h-7 rounded-full bg-[#00a884] text-white flex items-center justify-center font-bold text-[11px] shadow-xs">
              ➤
            </div>
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
};

