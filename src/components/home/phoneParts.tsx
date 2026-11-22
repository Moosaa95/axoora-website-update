'use client';

import React from 'react';
import { Money } from './shared';

/** A dated group of transactions inside the Business phone: header + total + card. */
export const PhoneGroup: React.FC<{
  label: string;
  total: string;
  totalClass: string;
  className?: string;
  children: React.ReactNode;
}> = ({ label, total, totalClass, className = '', children }) => (
  <div className={className}>
    <div className="flex items-baseline justify-between text-[9px] leading-[13px] font-semibold">
      <span>{label}</span>
      <span className={totalClass}>
        {total}
        <span className="text-[#4c5866]">.00</span>
      </span>
    </div>
    <div className="mt-[6px] bg-[#f7f9fb] rounded-[8px] px-[12px] py-[8px] flex flex-col gap-[10px]">{children}</div>
  </div>
);

const toneClass = {
  credit: 'text-[#065f41]',
  debit: 'text-[#161c22]',
  debitPending: 'text-[#8a4b00]',
} as const;

export const PhoneTx: React.FC<{
  initials?: string;
  logo?: string;
  name: string;
  sub: string;
  amount: string;
  tone: keyof typeof toneClass;
}> = ({ initials, logo, name, sub, amount, tone }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-[8px]">
      {logo ? (
        <div className="w-[28px] h-[28px] rounded-full bg-[#e8f3fc] flex items-center justify-center text-[6px] font-bold text-[#0976da]">{logo}</div>
      ) : (
        <div className="w-[28px] h-[28px] rounded-full bg-[#1e3a6b] text-white text-[7px] font-semibold flex items-center justify-center">{initials}</div>
      )}
      <div>
        <div className="text-[9px] leading-[13px] font-semibold">{name}</div>
        <div className="text-[7.5px] leading-[11px] text-[#4c5866]">{sub}</div>
      </div>
    </div>
    <span className={`text-[8.5px] font-semibold ${toneClass[tone]}`}>
      {amount}
      <span className="text-[#4c5866]">.00</span>
    </span>
  </div>
);

export { Money };
