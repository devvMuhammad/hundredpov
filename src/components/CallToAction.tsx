
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-gaming-darker via-gaming-dark to-gaming-darker"></div>
      
      {/* Animated orbs */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-twitch/20 rounded-full filter blur-[80px] animate-pulse-glow"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-pubg/20 rounded-full filter blur-[80px] animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
      
      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto bg-gaming-light/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10 shadow-xl">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready to Join the Action?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Create your free account now and become part of the fastest-growing PUBG community platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="glow-button bg-pubg hover:bg-pubg-dark text-white w-full sm:w-auto text-lg px-8 py-6">
                Register Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 border-white/20 text-gray-200 hover:bg-white/5">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
