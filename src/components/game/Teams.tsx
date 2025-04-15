import { useMemo, useState } from "react";
import { TeamCard } from "./TeamCard";
import { JoinGame } from "./JoinGame";
import { GameSlot } from "@/types";

interface TeamsProps {
  matchType: string;
  heroMode: boolean;
  gameId: string;
  userId: string | undefined;
  slots: GameSlot[];
}

export function Teams({
  matchType,
  heroMode,
  gameId,
  userId,
  slots,
}: TeamsProps) {
  // Create a complete array of slots, filling any missing slots with empty teams
  const [teams, setTeams] = useState<GameSlot[]>(() => {
    const maxSlots = matchType === "solo" ? 100 : matchType === "duo" ? 50 : 25;
    const filledSlots = new Map(slots.map(slot => [slot.slot_index, slot]));

    return Array.from({ length: maxSlots }, (_, index) => {
      return filledSlots.get(index) || {
        slot_index: index,
        players: []
      };
    });
  });

  const handleSwapTeam = (fromIndex: number, toIndex: number) => {
    const newTeams = [...teams];
    const temp = newTeams[fromIndex];
    newTeams[fromIndex] = newTeams[toIndex];
    newTeams[toIndex] = temp;
    setTeams(newTeams);
  };

  const handleMoveTeam = (fromIndex: number, toIndex: number) => {
    if (fromIndex !== toIndex) {
      const newTeams = [...teams];
      const movingTeam = { ...newTeams[fromIndex] };
      newTeams[fromIndex] = {
        slot_index: fromIndex,
        players: [],
      };
      newTeams[toIndex] = movingTeam;
      setTeams(newTeams);
    }
  };

  const handleRemoveTeam = (index: number) => {
    const newTeams = [...teams];
    newTeams[index] = {
      slot_index: index,
      players: [],
    };
    setTeams(newTeams);
  };

  const maximumPlayersPerSlot = matchType === "solo" ? 1 : matchType === "duo" ? 2 : 4;

  const availableSlots = useMemo(
    () =>
      teams
        .filter((team) => team.players.length < maximumPlayersPerSlot)
        .map(({ slot_index }) => slot_index),
    [teams]
  );

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Teams</h2>
        <JoinGame
          gameId={gameId}
          userId={userId}
          availableSlots={availableSlots}
        />
      </div>

      <pre>{JSON.stringify(slots, null, 2)}</pre>
      <div
        className={`grid gap-3 ${matchType === "solo"
          ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8"
          : matchType === "duo"
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          }`}
      >
        {teams.map((team, index) => (
          <TeamCard
            key={team.slot_index}
            team={team}
            mode={matchType}
            teamNumber={index + 1}
            heroMode={heroMode}
            teams={teams}
            onSelectTeam={() => { }}
            onSwapTeam={handleSwapTeam}
            onMoveTeam={handleMoveTeam}
            onRemoveTeam={() => handleRemoveTeam(index)}
          />
        ))}
      </div>
    </div>
  );
}
