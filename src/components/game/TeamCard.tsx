import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CircleDashed, Trash2 } from "lucide-react";
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
import { PlayerCard } from "./PlayerCard";
import { SwapTeam } from "./SwapTeam";
import { MoveTeam } from "./MoveTeam";

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

interface TeamCardProps {
  team: Team;
  mode: string;
  teamNumber: number;
  heroMode: boolean;
  teams: Team[];
  onSelectTeam: () => void;
  onSwapTeam: (fromIndex: number, toIndex: number) => void;
  onMoveTeam: (fromIndex: number, toIndex: number) => void;
  onRemoveTeam: () => void;
}

export function TeamCard({
  team,
  mode,
  teamNumber,
  heroMode,
  teams,
  onSelectTeam,
  onSwapTeam,
  onMoveTeam,
  onRemoveTeam
}: TeamCardProps) {
  return (
    <Card className={`border-pubg/10 relative ${team.isFilled ? 'bg-gaming-light' : 'bg-gaming-darker/60 border-dashed border-muted'} overflow-hidden`}>
      <CardHeader className="py-2 px-3 bg-gaming-darker/50 flex flex-row justify-between items-center">
        <CardTitle className="text-sm text-white">Team {teamNumber}</CardTitle>
        {!team.isFilled ? (
          <Badge variant="outline" className="text-xs border-gaming-light/40 text-gray-400">
            Empty
          </Badge>
        ) : heroMode && (
          <div className="flex items-center gap-1">
            <SwapTeam teamIndex={teamNumber - 1} teams={teams} onSwapTeam={onSwapTeam} />
            <MoveTeam teamIndex={teamNumber - 1} teams={teams} onMoveTeam={onMoveTeam} />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  className="h-6 w-6 rounded-full hover:bg-gaming-darker/50 flex items-center justify-center"
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectTeam();
                  }}
                >
                  <Trash2 className="h-4 w-4 text-red-400" />
                </button>
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
          </div>
        )}
      </CardHeader>
      <CardContent className="p-0">
        {team.isFilled ? (
          <div className={`${mode === 'squad' ? 'grid grid-cols-2 gap-px bg-gaming-darker/30' : ''}`}>
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
} 