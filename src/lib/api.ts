/**
 * Axoora API Client for Django Backend
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export interface ChatMessageResponse {
  session_id: string;
  ticket_code: string;
  status: 'ai_active' | 'escalated' | 'human_active' | 'resolved' | 'closed';
  reply: {
    id: string;
    sender: 'user' | 'ai' | 'agent' | 'system';
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
  };
}

export interface ChatEscalateResponse {
  success: boolean;
  session_id: string;
  ticket_code: string;
  whatsapp_url: string;
  status: string;
  message: string;
  transcript_message?: {
    id: string;
    sender: string;
    text: string;
    time: string;
    suggested_actions?: Array<{
      label: string;
      action: string;
      url?: string;
      primary?: boolean;
    }>;
  };
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

export async function submitWaitlistLead(data: {
  full_name: string;
  whatsapp_number: string;
  email: string;
  city?: string;
  interest: 'personal' | 'business' | 'pos-agent' | 'aggregator';
  consent?: boolean;
}) {
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
