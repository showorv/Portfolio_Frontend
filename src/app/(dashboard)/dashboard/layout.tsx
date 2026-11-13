import type { Metadata } from "next";
import { getStats } from "@/actions/admin";
import AdminShell from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "Admin · Showrov's portfolio",
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const stats = await getStats();

  return <AdminShell unreadMessages={stats.success ? stats.data.unreadMessages : 0}>{children}</AdminShell>;
}
