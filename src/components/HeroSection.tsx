
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gaming-darker z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pubg/20 via-transparent to-transparent opacity-40"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pubg/30 rounded-full filter blur-[100px] animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-twitch/30 rounded-full filter blur-[80px] animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      </div>
      
      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 md:px-6 py-12 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 text-center md:text-left max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 hero-text-glow bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-pubg-light">
              Your Ultimate Hub for Live PUBG Action!
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Watch top-ranked PUBG streamers live, track match rankings in real-time, and join the community.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <Button className="glow-button bg-pubg hover:bg-pubg-dark text-white w-full sm:w-auto text-lg px-8 py-6">
                Register Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 border-pubg/50 text-gray-200 hover:bg-pubg/10">
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-md">
            <div className="relative">
              <div className="relative z-10 rounded-lg overflow-hidden border-2 border-pubg/50 shadow-2xl shadow-pubg/20 animate-float">
                <div className="absolute inset-0 bg-gradient-to-br from-twitch/20 to-pubg/20 mix-blend-overlay"></div>
                <img 
                  src="https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                  alt="PUBG Gaming" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gaming-darker to-transparent p-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse mr-2"></div>
                    <span className="text-sm font-medium text-white">LIVE</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-1">Top PUBG Action</h3>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-pubg/30 rounded-full filter blur-[40px] animate-pulse-glow"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
