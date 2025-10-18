import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-dvh flex flex-col">
      <Navbar />
      <div className="min-h-screen">

      {children}
      </div>
      <Footer />
    </main>
  );
}
