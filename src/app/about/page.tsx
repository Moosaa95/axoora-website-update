'use client';

import { AboutView } from "../../components/AboutView";
import { useNavigation } from "../../context/NavigationContext";

export default function AboutPage() {
  const { navigate, openWaitlist } = useNavigation();

  return (
    <AboutView
      onNavigate={navigate}
      onOpenWaitlist={() => openWaitlist("personal")}
    />
  );
}
