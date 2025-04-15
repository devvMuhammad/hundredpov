"use client";
import { HostInfo } from "./game/HostInfo";
import { GameOverview } from "./game/GameOverview";
import { Teams } from "./game/Teams";
import { GameHeader } from "./game/GameHeader";
import { GameData } from "@/actions/game";
import { GameSlot } from "@/types";

interface GameProps {
  game: GameData;
  userId: string | undefined;
  slots: GameSlot[];
}

export default function Game({ game, userId, slots }: GameProps) {
  const isHost = userId === game.host.id;

  // Handle game status changes
  const handleStartGame = () => {
    // TODO: Implement game start logic with server action
  };

  const handleEndGame = () => {
    // TODO: Implement game end logic with server action
  };

  return (
    <div className="min-h-screen bg-gaming-darker text-white pt-20 pb-12">
      <div className="container mx-auto px-4">
        <GameHeader
          gameName={game.name}
          status={game.status}
          isHost={isHost}
          onStartGame={handleStartGame}
          onEndGame={handleEndGame}
        />

        {/* Game info and host section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <HostInfo host={game.host} />
          <GameOverview game={game} />
        </div>

        {/* Teams section */}
        <Teams
          matchType={game.match_type}
          heroMode={isHost}
          gameId={game.id}
          userId={userId}
          slots={slots}
        />
      </div>
    </div>
  );
}
