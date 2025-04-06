"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft, Globe, Monitor, Gamepad2, Smartphone,
  User, Users, Clock, Twitch, MapPin,
  CircleDot, UserRound, CircleDashed
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import Link from "next/link";
import { useParams } from "next/navigation";

// Types for our game
type MatchMode = "Solo" | "Duo" | "Squad";
type MatchMap = "Erangel" | "Miramar" | "Sanhok" | "Vikendi" | "Taego";
type Platform = "PC" | "Xbox" | "PlayStation" | "Mobile";
type Region = "North America" | "Europe" | "Asia" | "South America" | "Oceania";
type GameStatus = "open" | "ongoing" | "completed";

interface Player {
  id: string;
  name: string;
  twitchName: string;
  avatarUrl: string;
}

interface Team {
  id: string;
  players: Player[];
  isFilled: boolean;
}

const Game = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);

  // Mock game data
  const [gameData, setGameData] = useState<{
    id: string;
    name: string;
    mode: MatchMode;
    map: MatchMap;
    platform: Platform;
    region: Region;
    maxPlayers: number;
    currentPlayers: number;
    status: GameStatus;
    timeCreated: string;
    host: {
      name: string;
      avatarUrl: string;
      rank: string;
    };
    teams: Team[];
  } | null>(null);

  useEffect(() => {
    // Simulate fetching game data
    setTimeout(() => {
      // Generate mock data based on the match ID
      const mockGame = generateMockGameData(id || "1");
      setGameData(mockGame);
      setLoading(false);
    }, 1000);
  }, [id]);

  // Generate mock player data
  const generateMockGameData = (gameId: string) => {
    // Determine game mode based on ID to simulate different modes
    const modeNum = parseInt(gameId) % 3;
    const mode: MatchMode = modeNum === 0 ? "Solo" : modeNum === 1 ? "Duo" : "Squad";

    // Calculate team size and number of teams based on mode
    const teamSize = mode === "Solo" ? 1 : mode === "Duo" ? 2 : 4;
    const totalTeams = mode === "Solo" ? 100 : mode === "Duo" ? 50 : 25;

    // Generate teams with varying fill status
    const teams: Team[] = [];
    for (let i = 0; i < totalTeams; i++) {
      const isFilled = Math.random() > 0.7; // 30% chance of being unfilled
      const teamPlayers: Player[] = [];

      if (isFilled) {
        // Generate players for filled teams
        for (let j = 0; j < teamSize; j++) {
          teamPlayers.push({
            id: `player-${i}-${j}`,
            name: `Player${i}${j}`,
            twitchName: `twitchPlayer${i}${j}`,
            avatarUrl: `https://i.pravatar.cc/150?img=${(i * teamSize + j) % 70}`
          });
        }
      }

      teams.push({
        id: `team-${i}`,
        players: teamPlayers,
        isFilled
      });
    }

    return {
      id: gameId,
      name: `Battle Royale ${gameId}`,
      mode,
      map: ["Erangel", "Miramar", "Sanhok", "Vikendi", "Taego"][parseInt(gameId) % 5] as MatchMap,
      platform: ["PC", "Xbox", "PlayStation", "Mobile"][parseInt(gameId) % 4] as Platform,
      region: ["North America", "Europe", "Asia", "South America", "Oceania"][parseInt(gameId) % 5] as Region,
      maxPlayers: mode === "Solo" ? 100 : mode === "Duo" ? 100 : 100,
      currentPlayers: Math.floor(Math.random() * (mode === "Solo" ? 100 : mode === "Duo" ? 100 : 100)),
      status: ["open", "ongoing", "completed"][parseInt(gameId) % 3] as GameStatus,
      timeCreated: "30 minutes ago",
      host: {
        name: "HostPlayer123",
        avatarUrl: "https://i.pravatar.cc/150?img=1",
        rank: "Diamond"
      },
      teams
    };
  };

  const getPlatformIcon = (platform: Platform) => {
    switch (platform) {
      case 'PC':
        return <Monitor className="h-4 w-4" />;
      case 'Xbox':
      case 'PlayStation':
        return <Gamepad2 className="h-4 w-4" />;
      case 'Mobile':
        return <Smartphone className="h-4 w-4" />;
      default:
        return <Gamepad2 className="h-4 w-4" />;
    }
  };

  const getStatusIndicator = (status: GameStatus) => {
    switch (status) {
      case 'open':
        return (
          <div className="flex items-center gap-1.5">
            <CircleDot className="h-3 w-3 text-yellow-400 fill-yellow-400" />
            <span className="text-yellow-400 font-medium">Recruiting</span>
          </div>
        );
      case 'ongoing':
        return (
          <div className="flex items-center gap-1.5">
            <CircleDot className="h-3 w-3 text-green-400 fill-green-400" />
            <span className="text-green-400 font-medium">Live</span>
          </div>
        );
      case 'completed':
        return (
          <div className="flex items-center gap-1.5">
            <CircleDot className="h-3 w-3 text-red-400 fill-red-400" />
            <span className="text-red-400 font-medium">Completed</span>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gaming-darker text-white pt-20 pb-12 flex items-center justify-center">
        <div className="animate-pulse">Loading match data...</div>
      </div>
    );
  }

  if (!gameData) {
    return (
      <div className="min-h-screen bg-gaming-darker text-white pt-20 pb-12 flex items-center justify-center">
        <div>Match not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gaming-darker text-white pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Back button and game header */}
        <div className="flex flex-col mb-6">
          <Link href="/lobby" className="text-gray-400 hover:text-white mb-2 inline-flex items-center w-fit">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Lobby
          </Link>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold">{gameData.name}</h1>
            {getStatusIndicator(gameData.status)}
          </div>
        </div>

        {/* Game info and host section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Match details card */}
          <Card className="border-pubg/20 bg-gaming-light md:col-span-2 hover:border-pubg/40 transition-colors">
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
                    <p className="text-white font-medium">{gameData.mode}</p>
                  </div>
                </div>

                <div className="bg-gaming-darker/30 p-3 rounded-md">
                  <p className="text-xs text-gray-400 mb-1">Region</p>
                  <div className="flex items-center gap-1.5">
                    <Globe className="h-4 w-4 text-pubg" />
                    <p className="text-white font-medium">{gameData.region}</p>
                  </div>
                </div>

                <div className="bg-gaming-darker/30 p-3 rounded-md">
                  <p className="text-xs text-gray-400 mb-1">Platform</p>
                  <div className="flex items-center gap-1.5">
                    {getPlatformIcon(gameData.platform)}
                    <p className="text-white font-medium">{gameData.platform}</p>
                  </div>
                </div>

                <div className="bg-gaming-darker/30 p-3 rounded-md">
                  <p className="text-xs text-gray-400 mb-1">Map</p>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-pubg" />
                    <p className="text-white font-medium">{gameData.map}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-gaming-darker/20 p-3 rounded-md">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <User className="h-4 w-4 text-pubg" />
                    <p className="text-sm text-white">{gameData.currentPlayers}/{gameData.maxPlayers} Players</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-pubg" />
                    <p className="text-sm text-white">Created {gameData.timeCreated}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Host details card */}
          <Card className="border-pubg/20 bg-gaming-light hover:border-pubg/40 transition-colors">
            <CardHeader className="pb-2 border-b border-gaming-darker/30">
              <CardTitle className="text-base text-white flex items-center gap-2">
                <UserRound className="h-5 w-5 text-pubg" />
                Host Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-4 bg-gaming-darker/10">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-pubg">
                    <AvatarImage src={gameData.host.avatarUrl} alt={gameData.host.name} />
                    <AvatarFallback className="bg-pubg text-white">{gameData.host.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <p className="font-bold text-lg text-white">{gameData.host.name}</p>
                    <Badge variant="outline" className="mt-1 bg-gaming-darker/40 border-pubg/40 text-pubg">
                      {gameData.host.rank} Rank
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-b from-transparent to-pubg/5">
                <Button
                  variant="default"
                  className="w-full bg-pubg hover:bg-pubg-dark text-white"
                >
                  <Twitch className="h-4 w-4 mr-2" />
                  View Host Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Teams section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Teams</h2>

          <div className={`grid gap-3 ${gameData.mode === 'Solo' ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8' :
            gameData.mode === 'Duo' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' :
              'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            }`}>
            {gameData.teams.map((team, index) => (
              <TeamCard key={team.id} team={team} mode={gameData.mode} teamNumber={index + 1} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Component for rendering a team card
const TeamCard = ({ team, mode, teamNumber }: { team: Team; mode: MatchMode; teamNumber: number }) => {
  return (
    <Card className={`border-pubg/10 ${team.isFilled ? 'bg-gaming-light' : 'bg-gaming-darker/60 border-dashed border-gaming-light/30'} overflow-hidden`}>
      <CardHeader className="py-2 px-3 bg-gaming-darker/50">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm text-white">Team {teamNumber}</CardTitle>
          {!team.isFilled && (
            <Badge variant="outline" className="text-xs border-gaming-light/40 text-gray-400">
              Empty
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {team.isFilled ? (
          <div className={`grid ${mode === 'Squad' ? 'grid-cols-2' : 'grid-cols-1'} gap-px bg-gaming-darker/30`}>
            {team.players.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        ) : (
          <div className="p-4 flex flex-col items-center justify-center space-y-2 text-center">
            <CircleDashed className="h-6 w-6 text-gray-500 animate-pulse" />
            <p className="text-xs text-gray-400">Waiting for players</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Component for rendering a player card
const PlayerCard = ({ player }: { player: Player }) => {

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="p-2 bg-gaming-light cursor-pointer hover:bg-pubg/10 transition-colors">
          <a
            href={`https://twitch.tv/${player.twitchName}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <PlayerCardContent player={player} />
          </a>
        </div>
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
};

// Reusable component for player card content
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

export default Game;
