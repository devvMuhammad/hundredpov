import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CircleDot, Gamepad2, Globe, Monitor, Smartphone, User, Users } from "lucide-react";
import { Separator } from "../ui/separator";
import { Game } from "@/app/actions/games";

// Platform icon mapping function
const getPlatformIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'pc':
      return <Monitor className="h-4 w-4" />;
    case 'xbox':
      return <Gamepad2 className="h-4 w-4" />;
    case 'playstation':
      return <Gamepad2 className="h-4 w-4" />;
    case 'mobile':
      return <Smartphone className="h-4 w-4" />;
    default:
      return <Gamepad2 className="h-4 w-4" />;
  }
};

// Get status indicator component
const getStatusIndicator = (type: string) => {
  switch (type) {
    case 'open':
      return (
        <div className="flex items-center gap-1">
          <CircleDot className="h-3 w-3 text-yellow-400 fill-yellow-400" />
          <span className="text-xs text-yellow-400 font-medium">Open</span>
        </div>
      );
    case 'live':
      return (
        <div className="flex items-center gap-1">
          <CircleDot className="h-3 w-3 text-green-400 fill-green-400" />
          <span className="text-xs text-green-400 font-medium">Live</span>
        </div>
      );
    case 'completed':
      return (
        <div className="flex items-center gap-1">
          <CircleDot className="h-3 w-3 text-red-400 fill-red-400" />
          <span className="text-xs text-red-400 font-medium">Completed</span>
        </div>
      );
    default:
      return null;
  }
};

// Format time ago
const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} days ago`;
};

export const MatchCard = ({ match, type }: { match: Game, type: string }) => {
  return (
    <Link href={`/game/${match.id}`} className="block">
      <Card className="mb-3 border-pubg/10 bg-gaming-light hover:border-pubg/30 transition-all shadow-sm">
        <CardHeader className="pb-0 pt-3 px-4">
          <div className="flex justify-between items-start">
            <CardTitle className="text-base text-white">{match.name}</CardTitle>
            {getStatusIndicator(type)}
          </div>
        </CardHeader>
        <CardContent className="pt-2 pb-3 px-4">
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs">
            <div className="w-full flex flex-row justify-between items-center mb-1">
              <div className="flex items-center text-gray-300">
                <Users className="h-3.5 w-3.5 mr-1.5 text-pubg" />
                <span>0/100</span>
              </div>

              <div className="flex items-center text-gray-300">
                <User className="h-3.5 w-3.5 mr-1.5 text-pubg" />
                {/* <span>{match.host.name}</span> */}
              </div>
            </div>

            <div className="flex gap-x-6 items-center">
              <div className="flex items-center text-gray-300">
                <Globe className="h-3.5 w-3.5 mr-1.5 text-pubg" />
                <span>{match.region.toUpperCase()}</span>
              </div>

              <div className="flex items-center text-gray-300">
                {getPlatformIcon(match.platform)}
                <span className="ml-1.5">{match.platform}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Gamepad2 className="h-3.5 w-3.5 text-pubg" />
                <span className="ml-1.5">{match.match_type}</span>
              </div>
            </div>
          </div>

          <Separator className="my-2 bg-gaming-darker/50" />

          <div className="grid grid-cols-3 gap-1 mt-1">
            <div className="text-xs">
              <div className="text-gray-400 text-[10px]">Map</div>
              <div className="text-white">{match.map_name}</div>
            </div>

            <div className="text-xs">
              <div className="text-gray-400 text-[10px]">Mode</div>
              <div className="text-white">{match.game_mode.toUpperCase()}</div>
            </div>

            <div className="text-xs">
              <div className="text-gray-400 text-[10px]">Created</div>
              <div className="text-white">{formatTimeAgo(match.created_at)}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};