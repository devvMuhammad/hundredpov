import { useState } from "react";
import { TeamCard } from "./TeamCard";
import { SwapTeamDialog } from "./SwapTeamDialog";
import { MoveTeamDialog } from "./MoveTeamDialog";

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
}

export function Teams({ matchType, heroMode }: TeamsProps) {
  const [teams, setTeams] = useState<Team[]>(() => {
    const totalTeams = matchType === "solo" ? 100 : matchType === "duo" ? 50 : 25;
    return Array.from({ length: totalTeams }, (_, i) => ({
      id: `team-${i}`,
      players: [],
      isFilled: false
    }));
  });

  const [selectedTeamIndex, setSelectedTeamIndex] = useState<number | null>(null);
  const [swapDialogOpen, setSwapDialogOpen] = useState(false);
  const [moveDialogOpen, setMoveDialogOpen] = useState(false);

  const handleSwapTeam = (fromIndex: number, toIndex: number) => {
    const newTeams = [...teams];
    const temp = newTeams[fromIndex];
    newTeams[fromIndex] = newTeams[toIndex];
    newTeams[toIndex] = temp;
    setTeams(newTeams);
    setSwapDialogOpen(false);
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
      setMoveDialogOpen(false);
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

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4">Teams</h2>

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

      <SwapTeamDialog
        open={swapDialogOpen}
        onOpenChange={setSwapDialogOpen}
        selectedTeamIndex={selectedTeamIndex}
        teams={teams}
        onSwapTeam={handleSwapTeam}
      />

      <MoveTeamDialog
        open={moveDialogOpen}
        onOpenChange={setMoveDialogOpen}
        selectedTeamIndex={selectedTeamIndex}
        teams={teams}
        onMoveTeam={handleMoveTeam}
      />
    </div>
  );
} 