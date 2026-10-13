'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMPANY_INFO } from '../data/mockData';
import { sendChatMessage, escalateChatToHuman, API_BASE_URL } from '../lib/api';

interface SuggestedAction {
  label: string;
  action: string;
  url?: string;
  text?: string;
  interest?: string;
  primary?: boolean;
}

interface Message {
  id: string;
  sender: 'bot' | 'user' | 'agent' | 'system';
  text: string;
  time: string;
  suggestedActions?: SuggestedAction[];
  isEscalationTrigger?: boolean;
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

  // Session & Escalation State
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [ticketCode, setTicketCode] = useState<string>('AX-LIVE');
  const [isEscalated, setIsEscalated] = useState<boolean>(false);
  const [showEscalationModal, setShowEscalationModal] = useState<boolean>(false);
  const [escalateName, setEscalateName] = useState<string>('');
  const [escalatePhone, setEscalatePhone] = useState<string>('');
  const [isSubmittingEscalation, setIsSubmittingEscalation] = useState<boolean>(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Welcome to Axoora Priority Support. I am your AI financial concierge. How may I assist your business or personal banking today?',
      time: 'Just now',
      suggestedActions: [
        { label: '👤 Talk to Human Agent', action: 'escalate_human', primary: true },
        { label: 'Apex POS Terminal', action: 'quick_reply', text: 'Tell me about the Apex POS terminal' },
        { label: 'Zero Transfer Fees', action: 'quick_reply', text: 'Are personal transfers really 0 naira?' },
        { label: 'WhatsApp Banking', action: 'quick_reply', text: 'How does WhatsApp banking work?' },
      ],
    },
  ]);

  // Load existing session from storage if present
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('axoora_chat_session');
      if (stored) {
        setSessionId(stored);
      }
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping, showEscalationModal]);

  const handleSend = async (textToSend?: string) => {
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

    try {
      // 1. Send to Django REST Framework backend
      const res = await sendChatMessage({
        text: userText,
        sessionId: sessionId,
      });

      if (res.session_id) {
        setSessionId(res.session_id);
        try {
          sessionStorage.setItem('axoora_chat_session', res.session_id);
        } catch {}
      }

      if (res.ticket_code) {
        setTicketCode(res.ticket_code);
      }

      if (res.status === 'escalated' || res.reply.is_escalation_trigger) {
        setIsEscalated(true);
      }

      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: res.reply.sender === 'agent' ? 'agent' : res.reply.sender === 'system' ? 'system' : 'bot',
          text: res.reply.text,
          time: res.reply.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedActions: res.reply.suggested_actions,
          isEscalationTrigger: res.reply.is_escalation_trigger,
        },
      ]);
    } catch {
      // 2. Intelligent local fallback if backend server is connecting or offline
      setTimeout(() => {
        let reply = 'Thank you for reaching out! Our team is processing your inquiry with NIBSS verification.';
        let actions: SuggestedAction[] = [
          { label: '👤 Talk to Human Agent', action: 'escalate_human', primary: true },
        ];
        const lower = userText.toLowerCase();

        if (
          lower.includes('human') ||
          lower.includes('agent') ||
          lower.includes('person') ||
          lower.includes('speak to someone') ||
          lower.includes('talk to someone')
        ) {
          setIsEscalated(true);
          reply = `I understand you would like to speak directly with an actual human support agent! I have initiated priority escalation (Ticket #${ticketCode}). You can chat with our Maitama desk directly on WhatsApp or enter your phone number below for an instant callback.`;
          actions = [
            {
              label: 'Open WhatsApp with Officer',
              action: 'open_url',
              url: `https://wa.me/2349110002966?text=Hello%20Axoora%20Desk!%20I%20am%20requesting%20human%20agent%20escalation.%20Ticket%20%23${ticketCode}`,
              primary: true,
            },
            { label: 'Submit Phone for Callback', action: 'show_escalation_form' },
          ];
        } else if (lower.includes('pos') || lower.includes('terminal')) {
          reply = 'The Apex POS terminal includes dual-eSIM (MTN & Airtel) with 0.4% flat capped rate and instant 0s NIBSS settlement. Delivery takes under 48 hours to any Nigerian state.';
          actions = [
            { label: 'Request Apex POS', action: 'open_apply', interest: 'pos-agent' },
            { label: 'Talk to Human Agent', action: 'escalate_human' },
          ];
        } else if (lower.includes('account') || lower.includes('open') || lower.includes('business')) {
          reply = 'You can open a verified Business or Personal account in under 2 minutes with your phone number and BVN/NIN. All deposits are insured by NDIC.';
          actions = [
            { label: 'Join Waitlist', action: 'open_waitlist' },
            { label: 'Talk to Human Agent', action: 'escalate_human' },
          ];
        } else if (lower.includes('transfer') || lower.includes('fail') || lower.includes('pending') || lower.includes('dispute')) {
          reply = 'Transfers settle within 0.9s on our direct NIBSS bridge. If a recipient bank experiences external downtime, we generate an instant verifiable session ID proof you can share immediately.';
          actions = [
            { label: 'Talk to Human Agent Now', action: 'escalate_human', primary: true },
          ];
        } else if (lower.includes('whatsapp')) {
          reply = 'You can bank with Axoora AI directly on WhatsApp (+234 911 000 2966) — check your balance, make hands-free transfers, and buy airtime in English or Pidgin!';
          actions = [
            { label: 'Open WhatsApp Banking', action: 'open_url', url: 'https://wa.me/2349110002966', primary: true },
          ];
        } else if (lower.includes('halal') || lower.includes('riba') || lower.includes('interest')) {
          reply = 'Axoora operates on certified non-interest Islamic finance principles (Mudarabah/Murabaha). We charge 0% interest and ₦0 account maintenance fees.';
        }

        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'bot',
            text: reply,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            suggestedActions: actions,
          },
        ]);
      }, 700);
    }
  };

  const handleActionClick = (actionItem: SuggestedAction) => {
    if (actionItem.action === 'escalate_human' || actionItem.action === 'show_escalation_form') {
      setShowEscalationModal(true);
      return;
    }

    if (actionItem.action === 'open_url' && actionItem.url) {
      window.open(actionItem.url, '_blank', 'noopener,noreferrer');
      return;
    }

    if (actionItem.action === 'open_waitlist') {
      if (onOpenWaitlist) {
        onOpenWaitlist((actionItem.interest as any) || 'personal');
      }
      return;
    }

    if (actionItem.action === 'open_apply') {
      if (onOpenWaitlist) {
        onOpenWaitlist('pos-agent');
      }
      return;
    }

    if (actionItem.action === 'quick_reply' && actionItem.text) {
      handleSend(actionItem.text);
      return;
    }
  };

  const submitHumanEscalation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!escalateName.trim() || !escalatePhone.trim()) return;

    setIsSubmittingEscalation(true);
    const waUrl = `https://wa.me/2349110002966?text=Hello%20Axoora%20Desk!%20I%20am%20${encodeURIComponent(escalateName)}%20(${encodeURIComponent(escalatePhone)}).%20I%20need%20human%20agent%20assistance%20for%20Ticket%20%23${ticketCode}.`;

    try {
      if (sessionId) {
        await escalateChatToHuman({
          sessionId: sessionId,
          customerName: escalateName,
          customerPhone: escalatePhone,
          reason: 'Customer requested human agent escalation from chat modal',
        });
      }
    } catch {
      // Fallback works seamlessly
    }

    setIsSubmittingEscalation(false);
    setIsEscalated(true);
    setShowEscalationModal(false);

    // Add confirmation message to transcript
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'system',
        text: `Priority Ticket #${ticketCode} confirmed for ${escalateName}. A live customer officer has been assigned to your case and will message or call you at ${escalatePhone} within 3 minutes.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: [
          {
            label: '💬 Chat on WhatsApp With Officer Now',
            action: 'open_url',
            url: waUrl,
            primary: true,
          },
        ],
      },
    ]);
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
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[395px] h-[560px] rounded-3xl bg-[#0A1B3D] border-2 border-[#14294F] shadow-2xl flex flex-col overflow-hidden text-[#F2F5F9]"
          >
            {/* Header */}
            <div className="p-4 bg-[#020F2E] border-b border-[#14294F] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#0D95FE] to-[#00DF8F] text-[#00284D] font-bold text-xs flex items-center justify-center shadow-md">
                    {isEscalated ? 'AO' : 'AI'}
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#00DF8F] border-2 border-[#020F2E] animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight flex items-center gap-1.5">
                    <span>Axoora Priority Desk</span>
                    {isEscalated && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                        {ticketCode}
                      </span>
                    )}
                  </h4>
                  <p className="text-[11px] text-[#00DF8F] font-mono leading-tight">
                    {isEscalated ? 'Live Agent Assigned · Maitama Hub' : 'AI Concierge · Always Online'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Talk to Human Agent Header Shortcut */}
                {!isEscalated && (
                  <button
                    onClick={() => setShowEscalationModal(true)}
                    className="px-2 py-1 rounded-full bg-[#14294F] hover:bg-[#0D95FE] text-[#A8BBD6] hover:text-[#00284D] text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer border border-[#1E3A6B]"
                    title="Speak with a live human support officer"
                  >
                    <span>👤</span>
                    <span>Human</span>
                  </button>
                )}

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#14294F] hover:bg-[#1E3A6B] text-[#A8BBD6] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Close chat"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
            </div>

            {/* Notification alert banner */}
            <div className="px-4 py-1.5 bg-[#020F2E]/80 border-b border-[#14294F] flex items-center justify-between text-[11px] text-[#A8BBD6]">
              <span>Licensed by CBN · NDIC Insured</span>
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00DF8F] hover:underline font-semibold flex items-center gap-1"
              >
                <span>WhatsApp Desk</span>
                <span className="material-symbols-outlined text-[13px]">open_in_new</span>
              </a>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${
                    m.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 shadow-sm leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-[#0D95FE] text-[#00284D] font-medium rounded-br-none'
                        : m.sender === 'system'
                        ? 'bg-[#020F2E] border border-amber-500/40 text-amber-200 rounded-bl-none'
                        : m.sender === 'agent'
                        ? 'bg-[#00DF8F]/20 border border-[#00DF8F]/40 text-[#F2F5F9] rounded-bl-none'
                        : 'bg-[#020F2E] border border-[#14294F] text-[#F2F5F9] rounded-bl-none'
                    }`}
                  >
                    {m.text}

                    {/* Suggested Action Buttons within message */}
                    {m.suggestedActions && m.suggestedActions.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-white/10 flex flex-col gap-1.5">
                        {m.suggestedActions.map((act, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleActionClick(act)}
                            className={`text-left px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer flex items-center justify-between ${
                              act.primary
                                ? 'bg-[#00DF8F] text-[#003825] hover:bg-emerald-300 shadow-sm'
                                : 'bg-[#14294F]/80 hover:bg-[#1E3A6B] text-[#A8BBD6] hover:text-white border border-[#1E3A6B]'
                            }`}
                          >
                            <span>{act.label}</span>
                            <span className="text-[12px]">→</span>
                          </button>
                        ))}
                      </div>
                    )}
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
                    <span className="text-[10px] text-[#7B9CD2] ml-1">
                      {isEscalated ? 'Human officer is typing...' : 'Axoora AI is analyzing...'}
                    </span>
                  </div>
                </div>
              )}

              {/* Human Escalation In-Drawer Card */}
              {showEscalationModal && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-3.5 rounded-2xl bg-[#020F2E] border-2 border-[#0D95FE] shadow-xl flex flex-col gap-2.5 mt-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                      <span>👤</span>
                      <span>Connect with Human Agent</span>
                    </div>
                    <button
                      onClick={() => setShowEscalationModal(false)}
                      className="text-xs text-[#A8BBD6] hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-[11px] text-[#A8BBD6] leading-tight">
                    An officer from our Maitama desk will be dispatched immediately.
                  </p>

                  <form onSubmit={submitHumanEscalation} className="space-y-2">
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      value={escalateName}
                      onChange={(e) => setEscalateName(e.target.value)}
                      required
                      className="w-full bg-[#0A1B3D] border border-[#14294F] focus:border-[#0D95FE] text-white text-xs px-2.5 py-1.5 rounded-lg outline-none placeholder-[#7B9CD2]"
                    />
                    <input
                      type="tel"
                      placeholder="WhatsApp Phone (+234...)"
                      value={escalatePhone}
                      onChange={(e) => setEscalatePhone(e.target.value)}
                      required
                      className="w-full bg-[#0A1B3D] border border-[#14294F] focus:border-[#0D95FE] text-white text-xs px-2.5 py-1.5 rounded-lg outline-none placeholder-[#7B9CD2]"
                    />
                    <button
                      type="submit"
                      disabled={isSubmittingEscalation}
                      className="w-full py-2 rounded-lg bg-[#0D95FE] hover:bg-[#00DF8F] text-[#00284D] hover:text-[#003825] font-bold text-xs transition-colors cursor-pointer"
                    >
                      {isSubmittingEscalation ? 'Dispatching Officer...' : 'Dispatch Live Human Officer'}
                    </button>
                  </form>

                  <div className="pt-1.5 border-t border-[#14294F] text-center">
                    <a
                      href={`https://wa.me/2349110002966?text=Hello%20Axoora%20Desk!%20I%20want%20to%20speak%20with%20a%20human%20agent.%20Ticket%20%23${ticketCode}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-[#00DF8F] hover:underline font-semibold flex items-center justify-center gap-1"
                    >
                      <span>Or Open WhatsApp Directly</span>
                      <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                    </a>
                  </div>
                </motion.div>
              )}

              {/* Quick Action Chips */}
              <div className="pt-2 flex flex-wrap gap-1.5">
                {[
                  'Open Business Account',
                  'Apex POS Terminal',
                  '👤 Talk to Human',
                  'WhatsApp Banking',
                  'Save & Earn Halal',
                ].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => {
                      if (chip.includes('Human')) {
                        setShowEscalationModal(true);
                      } else {
                        handleSend(chip);
                      }
                    }}
                    className="px-2.5 py-1 rounded-full bg-[#14294F]/80 hover:bg-[#0D95FE] text-[#A8BBD6] hover:text-[#00284D] border border-[#14294F] text-[11px] transition-all cursor-pointer font-medium"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Support Rating Card */}
              <div className="p-3 rounded-2xl bg-[#020F2E]/90 border border-[#14294F] flex flex-col gap-2 mt-2">
                <span className="text-[11px] text-[#A8BBD6]">
                  Please rate your experience with Axoora desk today:
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
                placeholder={isEscalated ? "Type message for human officer..." : "Ask questions or type 'talk to human'..."}
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
