import Sidebar from "@/components/shared/Sidebar";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-dvh flex gap-4">
      <Sidebar />

      <div className="flex-1 p-6 bg-white dark:bg-black min-h-screen">

      {children}
      </div>
    </main>
  );
}
