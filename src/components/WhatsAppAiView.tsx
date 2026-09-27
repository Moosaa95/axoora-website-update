import React, { useState } from 'react';
import { ChatMessage, BankAccount } from '../types';

interface WhatsAppAiViewProps {
  account: BankAccount;
  onOpenTransfer: () => void;
}

export const WhatsAppAiView: React.FC<WhatsAppAiViewProps> = ({ account, onOpenTransfer }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'user',
      text: 'Abeeg send ₦5,000 to Chidinma for fuel',
      timestamp: '14:32',
      status: 'read',
    },
    {
      id: 'm2',
      sender: 'ai',
      text: 'Payment intent parsed: ₦5,000.00 to Chidinma Okafor (Access Bank • 0128941029).',
      timestamp: '14:32',
      cardPayload: {
        type: 'TRANSFER_CONFIRM',
        title: 'NIP Instant Transfer',
        amount: 5000,
        recipient: 'Chidinma Okafor',
        bank: 'Access Bank Plc',
        accountNumber: '0128941029',
        fee: 0,
        approved: true,
      },
    },
    {
      id: 'm3',
      sender: 'user',
      text: 'Load 10GB MTN data to 08034910283',
      timestamp: '14:35',
      status: 'read',
    },
    {
      id: 'm4',
      sender: 'ai',
      text: 'VTU Recharge intent detected for 08034910283.',
      timestamp: '14:35',
      cardPayload: {
        type: 'VTU_CONFIRM',
        title: 'MTN 10GB Monthly Data Bundle',
        amount: 3000,
        recipient: '08034910283 (Shop SIM)',
        biller: 'MTN Nigeria VTU',
        fee: 0,
        approved: false,
      },
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTelemetryTab, setActiveTelemetryTab] = useState<'hsm' | 'rag' | 'intent'>('rag');

  const presetPrompts = [
    { label: '🗣️ Pidgin: Send ₦15k for market goods', text: 'Abeeg disburse ₦15,000 to Mama Nkechi for market tomatoes' },
    { label: '⚡ Buy ₦2,000 Airtel Airtime', text: 'Buy ₦2,000 Airtel airtime for this line' },
    { label: '📺 Pay DStv Compact Renewal', text: 'Pay my DStv Compact subscription for smartcard 1049281092' },
    { label: '💰 Check Vault Yield Balance', text: 'What is my current street vault balance and daily interest?' },
    { label: '⏰ Schedule Daily Payout', text: 'Every morning send ₦10,000 float to Musa at 8am' },
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'read',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsProcessing(true);

    setTimeout(() => {
      let aiResponse: ChatMessage;

      if (text.toLowerCase().includes('balance') || text.toLowerCase().includes('vault')) {
        aiResponse = {
          id: `ai_${Date.now()}`,
          sender: 'ai',
          text: `Your Axoora Street Vault balance is ₦${account.balance.toLocaleString('en-NG', { minimumFractionDigits: 2 })} yielding 15.5% APY compounding every midnight.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          cardPayload: {
            type: 'BALANCE_CARD',
            title: 'Liquid Vault Summary',
            amount: account.balance,
            fee: 0,
            approved: true,
          },
        };
      } else if (text.toLowerCase().includes('airtime') || text.toLowerCase().includes('data')) {
        aiResponse = {
          id: `ai_${Date.now()}`,
          sender: 'ai',
          text: 'Parsed Telco VTU Request. Zero network surcharge applied.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          cardPayload: {
            type: 'VTU_CONFIRM',
            title: 'VTU Telco Recharge',
            amount: 2000,
            recipient: '08034910283',
            biller: 'Airtel Nigeria Direct Rail',
            fee: 0,
            approved: false,
          },
        };
      } else if (text.toLowerCase().includes('dstv') || text.toLowerCase().includes('bill')) {
        aiResponse = {
          id: `ai_${Date.now()}`,
          sender: 'ai',
          text: 'MultiChoice subscription bill parsed. Instant signal restoration.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          cardPayload: {
            type: 'UTILITY_CONFIRM',
            title: 'DStv Compact Bouquet',
            amount: 15700,
            recipient: 'Smartcard 1049281092',
            biller: 'MultiChoice Nigeria',
            fee: 0,
            approved: false,
          },
        };
      } else if (text.toLowerCase().includes('schedule')) {
        aiResponse = {
          id: `ai_${Date.now()}`,
          sender: 'ai',
          text: 'Standing recurring rule staged. Dispatched daily at 08:00 AM.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          cardPayload: {
            type: 'SCHEDULED_CONFIRM',
            title: 'Recurring Standing Order #902',
            amount: 10000,
            recipient: 'Musa Aliyu (Zenith Bank)',
            fee: 0,
            approved: true,
          },
        };
      } else {
        aiResponse = {
          id: `ai_${Date.now()}`,
          sender: 'ai',
          text: `Payment intent recognized. Direct NIBSS instant settlement ready.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          cardPayload: {
            type: 'TRANSFER_CONFIRM',
            title: 'NIP Instant Interbank Dispatch',
            amount: 15000,
            recipient: 'Mama Nkechi Provisions',
            bank: 'Zenith Bank Plc',
            accountNumber: '1029481920',
            fee: 0,
            approved: false,
          },
        };
      }

      setMessages((prev) => [...prev, aiResponse]);
      setIsProcessing(false);
    }, 700);
  };

  const handleApproveCard = (cardId: string) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id === cardId && m.cardPayload) {
          return {
            ...m,
            cardPayload: {
              ...m.cardPayload,
              approved: true,
            },
          };
        }
        return m;
      })
    );
  };

  return (
    <div className="w-full px-4 sm:px-8 py-8 sm:py-12 max-w-7xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#14294F]">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#00DF8F] uppercase font-semibold">
              META ENTERPRISE CLOUD • ZERO-APP SOVEREIGN BANKING
            </span>
            <span className="px-2 py-0.5 rounded bg-[#00DF8F]/20 text-[#00DF8F] font-mono text-[10px] font-bold">
              0.84s RAG CORE
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#F2F5F9]">
            WhatsApp AI Banking Copilot
          </h1>
          <p className="text-sm sm:text-base text-[#A8BBD6]">
            Natural Pidgin, Yorùbá, Hausa, and Igbo intent understanding connected directly to central bank
            clearing rails with biometric PIN approval.
          </p>
        </div>

        <button
          onClick={onOpenTransfer}
          className="px-4 py-2.5 rounded-xl bg-[#0D95FE] text-[#00325b] font-bold text-sm hover:bg-[#00DF8F] hover:text-[#003825] transition-all flex items-center gap-1.5 self-start md:self-auto"
        >
          <span className="material-symbols-outlined text-[18px]">send</span>
          <span>Web Transfer Portal</span>
        </button>
      </div>

      {/* Preset chips for fast testing */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-[#A8BBD6] font-mono">Test Prompts:</span>
        {presetPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p.text)}
            className="px-3 py-1.5 rounded-lg bg-[#0A1B3D] border border-[#14294F] text-xs text-[#F2F5F9] hover:border-[#00DF8F] hover:text-[#00DF8F] transition-all font-medium"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Main split: WhatsApp Chat on Left, RAG & Security Telemetry on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: WhatsApp Window */}
        <div className="lg:col-span-7 bg-[#0A1B3D] rounded-2xl border border-[#14294F] overflow-hidden flex flex-col min-h-[580px] shadow-2xl">
          {/* WhatsApp Header */}
          <div className="px-5 py-3.5 bg-[#005c4b] text-white flex items-center justify-between border-b border-[#14294F]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0D95FE] flex items-center justify-center text-white font-bold">
                <span className="material-symbols-outlined text-[22px]">smart_toy</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-base">Axoora AI Copilot</span>
                  <span className="material-symbols-outlined text-[#00DF8F] text-[18px]">verified</span>
                </div>
                <span className="text-[11px] text-teal-200">
                  CBN PSSP License 2024 • Verified Meta Business Account
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-teal-200">
              <span className="material-symbols-outlined text-[20px] cursor-pointer">videocam</span>
              <span className="material-symbols-outlined text-[20px] cursor-pointer">call</span>
              <span className="material-symbols-outlined text-[20px] cursor-pointer">more_vert</span>
            </div>
          </div>

          {/* Chat Stream */}
          <div className="p-4 flex-1 flex flex-col gap-3 overflow-y-auto bg-[#020F2E]/60">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col max-w-[90%] sm:max-w-[80%] ${
                  m.sender === 'user' ? 'self-end' : 'self-start'
                }`}
              >
                {/* Bubble */}
                <div
                  className={`p-3.5 rounded-2xl text-sm flex flex-col gap-2 ${
                    m.sender === 'user'
                      ? 'bg-[#005c4b] text-white rounded-tr-none'
                      : 'bg-[#14294F] text-[#F2F5F9] border border-[#14294F] rounded-tl-none'
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>

                  {/* Card Payload if present */}
                  {m.cardPayload && (
                    <div className="p-3 rounded-xl bg-[#0A1B3D] border border-[#14294F] flex flex-col gap-2 mt-1">
                      <div className="flex items-center justify-between text-xs pb-1 border-b border-[#14294F]">
                        <span className="font-mono text-[#0D95FE] font-bold">{m.cardPayload.title}</span>
                        <span className="text-[#00DF8F] font-mono text-[11px]">NIP DIRECT</span>
                      </div>

                      {m.cardPayload.recipient && (
                        <div className="flex justify-between text-xs text-[#A8BBD6]">
                          <span>Recipient:</span>
                          <span className="font-semibold text-[#F2F5F9]">{m.cardPayload.recipient}</span>
                        </div>
                      )}

                      {m.cardPayload.bank && (
                        <div className="flex justify-between text-xs text-[#A8BBD6]">
                          <span>Destination:</span>
                          <span className="text-[#F2F5F9]">{m.cardPayload.bank}</span>
                        </div>
                      )}

                      {m.cardPayload.amount !== undefined && (
                        <div className="flex justify-between text-xs text-[#A8BBD6]">
                          <span>Disbursement:</span>
                          <span className="font-mono font-bold text-[#00DF8F] text-sm">
                            ₦{m.cardPayload.amount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      )}

                      {/* Action button */}
                      <button
                        onClick={() => handleApproveCard(m.id)}
                        disabled={m.cardPayload.approved}
                        className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all mt-1 ${
                          m.cardPayload.approved
                            ? 'bg-[#0D95FE] text-[#00325b]'
                            : 'bg-[#00DF8F] text-[#003825] hover:brightness-110'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {m.cardPayload.approved ? 'check_circle' : 'fingerprint'}
                        </span>
                        <span>
                          {m.cardPayload.approved
                            ? '✓ Settled: NIP-TX-849102'
                            : 'Approve with Touch ID / PIN'}
                        </span>
                      </button>
                    </div>
                  )}

                  <div className="self-end flex items-center gap-1 text-[10px] text-[#A8BBD6]">
                    <span>{m.timestamp}</span>
                    {m.sender === 'user' && (
                      <span className="material-symbols-outlined text-[12px] text-teal-200">done_all</span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isProcessing && (
              <div className="self-start p-3 rounded-2xl bg-[#14294F] text-xs text-[#00DF8F] flex items-center gap-2 font-mono">
                <span className="material-symbols-outlined text-[16px] animate-spin">refresh</span>
                <span>Axoora fine-tuned RAG parsing financial intent...</span>
              </div>
            )}
          </div>

          {/* WhatsApp Input Bar */}
          <div className="p-3 bg-[#0A1B3D] border-t border-[#14294F] flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Message or voice in Pidgin, Yorùbá, Hausa..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#01091C] border border-[#14294F] text-xs text-[#F2F5F9] focus:outline-none focus:border-[#00DF8F]"
            />
            <button
              onClick={() => handleSend()}
              className="w-10 h-10 rounded-xl bg-[#00DF8F] flex items-center justify-center text-[#003825] hover:brightness-110"
              title="Send message"
            >
              <span className="material-symbols-outlined text-[20px]">send</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: RAG & HSM Ledger Inspector */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="p-1 rounded-xl bg-[#0A1B3D] border border-[#14294F] flex items-center">
            <button
              onClick={() => setActiveTelemetryTab('rag')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTelemetryTab === 'rag'
                  ? 'bg-[#14294F] text-[#00DF8F]'
                  : 'text-[#A8BBD6] hover:text-[#F2F5F9]'
              }`}
            >
              RAG Guardrails
            </button>
            <button
              onClick={() => setActiveTelemetryTab('hsm')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTelemetryTab === 'hsm'
                  ? 'bg-[#14294F] text-[#0D95FE]'
                  : 'text-[#A8BBD6] hover:text-[#F2F5F9]'
              }`}
            >
              HSM Ledger JSON
            </button>
            <button
              onClick={() => setActiveTelemetryTab('intent')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTelemetryTab === 'intent'
                  ? 'bg-[#14294F] text-[#F2A93B]'
                  : 'text-[#A8BBD6] hover:text-[#F2F5F9]'
              }`}
            >
              Language NLP
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-[#0A1B3D] border border-[#14294F] flex flex-col gap-4">
            {activeTelemetryTab === 'rag' && (
              <div className="flex flex-col gap-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#14294F]">
                  <span className="font-mono text-[#00DF8F] font-bold">RAG_GUARDRAILS_ACTIVE</span>
                  <span className="font-mono text-[#A8BBD6]">PASS (0.84s)</span>
                </div>
                <div className="p-3 rounded-lg bg-[#01091C] border border-[#14294F] flex flex-col gap-1">
                  <span className="text-[#A8BBD6] font-mono text-[11px]">Prompt Sanitizer:</span>
                  <span className="text-[#00DF8F] font-semibold">Zero Prompt Injection Detected</span>
                </div>
                <div className="p-3 rounded-lg bg-[#01091C] border border-[#14294F] flex flex-col gap-1">
                  <span className="text-[#A8BBD6] font-mono text-[11px]">NIBSS Resolution:</span>
                  <span className="text-[#F2F5F9]">Access Bank NUBAN 0128941029 [Chidinma Okafor]</span>
                </div>
                <div className="p-3 rounded-lg bg-[#01091C] border border-[#14294F] flex flex-col gap-1">
                  <span className="text-[#A8BBD6] font-mono text-[11px]">Double-Entry Invariant:</span>
                  <span className="text-[#0D95FE] font-mono">Debit: Merchant_Vault | Credit: NIBSS_Float</span>
                </div>
              </div>
            )}

            {activeTelemetryTab === 'hsm' && (
              <div className="flex flex-col gap-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#14294F]">
                  <span className="text-[#0D95FE] font-bold">HARDWARE_SECURITY_MODULE</span>
                  <span className="text-[#00DF8F]">SIGNED</span>
                </div>
                <pre className="p-3 rounded-lg bg-[#01091C] border border-[#14294F] text-[#F2F5F9] leading-snug overflow-x-auto text-[11px]">
                  <code>{`{
  "hsm_timestamp": "${new Date().toISOString()}",
  "algorithm": "ECDSA_SECP256K1",
  "key_version": "v3.1.8-FIPS-140-2",
  "nip_rail": "WEMA_PRIMARY_DIRECT",
  "sha256_root": "0x78ab...901f",
  "cbn_compliance_tag": "PSSP_APPROVED"
}`}</code>
                </pre>
              </div>
            )}

            {activeTelemetryTab === 'intent' && (
              <div className="flex flex-col gap-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#14294F]">
                  <span className="font-mono text-[#F2A93B] font-bold">NIGERIAN_PIDGIN_MODEL</span>
                  <span className="font-mono text-[#00DF8F]">99.4% CONFIDENCE</span>
                </div>
                <p className="text-[#A8BBD6]">
                  Trained on 4.5M colloquial expressions from market centers across Lagos, Kano, Onitsha, and Abuja.
                </p>
                <div className="space-y-1.5 font-mono text-[11px]">
                  <div className="p-2 rounded bg-[#01091C] border border-[#14294F] flex justify-between">
                    <span className="text-[#A8BBD6]">"Abeeg send..."</span>
                    <span className="text-[#00DF8F]">→ DISBURSE_IMMEDIATE</span>
                  </div>
                  <div className="p-2 rounded bg-[#01091C] border border-[#14294F] flex justify-between">
                    <span className="text-[#A8BBD6]">"Dash am..."</span>
                    <span className="text-[#00DF8F]">→ GIFT_TRANSFER</span>
                  </div>
                  <div className="p-2 rounded bg-[#01091C] border border-[#14294F] flex justify-between">
                    <span className="text-[#A8BBD6]">"Put data..."</span>
                    <span className="text-[#00DF8F]">→ VTU_DATA_RECHARGE</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
