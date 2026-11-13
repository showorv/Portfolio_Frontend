import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";
import SmoothScroll from "@/components/shared/SmoothScroll";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScroll>
      <main className="min-h-dvh flex flex-col">
        <Navbar />
        <div className="min-h-screen">{children}</div>
        <Footer />
      </main>
    </SmoothScroll>
  );
}
