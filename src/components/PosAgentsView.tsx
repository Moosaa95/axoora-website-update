import React, { useState } from 'react';
import { PosTerminal } from '../types';
import { MOCK_POS_TERMINALS } from '../data/mockData';

interface PosAgentsViewProps {
  onOpenOnboarding: () => void;
}

export const PosAgentsView: React.FC<PosAgentsViewProps> = ({ onOpenOnboarding }) => {
  const [terminals] = useState<PosTerminal[]>(MOCK_POS_TERMINALS);
  const [dailyVolume, setDailyVolume] = useState<number>(2500000);
  const [disputeRrn, setDisputeRrn] = useState<string>('028491029182');
  const [disputeStatus, setDisputeStatus] = useState<'idle' | 'querying' | 'reversed'>('idle');
  const [showOrderModal, setShowOrderModal] = useState<boolean>(false);
  const [orderModel, setOrderModel] = useState<'pro' | 'mini'>('pro');

  const monthlyNetEarnings = Math.round(dailyVolume * 0.0041 * 30);
  const overnightInterest = Math.round((dailyVolume * 0.155) / 365 * 30);

  const handleResolveDispute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!disputeRrn) return;
    setDisputeStatus('querying');
    setTimeout(() => {
      setDisputeStatus('reversed');
    }, 1100);
  };

  return (
    <div className="w-full px-4 sm:px-8 py-8 sm:py-12 max-w-7xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#14294F]">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#F2A93B] uppercase font-semibold">
              AGENCY BANKING &amp; HIGH-SPEED HARDWARE
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#00DF8F]/10 text-[#00DF8F] font-mono text-[10px] font-bold border border-[#00DF8F]">
              99.98% DUAL SIM UPTIME
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#F2F5F9]">
            Axoora POS Agent Network
          </h1>
          <p className="text-sm sm:text-base text-[#A8BBD6]">
            Hardened Android 13 smart terminals with automated dual-eSIM fallback, instant 60-second dispute
            resolution, and overnight interest on float balances.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowOrderModal(true)}
            className="px-5 py-2.5 rounded-xl bg-[#F2A93B] text-[#01091C] font-bold text-sm hover:brightness-110 transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
            <span>Request New Terminal</span>
          </button>
        </div>
      </div>

      {/* Fleet Overview Cards */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-[#F2F5F9]">Active Terminal Fleet (3 Devices)</h3>
          <span className="text-xs font-mono text-[#00DF8F]">ALL TERMINALS CONNECTED</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {terminals.map((t) => (
            <div
              key={t.terminalId}
              className="p-5 rounded-2xl bg-[#0A1B3D] border border-[#14294F] flex flex-col justify-between gap-4 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00DF8F] animate-pulse"></span>
                  <span className="font-mono text-xs font-bold text-[#F2F5F9]">{t.terminalId}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#14294F] font-mono text-[10px] text-[#0D95FE]">
                  {t.model}
                </span>
              </div>

              <div>
                <span className="text-xs text-[#A8BBD6] block">{t.location}</span>
                <span className="text-sm font-semibold text-[#F2F5F9]">Agent: {t.operator}</span>
              </div>

              {/* Telemetry bar */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-[#01091C] p-3 rounded-xl border border-[#14294F]">
                <div>
                  <span className="text-[#A8BBD6] block text-[10px]">Today's Volume</span>
                  <span className="font-mono font-bold text-[#00DF8F]">
                    ₦{t.todayVolume.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-[#A8BBD6] block text-[10px]">Transactions</span>
                  <span className="font-mono font-bold text-[#F2F5F9]">{t.todayTransactions} Txs</span>
                </div>
                <div>
                  <span className="text-[#A8BBD6] block text-[10px]">Battery Level</span>
                  <span className="font-mono text-[#0D95FE] font-semibold">{t.batteryLevel}%</span>
                </div>
                <div>
                  <span className="text-[#A8BBD6] block text-[10px]">Dual SIM Rail</span>
                  <span className="font-mono text-[#F2A93B] text-[11px] font-semibold">
                    {t.sim1} / {t.sim2}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-[#14294F]">
                <span className="text-[#A8BBD6]">Thermal Paper: {t.paperRoll}%</span>
                <span className="text-[#00DF8F] font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">bolt</span> Instant NIP
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hardware Specifications Showcase */}
      <div className="p-6 lg:p-8 rounded-2xl bg-[#0A1B3D] border border-[#14294F] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-[#F2A93B]/20 text-[#F2A93B] font-mono text-xs font-semibold">
              SPECIFICATION // HORIZON PRO
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F2F5F9]">
            Engineered for High-Pressure Market Stalls
          </h2>
          <p className="text-sm sm:text-base text-[#A8BBD6] leading-relaxed">
            Built with shock-absorbent drop resistance, high-torque Seiko thermal printers, and instant
            dual-eSIM fallback that automatically shifts between MTN and Airtel without dropping the
            customer's transaction session.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-[#14294F] border border-[#14294F]">
              <span className="text-xs text-[#A8BBD6] block">Print Velocity</span>
              <span className="font-mono text-base font-bold text-[#F2F5F9]">70 mm / second</span>
            </div>
            <div className="p-3 rounded-xl bg-[#14294F] border border-[#14294F]">
              <span className="text-xs text-[#A8BBD6] block">Battery Endurance</span>
              <span className="font-mono text-base font-bold text-[#00DF8F]">5,200 mAh (3 Days)</span>
            </div>
            <div className="p-3 rounded-xl bg-[#14294F] border border-[#14294F]">
              <span className="text-xs text-[#A8BBD6] block">Accepted Rails</span>
              <span className="font-mono text-base font-bold text-[#0D95FE]">EMV, NFC, QR, eNaira</span>
            </div>
            <div className="p-3 rounded-xl bg-[#14294F] border border-[#14294F]">
              <span className="text-xs text-[#A8BBD6] block">Security Standard</span>
              <span className="font-mono text-base font-bold text-[#F2A93B]">PCI-PTS 6.x Hardware</span>
            </div>
          </div>
        </div>

        {/* Visual Terminal Mockup */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-[320px] rounded-3xl p-5 bg-[#01091C] border-2 border-[#14294F] flex flex-col gap-4 shadow-2xl">
            {/* Terminal Top Printer Slot */}
            <div className="w-full h-8 bg-[#14294F] rounded-t-xl border border-[#273454] flex items-center justify-between px-3">
              <span className="font-mono text-[9px] text-[#A8BBD6]">SEIKO HIGH-TORQUE PRINTER</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#00DF8F]"></span>
            </div>

            {/* Screen */}
            <div className="w-full aspect-[4/3] bg-[#020F2E] rounded-xl border border-[#14294F] p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#A8BBD6]">
                <span className="text-[#00DF8F] font-bold">Axoora Rail</span>
                <span>4G • MTN [SIM1]</span>
              </div>
              <div className="text-center py-2">
                <span className="text-xs text-[#A8BBD6]">Insert, Tap or Scan Card</span>
                <div className="text-2xl font-bold font-mono text-[#F2F5F9] mt-1">₦25,000.00</div>
              </div>
              <div className="flex justify-between items-center text-[10px] text-[#0D95FE] font-mono border-t border-[#14294F] pt-1">
                <span>NIP Instant Settle</span>
                <span>Ready: OK</span>
              </div>
            </div>

            {/* Terminal Keypad */}
            <div className="grid grid-cols-3 gap-2 text-center font-mono text-sm">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'CANCEL', 0, 'ENTER'].map((key, i) => (
                <div
                  key={i}
                  className={`py-2 rounded-lg border border-[#14294F] ${
                    key === 'ENTER'
                      ? 'bg-[#00DF8F] text-[#003825] font-bold'
                      : key === 'CANCEL'
                      ? 'bg-[#FF6A6A]/20 text-[#FF6A6A] font-bold text-[10px] flex items-center justify-center'
                      : 'bg-[#0A1B3D] text-[#F2F5F9]'
                  }`}
                >
                  {key}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 60-Second Instant Dispute Resolution Console */}
      <div className="p-6 lg:p-8 rounded-2xl bg-[#0A1B3D] border-2 border-[#00DF8F]/30 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#00DF8F] font-bold">CBN NIP DIRECT REVERSAL</span>
              <span className="px-2 py-0.5 rounded bg-[#00DF8F]/20 text-[#00DF8F] font-mono text-[10px]">
                &lt; 60 SECONDS
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#F2F5F9]">
              Instant POS Glitch Reversal Sandbox
            </h3>
            <p className="text-xs text-[#A8BBD6]">
              Customer debited but receipt didn't print? Input the 12-digit Retrieval Reference Number (RRN)
              or Session ID to query the Central Bank switch and reverse instantly into the customer's account.
            </p>
          </div>

          <form onSubmit={handleResolveDispute} className="flex items-center gap-2">
            <input
              type="text"
              value={disputeRrn}
              onChange={(e) => setDisputeRrn(e.target.value)}
              placeholder="Enter 12-digit RRN / Session ID"
              className="px-3.5 py-2 rounded-xl bg-[#01091C] border border-[#14294F] font-mono text-xs text-[#F2F5F9] focus:outline-none focus:border-[#00DF8F] w-56 sm:w-64"
            />
            <button
              type="submit"
              disabled={disputeStatus === 'querying'}
              className="px-4 py-2 rounded-xl bg-[#00DF8F] hover:bg-emerald-400 text-[#003825] font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">
                {disputeStatus === 'querying' ? 'hourglass_empty' : 'autorenew'}
              </span>
              <span>{disputeStatus === 'querying' ? 'Verifying...' : 'Resolve Reversal'}</span>
            </button>
          </form>
        </div>

        {disputeStatus === 'reversed' && (
          <div className="p-4 rounded-xl bg-[#14294F] border-2 border-[#00DF8F] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#00DF8F]/20 flex items-center justify-center text-[#00DF8F] shrink-0">
                <span className="material-symbols-outlined text-[20px]">check</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[#F2F5F9] text-sm">
                  Dispute Resolved: ₦18,500.00 Refunded Instantly
                </span>
                <span className="text-[#A8BBD6] font-mono">
                  RRN: {disputeRrn} • Originating Bank: GTBank • Session: NIP-REV-941028
                </span>
              </div>
            </div>
            <span className="font-mono text-[#00DF8F] font-semibold">
              Clearing Latency: 0.72 seconds
            </span>
          </div>
        )}
      </div>

      {/* Commission Calculator */}
      <div className="p-6 lg:p-8 rounded-2xl bg-[#0A1B3D] border border-[#14294F] grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold text-[#F2F5F9]">Live Agent Commission Calculator</h3>
          <p className="text-sm text-[#A8BBD6]">
            Calculate your monthly profit based on your store or agent location volume. Axoora gives agents
            industry-lowest flat fees plus 15.5% daily interest on overnight float balances.
          </p>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-[#F2F5F9] font-semibold flex justify-between">
              <span>Daily Terminal Volume (₦)</span>
              <span className="font-mono text-[#00DF8F] font-bold text-sm">
                ₦{dailyVolume.toLocaleString()}
              </span>
            </label>
            <input
              type="range"
              min="200000"
              max="15000000"
              step="100000"
              value={dailyVolume}
              onChange={(e) => setDailyVolume(Number(e.target.value))}
              className="w-full accent-[#00DF8F] bg-[#14294F] rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono text-[#A8BBD6]">
              <span>₦200k/day</span>
              <span>₦5.0M/day</span>
              <span>₦15.0M+/day</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#14294F] border-2 border-[#00DF8F] flex flex-col gap-4 text-center">
          <span className="text-xs text-[#A8BBD6] uppercase tracking-wider">
            Combined Monthly Agent Net Yield
          </span>
          <span className="text-3xl sm:text-4xl font-bold font-mono text-[#00DF8F]">
            ₦{(monthlyNetEarnings + overnightInterest).toLocaleString()}.00
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-[#14294F] font-mono">
            <div>
              <span className="text-[#A8BBD6] block">POS Commission:</span>
              <span className="text-[#F2F5F9] font-bold">₦{monthlyNetEarnings.toLocaleString()}.00</span>
            </div>
            <div>
              <span className="text-[#A8BBD6] block">15.5% Overnight Float:</span>
              <span className="text-[#0D95FE] font-bold">+₦{overnightInterest.toLocaleString()}.00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Order Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 z-50 bg-[#01091C]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A1B3D] border border-[#14294F] rounded-2xl max-w-md w-full p-6 flex flex-col gap-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#14294F]">
              <h3 className="text-lg font-bold text-[#F2F5F9]">Request Axoora Terminal</h3>
              <button
                onClick={() => setShowOrderModal(false)}
                className="text-[#A8BBD6] hover:text-[#F2F5F9]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-xs text-[#A8BBD6]">Select Terminal Hardware Model</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setOrderModel('pro')}
                  className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                    orderModel === 'pro'
                      ? 'border-[#00DF8F] bg-[#14294F]'
                      : 'border-[#14294F] bg-[#01091C]'
                  }`}
                >
                  <span className="font-bold text-sm text-[#F2F5F9]">Horizon Pro 4G</span>
                  <span className="text-[11px] text-[#A8BBD6]">Includes Seiko thermal printer</span>
                  <span className="font-mono text-xs text-[#00DF8F] font-semibold mt-1">₦45,000 Caution</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderModel('mini')}
                  className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                    orderModel === 'mini'
                      ? 'border-[#00DF8F] bg-[#14294F]'
                      : 'border-[#14294F] bg-[#01091C]'
                  }`}
                >
                  <span className="font-bold text-sm text-[#F2F5F9]">Horizon Mini NFC</span>
                  <span className="text-[11px] text-[#A8BBD6]">Pocket-sized e-receipt terminal</span>
                  <span className="font-mono text-xs text-[#0D95FE] font-semibold mt-1">₦25,000 Caution</span>
                </button>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#A8BBD6]">Delivery Address / Market Stall</label>
                <input
                  type="text"
                  placeholder="e.g. Shop 42, Balogun Market Lagos"
                  className="px-3.5 py-2 rounded-xl bg-[#01091C] border border-[#14294F] text-xs text-[#F2F5F9] focus:outline-none"
                  defaultValue="Plot 18, Commercial Way, Ikeja Lagos"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#A8BBD6]">Contact Phone (WhatsApp Enabled)</label>
                <input
                  type="text"
                  placeholder="+234 800 000 0000"
                  className="px-3.5 py-2 rounded-xl bg-[#01091C] border border-[#14294F] text-xs text-[#F2F5F9] focus:outline-none"
                  defaultValue="+234 803 491 0283"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#14294F]">
              <span className="text-xs text-[#A8BBD6]">Dispatch in 24 hours</span>
              <button
                onClick={() => {
                  alert('Terminal order dispatched! Courier will contact your WhatsApp line.');
                  setShowOrderModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-[#00DF8F] text-[#003825] font-bold text-xs hover:brightness-110"
              >
                Confirm Dispatch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
