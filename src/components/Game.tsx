"use client";
import Link from "next/link";
import { ArrowLeft, PlayCircle, StopCircle, CircleDot } from "lucide-react";
import { HostInfo } from "./game/HostInfo";
import { GameOverview } from "./game/GameOverview";
import { Teams } from "./game/Teams";

type GameStatus = "open" | "live" | "completed";

interface Game {
  id: string;
  name: string;
  description?: string | null;
  map_name: string;
  platform: string;
  game_mode: string;
  match_type: string;
  status: GameStatus;
  created_at: string;
  host: {
    id: string;
    name: string;
    avatar_url: string;
  };
}

interface GameProps {
  game: Game;
  userId: string | undefined;
  slots: { slot_index: number; players: { id: string; name: string; twitchName: string; avatarUrl: string }[] }[];
}

export default function Game({ game, userId }: GameProps) {
  const heroMode = userId === game.host.id;

  // Handle game status changes
  const handleStartGame = () => {
    // TODO: Implement game start logic with server action
  };

  const handleEndGame = () => {
    // TODO: Implement game end logic with server action
  };

  const getStatusIndicator = (status: GameStatus) => {
    switch (status) {
      case 'open':
        return (
          <div className="flex items-center gap-1.5">
            <CircleDot className="h-3 w-3 text-yellow-400 fill-yellow-400" />
            <span className="text-yellow-400 font-medium">Open for Joining</span>
          </div>
        );
      case 'live':
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
            <h1 className="text-2xl md:text-3xl font-bold">{game.name}</h1>
            <div className="flex items-center gap-3">
              {getStatusIndicator(game.status)}

              {/* Host controls */}
              {heroMode && (
                <>
                  {game.status === "open" && (
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
                      onClick={handleStartGame}
                    >
                      <PlayCircle className="h-4 w-4" />
                      Start Match
                    </button>
                  )}

                  {game.status === "live" && (
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
                      onClick={handleEndGame}
                    >
                      <StopCircle className="h-4 w-4" />
                      End Match
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Game info and host section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <HostInfo host={game.host} />
          <GameOverview game={game} />
        </div>

        {/* Teams section */}
        <Teams
          matchType={game.match_type}
          heroMode={heroMode}

        />
      </div>
    </div>
  );
}
