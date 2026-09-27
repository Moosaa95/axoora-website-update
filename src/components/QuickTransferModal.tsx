import React, { useState } from 'react';
import { NIGERIAN_BANKS } from '../data/mockData';
import { BankAccount, Transaction } from '../types';

interface QuickTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: BankAccount;
  onSuccessTransfer: (newTx: Transaction, amount: number) => void;
}

export const QuickTransferModal: React.FC<QuickTransferModalProps> = ({
  isOpen,
  onClose,
  account,
  onSuccessTransfer,
}) => {
  const [bankCode, setBankCode] = useState(NIGERIAN_BANKS[1].code); // Access Bank
  const [nuban, setNuban] = useState('0128941029');
  const [recipientName, setRecipientName] = useState('CHIDINMA OKAFOR');
  const [isVerifying, setIsVerifying] = useState(false);
  const [amount, setAmount] = useState('5000');
  const [memo, setMemo] = useState('Market Float / Transport');
  const [pin, setPin] = useState('');
  const [status, setStatus] = useState<'form' | 'processing' | 'done'>('form');

  if (!isOpen) return null;

  const handleNubanChange = (val: string) => {
    setNuban(val);
    if (val.length === 10) {
      setIsVerifying(true);
      setTimeout(() => {
        setIsVerifying(false);
        setRecipientName('CHIDINMA OKAFOR (VERIFIED)');
      }, 400);
    } else {
      setRecipientName('');
    }
  };

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = Number(amount);
    if (numAmount <= 0 || numAmount > account.balance) {
      alert('Insufficient liquid vault funds');
      return;
    }

    setStatus('processing');
    setTimeout(() => {
      const selectedBank = NIGERIAN_BANKS.find((b) => b.code === bankCode)?.name || 'Commercial Bank';
      const newTx: Transaction = {
        id: `tx_${Date.now()}`,
        type: 'outflow',
        amount: numAmount,
        recipient: recipientName || 'Recipient',
        bank: selectedBank,
        accountNumber: nuban,
        category: memo || 'Instant Transfer',
        timestamp: 'Just now',
        status: 'SETTLED',
        nipRef: `NIP-${Date.now().toString().slice(-8)}`,
        fee: 0,
      };

      onSuccessTransfer(newTx, numAmount);
      setStatus('done');
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#01091C]/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0A1B3D] border border-[#14294F] rounded-2xl max-w-lg w-full p-6 flex flex-col gap-5 shadow-2xl relative">
        <div className="flex items-center justify-between pb-3 border-b border-[#14294F]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00DF8F] animate-pulse"></span>
            <h3 className="text-lg font-bold text-[#F2F5F9]">Instant NIBSS (NIP) Interbank Transfer</h3>
          </div>
          <button onClick={onClose} className="text-[#A8BBD6] hover:text-[#F2F5F9]">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {status === 'form' && (
          <form onSubmit={handleTransfer} className="flex flex-col gap-4">
            <div className="p-3 rounded-xl bg-[#01091C] border border-[#14294F] flex items-center justify-between text-xs">
              <span className="text-[#A8BBD6]">Available Liquid Balance:</span>
              <span className="font-mono font-bold text-[#00DF8F] text-sm">
                ₦{account.balance.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
              </span>
            </div>

            {/* Destination Bank */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#A8BBD6]">Destination Bank</label>
              <select
                value={bankCode}
                onChange={(e) => setBankCode(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-[#01091C] border border-[#14294F] text-xs text-[#F2F5F9] focus:outline-none"
              >
                {NIGERIAN_BANKS.map((b) => (
                  <option key={b.code} value={b.code}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 10-Digit NUBAN */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#A8BBD6]">10-Digit NUBAN Account Number</label>
              <input
                type="text"
                maxLength={10}
                required
                value={nuban}
                onChange={(e) => handleNubanChange(e.target.value)}
                placeholder="e.g. 0128941029"
                className="px-3.5 py-2.5 rounded-xl bg-[#01091C] border border-[#14294F] font-mono text-sm text-[#F2F5F9] focus:outline-none focus:border-[#00DF8F]"
              />
              {isVerifying ? (
                <span className="text-[11px] text-[#0D95FE] font-mono">Querying NIBSS switch...</span>
              ) : recipientName ? (
                <span className="text-[11px] text-[#00DF8F] font-mono font-semibold">
                  ✓ {recipientName}
                </span>
              ) : null}
            </div>

            {/* Amount */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#A8BBD6]">Transfer Amount (₦)</label>
              <input
                type="number"
                min="100"
                max={account.balance}
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-[#01091C] border border-[#14294F] font-mono text-base font-bold text-[#F2F5F9] focus:outline-none focus:border-[#00DF8F]"
              />
              <div className="flex items-center gap-1.5 pt-1">
                {[5000, 10000, 25000, 50000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmount(amt.toString())}
                    className="px-2 py-0.5 rounded bg-[#14294F] hover:bg-[#0D95FE]/20 text-[11px] font-mono text-[#F2F5F9]"
                  >
                    ₦{amt.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Memo */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#A8BBD6]">Narration / Memo</label>
              <input
                type="text"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="e.g. Fuel / Market supplies"
                className="px-3.5 py-2 rounded-xl bg-[#01091C] border border-[#14294F] text-xs text-[#F2F5F9] focus:outline-none"
              />
            </div>

            {/* Security PIN */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#A8BBD6]">4-Digit Transaction PIN</label>
              <input
                type="password"
                maxLength={4}
                required
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••"
                className="px-3.5 py-2 rounded-xl bg-[#01091C] border border-[#14294F] font-mono text-center tracking-widest text-base text-[#F2F5F9] focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between text-xs font-mono pt-1 text-[#00DF8F]">
              <span>Transfer Fee: ₦0.00 (Zero Fee)</span>
              <span>Clearing: Instant 0.84s</span>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#00DF8F] hover:bg-emerald-400 text-[#003825] font-bold text-sm flex items-center justify-center gap-2 transition-all mt-1"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              <span>Authorize &amp; Dispatch NIP Transfer</span>
            </button>
          </form>
        )}

        {status === 'processing' && (
          <div className="py-12 flex flex-col items-center justify-center gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-[#0D95FE]/20 border-2 border-[#0D95FE] flex items-center justify-center text-[#0D95FE] animate-spin">
              <span className="material-symbols-outlined text-[32px]">sync</span>
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#F2F5F9]">Broadcasting to NIBSS Switch</h4>
              <p className="text-xs text-[#A8BBD6] mt-1 font-mono">
                Executing double-entry cryptographic clearance...
              </p>
            </div>
          </div>
        )}

        {status === 'done' && (
          <div className="py-8 flex flex-col items-center justify-center gap-4 text-center animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#00DF8F]/20 border-2 border-[#00DF8F] flex items-center justify-center text-[#00DF8F]">
              <span className="material-symbols-outlined text-[36px]">check</span>
            </div>
            <div>
              <h4 className="text-xl font-bold text-[#F2F5F9]">Transfer Settled Successfully!</h4>
              <p className="text-sm font-mono text-[#00DF8F] mt-1 font-bold">
                ₦{Number(amount).toLocaleString()}.00 Dispatched
              </p>
              <p className="text-xs text-[#A8BBD6] mt-1">
                Recipient: {recipientName} • Session: NIP-TX-{Date.now().toString().slice(-8)}
              </p>
            </div>
            <button
              onClick={() => {
                setStatus('form');
                onClose();
              }}
              className="mt-2 px-6 py-2.5 rounded-xl bg-[#0D95FE] text-[#00325b] font-bold text-sm"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
