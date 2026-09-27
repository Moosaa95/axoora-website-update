import React, { useState } from 'react';
import { BankAccount, Transaction } from '../types';

interface BusinessTreasuryViewProps {
  account: BankAccount;
  transactions: Transaction[];
  onOpenTransfer: () => void;
  onOpenOnboarding: () => void;
}

export const BusinessTreasuryView: React.FC<BusinessTreasuryViewProps> = ({
  account,
  transactions,
  onOpenTransfer,
  onOpenOnboarding,
}) => {
  const [subWallets, setSubWallets] = useState([
    { id: 'sw_1', name: 'Operational & POS Float', balance: 284150.00, tag: 'HIGH_LIQUIDITY', color: '#0D95FE' },
    { id: 'sw_2', name: 'VAT & Tax Compliance Reserve', balance: 84200.00, tag: 'LOCKED_RESERVE', color: '#F2A93B' },
    { id: 'sw_3', name: 'Staff Weekly Payroll', balance: 95000.00, tag: 'DISBURSEMENT_READY', color: '#00DF8F' },
    { id: 'sw_4', name: 'Supplier Emergency Float', balance: 19100.80, tag: 'AUTO_SWEEP_15.5%', color: '#34C08D' },
  ]);

  const [bulkStatus, setBulkStatus] = useState<'idle' | 'processing' | 'completed'>('idle');
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const bulkSuppliers = [
    { name: 'Balogun Textile Imports', bank: 'Zenith Bank', account: '1028491028', amount: 85000 },
    { name: 'Kano Leather Distributors', bank: 'Access Bank', account: '0129481022', amount: 45000 },
    { name: 'Alaba Electronic Spares', bank: 'Wema Bank', account: '0284910291', amount: 120000 },
    { name: 'Oshodi Packaging Co.', bank: 'First Bank', account: '2019481029', amount: 28000 },
    { name: 'Ibadan Logistics Express', bank: 'GTBank', account: '0192841029', amount: 35000 },
  ];

  const totalBulkAmount = bulkSuppliers.reduce((acc, curr) => acc + curr.amount, 0);

  const handleRunBulkPayout = () => {
    setBulkStatus('processing');
    setTimeout(() => {
      setBulkStatus('completed');
    }, 1200);
  };

  const handleCopy = (acc: string) => {
    navigator.clipboard?.writeText?.(acc);
    setCopiedAccount(acc);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  return (
    <div className="w-full px-4 sm:px-8 py-8 sm:py-12 max-w-7xl mx-auto flex flex-col gap-8">
      {/* Header telemetry */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#14294F]">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#0D95FE] uppercase font-semibold">
              ENTERPRISE TREASURY &amp; SETTLEMENT RAILS
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#00DF8F]/10 text-[#00DF8F] font-mono text-[10px] font-bold border border-[#00DF8F]">
              NIP CLEARING ACTIVE
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#F2F5F9]">
            Merchant Multi-Branch Treasury
          </h1>
          <p className="text-sm sm:text-base text-[#A8BBD6]">
            Dedicated virtual NUBAN accounts, sub-wallet automation, zero-fee supplier payouts, and
            auto-sweep daily yield at 15.5% APY.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenTransfer}
            className="px-4 py-2.5 rounded-xl bg-[#0D95FE] text-[#00325b] font-bold text-sm hover:bg-[#00DF8F] hover:text-[#003825] transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
            <span>Single Payout</span>
          </button>
          <button
            onClick={onOpenOnboarding}
            className="px-4 py-2.5 rounded-xl bg-[#0A1B3D] border border-[#14294F] text-[#F2F5F9] font-medium text-sm hover:bg-[#14294F] transition-all"
          >
            Add Branch Account
          </button>
        </div>
      </div>

      {/* Account Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#0A1B3D] border border-[#14294F] flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#A8BBD6] uppercase font-mono">Zenith Corporate NUBAN</span>
            <span className="px-2 py-0.5 rounded bg-[#14294F] text-[#00DF8F] font-mono text-[10px]">PRIMARY RAIL</span>
          </div>
          <div>
            <div className="font-mono text-2xl font-bold text-[#F2F5F9]">1029 481 029</div>
            <span className="text-xs text-[#A8BBD6]">Axoora / Adebayo Trading Enterprise</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-[#14294F] text-xs">
            <span className="text-[#00DF8F]">Instant NIBSS Webhook</span>
            <button
              onClick={() => handleCopy('1029481029')}
              className="text-[#0D95FE] font-medium hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">
                {copiedAccount === '1029481029' ? 'check' : 'content_copy'}
              </span>
              <span>{copiedAccount === '1029481029' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#0A1B3D] border border-[#14294F] flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#A8BBD6] uppercase font-mono">Wema Merchant NUBAN</span>
            <span className="px-2 py-0.5 rounded bg-[#14294F] text-[#0D95FE] font-mono text-[10px]">15.5% AUTO-SWEEP</span>
          </div>
          <div>
            <div className="font-mono text-2xl font-bold text-[#F2F5F9]">{account.accountNumber}</div>
            <span className="text-xs text-[#A8BBD6]">{account.accountName}</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-[#14294F] text-xs">
            <span className="text-[#0D95FE]">Midnight Interest Payout</span>
            <button
              onClick={() => handleCopy(account.accountNumber)}
              className="text-[#0D95FE] font-medium hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">
                {copiedAccount === account.accountNumber ? 'check' : 'content_copy'}
              </span>
              <span>{copiedAccount === account.accountNumber ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#0A1B3D] border border-[#14294F] flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#A8BBD6] uppercase font-mono">Access Commercial NUBAN</span>
            <span className="px-2 py-0.5 rounded bg-[#14294F] text-[#F2A93B] font-mono text-[10px]">REDUNDANCY RAIL</span>
          </div>
          <div>
            <div className="font-mono text-2xl font-bold text-[#F2F5F9]">0128 941 029</div>
            <span className="text-xs text-[#A8BBD6]">Axoora / POS Settlement Float</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-[#14294F] text-xs">
            <span className="text-[#F2A93B]">Zero-Drop Failover SLA</span>
            <button
              onClick={() => handleCopy('0128941029')}
              className="text-[#0D95FE] font-medium hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">
                {copiedAccount === '0128941029' ? 'check' : 'content_copy'}
              </span>
              <span>{copiedAccount === '0128941029' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub-Wallets Management Strip */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-[#F2F5F9]">Isolated Sub-Wallets &amp; Split Rules</h3>
            <p className="text-xs text-[#A8BBD6]">
              Keep tax, payroll, and supplier reserves strictly separated with automated daily allocation.
            </p>
          </div>
          <span className="text-xs font-mono text-[#00DF8F]">TOTAL LIQUID: ₦{account.balance.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {subWallets.map((sw) => (
            <div key={sw.id} className="p-4 rounded-xl bg-[#0A1B3D] border border-[#14294F] flex flex-col justify-between gap-3">
              <div className="flex items-center justify-between">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: sw.color }}></span>
                <span className="font-mono text-[10px] text-[#A8BBD6] bg-[#14294F] px-2 py-0.5 rounded">
                  {sw.tag}
                </span>
              </div>
              <div>
                <span className="text-xs text-[#A8BBD6] block">{sw.name}</span>
                <span className="text-xl font-bold font-mono text-[#F2F5F9] tabular-nums">
                  ₦{sw.balance.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs pt-2 border-t border-[#14294F]/40">
                <span className="text-[#A8BBD6]">Auto 25% Inflow</span>
                <button
                  onClick={() => alert(`Fund transfer initiated to ${sw.name}`)}
                  className="text-[#0D95FE] hover:underline font-semibold"
                >
                  Adjust Split
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bulk Instant Supplier Disbursement Tool */}
      <div className="p-6 rounded-2xl bg-[#0A1B3D] border-2 border-[#0D95FE]/30 flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#0D95FE] font-bold">BATCH NIP DISPATCHER</span>
              <span className="px-2 py-0.5 rounded bg-[#00DF8F]/20 text-[#00DF8F] font-mono text-[10px]">
                ZERO TRANSFER FEES
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#F2F5F9]">Instant Bulk Supplier Payout Runner</h3>
            <p className="text-xs text-[#A8BBD6]">
              Pay multiple wholesale vendors, distributors, and logistics partners in a single sub-second atomic transaction.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col text-right">
              <span className="text-xs text-[#A8BBD6]">Batch Total (5 Recipients)</span>
              <span className="text-xl font-bold font-mono text-[#00DF8F]">
                ₦{totalBulkAmount.toLocaleString()}.00
              </span>
            </div>
            <button
              onClick={handleRunBulkPayout}
              disabled={bulkStatus === 'processing'}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
                bulkStatus === 'completed'
                  ? 'bg-[#00DF8F] text-[#003825]'
                  : 'bg-[#0D95FE] hover:bg-[#0B7FD6] text-[#00325b]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {bulkStatus === 'processing'
                  ? 'hourglass_empty'
                  : bulkStatus === 'completed'
                  ? 'check_circle'
                  : 'play_arrow'}
              </span>
              <span>
                {bulkStatus === 'processing'
                  ? 'Clearing NIBSS Rails...'
                  : bulkStatus === 'completed'
                  ? 'Batch Settled (5/5)'
                  : 'Execute Batch Payout'}
              </span>
            </button>
          </div>
        </div>

        {/* Recipients Table */}
        <div className="overflow-x-auto rounded-xl border border-[#14294F] bg-[#01091C]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#14294F] text-[#A8BBD6] font-mono uppercase">
              <tr>
                <th className="py-2.5 px-4">Vendor Name</th>
                <th className="py-2.5 px-4">Bank</th>
                <th className="py-2.5 px-4">Account Number</th>
                <th className="py-2.5 px-4 text-right">Amount (₦)</th>
                <th className="py-2.5 px-4 text-center">Transfer Fee</th>
                <th className="py-2.5 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#14294F] text-[#F2F5F9]">
              {bulkSuppliers.map((s, idx) => (
                <tr key={idx} className="hover:bg-[#0A1B3D]/50 transition-colors">
                  <td className="py-3 px-4 font-semibold">{s.name}</td>
                  <td className="py-3 px-4 text-[#A8BBD6]">{s.bank}</td>
                  <td className="py-3 px-4 font-mono text-[#A8BBD6]">{s.account}</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-[#F2F5F9]">
                    ₦{s.amount.toLocaleString()}.00
                  </td>
                  <td className="py-3 px-4 text-center text-[#00DF8F] font-mono font-bold">₦0.00</td>
                  <td className="py-3 px-4 text-right">
                    {bulkStatus === 'completed' ? (
                      <span className="inline-flex items-center gap-1 text-[#00DF8F] font-mono">
                        <span className="material-symbols-outlined text-[14px]">check</span> Settled (0.84s)
                      </span>
                    ) : (
                      <span className="text-[#A8BBD6] font-mono">Queued</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Real-time Ledger */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-[#F2F5F9]">Live Settlement Ledger</h3>
          <span className="text-xs font-mono text-[#A8BBD6]">Updated 1s ago via NIBSS API</span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#14294F] bg-[#0A1B3D]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#14294F] text-[#A8BBD6] font-mono uppercase">
              <tr>
                <th className="py-3 px-4">Transaction / Memo</th>
                <th className="py-3 px-4">Recipient / Sender</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">NIP Session Ref</th>
                <th className="py-3 px-4 text-right">Amount (₦)</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#14294F] text-[#F2F5F9]">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-[#14294F]/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-sm">{tx.category}</div>
                    <span className="text-[11px] text-[#A8BBD6]">{tx.bank}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-sm font-medium">{tx.recipient}</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#A8BBD6] font-mono">{tx.timestamp}</td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-[#0D95FE]">{tx.nipRef}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-sm">
                    <span className={tx.type === 'inflow' ? 'text-[#00DF8F]' : 'text-[#F2F5F9]'}>
                      {tx.type === 'inflow' ? '+' : '-'}₦{tx.amount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#00DF8F]/10 border border-[#00DF8F] text-[#00DF8F] font-mono text-[10px] font-bold">
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
