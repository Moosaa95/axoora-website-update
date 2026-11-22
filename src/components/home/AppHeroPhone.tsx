'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Plus,
  RefreshCw,
  Zap,
  Eye,
  EyeOff,
  Bell,
} from 'lucide-react';
import { PhoneFrame, PhoneStatusBar } from './shared';

export const AppHeroPhone: React.FC = () => {
  const [hideBalance, setHideBalance] = useState(false);
  const [activeTab, setActiveTab] = useState<'send' | 'add' | 'circles' | 'bills' | null>(null);

  return (
    <div className="relative select-none flex items-center justify-center">
      <PhoneFrame width={320} height={590} className="shadow-[0_25px_60px_rgba(2,15,46,0.35)]">
        <div className="h-full flex flex-col justify-between px-[14px] pt-1 pb-3 select-none bg-white text-[#161c22] relative overflow-hidden font-sans">
          {/* Top Status Bar */}
          <PhoneStatusBar />

          <div className="flex-1 flex flex-col justify-between pt-1">
            <div>
              {/* Header: User greeting + Tier badge + Bell */}
              <div className="flex items-center justify-between pt-1 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#043e97] text-white flex items-center justify-center font-bold text-[11px] shadow-xs">
                    AB
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[12.5px] font-bold text-[#161c22]">
                        Hi, Adaeze
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-[#f0f2f5] text-[8.5px] font-semibold text-[#6c7a89]">
                        Tier 3
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-7 h-7 rounded-full bg-[#f7f9fb] border border-[#edf1f7] flex items-center justify-center text-[#6c7a89] cursor-pointer hover:text-[#161c22] transition">
                  <Bell className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Main Balance Display */}
              <div className="mt-3 text-center">
                <div className="flex items-center justify-center gap-2">
                  <motion.div
                    key={hideBalance ? 'hidden' : 'visible'}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-[30px] font-extrabold text-[#161c22] tracking-tight leading-none"
                  >
                    {hideBalance ? '••••••••' : '₦112,430.00'}
                  </motion.div>
                  <button
                    type="button"
                    onClick={() => setHideBalance(!hideBalance)}
                    className="text-[#8492a6] hover:text-[#161c22] transition cursor-pointer"
                    aria-label="Toggle balance privacy"
                  >
                    {hideBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <span className="text-[9.5px] text-[#8492a6] block mt-1">Available</span>
              </div>

              {/* Quick Actions (4 circular buttons) */}
              <div className="grid grid-cols-4 gap-2 mt-4 px-1">
                {[
                  { id: 'send', label: 'Send', Icon: ArrowUpRight },
                  { id: 'add', label: 'Add Money', Icon: Plus },
                  { id: 'circles', label: 'Circles', Icon: RefreshCw },
                  { id: 'bills', label: 'Bills', Icon: Zap },
                ].map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveTab(id as any)}
                    className="flex flex-col items-center gap-1 group cursor-pointer focus:outline-none"
                  >
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center transition shadow-2xs ${
                        activeTab === id
                          ? 'bg-[#0976da] text-white scale-105'
                          : 'bg-[#f0f7ff] text-[#0976da] group-hover:bg-[#e2effc]'
                      }`}
                    >
                      <Icon className="w-4 h-4 stroke-[2]" />
                    </div>
                    <span className="text-[9.5px] font-medium text-[#4c5866]">{label}</span>
                  </button>
                ))}
              </div>

              {/* Recent Transactions List */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2 px-1">
                  <span className="text-[10px] font-bold text-[#161c22]">Recent</span>
                </div>

                <div className="bg-[#f7f9fb] rounded-xl p-2.5 border border-[#edf1f7] divide-y divide-[#edf1f7]">
                  {/* Row 1: Chidinma Okafor (Incoming) */}
                  <div className="py-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#043e97] text-white font-bold text-[9px] flex items-center justify-center shadow-2xs">
                        CO
                      </div>
                      <div>
                        <div className="text-[10.5px] font-bold text-[#161c22]">
                          Chidinma Okafor
                        </div>
                        <div className="text-[8.5px] text-[#6c7a89]">
                          Received · 14:08
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-[10.5px] text-[#0f6b45]">
                        + ₦ 25,000<span className="text-[8.5px] font-normal">.00</span>
                      </span>
                    </div>
                  </div>

                  {/* Row 2: Ikeja Electric (Outgoing) */}
                  <div className="py-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#ffefe5] text-[#d9822b] font-bold text-[9px] flex items-center justify-center border border-[#fed7aa]">
                        ie
                      </div>
                      <div>
                        <div className="text-[10.5px] font-bold text-[#161c22]">
                          Ikeja Electric
                        </div>
                        <div className="text-[8.5px] text-[#6c7a89]">
                          Sent · 09:20
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-[10.5px] text-[#161c22]">
                        - ₦ 8,500<span className="text-[8.5px] font-normal">.00</span>
                      </span>
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-[#0976da] text-center block mt-2 hover:underline cursor-pointer">
                  View All
                </span>
              </div>
            </div>

            {/* Bottom Safe Area */}
            <div className="w-[120px] h-1 bg-[#161c22]/20 rounded-full mx-auto mt-2" />
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
};
