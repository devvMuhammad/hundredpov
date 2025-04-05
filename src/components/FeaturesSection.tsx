
import { BarChart3, TwitchIcon, UserCheck, Shield } from "lucide-react";

const features = [
  {
    icon: <TwitchIcon className="h-10 w-10 text-twitch" />,
    title: "Live Twitch Stream Thumbnails",
    description: "View live streams sorted by player ranking. Never miss top-tier gameplay from the best PUBG streamers."
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-pubg" />,
    title: "Real-Time PUBG Player Rankings",
    description: "Track performance metrics and leaderboards updated in real-time after each match."
  },
  {
    icon: <UserCheck className="h-10 w-10 text-twitch-light" />,
    title: "User Login & Personalized Dashboard",
    description: "Create your profile, follow favorite streamers, and get customized content based on your preferences."
  },
  {
    icon: <Shield className="h-10 w-10 text-pubg-light" />,
    title: "Seamless, Secure Access",
    description: "No paywalls or hidden fees. Access all features with your free account, secured with the latest protection."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gaming-dark z-0">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-twitch/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-pubg/5 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pubg to-twitch">
            Platform Features
          </h2>
          <p className="text-gray-400 text-lg">
            Everything you need to stay connected with the PUBG community and never miss epic gameplay moments.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card group">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gaming-darker">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-pubg transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
