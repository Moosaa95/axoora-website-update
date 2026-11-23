'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Download,
  AlertTriangle,
  ShieldCheck,
  Clock,
  FileText,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '../context/NavigationContext';
import { StoreButtons, CheckBullet } from './home/shared';
import { PayoutsPhone } from './home/PayoutsPhone';

export const PayoutsProductView: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { openWhatsApp, openDownloadApp } = useNavigation();

  return (
    <div
      className={`w-full min-h-screen font-['DM_Sans',sans-serif] transition-colors duration-200 ${
        isLight ? 'bg-[#f7f9fb] text-[#161c22]' : 'bg-[#020F2E] text-[#F2F5F9]'
      }`}
    >
      {/* ═══════════════════════════════════════════════════════════
          SECTION 1: HERO · Payouts · Two Ways In. One Run Out.
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-2 pb-12">
        <div className="bg-[#043e97] rounded-[28px] overflow-hidden px-6 sm:px-12 lg:px-16 pt-12 sm:pt-14 lg:pt-0 text-white grid grid-cols-1 lg:grid-cols-[minmax(0,557px)_1fr] gap-10 lg:min-h-[580px] shadow-[0_20px_50px_rgba(2,15,46,0.1)]">
          {/* Left Column: Copy & Store Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col justify-center lg:pt-[52px] lg:pb-[48px]"
          >
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-[13px] font-bold leading-[17px] tracking-[0.04em] text-[#d6ebff] block"
            >
              Payouts
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-[20px] text-[44px] sm:text-[56px] lg:text-[64px] leading-[1.04] tracking-[-0.04em] font-bold text-white!"
            >
              Two Ways In. One Run Out.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-5 text-[18px] leading-[1.6] text-[#d6ebff] max-w-[540px]"
            >
              Type the rows yourself, or bring a CSV. Either way the batch is checked before it moves.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <StoreButtons
                tone="onBlueAlt"
                onApp={openDownloadApp ?? (() => {})}
                onWhatsApp={openWhatsApp}
                className="mt-[30px]"
              />
            </motion.div>
          </motion.div>

          {/* Right Column: Interactive Send Money Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="flex items-end justify-center pt-4 lg:pt-[50px] lg:ml-3"
          >
            <PayoutsPhone />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2: How the List Gets In (Image 1)
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 pt-6 pb-12">
        <h2 className="text-[34px] sm:text-[40px] font-bold tracking-tight text-[#161c22] dark:text-white mb-8">
          How the List Gets In
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Add Rows by Hand */}
          <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-[20px] p-8 sm:p-10 shadow-xs flex flex-col justify-between min-h-[220px]">
            <div>
              <Users className="w-6 h-6 text-[#0976da] stroke-[1.8]" />
              <h3 className="text-[24px] font-bold text-[#161c22] dark:text-white mt-4 mb-2">
                Add Rows by Hand
              </h3>
              <p className="text-[15.5px] leading-relaxed text-[#4c5866] dark:text-slate-300">
                For a short run. Add a recipient and an amount, one row at a time, and the names resolve as you go.
              </p>
            </div>
          </div>

          {/* Card 2: Upload a CSV */}
          <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-[20px] p-8 sm:p-10 shadow-xs flex flex-col justify-between min-h-[220px]">
            <div>
              <Download className="w-6 h-6 text-[#0976da] stroke-[1.8]" />
              <h3 className="text-[24px] font-bold text-[#161c22] dark:text-white mt-4 mb-2">
                Upload a CSV
              </h3>
              <p className="text-[15.5px] leading-relaxed text-[#4c5866] dark:text-slate-300">
                For a long one. Download the template from the upload screen, fill in recipient and amount, bring it back.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3: Checked Row by Row. (Image 2)
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 pt-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Copy & Bullets */}
          <div className="lg:col-span-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0976da] block mb-2">
              Before it moves
            </span>

            <h2 className="text-[36px] sm:text-[46px] font-bold tracking-tight text-[#161c22] dark:text-white leading-[1.08] mb-4">
              Checked Row by Row.
            </h2>

            <p className="text-[16px] leading-[1.65] text-[#4c5866] dark:text-slate-300 mb-7">
              Names are resolved for every valid row and anything that will not work is flagged where it sits, so you fix one line instead of starting again.
            </p>

            <ul className="flex flex-col gap-3.5">
              {[
                'Names resolved against the receiving bank',
                'Invalid rows flagged individually',
                'The rest of the batch still goes',
              ].map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-center gap-3 text-[15px] font-medium text-[#161c22] dark:text-white"
                >
                  <CheckBullet />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Exact Batch Validation Table Mockup */}
          <div className="lg:col-span-7 bg-[#ebf5ff] dark:bg-slate-800/60 rounded-[28px] p-5 sm:p-8 lg:p-10 shadow-xs">
            <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-[20px] p-5 sm:p-7 shadow-md overflow-hidden">
              {/* Header */}
              <div className="flex justify-between items-center pb-3 border-b border-[#edf1f7] dark:border-slate-800 text-[11px] font-bold text-[#161c22] dark:text-white uppercase tracking-wider">
                <span className="w-1/2">Recipient</span>
                <span className="w-1/4 text-right">Amount</span>
                <span className="w-1/4 text-right">Status</span>
              </div>

              {/* Rows */}
              <div className="divide-y divide-[#edf1f7] dark:divide-slate-800">
                {/* Row 1 */}
                <div className="py-3 flex items-center justify-between text-[11px]">
                  <div className="w-1/2">
                    <div className="font-bold text-[#161c22] dark:text-white text-[12px]">
                      CHIDINMA OKAFOR
                    </div>
                    <div className="text-[10px] text-[#8492a6]">GTBank · 0123456789</div>
                  </div>
                  <div className="w-1/4 text-right font-bold text-[#161c22] dark:text-white text-[12px]">
                    ₦45,000.00
                  </div>
                  <div className="w-1/4 text-right">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#e6f4ea] text-[#137333] dark:bg-emerald-950/60 dark:text-emerald-400 font-bold text-[9.5px]">
                      Ready
                    </span>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="py-3 flex items-center justify-between text-[11px]">
                  <div className="w-1/2">
                    <div className="font-bold text-[#161c22] dark:text-white text-[12px]">
                      MUSA OKONKWO
                    </div>
                    <div className="text-[10px] text-[#8492a6]">Opay · 7011223344</div>
                  </div>
                  <div className="w-1/4 text-right font-bold text-[#161c22] dark:text-white text-[12px]">
                    ₦38,000.00
                  </div>
                  <div className="w-1/4 text-right">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#e6f4ea] text-[#137333] dark:bg-emerald-950/60 dark:text-emerald-400 font-bold text-[9.5px]">
                      Ready
                    </span>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="py-3 flex items-center justify-between text-[11px]">
                  <div className="w-1/2">
                    <div className="font-bold text-[#161c22] dark:text-white text-[12px]">
                      TUNDE ADEYEMI
                    </div>
                    <div className="text-[10px] text-[#8492a6]">Access · 0987654321</div>
                  </div>
                  <div className="w-1/4 text-right font-bold text-[#161c22] dark:text-white text-[12px]">
                    ₦52,000.00
                  </div>
                  <div className="w-1/4 text-right">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#e6f4ea] text-[#137333] dark:bg-emerald-950/60 dark:text-emerald-400 font-bold text-[9.5px]">
                      Ready
                    </span>
                  </div>
                </div>

                {/* Row 4: Account too short */}
                <div className="py-3 flex items-center justify-between text-[11px] bg-[#fffcf0] dark:bg-amber-950/20 px-1.5 -mx-1.5 rounded-lg">
                  <div className="w-1/2">
                    <div className="font-bold text-[#8492a6] text-[12px]">—</div>
                    <div className="text-[10px] text-[#8492a6]">Zenith · 01234</div>
                  </div>
                  <div className="w-1/4 text-right font-bold text-[#161c22] dark:text-white text-[12px]">
                    ₦30,000.00
                  </div>
                  <div className="w-1/4 text-right">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#fef7e0] text-[#b06000] dark:bg-amber-900/40 dark:text-amber-300 font-bold text-[9.5px]">
                      Account too short
                    </span>
                  </div>
                </div>

                {/* Row 5 */}
                <div className="py-3 flex items-center justify-between text-[11px]">
                  <div className="w-1/2">
                    <div className="font-bold text-[#161c22] dark:text-white text-[12px]">
                      FATIMA BELLO
                    </div>
                    <div className="text-[10px] text-[#8492a6]">UBA · 2233445566</div>
                  </div>
                  <div className="w-1/4 text-right font-bold text-[#161c22] dark:text-white text-[12px]">
                    ₦41,000.00
                  </div>
                  <div className="w-1/4 text-right">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#e6f4ea] text-[#137333] dark:bg-emerald-950/60 dark:text-emerald-400 font-bold text-[9.5px]">
                      Ready
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer Summary Bar */}
              <div className="mt-4 pt-3 border-t border-[#edf1f7] dark:border-slate-800 flex justify-between items-center text-[11px]">
                <span className="font-bold text-[#161c22] dark:text-white">
                  18 recipients · ₦412,000.00
                </span>
                <span className="font-bold text-[#b06000] dark:text-amber-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  1 row to fix
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4: The Rules It Runs Under (Image 3)
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 pt-6 pb-12">
        <h2 className="text-[34px] sm:text-[40px] font-bold tracking-tight text-[#161c22] dark:text-white mb-8">
          The Rules It Runs Under
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Tier 3 Only */}
          <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-[20px] p-8 shadow-xs flex flex-col justify-between min-h-[220px]">
            <div>
              <ShieldCheck className="w-6 h-6 text-[#0976da] stroke-[1.8]" />
              <h3 className="text-[22px] font-bold text-[#161c22] dark:text-white mt-4 mb-2">
                Tier 3 Only
              </h3>
              <p className="text-[15px] leading-relaxed text-[#4c5866] dark:text-slate-300">
                Bulk transfers unlock at Tier 3, like the Dollar card. Below that you see the upgrade, not a dead form.
              </p>
            </div>
          </div>

          {/* Card 2: The Batch Counts as One */}
          <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-[20px] p-8 shadow-xs flex flex-col justify-between min-h-[220px]">
            <div>
              <Clock className="w-6 h-6 text-[#0976da] stroke-[1.8]" />
              <h3 className="text-[22px] font-bold text-[#161c22] dark:text-white mt-4 mb-2">
                The Batch Counts as One
              </h3>
              <p className="text-[15px] leading-relaxed text-[#4c5866] dark:text-slate-300">
                Your daily limit is checked against the total of the run, not row by row.
              </p>
            </div>
          </div>

          {/* Card 3: A Record per Person */}
          <div className="bg-white dark:bg-slate-900 border border-[#dde3ea] dark:border-slate-800 rounded-[20px] p-8 shadow-xs flex flex-col justify-between min-h-[220px]">
            <div>
              <FileText className="w-6 h-6 text-[#0976da] stroke-[1.8]" />
              <h3 className="text-[22px] font-bold text-[#161c22] dark:text-white mt-4 mb-2">
                A Record per Person
              </h3>
              <p className="text-[15px] leading-relaxed text-[#4c5866] dark:text-slate-300">
                One transaction per recipient, each settled and reconciled on its own.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5: CLOSING CTA · Bring the List. (Image 4)
          ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 pt-4 pb-20">
        <div className="bg-[#043e97] rounded-[28px] text-white px-6 py-16 sm:py-20 flex flex-col items-center text-center shadow-lg">
          <h2 className="text-[38px] sm:text-[52px] font-bold leading-tight tracking-tight text-white!">
            Bring the List.
          </h2>
          <p className="text-base sm:text-lg text-[#d6ebff] mt-4 max-w-md">
            The template is in the app, with example rows.
          </p>

          <StoreButtons
            tone="onBlueAlt"
            onApp={openDownloadApp ?? (() => {})}
            onWhatsApp={openWhatsApp}
            className="mt-8 justify-center"
          />
        </div>
      </section>
    </div>
  );
};

