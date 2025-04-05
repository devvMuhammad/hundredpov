
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import StreamPreview from "@/components/StreamPreview";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gaming-darker text-white overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <StreamPreview />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
