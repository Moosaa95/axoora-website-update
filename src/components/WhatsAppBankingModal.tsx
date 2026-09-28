import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { COMPANY_INFO } from '../data/mockData';

interface WhatsAppBankingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWaitlist: () => void;
}

export const WhatsAppBankingModal: React.FC<WhatsAppBankingModalProps> = ({
  isOpen,
  onClose,
  onOpenWaitlist,
}) => {
  const [activeSample, setActiveSample] = useState<number>(0);

  const sampleChats = [
    {
      title: 'Send Money',
      user: 'Abeeg send ₦20,000 to Chidinma for fuel',
      aiReply: 'Resolved: Chidinma Okafor (Access Bank • 0128941029). Fee: ₦0.00. Reply 1 to authorize with your biometric touch or WhatsApp PIN.',
      badge: 'Zero Transfer Fee',
    },
    {
      title: 'Save and Earn',
      user: 'Put ₦50,000 into my Save and Earn pool this month',
      aiReply: 'Done. ₦50,000 locked into your Save and Earn account. Your returns are Islamic-compliant with zero interest and no riba.',
      badge: 'Islamic-Compliant / No Riba',
    },
    {
      title: 'Paycircle (Ajo)',
      user: 'When is my turn in Balogun Traders Paycircle?',
      aiReply: 'You are Turn 3 of 10. Turn 2 just cleared. Your payout of ₦200,000 arrives on Friday 12th.',
      badge: 'Digital Ajo Escrow',
    },
    {
      title: 'Data & Utilities',
      user: 'Buy 10GB MTN data for 08034910283',
      aiReply: '10GB MTN SME bundle loaded to 08034910283. Receipt: VTU-9028. Debited ₦3,000.',
      badge: 'Instant Telco Clearing',
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#01091C]/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="w-full max-w-xl bg-[#0A1B3D] border-2 border-[#14294F] rounded-3xl p-6 sm:p-8 text-[#F2F5F9] relative shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#14294F] text-[#A8BBD6] hover:text-[#F2F5F9] hover:bg-[#1E3A6B] flex items-center justify-center transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-[#00DF8F]/20 flex items-center justify-center text-[#00DF8F]">
            <span className="material-symbols-outlined text-[14px]">chat</span>
          </div>
          <span className="font-mono text-xs text-[#00DF8F] uppercase tracking-wider font-semibold">
            Bank with Axoora AI on WhatsApp
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F2F5F9] mb-2">
          Banking in the chat you already use
        </h3>

        <p className="text-sm text-[#A8BBD6] leading-relaxed mb-6">
          Our official WhatsApp is not merely a help desk. It is <strong className="text-[#F2F5F9]">Axoora AI on WhatsApp</strong> — full personal banking built so you can send money, check balances, save, and ask questions in natural language.
        </p>

        {/* Sample Interaction Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#020F2E] border border-[#14294F] mb-4 overflow-x-auto">
          {sampleChats.map((chat, idx) => (
            <button
              key={chat.title}
              onClick={() => setActiveSample(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeSample === idx
                  ? 'bg-[#14294F] text-[#F2F5F9] border border-[#0D95FE]/50'
                  : 'text-[#A8BBD6] hover:text-[#F2F5F9]'
              }`}
            >
              {chat.title}
            </button>
          ))}
        </div>

        {/* Chat Visual Preview */}
        <div className="p-4 rounded-2xl bg-[#020F2E] border border-[#14294F] flex flex-col gap-3 mb-6">
          {/* User message */}
          <div className="self-end max-w-[85%] p-3 rounded-2xl rounded-tr-sm bg-[#14294F] border border-[#1E3A6B] text-xs text-[#F2F5F9]">
            <p>{sampleChats[activeSample].user}</p>
            <span className="text-[10px] text-[#A8BBD6] block text-right mt-1">11:04 AM ✓✓</span>
          </div>

          {/* AI Reply */}
          <div className="self-start max-w-[90%] p-3.5 rounded-2xl rounded-tl-sm bg-[#0A1B3D] border border-[#00DF8F]/40 text-xs text-[#F2F5F9] flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#00DF8F] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">smart_toy</span>
                Axoora AI
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#00DF8F]/10 text-[#00DF8F] font-mono text-[9px]">
                {sampleChats[activeSample].badge}
              </span>
            </div>
            <p className="text-[#F2F5F9] leading-relaxed">{sampleChats[activeSample].aiReply}</p>
            <span className="text-[10px] text-[#A8BBD6]">11:04 AM • CBN PSSP Handshake</span>
          </div>
        </div>

        {/* Security Warning as per brief */}
        <div className="p-3 rounded-xl bg-[#020F2E] border border-red-500/20 text-xs text-[#A8BBD6] flex items-start gap-2.5 mb-6">
          <span className="material-symbols-outlined text-amber-400 text-[18px] shrink-0">security</span>
          <span>
            <strong className="text-[#F2F5F9]">Crucial Security Principle:</strong> Never share your PIN or OTP with anyone. Axoora will never ask for your PIN on a website or in an unverified phone call.
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <a
            href={COMPANY_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:flex-1 py-3 rounded-full bg-[#00DF8F] hover:bg-[#0D95FE] text-[#003825] hover:text-[#00325b] font-bold text-sm text-center transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span>Open Official WhatsApp ({COMPANY_INFO.whatsappNumber})</span>
          </a>
          <button
            onClick={() => {
              onClose();
              onOpenWaitlist();
            }}
            className="w-full sm:w-auto px-5 py-3 rounded-full bg-[#14294F] hover:bg-[#1E3A6B] text-[#F2F5F9] font-semibold text-xs transition-colors"
          >
            Join App Waitlist
          </button>
        </div>
      </motion.div>
    </div>
  );
};
