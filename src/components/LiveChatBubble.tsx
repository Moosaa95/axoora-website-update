'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMPANY_INFO } from '../data/mockData';

interface Message {
  id: string;
  sender: 'bot' | 'user' | 'agent';
  text: string;
  time: string;
}

interface LiveChatBubbleProps {
  onOpenWaitlist?: (interest?: 'personal' | 'business' | 'pos-agent') => void;
  onOpenWhatsApp?: () => void;
}

export const LiveChatBubble: React.FC<LiveChatBubbleProps> = ({
  onOpenWaitlist,
  onOpenWhatsApp,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [rated, setRated] = useState<'good' | 'bad' | null>(null);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Welcome to Axoora Priority Support desk (Maitama, Abuja). How may we assist your business or personal banking today?',
      time: 'Just now',
    },
  ]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;
    const userText = text;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      time: now,
    };

    setMessages((prev) => [...prev, newMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Automated intelligent fintech responses
    setTimeout(() => {
      let reply = 'Thank you for reaching out! Our team is processing your inquiry with NIBSS verification.';
      const lower = userText.toLowerCase();

      if (lower.includes('pos') || lower.includes('terminal')) {
        reply = 'The Apex POS terminal includes dual-eSIM (MTN & Airtel) with 0.4% flat capped rate and instant NIBSS settlement. Delivery takes under 48 hours to any Nigerian state. You can request one directly!';
      } else if (lower.includes('account') || lower.includes('open') || lower.includes('business')) {
        reply = 'You can open a verified Business or Personal account in under 2 minutes with your phone number and BVN/NIN. All deposits are insured by NDIC.';
      } else if (lower.includes('transfer') || lower.includes('fail') || lower.includes('pending') || lower.includes('dispute')) {
        reply = 'Transfers settle within 0.9s on our direct NIBSS bridge. If a recipient bank experiences external downtime, we generate an instant verifiable session ID proof you can share immediately.';
      } else if (lower.includes('whatsapp')) {
        reply = 'You can bank with Axoora AI directly on WhatsApp (+234 911 000 2966) — check your balance, make hands-free transfers, and buy airtime in English or Pidgin!';
      } else if (lower.includes('halal') || lower.includes('riba') || lower.includes('interest')) {
        reply = 'Axoora operates on certified non-interest Islamic finance principles (Mudarabah/Murabaha). We charge 0% interest and ₦0 account maintenance fees.';
      }

      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'agent',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 900);
  };

  const handleQuickPrompt = (prompt: string) => {
    handleSend(prompt);
  };

  return (
    <>
      {/* Floating Pill on bottom right */}
      {!isOpen && !isDismissed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-40 flex items-center shadow-2xl"
        >
          <div
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white text-[#0F172A] border border-[#CBD5E1] shadow-xl hover:shadow-2xl hover:border-[#0D95FE] transition-all cursor-pointer select-none group"
          >
            <span className="text-sm">👋</span>
            <span className="text-xs font-bold text-[#0F172A] group-hover:text-[#0D95FE] transition-colors">
              Hi, Need any help?
            </span>
            <div className="w-2 h-2 rounded-full bg-[#00DF8F] animate-pulse" />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsDismissed(true);
            }}
            className="ml-1 w-6 h-6 rounded-full bg-[#020F2E] border border-[#14294F] text-[#A8BBD6] hover:text-white flex items-center justify-center text-xs transition-colors cursor-pointer"
            title="Dismiss bubble"
          >
            ✕
          </button>
        </motion.div>
      )}

      {/* Floating Re-open icon if dismissed */}
      {!isOpen && isDismissed && (
        <button
          onClick={() => {
            setIsDismissed(false);
            setIsOpen(true);
          }}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#0D95FE] text-[#00284D] shadow-2xl flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
          title="Open Axoora Support"
        >
          <span className="material-symbols-outlined text-[24px]">chat</span>
        </button>
      )}

      {/* Active Chat Modal Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[380px] h-[540px] rounded-3xl bg-[#0A1B3D] border-2 border-[#14294F] shadow-2xl flex flex-col overflow-hidden text-[#F2F5F9]"
          >
            {/* Header */}
            <div className="p-4 bg-[#020F2E] border-b border-[#14294F] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-[#0D95FE] text-[#00284D] font-bold text-xs flex items-center justify-center shadow-md">
                    AO
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#00DF8F] border-2 border-[#020F2E]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight">
                    Axoora Priority Desk
                  </h4>
                  <p className="text-[11px] text-[#00DF8F] font-mono leading-tight">
                    Augusta O. · Online
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#14294F] hover:bg-[#1E3A6B] text-[#A8BBD6] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Close modal"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
            </div>

            {/* Notification alert banner */}
            <div className="px-4 py-2 bg-[#020F2E]/80 border-b border-[#14294F] flex items-center justify-between text-[11px] text-[#A8BBD6]">
              <span>Licensed by CBN · NDIC Insured</span>
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00DF8F] hover:underline font-semibold flex items-center gap-1"
              >
                <span>WhatsApp</span>
                <span className="material-symbols-outlined text-[13px]">open_in_new</span>
              </a>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${
                    m.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-sm leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-[#0D95FE] text-[#00284D] font-medium rounded-br-none'
                        : 'bg-[#020F2E] border border-[#14294F] text-[#F2F5F9] rounded-bl-none'
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[10px] text-[#7B9CD2] mt-0.5 px-1 font-mono">
                    {m.time}
                  </span>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex flex-col items-start">
                  <div className="rounded-2xl px-3.5 py-2 bg-[#020F2E] border border-[#14294F] text-[#A8BBD6] rounded-bl-none flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00DF8F] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00DF8F] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00DF8F] animate-bounce [animation-delay:0.4s]" />
                    <span className="text-[10px] text-[#7B9CD2] ml-1">Augusta is typing...</span>
                  </div>
                </div>
              )}

              {/* Quick Action Chips */}
              <div className="pt-2 flex flex-wrap gap-1.5">
                {[
                  'Open Business Account',
                  'Apex POS Terminal',
                  'Transfer Dispute',
                  'WhatsApp Banking',
                ].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handleQuickPrompt(chip)}
                    className="px-2.5 py-1 rounded-full bg-[#14294F]/80 hover:bg-[#0D95FE] text-[#A8BBD6] hover:text-[#00284D] border border-[#14294F] text-[11px] transition-all cursor-pointer"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Support Rating Card */}
              <div className="p-3 rounded-2xl bg-[#020F2E]/90 border border-[#14294F] flex flex-col gap-2 mt-2">
                <span className="text-[11px] text-[#A8BBD6]">
                  Please rate your experience with our support agent today:
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setRated('good')}
                    className={`flex-1 py-1.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      rated === 'good'
                        ? 'bg-[#00DF8F] text-[#003825] border-[#00DF8F]'
                        : 'bg-[#0A1B3D] border-[#14294F] text-[#A8BBD6] hover:text-white'
                    }`}
                  >
                    <span>👍</span>
                    <span>Good</span>
                  </button>
                  <button
                    onClick={() => setRated('bad')}
                    className={`flex-1 py-1.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      rated === 'bad'
                        ? 'bg-red-500 text-white border-red-500'
                        : 'bg-[#0A1B3D] border-[#14294F] text-[#A8BBD6] hover:text-white'
                    }`}
                  >
                    <span>👎</span>
                    <span>Bad</span>
                  </button>
                </div>
              </div>

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-[#020F2E] border-t border-[#14294F] flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Enter message here..."
                className="flex-1 bg-[#0A1B3D] border border-[#14294F] focus:border-[#0D95FE] text-white text-xs px-3.5 py-2.5 rounded-xl outline-none placeholder-[#7B9CD2]"
              />
              <button
                onClick={() => handleSend()}
                className="w-10 h-10 rounded-xl bg-[#0D95FE] text-[#00284D] hover:bg-[#00DF8F] hover:text-[#003825] flex items-center justify-center font-bold transition-all cursor-pointer shrink-0"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
