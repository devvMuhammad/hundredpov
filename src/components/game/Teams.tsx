import { useMemo, useState } from "react";
import { TeamCard } from "./TeamCard";
import { JoinGame } from "./JoinGame";

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

interface TeamsProps {
  matchType: string;
  heroMode: boolean;
  gameId: string;
  userId: string | undefined;
}

export function Teams({ matchType, heroMode, gameId, userId }: TeamsProps) {
  const [teams, setTeams] = useState<Team[]>(() => {
    const totalTeams = matchType === "solo" ? 100 : matchType === "duo" ? 50 : 25;
    return Array.from({ length: totalTeams }, (_, i) => ({
      id: `team-${i}`,
      players: [],
      isFilled: false
    }));
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
        id: `team-${fromIndex}`,
        players: [],
        isFilled: false
      };
      newTeams[toIndex] = movingTeam;
      setTeams(newTeams);
    }
  };

  const handleRemoveTeam = (index: number) => {
    const newTeams = [...teams];
    newTeams[index] = {
      id: `team-${index}`,
      players: [],
      isFilled: false
    };
    setTeams(newTeams);
  };


  const availableSlots = useMemo(() => teams
    .map((team, index) => ({ index, isFilled: team.isFilled }))
    .filter(({ isFilled }) => !isFilled)
    .map(({ index }) => index), [teams]);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Teams</h2>
        <JoinGame gameId={gameId} userId={userId} availableSlots={availableSlots} />
      </div>

      <div className={`grid gap-3 ${matchType === 'solo' ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8' :
        matchType === 'duo' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' :
          'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
        }`}>
        {teams.map((team, index) => (
          <TeamCard
            key={team.id}
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