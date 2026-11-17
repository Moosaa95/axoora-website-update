'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export interface WhatsAppCommandFaqDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
  isLight?: boolean;
}

export type CommandCategory =
  | 'all'
  | 'transfers'
  | 'ocr'
  | 'voice'
  | 'utilities'
  | 'cards'
  | 'savings'
  | 'paycircle'
  | 'faqs';

export interface CommandItem {
  id: string;
  category: CommandCategory;
  categoryName: string;
  badge: string;
  badgeColor: string;
  icon: string;
  title: string;
  description: string;
  samplePrompt: string;
  mode: 'text' | 'image' | 'voice';
  aiResponse: {
    summary: string;
    details: Array<{ label: string; value: string; highlight?: boolean }>;
    footer: string;
  };
}

export interface DrawerFaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tag: string;
  actionPrompt?: string;
}

export const COMMAND_CATALOG: CommandItem[] = [
  // 1. TRANSFERS & NIP
  {
    id: 'tr-1',
    category: 'transfers',
    categoryName: 'Transfers',
    badge: 'Zero Fee',
    badgeColor: '#00DF8F',
    icon: 'send',
    title: 'Transfer by Recipient Name',
    description: 'Send money to frequent contacts or saved beneficiaries without typing account numbers.',
    samplePrompt: 'Axoora send ₦15,000 to Musa for lunch from main account',
    mode: 'text',
    aiResponse: {
      summary: 'Ready to send ₦15,000 to Musa Ibrahim (Kuda Bank · 2098411234)?',
      details: [
        { label: 'Recipient', value: 'Musa Ibrahim' },
        { label: 'Bank', value: 'Kuda Bank · 2098411234' },
        { label: 'Amount', value: '₦15,000.00', highlight: true },
        { label: 'Transfer Fee', value: '₦0.00 (Free)' },
      ],
      footer: 'Reply with your 4-digit PIN to confirm · Settles instantly via NIBSS',
    },
  },
  {
    id: 'tr-2',
    category: 'transfers',
    categoryName: 'Transfers',
    badge: 'Instant Verification',
    badgeColor: '#00DF8F',
    icon: 'account_balance',
    title: 'Direct Transfer with NUBAN & Bank',
    description: 'Provide an account number and bank name; Axoora verifies the name before sending.',
    samplePrompt: 'Transfer ₦50,000 to Halimah Balogun GTBank 0124981123',
    mode: 'text',
    aiResponse: {
      summary: 'Verified account for Halimah Balogun at Guaranty Trust Bank:',
      details: [
        { label: 'Beneficiary', value: 'Halimah Balogun' },
        { label: 'Bank & NUBAN', value: 'GTBank · 0124981123' },
        { label: 'Amount', value: '₦50,000.00', highlight: true },
        { label: 'Transfer Fee', value: '₦0.00 (Zero Fee)' },
      ],
      footer: 'Reply with your 4-digit PIN to authorize payment',
    },
  },
  {
    id: 'tr-3',
    category: 'transfers',
    categoryName: 'Transfers',
    badge: 'Pidgin Friendly',
    badgeColor: '#0D95FE',
    icon: 'forum',
    title: 'Pidgin Transfer & Split Bill',
    description: 'Talk to Axoora in Nigerian Pidgin: "Abeg help me wire 20k give Chidi".',
    samplePrompt: 'Abeg send ₦20,000 to Chidi for fuel from my balance',
    mode: 'text',
    aiResponse: {
      summary: 'I don resolve am: Chinedu Eze (Zenith Bank · 1014920491).',
      details: [
        { label: 'Beneficiary', value: 'Chinedu Eze' },
        { label: 'Bank', value: 'Zenith Bank · 1014920491' },
        { label: 'Amount', value: '₦20,000.00', highlight: true },
        { label: 'Fee', value: '₦0.00 (No charges)' },
      ],
      footer: 'Enter your 4-digit PIN make we dispatch am sharp-sharp',
    },
  },
  {
    id: 'tr-4',
    category: 'transfers',
    categoryName: 'Transfers',
    badge: 'Auto-Debit',
    badgeColor: '#8B5CF6',
    icon: 'schedule',
    title: 'Schedule Recurring Rent or Allowance',
    description: 'Set up an automated monthly standing order for allowance or rent directly in WhatsApp.',
    samplePrompt: 'Axoora schedule ₦35,000 monthly allowance to Mummy on the 28th',
    mode: 'text',
    aiResponse: {
      summary: 'Recurring standing order configured for Mrs. Amina Bello:',
      details: [
        { label: 'Recipient', value: 'Mrs. Amina Bello (Mummy)' },
        { label: 'Frequency', value: 'Monthly on the 28th' },
        { label: 'Amount', value: '₦35,000.00', highlight: true },
        { label: 'Status', value: 'Active Standing Order' },
      ],
      footer: 'You can pause or edit anytime by texting "Pause Mummy allowance"',
    },
  },
  {
    id: 'tr-5',
    category: 'transfers',
    categoryName: 'Transfers',
    badge: 'Share NUBAN',
    badgeColor: '#00DF8F',
    icon: 'badge',
    title: 'Share My Dedicated Axoora NUBAN',
    description: 'Generate an instant shareable bank details card formatted for friends or customers.',
    samplePrompt: 'Share my account details and NUBAN',
    mode: 'text',
    aiResponse: {
      summary: 'Here is your official Axoora Personal NUBAN ready to copy & share:',
      details: [
        { label: 'Bank Name', value: 'Axoora MFB / Providus' },
        { label: 'Account Number', value: '9012345678', highlight: true },
        { label: 'Account Name', value: 'Adaeze Bello' },
        { label: 'Axoora ID', value: '@adaeze' },
      ],
      footer: 'Receives instant interbank transfers 24/7 with zero downtime',
    },
  },
  {
    id: 'tr-6',
    category: 'transfers',
    categoryName: 'Transfers',
    badge: 'Limits & Upgrade',
    badgeColor: '#0D95FE',
    icon: 'tune',
    title: 'Check & Upgrade Daily Transfer Limits',
    description: 'Check your tier and upgrade transfer limits with automated biometric KYC.',
    samplePrompt: 'What is my daily transfer limit and how do I upgrade to Tier 3?',
    mode: 'text',
    aiResponse: {
      summary: 'You are currently on Tier 3 (Unlimited Daily Volume):',
      details: [
        { label: 'Current Tier', value: 'Tier 3 (Verified)' },
        { label: 'Daily Cap', value: 'No Daily Limit', highlight: true },
        { label: 'BVN & NIN Status', value: 'Linked & Confirmed' },
        { label: 'Settlement Speed', value: 'Instant (< 1 second)' },
      ],
      footer: 'CBN licensed · No branch visits needed',
    },
  },

  // 2. PHOTO & INVOICE OCR
  {
    id: 'ocr-1',
    category: 'ocr',
    categoryName: 'Scan & Pay',
    badge: 'Photo OCR',
    badgeColor: '#00DF8F',
    icon: 'document_scanner',
    title: 'Pay Vendor Invoice from Photo',
    description: 'Snap or forward any invoice photo. Axoora extracts the bank, NUBAN, and amount automatically.',
    samplePrompt: 'Axoora please pay this invoice for me [Photo Attached]',
    mode: 'image',
    aiResponse: {
      summary: 'Invoice details extracted from your photo:',
      details: [
        { label: 'Vendor', value: 'Halimah Balogun (Bello Fabrics)' },
        { label: 'Bank & NUBAN', value: 'GTBank · 0124981123' },
        { label: 'Invoice Amount', value: '₦25,000.00', highlight: true },
        { label: 'Match Confidence', value: '99.8% Exact Match' },
      ],
      footer: 'Reply with PIN to disburse payment directly to vendor',
    },
  },
  {
    id: 'ocr-2',
    category: 'ocr',
    categoryName: 'Scan & Pay',
    badge: 'Handwritten Paper',
    badgeColor: '#00DF8F',
    icon: 'edit_note',
    title: 'Scan Handwritten Bank Slip',
    description: 'Send a photo of a vendor who wrote their account number on a piece of paper or paper bag.',
    samplePrompt: 'Extract account number from this handwritten paper and pay ₦12,500',
    mode: 'image',
    aiResponse: {
      summary: 'Handwriting recognized and verified on bank rails:',
      details: [
        { label: 'Parsed Account', value: 'Wema Bank · 0219481920' },
        { label: 'Resolved Name', value: 'Chinedu Eze' },
        { label: 'Amount to Pay', value: '₦12,500.00', highlight: true },
        { label: 'Transfer Fee', value: '₦0.00' },
      ],
      footer: 'Reply with your 4-digit PIN to confirm payment',
    },
  },
  {
    id: 'ocr-3',
    category: 'ocr',
    categoryName: 'Scan & Pay',
    badge: 'Electricity Slip',
    badgeColor: '#F59E0B',
    icon: 'electric_meter',
    title: 'Scan Electricity Bill or Meter Notice',
    description: 'Snap a photo of your meter card or bill; Axoora parses the meter ID and loads units.',
    samplePrompt: 'Snap meter notice: Buy ₦10,000 prepaid units for this meter',
    mode: 'image',
    aiResponse: {
      summary: 'Meter slip parsed: AEDC Prepaid Meter 0149204918:',
      details: [
        { label: 'Provider', value: 'Abuja Electricity (AEDC)' },
        { label: 'Meter Number', value: '0149204918' },
        { label: 'Units Token', value: '4920 - 1824 - 0192 - 9481', highlight: true },
        { label: 'Power Credited', value: '52.4 kWh' },
      ],
      footer: '20-digit token generated and saved in your chat history',
    },
  },

  // 3. VOICE NOTE AI
  {
    id: 'vn-1',
    category: 'voice',
    categoryName: 'Voice Notes',
    badge: 'Voice Payment',
    badgeColor: '#53BDEB',
    icon: 'mic',
    title: 'Send Money with a 5-Second Voice Note',
    description: 'Press record and speak naturally in English or Pidgin: "Axoora send 5k transport to Dad".',
    samplePrompt: '🎙️ "Axoora send ₦5,000 transport to Dad from main account"',
    mode: 'voice',
    aiResponse: {
      summary: 'Voice instruction understood and matched to your voiceprint:',
      details: [
        { label: 'Recipient', value: 'Babatunde Ibrahim (Dad)' },
        { label: 'Bank', value: 'First Bank · 3089124419' },
        { label: 'Amount', value: '₦5,000.00', highlight: true },
        { label: 'Voice Match', value: 'Verified Voiceprint' },
      ],
      footer: 'Reply with your 4-digit PIN to complete the transfer',
    },
  },
  {
    id: 'vn-2',
    category: 'voice',
    categoryName: 'Voice Notes',
    badge: 'Voice Balance',
    badgeColor: '#53BDEB',
    icon: 'mic',
    title: 'Check Balance via Voice Note',
    description: 'Send a quick voice note asking for your balance while walking, driving, or in the market.',
    samplePrompt: '🎙️ "Axoora how much is in my account right now?"',
    mode: 'voice',
    aiResponse: {
      summary: 'Here is your current balance breakdown:',
      details: [
        { label: 'Available Balance', value: '₦97,430.00', highlight: true },
        { label: 'Halal Vault', value: '₦115,000.00 (Locked)' },
        { label: 'USD Virtual Card', value: '$50.00 (₦74,250)' },
        { label: 'Today\'s Spend', value: '₦15,000.00' },
      ],
      footer: 'Private encrypted message sent directly to you',
    },
  },
  {
    id: 'vn-3',
    category: 'voice',
    categoryName: 'Voice Notes',
    badge: 'Multilingual',
    badgeColor: '#53BDEB',
    icon: 'mic',
    title: 'Spoken Payments in Hausa, Yoruba & Igbo',
    description: 'Axoora understands spoken Pidgin, Yoruba, Hausa, and Igbo financial requests.',
    samplePrompt: '🎙️ "Axoora tura kudi dubu ashirin ga Amina" / "E fi 20k ranse si Amina"',
    mode: 'voice',
    aiResponse: {
      summary: 'Regional language instruction resolved successfully:',
      details: [
        { label: 'Language', value: 'Hausa / Yoruba Regional Voice' },
        { label: 'Beneficiary', value: 'Amina Bello (GTBank)' },
        { label: 'Amount', value: '₦20,000.00', highlight: true },
        { label: 'Status', value: 'Awaiting PIN confirmation' },
      ],
      footer: 'Reply with your 4-digit PIN to authorize',
    },
  },

  // 4. BILLS & UTILITIES
  {
    id: 'ut-1',
    category: 'utilities',
    categoryName: 'Bills & Airtime',
    badge: '2% Cashback',
    badgeColor: '#00DF8F',
    icon: 'bolt',
    title: 'Instant Airtime Recharge with Cashback',
    description: 'Recharge MTN, Airtel, Glo, or 9mobile with automatic 2% cashback credited back to your balance.',
    samplePrompt: 'Buy ₦2,000 MTN airtime for 08031234567 with cashback',
    mode: 'text',
    aiResponse: {
      summary: 'MTN Airtime top-up processed with 2% cashback:',
      details: [
        { label: 'Phone Number', value: '0803 123 4567' },
        { label: 'Network', value: 'MTN Nigeria' },
        { label: 'Airtime Loaded', value: '₦2,000.00', highlight: true },
        { label: 'Cashback Earned', value: '+₦40.00 (Credited)' },
      ],
      footer: 'Airtime loaded instantly to line · No fee',
    },
  },
  {
    id: 'ut-2',
    category: 'utilities',
    categoryName: 'Bills & Airtime',
    badge: 'Instant Token',
    badgeColor: '#00DF8F',
    icon: 'power',
    title: 'Pay Prepaid Electricity (AEDC, EKEDC, IBEDC)',
    description: 'Pay prepaid electricity bills and receive your 20-digit meter token immediately in WhatsApp.',
    samplePrompt: 'Pay ₦10,000 AEDC prepaid electricity for meter 0149204918',
    mode: 'text',
    aiResponse: {
      summary: 'AEDC prepaid payment successful. Here is your token:',
      details: [
        { label: 'Provider', value: 'Abuja Electricity (AEDC)' },
        { label: 'Meter Number', value: '0149204918' },
        { label: 'Token', value: '4920 - 1824 - 0192 - 9481', highlight: true },
        { label: 'Units Credited', value: '52.4 kWh' },
      ],
      footer: 'Zero convenience fee · Token saved in your chat history',
    },
  },
  {
    id: 'ut-3',
    category: 'utilities',
    categoryName: 'Bills & Airtime',
    badge: 'Fast Reconnect',
    badgeColor: '#00DF8F',
    icon: 'tv',
    title: 'Renew DStv, GOtv, or StarTimes',
    description: 'Reactivate cable TV subscriptions without leaving WhatsApp; clear error codes automatically.',
    samplePrompt: 'Renew my DStv Compact package for smartcard 1029481029',
    mode: 'text',
    aiResponse: {
      summary: 'DStv Compact package renewed for Smartcard 1029481029:',
      details: [
        { label: 'Package', value: 'DStv Compact (1 Month)' },
        { label: 'Smartcard No', value: '1029481029' },
        { label: 'Amount Paid', value: '₦15,700.00', highlight: true },
        { label: 'Viewing Expiry', value: 'Next Month (30 Days)' },
      ],
      footer: 'Channels reactivated automatically within 60 seconds',
    },
  },

  // 5. CARDS & CONTROLS
  {
    id: 'cd-1',
    category: 'cards',
    categoryName: 'Cards & Controls',
    badge: 'USD Mastercard',
    badgeColor: '#0D95FE',
    icon: 'credit_card',
    title: 'Create Instant Virtual Dollar Card',
    description: 'Spin up a virtual USD card in seconds for international payments, streaming, and software subscriptions.',
    samplePrompt: 'Create a virtual dollar card with $50 for my OpenAI subscription',
    mode: 'text',
    aiResponse: {
      summary: 'Virtual Dollar Mastercard created and funded at interbank rate:',
      details: [
        { label: 'Card Number', value: '4111 •••• •••• 9204' },
        { label: 'Funded Balance', value: '$50.00 (₦74,250)', highlight: true },
        { label: 'Expiry / CVV', value: '10/29 · 382' },
        { label: '3D Secure OTP', value: 'WhatsApp OTP Active' },
      ],
      footer: 'Works on OpenAI, Netflix, Amazon, Spotify, Apple, and Google Play',
    },
  },
  {
    id: 'cd-2',
    category: 'cards',
    categoryName: 'Cards & Controls',
    badge: 'Instant Lock',
    badgeColor: '#EF4444',
    icon: 'lock',
    title: '1-Tap Freeze / Unfreeze Debit Card',
    description: 'Misplaced your physical card? Send a 1-word freeze command to block unauthorized charges immediately.',
    samplePrompt: 'Freeze my physical debit card immediately',
    mode: 'text',
    aiResponse: {
      summary: 'Your Physical Debit Card (*8421) has been FROZEN instantly:',
      details: [
        { label: 'Card Mask', value: '5399 •••• •••• 8421' },
        { label: 'Card Status', value: 'FROZEN (Locked)', highlight: true },
        { label: 'ATM / POS Rail', value: 'All Attempts Blocked' },
        { label: 'To Unlock', value: 'Text "Unfreeze card"' },
      ],
      footer: 'Zero liability protection · Text "Unfreeze" anytime with PIN',
    },
  },
  {
    id: 'cd-3',
    category: 'cards',
    categoryName: 'Cards & Controls',
    badge: 'Spend Cap',
    badgeColor: '#0D95FE',
    icon: 'tune',
    title: 'Set Daily Card Spending Limit',
    description: 'Protect against overcharging by setting a maximum daily spend threshold on your card.',
    samplePrompt: 'Set my physical debit card daily limit to ₦100,000',
    mode: 'text',
    aiResponse: {
      summary: 'Daily spending limit updated for Debit Card (*8421):',
      details: [
        { label: 'Card', value: 'Platinum Debit (*8421)' },
        { label: 'New Daily Cap', value: '₦100,000.00', highlight: true },
        { label: 'Online Spend', value: 'Capped at limit' },
        { label: 'ATM / POS', value: 'Capped at limit' },
      ],
      footer: 'Takes effect immediately · Change anytime in chat',
    },
  },

  // 6. HALAL VAULT
  {
    id: 'sv-1',
    category: 'savings',
    categoryName: 'Halal Vault',
    badge: '0% Riba',
    badgeColor: '#F59E0B',
    icon: 'savings',
    title: 'Lock Capital in Shari\'ah Mudarabah Vault',
    description: 'Save capital ethically. Funds partner directly with food trade and physical commerce with zero debt interest.',
    samplePrompt: 'Lock ₦150,000 into my 3-month Halal Mudarabah Vault',
    mode: 'text',
    aiResponse: {
      summary: '₦150,000 locked into Mudarabah Wholesale Pool (3 Months):',
      details: [
        { label: 'Capital Saved', value: '₦150,000.00', highlight: true },
        { label: 'Tenor', value: '90 Days (Maturity in 3 months)' },
        { label: 'Profit Share Model', value: '70/30 Profit Sharing' },
        { label: 'Estimated Return', value: '+₦6,750 (Halal Profit)' },
      ],
      footer: 'Endorsed by Islamic Finance Advisory Board · Zero debt interest',
    },
  },
  {
    id: 'sv-2',
    category: 'savings',
    categoryName: 'Halal Vault',
    badge: 'Target Savings',
    badgeColor: '#F59E0B',
    icon: 'mosque',
    title: 'Create Hajj or Family Target Vault',
    description: 'Build a dedicated targeted vault for sacred pilgrimages or family feasts with automatic weekly micro-saves.',
    samplePrompt: 'Create a Hajj savings target with ₦25,000 weekly auto-save',
    mode: 'text',
    aiResponse: {
      summary: 'Target Vault "Hajj Pilgrimage" activated:',
      details: [
        { label: 'Target Vault', value: 'Hajj Pilgrimage' },
        { label: 'Weekly Auto-save', value: '₦25,000.00', highlight: true },
        { label: 'Target Goal', value: '₦4,500,000.00' },
        { label: 'Schedule', value: 'Every Monday' },
      ],
      footer: 'Zero bank maintenance deductions · Withdraw anytime upon maturity',
    },
  },

  // 7. PAYCIRCLE (AJO)
  {
    id: 'pc-1',
    category: 'paycircle',
    categoryName: 'Paycircle (Ajo)',
    badge: 'Thrift Payout',
    badgeColor: '#8B5CF6',
    icon: 'group',
    title: 'Check Balogun Circle Payout Turn',
    description: 'Query your upcoming turn in your neighborhood or merchant thrift circle directly in chat.',
    samplePrompt: 'When is my payout turn in Balogun Traders Paycircle?',
    mode: 'text',
    aiResponse: {
      summary: 'You are Turn 3 of 10 in "Balogun Traders Paycircle":',
      details: [
        { label: 'Circle Name', value: 'Balogun Traders Guild' },
        { label: 'Your Turn', value: 'Turn 3 (Receives this Friday)', highlight: true },
        { label: 'Lump Sum Payout', value: '₦200,000.00' },
        { label: 'Members Paid', value: '10/10 Confirmed' },
      ],
      footer: 'Automated escrow clearing · No cash collector risks',
    },
  },
  {
    id: 'pc-2',
    category: 'paycircle',
    categoryName: 'Paycircle (Ajo)',
    badge: 'Contribution',
    badgeColor: '#8B5CF6',
    icon: 'sync_alt',
    title: 'Pay Weekly Ajo Contribution',
    description: 'Pay your contribution instantly or verify your automated contribution status.',
    samplePrompt: 'Pay my ₦20,000 weekly contribution for Lekki Foodies Circle',
    mode: 'text',
    aiResponse: {
      summary: 'Contribution of ₦20,000 confirmed for Lekki Foodies Circle:',
      details: [
        { label: 'Circle', value: 'Lekki Foodies Circle' },
        { label: 'Contribution', value: '₦20,000.00', highlight: true },
        { label: 'Pot Total', value: '₦180,000 / ₦200,000' },
        { label: 'Current Turn', value: 'Fatima Bello' },
      ],
      footer: 'Receipt shared with group admin automatically',
    },
  },
];

export const DRAWER_FAQS: DrawerFaqItem[] = [
  {
    id: 'dfaq-1',
    question: 'How do I start banking on WhatsApp with Axoora?',
    answer:
      'Simply send "Hi" to our verified WhatsApp number (+234 911 000 2966). Our automated AI onboarding will guide you through identity verification, issue your dedicated NUBAN, and set your private 4-digit transfer PIN in less than 60 seconds.',
    category: 'Getting Started',
    tag: 'Quick Setup',
    actionPrompt: 'Hi Axoora, I want to open an account',
  },
  {
    id: 'dfaq-2',
    question: 'What happens if my phone gets lost or stolen?',
    answer:
      'No one can access your funds without your secret 4-digit PIN. Additionally, you can immediately freeze your entire account from any secondary phone by messaging our emergency hotline or using the web security portal.',
    category: 'Security',
    tag: 'Emergency Freeze',
    actionPrompt: 'Emergency: Freeze my Axoora account',
  },
  {
    id: 'dfaq-3',
    question: 'Can I send money to any Nigerian bank from WhatsApp?',
    answer:
      'Yes. Axoora routes directly via the NIBSS Instant Payment (NIP) clearing rail, allowing instant settlement to GTBank, Access, Zenith, FirstBank, UBA, Kuda, Moniepoint, OPay, and all 40+ licensed commercial banks with zero transfer fees.',
    category: 'Transfers',
    tag: '40+ Banks',
    actionPrompt: 'Axoora send ₦10,000 to Babatunde at Access Bank',
  },
  {
    id: 'dfaq-4',
    question: 'How does the receipt photo OCR feature work?',
    answer:
      'Take a picture of any invoice, handwritten paper slip, or billing notice and send it to our WhatsApp chat. Our computer vision OCR model parses the beneficiary name, bank, NUBAN, and amount, presenting a ready-to-pay confirmation card.',
    category: 'Photo OCR',
    tag: 'Vision AI',
    actionPrompt: 'Pay this invoice for me [Photo Attached]',
  },
  {
    id: 'dfaq-5',
    question: 'Are my voice notes secure when banking?',
    answer:
      'Yes. Axoora uses biometric voiceprint verification along with neural speech-to-intent parsing. Outgoing transfers still require your 4-digit PIN confirmation or biometric authorization.',
    category: 'Voice Notes',
    tag: 'Voice Security',
    actionPrompt: '🎙️ "Axoora how much is in my account?"',
  },
];

export const WhatsAppCommandFaqDrawer: React.FC<WhatsAppCommandFaqDrawerProps> = ({
  isOpen,
  onClose,
  initialCategory = 'all',
  isLight: propIsLight,
}) => {
  const { theme } = useTheme();
  const isLight = propIsLight ?? theme === 'light';

  const [activeCategory, setActiveCategory] = useState<CommandCategory>(
    (initialCategory as CommandCategory) || 'all'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCommandId, setSelectedCommandId] = useState<string>(COMMAND_CATALOG[0].id);
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);
  const [openFaqId, setOpenFaqId] = useState<string | null>(DRAWER_FAQS[0].id);

  // Esc key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filter commands
  const filteredCommands = useMemo(() => {
    return COMMAND_CATALOG.filter((cmd) => {
      const matchesCategory =
        activeCategory === 'all' || activeCategory === 'faqs' || cmd.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        cmd.title.toLowerCase().includes(q) ||
        cmd.description.toLowerCase().includes(q) ||
        cmd.samplePrompt.toLowerCase().includes(q) ||
        cmd.categoryName.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const activeCommand = useMemo(() => {
    const found = filteredCommands.find((c) => c.id === selectedCommandId);
    return found || filteredCommands[0] || COMMAND_CATALOG[0];
  }, [selectedCommandId, filteredCommands]);

  const handleCopy = (text: string) => {
    const clean = text.replace(/^🎙️\s*"/, '').replace(/"$/, '');
    navigator.clipboard.writeText(clean);
    setCopiedPrompt(text);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  const handleLaunchWhatsApp = (promptText: string) => {
    const cleaned = promptText
      .replace(/^🎙️\s*"/, '')
      .replace(/"$/, '')
      .replace(/\[Photo Attached\]/g, '')
      .trim();
    const url = `https://wa.me/2349110002966?text=${encodeURIComponent(cleaned)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Dimmed backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
      />

      {/* Slide-over panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className={`fixed inset-y-0 right-0 max-w-full flex w-full md:max-w-3xl lg:max-w-4xl border-l shadow-2xl flex-col z-50 overflow-hidden ${
          isLight
            ? 'bg-slate-50 text-slate-900 border-slate-200'
            : 'bg-[#0B132B] text-slate-100 border-slate-800'
        }`}
      >
        {/* ================================================================= */}
        {/* 1. CLEAN SPACIOUS HEADER */}
        {/* ================================================================= */}
        <div
          className={`px-5 py-4 sm:px-6 sm:py-5 border-b shrink-0 flex items-center justify-between gap-4 ${
            isLight ? 'bg-white border-slate-200' : 'bg-[#0F1B38] border-slate-800'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-md shadow-[#25D366]/20 shrink-0">
              <span className="material-symbols-outlined text-[24px]">chat</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold tracking-tight">
                  Bank on WhatsApp
                </h2>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Verified
                </span>
              </div>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Send money, pay bills, and manage your account by chatting · +234 911 000 2966
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
              isLight
                ? 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="Close Drawer (Esc)"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* ================================================================= */}
        {/* 2. SEARCH & CATEGORY PILLS */}
        {/* ================================================================= */}
        <div
          className={`px-5 py-3.5 sm:px-6 border-b shrink-0 flex flex-col gap-3 ${
            isLight ? 'bg-white/70 border-slate-200' : 'bg-[#0D1832] border-slate-800/80'
          }`}
        >
          {/* Search Input */}
          <div className="relative w-full">
            <span
              className={`material-symbols-outlined text-[18px] absolute left-3.5 top-1/2 -translate-y-1/2 ${
                isLight ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search what you want to do (e.g., 'send money', 'NEPA', 'airtime', 'freeze card')..."
              className={`w-full pl-10 pr-9 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none transition-all ${
                isLight
                  ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
                  : 'bg-slate-900/60 border-slate-800 text-white placeholder-slate-500 focus:bg-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs cursor-pointer p-1"
              >
                ✕
              </button>
            )}
          </div>

          {/* Clean Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
            {[
              { id: 'all', label: 'All Commands' },
              { id: 'transfers', label: '💸 Send Money' },
              { id: 'ocr', label: '📸 Scan & Pay' },
              { id: 'voice', label: '🎙️ Voice Notes' },
              { id: 'utilities', label: '⚡ Bills & Airtime' },
              { id: 'cards', label: '💳 Cards' },
              { id: 'savings', label: '🌙 Halal Vault' },
              { id: 'paycircle', label: '🤝 Paycircle' },
              { id: 'faqs', label: '❓ FAQs' },
            ].map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as CommandCategory)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#25D366] text-white shadow-sm font-semibold'
                      : isLight
                      ? 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                      : 'bg-slate-800/50 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================================================================= */}
        {/* 3. MAIN CONTENT AREA */}
        {/* ================================================================= */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {activeCategory === 'faqs' ? (
            /* FAQS VIEW */
            <div className="max-w-2xl mx-auto flex flex-col gap-4">
              <div className="mb-2">
                <h3 className="text-base font-bold">Frequently Asked Questions</h3>
                <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Everything you need to know about safety, zero fees, and WhatsApp banking.
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                {DRAWER_FAQS.map((faq) => {
                  const isOpenFaq = openFaqId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className={`rounded-xl border transition-colors overflow-hidden ${
                        isLight
                          ? 'bg-white border-slate-200 shadow-xs'
                          : 'bg-[#0E1A36] border-slate-800'
                      }`}
                    >
                      <button
                        onClick={() => setOpenFaqId(isOpenFaq ? null : faq.id)}
                        className={`w-full p-4 text-left flex items-center justify-between gap-3 cursor-pointer ${
                          isLight ? 'hover:bg-slate-50' : 'hover:bg-slate-800/40'
                        }`}
                      >
                        <span className="font-semibold text-xs sm:text-sm">
                          {faq.question}
                        </span>
                        <span
                          className={`material-symbols-outlined text-[18px] shrink-0 transition-transform ${
                            isOpenFaq ? 'rotate-180' : ''
                          } ${isLight ? 'text-slate-400' : 'text-slate-500'}`}
                        >
                          keyboard_arrow_down
                        </span>
                      </button>

                      <AnimatePresence>
                        {isOpenFaq && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.18 }}
                            className={`px-4 pb-4 pt-1 text-xs leading-relaxed border-t ${
                              isLight
                                ? 'text-slate-600 border-slate-100 bg-slate-50/50'
                                : 'text-slate-300 border-slate-800/60 bg-slate-900/30'
                            }`}
                          >
                            <p>{faq.answer}</p>
                            {faq.actionPrompt && (
                              <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between flex-wrap gap-2">
                                <span className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                                  Sample prompt: <strong className={isLight ? 'text-slate-800' : 'text-white'}>&ldquo;{faq.actionPrompt}&rdquo;</strong>
                                </span>
                                <button
                                  onClick={() => handleLaunchWhatsApp(faq.actionPrompt!)}
                                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-500 flex items-center gap-1 cursor-pointer"
                                >
                                  <span>Send on WhatsApp</span>
                                  <span className="material-symbols-outlined text-[13px]">arrow_outward</span>
                                </button>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* INTERACTIVE TWO-COLUMN WORKSPACE */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full">
              {/* Left Column: Commands List */}
              <div className="lg:col-span-5 flex flex-col gap-2.5">
                <div className="flex items-center justify-between px-1">
                  <span
                    className={`text-[11px] font-semibold uppercase tracking-wider ${
                      isLight ? 'text-slate-500' : 'text-slate-400'
                    }`}
                  >
                    Choose a Command ({filteredCommands.length})
                  </span>
                  <span className={`text-[11px] ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
                    Click to test
                  </span>
                </div>

                <div className="flex flex-col gap-2 max-h-[520px] overflow-y-auto pr-1">
                  {filteredCommands.length === 0 ? (
                    <div
                      className={`p-6 text-center rounded-2xl border text-xs ${
                        isLight
                          ? 'bg-white border-slate-200 text-slate-500'
                          : 'bg-[#0E1A36] border-slate-800 text-slate-400'
                      }`}
                    >
                      No commands found for &ldquo;{searchQuery}&rdquo;. Try another term.
                    </div>
                  ) : (
                    filteredCommands.map((cmd) => {
                      const isSelected = activeCommand.id === cmd.id;
                      return (
                        <div
                          key={cmd.id}
                          onClick={() => setSelectedCommandId(cmd.id)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col gap-1 text-left ${
                            isSelected
                              ? isLight
                                ? 'bg-white border-[#25D366] ring-2 ring-[#25D366]/20 shadow-sm'
                                : 'bg-[#122246] border-[#25D366] ring-2 ring-[#25D366]/20 shadow-md'
                              : isLight
                              ? 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                              : 'bg-[#0E1A36] border-slate-800/80 hover:border-slate-700 hover:bg-[#111F40]'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                                  isSelected
                                    ? 'bg-[#25D366] text-white'
                                    : isLight
                                    ? 'bg-slate-100 text-slate-600'
                                    : 'bg-slate-800 text-slate-300'
                                }`}
                              >
                                <span className="material-symbols-outlined text-[15px]">
                                  {cmd.icon}
                                </span>
                              </div>
                              <h4 className="font-semibold text-xs truncate">
                                {cmd.title}
                              </h4>
                            </div>

                            <span
                              className={`text-[10px] font-medium px-1.5 py-0.5 rounded shrink-0 ${
                                isLight
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : 'bg-emerald-500/15 text-emerald-400'
                              }`}
                            >
                              {cmd.badge}
                            </span>
                          </div>

                          <p
                            className={`text-[11px] line-clamp-1 pl-9 ${
                              isLight ? 'text-slate-500' : 'text-slate-400'
                            }`}
                          >
                            {cmd.description}
                          </p>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Right Column: Realistic WhatsApp Chat Simulation */}
              <div className="lg:col-span-7 flex flex-col gap-2.5">
                <div className="flex items-center justify-between px-1">
                  <span
                    className={`text-[11px] font-semibold uppercase tracking-wider ${
                      isLight ? 'text-slate-500' : 'text-slate-400'
                    }`}
                  >
                    Live WhatsApp Preview
                  </span>
                  <span
                    className={`text-[11px] ${
                      isLight ? 'text-slate-500' : 'text-slate-400'
                    }`}
                  >
                    Real-time response
                  </span>
                </div>

                {/* WhatsApp Phone Mockup Container */}
                <div
                  className={`rounded-2xl border shadow-lg overflow-hidden flex flex-col ${
                    isLight
                      ? 'bg-[#EFEAE2] border-slate-300 text-slate-900'
                      : 'bg-[#0B141A] border-slate-800 text-slate-100'
                  }`}
                >
                  {/* WhatsApp Chat Bar Header */}
                  <div
                    className={`px-4 py-3 border-b flex items-center justify-between shrink-0 ${
                      isLight
                        ? 'bg-[#008069] text-white border-[#006e5a]'
                        : 'bg-[#202C33] text-white border-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center font-bold text-xs shrink-0">
                        A
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5 leading-tight">
                          <span className="font-semibold text-xs sm:text-sm">Axoora</span>
                          <span className="material-symbols-outlined text-[13px] text-emerald-300">
                            verified
                          </span>
                        </div>
                        <span className="text-[10px] text-white/80 leading-none">
                          Online · Official Banking
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-white/80">
                      <span className="text-[10px] font-mono hidden sm:inline">
                        +234 911 000 2966
                      </span>
                    </div>
                  </div>

                  {/* Chat Conversation Canvas */}
                  <div className="p-4 sm:p-5 flex flex-col gap-3 min-h-[300px] justify-center">
                    {/* Date Pill */}
                    <div className="flex justify-center my-0.5">
                      <span
                        className={`text-[10px] font-medium px-2.5 py-0.5 rounded-md shadow-2xs ${
                          isLight
                            ? 'bg-white/90 text-slate-500'
                            : 'bg-[#182229] text-slate-400'
                        }`}
                      >
                        TODAY
                      </span>
                    </div>

                    {/* 1. Customer Message (Outgoing, Right) */}
                    <div className="flex flex-col items-end gap-1">
                      <div
                        className={`max-w-[85%] rounded-2xl rounded-tr-xs p-3.5 shadow-sm text-xs sm:text-sm leading-relaxed ${
                          isLight
                            ? 'bg-[#D9FDD3] text-slate-900'
                            : 'bg-[#005C4B] text-white'
                        }`}
                      >
                        {activeCommand.mode === 'voice' ? (
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                              <span className="material-symbols-outlined text-[16px]">
                                play_arrow
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <div className="flex items-center gap-1 h-3">
                                <span className="w-1 h-2 bg-emerald-500 rounded-full" />
                                <span className="w-1 h-4 bg-emerald-500 rounded-full" />
                                <span className="w-1 h-3 bg-emerald-400 rounded-full" />
                                <span className="w-1 h-5 bg-emerald-600 rounded-full" />
                                <span className="w-1 h-2 bg-emerald-400 rounded-full" />
                                <span className="w-1 h-3 bg-emerald-500 rounded-full" />
                              </div>
                              <span className="text-[10px] font-mono opacity-80 mt-1">
                                0:05 Voice Note
                              </span>
                            </div>
                          </div>
                        ) : activeCommand.mode === 'image' ? (
                          <div className="flex flex-col gap-1.5">
                            <div
                              className={`p-2 rounded-lg flex items-center gap-2 text-xs ${
                                isLight ? 'bg-black/5' : 'bg-black/20'
                              }`}
                            >
                              <span className="material-symbols-outlined text-[18px]">
                                image
                              </span>
                              <span>Photo / Receipt Attached</span>
                            </div>
                            <span>{activeCommand.samplePrompt}</span>
                          </div>
                        ) : (
                          <span>&ldquo;{activeCommand.samplePrompt}&rdquo;</span>
                        )}

                        <div className="flex items-center justify-end gap-1 text-[9px] opacity-70 mt-1">
                          <span>10:42 AM</span>
                          <span className="text-emerald-600 dark:text-emerald-300 font-bold">
                            ✓✓
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 2. Axoora Response (Incoming, Left) */}
                    <div className="flex flex-col items-start gap-1">
                      <div
                        className={`max-w-[90%] rounded-2xl rounded-tl-xs p-3.5 sm:p-4 shadow-sm text-xs sm:text-sm flex flex-col gap-2.5 ${
                          isLight
                            ? 'bg-white text-slate-900'
                            : 'bg-[#202C33] text-slate-100'
                        }`}
                      >
                        <p className="font-medium text-xs leading-relaxed">
                          {activeCommand.aiResponse.summary}
                        </p>

                        {/* Breakdown Box */}
                        <div
                          className={`rounded-xl p-2.5 sm:p-3 flex flex-col gap-1.5 text-xs ${
                            isLight
                              ? 'bg-slate-50 border border-slate-100'
                              : 'bg-black/20 border border-white/5'
                          }`}
                        >
                          {activeCommand.aiResponse.details.map((detail, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between text-[11px] sm:text-xs"
                            >
                              <span
                                className={isLight ? 'text-slate-500' : 'text-slate-400'}
                              >
                                {detail.label}:
                              </span>
                              <span
                                className={`font-semibold ${
                                  detail.highlight
                                    ? 'text-emerald-600 dark:text-emerald-400'
                                    : ''
                                }`}
                              >
                                {detail.value}
                              </span>
                            </div>
                          ))}
                        </div>

                        <p
                          className={`text-[10px] sm:text-[11px] ${
                            isLight ? 'text-slate-500' : 'text-slate-400'
                          }`}
                        >
                          {activeCommand.aiResponse.footer}
                        </p>

                        <div className="flex items-center justify-end text-[9px] opacity-60">
                          <span>10:42 AM</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Action Bottom Bar */}
                  <div
                    className={`p-3 sm:p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-2.5 ${
                      isLight
                        ? 'bg-white border-slate-200'
                        : 'bg-[#182229] border-slate-800'
                    }`}
                  >
                    <div className="text-xs text-left w-full sm:w-auto">
                      <span className={`block text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        Test this command in real life:
                      </span>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <button
                        onClick={() => handleCopy(activeCommand.samplePrompt)}
                        className={`px-3 py-2 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
                          isLight
                            ? 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                            : 'border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          content_copy
                        </span>
                        <span>{copiedPrompt === activeCommand.samplePrompt ? 'Copied' : 'Copy'}</span>
                      </button>

                      <button
                        onClick={() => handleLaunchWhatsApp(activeCommand.samplePrompt)}
                        className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-transform hover:scale-102 cursor-pointer"
                      >
                        <span>Try on WhatsApp</span>
                        <span className="material-symbols-outlined text-[14px]">
                          arrow_forward
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ================================================================= */}
        {/* 4. CALM, SIMPLE DRAWER FOOTER */}
        {/* ================================================================= */}
        <div
          className={`px-5 py-3.5 sm:px-6 border-t shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3 ${
            isLight
              ? 'bg-white border-slate-200 text-slate-600'
              : 'bg-[#0F1B38] border-slate-800 text-slate-400'
          }`}
        >
          <div className="flex items-center gap-2 text-xs">
            <span className="material-symbols-outlined text-[16px] text-emerald-500">
              verified_user
            </span>
            <span>Central Bank of Nigeria (CBN) licensed · NDIC insured</span>
          </div>

          <button
            onClick={() => handleLaunchWhatsApp('Hi Axoora')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-bold flex items-center justify-center gap-2 transition-transform hover:scale-102 shadow-md cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">chat</span>
            <span>Chat with Axoora AI (+234 911 000 2966)</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
