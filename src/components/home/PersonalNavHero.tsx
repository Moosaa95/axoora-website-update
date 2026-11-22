'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
  ShieldCheck,
  Search,
  ChevronRight,
  Store,
  Phone,
  Wifi,
  Zap,
  Tv,
  Droplet,
  GraduationCap,
  Landmark,
  FileText,
  CreditCard,
  Users,
  Check,
  Lock,
} from 'lucide-react';
import { StoreButtons, PhoneFrame, PhoneStatusBar } from './shared';
import { WhatsAppHeroPhone } from './WhatsAppHeroPhone';

export type PersonalNavHeroType = 'send' | 'cards' | 'savings' | 'ajo' | 'mall';

interface PersonalNavHeroProps {
  activeNav: PersonalNavHeroType;
  onOpenWhatsApp: () => void;
  onOpenDownloadApp?: () => void;
}

export const PersonalNavHero: React.FC<PersonalNavHeroProps> = ({
  activeNav,
  onOpenWhatsApp,
  onOpenDownloadApp,
}) => {
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-2 pb-12">
      <AnimatePresence mode="wait">
        {/* ═══════════════════════════════════════════════════════
            1. SEND NAV HERO ("Send and Pay" · Bank on WhatsApp)
            ═══════════════════════════════════════════════════════ */}
        {activeNav === 'send' && (
          <motion.div
            key="hero-send"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3 }}
            className="bg-[#043e97] rounded-[28px] overflow-hidden pt-12 sm:pt-16 lg:pt-[88px] px-6 sm:px-12 lg:px-16 text-white shadow-[0_20px_50px_rgba(2,15,46,0.1)] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end"
          >
            <div className="lg:col-span-7 self-start pb-12 sm:pb-16 lg:pb-[88px] flex flex-col gap-[26px]">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-bold text-[#d6ebff] tracking-wide">
                  Send and Pay
                </span>
                <div className="w-5 h-5 rounded-full bg-[#f25a38] text-white flex items-center justify-center font-bold text-[10px] shadow-xs">
                  A
                </div>
              </div>

              <h1 className="text-[52px] sm:text-[72px] lg:text-[84px] font-bold leading-[0.96] tracking-[-0.04em] select-none text-white!">
                Bank on WhatsApp.
              </h1>

              <p className="text-[19px] text-[#d6ebff] font-normal leading-[1.6] max-w-lg">
                The same account either way. Same limits, same PIN.
              </p>

              <StoreButtons
                tone="onBlue"
                onApp={onOpenDownloadApp ?? (() => {})}
                onWhatsApp={onOpenWhatsApp}
              />
            </div>

            <div className="lg:col-span-5 flex items-end justify-center self-end">
              <WhatsAppHeroPhone />
            </div>
          </motion.div>
        )}

        {/* ═══════════════════════════════════════════════════════
            2. CARDS NAV HERO ("Cards" · Naira and Dollar Cards)
            ═══════════════════════════════════════════════════════ */}
        {activeNav === 'cards' && (
          <motion.div
            key="hero-cards"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3 }}
            className="bg-[#043e97] rounded-[28px] overflow-hidden pt-12 sm:pt-16 lg:pt-[88px] px-6 sm:px-12 lg:px-16 text-white shadow-[0_20px_50px_rgba(2,15,46,0.1)] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end"
          >
            <div className="lg:col-span-7 self-start pb-12 sm:pb-16 lg:pb-[88px] flex flex-col gap-[26px]">
              <h1 className="text-[64px] sm:text-[80px] lg:text-[92px] font-bold leading-[0.94] tracking-[-0.04em] select-none text-white!">
                Send.<br />
                Pay.<br />
                Save.<br />
                Spend.
              </h1>

              <p className="text-[19px] text-[#d6ebff] font-normal leading-[1.6] max-w-lg">
                One account for all of it. In the app or on WhatsApp.
              </p>

              <StoreButtons
                tone="onBlue"
                onApp={onOpenDownloadApp ?? (() => {})}
                onWhatsApp={onOpenWhatsApp}
              />
            </div>

            <div className="lg:col-span-5 flex items-end justify-center self-end">
              <PhoneFrame width={320} height={590} className="shadow-[0_25px_60px_rgba(2,15,46,0.35)]">
                <div className="h-full flex flex-col justify-between px-[14px] pt-1 pb-3 select-none">
                  <PhoneStatusBar />

                  <div className="flex items-center gap-2 pt-0.5 pb-2">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-[#161c22]">
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[13.5px] font-bold text-[#161c22]">Cards</span>
                  </div>

                  {/* Card 1: Naira Card with subtle interactive float */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative w-full h-[148px] rounded-[16px] bg-gradient-to-r from-[#043e97] to-[#0976da] text-white p-3.5 flex flex-col justify-between shadow-md overflow-hidden cursor-pointer"
                  >
                    <div className="flex items-center justify-between z-10">
                      <span className="text-[12.5px] font-bold tracking-tight">axoora</span>
                      <span className="px-2 py-0.5 rounded-[4px] bg-white text-[#043e97] font-bold text-[8.5px] shadow-xs">
                        ₦ NGN
                      </span>
                    </div>

                    <div className="text-[13px] font-mono tracking-widest z-10 font-bold">
                      5061 •••• •••• 4417
                    </div>

                    <div className="flex items-end justify-between z-10">
                      <span className="text-[9.5px] font-medium text-white/90">Adaeze N. Balogun</span>
                      <span className="text-[12.5px] font-bold text-white tracking-tight">₦112,430.00</span>
                    </div>
                  </motion.div>

                  {/* Card 2: Dollar Card with subtle interactive float */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="mt-2.5 relative w-full h-[148px] rounded-[16px] bg-[#161c22] border border-[#2b3542] text-white p-3.5 flex flex-col justify-between shadow-md overflow-hidden cursor-pointer"
                  >
                    <div className="flex items-center justify-between z-10">
                      <span className="text-[12.5px] font-bold tracking-tight">axoora</span>
                      <span className="px-2 py-0.5 rounded-[4px] bg-[#f2f5f9] text-[#161c22] font-bold text-[8.5px] shadow-xs">
                        $ USD
                      </span>
                    </div>

                    <div className="text-[13px] font-mono tracking-widest z-10 text-slate-200 font-bold">
                      4852 •••• •••• 9014
                    </div>

                    <div className="flex items-end justify-between z-10">
                      <span className="text-[9.5px] font-medium text-slate-300">Adaeze N. Balogun</span>
                      <span className="text-[12.5px] font-bold text-white tracking-tight">$ 248.10</span>
                    </div>
                  </motion.div>

                  <div className="pt-2">
                    <div className="w-full py-2.5 rounded-[10px] bg-[#f2f5f9] text-[#0976da] font-bold text-[11px] text-center">
                      Freeze either card in a tap
                    </div>
                  </div>
                </div>
              </PhoneFrame>
            </div>
          </motion.div>
        )}

        {/* ═══════════════════════════════════════════════════════
            3. SAVINGS NAV HERO ("Savings" · Flexible Non-Interest)
            ═══════════════════════════════════════════════════════ */}
        {activeNav === 'savings' && (
          <motion.div
            key="hero-savings"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3 }}
            className="bg-[#043e97] rounded-[28px] overflow-hidden pt-12 sm:pt-16 lg:pt-[88px] px-6 sm:px-12 lg:px-16 text-white shadow-[0_20px_50px_rgba(2,15,46,0.1)] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end"
          >
            <div className="lg:col-span-7 self-start pb-12 sm:pb-16 lg:pb-[88px] flex flex-col gap-[26px]">
              <span className="text-[13px] font-bold text-[#d6ebff] tracking-wide">
                Savings
              </span>

              <h1 className="text-[52px] sm:text-[72px] lg:text-[84px] font-bold leading-[0.96] tracking-[-0.04em] select-none text-white!">
                Save at Your Own Pace.
              </h1>

              <p className="text-[19px] text-[#d6ebff] font-normal leading-[1.6] max-w-lg">
                An expected profit range, not a promised rate, and a statement that shows which investments funded it.
              </p>

              <StoreButtons
                tone="onBlue"
                onApp={onOpenDownloadApp ?? (() => {})}
                onWhatsApp={onOpenWhatsApp}
              />
            </div>

            <div className="lg:col-span-5 flex items-end justify-center self-end">
              <PhoneFrame width={320} height={590} className="shadow-[0_25px_60px_rgba(2,15,46,0.35)]">
                <div className="h-full flex flex-col justify-between px-[14px] pt-1 pb-3 select-none">
                  <PhoneStatusBar />

                  <div>
                    <div className="flex items-center gap-2 pt-0.5 pb-1">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center text-[#161c22]">
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[13.5px] font-bold text-[#161c22]">Flexible</span>
                    </div>

                    <div className="mt-1 text-center">
                      <div className="text-[28px] font-bold text-[#161c22] tracking-tight">
                        ₦35,000<span className="text-[18px] font-normal text-[#8492a6]">.00</span>
                      </div>
                      <div className="text-[9px] text-[#6c7a89] font-medium">Your balance · take it out anytime</div>
                    </div>

                    <div className="mt-2.5 p-2.5 rounded-[12px] bg-[#f7f9fb] border border-[#edf1f7] flex flex-col gap-2">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-[#6c7a89]">Profit Shared in August</span>
                        <span className="font-bold text-[#161c22]">₦2,000.00</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-[#6c7a89]">Since You Opened</span>
                        <span className="font-bold text-[#161c22]">₦6,400.00</span>
                      </div>
                    </div>

                    <div className="mt-2.5">
                      <div className="flex items-center justify-between text-[9.5px] mb-1.5">
                        <span className="font-bold text-[#161c22]">Where the Profit Came From</span>
                        <span className="text-[#8492a6] text-[8px]">August 2026</span>
                      </div>

                      <div className="flex flex-col gap-2">
                        <div>
                          <div className="flex items-center justify-between text-[8.5px] mb-0.5">
                            <span className="text-[#4c5866]">Sukuk - Government</span>
                            <span className="font-bold text-[#161c22]">50% ₦1,000.00</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                            <div className="w-[50%] h-full bg-[#0976da] rounded-full" />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between text-[8.5px] mb-0.5">
                            <span className="text-[#4c5866]">Halal Trade Finance</span>
                            <span className="font-bold text-[#161c22]">30% ₦600.00</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                            <div className="w-[30%] h-full bg-[#0976da]/80 rounded-full" />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between text-[8.5px] mb-0.5">
                            <span className="text-[#4c5866]">Commodity Murabaha</span>
                            <span className="font-bold text-[#161c22]">20% ₦400.00</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                            <div className="w-[20%] h-full bg-[#0976da]/60 rounded-full" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2.5 p-2 rounded-[8px] bg-white border border-[#dde3ea] flex items-center justify-between text-[9.5px] font-semibold text-[#161c22]">
                      <div className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-[#0976da]" />
                        <span>Past Statements</span>
                      </div>
                      <ChevronRight className="w-3 h-3 text-[#8492a6]" />
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="w-full py-2 rounded-[8px] border border-[#0976da] text-[#0976da] font-bold text-[11px] text-center">
                      Withdraw anytime
                    </div>
                  </div>
                </div>
              </PhoneFrame>
            </div>
          </motion.div>
        )}

        {/* ═══════════════════════════════════════════════════════
            4. AJO NAV HERO ("Ajo" · Save with People You Trust)
            ═══════════════════════════════════════════════════════ */}
        {activeNav === 'ajo' && (
          <motion.div
            key="hero-ajo"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3 }}
            className="bg-[#043e97] rounded-[28px] overflow-hidden pt-12 sm:pt-16 lg:pt-[88px] px-6 sm:px-12 lg:px-16 text-white shadow-[0_20px_50px_rgba(2,15,46,0.1)] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end"
          >
            <div className="lg:col-span-7 self-start pb-12 sm:pb-16 lg:pb-[88px] flex flex-col gap-[26px]">
              <span className="text-[13px] font-bold text-[#d6ebff] tracking-wide">
                Ajo and Pay Circle
              </span>

              <h1 className="text-[52px] sm:text-[72px] lg:text-[84px] font-bold leading-[0.96] tracking-[-0.04em] select-none text-white!">
                Save with People You Trust.
              </h1>

              <p className="text-[19px] text-[#d6ebff] font-normal leading-[1.6] max-w-lg">
                Everyone sees who has paid, who is next, and what the payout will be. Zero manual ledger books.
              </p>

              <StoreButtons
                tone="onBlue"
                onApp={onOpenDownloadApp ?? (() => {})}
                onWhatsApp={onOpenWhatsApp}
              />
            </div>

            <div className="lg:col-span-5 flex items-end justify-center self-end">
              <PhoneFrame width={320} height={590} className="shadow-[0_25px_60px_rgba(2,15,46,0.35)]">
                <div className="h-full flex flex-col justify-between px-[14px] pt-1 pb-3 select-none">
                  <PhoneStatusBar />

                  <div>
                    <div className="flex items-center gap-2 pt-0.5 pb-2">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center text-[#161c22]">
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[13.5px] font-bold text-[#161c22]">Ajo Circles</span>
                    </div>

                    {/* Active Ajo Card */}
                    <div className="p-3 rounded-[14px] bg-gradient-to-br from-[#f2f8ff] to-[#e4f0fc] border border-[#cbe1f7]">
                      <div className="flex items-center justify-between">
                        <span className="text-[12px] font-bold text-[#043e97]">Tech Tribe Ajo</span>
                        <span className="px-2 py-0.5 rounded-full bg-[#043e97] text-white text-[8.5px] font-bold">
                          Turn 3 of 6 (You)
                        </span>
                      </div>

                      <div className="mt-2 text-[22px] font-bold text-[#161c22]">
                        ₦600,000<span className="text-[13px] text-[#5c6877]"> payout</span>
                      </div>

                      <div className="mt-2.5 flex items-center justify-between">
                        <div className="flex -space-x-1.5">
                          {['AB', 'CO', 'TA', 'IM', 'FK', 'ZM'].map((init, i) => (
                            <div
                              key={init}
                              className={`w-[24px] h-[24px] rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold ${
                                i < 4 ? 'bg-[#043e97] text-white' : 'bg-slate-300 text-slate-700'
                              }`}
                            >
                              {init}
                            </div>
                          ))}
                        </div>
                        <span className="text-[9.5px] font-bold text-emerald-700">4 / 6 paid today</span>
                      </div>

                      <div className="mt-2 w-full h-1.5 rounded-full bg-blue-100 overflow-hidden">
                        <div className="h-full w-[66%] bg-[#0976da] rounded-full" />
                      </div>
                    </div>

                    {/* Members Schedule */}
                    <div className="mt-3 flex flex-col gap-2">
                      <span className="text-[10px] font-bold text-[#6c7a89]">Upcoming Turns</span>
                      <div className="bg-[#f7f9fb] rounded-[10px] p-2.5 flex flex-col gap-2 border border-[#edf1f7] text-[10px]">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-[#161c22]">Turn 1 · Chidinma Okafor</span>
                          <span className="text-emerald-700 font-bold">Paid ✓</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-[#161c22]">Turn 2 · Tunde Adebayo</span>
                          <span className="text-emerald-700 font-bold">Paid ✓</span>
                        </div>
                        <div className="flex items-center justify-between bg-white p-1.5 rounded-[6px] border border-blue-200">
                          <span className="font-bold text-[#043e97]">Turn 3 · Adaeze Balogun (You)</span>
                          <span className="text-[#0976da] font-bold">Due Dec 1</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="w-full py-2.5 rounded-[10px] bg-[#0976da] text-white font-bold text-[11px] text-center">
                      Create a Pay Circle
                    </div>
                  </div>
                </div>
              </PhoneFrame>
            </div>
          </motion.div>
        )}

        {/* ═══════════════════════════════════════════════════════
            5. MALL NAV HERO ("Mall" · Bills, Tickets & Airtime)
            ═══════════════════════════════════════════════════════ */}
        {activeNav === 'mall' && (
          <motion.div
            key="hero-mall"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3 }}
            className="bg-[#043e97] rounded-[28px] overflow-hidden pt-12 sm:pt-16 lg:pt-[88px] px-6 sm:px-12 lg:px-16 text-white shadow-[0_20px_50px_rgba(2,15,46,0.1)] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end"
          >
            <div className="lg:col-span-7 self-start pb-12 sm:pb-16 lg:pb-[88px] flex flex-col gap-[26px]">
              <h1 className="text-[64px] sm:text-[80px] lg:text-[92px] font-bold leading-[0.94] tracking-[-0.04em] select-none text-white!">
                Send.<br />
                Pay.<br />
                Save.<br />
                Spend.
              </h1>

              <p className="text-[19px] text-[#d6ebff] font-normal leading-[1.6] max-w-lg">
                One account for all of it. In the app or on WhatsApp.
              </p>

              <StoreButtons
                tone="onBlue"
                onApp={onOpenDownloadApp ?? (() => {})}
                onWhatsApp={onOpenWhatsApp}
              />
            </div>

            <div className="lg:col-span-5 flex items-end justify-center self-end">
              <PhoneFrame width={320} height={590} className="shadow-[0_25px_60px_rgba(2,15,46,0.35)]">
                <div className="h-full flex flex-col justify-between px-[14px] pt-1 pb-3 select-none">
                  <PhoneStatusBar />

                  <div>
                    <div className="flex items-center gap-2 pt-0.5 pb-2">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center text-[#161c22]">
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[13.5px] font-bold text-[#161c22]">Bills & More</span>
                    </div>

                    <div className="mt-0.5 px-3 py-1.5 rounded-[8px] border border-[#dde3ea] flex items-center gap-2 text-[10px] text-[#8492a6] bg-white">
                      <Search className="w-3.5 h-3.5 text-[#8492a6]" />
                      <span>Search a biller</span>
                    </div>

                    <div className="mt-3">
                      <span className="text-[9.5px] font-bold text-[#6c7a89]">Saved Bills</span>
                      <div className="mt-1.5 bg-[#f7f9fb] rounded-[10px] border border-[#edf1f7] divide-y divide-[#edf1f7]">
                        <div className="p-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-[#ffefe5] text-[#d9822b] font-bold text-[9px] flex items-center justify-center border border-[#fed7aa]">
                              ie
                            </div>
                            <div>
                              <div className="text-[10.5px] font-bold text-[#161c22]">Ikeja Electric</div>
                              <div className="text-[8px] text-[#6c7a89]">Meter 45012338 · last ₦8,500.00</div>
                            </div>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-[#8492a6]" />
                        </div>

                        <div className="p-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-[#ffcc00] text-black font-extrabold text-[8px] flex items-center justify-center">
                              MTN
                            </div>
                            <div>
                              <div className="text-[10.5px] font-bold text-[#161c22]">MTN · My Line</div>
                              <div className="text-[8px] text-[#6c7a89]">0803 441 7201 · last ₦2,000.00</div>
                            </div>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-[#8492a6]" />
                        </div>

                        <div className="p-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-[#008bd2] text-white font-extrabold text-[8px] flex items-center justify-center">
                              DStv
                            </div>
                            <div>
                              <div className="text-[10.5px] font-bold text-[#161c22]">DStv</div>
                              <div className="text-[8px] text-[#e06d53]">DStv is not responding right now</div>
                            </div>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-[#8492a6]" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-3">
                      <span className="text-[9.5px] font-bold text-[#6c7a89]">Categories</span>
                      <div className="grid grid-cols-3 gap-2 mt-1.5">
                        {[
                          { label: 'Mall', Icon: Store, color: 'text-[#0976da] bg-[#ebf5fc]' },
                          { label: 'Airtime', Icon: Phone, color: 'text-[#0976da] bg-[#f2f5f9]' },
                          { label: 'Data', Icon: Wifi, color: 'text-[#0976da] bg-[#f2f5f9]' },
                          { label: 'Electricity', Icon: Zap, color: 'text-[#0976da] bg-[#f2f5f9]' },
                          { label: 'TV', Icon: Tv, color: 'text-[#0976da] bg-[#f2f5f9]' },
                          { label: 'Water', Icon: Droplet, color: 'text-[#0976da] bg-[#f2f5f9]' },
                          { label: 'Education', Icon: GraduationCap, color: 'text-[#0976da] bg-[#f2f5f9]' },
                          { label: 'Government', Icon: Landmark, color: 'text-[#0976da] bg-[#f2f5f9]' },
                          { label: 'Insurance', Icon: ShieldCheck, color: 'text-[#0976da] bg-[#f2f5f9]' },
                        ].map(({ label, Icon, color }) => (
                          <div key={label} className="flex flex-col items-center gap-1">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${color}`}>
                              <Icon className="w-3.5 h-3.5 stroke-[1.8]" />
                            </div>
                            <span className="text-[8px] text-[#4c5866] font-medium">{label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </PhoneFrame>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
