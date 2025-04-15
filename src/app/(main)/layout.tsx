import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MainGameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gaming-darker text-white overflow-x-hidden">
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
}
