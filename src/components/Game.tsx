"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link"
import {
  ArrowLeft, Globe, Monitor, Gamepad2, Smartphone,
  User, Users, Clock, Twitch, MapPin,
  CircleDot, UserRound, CircleDashed, MoreVertical,
  PlayCircle, StopCircle, ArrowRightLeft, MoveRight, Trash2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
export default function Game() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [heroMode] = useState(true); // Host powers enabled

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

  // Dialog and action states
  const [swapDialogOpen, setSwapDialogOpen] = useState(false);
  const [moveDialogOpen, setMoveDialogOpen] = useState(false);
  const [selectedTeamIndex, setSelectedTeamIndex] = useState<number | null>(null);

  useEffect(() => {
    // Simulate fetching game data
    setTimeout(() => {
      // Generate mock data based on the match ID
      const mockGame = generateMockGameData(id || "1");
      setGameData(mockGame);
      setLoading(false);
    }, 1000);
  }, [id]);

  // Handle game status changes
  const handleStartGame = () => {
    if (gameData) {
      setGameData({
        ...gameData,
        status: "ongoing"
      });
    }
  };

  const handleEndGame = () => {
    if (gameData) {
      setGameData({
        ...gameData,
        status: "completed"
      });
    }
  };

  // Team management actions
  const handleSwapTeam = (fromIndex: number, toIndex: number) => {
    if (gameData) {
      const newTeams = [...gameData.teams];
      const temp = newTeams[fromIndex];
      newTeams[fromIndex] = newTeams[toIndex];
      newTeams[toIndex] = temp;

      setGameData({
        ...gameData,
        teams: newTeams
      });
      setSwapDialogOpen(false);
    }
  };

  const handleMoveTeam = (fromIndex: number, toIndex: number) => {
    if (gameData && fromIndex !== toIndex) {
      const newTeams = [...gameData.teams];
      const movingTeam = { ...newTeams[fromIndex] };

      // Create an empty team for the original position
      newTeams[fromIndex] = {
        id: `team-${fromIndex}`,
        players: [],
        isFilled: false
      };

      // Move team to new position
      newTeams[toIndex] = movingTeam;

      setGameData({
        ...gameData,
        teams: newTeams
      });
      setMoveDialogOpen(false);
    }
  };

  const handleRemoveTeam = (index: number) => {
    if (gameData) {
      const newTeams = [...gameData.teams];
      newTeams[index] = {
        id: `team-${index}`,
        players: [],
        isFilled: false
      };

      setGameData({
        ...gameData,
        teams: newTeams,
        currentPlayers: gameData.currentPlayers - (gameData.mode === "Solo" ? 1 : gameData.mode === "Duo" ? 2 : 4)
      });
    }
  };

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

  const filledTeams = gameData.teams.filter(team => team.isFilled);
  const emptyTeams = gameData.teams.filter(team => !team.isFilled);

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
            <div className="flex items-center gap-3">
              {getStatusIndicator(gameData.status)}

              {/* Host controls */}
              {heroMode && (
                <>
                  {gameData.status === "open" && (
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={handleStartGame}
                    >
                      <PlayCircle className="h-4 w-4 mr-1" />
                      Start Match
                    </Button>
                  )}

                  {gameData.status === "ongoing" && (
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-red-600 hover:bg-red-700"
                      onClick={handleEndGame}
                    >
                      <StopCircle className="h-4 w-4 mr-1" />
                      End Match
                    </Button>
                  )}

                  {gameData.status === "completed" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push('/host-game')}
                    >
                      Host New Match
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Game info and host section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Host details card */}
          <Card className="border-pubg/20 bg-gaming-light hover:border-pubg/40 transition-colors md:order-1">
            <CardHeader className="pb-2 border-b border-gaming-darker/30">
              <CardTitle className="text-base text-white flex items-center gap-2">
                <UserRound className="h-5 w-5 text-pubg" />
                Host Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-4 bg-gradient-to-b from-gaming-darker/5 to-gaming-darker/15">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-20 w-20 border-2 border-pubg ring-2 ring-pubg/30 ring-offset-2 ring-offset-gaming-darker">
                    <AvatarImage src={gameData.host.avatarUrl} alt={gameData.host.name} />
                    <AvatarFallback className="bg-pubg text-white">{gameData.host.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <p className="font-bold text-xl text-white">{gameData.host.name}</p>
                    <Badge variant="outline" className="mt-2 bg-gaming-darker/40 border-pubg/40 text-pubg">
                      {gameData.host.rank} Rank
                    </Badge>
                    {heroMode && (
                      <Badge variant="outline" className="mt-2 ml-2 bg-pubg/20 border-pubg text-white">
                        Host
                      </Badge>
                    )}
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

          {/* Match details card */}
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
        </div>

        {/* Teams section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Teams</h2>

          <div className={`grid gap-3 ${gameData.mode === 'Solo' ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8' :
            gameData.mode === 'Duo' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' :
              'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            }`}>
            {gameData.teams.map((team, index) => (
              <TeamCard
                key={team.id}
                team={team}
                mode={gameData.mode}
                teamNumber={index + 1}
                heroMode={heroMode}
                onSelectTeam={() => setSelectedTeamIndex(index)}
                onSwapTeam={() => {
                  setSelectedTeamIndex(index);
                  setSwapDialogOpen(true);
                }}
                onMoveTeam={() => {
                  setSelectedTeamIndex(index);
                  setMoveDialogOpen(true);
                }}
                onRemoveTeam={() => handleRemoveTeam(index)}
              />
            ))}
          </div>
        </div>

        {/* Swap Team Dialog */}
        <Dialog open={swapDialogOpen} onOpenChange={setSwapDialogOpen}>
          <DialogContent className="bg-gaming-light border-pubg/30 max-w-md max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">Swap Team Position</DialogTitle>
              <DialogDescription className="text-gray-400">
                Select a team to swap positions with Team {selectedTeamIndex !== null ? selectedTeamIndex + 1 : ''}
              </DialogDescription>
            </DialogHeader>

            {filledTeams.length > 1 ? (
              <div className="grid gap-2 py-4">
                {filledTeams.map((team) => {
                  const indexInOriginalArray = gameData.teams.findIndex(t => t.id === team.id);
                  if (indexInOriginalArray === selectedTeamIndex) return null;

                  return (
                    <Button
                      key={team.id}
                      variant="outline"
                      className="justify-start h-auto py-3 hover:bg-gaming-darker/30"
                      onClick={() => handleSwapTeam(selectedTeamIndex!, indexInOriginalArray)}
                    >
                      <div className="flex items-center w-full">
                        <div className="bg-pubg/20 text-white rounded px-2 py-1 mr-3">
                          Team {indexInOriginalArray + 1}
                        </div>
                        <div className="flex-1 flex items-center gap-2">
                          {team.players.map(player => (
                            <Avatar key={player.id} className="h-6 w-6 border border-pubg/30">
                              <AvatarImage src={player.avatarUrl} alt={player.name} />
                              <AvatarFallback>{player.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <ArrowRightLeft className="h-4 w-4 text-gray-400" />
                      </div>
                    </Button>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center py-6 text-center">
                <CircleDashed className="h-12 w-12 text-gray-500 mb-2" />
                <p className="text-gray-400">No other teams available to swap with</p>
              </div>
            )}

            <DialogClose asChild>
              <Button variant="outline" className="w-full">Cancel</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>

        {/* Move Team Dialog */}
        <Dialog open={moveDialogOpen} onOpenChange={setMoveDialogOpen}>
          <DialogContent className="bg-gaming-light border-pubg/30 max-w-md max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">Move Team</DialogTitle>
              <DialogDescription className="text-gray-400">
                Select an empty slot to move Team {selectedTeamIndex !== null ? selectedTeamIndex + 1 : ''}
              </DialogDescription>
            </DialogHeader>

            {emptyTeams.length > 0 ? (
              <div className="grid gap-2 py-4">
                {emptyTeams.map((team) => {
                  const indexInOriginalArray = gameData.teams.findIndex(t => t.id === team.id);

                  return (
                    <Button
                      key={team.id}
                      variant="outline"
                      className="justify-start h-auto py-3 hover:bg-gaming-darker/30"
                      onClick={() => handleMoveTeam(selectedTeamIndex!, indexInOriginalArray)}
                    >
                      <div className="flex items-center w-full">
                        <div className="bg-gaming-darker/50 text-gray-300 rounded px-2 py-1 mr-3">
                          Slot {indexInOriginalArray + 1}
                        </div>
                        <div className="flex-1 flex items-center">
                          <span className="text-gray-400">Empty position</span>
                        </div>
                        <MoveRight className="h-4 w-4 text-gray-400" />
                      </div>
                    </Button>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center py-6 text-center">
                <CircleDashed className="h-12 w-12 text-gray-500 mb-2" />
                <p className="text-gray-400">No empty slots available</p>
              </div>
            )}

            <DialogClose asChild>
              <Button variant="outline" className="w-full">Cancel</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

// Component for rendering a team card
const TeamCard = ({
  team,
  mode,
  teamNumber,
  heroMode,
  onSelectTeam,
  onSwapTeam,
  onMoveTeam,
  onRemoveTeam
}: {
  team: Team;
  mode: MatchMode;
  teamNumber: number;
  heroMode: boolean;
  onSelectTeam: () => void;
  onSwapTeam: () => void;
  onMoveTeam: () => void;
  onRemoveTeam: () => void;
}) => {
  return (
    <Card className={`border-pubg/10 relative ${team.isFilled ? 'bg-gaming-light' : 'bg-gaming-darker/60 border-dashed border-gaming-light/30'} overflow-hidden`}>
      <CardHeader className="py-2 px-3 bg-gaming-darker/50 flex flex-row justify-between items-center">
        <CardTitle className="text-sm text-white">Team {teamNumber}</CardTitle>
        {!team.isFilled ? (
          <Badge variant="outline" className="text-xs border-gaming-light/40 text-gray-400">
            Empty
          </Badge>
        ) : heroMode && (
          <DropdownMenu>
            <DropdownMenuTrigger className="h-6 w-6 rounded-full hover:bg-gaming-darker/50 flex items-center justify-center">
              <MoreVertical className="h-4 w-4 text-gray-400" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gaming-darker border-pubg/20 text-white">
              <DropdownMenuItem className="hover:bg-gaming-light/20 cursor-pointer" onClick={onSwapTeam}>
                <ArrowRightLeft className="h-4 w-4 mr-2" />
                Swap Position
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gaming-light/20 cursor-pointer" onClick={onMoveTeam}>
                <MoveRight className="h-4 w-4 mr-2" />
                Move to Empty Slot
              </DropdownMenuItem>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    className="hover:bg-red-900/30 text-red-400 cursor-pointer"
                    onSelect={(e) => {
                      e.preventDefault();
                      onSelectTeam();
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove Team
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-gaming-light border-pubg/30">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">Remove Team</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-400">
                      Are you sure you want to remove <strong>Team {teamNumber}</strong>? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-transparent text-white border-gaming-light/30 hover:bg-gaming-darker/50">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-700 text-white hover:bg-red-800"
                      onClick={onRemoveTeam}
                    >
                      Remove
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </CardHeader>
      <CardContent className="p-0">
        {team.isFilled ? (
          <div className={`${mode === 'Squad' ? 'grid grid-cols-2 gap-px bg-gaming-darker/30' : ''}`}>
            {team.players.map((player) => (
              <PlayerCard key={player.id} player={player} mode={mode} />
            ))}
          </div>
        ) : (
          <div className="p-4 flex flex-col items-center justify-center space-y-2 text-center">
            <CircleDashed className="h-6 w-6 text-gray-500 animate-pulse" />
            <p className="text-xs text-gray-400">Waiting</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Component for rendering a player card
const PlayerCard = ({ player }: { player: Player; mode: MatchMode }) => {
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

