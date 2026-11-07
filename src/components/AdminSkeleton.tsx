'use client';

import React from 'react';

export const SkeletonBlock: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`animate-pulse rounded-xl bg-gradient-to-r from-[#0A1B3D] via-[#14294F] to-[#0A1B3D] ${className}`}
  />
);

/**
 * Full-page Admin Shell Skeleton shown during initial authentication & bootstrap verification.
 */
export const AdminShellSkeleton: React.FC = () => (
  <div className="min-h-screen bg-[#020B1D] text-[#F2F5F9] flex flex-col">
    {/* Top Bar Skeleton */}
    <header className="h-16 bg-[#04112B] border-b border-[#14294F] px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <SkeletonBlock className="w-28 h-7" />
        <SkeletonBlock className="w-24 h-5 rounded-full" />
      </div>
      <div className="flex items-center gap-3">
        <SkeletonBlock className="w-24 h-8 rounded-xl" />
        <SkeletonBlock className="w-28 h-8 rounded-xl" />
      </div>
    </header>

    <div className="flex-1 flex">
      {/* Sidebar Skeleton */}
      <aside className="hidden lg:flex w-64 bg-[#04112B] border-r border-[#14294F] p-4 flex-col gap-2.5">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonBlock key={i} className="w-full h-11 rounded-xl" />
        ))}
      </aside>

      {/* Main Content Area Skeleton */}
      <main className="flex-1 p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <SkeletonBlock className="w-48 h-7" />
            <SkeletonBlock className="w-72 h-4" />
          </div>
          <SkeletonBlock className="w-32 h-9 rounded-xl" />
        </div>

        {/* KPI Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-[#05112A] border border-[#14294F] space-y-3"
            >
              <div className="flex items-center justify-between">
                <SkeletonBlock className="w-24 h-3.5" />
                <SkeletonBlock className="w-8 h-8 rounded-lg" />
              </div>
              <SkeletonBlock className="w-20 h-7" />
              <SkeletonBlock className="w-36 h-3" />
            </div>
          ))}
        </div>

        {/* Content Cards Grid */}
        <AdminCardsSkeleton count={4} />
      </main>
    </div>
  </div>
);

/**
 * Reusable Grid Card Skeleton for Merchant Stories, Products, Articles, and Roles.
 */
export const AdminCardsSkeleton: React.FC<{ count?: number; cols?: 2 | 3 }> = ({
  count = 4,
  cols = 2,
}) => (
  <div
    className={`grid grid-cols-1 ${
      cols === 3 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'
    } gap-4`}
  >
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="p-5 rounded-2xl bg-[#05112A] border border-[#14294F] space-y-3.5"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1">
            <SkeletonBlock className="w-10 h-10 rounded-xl shrink-0" />
            <div className="space-y-2 flex-1">
              <SkeletonBlock className="w-2/3 h-4" />
              <SkeletonBlock className="w-1/2 h-3" />
            </div>
          </div>
          <SkeletonBlock className="w-16 h-5 rounded-full" />
        </div>
        <SkeletonBlock className="w-full h-12 rounded-xl" />
        <div className="flex items-center justify-between pt-1">
          <SkeletonBlock className="w-24 h-4" />
          <div className="flex items-center gap-2">
            <SkeletonBlock className="w-16 h-7 rounded-lg" />
            <SkeletonBlock className="w-16 h-7 rounded-lg" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

/**
 * Reusable Table / List Rows Skeleton for Waitlist Leads & Team Members.
 */
export const AdminTableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => (
  <div className="space-y-2.5">
    {Array.from({ length: rows }).map((_, i) => (
      <div
        key={i}
        className="p-4 rounded-2xl bg-[#05112A] border border-[#14294F] flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3.5 flex-1">
          <SkeletonBlock className="w-9 h-9 rounded-full shrink-0" />
          <div className="space-y-2 flex-1 max-w-md">
            <SkeletonBlock className="w-48 h-4" />
            <SkeletonBlock className="w-64 h-3" />
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <SkeletonBlock className="w-20 h-6 rounded-full" />
          <SkeletonBlock className="w-24 h-6 rounded-lg" />
          <SkeletonBlock className="w-8 h-8 rounded-lg" />
        </div>
      </div>
    ))}
  </div>
);

/**
 * Reusable Chat Inbox Skeleton for LiveChatAdminTab.
 */
export const AdminChatInboxSkeleton: React.FC<{ count?: number }> = ({ count = 5 }) => (
  <div className="divide-y divide-[#14294F]">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="p-4 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SkeletonBlock className="w-16 h-4" />
            <SkeletonBlock className="w-28 h-4" />
          </div>
          <SkeletonBlock className="w-16 h-5 rounded-full" />
        </div>
        <SkeletonBlock className="w-4/5 h-3.5" />
        <div className="flex items-center justify-between pt-0.5">
          <SkeletonBlock className="w-14 h-3" />
          <SkeletonBlock className="w-12 h-3" />
        </div>
      </div>
    ))}
  </div>
);

