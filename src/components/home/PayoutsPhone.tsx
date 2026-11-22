'use client';

import React, { useState } from 'react';
import { ArrowLeft, Search, Send, Landmark, Calendar, Pin } from 'lucide-react';
import { PhoneFrame, PhoneStatusBar } from './shared';

export const PayoutsPhone: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'recents' | 'beneficiaries' | 'contacts'>('recents');

  return (
    <PhoneFrame width={315} height={530} radius={44} className="shadow-[0_25px_60px_rgba(2,15,46,0.35)]">
      <div className="h-full flex flex-col justify-between p-4.5 bg-white text-[#161c22] select-none font-sans overflow-hidden">
        <div>
          {/* Top Status Bar */}
          <PhoneStatusBar />

          {/* Nav Header: Back Arrow + Send Money */}
          <div className="flex items-center gap-2.5 mt-2 pb-1">
            <ArrowLeft className="w-4 h-4 text-[#161c22] cursor-pointer" />
            <h4 className="text-[14px] font-bold text-[#161c22]">Send Money</h4>
          </div>

          {/* Search Pill Input */}
          <div className="mt-2.5 relative">
            <Search className="w-3.5 h-3.5 text-[#8492a6] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              readOnly
              placeholder="Account Number or Phone"
              className="w-full bg-[#f4f7fa] text-[11px] text-[#161c22] placeholder:text-[#8492a6] pl-8 pr-3 py-2 rounded-full border border-transparent focus:outline-none cursor-default"
            />
          </div>

          {/* Where Is It Going? Section */}
          <div className="mt-4">
            <span className="text-[11px] font-bold text-[#161c22] block mb-2.5">
              Where Is It Going?
            </span>

            <div className="grid grid-cols-3 gap-2">
              {/* Axoora */}
              <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
                <div className="w-11 h-11 rounded-full bg-[#f0f4f9] group-hover:bg-[#e4edf8] text-[#161c22] flex items-center justify-center transition">
                  <Send className="w-4 h-4 text-[#161c22]" />
                </div>
                <span className="text-[10px] font-medium text-[#4c5866]">Axoora</span>
              </div>

              {/* Bank */}
              <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
                <div className="w-11 h-11 rounded-full bg-[#f0f4f9] group-hover:bg-[#e4edf8] text-[#161c22] flex items-center justify-center transition">
                  <Landmark className="w-4 h-4 text-[#161c22]" />
                </div>
                <span className="text-[10px] font-medium text-[#4c5866]">Bank</span>
              </div>

              {/* Schedule */}
              <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
                <div className="w-11 h-11 rounded-full bg-[#f0f4f9] group-hover:bg-[#e4edf8] text-[#161c22] flex items-center justify-center transition">
                  <Calendar className="w-4 h-4 text-[#161c22]" />
                </div>
                <span className="text-[10px] font-medium text-[#4c5866]">Schedule</span>
              </div>
            </div>
          </div>

          {/* Tabs: Recents, Beneficiaries, Contacts */}
          <div className="mt-5 flex items-center border-b border-[#edf1f7] text-[11px]">
            <button
              type="button"
              onClick={() => setActiveTab('recents')}
              className={`pb-2 mr-4 font-bold relative transition ${
                activeTab === 'recents' ? 'text-[#0976da]' : 'text-[#8492a6] hover:text-[#161c22]'
              }`}
            >
              Recents
              {activeTab === 'recents' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0976da] rounded-full" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('beneficiaries')}
              className={`pb-2 mr-4 font-medium relative transition ${
                activeTab === 'beneficiaries' ? 'text-[#0976da]' : 'text-[#8492a6] hover:text-[#161c22]'
              }`}
            >
              Beneficiaries
              {activeTab === 'beneficiaries' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0976da] rounded-full" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('contacts')}
              className={`pb-2 font-medium relative transition ${
                activeTab === 'contacts' ? 'text-[#0976da]' : 'text-[#8492a6] hover:text-[#161c22]'
              }`}
            >
              Contacts
              {activeTab === 'contacts' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0976da] rounded-full" />
              )}
            </button>
          </div>

          {/* Recents Recipient List */}
          <div className="mt-2.5 divide-y divide-[#edf1f7]">
            {/* Row 1: Chidinma Okafor */}
            <div className="py-2 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#043e97] text-white flex items-center justify-center text-[10.5px] font-bold shrink-0">
                  CO
                </div>
                <div>
                  <div className="text-[11.5px] font-bold text-[#161c22]">
                    Chidinma Okafor
                  </div>
                  <div className="text-[9.5px] text-[#8492a6]">Axoora</div>
                </div>
              </div>
              <Pin className="w-3.5 h-3.5 text-[#b45309] fill-[#b45309] rotate-45" />
            </div>

            {/* Row 2: Musa Okonkwo */}
            <div className="py-2 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#0f6b45] text-white flex items-center justify-center text-[10.5px] font-bold shrink-0">
                  MO
                </div>
                <div>
                  <div className="text-[11.5px] font-bold text-[#161c22]">
                    Musa Okonkwo
                  </div>
                  <div className="text-[9.5px] text-[#8492a6]">GTBank · 0123456789</div>
                </div>
              </div>
              <Pin className="w-3.5 h-3.5 text-[#b45309] fill-[#b45309] rotate-45" />
            </div>

            {/* Row 3: Ngozi Adeyemi */}
            <div className="py-2 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#b45309] text-white flex items-center justify-center text-[10.5px] font-bold shrink-0">
                  NA
                </div>
                <div>
                  <div className="text-[11.5px] font-bold text-[#161c22]">
                    Ngozi Adeyemi
                  </div>
                  <div className="text-[9.5px] text-[#8492a6]">Zenith · 1014882057</div>
                </div>
              </div>
            </div>

            {/* Row 4: Tunde Eze */}
            <div className="py-2 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#bd2735] text-white flex items-center justify-center text-[10.5px] font-bold shrink-0">
                  TE
                </div>
                <div>
                  <div className="text-[11.5px] font-bold text-[#161c22]">
                    Tunde Eze
                  </div>
                  <div className="text-[9.5px] text-[#8492a6]">Axoora</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom footer text */}
        <div className="text-center pt-2">
          <span className="text-[8.5px] text-[#8492a6]">
            Bulk & Single Payout Engine · Direct NIBSS Clearing
          </span>
        </div>
      </div>
    </PhoneFrame>
  );
};
