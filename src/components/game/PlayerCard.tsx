import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Twitch } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Player {
  id: string;
  name: string;
  twitchName: string;
  avatarUrl: string;
}

interface PlayerCardProps {
  player: Player;
  mode: string;
}

export function PlayerCard({ player }: PlayerCardProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <a
          href={`https://twitch.tv/${player.twitchName}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <div className="p-2 bg-gaming-light cursor-pointer hover:bg-pubg/10 transition-colors">
            <PlayerCardContent player={player} />
          </div>
        </a>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-gaming-darker border-pubg/20 p-0 overflow-hidden">
        <div className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <Avatar className="h-10 w-10 border-2 border-pubg">
              <AvatarImage src={player.avatarUrl} alt={player.name} />
              <AvatarFallback className="bg-pubg text-white">{player.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-white">{player.name}</p>
              <p className="text-xs text-purple-300 flex items-center gap-1">
                <Twitch className="h-3 w-3" />
                {player.twitchName}
              </p>
            </div>
          </div>
          <Button
            variant="default"
            className="w-full bg-[#9146FF] hover:bg-[#7E69AB] text-white"
            onClick={() => window.open(`https://twitch.tv/${player.twitchName}`, '_blank')}
          >
            <Twitch className="h-4 w-4 mr-2" />
            Watch Stream
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

const PlayerCardContent = ({ player }: { player: Player }) => {
  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-6 w-6 border border-purple-400">
        <AvatarImage src={player.avatarUrl} alt={player.name} />
        <AvatarFallback className="text-[10px]">{player.name.substring(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="overflow-hidden">
        <p className="text-xs text-white truncate">{player.name}</p>
        <p className="text-[10px] text-purple-300 flex items-center gap-0.5 truncate">
          <Twitch className="h-2.5 w-2.5" />
          {player.twitchName}
        </p>
      </div>
    </div>
  );
}; 