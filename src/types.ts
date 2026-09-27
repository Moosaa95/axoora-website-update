export type ScreenType = 
  | 'personal'
  | 'business-treasury'
  | 'pos-agents'
  | 'whatsapp-ai'
  | 'ajo-vaults'
  | 'api-docs';

export interface BankAccount {
  accountNumber: string;
  accountName: string;
  bankName: string;
  bankCode: string;
  balance: number;
  tier: number;
  apy: number;
}

export interface Transaction {
  id: string;
  type: 'inflow' | 'outflow';
  amount: number;
  recipient: string;
  bank: string;
  accountNumber: string;
  category: string;
  timestamp: string;
  status: 'SETTLED' | 'PENDING' | 'CLEARED';
  nipRef: string;
  fee: number;
}

export interface AjoGroup {
  id: string;
  name: string;
  contributionAmount: number;
  frequency: 'Daily' | 'Weekly' | 'Monthly';
  totalMembers: number;
  currentTurn: number;
  myTurn: number;
  poolBalance: number;
  startDate: string;
  status: 'ACTIVE' | 'COLLECTING' | 'COMPLETED';
  members: {
    name: string;
    position: number;
    paid: boolean;
    avatar: string;
  }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text?: string;
  audio?: {
    duration: string;
    transcript: string;
  };
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
  cardPayload?: {
    type: 'TRANSFER_CONFIRM' | 'VTU_CONFIRM' | 'UTILITY_CONFIRM' | 'SCHEDULED_CONFIRM' | 'BALANCE_CARD';
    title: string;
    amount?: number;
    recipient?: string;
    bank?: string;
    accountNumber?: string;
    biller?: string;
    token?: string;
    fee: number;
    approved?: boolean;
  };
}

export interface PosTerminal {
  terminalId: string;
  model: string;
  location: string;
  operator: string;
  status: 'ONLINE' | 'STANDBY' | 'SETTLING';
  sim1: 'MTN 4G' | 'Airtel 4G' | 'Glo 4G' | '9mobile 4G';
  sim2: 'MTN 4G' | 'Airtel 4G' | 'Glo 4G' | '9mobile 4G';
  todayVolume: number;
  todayTransactions: number;
  batteryLevel: number;
  paperRoll: number;
}
