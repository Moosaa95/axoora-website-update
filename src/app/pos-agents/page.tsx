'use client';

import { PosProductView } from "../../components/PosProductView";
import { useNavigation } from "../../context/NavigationContext";

export default function PosAgentsPage() {
  const { openWaitlist, openWhatsApp } = useNavigation();

  return (
    <PosProductView
      onOpenWaitlist={openWaitlist}
      onOpenWhatsApp={openWhatsApp}
    />
  );
}
