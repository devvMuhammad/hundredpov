import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CircleDashed, ArrowRightLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

interface SwapTeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTeamIndex: number | null;
  teams: Team[];
  onSwapTeam: (fromIndex: number, toIndex: number) => void;
}

export function SwapTeamDialog({
  open,
  onOpenChange,
  selectedTeamIndex,
  teams,
  onSwapTeam
}: SwapTeamDialogProps) {
  const filledTeams = teams.filter(team => team.isFilled);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              const indexInOriginalArray = teams.findIndex(t => t.id === team.id);
              if (indexInOriginalArray === selectedTeamIndex) return null;

              return (
                <Button
                  key={team.id}
                  variant="outline"
                  className="justify-start h-auto py-3 hover:bg-gaming-darker/30"
                  onClick={() => onSwapTeam(selectedTeamIndex!, indexInOriginalArray)}
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
  );
} 