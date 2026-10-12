'use client';

import React, { useState, useMemo } from 'react';
import { AdminLeadItem, useCms } from '../context/CmsContext';

interface WaitlistDataTableProps {
  onShowToast: (message: string) => void;
}

type SortField = 'fullName' | 'submittedAt' | 'interest' | 'status' | 'city';
type SortOrder = 'asc' | 'desc';

export const WaitlistDataTable: React.FC<WaitlistDataTableProps> = ({ onShowToast }) => {
  const { leads, updateLeadStatus, deleteLead, addLead } = useCms();

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [interestFilter, setInterestFilter] = useState<'all' | 'personal' | 'business' | 'pos-agent' | 'aggregator'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'contacted' | 'approved' | 'dispatched'>('all');
  const [cityFilter, setCityFilter] = useState<string>('all');

  // Sorting State
  const [sortField, setSortField] = useState<SortField>('submittedAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Selection & Bulk Actions
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // New Lead Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({
    fullName: '',
    whatsappNumber: '',
    email: '',
    city: '',
    interest: 'pos-agent' as AdminLeadItem['interest'],
    status: 'new' as AdminLeadItem['status'],
    notes: '',
  });

  // Extract unique cities for filtering
  const availableCities = useMemo(() => {
    const set = new Set<string>();
    leads.forEach((l) => {
      if (l.city && l.city.trim()) {
        set.add(l.city.trim());
      }
    });
    return Array.from(set).sort();
  }, [leads]);

  // Compute breakdown stats for summary cards
  const stats = useMemo(() => {
    const total = leads.length;
    const personalCount = leads.filter((l) => l.interest === 'personal').length;
    const businessCount = leads.filter((l) => l.interest === 'business').length;
    const posAgentCount = leads.filter((l) => l.interest === 'pos-agent' || l.interest === 'aggregator').length;

    const personalPct = total > 0 ? Math.round((personalCount / total) * 100) : 0;
    const businessPct = total > 0 ? Math.round((businessCount / total) * 100) : 0;
    const posAgentPct = total > 0 ? Math.round((posAgentCount / total) * 100) : 0;

    return {
      total,
      personal: { count: personalCount, pct: personalPct },
      business: { count: businessCount, pct: businessPct },
      posAgent: { count: posAgentCount, pct: posAgentPct },
    };
  }, [leads]);

  // Handle Sort Toggle
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Filtered & Sorted Leads
  const processedLeads = useMemo(() => {
    let result = [...leads];

    // Filter by text search
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (l) =>
          l.fullName.toLowerCase().includes(q) ||
          l.whatsappNumber.includes(q) ||
          l.email.toLowerCase().includes(q) ||
          (l.city && l.city.toLowerCase().includes(q)) ||
          (l.notes && l.notes.toLowerCase().includes(q))
      );
    }

    // Filter by interest
    if (interestFilter !== 'all') {
      result = result.filter((l) => l.interest === interestFilter);
    }

    // Filter by status
    if (statusFilter !== 'all') {
      result = result.filter((l) => l.status === statusFilter);
    }

    // Filter by city
    if (cityFilter !== 'all') {
      result = result.filter((l) => l.city?.toLowerCase() === cityFilter.toLowerCase());
    }

    // Sort
    result.sort((a, b) => {
      let valA: string = '';
      let valB: string = '';

      if (sortField === 'submittedAt') {
        valA = a.submittedAt || '';
        valB = b.submittedAt || '';
      } else if (sortField === 'fullName') {
        valA = a.fullName.toLowerCase();
        valB = b.fullName.toLowerCase();
      } else if (sortField === 'interest') {
        valA = a.interest;
        valB = b.interest;
      } else if (sortField === 'status') {
        valA = a.status;
        valB = b.status;
      } else if (sortField === 'city') {
        valA = (a.city || '').toLowerCase();
        valB = (b.city || '').toLowerCase();
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [leads, searchTerm, interestFilter, statusFilter, cityFilter, sortField, sortOrder]);

  // Pagination calculation
  const totalPages = Math.ceil(processedLeads.length / pageSize) || 1;
  const paginatedLeads = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return processedLeads.slice(start, start + pageSize);
  }, [processedLeads, currentPage, pageSize]);

  // Selection handlers
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedLeadIds(paginatedLeads.map((l) => l.id));
    } else {
      setSelectedLeadIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedLeadIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Bulk Status Update
  const handleBulkStatusChange = (status: AdminLeadItem['status']) => {
    if (selectedLeadIds.length === 0) return;
    selectedLeadIds.forEach((id) => updateLeadStatus(id, status));
    onShowToast(`Updated ${selectedLeadIds.length} leads to status: ${status}`);
    setSelectedLeadIds([]);
  };

  // Bulk Delete
  const handleBulkDelete = () => {
    if (selectedLeadIds.length === 0) return;
    if (window.confirm(`Delete ${selectedLeadIds.length} selected entries permanently?`)) {
      selectedLeadIds.forEach((id) => deleteLead(id));
      onShowToast(`Deleted ${selectedLeadIds.length} waitlist entries`);
      setSelectedLeadIds([]);
    }
  };

  // Export to CSV
  const exportCsv = () => {
    const headers = ['ID', 'Full Name', 'WhatsApp', 'Email', 'City', 'Interest', 'Status', 'Date Submitted', 'Notes'];
    const rows = processedLeads.map((l) => [
      `"${l.id}"`,
      `"${l.fullName}"`,
      `"${l.whatsappNumber}"`,
      `"${l.email}"`,
      `"${l.city || ''}"`,
      `"${l.interest}"`,
      `"${l.status}"`,
      `"${l.submittedAt}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Axoora_Waitlist_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast(`Exported ${processedLeads.length} leads to CSV file!`);
  };

  // Submit new manual lead
  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.fullName.trim() || !newLeadForm.whatsappNumber.trim()) {
      alert('Please provide at least a full name and WhatsApp phone number');
      return;
    }

    addLead({
      fullName: newLeadForm.fullName,
      whatsappNumber: newLeadForm.whatsappNumber,
      email: newLeadForm.email || `${newLeadForm.fullName.toLowerCase().replace(/\s+/g, '.')}@merchant.ng`,
      city: newLeadForm.city || 'Nigeria',
      interest: newLeadForm.interest,
      status: newLeadForm.status,
      notes: newLeadForm.notes || 'Manually entered by Super Admin',
    });

    onShowToast(`Added new waitlist lead: ${newLeadForm.fullName}`);
    setIsAddModalOpen(false);
    setNewLeadForm({
      fullName: '',
      whatsappNumber: '',
      email: '',
      city: '',
      interest: 'pos-agent',
      status: 'new',
      notes: '',
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Top Header & Quick Counters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#14294F] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#00DF8F] uppercase font-bold tracking-wider">
              AXOORA REAL-TIME CRM // DATA TABLE
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#0D95FE]/15 border border-[#0D95FE]/30 text-[#0D95FE] text-[10px] font-mono font-bold">
              {leads.length} Registered
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            Waitlist Registrations &amp; Hardware Requests
          </h2>
          <p className="text-xs text-[#A8BBD6] mt-0.5">
            Real-time feed of merchants and consumers requesting personal accounts, dedicated NUBANs, and dual-SIM Apex POS terminals.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-[#0D95FE] hover:bg-[#0C84E4] text-[#00284D] font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-[#0D95FE]/20"
          >
            <span className="material-symbols-outlined text-[16px]">person_add</span>
            <span>Manual Entry</span>
          </button>

          <button
            onClick={exportCsv}
            className="px-3.5 py-2 rounded-xl bg-[#05112A] hover:bg-[#0A1B3D] border border-[#14294F] text-[#F2F5F9] font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            title="Download CSV file for spreadsheet tools"
          >
            <span className="material-symbols-outlined text-[16px] text-[#00DF8F]">file_download</span>
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUMMARY CARDS: TOTAL WAITLIST SIGNUPS BROKEN DOWN BY USER INTEREST TYPE */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Signups */}
        <div
          onClick={() => {
            setInterestFilter('all');
            setCurrentPage(1);
          }}
          className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
            interestFilter === 'all'
              ? 'bg-[#0A1B3D] border-[#0D95FE] shadow-lg shadow-[#0D95FE]/10'
              : 'bg-[#05112A] border-[#14294F] hover:border-[#7B9CD2]/60'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase font-bold text-[#7B9CD2]">Total Waitlist</span>
            <div className="w-8 h-8 rounded-xl bg-[#0D95FE]/15 text-[#0D95FE] flex items-center justify-center border border-[#0D95FE]/30">
              <span className="material-symbols-outlined text-[18px]">group</span>
            </div>
          </div>

          <div>
            <div className="text-3xl font-black text-white tracking-tight">{stats.total}</div>
            <div className="text-[11px] text-[#00DF8F] flex items-center gap-1 font-mono mt-0.5">
              <span>100% database pool</span>
            </div>
          </div>

          <div className="w-full bg-[#020B1D] h-1.5 rounded-full overflow-hidden border border-[#14294F]/80">
            <div className="bg-[#0D95FE] h-full rounded-full w-full" />
          </div>

          <div className="text-[10px] text-[#7B9CD2] font-mono flex items-center justify-between">
            <span>Click to view all</span>
            <span>All Channels</span>
          </div>
        </div>

        {/* Card 2: Personal Interest Breakdown */}
        <div
          onClick={() => {
            setInterestFilter(interestFilter === 'personal' ? 'all' : 'personal');
            setCurrentPage(1);
          }}
          className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
            interestFilter === 'personal'
              ? 'bg-[#0A1B3D] border-[#00DF8F] shadow-lg shadow-[#00DF8F]/10'
              : 'bg-[#05112A] border-[#14294F] hover:border-[#00DF8F]/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase font-bold text-[#00DF8F]">Personal Banking</span>
            <div className="w-8 h-8 rounded-xl bg-[#00DF8F]/15 text-[#00DF8F] flex items-center justify-center border border-[#00DF8F]/30">
              <span className="material-symbols-outlined text-[18px]">person</span>
            </div>
          </div>

          <div>
            <div className="text-3xl font-black text-white tracking-tight">{stats.personal.count}</div>
            <div className="text-[11px] text-[#00DF8F] flex items-center gap-1 font-mono mt-0.5">
              <span>{stats.personal.pct}% of total signups</span>
            </div>
          </div>

          <div className="w-full bg-[#020B1D] h-1.5 rounded-full overflow-hidden border border-[#14294F]/80">
            <div
              className="bg-[#00DF8F] h-full rounded-full transition-all duration-500"
              style={{ width: `${stats.personal.pct}%` }}
            />
          </div>

          <div className="text-[10px] text-[#7B9CD2] font-mono flex items-center justify-between">
            <span>{interestFilter === 'personal' ? '● Filtering active' : 'Filter by Personal'}</span>
            <span>WhatsApp / Cards</span>
          </div>
        </div>

        {/* Card 3: Business Interest Breakdown */}
        <div
          onClick={() => {
            setInterestFilter(interestFilter === 'business' ? 'all' : 'business');
            setCurrentPage(1);
          }}
          className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
            interestFilter === 'business'
              ? 'bg-[#0A1B3D] border-[#0D95FE] shadow-lg shadow-[#0D95FE]/10'
              : 'bg-[#05112A] border-[#14294F] hover:border-[#0D95FE]/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase font-bold text-[#0D95FE]">Business Accounts</span>
            <div className="w-8 h-8 rounded-xl bg-[#0D95FE]/15 text-[#0D95FE] flex items-center justify-center border border-[#0D95FE]/30">
              <span className="material-symbols-outlined text-[18px]">storefront</span>
            </div>
          </div>

          <div>
            <div className="text-3xl font-black text-white tracking-tight">{stats.business.count}</div>
            <div className="text-[11px] text-[#0D95FE] flex items-center gap-1 font-mono mt-0.5">
              <span>{stats.business.pct}% of total signups</span>
            </div>
          </div>

          <div className="w-full bg-[#020B1D] h-1.5 rounded-full overflow-hidden border border-[#14294F]/80">
            <div
              className="bg-[#0D95FE] h-full rounded-full transition-all duration-500"
              style={{ width: `${stats.business.pct}%` }}
            />
          </div>

          <div className="text-[10px] text-[#7B9CD2] font-mono flex items-center justify-between">
            <span>{interestFilter === 'business' ? '● Filtering active' : 'Filter by Business'}</span>
            <span>Dedicated NUBAN</span>
          </div>
        </div>

        {/* Card 4: POS Agent Breakdown */}
        <div
          onClick={() => {
            setInterestFilter(interestFilter === 'pos-agent' ? 'all' : 'pos-agent');
            setCurrentPage(1);
          }}
          className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
            interestFilter === 'pos-agent'
              ? 'bg-[#0A1B3D] border-[#F2A93B] shadow-lg shadow-[#F2A93B]/10'
              : 'bg-[#05112A] border-[#14294F] hover:border-[#F2A93B]/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase font-bold text-[#F2A93B]">POS Agent Hardware</span>
            <div className="w-8 h-8 rounded-xl bg-[#F2A93B]/15 text-[#F2A93B] flex items-center justify-center border border-[#F2A93B]/30">
              <span className="material-symbols-outlined text-[18px]">point_of_sale</span>
            </div>
          </div>

          <div>
            <div className="text-3xl font-black text-white tracking-tight">{stats.posAgent.count}</div>
            <div className="text-[11px] text-[#F2A93B] flex items-center gap-1 font-mono mt-0.5">
              <span>{stats.posAgent.pct}% of total signups</span>
            </div>
          </div>

          <div className="w-full bg-[#020B1D] h-1.5 rounded-full overflow-hidden border border-[#14294F]/80">
            <div
              className="bg-[#F2A93B] h-full rounded-full transition-all duration-500"
              style={{ width: `${stats.posAgent.pct}%` }}
            />
          </div>

          <div className="text-[10px] text-[#7B9CD2] font-mono flex items-center justify-between">
            <span>{interestFilter === 'pos-agent' ? '● Filtering active' : 'Filter by POS Agent'}</span>
            <span>Apex Dual-SIM POS</span>
          </div>
        </div>
      </div>

      {/* Control Bar: Search Input, Dropdown Filters & Reset */}
      <div className="p-4 rounded-2xl bg-[#05112A] border border-[#14294F] flex flex-col gap-3.5 shadow-lg">
        {/* Search Bar + Active Filters */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#7B9CD2] text-[18px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search by full name, phone number, email, or city..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-[#020B1D] border border-[#14294F] pl-9 pr-8 py-2 rounded-xl text-xs text-white placeholder:text-[#7B9CD2]/70 outline-none focus:border-[#0D95FE] transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#7B9CD2] hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Segmented Channel Filter */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1 md:pb-0">
            {[
              { id: 'all', label: 'All Channels' },
              { id: 'personal', label: 'Personal AI' },
              { id: 'business', label: 'Shop NUBAN' },
              { id: 'pos-agent', label: 'Apex POS' },
              { id: 'aggregator', label: 'Fleet Aggregator' },
            ].map((f) => {
              const isActive = interestFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => {
                    setInterestFilter(f.id as any);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                    isActive
                      ? 'bg-[#0D95FE] text-[#00284D] font-bold shadow-md shadow-[#0D95FE]/20'
                      : 'bg-[#020B1D] text-[#A8BBD6] hover:text-white border border-[#14294F]'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Filters: Status & City Dropdowns */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#14294F]/60 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            {/* Status Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-[#7B9CD2] font-mono text-[11px]">STATUS:</span>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value as any);
                  setCurrentPage(1);
                }}
                className="bg-[#020B1D] border border-[#14294F] rounded-lg px-2.5 py-1 text-white font-mono text-xs cursor-pointer outline-none focus:border-[#0D95FE]"
              >
                <option value="all">All Statuses ({leads.length})</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="approved">Approved</option>
                <option value="dispatched">Dispatched</option>
              </select>
            </div>

            {/* City Filter */}
            {availableCities.length > 0 && (
              <div className="flex items-center gap-1.5">
                <span className="text-[#7B9CD2] font-mono text-[11px]">LOCATION:</span>
                <select
                  value={cityFilter}
                  onChange={(e) => {
                    setCityFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-[#020B1D] border border-[#14294F] rounded-lg px-2.5 py-1 text-white text-xs cursor-pointer outline-none focus:border-[#0D95FE]"
                >
                  <option value="all">All Cities ({availableCities.length})</option>
                  {availableCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Clear Filters Reset */}
            {(searchTerm || interestFilter !== 'all' || statusFilter !== 'all' || cityFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setInterestFilter('all');
                  setStatusFilter('all');
                  setCityFilter('all');
                  setCurrentPage(1);
                }}
                className="text-[11px] text-[#EF4444] hover:underline flex items-center gap-1 cursor-pointer font-mono"
              >
                <span className="material-symbols-outlined text-[13px]">filter_alt_off</span>
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          <div className="text-[11px] text-[#7B9CD2] font-mono">
            Showing <b>{processedLeads.length}</b> of <b>{leads.length}</b> records
          </div>
        </div>
      </div>

      {/* Bulk Action Controls Bar (when items selected) */}
      {selectedLeadIds.length > 0 && (
        <div className="p-3 rounded-xl bg-[#002447] border border-[#0D95FE] flex flex-wrap items-center justify-between gap-3 text-xs shadow-lg animate-fadeIn">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00DF8F] animate-pulse" />
            <span className="font-bold text-white">
              {selectedLeadIds.length} {selectedLeadIds.length === 1 ? 'entry' : 'entries'} selected
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#A8BBD6] text-[11px]">Mark as:</span>
            <button
              onClick={() => handleBulkStatusChange('contacted')}
              className="px-2.5 py-1 rounded bg-[#05112A] text-white border border-[#14294F] hover:border-[#0D95FE] cursor-pointer"
            >
              Contacted
            </button>
            <button
              onClick={() => handleBulkStatusChange('approved')}
              className="px-2.5 py-1 rounded bg-[#05112A] text-[#0D95FE] border border-[#14294F] hover:border-[#0D95FE] cursor-pointer"
            >
              Approved
            </button>
            <button
              onClick={() => handleBulkStatusChange('dispatched')}
              className="px-2.5 py-1 rounded bg-[#00DF8F]/20 text-[#00DF8F] border border-[#00DF8F]/40 cursor-pointer"
            >
              Dispatched
            </button>
            <button
              onClick={handleBulkDelete}
              className="px-2.5 py-1 rounded bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/40 hover:bg-[#EF4444]/30 cursor-pointer ml-1"
            >
              Delete Selected
            </button>
          </div>
        </div>
      )}

      {/* Main Interactive Data Table */}
      <div className="bg-[#05112A] border border-[#14294F] rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#020B1D] border-b border-[#14294F] text-[#7B9CD2] font-mono uppercase text-[10px] select-none">
              <tr>
                <th className="py-3 px-3.5 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={
                      paginatedLeads.length > 0 &&
                      paginatedLeads.every((l) => selectedLeadIds.includes(l.id))
                    }
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded bg-[#05112A] border-[#14294F] accent-[#0D95FE] cursor-pointer"
                  />
                </th>

                <th
                  onClick={() => handleSort('fullName')}
                  className="py-3 px-4 cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Merchant / Contact</span>
                    {sortField === 'fullName' && (
                      <span className="text-[#0D95FE]">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </div>
                </th>

                <th className="py-3 px-4">WhatsApp &amp; Reachability</th>

                <th
                  onClick={() => handleSort('city')}
                  className="py-3 px-4 cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Region / City</span>
                    {sortField === 'city' && (
                      <span className="text-[#0D95FE]">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </div>
                </th>

                <th
                  onClick={() => handleSort('interest')}
                  className="py-3 px-4 cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Product Channel</span>
                    {sortField === 'interest' && (
                      <span className="text-[#0D95FE]">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </div>
                </th>

                <th
                  onClick={() => handleSort('status')}
                  className="py-3 px-4 cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Lifecycle Status</span>
                    {sortField === 'status' && (
                      <span className="text-[#0D95FE]">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </div>
                </th>

                <th
                  onClick={() => handleSort('submittedAt')}
                  className="py-3 px-4 cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Timestamp</span>
                    {sortField === 'submittedAt' && (
                      <span className="text-[#0D95FE]">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </div>
                </th>

                <th className="py-3 px-4 text-right">Instant Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#14294F]/80">
              {paginatedLeads.map((lead) => {
                const isSelected = selectedLeadIds.includes(lead.id);

                return (
                  <tr
                    key={lead.id}
                    className={`transition-colors ${
                      isSelected
                        ? 'bg-[#00284D]/40 hover:bg-[#00284D]/60'
                        : 'hover:bg-[#071738]/60'
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-3 px-3.5 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectOne(lead.id)}
                        className="w-4 h-4 rounded bg-[#020B1D] border-[#14294F] accent-[#0D95FE] cursor-pointer"
                      />
                    </td>

                    {/* Contact Person Name & Email */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-white leading-snug">{lead.fullName}</div>
                      <div className="text-[11px] text-[#7B9CD2] font-mono truncate max-w-[200px]">
                        {lead.email}
                      </div>
                      {lead.notes && (
                        <div className="text-[10px] text-[#A8BBD6]/80 italic line-clamp-1 mt-0.5">
                          "{lead.notes}"
                        </div>
                      )}
                    </td>

                    {/* WhatsApp */}
                    <td className="py-3 px-4">
                      <div className="font-mono text-xs font-semibold text-[#00DF8F] flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[14px]">call</span>
                        <span>{lead.whatsappNumber}</span>
                      </div>
                      <span className="text-[10px] text-[#7B9CD2]">Instant Direct WhatsApp</span>
                    </td>

                    {/* Location */}
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 text-[#F2F5F9] font-medium">
                        <span className="material-symbols-outlined text-[14px] text-[#0D95FE]">
                          location_on
                        </span>
                        <span>{lead.city || 'Nigeria'}</span>
                      </span>
                    </td>

                    {/* Channel */}
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md font-mono text-[10px] font-bold uppercase ${
                          lead.interest === 'pos-agent'
                            ? 'bg-[#00DF8F]/15 text-[#00DF8F] border border-[#00DF8F]/30'
                            : lead.interest === 'business'
                            ? 'bg-[#0D95FE]/15 text-[#0D95FE] border border-[#0D95FE]/30'
                            : lead.interest === 'aggregator'
                            ? 'bg-[#F2A93B]/15 text-[#F2A93B] border border-[#F2A93B]/30'
                            : 'bg-[#7B9CD2]/15 text-[#A8BBD6] border border-[#7B9CD2]/30'
                        }`}
                      >
                        {lead.interest}
                      </span>
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-3 px-4">
                      <select
                        value={lead.status}
                        onChange={(e) => {
                          updateLeadStatus(lead.id, e.target.value as AdminLeadItem['status']);
                          onShowToast(`Updated ${lead.fullName} to: ${e.target.value}`);
                        }}
                        className={`bg-[#020B1D] border text-xs font-mono rounded-lg px-2 py-1 outline-none cursor-pointer transition-all ${
                          lead.status === 'dispatched'
                            ? 'border-[#00DF8F] text-[#00DF8F]'
                            : lead.status === 'approved'
                            ? 'border-[#0D95FE] text-[#0D95FE]'
                            : lead.status === 'contacted'
                            ? 'border-[#F2A93B] text-[#F2A93B]'
                            : 'border-[#14294F] text-[#A8BBD6]'
                        }`}
                      >
                        <option value="new">● New</option>
                        <option value="contacted">● Contacted</option>
                        <option value="approved">● Approved</option>
                        <option value="dispatched">● Dispatched</option>
                      </select>
                    </td>

                    {/* Date */}
                    <td className="py-3 px-4 font-mono text-[11px] text-[#7B9CD2]">
                      {lead.submittedAt
                        ? new Date(lead.submittedAt).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })
                        : 'Recent'}
                    </td>

                    {/* Row Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* WhatsApp Direct Link */}
                        <a
                          href={`https://wa.me/${lead.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(
                            lead.fullName
                          )}%2C%20this%20is%20Axoora%20Support%20regarding%20your%20${encodeURIComponent(
                            lead.interest
                          )}%20request.`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-[#00DF8F]/15 hover:bg-[#00DF8F]/25 text-[#00DF8F] transition-all cursor-pointer"
                          title="Open WhatsApp chat with lead"
                        >
                          <span className="material-symbols-outlined text-[16px]">chat</span>
                        </a>

                        {/* Delete Row Button */}
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete waitlist record for ${lead.fullName}?`)) {
                              deleteLead(lead.id);
                              onShowToast(`Removed ${lead.fullName} from database`);
                            }
                          }}
                          className="p-1.5 rounded-lg text-[#EF4444] hover:bg-[#EF4444]/20 transition-all cursor-pointer"
                          title="Delete entry"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {paginatedLeads.length === 0 && (
          <div className="py-12 px-4 text-center flex flex-col items-center justify-center gap-2">
            <span className="material-symbols-outlined text-4xl text-[#7B9CD2]/60">
              person_search
            </span>
            <p className="text-sm font-bold text-white">No waitlist entries match your filters</p>
            <p className="text-xs text-[#7B9CD2]">
              Try clearing search terms or changing the channel and location selectors.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setInterestFilter('all');
                setStatusFilter('all');
                setCityFilter('all');
              }}
              className="mt-2 px-3 py-1.5 rounded-lg bg-[#0A1B3D] text-xs text-[#0D95FE] hover:text-white border border-[#14294F] cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Pagination Footer */}
        <div className="p-4 bg-[#020B1D] border-t border-[#14294F] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7B9CD2]">
          <div>
            Showing <span className="font-bold text-white">{paginatedLeads.length}</span> of{' '}
            <span className="font-bold text-white">{processedLeads.length}</span> filtered leads
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1.5 rounded-lg border font-mono transition-all ${
                currentPage === 1
                  ? 'border-[#14294F]/40 text-[#14294F] cursor-not-allowed'
                  : 'border-[#14294F] text-white hover:bg-[#0A1B3D] cursor-pointer'
              }`}
            >
              ← Prev
            </button>

            <span className="font-mono text-xs text-[#F2F5F9] px-2">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1.5 rounded-lg border font-mono transition-all ${
                currentPage === totalPages
                  ? 'border-[#14294F]/40 text-[#14294F] cursor-not-allowed'
                  : 'border-[#14294F] text-white hover:bg-[#0A1B3D] cursor-pointer'
              }`}
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Manual Entry Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#05112A] border border-[#14294F] rounded-3xl p-6 max-w-lg w-full flex flex-col gap-4 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between border-b border-[#14294F] pb-3">
              <div>
                <h3 className="font-extrabold text-white text-base">Add Lead to Waitlist</h3>
                <p className="text-xs text-[#7B9CD2]">Manually insert merchant or customer registration</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-[#7B9CD2] hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="flex flex-col gap-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-[#7B9CD2]">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sani Abubakar"
                    value={newLeadForm.fullName}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, fullName: e.target.value })}
                    className="px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white outline-none focus:border-[#0D95FE]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs text-[#7B9CD2]">WhatsApp Phone *</label>
                  <input
                    type="text"
                    required
                    placeholder="+234 803 123 4567"
                    value={newLeadForm.whatsappNumber}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, whatsappNumber: e.target.value })}
                    className="px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white outline-none focus:border-[#0D95FE] font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-[#7B9CD2]">Email Address</label>
                  <input
                    type="email"
                    placeholder="merchant@example.ng"
                    value={newLeadForm.email}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                    className="px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white outline-none focus:border-[#0D95FE]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs text-[#7B9CD2]">City / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Kano, Lagos, Abuja"
                    value={newLeadForm.city}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, city: e.target.value })}
                    className="px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white outline-none focus:border-[#0D95FE]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-[#7B9CD2]">Product Interest</label>
                  <select
                    value={newLeadForm.interest}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, interest: e.target.value as any })}
                    className="px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white outline-none cursor-pointer"
                  >
                    <option value="pos-agent">POS Terminal (Agent / Merchant)</option>
                    <option value="business">Dedicated Business NUBAN</option>
                    <option value="personal">Personal AI Consumer Account</option>
                    <option value="aggregator">Fleet Aggregator (Multi-device)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs text-[#7B9CD2]">Initial Status</label>
                  <select
                    value={newLeadForm.status}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, status: e.target.value as any })}
                    className="px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white outline-none cursor-pointer"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="approved">Approved</option>
                    <option value="dispatched">Dispatched</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#7B9CD2]">Internal Notes</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Needs 2 Apex terminals for Wuse Market shop..."
                  value={newLeadForm.notes}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#020B1D] border border-[#14294F] text-xs text-white outline-none resize-none focus:border-[#0D95FE]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#14294F]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-[#A8BBD6] hover:bg-[#0A1B3D] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#00DF8F] hover:bg-[#00c77f] text-[#003825] font-extrabold text-xs cursor-pointer shadow-lg"
                >
                  Save to Waitlist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
