
import { Button } from "@/components/ui/button";
import { TwitchIcon } from "lucide-react";

const streamers = [
  {
    name: "ShroudTV",
    game: "PUBG",
    viewers: "24.5K",
    thumbnail: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    isLive: true
  },
  {
    name: "ChocotacoGG",
    game: "PUBG",
    viewers: "12.8K",
    thumbnail: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    isLive: true
  },
  {
    name: "WackyJacky101",
    game: "PUBG",
    viewers: "8.3K",
    thumbnail: "https://images.unsplash.com/photo-1616627547584-bf28cee262db?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    isLive: true
  }
];

const StreamPreview = () => {
  return (
    <section id="streams" className="py-20 bg-gaming-darker">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pubg to-pubg-light">
              Live Now
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl">
              Top-ranked PUBG streamers bringing you the most intense battlegrounds action.
            </p>
          </div>
          <Button className="mt-4 md:mt-0 bg-pubg hover:bg-pubg-dark text-white">
            <TwitchIcon className="mr-2 h-4 w-4" />
            View All Streams
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {streamers.map((streamer, index) => (
            <div key={index} className="group relative overflow-hidden rounded-xl bg-gaming-light border border-pubg/20 transition-all hover:border-pubg/40 hover:shadow-lg hover:shadow-pubg/10">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={streamer.thumbnail} 
                  alt={streamer.name} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                {streamer.isLive && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded flex items-center">
                    <span className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></span>
                    LIVE
                  </div>
                )}
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded">
                  {streamer.viewers} viewers
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-pubg flex items-center justify-center mr-2">
                    <TwitchIcon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{streamer.name}</h3>
                    <p className="text-xs text-gray-400">{streamer.game}</p>
                  </div>
                </div>
                <Button variant="ghost" className="w-full mt-2 border border-pubg/20 hover:bg-pubg/10 text-white">
                  Watch Stream
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StreamPreview;
