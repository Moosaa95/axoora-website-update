import React, { useState } from 'react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<number>(1);
  const [phone, setPhone] = useState('08034910283');
  const [bvn, setBvn] = useState('22198401992');
  const [nin, setNin] = useState('48102918211');
  const [assignedNuban] = useState('0248819032');
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStep(3);
    }, 1000);
  };

  const handleStep3 = () => {
    setStep(4);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#01091C]/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0A1B3D] border border-[#14294F] rounded-3xl max-w-lg w-full p-6 sm:p-8 flex flex-col gap-6 shadow-2xl relative">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#14294F]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#0D95FE] font-bold">
              SOVEREIGN ONBOARDING // STEP {step} OF 4
            </span>
          </div>
          <button onClick={onClose} className="text-[#A8BBD6] hover:text-[#F2F5F9]">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#01091C] h-1.5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#0D95FE] to-[#00DF8F] transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>

        {/* STEP 1: Phone / WhatsApp */}
        {step === 1 && (
          <form onSubmit={handleStep1} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-bold text-[#F2F5F9]">Enter Your WhatsApp Number</h3>
              <p className="text-xs text-[#A8BBD6]">
                We'll spawn your private cryptographic vault and connect your WhatsApp AI assistant.
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#A8BBD6]">Nigerian Mobile Number</label>
              <div className="flex items-center gap-2">
                <span className="px-3 py-2 rounded-xl bg-[#01091C] border border-[#14294F] text-xs font-mono text-[#F2F5F9]">
                  +234
                </span>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="801 234 5678"
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#01091C] border border-[#14294F] text-xs font-mono text-[#F2F5F9] focus:outline-none focus:border-[#0D95FE]"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#01091C] border border-[#14294F] flex items-center gap-2 text-xs text-[#00DF8F]">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>Zero-App Banking: No 50MB app download required</span>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#0D95FE] text-[#00325b] font-bold text-sm hover:bg-[#00DF8F] hover:text-[#003825] transition-all"
            >
              Continue to Instant KYC
            </button>
          </form>
        )}

        {/* STEP 2: Autonomous BVN / NIN verification */}
        {step === 2 && (
          <form onSubmit={handleStep2} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-bold text-[#F2F5F9]">Autonomous NIBSS Identity Verification</h3>
              <p className="text-xs text-[#A8BBD6]">
                In accordance with Central Bank of Nigeria directives, instant Tier 3 validation requires your BVN or NIN.
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#A8BBD6]">Bank Verification Number (BVN)</label>
              <input
                type="text"
                required
                maxLength={11}
                value={bvn}
                onChange={(e) => setBvn(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-[#01091C] border border-[#14294F] text-xs font-mono text-[#F2F5F9] focus:outline-none focus:border-[#00DF8F]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#A8BBD6]">National Identity Number (NIN)</label>
              <input
                type="text"
                required
                maxLength={11}
                value={nin}
                onChange={(e) => setNin(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-[#01091C] border border-[#14294F] text-xs font-mono text-[#F2F5F9] focus:outline-none focus:border-[#00DF8F]"
              />
            </div>

            <div className="p-3 rounded-xl bg-[#01091C] border border-[#14294F] text-xs text-[#A8BBD6] flex items-center justify-between font-mono">
              <span>NIBSS Check SLA:</span>
              <span className="text-[#00DF8F] font-bold">&lt; 1.2 Seconds</span>
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3 rounded-xl bg-[#00DF8F] text-[#003825] font-bold text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              {isVerifying ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
                  <span>Validating with Central Bank...</span>
                </>
              ) : (
                <span>Verify &amp; Assign NUBAN</span>
              )}
            </button>
          </form>
        )}

        {/* STEP 3: NUBAN Assigned */}
        {step === 3 && (
          <div className="flex flex-col gap-4 text-center">
            <div className="w-14 h-14 rounded-full bg-[#00DF8F]/20 border-2 border-[#00DF8F] flex items-center justify-center text-[#00DF8F] mx-auto">
              <span className="material-symbols-outlined text-[32px]">check</span>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-bold text-[#F2F5F9]">Tier 3 Clearance Approved!</h3>
              <p className="text-xs text-[#A8BBD6]">
                Your permanent dedicated commercial bank account has been minted with auto-sweep enabled.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#01091C] border-2 border-[#0D95FE] flex flex-col gap-2 text-left">
              <span className="text-[11px] text-[#A8BBD6] uppercase">Assigned Bank Partner</span>
              <div className="text-base font-bold text-[#F2F5F9]">Wema Bank Plc (Axoora Rail)</div>
              <div className="flex items-center justify-between pt-2 border-t border-[#14294F]">
                <div>
                  <span className="text-[10px] text-[#A8BBD6] block">Account Number (NUBAN)</span>
                  <span className="text-2xl font-mono font-bold text-[#00DF8F]">{assignedNuban}</span>
                </div>
                <span className="px-2.5 py-1 rounded bg-[#14294F] text-[#0D95FE] text-xs font-mono font-bold">
                  15.5% APY
                </span>
              </div>
            </div>

            <button
              onClick={handleStep3}
              className="w-full py-3 rounded-xl bg-[#0D95FE] text-[#00325b] font-bold text-sm hover:bg-[#00DF8F] hover:text-[#003825] transition-all"
            >
              Finish Activation
            </button>
          </div>
        )}

        {/* STEP 4: Complete */}
        {step === 4 && (
          <div className="flex flex-col gap-5 text-center">
            <div className="w-16 h-16 rounded-full bg-[#0D95FE]/20 border-2 border-[#0D95FE] flex items-center justify-center text-[#0D95FE] mx-auto">
              <span className="material-symbols-outlined text-[36px]">rocket_launch</span>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-2xl font-bold text-[#F2F5F9]">Sovereign Account Ready!</h3>
              <p className="text-xs text-[#A8BBD6]">
                You can now receive funds from any Nigerian bank, disburse instant supplier payouts, or send
                commands via WhatsApp.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#01091C] border border-[#14294F] text-xs text-left flex flex-col gap-2 font-mono">
              <div className="flex justify-between text-[#A8BBD6]">
                <span>WhatsApp Assistant:</span>
                <span className="text-[#00DF8F]">Connected (+234 800 AXOORA)</span>
              </div>
              <div className="flex justify-between text-[#A8BBD6]">
                <span>Daily Limit:</span>
                <span className="text-[#F2F5F9]">₦100,000,000 (Tier 3 Uncapped)</span>
              </div>
              <div className="flex justify-between text-[#A8BBD6]">
                <span>Overnight Sweep:</span>
                <span className="text-[#0D95FE]">Active (15.5% APY Midnight)</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-[#00DF8F] text-[#003825] font-bold text-sm hover:brightness-110"
            >
              Enter Axoora Vault
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
