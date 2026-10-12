'use client';

import { StoriesView } from "../../components/StoriesView";
import { useNavigation } from "../../context/NavigationContext";

export default function StoriesPage() {
  const { navigate, openWaitlist } = useNavigation();

  return (
    <StoriesView
      onNavigate={navigate}
      onOpenWaitlist={() => openWaitlist("personal")}
    />
  );
}
