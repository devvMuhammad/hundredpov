import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Monitor, Gamepad2, Smartphone, User, MapPin, Clock, Users } from "lucide-react";

interface GameOverviewProps {
  game: {
    name: string;
    description?: string | null;
    map_name: string;
    platform: string;
    game_mode: string;
    match_type: string;
    created_at: string;
  };
}

export function GameOverview({ game }: GameOverviewProps) {
  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'pc':
        return <Monitor className="h-4 w-4" />;
      case 'xbox':
      case 'playstation':
        return <Gamepad2 className="h-4 w-4" />;
      case 'mobile':
        return <Smartphone className="h-4 w-4" />;
      default:
        return <Gamepad2 className="h-4 w-4" />;
    }
  };

  return (
    <Card className="border-pubg/20 bg-gaming-light md:col-span-2 hover:border-pubg/40 transition-colors md:order-2">
      <CardHeader className="pb-2 border-b border-gaming-darker/30">
        <CardTitle className="text-base text-white flex items-center gap-2">
          <Globe className="h-5 w-5 text-pubg" />
          Match Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gaming-darker/30 p-3 rounded-md">
            <p className="text-xs text-gray-400 mb-1">Game Mode</p>
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-pubg" />
              <p className="text-white font-medium">{game.match_type}</p>
            </div>
          </div>

          <div className="bg-gaming-darker/30 p-3 rounded-md">
            <p className="text-xs text-gray-400 mb-1">Platform</p>
            <div className="flex items-center gap-1.5">
              {getPlatformIcon(game.platform)}
              <p className="text-white font-medium">{game.platform}</p>
            </div>
          </div>

          <div className="bg-gaming-darker/30 p-3 rounded-md">
            <p className="text-xs text-gray-400 mb-1">Map</p>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-pubg" />
              <p className="text-white font-medium">{game.map_name}</p>
            </div>
          </div>

          <div className="bg-gaming-darker/30 p-3 rounded-md">
            <p className="text-xs text-gray-400 mb-1">Perspective</p>
            <div className="flex items-center gap-1.5">
              <User className="h-4 w-4 text-pubg" />
              <p className="text-white font-medium">{game.game_mode.toUpperCase()}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 bg-gaming-darker/20 p-3 rounded-md">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-pubg" />
              <p className="text-sm text-white">Created {new Date(game.created_at).toLocaleString()}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-pubg" />
              <p className="text-sm text-white">Players Joined <strong className="ml-2">0 / 100</strong></p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 