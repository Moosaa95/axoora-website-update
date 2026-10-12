'use client';

import { AdminDashboard } from "../../components/AdminDashboard";
import { useNavigation } from "../../context/NavigationContext";

export function AdminClient() {
  const { navigate } = useNavigation();

  return <AdminDashboard onExitAdmin={() => navigate("business")} />;
}
