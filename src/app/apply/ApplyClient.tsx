'use client';

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ApplyOnboardingView } from "../../components/ApplyOnboardingView";
import { useNavigation } from "../../context/NavigationContext";

function ApplyContent() {
  const { waitlistInterest, navigate, openWhatsApp } = useNavigation();
  const searchParams = useSearchParams();
  const validInterests = ['business', 'pos-agent', 'personal', 'aggregator'] as const;
  const rawInterest = searchParams.get('interest');
  const interestParam = (validInterests.includes(rawInterest as any) ? rawInterest : waitlistInterest) as 'business' | 'pos-agent' | 'personal' | 'aggregator';

  const handleBack = () => {
    if (interestParam === 'pos-agent') {
      navigate('pos-agents');
    } else if (interestParam === 'personal') {
      navigate('personal');
    } else {
      navigate('business');
    }
  };

  return (
    <ApplyOnboardingView
      initialInterest={interestParam}
      onBack={handleBack}
      onOpenWhatsApp={openWhatsApp}
    />
  );
}

export function ApplyClient() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#020F2E]" />}>
      <ApplyContent />
    </Suspense>
  );
}
