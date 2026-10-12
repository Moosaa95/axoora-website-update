'use client';

import { AdminDashboard } from "../../components/AdminDashboard";
import { useNavigation } from "../../context/NavigationContext";

export default function AdminPage() {
  const { navigate } = useNavigation();

  return <AdminDashboard onExitAdmin={() => navigate("business")} />;
}
