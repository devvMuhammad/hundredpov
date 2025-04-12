"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  Globe, Users, User, Monitor, Gamepad2, Smartphone,
  Trophy, Clock, Timer, CircleDot
} from "lucide-react";

const Lobby = () => {

  // Mock data for matches
  const openMatches = [
    {
      id: 1,
      name: "Squad Battle Royale",
      playersJoined: 2,
      maxPlayers: 4,
      hostedBy: "PUBGmaster",
      region: "North America",
      platform: "PC",
      mapName: "Erangel",
      gameMode: "TPP",
      timeCreated: "15 minutes ago"
    },
    {
      id: 2,
      name: "Duo Havoc",
      playersJoined: 1,
      maxPlayers: 2,
      hostedBy: "SniperElite",
      region: "Europe",
      platform: "Xbox",
      mapName: "Miramar",
      gameMode: "FPP",
      timeCreated: "32 minutes ago"
    },
    {
      id: 3,
      name: "Solo Practice",
      playersJoined: 1,
      maxPlayers: 1,
      hostedBy: "ProGamer99",
      region: "Asia",
      platform: "Mobile",
      mapName: "Sanhok",
      gameMode: "TPP",
      timeCreated: "48 minutes ago"
    }
  ];

  const ongoingMatches = [
    {
      id: 101,
      name: "Tournament Qualifier",
      playersJoined: 4,
      maxPlayers: 4,
      hostedBy: "TourneyAdmin",
      region: "North America",
      platform: "PC",
      mapName: "Erangel",
      gameMode: "TPP",
      timeStarted: "10 minutes ago",
      playersAlive: 56
    },
    {
      id: 102,
      name: "Pro Scrimmage",
      playersJoined: 4,
      maxPlayers: 4,
      hostedBy: "ProLeague",
      region: "Europe",
      platform: "PC",
      mapName: "Vikendi",
      gameMode: "FPP",
      timeStarted: "24 minutes ago",
      playersAlive: 32
    }
  ];

  const completedMatches = [
    {
      id: 201,
      name: "Weekly Cup Finals",
      playersJoined: 4,
      maxPlayers: 4,
      hostedBy: "CupAdmin",
      region: "North America",
      platform: "PC",
      mapName: "Erangel",
      gameMode: "TPP",
      timeCompleted: "2 hours ago",
      winner: "TeamDominant",
      kills: 28,
      placement: "#1"
    },
    {
      id: 202,
      name: "Casual Squad Game",
      playersJoined: 3,
      maxPlayers: 4,
      hostedBy: "RelaxedGamer",
      region: "South America",
      platform: "PlayStation",
      mapName: "Miramar",
      gameMode: "TPP",
      timeCompleted: "4 hours ago",
      winner: "SurvivorsSquad",
      kills: 15,
      placement: "#3"
    }
  ];

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
            <span className="text-xs text-yellow-400 font-medium">Recruiting</span>
          </div>
        );
      case 'ongoing':
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

  // Match card component
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MatchCard = ({ match, type }: { match: any, type: string }) => {
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
                  <span>{match.playersJoined}/{match.maxPlayers}</span>
                </div>

                <div className="flex items-center text-gray-300">
                  <User className="h-3.5 w-3.5 mr-1.5 text-pubg" />
                  <span>{match.hostedBy}</span>
                </div>
              </div>

              <div className="flex items-center text-gray-300">
                <Globe className="h-3.5 w-3.5 mr-1.5 text-pubg" />
                <span>{match.region}</span>
              </div>

              <div className="flex items-center text-gray-300">
                {getPlatformIcon(match.platform)}
                <span className="ml-1.5">{match.platform}</span>
              </div>
            </div>

            <Separator className="my-2 bg-gaming-darker/50" />

            <div className="grid grid-cols-3 gap-1 mt-1">
              <div className="text-xs">
                <div className="text-gray-400 text-[10px]">Map</div>
                <div className="text-white">{match.mapName}</div>
              </div>

              <div className="text-xs">
                <div className="text-gray-400 text-[10px]">Mode</div>
                <div className="text-white">{match.gameMode}</div>
              </div>

              <div className="text-xs">
                {type === 'open' && (
                  <>
                    <div className="text-gray-400 text-[10px]">Created</div>
                    <div className="text-white">{match.timeCreated}</div>
                  </>
                )}
                {type === 'ongoing' && (
                  <>
                    <div className="text-gray-400 text-[10px]">Alive</div>
                    <div className="text-white">{match.playersAlive}</div>
                  </>
                )}
                {type === 'completed' && (
                  <>
                    <div className="text-gray-400 text-[10px]">Placement</div>
                    <div className="text-white">{match.placement}</div>
                  </>
                )}
              </div>
            </div>

            {type === 'completed' && (
              <div className="mt-2 p-1.5 bg-gaming-darker/70 rounded text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-pubg font-medium">Winner: {match.winner}</span>
                  <span className="text-white">{match.kills} Kills</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </Link>
    );
  };

  return (
    <div className="w-full md:w-3/4">
      <Tabs defaultValue="open" className="w-full">
        <TabsList className="w-full grid grid-cols-3 mb-4 bg-transparent border-b border-gaming-light">
          <TabsTrigger
            value="open"
            className="bg-transparent rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-pubg data-[state=active]:text-white text-gray-400"
          >
            <Clock className="h-4 w-4 mr-2" />
            Open Matches
          </TabsTrigger>
          <TabsTrigger
            value="ongoing"
            className="bg-transparent rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-pubg data-[state=active]:text-white text-gray-400"
          >
            <Timer className="h-4 w-4 mr-2" />
            Live Matches
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="bg-transparent rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-pubg data-[state=active]:text-white text-gray-400"
          >
            <Trophy className="h-4 w-4 mr-2" />
            Completed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="open" className="space-y-4 mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {openMatches.map(match => (
              <MatchCard key={match.id} match={match} type="open" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ongoing" className="space-y-4 mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ongoingMatches.map(match => (
              <MatchCard key={match.id} match={match} type="ongoing" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4 mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedMatches.map(match => (
              <MatchCard key={match.id} match={match} type="completed" />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Lobby;
