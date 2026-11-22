'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Search } from 'lucide-react';
import { PhoneFrame, PhoneStatusBar } from './shared';

export const BusinessOverviewPhone: React.FC = () => {
  const [hideBalance, setHideBalance] = useState(false);

  return (
    <PhoneFrame width={315} height={530} radius={44} className="shadow-[0_25px_60px_rgba(2,15,46,0.35)]">
      <div className="h-full flex flex-col justify-between p-4.5 bg-white text-[#161c22] select-none font-sans overflow-hidden">
        <div>
          {/* Top Status Bar */}
          <PhoneStatusBar />

          {/* Balance Section */}
          <div className="mt-2">
            <div className="flex items-center gap-2">
              <span className="text-[26px] font-bold tracking-tight text-[#161c22]">
                {hideBalance ? (
                  '₦ ••••••••'
                ) : (
                  <>
                    <span className="text-[20px] font-semibold mr-0.5">₦</span>112,430<span className="text-[18px] text-[#4c5866] font-normal">.00</span>
                  </>
                )}
              </span>
              <button
                type="button"
                aria-label="Toggle balance visibility"
                onClick={() => setHideBalance(!hideBalance)}
                className="text-[#8492a6] hover:text-[#161c22] transition cursor-pointer p-0.5"
              >
                {hideBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
            <div className="text-[11px] text-[#6c7a89] font-medium mt-0.5">
              Current Balance
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-3.5 relative">
            <Search className="w-3.5 h-3.5 text-[#8492a6] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              readOnly
              placeholder="Search"
              className="w-full bg-[#f4f7fa] text-[11.5px] text-[#161c22] placeholder:text-[#8492a6] pl-8 pr-3 py-2 rounded-full border border-transparent focus:outline-none cursor-default"
            />
          </div>

          {/* Transactions List */}
          <div className="mt-4 space-y-4">
            {/* Section: Tomorrow */}
            <div>
              <div className="flex justify-between items-center text-[10.5px] font-bold pb-2 border-b border-[#edf1f7]">
                <span className="text-[#161c22]">Tomorrow</span>
                <span className="text-[#9a6000]">− ₦ 34,900 .00</span>
              </div>

              <div className="pt-2.5 space-y-3">
                {/* Item 1: Chidinma Okafor */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#043e97] text-white flex items-center justify-center text-[11px] font-bold shrink-0">
                      CO
                    </div>
                    <div>
                      <div className="text-[12px] font-bold text-[#161c22]">
                        Chidinma Okafor
                      </div>
                      <div className="text-[9.5px] text-[#8492a6]">
                        Scheduled · 08:00
                      </div>
                    </div>
                  </div>
                  <span className="text-[11.5px] font-bold text-[#9a6000]">
                    − ₦ 29,400 .00
                  </span>
                </div>

                {/* Item 2: DStv */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#0082c8] text-white flex items-center justify-center text-[9px] font-extrabold tracking-tight shrink-0">
                      DStv
                    </div>
                    <div>
                      <div className="text-[12px] font-bold text-[#161c22]">
                        DStv
                      </div>
                      <div className="text-[9.5px] text-[#8492a6]">
                        Subscription · 08:00
                      </div>
                    </div>
                  </div>
                  <span className="text-[11.5px] font-bold text-[#9a6000]">
                    − ₦ 5,500 .00
                  </span>
                </div>
              </div>
            </div>

            {/* Section: Today */}
            <div>
              <div className="flex justify-between items-center text-[10.5px] font-bold pb-2 border-b border-[#edf1f7]">
                <span className="text-[#161c22]">Today</span>
                <span className="text-[#0f6b45]">+ ₦ 25,000 .00</span>
              </div>

              <div className="pt-2.5 space-y-3">
                {/* Item 1: Chidinma Okafor */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#043e97] text-white flex items-center justify-center text-[11px] font-bold shrink-0">
                      CO
                    </div>
                    <div>
                      <div className="text-[12px] font-bold text-[#161c22]">
                        Chidinma Okafor
                      </div>
                      <div className="text-[9.5px] text-[#8492a6]">
                        14:08
                      </div>
                    </div>
                  </div>
                  <span className="text-[11.5px] font-bold text-[#0f6b45]">
                    + ₦ 25,000 .00
                  </span>
                </div>
              </div>
            </div>

            {/* Section: Yesterday */}
            <div>
              <div className="flex justify-between items-center text-[10.5px] font-bold pb-2 border-b border-[#edf1f7]">
                <span className="text-[#161c22]">Yesterday</span>
                <span className="text-[#6c7a89]">− ₦ 10,500 .00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom indicator */}
        <div className="text-center pt-2">
          <span className="text-[8.5px] text-[#8492a6]">
            Real-Time Commercial Operating Account · Axoora Business
          </span>
        </div>
      </div>
    </PhoneFrame>
  );
};
