import React, { useState } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSuccessLogin }) => {
  const [method, setMethod] = useState<'biometric' | 'otp'>('biometric');
  const [isVerifying, setIsVerifying] = useState(false);
  const [otp, setOtp] = useState('');

  if (!isOpen) return null;

  const handleBiometricAuth = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onSuccessLogin();
      onClose();
    }, 800);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onSuccessLogin();
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#01091C]/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0A1B3D] border border-[#14294F] rounded-2xl max-w-sm w-full p-6 flex flex-col gap-5 shadow-2xl relative">
        <div className="flex items-center justify-between pb-3 border-b border-[#14294F]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00DF8F]"></span>
            <h3 className="text-base font-bold text-[#F2F5F9]">Sovereign Vault Login</h3>
          </div>
          <button onClick={onClose} className="text-[#A8BBD6] hover:text-[#F2F5F9]">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Tab switcher */}
        <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-[#01091C] border border-[#14294F]">
          <button
            onClick={() => setMethod('biometric')}
            className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
              method === 'biometric' ? 'bg-[#14294F] text-[#00DF8F]' : 'text-[#A8BBD6]'
            }`}
          >
            Touch ID / Passkey
          </button>
          <button
            onClick={() => setMethod('otp')}
            className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
              method === 'otp' ? 'bg-[#14294F] text-[#0D95FE]' : 'text-[#A8BBD6]'
            }`}
          >
            WhatsApp OTP
          </button>
        </div>

        {method === 'biometric' ? (
          <div className="py-6 flex flex-col items-center justify-center gap-4 text-center">
            <button
              onClick={handleBiometricAuth}
              disabled={isVerifying}
              className="w-20 h-20 rounded-full bg-[#00DF8F]/10 border-2 border-[#00DF8F] flex items-center justify-center text-[#00DF8F] hover:bg-[#00DF8F]/20 transition-all focus:outline-none"
            >
              <span className="material-symbols-outlined text-[42px]">
                {isVerifying ? 'sync' : 'fingerprint'}
              </span>
            </button>
            <div>
              <h4 className="text-sm font-bold text-[#F2F5F9]">
                {isVerifying ? 'Verifying Hardware Token...' : 'Tap for Biometric Sign-In'}
              </h4>
              <p className="text-xs text-[#A8BBD6] mt-1">FIDO2 WebAuthn Protected</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleOtpSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#A8BBD6]">Enter 6-digit WhatsApp OTP code</label>
              <input
                type="text"
                required
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="492 108"
                className="px-3.5 py-2.5 rounded-xl bg-[#01091C] border border-[#14294F] font-mono text-center tracking-widest text-lg text-[#F2F5F9] focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-2.5 rounded-xl bg-[#0D95FE] text-[#00325b] font-bold text-xs hover:bg-[#00DF8F] transition-all"
            >
              {isVerifying ? 'Authenticating...' : 'Sign In to Vault'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
