"use client";
import Link from "next/link";
import { ArrowLeft, PlayCircle, StopCircle, CircleDot } from "lucide-react";
import { GameStatus } from "@/actions/game";

interface GameHeaderProps {
  gameName: string;
  status: GameStatus;
  isHost: boolean;
  onStartGame: () => void;
  onEndGame: () => void;
}

export function GameHeader({ gameName, status, isHost, onStartGame, onEndGame }: GameHeaderProps) {
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
    <div className="flex flex-col mb-6">
      <Link href="/lobby" className="text-gray-400 hover:text-white mb-2 inline-flex items-center w-fit">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Lobby
      </Link>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold">{gameName}</h1>
        <div className="flex items-center gap-3">
          {getStatusIndicator(status)}

          {/* Host controls */}
          {isHost && (
            <>
              {status === "open" && (
                <button
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
                  onClick={onStartGame}
                >
                  <PlayCircle className="h-4 w-4" />
                  Start Match
                </button>
              )}

              {status === "live" && (
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
                  onClick={onEndGame}
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
  );
} 