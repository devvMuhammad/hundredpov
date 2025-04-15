import { ArrowLeft, Link, PlayCircle, StopCircle } from "lucide-react";
import { GameStatus } from "@/actions/game";

interface GameHeaderProps {
  gameName: string;
  status: GameStatus;
  isHost: boolean;
  onStartGame: () => void;
  onEndGame: () => void;
}

function getStatusIndicator(status: GameStatus) {
  switch (status) {
    case "open":
      return (
        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
          Open
        </span>
      );
    case "live":
      return (
        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
          Live
        </span>
      );
    case "completed":
      return (
        <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
          Completed
        </span>
      );
    default:
      return null;
  }
}

export default function GameHeader({
  gameName,
  status,
  isHost,
  onStartGame,
  onEndGame,
}: GameHeaderProps) {
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