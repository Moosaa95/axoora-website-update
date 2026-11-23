'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Search, Send, Landmark, Calendar, Pin, CheckCircle2, Check } from 'lucide-react';
import { PhoneFrame, PhoneStatusBar } from './shared';

export const PayoutsPhone: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'recents' | 'beneficiaries' | 'contacts'>('recents');
  const [selectedDestination, setSelectedDestination] = useState<'axoora' | 'bank' | 'schedule'>('bank');
  const [selectedRecipient, setSelectedRecipient] = useState<string | null>('co');
  const [searchPlaceholderIndex, setSearchPlaceholderIndex] = useState(0);

  const searchPlaceholders = [
    'Account Number or Phone',
    '0123456789 (GTBank)',
    'Chidinma Okafor',
    'Musa Okonkwo',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSearchPlaceholderIndex((prev) => (prev + 1) % searchPlaceholders.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const recentsList = [
    {
      id: 'co',
      name: 'Chidinma Okafor',
      bank: 'Axoora',
      initials: 'CO',
      color: '#043e97',
      pinned: true,
      amount: '₦45,000.00',
    },
    {
      id: 'mo',
      name: 'Musa Okonkwo',
      bank: 'GTBank · 0123456789',
      initials: 'MO',
      color: '#0f6b45',
      pinned: true,
      amount: '₦38,000.00',
    },
    {
      id: 'na',
      name: 'Ngozi Adeyemi',
      bank: 'Zenith · 1014882057',
      initials: 'NA',
      color: '#b45309',
      pinned: false,
      amount: '₦52,000.00',
    },
    {
      id: 'te',
      name: 'Tunde Eze',
      bank: 'Axoora',
      initials: 'TE',
      color: '#bd2735',
      pinned: false,
      amount: '₦18,000.00',
    },
  ];

  const beneficiariesList = [
    {
      id: 'fb',
      name: 'Fatima Bello',
      bank: 'UBA · 2233445566',
      initials: 'FB',
      color: '#0976da',
      pinned: true,
      amount: '₦41,000.00',
    },
    {
      id: 'co',
      name: 'Chidinma Okafor',
      bank: 'GTBank · 0123456789',
      initials: 'CO',
      color: '#043e97',
      pinned: true,
      amount: '₦45,000.00',
    },
    {
      id: 'em',
      name: 'Emeka Nwosu',
      bank: 'Access · 0987654321',
      initials: 'EN',
      color: '#0f6b45',
      pinned: false,
      amount: '₦60,000.00',
    },
  ];

  const currentList = activeTab === 'beneficiaries' ? beneficiariesList : recentsList;

  return (
    <motion.div
      animate={{ y: [0, -7, 0] }}
      transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
      className="relative will-change-transform"
    >
      {/* Ambient background glow */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-blue-400/20 via-sky-300/10 to-transparent rounded-[52px] blur-xl -z-10 pointer-events-none" />

      <PhoneFrame width={315} height={530} radius={44} className="shadow-[0_25px_60px_rgba(2,15,46,0.35)]">
        <div className="h-full flex flex-col justify-between p-4.5 bg-white text-[#161c22] select-none font-sans overflow-hidden">
          <div>
            {/* Top Status Bar */}
            <PhoneStatusBar />

            {/* Nav Header: Back Arrow + Send Money */}
            <div className="flex items-center justify-between mt-2 pb-1">
              <div className="flex items-center gap-2.5">
                <ArrowLeft className="w-4 h-4 text-[#161c22] cursor-pointer" />
                <h4 className="text-[14px] font-bold text-[#161c22]">Send Money</h4>
              </div>
              <span className="text-[9.5px] font-bold text-[#0976da] bg-[#e8f2fc] px-2 py-0.5 rounded-full">
                Batch Mode
              </span>
            </div>

            {/* Search Pill Input with animated rotating placeholder */}
            <div className="mt-2.5 relative">
              <Search className="w-3.5 h-3.5 text-[#8492a6] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <AnimatePresence mode="wait">
                <motion.input
                  key={searchPlaceholderIndex}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.25 }}
                  type="text"
                  readOnly
                  placeholder={searchPlaceholders[searchPlaceholderIndex]}
                  className="w-full bg-[#f4f7fa] text-[11px] text-[#161c22] placeholder:text-[#8492a6] pl-8 pr-3 py-2 rounded-full border border-transparent focus:outline-none cursor-default transition hover:bg-[#eef3f8]"
                />
              </AnimatePresence>
            </div>

            {/* Where Is It Going? Section */}
            <div className="mt-3.5">
              <span className="text-[11px] font-bold text-[#161c22] block mb-2">
                Where Is It Going?
              </span>

              <div className="grid grid-cols-3 gap-2">
                {/* Axoora */}
                <motion.button
                  whileHover={{ y: -2, scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setSelectedDestination('axoora')}
                  className={`flex flex-col items-center gap-1.5 p-1 rounded-xl transition cursor-pointer ${
                    selectedDestination === 'axoora' ? 'bg-[#eaf3fd]' : 'hover:bg-[#f4f7fa]'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center transition ${
                      selectedDestination === 'axoora'
                        ? 'bg-[#043e97] text-white shadow-xs'
                        : 'bg-[#f0f4f9] text-[#161c22]'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-medium text-[#4c5866]">Axoora</span>
                </motion.button>

                {/* Bank */}
                <motion.button
                  whileHover={{ y: -2, scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setSelectedDestination('bank')}
                  className={`flex flex-col items-center gap-1.5 p-1 rounded-xl transition cursor-pointer ${
                    selectedDestination === 'bank' ? 'bg-[#eaf3fd]' : 'hover:bg-[#f4f7fa]'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center transition ${
                      selectedDestination === 'bank'
                        ? 'bg-[#043e97] text-white shadow-xs'
                        : 'bg-[#f0f4f9] text-[#161c22]'
                    }`}
                  >
                    <Landmark className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-medium text-[#4c5866]">Bank</span>
                </motion.button>

                {/* Schedule */}
                <motion.button
                  whileHover={{ y: -2, scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setSelectedDestination('schedule')}
                  className={`flex flex-col items-center gap-1.5 p-1 rounded-xl transition cursor-pointer ${
                    selectedDestination === 'schedule' ? 'bg-[#eaf3fd]' : 'hover:bg-[#f4f7fa]'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center transition ${
                      selectedDestination === 'schedule'
                        ? 'bg-[#043e97] text-white shadow-xs'
                        : 'bg-[#f0f4f9] text-[#161c22]'
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-medium text-[#4c5866]">Schedule</span>
                </motion.button>
              </div>
            </div>

            {/* Tabs: Recents, Beneficiaries, Contacts */}
            <div className="mt-4 flex items-center border-b border-[#edf1f7] text-[11px] relative">
              <button
                type="button"
                onClick={() => setActiveTab('recents')}
                className={`pb-2 mr-4 font-bold relative transition cursor-pointer ${
                  activeTab === 'recents' ? 'text-[#0976da]' : 'text-[#8492a6] hover:text-[#161c22]'
                }`}
              >
                Recents
                {activeTab === 'recents' && (
                  <motion.div
                    layoutId="payoutActiveTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0976da] rounded-full"
                  />
                )}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('beneficiaries')}
                className={`pb-2 mr-4 font-medium relative transition cursor-pointer ${
                  activeTab === 'beneficiaries' ? 'text-[#0976da]' : 'text-[#8492a6] hover:text-[#161c22]'
                }`}
              >
                Beneficiaries
                {activeTab === 'beneficiaries' && (
                  <motion.div
                    layoutId="payoutActiveTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0976da] rounded-full"
                  />
                )}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('contacts')}
                className={`pb-2 font-medium relative transition cursor-pointer ${
                  activeTab === 'contacts' ? 'text-[#0976da]' : 'text-[#8492a6] hover:text-[#161c22]'
                }`}
              >
                Contacts
                {activeTab === 'contacts' && (
                  <motion.div
                    layoutId="payoutActiveTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0976da] rounded-full"
                  />
                )}
              </button>
            </div>

            {/* Recipient List with Interactive Selection */}
            <div className="mt-2 divide-y divide-[#edf1f7]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-0.5"
                >
                  {currentList.map((item) => {
                    const isSelected = selectedRecipient === item.id;
                    return (
                      <motion.div
                        key={item.id}
                        whileHover={{ x: 2 }}
                        onClick={() => setSelectedRecipient(isSelected ? null : item.id)}
                        className={`py-1.5 px-1.5 rounded-lg flex items-center justify-between cursor-pointer transition ${
                          isSelected ? 'bg-[#f0fdf4] border border-[#bbf7d0]' : 'hover:bg-[#f7f9fc]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            style={{ backgroundColor: item.color }}
                            className="w-7 h-7 rounded-full text-white flex items-center justify-center text-[10px] font-bold shrink-0 shadow-xs"
                          >
                            {item.initials}
                          </div>
                          <div>
                            <div className="text-[11.5px] font-bold text-[#161c22] flex items-center gap-1">
                              {item.name}
                              {isSelected && (
                                <CheckCircle2 className="w-3 h-3 text-emerald-600 inline" />
                              )}
                            </div>
                            <div className="text-[9px] text-[#8492a6]">{item.bank}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {isSelected ? (
                            <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                              Ready
                            </span>
                          ) : item.pinned ? (
                            <Pin className="w-3 h-3 text-[#b45309] fill-[#b45309] rotate-45" />
                          ) : null}
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom footer text */}
          <div className="text-center pt-2 border-t border-[#f0f4f9] mt-2 flex items-center justify-center gap-1">
            <Check className="w-3 h-3 text-[#0976da]" />
            <span className="text-[8.5px] text-[#6c7a89] font-medium">
              Checked Row by Row · Direct NIBSS Batch Clearing
            </span>
          </div>
        </div>
      </PhoneFrame>
    </motion.div>
  );
};
