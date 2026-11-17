/**
 * Axoora API Client for Django Backend
 */

export const getApiBaseUrl = (): string => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, '');
  }
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host && !host.includes('localhost') && !host.includes('127.0.0.1')) {
      return 'https://axoora-backend.onrender.com';
    }
  }
  if (process.env.NODE_ENV === 'production') {
    return 'https://axoora-backend.onrender.com';
  }
  return 'http://127.0.0.1:8000';
};

export const API_BASE_URL = getApiBaseUrl();

export interface ChatTranscriptMessageApi {
  id: string;
  sender: 'user' | 'ai' | 'agent' | 'system';
  sender_name?: string;
  text: string;
  time: string;
  suggested_actions?: Array<{
    label: string;
    action: string;
    url?: string;
    text?: string;
    interest?: string;
    primary?: boolean;
  }>;
  is_escalation_trigger?: boolean;
  created_at?: string;
}

export interface ChatSessionApi {
  id: string;
  session_id: string;
  ticket_code: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  status: 'ai_active' | 'escalated' | 'human_active' | 'resolved' | 'closed';
  priority?: 'low' | 'normal' | 'high' | 'urgent';
  issue_summary: string;
  escalation_reason: string;
  escalated_at: string | null;
  resolved_at: string | null;
  resolved_by_name?: string;
  resolution_notes?: string;
  assigned_agent_name?: string;
  created_at: string;
  updated_at: string;
  messages: ChatTranscriptMessageApi[];
}

export interface ChatMessageResponse {
  session_id: string;
  ticket_code: string;
  status: 'ai_active' | 'escalated' | 'human_active' | 'resolved' | 'closed';
  reply: ChatTranscriptMessageApi;
}

export interface ChatEscalateResponse {
  success: boolean;
  session_id: string;
  ticket_code: string;
  whatsapp_url: string;
  status: string;
  message: string;
  transcript_message?: ChatTranscriptMessageApi;
}

export async function sendChatMessage(params: {
  text: string;
  sessionId?: string | null;
  customerName?: string;
  customerPhone?: string;
}): Promise<ChatMessageResponse> {
  const res = await fetch(`${API_BASE_URL}/api/v1/chat/message/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: params.text,
      session_id: params.sessionId || undefined,
      customer_name: params.customerName || undefined,
      customer_phone: params.customerPhone || undefined,
    }),
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

export async function escalateChatToHuman(params: {
  sessionId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  reason?: string;
}): Promise<ChatEscalateResponse> {
  const res = await fetch(`${API_BASE_URL}/api/v1/chat/escalate/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      session_id: params.sessionId,
      customer_name: params.customerName,
      customer_phone: params.customerPhone,
      customer_email: params.customerEmail || undefined,
      reason: params.reason || undefined,
    }),
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

export async function getChatHistory(sessionId: string): Promise<ChatSessionApi> {
  const res = await fetch(`${API_BASE_URL}/api/v1/chat/history/${sessionId}/`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) {
    throw new Error(`Chat history error: ${res.status}`);
  }
  return res.json();
}

export async function getChatSessions(params?: {
  status?: string;
  search?: string;
  priority?: string;
}): Promise<{ count: number; results: ChatSessionApi[] }> {
  const qs = new URLSearchParams();
  if (params?.status && params.status !== 'all') qs.set('status', params.status);
  if (params?.search) qs.set('search', params.search);
  if (params?.priority && params.priority !== 'all') qs.set('priority', params.priority);
  const query = qs.toString() ? `?${qs.toString()}` : '';
  const res = await fetch(`${API_BASE_URL}/api/v1/chat/sessions/${query}`, {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) {
    throw new Error(`Chat sessions error: ${res.status}`);
  }
  return res.json();
}

export async function sendAgentReply(params: {
  sessionId: string;
  text: string;
  agentName?: string;
}): Promise<{ success: boolean; status: ChatSessionApi['status']; message: ChatTranscriptMessageApi }> {
  const res = await fetch(`${API_BASE_URL}/api/v1/chat/agent-reply/`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      session_id: params.sessionId,
      text: params.text,
      agent_name: params.agentName || undefined,
    }),
  });
  if (!res.ok) {
    throw new Error(`Agent reply error: ${res.status}`);
  }
  return res.json();
}

export async function sendChatInactivityEvent(params: {
  sessionId: string;
  action: 'warn' | 'disconnect';
}): Promise<{ success: boolean; action: string; status: ChatSessionApi['status']; message: ChatTranscriptMessageApi }> {
  const res = await fetch(`${API_BASE_URL}/api/v1/chat/inactivity/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      session_id: params.sessionId,
      action: params.action,
    }),
  });
  if (!res.ok) {
    throw new Error(`Inactivity event error: ${res.status}`);
  }
  return res.json();
}

export async function updateChatSession(
  sessionId: string,
  data: Partial<
    Pick<
      ChatSessionApi,
      | 'status'
      | 'customer_name'
      | 'customer_phone'
      | 'issue_summary'
      | 'priority'
      | 'resolved_by_name'
      | 'resolution_notes'
    >
  >
): Promise<{ success: boolean; data: ChatSessionApi }> {
  const res = await fetch(`${API_BASE_URL}/api/v1/chat/sessions/${sessionId}/`, {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(`Update session error: ${res.status}`);
  }
  return res.json();
}

export async function deleteChatSession(sessionId: string): Promise<{ success: boolean }> {
  const res = await fetch(`${API_BASE_URL}/api/v1/chat/sessions/${sessionId}/`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error(`Delete session error: ${res.status}`);
  }
  return res.json();
}

export interface WaitlistSubmissionPayload {
  full_name: string;
  whatsapp_number: string;
  email: string;
  city?: string;
  state?: string;
  business_name?: string;
  interest: 'personal' | 'business' | 'pos-agent' | 'aggregator';
  consent?: boolean;
  notes?: string;
  source?: string;
  business_type?: string;
  cac_number?: string;
  sector?: string;
  pos_model?: string;
  terminal_count?: number;
  street_address?: string;
  settlement_type?: string;
  settlement_bank?: string;
  settlement_account_number?: string;
  settlement_account_name?: string;
  application_ref?: string;
  tracking_number?: string;
  metadata?: Record<string, any>;
}

export interface ApplicationTrackingResult {
  found: boolean;
  message?: string;
  application_ref?: string;
  tracking_number?: string;
  status?: string;
  status_display?: string;
  business_name?: string;
  pos_model?: string;
  terminal_count?: number;
  city?: string;
  state?: string;
  submitted_at?: string;
  updated_at?: string;
}

export async function submitWaitlistLead(data: WaitlistSubmissionPayload) {
  const res = await fetch(`${API_BASE_URL}/api/v1/waitlist/submit/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Waitlist submission error: ${res.status}`);
  }

  return res.json();
}

export async function trackApplication(trackingCode: string): Promise<ApplicationTrackingResult> {
  const cleanCode = encodeURIComponent(trackingCode.trim());
  const res = await fetch(`${API_BASE_URL}/api/v1/waitlist/track/${cleanCode}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    if (res.status === 404) {
      return { found: false, message: `Application reference or tracking code '${trackingCode}' not found.` };
    }
    throw new Error(`Tracking lookup error: ${res.status}`);
  }

  return res.json();
}

export async function submitContactInquiry(data: {
  full_name: string;
  email: string;
  phone?: string;
  category: string;
  subject: string;
  message: string;
}) {
  const res = await fetch(`${API_BASE_URL}/api/v1/contact/submit/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Contact inquiry error: ${res.status}`);
  }

  return res.json();
}
