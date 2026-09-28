export type ScreenType = 
  | 'home'
  | 'personal'
  | 'business'
  | 'pos-agents'
  | 'about'
  | 'impact'
  | 'stories'
  | 'journal'
  | 'press'
  | 'events'
  | 'careers'
  | 'help'
  | 'legal'
  | 'contact';

export interface WaitlistSubmission {
  fullName: string;
  whatsappNumber: string;
  email: string;
  city?: string;
  interest: 'personal' | 'business' | 'pos-agent' | 'aggregator';
  consent: boolean;
}

export interface BankAccount {
  accountNumber: string;
  accountName: string;
  bankName: string;
  balance: number;
  currency: string;
  tier: string;
}

export interface JournalArticle {
  id: string;
  category: 'Engineering' | 'Technology' | 'Business' | 'Guides';
  title: string;
  summary: string;
  readTime: string;
  date: string;
  author: string;
}

export interface FaqItem {
  id?: string;
  question: string;
  answer: string;
  category: 'General' | 'Personal & Cards' | 'Save and Earn' | 'Paycircle' | 'Business & POS' | 'Security';
  tags?: string[];
  actionLink?: {
    label: string;
    action: 'whatsapp' | 'waitlist' | 'navigate' | 'email';
    screen?: ScreenType;
    interest?: 'personal' | 'business' | 'pos-agent' | 'aggregator';
  };
}
