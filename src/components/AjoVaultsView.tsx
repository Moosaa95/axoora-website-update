import React, { useState } from 'react';
import { AjoGroup, BankAccount } from '../types';
import { MOCK_AJO_GROUPS } from '../data/mockData';

interface AjoVaultsViewProps {
  account: BankAccount;
  onOpenTransfer: () => void;
}

export const AjoVaultsView: React.FC<AjoVaultsViewProps> = ({ account }) => {
  const [groups, setGroups] = useState<AjoGroup[]>(MOCK_AJO_GROUPS);
  const [selectedGroup, setSelectedGroup] = useState<AjoGroup>(MOCK_AJO_GROUPS[0]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupAmount, setNewGroupAmount] = useState('50000');
  const [newGroupFreq, setNewGroupFreq] = useState<'Weekly' | 'Monthly'>('Weekly');

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;

    const newGroup: AjoGroup = {
      id: `ajo_${Date.now()}`,
      name: newGroupName,
      contributionAmount: Number(newGroupAmount),
      frequency: newGroupFreq,
      totalMembers: 10,
      currentTurn: 1,
      myTurn: 1,
      poolBalance: Number(newGroupAmount) * 10,
      startDate: new Date().toISOString().split('T')[0],
      status: 'ACTIVE',
      members: [
        { name: `${account.accountName} (You)`, position: 1, paid: true, avatar: 'AB' },
        { name: 'Kazeem Oladipo', position: 2, paid: true, avatar: 'KO' },
        { name: 'Ngozi Eze', position: 3, paid: true, avatar: 'NE' },
        { name: 'Emeka Nwosu', position: 4, paid: true, avatar: 'EN' },
      ],
    };

    setGroups((prev) => [newGroup, ...prev]);
    setSelectedGroup(newGroup);
    setShowCreateModal(false);
    setNewGroupName('');
  };

  return (
    <div className="w-full px-4 sm:px-8 py-8 sm:py-12 max-w-7xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#14294F]">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#00DF8F] uppercase font-semibold">
              ROTATIONAL CREDIT &amp; COMMUNAL ESUSU POOLS
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#00DF8F]/10 text-[#00DF8F] font-mono text-[10px] font-bold border border-[#00DF8F]">
              NDIC CUSTODY PROTECTED
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#F2F5F9]">
            Ajo Smart Rotational Vaults
          </h1>
          <p className="text-sm sm:text-base text-[#A8BBD6]">
            Traditional Nigerian market thrift savings (Ajo / Esusu / Adashe) automated on cryptographic smart escrow
            with zero defaulter risk.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-2.5 rounded-xl bg-[#00DF8F] hover:bg-emerald-400 text-[#003825] font-bold text-sm transition-all flex items-center gap-1.5 self-start md:self-auto"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          <span>Start New Ajo Circle</span>
        </button>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Circles list */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-[#F2F5F9]">Your Active Circles</h3>
            <span className="text-xs font-mono text-[#A8BBD6]">{groups.length} Circles Active</span>
          </div>

          <div className="flex flex-col gap-3">
            {groups.map((g) => {
              const isSelected = selectedGroup.id === g.id;
              return (
                <div
                  key={g.id}
                  onClick={() => setSelectedGroup(g)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col gap-3 ${
                    isSelected
                      ? 'bg-[#14294F] border-[#00DF8F]'
                      : 'bg-[#0A1B3D] border-[#14294F] hover:border-[#A8BBD6]/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#F2F5F9]">{g.name}</span>
                    <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-[#01091C] text-[#00DF8F]">
                      {g.frequency}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#A8BBD6]">Contribution:</span>
                    <span className="text-[#F2F5F9] font-bold">₦{g.contributionAmount.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#A8BBD6]">
                      Turn: <strong className="text-[#0D95FE]">#{g.currentTurn}</strong> of {g.totalMembers}
                    </span>
                    <span className="text-[#00DF8F] font-mono font-semibold">
                      Your Turn: #{g.myTurn}
                    </span>
                  </div>

                  <div className="w-full bg-[#01091C] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#0D95FE] to-[#00DF8F]"
                      style={{ width: `${(g.currentTurn / g.totalMembers) * 100}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Circle In-Depth Detail */}
        <div className="lg:col-span-7 bg-[#0A1B3D] border border-[#14294F] rounded-2xl p-6 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#14294F]">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#00DF8F]"></span>
                <span className="text-xs text-[#00DF8F] font-mono font-bold uppercase">
                  ESCROW GUARANTEED BY AXOORA
                </span>
              </div>
              <h2 className="text-2xl font-bold text-[#F2F5F9]">{selectedGroup.name}</h2>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-xs text-[#A8BBD6]">Current Cycle Pot</span>
              <span className="font-mono text-2xl font-bold text-[#00DF8F]">
                ₦{selectedGroup.poolBalance.toLocaleString()}.00
              </span>
            </div>
          </div>

          {/* Turn status banner */}
          <div className="p-4 rounded-xl bg-[#14294F] border border-[#00DF8F]/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#00DF8F]/20 flex items-center justify-center text-[#00DF8F]">
                <span className="material-symbols-outlined text-[24px]">verified</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-[#A8BBD6]">Next Rotational Draw</span>
                <span className="font-bold text-sm text-[#F2F5F9]">
                  {selectedGroup.currentTurn === selectedGroup.myTurn
                    ? '🎉 Your turn! Payout dispatches tomorrow morning at 08:00 AM'
                    : `Turn #${selectedGroup.currentTurn}: Payout collecting for Member #${selectedGroup.currentTurn}`}
                </span>
              </div>
            </div>
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#0A1B3D] text-[#00DF8F] font-bold">
              100% On-Track
            </span>
          </div>

          {/* Member Rotational Roster */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-[#F2F5F9]">Member Turn Roster &amp; Payment Status</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedGroup.members.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#01091C] border border-[#14294F] flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#14294F] flex items-center justify-center text-[#0D95FE] font-bold font-mono text-xs">
                      {m.avatar}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-[#F2F5F9]">{m.name}</span>
                      <span className="text-[11px] text-[#A8BBD6]">Turn Position: #{m.position}</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-[#00DF8F]/20 text-[#00DF8F]">
                    PAID
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Rules & Guarantee footer */}
          <div className="p-3 rounded-xl bg-[#01091C] border border-[#14294F] flex items-center justify-between text-xs text-[#A8BBD6]">
            <span>Automated Daily NIBSS Direct Debit: ₦{selectedGroup.contributionAmount.toLocaleString()}</span>
            <span className="text-[#00DF8F] font-mono">0% Default Risk</span>
          </div>
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-[#01091C]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A1B3D] border border-[#14294F] rounded-2xl max-w-md w-full p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#14294F]">
              <h3 className="text-lg font-bold text-[#F2F5F9]">Start an Ajo Savings Circle</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-[#A8BBD6] hover:text-[#F2F5F9]">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateGroup} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#A8BBD6]">Circle Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Yaba Market Provisions Circle"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  className="px-3.5 py-2 rounded-xl bg-[#01091C] border border-[#14294F] text-xs text-[#F2F5F9] focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#A8BBD6]">Contribution Amount (₦)</label>
                <input
                  type="number"
                  required
                  value={newGroupAmount}
                  onChange={(e) => setNewGroupAmount(e.target.value)}
                  className="px-3.5 py-2 rounded-xl bg-[#01091C] border border-[#14294F] text-xs text-[#F2F5F9] focus:outline-none font-mono"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#A8BBD6]">Rotational Frequency</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewGroupFreq('Weekly')}
                    className={`py-2 rounded-lg text-xs font-semibold ${
                      newGroupFreq === 'Weekly'
                        ? 'bg-[#00DF8F] text-[#003825]'
                        : 'bg-[#01091C] border border-[#14294F] text-[#F2F5F9]'
                    }`}
                  >
                    Weekly
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewGroupFreq('Monthly')}
                    className={`py-2 rounded-lg text-xs font-semibold ${
                      newGroupFreq === 'Monthly'
                        ? 'bg-[#00DF8F] text-[#003825]'
                        : 'bg-[#01091C] border border-[#14294F] text-[#F2F5F9]'
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#00DF8F] text-[#003825] font-bold text-sm hover:brightness-110"
                >
                  Create &amp; Generate Invite Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
