'use client';

import { StoriesView } from "../../components/StoriesView";
import { useNavigation } from "../../context/NavigationContext";

export function StoriesClient() {
  const { navigate, openWaitlist } = useNavigation();

  return (
    <StoriesView
      onNavigate={navigate}
      onOpenWaitlist={() => openWaitlist("personal")}
    />
  );
}
