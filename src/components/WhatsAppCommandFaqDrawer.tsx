'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMPANY_INFO } from '../data/mockData';
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
    categoryName: 'Transfers & NIP',
    badge: '0% Transfer Fee',
    badgeColor: '#00DF8F',
    icon: 'north_east',
    title: 'Transfer by Recipient Name',
    description: 'Send money to frequent contacts or saved beneficiaries without typing their account number.',
    samplePrompt: 'Axoora send ₦15,000 to Musa for lunch from main account',
    mode: 'text',
    aiResponse: {
      summary: 'Recipient resolved: Musa Ibrahim (Kuda Bank · 2098411234). Fee: ₦0.00. Settled via NIBSS Instant rails.',
      details: [
        { label: 'Beneficiary', value: 'Musa Ibrahim' },
        { label: 'Bank', value: 'Kuda Bank · 2098411234' },
        { label: 'Amount', value: '₦15,000.00', highlight: true },
        { label: 'Transfer Fee', value: '₦0.00 (Zero Fee)' },
      ],
      footer: 'Settled in 0.8s · Authorized via biometric touch / PIN',
    },
  },
  {
    id: 'tr-2',
    category: 'transfers',
    categoryName: 'Transfers & NIP',
    badge: 'Instant Name Lookup',
    badgeColor: '#00DF8F',
    icon: 'north_east',
    title: 'Direct Transfer with NUBAN & Bank',
    description: 'Provide an account number and bank name; Axoora runs an instant NIBSS verification before sending.',
    samplePrompt: 'Transfer ₦50,000 to Halimah Balogun GTBank 0124981123',
    mode: 'text',
    aiResponse: {
      summary: 'Beneficiary verified: Halimah Balogun at Guaranty Trust Bank. Ready to dispatch:',
      details: [
        { label: 'Beneficiary', value: 'Halimah Balogun' },
        { label: 'Bank', value: 'GTBank · 0124981123' },
        { label: 'Amount', value: '₦50,000.00', highlight: true },
        { label: 'Fee', value: '₦0.00 (100% Free)' },
      ],
      footer: '0.6s Instant NIP Rail · Zero transfer fee',
    },
  },
  {
    id: 'tr-3',
    category: 'transfers',
    categoryName: 'Transfers & NIP',
    badge: 'Pidgin Natural Command',
    badgeColor: '#0D95FE',
    icon: 'forum',
    title: 'Pidgin Transfer & Split Bill',
    description: 'Talk to Axoora in Nigerian Pidgin: "Abeg help me wire 20k give Chidi".',
    samplePrompt: 'Abeg send ₦20,000 to Chidi for fuel from my balance',
    mode: 'text',
    aiResponse: {
      summary: 'Resolved: Chinedu Eze (Zenith Bank · 1014920491). Transfer Fee: ₦0.00.',
      details: [
        { label: 'Beneficiary', value: 'Chinedu Eze' },
        { label: 'Bank', value: 'Zenith Bank · 1014920491' },
        { label: 'Amount', value: '₦20,000.00', highlight: true },
        { label: 'Fee', value: '₦0.00' },
      ],
      footer: 'Pidgin NLP intent engine · Zero latency',
    },
  },
  {
    id: 'tr-4',
    category: 'transfers',
    categoryName: 'Transfers & NIP',
    badge: 'Scheduled Auto-Debit',
    badgeColor: '#8B5CF6',
    icon: 'schedule',
    title: 'Schedule Recurring Rent or Allowance',
    description: 'Set up an automated monthly standing order for allowance or rent directly in WhatsApp.',
    samplePrompt: 'Axoora schedule ₦35,000 monthly allowance to Mummy on the 28th',
    mode: 'text',
    aiResponse: {
      summary: 'Scheduled standing order created: ₦35,000 will disburse on the 28th of every month to Mrs. Bello.',
      details: [
        { label: 'Recipient', value: 'Mrs. Amina Bello (Mummy)' },
        { label: 'Frequency', value: 'Monthly (Every 28th)' },
        { label: 'Amount', value: '₦35,000.00', highlight: true },
        { label: 'Status', value: 'Active Standing Order' },
      ],
      footer: 'Cancel or pause anytime by texting "Pause Mummy allowance"',
    },
  },
  {
    id: 'tr-5',
    category: 'transfers',
    categoryName: 'Transfers & NIP',
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
    categoryName: 'Transfers & NIP',
    badge: 'Limits & Upgrade',
    badgeColor: '#0D95FE',
    icon: 'tune',
    title: 'Check & Upgrade Daily Transfer Limits',
    description: 'Check your tier and upgrade transfer limits up to unlimited with automated biometric KYC.',
    samplePrompt: 'What is my daily transfer limit and how do I upgrade to Tier 3?',
    mode: 'text',
    aiResponse: {
      summary: 'You are currently on Tier 3 (Unlimited Daily Volume). Single transaction cap: ₦10,000,000.00.',
      details: [
        { label: 'Current Tier', value: 'Tier 3 (Verified)' },
        { label: 'Daily Cap', value: 'No Daily Limit', highlight: true },
        { label: 'BVN & NIN Status', value: 'Linked & Confirmed' },
        { label: 'Settlement Speed', value: 'Sub-2s Real-Time' },
      ],
      footer: 'CBN PSSP Microfinance Compliant · No branch visits needed',
    },
  },

  // 2. PHOTO & INVOICE OCR
  {
    id: 'ocr-1',
    category: 'ocr',
    categoryName: 'Photo & Invoice OCR',
    badge: 'Vision AI · 99.8% Match',
    badgeColor: '#00DF8F',
    icon: 'document_scanner',
    title: 'Pay Vendor Invoice from Photo',
    description: 'Snap or forward any PDF or JPG invoice. Vision OCR extracts the bank, NUBAN, and amount instantly.',
    samplePrompt: 'Axoora please pay this invoice for me [Photo Attached]',
    mode: 'image',
    aiResponse: {
      summary: 'Vision OCR detected: Bello Textiles & Fabrics Ltd · GTBank · 0124981123. Total: ₦25,000.00.',
      details: [
        { label: 'Vendor / Beneficiary', value: 'Halimah Balogun (Bello Fabrics)' },
        { label: 'Bank & NUBAN', value: 'GTBank · 0124981123' },
        { label: 'Invoice Total', value: '₦25,000.00', highlight: true },
        { label: 'OCR Match Score', value: '99.8% Exact Match' },
      ],
      footer: 'Extracted automatically from photo · Settled with ₦0 fee',
    },
  },
  {
    id: 'ocr-2',
    category: 'ocr',
    categoryName: 'Photo & Invoice OCR',
    badge: 'Handwritten Recognition',
    badgeColor: '#00DF8F',
    icon: 'document_scanner',
    title: 'Scan Handwritten Bank Account Slip',
    description: 'Send a photo of a vendor who wrote their account details on a piece of paper or cardboard.',
    samplePrompt: 'Extract account number from this handwritten paper and pay ₦12,500',
    mode: 'image',
    aiResponse: {
      summary: 'Handwriting OCR parsed: "0219481920 Wema Bank - Chinedu Eze". Verified on NIP rails.',
      details: [
        { label: 'Parsed Account', value: 'Wema Bank · 0219481920' },
        { label: 'Resolved Name', value: 'Chinedu Eze' },
        { label: 'Amount to Pay', value: '₦12,500.00', highlight: true },
        { label: 'Transfer Fee', value: '₦0.00' },
      ],
      footer: 'Neural Vision handwriting extraction · Zero errors',
    },
  },
  {
    id: 'ocr-3',
    category: 'ocr',
    categoryName: 'Photo & Invoice OCR',
    badge: 'Utility Bill OCR',
    badgeColor: '#F59E0B',
    icon: 'electric_meter',
    title: 'Scan Electricity Prepaid Bill / Notice',
    description: 'Snap a photo of your meter slip or bill; Axoora parses the meter ID and loads the credit.',
    samplePrompt: 'Snap meter notice: Buy ₦10,000 prepaid units for this meter',
    mode: 'image',
    aiResponse: {
      summary: 'Meter slip parsed: AEDC Prepaid Meter 0149204918. ₦10,000 processed.',
      details: [
        { label: 'Disco', value: 'Abuja Electricity (AEDC)' },
        { label: 'Meter No', value: '0149204918' },
        { label: 'Units Token', value: '4920 - 1824 - 0192 - 9481', highlight: true },
        { label: 'Units Credited', value: '52.4 kWh' },
      ],
      footer: '20-digit token delivered in WhatsApp chat in 0.5 seconds',
    },
  },

  // 3. VOICE NOTE AI
  {
    id: 'vn-1',
    category: 'voice',
    categoryName: 'Voice Note AI',
    badge: 'Biometric Neural Audio',
    badgeColor: '#53BDEB',
    icon: 'mic',
    title: 'Send Money with 5s Voice Note',
    description: 'Just press record and speak in English or Pidgin: "Axoora send 5k transport to Dad".',
    samplePrompt: '🎙️ "Axoora send ₦5,000 transport to Dad from main account" (0:07 audio)',
    mode: 'voice',
    aiResponse: {
      summary: 'Voice command authenticated via Biometric Neural Audio. Dispatched to Dad (Babatunde Ibrahim):',
      details: [
        { label: 'Recipient', value: 'Babatunde Ibrahim (Dad)' },
        { label: 'Bank', value: 'First Bank of Nigeria · 3089124419' },
        { label: 'Amount', value: '₦5,000.00', highlight: true },
        { label: 'Audio Biometrics', value: '99.4% Match Verified' },
      ],
      footer: 'Spoken command executed in 0.7s · ₦0 fee',
    },
  },
  {
    id: 'vn-2',
    category: 'voice',
    categoryName: 'Voice Note AI',
    badge: 'Voice Balance Check',
    badgeColor: '#53BDEB',
    icon: 'mic',
    title: 'Check Balance via Voice Message',
    description: 'Send a quick voice note asking for your balance while walking, driving, or in the market.',
    samplePrompt: '🎙️ "Axoora how much is in my account right now?"',
    mode: 'voice',
    aiResponse: {
      summary: 'Your current available balance across all wallets is ₦97,430.00 (Tier 3 · No daily cap).',
      details: [
        { label: 'Main Available', value: '₦97,430.00', highlight: true },
        { label: 'Halal Vault', value: '₦115,000.00 (Locked)' },
        { label: 'USD Virtual Card', value: '$50.00 (₦74,250)' },
        { label: 'Today\'s Spend', value: '₦15,000.00' },
      ],
      footer: 'Private encrypted response sent directly to your WhatsApp',
    },
  },
  {
    id: 'vn-3',
    category: 'voice',
    categoryName: 'Voice Note AI',
    badge: 'Hausa & Yoruba Audio',
    badgeColor: '#53BDEB',
    icon: 'mic',
    title: 'Multilingual Spoken Payment in Local Tongues',
    description: 'Axoora understands spoken Pidgin, Yoruba, Hausa, and Igbo financial expressions.',
    samplePrompt: '🎙️ "Axoora tura kudi dubu ashirin ga Amina" / "E fi 20k ranse si Amina"',
    mode: 'voice',
    aiResponse: {
      summary: 'Multilingual speech processor resolved: Transfer ₦20,000 to Amina Bello (GTBank).',
      details: [
        { label: 'Language', value: 'Hausa / Yoruba Regional NLP' },
        { label: 'Resolved Target', value: 'Amina Bello (GTBank)' },
        { label: 'Amount', value: '₦20,000.00', highlight: true },
        { label: 'Status', value: 'Awaiting PIN confirmation' },
      ],
      footer: 'Natural speech intelligence tailored for Nigerian everyday commerce',
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
      summary: 'MTN Airtime top-up successful on instant VTU rails. 2% cashback credited to your wallet:',
      details: [
        { label: 'Recipient Phone', value: '0803 123 4567' },
        { label: 'Telco Network', value: 'MTN Nigeria' },
        { label: 'Airtime Loaded', value: '₦2,000.00', highlight: true },
        { label: 'Cashback Earned', value: '+₦40.00 (Instant Credit)' },
      ],
      footer: 'Instant Telco Clearing · Cash back credited automatically',
    },
  },
  {
    id: 'ut-2',
    category: 'utilities',
    categoryName: 'Bills & Airtime',
    badge: 'Token Delivered in 0.5s',
    badgeColor: '#00DF8F',
    icon: 'power',
    title: 'Pay Prepaid Electricity (AEDC, EKEDC, IBEDC)',
    description: 'Pay prepaid electricity bills and receive your 20-digit meter token immediately in WhatsApp.',
    samplePrompt: 'Pay ₦10,000 AEDC prepaid electricity for meter 0149204918',
    mode: 'text',
    aiResponse: {
      summary: 'AEDC prepaid payment confirmed. 52.4 kWh units generated:',
      details: [
        { label: 'Disco Provider', value: 'Abuja Electricity (AEDC)' },
        { label: 'Meter Number', value: '0149204918' },
        { label: 'Electricity Token', value: '4920 - 1824 - 0192 - 9481', highlight: true },
        { label: 'Units Credited', value: '52.4 kWh (₦10,000)' },
      ],
      footer: 'Token delivered directly in WhatsApp chat · Zero convenience fee',
    },
  },
  {
    id: 'ut-3',
    category: 'utilities',
    categoryName: 'Bills & Airtime',
    badge: 'Instant Activation',
    badgeColor: '#00DF8F',
    icon: 'tv',
    title: 'Renew DStv, GOtv, or StarTimes',
    description: 'Reactivate cable TV subscriptions without leaving WhatsApp; clear error codes automatically.',
    samplePrompt: 'Renew my DStv Compact package for smartcard 1029481029',
    mode: 'text',
    aiResponse: {
      summary: 'DStv Compact renewed for Smartcard 1029481029. Error code E16 cleared automatically:',
      details: [
        { label: 'Service', value: 'DStv Compact (1 Month)' },
        { label: 'Smartcard No', value: '1029481029' },
        { label: 'Amount Paid', value: '₦15,700.00', highlight: true },
        { label: 'Viewing Expiry', value: 'November 15, 2026' },
      ],
      footer: 'Signal restored in 60 seconds · Direct MultiChoice integration',
    },
  },

  // 5. CARDS & FX
  {
    id: 'cd-1',
    category: 'cards',
    categoryName: 'USD & Physical Cards',
    badge: 'Mastercard Active',
    badgeColor: '#0D95FE',
    icon: 'credit_card',
    title: 'Create Instant Virtual Dollar Mastercard',
    description: 'Spin up a virtual USD card in seconds for international payments, streaming, and software subscriptions.',
    samplePrompt: 'Create a virtual dollar card with $50 for my OpenAI subscription',
    mode: 'text',
    aiResponse: {
      summary: 'Axoora Virtual Dollar Mastercard issued and funded at official interbank rate:',
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
    categoryName: 'USD & Physical Cards',
    badge: 'Emergency Security',
    badgeColor: '#EF4444',
    icon: 'lock',
    title: '1-Tap Freeze / Unfreeze Debit Card',
    description: 'Misplaced your physical card? Send a 1-word freeze command to block unauthorized charges immediately.',
    samplePrompt: 'Freeze my physical platinum debit card immediately',
    mode: 'text',
    aiResponse: {
      summary: 'Your Physical Platinum Debit Card (*8421) has been FROZEN instantly across all ATMs, POS, and web terminals.',
      details: [
        { label: 'Card Mask', value: '5399 •••• •••• 8421' },
        { label: 'Card Status', value: 'FROZEN (Locked)', highlight: true },
        { label: 'ATM / POS Rail', value: 'All Attempts Blocked' },
        { label: 'To Unlock', value: 'Text "Unfreeze card"' },
      ],
      footer: 'Zero liability guarantee · Unfreeze anytime with your PIN',
    },
  },
  {
    id: 'cd-3',
    category: 'cards',
    categoryName: 'USD & Physical Cards',
    badge: 'Limit Management',
    badgeColor: '#0D95FE',
    icon: 'tune',
    title: 'Set Daily Card Spending Limit',
    description: 'Protect against overcharging or skimming by capping daily card spend to a set threshold.',
    samplePrompt: 'Set my physical debit card daily limit to ₦100,000',
    mode: 'text',
    aiResponse: {
      summary: 'Daily spending limit updated to ₦100,000.00 for Debit Card (*8421).',
      details: [
        { label: 'Card', value: 'Platinum Debit (*8421)' },
        { label: 'New Daily Cap', value: '₦100,000.00', highlight: true },
        { label: 'Web Purchases', value: 'Capped' },
        { label: 'POS & ATM', value: 'Capped' },
      ],
      footer: 'Takes effect instantly · Update anytime on WhatsApp',
    },
  },

  // 6. HALAL SAVE & EARN
  {
    id: 'sv-1',
    category: 'savings',
    categoryName: 'Halal Save & Earn',
    badge: '0% Riba · Real Commerce',
    badgeColor: '#F59E0B',
    icon: 'savings',
    title: 'Lock Capital in Shari\'ah Mudarabah Vault',
    description: 'Save capital ethically. Funds partner directly with food trade and physical commerce with zero debt interest.',
    samplePrompt: 'Lock ₦150,000 into my 3-month Halal Mudarabah Vault',
    mode: 'text',
    aiResponse: {
      summary: '₦150,000 locked into Mudarabah Agriculture & Wholesale Pool (3 Months).',
      details: [
        { label: 'Capital Saved', value: '₦150,000.00', highlight: true },
        { label: 'Tenor', value: '90 Days (Maturity Nov 2026)' },
        { label: 'Profit Share Model', value: '70/30 Profit Sharing' },
        { label: 'Estimated Return', value: '+₦6,750 (Halal Profit)' },
      ],
      footer: 'Endorsed by Islamic Finance Advisory Board · Zero debt interest',
    },
  },
  {
    id: 'sv-2',
    category: 'savings',
    categoryName: 'Halal Save & Earn',
    badge: 'Hajj & Target Pool',
    badgeColor: '#F59E0B',
    icon: 'mosque',
    title: 'Create Hajj or Ramadan Target Vault',
    description: 'Build a dedicated targeted vault for sacred pilgrimages or family feasts with automatic weekly micro-saves.',
    samplePrompt: 'Create a Hajj 2027 savings target with ₦25,000 weekly auto-save',
    mode: 'text',
    aiResponse: {
      summary: 'Target Vault "Hajj 2027" activated. ₦25,000 weekly auto-debit scheduled every Monday.',
      details: [
        { label: 'Target Vault', value: 'Hajj 2027 Pilgrimage' },
        { label: 'Weekly Auto-save', value: '₦25,000.00', highlight: true },
        { label: 'Target Goal', value: '₦4,500,000.00' },
        { label: 'Profit Accrual', value: 'Accrues Monthly' },
      ],
      footer: 'Funds safely escrowed with zero bank maintenance deductions',
    },
  },

  // 7. PAYCIRCLE (DIGITAL AJO)
  {
    id: 'pc-1',
    category: 'paycircle',
    categoryName: 'Paycircle (Ajo Thrift)',
    badge: 'Digital Ajo Escrow',
    badgeColor: '#8B5CF6',
    icon: 'group',
    title: 'Check Balogun Circle Payout Turn',
    description: 'Query your upcoming turn in your neighborhood or merchant thrift circle directly in chat.',
    samplePrompt: 'When is my payout turn in Balogun Traders Paycircle?',
    mode: 'text',
    aiResponse: {
      summary: 'You are Turn 3 of 10 in "Balogun Traders Paycircle". Turn 2 just cleared.',
      details: [
        { label: 'Circle Name', value: 'Balogun Traders Guild' },
        { label: 'Your Turn', value: 'Turn 3 (Receives Friday 12th)', highlight: true },
        { label: 'Lump Sum Payout', value: '₦200,000.00' },
        { label: 'Members Paid', value: '10/10 Confirmed' },
      ],
      footer: 'Automated escrow clearing · No cash collector risks',
    },
  },
  {
    id: 'pc-2',
    category: 'paycircle',
    categoryName: 'Paycircle (Ajo Thrift)',
    badge: 'Automated Debit',
    badgeColor: '#8B5CF6',
    icon: 'sync_alt',
    title: 'Pay Weekly Ajo Contribution',
    description: 'Pay your contribution instantly or verify your automated contribution status.',
    samplePrompt: 'Pay my ₦20,000 weekly contribution for Lekki Foodies Circle',
    mode: 'text',
    aiResponse: {
      summary: 'Contribution of ₦20,000 confirmed for Lekki Foodies Circle (Round 4). Receipt #AJO-9021.',
      details: [
        { label: 'Circle', value: 'Lekki Friends & Foodies' },
        { label: 'Contribution', value: '₦20,000.00', highlight: true },
        { label: 'Pot Balance', value: '₦180,000 / ₦200,000' },
        { label: 'Current Turn', value: 'Fatima Bello' },
      ],
      footer: 'Receipt shared with circle admin automatically',
    },
  },

  // 8. FAQS & CONTROLS
  {
    id: 'fq-1',
    category: 'faqs',
    categoryName: 'WhatsApp Banking FAQs',
    badge: 'Security & PIN',
    badgeColor: '#00DF8F',
    icon: 'help',
    title: 'How does Axoora secure my WhatsApp banking?',
    description: 'Learn how hardware security modules (HSM) and private 4-digit PINs protect your funds.',
    samplePrompt: 'How safe is my money on WhatsApp and what happens if I lose my phone?',
    mode: 'text',
    aiResponse: {
      summary: 'Your Axoora account is secured by 256-bit AES encryption. Transfers strictly require your private 4-digit PIN.',
      details: [
        { label: 'PIN Protection', value: 'Required on all outgoing funds' },
        { label: 'Phone Stolen?', value: 'Call hotline to freeze session' },
        { label: 'Deposit Insurance', value: 'NDIC Insured up to ₦5,000,000' },
        { label: 'Regulatory License', value: 'Central Bank of Nigeria (CBN)' },
      ],
      footer: 'Axoora staff will NEVER ask for your PIN on a call or website',
    },
  },
  {
    id: 'fq-2',
    category: 'faqs',
    categoryName: 'WhatsApp Banking FAQs',
    badge: 'Zero Fees',
    badgeColor: '#00DF8F',
    icon: 'savings',
    title: 'Are WhatsApp transfers truly free?',
    description: 'No hidden SMS charges, no account maintenance fees, and 0% transfer charges.',
    samplePrompt: 'Are there any charges for sending money or checking balance on WhatsApp?',
    mode: 'text',
    aiResponse: {
      summary: 'Axoora charges ₦0.00 for all interbank transfers and balance inquiries on WhatsApp.',
      details: [
        { label: 'Interbank Fee', value: '₦0.00 (Free)' },
        { label: 'Maintenance Fee', value: '₦0.00 (Free)' },
        { label: 'SMS Notification', value: 'Free WhatsApp Alerts' },
        { label: 'Legacy Bank Avg', value: '₦53.75 per transfer' },
      ],
      footer: 'Save up to ₦45,000+ per year in eliminated bank charges',
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
      'Yes. Axoora routes directly via the NIBSS Instant Payment (NIP) clearing rail, allowing instant 0.8s settlement to GTBank, Access, Zenith, FirstBank, UBA, Kuda, Moniepoint, OPay, and all 40+ licensed commercial banks with zero fees.',
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
    tag: 'Biometric AI',
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
  const [testCustomPrompt, setTestCustomPrompt] = useState('');
  const [simulatedCustomReply, setSimulatedCustomReply] = useState<string | null>(null);

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
      const matchesCategory = activeCategory === 'all' || cmd.category === activeCategory;
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
    return (
      COMMAND_CATALOG.find((c) => c.id === selectedCommandId) ||
      filteredCommands[0] ||
      COMMAND_CATALOG[0]
    );
  }, [selectedCommandId, filteredCommands]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(text);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  const handleLaunchWhatsApp = (promptText: string) => {
    const encoded = encodeURIComponent(promptText.replace(/^🎙️\s*"/, '').replace(/"$/, ''));
    const url = `https://wa.me/2349110002966?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleRunSandbox = () => {
    if (!testCustomPrompt.trim()) return;
    const lower = testCustomPrompt.toLowerCase();
    if (lower.includes('transfer') || lower.includes('send') || lower.includes('abeg')) {
      setSimulatedCustomReply(
        `✓ Axoora Intent: Transfer Detected · 0% Fee · NIBSS 0.8s settlement ready for PIN authorization.`
      );
    } else if (lower.includes('airtime') || lower.includes('data') || lower.includes('bill')) {
      setSimulatedCustomReply(
        `✓ Axoora Intent: VTU / Utility Payment · 2% instant cashback will be credited to your wallet.`
      );
    } else if (lower.includes('card') || lower.includes('dollar') || lower.includes('freeze')) {
      setSimulatedCustomReply(
        `✓ Axoora Intent: Card Command · Ready to adjust limits or toggle 1-tap card lock.`
      );
    } else {
      setSimulatedCustomReply(
        `✓ Axoora AI: Message understood. Ready to execute on official WhatsApp Desk.`
      );
    }
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
        className="fixed inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
      />

      {/* Slide-over panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className={`fixed inset-y-0 right-0 max-w-full flex w-full sm:max-w-2xl lg:max-w-3xl border-l shadow-2xl flex-col z-50 overflow-hidden ${
          isLight
            ? 'bg-white text-slate-900 border-slate-200'
            : 'bg-[#030D22] text-[#F2F5F9] border-[#152E5E]'
        }`}
      >
        {/* ================================================================= */}
        {/* 1. DRAWER TOP HEADER */}
        {/* ================================================================= */}
        <div
          className={`p-4 sm:p-6 border-b shrink-0 flex items-center justify-between gap-4 ${
            isLight
              ? 'bg-slate-50 border-slate-200 text-slate-900'
              : 'bg-[#071533] border-[#152E5E] text-white'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#00A884] text-white flex items-center justify-center shadow-lg shadow-[#00A884]/30 shrink-0">
              <span className="material-symbols-outlined text-[22px]">chat</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm sm:text-base font-extrabold tracking-tight ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  Axoora WhatsApp Command Catalog
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                    isLight ? 'bg-emerald-100 text-emerald-800' : 'bg-[#00DF8F]/20 text-[#00DF8F]'
                  }`}
                >
                  35+ Live Commands
                </span>
              </div>
              <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-[#8EA2C6]'}`}>
                Natural text, Vision OCR, &amp; voice note commands for official WhatsApp banking.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
              isLight
                ? 'bg-slate-200/70 text-slate-600 hover:text-slate-900 hover:bg-slate-300'
                : 'bg-[#0B1E42] text-[#8EA2C6] hover:text-white hover:bg-[#14294F]'
            }`}
            title="Close Drawer (Esc)"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* ================================================================= */}
        {/* 2. SEARCH BAR & CATEGORY PILLS */}
        {/* ================================================================= */}
        <div
          className={`p-4 sm:p-5 border-b shrink-0 flex flex-col gap-3 ${
            isLight ? 'bg-slate-50/70 border-slate-200' : 'bg-[#051128] border-[#152E5E]'
          }`}
        >
          {/* Search Input */}
          <div className="relative w-full">
            <span
              className={`material-symbols-outlined text-[18px] absolute left-3.5 top-1/2 -translate-y-1/2 ${
                isLight ? 'text-slate-400' : 'text-[#8EA2C6]'
              }`}
            >
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search commands, Pidgin prompts, or bills (e.g., 'airtime', 'voice', 'transfer')..."
              className={`w-full pl-10 pr-9 py-2.5 rounded-xl border focus:outline-none text-xs transition-colors ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-emerald-500'
                  : 'bg-[#081838] border-[#162D58] focus:border-[#00DF8F] text-white placeholder-[#7B9CD2]'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all', label: 'All Commands', count: COMMAND_CATALOG.length },
              { id: 'transfers', label: 'Transfers & NIP', count: 6 },
              { id: 'ocr', label: 'Photo OCR', count: 3 },
              { id: 'voice', label: 'Voice Note AI', count: 3 },
              { id: 'utilities', label: 'Bills & Airtime', count: 3 },
              { id: 'cards', label: 'Cards & Controls', count: 3 },
              { id: 'savings', label: 'Halal Vault', count: 2 },
              { id: 'paycircle', label: 'Ajo Paycircle', count: 2 },
              { id: 'faqs', label: 'Banking FAQs', count: 2 },
            ].map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as CommandCategory)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#00A884] text-white shadow-md font-extrabold'
                      : isLight
                      ? 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                      : 'bg-[#0A1B3D] text-[#8EA2C6] hover:text-white hover:bg-[#102552] border border-[#14294F]'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : isLight
                        ? 'bg-slate-100 text-slate-600'
                        : 'bg-white/10 text-white/70'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================================================================= */}
        {/* 3. MAIN SCROLLABLE CONTENT: COMMAND SPLIT VIEW & FAQS */}
        {/* ================================================================= */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-6">
          {/* Top Info Banner */}
          <div
            className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 text-xs ${
              isLight
                ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                : 'bg-[#00A884]/15 border-[#00A884]/30 text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span
                className={`material-symbols-outlined text-[20px] ${
                  isLight ? 'text-emerald-700' : 'text-[#00DF8F]'
                }`}
              >
                chat_bubble
              </span>
              <span>
                Verified WhatsApp Desk:{' '}
                <strong
                  className={`font-mono font-bold ${
                    isLight ? 'text-emerald-950' : 'text-white'
                  }`}
                >
                  +234 911 000 2966
                </strong>
              </span>
            </div>
            <a
              href="https://wa.me/2349110002966?text=Hi%20Axoora"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-[#00A884] hover:bg-[#008F6F] text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-transform hover:scale-102 shrink-0 shadow-xs"
            >
              <span>Say &quot;Hi&quot;</span>
              <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
            </a>
          </div>

          {/* TWO COLUMN GRID: COMMANDS LIST & LIVE AI RESPONSE PREVIEW */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left: Commands List (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-2.5">
              <span
                className={`text-[11px] font-mono uppercase font-bold tracking-wider ${
                  isLight ? 'text-slate-500' : 'text-[#8EA2C6]'
                }`}
              >
                Select a Command ({filteredCommands.length} Found)
              </span>

              <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto pr-1">
                {filteredCommands.map((cmd) => {
                  const isSelected = activeCommand.id === cmd.id;
                  return (
                    <div
                      key={cmd.id}
                      onClick={() => setSelectedCommandId(cmd.id)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col gap-1.5 text-left ${
                        isSelected
                          ? isLight
                            ? 'bg-emerald-50/80 border-emerald-500 shadow-md shadow-emerald-500/10'
                            : 'bg-[#0E2452] border-[#00DF8F] shadow-lg shadow-[#00DF8F]/10'
                          : isLight
                          ? 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 shadow-xs'
                          : 'bg-[#071633] border-[#152E5E] hover:border-[#1F4284] hover:bg-[#0A1E42]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span
                          className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase"
                          style={{
                            backgroundColor: `${cmd.badgeColor}20`,
                            color: isLight && cmd.badgeColor === '#00DF8F' ? '#047857' : cmd.badgeColor,
                          }}
                        >
                          {cmd.categoryName}
                        </span>
                        <span
                          className={`text-[9px] font-mono font-bold ${
                            isLight ? 'text-emerald-700' : 'text-[#00DF8F]'
                          }`}
                        >
                          {cmd.badge}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className="material-symbols-outlined text-[16px] shrink-0"
                          style={{ color: isLight && cmd.badgeColor === '#00DF8F' ? '#047857' : cmd.badgeColor }}
                        >
                          {cmd.icon}
                        </span>
                        <h4
                          className={`font-bold text-xs truncate ${
                            isLight ? 'text-slate-900' : 'text-white'
                          }`}
                        >
                          {cmd.title}
                        </h4>
                      </div>

                      <p
                        className={`text-[10.5px] line-clamp-1 ${
                          isLight ? 'text-slate-500' : 'text-[#8EA2C6]'
                        }`}
                      >
                        {cmd.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Active Command Details & Live AI Resolution Card (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-3">
              <span
                className={`text-[11px] font-mono uppercase font-bold tracking-wider ${
                  isLight ? 'text-slate-500' : 'text-[#8EA2C6]'
                }`}
              >
                Simulated AI Execution &amp; Response
              </span>

              {/* Sample Prompt Box with Copy & Launch */}
              <div
                className={`p-4 rounded-2xl border flex flex-col gap-2.5 ${
                  isLight ? 'bg-slate-50 border-slate-200 shadow-xs' : 'bg-[#071633] border-[#152E5E]'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span
                    className={`font-mono text-[10px] uppercase font-bold ${
                      isLight ? 'text-blue-700' : 'text-[#0D95FE]'
                    }`}
                  >
                    Sample Prompt to Send
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(activeCommand.samplePrompt)}
                      className={`text-[11px] font-bold hover:underline flex items-center gap-1 cursor-pointer ${
                        isLight ? 'text-emerald-700' : 'text-[#00DF8F]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px]">content_copy</span>
                      <span>{copiedPrompt === activeCommand.samplePrompt ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                <div
                  className={`p-3 rounded-xl font-mono text-xs leading-relaxed border ${
                    isLight
                      ? 'bg-white border-slate-200 text-slate-900 shadow-inner'
                      : 'bg-black/40 border-white/5 text-white'
                  }`}
                >
                  &ldquo;{activeCommand.samplePrompt}&rdquo;
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-[#8EA2C6]'}`}>
                    Mode:{' '}
                    <strong className={`uppercase ${isLight ? 'text-slate-800' : 'text-white'}`}>
                      {activeCommand.mode}
                    </strong>
                  </span>

                  <button
                    onClick={() => handleLaunchWhatsApp(activeCommand.samplePrompt)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#00A884] hover:bg-[#008F6F] text-white text-xs font-bold flex items-center gap-1.5 transition-transform hover:scale-102 cursor-pointer shadow-md"
                  >
                    <span>Test on WhatsApp</span>
                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  </button>
                </div>
              </div>

              {/* Simulated AI Response Card (Protected Dark Hardware simulation for WhatsApp) */}
              <div className="dark-hardware preserve-dark p-4 rounded-2xl bg-slate-950 border border-emerald-500/40 flex flex-col gap-3 shadow-xl text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#00A884] flex items-center justify-center text-white">
                      <span className="material-symbols-outlined text-[14px]">smart_toy</span>
                    </div>
                    <span className="font-bold text-xs text-[#00DF8F]">
                      Axoora AI Assistant Reply
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#53BDEB] font-bold">
                    0.8s NIP Settlement
                  </span>
                </div>

                <p className="text-xs leading-relaxed text-[#F2F5F9]">
                  {activeCommand.aiResponse.summary}
                </p>

                {/* Details Breakdown */}
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 flex flex-col gap-1.5">
                  {activeCommand.aiResponse.details.map((det, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-[11px] font-mono"
                    >
                      <span className="text-[#8EA2C6]">{det.label}:</span>
                      <span
                        className={`font-bold ${
                          det.highlight ? 'text-[#00DF8F]' : 'text-white'
                        }`}
                      >
                        {det.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-[10px] text-[#8EA2C6] pt-1 border-t border-white/5 font-mono">
                  <span>{activeCommand.aiResponse.footer}</span>
                  <span className="text-[#53BDEB]">✓✓ Delivered</span>
                </div>
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* INTEGRATED WHATSAPP FAQS ACCORDION SECTION */}
          {/* ================================================================= */}
          <div
            className={`flex flex-col gap-3 pt-4 border-t ${
              isLight ? 'border-slate-200' : 'border-[#152E5E]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3
                  className={`text-base font-extrabold tracking-tight ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  Frequently Asked Questions About WhatsApp Banking
                </h3>
                <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-[#8EA2C6]'}`}>
                  Everything you need to know about security, 0% fees, and lost phone procedures.
                </p>
              </div>
              <span
                className={`text-xs font-mono font-bold ${
                  isLight ? 'text-emerald-700' : 'text-[#00DF8F]'
                }`}
              >
                {DRAWER_FAQS.length} Answers
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {DRAWER_FAQS.map((faq) => {
                const isOpenFaq = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`rounded-2xl border overflow-hidden transition-colors ${
                      isLight
                        ? 'border-slate-200 bg-white'
                        : 'border-[#152E5E] bg-[#071633]'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaqId(isOpenFaq ? null : faq.id)}
                      className={`w-full p-3.5 text-left flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                        isLight ? 'hover:bg-slate-50' : 'hover:bg-[#0A1E42]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                            isLight
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-[#0D95FE]/20 text-[#0D95FE]'
                          }`}
                        >
                          {faq.tag}
                        </span>
                        <span
                          className={`font-bold text-xs sm:text-sm ${
                            isLight ? 'text-slate-900' : 'text-white'
                          }`}
                        >
                          {faq.question}
                        </span>
                      </div>
                      <span
                        className={`material-symbols-outlined text-[18px] shrink-0 ${
                          isLight ? 'text-slate-500' : 'text-[#8EA2C6]'
                        }`}
                      >
                        {isOpenFaq ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>

                    <AnimatePresence>
                      {isOpenFaq && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className={`p-3.5 pt-0 text-xs leading-relaxed border-t ${
                            isLight
                              ? 'text-slate-600 border-slate-200 bg-slate-50/60'
                              : 'text-[#A8BBD6] border-white/5 bg-[#051128]'
                          }`}
                        >
                          <p className="pt-2">{faq.answer}</p>
                          {faq.actionPrompt && (
                            <div
                              className={`mt-2.5 pt-2 border-t flex items-center justify-between ${
                                isLight ? 'border-slate-200' : 'border-white/5'
                              }`}
                            >
                              <span
                                className={`text-[10px] font-mono ${
                                  isLight ? 'text-slate-500' : 'text-slate-400'
                                }`}
                              >
                                Try asking:{' '}
                                <strong className={isLight ? 'text-slate-900' : 'text-white'}>
                                  &ldquo;{faq.actionPrompt}&rdquo;
                                </strong>
                              </span>
                              <button
                                onClick={() => handleLaunchWhatsApp(faq.actionPrompt!)}
                                className={`text-[10px] font-bold hover:underline flex items-center gap-1 cursor-pointer ${
                                  isLight ? 'text-emerald-700' : 'text-[#00DF8F]'
                                }`}
                              >
                                <span>Send on WhatsApp</span>
                                <span className="material-symbols-outlined text-[12px]">
                                  open_in_new
                                </span>
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

          {/* ================================================================= */}
          {/* INTERACTIVE CUSTOM COMMAND PROMPT SANDBOX */}
          {/* ================================================================= */}
          <div
            className={`p-4 sm:p-5 rounded-2xl border flex flex-col gap-3 ${
              isLight
                ? 'bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border-emerald-200 text-slate-900 shadow-sm'
                : 'bg-gradient-to-r from-[#00A884]/15 via-[#00DF8F]/10 to-[#0D95FE]/15 border-[#00DF8F]/30 text-[#F2F5F9]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`material-symbols-outlined text-[20px] ${
                    isLight ? 'text-emerald-700' : 'text-[#00DF8F]'
                  }`}
                >
                  terminal
                </span>
                <span
                  className={`font-extrabold text-xs ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  Natural Language &amp; Pidgin Sandbox Tester
                </span>
              </div>
              <span
                className={`text-[10px] font-mono font-bold ${
                  isLight ? 'text-emerald-800' : 'text-[#00DF8F]'
                }`}
              >
                AI Intent Engine
              </span>
            </div>

            <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-[#A8BBD6]'}`}>
              Type how you talk in real life (English or Pidgin) to test how Axoora resolves your banking intent before sending to WhatsApp.
            </p>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={testCustomPrompt}
                onChange={(e) => setTestCustomPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleRunSandbox();
                }}
                placeholder="e.g. 'Abeg transfer 15k to brother Segun' or 'Snap invoice for laptop'"
                className={`flex-1 px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none transition-colors ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-emerald-500'
                    : 'bg-black/40 border-white/10 text-white placeholder-slate-400 focus:border-[#00DF8F]'
                }`}
              />
              <button
                onClick={handleRunSandbox}
                className="px-4 py-2.5 rounded-xl bg-[#00A884] hover:bg-[#008F6F] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-transform hover:scale-102 cursor-pointer shrink-0 shadow-sm"
              >
                <span>Parse Intent</span>
                <span className="material-symbols-outlined text-[15px]">play_arrow</span>
              </button>
            </div>

            {simulatedCustomReply && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-xl border font-mono text-xs flex flex-col gap-1.5 ${
                  isLight
                    ? 'bg-white border-emerald-300 shadow-sm'
                    : 'bg-black/50 border-[#00DF8F]/40'
                }`}
              >
                <p className={isLight ? 'text-emerald-900 font-semibold' : 'text-emerald-100'}>
                  {simulatedCustomReply}
                </p>
                <div className="flex justify-end">
                  <button
                    onClick={() => handleLaunchWhatsApp(testCustomPrompt)}
                    className="px-3 py-1 rounded bg-[#00A884] hover:bg-[#008F6F] text-white text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Send this exact message to WhatsApp Desk</span>
                    <span className="material-symbols-outlined text-[12px]">send</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* ================================================================= */}
        {/* 4. DRAWER FOOTER ACTION BAR */}
        {/* ================================================================= */}
        <div
          className={`p-4 sm:p-5 border-t shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3 ${
            isLight
              ? 'bg-slate-50 border-slate-200 text-slate-600'
              : 'bg-[#051024] border-[#152E5E] text-[#8EA2C6]'
          }`}
        >
          <div className="flex items-center gap-2 text-xs">
            <span
              className={`material-symbols-outlined text-[16px] ${
                isLight ? 'text-emerald-700' : 'text-[#00DF8F]'
              }`}
            >
              verified
            </span>
            <span>Central Bank of Nigeria (CBN) licensed · NDIC insured deposits</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => handleLaunchWhatsApp(activeCommand.samplePrompt)}
              className="flex-1 sm:flex-none py-2.5 px-5 rounded-xl bg-[#00A884] hover:bg-[#008F6F] text-white text-xs font-bold flex items-center justify-center gap-2 transition-transform hover:scale-102 shadow-md cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">chat</span>
              <span>Open Verified WhatsApp Desk</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

