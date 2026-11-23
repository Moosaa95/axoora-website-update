'use client';

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  MessageSquare,
  Ticket,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Headphones,
  CheckCheck,
  BadgeCheck,
  Send,
  ExternalLink,
  X,
  Search,
  Trash2,
  Check,
  RotateCcw,
} from 'lucide-react';
import {
  getChatSessions,
  sendAgentReply,
  updateChatSession,
  deleteChatSession,
  type ChatSessionApi,
} from '../lib/api';
import { ConfirmModal } from './ConfirmModal';
import { AdminChatInboxSkeleton } from './AdminSkeleton';
import { useAppSelector } from '../store';

interface LiveChatAdminTabProps {
  onShowToast?: (msg: string) => void;
}

export const LiveChatAdminTab: React.FC<LiveChatAdminTabProps> = ({ onShowToast }) => {
  // Current logged in user from Redux store — guarantees authentic officer identity
  const currentUser = useAppSelector((state) => state.auth.user);
  const actualAgentName =
    currentUser?.full_name?.trim() ||
    currentUser?.username?.trim() ||
    'Support Officer';

  const [viewMode, setViewMode] = useState<'chat' | 'tickets'>('chat');
  const [sessions, setSessions] = useState<ChatSessionApi[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [ticketStatusFilter, setTicketStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [ticketSearchQuery, setTicketSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [replyText, setReplyText] = useState<string>('');
  const [sendingReply, setSendingReply] = useState<boolean>(false);
  const [deleteTarget, setDeleteTarget] = useState<ChatSessionApi | null>(null);

  // Resolve Ticket Modal state
  const [resolvingTicket, setResolvingTicket] = useState<ChatSessionApi | null>(null);
  const [resolutionNotes, setResolutionNotes] = useState<string>('');
  const [isSubmittingResolve, setIsSubmittingResolve] = useState<boolean>(false);

  const transcriptEndRef = useRef<HTMLDivElement>(null);

  const loadSessions = useCallback(
    async (silent = false) => {
      if (!silent) setLoading(true);
      try {
        const res = await getChatSessions({
          status: statusFilter,
          search: searchQuery.trim() || undefined,
        });
        const list = Array.isArray(res?.results) ? res.results : [];
        setSessions(list);
        setSelectedId((prev) => {
          if (prev && list.some((s) => s.session_id === prev)) return prev;
          return list[0]?.session_id || null;
        });
      } catch {
        // Keep existing sessions on transient error
      } finally {
        if (!silent) setLoading(false);
      }
    },
    [statusFilter, searchQuery]
  );

  useEffect(() => {
    loadSessions(false);
  }, [loadSessions]);

  useEffect(() => {
    const timer = setInterval(() => {
      loadSessions(true);
    }, 5000);
    return () => clearInterval(timer);
  }, [loadSessions]);

  const activeSession = sessions.find((s) => s.session_id === selectedId) || null;

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeSession?.messages.length, selectedId]);

  const handleSendOfficerReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSession || !replyText.trim() || sendingReply) return;

    setSendingReply(true);
    try {
      // Always pass the authentic logged-in officer name
      const res = await sendAgentReply({
        sessionId: activeSession.session_id,
        text: replyText.trim(),
        agentName: actualAgentName,
      });
      setReplyText('');
      setSessions((prev) =>
        prev.map((s) =>
          s.session_id === activeSession.session_id
            ? {
                ...s,
                status: res.status || 'human_active',
                assigned_agent_name: actualAgentName,
                messages: [...s.messages, res.message],
              }
            : s
        )
      );
      onShowToast?.(`Reply sent as ${actualAgentName} to Ticket #${activeSession.ticket_code}`);
    } catch {
      onShowToast?.('Failed to send reply. Please check backend connection.');
    } finally {
      setSendingReply(false);
    }
  };

  const handleOpenResolveModal = (session: ChatSessionApi) => {
    setResolvingTicket(session);
    setResolutionNotes(session.resolution_notes || '');
  };

  const handleConfirmResolveTicket = async () => {
    if (!resolvingTicket) return;
    setIsSubmittingResolve(true);
    try {
      const res = await updateChatSession(resolvingTicket.session_id, {
        status: 'resolved',
        resolved_by_name: actualAgentName,
        resolution_notes: resolutionNotes.trim() || 'Issue addressed and resolved by officer.',
      });
      if (res?.data) {
        setSessions((prev) =>
          prev.map((s) => (s.session_id === resolvingTicket.session_id ? res.data : s))
        );
      }
      onShowToast?.(`Ticket #${resolvingTicket.ticket_code} resolved by ${actualAgentName}`);
      setResolvingTicket(null);
      setResolutionNotes('');
    } catch {
      onShowToast?.('Could not resolve ticket. Please retry.');
    } finally {
      setIsSubmittingResolve(false);
    }
  };

  const handleReopenTicket = async (session: ChatSessionApi) => {
    try {
      const res = await updateChatSession(session.session_id, {
        status: 'human_active',
      });
      if (res?.data) {
        setSessions((prev) =>
          prev.map((s) => (s.session_id === session.session_id ? res.data : s))
        );
      }
      onShowToast?.(`Ticket #${session.ticket_code} reopened to Officer Live`);
    } catch {
      onShowToast?.('Could not reopen ticket');
    }
  };

  const handleReturnToAi = async (session: ChatSessionApi) => {
    try {
      const res = await updateChatSession(session.session_id, { status: 'ai_active' });
      if (res?.data) {
        setSessions((prev) =>
          prev.map((s) => (s.session_id === session.session_id ? res.data : s))
        );
      }
      onShowToast?.(`Session #${session.ticket_code} returned to AI Concierge`);
    } catch {
      onShowToast?.('Could not return session to AI');
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const target = deleteTarget;
    setDeleteTarget(null);
    try {
      await deleteChatSession(target.session_id);
      setSessions((prev) => prev.filter((s) => s.session_id !== target.session_id));
      if (selectedId === target.session_id) {
        setSelectedId(null);
      }
      onShowToast?.(`Deleted chat session #${target.ticket_code}`);
    } catch {
      onShowToast?.('Could not delete chat session');
    }
  };

  const statusBadge = (st: ChatSessionApi['status']) => {
    switch (st) {
      case 'escalated':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Escalated
          </span>
        );
      case 'human_active':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#043e97]/20 text-[#53a8f5] border border-[#1E3A70]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#53a8f5] animate-pulse" />
            Officer Live
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Resolved
          </span>
        );
      case 'closed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-500/20 text-slate-300 border border-slate-500/30">
            Closed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#043e97]/20 text-[#53a8f5] border border-[#1E3A70]">
            AI Active
          </span>
        );
    }
  };

  // Ticket metrics computation
  const ticketList = useMemo(() => {
    return sessions.filter(
      (s) => s.status !== 'ai_active' || s.escalated_at || s.escalation_reason
    );
  }, [sessions]);

  const escalatedCount = sessions.filter((s) => s.status === 'escalated').length;
  const activeHumanCount = sessions.filter((s) => s.status === 'human_active').length;
  const resolvedCount = sessions.filter(
    (s) => s.status === 'resolved' || s.status === 'closed'
  ).length;

  const filteredTickets = useMemo(() => {
    return ticketList.filter((t) => {
      const matchesStatus =
        ticketStatusFilter === 'all' ||
        (ticketStatusFilter === 'pending' &&
          (t.status === 'escalated' || t.status === 'human_active')) ||
        t.status === ticketStatusFilter;
      const q = ticketSearchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        t.ticket_code.toLowerCase().includes(q) ||
        t.customer_name.toLowerCase().includes(q) ||
        t.customer_phone.toLowerCase().includes(q) ||
        t.customer_email.toLowerCase().includes(q) ||
        t.issue_summary.toLowerCase().includes(q) ||
        t.escalation_reason.toLowerCase().includes(q) ||
        (t.resolved_by_name || '').toLowerCase().includes(q) ||
        (t.resolution_notes || '').toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [ticketList, ticketStatusFilter, ticketSearchQuery]);

  const handleJumpToChat = (sessionId: string) => {
    setSelectedId(sessionId);
    setViewMode('chat');
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Navigation View Switcher */}
      <div className="p-5 rounded-2xl bg-[#071739] border border-[#1E3A70] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-lg font-bold text-white tracking-tight">Live Support &amp; Ticket Tracking Desk</h2>
            {escalatedCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">
                {escalatedCount} Escalated Waiting
              </span>
            )}
          </div>
          <p className="text-xs text-slate-300 mt-0.5">
            Live concierge chat with customer auto-disconnect protection and verified ticket resolution tracking.
          </p>
        </div>

        {/* View Toggle Tabs */}
        <div className="flex items-center gap-2 bg-[#020F2E] p-1.5 rounded-xl border border-[#1E3A70]">
          <button
            onClick={() => setViewMode('chat')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              viewMode === 'chat'
                ? 'bg-[#043e97] text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Live Chat Inbox</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20">
              {sessions.length}
            </span>
          </button>

          <button
            onClick={() => setViewMode('tickets')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              viewMode === 'tickets'
                ? 'bg-[#043e97] text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>Ticket Resolution Tracker</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20">
              {ticketList.length}
            </span>
          </button>
        </div>
      </div>

      {/* =================================================================== */}
      {/* VIEW MODE 1: LIVE CHAT INBOX                                       */}
      {/* =================================================================== */}
      {viewMode === 'chat' ? (
        <div className="space-y-4">
          {/* Chat Filter Chips */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'all', label: 'All Chats' },
                { id: 'escalated', label: 'Escalated' },
                { id: 'human_active', label: 'Officer Live' },
                { id: 'ai_active', label: 'AI Concierge' },
                { id: 'resolved', label: 'Resolved' },
                { id: 'closed', label: 'Closed / Inactivity' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                    statusFilter === tab.id
                      ? 'bg-[#043e97] text-white border-[#0976da] font-bold shadow-sm'
                      : 'bg-[#071739] text-slate-300 border-[#1E3A70] hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => loadSessions(false)}
              className="px-3 py-1.5 rounded-xl bg-[#071739] hover:bg-[#162C5B] text-slate-300 hover:text-white border border-[#1E3A70] text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh</span>
            </button>
          </div>

          {/* Split Pane */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-[600px]">
            {/* Left Inbox List */}
            <div className="lg:col-span-5 rounded-2xl bg-[#071739] border border-[#1E3A70] flex flex-col overflow-hidden">
              <div className="p-3.5 border-b border-[#1E3A70] bg-[#020F2E]/60">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-300" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search customer name, phone, ticket #AX or reason..."
                    className="w-full bg-[#020F2E] border border-[#1E3A70] focus:border-[#0976da] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-[#8492a6] outline-none"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto divide-y divide-[#162C5B] max-h-[540px]">
                {loading && sessions.length === 0 ? (
                  <AdminChatInboxSkeleton count={5} />
                ) : sessions.length === 0 ? (
                  <div className="p-8 text-center space-y-2">
                    <p className="text-sm font-semibold text-white">No conversations found</p>
                    <p className="text-xs text-slate-300">
                      Active customer chats will appear here automatically.
                    </p>
                  </div>
                ) : (
                  sessions.map((s) => {
                    const isSelected = s.session_id === activeSession?.session_id;
                    const lastMsg = s.messages[s.messages.length - 1];
                    return (
                      <button
                        key={s.session_id}
                        onClick={() => setSelectedId(s.session_id)}
                        className={`w-full text-left p-4 transition-colors cursor-pointer flex flex-col gap-1.5 ${
                          isSelected
                            ? 'bg-[#043e97]/20 border-l-4 border-l-[#0976da]'
                            : 'hover:bg-[#020F2E]/60'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-xs font-bold text-[#53a8f5]">
                              #{s.ticket_code}
                            </span>
                            <span className="text-xs font-bold text-white truncate">
                              {s.customer_name || 'Website Visitor'}
                            </span>
                          </div>
                          {statusBadge(s.status)}
                        </div>

                        {s.customer_phone && (
                          <div className="text-[11px] text-[#53a8f5] font-mono">
                            📞 {s.customer_phone}
                          </div>
                        )}

                        <p className="text-xs text-slate-300 line-clamp-1">
                          {s.issue_summary || s.escalation_reason || lastMsg?.text || 'Chat started'}
                        </p>

                        <div className="flex items-center justify-between text-[10px] text-slate-300 pt-0.5">
                          <span>{s.messages.length} msgs</span>
                          {s.resolved_by_name ? (
                            <span className="text-emerald-400">
                              Resolved by {s.resolved_by_name}
                            </span>
                          ) : (
                            <span>{lastMsg?.time || 'Just now'}</span>
                          )}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right Chat Transcript & Officer Composer */}
            <div className="lg:col-span-7 rounded-2xl bg-[#071739] border border-[#1E3A70] flex flex-col overflow-hidden">
              {!activeSession ? (
                <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
                  <MessageSquare className="w-10 h-10 text-slate-300/40 mb-2" />
                  <h3 className="text-sm font-bold text-white">Select a Conversation</h3>
                  <p className="text-xs text-slate-300 max-w-sm mt-1">
                    Choose a conversation on the left to inspect the transcript, speak directly with the customer, or resolve the ticket.
                  </p>
                </div>
              ) : (
                <>
                  {/* Session Header */}
                  <div className="p-4 bg-[#020F2E] border-b border-[#1E3A70] flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#53a8f5]">
                          #{activeSession.ticket_code}
                        </span>
                        <h3 className="text-sm font-bold text-white">
                          {activeSession.customer_name || 'Website Visitor'}
                        </h3>
                        {statusBadge(activeSession.status)}
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mt-0.5">
                        {activeSession.customer_phone && (
                          <span className="text-[#53a8f5]">
                            📞 {activeSession.customer_phone}
                          </span>
                        )}
                        {activeSession.customer_email && (
                          <span>✉️ {activeSession.customer_email}</span>
                        )}
                        {activeSession.resolved_by_name && (
                          <span className="text-emerald-400 font-semibold">
                            ✓ Resolved by {activeSession.resolved_by_name}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap">
                      {activeSession.status === 'human_active' && (
                        <button
                          onClick={() => handleReturnToAi(activeSession)}
                          className="px-2.5 py-1.5 rounded-xl bg-[#071739] hover:bg-[#162C5B] text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer border border-[#1E3A70]"
                        >
                          Return to AI
                        </button>
                      )}

                      {activeSession.status !== 'resolved' ? (
                        <button
                          onClick={() => handleOpenResolveModal(activeSession)}
                          className="px-3 py-1.5 rounded-xl bg-[#043e97] hover:bg-[#0976da] text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-sm"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Resolve Ticket</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleReopenTicket(activeSession)}
                          className="px-3 py-1.5 rounded-xl bg-[#071739] hover:bg-[#162C5B] text-[#53a8f5] border border-[#1E3A70] text-xs font-semibold transition-all cursor-pointer"
                        >
                          Reopen Ticket
                        </button>
                      )}

                      <button
                        onClick={() => setDeleteTarget(activeSession)}
                        className="px-2.5 py-1.5 rounded-xl bg-red-500/15 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/30 text-xs font-semibold transition-colors cursor-pointer"
                        title="Delete session"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Resolution Notes Banner (if already resolved) */}
                  {activeSession.status === 'resolved' && (
                    <div className="px-4 py-2.5 bg-emerald-950/40 border-b border-emerald-500/20 flex items-start gap-2 text-xs text-emerald-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <span className="font-bold text-white">
                          Resolved by {activeSession.resolved_by_name || 'Staff'}:
                        </span>{' '}
                        <span>{activeSession.resolution_notes || 'Issue marked resolved.'}</span>
                      </div>
                    </div>
                  )}

                  {/* Transcript Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[390px] bg-[#020F2E]">
                    {activeSession.messages.length === 0 ? (
                      <p className="text-center text-xs text-slate-300 py-8">
                        No messages recorded in this session yet.
                      </p>
                    ) : (
                      activeSession.messages.map((m) => (
                        <div
                          key={m.id}
                          className={`flex flex-col ${
                            m.sender === 'user' ? 'items-start' : 'items-end'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 mb-1 px-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
                              {m.sender === 'user'
                                ? activeSession.customer_name || 'Customer'
                                : m.sender === 'agent'
                                ? `👤 ${m.sender_name || 'Live Officer'}`
                                : m.sender === 'system'
                                ? '⚡ System'
                                : '🤖 Axoora AI'}
                            </span>
                            <span className="text-[10px] text-slate-300">
                              {m.time}
                            </span>
                          </div>
                          <div
                            className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-line ${
                              m.sender === 'user'
                                ? 'bg-[#071739] text-white rounded-tl-none border border-[#1E3A70]'
                                : m.sender === 'agent'
                                ? 'bg-[#043e97] text-white font-medium rounded-tr-none shadow-sm'
                                : m.sender === 'system'
                                ? 'bg-amber-500/15 border border-amber-500/30 text-amber-200 rounded-tr-none'
                                : 'bg-[#071739] border border-[#1E3A70] text-[#F2F5F9] rounded-tr-none'
                            }`}
                          >
                            {m.text}
                          </div>
                        </div>
                      ))
                    )}
                    <div ref={transcriptEndRef} />
                  </div>

                  {/* Officer Live Reply Composer with Authentic Identity Lock */}
                  <form
                    onSubmit={handleSendOfficerReply}
                    className="p-3.5 bg-[#020F2E] border-t border-[#1E3A70] space-y-2.5"
                  >
                    {/* Locked Authentic Officer Identity Badge */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-300 font-semibold">
                          Replying as:
                        </span>
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#043e97]/20 border border-[#1E3A70] text-[#53a8f5] text-xs font-bold shadow-2xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#53a8f5] animate-pulse" />
                          <span>{actualAgentName}</span>
                          {currentUser?.role?.name && (
                            <span className="text-[10px] text-emerald-300 font-normal">
                              ({currentUser.role.name})
                            </span>
                          )}
                          <span title="Authenticated staff identity verified" className="inline-flex">
                            <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] text-slate-300">
                        Identity permanently recorded on ticket transcript
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder={`Reply to ${
                          activeSession.customer_name || 'customer'
                        } (#${activeSession.ticket_code})...`}
                        className="flex-1 bg-[#071739] border border-[#1E3A70] focus:border-[#0976da] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#8492a6] outline-none"
                      />
                      <button
                        type="submit"
                        disabled={sendingReply || !replyText.trim()}
                        className="px-4 py-2.5 rounded-xl bg-[#043e97] hover:bg-[#0976da] text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                      >
                        {sendingReply ? (
                          <>
                            <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Reply</span>
                            <Send className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* =================================================================== */
        /* VIEW MODE 2: TICKET RESOLUTION TRACKER                              */
        /* =================================================================== */
        <div className="space-y-5">
          {/* Top 4 KPI Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[#071739] border border-[#1E3A70] flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-300 font-medium">Total Tickets Raised</span>
                <h4 className="text-xl font-bold text-white mt-1">{ticketList.length}</h4>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#043e97]/20 text-[#53a8f5] flex items-center justify-center border border-[#1E3A70]">
                <Ticket className="w-5 h-5 text-[#53a8f5]" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#071739] border border-[#1E3A70] flex items-center justify-between">
              <div>
                <span className="text-xs text-amber-300 font-medium">Needs Attention (Escalated)</span>
                <h4 className="text-xl font-bold text-amber-300 mt-1">{escalatedCount}</h4>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/30">
                <AlertCircle className="w-5 h-5 text-amber-300" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#071739] border border-[#1E3A70] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#53a8f5] font-medium">Officer In Progress</span>
                <h4 className="text-xl font-bold text-[#53a8f5] mt-1">{activeHumanCount}</h4>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#043e97]/20 text-[#53a8f5] flex items-center justify-center border border-[#1E3A70]">
                <Headphones className="w-5 h-5 text-[#53a8f5]" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#071739] border border-[#1E3A70] flex items-center justify-between">
              <div>
                <span className="text-xs text-emerald-400 font-medium">Resolved Tickets</span>
                <h4 className="text-xl font-bold text-emerald-400 mt-1">
                  {resolvedCount}{' '}
                  <span className="text-xs font-normal text-emerald-300/80">
                    ({ticketList.length ? Math.round((resolvedCount / ticketList.length) * 100) : 100}%)
                  </span>
                </h4>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
          </div>

          {/* Ticket Filter & Search Bar */}
          <div className="p-4 rounded-2xl bg-[#071739] border border-[#1E3A70] flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { id: 'all', label: 'All Tickets' },
                { id: 'pending', label: 'Pending Action' },
                { id: 'escalated', label: 'Escalated' },
                { id: 'human_active', label: 'In Progress' },
                { id: 'resolved', label: 'Resolved' },
                { id: 'closed', label: 'Closed' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setTicketStatusFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                    ticketStatusFilter === tab.id
                      ? 'bg-[#043e97] text-white border-[#0976da] font-bold shadow-sm'
                      : 'bg-[#020F2E] text-slate-300 border-[#1E3A70] hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
              <input
                type="text"
                value={ticketSearchQuery}
                onChange={(e) => setTicketSearchQuery(e.target.value)}
                placeholder="Search ticket #AX, customer, or officer..."
                className="w-full pl-9 pr-8 py-2 bg-[#020F2E] border border-[#1E3A70] focus:border-[#0976da] rounded-xl text-xs text-white placeholder-[#8492a6] outline-none"
              />
              {ticketSearchQuery && (
                <button
                  onClick={() => setTicketSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-white text-xs cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Tickets Tracking Table */}
          <div className="rounded-2xl bg-[#071739] border border-[#1E3A70] overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#020F2E] text-slate-300 uppercase tracking-wider border-b border-[#1E3A70]">
                  <tr>
                    <th className="px-4 py-3.5">Ticket Code</th>
                    <th className="px-4 py-3.5">Customer</th>
                    <th className="px-4 py-3.5">Issue Summary / Reason</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-4 py-3.5">Resolved By</th>
                    <th className="px-4 py-3.5">Resolution Notes</th>
                    <th className="px-4 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#162C5B] text-[#F2F5F9]">
                  {filteredTickets.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-10 text-center text-xs text-slate-300">
                        No tickets match the selected filters or search query.
                      </td>
                    </tr>
                  ) : (
                    filteredTickets.map((t) => (
                      <tr key={t.session_id} className="hover:bg-[#162C5B]/40 transition-colors">
                        {/* Ticket Code */}
                        <td className="px-4 py-3 font-semibold text-[#53a8f5] whitespace-nowrap">
                          <button
                            onClick={() => handleJumpToChat(t.session_id)}
                            className="hover:underline cursor-pointer flex items-center gap-1"
                            title="Open chat transcript"
                          >
                            <span>#{t.ticket_code}</span>
                            <ExternalLink className="w-3 h-3 opacity-70" />
                          </button>
                        </td>

                        {/* Customer */}
                        <td className="px-4 py-3">
                          <div className="font-semibold text-white">
                            {t.customer_name || 'Website Customer'}
                          </div>
                          <div className="text-[11px] text-[#53a8f5]">
                            {t.customer_phone || t.customer_email || 'Direct Chat'}
                          </div>
                        </td>

                        {/* Issue */}
                        <td className="px-4 py-3 max-w-xs">
                          <div className="line-clamp-2 text-xs text-slate-300">
                            {t.issue_summary || t.escalation_reason || 'Inquiry escalated to live officer'}
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          {statusBadge(t.status)}
                        </td>

                        {/* Resolved By */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          {t.resolved_by_name ? (
                            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                              <span className="w-2 h-2 rounded-full bg-emerald-400" />
                              <span>{t.resolved_by_name}</span>
                              <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
                            </div>
                          ) : (
                            <span className="text-[11px] text-slate-300 italic">
                              — Pending Resolution
                            </span>
                          )}
                        </td>

                        {/* Resolution Notes */}
                        <td className="px-4 py-3 max-w-sm">
                          {t.resolution_notes ? (
                            <div className="text-[11px] text-[#F2F5F9] line-clamp-2 bg-black/20 p-2 rounded-lg border border-white/5">
                              {t.resolution_notes}
                            </div>
                          ) : (
                            <span className="text-[11px] text-slate-300">—</span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleJumpToChat(t.session_id)}
                              className="px-2.5 py-1.5 rounded-lg bg-[#043e97]/20 hover:bg-[#043e97] text-[#53a8f5] hover:text-white font-semibold text-xs transition-colors cursor-pointer"
                              title="Open chat transcript"
                            >
                              Chat
                            </button>

                            {t.status !== 'resolved' ? (
                              <button
                                onClick={() => handleOpenResolveModal(t)}
                                className="px-2.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-white font-semibold text-xs transition-colors cursor-pointer"
                              >
                                ✓ Resolve
                              </button>
                            ) : (
                              <button
                                onClick={() => handleReopenTicket(t)}
                                className="px-2.5 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                              >
                                Reopen
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* RESOLVE TICKET MODAL                                                */}
      {/* =================================================================== */}
      {resolvingTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-[#071739] border border-[#1E3A70] shadow-2xl overflow-hidden flex flex-col text-left">
            <div className="p-4 bg-[#020F2E] border-b border-[#1E3A70] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-sm text-white">
                  Resolve Ticket #{resolvingTicket.ticket_code}
                </h3>
              </div>
              <button
                onClick={() => setResolvingTicket(null)}
                className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-[#162C5B] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <span className="text-[11px] text-slate-300 font-semibold block">Customer:</span>
                <span className="text-sm font-bold text-white">
                  {resolvingTicket.customer_name || 'Website Visitor'}
                </span>
                {resolvingTicket.customer_phone && (
                  <span className="text-xs text-[#53a8f5] ml-2">
                    ({resolvingTicket.customer_phone})
                  </span>
                )}
              </div>

              {/* Locked Resolving Officer Identity */}
              <div className="p-3 rounded-xl bg-[#020F2E] border border-[#1E3A70] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-300 font-semibold block uppercase">
                    Resolving Officer (Authentic ID)
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="font-bold text-xs text-white">{actualAgentName}</span>
                    <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  Verified Staff
                </span>
              </div>

              {/* Resolution Notes Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white block">
                  Resolution Notes:
                </label>
                <textarea
                  value={resolutionNotes}
                  onChange={(e) => setResolutionNotes(e.target.value)}
                  rows={3}
                  placeholder="Explain how this issue was resolved (e.g., 'Reversed transaction via NIP rails and informed customer')..."
                  className="w-full bg-[#020F2E] border border-[#1E3A70] focus:border-[#0976da] rounded-xl p-3 text-xs text-white placeholder-[#8492a6] outline-none resize-none"
                />

                {/* Quick note templates */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[
                    'Transaction Reversed',
                    'Account Unfrozen',
                    'Inquiry Resolved',
                    'PIN Reset Assisted',
                    'Card Limits Updated',
                  ].map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => setResolutionNotes(chip)}
                      className="px-2 py-0.5 rounded-lg bg-[#020F2E] hover:bg-[#162C5B] text-slate-300 hover:text-white text-[10px] font-medium transition-colors cursor-pointer border border-[#1E3A70]"
                    >
                      + {chip}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#020F2E] border-t border-[#1E3A70] flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setResolvingTicket(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmResolveTicket}
                disabled={isSubmittingResolve}
                className="px-4 py-2 rounded-xl bg-[#043e97] hover:bg-[#0976da] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50 transition-colors shadow-md"
              >
                {isSubmittingResolve ? 'Saving...' : 'Confirm & Mark Resolved'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title={`Delete Ticket #${deleteTarget?.ticket_code}?`}
        message={`Are you sure you want to permanently delete this chat transcript for ${
          deleteTarget?.customer_name || 'Customer'
        }?`}
        confirmLabel="Delete Session"
        variant="danger"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};
