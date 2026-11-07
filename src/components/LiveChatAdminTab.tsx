'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  getChatSessions,
  sendAgentReply,
  updateChatSession,
  deleteChatSession,
  type ChatSessionApi,
} from '../lib/api';
import { ConfirmModal } from './ConfirmModal';
import { AdminChatInboxSkeleton } from './AdminSkeleton';

interface LiveChatAdminTabProps {
  onShowToast?: (msg: string) => void;
}

export const LiveChatAdminTab: React.FC<LiveChatAdminTabProps> = ({ onShowToast }) => {
  const [sessions, setSessions] = useState<ChatSessionApi[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [replyText, setReplyText] = useState<string>('');
  const [agentName, setAgentName] = useState<string>('Maitama Support Officer');
  const [sendingReply, setSendingReply] = useState<boolean>(false);
  const [deleteTarget, setDeleteTarget] = useState<ChatSessionApi | null>(null);
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
      const res = await sendAgentReply({
        sessionId: activeSession.session_id,
        text: replyText.trim(),
        agentName: agentName.trim() || 'Support Officer',
      });
      setReplyText('');
      setSessions((prev) =>
        prev.map((s) =>
          s.session_id === activeSession.session_id
            ? {
                ...s,
                status: res.status || 'human_active',
                messages: [...s.messages, res.message],
              }
            : s
        )
      );
      onShowToast?.(`Reply delivered to Ticket #${activeSession.ticket_code}`);
    } catch {
      onShowToast?.('Failed to send reply. Please check backend connection.');
    } finally {
      setSendingReply(false);
    }
  };

  const handleStatusChange = async (
    session: ChatSessionApi,
    newStatus: ChatSessionApi['status'],
    label: string
  ) => {
    try {
      const res = await updateChatSession(session.session_id, { status: newStatus });
      if (res?.data) {
        setSessions((prev) =>
          prev.map((s) => (s.session_id === session.session_id ? res.data : s))
        );
      }
      onShowToast?.(`Ticket #${session.ticket_code} marked as ${label}`);
    } catch {
      onShowToast?.('Could not update session status');
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
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse">
            Escalated
          </span>
        );
      case 'human_active':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#00DF8F]/20 text-[#00DF8F] border border-[#00DF8F]/30">
            Officer Live
          </span>
        );
      case 'resolved':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-500/20 text-slate-300 border border-slate-500/30">
            Resolved
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0D95FE]/20 text-[#0D95FE] border border-[#0D95FE]/30">
            AI Concierge
          </span>
        );
    }
  };

  const escalatedCount = sessions.filter((s) => s.status === 'escalated').length;

  return (
    <div className="space-y-6">
      {/* Top Summary & Filter Bar */}
      <div className="p-5 rounded-2xl bg-[#0A1B3D] border border-[#14294F] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-lg font-bold text-white">Live Chat & AI Escalation Desk</h2>
            {escalatedCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                {escalatedCount} Escalated Waiting
              </span>
            )}
          </div>
          <p className="text-xs text-[#A8BBD6] mt-0.5">
            Monitor AI Concierge conversations in real time, take over escalated tickets, and reply directly to customers on the website.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'All Chats' },
            { id: 'escalated', label: 'Escalated' },
            { id: 'human_active', label: 'Officer Live' },
            { id: 'ai_active', label: 'AI Active' },
            { id: 'resolved', label: 'Resolved' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                statusFilter === tab.id
                  ? 'bg-[#0D95FE] text-[#00284D] border-[#0D95FE]'
                  : 'bg-[#020F2E] text-[#A8BBD6] border-[#14294F] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}

          <button
            onClick={() => loadSessions(false)}
            className="px-3 py-1.5 rounded-xl bg-[#020F2E] hover:bg-[#14294F] text-[#A8BBD6] hover:text-white border border-[#14294F] text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">refresh</span>
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Main Split-Pane Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-[600px]">
        {/* Left Inbox Column */}
        <div className="lg:col-span-5 rounded-2xl bg-[#0A1B3D] border border-[#14294F] flex flex-col overflow-hidden">
          <div className="p-3.5 border-b border-[#14294F] bg-[#020F2E]/60">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search name, phone, ticket #AX or topic..."
              className="w-full bg-[#020F2E] border border-[#14294F] focus:border-[#0D95FE] rounded-xl px-3.5 py-2 text-xs text-white placeholder-[#7B9CD2] outline-none"
            />
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-[#14294F] max-h-[540px]">
            {loading && sessions.length === 0 ? (
              <AdminChatInboxSkeleton count={5} />
            ) : sessions.length === 0 ? (
              <div className="p-8 text-center space-y-2">
                <p className="text-sm font-semibold text-white">No chat sessions found</p>
                <p className="text-xs text-[#7B9CD2]">
                  Customer conversations from the floating chat bubble will appear here automatically.
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
                        ? 'bg-[#14294F]/90 border-l-4 border-l-[#00DF8F]'
                        : 'hover:bg-[#020F2E]/60'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="font-mono text-xs font-bold text-[#00DF8F]">
                          #{s.ticket_code}
                        </span>
                        <span className="text-xs font-bold text-white truncate">
                          {s.customer_name || 'Website Visitor'}
                        </span>
                      </div>
                      {statusBadge(s.status)}
                    </div>

                    {s.customer_phone && (
                      <div className="text-[11px] text-[#0D95FE] font-mono">
                        📞 {s.customer_phone}
                      </div>
                    )}

                    <p className="text-xs text-[#A8BBD6] line-clamp-1">
                      {s.issue_summary || lastMsg?.text || 'Session started'}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-[#7B9CD2] font-mono pt-0.5">
                      <span>{s.messages.length} msgs</span>
                      <span>{lastMsg?.time || 'Just now'}</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Transcript & Officer Reply Column */}
        <div className="lg:col-span-7 rounded-2xl bg-[#0A1B3D] border border-[#14294F] flex flex-col overflow-hidden">
          {!activeSession ? (
            <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
              <span className="material-symbols-outlined text-4xl text-[#7B9CD2] mb-2">forum</span>
              <h3 className="text-sm font-bold text-white">Select a Conversation</h3>
              <p className="text-xs text-[#7B9CD2] max-w-sm mt-1">
                Choose any customer chat session on the left to inspect the RAG AI transcript or reply live as a support officer.
              </p>
            </div>
          ) : (
            <>
              {/* Active Session Header */}
              <div className="p-4 bg-[#020F2E] border-b border-[#14294F] flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#00DF8F]">
                      #{activeSession.ticket_code}
                    </span>
                    <h3 className="text-sm font-bold text-white">
                      {activeSession.customer_name || 'Website Visitor'}
                    </h3>
                    {statusBadge(activeSession.status)}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#A8BBD6] mt-1">
                    {activeSession.customer_phone ? (
                      <a
                        href={`https://wa.me/${activeSession.customer_phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00DF8F] hover:underline font-mono flex items-center gap-1"
                      >
                        <span>WhatsApp: {activeSession.customer_phone}</span>
                        <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                      </a>
                    ) : (
                      <span>No phone submitted yet</span>
                    )}
                    {activeSession.escalation_reason && (
                      <span className="text-amber-300">
                        • Escalation: &ldquo;{activeSession.escalation_reason}&rdquo;
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {activeSession.status !== 'ai_active' && (
                    <button
                      onClick={() =>
                        handleStatusChange(activeSession, 'ai_active', 'AI Concierge Mode')
                      }
                      className="px-2.5 py-1.5 rounded-xl bg-[#14294F] hover:bg-[#0D95FE] text-[#A8BBD6] hover:text-[#00284D] text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Return to AI
                    </button>
                  )}
                  {activeSession.status !== 'resolved' && (
                    <button
                      onClick={() =>
                        handleStatusChange(activeSession, 'resolved', 'Resolved')
                      }
                      className="px-2.5 py-1.5 rounded-xl bg-[#00DF8F]/20 hover:bg-[#00DF8F] text-[#00DF8F] hover:text-[#003825] border border-[#00DF8F]/30 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      ✓ Resolve Ticket
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

              {/* Transcript Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[390px] bg-[#061229]">
                {activeSession.messages.length === 0 ? (
                  <p className="text-center text-xs text-[#7B9CD2] py-8">
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
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#7B9CD2]">
                          {m.sender === 'user'
                            ? activeSession.customer_name || 'Customer'
                            : m.sender === 'agent'
                            ? '👤 Live Officer'
                            : m.sender === 'system'
                            ? '⚡ System'
                            : '🤖 Axoora AI'}
                        </span>
                        <span className="text-[10px] font-mono text-[#7B9CD2]">{m.time}</span>
                      </div>
                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-line ${
                          m.sender === 'user'
                            ? 'bg-[#14294F] text-white rounded-tl-none border border-[#1E3A6B]'
                            : m.sender === 'agent'
                            ? 'bg-[#00DF8F] text-[#003825] font-medium rounded-tr-none'
                            : m.sender === 'system'
                            ? 'bg-amber-500/15 border border-amber-500/30 text-amber-200 rounded-tr-none'
                            : 'bg-[#0A1B3D] border border-[#0D95FE]/30 text-[#F2F5F9] rounded-tr-none'
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  ))
                )}
                <div ref={transcriptEndRef} />
              </div>

              {/* Officer Live Reply Composer */}
              <form
                onSubmit={handleSendOfficerReply}
                className="p-3.5 bg-[#020F2E] border-t border-[#14294F] space-y-2.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#7B9CD2] font-semibold">Replying as:</span>
                    <input
                      type="text"
                      value={agentName}
                      onChange={(e) => setAgentName(e.target.value)}
                      className="bg-[#0A1B3D] border border-[#14294F] focus:border-[#0D95FE] rounded-lg px-2.5 py-1 text-xs text-white outline-none w-48"
                    />
                  </div>
                  <span className="text-[11px] text-[#7B9CD2]">
                    Replies appear in the customer&apos;s chat drawer within seconds
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={`Reply to ${activeSession.customer_name || 'customer'} (#${activeSession.ticket_code})...`}
                    className="flex-1 bg-[#0A1B3D] border border-[#14294F] focus:border-[#00DF8F] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#7B9CD2] outline-none"
                  />
                  <button
                    type="submit"
                    disabled={sendingReply || !replyText.trim()}
                    className="px-4 py-2.5 rounded-xl bg-[#00DF8F] hover:bg-emerald-300 disabled:opacity-50 text-[#003825] font-bold text-xs transition-all cursor-pointer shrink-0"
                  >
                    {sendingReply ? 'Sending...' : 'Send Officer Reply'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Delete Chat Session"
        message={
          deleteTarget
            ? `Are you sure you want to permanently delete Ticket #${deleteTarget.ticket_code} (${deleteTarget.customer_name || 'Website Visitor'}) and its message transcript?`
            : ''
        }
        confirmLabel="Delete Session"
        variant="danger"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};
